// ===========================================================================
// main.go — Enveloppe Windows de Grind Poker.
//
// Le logiciel est une page HTML autonome (web/index.html), la même que la
// version en ligne. Ce programme :
//  1. embarque ce dossier web/ dans l'exécutable (rien à installer à côté) ;
//  2. le sert sur un petit serveur local, sur un port libre choisi au
//     démarrage et accessible seulement depuis la machine (127.0.0.1) ;
//  3. expose une petite API pour le carnet — tournois, progression de
//     l'École et de l'Entraînement — et ses sauvegardes ;
//  4. ouvre une fenêtre WebView2 — le moteur de rendu déjà présent sur
//     Windows 10 et 11 — agrandie plein écran, pour que tout soit visible
//     sans défilement.
//
// POURQUOI UN FICHIER ET PAS LE STOCKAGE DU NAVIGATEUR
//
//	Le port du serveur change à chaque lancement, et le stockage d'un
//	navigateur est attaché à l'adresse exacte du site (donc au port) : le
//	carnet serait effacé à chaque démarrage. Les données vivent donc dans un
//	vrai fichier, lisible et sauvegardable :
//	    %APPDATA%\GrindPoker\carnet.json
//	    %APPDATA%\GrindPoker\sauvegardes\carnet-AAAA-MM-JJ_hh-mm-ss.json
//	Dans un simple navigateur, la page retombe sur le stockage local.
//
// API
//
//	GET  /api/donnees      le carnet, ou {} s'il n'existe pas encore
//	PUT  /api/donnees      l'enregistre (écriture atomique + copie datée)
//	GET  /api/sauvegardes  la liste des copies, la plus récente en premier
//	POST /api/sauvegarder  une copie à la demande
//	POST /api/restaurer    remet une copie en place et la renvoie
//
// Compilation depuis Linux ou Windows :
//
//	GOOS=windows GOARCH=amd64 go build -ldflags "-H windowsgui -s -w" \
//	  -o GrindPoker-<version>.exe
//
// ===========================================================================
package main

import (
	"embed"
	"encoding/json"
	"io"
	"io/fs"
	"log"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/jchv/go-webview2"
)

//go:embed web
var contenu embed.FS

var verrou sync.Mutex // une seule écriture à la fois

const maxSauvegardes = 20 // on garde les vingt dernières copies

// ---------------------------------------------------------------- emplacements

// Emplacement du carnet : %APPDATA%\GrindPoker\carnet.json sous Windows.
func cheminCarnet() string {
	base, err := os.UserConfigDir()
	if err != nil {
		base = "."
	}
	dossier := filepath.Join(base, "GrindPoker")
	_ = os.MkdirAll(dossier, 0o755)
	return filepath.Join(dossier, "carnet.json")
}

func dossierSauvegardes() string {
	d := filepath.Join(filepath.Dir(cheminCarnet()), "sauvegardes")
	_ = os.MkdirAll(d, 0o755)
	return d
}

// ---------------------------------------------------------------- sauvegardes

// Écrit une copie datée du carnet, supprime les plus anciennes, et renvoie le
// nom du fichier créé.
func creerSauvegarde() (string, error) {
	donnees, err := os.ReadFile(cheminCarnet())
	if err != nil {
		return "", err
	}
	if len(donnees) == 0 {
		return "", os.ErrNotExist
	}
	nom := "carnet-" + time.Now().Format("2006-01-02_15-04-05") + ".json"
	if err := os.WriteFile(filepath.Join(dossierSauvegardes(), nom), donnees, 0o644); err != nil {
		return "", err
	}
	// Rotation. Le nom porte la date : l'ordre alphabétique est celui du temps.
	entrees, _ := os.ReadDir(dossierSauvegardes())
	var noms []string
	for _, e := range entrees {
		if !e.IsDir() && strings.HasPrefix(e.Name(), "carnet-") {
			noms = append(noms, e.Name())
		}
	}
	sort.Strings(noms)
	for len(noms) > maxSauvegardes {
		_ = os.Remove(filepath.Join(dossierSauvegardes(), noms[0]))
		noms = noms[1:]
	}
	return nom, nil
}

// Copie automatique, au plus une par quart d'heure : assez pour ne rien
// perdre, pas assez pour encombrer.
var derniereAuto time.Time

func sauvegardeAutomatique() {
	if time.Since(derniereAuto) < 15*time.Minute {
		return
	}
	if _, err := creerSauvegarde(); err == nil {
		derniereAuto = time.Now()
	}
}

// ---------------------------------------------------------------------- API

