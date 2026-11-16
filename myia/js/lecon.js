/*
 * js/lecon.js — Page de leçon (lecon.html).
 * La leçon affichée vient de l'adresse : lecon.html#bases-2.
 * Affiche le contenu (data/lecons.js), le quiz, puis les liens leçon précédente / suivante.
 * Une bonne réponse au quiz marque la leçon comme terminée (js/progression.js).
 * Dépend de : data/parcours.js, data/lecons.js, js/progression.js, js/commun.js.
 */
(function () {
  var el = FIA.el; // création d'élément, définie dans js/commun.js

  /* Parcours suivi : le profil mémorisé, sinon le premier parcours. */
  function parcoursCourant() {
    return FIA.programme.parcours(FIA.progression.profil()) || FIA.data.parcours[0];
  }

  /* Construit un bloc de contenu selon son type (voir data/lecons.js). */
  function construireBloc(bloc) {
    var section = el("section", "bloc");
    if (bloc.type === "avous") {
      section.className = "bloc bloc--avous";
      section.appendChild(el("p", "surtitre", "À vous"));
      section.appendChild(el("p", null, bloc.consigne));
      section.appendChild(FIA.blocPrompt(bloc.prompt));
      return section;
    }
    section.appendChild(el("h2", "titre-3", bloc.titre));
    if (bloc.type === "texte") {
      bloc.paragraphes.forEach(function (t) { section.appendChild(el("p", null, t)); });
    } else if (bloc.type === "liste") {
      var liste = el("ul", "points");
      bloc.points.forEach(function (t) { liste.appendChild(el("li", "points__item", t)); });
      section.appendChild(liste);
    } else if (bloc.type === "comparaison") {
      var avant = el("div", "encart");
      avant.appendChild(el("p", "surtitre surtitre--doux", "Trop vague"));
      avant.appendChild(el("p", "prompt__texte", bloc.avant));
      var apres = el("div", "encart encart--accent");
      apres.appendChild(el("p", "surtitre", "Précis"));
      apres.appendChild(el("p", "prompt__texte", bloc.apres));
      section.appendChild(avant);
      section.appendChild(apres);
      section.appendChild(el("p", "texte-doux", bloc.note));
    }
    return section;
  }

  /* Construit le quiz : une question, des choix, un retour après chaque réponse. */
  function construireQuiz(id, quiz, apresReussite) {
    var section = el("section", "quiz");
    section.appendChild(el("p", "surtitre", "Quiz de la leçon"));
    section.appendChild(el("h2", "titre-3", quiz.question));
    var liste = el("div", "quiz__choix");
    var retour = el("div", "quiz__retour");
    retour.setAttribute("role", "status");

    quiz.choix.forEach(function (texte, rang) {
      var bouton = FIA.boutonChoix(rang, texte);
      bouton.addEventListener("click", function () {
        Array.prototype.forEach.call(liste.children, function (b) { b.classList.remove("choix--juste", "choix--faux"); });
        retour.textContent = "";
        if (rang === quiz.bonne) {
          bouton.classList.add("choix--juste");
          retour.className = "quiz__retour quiz__retour--juste";
          retour.appendChild(el("strong", null, "Bonne réponse. "));
          retour.appendChild(document.createTextNode(quiz.explication));
          FIA.progression.terminerLecon(id);
          apresReussite();
        } else {
          bouton.classList.add("choix--faux");
          retour.className = "quiz__retour quiz__retour--faux";
          retour.appendChild(el("strong", null, "Pas tout à fait. "));
          retour.appendChild(document.createTextNode("Essayez une autre réponse."));
        }
      });
      liste.appendChild(bouton);
    });

    section.appendChild(liste);
    section.appendChild(retour);
    return section;
  }

  /* Construit un lien de navigation vers une leçon, ou null si elle n'est pas rédigée. */
  function lienLecon(lecon, classe, prefixe) {
    if (!lecon || !FIA.programme.estPrete(lecon.id)) { return null; }
    var lien = el("a", "bouton " + classe, prefixe + lecon.titre);
    lien.href = "lecon.html#" + lecon.id;
    return lien;
  }

  /* Affiche la leçon demandée dans l'adresse. */
  function afficher() {
    var id = window.location.hash.replace("#", "");
    var suite = FIA.programme.lecons(parcoursCourant());
    var rang = -1;
    suite.forEach(function (l, i) { if (l.id === id) { rang = i; } });
    var zone = document.getElementById("lecon");
    zone.textContent = "";
    window.scrollTo(0, 0);

    /* Leçon inconnue ou pas encore rédigée */
    if (rang === -1 || !FIA.programme.estPrete(id)) {
      zone.appendChild(el("h1", "titre-2", "Leçon indisponible"));
      zone.appendChild(el("p", "texte-doux texte-grand", "Cette leçon n'est pas encore rédigée."));
      var retour = el("a", "bouton bouton--principal", "Voir le programme");
      retour.href = "programme.html";
      zone.appendChild(retour);
      return;
    }

    var info = suite[rang];
    var contenu = FIA.data.lecons[id];
    document.title = info.titre + " — " + FIA.config.nomSite;

    var tete = el("header", "lecon__tete");
    var etiquettes = el("div", "etiquettes");
    etiquettes.appendChild(el("span", "etiquette etiquette--bord", "Module " + info.numeroModule + " · Leçon " + info.numero + " sur " + info.total));
    etiquettes.appendChild(el("span", "etiquette etiquette--bord", "5 min"));
    var faite = el("span", "etiquette etiquette--bord etiquette--faite", "Terminée");
    faite.hidden = !FIA.progression.leconTerminee(id);
    etiquettes.appendChild(faite);
    tete.appendChild(etiquettes);
    tete.appendChild(el("h1", "titre-2", info.titre));
    tete.appendChild(el("p", "texte-doux texte-grand", contenu.intro));
    zone.appendChild(tete);

    contenu.blocs.forEach(function (bloc) { zone.appendChild(construireBloc(bloc)); });

    /* Navigation : leçon précédente, leçon suivante (ou retour au programme en fin de contenu) */
    var nav = el("nav", "lecon__nav");
    nav.setAttribute("aria-label", "Leçons voisines");
    var precedente = lienLecon(suite[rang - 1], "bouton--contour", "Précédente : ");
    var suivante = lienLecon(suite[rang + 1], "bouton--principal", "Suivante : ");
    if (!suivante) {
      suivante = el("a", "bouton bouton--principal", "Retour au programme");
      suivante.href = "programme.html";
    }
    if (precedente) { nav.appendChild(precedente); }
    nav.appendChild(suivante);

    zone.appendChild(construireQuiz(id, contenu.quiz, function () { faite.hidden = false; }));
    zone.appendChild(nav);
  }

  document.addEventListener("DOMContentLoaded", afficher);
  window.addEventListener("hashchange", afficher);
})();
