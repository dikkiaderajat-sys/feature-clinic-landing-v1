# Asset provenance

- `public/assets/brand.png`: unmodified copy of the supplied `assets/brand/datautomasi-logo-reference.png`. CSS clips the symbol; visible brand text is HTML.
- `public/assets/inter-latin.woff2`: local Latin variable font from the official Google Fonts Inter stylesheet. It is served locally and causes no font request to Google at page load. Inter is distributed under the SIL Open Font License; see `public/assets/Inter-OFL.txt`.
- `public/assets/clinic-background.webp`: optimized restored background created with the built-in ImageGen tool, based on the supplied approved hero. The original generated PNG remains outside the repository. It is not a flattened website or a prerendered animation.

Final ImageGen prompt:

> Use case: precise-object-edit. Asset type: clean atmospheric website background. Edit the supplied approved mockup by removing ALL user interface and typography: logo, headline, copy, buttons, smartphone, chat, chart, workflow cards/connectors and bottom feature cards. Retain and reconstruct ONLY the bright white and ice-blue modern dental clinic background from the right side, with its blue dental chair in the lower-right, cabinets and window and plant. Preserve the camera perspective, soft light, low contrast and exact overall composition; left 55 percent is softly white/ice-blue empty space for DOM text and phone overlay. Wide landscape same ratio as reference. No text, no phone, no diagrams, no icons, no cards, no logos. This is background restoration only, not a new design.
