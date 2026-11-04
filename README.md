# Faceless-Skill

Motion graphics starter kit dan AI skill untuk membuat video explainer teknis/edukasi menggunakan **Remotion (React & TypeScript)**.

Repositori ini dirancang untuk memproduksi video vertikal **9:16 (TikTok, Reels, Shorts)** maupun horizontal **16:9 (YouTube)** dengan tata letak yang bersih, karakter dengan interaksi objek yang jelas, serta pengaturan audio dan transisi langsung dari kode.

---

## Fitur Utama

- **Karakter & Prop Interaktif**: Figur vektor minimalis dengan prop nyata (laptop crash, smartphone terjatuh, kaca pembesar, podium selebrasi) sehingga gerakan karakter memiliki konteks cerita yang jelas.
- **Sistem Grid 4-Tier (Anti Tumpang Tindih)**: Pembagian area vertikal yang disiplin untuk tag konteks, panggung karakter, teks punchline, dan subtitle pill agar tidak ada elemen yang saling menabrak atau terpotong UI mobile.
- **Audio Langsung di Remotion**: Voiceover, BGM auto-ducking (volume musik mengecil saat narator berbicara), dan penanda trigger SFX (*woosh, pop, ding, thud*) dikontrol langsung lewat timeline frame.
- **Pacing Terukur (2.5 – 3.5 detik)**: Setiap poin materi diberi jeda yang cukup agar penonton sempat mencerna isi konten, didukung *micro-movements* (kamera drift, debu halus) agar layar tidak terasa diam kaku.
- **Kanvas Gelap Kontras Tinggi**: Default background gelap (`#0b0f19`) dengan garis putih tegas dan aksen warna neon yang nyaman dilihat di layar ponsel.
- **Preset Komposisi Siap Pakai**: Termasuk demo visual radar militer, grafik data/candlestick, terminal kode, simulasi chat, koran investigasi, dan mockup perangkat.

---

## Quick Start

### 1. Jalankan di Komputer Lokal

```bash
# Clone repositori
git clone https://github.com/karisprwntcode/Faceless-Skill.git
cd Faceless-Skill

# Install package
npm install

# Buka Remotion Studio (Preview di Browser)
npm run dev
```

Buka `http://localhost:3000` di browser untuk memutar dan mengedit komposisi secara interaktif.

### 2. Render ke Video MP4

```bash
# Render video vertikal 9:16
npm run render:vertical

# Render video horizontal 16:9
npm run render:horizontal
```

Hasil render akan tersimpan di folder `out/`.

---

## Penggunaan di Berbagai AI Agent

Repositori ini menyertakan file [`SKILL.md`](./SKILL.md) yang berfungsi sebagai instruksi sistem untuk AI coding agent:

### Google Antigravity (Gemini)
Letakkan folder ini di workspace Anda atau salin folder `.agents/skills/remotion-technical-faceless/` ke proyek Anda. Antigravity akan otomatis mendeteksi skill ini saat diminta membuat video.

### Cursor / Windsurf
Buka folder ini di Cursor atau Windsurf. Anda bisa menambahkan isi `SKILL.md` ke dalam file `.cursorrules` atau `.windsurfrules`. Saat Anda meminta pembuatan scene baru lewat composer (`Ctrl + I`), AI akan otomatis mematuhi batas safe zone dan aturan hirarki layout.

### Claude (Claude Code / Claude Projects)
- **Claude Code (CLI)**: Jalankan perintah `claude` di dalam folder ini. Claude Code akan langsung membaca konteks proyek dan aturan di `SKILL.md`.
- **Claude Projects**: Buat project baru di web Claude, lalu unggah file `SKILL.md` dan folder `src/components/` ke dalam Project Knowledge.

### ChatGPT (GPT-4o)
Unggah file `SKILL.md` di awal obrolan, atau masukkan ke dalam Knowledge base jika Anda membuat Custom GPT untuk pembuatan video Remotion.

---

## Panduan Layout Vertikal (9:16)

Agar video tetap rapi di layar smartphone, seluruh komposisi vertikal mengikuti pembagian zona berikut:

| Zona | Rentang Y (1080x1920) | Isi Konten | Catatan |
| :--- | :--- | :--- | :--- |
| **Tier 1: Context Tag** | Y: 140 – 200 | Kategori topik atau label adegan (Font ~20px) | Muted, tracking lebar |
| **Tier 2: Hero Stage** | Y: 260 – 1160 | Karakter + prop objek + garis lantai (Tinggi ~900px) | Tidak boleh ada judul teks di zona ini |
| **Tier 3: Punchline** | Y: 1220 – 1380 | Teks pertanyaan / poin utama (Font ~68px tebal) | Diletakkan di bawah panggung visual |
| **Tier 4: Subtitle Pill** | Y: 1560 – 1640 | Pill box subtitle narasi (Offset bawah: 240px) | Jarak aman dari icon/deskripsi TikTok & Reels |

