/* ==========================================================================
   LENAS CREATIONS · Interaktion
   Reines JavaScript, keine Bibliotheken, keine Cookies, kein Tracking.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.SALON || {};
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ----------------------------------------------------------------------
     1 · Kontaktdaten und Buchungslink aus config.js einsetzen
  ---------------------------------------------------------------------- */
  function applyConfig() {
    var url = (CFG.bookingUrl || "").trim();
    var external = url.length > 0;

    $$("[data-booking]").forEach(function (el) {
      el.setAttribute("href", external ? url : (CFG.bookingFallback || "kontakt.html#termin"));
      if (external) {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      } else {
        el.removeAttribute("target");
        el.removeAttribute("rel");
      }
      el.classList.toggle("is-external", external);
      var icon = $(".btn__ext", el);
      if (icon) icon.style.display = external ? "" : "none";
    });

    $$("[data-booking-note]").forEach(function (el) {
      el.textContent = external
        ? "Öffnet die Online-Terminbuchung in einem neuen Fenster."
        : "Anfrage über das Formular – Antwort in der Regel innerhalb von 24 Stunden.";
    });

    $$("[data-phone]").forEach(function (el) {
      el.setAttribute("href", "tel:" + (CFG.phoneLink || ""));
      if (el.hasAttribute("data-phone-text")) el.textContent = CFG.phone || "";
    });
    $$("[data-whatsapp]").forEach(function (el) {
      el.setAttribute("href", "https://wa.me/" + (CFG.whatsapp || ""));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
    $$("[data-mail]").forEach(function (el) {
      el.setAttribute("href", "mailto:" + (CFG.email || ""));
      if (el.hasAttribute("data-mail-text")) el.textContent = CFG.email || "";
    });
    $$("[data-instagram]").forEach(function (el) { el.setAttribute("href", CFG.instagram || "#"); });
    $$("[data-facebook]").forEach(function (el) { el.setAttribute("href", CFG.facebook || "#"); });
    $$("[data-address]").forEach(function (el) {
      el.innerHTML = (CFG.street || "") + "<br>" + (CFG.zip || "") + " " + (CFG.city || "");
    });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ----------------------------------------------------------------------
     2 · Öffnungszeiten rendern, heutigen Tag hervorheben
  ---------------------------------------------------------------------- */
  function renderHours() {
    var lists = $$("[data-hours]");
    if (!lists.length || !CFG.hours) return;
    var todayIdx = (new Date().getDay() + 6) % 7; // Montag = 0
    lists.forEach(function (list) {
      list.innerHTML = CFG.hours.map(function (h, i) {
        return '<li class="' + (i === todayIdx ? "is-today" : "") + '">' +
               "<span>" + h.day + "</span><span>" + h.time + "</span></li>";
      }).join("");
    });
  }

  /* ----------------------------------------------------------------------
     3 · Header: bleibt durchgehend fixiert sichtbar, nur Hintergrund ab Scroll
  ---------------------------------------------------------------------- */
  function header() {
    var el = $(".header");
    if (!el) return;
    var ticking = false;
    function update() {
      var y = window.pageYOffset;
      el.classList.toggle("is-solid", y > 40);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ----------------------------------------------------------------------
     4 · Mobiles Menü
  ---------------------------------------------------------------------- */
  function mobileNav() {
    var burger = $(".burger"), panel = $(".mobile-nav");
    if (!burger || !panel) return;
    var head = $(".header");
    function set(open) {
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      panel.classList.toggle("is-open", open);
      document.body.classList.toggle("is-locked", open);
      if (head) head.classList.toggle("is-menu-open", open);
      $$(".mobile-nav__list a", panel).forEach(function (a, i) {
        a.style.transitionDelay = open ? (0.08 + i * 0.055) + "s" : "0s";
      });
    }
    burger.addEventListener("click", function () { set(!panel.classList.contains("is-open")); });
    $$("a", panel).forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) set(false);
    });
  }

  /* ----------------------------------------------------------------------
     5 · Scroll-Reveal
  ---------------------------------------------------------------------- */
  function reveal() {
    var items = $$(".reveal");
    if (!items.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------------------
     5b · Ablauf-Zeitstrahl: Linie füllt sich mit dem Scrollen,
          Punkte werden aktiv, sobald die Linie sie erreicht
  ---------------------------------------------------------------------- */
  function timeline() {
    var box = $("[data-timeline]");
    if (!box) return;
    var fill = $("[data-timeline-fill]", box);
    var items = $$(".timeline__item", box);
    if (!fill || !items.length) return;

    // Der Scroll-Fortschritt soll für ALLE Besucher laufen (auch bei
    // "Bewegung reduzieren"); nur ohne requestAnimationFrame gibt es den
    // statischen Endzustand als Fallback.
    if (!("requestAnimationFrame" in window)) {
      fill.style.transition = "none";
      fill.style.transform = "scaleY(1)";
      items.forEach(function (item) { item.classList.add("is-active"); });
      return;
    }

    var ticking = false;

    function update() {
      ticking = false;
      var rect = box.getBoundingClientRect();
      var anchor = window.innerHeight * 0.55; // Bezugslinie etwas unter der Mitte
      var pct = (anchor - rect.top) / rect.height;
      pct = Math.max(0, Math.min(1, pct));
      fill.style.transform = "scaleY(" + pct.toFixed(4) + ")";

      items.forEach(function (item) {
        var node = $(".timeline__node", item);
        var n = node.getBoundingClientRect();
        item.classList.toggle("is-active", (n.top + n.height / 2) <= anchor);
      });
    }

    function onScroll() {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* ----------------------------------------------------------------------
     5c · Verzweigung: drei Linien zeichnen sich beim Scrollen und
          verbinden sich mit den drei Punkten über den Karten
  ---------------------------------------------------------------------- */
  function branch() {
    var box = $("[data-branch]");
    if (!box) return;
    var svg = $(".branch__svg", box);
    var paths = $$(".branch__path", box);
    var dots = $$(".branch__dot", box);
    var grid = box.nextElementSibling;
    if (!svg || paths.length < 3 || !grid) return;

    var lens = [0, 0, 0];

    // SVG-Koordinaten = Pixel; Linien-Enden exakt auf die Mitte der drei Karten
    function layout() {
      var cards = $$(".service-card", grid);
      if (cards.length < 3) return;
      var b = box.getBoundingClientRect();
      if (!b.width) return;
      var w = b.width, h = b.height;
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      var rects = [0, 1, 2].map(function (i) { return cards[i].getBoundingClientRect(); });

      // Stehen die drei Karten nicht in einer Reihe (Tablet/Handy), nur eine
      // gerade Linie mit einem Punkt zeigen
      var oneRow = Math.abs(rects[2].top - rects[0].top) < 8;
      box.classList.toggle("branch--stack", !oneRow);

      if (!oneRow) {
        var mx = w / 2;
        paths[0].setAttribute("d", "M" + mx + " 1 L" + mx + " " + h);
        lens[0] = paths[0].getTotalLength();
        paths[0].style.strokeDasharray = lens[0];
        dots[1].style.setProperty("--x", "50%");
        return;
      }

      var cx = rects.map(function (r) { return (r.left + r.width / 2) - b.left; });
      var sx = cx[1]; // Start: Mitte der mittleren Karte, knapp unter der Überschrift
      paths[0].setAttribute("d", "M" + sx + " 1 L" + sx + " " + h);
      paths[1].setAttribute("d", "M" + sx + " 1 C" + sx + " " + (h * 0.72) + " " + cx[0] + " " + (h * 0.64) + " " + cx[0] + " " + h);
      paths[2].setAttribute("d", "M" + sx + " 1 C" + sx + " " + (h * 0.72) + " " + cx[2] + " " + (h * 0.64) + " " + cx[2] + " " + h);
      paths.forEach(function (p, i) {
        var L = p.getTotalLength();
        lens[i] = L;
        p.style.strokeDasharray = L;
      });
      dots.forEach(function (d, i) { d.style.setProperty("--x", (cx[i] / w * 100) + "%"); });
    }

    function draw(pct) {
      paths.forEach(function (p, i) {
        p.style.strokeDashoffset = (lens[i] * (1 - pct)).toFixed(1);
      });
      box.classList.toggle("is-linked", pct > 0.92);
    }

    // Läuft für ALLE Besucher (auch bei "Bewegung reduzieren");
    // nur ohne requestAnimationFrame gibt es den fertig gezeichneten Fallback.
    if (!("requestAnimationFrame" in window)) {
      layout();
      draw(1);
      return;
    }

    var ticking = false;

    function update() {
      ticking = false;
      var rect = box.getBoundingClientRect();
      var vh = window.innerHeight;
      // 0 wenn die Oberkante bei 88 % der Höhe steht, 1 wenn sie 42 % erreicht hat
      var pct = (vh * 0.88 - rect.top) / (vh * 0.46);
      draw(Math.max(0, Math.min(1, pct)));
    }

    function onScroll() {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }

    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () { layout(); onScroll(); }, { passive: true });
    window.addEventListener("load", function () { layout(); update(); });
    update();
  }

  /* ----------------------------------------------------------------------
     6 · Vorher/Nachher-Schieberegler
  ---------------------------------------------------------------------- */
  function compare() {
    $$(".compare").forEach(function (box) {
      var input = $(".compare__range", box);
      function setPos(pct) {
        pct = Math.max(0, Math.min(100, pct));
        box.style.setProperty("--pos", pct + "%");
        if (input) input.value = String(Math.round(pct));
      }
      function fromEvent(e) {
        var r = box.getBoundingClientRect();
        var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
        setPos((x / r.width) * 100);
      }
      var dragging = false;
      box.addEventListener("pointerdown", function (e) {
        dragging = true; box.setPointerCapture(e.pointerId); fromEvent(e);
      });
      box.addEventListener("pointermove", function (e) {
        if (dragging) fromEvent(e);
        else if (e.pointerType === "mouse" && window.innerWidth > 860) fromEvent(e);
      });
      box.addEventListener("pointerup", function () { dragging = false; });
      box.addEventListener("pointercancel", function () { dragging = false; });
      if (input) {
        input.addEventListener("input", function () { setPos(parseFloat(input.value)); });
      }
      setPos(50);
    });
  }

  /* ----------------------------------------------------------------------
     7 · Galerie: Filter + Lightbox
  ---------------------------------------------------------------------- */
  function gallery() {
    var grid = $("[data-gallery]");
    var buttons = $$("[data-filter]");

    if (grid && buttons.length) {
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var f = btn.getAttribute("data-filter");
          buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
          $$(".gallery__item", grid).forEach(function (item) {
            var match = f === "alle" || item.getAttribute("data-cat") === f;
            item.classList.toggle("is-hidden", !match);
          });
        });
      });
    }

    var box = $(".lightbox");
    if (!box) return;
    var img = $(".lightbox__img", box);
    var counter = $(".lightbox__counter", box);
    var items = [], index = 0, lastFocus = null;

    function visible() {
      return $$(".gallery__item").filter(function (el) { return !el.classList.contains("is-hidden"); });
    }
    function show(i) {
      if (!items.length) return;
      index = (i + items.length) % items.length;
      var src = items[index].getAttribute("data-full") || $("img", items[index]).getAttribute("src");
      img.setAttribute("src", src);
      img.setAttribute("alt", $("img", items[index]).getAttribute("alt") || "");
      if (counter) counter.textContent = (index + 1) + " / " + items.length;
    }
    function open(item) {
      items = visible();
      lastFocus = document.activeElement;
      show(items.indexOf(item));
      box.classList.add("is-open");
      document.body.classList.add("is-locked");
      $(".lightbox__close", box).focus();
    }
    function close() {
      box.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      if (lastFocus) lastFocus.focus();
    }
    $$(".gallery__item").forEach(function (item) {
      item.addEventListener("click", function () { open(item); });
    });
    $(".lightbox__close", box).addEventListener("click", close);
    var prev = $(".lightbox__nav--prev", box), next = $(".lightbox__nav--next", box);
    if (prev) prev.addEventListener("click", function () { show(index - 1); });
    if (next) next.addEventListener("click", function () { show(index + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }

  /* ----------------------------------------------------------------------
     8 · Akkordeon (FAQ)
  ---------------------------------------------------------------------- */
  function accordion() {
    $$(".accordion").forEach(function (acc) {
      var triggers = $$(".accordion__trigger", acc);
      triggers.forEach(function (t) {
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (!panel) return;
        t.addEventListener("click", function () {
          var open = t.getAttribute("aria-expanded") === "true";
          triggers.forEach(function (other) {
            var p = document.getElementById(other.getAttribute("aria-controls"));
            other.setAttribute("aria-expanded", "false");
            if (p) p.style.height = "0px";
          });
          if (!open) {
            t.setAttribute("aria-expanded", "true");
            panel.style.height = panel.scrollHeight + "px";
          }
        });
      });
    });
  }

  /* ----------------------------------------------------------------------
     9 · Sticky Aktionsleiste (mobil)
  ---------------------------------------------------------------------- */
  function actionBar() {
    var bar = $(".action-bar");
    if (!bar) return;
    window.addEventListener("scroll", function () {
      bar.classList.toggle("is-visible", window.pageYOffset > 480);
    }, { passive: true });
  }

  /* ----------------------------------------------------------------------
     10 · Kontaktformular
  ---------------------------------------------------------------------- */
  function contactForm() {
    var form = $("[data-form]");
    if (!form) return;
    var status = $(".form__status", form);

    function say(msg, ok) {
      if (!status) return;
      status.textContent = msg;
      status.classList.add("is-visible");
      status.style.borderLeftColor = ok ? "var(--gold)" : "#B4675A";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (form.querySelector('[name="_gotcha"]').value) return; // Spam-Falle

      var valid = true;
      $$("[required]", form).forEach(function (f) {
        var wrap = f.closest(".field") || f.closest(".checkbox");
        var bad = f.type === "checkbox" ? !f.checked : !f.value.trim() || !f.checkValidity();
        if (wrap) wrap.classList.toggle("has-error", bad);
        if (bad && valid) { f.focus(); }
        if (bad) valid = false;
      });
      if (!valid) { say("Bitte die markierten Felder noch ausfüllen.", false); return; }

      var data = new FormData(form);
      var endpoint = (CFG.formEndpoint || "").trim();
      var subject = data.get("leistung") === "Gutschein"
        ? (form.getAttribute("data-subject") || "Gutscheinanfrage")
        : "Terminanfrage über die Website";
      data.set("_subject", subject);

      if (endpoint) {
        var btn = $('button[type="submit"]', form);
        var label = btn ? btn.textContent : "";
        if (btn) { btn.disabled = true; btn.textContent = "Wird gesendet …"; }
        fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error("Fehler");
            form.reset();
            say("Vielen Dank – die Anfrage ist angekommen. Lena meldet sich in der Regel innerhalb von 24 Stunden.", true);
          })
          .catch(function () {
            say("Das Senden hat nicht geklappt. Bitte telefonisch melden oder eine E-Mail schreiben.", false);
          })
          .finally(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
      } else {
        var lines = [
          "Name: " + (data.get("name") || ""),
          "E-Mail: " + (data.get("email") || ""),
          "Telefon: " + (data.get("telefon") || ""),
          "Leistung: " + (data.get("leistung") || ""),
          "Wunschtermin: " + (data.get("termin") || ""),
          "",
          data.get("nachricht") || ""
        ].join("\n");
        window.location.href = "mailto:" + (CFG.email || "") +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(lines);
        say("Das E-Mail-Programm wurde geöffnet. Bitte dort noch auf Senden klicken.", true);
      }
    });

    $$("input, textarea, select", form).forEach(function (f) {
      f.addEventListener("input", function () {
        var wrap = f.closest(".field") || f.closest(".checkbox");
        if (wrap) wrap.classList.remove("has-error");
      });
    });

    // Datumsfeld: Vergangenheit ausschließen
    var date = $('input[type="date"]', form);
    if (date) date.min = new Date().toISOString().split("T")[0];
  }

  /* ----------------------------------------------------------------------
     Hilfsfunktionen für die aus config.js gerenderten Bereiche.
     Inhalte werden immer per textContent gesetzt, nie als HTML.
  ---------------------------------------------------------------------- */
  function make(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  // Nur Pfade auf dieser Website erlauben (keine http(s)://, keine //host)
  function isLocalPath(p) {
    return typeof p === "string" && p.trim() !== "" && !/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(p.trim());
  }
  var ICON_STAR  = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false"><path d="M12 2.8l2.75 5.83 6.4.83-4.7 4.4 1.2 6.34L12 17.1l-5.65 3.1 1.2-6.34-4.7-4.4 6.4-.83z"/></svg>';
  var ICON_ARROW = '<svg width="14" height="9" viewBox="0 0 14 9" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M0 4.5h12.5M9 1l3.5 3.5L9 8"/></svg>';
  var ICON_INSTA = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
  var ICON_PAUSE = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';
  var ICON_PLAY  = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  /* ----------------------------------------------------------------------
     11 · Kundenstimmen (aus config.js) + zugänglicher Slider
  ---------------------------------------------------------------------- */
  function slider(track, nav) {
    var prev = $('[data-slide="prev"]', nav), next = $('[data-slide="next"]', nav);
    if (!prev || !next) return;

    function step() {
      var c = track.firstElementChild;
      if (!c) return 0;
      var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      return c.getBoundingClientRect().width + gap;
    }
    function update() {
      var max = track.scrollWidth - track.clientWidth;
      nav.hidden = max <= 4;
      prev.setAttribute("aria-disabled", String(track.scrollLeft <= 4));
      next.setAttribute("aria-disabled", String(track.scrollLeft >= max - 4));
    }
    function go(dir) {
      track.scrollBy({ left: dir * step(), behavior: reduced ? "auto" : "smooth" });
    }
    prev.addEventListener("click", function () { go(-1); });
    next.addEventListener("click", function () { go(1); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft")  { e.preventDefault(); go(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  function testimonials() {
    $$("[data-testimonials]").forEach(function (sec) {
      var list = (CFG.testimonials || []).filter(function (t) { return t && t.text; });
      var limit = parseInt(sec.getAttribute("data-limit"), 10);
      if (limit > 0) list = list.slice(0, limit);
      var track = $("[data-testimonials-track]", sec);
      if (!list.length || !track) { sec.hidden = true; return; }

      list.forEach(function (t) {
        var n = Math.max(1, Math.min(5, Math.round(Number(t.sterne)) || 5));
        var fig = make("figure", "quote");
        var stars = make("div", "quote__stars");
        stars.setAttribute("role", "img");
        stars.setAttribute("aria-label", n + " von 5 Sternen");
        for (var i = 1; i <= 5; i++) {
          stars.insertAdjacentHTML("beforeend", ICON_STAR.replace("<svg", '<svg class="' + (i <= n ? "is-on" : "") + '"'));
        }
        var bq = make("blockquote");
        bq.appendChild(make("p", null, t.text));
        fig.appendChild(stars);
        fig.appendChild(bq);
        fig.appendChild(make("figcaption", "quote__by", (t.name || "") + (t.leistung ? " · " + t.leistung : "")));
        track.appendChild(fig);
      });
      sec.hidden = false;

      var g = $("[data-google-reviews]", sec);
      var gUrl = (CFG.googleReviewsUrl || "").trim();
      if (g) {
        if (/^https:\/\//i.test(gUrl)) { g.href = gUrl; g.hidden = false; } else { g.hidden = true; }
      }

      var nav = $(".tslider__nav", sec);
      if (nav) slider(track, nav);
    });
  }

  /* ----------------------------------------------------------------------
     12 · Gutscheine (Seite gutscheine.html + Teaser auf der Startseite)
  ---------------------------------------------------------------------- */
  function voucherLink(query) {
    return "kontakt.html?anliegen=gutschein" + query + "#anfrage";
  }

  function vouchers() {
    var V = CFG.vouchers || {};

    $$("[data-voucher-teaser]").forEach(function (el) { if (V.teaser) el.textContent = V.teaser; });
    $$("[data-voucher-intro]").forEach(function (el)  { if (V.intro)  el.textContent = V.intro; });
    $$("[data-voucher-note-box]").forEach(function (box) {
      var note = (V.deliveryNote || "").trim();
      var t = $("[data-voucher-note]", box);
      if (t && note) { t.textContent = note; box.hidden = false; } else { box.hidden = true; }
    });

    // Wertgutscheine
    var values = (V.values || []).filter(function (n) { return isFinite(n) && Number(n) > 0; });
    var cv = V.customValue && V.customValue.enabled ? V.customValue : null;
    var secV = $('[data-voucher-section="values"]');
    var grid = $("[data-voucher-values]");
    if (secV && grid) {
      if (!values.length && !cv) {
        secV.hidden = true;
      } else {
        function card(amount, text, href, word) {
          var li = make("li", "voucher reveal");
          li.appendChild(make("span", "voucher__amount" + (word ? " voucher__amount--word" : ""), amount));
          li.appendChild(make("p", "voucher__text", text));
          var a = make("a", "btn btn--outline btn--sm", "Gutschein anfragen");
          a.href = href;
          a.setAttribute("aria-label", "Gutschein anfragen: " + amount);
          li.appendChild(a);
          grid.appendChild(li);
        }
        values.forEach(function (n) { card(n + " €", "Wertgutschein", voucherLink("&wert=" + encodeURIComponent(n))); });
        if (cv) card(cv.label || "Wunschbetrag", cv.text || "", voucherLink("&wert=wunsch"), true);
        secV.hidden = false;
      }
    }

    // Leistungsgutscheine
    var services = (V.services || []).filter(function (s) { return s && s.id && s.name; });
    var secS = $('[data-voucher-section="services"]');
    var list = $("[data-voucher-services]");
    if (secS && list) {
      if (!services.length) {
        secS.hidden = true;
      } else {
        services.forEach(function (s) {
          var row = make("div", "price-row reveal");
          row.appendChild(make("span", "price-row__name", s.name));
          row.appendChild(make("span", "price-row__value", s.price || ""));
          if (s.desc) row.appendChild(make("span", "price-row__desc", s.desc));
          var a = make("a", "link-arrow price-row__cta", "Gutschein anfragen ");
          a.href = voucherLink("&leistung=" + encodeURIComponent(s.id));
          a.setAttribute("aria-label", "Gutschein anfragen: " + s.name);
          a.insertAdjacentHTML("beforeend", ICON_ARROW);
          row.appendChild(a);
          list.appendChild(row);
        });
        secS.hidden = false;
      }
    }
  }

  // Kontaktformular: Parameter aus gutscheine.html auslesen und Felder vorbelegen
  function prefillForm() {
    var form = $("[data-form]");
    if (!form || !window.URLSearchParams) return;
    var q = new URLSearchParams(window.location.search);
    if (q.get("anliegen") !== "gutschein") return;

    var V = CFG.vouchers || {};
    var what = "", subject = "Gutscheinanfrage";
    var wert = q.get("wert"), leistung = q.get("leistung");
    var values = (V.values || []).map(String);

    if (wert === "wunsch" && V.customValue && V.customValue.enabled) {
      what = "einen Gutschein über einen Wunschbetrag"; subject += " (Wunschbetrag)";
    } else if (wert && values.indexOf(wert) > -1) {
      what = "einen Gutschein im Wert von " + wert + " €"; subject += " (" + wert + " €)";
    } else if (leistung) {
      (V.services || []).forEach(function (s) {
        if (s && s.id === leistung) { what = "einen Gutschein für " + s.name; subject += " (" + s.name + ")"; }
      });
    }
    if (!what) what = "einen Gutschein";
    form.setAttribute("data-subject", subject);

    var select = $("#leistung", form);
    if (select) {
      $$("option", select).forEach(function (o) { if (o.value === "Gutschein") select.value = "Gutschein"; });
    }
    var msg = $("#nachricht", form);
    if (msg && !msg.value) {
      msg.value = "Hallo Lena,\n\nich möchte gern " + what + " anfragen. " +
                  "Bitte teile mir mit, ob ich ihn im Salon abholen kann oder per Post bekomme.\n\n";
    }
  }

  /* ----------------------------------------------------------------------
     13 · Instagram-Raster (ohne Embed, nur lokale Bilder + Link)
  ---------------------------------------------------------------------- */
  function isInstagramProfile(url) {
    try {
      var u = new URL(url);
      return /^https?:$/.test(u.protocol) &&
             /(^|\.)instagram\.com$/i.test(u.hostname) &&
             u.pathname.replace(/\//g, "") !== "";
    } catch (e) { return false; }
  }

  function instagramGrid() {
    $$("[data-insta]").forEach(function (sec) {
      var url = (CFG.instagram || "").trim();
      var imgs = ((CFG.instagramGrid || {}).images || []).filter(function (i) {
        return i && isLocalPath(i.src);
      }).slice(0, 6);
      var grid = $("[data-insta-grid]", sec);
      if (!grid || !imgs.length || !isInstagramProfile(url)) { sec.hidden = true; return; }

      imgs.forEach(function (i) {
        var li = make("li");
        var a = make("a", "insta-tile");
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener";
        a.setAttribute("aria-label", (i.alt || "Instagram-Beitrag") + " – Instagram-Profil öffnen (neues Fenster)");
        var img = make("img");
        img.src = i.src;
        img.alt = "";
        img.width = 800; img.height = 800;
        img.loading = "lazy";
        a.appendChild(img);
        var ic = make("span", "insta-tile__icon");
        ic.setAttribute("aria-hidden", "true");
        ic.innerHTML = ICON_INSTA;
        a.appendChild(ic);
        li.appendChild(a);
        grid.appendChild(li);
      });

      var btn = $("[data-insta-link]", sec);
      if (btn) { btn.href = url; btn.target = "_blank"; btn.rel = "noopener"; }
      sec.hidden = false;
    });
  }

  /* ----------------------------------------------------------------------
     14 · Optionales Header-Video (standardmäßig aus, siehe config.js)
  ---------------------------------------------------------------------- */
  function heroVideo() {
    var cfg = CFG.heroVideo || {};
    var media = $(".hero__media");
    if (!cfg.enabled || !media) return;

    var src = (cfg.src || "").trim();
    var poster = isLocalPath(cfg.poster) ? cfg.poster.trim() : "";

    function usePoster() {
      var img = $("img", media);
      if (!poster || !img) return;
      $$("source", media).forEach(function (s) { s.parentNode.removeChild(s); });
      img.removeAttribute("srcset");
      img.src = poster;
    }

    var saveData = window.navigator.connection && window.navigator.connection.saveData;
    if (!isLocalPath(src) || reduced || saveData) { usePoster(); return; }

    var v = document.createElement("video");
    v.className = "hero__video";
    v.muted = true; v.defaultMuted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    v.setAttribute("aria-hidden", "true");
    v.tabIndex = -1;
    v.preload = "metadata";
    if (poster) v.poster = poster;
    v.src = src;
    media.appendChild(v);

    var btn = make("button", "hero__pause");
    btn.type = "button";
    btn.hidden = true;
    (media.parentNode || media).appendChild(btn);

    function sync() {
      var p = v.paused;
      btn.setAttribute("aria-label", p ? "Hintergrundvideo abspielen" : "Hintergrundvideo pausieren");
      btn.innerHTML = p ? ICON_PLAY : ICON_PAUSE;
    }
    v.addEventListener("playing", function () { media.classList.add("has-video"); btn.hidden = false; sync(); });
    v.addEventListener("pause", sync);
    v.addEventListener("play", sync);
    v.addEventListener("error", function () {
      if (v.parentNode) v.parentNode.removeChild(v);
      if (btn.parentNode) btn.parentNode.removeChild(btn);
      media.classList.remove("has-video");
      usePoster();
    });
    btn.addEventListener("click", function () { if (v.paused) v.play(); else v.pause(); });
    sync();

    var p = v.play();
    if (p && p.catch) p.catch(function () { /* Autoplay blockiert: Bild bleibt sichtbar */ });
  }

  /* ----------------------------------------------------------------------
     15 · Start
  ---------------------------------------------------------------------- */
  function init() {
    applyConfig();
    renderHours();
    testimonials();
    vouchers();
    instagramGrid();
    heroVideo();
    header();
    mobileNav();
    reveal();
    timeline();
    branch();
    compare();
    gallery();
    accordion();
    actionBar();
    contactForm();
    prefillForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
