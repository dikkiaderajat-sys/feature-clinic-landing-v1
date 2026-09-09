# Responsive Layout Specification

## Desktop ≥ 1280px
Goal: match `01-approved-hero-mockup.png`.

- Hero max width: approximately 1500–1560px.
- Left column: ~34–38%.
- Center phone: ~22–25%.
- Right visual system: remaining space.
- Phone must not overlap headline.
- Chart stays top-right and intentionally smaller than earlier iterations.
- Workflow stays stepped downward.
- Bottom feature cards stay in one row.

## Tablet 768–1279px
Do not compress the desktop absolute layout until it overlaps.

Recommended structure:
1. Brand row.
2. Copy + CTA block.
3. Visual stage:
   - phone centered/left of visual stage
   - chart at upper-right if space permits
   - workflow beneath/around phone with the same semantic order
4. Feature cards can become 3 columns if >= 900px, otherwise 1–2 columns.

If stepped workflow cannot fit cleanly, reduce card size before changing the order.

## Mobile < 768px
Priority is readability, not desktop mimicry.

Order:
1. Logo
2. Eyebrow
3. Headline
4. Description
5. Contact Us + email
6. Chat WhatsApp + number
7. Phone
8. Workflow vertically stepped or simple vertical flow
9. Chart
10. Feature cards stacked

- Preserve phone tilt subtly, but reduce it if it causes clipping.
- Chat text must remain readable.
- No horizontal overflow.
- Do not shrink feature text below comfortable mobile reading size.
- The 6-second narrative can still run, but workflow connectors should adapt vertically.

## Small mobile
At <= 390px:
- remove nonessential decorative shapes
- phone width roughly 82–90vw
- do not allow chart legend wrapping into the plot
