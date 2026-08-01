# Courtney Delaney — Upwork AI Portfolio Deck

Rebuilt version of the Upwork portfolio deck, repositioned around **helping people
with AI** rather than listing services.

- `deck.html` + `deck.css` + `mock.css` + `fonts.css` — the source
- `Courtney_Delaney_Upwork_AI_Portfolio.pdf` — the export to upload to Upwork
  (15 pages, 16:9, live site links clickable on pages 9–12)

## What changed and why

The original deck was 10 slides and visually strong, but it read as a menu of
services. A buyer scrolling Upwork couldn't tell what problem you solve, what AI
specifically does for them, what it costs, or what to do next. The rebuild keeps
the visual identity — dark palette, gold eyebrows, Playfair headlines, the two
system mockups — and adds the missing argument.

| # | Slide | Status |
|---|---|---|
| 1 | Cover | Kept, sharper subhead naming the five time-sinks |
| 2 | **The real problem** | **New** — six owner-POV pain points before any pitch |
| 3 | What I do | Kept, plus three differentiator cards |
| 4 | How I work | Kept, added a 4th step: **Hand off** |
| 5 | **Where AI actually pays off** | **New** — six concrete AI use cases |
| 6 | Digital back office | Kept, rebuilt mockup |
| 7 | Automation development | Kept, rebuilt mockup |
| 8 | **Tools I build with** | **New** — the stack, also an Upwork keyword magnet |
| 9–11 | Case studies | Kept, each with a **"Where AI came in"** note and an at-a-glance panel |
| 12 | More live work | Kept — Cautellus leads as an AI product |
| 13 | **Three ways to work together** | **New** — Audit / Build Sprint / Systems Partner |
| 14 | **The questions worth asking** | **New** — data, failure modes, lock-in, jobs |
| 15 | **Close** | **New** — 3-step next action instead of a soft sign-off |

Two things worth calling out:

- **Slide 14 is the differentiator.** Answering "where does my data go" and "what
  happens when it's wrong" up front is what separates an AI consultant from
  someone who has used ChatGPT. Most competing profiles don't do it.
- **The concept-mockup slides moved behind the proof.** They're still labelled
  "Illustrative system concept" — that honesty is an asset, but it reads better
  after the framing than as the first thing a buyer sees.

## Before you upload — three things to check

1. **Slide 8, the tool list.** Written from what the deck and your live sites
   imply. Delete anything you don't actually work in — a client will ask, and one
   bluffed tool costs more than five real ones gain.
2. **Slides 9–11, "Where AI came in."** Written from what the original deck
   claimed plus what the sites suggest. Confirm each is true of how you actually
   built them, and reword any that aren't.
3. **Slide 13, pricing.** Deliberately says "fixed fee" / "scoped per project"
   with no numbers, so it's safe to upload as-is. Adding real starting prices
   will convert better once you're comfortable naming them.

The one thing this deck still can't do is prove results. If you can get even a
single number or client sentence — traffic, bookings, hours saved, a testimonial —
it belongs on the case-study slides, and it will outperform every design choice
in here.

## Rebuilding the PDF

```bash
npm i playwright
node render.mjs   # see the render script in this README's history, or:
```

```js
import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
await p.goto('file:///absolute/path/to/deck.html', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.pdf({ path: 'Courtney_Delaney_Upwork_AI_Portfolio.pdf',
              width: '1280px', height: '720px', printBackground: true });
await b.close();
```

Fonts (Playfair Display, Inter) are embedded as base64 in `fonts.css`, so the
deck renders identically anywhere with no network access.
