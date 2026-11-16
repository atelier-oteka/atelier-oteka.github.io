/*
 * js/commun.js — Éléments partagés par toutes les pages.
 * - Configuration de l'application (nom, pages déjà en ligne).
 * - Logo, installation de l'application et fonctionnement hors ligne (sw.js).
 * - Jeu d'icônes SVG, injecté une seule fois.
 * - En-tête (menu) et pied de page, injectés dans #entete et #pied.
 * - Liens vers les pages pas encore construites : affichés « Bientôt », non cliquables.
 * - Outils partagés par les scripts de page : FIA.el, FIA.boutonCopier, FIA.blocPrompt, FIA.boutonChoix.
 */
window.FIA = window.FIA || {};

FIA.config = {
  nomSite: "Myia", // nom de l'application : à changer ici uniquement
  /* Pages déjà construites. Ajouter le fichier ici dès qu'une page est prête. */
  pagesPretes: ["index.html", "parcours.html", "programme.html", "lecon.html", "cas-pratiques.html", "cas.html", "prompts.html", "quiz.html", "outils.html", "progression.html", "a-propos.html"],
  menu: [
    { page: "index.html", label: "Accueil" },
    { page: "parcours.html", label: "Leçons" },
    { page: "cas-pratiques.html", label: "Cas pratiques" },
    { page: "prompts.html", label: "Prompts" },
    { page: "quiz.html", label: "Quiz" },
    { page: "outils.html", label: "Outils" },
    { page: "progression.html", label: "Ma progression" }
  ]
};

