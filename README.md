# 🎬 Remotion Studio: Character-Driven Faceless Motion Graphics

> **Antigravity AI Skill & Starter Kit** untuk memproduksi video motion graphics faceless yang hidup, berkarakter, dan memiliki retensi tinggi menggunakan **Remotion (React + TypeScript)**.
> Dilengkapi **Sistem Karakter Figur (`<CharacterFigure />`)**, **Goresan Stabilo Neon (`<StabiloHighlight />`)**, **Atmosfer Partikel Debu & Aurora Glow**, **Otomasi Audio Timeline & BGM Ducking**, dan **Formula Naskah HPMR (Hook-Pain-Mechanism-Reward)**.

---

## 🚀 Fitur Utama & Intuisi Sutradara

- 🎭 **The Golden Law: Character-Driven Storytelling**: Video tidak pernah hanya berisi teks dan bangun datar. Karakter berekspresi (Developer, Trader, Hacker, Scientist, Casual) hadir mengikat empati penonton dari awal hingga akhir.
- 🖍️ **Stabilo Highlighter Wipe**: Kata kunci krusial tergores stabilo neon dinamis menyapu dari kiri ke kanan.
- 🌌 **Atmospheric Depth**: Partikel debu melayang lembut (`<DustParticles />`) dan pendaran gradasi aurora (`<AuroraMesh />`) yang berganti warna mengikuti emosi adegan.
- ⏱️ **Kalkulator Durasi Otomatis (`audioSync.ts`)**: Menghitung alokasi frame per adegan secara otomatis berdasarkan panjang naskah suara narator (~2.4 kata/detik).
- 🎧 **Dynamic BGM Ducking**: Volume musik otomatis mengecil saat narator berbicara dan membuncah (*swell*) pada jeda pergantian adegan.
- 📝 **Blueprint Naskah HPMR**: Standar 4 babak teruji algoritma: *The Hook (0–3s)* ➔ *The Pain (3–8s)* ➔ *The Mechanism (8–12s)* ➔ *The Reward & Seamless Loop (12–15s+)*.

---

## 🎨 Galeri 9 Master Visual Archetypes

| # | Gaya Visual | Komponen | Nuansa & Elemen Visual | Niche Konten |
| :-: | :--- | :--- | :--- | :--- |
| **1** | 🏃 **Stickman Story** | `<StickmanFigure />` | Line-art putih minimalis, karakter lelah bawa laptop, `z z` melayang. | Produktivitas, edukasi santai, curhat kerjaan. |
| **2** | 🛰️ **Tactical Radar / Glitch** | `<TacticalRadarMap />` | CRT scanlines, timecode VHS (`PLAY 00:01`), radar berkedip & laser merah. | Misteri, investigasi, sejarah, teori konspirasi. |
| **3** | 📊 **Data Infographics** | `<InfographicBarChart />` | Garis putus-putus (*dotted guides*), bar chart tumbuh, headline angka besar. | Statistik, ekonomi, demografi, data dunia. |
| **4** | 📐 **Blueprint Sains** | `<BlueprintComparison />` | Kanvas grid navy blueprint, tulisan tangan miring, kotak menyusut/memuai. | Sains, fisika, kimia, biologi, cara kerja alam. |
| **5** | 📈 **Finance & Crypto** | `<FinanceCandlestick />` | Grafik candlestick hijau/merah, live ticker harga Bitcoin, ATH resistance. | Saham, kripto, investasi, strategi bisnis. |
| **6** | 💻 **Cyber Matrix** | `<CyberMatrix />` | Terminal hacker, hujan biner matrix, port scanning vulnerability CVE. | Cybersecurity, bugs, bug bounty, dark web. |
| **7** | 💬 **Social Chat / WhatsApp** | `<SocialChatSimulator />` | Antarmuka chat HP, bubble pesan membal, status online, indikator mengetik. | Studi kasus klien, drama kantor, dialog percakapan. |
| **8** | 📰 **Koran / Investigasi** | `<NewspaperHeadline />` | Koran vintage berputar (*slam-in*), stempel merah `TOP SECRET`, stabilo kuning. | Skandal teknologi, berita heboh, investigasi kasus. |
| **9** | 📱 **Smartphone / SaaS** | `<DeviceMockup />` | Bodi smartphone modern, analitik aplikasi, notifikasi transfer masuk. | Review aplikasi mobile, SaaS startup, produk digital. |

---

## 🛠️ Cara Menjalankan

### 1. Buka Preview Player (Remotion Studio)
```bash
npm run dev
```
Buka `http://localhost:3000` di browsermu. Di panel kiri, kamu bisa melihat preview:
- **`VerticalExplainer`**: Demonstrasi alur cerita lengkap dengan karakter developer, terminal kode, dan bohlam eureka!
- **`MegaShowcase`**: Demo 5 gaya baru (Crypto, Cyber Matrix, Chat WA, Koran, Mockup HP).
- **`ArchetypeShowcase`**: Demo 4 gaya awal (Stickman, Radar Bermuda, Infografis, Sains).
- **`HorizontalExplainer`**: Format 16:9 widescreen 2-kolom tanpa tabrakan.

### 2. Render ke File MP4
- Video **Vertikal 9:16** (Shorts/Reels/TikTok):
  ```bash
  npm run render:vertical
  ```
- Video **Horizontal 16:9** (YouTube Explainer):
  ```bash
  npm run render:horizontal
  ```

---

## 📤 Cara Upload ke Akun GitHub

```bash
git init
git add .
git commit -m "feat: complete master-level character-driven remotion skill"
git branch -M main
git remote add origin https://github.com/USERNAME-KAMU/remotion-technical-faceless.git
git push -u origin main
```
