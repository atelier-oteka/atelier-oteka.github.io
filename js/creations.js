/* ==========================================================================
   creations.js — DONNÉES DU SITE (seul fichier à modifier au quotidien).

   1) SITE : textes généraux (nom, titre, description, à propos, auteur).
   2) CREATIONS : liste des logiciels et jeux affichés.

   Pour ajouter une création :
     - placer le fichier à télécharger dans le dossier  telechargements/
     - (optionnel) placer une image 16:9 dans le dossier images/
     - copier le modèle ci-dessous dans le tableau CREATIONS et le remplir.

   Modèle d'une création :
   {
     titre: "Nom de la création",
     type: "logiciel",                      // "logiciel" ou "jeu"
     description: "Courte description.",
     points: ["Point fort 1", "Point fort 2"], // optionnel : liste de points forts
     version: "1.0.0",
     date: "2026-09-17",                    // format AAAA-MM-JJ
     plateforme: "Windows",                 // ex. "Windows", "Navigateur", "Android"
     taille: "12 Mo",
     image: "images/ma-creation.png?v=2026-09-20", // "" si pas d'image ;
                                            // le ?v= evite qu'un navigateur ressorte
                                            // une ancienne image gardee en cache
     fichier: "telechargements/ma-creation.zip", // ou un lien externe (https://…)
     historique: [                          // optionnel : versions, la plus récente EN PREMIER
       { version: "1.1.0", date: "2026-10-01", changements: ["Nouveauté 1", "Correction 2"] },
       { version: "1.0.0", date: "2026-09-17", changements: ["Première version"] }
     ],
     note: ""                               // optionnel : message affiché sous le bouton
   },
   ========================================================================== */

const SITE = {
  nom: "L'Atelier d'Oteka",
  titre: "Mes logiciels et jeux",
  description: "Téléchargez gratuitement mes créations.",
  apropos: "Je crée des logiciels et des jeux sur mon temps libre.",
  auteur: "Franck"
};

