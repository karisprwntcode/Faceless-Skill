# 🎬 Faceless-Skill: Character-Driven Motion Graphics Toolkit

> **Skill Resmi Google Antigravity & Starter Kit Remotion (React + TypeScript)** untuk memproduksi video edukasi, teknologi, dan explainer faceless berkualitas tinggi dengan retensi maksimal.

Didesain khusus untuk kreator konten, developer, dan AI Coding Agent agar dapat memproduksi video vertikal **9:16 (TikTok, Reels, Shorts)** dan horizontal **16:9 (YouTube Explainer)** dengan prinsip tata letak disiplin, karakter pantomim ekspresif, dan alur naskah terstruktur.

---

## 🌟 Mengapa Memakai Skill Ini?

Kebanyakan video motion buatan AI terasa kaku dan membosankan karena hanya berisi teks berjalan dan bentuk grafis kosong. Skill ini memecahkan masalah tersebut dengan **3 Pilar Utama**:

1. **🎭 Karakter Hidup yang Berakting Nyata (`<CharacterFigure />`)**:
   Bukan sekadar mengayunkan tangan/kaki secara mekanis, karakter memiliki pose pantomim nyata dengan prop objek (laptop crash, hp terjatuh, kaca pembesar, podium selebrasi).
2. **🏛️ Sistem Hirarki 4-Tier Disiplin**:
   Tata letak baku vertikal yang menjamin **zero overlap** (tidak ada teks atau grafik bertabrakan) dan memiliki proporsi ideal yang ramah layar smartphone.
3. **📝 Formula Alur Naskah HPMR (Hook-Pain-Mechanism-Reward)**:
   Struktur 4 babak teruji psikologi audiens untuk mempertahankan retensi (*watch time*) dari detik pertama hingga akhir video yang me-loop otomatis tanpa jeda.

---

## 🚀 Cara Import & Menggunakan Skill Ini

Anda dapat menggunakan repositori ini dengan **3 cara**:

### Opsi 1: Sebagai Starter Kit Project Video Baru (Paling Praktis)
Clone repositori ini untuk langsung memulai project video baru:

```bash
# 1. Clone repository
git clone https://github.com/karisprwntcode/Faceless-Skill.git nama-project-kamu

# 2. Masuk ke folder project
cd nama-project-kamu

# 3. Install dependencies
npm install

# 4. Jalankan Remotion Studio (Preview di Browser)
npm run dev
```
Buka browser di `http://localhost:3000` untuk melihat preview interaktif.

---

### Opsi 2: Import Skill ke Project Antigravity AI yang Sudah Ada
Jika Anda sudah memiliki project Antigravity dan ingin AI Anda otomatis mewarisi kemampuan membuat motion graphics berkualitas tinggi:

1. Salin folder skill ke root project Anda:
   ```bash
   # Salin folder skill ke dalam direktori .agents
   cp -r .agents/skills/remotion-technical-faceless /path/to/your/project/.agents/skills/
   ```
2. Atau salin file [`SKILL.md`](./SKILL.md) langsung ke folder project Anda.
3. Antigravity AI Anda akan otomatis mendeteksi skill ini dan langsung mematuhi seluruh SOP sutradara saat diminta membuat video motion!

---

### Opsi 3: Ambil Komponen ke dalam Project Remotion Anda
Salin file yang Anda butuhkan ke project Remotion yang sudah berjalan:
* **Komponen Vektor & Efek**: Salin folder `src/components/` ke project Anda.
* **Otomasi Audio & Ducking**: Salin `src/utils/audioSync.ts`.
* **Sistem Warna & Fisika**: Salin `src/styles/theme.ts`.

---

## 📐 Tata Letak Baku: Sistem Hirarki 4-Tier (9:16)

Setiap komposisi video vertikal (1080x1920) membagi canvas menjadi 4 zona vertikal tanpa pernah saling bertabrakan:

