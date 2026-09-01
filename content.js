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
      date: "23/03/26",
      venue: "La Murisserie",
      city: "Marseille",
      note: "Entrée payantes aux dés",
      link: "",
      linkText: "",
    },
    {
      date: "24/03/26",
      venue: "Chat Orange Session",
      city: "Marseille",
      note: "Entrée gratuite sur invitation",
      link: "",
      linkText: "",
    },
    {
      date: "25/03/26",
      venue: "Café Julien",
      city: "Marseille",
      note: "",
      link: "https://espace-julien.com/agenda/carte-blanche-jon-onj",
      linkText: "Entrée gratuite sur prévente ici",
    },
    {
      date: "26/03/26",
      venue: "Lieu Secret",
      city: "Marseille",
      note: "Informations sur mes réseaux sociaux",
      link: "",
      linkText: "",
    },
    {
      date: "27/03/26",
      venue: "Le Bistrot Joseph",
      city: "Marseille",
      note: "Entrée gratuite",
      link: "",
      linkText: "",
    },
    {
      date: "28/03/26",
      venue: "La Meson",
      city: "Marseille",
      note: "",
      link: "https://www.helloasso.com/associations/la-meson/evenements/jon-onj-x-blasta-collective",
      linkText: "Préventes",
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
    file: "tour-poster",              // sans extension — voir README
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
     7. NEWSLETTER — MAILCHIMP
     ---------------------------------------------------------------------------
     Où trouver ces valeurs (une seule fois, puis on n'y touche plus) :

       Mailchimp → Audience → Signup forms → Embedded forms → Continue
       Dans le code affiché, repère la ligne qui commence par  <form action="
       Elle ressemble à :

         https://love.us21.list-manage.com/subscribe/post?u=a1b2c3d4e5f6&amp;id=7g8h9i0j&amp;f_id=00abc

       Recopie les morceaux ci-dessous :
         dc     = ce qui suit le point après ton nom de compte  → "us21"
         u      = la valeur après  u=                            → "a1b2c3d4e5f6"
         id     = la valeur après  id=                           → "7g8h9i0j"
         f_id   = la valeur après  f_id=  (peut être vide)       → "00abc"
         account= ton nom de compte avant le point               → "love"

     Tant que ces champs sont vides, le formulaire bascule automatiquement
     sur un simple e-mail — le site n'est jamais cassé.
  --------------------------------------------------------------------------- */
  mailchimp: {
    account: "",                      // ex: "jononj"
    dc:      "",                      // ex: "us21"
    u:       "",                      // ex: "a1b2c3d4e5f6"
    id:      "",                      // ex: "7g8h9i0j"
    f_id:    "",                      // ex: "00abc"  (facultatif)
    fallbackEmail: "jononjmusic@gmail.com",
  },

  /* ---------------------------------------------------------------------------
     8. TEXTES DU FORMULAIRE
  --------------------------------------------------------------------------- */
  newsletterText: {
    heading: "NEWSLETTER",
    label:   "Email Address",
    submit:  "Envoyer",
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
