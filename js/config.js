/* ==========================================================================
   LENAS CREATIONS · ZENTRALE EINSTELLUNGEN
   --------------------------------------------------------------------------
   Alles, was sich regelmäßig ändert, wird NUR hier gepflegt.
   Die Werte werden automatisch auf allen Seiten eingesetzt.
   ========================================================================== */

window.SALON = {

  /* ----------------------------------------------------------------------
     1) ONLINE-TERMINBUCHUNG
     ----------------------------------------------------------------------
     Hier die Adresse des Buchungsprofils eintragen, z. B.:

       Treatwell   https://www.treatwell.de/salon/lenas-creations/
       Shore       https://www.shore.com/de/lenas-creations
       Planity     https://www.planity.com/lenas-creations-21614-buxtehude
       Calendly    https://calendly.com/lenascreations

     Solange das Feld leer ist (""), führen alle Buchungs-Buttons zum
     Anfrageformular auf der Kontaktseite. Sobald hier ein Link steht,
     öffnen ALLE Buttons automatisch die Buchungsplattform in einem
     neuen Tab – auf jeder Seite, ohne weitere Änderung.
  ---------------------------------------------------------------------- */
  bookingUrl:   "",
  bookingLabel: "Termin vereinbaren",
  bookingFallback: "kontakt.html#anfrage",

  /* ----------------------------------------------------------------------
     2) KONTAKTDATEN
  ---------------------------------------------------------------------- */
  phone:        "+49 176 12345678",
  phoneLink:    "+4917612345678",
  whatsapp:     "4917612345678",
  email:        "hallo@lenascreations.de",

  street:       "Musterstraße 12",
  zip:          "21614",
  city:         "Buxtehude",

  /* Vollständige Profil-Adressen eintragen, z. B. https://www.instagram.com/lenascreations/
     Solange hier nur die Startseite des Netzwerks steht, bleiben die Symbole und
     Links dazu auf der Website ausgeblendet. */
  instagram:    "https://www.instagram.com/",
  facebook:     "https://www.facebook.com/",

  /* ----------------------------------------------------------------------
     3) ÖFFNUNGSZEITEN
     Reihenfolge Montag → Sonntag. "Geschlossen" für Ruhetage.
  ---------------------------------------------------------------------- */
  hours: [
    { day: "Montag",     time: "09:00 – 18:00 Uhr" },
    { day: "Dienstag",   time: "09:00 – 18:00 Uhr" },
    { day: "Mittwoch",   time: "09:00 – 18:00 Uhr" },
    { day: "Donnerstag", time: "09:00 – 20:00 Uhr" },
    { day: "Freitag",    time: "09:00 – 18:00 Uhr" },
    { day: "Samstag",    time: "09:00 – 14:00 Uhr" },
    { day: "Sonntag",    time: "Geschlossen" }
  ],

  /* ----------------------------------------------------------------------
     4) FORMULAR-EMPFÄNGER
     Statische Websites können selbst keine E-Mails versenden.
     Empfohlen: kostenloses Konto bei formspree.io oder formsubmit.co
     anlegen und die dort erzeugte Adresse hier eintragen, z. B.
       "https://formspree.io/f/abcdwxyz"
     Bleibt das Feld leer, öffnet das Formular das E-Mail-Programm
     der Besucherin mit fertig vorbereitetem Text.
  ---------------------------------------------------------------------- */
  formEndpoint: "",

  /* ----------------------------------------------------------------------
     5) KUNDENSTIMMEN
     Jeder Eintrag ist ein Block { … } zwischen den eckigen Klammern.
       name     Vorname und Initial, z. B. "Sarah M."
       text     die Bewertung (bitte nur echte Bewertungen mit Erlaubnis)
       leistung optional, z. B. "Balayage" – sonst "" lassen
       sterne   1 bis 5
     Ist die Liste leer ( [] ), verschwindet der ganze Bereich automatisch.

     !!! ACHTUNG: Die drei Einträge unten sind PLATZHALTER. Vor dem Livegang
     !!! durch echte Bewertungen ersetzen oder die Liste leeren.
  ---------------------------------------------------------------------- */
  testimonials: [
    /* PLATZHALTER – nicht veröffentlichen */
    { name: "Sarah M.",     leistung: "Balayage",        sterne: 5,
      text: "Ich hatte nach jedem Friseurbesuch Angst vor dem Gelbstich. Bei Lena war das Ergebnis genau das kühle Blond, das ich mir gewünscht hatte." },
    /* PLATZHALTER – nicht veröffentlichen */
    { name: "Katharina L.", leistung: "Tape Extensions", sterne: 5,
      text: "Die Beratung hat sich richtig Zeit genommen. Meine Extensions sitzen flach und ich habe sie im Alltag schnell vergessen." },
    /* PLATZHALTER – nicht veröffentlichen */
    { name: "Nadine W.",    leistung: "Schnitt & Farbe", sterne: 5,
      text: "Ruhige Atmosphäre und ein Ergebnis, das auch nach Wochen noch sitzt. Ich komme gern wieder." }
  ],

  /* Optional: Link zur Google-Bewertungsseite. Ist er gesetzt, erscheint unter
     den Stimmen „Alle Bewertungen auf Google“. Leer lassen = kein Link. */
  googleReviewsUrl: "",

  /* ----------------------------------------------------------------------
     6) GUTSCHEINE
       intro          Einleitung auf der Gutschein-Seite
       teaser         kurzer Text im Teaser-Block auf der Startseite
       values         Beträge der Wertgutscheine (Zahlen, ohne €)
       customValue    Kachel „Wunschbetrag“ (enabled: false = ausblenden)
       services       Leistungsgutscheine: id (klein, ohne Leerzeichen),
                      name, desc (Beschreibung), price (Anzeigetext)
       deliveryNote   Hinweis zu Abholung und Versand
     Leere Liste bei values bzw. services blendet den Bereich aus.
  ---------------------------------------------------------------------- */
  vouchers: {
    intro:  "Ein Gutschein von Lenas Creations ist ein Geschenk, das Zeit und Ruhe verspricht. Du entscheidest, ob es ein fester Betrag oder eine bestimmte Behandlung sein soll. Ich melde mich nach deiner Anfrage persönlich bei dir.",
    teaser: "Ein Gutschein für eine Behandlung oder einen Wunschbetrag – persönlich abgestimmt und liebevoll überreicht.",
    values: [25, 50, 100],
    customValue: { enabled: true, label: "Wunschbetrag", text: "Du nennst mir den Betrag, ich stelle den Gutschein aus." },
    services: [
      { id: "balayage",  name: "Balayage",          price: "ab 180 €", desc: "Weiche, freihand aufgehellte Übergänge inkl. Tonung und Pflege." },
      { id: "schnitt",   name: "Schnitt & Styling", price: "ab 48 €",  desc: "Beratung, Waschen, Schnitt und Styling." },
      { id: "glossing",  name: "Glossing",          price: "ab 45 €",  desc: "Farbauffrischung mit Glanz, ohne Aufhellung." },
      { id: "kopfhaut",  name: "Kopfhaut-Ritual",   price: "28 €",     desc: "Peeling, Massage und leichtes Serum – eine Auszeit für Kopf und Nerven." }
    ],
    deliveryNote: "Den Gutschein kannst du im Salon abholen oder dir per Post zusenden lassen. Schreib mir dazu einfach in der Anfrage, was du bevorzugst. Die Einzelheiten zur Einlösung besprechen wir bei der Bestellung."
  },

  /* ----------------------------------------------------------------------
     7) INSTAGRAM-RASTER
     Zeigt 6 Bilder auf der Startseite. Jedes Bild führt zu deinem
     Instagram-Profil (Eintrag „instagram“ oben). Der Bereich erscheint
     erst, wenn dort die Adresse deines Profils steht, z. B.
       instagram: "https://www.instagram.com/lenascreations/"
     Bilder tauschst du aus, indem du die Dateien in images/instagram/
     mit demselben Namen überschreibst. alt = kurze Bildbeschreibung.
  ---------------------------------------------------------------------- */
  instagramGrid: {
    images: [
      { src: "images/instagram/insta-01.jpg", alt: "Beitrag 1 aus dem Instagram-Profil von Lenas Creations" },
      { src: "images/instagram/insta-02.jpg", alt: "Beitrag 2 aus dem Instagram-Profil von Lenas Creations" },
      { src: "images/instagram/insta-03.jpg", alt: "Beitrag 3 aus dem Instagram-Profil von Lenas Creations" },
      { src: "images/instagram/insta-04.jpg", alt: "Beitrag 4 aus dem Instagram-Profil von Lenas Creations" },
      { src: "images/instagram/insta-05.jpg", alt: "Beitrag 5 aus dem Instagram-Profil von Lenas Creations" },
      { src: "images/instagram/insta-06.jpg", alt: "Beitrag 6 aus dem Instagram-Profil von Lenas Creations" }
    ]
  },

  /* ----------------------------------------------------------------------
     8) HEADER-VIDEO (optional, standardmäßig aus)
       enabled  true = Video im Kopfbereich, false = wie bisher nur Bild
       src      Dateipfad auf dieser Website, z. B. "video/hero.mp4"
       poster   Standbild (wird angezeigt, solange das Video lädt oder wenn
                Besucher „Bewegung reduzieren“ / Datensparen nutzen),
                z. B. "images/hero.jpg"
     Externe Adressen (https://…) werden aus Datenschutzgründen ignoriert.
  ---------------------------------------------------------------------- */
  heroVideo: { enabled: false, src: "", poster: "" }
};
