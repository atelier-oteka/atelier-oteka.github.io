using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Diagnostics;
using System.Globalization;

class FabriquerMsi {
    const string Msi = "msi.dll";
    [DllImport(Msi, CharSet=CharSet.Unicode)] static extern uint MsiOpenDatabase(string path, IntPtr mode, out uint db);
    [DllImport(Msi, CharSet=CharSet.Unicode)] static extern uint MsiDatabaseOpenView(uint db, string sql, out uint view);
    [DllImport(Msi)] static extern uint MsiViewExecute(uint view, uint record);
    [DllImport(Msi)] static extern uint MsiDatabaseCommit(uint db);
    [DllImport(Msi)] static extern uint MsiCloseHandle(uint handle);
    [DllImport(Msi)] static extern uint MsiCreateRecord(uint fields);
    [DllImport(Msi, CharSet=CharSet.Unicode)] static extern uint MsiRecordSetString(uint record, uint field, string value);
    [DllImport(Msi)] static extern uint MsiRecordSetInteger(uint record, uint field, int value);
    [DllImport(Msi, CharSet=CharSet.Unicode)] static extern uint MsiRecordSetStream(uint record, uint field, string file);
    [DllImport(Msi, CharSet=CharSet.Unicode)] static extern uint MsiGetSummaryInformation(uint db, string path, uint count, out uint summary);
    [DllImport(Msi, CharSet=CharSet.Unicode)] static extern uint MsiSummaryInfoSetProperty(uint summary, uint id, uint type, int number, IntPtr time, string text);
    [DllImport(Msi)] static extern uint MsiSummaryInfoPersist(uint summary);
    static uint db;
    class Blob { public string path; public Blob(string p){path=p;} }
    static void Check(uint rc) { if(rc!=0) throw new Exception("Windows Installer: "+rc); }
    static void Execute(string sql, params object[] fields) {
        uint view, rec = MsiCreateRecord((uint)fields.Length);
        try {
            for(int i=0;i<fields.Length;i++) {
                object f=fields[i]; uint col=(uint)(i+1);
                if(f is int) Check(MsiRecordSetInteger(rec,col,(int)f));
                else if(f is Blob) Check(MsiRecordSetStream(rec,col,((Blob)f).path));
                else if(f!=null) Check(MsiRecordSetString(rec,col,(string)f));
            }
            Check(MsiDatabaseOpenView(db,sql,out view));
            try {Check(MsiViewExecute(view,rec));} finally {MsiCloseHandle(view);}
        } catch(Exception e){throw new Exception(sql,e);} finally {MsiCloseHandle(rec);}
    }
    static void Table(string name, string[] columns, params string[] keys) {
        Execute("CREATE TABLE `"+name+"` ("+String.Join(", ",columns)+" PRIMARY KEY `"+String.Join("`, `",keys)+"`)");
    }
    static void Row(string name, string columns, params object[] args) {
        string[] placeholders=Array.ConvertAll(args,a=>"?");
        Execute("INSERT INTO `"+name+"` (`"+columns.Replace(",","`,`")+"`) VALUES ("+String.Join(",",placeholders)+")",args);
    }
    static void Prop(string k,string v){Row("Property","Property,Value",k,v);}
    static void Summary() {
        uint s;Check(MsiGetSummaryInformation(db,null,12,out s));
        try {
            Check(MsiSummaryInfoSetProperty(s,2,30,0,IntPtr.Zero,"Installation de GrindPoker"));
            Check(MsiSummaryInfoSetProperty(s,3,30,0,IntPtr.Zero,"GrindPoker 1.0.1"));
            Check(MsiSummaryInfoSetProperty(s,4,30,0,IntPtr.Zero,"L'Atelier d'Oteka"));
            Check(MsiSummaryInfoSetProperty(s,7,30,0,IntPtr.Zero,"x64;1036"));
            Check(MsiSummaryInfoSetProperty(s,9,30,0,IntPtr.Zero,Guid.NewGuid().ToString("B").ToUpperInvariant()));
            Check(MsiSummaryInfoSetProperty(s,14,3,500,IntPtr.Zero,null));
            Check(MsiSummaryInfoSetProperty(s,15,3,10,IntPtr.Zero,null));
            Check(MsiSummaryInfoPersist(s));
        } finally {MsiCloseHandle(s);}
    }
    static void Seq(string table,string action,int n,string when=null) {Row(table,"Action,Condition,Sequence",action,when,n);}
    static void Main(string[] args) {
        string output=Path.GetFullPath(args[0]), folder=Path.GetFullPath(args[1]), cab=Path.GetFullPath(args[2]);
        Check(MsiOpenDatabase(output,new IntPtr(3),out db));
        try {
            Table("Property", new[]{"`Property` CHAR(72) NOT NULL","`Value` CHAR(0) NOT NULL LOCALIZABLE"},"Property");
            Prop("ProductName","Grind Poker");Prop("ProductVersion","1.0.1");Prop("Manufacturer","L'Atelier d'Oteka");
            Prop("ProductLanguage","1036");Prop("ProductCode","{8A709C9A-EA0A-4946-91C2-A3AF45E81162}");Prop("UpgradeCode","{772FAC6F-FEFB-4C9B-8DFD-C380EBE7A67D}");
            Prop("ARPNOMODIFY","1");Prop("ARPURLINFOABOUT","https://atelier-oteka.github.io/");Prop("ARPPRODUCTICON","GrindPokerIcon");
            Table("Directory",new[]{"`Directory` CHAR(72) NOT NULL","`Directory_Parent` CHAR(72)","`DefaultDir` CHAR(255) NOT NULL LOCALIZABLE"},"Directory");
            string[] dirs={"TARGETDIR||SourceDir","LocalAppDataFolder|TARGETDIR|.","DesktopFolder|TARGETDIR|.","ProgramMenuFolder|TARGETDIR|.","UserPrograms|LocalAppDataFolder|Programs","INSTALLDIR|UserPrograms|GrindPoker"};
            foreach(string d in dirs){var p=d.Split('|');Row("Directory","Directory,Directory_Parent,DefaultDir",p[0],p[1]==""?null:p[1],p[2]);}
            Table("Feature",new[]{"`Feature` CHAR(38) NOT NULL","`Feature_Parent` CHAR(38)","`Title` CHAR(64) LOCALIZABLE","`Description` CHAR(255) LOCALIZABLE","`Display` SHORT","`Level` SHORT NOT NULL","`Directory_` CHAR(72)","`Attributes` SHORT NOT NULL"},"Feature");
            Row("Feature","Feature,Title,Level,Directory_,Attributes","Application","GrindPoker",1,"INSTALLDIR",0);
            Table("Component",new[]{"`Component` CHAR(72) NOT NULL","`ComponentId` CHAR(38)","`Directory_` CHAR(72) NOT NULL","`Attributes` SHORT NOT NULL","`Condition` CHAR(255)","`KeyPath` CHAR(72)"},"Component");
            Table("FeatureComponents",new[]{"`Feature_` CHAR(38) NOT NULL","`Component_` CHAR(72) NOT NULL"},"Feature_","Component_");
            Table("File",new[]{"`File` CHAR(72) NOT NULL","`Component_` CHAR(72) NOT NULL","`FileName` CHAR(255) NOT NULL LOCALIZABLE","`FileSize` LONG NOT NULL","`Version` CHAR(72)","`Language` CHAR(20)","`Attributes` SHORT","`Sequence` SHORT NOT NULL"},"File");
            string[] ids={"AppFile","CoreDll","FormsDll","LoaderDll"}, names={"GrindPoker.exe","Microsoft.Web.WebView2.Core.dll","Microsoft.Web.WebView2.WinForms.dll","WebView2Loader.dll"};
            string[] shortNames={"GRINDPOK.EXE","WV2CORE.DLL","WV2FORMS.DLL","WV2LOAD.DLL"};
            for(int i=0;i<ids.Length;i++){
                var f=new FileInfo(Path.Combine(folder,names[i]));
                Row("Component","Component,ComponentId,Directory_,Attributes,KeyPath",ids[i],"{5F0CCCB4-6747-4635-A8B5-5BC9CF00BF5"+i+"}","INSTALLDIR",256,ids[i]);
                Row("FeatureComponents","Feature_,Component_","Application",ids[i]);
                var v=FileVersionInfo.GetVersionInfo(f.FullName);
                string ver=String.Format("{0}.{1}.{2}.{3}",v.FileMajorPart,v.FileMinorPart,v.FileBuildPart,v.FilePrivatePart);
                Row("File","File,Component_,FileName,FileSize,Version,Attributes,Sequence",ids[i],ids[i],shortNames[i]+"|"+names[i],(int)f.Length,ver,16384,i+1);
            }
            Table("Media",new[]{"`DiskId` SHORT NOT NULL","`LastSequence` SHORT NOT NULL","`DiskPrompt` CHAR(64) LOCALIZABLE","`Cabinet` CHAR(255)","`VolumeLabel` CHAR(32)","`Source` CHAR(72)"},"DiskId");
            Row("Media","DiskId,LastSequence,Cabinet",1,4,"#payload.cab");
            Row("_Streams","Name,Data","payload.cab",new Blob(cab));
            Table("Icon",new[]{"`Name` CHAR(72) NOT NULL","`Data` OBJECT NOT NULL"},"Name");Row("Icon","Name,Data","GrindPokerIcon",new Blob(Path.GetFullPath(args[3])));
            Table("Shortcut",new[]{"`Shortcut` CHAR(72) NOT NULL","`Directory_` CHAR(72) NOT NULL","`Name` CHAR(128) NOT NULL LOCALIZABLE","`Component_` CHAR(72) NOT NULL","`Target` CHAR(72) NOT NULL","`Arguments` CHAR(255)","`Description` CHAR(255) LOCALIZABLE","`Hotkey` SHORT","`Icon_` CHAR(72)","`IconIndex` SHORT","`ShowCmd` SHORT","`WkDir` CHAR(72)"},"Shortcut");
            foreach(string dest in new[]{"DesktopFolder","ProgramMenuFolder"})Row("Shortcut","Shortcut,Directory_,Name,Component_,Target,Description,WkDir",dest,dest,"GRINDPOK|Grind Poker","AppFile","[#AppFile]","Grind Poker","INSTALLDIR");
            Table("RemoveRegistry",new[]{"`RemoveRegistry` CHAR(72) NOT NULL","`Root` SHORT NOT NULL","`Key` CHAR(255) NOT NULL","`Name` CHAR(255)","`Component_` CHAR(72) NOT NULL"},"RemoveRegistry");
            Row("RemoveRegistry","RemoveRegistry,Root,Key,Name,Component_","LegacyEntry",1,@"Software\Microsoft\Windows\CurrentVersion\Uninstall\GrindPoker","-","AppFile");
            Table("RemoveFile",new[]{"`FileKey` CHAR(72) NOT NULL","`Component_` CHAR(72) NOT NULL","`FileName` CHAR(255) LOCALIZABLE","`DirProperty` CHAR(72) NOT NULL","`InstallMode` SHORT NOT NULL"},"FileKey");
            Row("RemoveFile","FileKey,Component_,FileName,DirProperty,InstallMode","AncienDesinstalleur","AppFile","DESINS~1.EXE|Desinstaller.exe","INSTALLDIR",1);
            foreach(string seq in new[]{"InstallExecuteSequence","AdminExecuteSequence"})Table(seq,new[]{"`Action` CHAR(72) NOT NULL","`Condition` CHAR(255)","`Sequence` SHORT"},"Action");
            string seqI="InstallExecuteSequence";
            string[] actions={"CostInitialize:800","FileCost:900","CostFinalize:1000","InstallValidate:1400","InstallInitialize:1500","ProcessComponents:1600","UnpublishFeatures:1800","RemoveRegistryValues:2600","RemoveShortcuts:3200","RemoveFiles:3500","InstallFiles:4000","CreateShortcuts:4500","RegisterUser:6000","RegisterProduct:6100","PublishFeatures:6300","PublishProduct:6400","InstallFinalize:6600"};
            foreach(string a in actions){var p=a.Split(':');Seq(seqI,p[0],Int32.Parse(p[1]));}
            foreach(string a in new[]{"CostInitialize:800","FileCost:900","CostFinalize:1000","InstallValidate:1400","InstallInitialize:1500","InstallAdminPackage:3900","InstallFiles:4000","InstallFinalize:6600"}){var p=a.Split(':');Seq("AdminExecuteSequence",p[0],Int32.Parse(p[1]));}
            Summary(); Check(MsiDatabaseCommit(db));
        } finally {MsiCloseHandle(db);}
    }
}
