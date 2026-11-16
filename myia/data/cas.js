/*
 * data/cas.js — Cas pratiques.
 * Les 12 cas (trois par parcours), tous rédigés.
 * Un cas ajouté sans « contenu » s'afficherait « Bientôt » dans la liste.
 *
 * Forme d'un cas :
 *   id, parcours (identifiant de data/parcours.js), titre, produit (ce qu'on obtient à la fin)
 *   contenu : {
 *     situation, objectif,
 *     etapes : [{ titre, prompt, resultat }]   les échanges avec l'IA, dans l'ordre
 *     avous  : { categorie, consigne, prompt } la même démarche sur votre situation ;
 *                                              « categorie » (facultatif) range ce prompt dans la bibliothèque (data/prompts.js)
 *     verification : []                        points à contrôler avant d'utiliser le résultat
 *   }
 */
window.FIA = window.FIA || {};
FIA.data = FIA.data || {};

FIA.data.cas = [

  /* ---------- Grand débutant ---------- */
  {
    id: "repas-semaine", parcours: "debutant",
    titre: "Planifier les repas de la semaine",
    produit: "Un menu de sept dîners et sa liste de courses",
    contenu: {
      situation: "Vous cuisinez pour quatre personnes, avec peu de temps le soir.",
      objectif: "Un menu de sept dîners et la liste de courses correspondante.",
      etapes: [
        { titre: "Le premier prompt", prompt: "Donne-moi des idées de repas pour la semaine.",
          resultat: "Une liste de plats sans lien avec votre situation : pas de quantités, pas de temps de préparation, pas de liste de courses." },
        { titre: "Ajouter le contexte et le format", prompt: "Je cuisine pour 2 adultes et 2 enfants. Propose 7 dîners qui se préparent en 30 minutes maximum, sans poisson. Présente-les dans un tableau : jour, plat, temps de préparation.",
          resultat: "Un tableau de sept dîners adaptés à votre foyer et à votre temps." },
        { titre: "Demander la liste de courses", prompt: "À partir de ce menu, fais la liste de courses regroupée par rayon, avec les quantités pour 4 personnes.",
          resultat: "Une liste prête à emporter au magasin." },
        { titre: "Ajuster", prompt: "Remplace le plat de mercredi par un plat végétarien et mets la liste de courses à jour.",
          resultat: "Le menu et la liste sont corrigés ensemble : inutile de tout recommencer." }
      ],
      avous: { categorie: "Idées", consigne: "Refaites la démarche avec vos propres contraintes.",
        prompt: "Je cuisine pour [NOMBRE] personnes. Propose 7 dîners qui se préparent en [DURÉE] maximum, [CONTRAINTES]. Présente-les dans un tableau : jour, plat, temps de préparation." },
      verification: [
        "Les quantités correspondent au nombre de personnes.",
        "Les allergies et les régimes de chacun sont respectés : relisez chaque plat.",
        "Les temps de préparation sont réalistes pour vous."
      ]
    }
  },
  {
    id: "lettre-reclamation", parcours: "debutant",
    titre: "Écrire une lettre de réclamation",
    produit: "Une lettre prête à envoyer",
    contenu: {
      situation: "Vous avez reçu un colis abîmé. Le vendeur ne répond pas à vos messages.",
      objectif: "Une lettre de réclamation claire, prête à envoyer.",
      etapes: [
        { titre: "Le premier prompt", prompt: "Écris une lettre de réclamation.",
          resultat: "Une lettre passe-partout, sans les faits ni la demande précise." },
        { titre: "Donner les faits et la demande", prompt: "Écris une lettre de réclamation à un vendeur en ligne. Faits : commande [NUMÉRO] du [DATE], colis reçu abîmé le [DATE], deux messages restés sans réponse. Je demande un remboursement ou un remplacement sous 15 jours. Ton ferme et courtois, une page maximum.",
          resultat: "Une lettre structurée : rappel des faits, problème, demande, délai." },
        { titre: "Ajuster le ton", prompt: "Relis la lettre. Retire toute phrase agressive ou inutile et place la demande dans un paragraphe à part.",
          resultat: "Une lettre plus courte, où la demande saute aux yeux." },
        { titre: "Préparer l'envoi", prompt: "Liste les pièces à joindre à cette lettre et propose un objet pour l'envoyer aussi par mail.",
          resultat: "La liste des justificatifs (photos, facture, échanges) et un objet de mail." }
      ],
      avous: { categorie: "Rédaction", consigne: "Refaites la démarche avec votre propre litige.",
        prompt: "Écris une lettre de réclamation à [DESTINATAIRE]. Faits : [FAITS AVEC DATES]. Je demande [DEMANDE] sous [DÉLAI]. Ton ferme et courtois, une page maximum." },
      verification: [
        "Les dates, les numéros et les montants sont exacts.",
        "La demande et le délai sont écrits clairement.",
        "Vos droits et les délais légaux sont vérifiés sur un site officiel ou auprès d'une association de consommateurs : l'IA peut se tromper."
      ]
    }
  },
  {
    id: "courrier-administratif", parcours: "debutant",
    titre: "Comprendre un courrier administratif",
    produit: "Un résumé clair et la liste des démarches à faire",
    contenu: {
      situation: "Vous recevez un courrier d'une administration, long et difficile à comprendre. Avant de commencer, retirez du texte votre nom, votre adresse et vos numéros.",
      objectif: "Savoir ce que dit le courrier, ce que vous devez faire et avant quelle date.",
      etapes: [
        { titre: "Le premier prompt", prompt: "Explique-moi ce courrier : [COLLEZ LE COURRIER]",
          resultat: "Une explication correcte mais longue, qui ne dit pas clairement quoi faire." },
        { titre: "Demander l'essentiel", prompt: "Voici un courrier administratif dont j'ai retiré mes informations personnelles. Dis-moi en trois points : ce qu'il m'annonce, ce que je dois faire, et avant quelle date. [COLLEZ LE COURRIER]",
          resultat: "Trois points courts qui répondent à vos vraies questions." },
        { titre: "Éclaircir les termes", prompt: "Explique avec des mots simples les termes de ce courrier que je pourrais ne pas connaître.",
          resultat: "Un petit lexique des mots techniques du courrier." },
        { titre: "Préparer la démarche", prompt: "Liste les documents que je dois probablement rassembler et les questions à poser si j'appelle le service.",
          resultat: "Une liste pour préparer vos démarches et votre appel." }
      ],
      avous: { categorie: "Résumé", consigne: "Refaites la démarche avec un courrier que vous avez reçu.",
        prompt: "Voici un courrier dont j'ai retiré mes informations personnelles. Dis-moi en trois points : ce qu'il m'annonce, ce que je dois faire, et avant quelle date. [COLLEZ LE COURRIER]" },
      verification: [
        "Les dates et les montants cités par l'IA figurent bien dans le courrier.",
        "En cas de doute, contactez le service indiqué sur le courrier : c'est lui qui fait foi.",
        "Aucune information personnelle n'a été collée."
      ]
    }
  },

  /* ---------- Pro ou indépendant ---------- */
  {
    id: "relance-facture", parcours: "pro",
    titre: "Relancer une facture impayée",
    produit: "Trois mails de relance, du plus cordial au plus ferme",
    contenu: {
      situation: "Vous êtes indépendant. Un client n'a pas réglé une facture échue depuis trois semaines et ne répond pas.",
      objectif: "Trois mails de relance prêts à envoyer, du plus cordial au plus ferme.",
      etapes: [
        { titre: "Le premier prompt", prompt: "Écris un mail de relance pour une facture impayée.",
          resultat: "Un mail générique et trop long, sans numéro de facture ni échéance." },
        { titre: "Ajouter le contexte et le format", prompt: "Je suis graphiste indépendant. Écris un mail de relance cordial à un client pour la facture [NUMÉRO] de [MONTANT], échue depuis trois semaines. Cinq lignes maximum, avec une demande de date de paiement.",
          resultat: "Un mail court et précis, qui demande une date." },
        { titre: "Décliner en trois niveaux", prompt: "Écris deux autres versions : une plus ferme pour une deuxième relance, puis une dernière qui annonce une mise en demeure. Garde le même format.",
          resultat: "Trois mails gradués, cohérents entre eux." },
        { titre: "Faire relire par l'IA", prompt: "Relis les trois mails. Retire toute formule agressive et vérifie que chacun contient le numéro de facture, le montant et une échéance.",
          resultat: "Des mails fermes sans être blessants, avec toutes les informations utiles." }
      ],
      avous: { categorie: "Mail", consigne: "Refaites la démarche avec votre métier et votre facture.",
        prompt: "Je suis [VOTRE MÉTIER]. Écris un mail de relance cordial à un client pour la facture [NUMÉRO] de [MONTANT], échue depuis [DURÉE]. Cinq lignes maximum, avec une demande de date de paiement." },
      verification: [
        "Le numéro, le montant et la date d'échéance sont exacts.",
        "Le ton correspond à votre relation avec ce client.",
        "Tout ce qui touche au droit (pénalités, mise en demeure) est vérifié auprès d'une source fiable : l'IA peut se tromper."
      ]
    }
  },
  {
    id: "notes-compte-rendu", parcours: "pro",
    titre: "Transformer des notes en compte rendu",
    produit: "Un compte rendu avec décisions et actions",
    contenu: {
      situation: "Vous sortez d'une réunion d'une heure avec une page de notes en vrac.",
      objectif: "Un compte rendu avec les décisions, les actions et les points ouverts, prêt à diffuser.",
      etapes: [
        { titre: "Le premier prompt", prompt: "Fais un compte rendu de ces notes : [NOTES]",
          resultat: "Un texte fluide, mais qui ajoute des détails absents de vos notes." },
        { titre: "Imposer la structure", prompt: "Transforme ces notes en compte rendu : décisions, puis tableau des actions (action, responsable, échéance), puis points ouverts. N'ajoute rien qui ne soit pas dans les notes : écris « non précisé » si une information manque. [NOTES]",
          resultat: "Un compte rendu structuré et fidèle, où les manques sont visibles." },
        { titre: "Faire contrôler", prompt: "Compare le compte rendu aux notes et signale toute information qui n'y figure pas.",
          resultat: "La liste des écarts éventuels, à corriger." },
        { titre: "Préparer l'envoi", prompt: "Écris le mail d'accompagnement en trois lignes, avec ce que chacun doit faire avant la prochaine réunion.",
          resultat: "Un mail court qui rappelle à chacun son action." }
      ],
      avous: { consigne: "Refaites la démarche avec les notes de votre dernière réunion.",
        prompt: "Transforme ces notes en compte rendu : décisions, tableau des actions (action, responsable, échéance), points ouverts. N'ajoute rien : écris « non précisé » si une information manque. [COLLEZ VOS NOTES]" },
      verification: [
        "Chaque responsable et chaque échéance correspondent à vos notes.",
        "Les « non précisé » sont complétés par vous, pas par l'IA.",
        "Les informations confidentielles sont retirées avant de coller les notes, selon les règles de votre entreprise."
      ]
    }
  },
  {
    id: "proposition-commerciale", parcours: "pro",
    titre: "Préparer une proposition commerciale",
    produit: "Une proposition structurée à partir d'un brief client",
    contenu: {
      situation: "Un prospect vous a envoyé un brief de dix lignes. Vous devez répondre par une proposition avant la fin de la semaine.",
      objectif: "Une proposition structurée : compréhension du besoin, solution, déroulé, budget à compléter par vous.",
      etapes: [
        { titre: "Le premier prompt", prompt: "Écris une proposition commerciale pour ce client.",
          resultat: "Un document creux, plein de formules, sans rapport avec le brief." },
        { titre: "Partir du brief", prompt: "Voici le brief d'un prospect : [BRIEF]. Reformule son besoin en cinq points, puis liste les questions que je devrais lui poser avant de chiffrer.",
          resultat: "Une reformulation à valider et les zones d'ombre du brief." },
        { titre: "Bâtir la structure", prompt: "Je suis [MÉTIER]. Rédige le plan d'une proposition de deux pages : compréhension du besoin, solution proposée, déroulé en étapes, ce qui est inclus et exclu. Laisse le budget et les délais entre crochets : je les remplirai.",
          resultat: "Un plan solide, sans prix ni délai inventé." },
        { titre: "Rédiger et alléger", prompt: "Rédige chaque partie en style direct, sans superlatifs. Puis relis le tout et supprime ce qui pourrait s'appliquer à n'importe quel client.",
          resultat: "Une proposition qui parle de ce client, pas de vous." }
      ],
      avous: { categorie: "Rédaction", consigne: "Refaites la démarche avec un brief que vous avez reçu.",
        prompt: "Voici le brief d'un prospect : [BRIEF]. Reformule son besoin en cinq points, puis liste les questions que je devrais lui poser avant de chiffrer." },
      verification: [
        "Les prix, les délais et les engagements viennent de vous, pas de l'IA.",
        "Chaque promesse est tenable.",
        "Si le brief est confidentiel, il a été anonymisé avant d'être collé."
      ]
    }
  },

  /* ---------- Créateur de contenu ---------- */
  {
    id: "video-a-z", parcours: "createur",
    titre: "Préparer une vidéo de A à Z",
    produit: "Idée, plan de script, titre, description et brief de miniature",
    contenu: {
      situation: "Vous tenez une chaîne sur un sujet que vous connaissez et vous devez sortir une vidéo cette semaine.",
      objectif: "Une idée, un plan de script, un titre, une description et un brief de miniature.",
      etapes: [
        { titre: "Le premier prompt", prompt: "Donne-moi des idées de vidéos.",
          resultat: "Des idées générales, sans rapport avec votre chaîne ni votre public." },
        { titre: "Décrire la chaîne et le public", prompt: "Ma chaîne explique [SUJET] aux débutants, en vidéos de 8 minutes. Propose 10 idées de vidéos, chacune avec la question à laquelle elle répond.",
          resultat: "Dix idées adaptées à votre public. Vous en choisissez une." },
        { titre: "Construire le plan du script", prompt: "Pour l'idée numéro [X], écris le plan du script : une accroche de 15 secondes, trois parties, une conclusion. Indique ce que je montre à l'écran à chaque partie.",
          resultat: "Un plan détaillé, que vous réécrivez ensuite avec vos mots." },
        { titre: "Préparer la publication", prompt: "Propose 5 titres de moins de 60 caractères et une description de 3 lignes. Puis décris une miniature : texte de 3 mots maximum, image principale, couleurs.",
          resultat: "Des titres à comparer, une description et un brief à suivre pour créer la miniature." }
      ],
      avous: { categorie: "Création", consigne: "Refaites la démarche avec le sujet de votre chaîne.",
        prompt: "Ma chaîne explique [SUJET] à [PUBLIC], en vidéos de [DURÉE]. Propose 10 idées de vidéos, chacune avec la question à laquelle elle répond." },
      verification: [
        "Les faits cités dans le script sont exacts : vérifiez-les un par un.",
        "Le script est réécrit avec votre voix, pas lu tel quel.",
        "Le titre et la miniature promettent ce que la vidéo apporte vraiment."
      ]
    }
  },
  {
    id: "formats-courts", parcours: "createur",
    titre: "Décliner une vidéo en formats courts",
    produit: "Trois publications courtes tirées d'un même script",
    contenu: {
      situation: "Votre vidéo de 8 minutes est en ligne. Vous voulez en tirer trois publications courtes pour la faire connaître.",
      objectif: "Trois publications courtes, chacune avec un angle différent.",
      etapes: [
        { titre: "Le premier prompt", prompt: "Fais trois posts pour ma vidéo sur le compost.",
          resultat: "Trois textes vagues qui se répètent : l'IA n'a pas vu votre vidéo." },
        { titre: "Donner le script", prompt: "Voici le script de ma vidéo : [SCRIPT]. Repère les cinq passages les plus forts : une astuce, une erreur courante, un chiffre, une idée reçue, une phrase marquante.",
          resultat: "Cinq extraits réels de votre contenu, parmi lesquels choisir." },
        { titre: "Écrire les publications", prompt: "À partir des passages 1, 3 et 4, écris trois publications de moins de 280 caractères. Chacune commence par une accroche différente et se comprend sans avoir vu la vidéo.",
          resultat: "Trois publications distinctes, fidèles à la vidéo." },
        { titre: "Décliner en vidéo courte", prompt: "Pour le passage 1, écris le plan d'une vidéo verticale de 30 secondes : accroche de 3 secondes, démonstration, invitation à voir la vidéo complète.",
          resultat: "Un plan de vidéo courte tiré du même contenu." }
      ],
      avous: { consigne: "Refaites la démarche avec le script de votre dernière vidéo.",
        prompt: "Voici le script de ma vidéo : [SCRIPT]. Repère les cinq passages les plus forts, puis écris pour trois d'entre eux une publication de moins de [NOMBRE] caractères, chacune avec une accroche différente." },
      verification: [
        "Chaque publication reprend fidèlement ce que dit la vidéo.",
        "Le ton est le vôtre : réécrivez ce qui sonne faux.",
        "La longueur et le format conviennent à la plateforme visée."
      ]
    }
  },
  {
    id: "calendrier-editorial", parcours: "createur",
    titre: "Bâtir un calendrier éditorial",
    produit: "Un mois de publications planifiées",
    contenu: {
      situation: "Vous publiez quand vous avez le temps, sans plan. Vous voulez un mois d'avance.",
      objectif: "Un calendrier de quatre semaines, adapté au temps dont vous disposez.",
      etapes: [
        { titre: "Le premier prompt", prompt: "Fais-moi un calendrier éditorial.",
          resultat: "Un planning générique, avec des sujets qui ne sont pas les vôtres." },
        { titre: "Donner le cadre", prompt: "Ma chaîne parle de [SUJET] pour [PUBLIC]. Je peux produire une vidéo et deux publications courtes par semaine. Propose un calendrier de 4 semaines en tableau : semaine, vidéo, publications, objectif de chaque contenu.",
          resultat: "Un mois de contenus rattachés à votre sujet et à votre rythme." },
        { titre: "Équilibrer", prompt: "Vérifie que le mois alterne contenus pour débutants et contenus plus poussés, et qu'aucun sujet n'est traité deux fois. Corrige le tableau.",
          resultat: "Un calendrier varié, sans redite." },
        { titre: "Rendre le plan réaliste", prompt: "Je dispose de [NOMBRE] heures par semaine. Pour chaque vidéo, propose un jour de préparation, un jour de tournage et un jour de publication.",
          resultat: "Un planning daté qui tient dans votre semaine." }
      ],
      avous: { categorie: "Création", consigne: "Refaites la démarche avec votre chaîne et votre rythme.",
        prompt: "Ma chaîne parle de [SUJET] pour [PUBLIC]. Je peux produire [RYTHME] par semaine. Propose un calendrier de 4 semaines en tableau : semaine, contenus, objectif de chaque contenu." },
      verification: [
        "Le rythme est tenable avec le temps dont vous disposez vraiment.",
        "Chaque sujet vous intéresse et vous avez quelque chose à en dire.",
        "Les durées proposées par l'IA sont des estimations : ajustez après la première semaine."
      ]
    }
  },

  /* ---------- Développeur ---------- */
  {
    id: "page-formulaire", parcours: "dev",
    titre: "Créer une page avec formulaire",
    produit: "Une page HTML, CSS et JavaScript fonctionnelle",
    contenu: {
      situation: "Vous devez ajouter une page de contact à un site statique, sans framework.",
      objectif: "Une page HTML, CSS et JavaScript avec un formulaire validé dans le navigateur.",
      etapes: [
        { titre: "Le premier prompt", prompt: "Fais-moi un formulaire de contact.",
          resultat: "Du code sans validation ni accessibilité, dans une technologie que vous n'avez pas choisie." },
        { titre: "Préciser la technique et les règles", prompt: "Écris une page de contact en HTML, CSS et JavaScript sans framework. Champs : nom, e-mail, message. Chaque champ a un label. Valide les champs à l'envoi et affiche les erreurs sous chaque champ. Commente le code.",
          resultat: "Une page complète, lisible, qui correspond à votre projet." },
        { titre: "Faire expliquer le code", prompt: "Explique ce que fait chaque fonction JavaScript, puis indique les cas que la validation ne couvre pas.",
          resultat: "Vous comprenez le code avant de l'utiliser et vous connaissez ses limites." },
        { titre: "Améliorer l'accessibilité", prompt: "Ajoute la gestion du clavier et des lecteurs d'écran : messages d'erreur reliés aux champs, focus placé sur la première erreur.",
          resultat: "Un formulaire utilisable au clavier et avec un lecteur d'écran." }
      ],
      avous: { categorie: "Code", consigne: "Refaites la démarche avec les champs dont vous avez besoin.",
        prompt: "Écris une page en HTML, CSS et JavaScript sans framework avec un formulaire. Champs : [VOS CHAMPS]. Chaque champ a un label. Valide les champs à l'envoi et affiche les erreurs sous chaque champ. Commente le code." },
      verification: [
        "Vous avez testé la page vous-même, y compris avec des saisies fausses.",
        "Vous savez expliquer chaque ligne : ne publiez pas de code que vous ne comprenez pas.",
        "La validation dans le navigateur ne remplace pas une validation côté serveur."
      ]
    }
  },
  {
    id: "corriger-bug", parcours: "dev",
    titre: "Corriger un bug à partir d'un message d'erreur",
    produit: "Le bug identifié, corrigé et expliqué",
    contenu: {
      situation: "Une page affiche par moments « TypeError: Cannot read properties of undefined » au chargement.",
      objectif: "La cause identifiée, une correction minimale et un moyen de vérifier qu'elle tient.",
      etapes: [
        { titre: "Le premier prompt", prompt: "Pourquoi mon code plante ?",
          resultat: "Une liste de causes possibles, sans lien avec votre code." },
        { titre: "Donner les éléments", prompt: "Ce code doit afficher la liste des commandes. Il échoue par moments avec cette erreur : [MESSAGE COMPLET ET PILE D'APPELS]. Voici la fonction concernée et l'appel réseau : [CODE]. Explique la cause la plus probable.",
          resultat: "Une hypothèse précise, par exemple des données utilisées avant la fin du chargement." },
        { titre: "Confirmer avant de corriger", prompt: "Avant de corriger, indique quoi afficher dans la console pour confirmer cette cause.",
          resultat: "Deux ou trois vérifications à faire vous-même, qui confirment ou écartent l'hypothèse." },
        { titre: "Corriger au plus juste", prompt: "L'hypothèse est confirmée. Propose la correction minimale, sans réécrire le reste, et écris un test qui reproduit le bug.",
          resultat: "Un correctif de quelques lignes et un test qui échoue sans lui." }
      ],
      avous: { consigne: "Refaites la démarche avec un bug de votre projet.",
        prompt: "Ce code doit [COMPORTEMENT ATTENDU], mais échoue avec : [MESSAGE COMPLET]. Explique la cause la plus probable, indique comment la confirmer, puis propose une correction minimale. [COLLEZ LE CODE]" },
      verification: [
        "Vous avez reproduit le bug avant la correction et constaté sa disparition après.",
        "Vous comprenez pourquoi la correction fonctionne.",
        "Le correctif traite la cause : il ne se contente pas d'ignorer l'erreur en silence."
      ]
    }
  },
  {
    id: "renommer-fichiers", parcours: "dev",
    titre: "Automatiser le renommage de fichiers",
    produit: "Un script commenté et testé",
    contenu: {
      situation: "Un dossier contient 500 photos nommées IMG_0001.jpg, IMG_0002.jpg… Vous les voulez nommées par date.",
      objectif: "Un script commenté qui renomme les fichiers sans risque de perte.",
      etapes: [
        { titre: "Le premier prompt", prompt: "Fais un script pour renommer mes photos.",
          resultat: "Un script qui renomme tout de suite, sans protection ni possibilité d'essai." },
        { titre: "Décrire la règle et les protections", prompt: "Écris un script Python qui renomme les fichiers .jpg d'un dossier au format AAAA-MM-JJ_numéro.jpg d'après leur date de modification. Ajoute un mode simulation activé par défaut, ne remplace jamais un fichier existant et commente le code.",
          resultat: "Un script qui montre d'abord ce qu'il ferait, sans rien modifier." },
        { titre: "Faire expliquer", prompt: "Explique ce que fait chaque fonction et liste les situations où le script pourrait mal se comporter.",
          resultat: "Vous comprenez le script et vous connaissez ses limites avant de l'utiliser." },
        { titre: "Ajouter un filet de sécurité", prompt: "Ajoute l'écriture d'un fichier journal qui associe chaque ancien nom au nouveau, pour pouvoir revenir en arrière.",
          resultat: "Une trace complète des changements, utilisable pour annuler." }
      ],
      avous: { categorie: "Code", consigne: "Refaites la démarche avec vos fichiers et votre règle de nommage.",
        prompt: "Écris un script en [LANGAGE] qui renomme les fichiers [TYPE] d'un dossier selon cette règle : [RÈGLE]. Ajoute un mode simulation activé par défaut, un journal des changements, et ne remplace jamais un fichier existant. Commente le code." },
      verification: [
        "Vous avez lu le script en entier avant de le lancer.",
        "Le mode simulation a été lancé d'abord, sur une copie du dossier.",
        "Le journal permet bien de retrouver les anciens noms."
      ]
    }
  }

];
