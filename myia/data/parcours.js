/*
 * data/parcours.js — Programme du site (source unique).
 * Contient le module commun et les quatre parcours avec leurs modules et leçons.
 * Toute page qui affiche le programme lit ces données : ne jamais recopier
 * un titre de leçon ailleurs.
 * Identifiant d'une leçon = identifiant du module + "-" + son rang (ex. "bases-2").
 * En fin de fichier : FIA.programme, les fonctions de lecture du programme.
 */
window.FIA = window.FIA || {};
FIA.data = FIA.data || {};

/* Module suivi par tous les profils avant leur parcours. */
FIA.data.moduleCommun = {
  id: "bases",
  titre: "Les bases, sans jargon",
  lecons: [
    "C'est quoi, une IA générative ?",
    "Écrire un bon prompt",
    "Vérifier une réponse",
    "Les limites à connaître"
  ]
};

/* Les quatre parcours. L'ordre du tableau est l'ordre d'affichage. */
FIA.data.parcours = [
  {
    id: "debutant",
    label: "Grand débutant",
    accroche: "Je n'ai jamais utilisé l'IA",
    niveau: "Aucun prérequis",
    titre: "Les bases, puis vos premiers usages",
    description: "Comprendre ce qu'est une IA, écrire ses premières demandes et savoir quand se méfier d'une réponse.",
    modules: [
      { id: "debutant-m2", titre: "Premiers usages", lecons: ["Obtenir une explication claire", "Résumer un texte", "Rédiger et corriger un message", "Trouver des idées"] },
      { id: "debutant-m3", titre: "Aller plus loin", lecons: ["Donner un exemple à l'IA", "Améliorer une réponse en plusieurs échanges", "Protéger ses données personnelles"] }
    ]
  },
  {
    id: "pro",
    label: "Pro ou indépendant",
    accroche: "Je veux gagner du temps",
    niveau: "Usage au travail",
    titre: "L'IA au quotidien",
    description: "Mails, comptes rendus, recherche : déléguer les tâches répétitives et garder la main sur le résultat.",
    modules: [
      { id: "pro-m2", titre: "Écrire plus vite", lecons: ["Rédiger un mail en deux minutes", "Résumer un long document", "Préparer une réunion", "Rédiger un compte rendu"] },
      { id: "pro-m3", titre: "Organiser son travail", lecons: ["Adapter le ton d'un texte", "Analyser un tableau de chiffres", "Créer ses modèles de prompts réutilisables"] }
    ]
  },
  {
    id: "createur",
    label: "Créateur de contenu",
    accroche: "Vidéos, visuels, scripts",
    niveau: "Création",
    titre: "Produire plus vite, avec votre style",
    description: "Trouver des idées, écrire un script, créer des visuels, sans que tout se ressemble.",
    modules: [
      { id: "createur-m2", titre: "De l'idée à la publication", lecons: ["Trouver des idées de vidéos", "Écrire un script", "Créer une miniature", "Trouver un titre et une description"] },
      { id: "createur-m3", titre: "Aller plus loin", lecons: ["Générer une image à partir d'un texte", "Décliner un contenu sur plusieurs formats", "Garder son style d'une création à l'autre"] }
    ]
  },
  {
    id: "dev",
    label: "Développeur",
    accroche: "Code, API, automatisation",
    niveau: "Technique",
    titre: "Coder avec un assistant",
    description: "Écrire, relire et corriger du code avec l'IA, puis brancher un modèle dans vos propres projets.",
    modules: [
      { id: "dev-m2", titre: "Coder avec un assistant", lecons: ["Coder avec un assistant", "Lire et corriger du code", "Appeler une API d'IA", "Écrire des tests"] },
      { id: "dev-m3", titre: "Intégrer l'IA", lecons: ["Obtenir une réponse structurée en JSON", "Relire du code avant de le publier", "Automatiser une tâche répétitive"] }
    ]
  }
];

/* ---------- Fonctions de lecture du programme ---------- */
FIA.programme = (function () {
  /* Retourne le parcours correspondant à un identifiant, ou null. */
  function parcours(id) {
    var liste = FIA.data.parcours;
    for (var i = 0; i < liste.length; i++) { if (liste[i].id === id) { return liste[i]; } }
    return null;
  }

  /* Retourne les modules d'un parcours dans l'ordre : module commun, puis modules du parcours. */
  function modules(p) {
    return [FIA.data.moduleCommun].concat(p.modules);
  }

  /* Retourne toutes les leçons d'un parcours, dans l'ordre, avec leur identifiant et leur place. */
  function lecons(p) {
    var resultat = [];
    modules(p).forEach(function (module, m) {
      module.lecons.forEach(function (titre, i) {
        resultat.push({ id: module.id + "-" + (i + 1), titre: titre, module: module, numeroModule: m + 1, numero: i + 1, total: module.lecons.length });
      });
    });
    return resultat;
  }

  /* Indique si le contenu d'une leçon est rédigé (présent dans data/lecons.js). */
  function estPrete(id) {
    return !!(FIA.data.lecons && FIA.data.lecons[id]);
  }

  return { parcours: parcours, modules: modules, lecons: lecons, estPrete: estPrete };
})();
