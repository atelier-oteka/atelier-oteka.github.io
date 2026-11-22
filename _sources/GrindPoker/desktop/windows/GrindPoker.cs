using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Web.Script.Serialization;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

[assembly: AssemblyTitle("GrindPoker")]
[assembly: AssemblyCompany("L'Atelier d'Oteka")]
[assembly: AssemblyProduct("GrindPoker")]
[assembly: AssemblyFileVersion("1.0.1.0")]
[assembly: AssemblyVersion("1.0.1.0")]

internal sealed class GrindPoker : Form {
    const string Origin = "https://127.0.0.1";
    readonly WebView2 view = new WebView2();
    readonly JavaScriptSerializer json = new JavaScriptSerializer { MaxJsonLength = 16 * 1024 * 1024 };
    readonly string folder = Path.Combine(Environment.GetEnvironmentVariable("APPDATA") ?? Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "GrindPoker");
    string Notebook { get { return Path.Combine(folder, "carnet.json"); } }
    string Backups { get { return Path.Combine(folder, "sauvegardes"); } }
    DateTime lastBackup = DateTime.MinValue;
    static readonly Encoding Utf8 = new UTF8Encoding(false);

    [STAThread]
    static void Main() {
        bool first;
        using (var mutex = new Mutex(true, @"Local\Oteka.GrindPoker.Desktop", out first)) {
            if (!first) { MessageBox.Show("GrindPoker est déjà ouvert.", "GrindPoker"); return; }
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new GrindPoker());
        }
    }

    GrindPoker() {
        Text = "Grind Poker"; Icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath);
        MinimumSize = new Size(760, 520); WindowState = FormWindowState.Maximized;
        view.Dock = DockStyle.Fill; Controls.Add(view); Shown += Initialize;
    }

    async void Initialize(object sender, EventArgs args) {
        try {
            var profile = Path.Combine(Environment.GetEnvironmentVariable("LOCALAPPDATA") ?? Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "GrindPoker", "WebView2");
            var env = await CoreWebView2Environment.CreateAsync(null, profile);
            await view.EnsureCoreWebView2Async(env);
            var core = view.CoreWebView2;
            core.Settings.AreHostObjectsAllowed = false;
            core.Settings.IsWebMessageEnabled = false;
            core.NavigationStarting += (s, e) => { if (!e.Uri.StartsWith(Origin + "/", StringComparison.Ordinal)) e.Cancel = true; };
            core.NewWindowRequested += (s, e) => e.Handled = true;
            core.AddWebResourceRequestedFilter(Origin + "/*", CoreWebView2WebResourceContext.All);
            core.WebResourceRequested += Serve;
            core.Navigate(Origin + "/index.html");
        } catch (Exception ex) {
            MessageBox.Show("Impossible d’ouvrir GrindPoker. Vérifie que Microsoft Edge WebView2 Runtime est installé.\n\n" + ex.Message, Text, MessageBoxButtons.OK, MessageBoxIcon.Error);
            Close();
        }
    }

    Dictionary<string, object> Parse(string text) {
        var result = json.DeserializeObject(text) as Dictionary<string, object>;
        if (result == null) throw new InvalidDataException();
        return result;
    }

    void Save(string text) {
        Parse(text);
        Directory.CreateDirectory(folder);
        string temp = Path.Combine(folder, Guid.NewGuid() + ".tmp");
        try {
            File.WriteAllText(temp, text, Utf8);
            if (File.Exists(Notebook)) File.Replace(temp, Notebook, null);
            else File.Move(temp, Notebook);
        } finally { if (File.Exists(temp)) File.Delete(temp); }
    }

    FileInfo[] Copies() {
        if (!Directory.Exists(Backups)) return new FileInfo[0];
        return new DirectoryInfo(Backups).GetFiles("carnet-*.json").OrderByDescending(f => f.LastWriteTimeUtc).ThenByDescending(f => f.Name).ToArray();
    }

    string Backup() {
        Directory.CreateDirectory(Backups);
        string name = "carnet-" + DateTime.Now.ToString("yyyy-MM-dd_HH-mm-ss.fffffff") + "-" + Guid.NewGuid().ToString("N").Substring(0, 6) + ".json";
        File.Copy(Notebook, Path.Combine(Backups, name), false);
        foreach (var old in Copies().Skip(20)) old.Delete();
        return name;
    }

    string ReadJson(string path) {
        string text = File.ReadAllText(path, Utf8); Parse(text); return text;
    }

    void Serve(object sender, CoreWebView2WebResourceRequestedEventArgs e) {
        var req = e.Request;
        string path = new Uri(req.Uri).AbsolutePath;
        int code = 200;
        Stream body = null;
        string contentType = "application/json; charset=utf-8";
        string result = "{}";
        try {
            switch (req.Method + " " + path) {
            case "GET /index.html":
            case "GET /logo.svg":
                body = Assembly.GetExecutingAssembly().GetManifestResourceStream(path.Substring(1));
                if (body == null) throw new FileNotFoundException();
                contentType = path == "/index.html" ? "text/html; charset=utf-8" : "image/svg+xml";
                break;
            case "GET /api/donnees":
                try { result = ReadJson(Notebook); } catch (FileNotFoundException) {} catch (DirectoryNotFoundException) {}
                break;
            case "PUT /api/donnees":
                using (var reader = new StreamReader(req.Content, Utf8)) Save(reader.ReadToEnd());
                if (DateTime.UtcNow - lastBackup >= TimeSpan.FromMinutes(15)) {
                    try { Backup(); lastBackup = DateTime.UtcNow; }
                    catch (IOException) { /* Le carnet est déjà enregistré. La copie sera retentée. */ }
                    catch (UnauthorizedAccessException) { /* Le dossier de copies peut être indisponible. */ }
                }
                break;
            case "GET /api/sauvegardes":
                result = json.Serialize(Copies().Select(f => new {nom = f.Name, date = f.LastWriteTime.ToString("dd/MM/yyyy HH:mm"), taille = f.Length}).ToArray());
                break;
            case "POST /api/sauvegarder":
                result = json.Serialize(new {nom = Backup()}); break;
            case "POST /api/restaurer":
                string name;
                using (var reader = new StreamReader(req.Content, Utf8)) {
                    object value;
                    name = Parse(reader.ReadToEnd()).TryGetValue("nom", out value) ? value as string : null;
                }
                var copy = Copies().FirstOrDefault(f => f.Name == name);
                if (copy == null) throw new FileNotFoundException();
                result = ReadJson(copy.FullName); Save(result); break;
            default: code = 404; break;
            }
        } catch (FileNotFoundException) { code = 404; } catch (Exception) { code = 500; }
        if (body == null) body = new MemoryStream(Utf8.GetBytes(code == 200 ? result : "{}"));
        e.Response = view.CoreWebView2.Environment.CreateWebResourceResponse(body, code, code == 200 ? "OK" : "Erreur", "Content-Type: " + contentType + "\r\nCache-Control: no-store");
    }
}

