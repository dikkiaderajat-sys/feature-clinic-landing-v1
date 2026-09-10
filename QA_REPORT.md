# QA report — Datautomasi Clinic

Date: 9 September 2026. Branch: `feature/clinic-whatsapp-booking`.

All six requested documents, `CODEX_PROMPT.md`, `content.json`, `design-tokens.json`, README, manifest, all seven image references, logo and background were inspected before implementation. The approved hero and smartphone were the main visual references. No production deployment or main-branch modification was performed.

## Responsive and visual checks

Tested using the in-app Chromium browser, viewport overrides, screenshots and DOM geometry:

| Viewport | Horizontal overflow | Phone/headline | Phone/workflow | Chart/workflow | Layout |
|---|---|---|---|---|---|
| 1677×938 | None | Separate | Separate | Separate | Reference-size desktop, three features |
| 1440×900 | None | Separate | Separate | Separate | Desktop, three features |
| 1280×800 | None | Separate after spacing refinement | Separate after spacing refinement | Separate | Desktop, phone text ≥12 px |
| 1024×768 | None | Separate | Separate | Separate | Copy above visual stage, three features |
| 900×900 | None | Separate | Separate | Separate | Additional tablet boundary check |
| 768×1024 | None | Separate | Separate | Separate | Phone/chart then stepped workflow; stacked features |
| 430×932 | None | Separate | Separate | Separate | Phone → vertical stepped workflow → chart → features |
| 390×844 | None | Separate | Separate | Separate | Same mobile order; phone around 90% of viewport |

- Confirmed all four phone messages remain above the composer without clipping. Main chat text is 12–14.85 px across tested widths, scaled to the phone; timestamps remain smaller as in the reference.
- Logo/wordmark is top-left; there is no navigation, QR code, old demo CTA, pricing, fake metric, or extra marketing section.
- Headline uses three explicit DOM lines, navy first line and blue subsequent lines. On mobile the headline scales to preserve its line breaks.
- Workflow cards descend left-to-right on desktop and vertically step on mobile; connectors are real SVG, with separate mobile arrow definitions.
- Chart remains small at upper-right on desktop. Revenue is green and rising; loss is red and falling; paths cross around February. No numeric Y-axis or financial claim.
- Three feature cards retain their original order and copy.
- Dental background is an optimized restored WebP (32,878 bytes). The clean restoration is a disclosed visual approximation, not the supplied blurred image or the entire mockup.

## Animation measurements

### Continuation: visual refinement

The PRD, animation spec and QA checklist were reread and the existing preview was compared again with the approved hero; the implementation was continued on the same branch.

- Moved phone, workflow and chart to their reference-aligned desktop positions; increased the clear phone/workflow gap to approximately 20–26 px.
- Adjusted desktop vertical spacing and CTA sizing proportionally, bringing the feature strip back toward the reference baseline without removing the required microcopy.
- Narrowed the first patient bubble to match the phone reference more closely. Its text is unchanged.
- Retested the six required viewport sizes after the refinements. A 1280 px overflow caused by the rightward movement was fixed by narrowing only that breakpoint's workflow; final scroll width equals client width (1265 px with the browser scrollbar).
- Approximate final alignment at 1677×938: phone top 100 px / bottom 741 px, first workflow card left 1061 px, chart left 1232 px, and feature strip top 774 px. These now closely follow the corresponding reference positions (~100 / 741, 1060, 1230, 774).
- Retested the complete timeline: chart still hidden at 4.503 s, both paths drawing at 4.754 s, zero running animations at 6.004 s and 7.211 s. All four messages/nodes remained fully visible in the final state.

The local-only `/__qa/timeline` fixture samples computed styles and the browser animation API. It is not included in the export.

| Observed time | Visible messages | Completed workflow nodes | Chart state |
|---|---|---|---|
| 0.008 s | 0 | 0 | Both paths hidden |
| 0.814 s | Patient question revealing | Pesan Masuk activating | Hidden |
| 1.414 s | 1 | First two | Hidden |
| 1.800 s | 2 | First two | Hidden |
| 2.418 s | 2 | First three | Hidden |
| 3.065 s | 3 | First three | Hidden |
| 4.116 s | All four | All four | Hidden |
| 4.516 s | All four | All four | Hidden |
| 4.750 s | All four | All four | Revenue/loss paths drawing |
| 6.014 s | All four | All four | Complete; 0 running animations |
| 7.201 s | All four | All four | Unchanged; 0 running animations |

CSS defines the final path/arrow completion at 5.90 s. There is no infinite iteration, scroll trigger, client animation library or prerendered video. Typing indicators and connector pulses disappear permanently. The phone's final tilt stays constant during the subtle settling motion.

## Reduced motion

Production CSS uses `prefers-reduced-motion: no-preference` to opt into animation and `prefers-reduced-motion: reduce` for the final static state.

Verified in a local fixture that activates the **same reduced-motion CSS declarations** and disables the normal-motion block:

- All messages and nodes had opacity 1 from the first sample (4 ms).
- Both chart paths had offset 0 and no dash pattern.
- Typing indicators and connector pulses had `display: none`.
- Message animation name was `none`.
- The browser reported 0 running animations at every sample through 7.2 s.

Limitation: this browser exposes viewport control but no OS-media-preference emulation. The reduced CSS branch was tested directly; switching the actual Windows/macOS accessibility preference was not tested. No operating-system setting was changed.

## Functional, content, accessibility and build checks

- Primary button and visible email both point to `mailto:sales@datautomasi.com`.
- WhatsApp button and visible number both point to `https://wa.me/628155551600`, with `_blank` and `noopener noreferrer`.
- Browser keyboard test produced a solid 3 px focus outline on the email link. No email/WhatsApp message was sent during QA.
- Chat and marketing copy come directly from the supplied JSON, including example dates, message sides, timestamps, emoji and bullet lines. Literal workflow line-break tokens are rendered as separate lines.
- Phone messages are selectable HTML; workflow is an ordered list; chart has SVG title/description explaining that it is illustrative. Icon-only phone controls are decorative, not misleading working inputs.
- Static build succeeded; TypeScript check and application/script lint passed. Two scoped lint exceptions preserve the accessible inline SVG and native local logo image required by the static export.
- Local Inter font is bundled with its license. The exported page requires no client JavaScript and no third-party network request to display.
- Preview returns HTTP 200 and includes Indonesian language metadata, title, description, and `noindex,nofollow`.

## Disclosed differences and limitations

This is not a pixel-identical reproduction. The restored room background, CSS metallic bezel/perspective, pale chat wallpaper, DOM wordmark and Lucide line icons approximate raster details. The microcopy required by the JSON/PRD is displayed, and phone height is slightly increased at 1280 px to keep chat text readable. Tablet/mobile reflow follows the supplied responsive spec. These differences do not change copy, conversion destinations or workflow order.

The initial Vinext development process failed with Windows child-process `EPERM`; the final build renders the same React source in-process to static HTML/CSS. Tests ran in the available Chromium browser; Safari, Firefox, real-device hardware and an actual email/WhatsApp handler were not tested. See README for running locally and all implementation notes.

## Files added

See `CHANGED_FILES.txt` for the complete path list. The original uploaded reference package is unchanged. Main implementation files are `site/app/page.tsx`, `site/app/globals.css`, `site/scripts/build.mjs`, `site/scripts/preview.mjs`, `site/content.json`, and `site/public/assets/`; other added files are Sites scaffold/configuration, the lockfile, retained UI primitives, and delivery documentation.
