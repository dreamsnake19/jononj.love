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
     6. Envoie le formulaire newsletter à Mailchimp
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


  /* == 8. FORMULAIRE NEWSLETTER (Mailchimp) ==============================
     GitHub Pages ne sert que des fichiers : il n'y a pas de serveur pour
     recevoir le formulaire. On passe donc directement par Mailchimp, via
     son endpoint public "post-json" (technique JSONP officielle des
     formulaires embarqués Mailchimp).

     Si Mailchimp n'est pas encore configuré dans content.js, on bascule
     sur un simple e-mail : le formulaire n'est jamais cassé. */

  function mailchimpConfigured() {
    var m = CONTENT.mailchimp || {};
    return Boolean(m.account && m.dc && m.u && m.id);
  }

  function mailchimpUrl(email) {
    var m = CONTENT.mailchimp;
    var url = "https://" + m.account + "." + m.dc + ".list-manage.com/subscribe/post-json"
            + "?u=" + encodeURIComponent(m.u)
            + "&id=" + encodeURIComponent(m.id);
    if (m.f_id) url += "&f_id=" + encodeURIComponent(m.f_id);
    url += "&EMAIL=" + encodeURIComponent(email);
    return url;
  }

  function initForm() {
    var form   = $("#newsletter");
    var status = $("#form-status");
    var input  = $("#email");
    var button = form && form.querySelector(".submit-button");
    if (!form || !status || !input || !button) return;

    var txt = CONTENT.newsletterText || {};
    var idleLabel = button.textContent;

    function say(html, isError) {
      status.innerHTML = html;
      status.classList.toggle("is-error", Boolean(isError));
      status.hidden = false;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Champ piège rempli => c'est un robot, on ne fait rien.
      var hp = form.querySelector('input[name="b_honeypot"]');
      if (hp && hp.value) return;

      var email = input.value.trim();
      if (!email || !input.checkValidity()) {
        say(txt.error || "", true);
        input.focus();
        return;
      }

      // Mailchimp pas encore branché : on ouvre un e-mail pré-rempli.
      if (!mailchimpConfigured()) {
        var to = (CONTENT.mailchimp && CONTENT.mailchimp.fallbackEmail) || "";
        if (to) {
          window.location.href = "mailto:" + to
            + "?subject=" + encodeURIComponent("Newsletter")
            + "&body=" + encodeURIComponent(email);
        }
        return;
      }

      button.disabled = true;
      button.textContent = txt.sending || idleLabel;

      var cb = "mcb_" + Date.now();
      var script = document.createElement("script");
      var done = false;

      function finish(ok) {
        if (done) return;
        done = true;
        button.disabled = false;
        button.textContent = idleLabel;
        try { delete window[cb]; } catch (err) { window[cb] = undefined; }
        if (script.parentNode) script.parentNode.removeChild(script);

        if (ok) {
          say(txt.success || "");
          form.reset();
        } else {
          say(txt.error || "", true);
        }
      }

      window[cb] = function (data) {
        finish(data && data.result === "success");
      };

      script.src = mailchimpUrl(email) + "&c=" + cb;
      script.onerror = function () { finish(false); };
      document.body.appendChild(script);

      // Filet de sécurité si Mailchimp ne répond pas.
      setTimeout(function () { finish(false); }, 10000);
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
