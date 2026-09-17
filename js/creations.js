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
     version: "1.0.0",
     date: "2026-09-17",                    // format AAAA-MM-JJ
     plateforme: "Windows",                 // ex. "Windows", "Navigateur", "Android"
     taille: "12 Mo",
     image: "images/ma-creation.png",       // "" si pas d'image
     fichier: "telechargements/ma-creation.zip"  // ou un lien externe (https://…)
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
    description: "Optimiseur pour Windows 10 / 11 : un bouton « Tout optimiser » analyse le PC, applique les corrections sans risque et vérifie chacune. Réglages sauvegardés et annulables.",
    version: "1.0.0",
    date: "2026-09-17",
    plateforme: "Windows 10 / 11",
    taille: "296 Ko",
    image: "images/optimeo.png",
    fichier: "telechargements/Optimeo-Installation-1.0.0.exe"
  }
];
