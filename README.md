<<<<<<< ours
# 🚗 Interactieve Rijschool Oefening

Een moderne, interactieve webapplicatie om te leren voor het Nederlandse rijbewijs theorieexamen. Deze applicatie zet het VERJO rijschool handboek om in een interactieve leerervaring.

## ✨ Functies

### 📚 Interactief Leren
- **PDF Viewer**: Bekijk het volledige rijschool handboek direct in de browser
- **Hoofdstuk Navigatie**: Snel navigeren tussen verschillende onderwerpen
- **Zoom Functionaliteit**: In- en uitzoomen voor betere leesbaarheid
- **Responsief Design**: Werkt perfect op desktop, tablet en mobiel

### ✅ Voortgang Bijhouden
- **Pagina Tracking**: Markeer pagina's als "geleerd"
- **Voortgangs Dashboard**: Zie je algehele voortgang en statistieken per hoofdstuk
- **Lokale Opslag**: Je voortgang wordt automatisch opgeslagen in je browser

### 📝 Leerhulpmiddelen
- **Notities Systeem**: Voeg je eigen notities toe bij elke pagina
- **Quiz Mode**: Test je kennis met verkeersborden quiz
- **Zoek Functie**: Vind snel specifieke onderwerpen

### ⌨️ Sneltoetsen
- `→` of `Spatiebalk` - Volgende pagina
- `←` - Vorige pagina
- `+` - Inzoomen
- `-` - Uitzoomen
- `m` - Markeer pagina als geleerd
- `/` - Open zoekfunctie

## 🚀 Installatie en Gebruik

### Optie 1: Lokaal Gebruik (Eenvoudigst)

1. **Download alle bestanden**:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `03-01-2026, 13:18 Microsoft Lens.pdf`

2. **Plaats alle bestanden in dezelfde map**

3. **Open met een lokale server**:

   **Python (aanbevolen)**:
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Node.js**:
   ```bash
   npx http-server
   ```

   **VS Code**:
   - Installeer "Live Server" extensie
   - Rechtermuisklik op `index.html`
   - Selecteer "Open with Live Server"

4. **Open in browser**: Ga naar `http://localhost:8000`

### Optie 2: Online Hosting

Upload alle bestanden naar een van deze gratis hosting services:
- **GitHub Pages**: Gratis hosting voor statische websites
- **Netlify**: Drag-and-drop deployment
- **Vercel**: Eenvoudige deployment met Git integratie

## 📖 Inhoud

Het handboek bevat 43 pagina's met de volgende onderwerpen:

### Basis Rijvaardigheden
- ⚙️ Aandrijflijn en transmissie
- 🔄 Schakelmethoden (doorgeef & overpak)
- 💺 Correcte zithouding
- 🪟 Spiegels afstellen
- 📊 Dashboard symbolen
- 💡 Verlichting

### Verkeersregels
- 🚶 Voetgangers
- 🛣️ Kruispunten navigeren
- ➡️ Rechts afslaan
- ⬅️ Links afslaan
- ⏪ Achteruit rijden
- 🔃 Keren (3-punts, 2-punts, halve draai)

### Parkeren
- 🅿️ Vooruit parkeren in file
- 🅿️ Haaks parkeren
- 🅿️ Schuin parkeren
- 🅿️ Achteruit parkeren

### Gevorderde Technieken
- 🛑 Noodremming
- 🚗 In- en uitvoegen
- ↔️ Weven op snelwegen
- 🔄 Rotondes (inclusief turbo-rotondes)

### Verkeersborden & Bebording
- 🚸 Volledige verkeersborden referentie
- ℹ️ Informatieve borden
- 🛣️ Bewegwijzering autosnelwegen

## 🎯 Hoe Te Gebruiken

1. **Start met de Inhoudsopgave**: Bekijk alle beschikbare onderwerpen
2. **Kies een Hoofdstuk**: Klik op een onderwerp in het zijmenu
3. **Bestudeer het Materiaal**: Lees de pagina en bekijk de illustraties
4. **Maak Notities**: Voeg je eigen notities toe onderaan de pagina
5. **Markeer als Geleerd**: Klik op "✓ Markeer als geleerd"
6. **Test Je Kennis**: Gebruik de quiz knop (📝) om jezelf te testen
7. **Volg Je Voortgang**: Bekijk je statistieken met de voortgang knop (📊)

## 💾 Data Opslag

Alle data wordt lokaal opgeslagen in je browser:
- **Voortgang**: Welke pagina's je hebt voltooid
- **Notities**: Je persoonlijke notities per pagina
- **Quiz Resultaten**: Je quiz scores en antwoorden

