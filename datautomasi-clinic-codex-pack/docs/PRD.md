# PRD — Datautomasi Clinic WhatsApp Booking Automation Landing Page

## 1. Status
**Approved visual baseline:** `assets/references/01-approved-hero-mockup.png`

This image is the visual authority for the first implementation. Do not reinterpret it into a darker, denser, more “AI/cyberpunk” design. The desired feeling is **clean, airy, modern, professional, healthcare-trustworthy, and sales-oriented**.

## 2. Product goal
Create a compact landing page that makes a clinic owner understand within seconds:

> A patient can communicate through WhatsApp as naturally as if they were chatting with an admin, while the automation handles understanding, schedule checking, and booking confirmation in the background.

The page is a sales surface, not a product dashboard and not a long-form corporate website.

## 3. Primary conversion actions
### Primary CTA
- Label: **Contact Us**
- Href: `mailto:sales@datautomasi.com`
- Visible supporting email: `sales@datautomasi.com`

### Secondary CTA
- Label: **Chat WhatsApp**
- Href: `https://wa.me/628155551600`
- Visible number: `08155551600`
- Open WhatsApp in a new tab/window where appropriate.

## 4. Explicitly removed
Do **not** add:
- Home
- Solusi
- Cara Kerja
- Kontak
- QR code
- “Coba Demo via WhatsApp”
- extra feature sections not present in the approved baseline
- social proof numbers that have not been supplied
- pricing
- long FAQ
- unnecessary decorative animation

## 5. Desktop composition
The approved 1677×938 mockup establishes the spatial hierarchy:

1. **Top-left brand**
   - Datautomasi mark and wordmark.
   - Tagline: `Automation for a Better Tomorrow`.
   - No top navigation menu.

2. **Left sales column**
   - Eyebrow.
   - Three-line headline.
   - Short product description.
   - Contact Us CTA.
   - Email.
   - Chat WhatsApp CTA below Contact Us.
   - WhatsApp number.
   - Microcopy: `Booking klinik, semudah chat biasa.`

3. **Center**
   - Slightly tilted smartphone, tall portrait orientation.
   - Smartphone is the main product story and must not overlap the headline or workflow.

4. **Right**
   - Small business-potential chart at top.
   - Four workflow cards in a **descending stepped arrangement**, not a flat row:
     `Pesan Masuk → Memahami Kebutuhan → Cek Jadwal → Booking Dikonfirmasi`.
   - Blue stepped connectors.
   - Clinic room remains visible behind the workflow.

5. **Bottom**
   - Three simple feature cards:
     - Cek Jadwal Otomatis
     - Booking & Reschedule
     - Data Pasien Tercatat

## 6. Visual principles
- White / ice-blue overall background.
- Navy for high-trust headline text.
- Bright blue for emphasized headline lines and automation paths.
- Green for WhatsApp and success.
- Red only for `Potential Loss`.
- Keep generous negative space.
- Avoid excessive glassmorphism.
- Avoid heavy borders.
- Avoid visual noise.
- No elements should collide or overlap at normal desktop widths.

## 7. Production implementation rule
Do not bake the animated phone chat, workflow, or chart into a single image.

Use:
- HTML/CSS for the phone and chat bubbles.
- HTML/CSS for workflow cards.
- SVG for stepped connectors and chart curves.
- DOM text for all readable copy.

This is necessary for crisp typography, responsive behavior, accessibility, and synchronized animation.

## 8. Business chart semantics
The chart is a **conceptual sales visualization**, not measured analytics.

Title:
`Potensi Bisnis Klinik`

Legend:
- green: `Potential Revenue`
- red: `Potential Loss`

X-axis:
`Jan Feb Mar Apr Mei Jun`

The green line rises; the red line falls. The lines cross around Feb/early Mar. Do not display numeric Y-axis values or fabricate percentages/currency.

## 9. Technology guidance
First inspect the existing repository and follow its stack.

- If the existing project is vanilla HTML/CSS/JS, stay vanilla.
- If it is React/Vite/Next, implement as components within that stack.
- Do not introduce a new framework only for this page.
- Prefer native CSS animations / Web Animations API.
- Only use GSAP if it already exists or if the repo clearly benefits from it.
- Keep the hero performant and lightweight for Cloudflare Pages.

## 10. Acceptance criteria
A build is acceptable only when:
- The composition visually matches the approved mockup at desktop size.
- The smartphone angle and screen proportions match the approved smartphone reference.
- All smartphone copy is exact and legible.
- Workflow is visibly stepped downward.
- Workflow stages activate in sync with the phone story.
- Chart animation starts only after booking confirmation.
- Revenue line is green; loss line is red.
- No removed navigation/QR/old CTA appears.
- Contact links are correct.
- Nothing overlaps at desktop/tablet/mobile.
- Reduced-motion users receive the completed static state.
