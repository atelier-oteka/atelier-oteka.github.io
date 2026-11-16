/*
 * data/quiz.js — Quiz de révision, un par module.
 * Rangés par identifiant de module (voir data/parcours.js) : « bases », « pro-m2 »…
 * Un module absent de ce fichier s'affiche « Bientôt » sur la page Quiz.
 * Ces questions sont différentes de la question de fin de chaque leçon (data/lecons.js).
 *
 * Forme d'une question : { question, choix: [], bonne: rang de la bonne réponse (0 = premier), explication }
 */
window.FIA = window.FIA || {};
FIA.data = FIA.data || {};

FIA.data.quiz = {

  "bases": [
    { question: "Pourquoi une IA générative peut-elle affirmer une chose fausse ?",
      choix: [
        "Parce qu'elle cherche à tromper.",
        "Parce qu'elle produit le texte le plus probable, pas un fait vérifié.",
        "Parce qu'elle recopie des sites peu fiables."
      ],
      bonne: 1,
      explication: "Elle rédige la suite de mots la plus probable. Le résultat est souvent juste, mais rien ne le garantit." },
    { question: "Quels sont les trois éléments d'un bon prompt ?",
      choix: [
        "Le contexte, la tâche et le format.",
        "Un bonjour, une question et un merci.",
        "Un mot-clé, un lien et une image."
      ],
      bonne: 0,
      explication: "Qui vous êtes et pour qui (contexte), ce que l'IA doit produire (tâche), et sous quelle forme (format)." },
    { question: "Quel prompt est le plus précis ?",
      choix: [
        "Idées de cadeaux.",
        "Aide-moi pour un cadeau, s'il te plaît.",
        "Propose 5 idées de cadeaux à moins de 30 euros pour une collègue qui part à la retraite."
      ],
      bonne: 2,
      explication: "Il donne le nombre d'idées, le budget et la personne concernée. La politesse ne remplace pas la précision." },
    { question: "Que faut-il vérifier en priorité dans une réponse de l'IA ?",
      choix: [
        "La longueur du texte.",
        "Les chiffres, les dates, les noms et les sources.",
        "Le nombre de paragraphes."
      ],
      bonne: 1,
      explication: "Ce sont les éléments sur lesquels l'IA se trompe ou invente le plus souvent." },
    { question: "Avant de coller un document dans un assistant IA, que faites-vous ?",
      choix: [
        "Rien de particulier.",
        "J'ajoute mon mot de passe pour qu'il puisse y accéder.",
        "Je retire les informations personnelles ou confidentielles."
      ],
      bonne: 2,
      explication: "Un texte anonymisé ne révèle rien sur personne. Un mot de passe ne se partage jamais." }
  ],

  "debutant-m2": [
    { question: "Que préciser pour obtenir une explication claire ?",
      choix: [
        "Votre niveau, la forme souhaitée et la longueur.",
        "Uniquement le sujet, en un mot.",
        "Le plus de termes techniques possible."
      ],
      bonne: 0,
      explication: "Ces trois réglages adaptent l'explication à vous, au lieu d'une réponse générale." },
    { question: "Que préciser quand vous demandez un résumé ?",
      choix: [
        "Rien : l'IA devine ce qui compte.",
        "La longueur et ce que vous cherchez dans le texte.",
        "Seulement le nom de l'auteur."
      ],
      bonne: 1,
      explication: "Un résumé utile répond à votre question : que retenir, que faire, avant quand." },
    { question: "Pour un document qui vous engage, le résumé de l'IA…",
      choix: [
        "remplace la lecture du document.",
        "est forcément complet.",
        "ne dispense pas de relire les passages clés."
      ],
      bonne: 2,
      explication: "Un résumé peut omettre ou déformer un point. L'original fait foi." },
    { question: "Quel prompt donnera le message le plus adapté ?",
      choix: [
        "Écris un message.",
        "Écris un message cordial à ma propriétaire pour signaler une fuite, en trois phrases.",
        "Message propriétaire fuite."
      ],
      bonne: 1,
      explication: "Il donne le destinataire, le but, le ton et la longueur." },
    { question: "Comment obtenir de meilleures idées ?",
      choix: [
        "En donnant vos contraintes et en demandant un nombre précis d'idées.",
        "En posant la question la plus courte possible.",
        "En renvoyant plusieurs fois la même question."
      ],
      bonne: 0,
      explication: "Les contraintes orientent les idées, et un nombre précis vous donne du choix." }
  ],

  "debutant-m3": [
    { question: "Pourquoi donner un exemple dans un prompt ?",
      choix: [
        "Pour allonger la demande.",
        "Pour montrer la forme et le ton attendus.",
        "Parce que l'IA ne répond pas sans exemple."
      ],
      bonne: 1,
      explication: "L'IA imite bien un modèle : l'exemple lui montre ce que vous attendez." },
    { question: "La première réponse de l'IA est…",
      choix: [
        "définitive.",
        "toujours la meilleure possible.",
        "un brouillon à faire ajuster."
      ],
      bonne: 2,
      explication: "Quelques consignes courtes (« plus court », « plus chaleureux ») suffisent souvent à l'améliorer." },
    { question: "Dans une même conversation, l'IA…",
      choix: [
        "tient compte de ce qui a déjà été dit.",
        "oublie tout à chaque message.",
        "connaît vos échanges avec tous les autres outils."
      ],
      bonne: 0,
      explication: "C'est ce qui permet de demander un ajustement sans tout réexpliquer." },
    { question: "Que ne faut-il jamais coller dans un assistant ?",
      choix: [
        "Une recette de cuisine.",
        "Un mot de passe ou un numéro de carte.",
        "Un article de journal."
      ],
      bonne: 1,
      explication: "Les mots de passe, codes et numéros de carte ne se partagent avec aucun outil." },
    { question: "Vous voulez de l'aide sur un message reçu d'un ami. Que faites-vous ?",
      choix: [
        "Je le colle avec son nom et son numéro.",
        "Je demande à l'IA de retrouver cet ami.",
        "Je remplace son nom avant de coller le message."
      ],
      bonne: 2,
      explication: "Les informations d'un proche se protègent comme les vôtres." }
  ],

  "pro-m2": [
    { question: "Quelles informations donner pour faire rédiger un mail ?",
      choix: [
        "Le destinataire, l'objectif, les faits et le ton.",
        "Seulement l'objet du mail.",
        "Votre signature."
      ],
      bonne: 0,
      explication: "Avec ces quatre informations, l'IA n'a plus rien à deviner ni à inventer." },
    { question: "Vous devez décider à partir d'un long rapport. Que demandez-vous ?",
      choix: [
        "Un résumé général.",
        "Un résumé orienté vers votre décision, avec les points à vérifier.",
        "Le texte entier reformulé."
      ],
      bonne: 1,
      explication: "Un résumé utile part de votre objectif, et vous dit quoi contrôler dans l'original." },
    { question: "Un ordre du jour proposé par l'IA…",
      choix: [
        "est à envoyer tel quel.",
        "remplace la préparation de la réunion.",
        "doit être ajusté avec ce que vous savez des personnes et de l'historique."
      ],
      bonne: 2,
      explication: "L'IA ignore le contexte humain de la réunion : c'est à vous de l'apporter." },
    { question: "Dans un compte rendu, que demander pour les actions ?",
      choix: [
        "Un paragraphe libre.",
        "Qui fait quoi, pour quand.",
        "Rien de particulier."
      ],
      bonne: 1,
      explication: "Une action sans responsable ni échéance n'est généralement pas suivie." },
    { question: "Une échéance manque dans vos notes. Que doit écrire l'IA ?",
      choix: [
        "« Non précisé ».",
        "Une date plausible.",
        "La date du jour."
      ],
      bonne: 0,
      explication: "Un compte rendu ne doit contenir que ce qui a été dit. Un manque visible vaut mieux qu'une date inventée." }
  ],

  "pro-m3": [
    { question: "« Rends ce texte plus professionnel » est une consigne…",
      choix: [
        "idéale.",
        "trop vague : il manque le destinataire et le registre.",
        "trop longue."
      ],
      bonne: 1,
      explication: "Le ton juste dépend de la personne qui lit. Sans elle, l'IA choisit au hasard." },
    { question: "Après un changement de ton, que faut-il vérifier ?",
      choix: [
        "Que le texte est plus long.",
        "Que les phrases commencent différemment.",
        "Qu'aucun fait ni chiffre n'a disparu."
      ],
      bonne: 2,
      explication: "En reformulant, l'IA peut supprimer ou modifier une information." },
    { question: "Sur un tableau de chiffres, l'IA est surtout fiable pour…",
      choix: [
        "décrire des tendances à explorer.",
        "garantir chaque calcul.",
        "expliquer avec certitude les causes."
      ],
      bonne: 0,
      explication: "Elle aide à lire et à questionner les données. Les calculs et les causes se vérifient." },
    { question: "Avant de coller un tableau de ventes, que faites-vous ?",
      choix: [
        "Rien de particulier.",
        "Je retire les noms de clients et de salariés.",
        "J'ajoute les coordonnées des clients."
      ],
      bonne: 1,
      explication: "L'analyse n'a pas besoin des noms, et ces données ne vous appartiennent pas." },
    { question: "À quoi sert un modèle de prompt ?",
      choix: [
        "À allonger ses demandes.",
        "À obtenir des réponses différentes à chaque fois.",
        "À ne pas réécrire une demande que l'on fait souvent."
      ],
      bonne: 2,
      explication: "Un modèle fait gagner du temps et donne des résultats plus réguliers." }
  ],

  "createur-m2": [
    { question: "Que dire à l'IA pour obtenir de bonnes idées de vidéos ?",
      choix: [
        "Le sujet de la chaîne, le public et le format.",
        "Uniquement votre nombre d'abonnés.",
        "Rien : elle connaît votre chaîne."
      ],
      bonne: 0,
      explication: "Ces trois informations transforment des idées générales en idées pour votre chaîne." },
    { question: "Dans quel ordre travailler un script avec l'IA ?",
      choix: [
        "Le texte entier d'un seul coup.",
        "Le plan d'abord, puis le texte partie par partie.",
        "La conclusion uniquement."
      ],
      bonne: 1,
      explication: "Un plan se corrige vite, et chaque partie peut ensuite recevoir vos exemples." },
    { question: "Avant de tourner, que faire du script ?",
      choix: [
        "Le lire tel quel.",
        "Le raccourcir au hasard.",
        "Le lire à voix haute et vérifier les faits."
      ],
      bonne: 2,
      explication: "Un texte écrit ne sonne pas toujours juste à l'oral, et l'IA peut se tromper sur un fait." },
    { question: "Une miniature efficace contient…",
      choix: [
        "une seule idée et trois mots au maximum.",
        "le résumé de la vidéo.",
        "le plus d'éléments possible."
      ],
      bonne: 0,
      explication: "Elle est vue en petit et en une seconde : une idée, peu de mots." },
    { question: "Un bon titre…",
      choix: [
        "exagère pour attirer.",
        "tient la promesse de la vidéo en peu de mots.",
        "reprend toute la description."
      ],
      bonne: 1,
      explication: "Un titre court et fidèle attire le bon public et ne le déçoit pas." }
  ],

  "createur-m3": [
    { question: "Quels éléments décrire pour générer une image ?",
      choix: [
        "Seulement le sujet.",
        "Le sujet, le style, le cadrage et la lumière.",
        "La taille du fichier."
      ],
      bonne: 1,
      explication: "Chaque élément précisé rapproche l'image de ce que vous avez en tête." },
    { question: "Pour le texte à afficher sur une image générée, il vaut mieux…",
      choix: [
        "le faire écrire par l'outil d'images.",
        "y renoncer.",
        "l'ajouter soi-même ensuite."
      ],
      bonne: 2,
      explication: "Ajouté dans un logiciel, le texte est net, sans faute et modifiable." },
    { question: "Générer l'image d'une personne réelle ou d'une marque…",
      choix: [
        "est à éviter sans accord.",
        "ne pose aucun problème.",
        "est conseillé pour attirer l'attention."
      ],
      bonne: 0,
      explication: "L'image d'une personne et les marques sont protégées." },
    { question: "Quand on décline un contenu, chaque publication doit…",
      choix: [
        "répéter la précédente.",
        "avoir son propre angle et se comprendre seule.",
        "renvoyer au script complet."
      ],
      bonne: 1,
      explication: "Celui qui lit une publication n'a pas vu les autres." },
    { question: "À quoi sert une fiche de style ?",
      choix: [
        "À changer de style à chaque contenu.",
        "À remplacer vos idées.",
        "À faire écrire l'IA avec votre ton, d'une demande à l'autre."
      ],
      bonne: 2,
      explication: "Elle donne à l'IA un point de départ qui vous ressemble." }
  ],

  "dev-m2": [
    { question: "Que préciser pour obtenir du code exploitable ?",
      choix: [
        "Le langage, les entrées, les sorties et les contraintes.",
        "Seulement le nom de la fonction.",
        "Rien : l'assistant devine le projet."
      ],
      bonne: 0,
      explication: "L'assistant ne connaît pas votre projet : ces informations remplacent le contexte qui lui manque." },
    { question: "Pourquoi demander une fonction à la fois ?",
      choix: [
        "Pour que la réponse arrive plus vite.",
        "Parce qu'un petit morceau de code se lit et se teste facilement.",
        "Parce que l'IA ne sait écrire qu'une fonction."
      ],
      bonne: 1,
      explication: "Vous pouvez relire, exécuter et corriger chaque unité avant de passer à la suivante." },
    { question: "Pour un bug, quelle information est indispensable ?",
      choix: [
        "L'heure à laquelle il est apparu.",
        "Votre avis sur le langage.",
        "Le message d'erreur complet et le comportement attendu."
      ],
      bonne: 2,
      explication: "Sans le message d'erreur ni le résultat attendu, l'IA ne peut que deviner." },
    { question: "Une clé d'API placée dans le JavaScript d'une page web…",
      choix: [
        "peut être lue par tous les visiteurs.",
        "est protégée par le navigateur.",
        "ne présente aucun risque."
      ],
      bonne: 0,
      explication: "Tout le code envoyé au navigateur est lisible. La clé doit rester côté serveur." },
    { question: "Un test généré par l'IA est utile s'il…",
      choix: [
        "passe quoi qu'il arrive.",
        "échoue quand le code est faux.",
        "est long."
      ],
      bonne: 1,
      explication: "Un test qui ne peut pas échouer ne vérifie rien." }
  ],

  "dev-m3": [
    { question: "Comment obtenir un JSON exploitable par votre programme ?",
      choix: [
        "En demandant simplement « du JSON ».",
        "En décrivant le schéma et en donnant un exemple valide.",
        "En écrivant le prompt en majuscules."
      ],
      bonne: 1,
      explication: "Un schéma précis et un exemple laissent peu de place aux variations de format." },
    { question: "Que faire si le JSON reçu est invalide ?",
      choix: [
        "Laisser le programme planter.",
        "L'utiliser quand même.",
        "Prévoir une nouvelle tentative ou une valeur par défaut."
      ],
      bonne: 2,
      explication: "Une réponse mal formée finira par arriver : le programme doit savoir quoi faire ce jour-là." },
    { question: "La relecture de code par l'IA…",
      choix: [
        "complète la relecture humaine.",
        "garantit l'absence de failles.",
        "ne sert à rien."
      ],
      bonne: 0,
      explication: "Elle repère vite des erreurs courantes, mais peut en manquer et en signaler de fausses." },
    { question: "Avant de publier, que faut-il chercher dans le code ?",
      choix: [
        "Les commentaires trop longs.",
        "Les clés et mots de passe laissés par erreur.",
        "Les lignes vides."
      ],
      bonne: 1,
      explication: "Un secret publié doit être considéré comme compromis et remplacé." },
    { question: "Qu'ajouter à un script qui modifie des fichiers ?",
      choix: [
        "La suppression automatique des originaux.",
        "Rien de particulier.",
        "Un mode simulation qui montre les changements sans les appliquer."
      ],
      bonne: 2,
      explication: "La simulation permet de voir l'effet du script avant qu'il ne touche à quoi que ce soit." }
  ]

};
