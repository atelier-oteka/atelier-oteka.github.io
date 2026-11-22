// ===========================================================================
// installateur/main.go — Installateur Windows de Grind Poker.
//
// C'est un vrai installateur, pas une archive : il place l'application,
// crée les raccourcis, et s'inscrit dans « Applications et fonctionnalités »
// de Windows pour pouvoir être désinstallé proprement.
//
// CE QU'IL FAIT
//  1. copie GrindPoker.exe dans   %LOCALAPPDATA%\Programs\GrindPoker\
//     (pas Program Files : aucun droit administrateur n'est nécessaire,
//     donc aucune fenêtre d'élévation) ;
//  2. se copie lui-même à côté sous le nom Desinstaller.exe ;
//  3. crée un raccourci SUR LE BUREAU et un raccourci dans le menu Démarrer,
//     avec l'icône de l'application ;
//  4. inscrit l'application dans le registre, sous la clé de désinstallation
//     de l'utilisateur courant.
//
// LANCÉ AVEC /desinstaller
//
//	il retire les raccourcis, la clé de registre et le dossier d'installation.
//	Le carnet (%APPDATA%\GrindPoker) est CONSERVÉ : ce sont les données du
//	joueur, pas celles du logiciel. L'installateur le dit à l'écran.
//
// Il n'affiche pas de fenêtre noire : le dialogue passe par les boîtes de
// message de Windows.
//
// Compilation (l'application doit avoir été compilée d'abord) :
//
//	cp ../GrindPoker.exe && GOOS=windows GOARCH=amd64 \
//	  go build -ldflags "-H windowsgui -s -w" -o GrindPoker-Installation.exe .
//
// ===========================================================================
package main

import (
	"embed"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"syscall"
	"unsafe"
)

//go:embed GrindPoker.exe
var applications embed.FS

const (
	nomApp     = "GrindPoker"  // nom technique : dossier, exécutable, registre
	nomAffiche = "Grind Poker" // nom montré à l'écran et dans Windows
	version    = "1.0.1"
	editeur    = "L'Atelier d'Oteka"
	site       = "https://atelier-oteka.github.io/"
)

// ------------------------------------------------------------ boîtes Windows

var user32 = syscall.NewLazyDLL("user32.dll")

const (
	mbOkCancel      = 0x00000001
	mbIconQuestion  = 0x00000020
	mbIconInfo      = 0x00000040
	mbIconErreur    = 0x00000010
	reponseValidate = 1
)

func boite(texte, titre string, style uintptr) int {
	t, _ := syscall.UTF16PtrFromString(texte)
	ti, _ := syscall.UTF16PtrFromString(titre)
	r, _, _ := user32.NewProc("MessageBoxW").Call(
		0, uintptr(unsafe.Pointer(t)), uintptr(unsafe.Pointer(ti)), style)
	return int(r)
}

func info(texte string)   { boite(texte, nomAffiche+" "+version, mbIconInfo) }
func erreur(texte string) { boite(texte, nomAffiche+" — problème", mbIconErreur) }

// ------------------------------------------------------------------ chemins

func dossierInstallation() string {
	base, err := os.UserCacheDir() // %LOCALAPPDATA% sous Windows
	if err != nil || base == "" {
		base, _ = os.UserConfigDir()
	}
	return filepath.Join(base, "Programs", nomApp)
}

func bureau() string {
	if p := os.Getenv("USERPROFILE"); p != "" {
		// OneDrive déplace parfois le bureau : on essaie les deux.
		if d := filepath.Join(p, "OneDrive", "Bureau"); existe(d) {
			return d
		}
		if d := filepath.Join(p, "OneDrive", "Desktop"); existe(d) {
			return d
		}
		if d := filepath.Join(p, "Bureau"); existe(d) {
			return d
		}
		return filepath.Join(p, "Desktop")
	}
	return ""
}

func menuDemarrer() string {
	if p := os.Getenv("APPDATA"); p != "" {
		return filepath.Join(p, "Microsoft", "Windows", "Start Menu", "Programs")
	}
	return ""
}

