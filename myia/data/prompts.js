/*
 * data/prompts.js — Bibliothèque de prompts.
 * - FIA.data.categoriesPrompts : les catégories, dans l'ordre d'affichage.
 * - FIA.data.prompts : les prompts propres à la bibliothèque.
 * Les prompts « À vous » des cas pratiques (data/cas.js) sont ajoutés automatiquement
 * par js/prompts.js : ne pas les recopier ici.
 *
 * Forme d'un prompt : { categorie, titre, usage (à quoi il sert), texte }
 * Les parties à remplacer sont entre crochets, en majuscules.
 */
window.FIA = window.FIA || {};
FIA.data = FIA.data || {};

FIA.data.categoriesPrompts = ["Mail", "Résumé", "Idées", "Rédaction", "Analyse", "Création", "Code"];

FIA.data.prompts = [

  /* ---------- Mail ---------- */
  { categorie: "Mail", titre: "Refuser poliment", usage: "Dire non sans froisser.",
    texte: "Réponds à ce mail en refusant poliment, en trois phrases, sans fermer la porte à une prochaine fois : [COLLEZ LE MAIL]" },
  { categorie: "Mail", titre: "Demander un rendez-vous", usage: "Obtenir un créneau en un seul échange.",
    texte: "Écris un mail court pour demander un rendez-vous à [PERSONNE] au sujet de [SUJET]. Propose deux créneaux : [CRÉNEAUX]. Ton [TON]." },
  { categorie: "Mail", titre: "Raccourcir un mail", usage: "Aller à l'essentiel avant d'envoyer.",
    texte: "Réécris ce mail en deux fois plus court, sans perdre d'information importante. Mets la demande principale dans la première phrase : [COLLEZ LE MAIL]" },

  /* ---------- Résumé ---------- */
  { categorie: "Résumé", titre: "Résumer un long document", usage: "Comprendre un texte sans tout lire.",
    texte: "Résume ce texte en 5 points pour quelqu'un qui ne connaît pas le sujet. Termine par les décisions ou actions à retenir : [COLLEZ LE TEXTE]" },
  { categorie: "Résumé", titre: "Tirer les actions d'une réunion", usage: "Passer des notes brutes à une liste d'actions.",
    texte: "À partir de ces notes de réunion, liste les décisions prises, puis les actions dans un tableau : action, responsable, échéance. N'invente rien : écris « non précisé » si l'information manque. [COLLEZ LES NOTES]" },
  { categorie: "Résumé", titre: "Expliquer un texte difficile", usage: "Rendre lisible un texte technique ou administratif.",
    texte: "Explique ce texte avec des mots simples, comme à quelqu'un qui débute. Garde les termes importants et définis-les : [COLLEZ LE TEXTE]" },

  /* ---------- Idées ---------- */
  { categorie: "Idées", titre: "Trouver des idées", usage: "Débloquer une page blanche.",
    texte: "Propose 10 idées de [QUOI] pour [PUBLIC OU OCCASION]. Contraintes : [BUDGET, DURÉE, LIEU]. Classe-les de la plus simple à la plus ambitieuse." },
  { categorie: "Idées", titre: "Trouver un nom", usage: "Nommer un projet. Vérifiez ensuite que le nom est libre.",
    texte: "Propose 15 noms pour [PROJET], qui s'adresse à [PUBLIC]. Ils doivent être courts, faciles à prononcer et évoquer [IDÉE]. Explique chaque nom en une phrase." },
  { categorie: "Idées", titre: "Voir un problème autrement", usage: "Sortir d'une impasse.",
    texte: "Voici mon problème : [PROBLÈME]. Propose cinq façons différentes de l'aborder, puis indique laquelle tu essaierais en premier et pourquoi." },

  /* ---------- Rédaction ---------- */
  { categorie: "Rédaction", titre: "Corriger sans réécrire", usage: "Supprimer les fautes en gardant votre style.",
    texte: "Corrige l'orthographe et la grammaire de ce texte sans changer le style ni le sens. Liste ensuite les corrections faites : [COLLEZ LE TEXTE]" },
  { categorie: "Rédaction", titre: "Adapter le ton", usage: "Le même message pour un autre destinataire.",
    texte: "Réécris ce texte avec un ton [TON] pour [DESTINATAIRE]. Garde toutes les informations : [COLLEZ LE TEXTE]" },
  { categorie: "Rédaction", titre: "Construire un plan", usage: "Organiser ses idées avant d'écrire.",
    texte: "Je dois écrire [TYPE DE TEXTE] sur [SUJET] pour [PUBLIC]. Propose un plan en [NOMBRE] parties, avec l'idée principale de chacune." },

  /* ---------- Analyse ---------- */
  { categorie: "Analyse", titre: "Comparer deux options", usage: "Préparer une décision.",
    texte: "Compare [OPTION A] et [OPTION B] pour [MON BESOIN]. Présente un tableau avec les critères [CRITÈRES], puis dis ce qui ferait pencher la décision d'un côté ou de l'autre." },
  { categorie: "Analyse", titre: "Lire un tableau de chiffres", usage: "Repérer les tendances. Vérifiez toujours les calculs.",
    texte: "Voici un tableau de données : [COLLEZ LE TABLEAU]. Décris les trois tendances principales, signale les valeurs anormales et précise ce que les données ne permettent pas de conclure." },
  { categorie: "Analyse", titre: "Chercher les failles", usage: "Faire critiquer un projet avant de le présenter.",
    texte: "Voici mon projet : [DESCRIPTION]. Joue le rôle d'un relecteur exigeant : liste les cinq points faibles les plus sérieux et, pour chacun, une façon de le corriger." },

  /* ---------- Création ---------- */
  { categorie: "Création", titre: "Plan d'un script vidéo", usage: "Structurer une vidéo avant de l'écrire.",
    texte: "Écris le plan d'une vidéo de [DURÉE] sur [SUJET] pour [PUBLIC] : une accroche de 15 secondes, trois parties, une conclusion. Indique ce qui est montré à l'écran à chaque partie." },
  { categorie: "Création", titre: "Décrire une image à générer", usage: "Préparer la demande pour un outil d'images.",
    texte: "Rédige une description détaillée pour générer une image : sujet [SUJET], style [STYLE], cadrage [CADRAGE], lumière [LUMIÈRE], couleurs dominantes [COULEURS]. Une seule phrase longue, sans texte dans l'image." },
  { categorie: "Création", titre: "Décliner un contenu", usage: "Tirer plusieurs publications d'un même texte.",
    texte: "À partir de ce texte, écris trois publications courtes pour [RÉSEAU], chacune avec une accroche différente et moins de [NOMBRE] caractères : [COLLEZ LE TEXTE]" },

  /* ---------- Code ---------- */
  { categorie: "Code", titre: "Expliquer du code", usage: "Comprendre un code avant de le modifier.",
    texte: "Explique ce code ligne par ligne, puis résume en deux phrases ce qu'il fait. Signale ce qui pourrait poser problème : [COLLEZ LE CODE]" },
  { categorie: "Code", titre: "Corriger une erreur", usage: "Partir du message d'erreur pour trouver la cause.",
    texte: "Ce code produit cette erreur : [MESSAGE D'ERREUR]. Explique la cause, propose une correction et indique comment vérifier qu'elle fonctionne. [COLLEZ LE CODE]" },
  { categorie: "Code", titre: "Écrire une fonction", usage: "Obtenir une fonction commentée, avec des exemples.",
    texte: "Écris en [LANGAGE] une fonction qui [CE QU'ELLE FAIT]. Entrées : [ENTRÉES]. Sortie : [SORTIE]. Commente le code et donne trois exemples d'appel avec le résultat attendu." }

];
