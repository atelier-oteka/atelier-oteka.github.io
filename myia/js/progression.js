/*
 * js/progression.js — Progression de l'utilisateur.
 * Lit et écrit une seule clé localStorage. Si le stockage est indisponible
 * (navigation privée, blocage), la progression reste en mémoire le temps de la visite.
 * À charger avant les scripts de page.
 */
window.FIA = window.FIA || {};

FIA.progression = (function () {
  var CLE = "myia.progression";
  var memoire = null; // copie de secours si localStorage est indisponible

  /* État de départ d'un nouvel utilisateur. */
  function etatVide() {
    return { profil: null, leconsTerminees: [], casTermines: [], scores: {} };
  }

  /* Retourne la progression enregistrée, ou un état vide. */
  function lire() {
    try {
      var brut = window.localStorage.getItem(CLE);
      if (brut) {
        var etat = JSON.parse(brut);
        if (etat && typeof etat === "object") { return Object.assign(etatVide(), etat); }
      }
    } catch (e) { /* stockage indisponible ou contenu illisible */ }
    return memoire || etatVide();
  }

  /* Enregistre la progression complète. */
  function ecrire(etat) {
    memoire = etat;
    try { window.localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) { /* on garde la copie mémoire */ }
  }

  /* Retourne l'identifiant du profil choisi, ou null. */
  function profil() { return lire().profil; }

  /* Enregistre le profil choisi. */
  function definirProfil(id) {
    var etat = lire();
    etat.profil = id;
    ecrire(etat);
  }

  /* Indique si une leçon est terminée. */
  function leconTerminee(id) { return lire().leconsTerminees.indexOf(id) !== -1; }

  /* Marque une leçon comme terminée (sans doublon). */
  function terminerLecon(id) {
    var etat = lire();
    if (etat.leconsTerminees.indexOf(id) === -1) { etat.leconsTerminees.push(id); ecrire(etat); }
  }

  /* Indique si un cas pratique est terminé. */
  function casTermine(id) { return lire().casTermines.indexOf(id) !== -1; }

  /* Marque un cas pratique comme terminé (sans doublon). */
  function terminerCas(id) {
    var etat = lire();
    if (etat.casTermines.indexOf(id) === -1) { etat.casTermines.push(id); ecrire(etat); }
  }

  /* Retourne le meilleur score enregistré pour un quiz, ou null s'il n'a jamais été fait. */
  function score(id) {
    var s = lire().scores[id];
    return typeof s === "number" ? s : null;
  }

  /* Enregistre un score de quiz s'il est meilleur que le précédent. */
  function enregistrerScore(id, valeur) {
    var etat = lire();
    if (typeof etat.scores[id] !== "number" || valeur > etat.scores[id]) { etat.scores[id] = valeur; ecrire(etat); }
  }

  /* Efface toute la progression (profil, leçons, cas, scores). */
  function reinitialiser() {
    memoire = null;
    try { window.localStorage.removeItem(CLE); } catch (e) { /* rien à effacer */ }
  }

  return { reinitialiser: reinitialiser, score: score, enregistrerScore: enregistrerScore, casTermine: casTermine, terminerCas: terminerCas, lire: lire, ecrire: ecrire, profil: profil, definirProfil: definirProfil, leconTerminee: leconTerminee, terminerLecon: terminerLecon };
})();
