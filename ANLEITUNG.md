# Lenas Creations – Website

Statische Website ohne Datenbank und ohne laufende Lizenzkosten.
Läuft auf jedem Webspace (IONOS, All-Inkl, Strato, Hostinger) und ebenso auf
Netlify, Vercel oder GitHub Pages.

---

## 1. Was zuerst geändert werden muss

Alles, was sich regelmäßig ändert, steht an **einer** Stelle:
`js/config.js`. Datei mit einem Texteditor öffnen, Werte zwischen den
Anführungszeichen ersetzen, speichern, hochladen. Fertig – die Änderung wirkt
auf allen Seiten gleichzeitig.

| Eintrag | Bedeutung |
|---|---|
| `bookingUrl` | Adresse der Online-Terminbuchung (siehe Punkt 2) |
| `phone`, `phoneLink` | Telefonnummer – einmal zum Anzeigen, einmal zum Anrufen |
| `whatsapp` | Nummer im Format `4917612345678` (ohne +, ohne Leerzeichen) |
| `email` | E-Mail-Adresse für Anfragen |
| `street`, `zip`, `city` | Anschrift des Salons |
| `instagram`, `facebook` | vollständige Profil-Adressen |
| `hours` | Öffnungszeiten, Montag bis Sonntag |
| `formEndpoint` | Empfänger für das Kontaktformular (siehe Punkt 3) |
| `testimonials`, `googleReviewsUrl` | Kundenstimmen und optionaler Google-Link (siehe Punkt 6) |
| `vouchers` | Gutscheine: Beträge, Leistungen, Texte (siehe Punkt 7) |
| `instagramGrid` | die sechs Instagram-Bilder, der Bereich braucht zusätzlich `instagram` (siehe Punkt 8) |
| `heroVideo` | optionales Video im Kopfbereich, standardmäßig aus (siehe Punkt 9) |

Der heutige Wochentag wird in den Öffnungszeiten automatisch hervorgehoben.

---

## 2. Der Buchungs-Button

Auf jeder Seite gibt es mehrere Buttons „Termin vereinbaren“: in der Kopfzeile,
im Hero-Bereich, im Buchungsfeld, im Footer und in der Leiste am unteren
Bildschirmrand auf dem Handy.

**Solange `bookingUrl` leer ist**, führen alle Buttons zum Anfrageformular auf
der Kontaktseite. Die Website funktioniert also von Anfang an vollständig.

**Sobald dort eine Adresse steht**, öffnen alle Buttons automatisch die
Buchungsplattform in einem neuen Tab – ohne dass an den Seiten selbst etwas
geändert werden muss. Ein kleines Symbol am Button zeigt an, dass die Seite
gewechselt wird.

```js
bookingUrl: "https://www.treatwell.de/salon/lenas-creations/",
```

Gängige Anbieter in Deutschland:

| Anbieter | Adressformat | Hinweis |
|---|---|---|
| Treatwell | `https://www.treatwell.de/salon/…` | großer Marktplatz, bringt zusätzliche Laufkundschaft, Provision pro Neukundin |
| Shore | `https://www.shore.com/de/…` | Monatspreis, Kalender und Kundenkartei, ohne Provision |
| Planity | `https://www.planity.com/…` | speziell für Friseur- und Kosmetiksalons |
| Calendly | `https://calendly.com/…` | kostenlose Einstiegsvariante, aber ohne Branchenfunktionen |

Der Link wird im Konto des jeweiligen Anbieters erzeugt und einfach kopiert.

---

## 3. Das Kontaktformular scharf schalten

Eine statische Website kann selbst keine E-Mails verschicken. Zwei Wege:

**A – ohne Konfiguration (Auslieferungszustand):** Beim Absenden öffnet sich das
E-Mail-Programm der Besucherin mit fertig ausgefülltem Text. Funktioniert
immer, ist aber eine Hürde für die Kundin.

