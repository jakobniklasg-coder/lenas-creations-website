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
          "?subject=" + encodeURIComponent("Terminanfrage über die Website") +
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
     11 · Start
  ---------------------------------------------------------------------- */
  function init() {
    applyConfig();
    renderHours();
    header();
    mobileNav();
    reveal();
    compare();
    gallery();
    accordion();
    actionBar();
    contactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
