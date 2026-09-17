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
     image: "images/ma-creation.png",       // "" si pas d'image
     fichier: "telechargements/ma-creation.zip", // ou un lien externe (https://…)
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
    titre: "Optimeo",
    type: "logiciel",
    description: "Rendez votre PC plus rapide en un clic. Optimeo analyse Windows, applique uniquement les réglages utiles et sans risque, puis vérifie que chaque correction a vraiment fonctionné. Tout est sauvegardé et annulable.",
    points: [
      "« Tout optimiser » : nettoyage, démarrage allégé, réglages jeux et confidentialité",
      "Mises à jour des logiciels, des pilotes et de Windows",
      "Liste des logiciels et jeux installés, avec désinstallation vérifiée",
      "Point de restauration créé avant chaque modification",
      "Aucune fausse astuce : ni nettoyage du registre, ni Defender désactivé"
    ],
    version: "1.0.0",
    date: "2026-09-17",
    plateforme: "Windows 10 / 11",
    taille: "296 Ko",
    image: "images/optimeo.png",
    fichier: "telechargements/Optimeo-Installation-1.0.0.exe",
    note: "Logiciel non signé : dans Chrome, cliquez « Conserver » puis « Conserver quand même ». À l'ouverture, Windows peut afficher « Windows a protégé votre ordinateur » : cliquez « Informations complémentaires » puis « Exécuter quand même »."
  }
];
