/*
 * js/quiz.js — Page Quiz (quiz.html).
 * - quiz.html          : liste des quiz du parcours (un par module), avec le meilleur score.
 * - quiz.html#<module> : le quiz du module, une question à la fois, puis le score.
 * Une seule réponse par question ; le meilleur score est mémorisé (js/progression.js).
 * Dépend de : data/parcours.js, data/quiz.js, js/progression.js, js/commun.js.
 */
(function () {
  var el = FIA.el; // création d'élément, définie dans js/commun.js
  var zone; // conteneur de la page

  /* Parcours suivi : le profil mémorisé, sinon le premier parcours. */
  function parcoursCourant() {
    return FIA.programme.parcours(FIA.progression.profil()) || FIA.data.parcours[0];
  }

  /* Retourne le module correspondant à un identifiant dans le parcours courant, ou null. */
  function trouverModule(id) {
    var modules = FIA.programme.modules(parcoursCourant());
    for (var i = 0; i < modules.length; i++) { if (modules[i].id === id) { return modules[i]; } }
    return null;
  }

  /* Affiche la liste des quiz : un par module, lien si le quiz est rédigé, sinon « Bientôt ». */
  function afficherListe() {
    document.title = "Quiz — " + FIA.config.nomSite;
    var tete = el("div", "section__tete");
    tete.appendChild(el("h1", "titre-2", "Quiz"));
    tete.appendChild(el("p", "texte-doux texte-grand", "Cinq questions par module pour vérifier vos acquis."));
    zone.appendChild(tete);

    var liste = el("ul", "programme");
    FIA.programme.modules(parcoursCourant()).forEach(function (module, i) {
      var questions = FIA.data.quiz[module.id];
      var score = FIA.progression.score(module.id);
      var item = el("li");
      var ligne = el(questions ? "a" : "div", "programme__item" + (questions ? " programme__item--lien" : " programme__item--attente"));
      if (questions) { ligne.href = "quiz.html#" + module.id; }
      ligne.appendChild(el("span", "programme__puce"));
      var texte = el("span", "programme__titre");
      texte.appendChild(el("span", null, module.titre));
      texte.appendChild(el("span", "programme__detail", "Module " + (i + 1)));
      ligne.appendChild(texte);
      var etat = !questions ? "Bientôt" : (score === null ? questions.length + " questions" : "Meilleur score : " + score + " / " + questions.length);
      ligne.appendChild(el("span", "programme__duree", etat));
      item.appendChild(ligne);
      liste.appendChild(item);
    });
    zone.appendChild(liste);
  }

  /* Déroule le quiz d'un module : une question à la fois, puis l'écran de score. */
  function afficherQuiz(module, questions) {
    document.title = "Quiz : " + module.titre + " — " + FIA.config.nomSite;
    var rang = 0;  // question en cours
    var score = 0; // bonnes réponses

    /* Affiche la question en cours. */
    function question() {
      var q = questions[rang];
      zone.textContent = "";
      window.scrollTo(0, 0);

      var avancement = el("div", "avancement");
      avancement.appendChild(el("p", "surtitre", module.titre + " · Question " + (rang + 1) + " sur " + questions.length));
      var barre = el("div", "avancement__barre");
      var plein = el("div", "avancement__plein");
      plein.style.width = Math.round(100 * rang / questions.length) + "%";
      barre.appendChild(plein);
      avancement.appendChild(barre);
      zone.appendChild(avancement);

      zone.appendChild(el("h1", "titre-3 quiz__question", q.question));
      var liste = el("div", "quiz__choix");
      var retour = el("div", "quiz__retour");
      retour.setAttribute("role", "status");
      var suite = el("button", "bouton bouton--principal", rang + 1 < questions.length ? "Question suivante" : "Voir mon score");
      suite.type = "button";
      suite.hidden = true;
      suite.addEventListener("click", function () {
        rang += 1;
        if (rang < questions.length) { question(); } else { resultat(); }
      });

      q.choix.forEach(function (texte, i) {
        var bouton = FIA.boutonChoix(i, texte);
        bouton.addEventListener("click", function () {
          /* Une seule réponse : on fige les choix et on montre la bonne réponse */
          Array.prototype.forEach.call(liste.children, function (b) { b.disabled = true; });
          liste.children[q.bonne].classList.add("choix--juste");
          var juste = i === q.bonne;
          if (juste) { score += 1; } else { bouton.classList.add("choix--faux"); }
          retour.className = "quiz__retour " + (juste ? "quiz__retour--juste" : "quiz__retour--faux");
          retour.appendChild(el("strong", null, juste ? "Bonne réponse. " : "Ce n'est pas ça. "));
          retour.appendChild(document.createTextNode(q.explication));
          suite.hidden = false;
          suite.focus();
        });
        liste.appendChild(bouton);
      });

      zone.appendChild(liste);
      zone.appendChild(retour);
      zone.appendChild(suite);
    }

    /* Affiche le score final et enregistre le meilleur score. */
    function resultat() {
      FIA.progression.enregistrerScore(module.id, score);
      zone.textContent = "";
      window.scrollTo(0, 0);
      var bloc = el("div", "score");
      bloc.appendChild(el("p", "surtitre", module.titre));
      bloc.appendChild(el("h1", "titre-1", score + " / " + questions.length));
      var message = score === questions.length ? "Sans faute : le module est acquis."
        : (score >= questions.length - 1 ? "Presque parfait : une seule erreur."
        : "Reprenez les leçons du module, puis refaites le quiz.");
      bloc.appendChild(el("p", "texte-doux texte-grand", message));
      var actions = el("div", "lecon__nav");
      var encore = el("button", "bouton bouton--contour", "Recommencer");
      encore.type = "button";
      encore.addEventListener("click", function () { rang = 0; score = 0; question(); });
      var programme = el("a", "bouton bouton--principal", "Retour au programme");
      programme.href = "programme.html";
      actions.appendChild(encore);
      actions.appendChild(programme);
      bloc.appendChild(actions);
      zone.appendChild(bloc);
    }

    question();
  }

  /* Affiche la liste ou le quiz demandé dans l'adresse. */
  function afficher() {
    zone = document.getElementById("quiz");
    zone.textContent = "";
    var id = window.location.hash.replace("#", "");
    var module = trouverModule(id);
    var questions = FIA.data.quiz[id];
    document.getElementById("retour-quiz").hidden = !(module && questions);
    if (module && questions) { afficherQuiz(module, questions); } else { afficherListe(); }
  }

  document.addEventListener("DOMContentLoaded", afficher);
  window.addEventListener("hashchange", afficher);
})();