```
┌───────────────────────────────────────────────┐  Y: 0
│                                               │
│  [ TIER 1: CONTEXT TAG / BREADCRUMB ]         │  Y: 140 - 200 (Font: 20px, Tracking: 3px)
│                                               │
├───────────────────────────────────────────────┤  Y: 260
│                                               │
│       TIER 2: HERO ACTION STAGE (900px)       │  Y: 260 - 1160
│       (Karakter Berakting Nyata dengan Prop)  │  • Garis Lantai Horizontal
│                                               │  • Prop (Laptop Rusak, HP, Kaca Pembesar)
│                                               │  • DILARANG ADA TEKS JUDUL DI ZONA INI!
│                                               │
├───────────────────────────────────────────────┤  Y: 1180
│                                               │
│  TIER 3: KINETIC PUNCH HEADLINE (68px)        │  Y: 1220 - 1380
│  (Wajib DI BAWAH Karakter, BUKAN di atas!)    │  • Dilengkapi Stabilo Highlight Wipe
│                                               │
├───────────────────────────────────────────────┤  Y: 1440
│                                               │
│  TIER 4: SUBTITLE PILL (Safe Mobile Margin)   │  Y: 1560 - 1640 (Bottom offset: 240px)
│  (Black Rounded Pill + White Bold Text)       │  • Jarak aman dari tombol UI TikTok/Reels
│                                               │
└───────────────────────────────────────────────┘  Y: 1920
```

---

## 🧩 Katalog Komponen Siap Pakai

### 1. Karakter & Akting Nyata ([`CharacterFigure.tsx`](./src/components/CharacterFigure.tsx))
Figur pantomim garis tebal (*stroke 6.5px*) yang responsif terhadap cerita:
* `action="panic-headgrab"`: Kedua tangan memegang kepala panik, laptop di sebelahnya crash merah `[X]`.
* `action="kneel-despair"`: Berlutut lemas di lantai (**pose OTL**), menatap smartphone yang terjatuh di lantai.
* `action="inspect-magnify"`: Berdiri tegap mengacungkan kaca pembesar raksasa bergaris bidik crosshair `[ + ]`.
* `action="slumped-laptop"`: Duduk bersandar lemas di keyboard laptop karena kelelahan seharian (`z z Z`).
* `action="celebrate-victory"`: Melompat gembira, kacamata hitam dengan kilatan garis putih (*glint*), tangan tinggi `\o/`.

### 2. Transisi & Kamera ([`MatchCutTransition.tsx`](./src/components/MatchCutTransition.tsx), [`VirtualCamera.tsx`](./src/components/VirtualCamera.tsx))
* `<PortalZoom />`: Hyper-zoom eksponensial menembus lensa kaca pembesar langsung ke baris kode.
* `<WhipPan />`: Cambukan kamera horizontal super cepat untuk pergantian babak dinamis.
* `<VirtualCamera />`: Efek slow-zoom sinematik & camera shake saat terjadi benturan/crash.

### 3. Teks & Atmosfer ([`StabiloHighlight.tsx`](./src/components/StabiloHighlight.tsx), [`CleanPillSubtitle.tsx`](./src/components/CleanPillSubtitle.tsx))
* `<StabiloHighlight color={...}>`: Sapuan spidol stabilo neon dinamis pada kata kunci krusial.
* `<CleanPillSubtitle />`: Subtitle kotak hitam rounded standar industri dengan highlight warna kata per kata.
* `<DustParticles />`: Partikel debu bercahaya melayang lembut.
* `<AuroraMesh mood="tense" | "solution" | "curious" />`: Pendaran aura gradasi dinamis.

### 4. Galeri 9 Gaya Visual Khusus
* `<StickmanFigure />` - Gaya minimalis hitam-putih lelah di laptop.
* `<TacticalRadarMap />` - Gaya radar militer, scanline CRT, koordinat segitiga Bermuda.
* `<InfographicBarChart />` - Bar chart pertumbuhan data statistik dengan garis panduan putus-putus.
* `<BlueprintComparison />` - Kanvas blueprint navy perbandingan sifat sains dua objek.
* `<FinanceCandlestick />` - Grafik candlestick hijau/merah crypto & ticker live BTC.
* `<CyberMatrix />` - Terminal hacker, hujan biner hijau, dan port scanning CVE.
* `<SocialChatSimulator />` - Simulasi chat WhatsApp HP dengan bubble pesan membal.
* `<NewspaperHeadline />` - Koran vintage investigasi berputar (*slam-in*) dengan stempel `TOP SECRET`.
* `<DeviceMockup />` - Bodi smartphone melayang dengan analitik aplikasi mobile SaaS.

---

## 🤖 Panduan Penggunaan di Berbagai AI (Universal Multi-AI)

Skill ini dibangun di atas standar terbuka **React + Remotion** dan instruksi markdown universal ([`SKILL.md`](./SKILL.md)), sehingga dapat digunakan secara fleksibel di berbagai platform AI favorit Anda:

