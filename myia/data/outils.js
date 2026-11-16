/*
 * data/outils.js — Comparatif d'outils d'IA, classé par besoin.
 * - FIA.data.outilsVerification : date de la dernière vérification (à mettre à jour à chaque révision).
 * - FIA.data.besoins : les besoins, dans l'ordre d'affichage, avec un conseil pour choisir.
 * - FIA.data.outils  : les outils. Dans chaque besoin, ils sont rangés par ordre alphabétique,
 *   sans classement : le site ne recommande pas un outil plutôt qu'un autre.
 *
 * Forme d'un outil : { besoin, nom, editeur, usage, gratuit, note, url (site officiel) }
 * Ne pas écrire de prix ni de quotas chiffrés : ils changent trop souvent.
 */
window.FIA = window.FIA || {};
FIA.data = FIA.data || {};

FIA.data.outilsVerification = "16 novembre 2026";

FIA.data.besoins = [
  { id: "texte", label: "Texte", conseil: "Les quatre assistants font le même travail de base. Essayez-en deux avec le même prompt et gardez celui dont les réponses vous conviennent." },
  { id: "image", label: "Image", conseil: "Pour une image occasionnelle, l'assistant que vous utilisez déjà suffit souvent. Un outil spécialisé se justifie pour du texte dans l'image ou un style précis." },
  { id: "video", label: "Vidéo", conseil: "Les clips générés durent quelques secondes. Commencez par une offre gratuite pour juger le résultat avant de payer." },
  { id: "code", label: "Code", conseil: "Débutez avec un outil intégré à votre éditeur. Les agents en ligne de commande conviennent mieux une fois les bases acquises." }
];

FIA.data.outils = [

  /* ---------- Texte ---------- */
  { besoin: "texte", nom: "ChatGPT", editeur: "OpenAI", usage: "Assistant généraliste : rédiger, résumer, expliquer, chercher des idées.",
    gratuit: "Oui, avec des limites", note: "Les fonctions avancées (fichiers, images, voix) sont plus limitées en gratuit.", url: "https://chatgpt.com" },
  { besoin: "texte", nom: "Claude", editeur: "Anthropic", usage: "Assistant généraliste : rédiger, résumer, analyser des documents.",
    gratuit: "Oui, avec des limites", note: "L'usage gratuit est plafonné par session et par semaine.", url: "https://claude.ai" },
  { besoin: "texte", nom: "Gemini", editeur: "Google", usage: "Assistant généraliste, relié aux services Google.",
    gratuit: "Oui, avec des limites", note: "Un compte Google est nécessaire.", url: "https://gemini.google.com" },
  { besoin: "texte", nom: "Mistral (Le Chat)", editeur: "Mistral AI", usage: "Assistant généraliste d'un éditeur français, hébergé en Europe.",
    gratuit: "Oui, avec des limites", note: "Nombre de messages et de recherches limité en gratuit. Le nom du produit a évolué : vérifiez sur le site.", url: "https://mistral.ai" },

  /* ---------- Image ---------- */
  { besoin: "image", nom: "Adobe Firefly", editeur: "Adobe", usage: "Images pour un usage professionnel, intégré aux logiciels Adobe.",
    gratuit: "Oui, quelques images par jour", note: "Ses propres modèles sont entraînés sur des contenus sous licence.", url: "https://firefly.adobe.com" },
  { besoin: "image", nom: "ChatGPT ou Gemini", editeur: "OpenAI, Google", usage: "Créer et retoucher une image en discutant, sans changer d'outil.",
    gratuit: "Oui, avec des limites", note: "Le plus simple pour commencer si vous utilisez déjà l'un des deux.", url: "https://chatgpt.com" },
  { besoin: "image", nom: "Ideogram", editeur: "Ideogram", usage: "Affiches, miniatures et visuels qui contiennent du texte.",
    gratuit: "Oui, crédits limités", note: "En gratuit, les images créées sont publiques.", url: "https://ideogram.ai" },
  { besoin: "image", nom: "Midjourney", editeur: "Midjourney", usage: "Images au style artistique marqué.",
    gratuit: "Non", note: "Abonnement nécessaire dès la première image.", url: "https://www.midjourney.com" },

  /* ---------- Vidéo ---------- */
  { besoin: "video", nom: "Kling", editeur: "Kuaishou", usage: "Courts clips à partir d'un texte ou d'une image, mouvements réalistes.",
    gratuit: "Oui, très limité", note: "En gratuit : filigrane sur les vidéos et pas d'usage commercial.", url: "https://klingai.com" },
  { besoin: "video", nom: "Runway", editeur: "Runway", usage: "Génération de clips avec des outils de montage et de contrôle de caméra.",
    gratuit: "Essai", note: "Des crédits offerts une seule fois à l'inscription, puis abonnement.", url: "https://runwayml.com" },
  { besoin: "video", nom: "Veo", editeur: "Google", usage: "Clips avec le son généré en même temps que l'image.",
    gratuit: "Oui, très limité", note: "Accessible depuis l'application Gemini.", url: "https://gemini.google.com" },

  /* ---------- Code ---------- */
  { besoin: "code", nom: "Claude Code", editeur: "Anthropic", usage: "Agent qui modifie plusieurs fichiers et lance des commandes, depuis le terminal ou l'éditeur.",
    gratuit: "Non", note: "Demande un abonnement Claude payant.", url: "https://claude.com" },
  { besoin: "code", nom: "Cursor", editeur: "Anysphere", usage: "Éditeur de code complet construit autour de l'IA.",
    gratuit: "Oui, avec des limites", note: "Remplace votre éditeur habituel : il faut accepter de changer d'outil.", url: "https://cursor.com" },
  { besoin: "code", nom: "GitHub Copilot", editeur: "GitHub (Microsoft)", usage: "Suggestions et discussion dans votre éditeur actuel.",
    gratuit: "Oui, quota mensuel", note: "Le plus simple pour débuter si vous utilisez déjà VS Code.", url: "https://github.com/features/copilot" }

];
