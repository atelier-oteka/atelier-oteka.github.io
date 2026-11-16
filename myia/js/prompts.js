/*
 * js/prompts.js — Bibliothèque de prompts (prompts.html).
 * Rassemble les prompts de data/prompts.js et les prompts « À vous » des cas pratiques rédigés
 * (data/cas.js), puis les affiche par catégorie, avec une recherche par mot.
 * Une recherche non vide porte sur toutes les catégories.
 * Dépend de : data/prompts.js, data/cas.js, js/commun.js.
 */
(function () {
  var el = FIA.el; // création d'élément, définie dans js/commun.js
  var categorie = FIA.data.categoriesPrompts[0]; // catégorie affichée, ou null pour toutes
  var recherche = ""; // texte saisi, en minuscules

  /* Retourne tous les prompts : ceux de la bibliothèque, puis ceux des cas pratiques rédigés. */
  function tousLesPrompts() {
    var desCas = FIA.data.cas
      .filter(function (c) { return c.contenu && c.contenu.avous.categorie; })
      .map(function (c) {
        return { categorie: c.contenu.avous.categorie, titre: c.titre, usage: "Issu du cas pratique.", texte: c.contenu.avous.prompt, cas: c.id };
      });
    return FIA.data.prompts.concat(desCas);
  }

  /* Met un texte en minuscules sans accents, pour comparer sans tenir compte de la casse ni des accents. */
  function simplifier(texte) {
    return texte.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  /* Indique si un prompt correspond à la recherche ou, sans recherche, à la catégorie choisie. */
  function correspond(p) {
    if (recherche) { return simplifier(p.titre + " " + p.usage + " " + p.texte + " " + p.categorie).indexOf(recherche) !== -1; }
    return !categorie || p.categorie === categorie;
  }

  /* Affiche les boutons de catégorie : « Toutes » puis chaque catégorie. */
  function afficherCategories() {
    var zone = document.getElementById("categories");
    zone.textContent = "";
    [null].concat(FIA.data.categoriesPrompts).forEach(function (c) {
      var bouton = el("button", "filtre", c || "Toutes");
      bouton.type = "button";
      bouton.setAttribute("aria-pressed", !recherche && c === categorie ? "true" : "false");
      bouton.addEventListener("click", function () {
        categorie = c;
        recherche = "";
        document.getElementById("recherche").value = "";
        afficher();
      });
      zone.appendChild(bouton);
    });
  }

  /* Construit la fiche d'un prompt : titre, catégorie, usage, texte à copier. */
  function fichePrompt(p) {
    var fiche = el("li", "fiche");
    var tete = el("div", "fiche__tete");
    tete.appendChild(el("h2", "fiche__titre", p.titre));
    tete.appendChild(el("span", "etiquette", p.categorie));
    fiche.appendChild(tete);
    fiche.appendChild(el("p", "texte-doux", p.usage));
    fiche.appendChild(FIA.blocPrompt(p.texte));
    if (p.cas) {
      var lien = el("a", "fiche__lien", "Voir le cas pratique");
      lien.href = "cas.html#" + p.cas;
      fiche.appendChild(lien);
    }
    return fiche;
  }

  /* Affiche les catégories, le nombre de résultats et les fiches correspondantes. */
  function afficher() {
    afficherCategories();
    var resultats = tousLesPrompts().filter(correspond);
    var compteur = document.getElementById("compteur");
    compteur.textContent = resultats.length === 0
      ? "Aucun prompt ne correspond à cette recherche."
      : resultats.length + " prompt" + (resultats.length > 1 ? "s" : "");
    var liste = document.getElementById("liste-prompts");
    liste.textContent = "";
    resultats.forEach(function (p) { liste.appendChild(fichePrompt(p)); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("recherche").addEventListener("input", function (e) {
      recherche = simplifier(e.target.value.trim());
      afficher();
    });
    afficher();
  });
})();
