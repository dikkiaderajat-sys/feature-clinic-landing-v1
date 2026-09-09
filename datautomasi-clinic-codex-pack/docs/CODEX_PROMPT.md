# Codex Execution Prompt

Implement the Datautomasi **Clinic WhatsApp Booking Automation** landing page using the files in this package.

## Before editing
1. Inspect the repository structure and existing frontend stack.
2. Read:
   - `docs/PRD.md`
   - `docs/ANIMATION_SPEC.md`
   - `docs/RESPONSIVE_SPEC.md`
   - `docs/QA_CHECKLIST.md`
   - `docs/IMPLEMENTATION_NOTES.md`
   - `content.json`
   - `design-tokens.json`
3. Open `assets/references/01-approved-hero-mockup.png`.
4. Open `assets/references/02-approved-smartphone-reference.png`.

The approved hero mockup is the main visual target.

## Critical constraints
- Do not redesign the page.
- Do not add a top nav.
- Do not add QR code.
- Do not add additional sections.
- Do not add fake metrics.
- Do not use a prerendered hero video.
- Do not bake the phone conversation into an image.
- Build phone chat text as DOM content.
- Build workflow as DOM + SVG connectors.
- Build chart as SVG.
- Animate only the phone conversation, stepped workflow, and chart.

## Required links
- Contact Us → `mailto:sales@datautomasi.com`
- Chat WhatsApp → `https://wa.me/628155551600`

## Animation requirement
Implement the approximately 6-second synchronized timeline in `docs/ANIMATION_SPEC.md`.

The narrative must read naturally:
**patient message → understanding → schedule check → patient selects → booking confirmed → business chart outcome**

Do not loop continuously.
Respect `prefers-reduced-motion`.

## Visual validation
Use the QA checklist and compare the result to the approved mockup at 1440–1680px desktop width.

Specifically inspect:
- phone angle and size
- no overlap
- stepped workflow
- chart size
- white/ice-blue balance
- CTA placement
- bottom three feature cards
- exact phone copy

## Development quality
- Reuse the repo's design/build conventions.
- Avoid unnecessary dependencies.
- Keep animations GPU-friendly.
- Keep layout responsive.
- Do not modify unrelated files.

## Delivery
When complete:
1. Summarize files changed.
2. State how to run/test locally.
3. List responsive checks performed.
4. List animation/reduced-motion checks performed.
5. Flag any deviation from the approved mockup instead of silently improvising.
