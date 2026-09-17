/* ==========================================================================
   app.js — Affichage du site à partir des données de creations.js.
   Rôles : remplir les textes du site, générer les cartes, gérer les filtres
   (Tous / Logiciels / Jeux) et la recherche. Pas de dépendance externe.
   ========================================================================== */

(function () {
  "use strict";

  // Libellés affichés pour chaque type de création
  const LIBELLES_TYPE = { logiciel: "Logiciel", jeu: "Jeu" };

  // État courant de l'interface
  const etat = { filtre: "tous", recherche: "" };

  // Références DOM
  const grille = document.getElementById("grille");
  const messageVide = document.getElementById("vide");
  const champRecherche = document.getElementById("recherche");
  const boutonsFiltre = document.querySelectorAll(".filtre");

  /** Échappe le texte pour éviter toute injection HTML depuis les données. */
  function echapper(texte) {
    return String(texte ?? "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /** Convertit "AAAA-MM-JJ" en date lisible (ex. 17 sept. 2026). */
  function formaterDate(iso) {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return isNaN(d) ? iso : d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  }

  /** Injecte les textes généraux définis dans SITE. */
  function remplirTextesSite() {
    const s = typeof SITE !== "undefined" ? SITE : {};
    const lier = (id, valeur) => { if (valeur) document.getElementById(id).textContent = valeur; };
    lier("site-nom", s.nom);
    lier("site-titre", s.titre);
    lier("site-description", s.description);
    lier("site-apropos", s.apropos);
    lier("site-auteur", s.auteur);
    if (s.nom) document.title = s.nom;
    document.getElementById("annee").textContent = new Date().getFullYear();
  }

  /** Construit le HTML d'une carte de création. */
  function creerCarte(c) {
    const type = LIBELLES_TYPE[c.type] ? c.type : "logiciel";
    const image = c.image
      ? `<img class="carte__image" src="${echapper(c.image)}" alt="${echapper(c.titre)}" loading="lazy">`
      : `<div class="carte__image carte__image--vide" aria-hidden="true">${echapper((c.titre || "?").charAt(0).toUpperCase())}</div>`;

    // Infos secondaires affichées seulement si renseignées
    const infos = [
      c.version && `v${echapper(c.version)}`,
      c.plateforme && echapper(c.plateforme),
      c.taille && echapper(c.taille),
      c.date && formaterDate(c.date)
    ].filter(Boolean).map(i => `<span>${i}</span>`).join("");

    // Bouton : lien externe → nouvel onglet ; fichier local → attribut download
    const externe = /^https?:\/\//i.test(c.fichier || "");
    const bouton = c.fichier
      ? `<a class="bouton" href="${echapper(c.fichier)}" ${externe ? 'target="_blank" rel="noopener"' : "download"}>Télécharger</a>`
      : `<span class="bouton bouton--desactive">Bientôt disponible</span>`;

    return `
      <article class="carte">
        ${image}
        <div class="carte__corps">
          <span class="badge badge--${type}">${LIBELLES_TYPE[type]}</span>
          <h3 class="carte__titre">${echapper(c.titre)}</h3>
          <p class="carte__desc">${echapper(c.description)}</p>
          <div class="carte__infos">${infos}</div>
          ${bouton}
          ${c.note ? `<p class="carte__note">${echapper(c.note)}</p>` : ""}
        </div>
      </article>`;
  }

  /** Met à jour les compteurs affichés sur les boutons de filtre. */
  function majCompteurs(liste) {
    const totaux = { tous: liste.length, logiciel: 0, jeu: 0 };
    liste.forEach(c => { if (totaux[c.type] !== undefined) totaux[c.type]++; });
    Object.keys(totaux).forEach(cle => {
      const el = document.querySelector(`[data-compteur="${cle}"]`);
      if (el) el.textContent = totaux[cle];
    });
  }

  /** Filtre les créations selon l'état, trie par date décroissante et affiche. */
  function afficher() {
    const liste = typeof CREATIONS !== "undefined" && Array.isArray(CREATIONS) ? CREATIONS : [];
    const terme = etat.recherche.trim().toLowerCase();

    const resultats = liste
      .filter(c => etat.filtre === "tous" || c.type === etat.filtre)
      .filter(c => !terme || `${c.titre} ${c.description}`.toLowerCase().includes(terme))
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

    grille.innerHTML = resultats.map(creerCarte).join("");
    messageVide.hidden = resultats.length > 0;
    messageVide.textContent = liste.length === 0
      ? "Aucune création pour le moment. Revenez bientôt !"
      : "Aucun résultat pour cette recherche.";
    majCompteurs(liste);
  }

  // --- Événements ---
  boutonsFiltre.forEach(btn => {
    btn.addEventListener("click", () => {
      boutonsFiltre.forEach(b => b.classList.remove("actif"));
      btn.classList.add("actif");
      etat.filtre = btn.dataset.filtre;
      afficher();
    });
  });
  champRecherche.addEventListener("input", e => { etat.recherche = e.target.value; afficher(); });

  // --- Démarrage ---
  remplirTextesSite();
  afficher();
})();
