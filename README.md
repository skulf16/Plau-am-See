# Plau am See – Tourismus-Website 2026 (Design-Entwurf)

Statischer One-Page-Entwurf für das Tourismusportal der Stadt Plau am See.
Kein Build-Schritt nötig – `index.html` direkt im Browser öffnen oder lokal serven
(z. B. `npx serve -l 4173 .`).

## Struktur

- `index.html` – komplette Seite (Hero, Erleben, Kulinarik, Ausflüge, Camping, Veranstaltungen, Galerie, CTA, Footer)
- `css/style.css` – Design-System (CSS-Variablen), Layout, Animationen, Responsive-Breakpoints (820 px / 560 px)
- `js/main.js` – Sticky-Header, Mobile-Menü, Scroll-Reveal, Statistik-Zähler, Kulinarik-Slider
- `.claude/launch.json` – Preview-Server-Konfiguration

## Designrichtung „Klar & blau" (Stand: Kundenfeedback Juli 2026)

Referenzen des Kunden: Indotravi, 66°Nord, Squaw Valley — cleaner Portal-Look,
keine Wellenformen, kein „Meer" in den Headlines, Blau-Palette mit sehr hellem
Blau als Kontrastfarbe.

| Rolle | Wert |
|---|---|
| Grundton | Weiß `#FFFFFF` |
| Eisblau (helle Kontrastflächen) | `#EAF4FB` / `#DCEBF7` |
| Navy (Primär, Buttons, dunkle Sektionen) | `#123A63` / `#0C2B4B` / `#081F38` |
| Aktivblau (Akzente auf Hell) | `#2F7FC2` |
| Hellblau (Akzente auf Dunkel) | `#A9D9F5` |
| Headline-Font | Fraunces (Google Fonts) |
| Text-Font | Albert Sans |

Layout-Bausteine nach Referenz: Suchleiste im Hero (Reisezeit/Gäste/Interessen,
Demo ohne Funktion), Kennzahlen-Karten, die den Hero überlappen, weiße Karten-Grids,
Segelboot-Logo.

## Seen-Kompass (interaktive Sektion `#seen`)

Drehrad links (Desktop) bzw. Chip-Auswahl (Mobil) mit 5 Seen der Region;
rechts Info-Panel mit Kennzahlen, Badestellen und Google-Maps-Anfahrtslink.
Daten liegen in `js/main.js` im `LAKES`-Array.
**Achtung:** Kennzahlen („ca."-Werte), Entfernungen und Badestellen-Namen sind
Entwurfs-Platzhalter und müssen vor Launch fachlich geprüft werden; die
Seeformen sind stilisierte Silhouetten, keine exakten Umrisse.

## Offene Punkte / To-do

- **Alle Fotos sind Unsplash-Platzhalter** – vor Launch durch lizenzierte, echte
  Plau-Aufnahmen ersetzen (Hubbrücke, Leuchtturm, Hafen, Strandbad, lokale Gastronomie).
- Veranstaltungstermine sind beispielhaft (Badewannenrallye, Hafenfest etc.) – mit dem
  offiziellen Veranstaltungskalender abgleichen.
- Kontaktdaten/Öffnungszeiten der Touristinformation ergänzen (Platzhalter im CTA-Bereich).
- Impressum, Datenschutz, Barrierefreiheitserklärung verlinken.
- Newsletter-Formular an echten Dienst anbinden (aktuell nur Demo-Verhalten).
- Bei Übernahme in ein CMS/Next.js: Cookie-Banner + GA4 (CCM19-Setup vorhanden).