**B – empfohlen:** Kostenloses Konto bei [formspree.io](https://formspree.io)
oder [formsubmit.co](https://formsubmit.co) anlegen. Dort entsteht eine Adresse
wie `https://formspree.io/f/abcdwxyz`. Diese in `config.js` eintragen:

```js
formEndpoint: "https://formspree.io/f/abcdwxyz",
```

Danach landen alle Anfragen direkt im Postfach, die Besucherin bleibt auf der
Website und sieht eine Bestätigung. Vor dem Livegang einmal selbst testen.

---

## 4. Bilder austauschen

Alle Bilder liegen im Ordner `images`. Die mitgelieferten Dateien sind
Platzhalter und sollen durch echte Salonfotos ersetzt werden.

**So geht es am einfachsten:** neues Foto mit **exakt demselben Dateinamen**
speichern und die alte Datei überschreiben. Dann muss an keiner HTML-Seite
etwas geändert werden.

| Datei | Wo sie erscheint | Empfohlene Größe |
|---|---|---|
| `hero.jpg` | großes Bild auf der Startseite (Desktop) | 1920 × 1200 px, quer |
| `hero-mobile.jpg` | dasselbe Bild auf dem Handy | 900 × 1300 px, hoch |
| `leistung-blond.jpg` u. a. | Leistungskarten | 900 × 1100 px, hoch |
| `lena-portrait.jpg` | Über mich | 1000 × 1250 px, hoch |
| `lena-arbeit.jpg` | Startseite, Abschnitt „Willkommen“ | 1200 × 1400 px, hoch |
| `salon-1.jpg`, `salon-waschplatz.jpg`, `salon-details.jpg` | Salonbilder auf „Über mich“ | 1200 × 900 px, quer |
| `salon-2.jpg` | Kopfbild Datenschutz | 1200 × 900 px, quer |
| `salon-3.jpg` | Kopfbild Impressum | 1200 × 900 px, quer |
| `extensions-*.jpg` | Extensions-Seite | 900 × 1100 px, hoch |
| `ba-1-vorher.jpg` / `ba-1-nachher.jpg` | Vorher-Nachher-Regler (4 Paare) | 900 × 1100 px, **gleicher Bildausschnitt** |
| `galerie-01.jpg` bis `galerie-12.jpg` | Galerie | 900 × 1150 px, hoch |
| `og-image.jpg` | Vorschaubild bei WhatsApp und Facebook | 1200 × 630 px |
| `kontakt-salon.jpg` | Kopfbild Kontaktseite | 1600 × 1000 px, quer |
| `leistungen-hero-salon.jpg` | Kopfbild Leistungen | 1600 × 1000 px, quer |
| `extensions-hero-salon.jpg` | Kopfbild Extensions | 1600 × 1000 px, quer |
| `galerie-hero-salon.jpg` | Kopfbild Galerie | 1600 × 1000 px, quer |
| `leistung-pflege.jpg` | Kopfbild Gutscheine | 1600 × 1000 px, quer |
| `ueber-mich-hero-salon.jpg` | Kopfbild Über mich | 1600 × 1000 px, quer |
| `instagram/insta-01.jpg` bis `insta-06.jpg` | Instagram-Raster auf der Startseite | 1080 × 1080 px, **quadratisch (1:1)**, unter 150 KB |
| `video/hero.mp4` (Ordner `video` neu anlegen) | optionales Video im Kopfbereich | 1920 × 1080 px, **16:9 quer**, MP4 (H.264), 6–15 Sekunden, ohne Ton, **unter 4 MB** |
| `hero.jpg` (als `poster`) | Standbild zum Video, siehe Punkt 9 | 1920 × 1200 px, unter 300 KB |

**Wichtig bei Vorher-Nachher:** beide Fotos aus derselben Position, gleicher
Abstand, gleiche Kopfhaltung. Sonst springt das Bild beim Ziehen des Reglers.

**Vor dem Hochladen verkleinern.** Fotos direkt aus der Handykamera sind
schnell 5 MB groß und machen die Seite langsam. Kostenlos und ohne Anmeldung:
[squoosh.app](https://squoosh.app) oder [tinypng.com](https://tinypng.com).
Zielgröße pro Bild: unter 300 KB.

Sollen mehr oder weniger Galeriebilder erscheinen, in `galerie.html` einen
Block `<button class="gallery__item">…</button>` kopieren bzw. löschen.

---

## 5. Texte und Preise ändern

Die Texte stehen direkt in den HTML-Dateien. Zu ändernde Stelle im Editor
suchen (Strg + F), Text zwischen den spitzen Klammern ersetzen, speichern.

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite |
| `leistungen.html` | Preisliste und häufige Fragen |
| `extensions.html` | Extensions, Methoden, Ablauf, FAQ |
| `galerie.html` | Galerie und Vorher-Nachher |
| `gutscheine.html` | Überschriften der Gutschein-Seite (Beträge und Texte stehen in `config.js`) |
| `ueber-mich.html` | Vorstellung und Salon |
| `kontakt.html` | Formular, Öffnungszeiten, Anfahrt |
| `impressum.html`, `datenschutz.html` | Rechtliches |

Eine Preiszeile sieht so aus – nur die Texte zwischen `>` und `<` ändern:

```html
<div class="price-row">
  <span class="price-row__name">Balayage</span>
  <span class="price-row__value">ab 180 €</span>
  <span class="price-row__desc">Kurze Beschreibung der Leistung.</span>
</div>
```

---

## 6. Kundenstimmen pflegen

Die Bewertungen stehen in `js/config.js` unter `testimonials`. Jede Bewertung ist
ein Block in geschweiften Klammern, getrennt durch ein Komma:

```js
testimonials: [
  { name: "Sarah M.", leistung: "Balayage", sterne: 5,
    text: "Genau das kühle Blond, das ich mir gewünscht hatte." },
  { name: "Nadine W.", leistung: "", sterne: 4,
    text: "Ruhige Atmosphäre, tolles Ergebnis." }
],
```

| Feld | Bedeutung |
|---|---|
| `name` | Vorname und Initial der Kundin |
| `text` | die Bewertung |
| `leistung` | optional, z. B. „Balayage“ – sonst `""` |
| `sterne` | Zahl von 1 bis 5 |

- **Neue Bewertung:** einen Block kopieren, unten einfügen, Texte ändern.
- **Bewertung löschen:** den ganzen Block samt Komma entfernen.
- **Keine Bewertungen:** `testimonials: [],` – dann verschwindet der Bereich von
  selbst, auf der Startseite und auf der Leistungen-Seite.
- Auf der Startseite erscheinen 3 Karten nebeneinander, bei mehr Bewertungen
  kann man blättern (Wischen, Pfeil-Knöpfe oder Pfeiltasten). Auf der Seite
  „Leistungen“ werden höchstens die ersten 3 gezeigt.
- **Google-Link (optional):** `googleReviewsUrl: "https://…"` – dann erscheint
  „Alle Bewertungen auf Google“. Leer lassen = kein Link. Den Link findet man im
  Google-Unternehmensprofil unter „Bewertungen teilen“.

> **Wichtig:** Die drei mitgelieferten Bewertungen sind **Platzhalter** und im Code
> so gekennzeichnet. Vor dem Livegang durch echte Bewertungen (mit Erlaubnis der
> Kundinnen) ersetzen oder die Liste leeren. Erfundene Bewertungen auf einer
> Geschäftswebsite sind wettbewerbsrechtlich problematisch.

---

## 7. Gutscheine pflegen

Die Seite `gutscheine.html` und der Teaser auf der Startseite lesen alles aus
`vouchers` in `js/config.js`:

```js
vouchers: {
  intro:  "Text oben auf der Gutschein-Seite …",
  teaser: "Kurzer Text im Kasten auf der Startseite …",
  values: [25, 50, 100],                       // Beträge in Euro
  customValue: { enabled: true, label: "Wunschbetrag", text: "…" },
  services: [
    { id: "balayage", name: "Balayage", price: "ab 180 €", desc: "…" }
  ],
  deliveryNote: "Abholung im Salon oder Versand per Post …"
},
```

| Eintrag | Was passiert |
|---|---|
| `values` | eine Kachel pro Betrag. `[25, 75]` zeigt nur diese zwei. Leere Liste = keine Wertgutscheine |
| `customValue` | Kachel „Wunschbetrag“. `enabled: false` blendet sie aus |
| `services` | Leistungsgutscheine. `id` klein und ohne Leerzeichen (z. B. `"schnitt"`), `price` ist ein frei formulierbarer Text |
| `deliveryNote` | Hinweis zu Abholung und Versand, erscheint als Kasten „Abholung & Versand“ |

Ein Klick auf „Gutschein anfragen“ öffnet das Kontaktformular. Die gewählte
Kachel wird dabei automatisch eingetragen: Leistung „Gutschein“ ist vorausgewählt
und die Nachricht enthält bereits einen Textvorschlag. Der E-Mail-Betreff heißt dann
z. B. „Gutscheinanfrage (50 €)“. Es muss nichts weiter eingestellt werden.

> Angaben zu Gültigkeitsdauer, Barauszahlung oder Einlösebedingungen sind hier
> bewusst nicht vorformuliert. Wenn du solche Bedingungen nennen möchtest, trag sie
> in `deliveryNote` ein und lass sie vorher kurz prüfen.

---

## 8. Instagram-Bilder

Auf der Startseite erscheinen sechs quadratische Bilder. Jedes führt zu Lenas
Instagram-Profil, dazu gibt es den Knopf „Folge mir auf Instagram“. Es wird nichts
von Instagram geladen – die Bilder liegen im Ordner `images/instagram/`.

**Einschalten:** in `js/config.js` den Eintrag `instagram` auf die echte
Profil-Adresse setzen:

```js
instagram: "https://www.instagram.com/lenascreations/",
```

Solange dort nur `https://www.instagram.com/` steht (oder nichts), bleibt der
ganze Bereich unsichtbar.

**Bilder tauschen:** neues Bild im Ordner `images/instagram/` unter demselben
Namen speichern (`insta-01.jpg` bis `insta-06.jpg`) und die alte Datei
überschreiben. Ein aussagekräftiger Text für Sehbehinderte steht bei `alt` im
Block `instagramGrid`, z. B. `alt: "Sandblonde Balayage, Nahaufnahme"`.

---

## 9. Optional: Video im Kopfbereich

Standardmäßig ist das Video **aus**, der Kopfbereich sieht aus wie bisher.

**Einschalten:**

1. Kurzes Video (siehe Tabelle unten) in einen neuen Ordner `video` legen, z. B. `video/hero.mp4`.
2. In `js/config.js`:

```js
heroVideo: { enabled: true, src: "video/hero.mp4", poster: "images/hero.jpg" },
```

Das Video läuft stumm, in Endlosschleife, hinter dem Text. Unten rechts gibt es einen
Pause-Knopf. Besucherinnen mit der Einstellung „Bewegung reduzieren“ oder mit
aktiviertem Datensparen sehen stattdessen nur das Standbild (`poster`).
Adressen mit `https://…` werden absichtlich ignoriert, das Video muss auf dieser
Website liegen. **Ausschalten:** `enabled: false`.

**Tipp:** Kurze Clips (6–15 Sekunden), ruhige Bewegungen, kein Ton nötig.
Große Videos machen die Seite auf dem Handy langsam.

---

## 10. Vor dem Livegang – Pflichtliste

- [ ] `js/config.js` vollständig mit echten Daten gefüllt
- [ ] **Platzhalter-Bewertungen ersetzt oder gelöscht** (`testimonials`, siehe Punkt 6)
- [ ] Gutschein-Beträge, Leistungen und Hinweis zu Abholung/Versand geprüft (`vouchers`)
- [ ] Instagram-Profiladresse eingetragen und Platzhalterbilder in `images/instagram/` ersetzt
- [ ] **Impressum vervollständigt**: vollständiger Name, Anschrift, Steuernummer
      oder USt-IdNr., zuständige Handwerkskammer. Ein unvollständiges Impressum
      ist abmahnfähig.
- [ ] **Datenschutzerklärung geprüft**. Der mitgelieferte Text beschreibt den
      Auslieferungszustand: keine Cookies, kein Tracking, Schriften lokal, keine
      eingebettete Karte. Kommt ein Buchungssystem oder ein Formulardienst dazu,
      muss der Text ergänzt werden. Im Zweifel anwaltlich prüfen lassen.
- [ ] Alle Platzhalterbilder durch echte Fotos ersetzt
- [ ] Preise auf den aktuellen Stand gebracht
- [ ] Kontaktformular einmal selbst getestet
- [ ] Öffnungszeiten kontrolliert
- [ ] Instagram- und Facebook-Adresse eingetragen
- [ ] Website auf dem eigenen Handy durchgeklickt

---

## 11. Hochladen

**Klassischer Webspace:** Den kompletten Inhalt dieses Ordners per FTP
(z. B. mit [FileZilla](https://filezilla-project.org)) in das Hauptverzeichnis
des Webspace legen – meist `httpdocs`, `public_html` oder `www`. Die
Ordnerstruktur muss dabei erhalten bleiben.

**Netlify (kostenlos, am schnellsten):** Auf
[app.netlify.com/drop](https://app.netlify.com/drop) den Ordner ins Browserfenster
ziehen. Die Seite ist nach wenigen Sekunden online, eine eigene Domain lässt
sich danach verbinden.

**HTTPS** ist Pflicht (Schlosssymbol im Browser). Bei allen genannten Anbietern
ist ein kostenloses Zertifikat enthalten und meist mit einem Klick aktiviert.
Erst wenn HTTPS läuft, in der Datei `.htaccess` die letzten Zeilen entkommentieren,
damit Besucher automatisch auf die verschlüsselte Adresse geleitet werden.

Nach dem Livegang die Adresse in `sitemap.xml`, `robots.txt` und in den
`canonical`-Zeilen der HTML-Dateien von `www.lenascreations.de` auf die echte
Domain ändern, falls diese anders lautet. Anschließend die Website in der
[Google Search Console](https://search.google.com/search-console) anmelden und
ein [Google-Unternehmensprofil](https://www.google.com/business/) anlegen – für
einen lokalen Salon ist das der wichtigste Sichtbarkeitshebel überhaupt.

---

## 12. Was drin ist

- 9 Seiten: Startseite, Leistungen, Extensions, Galerie, Gutscheine, Über mich,
  Kontakt, Impressum, Datenschutz
- Kundenstimmen mit Sternen, wischbar und per Tastatur bedienbar (aus `config.js`)
- Gutschein-Seite mit Anfrage, die das Kontaktformular vorausfüllt
- Instagram-Raster ohne Einbindung von Instagram (nur lokale Bilder und ein Link)
- Optionales, abschaltbares Header-Video mit Pause-Knopf
- Buchungs-Buttons, die sich über eine einzige Zeile auf jede
  Reservierungsplattform umstellen lassen
- Vorher-Nachher-Regler zum Ziehen (Maus, Finger und Tastatur)
- Galerie mit Filter und Großansicht
- Kontaktformular mit Prüfung der Eingaben und Spam-Schutz
- Öffnungszeiten mit automatischer Hervorhebung des heutigen Tages
- Aktionsleiste am unteren Bildschirmrand auf dem Handy (Anrufen, WhatsApp, Termin)
- Vollständig für Handy, Tablet und Desktop ausgelegt
- Suchmaschinen-Grundlagen: Titel, Beschreibungen, Sitemap, `robots.txt`,
  strukturierte Daten vom Typ *HairSalon* für den Google-Eintrag
- Schrift: Arial (auf jedem Gerät vorhanden, es wird nichts geladen), keine Google-Server, keine Cookies, kein Tracking
  – dadurch ist kein Cookie-Banner nötig
- Barrierefreiheit: Tastaturbedienung, sichtbarer Fokus, Rücksicht auf die
  Systemeinstellung „Bewegung reduzieren“

## 13. Technische Struktur

```
lenas-creations/
├── index.html … datenschutz.html   die neun Seiten (inkl. gutscheine.html)
├── css/
│   ├── style.css                   das gesamte Design
│   └── fonts.css                   derzeit ungenutzt (frühere lokale Schriften)
├── js/
│   ├── config.js                   ► hier werden Daten gepflegt
│   └── main.js                     Menü, Regler, Galerie, Formular, Stimmen, Gutscheine
├── fonts/                          derzeit ungenutzt (frühere Schriftdateien)
├── images/                         alle Bilder (images/instagram/ für das Raster)
├── video/                          nur bei Bedarf: optionales Header-Video
├── favicon.svg                     Symbol im Browser-Tab
├── sitemap.xml, robots.txt         für Suchmaschinen
└── .htaccess                       Serverkonfiguration (Apache)
```

Es werden keine externen Bibliotheken geladen. Die Website funktioniert ohne
Internetverbindung zu Dritten und bleibt dadurch dauerhaft wartungsarm.

---

## 14. Sicherheit, Fehlerseite und Anschlüsse (Stand September 2026)

- **Sicherheits-Header** stehen in `.htaccess` (Apache-Webspace) und `_headers`
  (Cloudflare Pages / Netlify). Beide enthalten dieselben Werte. Wird ein Formulardienst
  (z. B. Formspree) eingetragen, muss dessen Adresse in beiden Dateien bei `connect-src`
  und `form-action` ergänzt werden, sonst blockiert der Browser das Absenden.
- **HTTPS-Umleitung:** in `.htaccess` ganz unten, beim Livegang die fünf Zeilen
  entkommentieren – erst, wenn das Zertifikat aktiv ist.
- **404-Seite:** `404.html` wird bei falschen Adressen angezeigt (Apache über
  `.htaccess`, Cloudflare Pages automatisch).
- **Online-Buchung:** Solange `bookingUrl` in `js/config.js` leer ist, zeigen Startseite
  und Kontaktseite die Fassung „Termin anfragen“. Mit Buchungslink erscheinen automatisch
  die Texte zur Online-Buchung.
- **Instagram/Facebook:** Symbole und Links bleiben ausgeblendet, bis in `js/config.js`
  eine echte Profil-Adresse steht (nicht nur `instagram.com/`).
- **Bilder:** Zu jedem JPG liegt eine WebP-Fassung (kleiner, gleiche Optik). Beim
  Austausch eines Bildes beide Dateien ersetzen oder die WebP-Datei löschen – dann
  nimmt der Browser automatisch das JPG.
