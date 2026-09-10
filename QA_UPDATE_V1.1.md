# Clinic v1.1 — hasil implementasi dan QA

Tanggal: 10 September 2026. Branch lokal: feature/clinic-whatsapp-booking.
Baseline: commit 2bc76c0. Seluruh teks dan kedua gambar dalam update pack sudah dibaca/ditinjau.

## File yang berubah

- site/content.json: format nomor menjadi 0815 555 1600; menambahkan judul dan 14 label marquee sesuai urutan pack.
- site/app/page.tsx: timing chat/workflow, dua SVG ghost curve, dan section marquee setelah tiga card.
- site/app/globals.css: timeline baru, ghost curve 12%, pill marquee, pause hover/fokus, responsive dan reduced motion.
- site/scripts/preview.mjs: sampling QA diperpanjang hingga 12 detik; hitungan animasi aktif dibatasi pada hero.
- README.md: catatan versi terbaru.
- QA_UPDATE_V1.1.md: laporan ini.

## Timeline

Hero DOM/CSS/SVG tetap tanpa runtime JS produksi atau video. Durasi cerita 10 detik mencakup final hold 9.35–10.00; setelah itu tetap diam.

| Elemen | Waktu |
|---|---|
| Phone settle | 0–0.60s |
| Chat pasien | 0.60–0.83s |
| Pesan Masuk | 0.85–1.11s |
| Typing pertama | 1.55–2.35s |
| Connector / Memahami Kebutuhan | 1.65s / 1.90s |
| Balasan jadwal, shell lalu teks | 2.35s / 2.57–2.87s |
| Connector / Cek Jadwal | 2.75s / 3.05s |
| Reading pause tanpa konten baru | 4.45–5.35s |
| Pilihan pasien | 5.35–5.58s |
| Typing konfirmasi / connector akhir | 6.25–6.75s / 6.35s |
| Chat berhasil / node sukses | 6.75s / 6.95s |
| Revenue draw | 8.00–9.25s |
| Loss draw | 8.13–9.35s |
| Final hold | 9.35–10.00s dan seterusnya |

Sampling browser: chat pertama lengkap pada 1.003s; dua chat pada 2.714s; tiga node lengkap pada 3.413s; keadaan sama pada 4.460 dan 5.211s; pilihan lengkap pada 5.810s; seluruh chat/node lengkap pada 7.202s. Kedua chart stroke masih tersembunyi pada 7.967s dan sedang tergambar pada 8.501s. Pada 10.015s dan 12.013s: semua chat/node opacity 1, kedua stroke offset 0, animasi hero aktif 0. Ghost guides terlihat sejak awal, legend/grid/months tetap terlihat. Tidak ada angka finansial baru.

## Responsive dan marquee

| Viewport | Client / scroll width | Hasil |
|---|---|---|
| 1440×900 | 1425 / 1425 | Lulus |
| 1280×800 | 1265 / 1265 | Lulus |
| 1024×768 | 1009 / 1009 | Lulus |
| 768×1024 | 753 / 753 | Lulus |
| 430×932 | 415 / 415 | Lulus |
| 390×844 | 375 / 375 | Lulus |

Scrollbar vertikal browser mengambil 15px. Tidak ada page-level horizontal overflow. Tiga card tetap ada pada semua ukuran; marquee berada setelah card. Review visual desktop, tablet, dan mobile menunjukkan pill ringan dengan label terbaca.

Marquee: CSS transform linear 30s desktop/tablet dan 34s mobile. Dua grup identik, masing-masing 14 label, dengan gap penutup yang sama; transform -50% track tepat satu grup. Lebar kedua grup terukur 2577.977px (beda pembulatan kurang dari 0.001px). Duplikat aria-hidden=true; pill tidak masuk tab order. Satu region dapat menerima fokus untuk menghentikan gerak.

Interaksi browser yang diuji terpisah:
- Fokus keyboard di region, hover=false → animation-play-state=paused.
- Hover=true, focus-within=false → animation-play-state=paused.
- Fokus/hover keluar → running.

## Reduced motion dan regresi

Cabang CSS reduced-motion diuji melalui route QA lokal yang memaksa media query yang sama. Pada sampel pertama 14ms dan hingga 12s: semua chat/node opacity 1, stroke offset 0, animasi hero aktif 0. Marquee animation-name=none, grup utama flex-wrap=wrap, duplikat display=none. Screenshot mobile menunjukkan semua 14 fitur sebagai daftar statis tanpa overflow.

Batas pengujian: browser automation tidak menyediakan emulasi preferensi OS; perubahan setting OS secara langsung tidak diuji. Route QA tidak ikut export produksi.

Diff menjaga logo, headline/deskripsi, tujuan dan style CTA, geometri/kemiringan smartphone, stepped workflow, posisi chart, tiga card, serta file background tetap utuh. Nomor tampilan berubah; tujuan WhatsApp tetap https://wa.me/628155551600 dan email tetap mailto:sales@datautomasi.com. Tidak ada nav, QR, atau CTA lama ditambahkan.

## Build/check dan deviasi

- node scripts/build.mjs: lulus.
- node node_modules/typescript/bin/tsc --noEmit --incremental false: lulus.
- node node_modules/oxlint/bin/oxlint app scripts: lulus.
- git diff --check: lulus.
- Browser console warning/error: tidak ditemukan.
- Preview HTTP: 200.

Tidak ada redesign atau deviasi visual baru di luar perubahan v1.1 yang diminta. Perbedaan pendekatan render/asset terhadap mockup asli tetap seperti laporan QA sebelumnya. Dua nama referensi 01/02 dalam CODEX_UPDATE_PROMPT tidak ada di zip v1.1; gambar referensi asli dari pack sebelumnya tetap menjadi acuan, bersama dua gambar yang benar-benar disertakan pada update.

Tidak ada deployment production atau push ke main. Preview berjalan lokal pada http://127.0.0.1:4173/.
