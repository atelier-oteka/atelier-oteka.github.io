/*
 * js/programme.js — Page du programme d'un parcours (programme.html).
 * Le profil affiché vient de l'adresse (programme.html#debutant), sinon du profil
 * mémorisé (js/progression.js), sinon du premier parcours.
 * Affiche la présentation du parcours, la progression et tous ses modules.
 * Les leçons rédigées (data/lecons.js) sont des liens ; les autres sont marquées « Bientôt ».
 * Dépend de : data/parcours.js, data/lecons.js, js/progression.js, js/commun.js.
 */
(function () {
  var el = FIA.el; // création d'élément, définie dans js/commun.js

  /* Détermine le parcours à afficher : adresse, puis profil mémorisé, puis premier parcours. */
  function parcoursCourant() {
    var depuisAdresse = FIA.programme.parcours(window.location.hash.replace("#", ""));
    return depuisAdresse || FIA.programme.parcours(FIA.progression.profil()) || FIA.data.parcours[0];
  }

  /*
   * Construit la ligne d'une leçon : lien si elle est rédigée (avec coche si terminée),
   * sinon ligne inactive marquée « Bientôt ».
   */
  function ligneLecon(lecon) {
    var prete = FIA.programme.estPrete(lecon.id);
    var faite = FIA.progression.leconTerminee(lecon.id);
    var item = el("li");
    var ligne = el(prete ? "a" : "div", "programme__item" + (prete ? " programme__item--lien" : " programme__item--attente"));
    if (prete) { ligne.href = "lecon.html#" + lecon.id; }
    if (faite) {
      ligne.insertAdjacentHTML("beforeend", '<span class="programme__coche">' + FIA.icone("coche") + "</span>");
    } else {
      ligne.appendChild(el("span", "programme__puce"));
    }
    ligne.appendChild(el("span", "programme__titre", lecon.titre));
    ligne.appendChild(el("span", "programme__duree", prete ? (faite ? "Terminée" : "5 min") : "Bientôt"));
    item.appendChild(ligne);
    return item;
  }

  /* Construit le bloc d'un module : son titre et la liste de ses leçons. */
  function blocModule(numero, module, lecons) {
    var bloc = el("div");
    bloc.appendChild(el("p", "surtitre", "Module " + numero + " · " + module.titre));
    var liste = el("ul", "programme");
    lecons.forEach(function (lecon) { liste.appendChild(ligneLecon(lecon)); });
    bloc.appendChild(liste);
    return bloc;
  }

  /* Construit la barre de progression du parcours. */
  function blocProgression(lecons) {
    var faites = lecons.filter(function (l) { return FIA.progression.leconTerminee(l.id); }).length;
    var bloc = el("div", "avancement");
    var barre = el("div", "avancement__barre");
    var plein = el("div", "avancement__plein");
    plein.style.width = Math.round(100 * faites / lecons.length) + "%";
    barre.appendChild(plein);
    bloc.appendChild(barre);
    bloc.appendChild(el("p", "texte-doux texte-petit", faites + " leçon" + (faites > 1 ? "s" : "") + " terminée" + (faites > 1 ? "s" : "") + " sur " + lecons.length));
    return bloc;
  }

  /* Affiche la page : titre, présentation à gauche, programme complet à droite. */
  function afficher() {
    var p = parcoursCourant();
    FIA.progression.definirProfil(p.id);
    document.getElementById("titre-parcours").textContent = p.label;
    document.title = p.label + " — " + FIA.config.nomSite;

    var zone = document.getElementById("panneau-parcours");
    zone.textContent = "";

    var gauche = el("div", "panneau__texte");
    gauche.appendChild(el("p", "etiquette", p.niveau));
    gauche.appendChild(el("h2", "panneau__titre", p.titre));
    gauche.appendChild(el("p", "texte-doux", p.description));
    var lecons = FIA.programme.lecons(p);
    gauche.appendChild(blocProgression(lecons));

    /* Bouton de reprise : première leçon rédigée non terminée */
    var aFaire = lecons.filter(function (l) { return FIA.programme.estPrete(l.id) && !FIA.progression.leconTerminee(l.id); })[0];
    if (aFaire) {
      var dejaCommence = lecons.some(function (l) { return FIA.progression.leconTerminee(l.id); });
      var lien = el("a", "bouton bouton--principal", dejaCommence ? "Continuer" : "Commencer la première leçon");
      lien.href = "lecon.html#" + aFaire.id;
      gauche.appendChild(lien);
    } else {
      gauche.appendChild(el("p", "texte-doux", "Vous avez terminé toutes les leçons disponibles. La suite arrive bientôt."));
    }

    var droite = el("div", "panneau__programme");
    FIA.programme.modules(p).forEach(function (module, i) {
      droite.appendChild(blocModule(i + 1, module, lecons.filter(function (l) { return l.module === module; })));
    });

    zone.appendChild(gauche);
    zone.appendChild(droite);
  }

  document.addEventListener("DOMContentLoaded", afficher);
  window.addEventListener("hashchange", afficher);
})();
