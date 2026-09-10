# RC subpath /clinic/

Target canonical: https://datautomasi.com/clinic/.

Output layout:

```text
out/
  _headers
  clinic/
    index.html
    styles.css
    assets/
      brand.png
      clinic-background.webp
      inter-latin.woff2
      Inter-OFL.txt
```

Build command dari site/: node scripts/build.mjs. Cloudflare Pages root directory tetap site dan build output directory tetap out (bukan out/clinic).

Semua resource halaman menggunakan /clinic/styles.css atau /clinic/assets/...; tidak ada ketergantungan pada /styles.css atau /assets/. Canonical selalu https://datautomasi.com/clinic/. SITE_INDEXABLE=true menghasilkan index,follow pada halaman clinic; preview default tetap noindex,nofollow. Kedua mode sudah dibuild dan diverifikasi otomatis.

HTTP lokal /clinic/, CSS, logo, background WebP, dan font WOFF2 semuanya 200/non-empty. Browser membuka langsung http://127.0.0.1:4173/clinic/ lalu reload dengan sukses. Logo terdecode, background/CSS mengarah ke subpath, CTA tetap mailto:sales@datautomasi.com dan https://wa.me/628155551600. Tidak ada console warning/error atau horizontal overflow pada pengecekan subpath. Typecheck, lint, build, dan check-output lulus.

Tidak ada perubahan layout/responsive, asset bytes, CSS animasi 10 detik, marquee, atau copy. CSS hanya mengganti dua URL resource dan komponen hanya mengganti URL logo. Header Pages tetap berada di root output, tetapi rule dibatasi /clinic/*.

Preview server memetakan directory URL ke index.html, termasuk refresh /clinic/. Redirect root lokal ke /clinic/ hanya untuk kenyamanan preview dan tidak diekspor. Output tidak mengambil alih homepage datautomasi.com.

File implementasi berubah: site/app/globals.css, site/app/page.tsx, site/app/layout.tsx, site/scripts/build.mjs, site/scripts/check-output.mjs, site/scripts/preview.mjs, site/public/_headers. Dokumentasi: README.md dan SUBPATH_QA.md.

Belum production deploy. Untuk URL domain akhir, folder clinic harus disertakan pada deployment/site yang melayani datautomasi.com, atau dirutekan secara eksplisit oleh konfigurasi domain yang ada. Subpath output ini tidak mengubah DNS atau konfigurasi hosting domain.
