# Datautomasi Clinic WhatsApp Booking Automation

Subpath update: the current RC serves **/clinic/** and emits **site/out/clinic/index.html** with all page resources under /clinic/. Canonical: https://datautomasi.com/clinic/. Local preview: http://127.0.0.1:4173/clinic/. Cloudflare build output remains **out**. See [SUBPATH_QA.md](SUBPATH_QA.md); earlier root-URL notes below are historical.

Current release status: **Release Candidate**, production not deployed. See [RELEASE_CANDIDATE.md](RELEASE_CANDIDATE.md) for final responsive/animation/link QA, hardening changes, and exact Cloudflare Pages settings. The verified build command is `node scripts/build.mjs` from `site/`, producing `site/out/`. Preview remains noindex; set SITE_INDEXABLE=true only for the approved production environment.

Latest update: **v1.1** — hero timeline is now 10 seconds including the final hold, WhatsApp display is formatted as 0815 555 1600, and a 14-feature marquee follows the existing three cards (30s desktop / 34s mobile). See [QA_UPDATE_V1.1.md](QA_UPDATE_V1.1.md) for the exact changed files and current QA results. Earlier 6-second notes below describe v1 history.

Implementation on `feature/clinic-whatsapp-booking`. No production configuration, deployment, or main-branch change is included.

Delivery status: the implementation and visual refinements are committed on this **local** branch. The preview runs at http://127.0.0.1:4173. GitHub CLI push could not authenticate, and no usable saved CLI credential was available; the remote branch and PR have not been published. The source archive includes the complete implementation and original reference package.

## Run locally

Requires Node.js 22.13+ and pnpm. From `site/`:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm preview
```

Open http://127.0.0.1:4173. After source edits, run `pnpm build` and reload the preview. Run `pnpm typecheck` and `pnpm lint` for source checks.

The Cloudflare Pages-compatible static output is `site/out/`. A future Pages **preview branch** may use root `site`, build command `pnpm build`, and output directory `out`. This task does not configure or publish production. Preview metadata is `noindex,nofollow`.

## Source and animation

- `site/app/page.tsx`: React components for brand, sales copy, semantic contact links, CSS smartphone with selectable chat text, ordered workflow cards and SVG connectors, conceptual SVG chart, and three feature cards.
- `site/app/globals.css`: visual tokens, desktop/tablet/mobile layouts, one-shot CSS animations, and reduced-motion final-state rules.
- `site/content.json`: exact source copy, including the supplied 2024 example dates. Workflow `\\n` values become line breaks.
- `site/design-tokens.json`: supplied design reference, preserved verbatim.
- `site/scripts/build.mjs`: renders the React page to static HTML, copies local assets, and emits CSS; no client JavaScript is required.
- `site/scripts/preview.mjs`: loopback-only local preview and private QA routes. QA routes are not in the static export.
- `site/public/assets/`: supplied brand, local Inter font, and restored clinic background.
- `site/app/layout.tsx`, `site/vite.config.ts`, `site/next.config.ts`: retained Sites/Vinext project configuration and matching page metadata.
- `datautomasi-clinic-codex-pack/`: original reference package, unchanged.

One shared document-load CSS timeline:

| Start | Action |
|---|---|
| 0.10 s | Phone settles using opacity and a 12 px translation; tilt remains constant. |
| 0.70 s | Patient question and Pesan Masuk. |
| 1.25 s | Short typing indicator and Memahami Kebutuhan. |
| 1.55 s | Schedule reply. |
| 2.05 s | Cek Jadwal. |
| 2.80 s | Patient selects a slot. |
| 3.35 s | Short confirmation typing indicator. |
| 3.62 s | Booking reply and Booking Dikonfirmasi. |
| 4.55 / 4.68 s | Revenue / loss curves draw using SVG stroke-dashoffset. |
| 5.90 s | Both curves and arrowheads are complete. All four messages remain visible. |

Every animation has a finite single iteration and a stable final state. There are no scroll triggers, timers, video, or client animation libraries in the exported page. Reduced motion disables all animations/transitions and typing/pulses and shows the complete phone, workflow, and chart immediately. Local QA instrumentation uses timers only in the preview server's test route.

## Deliberate fidelity differences

1. The supplied background is a blurred crop with residual phone/workflow graphics. A clean background was restored from the approved hero with the built-in ImageGen tool. Dental chair, room lighting, colors and placement follow the reference; reconstructed background pixels are not identical. The phone, chart, workflow, and text are real DOM/SVG overlays.
2. The smartphone bezel is CSS, with subtle perspective, rotation and skew; hardware highlights are an approximation. The chat wallpaper uses a quiet pale surface instead of the reference's baked illustration. Chat copy is exact.
3. Lucide line icons replace the reference's raster/shaded brain, calendar and feature icons. The brand mark uses a CSS crop of the supplied logo asset; wordmark and tagline are DOM text using Inter.
4. Microcopy is shown as required by `content.json` and the PRD even though it is not visible in the approved hero crop. At 1280 px, phone height is slightly increased to keep chat text at least 12 px.
5. Tablet/mobile rearrangement follows `RESPONSIVE_SPEC.md`. Mobile presents phone → descending workflow → chart → stacked features.
6. The generated Vinext development build failed in this Windows execution environment because child processes could not spawn (`EPERM`). The source remains React; a deterministic in-process static renderer produces the preview and Pages-compatible export without changing the visible design. No dependency install scripts are required by this static path.

See `QA_REPORT.md` for checks and browser limitations.
