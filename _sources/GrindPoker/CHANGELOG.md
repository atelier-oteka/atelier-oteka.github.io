# Historique des versions

Numérotation : `majeure.mineure.corrective`.
Majeure = changement de principe, mineure = nouveauté, corrective = correction.

## 1.0.1 — 2026-11-22

- Confirmation de la saisie après écriture du carnet et conservation des champs en cas d’échec.
- Réinitialisation du résultat entre deux tournois pour fiabiliser le taux de places payées.
- Mise en pause des chronos lorsque la table ou l’exercice est masqué.
- Vérification des tirages couleur et correction du scénario AQo face au 3-bet du bouton.
- Installateur Windows 64 bits avec reprise du carnet de la version 1.0.0.

## 1.0.0 — 2026-09-29

Première version installable.

- **Suivi de bankroll** pour les tournois Winamax :
  - paliers de buy-in automatiques : on monte à 100 buy-ins du niveau suivant, on redescend sous 80 buy-ins ;
  - alertes : plafond de session, séries de sessions perdantes ;
  - courbe de la bankroll ;
  - stats par tournoi, par horaire et par résultat, sur 7 jours, 30 jours ou depuis le début ;
  - modification des tournois et export CSV.
- **École** :
  - 12 cours, avec grilles de ranges cliquables, quiz, fiches mémo, quiz final et révision des erreurs ;
  - guide « Que faire ? » avant et après le flop : 120 situations préflop couvertes, en tenant compte de qui a relancé et de la taille du tapis adverse ;
  - exercices de théorie en nombre illimité.
- **Entraînement** sur une table 6-max réaliste, avec un chrono autour de ton siège (15, 10 ou 7 s) :
  - situations préflop et après le flop générées en nombre illimité ;
  - 30 coups complets, du préflop à la river ;
  - mode « Mes points faibles » et rejeu des erreurs.
- **Niveau du héros** :
  - score sur les 100 dernières décisions et 5 niveaux, de Débutant à Expert ;
  - évaluation en 20 décisions ;
  - courbe sur 14 jours et suivi de 20 thèmes.
- **Logiciel Windows** :
  - installateur sans droit administrateur, avec raccourcis sur le Bureau et dans le menu Démarrer, et désinstallation propre ;
  - données dans `%APPDATA%\GrindPoker\carnet.json` ;
  - sauvegardes datées, restaurables depuis le logiciel.
