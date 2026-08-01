# Courtney Delaney — Upwork AI Portfolio Deck

Rebuilt version of the Upwork portfolio deck, repositioned around **helping people
with AI** rather than listing services.

- `deck.html` + `deck.css` + `mock.css` + `fonts.css` — the source
- `shots/` — real screenshots of the live sites (captured from source, see below)
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
| 1 | Cover | Sharper subhead, and the laptop/phone now show **real screenshots** (Cautellus desktop, Moontuck mobile) |
| 2 | **The real problem** | **New** — six owner-POV pain points before any pitch |
| 3 | What I do | Kept, plus three differentiator cards |
| 4 | How I work | Kept, added a 4th step: **Hand off** |
| 5 | **Where AI actually pays off** | **New** — six concrete AI use cases |
| 6 | Digital back office | Kept, rebuilt mockup |
| 7 | Automation development | Kept, rebuilt mockup |
| 8 | **Tools I build with** | **New** — the stack, also an Upwork keyword magnet |
| 9–11 | Case studies | Kept, each with a **"Where AI came in"** note and a **real browser-framed screenshot** of the live site |
| 12 | More live work | **Real screenshots** of Moontuck, Cautellus, and The Digital Back Office |
| 13 | **Three ways to work together** | **New** — Audit / Build Sprint / Systems Partner |
| 14 | **The questions worth asking** | **New** — data, failure modes, lock-in, jobs |
| 15 | **Close** | **New** — 3-step next action instead of a soft sign-off |

## About the screenshots

Every case-study screenshot is the genuine site, not a mockup. The live domains are
not reachable from the build environment, so each site was cloned from its own repo,
run locally with `next dev`, and captured with Playwright at 1440–1600px wide
(Moontuck's phone view at 390px). The Next.js dev badge is hidden via injected CSS;
nothing else about the pages is altered.

| Shot | Source repo | Route |
|---|---|---|
| `ap-home`, `ap-svc` | `american-puppy-` | `/`, `/services` |
| `cgd-home`, `cgd-cost` | `cat-grooming-directory` | `/cat-grooming`, `/cost` |
| `hml-home` | `holdmyletter` | `/` |
| `mt-home`, `mt-mob` | `moontuck` | `/` |
| `cau-home`, `cau-mob` | `cautellus` | `/` |
| `dbo-home` | `the-digital-back-office` | `/` |

To refresh a shot: run that repo's `npm run dev`, then re-run `capture.mjs` against
the port. Cat Grooming Directory's homepage needs `POSTGRES_URL` to render (it queries
Neon for advertisers), which is why `/cat-grooming` — the groomer-search page — is used
instead; it's the better portfolio shot regardless.

Two things worth calling out:

- **Slide 14 is the differentiator.** Answering "where does my data go" and "what
  happens when it's wrong" up front is what separates an AI consultant from
  someone who has used ChatGPT. Most competing profiles don't do it.
- **Slides 6 and 7 are still labelled "Illustrative system concept".** They're the
  only non-real screens left, because client dashboards and automation canvases aren't
  public URLs. Keeping the label next to nine real screenshots reads as integrity, not
  as a gap — but if a client ever green-lights a redacted dashboard shot, those two
  slides are where it goes.

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

The one thing this deck still can't do is prove results. The screenshots prove the
work exists and shipped; they don't prove it worked. If you can get even a single
number or client sentence — traffic, bookings, hours saved, a testimonial — it belongs
on the case-study slides, and it will outperform every design choice in here.

### One bug spotted while capturing

Cautellus renders two navigation clusters at desktop widths — the full nav plus a
second `Shop / Subscribe / ☰` group — at every width tested from 1200px to 1600px.
It's visible in `shots/cau-home.jpg`. Worth a look if it isn't intentional.

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