const CREATIONS = [
  {
    titre: "Mainscope",
    type: "logiciel",
    description: "Assistant de décision au Texas Hold'em, pour débutants. Vous donnez votre position, la profondeur de votre tapis et vos deux cartes : Mainscope répond par un seul ordre, ouvrir, se coucher, tapis, miser ou checker. Rien à calculer, aucun montant à saisir.",
    points: [
      "Vrai installateur : raccourci sur le Bureau, désinstallation propre",
      "Carnet : bankroll, historique des tournois, ROI et buy-in conseillé",
      "Sauvegardes datées de votre carnet, restaurables en un clic",
      "Deux modes : réduit pour jouer vite, complet pour analyser juste",
      "Les 66 niveaux du Monster Stack Winamax embarqués : vos BB et votre M sont calculés",
      "24 tableaux d'ouverture : 6 positions × 4 paliers de tapis, réglés en grosses blindes",
      "Tableaux de réaction quand quelqu'un a déjà misé : relancer ou suivre",
      "À 15 BB et moins, l'ordre devient tapis ou fold",
      "Tient compte du tapis moyen du tournoi, lu sur la table",
      "Après le flop : vos chances réelles contre le nombre d'adversaires indiqué",
      "Vous dit quand vous n'avez rien de plus que le tableau",
      "Tableau des mains 13 × 13, avec votre main entourée",
      "Évaluateur exact, vérifié sur les équités de référence connues",
      "Aucune installation, aucune connexion : un seul fichier à lancer"
    ],
    version: "2.1.0",
    date: "2026-09-20",
    plateforme: "Windows 10 / 11",
    taille: "8,2 Mo",
    image: "images/mainscope-1.0.0.png",
    fichier: "telechargements/Mainscope-Installation-2.1.0.exe",
    historique: [
      { version: "2.1.0", date: "2026-09-20", changements: [
        "Les couleurs se choisissent : un clic sur une carte de votre main fait tourner son enseigne, les deux cartes suivent ensemble sur une main assortie",
        "Le tapis moyen du tournoi se lit sur la table et se saisit en jetons, au lieu d'être estimé de travers",
        "Le champ Entrants disparaît : le nombre de joueurs restants suffit"
      ] },
      { version: "2.0.0", date: "2026-09-20", changements: [
        "Vrai installateur Windows : raccourci sur le Bureau et dans le menu Démarrer, désinstallation propre",
        "Carnet de tournoi : bankroll, historique, ROI, part de tournois dans les places, buy-in conseillé",
        "Sauvegardes datées du carnet dans un fichier, restaurables depuis le logiciel",
        "La bulle entre dans le calcul : la prime de survie monte à l'approche des places payées",
        "Barre d'état permanente et ouverture en plein écran"
      ] },
      { version: "1.4.0", date: "2026-09-20", changements: [
        "Les 66 niveaux du Monster Stack Winamax sont embarqués, blindes et antes",
        "Votre tapis en grosses blindes est calculé : niveau + jetons, plus d'estimation",
        "Votre M s'affiche : combien d'orbites vous pouvez encore laisser passer",
        "Tapis moyen calculé à partir des entrants et des joueurs restants",
        "La re-entry entre dans le calcul tant que l'enregistrement tardif court"
      ] },
      { version: "1.3.0", date: "2026-09-20", changements: [
        "Mode réduit : trois réglages seulement pour rester jouable en direct",
        "Ce qui n'est plus demandé est supposé, et affiché à l'écran : aucune hypothèse cachée",
        "Marge de prudence sur les seuils du mode réduit, et avertissement dans les cas limites",
        "Bascule d'un mode à l'autre à tout moment, sans perdre ses réglages"
      ] },
      { version: "1.2.0", date: "2026-09-20", changements: [
        "Le tapis se règle en grosses blindes, de 6 à 100+, au lieu de trois paliers",
        "Un quatrième tableau, plus large, quand le tapis est à bout de course",
        "Tapis ou fold à 15 BB et moins ; entre 11 et 15 BB, suivre reste suivre",
        "Nouveau réglage : votre tapis face au tapis moyen du tournoi",
        "Prime de survie progressive selon le nombre de blindes restantes"
      ] },
      { version: "1.1.0", date: "2026-09-20", changements: [
        "Une paire au tableau n'est plus annoncée comme la vôtre",
        "L'équité correspond à votre situation : vous indiquez le nombre d'adversaires",
        "Plus d'action impossible : un réglage distingue ouverture, mise et relance",
        "Tableaux de réaction, position BB, et tapis après le flop à tapis court",
        "Précision triplée : 60 000 tirages, erreur type d'environ 0,2 point"
      ] },
      { version: "1.0.0", date: "2026-09-20", changements: [
        "Première version : verdict préflop par tableau, verdict postflop par simulation",
        "15 tableaux d'ouverture selon la position et la profondeur de tapis",
        "Prime de survie : les seuils montent quand le tapis baisse",
        "Tableau des mains 13 × 13 et nom de la main en clair"
      ] }
    ],
    note: "Conçu pour le tournoi 6 joueurs, format Monster Stack, en petites limites. L'installateur ne demande aucun droit administrateur et conserve vos données en cas de désinstallation. Logiciel non signé : dans Chrome, cliquez \u00ab Conserver \u00bb puis \u00ab Conserver quand meme \u00bb. À l'ouverture, Windows peut afficher \u00ab Windows a protégé votre ordinateur \u00bb : cliquez \u00ab Informations complementaires \u00bb puis \u00ab Executer quand meme \u00bb. Mainscope aide à décider, il ne garantit aucun gain."
  },
  {
    titre: "Fluidoscope",
    type: "logiciel",
    description: "Comparateur visuel de fluidité. Il montre côte à côte, en animation, la différence réelle entre 24, 30, 60, 90, 120, 144, 165 et 240 FPS. Chaque piste affiche la même scène, mais à sa propre cadence.",
    points: [
      "3 scènes : panoramique, rotation et visée",
      "Ralenti ×0,1 et traces pour voir le saut entre deux images",
      "Simulation de saccades, pour comprendre le 1 % low",
      "Temps par image, déplacement et ruban des images présentées",
      "Aucune installation, aucune connexion : un seul fichier à lancer"
    ],
    version: "1.0.0",
    date: "2026-09-18",
    plateforme: "Windows 10 / 11",
    taille: "14 Mo",
    image: "images/fluidoscope.png",
    fichier: "telechargements/Fluidoscope-1.0.0.exe",
    historique: [
      { version: "1.0.0", date: "2026-09-18", changements: [
        "Première version : 8 tranches de 24 à 240 FPS",
        "Scènes Panoramique, Rotation et Visée",
        "Traces, ralenti ×0,1, saccades simulées et ruban d'images",
        "Mesure de la fréquence de l'écran au démarrage"
      ] }
    ],
    note: "Le rendu passe par WebView2, déjà présent sur Windows 10 et 11. Logiciel non signé : dans Chrome, cliquez « Conserver » puis « Conserver quand même », et « Exécuter quand même » si Windows affiche un avertissement."
  },
  {
    titre: "Optimeo",
    type: "logiciel",
    description: "Rendez votre PC plus rapide en un clic. Optimeo analyse Windows, applique uniquement les réglages utiles et sans risque, puis vérifie que chaque correction a vraiment fonctionné. Tout est sauvegardé et annulable.",
    points: [
      "Tableau de bord : note de santé du PC, gains possibles, matériel et recommandations",
      "« Tout optimiser » : nettoyage, démarrage allégé, réglages jeux et confidentialité",
      "Mises à jour des logiciels, des pilotes et de Windows",
      "Liste des logiciels et jeux installés, avec désinstallation vérifiée",
      "Point de restauration créé avant chaque modification",
      "Aucune fausse astuce : ni nettoyage du registre, ni Defender désactivé"
    ],
    version: "1.1.1",
    date: "2026-09-17",
    plateforme: "Windows 10 / 11",
    taille: "305 Ko",
    image: "images/optimeo.png",
    fichier: "telechargements/Optimeo-Installation-1.1.1.exe",
    historique: [
      { version: "1.1.1", date: "2026-09-17", changements: [
        "Correction d'une erreur au lancement lors de l'analyse automatique du tableau de bord"
      ] },
      { version: "1.1.0", date: "2026-09-17", changements: [
        "Nouvelle interface : menu latéral avec icônes et compteurs",
        "Tableau de bord : note de santé, gains possibles, matériel et recommandations, avec analyse au lancement",
        "Pastilles d'état colorées, icônes de catégorie et listes plus lisibles",
        "Recherche et listes déroulantes en thème sombre, messages pour les pages vides"
      ] },
      { version: "1.0.0", date: "2026-09-17", changements: [
        "Première version : Tout optimiser avec vérification, rapport, mises à jour, logiciels et jeux, installateur"
      ] }
    ],
    note: "Logiciel non signé : dans Chrome, cliquez « Conserver » puis « Conserver quand même ». À l'ouverture, Windows peut afficher « Windows a protégé votre ordinateur » : cliquez « Informations complémentaires » puis « Exécuter quand même »."
  }
];
