# Grind Poker

**Faire monter sa bankroll en tournois Winamax, en apprenant à décider juste et vite.** Format Monster Stack, 6 joueurs, petites limites (buy-in de 0,25 € au départ).

Trois outils dans une seule application :

- **Tournois et bankroll** : chaque tournoi est noté, la bankroll suit, et la limite autorisée se calcule toute seule. On monte d'un palier à 100 buy-ins du niveau suivant, on redescend sous 80 buy-ins du niveau actuel. Stats, courbe, alertes et export CSV.
- **École (la théorie)** :
  - 12 cours avec des grilles de ranges cliquables ;
  - le guide « Que faire ? » : ton tapis, ta position et ce qui s'est passé avant toi donnent l'action pour chaque main ;
  - des exercices illimités.
- **Entraînement (la pratique)** : une vraie table 6-max. Quand c'est à toi de parler, un chrono tourne autour de ton siège. L'objectif est de décider juste en moins de 10 secondes. Tes points faibles reviennent plus souvent, et ton niveau (de Débutant à Expert) se mesure sur tes 100 dernières décisions.

## Structure du projet

```
index.html      L'application entière : HTML + CSS + JS vanilla, sans dépendance
logo.svg        Logo (pique doré et courbe de bankroll sur tapis vert)
logo-512.png    Logo en 512 px, source de l'icône du .exe
grind-poker.png Capture de l'application (1600 × 900)
desktop/        Enveloppe Windows : application + API du carnet, moteur WebView2
  installateur/ Installateur : raccourcis, registre, désinstallation
CHANGELOG.md    Historique des versions
```

`index.html` est la **source unique**. La version en ligne (claude.ai), le navigateur et l'exécutable servent tous ce même fichier. Rien n'est dupliqué.

Une petite couche commune (`useCap`, en tête du script) choisit où ranger les données :

| Ouverture | Stockage |
|---|---|
| Logiciel Windows | fichier `%APPDATA%\GrindPoker\carnet.json`, via `/api/donnees`, avec des sauvegardes datées |
| claude.ai | base de données de l'artifact |
| Navigateur (fichier ouvert tel quel) | stockage local du navigateur |

## Les données

Le logiciel range tout dans un fichier : `%APPDATA%\GrindPoker\carnet.json`. Des copies datées sont prises dans `sauvegardes\`, au plus une par quart d'heure, et les vingt dernières sont gardées. N'importe quelle copie se restaure depuis l'onglet Tournois.

## Installation sur Windows 10 ou 11 (64 bits)

Fermer Grind Poker, puis lancer `GrindPoker-Installation-1.0.1.exe`. L’installateur place le programme dans le dossier utilisateur et crée les raccourcis du Bureau et du menu Démarrer. La version 1.0.1 reprend le carnet et les sauvegardes de la version 1.0.0. Le logiciel utilise Microsoft Edge WebView2 Runtime.

[Télécharger Grind Poker 1.0.1 pour Windows](https://atelier-oteka.github.io/telechargements/GrindPoker-Installation-1.0.1.exe)

Pour jouer dans le navigateur, ouvrir `index.html`. Les données de ce mode sont enregistrées dans le navigateur utilisé.

## Compiler l’installateur distribué

Le dossier `desktop/windows` contient l’application WinForms/WebView2 et la fabrication du paquet MSI embarqué dans le lanceur. La compilation utilise le compilateur C# du .NET Framework 4.x et `makecab.exe` sous Windows 64 bits.

Extraire le paquet NuGet `Microsoft.Web.WebView2` version `1.0.2903.40`. Depuis la racine des sources, dans PowerShell, adapter la première ligne au dossier extrait.

```powershell
$sdk = 'C:\SDK\Microsoft.Web.WebView2.1.0.2903.40'
.\desktop\windows\compiler.ps1 -WebView2Assemblies "$sdk\lib\net462" -WebView2Loader "$sdk\runtimes\win-x64\native\WebView2Loader.dll" -Sortie "$PWD\dist"
```

Le dossier `desktop` contient également l’ancienne enveloppe Go et son script de compilation.

## Limites

- Les ranges sont des approximations simplifiées pour les micro-limites, pas des solutions de solveur.
- Il faut 10 tournois pour obtenir les premiers conseils, et 200 à 300 pour que les stats soient fiables.

## Licence

Usage personnel et gratuit. Grind Poker aide à apprendre, il ne garantit aucun gain. Le poker reste un jeu d'argent : joue avec ce que tu peux perdre.

---

Fait par Franck — [L'Atelier d'Oteka](https://atelier-oteka.github.io/)
