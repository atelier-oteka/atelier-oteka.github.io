# Site de téléchargement — Mes Créations

Site statique (HTML/CSS/JS, sans dépendance) pour proposer mes logiciels et jeux en téléchargement.

## Structure
```
site-creations/
├── index.html          Page unique du site
├── css/style.css       Styles (thème modifiable via les variables :root)
├── js/creations.js     DONNÉES : textes du site + liste des créations
├── js/app.js           Affichage, filtres, recherche
├── images/             Images des créations
└── telechargements/    Fichiers à télécharger
```

## Voir le site en local
Double-cliquer sur `index.html`.

## Ajouter une création
1. Copier le fichier (idéalement en `.zip`) dans `telechargements/`.
2. (Optionnel) Ajouter une image 16:9 dans `images/`.
3. Dans `js/creations.js`, copier le modèle dans le tableau `CREATIONS` et le remplir.

## Conseils
- Compresser les `.exe` en `.zip` : moins de blocages navigateur/antivirus.
- Windows SmartScreen affichera un avertissement pour un `.exe` non signé : c'est normal.
- Fichiers > 100 Mo : les héberger sur GitHub Releases (jusqu'à 2 Go) et mettre le lien dans `fichier`.
