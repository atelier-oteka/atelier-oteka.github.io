/*
 * js/cas-pratiques.js — Liste des cas pratiques (cas-pratiques.html).
 * Affiche les cas de data/cas.js, avec un filtre par profil.
 * Le filtre de départ est le profil mémorisé (js/progression.js), sinon « Tous ».
 * Un cas rédigé est un lien vers cas.html#<id> ; les autres sont marqués « Bientôt ».
 * Dépend de : data/parcours.js, data/cas.js, js/progression.js, js/commun.js.
 */
(function () {
  var el = FIA.el; // création d'élément, définie dans js/commun.js
  var filtre = null; // identifiant du profil affiché, ou null pour tous

  /* Affiche les boutons de filtre : « Tous » puis un bouton par profil. */
  function afficherFiltres() {
    var zone = document.getElementById("filtres");
    zone.textContent = "";
    var choix = [{ id: null, label: "Tous" }].concat(FIA.data.parcours);
    choix.forEach(function (c) {
      var bouton = el("button", "filtre", c.label);
      bouton.type = "button";
      bouton.setAttribute("aria-pressed", c.id === filtre ? "true" : "false");
      bouton.addEventListener("click", function () { filtre = c.id; afficher(); });
      zone.appendChild(bouton);
    });
  }

  /* Construit la ligne d'un cas : lien s'il est rédigé, sinon ligne inactive « Bientôt ». */
  function ligneCas(cas) {
    var pret = !!cas.contenu;
    var fait = FIA.progression.casTermine(cas.id);
    var item = el("li");
    var ligne = el(pret ? "a" : "div", "programme__item" + (pret ? " programme__item--lien" : " programme__item--attente"));
    if (pret) { ligne.href = "cas.html#" + cas.id; }
    if (fait) {
      ligne.insertAdjacentHTML("beforeend", '<span class="programme__coche">' + FIA.icone("coche") + "</span>");
    } else {
      ligne.appendChild(el("span", "programme__puce"));
    }
    var texte = el("span", "programme__titre");
    texte.appendChild(el("span", null, cas.titre));
    texte.appendChild(el("span", "programme__detail", cas.produit));
    ligne.appendChild(texte);
    ligne.appendChild(el("span", "programme__duree", pret ? (fait ? "Terminé" : "10 à 15 min") : "Bientôt"));
    item.appendChild(ligne);
    return item;
  }

  /* Affiche les filtres et la liste des cas correspondants (cas rédigés en premier). */
  function afficher() {
    afficherFiltres();
    var liste = document.getElementById("liste-cas");
    liste.textContent = "";
    var cas = FIA.data.cas.filter(function (c) { return !filtre || c.parcours === filtre; });
    cas.filter(function (c) { return c.contenu; }).concat(cas.filter(function (c) { return !c.contenu; }))
      .forEach(function (c) { liste.appendChild(ligneCas(c)); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    filtre = FIA.programme.parcours(FIA.progression.profil()) ? FIA.progression.profil() : null;
    afficher();
  });
})();