Je data wordt **nooit** online gestuurd - alles blijft privé op je apparaat.

## 🔧 Technische Details

### Gebruikte Technologieën
- **PDF.js**: Mozilla's PDF rendering library
- **Vanilla JavaScript**: Geen frameworks, pure JS
- **CSS Grid & Flexbox**: Modern responsive layout
- **LocalStorage API**: Voor data persistentie

### Browser Compatibiliteit
- ✅ Chrome/Edge (aanbevolen)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ⚠️ IE11 (beperkte ondersteuning)

### Systeemvereisten
- Moderne webbrowser
- ~15 MB vrije schijfruimte (voor PDF)
- JavaScript ingeschakeld
- LocalStorage toegestaan

## 📱 Mobiel Gebruik

De applicatie is volledig geoptimaliseerd voor mobiel gebruik:
- Touch-vriendelijke interface
- Responsive layout
- Swipe om te navigeren (in ontwikkeling)
- Optimale prestaties op kleinere schermen

## 🐛 Problemen Oplossen

### PDF laadt niet
- **Probleem**: "Error loading PDF" melding
- **Oplossing**: Zorg dat het PDF bestand in dezelfde map staat als de HTML bestanden
- **Oplossing 2**: Gebruik een lokale server (zie installatie instructies)

### Voortgang wordt niet opgeslagen
- **Probleem**: Voortgang verdwijnt na herladen
- **Oplossing**: Controleer of LocalStorage is ingeschakeld in je browser
- **Oplossing 2**: Gebruik geen incognito/private modus

### Pagina's zijn wazig
- **Probleem**: PDF pagina's zijn niet scherp
- **Oplossing**: Gebruik de zoom knoppen om in te zoomen
- **Oplossing 2**: Klik op "Pas aan" voor optimale breedte

### Sidebar is verdwenen
- **Probleem**: Kan het menu niet zien
- **Oplossing**: Klik op de menu knop (☰) linksboven

## 🔮 Toekomstige Features

Geplande toevoegingen:
- [ ] Meer quiz vragen voor alle hoofdstukken
- [ ] Audio uitleg per onderwerp
- [ ] Video tutorials
- [ ] Praktijk simulaties
- [ ] Examenmodus met tijdslimiet
- [ ] Export functie voor notities
- [ ] Dark mode
- [ ] Offline support (PWA)
- [ ] Achtergrond animaties voor verkeerssituaties

## 📄 Licentie

Dit project is gemaakt voor educatieve doeleinden. Het originele studiemateriaal is eigendom van VERJO bv.

## 🤝 Bijdragen

Suggesties en verbeteringen zijn welkom! Als je een bug vindt of een feature wilt voorstellen, open dan een issue of pull request.

## 📧 Contact

Voor vragen of ondersteuning, open een issue in de GitHub repository.

---

**Veel succes met leren! 🎓🚗**

*Gemaakt met ❤️ voor aankomende bestuurders*
=======
# Fixed Peer Group Public-Disclosure Research Foundation

This repository contains a standardized, execution-ready evidence system for a fixed 17-company peer group.

## What Was Upgraded
- Added tracked folder skeletons (`.gitkeep`) for every required company subfolder.
- Standardized all master tables with IDs, status fields, and controlled vocabulary hooks.
- Pre-seeded `extraction_master.csv` (17 rows) and `evidence_matrix.csv` (17 x 6 = 102 rows).
- Added explicit data dictionary and QC checklist files for reproducible handoffs.

## Scope Guardrails
- Exactly 17 companies included (no additions, no removals).
- No investment advice, no ranking, no unsupported language.
- Parent/entity mapping enforced:
  - Siemens-related healthcare disclosures -> Siemens Healthineers.
  - Beckman Coulter disclosures -> Danaher disclosure entity.
  - Mead Johnson/Nutrition disclosures -> Reckitt disclosure entity.
  - Novartis and Sandoz researched separately.

## Required Deliverables
1. Company master list (`00_master/company_master_list.csv`)
2. Source log (`00_master/source_log.csv`)
3. Evidence matrix (`00_master/evidence_matrix.csv`)
4. Seventeen one-page summaries (`01_companies/*/07_Notes/company_one_page_summary.md`)
5. Second-round deep-research tasks (`00_master/second_round_tasks.csv`)

## Recommended Workflow
1. Collect official sources into company folders.
2. Register each source in `source_log.csv`.
3. Extract with `extraction_master.csv`.
4. Validate claims in `validation_log.csv`.
5. Populate `evidence_matrix.csv`.
6. Update company one-page summaries and second-round tasks.
>>>>>>> theirs
