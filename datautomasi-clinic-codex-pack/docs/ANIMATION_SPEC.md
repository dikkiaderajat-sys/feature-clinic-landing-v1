# Animation Specification — Hero Sequence

## Principle
Animation must explain the automation, not decorate the page.

Only these three systems animate:
1. Smartphone / WhatsApp conversation.
2. Stepped workflow.
3. Potensi Bisnis Klinik chart.

Everything else stays calm.

## Overall duration
Target: **6.0 seconds** from first phone motion to completed chart.

Do not continuously loop.

After 6 seconds, leave the page in its final readable state.

## Recommended timeline

| Time | Smartphone | Workflow | Chart |
|---|---|---|---|
| 0.00–0.10 | Initial state | Inactive | Card visible, lines hidden |
| 0.10–0.70 | Phone settles into final tilted position | Inactive | No motion |
| 0.70–1.25 | Patient question bubble appears | `Pesan Masuk` activates | No motion |
| 1.25–1.55 | Small 3-dot typing indicator | Connector pulse to node 2; `Memahami Kebutuhan` activates | No motion |
| 1.55–2.65 | Bot schedule reply appears | Understanding stays active; pulse continues toward schedule | No motion |
| 2.05–2.75 | Schedule reply remains readable | `Cek Jadwal` activates | No motion |
| 2.80–3.38 | Patient selection bubble appears | Connector toward final stage starts | No motion |
| 3.35–3.62 | Short typing indicator | Final connector pulse | No motion |
| 3.62–4.48 | Booking confirmation appears | `Booking Dikonfirmasi` activates with restrained success check | No motion |
| 4.55–5.90 | Phone remains final | All nodes final | Green and red curves draw left→right |
| 5.90–6.00 | Stable | Stable | Stable |

## Smartphone motion
### Phone entrance
- Keep the phone at the same final angle as the approved smartphone reference.
- Animate only a subtle settle:
  - opacity 0 → 1
  - translateY 10–14px → 0
  - scale 0.985 → 1
- Do **not** swing or bounce the phone.
- Final tilt should feel like the reference: slightly leaning, natural product mockup perspective.

### Chat bubbles
Do not type every character letter-by-letter. That will feel slow and artificial for this page.

Use:
- 180–260ms opacity/translate reveal for each bubble.
- 3-dot typing indicator between user and bot messages.
- Incoming bubble: very subtle move from left, ~8px.
- Outgoing bubble: very subtle move from right, ~8px.
- No bounce.

### Exact chat content
Use `content.json`. Do not rewrite or paraphrase it during implementation.

### Final screen
At the end of the sequence, all four chat messages remain visible.

## Workflow animation
Layout must be **stepped downward from left to right**.

Stage order:
1. Pesan Masuk
2. Memahami Kebutuhan
3. Cek Jadwal
4. Booking Dikonfirmasi

### Inactive state
- White translucent card.
- Blue/green icon visible.
- No constant glow.
- Connector line visible at low opacity.

### Activation state
For each node:
- opacity/brightness increase over ~180ms
- optional scale 1 → 1.025 → 1 over ~260ms
- soft shadow increase then settle
- no bounce

### Connector pulse
Use SVG path or pseudo-element:
- low-opacity base line remains visible
- bright blue pulse travels along the connector to the next card
- pulse duration ~350–450ms
- use `stroke-dasharray` / `stroke-dashoffset` or CSS motion-path

### Final success
The final green check can use a restrained 0.96 → 1.04 → 1 scale over ~260ms.
No large glow ring.

## Chart animation
The chart card is visible from first paint. Only the lines animate after confirmation.

Use SVG paths:
- green: Potential Revenue
- red: Potential Loss

At 4.55s:
- start green path draw over ~1.20–1.30s
- start red path draw ~100–150ms after green, over ~1.15–1.25s
- use `stroke-dasharray` and `stroke-dashoffset`
- arrowheads become visible near completion or are part of the path

No numeric claims.
No Y-axis.
No animated counters.

## Reduced motion
For `prefers-reduced-motion: reduce`:
- skip all entrances, typing dots, pulses, and path drawing
- show final phone messages
- show all workflow nodes in final state
- show both chart lines fully drawn

## Replay behavior
Default: no automatic loop.
Do not restart when the user scrolls a few pixels.
A route remount or full page reload may replay once.
