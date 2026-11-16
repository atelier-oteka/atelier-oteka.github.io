/*
 * sw.js — Service worker de Myia : fonctionnement hors ligne.
 * - À l'installation : met en cache tous les fichiers de l'application (liste FICHIERS).
 * - À chaque requête : répond depuis le cache, puis met la copie à jour en arrière-plan.
 *   Une modification publiée apparaît donc à la deuxième ouverture de l'application.
 * - Les polices Google Fonts sont mises en cache à leur première utilisation.
 *
 * Quand un fichier est AJOUTÉ ou SUPPRIMÉ : mettre la liste FICHIERS à jour et augmenter VERSION.
 */
var VERSION = "myia-v1";

var FICHIERS = [
  "a-propos.html",
  "cas-pratiques.html",
  "cas.html",
  "index.html",
  "lecon.html",
  "manifest.webmanifest",
  "outils.html",
  "parcours.html",
  "programme.html",
  "progression.html",
  "prompts.html",
  "quiz.html",
  "./",
  "css/base.css",
  "css/composants.css",
  "data/cas.js",
  "data/lecons.js",
  "data/outils.js",
  "data/parcours.js",
  "data/prompts.js",
  "data/quiz.js",
  "icones/icone-180.png",
  "icones/icone-192.png",
  "icones/icone-512.png",
  "icones/icone-masquable-512.png",
  "js/cas-pratiques.js",
  "js/cas.js",
  "js/commun.js",
  "js/lecon.js",
  "js/ma-progression.js",
  "js/outils.js",
  "js/parcours.js",
  "js/programme.js",
  "js/progression.js",
  "js/prompts.js",
  "js/quiz.js"
];

/* Installation : tout mettre en cache, puis prendre le relais sans attendre. */
self.addEventListener("install", function (evenement) {
  evenement.waitUntil(
    caches.open(VERSION).then(function (cache) { return cache.addAll(FICHIERS); }).then(function () { return self.skipWaiting(); })
  );
});

/* Activation : supprimer les caches des anciennes versions. */
self.addEventListener("activate", function (evenement) {
  evenement.waitUntil(
    caches.keys().then(function (noms) {
      return Promise.all(noms.filter(function (nom) { return nom !== VERSION; }).map(function (nom) { return caches.delete(nom); }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Indique si une requête concerne les polices Google Fonts. */
function estUnePolice(url) {
  return url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
}

/* Requêtes : cache d'abord, réseau en arrière-plan pour rafraîchir la copie. */
self.addEventListener("fetch", function (evenement) {
  var requete = evenement.request;
  var url = new URL(requete.url);
  var interne = url.origin === self.location.origin;
  if (requete.method !== "GET" || (!interne && !estUnePolice(url))) { return; }

  evenement.respondWith(
    caches.open(VERSION).then(function (cache) {
      return cache.match(requete, { ignoreSearch: interne }).then(function (enCache) {
        var reseau = fetch(requete).then(function (reponse) {
          if (reponse && (reponse.ok || reponse.type === "opaque")) { cache.put(requete, reponse.clone()); }
          return reponse;
        }).catch(function () { return enCache; });
        return enCache || reseau;
      });
    })
  );
});