// GET renvoie le carnet (ou un objet vide), PUT l'enregistre.
func carnet(w http.ResponseWriter, r *http.Request) {
	verrou.Lock()
	defer verrou.Unlock()
	chemin := cheminCarnet()
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	switch r.Method {
	case http.MethodGet:
		donnees, err := os.ReadFile(chemin)
		if os.IsNotExist(err) {
			_, _ = w.Write([]byte("{}"))
			return
		}
		if err != nil || !json.Valid(donnees) {
			http.Error(w, "lecture du carnet impossible", http.StatusInternalServerError)
			return
		}
		_, _ = w.Write(donnees)

	case http.MethodPut:
		corps, err := io.ReadAll(http.MaxBytesReader(w, r.Body, 16<<20))
		if err != nil {
			http.Error(w, "lecture impossible", http.StatusBadRequest)
			return
		}
		if !json.Valid(corps) {
			http.Error(w, "json invalide", http.StatusBadRequest)
			return
		}
		// Écriture par fichier temporaire puis renommage : une coupure de
		// courant ne peut pas laisser un carnet à moitié écrit.
		tmp := chemin + ".tmp"
		if err := os.WriteFile(tmp, corps, 0o644); err != nil {
			http.Error(w, "écriture impossible", http.StatusInternalServerError)
			return
		}
		if err := os.Rename(tmp, chemin); err != nil {
			http.Error(w, "remplacement impossible", http.StatusInternalServerError)
			return
		}
		sauvegardeAutomatique()
		_, _ = w.Write([]byte(`{"ok":true}`))

	default:
		w.Header().Set("Allow", "GET, PUT")
		http.Error(w, "méthode non permise", http.StatusMethodNotAllowed)
	}
}

func listeSauvegardes(w http.ResponseWriter, r *http.Request) {
	type item struct {
		Nom    string `json:"nom"`
		Date   string `json:"date"`
		Taille int64  `json:"taille"`
	}
	entrees, _ := os.ReadDir(dossierSauvegardes())
	out := []item{}
	for _, e := range entrees {
		if e.IsDir() || !strings.HasPrefix(e.Name(), "carnet-") {
			continue
		}
		info, err := e.Info()
		if err != nil {
			continue
		}
		out = append(out, item{
			Nom:    e.Name(),
			Date:   info.ModTime().Format("02/01/2006 15:04"),
			Taille: info.Size(),
		})
	}
	sort.Slice(out, func(i, j int) bool { return out[i].Nom > out[j].Nom })
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	_ = json.NewEncoder(w).Encode(out)
}

func sauvegarderMaintenant(w http.ResponseWriter, r *http.Request) {
	verrou.Lock()
	defer verrou.Unlock()
	nom, err := creerSauvegarde()
	if err != nil {
		http.Error(w, "rien à sauvegarder", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	_, _ = w.Write([]byte(`{"nom":"` + nom + `"}`))
}

func restaurer(w http.ResponseWriter, r *http.Request) {
	verrou.Lock()
	defer verrou.Unlock()
	var demande struct {
		Nom string `json:"nom"`
	}
	if json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<16)).Decode(&demande) != nil {
		http.Error(w, "demande illisible", http.StatusBadRequest)
		return
	}
	// On n'accepte qu'un nom de fichier simple : pas de chemin, pas de remontée.
	if demande.Nom == "" || demande.Nom != filepath.Base(demande.Nom) ||
		!strings.HasPrefix(demande.Nom, "carnet-") || !strings.HasSuffix(demande.Nom, ".json") {
		http.Error(w, "nom refusé", http.StatusBadRequest)
		return
	}
	donnees, err := os.ReadFile(filepath.Join(dossierSauvegardes(), demande.Nom))
	if err != nil || !json.Valid(donnees) {
		http.Error(w, "sauvegarde illisible", http.StatusBadRequest)
		return
	}
	tmp := cheminCarnet() + ".tmp"
	if os.WriteFile(tmp, donnees, 0o644) != nil || os.Rename(tmp, cheminCarnet()) != nil {
		http.Error(w, "restauration impossible", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	_, _ = w.Write(donnees)
}

// --------------------------------------------------------------------- départ

func main() {
	racine, err := fs.Sub(contenu, "web")
	if err != nil {
		log.Fatal(err)
	}

	ecoute, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		log.Fatal(err)
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/api/donnees", carnet)
	mux.HandleFunc("/api/sauvegardes", listeSauvegardes)
	mux.HandleFunc("/api/sauvegarder", sauvegarderMaintenant)
	mux.HandleFunc("/api/restaurer", restaurer)
	mux.Handle("/", http.FileServer(http.FS(racine)))
	go func() { _ = http.Serve(ecoute, mux) }()

	// Taille de repli, au cas où l'agrandissement échouerait.
	fenetre := webview2.NewWithOptions(webview2.WebViewOptions{
		Debug:     false,
		AutoFocus: true,
		WindowOptions: webview2.WindowOptions{
			Title:  "Grind Poker",
			Width:  1400,
			Height: 900,
			IconId: 2,
			Center: true,
		},
	})
	if fenetre == nil {
		log.Fatal("WebView2 introuvable : installez « Microsoft Edge WebView2 Runtime ».")
	}
	defer fenetre.Destroy()

	fenetre.Navigate("http://" + ecoute.Addr().String() + "/index.html")
	agrandir(fenetre.Window()) // plein écran : tout doit être visible d'un coup
	fenetre.Run()
}
