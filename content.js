/* =============================================================================
   CONTENU DU SITE JON ONJ — c'est le seul fichier à modifier au quotidien.
   -----------------------------------------------------------------------------
   Tu peux tout éditer ici : dates de concerts, liens, adresses e-mail.
   Pas besoin de toucher à index.html, styles.css ou main.js.

   RÈGLES SIMPLES :
     • Garde toujours les guillemets "comme ça" autour du texte.
     • Garde toujours la virgule , à la fin de chaque ligne.
     • Un accent, une apostrophe, un emoji : aucun problème.
     • Après avoir enregistré, le site se met à jour tout seul en ~1 minute.

   EN CAS DE DOUTE : ne supprime pas une ligne, mets juste // devant
   pour la désactiver temporairement.
============================================================================= */

const CONTENT = {

  /* ---------------------------------------------------------------------------
     1. DATES DE CONCERTS
     ---------------------------------------------------------------------------
     Pour AJOUTER une date  : copie un bloc { ... }, colle-le, modifie-le.
     Pour SUPPRIMER une date: efface le bloc { ... }, de l'accolade à la virgule.
     Pour une date SANS lien: laisse   link: ""   et   linkText: ""

     "date"     s'affiche tel quel  → "23/03/26"
     "venue"    le lieu             → "La Murisserie"
     "city"     la ville            → "Marseille"
     "note"     le texte après le - → "Entrée gratuite"
     "link"     l'URL de billetterie (ou "" si aucune)
     "linkText" le texte cliquable  (ou "" si aucun lien)
  --------------------------------------------------------------------------- */
  tour: [
    {
      date: "25/09/26",
      venue: "Badassery",
      city: "Lisbon",
      note: "First time in Portugal!",
      link: "https://shotgun.live/fr/events/r-b-neo-soul-showcase-curated-by-oca-collective",
      linkText: "",
    },
    {
      date: "24/10/26",
      venue: "Espace Jules Verne",
      city: "Livry Gargan",
      note: "20 ans après le premier concert de ma vie à Livry Gargan! ",
      link: "https://www.helloasso.com/associations/cap-culture-et-loisirs/evenements/concert-jon-onj",
      linkText: "",
    },
    {
      date: "03/11/26",
      venue: "La Bellevilloise",
      city: "Paris",
      note: "Informations à venir",
      link: "",
      linkText: "",
    },
    {
      date: "26/11/26",
      venue: "Le Bijou",
      city: "Toulouse",
      note: "Première fois à Toulouse!",
      link: "https://www.le-bijou.net/events/julia-pertuy-jon-onj",
      linkText: "",
    },
  ],

  /* ---------------------------------------------------------------------------
     2. AFFICHE DE TOURNÉE (image à gauche des dates)
     ---------------------------------------------------------------------------
     Pour changer l'affiche : dépose ta nouvelle image dans assets/img/
     puis écris son nom de fichier ci-dessous.
     Une image carrée d'environ 1200x1200 px est idéale.
  --------------------------------------------------------------------------- */
  tourPoster: {
    file: "tour-été-automne-26-POST-CANCER", // sans extension — voir README
    alt: "",                            // vide dans le site d'origine
  },

  /* ---------------------------------------------------------------------------
     3. VIDÉO YOUTUBE (section TOUR)
     ---------------------------------------------------------------------------
     Colle juste l'identifiant de la vidéo, pas l'URL complète.
     Exemple : https://www.youtube.com/watch?v=A6akIMmEK0s
               l'identifiant est          A6akIMmEK0s
  --------------------------------------------------------------------------- */
  video: {
    id: "A6akIMmEK0s",
    title: "Jon Onj @ Culture Box 03/06/2025",
    autoplay: true,                   // true = démarre tout seul (en sourdine)
  },

  /* ---------------------------------------------------------------------------
     4. LIENS DES ALBUMS (boutons BUY et LISTEN)
  --------------------------------------------------------------------------- */
  albums: {
    tekibama: {
      buy:    "https://jon-onj.band.fm",
      listen: "https://Wiser-Records.lnk.to/Jon-Onj-Tekibama-Album",
    },
    fochain: {
      buy:    "https://jononj.bandcamp.com/album/fochain-2",
      listen: "https://www.youtube.com/watch?v=enCkGec-vzE&list=PLTWOOfJUH32qV_OXnXc4JP9_XVtNbAC1p",
    },
  },

  /* ---------------------------------------------------------------------------
     5. CONTACTS (colonne CONTACT du bas de page)
  --------------------------------------------------------------------------- */
  contact: [
    { label: "Booking",    email: "Booking@chinesemanrecords.com" },
    { label: "Management", email: "vincent@aa-agency.fr" },
    { label: "Press",      email: "contact@biiip.fr" },
    { label: "Love",       email: "jononjmusic@gmail.com" },
  ],

  /* ---------------------------------------------------------------------------
     6. RÉSEAUX SOCIAUX (colonne FOLLOW du bas de page)
  --------------------------------------------------------------------------- */
  follow: [
    { label: "Instagram", url: "https://www.instagram.com/jon_onj/" },
    { label: "Youtube",   url: "https://www.youtube.com/@jon_onj" },
    { label: "Tik Tok",   url: "https://www.tiktok.com/@jononjmusic" },
    { label: "Facebook",  url: "https://www.facebook.com/jononjmusic" },
  ],

  /* ---------------------------------------------------------------------------
     7. NEWSLETTER — où arrivent les inscriptions
     ---------------------------------------------------------------------------
     Chaque inscription ajoute une ligne dans une feuille Google Sheets, et
     envoie un e-mail à Jon (facultatif). Tout se passe dans son compte Google :
     aucun service tiers, aucune limite, aucune clé secrète.

     "endpoint" est l'URL du script Google — voir README.md, section 4.
     Elle ressemble à :
        https://script.google.com/macros/s/AKfycb.../exec

     Ce n'est PAS un mot de passe : cette adresse ne permet que d'ajouter une
     ligne, rien d'autre. Elle peut figurer sans risque dans le code de la page.

     Tant qu'elle est vide, le formulaire bascule sur un simple e-mail :
     le site n'est jamais cassé.
  --------------------------------------------------------------------------- */
  newsletter: {
    endpoint:      "https://script.google.com/macros/s/AKfycbxbXKocwcK2Nr_OVOKvIJWw-yk4QShtZkBx0yo0gO2RZTLMRdJpISITQNDHY3BWl2msXw/exec",
    fallbackEmail: "jononjmusic@gmail.com",
  },

  /* ---------------------------------------------------------------------------
     8. TEXTES DU FORMULAIRE
  --------------------------------------------------------------------------- */
  newsletterText: {
    heading: "NEWSLETTER",
    label:   "Email Address",
    submit:  "M'inscrire",
    sending: "Please wait...",
    success: "Merci d'avoir souscrit \u00e0 ma newsletter!<br>Je t'envoie de mes nouvelles tr\u00e8s vite!<br>\u2764\ufe0f",
    error:   "oulala, petit probl\u00e8me!",
  },

  /* ---------------------------------------------------------------------------
     9. CRÉDIT EN BAS DE PAGE
     Mets une URL dans "url" pour rendre le crédit cliquable, ou "" pour rien.
  --------------------------------------------------------------------------- */
  credit: {
    text: "website + design by\nSoopaWeb",
    url:  "",
  },
};
