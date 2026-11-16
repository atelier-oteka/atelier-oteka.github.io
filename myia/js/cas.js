/*
 * js/cas.js — Page d'un cas pratique (cas.html).
 * Le cas affiché vient de l'adresse : cas.html#relance-facture.
 * Affiche la situation, l'objectif, les étapes (prompt + résultat), l'exercice « À vous »,
 * la liste de vérification, puis le bouton qui marque le cas comme terminé.
 * Dépend de : data/parcours.js, data/cas.js, js/progression.js, js/commun.js.
 */
(function () {
  var el = FIA.el; // création d'élément, définie dans js/commun.js

  /* Retourne le cas correspondant à un identifiant, ou null. */
  function trouverCas(id) {
    var liste = FIA.data.cas;
    for (var i = 0; i < liste.length; i++) { if (liste[i].id === id) { return liste[i]; } }
    return null;
  }

  /* Construit un bloc titre + paragraphe. */
  function blocTexte(titre, texte) {
    var section = el("section", "bloc");
    section.appendChild(el("h2", "titre-3", titre));
    section.appendChild(el("p", null, texte));
    return section;
  }

  /* Construit une étape numérotée : titre, prompt à copier, résultat obtenu. */
  function blocEtape(etape, numero) {
    var section = el("section", "etape-cas");
    var tete = el("h3", "etape-cas__titre");
    tete.appendChild(el("span", "etape-cas__numero", String(numero)));
    tete.appendChild(el("span", null, etape.titre));
    section.appendChild(tete);
    section.appendChild(FIA.blocPrompt(etape.prompt));
    var resultat = el("p", "etape-cas__resultat");
    resultat.appendChild(el("strong", null, "Ce que vous obtenez : "));
    resultat.appendChild(document.createTextNode(etape.resultat));
    section.appendChild(resultat);
    return section;
  }

  /* Affiche le cas demandé dans l'adresse. */
  function afficher() {
    var cas = trouverCas(window.location.hash.replace("#", ""));
    var zone = document.getElementById("cas");
    zone.textContent = "";
    window.scrollTo(0, 0);

    /* Cas inconnu ou pas encore rédigé */
    if (!cas || !cas.contenu) {
      zone.appendChild(el("h1", "titre-2", "Cas indisponible"));
      zone.appendChild(el("p", "texte-doux texte-grand", "Ce cas pratique n'est pas encore rédigé."));
      var retour = el("a", "bouton bouton--principal", "Voir les cas pratiques");
      retour.href = "cas-pratiques.html";
      zone.appendChild(retour);
      return;
    }

    var c = cas.contenu;
    var profil = FIA.programme.parcours(cas.parcours);
    document.title = cas.titre + " — " + FIA.config.nomSite;

    var tete = el("header", "lecon__tete");
    var etiquettes = el("div", "etiquettes");
    etiquettes.appendChild(el("span", "etiquette etiquette--bord", profil.label));
    etiquettes.appendChild(el("span", "etiquette etiquette--bord", "10 à 15 min"));
    var fait = el("span", "etiquette etiquette--bord etiquette--faite", "Terminé");
    fait.hidden = !FIA.progression.casTermine(cas.id);
    etiquettes.appendChild(fait);
    tete.appendChild(etiquettes);
    tete.appendChild(el("h1", "titre-2", cas.titre));
    zone.appendChild(tete);

    zone.appendChild(blocTexte("La situation", c.situation));
    zone.appendChild(blocTexte("L'objectif", c.objectif));

    var etapes = el("section", "bloc");
    etapes.appendChild(el("h2", "titre-3", "Pas à pas"));
    c.etapes.forEach(function (etape, i) { etapes.appendChild(blocEtape(etape, i + 1)); });
    zone.appendChild(etapes);

    var avous = el("section", "bloc bloc--avous");
    avous.appendChild(el("p", "surtitre", "À vous"));
    avous.appendChild(el("p", null, c.avous.consigne));
    avous.appendChild(FIA.blocPrompt(c.avous.prompt));
    zone.appendChild(avous);

    var verif = el("section", "bloc");
    verif.appendChild(el("h2", "titre-3", "Avant d'utiliser le résultat"));
    var liste = el("ul", "points");
    c.verification.forEach(function (t) { liste.appendChild(el("li", "points__item", t)); });
    verif.appendChild(liste);
    zone.appendChild(verif);

    /* Fin du cas : bouton « terminé », puis retour à la liste */
    var nav = el("nav", "lecon__nav");
    nav.setAttribute("aria-label", "Fin du cas");
    var liens = el("a", "bouton bouton--contour", "Tous les cas pratiques");
    liens.href = "cas-pratiques.html";
    var terminer = el("button", "bouton bouton--principal", FIA.progression.casTermine(cas.id) ? "Cas terminé" : "J'ai terminé ce cas");
    terminer.type = "button";
    terminer.addEventListener("click", function () {
      FIA.progression.terminerCas(cas.id);
      fait.hidden = false;
      terminer.textContent = "Cas terminé";
    });
    nav.appendChild(liens);
    nav.appendChild(terminer);
    zone.appendChild(nav);
  }

  document.addEventListener("DOMContentLoaded", afficher);
  window.addEventListener("hashchange", afficher);
})();
