/*
 * js/ma-progression.js — Page « Ma progression » (progression.html).
 * Affiche, pour le parcours choisi : les leçons terminées, les cas pratiques terminés
 * et le meilleur score de chaque quiz. Permet de tout remettre à zéro, après confirmation
 * dans la page (pas de boîte de dialogue du navigateur).
 * Dépend de : data/parcours.js, data/cas.js, data/quiz.js, js/progression.js, js/commun.js.
 */
(function () {
  var el = FIA.el; // création d'élément, définie dans js/commun.js

  /* Construit un bloc de suivi : titre, barre, décompte et lien vers la rubrique. */
  function blocSuivi(titre, faits, total, libelle, page, texteLien) {
    var bloc = el("section", "fiche");
    bloc.appendChild(el("h2", "fiche__titre", titre));
    var barre = el("div", "avancement__barre");
    var plein = el("div", "avancement__plein");
    plein.style.width = (total ? Math.round(100 * faits / total) : 0) + "%";
    barre.appendChild(plein);
    bloc.appendChild(barre);
    bloc.appendChild(el("p", "texte-doux", faits + " " + libelle + " sur " + total));
    var lien = el("a", "fiche__lien", texteLien);
    lien.href = page;
    bloc.appendChild(lien);
    return bloc;
  }

  /* Construit le bloc des quiz : une ligne par module, avec le meilleur score ou « Pas encore fait ». */
  function blocQuiz(parcours) {
    var bloc = el("section", "fiche");
    bloc.appendChild(el("h2", "fiche__titre", "Quiz"));
    var liste = el("ul", "scores");
    FIA.programme.modules(parcours).forEach(function (module) {
      var questions = FIA.data.quiz[module.id];
      if (!questions) { return; }
      var score = FIA.progression.score(module.id);
      var ligne = el("li", "scores__ligne");
      ligne.appendChild(el("span", null, module.titre));
      ligne.appendChild(el("strong", null, score === null ? "Pas encore fait" : score + " / " + questions.length));
      liste.appendChild(ligne);
    });
    bloc.appendChild(liste);
    var lien = el("a", "fiche__lien", "Faire un quiz");
    lien.href = "quiz.html";
    bloc.appendChild(lien);
    return bloc;
  }

  /* Construit la zone de remise à zéro : un bouton, puis une confirmation en deux boutons. */
  function blocRemiseAZero() {
    var bloc = el("section", "remise");
    var message = el("p", "texte-doux texte-petit", "La progression est enregistrée uniquement dans ce navigateur.");
    var demander = el("button", "bouton bouton--contour", "Remettre ma progression à zéro");
    demander.type = "button";
    var confirmation = el("div", "remise__confirmation");
    confirmation.hidden = true;
    confirmation.appendChild(el("p", null, "Effacer le profil choisi, les leçons et cas terminés et les scores ?"));
    var oui = el("button", "bouton bouton--principal", "Oui, tout effacer");
    oui.type = "button";
    var non = el("button", "bouton bouton--contour", "Annuler");
    non.type = "button";
    confirmation.appendChild(oui);
    confirmation.appendChild(non);

    demander.addEventListener("click", function () { demander.hidden = true; confirmation.hidden = false; non.focus(); });
    non.addEventListener("click", function () { confirmation.hidden = true; demander.hidden = false; demander.focus(); });
    oui.addEventListener("click", function () { FIA.progression.reinitialiser(); afficher(); });

    bloc.appendChild(message);
    bloc.appendChild(demander);
    bloc.appendChild(confirmation);
    return bloc;
  }

  /* Affiche la page entière à partir de la progression enregistrée. */
  function afficher() {
    var zone = document.getElementById("progression");
    zone.textContent = "";
    var parcours = FIA.programme.parcours(FIA.progression.profil());

    var tete = el("div", "section__tete");
    tete.appendChild(el("h1", "titre-2", "Ma progression"));
    zone.appendChild(tete);

    /* Aucun profil choisi : on invite à commencer */
    if (!parcours) {
      zone.appendChild(el("p", "texte-doux texte-grand", "Vous n'avez pas encore choisi de parcours."));
      var debut = el("a", "bouton bouton--principal", "Choisir mon parcours");
      debut.href = "parcours.html";
      zone.appendChild(debut);
      return;
    }

    tete.appendChild(el("p", "texte-doux texte-grand", "Parcours : " + parcours.label));

    var lecons = FIA.programme.lecons(parcours);
    var leconsFaites = lecons.filter(function (l) { return FIA.progression.leconTerminee(l.id); }).length;
    var cas = FIA.data.cas.filter(function (c) { return c.parcours === parcours.id; });
    var casFaits = cas.filter(function (c) { return FIA.progression.casTermine(c.id); }).length;

    var blocs = el("div", "fiches");
    blocs.appendChild(blocSuivi("Leçons", leconsFaites, lecons.length, leconsFaites > 1 ? "leçons terminées" : "leçon terminée", "programme.html", "Voir le programme"));
    blocs.appendChild(blocSuivi("Cas pratiques", casFaits, cas.length, casFaits > 1 ? "cas terminés" : "cas terminé", "cas-pratiques.html", "Voir les cas pratiques"));
    blocs.appendChild(blocQuiz(parcours));
    zone.appendChild(blocs);
    zone.appendChild(blocRemiseAZero());
  }

  document.addEventListener("DOMContentLoaded", afficher);
})();
