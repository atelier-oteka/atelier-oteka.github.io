/*
 * data/lecons.js — Contenu rédigé des leçons.
 * Une entrée par leçon, rangée par identifiant (voir data/parcours.js pour les titres et l'ordre).
 * Une leçon absente de ce fichier s'affiche « Bientôt » dans le programme.
 *
 * Forme d'une leçon :
 *   intro  : phrase d'introduction
 *   blocs  : suite de blocs, chacun d'un type :
 *     { type: "texte", titre, paragraphes: [] }
 *     { type: "liste", titre, points: [] }
 *     { type: "comparaison", titre, avant, apres, note }   prompt vague / prompt précis
 *     { type: "avous", consigne, prompt }                   exercice avec prompt à copier
 *   quiz   : { question, choix: [], bonne: rang de la bonne réponse (0 = premier), explication }
 */
window.FIA = window.FIA || {};
FIA.data = FIA.data || {};

FIA.data.lecons = {

  "bases-1": {
    intro: "Une IA générative est un programme qui produit du texte, des images ou du code à partir d'une demande écrite en langage courant.",
    blocs: [
      { type: "texte", titre: "Comment ça marche", paragraphes: [
        "Elle a été entraînée sur une très grande quantité de textes. À partir de votre demande, elle calcule la suite de mots la plus probable, un mot après l'autre.",
        "Elle ne réfléchit pas comme une personne et ne consulte pas une base de faits vérifiés : elle rédige ce qui ressemble à une bonne réponse."
      ] },
      { type: "liste", titre: "Ce qu'elle fait bien", points: [
        "Rédiger, reformuler et résumer.",
        "Expliquer un sujet avec des mots simples.",
        "Proposer des idées et des plans.",
        "Traduire et corriger un texte."
      ] },
      { type: "liste", titre: "À retenir", points: [
        "Elle peut se tromper tout en ayant l'air sûre d'elle.",
        "La qualité de la réponse dépend de la précision de votre demande.",
        "Vous restez responsable de ce que vous faites de la réponse."
      ] },
      { type: "avous", consigne: "Ouvrez l'assistant IA de votre choix et envoyez-lui cette demande.", prompt: "Explique-moi ce qu'est une IA générative comme si j'avais 12 ans, en cinq phrases." }
    ],
    quiz: {
      question: "Comment une IA générative produit-elle sa réponse ?",
      choix: [
        "Elle recopie une réponse trouvée dans une encyclopédie.",
        "Elle calcule, mot après mot, la suite la plus probable.",
        "Elle transmet la question à une personne qui répond."
      ],
      bonne: 1,
      explication: "Une IA générative rédige en prédisant les mots les plus probables. C'est pour cela qu'elle écrit bien, et aussi qu'elle peut se tromper."
    }
  },

  "bases-2": {
    intro: "Un prompt est la demande que vous écrivez à l'IA. Plus elle est précise, plus la réponse est utile.",
    blocs: [
      { type: "liste", titre: "Les trois éléments à donner", points: [
        "Le contexte : qui vous êtes et à qui s'adresse le résultat.",
        "La tâche : ce que l'IA doit produire, avec un verbe clair.",
        "Le format : longueur, ton, liste ou paragraphe."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Écris un mail.",
        apres: "Je suis artisan plombier. Écris un mail de relance poli à un client qui n'a pas réglé sa facture. Cinq lignes maximum, ton cordial.",
        note: "Le second prompt donne le contexte, la tâche et le format : l'IA n'a plus rien à deviner." },
      { type: "avous", consigne: "Pensez à une demande que vous feriez à un collègue, puis complétez ce modèle.", prompt: "Je suis [VOTRE SITUATION]. [CE QUE VOUS VOULEZ OBTENIR], pour [DESTINATAIRE]. Réponds en [LONGUEUR ET TON]." }
    ],
    quiz: {
      question: "Quel prompt donnera la réponse la plus utile ?",
      choix: [
        "Fais-moi un résumé.",
        "Résume cet article en 5 points pour un collègue qui ne connaît pas le sujet.",
        "Résumé article, vite."
      ],
      bonne: 1,
      explication: "Ce prompt précise la tâche (résumer), le format (5 points) et le destinataire (un collègue qui découvre le sujet)."
    }
  },

  "bases-3": {
    intro: "Une réponse bien écrite n'est pas forcément exacte. Avant de l'utiliser, quelques contrôles simples suffisent.",
    blocs: [
      { type: "liste", titre: "Ce qu'il faut contrôler en priorité", points: [
        "Les chiffres, les dates et les noms propres.",
        "Les citations et les sources : l'IA peut en inventer.",
        "Les sujets récents, médicaux, juridiques ou financiers."
      ] },
      { type: "liste", titre: "Trois réflexes", points: [
        "Recouper l'information avec une source fiable que vous connaissez.",
        "Demander à l'IA ce dont elle n'est pas sûre.",
        "Relire le texte en entier avant de l'envoyer sous votre nom."
      ] },
      { type: "avous", consigne: "Après une réponse de l'IA, envoyez-lui cette demande.", prompt: "Relis ta réponse précédente. Liste les affirmations que je devrais vérifier et explique pourquoi." }
    ],
    quiz: {
      question: "L'IA vous donne une statistique précise et cite une source. Que faites-vous ?",
      choix: [
        "Je l'utilise telle quelle : une source est citée.",
        "Je retrouve la source moi-même avant de l'utiliser.",
        "Je repose la question jusqu'à obtenir deux fois le même chiffre."
      ],
      bonne: 1,
      explication: "Une source citée par l'IA peut être inexacte ou inventée. Seule la vérification directe compte : obtenir deux fois le même chiffre ne prouve rien."
    }
  },

  "bases-4": {
    intro: "L'IA est un bon assistant, pas une autorité. Quatre limites reviennent quel que soit l'outil.",
    blocs: [
      { type: "liste", titre: "Quatre limites", points: [
        "Elle invente parfois des faits, des références ou des citations.",
        "Ses connaissances s'arrêtent à une date : sans recherche sur Internet, elle ignore l'actualité récente.",
        "Elle reproduit des biais présents dans les textes qui ont servi à l'entraîner.",
        "Elle ne connaît pas votre situation si vous ne la décrivez pas."
      ] },
      { type: "liste", titre: "Protéger vos données", points: [
        "Ne collez ni mot de passe, ni numéro de carte, ni document confidentiel.",
        "Remplacez les vrais noms par des noms fictifs quand c'est possible.",
        "Vérifiez les règles de votre employeur avant d'y mettre des documents de travail."
      ] },
      { type: "avous", consigne: "Prenez un texte, retirez-en les noms, puis envoyez cette demande.", prompt: "Voici un texte dont j'ai retiré les noms. Résume-le en trois points : [COLLEZ LE TEXTE]" }
    ],
    quiz: {
      question: "Que pouvez-vous coller sans risque dans un assistant IA ?",
      choix: [
        "Le contrat d'un client, avec son nom et son adresse.",
        "Un texte dont vous avez retiré les informations personnelles.",
        "Vos identifiants, pour qu'il se connecte à votre place."
      ],
      bonne: 1,
      explication: "Un texte anonymisé ne révèle rien sur personne. Les données d'un client et vos identifiants ne doivent jamais être collés dans un assistant."
    }
  },

  /* ---------- Parcours Grand débutant · Module 2 : Premiers usages ---------- */

  "debutant-m2-1": {
    intro: "L'IA peut expliquer presque n'importe quel sujet. Encore faut-il lui dire à quel niveau et sous quelle forme.",
    blocs: [
      { type: "liste", titre: "Trois réglages", points: [
        "Votre niveau : « je débute », « j'ai quelques bases ».",
        "La forme : une comparaison, des étapes, un exemple concret.",
        "La longueur : cinq phrases, une demi-page."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "C'est quoi l'inflation ?",
        apres: "Explique-moi l'inflation comme à quelqu'un qui n'a jamais fait d'économie. Utilise un exemple avec le prix du pain, en cinq phrases.",
        note: "La seconde demande fixe le niveau, l'exemple et la longueur." },
      { type: "liste", titre: "Si ce n'est pas clair", points: [
        "Demandez : « Explique plus simplement. »",
        "Demandez : « Donne-moi un autre exemple. »",
        "Demandez : « Pose-moi trois questions pour vérifier que j'ai compris. »"
      ] },
      { type: "avous", consigne: "Choisissez un sujet que vous n'avez jamais bien compris.", prompt: "Explique-moi [SUJET] comme à quelqu'un qui débute. Utilise un exemple de la vie courante, en cinq phrases." }
    ],
    quiz: {
      question: "Vous ne comprenez pas l'explication de l'IA. Que faites-vous ?",
      choix: [
        "Je change d'outil.",
        "Je lui demande d'expliquer plus simplement, avec un exemple.",
        "Je renvoie exactement la même question."
      ],
      bonne: 1,
      explication: "La conversation continue : l'IA garde le fil et peut reformuler autant de fois que nécessaire."
    }
  },

  "debutant-m2-2": {
    intro: "Coller un texte et demander un résumé fait gagner du temps, à condition de préciser ce que vous cherchez.",
    blocs: [
      { type: "liste", titre: "Précisez toujours", points: [
        "La longueur : trois points, cinq lignes.",
        "Ce qui vous intéresse : les dates, les décisions, ce que vous devez faire.",
        "Pour qui : vous-même, un proche, un collègue."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Résume ce texte.",
        apres: "Résume ce courrier en trois points. Dis-moi ce que je dois faire et avant quelle date : [COLLEZ LE TEXTE]",
        note: "Le résumé répond à votre vraie question : que faire, et quand." },
      { type: "liste", titre: "Attention", points: [
        "Un résumé peut oublier un détail important ou le déformer.",
        "Pour un document qui vous engage (contrat, courrier officiel), relisez les passages clés dans l'original.",
        "Retirez les informations personnelles avant de coller le texte."
      ] },
      { type: "avous", consigne: "Prenez un article ou un courrier un peu long.", prompt: "Résume ce texte en trois points. Dis-moi ce que je dois retenir ou faire : [COLLEZ LE TEXTE]" }
    ],
    quiz: {
      question: "L'IA a résumé un contrat. Avant de signer, que faites-vous ?",
      choix: [
        "Je relis moi-même les passages importants du contrat.",
        "Je me fie au résumé : il est bien écrit.",
        "Je demande un résumé encore plus court."
      ],
      bonne: 0,
      explication: "Un résumé aide à comprendre, mais il peut omettre ou déformer un point. Pour ce qui vous engage, l'original fait foi."
    }
  },

  "debutant-m2-3": {
    intro: "Un message délicat à écrire, un texte à corriger : l'IA fait un bon premier jet et un bon relecteur.",
    blocs: [
      { type: "liste", titre: "Pour faire rédiger", points: [
        "Dites à qui vous écrivez et pourquoi.",
        "Donnez les informations à faire figurer.",
        "Indiquez le ton : cordial, ferme, chaleureux."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Écris un message pour mon voisin.",
        apres: "Écris un message cordial à mon voisin pour lui demander de baisser la musique après 22 h. Trois phrases, sans reproche.",
        note: "Le destinataire, le but, la longueur et le ton sont donnés : le message est utilisable presque tel quel." },
      { type: "liste", titre: "Pour faire corriger", points: [
        "Demandez de corriger les fautes sans changer votre style.",
        "Demandez la liste des corrections, pour apprendre de vos erreurs.",
        "Relisez toujours : le message part sous votre nom."
      ] },
      { type: "avous", consigne: "Prenez un message que vous devez envoyer aujourd'hui.", prompt: "Corrige l'orthographe et la grammaire de ce message sans changer mon style. Liste ensuite les corrections : [COLLEZ VOTRE MESSAGE]" }
    ],
    quiz: {
      question: "Vous voulez corriger vos fautes sans que le texte soit réécrit. Que demandez-vous ?",
      choix: [
        "Améliore ce texte.",
        "Réécris ce texte en mieux.",
        "Corrige les fautes sans changer le style ni le sens."
      ],
      bonne: 2,
      explication: "« Améliore » et « réécris » autorisent l'IA à tout changer. Dire ce qui ne doit pas bouger protège votre texte."
    }
  },

  "debutant-m2-4": {
    intro: "Cadeau, sortie, repas : l'IA est rarement à court d'idées. Votre rôle est de cadrer la demande, puis de choisir.",
    blocs: [
      { type: "liste", titre: "Pour de bonnes idées", points: [
        "Donnez vos contraintes : budget, durée, lieu, goûts.",
        "Demandez un nombre précis : dix idées valent mieux que deux.",
        "Faites trier : de la plus simple à la plus originale."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Une idée de cadeau ?",
        apres: "Propose 10 idées de cadeaux à moins de 30 euros pour mon père de 70 ans, qui aime le jardinage et la lecture. Classe-les de la plus classique à la plus originale.",
        note: "Avec le budget, la personne et ses goûts, les idées deviennent utilisables." },
      { type: "liste", titre: "Ensuite", points: [
        "Écartez ce qui ne convient pas et dites pourquoi : l'IA ajuste.",
        "Demandez d'approfondir l'idée retenue.",
        "Vérifiez vous-même les prix et la disponibilité."
      ] },
      { type: "avous", consigne: "Pensez à une décision que vous repoussez faute d'idées.", prompt: "Propose 10 idées de [QUOI] pour [QUI OU QUELLE OCCASION]. Contraintes : [BUDGET, DURÉE, GOÛTS]. Classe-les de la plus simple à la plus originale." }
    ],
    quiz: {
      question: "Les dix idées proposées ne vous plaisent pas. Quelle est la meilleure suite ?",
      choix: [
        "Abandonner : l'IA n'a pas d'idées pour moi.",
        "Dire ce qui ne va pas et demander dix nouvelles idées.",
        "Renvoyer la même question mot pour mot."
      ],
      bonne: 1,
      explication: "Expliquer ce qui ne convient pas donne à l'IA les contraintes qui manquaient."
    }
  },

  /* ---------- Parcours Grand débutant · Module 3 : Aller plus loin ---------- */

  "debutant-m3-1": {
    intro: "Montrer vaut mieux qu'expliquer. Un exemple du résultat attendu guide l'IA mieux qu'une longue description.",
    blocs: [
      { type: "texte", titre: "Pourquoi ça marche", paragraphes: [
        "L'IA imite très bien un modèle : sa longueur, son ton, sa présentation.",
        "Un seul exemple suffit souvent. Deux ou trois donnent un résultat plus régulier."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Écris une annonce pour vendre mon vélo.",
        apres: "Écris une annonce pour vendre mon vélo de ville, sur le modèle de celle-ci : « Table en chêne, 6 places, très bon état. 120 euros, à venir chercher à Lyon. » Mon vélo : 3 ans, peu servi, 150 euros, Nantes.",
        note: "L'annonce obtenue reprend la longueur et le style du modèle, avec vos informations." },
      { type: "liste", titre: "Bonnes pratiques", points: [
        "Choisissez un exemple qui vous plaît vraiment.",
        "Dites ce qu'il faut garder : le ton, la longueur, la structure.",
        "Donnez vos propres informations à part, clairement."
      ] },
      { type: "avous", consigne: "Retrouvez un texte dont vous aimez le style : une annonce, un message, une invitation.", prompt: "Écris [CE QUE VOUS VOULEZ] sur le modèle de cet exemple. Garde la même longueur et le même ton. Exemple : [COLLEZ L'EXEMPLE]. Mes informations : [VOS INFORMATIONS]" }
    ],
    quiz: {
      question: "À quoi sert de donner un exemple à l'IA ?",
      choix: [
        "À lui montrer la forme et le ton attendus.",
        "À lui faire recopier l'exemple tel quel.",
        "À rien : elle ne tient pas compte des exemples."
      ],
      bonne: 0,
      explication: "L'exemple sert de modèle : l'IA en reprend la forme et le ton, avec vos informations."
    }
  },

  "debutant-m3-2": {
    intro: "La première réponse est un brouillon. C'est en la faisant corriger que vous obtenez ce qu'il vous faut.",
    blocs: [
      { type: "texte", titre: "La conversation garde le fil", paragraphes: [
        "Dans une même conversation, l'IA tient compte de ce qui a déjà été dit. Inutile de tout réexpliquer : dites seulement ce qu'il faut changer."
      ] },
      { type: "liste", titre: "Des demandes qui marchent", points: [
        "« Plus court, en trois phrases. »",
        "« Garde le fond, mais avec un ton plus chaleureux. »",
        "« Le deuxième paragraphe est faux : voici la bonne information. Corrige-le. »",
        "« Propose deux autres versions. »"
      ] },
      { type: "liste", titre: "Quand recommencer", points: [
        "Si la conversation part dans tous les sens, ouvrez-en une nouvelle.",
        "Reprenez alors votre meilleur prompt, complété par ce que vous avez appris."
      ] },
      { type: "avous", consigne: "Après une réponse qui ne vous convient pas tout à fait, envoyez cette demande.", prompt: "C'est presque ça. Garde [CE QUI VOUS PLAÎT], mais change [CE QUI NE VA PAS]." }
    ],
    quiz: {
      question: "La réponse est bonne mais trop longue. Que faites-vous ?",
      choix: [
        "J'ouvre une nouvelle conversation et je recommence tout.",
        "Je garde la réponse telle quelle.",
        "Je demande, dans la même conversation, une version plus courte."
      ],
      bonne: 2,
      explication: "L'IA a déjà le contexte : une courte consigne suffit pour ajuster la réponse."
    }
  },

  "debutant-m3-3": {
    intro: "Ce que vous écrivez à un assistant quitte votre appareil. Quelques réflexes suffisent pour l'utiliser sereinement.",
    blocs: [
      { type: "liste", titre: "Ce qu'il ne faut jamais coller", points: [
        "Mots de passe, codes et numéros de carte bancaire.",
        "Numéro de sécurité sociale et pièces d'identité.",
        "Documents médicaux ou confidentiels, les vôtres comme ceux des autres."
      ] },
      { type: "liste", titre: "Les bons réflexes", points: [
        "Remplacez les noms par « M. X » ou « mon voisin ».",
        "Cherchez dans les réglages de l'outil ce qui concerne l'utilisation de vos conversations, et réglez-le selon votre choix.",
        "Supprimez les conversations dont vous n'avez plus besoin."
      ] },
      { type: "texte", titre: "Pour les autres aussi", paragraphes: [
        "Les informations d'un proche, d'un client ou d'un collègue ne vous appartiennent pas. Anonymisez-les comme les vôtres."
      ] },
      { type: "avous", consigne: "Avant de coller un texte, retirez-en les noms et les numéros.", prompt: "Voici un texte dont j'ai retiré les noms et les numéros. Aide-moi à y répondre : [COLLEZ LE TEXTE]" }
    ],
    quiz: {
      question: "Vous voulez de l'aide pour répondre à un courrier de votre banque. Que faites-vous ?",
      choix: [
        "Je colle le courrier entier, avec mon numéro de compte.",
        "Je retire mon nom et mes numéros avant de le coller.",
        "J'ajoute mes identifiants pour que l'IA vérifie mon compte."
      ],
      bonne: 1,
      explication: "L'IA n'a pas besoin de savoir qui vous êtes pour vous aider à répondre. Vos identifiants ne se partagent jamais."
    }
  },

  /* ---------- Parcours Pro ou indépendant · Module 2 : Écrire plus vite ---------- */

  "pro-m2-1": {
    intro: "La plupart des mails professionnels suivent le même schéma. Donnez les faits à l'IA, elle s'occupe de la forme.",
    blocs: [
      { type: "liste", titre: "Les quatre informations à donner", points: [
        "Le destinataire et votre relation avec lui.",
        "L'objectif du mail : informer, demander, relancer, refuser.",
        "Les faits à inclure : dates, montants, pièces jointes.",
        "Le ton et la longueur."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Écris un mail à mon client pour le retard.",
        apres: "Écris un mail à un client régulier pour annoncer une semaine de retard sur sa livraison, prévue le 12. Explique que le fournisseur est en cause, propose le 19 et excuse-toi brièvement. Six lignes maximum, ton professionnel et direct.",
        note: "Tous les faits sont fournis : l'IA n'a rien à inventer." },
      { type: "liste", titre: "Avant d'envoyer", points: [
        "Vérifiez les dates, les montants et les noms.",
        "Supprimez les formules que vous n'emploieriez jamais.",
        "Ajoutez la phrase personnelle que vous seul pouvez écrire."
      ] },
      { type: "avous", consigne: "Prenez un mail que vous devez écrire aujourd'hui.", prompt: "Écris un mail à [DESTINATAIRE] pour [OBJECTIF]. Informations à inclure : [FAITS]. [NOMBRE] lignes maximum, ton [TON]." }
    ],
    quiz: {
      question: "Pourquoi donner les dates et les montants dans le prompt ?",
      choix: [
        "Pour que le mail soit plus long.",
        "Parce que l'IA ne les connaît pas et risquerait de les inventer.",
        "C'est inutile : l'IA les retrouve seule."
      ],
      bonne: 1,
      explication: "L'IA ne connaît pas votre dossier. Sans les faits, elle écrit un mail vague ou comble les trous avec des informations inventées."
    }
  },

  "pro-m2-2": {
    intro: "Rapport, appel d'offres, contrat : l'IA en tire l'essentiel en quelques secondes, si vous lui dites pour quoi faire.",
    blocs: [
      { type: "liste", titre: "Orientez le résumé", points: [
        "Votre rôle : « je suis acheteur », « je dois décider ».",
        "Ce que vous cherchez : risques, coûts, échéances, obligations.",
        "Le format : cinq points, un tableau, une page."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Résume ce rapport.",
        apres: "Je dois décider si nous répondons à cet appel d'offres. Résume le document en cinq points : ce qui est demandé, les échéances, les critères de choix, les risques pour nous, les pièces à fournir. [COLLEZ LE DOCUMENT]",
        note: "Le résumé est construit pour votre décision, pas pour décrire le document." },
      { type: "liste", titre: "Pour aller plus loin", points: [
        "Demandez où se trouve chaque information, pour la retrouver dans le document.",
        "Posez ensuite des questions précises : « Que dit le texte sur les pénalités ? »",
        "Vérifiez dans l'original tout ce qui fonde une décision.",
        "Respectez les règles de votre entreprise avant de coller un document interne."
      ] },
      { type: "avous", consigne: "Prenez un document long que vous devez traiter cette semaine.", prompt: "Je suis [VOTRE RÔLE] et je dois [DÉCISION OU TÂCHE]. Résume ce document en cinq points utiles pour cela, puis liste ce que je dois vérifier dans le texte : [COLLEZ LE DOCUMENT]" }
    ],
    quiz: {
      question: "Quel résumé vous servira le plus ?",
      choix: [
        "Un résumé général du document.",
        "Un résumé orienté vers la décision que vous devez prendre.",
        "Le résumé le plus long possible."
      ],
      bonne: 1,
      explication: "En donnant votre rôle et votre objectif, vous obtenez les points qui comptent pour vous, pas un survol."
    }
  },

  "pro-m2-3": {
    intro: "Une réunion utile se prépare. L'IA aide à bâtir l'ordre du jour, à anticiper les questions et à cadrer le temps.",
    blocs: [
      { type: "liste", titre: "Ce que l'IA peut préparer", points: [
        "Un ordre du jour minuté, construit à partir de votre objectif.",
        "Les questions et objections probables des participants.",
        "Le message d'invitation, avec ce que chacun doit préparer."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Prépare ma réunion de lundi.",
        apres: "Je prépare une réunion de 45 minutes avec 5 personnes pour choisir entre deux prestataires. Propose un ordre du jour minuté qui se termine par une décision, puis les trois objections les plus probables.",
        note: "La durée, les participants et l'objectif suffisent à obtenir un plan utilisable." },
      { type: "liste", titre: "Gardez la main", points: [
        "L'IA ne connaît ni les personnes ni l'historique : ajoutez ce contexte ou corrigez sa proposition.",
        "Une réunion, un objectif : faites retirer ce qui n'y contribue pas."
      ] },
      { type: "avous", consigne: "Pensez à votre prochaine réunion.", prompt: "Je prépare une réunion de [DURÉE] avec [PARTICIPANTS] pour [OBJECTIF]. Propose un ordre du jour minuté, puis les trois questions difficiles à anticiper." }
    ],
    quiz: {
      question: "Que doit contenir votre prompt pour obtenir un bon ordre du jour ?",
      choix: [
        "La durée, les participants et l'objectif de la réunion.",
        "Seulement la date.",
        "Le nom de la salle."
      ],
      bonne: 0,
      explication: "Ce sont les trois informations qui déterminent le contenu et le rythme d'une réunion."
    }
  },

  "pro-m2-4": {
    intro: "Des notes prises à la volée deviennent un compte rendu clair en une minute, à condition d'interdire à l'IA d'inventer.",
    blocs: [
      { type: "liste", titre: "La structure à demander", points: [
        "Les décisions prises.",
        "Les actions : qui, quoi, pour quand.",
        "Les points restés ouverts."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Fais un compte rendu de mes notes.",
        apres: "Transforme ces notes en compte rendu : décisions, puis tableau des actions (action, responsable, échéance), puis points ouverts. N'ajoute rien qui ne soit pas dans les notes : écris « non précisé » si une information manque. [COLLEZ LES NOTES]",
        note: "La consigne « n'ajoute rien » est la plus importante : sans elle, l'IA comble les trous." },
      { type: "liste", titre: "Avant de diffuser", points: [
        "Comparez chaque action avec vos notes : responsable et échéance.",
        "Faites relire par un participant si une décision est sensible."
      ] },
      { type: "avous", consigne: "Une fois le compte rendu obtenu, faites-le contrôler.", prompt: "Compare ce compte rendu à mes notes et signale toute information qui n'y figure pas. Compte rendu : [COLLEZ LE COMPTE RENDU]. Notes : [COLLEZ LES NOTES]" }
    ],
    quiz: {
      question: "Quelle consigne évite que l'IA invente une échéance ?",
      choix: [
        "Sois créatif.",
        "Fais un compte rendu complet.",
        "N'ajoute rien : écris « non précisé » si l'information manque."
      ],
      bonne: 2,
      explication: "Demander un texte « complet » pousse l'IA à combler les manques. Lui donner une formule pour les trous l'en empêche."
    }
  },

  /* ---------- Parcours Pro ou indépendant · Module 3 : Organiser son travail ---------- */

  "pro-m3-1": {
    intro: "Le même message ne s'écrit pas de la même façon à un client, à un collègue ou à sa direction. L'IA change le ton sans toucher au fond.",
    blocs: [
      { type: "liste", titre: "Décrivez le ton avec précision", points: [
        "Le destinataire : client mécontent, nouveau collègue, direction.",
        "Le registre : formel, direct, chaleureux, neutre.",
        "Ce qui ne doit pas changer : les faits, les chiffres, la demande."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Rends ce texte plus professionnel.",
        apres: "Réécris ce message pour un client mécontent : ton calme et respectueux, sans jargon, en reconnaissant le problème dès la première phrase. Garde toutes les informations. [COLLEZ LE TEXTE]",
        note: "« Plus professionnel » ne dit rien de précis. Un destinataire et un registre, si." },
      { type: "liste", titre: "Astuces", points: [
        "Demandez deux versions de tons différents, puis choisissez.",
        "Vérifiez qu'aucun fait n'a disparu au passage."
      ] },
      { type: "avous", consigne: "Prenez un message écrit trop vite.", prompt: "Réécris ce texte pour [DESTINATAIRE], avec un ton [TON]. Garde toutes les informations et la même longueur : [COLLEZ LE TEXTE]" }
    ],
    quiz: {
      question: "Quelle demande donnera le ton le plus juste ?",
      choix: [
        "Rends ce texte mieux.",
        "Réécris ce texte pour un client mécontent, avec un ton calme et sans jargon.",
        "Rends ce texte plus pro."
      ],
      bonne: 1,
      explication: "Elle nomme le destinataire et le registre. Les deux autres laissent l'IA deviner."
    }
  },

  "pro-m3-2": {
    intro: "L'IA lit un tableau et en décrit les tendances. Elle est utile pour explorer, moins fiable pour calculer.",
    blocs: [
      { type: "liste", titre: "Ce qu'elle fait bien", points: [
        "Décrire les tendances et les écarts.",
        "Repérer les valeurs inhabituelles.",
        "Proposer des questions à creuser ou un type de graphique adapté."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Analyse ce tableau.",
        apres: "Voici les ventes mensuelles de l'année par produit. Décris les trois tendances principales, signale les mois anormaux et dis ce que ces chiffres ne permettent pas de conclure. [COLLEZ LE TABLEAU]",
        note: "Demander les limites de l'analyse évite les conclusions trop rapides." },
      { type: "liste", titre: "Ce qu'il faut contrôler", points: [
        "Les calculs : refaites les totaux et les pourcentages importants dans votre tableur.",
        "Les conclusions : une tendance n'explique pas sa cause.",
        "La confidentialité : retirez les noms de clients et de salariés."
      ] },
      { type: "avous", consigne: "Prenez un tableau que vous connaissez bien, pour juger l'analyse.", prompt: "Voici un tableau de [CE QU'IL CONTIENT]. Décris les trois tendances principales, signale les valeurs anormales et propose trois questions à creuser : [COLLEZ LE TABLEAU]" }
    ],
    quiz: {
      question: "L'IA annonce une hausse de 18 % dans votre tableau. Que faites-vous ?",
      choix: [
        "Je refais le calcul dans mon tableur avant de l'utiliser.",
        "Je reprends le chiffre dans mon rapport.",
        "Je lui demande si elle est sûre et je m'en tiens à sa réponse."
      ],
      bonne: 0,
      explication: "Un chiffre qui part dans un rapport se vérifie à la source. L'IA peut confirmer avec aplomb un calcul faux."
    }
  },

  "pro-m3-3": {
    intro: "Si vous faites la même demande chaque semaine, ne la réécrivez pas : transformez-la en modèle.",
    blocs: [
      { type: "liste", titre: "Un bon modèle contient", points: [
        "Votre contexte fixe : métier, public, style.",
        "La tâche, toujours formulée de la même façon.",
        "Des emplacements entre crochets pour ce qui change.",
        "Le format de réponse attendu."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Fais-moi le point hebdo.",
        apres: "Je suis responsable d'une équipe de 6 personnes. À partir de ces notes, rédige le point hebdomadaire pour ma direction : trois réussites, deux difficultés, les priorités de la semaine prochaine. Dix lignes maximum, ton factuel. Notes : [NOTES DE LA SEMAINE]",
        note: "Seule la partie entre crochets change d'une semaine à l'autre." },
      { type: "liste", titre: "Faites-les vivre", points: [
        "Rangez vos modèles dans un document ou une note.",
        "Quand une réponse est meilleure que d'habitude, mettez le modèle à jour.",
        "La rubrique Prompts du site donne des points de départ."
      ] },
      { type: "avous", consigne: "Pensez à une demande que vous faites souvent.", prompt: "Voici une demande que je fais souvent : [VOTRE DEMANDE]. Transforme-la en modèle de prompt réutilisable, avec le contexte, la tâche, le format et des emplacements entre crochets pour ce qui change." }
    ],
    quiz: {
      question: "Que met-on entre crochets dans un modèle de prompt ?",
      choix: [
        "Ce qui ne change jamais.",
        "Les formules de politesse.",
        "Ce qui change à chaque utilisation."
      ],
      bonne: 2,
      explication: "Le contexte et le format restent fixes. Les crochets marquent ce que vous remplacez à chaque fois."
    }
  },

  /* ---------- Parcours Créateur de contenu · Module 2 : De l'idée à la publication ---------- */

  "createur-m2-1": {
    intro: "L'IA propose des idées en quantité. Elles ne valent quelque chose que si elle connaît votre chaîne et votre public.",
    blocs: [
      { type: "liste", titre: "Ce qu'il faut lui dire", points: [
        "Le sujet de votre chaîne et son angle.",
        "Votre public : débutants, passionnés, professionnels.",
        "Le format : durée, face caméra ou voix off.",
        "Ce que vous avez déjà publié, pour éviter les redites."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Donne-moi des idées de vidéos.",
        apres: "Ma chaîne explique le jardinage en appartement aux débutants, en vidéos de 8 minutes. Propose 10 idées, chacune avec la question à laquelle elle répond. Évite ces sujets déjà traités : [LISTE].",
        note: "Chaque idée est rattachée à une question que se pose votre public." },
      { type: "liste", titre: "Triez ensuite", points: [
        "Gardez les idées sur lesquelles vous avez vraiment quelque chose à dire.",
        "Demandez trois angles différents pour l'idée retenue.",
        "Regardez vous-même ce que cherche votre public : l'IA ne connaît pas vos statistiques."
      ] },
      { type: "avous", consigne: "Décrivez votre chaîne, ou celle que vous voulez lancer.", prompt: "Ma chaîne parle de [SUJET] pour [PUBLIC], en vidéos de [DURÉE]. Propose 10 idées, chacune avec la question à laquelle elle répond. Évite ces sujets déjà traités : [LISTE]." }
    ],
    quiz: {
      question: "Pourquoi décrire votre public dans le prompt ?",
      choix: [
        "Pour obtenir des idées adaptées à ceux qui regardent.",
        "Pour que l'IA contacte vos abonnés.",
        "Cela ne change rien au résultat."
      ],
      bonne: 0,
      explication: "Une même idée ne se traite pas de la même façon pour un débutant et pour un passionné."
    }
  },

  "createur-m2-2": {
    intro: "L'IA structure un script en quelques secondes. Le fond et la voix doivent rester les vôtres.",
    blocs: [
      { type: "liste", titre: "Travaillez en deux temps", points: [
        "D'abord le plan : accroche, parties, conclusion.",
        "Ensuite le texte, partie par partie, en corrigeant au fur et à mesure."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Écris un script sur le compost.",
        apres: "Écris le plan d'une vidéo de 8 minutes sur le compost en appartement, pour débutants : une accroche de 15 secondes qui pose un problème, trois parties, une conclusion avec une action à faire. Indique ce qui est montré à l'écran.",
        note: "Un plan se corrige en une minute. Un script entier raté est à refaire." },
      { type: "liste", titre: "Gardez votre voix", points: [
        "Ajoutez vos exemples, vos anecdotes et vos avis : l'IA n'en a pas.",
        "Lisez le texte à voix haute et corrigez ce qui sonne faux.",
        "Vérifiez chaque fait cité avant de tourner."
      ] },
      { type: "avous", consigne: "Reprenez une idée de vidéo que vous avez en tête.", prompt: "Écris le plan d'une vidéo de [DURÉE] sur [SUJET] pour [PUBLIC] : une accroche de 15 secondes, trois parties, une conclusion avec une action à faire. Indique ce qui est montré à l'écran à chaque partie." }
    ],
    quiz: {
      question: "Quelle est la meilleure façon d'utiliser l'IA pour un script ?",
      choix: [
        "Lui faire écrire le texte entier et le lire tel quel.",
        "Lui demander un plan, puis écrire et corriger partie par partie.",
        "Lui demander de reprendre le script d'une autre chaîne."
      ],
      bonne: 1,
      explication: "Le plan cadre la vidéo, et le travail partie par partie vous laisse y mettre votre voix."
    }
  },

  "createur-m2-3": {
    intro: "Une miniature se décide avant d'ouvrir un logiciel. L'IA aide à trouver le concept, puis à produire l'image.",
    blocs: [
      { type: "liste", titre: "Une miniature efficace", points: [
        "Une seule idée, lisible en une seconde.",
        "Trois mots au maximum, en gros.",
        "Un sujet principal net et un fort contraste."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Fais une miniature pour ma vidéo.",
        apres: "Ma vidéo s'appelle « Composter en appartement sans odeur ». Propose 3 concepts de miniature : texte de 3 mots maximum, élément principal, couleurs, émotion recherchée.",
        note: "Vous comparez trois concepts avant de produire une seule image." },
      { type: "liste", titre: "Pour produire l'image", points: [
        "Décrivez le concept retenu à un outil d'images, ou réalisez-le dans votre logiciel habituel.",
        "Ajoutez le texte vous-même : il sera net et modifiable.",
        "N'utilisez pas le visage d'une personne réelle sans son accord."
      ] },
      { type: "avous", consigne: "Prenez le titre de votre prochaine vidéo.", prompt: "Ma vidéo s'appelle « [TITRE] » et s'adresse à [PUBLIC]. Propose 3 concepts de miniature : texte de 3 mots maximum, élément principal, couleurs, émotion recherchée." }
    ],
    quiz: {
      question: "Combien de mots mettre sur une miniature ?",
      choix: [
        "Le titre complet de la vidéo.",
        "Trois mots au maximum.",
        "Une phrase d'explication."
      ],
      bonne: 1,
      explication: "Une miniature est vue en petit et en une seconde : au-delà de trois mots, plus rien n'est lisible."
    }
  },

  "createur-m2-4": {
    intro: "Le titre décide du clic, la description aide à être trouvé. L'IA fournit des variantes : vous choisissez celle qui dit vrai.",
    blocs: [
      { type: "liste", titre: "Un bon titre", points: [
        "Dit clairement ce que la vidéo apporte.",
        "Reste court : visez moins de 60 caractères.",
        "Tient sa promesse, sans exagération."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Trouve un titre.",
        apres: "Ma vidéo montre comment composter en appartement sans odeur, pour débutants. Propose 10 titres de moins de 60 caractères, dans des styles différents : question, promesse, erreur à éviter. Puis une description de 3 lignes.",
        note: "Dix titres de styles variés vous donnent un vrai choix." },
      { type: "liste", titre: "Pour la description", points: [
        "Les deux premières lignes résument la vidéo avec les mots que votre public utilise.",
        "Ajoutez vous-même les chapitres et les liens."
      ] },
      { type: "avous", consigne: "Décrivez en une phrase ce que votre vidéo apporte.", prompt: "Ma vidéo montre [CE QU'ELLE APPORTE] pour [PUBLIC]. Propose 10 titres de moins de 60 caractères, dans des styles différents. Puis une description de 3 lignes." }
    ],
    quiz: {
      question: "Quel titre choisir parmi les propositions de l'IA ?",
      choix: [
        "Le plus spectaculaire, même s'il exagère.",
        "Le plus long.",
        "Celui qui décrit fidèlement ce que la vidéo apporte."
      ],
      bonne: 2,
      explication: "Un titre qui promet plus que la vidéo déçoit le spectateur, qui s'en va."
    }
  },

  /* ---------- Parcours Créateur de contenu · Module 3 : Aller plus loin ---------- */

  "createur-m3-1": {
    intro: "Un outil d'images dessine ce que vous décrivez. Plus la description est précise, moins vous faites d'essais.",
    blocs: [
      { type: "liste", titre: "Les éléments d'une bonne description", points: [
        "Le sujet : qui ou quoi, en train de faire quoi.",
        "Le style : photo, illustration, aquarelle, 3D.",
        "Le cadrage : gros plan, plan large, vue de dessus.",
        "La lumière et les couleurs dominantes."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Un chat.",
        apres: "Photo en gros plan d'un chat roux endormi sur un rebord de fenêtre, lumière dorée de fin d'après-midi, arrière-plan flou, couleurs chaudes.",
        note: "Sujet, style, cadrage, lumière : chaque précision retire un essai raté." },
      { type: "liste", titre: "À savoir", points: [
        "Le texte dans l'image est parfois mal écrit : ajoutez-le ensuite dans un logiciel.",
        "Les détails fins demandent parfois plusieurs essais.",
        "Lisez les conditions de l'outil avant un usage commercial.",
        "Ne reproduisez ni personnage connu, ni marque, ni personne réelle."
      ] },
      { type: "avous", consigne: "Imaginez une image dont vous avez besoin, puis complétez ce modèle.", prompt: "[STYLE] de [SUJET] en train de [ACTION], [CADRAGE], lumière [LUMIÈRE], couleurs [COULEURS], arrière-plan [ARRIÈRE-PLAN]." }
    ],
    quiz: {
      question: "Quelle description donnera l'image la plus proche de votre idée ?",
      choix: [
        "Un paysage.",
        "Un beau paysage, très joli.",
        "Illustration à l'aquarelle d'un lac de montagne au lever du soleil, plan large, tons bleus et roses."
      ],
      bonne: 2,
      explication: "« Beau » et « joli » ne décrivent rien. Le style, le sujet, le cadrage et les couleurs, si."
    }
  },

  "createur-m3-2": {
    intro: "Une vidéo ou un article contient de quoi faire plusieurs publications. L'IA adapte le même fond à chaque format.",
    blocs: [
      { type: "liste", titre: "Ce qui change d'un format à l'autre", points: [
        "La longueur.",
        "L'accroche : la première phrase décide de tout.",
        "Le ton et les usages de la plateforme."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Fais des posts avec mon script.",
        apres: "À partir de ce script, écris trois publications courtes : une qui pose une question, une qui donne une astuce, une qui corrige une idée reçue. Moins de 280 caractères chacune. [COLLEZ LE SCRIPT]",
        note: "Trois angles différents tirés du même contenu, au lieu de trois redites." },
      { type: "liste", titre: "Bonnes pratiques", points: [
        "Partez toujours de votre contenu d'origine, pas d'un sujet vague.",
        "Chaque publication doit se comprendre seule.",
        "Relisez tout : c'est votre nom qui signe."
      ] },
      { type: "avous", consigne: "Prenez le texte de votre dernier contenu.", prompt: "À partir de ce texte, écris trois publications courtes pour [PLATEFORME], chacune avec un angle différent et moins de [NOMBRE] caractères : [COLLEZ LE TEXTE]" }
    ],
    quiz: {
      question: "Pour décliner une vidéo en publications, que donnez-vous à l'IA ?",
      choix: [
        "Seulement le titre.",
        "Le script ou le texte d'origine.",
        "Rien : elle connaît déjà votre vidéo."
      ],
      bonne: 1,
      explication: "L'IA n'a pas vu votre vidéo. Sans le texte d'origine, elle invente un contenu qui n'est pas le vôtre."
    }
  },

  "createur-m3-3": {
    intro: "À force d'utiliser l'IA, tout peut finir par se ressembler. La solution : lui décrire votre style une fois pour toutes.",
    blocs: [
      { type: "liste", titre: "Construisez votre fiche de style", points: [
        "Votre ton : tutoiement ou vouvoiement, humour, niveau de langue.",
        "Vos habitudes : phrases courtes, expressions qui reviennent, mots que vous n'employez jamais.",
        "Deux ou trois extraits de vos propres textes."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Écris comme moi.",
        apres: "Voici trois extraits de mes scripts : [EXTRAITS]. Décris mon style en cinq points : ton, longueur des phrases, vocabulaire, humour, façon de m'adresser au public.",
        note: "Vous obtenez une fiche de style à coller au début de vos prochaines demandes." },
      { type: "liste", titre: "Restez l'auteur", points: [
        "Collez votre fiche de style au début de chaque demande.",
        "Corrigez ce qui ne sonne pas comme vous, puis mettez la fiche à jour.",
        "Vos idées, vos avis et vos histoires restent ce qui vous distingue."
      ] },
      { type: "avous", consigne: "Rassemblez trois extraits de textes que vous avez écrits vous-même.", prompt: "Voici trois extraits de mes textes : [EXTRAITS]. Décris mon style en cinq points que je pourrai réutiliser dans mes prochaines demandes." }
    ],
    quiz: {
      question: "Comment éviter que vos contenus ressemblent à ceux de tout le monde ?",
      choix: [
        "En donnant à l'IA une description de votre style et vos propres exemples.",
        "En utilisant le prompt le plus court possible.",
        "En changeant d'outil chaque semaine."
      ],
      bonne: 0,
      explication: "Sans indication, l'IA écrit dans un style moyen. Avec votre fiche de style, elle part du vôtre."
    }
  },

  /* ---------- Parcours Développeur · Module 2 : Coder avec un assistant ---------- */

  "dev-m2-1": {
    intro: "Un assistant de code écrit vite, mais il ne connaît pas votre projet. La qualité du résultat dépend du cadre que vous lui donnez.",
    blocs: [
      { type: "liste", titre: "Ce qu'il faut préciser", points: [
        "Le langage, sa version et les bibliothèques autorisées.",
        "Les entrées, les sorties et les cas limites.",
        "Les conventions du projet : nommage, style, structure.",
        "Ce qu'il ne doit pas modifier."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Écris une fonction pour trier des utilisateurs.",
        apres: "Écris en JavaScript sans bibliothèque une fonction trierUtilisateurs(liste) qui trie par nom de famille puis par prénom, sans tenir compte des accents ni de la casse. Ne modifie pas le tableau d'origine. Commente le code et donne trois exemples d'appel.",
        note: "Le langage, le comportement exact et les contraintes sont fixés : il reste peu de place pour une mauvaise surprise." },
      { type: "liste", titre: "Gardez le contrôle", points: [
        "Demandez de petites unités : une fonction à la fois.",
        "Lisez et exécutez tout le code avant de l'intégrer.",
        "Vous restez responsable de ce que vous publiez."
      ] },
      { type: "avous", consigne: "Pensez à une fonction dont vous avez besoin dans un projet en cours.", prompt: "Écris en [LANGAGE] une fonction [NOM] qui [CE QU'ELLE FAIT]. Entrées : [ENTRÉES]. Sortie : [SORTIE]. Cas limites : [CAS]. Contraintes : [BIBLIOTHÈQUES, STYLE]. Commente le code et donne trois exemples d'appel." }
    ],
    quiz: {
      question: "Quel prompt donnera le code le plus exploitable ?",
      choix: [
        "Fais-moi un tri.",
        "Écris en JavaScript une fonction qui trie un tableau d'objets par date croissante, sans modifier l'original, avec des exemples d'appel.",
        "Code de tri rapide, merci."
      ],
      bonne: 1,
      explication: "Il fixe le langage, les données, l'ordre attendu et une contrainte. Les deux autres laissent tout à deviner."
    }
  },

  "dev-m2-2": {
    intro: "Comprendre un code inconnu ou trouver un bug : l'IA est un bon binôme, si vous lui donnez les bons éléments.",
    blocs: [
      { type: "liste", titre: "Pour faire expliquer du code", points: [
        "Collez le code et dites ce que vous cherchez à comprendre.",
        "Demandez un résumé, puis le détail des passages difficiles.",
        "Faites signaler ce qui pourrait poser problème."
      ] },
      { type: "liste", titre: "Pour corriger un bug, donnez", points: [
        "Le message d'erreur complet.",
        "Le code concerné.",
        "Ce que vous attendiez et ce qui se passe réellement.",
        "Ce que vous avez déjà essayé."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Mon code ne marche pas.",
        apres: "Ce code doit afficher la somme des prix du panier, mais affiche « NaN ». Explique la cause, propose une correction minimale et dis comment la vérifier. Code : [CODE]. Console : [MESSAGE]",
        note: "Demander la correction minimale évite une réécriture complète quand une ligne suffit." },
      { type: "liste", titre: "Méfiez-vous", points: [
        "D'une correction qui masque l'erreur sans traiter sa cause.",
        "D'une explication convaincante que vous n'avez pas vérifiée en exécutant le code."
      ] },
      { type: "avous", consigne: "Reprenez le dernier bug qui vous a résisté.", prompt: "Ce code doit [COMPORTEMENT ATTENDU], mais [CE QUI SE PASSE]. Message d'erreur : [MESSAGE]. Explique la cause, propose une correction minimale et dis comment la vérifier. [COLLEZ LE CODE]" }
    ],
    quiz: {
      question: "Que donner à l'IA pour corriger un bug efficacement ?",
      choix: [
        "« Ça ne marche pas. »",
        "Seulement le nom du fichier.",
        "Le message d'erreur, le code, le résultat attendu et le résultat obtenu."
      ],
      bonne: 2,
      explication: "Ce sont les éléments qu'un collègue vous demanderait avant de pouvoir vous aider."
    }
  },

  "dev-m2-3": {
    intro: "Une API permet à votre programme d'envoyer un texte à un modèle d'IA et de recevoir sa réponse, sans passer par une interface de discussion.",
    blocs: [
      { type: "texte", titre: "Le principe", paragraphes: [
        "Votre programme envoie une requête HTTP au fournisseur, avec une clé d'API qui vous identifie, le modèle choisi et les messages.",
        "Le fournisseur renvoie la réponse du modèle. L'usage est généralement facturé selon le volume de texte envoyé et reçu."
      ] },
      { type: "liste", titre: "Les règles de sécurité", points: [
        "La clé d'API ne doit jamais apparaître dans du code exécuté par le navigateur, ni dans un dépôt public.",
        "Rangez-la dans une variable d'environnement, côté serveur.",
        "Si le fournisseur le permet, fixez un plafond de dépense."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Comment utiliser une API d'IA ?",
        apres: "Écris en Node.js une fonction qui envoie un texte à l'API de [FOURNISSEUR] et retourne la réponse. Lis la clé dans une variable d'environnement, gère les erreurs réseau et commente le code. Appuie-toi sur cet extrait de la documentation officielle : [COLLEZ L'EXTRAIT]",
        note: "Les API évoluent vite. Fournir la documentation à jour évite un code qui s'appuie sur une version dépassée." },
      { type: "avous", consigne: "Ouvrez la documentation officielle du fournisseur de votre choix et copiez son exemple d'appel.", prompt: "Voici l'exemple d'appel de la documentation officielle : [COLLEZ L'EXEMPLE]. Explique chaque paramètre, puis adapte-le en [LANGAGE] avec la clé lue dans une variable d'environnement et la gestion des erreurs." }
    ],
    quiz: {
      question: "Où ranger votre clé d'API ?",
      choix: [
        "Dans une variable d'environnement, côté serveur.",
        "Dans le JavaScript de la page web.",
        "Dans le fichier README du dépôt public."
      ],
      bonne: 0,
      explication: "Tout ce qui est envoyé au navigateur ou publié dans un dépôt peut être lu, et une clé volée se paie sur votre facture."
    }
  },

  "dev-m2-4": {
    intro: "Les tests sont une tâche idéale à déléguer : répétitive, bien cadrée, et facile à vérifier puisqu'il suffit de les lancer.",
    blocs: [
      { type: "liste", titre: "Ce qu'il faut demander", points: [
        "Les cas normaux.",
        "Les cas limites : valeurs vides, nulles, très grandes.",
        "Les cas d'erreur attendus.",
        "Le framework de test utilisé dans le projet."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Écris des tests.",
        apres: "Écris les tests de cette fonction avec [FRAMEWORK] : cas normaux, tableau vide, valeurs nulles, doublons. Un test par comportement, avec un nom qui décrit ce qui est vérifié. [COLLEZ LA FONCTION]",
        note: "Nommer les cas limites vous-même garantit qu'ils sont couverts." },
      { type: "liste", titre: "Points de vigilance", points: [
        "Lancez les tests : un test jamais exécuté ne prouve rien.",
        "Vérifiez qu'un test échoue quand le code est faux, sinon il ne teste rien.",
        "L'IA teste ce que fait le code, pas forcément ce qu'il devrait faire : relisez les valeurs attendues."
      ] },
      { type: "avous", consigne: "Choisissez une fonction qui n'a pas encore de tests.", prompt: "Écris les tests de cette fonction avec [FRAMEWORK] : cas normaux, cas limites ([LESQUELS]) et cas d'erreur. Un test par comportement, avec un nom explicite. [COLLEZ LA FONCTION]" }
    ],
    quiz: {
      question: "Les tests générés passent tous du premier coup. Que vérifiez-vous ?",
      choix: [
        "Rien : ils passent.",
        "Que les valeurs attendues sont justes et qu'un test échoue si je casse le code.",
        "Qu'ils sont assez nombreux."
      ],
      bonne: 1,
      explication: "Des tests écrits à partir d'un code faux peuvent valider le bug. Un test utile est un test capable d'échouer."
    }
  },

  /* ---------- Parcours Développeur · Module 3 : Intégrer l'IA ---------- */

  "dev-m3-1": {
    intro: "Pour qu'un programme exploite la réponse d'un modèle, il lui faut un format fixe. Le JSON est le plus courant.",
    blocs: [
      { type: "liste", titre: "Comment le demander", points: [
        "Décrivez le schéma exact : noms des champs, types, valeurs possibles.",
        "Donnez un exemple de réponse valide.",
        "Demandez uniquement le JSON, sans texte autour."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Analyse cet avis client.",
        apres: "Analyse cet avis client et réponds uniquement avec un objet JSON de cette forme : {\"sentiment\": \"positif\", \"neutre\" ou \"negatif\", \"sujets\": liste de chaînes, \"resume\": chaîne de 20 mots maximum}. Avis : [TEXTE]",
        note: "Les champs, leurs types et les valeurs autorisées sont fixés : votre code sait à quoi s'attendre." },
      { type: "liste", titre: "Côté code", points: [
        "Validez toujours la réponse avant de l'utiliser : le JSON peut être mal formé ou incomplet.",
        "Prévoyez l'échec : nouvelle tentative ou valeur par défaut.",
        "Si l'API du fournisseur propose une sortie structurée, utilisez-la : elle est plus fiable qu'une consigne dans le prompt."
      ] },
      { type: "avous", consigne: "Pensez à un texte que votre programme doit transformer en données.", prompt: "Réponds uniquement avec un objet JSON de cette forme : [SCHÉMA]. Exemple de réponse valide : [EXEMPLE]. Données à traiter : [DONNÉES]" }
    ],
    quiz: {
      question: "Votre programme reçoit le JSON du modèle. Que fait-il en premier ?",
      choix: [
        "Il l'utilise directement.",
        "Il l'affiche à l'utilisateur.",
        "Il vérifie qu'il est valide et conforme au schéma."
      ],
      bonne: 2,
      explication: "La réponse d'un modèle est une donnée externe : elle se valide comme une saisie d'utilisateur."
    }
  },

  "dev-m3-2": {
    intro: "Une relecture par l'IA repère vite les erreurs courantes. Elle complète la relecture humaine, elle ne la remplace pas.",
    blocs: [
      { type: "liste", titre: "Demandez une relecture ciblée", points: [
        "Bugs et cas limites oubliés.",
        "Sécurité : entrées non validées, secrets dans le code, injections.",
        "Lisibilité : nommage, fonctions trop longues, duplication."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Mon code est bien ?",
        apres: "Relis ce code comme un relecteur exigeant. Liste les problèmes par ordre de gravité : bugs, sécurité, lisibilité. Pour chacun, cite la ligne et propose une correction. Ne réécris pas le reste. [COLLEZ LE CODE]",
        note: "Un rôle, des critères et un format : vous obtenez une liste à traiter, pas un compliment." },
      { type: "liste", titre: "Avant de publier", points: [
        "Triez les remarques : toutes ne sont pas pertinentes.",
        "Ne publiez pas de code que vous ne savez pas expliquer.",
        "Vérifiez qu'aucune clé ni aucun mot de passe ne figure dans le code.",
        "Vérifiez que chaque bibliothèque suggérée existe et qu'elle est maintenue."
      ] },
      { type: "avous", consigne: "Prenez un fichier que vous vous apprêtez à publier.", prompt: "Relis ce code comme un relecteur exigeant. Liste les problèmes par ordre de gravité : bugs, sécurité, lisibilité. Pour chacun, cite la ligne et propose une correction minimale. [COLLEZ LE CODE]" }
    ],
    quiz: {
      question: "L'IA suggère d'installer une bibliothèque que vous ne connaissez pas. Que faites-vous ?",
      choix: [
        "Je l'installe tout de suite.",
        "Je vérifie qu'elle existe, qu'elle est maintenue et qu'elle est fiable.",
        "Je demande à l'IA si elle en est sûre."
      ],
      bonne: 1,
      explication: "Un modèle peut citer une bibliothèque qui n'existe pas ou qui est abandonnée. La vérification se fait à la source."
    }
  },

  "dev-m3-3": {
    intro: "Renommer des fichiers, convertir un export, nettoyer des données : un petit script écrit avec l'IA évite des heures de clics.",
    blocs: [
      { type: "liste", titre: "Décrivez la tâche comme une recette", points: [
        "Le point de départ : quels fichiers, quel format, à quel endroit.",
        "Le résultat attendu, avec un exemple avant et après.",
        "Les cas particuliers : doublons, fichiers manquants.",
        "L'environnement : système, langage disponible."
      ] },
      { type: "comparaison", titre: "Exemple",
        avant: "Fais un script pour renommer mes fichiers.",
        apres: "Écris un script Python qui renomme les fichiers .jpg d'un dossier au format AAAA-MM-JJ_numéro.jpg d'après leur date de modification. Ajoute un mode simulation qui affiche les changements sans rien renommer, et ne remplace jamais un fichier existant.",
        note: "Le format cible, la règle et les protections sont écrits noir sur blanc." },
      { type: "liste", titre: "La règle de sécurité", points: [
        "Faites toujours ajouter un mode simulation, et lancez-le en premier.",
        "Testez sur une copie du dossier, jamais sur les originaux.",
        "Lisez le script avant de l'exécuter : repérez ce qu'il supprime ou écrase."
      ] },
      { type: "avous", consigne: "Pensez à une tâche que vous répétez à la main chaque semaine.", prompt: "Écris un script en [LANGAGE] qui [TÂCHE]. Exemple avant : [AVANT]. Exemple après : [APRÈS]. Ajoute un mode simulation qui affiche les changements sans les appliquer, et ne supprime ni ne remplace aucun fichier existant." }
    ],
    quiz: {
      question: "Avant de lancer un script qui renomme 500 fichiers, que faites-vous ?",
      choix: [
        "Je le lance en mode simulation, sur une copie du dossier.",
        "Je le lance directement sur les originaux.",
        "Je supprime d'abord les anciens fichiers."
      ],
      bonne: 0,
      explication: "Une erreur dans un script s'applique à tous les fichiers d'un coup. La simulation et la copie rendent l'erreur sans conséquence."
    }
  }

};