### 1. 🌌 Google Antigravity (Gemini)
* **Status**: *Native Auto-Detected* ⚡
* **Cara Pakai**: Cukup clone repositori ini atau pastikan folder `.agents/skills/remotion-technical-faceless/` ada di root project Anda. Antigravity akan otomatis membaca seluruh SOP sutradara saat Anda memberi instruksi pembuatan video di chat.

### 2. 🧠 Claude (Claude 3.5 Sonnet / Claude Code / Claude Projects)
* **Claude Code (CLI Terminal)**: Buka terminal di dalam folder project ini dan jalankan perintah `claude`. Claude Code otomatis membaca file `SKILL.md` dan langsung memahami seluruh arsitektur komponen Remotion.
* **Claude Web (Projects)**:
  1. Buat Project baru di Claude (contoh: *Motion Graphics Director*).
  2. Upload file `SKILL.md` dan komponen `src/components/` ke dalam **Project Knowledge**.
  3. Minta Claude membuat adegan baru di chat, Claude akan menyusun kode React sesuai aturan 4-Tier & pose karakter.

### 3. 💬 ChatGPT (GPT-4o / Custom GPT)
* **ChatGPT Chat Biasa**: Cukup lampirkan / upload file `SKILL.md` di awal percakapan sebagai referensi panduan sutradara.
* **Custom GPT**: Buat Custom GPT di menu *Explore GPTs* > *Create*, lalu upload file `SKILL.md` ke bagian **Knowledge**. Beri instruksi: *"Kamu adalah sutradara motion graphics Remotion yang wajib mematuhi seluruh aturan di SKILL.md"*.

### 4. ⚡ AI Code Editors (Cursor, Windsurf, GitHub Copilot)
* **Cursor**: Buka repositori ini di Cursor. Anda bisa menyalin isi `SKILL.md` ke dalam file `.cursorrules` di root project. Saat menggunakan Cursor Composer (`Ctrl + I` / `Cmd + I`), AI akan otomatis mematuhi safe zone, komponen karakter, dan aturan hirarki 4-tier.
* **Windsurf**: Tambahkan panduan `SKILL.md` ke dalam *Global Rules* atau file `.windsurfrules`.
* **GitHub Copilot**: Buka project di VS Code, Copilot Chat akan otomatis membaca konteks dari file yang sedang terbuka (`SKILL.md` & `CharacterFigure.tsx`).

---

## 💡 Contoh Prompting ke AI Agent

Setelah meng-import skill ini ke workspace Antigravity Anda, Anda cukup memberikan prompt sederhana dan AI akan otomatis membuat adegan profesional:

```text
Buatkan video TikTok 9:16 tentang "Kenapa API Kamu Sering Error 504 Saat Trafik Naik".
Gunakan alur HPMR:
- Act 1: Developer panik di depan server crash
- Act 2: Grafik server amblas dan klien komplain
- Act 3: Bedah masalah dengan kaca pembesar masuk ke kode
- Act 4: Solusi Redis Caching di terminal
- Act 5: Selebrasi cuan sistem aman
Gunakan transisi Portal Zoom dan Stabilo Highlight pada kata kuncinya.
```

---

## 🛠️ Perintah Eksekusi & Render

```powershell
# Jalankan Live Preview Player di Browser
npm run dev

# Render Video Vertikal 9:16 (Shorts / Reels / TikTok)
npm run render:vertical

# Render Video Horizontal 16:9 (YouTube Explainer)
npm run render:horizontal
```

---

## 📋 Struktur Folder Repositori

```
├── .agents/skills/
│   └── remotion-technical-faceless/
│       └── SKILL.md            # SOP Sutradara AI Antigravity
├── references/                 # Standar rasio, kurva fisika, safe zones & naskah
├── src/
│   ├── components/             # Seluruh komponen visual, karakter, & transisi
│   ├── scenes/                 # Komposisi siap pakai (Vertical, Horizontal, Showcase)
│   ├── styles/theme.ts         # Palet warna dramatis, tipografi, & kurva fisika
│   ├── utils/audioSync.ts      # Kalkulator alokasi frame & BGM audio ducking
│   └── Root.tsx                # Registrasi komposisi Remotion
├── remotion.config.ts          # Konfigurasi Chromium / Chrome lokal
└── README.md                   # Dokumentasi panduan pengguna
```

---

## 📄 Lisensi & Kontribusi
Dibuat untuk memudahkan siapa saja memproduksi video motion graphics berkualitas tinggi berbasis kode. Silakan fork, adaptasi, dan gunakan untuk project komersial maupun edukasi Anda!