func existe(p string) bool { _, err := os.Stat(p); return err == nil }

// --------------------------------------------------- raccourcis et registre

// Windows ne sait créer un raccourci que par son objet COM WScript.Shell.
// PowerShell y donne accès en trois lignes, sans dépendance à installer.
func powershell(script string) error {
	cmd := exec.Command("powershell", "-NoProfile", "-NonInteractive",
		"-ExecutionPolicy", "Bypass", "-Command", script)
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	return cmd.Run()
}

func creerRaccourci(chemin, cible, description string) error {
	script := strings.Join([]string{
		"$s = (New-Object -ComObject WScript.Shell).CreateShortcut('" + chemin + "')",
		"$s.TargetPath = '" + cible + "'",
		"$s.WorkingDirectory = '" + filepath.Dir(cible) + "'",
		"$s.IconLocation = '" + cible + ",0'",
		"$s.Description = '" + description + "'",
		"$s.Save()",
	}, "; ")
	return powershell(script)
}

func inscrireRegistre(dossier, desinstalleur string) error {
	cle := `HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\` + nomApp
	script := strings.Join([]string{
		"New-Item -Path '" + cle + "' -Force | Out-Null",
		"Set-ItemProperty -Path '" + cle + "' -Name DisplayName -Value '" + nomAffiche + "'",
		"Set-ItemProperty -Path '" + cle + "' -Name DisplayVersion -Value '" + version + "'",
		"Set-ItemProperty -Path '" + cle + "' -Name Publisher -Value '" + editeur + "'",
		"Set-ItemProperty -Path '" + cle + "' -Name URLInfoAbout -Value '" + site + "'",
		"Set-ItemProperty -Path '" + cle + "' -Name InstallLocation -Value '" + dossier + "'",
		"Set-ItemProperty -Path '" + cle + "' -Name DisplayIcon -Value '" + filepath.Join(dossier, nomApp+".exe") + "'",
		"Set-ItemProperty -Path '" + cle + "' -Name UninstallString -Value '\"" + desinstalleur + "\" /desinstaller'",
		"Set-ItemProperty -Path '" + cle + "' -Name NoModify -Value 1 -Type DWord",
		"Set-ItemProperty -Path '" + cle + "' -Name NoRepair -Value 1 -Type DWord",
	}, "; ")
	return powershell(script)
}

func retirerRegistre() error {
	cle := `HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\` + nomApp
	return powershell("Remove-Item -Path '" + cle + "' -Recurse -Force -ErrorAction SilentlyContinue")
}

// ---------------------------------------------------------------- installer

func installer() {
	if boite(
		"Installer "+nomAffiche+" "+version+" ?\n\n"+
			"L'application sera placée dans votre dossier utilisateur — aucun droit\n"+
			"administrateur n'est nécessaire. Un raccourci sera créé sur le Bureau\n"+
			"et dans le menu Démarrer.\n\n"+
			"Vos données (tournois, progression) sont conservées dans\n"+
			"%APPDATA%\\GrindPoker et ne sont jamais touchées par une mise à jour.",
		nomAffiche+" "+version, mbOkCancel|mbIconQuestion) != reponseValidate {
		return
	}

	dossier := dossierInstallation()
	if err := os.MkdirAll(dossier, 0o755); err != nil {
		erreur("Impossible de créer le dossier d'installation :\n" + err.Error())
		return
	}

	// 1. L'application
	binaire, err := applications.ReadFile("GrindPoker.exe")
	if err != nil {
		erreur("L'installateur est incomplet : " + err.Error())
		return
	}
	cible := filepath.Join(dossier, nomApp+".exe")
	if err := ecrire(cible, binaire); err != nil {
		erreur("Impossible d'écrire l'application.\n\n" +
			"Si Grind Poker est ouvert, fermez-le puis relancez l'installation.\n\n" + err.Error())
		return
	}

	// 2. Le désinstalleur : ce programme, copié à côté
	moi, err := os.Executable()
	desinstalleur := filepath.Join(dossier, "Desinstaller.exe")
	if err == nil {
		if donnees, e := os.ReadFile(moi); e == nil {
			_ = ecrire(desinstalleur, donnees)
		}
	}

	// 3. Les raccourcis
	var soucis []string
	if b := bureau(); b != "" {
		if e := creerRaccourci(filepath.Join(b, nomAffiche+".lnk"), cible,
			"Bankroll, école et entraînement au poker"); e != nil {
			soucis = append(soucis, "raccourci du Bureau")
		}
	}
	if m := menuDemarrer(); m != "" {
		if e := creerRaccourci(filepath.Join(m, nomAffiche+".lnk"), cible,
			"Bankroll, école et entraînement au poker"); e != nil {
			soucis = append(soucis, "raccourci du menu Démarrer")
		}
	}

	// 4. Le registre, pour la désinstallation par Windows
	if e := inscrireRegistre(dossier, desinstalleur); e != nil {
		soucis = append(soucis, "inscription dans la liste des programmes")
	}

	message := nomAffiche + " " + version + " est installé.\n\n" +
		"Un raccourci vous attend sur le Bureau.\n" +
		"Dossier : " + dossier + "\n" +
		"Carnet : %APPDATA%\\GrindPoker\\carnet.json"
	if len(soucis) > 0 {
		message += "\n\nDeux détails n'ont pas abouti (" + strings.Join(soucis, ", ") +
			").\nL'application fonctionne : lancez-la depuis le dossier ci-dessus."
	}
	info(message)

	// On propose de l'ouvrir tout de suite.
	if boite("Lancer "+nomAffiche+" maintenant ?", nomAffiche, mbOkCancel|mbIconQuestion) == reponseValidate {
		cmd := exec.Command(cible)
		cmd.Dir = dossier
		_ = cmd.Start()
	}
}

func ecrire(chemin string, donnees []byte) error {
	tmp := chemin + ".tmp"
	if err := os.WriteFile(tmp, donnees, 0o755); err != nil {
		return err
	}
	_ = os.Remove(chemin)
	return os.Rename(tmp, chemin)
}

// ------------------------------------------------------------- désinstaller

func desinstaller() {
	if boite(
		"Désinstaller "+nomAffiche+" ?\n\n"+
			"Vos données sont CONSERVÉES : tournois, progression et\n"+
			"sauvegardes restent dans %APPDATA%\\GrindPoker.\n"+
			"Vous pourrez les retrouver en réinstallant le logiciel.",
		nomAffiche+" — désinstallation", mbOkCancel|mbIconQuestion) != reponseValidate {
		return
	}

	if b := bureau(); b != "" {
		_ = os.Remove(filepath.Join(b, nomAffiche+".lnk"))
	}
	if m := menuDemarrer(); m != "" {
		_ = os.Remove(filepath.Join(m, nomAffiche+".lnk"))
	}
	_ = retirerRegistre()

	dossier := dossierInstallation()
	_ = os.Remove(filepath.Join(dossier, nomApp+".exe"))

	// Le désinstalleur ne peut pas s'effacer lui-même pendant qu'il tourne :
	// on demande à Windows de le faire juste après notre sortie.
	moi, _ := os.Executable()
	_ = powershell("Start-Sleep -Seconds 2; " +
		"Remove-Item -LiteralPath '" + moi + "' -Force -ErrorAction SilentlyContinue; " +
		"Remove-Item -LiteralPath '" + dossier + "' -Recurse -Force -ErrorAction SilentlyContinue")

	info(nomAffiche + " est désinstallé.\n\nVos données sont toujours dans %APPDATA%\\GrindPoker.")
}

func main() {
	for _, a := range os.Args[1:] {
		if strings.EqualFold(a, "/desinstaller") || strings.EqualFold(a, "-desinstaller") ||
			strings.EqualFold(a, "/uninstall") {
			desinstaller()
			return
		}
	}
	installer()
}
