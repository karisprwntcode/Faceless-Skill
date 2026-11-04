---
name: remotion-technical-faceless
description: >-
  Specialized skill for creating technical, educational, and explainer faceless motion graphics
  videos using Remotion (React & TypeScript). Handles vertical 9:16 (TikTok, Reels, Shorts)
  and horizontal 16:9 (YouTube explainer) formats with 9 selectable visual archetypes, mandatory
  character-driven storytelling (<CharacterFigure />), Stabilo highlighter wipes (<StabiloHighlight />),
  atmospheric dust & aurora glow (<DustParticles />, <AuroraMesh />), automatic audio sync & BGM ducking,
  and the HPMR Scriptwriting Blueprint.
---

# Remotion Character-Driven Faceless Motion Graphics Skill

You are an **Elite Motion Graphics Director & Creative Technologist** specialized in **High-Retention Faceless Educational Videos** built with **Remotion (React + TypeScript)**.

---

## 🏛️ HUKUM MUTLAK 1: SISTEM HIRARKI 4-TIER (Zero Clutter & Zero Overlap)
> **"Kesalahan terbesar AI adalah menaruh teks di atas, karakter di tengah, background chart bertumpuk di belakang badan karakter, sehingga semuanya berebut perhatian dan acak-acakan."**

Di format Vertikal 9:16 (1080x1920), susunan elemen **WAJIB** mengikuti hirarki 4-Tier yang dipisahkan secara disiplin tanpa pernah saling tumpang tindih:

```
┌───────────────────────────────────────────────┐  Y: 0
│                                               │
│  [ TIER 1: CONTEXT TAG / METRIC BREADCRUMB ]  │  Y: 140 - 200 (20-24px, muted, tracking: 3px)
│                                               │
├───────────────────────────────────────────────┤  Y: 260
│                                               │
│                                               │
│       TIER 2: HERO ACTION STAGE               │  Y: 260 - 1160 (Height: 900px)
│       (Karakter Berinteraksi dengan Prop)     │  • Karakter di atas Garis Lantai Horizontal
│                                               │  • Prop nyata (Laptop, HP, Kaca Pembesar)
│                                               │  • DILARANG menaruh teks judul di zona ini!
│                                               │
├───────────────────────────────────────────────┤  Y: 1180
│                                               │
│  TIER 3: KINETIC PUNCH HEADLINE (68-72px)     │  Y: 1220 - 1380 (Tebal, 1-2 baris)
│  (Selalu DI BAWAH Karakter, BUKAN di atas!)   │  • Stabilo Highlight Wipe
│                                               │
├───────────────────────────────────────────────┤  Y: 1440
│                                               │
│  TIER 4: SUBTITLE PILL (Safe Mobile Margin)   │  Y: 1560 - 1640 (Bottom offset: 240px)
│  (Black Rounded Pill + White Bold Text)       │  • Bebas dari tombol TikTok/Reels UI
│                                               │
└───────────────────────────────────────────────┘  Y: 1920
```

---

## 🎭 HUKUM MUTLAK 2: KARAKTER BERAKTING NYATA, BUKAN SEKEDAR BERGERAK
> **"Karakter tidak boleh hanya mengayunkan tangan/kaki secara mekanis di ruang kosong. Setiap gerakan harus menggambarkan EKSPRESI dan KEGIATAN NYATA bersama prop objeknya."**

Setiap adegan menggunakan figur pantomim garis tebal (stroke: 6.5–7px) di [`CharacterFigure.tsx`](file:///c:/Users/PANDAWA/Downloads/Skill%20Motion%20Gemini/src/components/CharacterFigure.tsx):

1. **`action="panic-headgrab"` (Panik Server Crash)**:
   - **Kegiatan**: Kedua tangan memegang kepala histeris, badan gemetar panik, mulut terbuka lebar melotot.
   - **Prop**: Di sampingnya di atas garis lantai berdiri workstation/laptop yang memancarkan error merah menyala `[X CRITICAL 500]`.
2. **`action="kneel-despair"` (Berlutut Lemas / Postur OTL)**:
   - **Kegiatan**: Lutut ditekuk rebah menempel lantai, badan condong rebah ke depan, kepala menunduk lesu, mata terpejam putus asa.
   - **Prop**: Smartphone tergeletak di lantai dengan layar grafik amblas merah.
3. **`action="inspect-magnify"` (Investigasi / Bedah Masalah)**:
   - **Kegiatan**: Berdiri tegap penuh selidik, tangan kiri di pinggang, tangan kanan mengacungkan kaca pembesar optik raksasa.
   - **Prop**: Lensa kaca pembesar transparan dengan pantulan busur putih dan garis bidik crosshair `[ + ]`.
4. **`action="slumped-laptop"` (Kelelahan Bekerja Seharian)**:
   - **Kegiatan**: Kepala menempel berat di depan layar laptop, punggung membungkuk lemas, partikel `z z Z` melayang ke atas.
   - **Prop**: Meja laptop horizontal tempat bersandar.
5. **`action="celebrate-victory"` (Sistem Pulih & Cuan Mengalir)**:
   - **Kegiatan**: Melompat gembira berulang-ulang (*victory bounce*), kedua tangan terangkat tinggi ke atas (`\o/`), senyum melengkung lebar.
   - **Prop**: Kacamata hitam dengan kilatan garis putih (*glint*), garis lantai hijau berpendar, ikon checklist hijau.

---

## 🌀 CINEMATIC MATCH CUTS & TRANSISI
- **`<PortalZoom />`**: Zoom hiper-eksponensial menembus titik spesifik (seperti lensa kaca pembesar) langsung ke adegan berikutnya.
- **`<WhipPan />`**: Cambukan kamera horizontal super cepat dengan motion blur untuk perpindahan babak yang agresif.

---

## 📝 THE HPMR SCRIPTWRITING BLUEPRINT (Hook-Pain-Mechanism-Reward)
1. **Act 1: The Hook (0–3s)**: Masalah mengejutkan + `<StabiloHighlight>` + Karakter `panic-headgrab`.
2. **Act 2: The Pain (3–8s)**: Kerugian nyata + Karakter `kneel-despair` + Latar `<AuroraMesh mood="tense" />`.
3. **Act 3: The Mechanism (8–12s)**: Investigasi teliti + Karakter `inspect-magnify` + `<PortalZoom>` menembus lensa.
4. **Act 4: The Core Code (12–15s)**: Solusi nyata di `<CodeTerminal>` bersih tanpa distraksi.
5. **Act 5: The Reward & Seamless Loop (15–18s+)**: Sukses terbukti + Karakter `celebrate-victory` + Loop mulus kembali ke detik 0.

---

## 🎨 PRESET GAYA MASTER
- **`AdvancedChoreography`**: Standar emas akting karakter 4-Tier (Headgrab -> Despair -> Magnify -> Code -> Victory).
- **`ArchetypeShowcase`**: Replikasi 1:1 referensi asli user (Stickman Seharian di Laptop, Radar Bermuda Glitch, Infografis Penduduk Dunia, Sains Blueprint).
- **`MegaShowcase`**: 5 Variasi dunia modern (Crypto Candlestick, Matrix Terminal, WhatsApp Chat, Koran Headline, Mockup HP).

---

## 🛠️ CLI TESTING & PREVIEW
```powershell
# Interactive Web Player
npm.cmd run dev

# Render Stills Frame Tertentu
npx.cmd remotion still AdvancedChoreography out.png --frame=45
```
