# Clinic — Release Candidate

Status: QA lokal lulus; belum deploy. Menunggu approval pengguna untuk production.
Branch: feature/clinic-whatsapp-booking. Desain baseline e1f4a5b dipertahankan.

## File yang diubah

- site/app/globals.css: ruang vertikal untuk smartphone pada 1280–1439px; lebar workflow 57.7% menjadi 56% hanya pada rentang ini agar card terakhir beserta tepinya lebih aman. Posisi awal dan susunan bertangga tetap.
- site/scripts/build.mjs: membersihkan hanya folder output yang sudah diverifikasi; menjalankan validasi output; mendukung SITE_INDEXABLE.
- site/scripts/check-output.mjs (baru): gagal build jika aset hilang/kosong, target CTA berubah, card/pill hilang, metadata indexing tidak sesuai, atau instrumentation QA masuk export.
- site/public/_headers (baru): nosniff, referrer policy, frame protection, dan menonaktifkan camera/microphone/geolocation yang tidak digunakan.
- site/package.json: pin pnpm 11.19.0 sesuai runtime project.
- site/.node-version (baru): pin Node 24.19.0 sesuai runtime pengujian.
- README.md dan RELEASE_CANDIDATE.md: petunjuk RC, hasil QA, konfigurasi Pages.

Tidak ada asset visual, headline, copy, CTA style, smartphone angle/size, posisi chart, atau fitur baru yang diubah.

## Responsive QA

| Viewport | Client / scroll width | Smartphone–card gap | Workflow terakhir kanan / bawah | Hasil |
|---|---|---|---|---|
| 1920×1080 | 1905 / 1905 | 39px | 1763 / 640px | Lulus |
| 1440×900 | 1425 / 1425 | 49px | 1400 / 556px | Lulus |
| 1366×768 | 1351 / 1351 | 42px | 1334 / sekitar 515px | Lulus |
| 1280×800 | 1265 / 1265 | 41px | 1247 / sekitar 504px | Lulus |
| 1024×768 | 1009 / 1009 | 42px | 966 / 1301px | Lulus, scroll vertikal |
| 768×1024 | 753 / 753 | 322px | 710 / 1739px | Lulus, scroll vertikal |
| 430×932 | 415 / 415 | 872px | 382 / 1930px | Lulus, scroll vertikal |
| 390×844 | 375 / 375 | 799px | 343 / 1857px | Lulus, scroll vertikal |

Client width dikurangi scrollbar 15px. Tidak ada horizontal overflow, atau bounding-box overlap smartphone dengan headline, workflow, dan feature section. Workflow tetap naik koordinat x/y secara bertahap. Pada 1366/1440/1920 semua card workflow berada sepenuhnya dalam viewport. Chart SVG mempertahankan rasio 2.72 pada seluruh ukuran. Mobile/tablet menggunakan alur scroll vertikal yang sudah disetujui.

Temuan yang diperbaiki: smartphone sebelumnya menimpa card sekitar 12px pada 1366px. Setelah penambahan ruang, jarak menjadi 42px. Workflow terakhir sebelumnya hanya 3px dari batas client viewport pada 1366px; sekarang sekitar 17px.

## Animation QA

Timeline tetap 10 detik termasuk final hold, tanpa perubahan timing dari v1.1.
Sampling browser: chat pertama selesai 1.010s, Memahami Kebutuhan aktif sekitar 2.104s, balasan jadwal selesai 2.714s, Cek Jadwal selesai 3.402s. Keadaan tidak berubah pada 4.465–5.203s. Pilihan pasien selesai 5.809s. Semua chat/node selesai 7.208s. Chart belum tergambar pada 7.962s; sedang tergambar 8.507s; selesai sekitar 9.35s. Pada 10.002 dan 12.014s: semua opacity 1, chart stroke offset 0, running hero animations 0.

Marquee: desktop/tablet 30s, mobile 34s. Dua grup identik masing-masing 2577.977px, dengan padding gap penutup sama. Transform -50% dari track dua grup menjamin endpoint berimpit dengan awal duplikat; tidak ada perubahan posisi konten pada sambungan. Duplikat aria-hidden. Fokus tanpa hover dan hover tanpa fokus masing-masing teruji menghasilkan paused. Keluar dari region mengembalikan running.

Reduced-motion: cabang media query yang sama dipaksa melalui fixture lokal. Semua chat langsung opacity 1, chart offset 0, marquee animation-name none, duplikat display none, daftar wrap. Browser tidak menyediakan emulasi preferensi OS; toggle OS langsung belum diuji. Tidak ada script QA dalam output.

## Links, assets, build

Contact Us dan alamat email: mailto:sales@datautomasi.com.
Chat WhatsApp dan nomor tampilan 0815 555 1600: https://wa.me/628155551600.
Target blank WhatsApp memiliki noopener noreferrer. Link diperiksa pada DOM dan build output; tidak mengirim email/pesan atau menguji kepemilikan akun penerima.

HTTP lokal /, /styles.css, /assets/brand.png, /assets/clinic-background.webp, /assets/inter-latin.woff2: semuanya 200, non-empty. Validator juga memeriksa setiap src/href/url CSS terhadap file export. Tidak ada missing asset, QA script, atau console warning/error pada sesi browser yang diuji.

Production build command dari site:

```sh
node scripts/build.mjs
```

Perintah ini menghasilkan HTML/CSS/aset statis dan menjalankan check-output otomatis. Lulus dengan Node 24.19.0. TypeScript --noEmit dan oxlint app scripts juga lulus. git diff --check lulus.

Folder output: site/out (index.html, styles.css, assets/, _headers). Build membersihkan file lama sehingga asset starter usang tidak ikut output. Tidak memerlukan Worker, server Node, adapter Next.js atau Functions di Cloudflare.

## Cloudflare Pages settings setelah approval

| Setting | Isi |
|---|---|
| Framework preset | None |
| Root directory | site |
| Build command | node scripts/build.mjs |
| Build output directory | out |
| NODE_VERSION | 24.19.0 |
| PNPM_VERSION | 11.19.0 |
| SITE_INDEXABLE (Production only) | true |
| SITE_INDEXABLE (Preview/RC) | kosong atau false |

Dependency installation menggunakan pnpm dan pnpm-lock.yaml; untuk setup manual gunakan pnpm install --frozen-lockfile sebelum build. Build langsung di atas dipilih supaya tidak memicu pemeriksaan/reinstall otomatis pnpm 11 pada checkout lokal yang sudah memiliki dependencies. Wrapper pnpm build lokal sempat berhenti di pemeriksaan dependency store; build Node langsung, typecheck, lint, dan validasi export lulus. Clean dependency installation di Linux/Cloudflare belum dijalankan.

RC lokal tetap noindex,nofollow. SITE_INDEXABLE=true mengubah metadata ke index,follow saat rilis disetujui; kedua mode build sudah diuji. Header _headers baru akan diberlakukan oleh Cloudflare Pages; server preview lokal tidak mensimulasikan header tersebut.

Siap sebagai artifact statis Cloudflare Pages. Belum ada build/deployment di akun Cloudflare, custom domain, atau smoke test jaringan production. Branch hanya lokal; source RC perlu tersedia pada repository yang disambungkan atau output diunggah setelah approval.

Rujukan: [Cloudflare build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/), [build image/version overrides](https://developers.cloudflare.com/pages/configuration/build-image/), [static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/), [headers](https://developers.cloudflare.com/pages/configuration/headers/).
