/*
 * js/parcours.js — Page « Choisir mon parcours » (parcours.html).
 * Affiche une carte par profil, construite depuis data/parcours.js.
 * Chaque carte mène à programme.html#<id du profil> et mémorise le choix (js/progression.js).
 * Dépend de : data/parcours.js, js/progression.js, js/commun.js.
 */
(function () {
  var el = FIA.el; // création d'élément, définie dans js/commun.js

  /* Affiche les cartes de profil. */
  function afficherProfils() {
    var zone = document.getElementById("profils");
    zone.textContent = "";
    FIA.data.parcours.forEach(function (p) {
      var carte = el("a", "profil");
      carte.href = "programme.html#" + p.id;
      var texte = el("span", "profil__texte");
      texte.appendChild(el("span", "profil__nom", p.label));
      texte.appendChild(el("span", "profil__accroche", p.accroche));
      carte.appendChild(texte);
      carte.insertAdjacentHTML("beforeend", FIA.icone("fleche"));
      carte.addEventListener("click", function () { FIA.progression.definirProfil(p.id); });
      zone.appendChild(carte);
    });
  }

  document.addEventListener("DOMContentLoaded", afficherProfils);
})();