(function () {
  /* Tracés des icônes (viewBox 24x24, trait). */
  var ICONES = {
    fleche: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    coche: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>'
  };

  /* Logo de Myia (bulle de discussion avec une invite de saisie), dessiné dans une grille 96 x 96. */
  var LOGO =
    '<svg class="logo__image" viewBox="0 0 96 96" aria-hidden="true">' +
      '<rect width="96" height="96" rx="22" fill="#8B7CFF"/>' +
      '<path d="M26 22h44a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H46L32 76V64h-6a8 8 0 0 1-8-8V30a8 8 0 0 1 8-8z" fill="#0B1020"/>' +
      '<path d="M33 35l10 8-10 8M50 51h14" fill="none" stroke="#8B7CFF" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";

  /* Injecte le jeu d'icônes dans la page ; s'utilise avec <svg class="icone"><use href="#i-nom"></use></svg>. */
  function injecterIcones() {
    var symboles = Object.keys(ICONES).map(function (nom) {
      return '<symbol id="i-' + nom + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' + ICONES[nom] + "</symbol>";
    }).join("");
    var boite = document.createElement("div");
    boite.hidden = true;
    boite.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + symboles + "</svg>";
    document.body.insertBefore(boite, document.body.firstChild);
  }

  /* Retourne le HTML d'une icône. */
  function icone(nom) {
    return '<svg class="icone" aria-hidden="true"><use href="#i-' + nom + '"></use></svg>';
  }

  /* Indique si une page est déjà construite. */
  function pagePrete(page) {
    return FIA.config.pagesPretes.indexOf(page) !== -1;
  }

  /* Nom du fichier de la page affichée. */
  function pageCourante() {
    var nom = window.location.pathname.split("/").pop();
    return nom || "index.html";
  }

  /* Construit l'en-tête : logo, bouton de menu (téléphone) et liens. */
  function injecterEntete() {
    var cible = document.getElementById("entete");
    if (!cible) { return; }
    var liens = FIA.config.menu.map(function (item) {
      var courant = item.page === pageCourante() ? ' aria-current="page"' : "";
      return '<a class="menu__lien" data-page="' + item.page + '"' + courant + ">" + item.label + "</a>";
    }).join("");
    cible.innerHTML =
      '<header class="entete"><div class="conteneur entete__barre">' +
        '<a class="logo" href="index.html">' + LOGO + "<span>" + FIA.config.nomSite + "</span></a>" +
        '<button class="menu-bouton" type="button" aria-expanded="false" aria-controls="menu-principal">' + icone("menu") + "<span>Menu</span></button>" +
        '<nav class="menu" id="menu-principal" aria-label="Navigation principale">' + liens + "</nav>" +
      "</div></header>";

    var bouton = cible.querySelector(".menu-bouton");
    var menu = cible.querySelector(".menu");
    bouton.addEventListener("click", function () {
      var ouvert = bouton.getAttribute("aria-expanded") === "true";
      bouton.setAttribute("aria-expanded", ouvert ? "false" : "true");
      menu.classList.toggle("menu--ouvert", !ouvert);
    });
  }

  /* Construit le pied de page. */
  function injecterPied() {
    var cible = document.getElementById("pied");
    if (!cible) { return; }
    cible.innerHTML =
      '<footer class="pied"><div class="conteneur pied__barre">' +
        "<span>" + FIA.config.nomSite + " · Gratuit · Sans inscription</span>" +
        '<a class="pied__lien" data-page="a-propos.html">À propos</a>' +
      "</div></footer>";
  }

  /*
   * Active les liens a[data-page] : lien réel si la page existe,
   * sinon élément inactif marqué « Bientôt ». À rappeler après tout ajout de liens.
   */
  function activerLiens(racine) {
    var liens = (racine || document).querySelectorAll("a[data-page]");
    Array.prototype.forEach.call(liens, function (lien) {
      if (lien.getAttribute("data-lien-traite")) { return; }
      lien.setAttribute("data-lien-traite", "1");
      var page = lien.getAttribute("data-page");
      if (pagePrete(page)) {
        lien.setAttribute("href", page);
      } else {
        lien.classList.add("bientot");
        lien.setAttribute("aria-disabled", "true");
        var badge = document.createElement("span");
        badge.className = "bientot__badge";
        badge.textContent = "Bientôt";
        lien.appendChild(badge);
      }
    });
  }

  /* Crée un élément avec une classe et un texte facultatifs. */
  function el(balise, classe, texte) {
    var e = document.createElement(balise);
    if (classe) { e.className = classe; }
    if (texte !== undefined) { e.textContent = texte; }
    return e;
  }

  /* Bouton « Copier » : copie un texte et confirme sur le bouton. */
  function boutonCopier(texte) {
    var bouton = el("button", "bouton bouton--petit", "Copier");
    bouton.type = "button";
    bouton.addEventListener("click", function () {
      var fini = function (ok) {
        bouton.textContent = ok ? "Copié" : "Copie impossible";
        window.setTimeout(function () { bouton.textContent = "Copier"; }, 1800);
      };
      try { navigator.clipboard.writeText(texte).then(function () { fini(true); }, function () { fini(false); }); }
      catch (e) { fini(false); }
    });
    return bouton;
  }

  /* Bloc « prompt » : le texte du prompt et son bouton Copier. */
  function blocPrompt(texte) {
    var zone = el("div", "prompt");
    zone.appendChild(el("p", "prompt__texte", texte));
    zone.appendChild(boutonCopier(texte));
    return zone;
  }

  /* Bouton de réponse d'un quiz : lettre (A, B, C…) et texte. */
  function boutonChoix(rang, texte) {
    var bouton = el("button", "choix");
    bouton.type = "button";
    bouton.appendChild(el("span", "choix__lettre", "ABCD".charAt(rang)));
    bouton.appendChild(el("span", null, texte));
    return bouton;
  }

  FIA.boutonChoix = boutonChoix;
  FIA.el = el;
  FIA.boutonCopier = boutonCopier;
  FIA.blocPrompt = blocPrompt;
  FIA.icone = icone;
  FIA.activerLiens = activerLiens;

  /*
   * Installation : le navigateur signale quand l'application est installable ;
   * on affiche alors les boutons [data-installer] et on lance l'installation au clic.
   * (Sur iPhone, l'installation passe par le menu Partager : voir la page À propos.)
   */
  function activerInstallation() {
    var invite = null;
    window.addEventListener("beforeinstallprompt", function (evenement) {
      evenement.preventDefault();
      invite = evenement;
      Array.prototype.forEach.call(document.querySelectorAll("[data-installer]"), function (bouton) {
        bouton.hidden = false;
        bouton.addEventListener("click", function () {
          if (!invite) { return; }
          invite.prompt();
          invite = null;
          bouton.hidden = true;
        });
      });
    });
  }

  /*
   * Fonctionnement hors ligne : enregistre le service worker (sw.js).
   * Uniquement sur un site en https ou en local ; ignoré si le navigateur le refuse.
   */
  function activerHorsLigne() {
    var autorise = window.location.protocol === "https:" || window.location.hostname === "localhost";
    if (!autorise || !("serviceWorker" in navigator)) { return; }
    try { navigator.serviceWorker.register("sw.js").catch(function () {}); } catch (e) { /* refusé : le site fonctionne sans */ }
  }

  activerInstallation();
  activerHorsLigne();

  document.addEventListener("DOMContentLoaded", function () {
    injecterIcones();
    injecterEntete();
    injecterPied();
    activerLiens(document);
  });
})();
