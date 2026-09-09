# QA / Visual Review Checklist

## Visual fidelity
- [ ] Logo sits top-left; no navigation menu exists.
- [ ] Headline line breaks match the approved mockup.
- [ ] `Pasien Berkomunikasi` is dark navy.
- [ ] `Layaknya WA` and `Dengan Admin` are bright blue.
- [ ] The page remains light, airy, and uncluttered.
- [ ] Smartphone is slightly tilted and vertically proportioned like the approved phone reference.
- [ ] Smartphone does not cover the headline.
- [ ] Workflow does not cover the phone.
- [ ] Chart does not collide with the workflow.
- [ ] Workflow is stepped downward, not flat.
- [ ] Business chart is the smaller approved size.
- [ ] Revenue line is green.
- [ ] Loss line is red.
- [ ] Dental chair/background does not look warped or broken.
- [ ] Three bottom cards match hierarchy and spacing from the mockup.

## Copy
- [ ] Eyebrow exact.
- [ ] Headline exact.
- [ ] Description exact.
- [ ] Contact Us exact.
- [ ] Email exact and clickable.
- [ ] Chat WhatsApp exact.
- [ ] WhatsApp number points to `https://wa.me/628155551600`.
- [ ] All phone chat text matches `content.json`.
- [ ] No QR code.
- [ ] No old top navigation.
- [ ] No “Coba Demo via WhatsApp”.

## Animation sync
- [ ] Phone settles naturally; no bounce.
- [ ] Patient question corresponds to `Pesan Masuk`.
- [ ] Typing/processing corresponds to `Memahami Kebutuhan`.
- [ ] Bot schedule response corresponds to `Cek Jadwal`.
- [ ] Booking confirmation corresponds to final success node.
- [ ] Chart begins only after booking confirmation.
- [ ] Entire sequence finishes around 6 seconds.
- [ ] Final state remains readable and stable.
- [ ] No endless animation loop.
- [ ] Reduced-motion mode shows final static state.

## Functional
- [ ] `mailto:sales@datautomasi.com` works.
- [ ] WhatsApp CTA uses `https://wa.me/628155551600`.
- [ ] External WhatsApp navigation does not replace unsaved app state if repo has one.
- [ ] Buttons have visible focus state.
- [ ] Phone/UI text remains selectable/accessibility-friendly where practical.
- [ ] SVG chart has accessible title/description or is marked decorative if surrounding text explains it.

## Responsive
- [ ] 1440×900
- [ ] 1280×800
- [ ] 1024×768
- [ ] 768×1024
- [ ] 430×932
- [ ] 390×844
- [ ] No horizontal scroll at any breakpoint.

## Performance
- [ ] Hero background optimized as WebP/AVIF where possible.
- [ ] Avoid large animation libraries if not already in repo.
- [ ] No autoplay video.
- [ ] Animations use transform/opacity/SVG stroke where possible.
- [ ] Avoid layout-thrashing animation.