---

## Komponen yang Tersedia

### Karakter & Gestur (`src/components/CharacterFigure.tsx`)
- `action="panic-headgrab"`: Kedua tangan memegang kepala panik di samping laptop crash berkedip merah.
- `action="kneel-despair"`: Berlutut lesu di lantai (pose OTL) menatap smartphone yang jatuh.
- `action="inspect-magnify"`: Berdiri mengacungkan kaca pembesar dengan garis bidik target.
- `action="slumped-laptop"`: Duduk lemas menempel di keyboard laptop karena kelelahan seharian.
- `action="celebrate-victory"`: Melompat gembira dengan kacamata hitam dan tangan terangkat ke atas.

### Efek Visual & Transisi (`src/components/`)
- `<PortalZoom />`: Transisi zoom menembus objek tertentu langsung ke adegan berikutnya.
- `<WhipPan />`: Transisi geser horizontal cepat dengan motion blur.
- `<StabiloHighlight />`: Efek sapuan stabilo neon untuk menyorot kata kunci pada teks.
- `<CleanPillSubtitle />`: Komponen subtitle dengan background rounded gelap dan highlight kata per kata.
- `<VirtualCamera />`: Efek slow zoom dan camera shake saat adegan benturan/masalah.
- `<DustParticles />` & `<AuroraMesh />`: Partikel debu melayang dan pendaran gradasi latar belakang.

### Visual Khusus
- `<StickmanFigure />`: Karakter stickman minimalis hitam-putih.
- `<CodeTerminal />`: Tampilan terminal kode dengan penomoran baris dan syntax highlighting.
- `<FinanceCandlestick />`: Visual grafik candlestick naik/turun dan indikator harga.
- `<TacticalRadarMap />`: Peta radar militer dengan scanline CRT dan garis koordinat.
- `<InfographicBarChart />`: Diagram batang animasi dengan garis panduan statistik.
- `<BlueprintComparison />`: Komparasi dua objek dengan gaya grid blueprint sains.
- `<SocialChatSimulator />`: Tampilan antarmuka pesan chat mobile.
- `<NewspaperHeadline />`: Koran vintage berputar dengan stempel investigasi.
- `<DeviceMockup />`: Frame smartphone dengan tampilan antarmuka aplikasi.

---

## Contoh Prompt untuk AI

Jika Anda meminta AI (Cursor/Claude/ChatGPT/Antigravity) membuat video baru menggunakan skill ini, gunakan format instruksi seperti ini:

```text
Buatkan komposisi baru di src/scenes/ tentang "Kenapa Database Bisa Mengalami Race Condition".
Format: Vertikal 9:16 (1080x1920), 30fps.
Ikuti alur berikut:
1. Act 1 (Hook, 0-3s): Karakter panik (panic-headgrab) di samping server yang overload. Judul: "Database Kamu Sering Korup?".
2. Act 2 (Pain, 3-7s): Karakter lemas (kneel-despair) karena saldo user salah hitung.
3. Act 3 (Solusi, 7-11s): Karakter memeriksa masalah (inspect-magnify) dan transisi PortalZoom ke kode.
4. Act 4 (Terminal, 11-14s): Tampilkan CodeTerminal berisi transaksi atomic / database lock.
5. Act 5 (Outro, 14-17s): Karakter selebrasi (celebrate-victory) dengan teks kesimpulan.
Gunakan layout 4-Tier tanpa elemen bertabrakan dan pasang StabiloHighlight pada kata kunci.
```

---

## Struktur Folder

```
├── .agents/skills/
│   └── remotion-technical-faceless/
│       └── SKILL.md          # Instruksi SOP untuk AI
├── references/               # Panduan teknis (safe zones, kurva animasi, naskah)
├── src/
│   ├── components/           # Kumpulan komponen visual & karakter
│   ├── scenes/               # Demo skenario video (Vertical, Horizontal, Showcase)
│   ├── styles/theme.ts       # Definisi warna, font, dan preset fisika spring
│   ├── utils/audioSync.ts    # Perhitungan timeline durasi & audio ducking
│   └── Root.tsx              # Pendaftaran composition Remotion
├── remotion.config.ts        # Konfigurasi browser executable
└── README.md
```

---

## Lisensi

Proyek ini menggunakan lisensi MIT. Silakan gunakan, modifikasi, dan adaptasikan untuk kebutuhan konten edukasi maupun komersial Anda.
