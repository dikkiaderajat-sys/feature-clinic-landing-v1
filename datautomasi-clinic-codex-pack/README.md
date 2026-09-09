# Datautomasi Clinic — Codex Handoff Pack

This package contains the approved visual reference and the implementation specification for the Clinic WhatsApp Booking Automation landing page.

## Start here
1. `assets/references/01-approved-hero-mockup.png`
2. `docs/PRD.md`
3. `docs/ANIMATION_SPEC.md`
4. `docs/CODEX_PROMPT.md`

## Structure
- `assets/references/` — approved mockup and focused visual references
- `assets/brand/` — logo reference crop
- `assets/background/` — soft clinic-room visual fallback/reference
- `content.json` — exact page and phone copy
- `design-tokens.json` — color, radius, typography, and motion guidance
- `docs/` — PRD, animation, responsive, implementation, and QA docs

## Important implementation rule
The reference mockup is not intended to be used as a single flattened production image. The phone chat, workflow, chart, buttons, and copy should be recreated as real DOM/SVG elements.

This is what allows the 6-second synchronized animation to look natural and remain responsive.
