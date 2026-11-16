/*
 * js/outils.js — Comparatif d'outils (outils.html).
 * Affiche les outils de data/outils.js pour le besoin choisi (texte, image, vidéo, code),
 * avec le conseil du besoin et la date de dernière vérification.
 * Dépend de : data/outils.js, js/commun.js.
 */
(function () {
  var el = FIA.el; // création d'élément, définie dans js/commun.js
  var besoin = FIA.data.besoins[0]; // besoin affiché

  /* Affiche les boutons de besoin. */
  function afficherBesoins() {
    var zone = document.getElementById("besoins");
    zone.textContent = "";
    FIA.data.besoins.forEach(function (b) {
      var bouton = el("button", "filtre", b.label);
      bouton.type = "button";
      bouton.setAttribute("aria-pressed", b === besoin ? "true" : "false");
      bouton.addEventListener("click", function () { besoin = b; afficher(); });
      zone.appendChild(bouton);
    });
  }

  /* Construit une ligne « libellé : valeur » d'une fiche. */
  function ligne(libelle, valeur) {
    var p = el("p", "fiche__ligne");
    p.appendChild(el("span", "fiche__libelle", libelle));
    p.appendChild(el("span", null, valeur));
    return p;
  }

  /* Construit la fiche d'un outil : nom, éditeur, usage, offre gratuite, point à savoir, lien officiel. */
  function ficheOutil(o) {
    var fiche = el("li", "fiche");
    var tete = el("div", "fiche__tete");
    tete.appendChild(el("h2", "fiche__titre", o.nom));
    tete.appendChild(el("span", "etiquette", o.editeur));
    fiche.appendChild(tete);
    fiche.appendChild(el("p", null, o.usage));
    fiche.appendChild(ligne("Offre gratuite", o.gratuit));
    fiche.appendChild(ligne("À savoir", o.note));
    var lien = el("a", "fiche__lien", "Site officiel");
    lien.href = o.url;
    lien.target = "_blank";
    lien.rel = "noopener";
    fiche.appendChild(lien);
    return fiche;
  }

  /* Affiche les besoins, le conseil et les fiches du besoin choisi. */
  function afficher() {
    afficherBesoins();
    document.getElementById("conseil").textContent = besoin.conseil;
    var liste = document.getElementById("liste-outils");
    liste.textContent = "";
    FIA.data.outils.filter(function (o) { return o.besoin === besoin.id; })
      .forEach(function (o) { liste.appendChild(ficheOutil(o)); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("date-verification").textContent = FIA.data.outilsVerification;
    afficher();
  });
})();
