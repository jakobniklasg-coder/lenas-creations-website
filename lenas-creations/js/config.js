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
  bookingFallback: "kontakt.html#termin",

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
  formEndpoint: ""
};
