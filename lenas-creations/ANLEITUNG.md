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
| `salon-1/2/3.jpg` | Salonbilder auf „Über mich“ | 1200 × 900 px, quer |
| `extensions-*.jpg` | Extensions-Seite | 900 × 1100 px, hoch |
| `ba-1-vorher.jpg` / `ba-1-nachher.jpg` | Vorher-Nachher-Regler (4 Paare) | 900 × 1100 px, **gleicher Bildausschnitt** |
| `galerie-01.jpg` bis `galerie-12.jpg` | Galerie | 900 × 1150 px, hoch |
| `og-image.jpg` | Vorschaubild bei WhatsApp und Facebook | 1200 × 630 px |
| `kontakt-salon.jpg` | Kopfbild Kontaktseite | 1400 × 950 px, quer |

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

## 6. Vor dem Livegang – Pflichtliste

- [ ] `js/config.js` vollständig mit echten Daten gefüllt
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

## 7. Hochladen

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

## 8. Was drin ist

- 8 Seiten: Startseite, Leistungen, Extensions, Galerie, Über mich, Kontakt,
  Impressum, Datenschutz
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
- Schriften lokal eingebunden, keine Google-Server, keine Cookies, kein Tracking
  – dadurch ist kein Cookie-Banner nötig
- Barrierefreiheit: Tastaturbedienung, sichtbarer Fokus, Rücksicht auf die
  Systemeinstellung „Bewegung reduzieren“

## 9. Technische Struktur

```
lenas-creations/
├── index.html … datenschutz.html   die acht Seiten
├── css/
│   ├── style.css                   das gesamte Design
│   └── fonts.css                   Einbindung der lokalen Schriften
├── js/
│   ├── config.js                   ► hier werden Daten gepflegt
│   └── main.js                     Menü, Regler, Galerie, Formular
├── fonts/                          Schriftdateien (SIL Open Font License)
├── images/                         alle Bilder
├── favicon.svg                     Symbol im Browser-Tab
├── sitemap.xml, robots.txt         für Suchmaschinen
└── .htaccess                       Serverkonfiguration (Apache)
```

Es werden keine externen Bibliotheken geladen. Die Website funktioniert ohne
Internetverbindung zu Dritten und bleibt dadurch dauerhaft wartungsarm.
