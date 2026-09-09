# Implementation Notes

## Recommended DOM/component breakdown
- `ClinicLandingPage`
  - `BrandHeader`
  - `HeroCopy`
  - `ContactActions`
  - `ClinicVisualStage`
    - `PhoneMockup`
      - `PhoneHeader`
      - `ChatMessage`
      - `TypingIndicator`
    - `WorkflowSteps`
      - `WorkflowNode`
      - `WorkflowConnector`
    - `BusinessPotentialChart`
  - `FeatureStrip`
    - `FeatureCard`

## Important
The approved mockup is a **reference image**, not a single production background to be displayed whole.

Rebuild the key elements as DOM/SVG so animation is real and responsive.

## Phone implementation
Prefer CSS phone shell:
- dark metallic bezel
- rounded corners
- dynamic-island style black pill
- pale WhatsApp-like chat wallpaper
- top app bar with clinic name/status
- bottom input bar

Phone should be rotated as one component. Chat bubbles animate inside it.

If a CSS shell cannot match closely, use the supplied phone image only as a visual reference and create a transparent bezel asset during implementation. Do not use the reference phone with baked text as the animated production screen.

## Background
`assets/background/clinic-room-soft-reference.webp` is an atmospheric fallback/reference made from the approved visual. It is intentionally soft.

Use it only if it visually improves fidelity. It may be replaced by a cleaner local clinic-room image already present in the repository, provided the overall look remains:
- bright
- white
- soft blue
- modern dental chair
- low contrast
- background only

Do not use a dark or high-contrast clinic photo.

## Icon guidance
Use the project's existing icon system first.
If none exists, a small library such as Lucide is acceptable.

Suggested semantic icons:
- Mail
- MessageCircle / WhatsApp brand icon
- BrainCircuit
- CalendarDays
- CircleCheckBig
- RefreshCw
- UsersRound
- ArrowRight

Do not load a second icon library if one already exists.

## Accessibility
- Links use semantic `<a>`.
- Mail CTA has clear accessible name.
- WhatsApp CTA has clear accessible name.
- Workflow is understandable without animation.
- Chart is illustrative; provide a concise accessible label.
- Respect reduced motion.

## SEO basics
Suggested title:
`Clinic WhatsApp Booking Automation | Datautomasi`

Suggested meta description:
`Otomatisasi booking klinik melalui WhatsApp untuk cek jadwal, booking, reschedule, pembatalan, dan pencatatan data pasien secara lebih cepat dan profesional.`

## Deployment
Target is compatible with GitHub → Cloudflare Pages workflow.
Do not change production configuration unless required.
Implement on a branch/preview first.
