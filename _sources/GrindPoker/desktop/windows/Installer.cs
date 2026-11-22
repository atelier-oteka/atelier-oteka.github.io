using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Windows.Forms;

[assembly: AssemblyTitle("Installation de GrindPoker")]
[assembly: AssemblyProduct("GrindPoker")]
[assembly: AssemblyCompany("L'Atelier d'Oteka")]
[assembly: AssemblyVersion("1.0.1.0")]
[assembly: AssemblyFileVersion("1.0.1.0")]

class Installer {
    [STAThread]
    static int Main() {
        const string title = "Grind Poker 1.0.1";
        if (!Environment.Is64BitOperatingSystem) {
            MessageBox.Show("Cette version nécessite Windows 64 bits.", title);
            return 1;
        }
        if (MessageBox.Show("Installer ou mettre à jour Grind Poker sur ce PC ?\n\nUn raccourci sera créé sur le Bureau et dans le menu Démarrer. Ton carnet et tes sauvegardes sont conservés.", title, MessageBoxButtons.OKCancel, MessageBoxIcon.Question) != DialogResult.OK) return 0;
        try {
            string local = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            string cache = Path.Combine(local, "GrindPoker", "Installation");
            Directory.CreateDirectory(cache);
            string msi = Path.Combine(cache, "GrindPoker-1.0.1.msi");
            string tmp = Path.Combine(cache, Guid.NewGuid() + ".tmp");
            try {
                using (Stream src = Assembly.GetExecutingAssembly().GetManifestResourceStream("GrindPoker.msi"))
                using (var dest = new FileStream(tmp, FileMode.CreateNew, FileAccess.Write, FileShare.None)) src.CopyTo(dest);
                if (File.Exists(msi)) File.Replace(tmp, msi, null); else File.Move(tmp, msi);
            } finally { if (File.Exists(tmp)) File.Delete(tmp); }
            string log = Path.Combine(cache, "installation.log");
            var start = new ProcessStartInfo(Path.Combine(Environment.SystemDirectory, "msiexec.exe"),
                "/i \"" + msi + "\" /qb /norestart /L*v \"" + log + "\"") {UseShellExecute = false};
            int exit;
            using (var p = Process.Start(start)) { p.WaitForExit(); exit = p.ExitCode; }
            if (exit == 1602) return exit;
            if (exit == 3010) { MessageBox.Show("GrindPoker est installé. Redémarre Windows pour terminer la mise à jour.", title); return 0; }
            if (exit != 0) throw new IOException("Windows Installer a renvoyé le code " + exit + ".\n\nJournal : " + log);
            string app = Path.Combine(local, "Programs", "GrindPoker", "GrindPoker.exe");
            if (!File.Exists(app)) throw new FileNotFoundException("GrindPoker.exe est introuvable après l’installation.");
            if (MessageBox.Show("Installation terminée. Ouvrir Grind Poker maintenant ?", title, MessageBoxButtons.YesNo, MessageBoxIcon.Information) == DialogResult.Yes)
                Process.Start(new ProcessStartInfo(app) {WorkingDirectory = Path.GetDirectoryName(app)});
            return 0;
        } catch (Exception ex) {
            MessageBox.Show(ex.Message, title, MessageBoxButtons.OK, MessageBoxIcon.Error);
            return 1;
        }
    }
}
