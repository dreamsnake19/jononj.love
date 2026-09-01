/* =============================================================================
   JON ONJ — comportement du site
   -----------------------------------------------------------------------------
   Ce fichier lit content.js et construit la page. En temps normal tu n'as
   PAS besoin d'y toucher : tout le contenu modifiable est dans content.js.

   Ce qu'il fait :
     1. Affiche les dates de concerts
     2. Branche les boutons BUY / LISTEN
     3. Insère la vidéo YouTube
     4. Affiche les colonnes CONTACT et FOLLOW
     5. Surligne en bleu l'entrée de menu de la section visible
     6. Enregistre les inscriptions newsletter dans la feuille Google
============================================================================= */

(function () {
  "use strict";

  if (typeof CONTENT === "undefined") {
    console.error("content.js n'a pas été chargé — la page restera vide.");
    return;
  }

  var $  = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  /* -- petit utilitaire : lit "albums.tekibama.buy" dans CONTENT ----------- */
  function pluck(path) {
    return path.split(".").reduce(function (o, k) {
      return (o && o[k] !== undefined) ? o[k] : undefined;
    }, CONTENT);
  }


  /* == 1. DATES DE CONCERTS ============================================== */

  function renderTour() {
    var box = $("#tour-list");
    if (!box || !CONTENT.tour) return;
    box.textContent = "";

    CONTENT.tour.forEach(function (t) {
      var p = document.createElement("p");
      p.className = "tour-line";

      // "23/03/26 La Murisserie (Marseille) - "
      var head = t.date + " " + t.venue;
      if (t.city) head += " (" + t.city + ")";
      if (t.note || (t.link && t.linkText)) head += " - ";
      p.appendChild(document.createTextNode(head));

      if (t.note) {
        p.appendChild(document.createTextNode(t.note));
      }

      if (t.link && t.linkText) {
        if (t.note) p.appendChild(document.createTextNode(" "));
        var a = document.createElement("a");
        a.href = t.link;
        a.textContent = t.linkText;
        a.target = "_blank";
        a.rel = "noopener";
        p.appendChild(a);
      }

      box.appendChild(p);
    });
  }


  /* == 2. AFFICHE DE TOURNÉE ============================================= */

  function renderPoster() {
    var img = $("#tour-poster");
    if (!img || !CONTENT.tourPoster) return;

    if (CONTENT.tourPoster.alt !== undefined) {
      img.alt = CONTENT.tourPoster.alt;
    }

    // Si le nom de fichier a changé, on reconstruit src + srcset.
    var file = CONTENT.tourPoster.file;
    if (file && file !== "tour-poster") {
      img.src = "assets/img/" + file + ".webp";
      img.removeAttribute("srcset");
      img.removeAttribute("sizes");
    }
  }


  /* == 3. BOUTONS BUY / LISTEN =========================================== */

  function renderAlbumLinks() {
    $$("[data-link]").forEach(function (el) {
      var url = pluck(el.getAttribute("data-link"));
      if (url) {
        el.href = url;
      } else {
        el.removeAttribute("href");          // pas d'URL : bouton inactif
        el.setAttribute("aria-disabled", "true");
      }
    });
  }


  /* == 4. VIDÉO YOUTUBE ================================================== */

  function renderVideo() {
    var box = $("#video");
    if (!box || !CONTENT.video || !CONTENT.video.id) return;

    var params = "rel=0&controls=1&start=0";
    // Autoplay n'est autorisé par les navigateurs que si la vidéo est muette.
    params += CONTENT.video.autoplay ? "&autoplay=1&mute=1" : "&autoplay=0";

    var f = document.createElement("iframe");
    f.src = "https://www.youtube.com/embed/" + CONTENT.video.id + "?" + params;
    f.title = CONTENT.video.title || "";
    f.allow = "autoplay; encrypted-media";
    f.allowFullscreen = true;
    f.setAttribute("frameborder", "0");
    box.appendChild(f);
  }


  /* == 5. COLONNES CONTACT ET FOLLOW ===================================== */

  function renderList(sel, items, hrefFor, external) {
    var ul = $(sel);
    if (!ul || !items) return;
    ul.textContent = "";

    items.forEach(function (item) {
      var li = document.createElement("li");
      var a  = document.createElement("a");
      a.className   = "footer-link";
      a.href        = hrefFor(item);
      a.textContent = item.label;
      if (external) { a.target = "_blank"; a.rel = "noopener"; }
      li.appendChild(a);
      ul.appendChild(li);
    });
  }


  /* == 6. CRÉDIT ========================================================= */

  function renderCredit() {
    var el = $("#credit");
    if (!el || !CONTENT.credit) return;

    el.textContent = "";
    CONTENT.credit.text.split("\n").forEach(function (line, i) {
      if (i) el.appendChild(document.createElement("br"));
      el.appendChild(document.createTextNode(line));
    });

    if (CONTENT.credit.url) {
      el.href   = CONTENT.credit.url;
      el.target = "_blank";
      el.rel    = "noopener";
    } else {
      el.setAttribute("href", "#");
    }
  }


  /* == 7. SURLIGNAGE DU MENU (remplace le scrollspy de Webflow) ==========
     Webflow ajoutait la classe w--current au lien de la section visible.
     On reproduit ça avec aria-current, qui est aussi lu par les lecteurs
     d'écran. Le style bleu correspondant est dans styles.css. */

  function initScrollSpy() {
    var links = $$(".btn-nav").filter(function (a) {
      return a.getAttribute("href").charAt(0) === "#";
    });
    if (!links.length) return;

    var targets = links.map(function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    });

    var navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10
    ) || 61;

    var ticking = false;

    function update() {
      ticking = false;
      var y = window.scrollY + navH + 2;
      var active = -1;

      targets.forEach(function (sec, i) {
        if (sec && sec.offsetTop <= y) active = i;
      });

      // Tout en bas de page : la dernière section est forcément l'active.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        active = links.length - 1;
      }

      links.forEach(function (a, i) {
        if (i === active) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    }

    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }


  /* == 8. FORMULAIRE NEWSLETTER ==========================================
     GitHub Pages ne sert que des fichiers : aucun serveur ne peut recevoir le
     formulaire. On envoie donc l'adresse à un petit script Google Apps Script
     qui tourne dans le compte de Jon (voir tools/newsletter-google-script.gs).
     Il ajoute une ligne dans sa feuille de calcul et lui envoie un e-mail.

     Aucune clé, aucun jeton : l'URL du script ne permet que d'ajouter une
     ligne. Rien à cacher, donc rien à protéger. */

  function initForm() {
    var form   = $("#newsletter");
    var status = $("#form-status");
    var input  = $("#email");
    var button = form && form.querySelector(".submit-button");
    if (!form || !status || !input || !button) return;

    var txt  = CONTENT.newsletterText || {};
    var conf = CONTENT.newsletter || {};

    // content.js fait foi pour le libellé du bouton.
    if (txt.submit) button.textContent = txt.submit;
    var idleLabel = button.textContent;

    function say(html, isError) {
      status.innerHTML = html;
      status.classList.toggle("is-error", Boolean(isError));
      status.hidden = false;
    }

    function finish(ok) {
      button.disabled = false;
      button.textContent = idleLabel;
      if (ok) { say(txt.success || ""); form.reset(); }
      else    { say(txt.error || "", true); }
    }

    /* L'en-tête text/plain est volontaire : il fait de la requête une
       « simple request », donc sans pré-vol OPTIONS — que les scripts Google
       ne savent pas traiter. Le script lit quand même du JSON à l'arrivée. */
    function send(url, payload) {
      var opts = {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      };
      return fetch(url, opts)
        .then(function (r) {
          return r.json().then(
            function (d) { return d.ok !== false; },
            function ()  { return r.ok; }          // réponse non-JSON : on se fie au statut
          );
        })
        .catch(function () {
          /* Si le navigateur refuse de nous laisser lire la réponse, on renvoie
             en "no-cors" : la donnée arrive bien côté Google, on ne peut
             simplement pas lire le retour. Mieux vaut enregistrer l'inscription
             que la perdre — le script ignore les doublons, donc ce second envoi
             est sans risque. */
          return fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload),
          }).then(function () { return true; });
        });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Champ piège rempli => c'est un robot, on ne fait rien.
      var hp = form.querySelector('input[name="_honey"]');
      if (hp && hp.value) return;

      var email = input.value.trim();
      if (!email || !input.checkValidity()) {
        say(txt.error || "", true);
        input.focus();
        return;
      }

      // Pas encore branché : on ouvre un e-mail pré-rempli.
      if (!conf.endpoint) {
        if (conf.fallbackEmail) {
          window.location.href = "mailto:" + conf.fallbackEmail
            + "?subject=" + encodeURIComponent("Newsletter")
            + "&body=" + encodeURIComponent(email);
        }
        return;
      }

      button.disabled = true;
      button.textContent = txt.sending || idleLabel;

      send(conf.endpoint, { email: email, source: location.hostname })
        .then(finish)
        .catch(function () { finish(false); });
    });
  }


  /* == DÉMARRAGE ========================================================= */

  renderTour();
  renderPoster();
  renderAlbumLinks();
  renderVideo();
  renderList("#contact-list", CONTENT.contact, function (c) { return "mailto:" + c.email; }, false);
  renderList("#follow-list",  CONTENT.follow,  function (f) { return f.url; }, true);
  renderCredit();
  initScrollSpy();
  initForm();

})();
