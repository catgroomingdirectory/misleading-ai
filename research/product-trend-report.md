# Amazon Influencer — Product Trend Report

**Date:** 2026-08-01
**Companion to:** `amazon-influencer-product-scoring.md`
**Status:** Research only.

---

## 0. Read this before the list

**Per-product earnings data does not exist publicly.** Amazon does not publish what any
ASIN pays a creator. Creators report income in aggregate ("$4k/mo across 1,100 videos"),
never per product. Any list claiming "these exact products earn the most" is inferred, and
anyone selling you one is selling inference.

So this report is built from three layers, and I've kept them separate so you can see which
parts to trust:

| Layer | Confidence | What it is |
| --- | --- | --- |
| **Commission math** | **High — deterministic** | `price × rate`. Arithmetic, not opinion. This drives the ranking. |
| **Category demand/growth** | Medium | Multiple independent 2026 category reports agreeing. |
| **"What works on camera"** | Medium-low | Creator anecdote + video-conversion studies. Directionally sound, not measured. |
| **Specific earnings claims** | **Low — do not build on** | Marketing blogs. Flagged inline. |

**The ranking below is driven by the high-confidence layer.** Where I'm relying on softer
evidence, I say so.

---

## 1. The finding that outranks the entire list

**Creator Connections campaigns require a 10% minimum commission**, with brands committing
a **$5,000 minimum campaign budget**. Amazon recommends brands offer *more* than 10% to
attract creators.

Compare against base category rates, which run **1%–4.5%** for everything except Luxury
Beauty and Amazon Games.

**A CC-enrolled product pays 2–10× the base rate of the same product.** That single fact
dominates every category-selection decision below it:

| Scenario | Price | Rate | Commission/sale |
| --- | --- | --- | --- |
| $50 kitchen gadget, base Home rate | $50 | 3% | **$1.50** |
| Same $50 gadget, CC campaign at 10% | $50 | 10% | **$5.00** |
| Same $50 gadget, CC campaign at 15% | $50 | 15% | **$7.50** |
| $30 supplement, base Health rate | $30 | 1% | **$0.30** |

The $50 gadget under CC beats a $150 product at base Home rate. **"Does this ASIN have a
live CC campaign" is a stronger filter than any category, price band, or trend in this
report.**

Practical consequence: **filter for CC availability first, then apply the list below to
break ties.** A mediocre product with a 15% CC campaign outearns a perfect product at 3%.

One caveat, reported and worth verifying against your own experience: *most active
influencers reportedly earn the bulk of income from flat-fee brand deals ($100–$5,000 per
post) rather than commission*. If true for you, product selection matters less than
relationship-building — but flat-fee deals follow from having a catalog, so the sequencing
doesn't change.

---

## 2. Commission math by category

Base rates (US, approximate — **verify against your live Associates fee schedule**):

| Category | Rate | $50 item | $100 item | $200 item |
| --- | --- | --- | --- | --- |
| Amazon Games | ~20% | $10.00 | $20.00 | $40.00 |
| Luxury Beauty | ~9–10% ⚠️ | $4.75 | $9.50 | $19.00 |
| **Kitchen** | **~4.5%** | $2.25 | $4.50 | $9.00 |
| **Automotive** | **~4.5%** | $2.25 | $4.50 | $9.00 |
| Physical books | ~4.5% | $2.25 | — | — |
| Apparel / Jewelry | ~4% | $2.00 | $4.00 | $8.00 |
| Toys / Home / Beauty / Pets / Sports | ~3% | $1.50 | $3.00 | $6.00 |
| PC components | ~2.5% | $1.25 | $2.50 | $5.00 |
| Televisions | ~2% | $1.00 | $2.00 | $4.00 |
| Grocery / Health / Personal Care | ~1% | $0.50 | $1.00 | $2.00 |
| Gift cards, alcohol, vehicles | 0% | — | — | — |

⚠️ **Sources conflict on Luxury Beauty** — some 2026 reports say 10%, others say it dropped
to 9%. Minor for ranking, but don't quote it as fact.

⚠️ **Onsite video rates reportedly run below these published affiliate rates** — sometimes
half. These figures are therefore an **upper bound**. Your real numbers are in your earnings
report, and pulling them is step 1 of §5.

---

## 3. The ranked list

Ranked on: commission math (high confidence) × demonstrability × 2026 demand growth ÷
saturation.

### Tier A — best rate-to-effort ratio

**1. Kitchen gadgets & small appliances, $50–200**
- **~4.5% — tied for the highest non-luxury rate.** $100 item = $4.50/sale.
- Home & Kitchen is a confirmed 2026 growth category; "small upgrades are an easy yes."
- Best-in-class demonstrability: visible mechanism, before/after, one-take 90-second demos.
- Deep catalogs — film a whole brand line in one session (criterion #9 in the scoring doc).
- ⚠️ Popular, so check carousel video counts before committing.

**2. Automotive accessories & car-care tools, $30–150**
- **~4.5% — same top rate, materially less influencer saturation.**
- Highly demonstrable: install, before/after, "does it actually fit."
- "Car owners" cited as a durable use-case niche.
- Male-skewed niches are less crowded than beauty/kitchen — the rate is high *and* the
  video gap is wider. **Best combined score in this report.**

**3. Pet problem-solvers — grooming tools, cleanup, travel gear, $25–120**
- Only ~3%, but strongest cited growth in 2026: owners keep paying for comfort, health, and
  convenience even when discretionary spending tightens.
- Grooming tools are exceptionally demonstrable — real before/after on camera.
- 📌 **Note:** this repo lives under the `catgroomingdirectory` org. If there's existing
  cat/pet-grooming domain knowledge or audience here, **this tier is a structural advantage
  and should probably be rank 1 for you personally.** Credible on-camera expertise plus
  owned product beats a half-point of commission rate.

### Tier B — strong but with a catch

**4. Luxury Beauty, $40–150**
- **Highest realistic rate at ~9–10%** — a $100 item pays ~$9.50, double Tier A.
- ❗ **The catch: beauty is "the most active gifting category in 2026 by a wide margin."**
  Maximum creator competition, so the video-gap criterion collapses. High rate, crowded room.
- Worth it *only* if you can find CC campaigns or genuinely underserved listings.
- Ignore the circulating "+2% bonus above $50k quarterly" claim — unverified marketing copy.

**5. Tools & Home Improvement — hand tools, lighting, $30–200**
- ~3%, but cited 2026 growth subcategory, very demonstrable, low creator saturation.
- Same structural advantage as automotive: the gap is wide because fewer creators film here.

**6. Home office equipment, $40–250**
- Confirmed durable post-COVID growth; remote work is structural, not a fad.
- Decent price points; moderately demonstrable (ergonomics, cable management, setup).

**7. Outdoor & camping — portable cookware, lights, hammocks, $25–150**
- ~3% (Sports & Outdoors), explicitly cited as **low competition.**
- Very demonstrable — setup and field use are inherently visual.
- ⚠️ Seasonal. Film in spring, earn through summer.

**8. Beauty tech / skincare devices — LED masks, facial rollers, $30–200**
- Sits in Beauty (~3%) not Luxury Beauty (~9%) — **check which node the ASIN is actually in
  before filming, the rate difference is 3×.**
- Strong demonstrability and growth; less saturated than cosmetics.

### Tier D — avoid

| Category | Why |
| --- | --- |
| **Supplements / vitamins / grocery** | **~1%.** A $30 supplement pays **$0.30/sale.** Invisible benefit, nothing to demo, consumable. The single worst rate-to-effort trade in the program, and the most common beginner trap. |
| **Televisions** | 2%, expensive to obtain, saturated with brand video. |
| **PC components** | 2.5%, technical audience, heavy existing coverage. |
| **Phone cases, tumblers, generic commodity** | Cheap × low rate × maximum saturation. |
| **Gift cards, alcohol, vehicles** | 0%. Never. |

---

## 4. Cross-cutting patterns

**Price floor is real.** Below ~$25, commission is noise at any rate under 4.5%. A $15 item
at 3% pays $0.45 — you cannot film your way out of that arithmetic.

**Rate × demonstrability beats rate alone.** Luxury Beauty has triple Kitchen's rate but a
fraction of the video gap. Automotive has Kitchen's rate with less competition. **The best
opportunities are where a good rate meets a category creators find boring.**

**Videos measurably move conversion** — product pages with video see ~+24% sales, with
Amazon internal data cited as high as +80%. This is *why* the program pays at all, and why
listings with zero videos are genuinely underserved rather than just unpopular.

**Demo format matters more than production value.** Make the case in 20–30 seconds, one
clear benefit, solution shown in action. Longer authentic videos reportedly outperform
short polished ones in this program specifically.

**Recurring-demand + problem-solving is the durable combination.** Pet and Health & Household
lead growth because they're purchases people don't cut. Problem-solvers demo well *and*
sell steadily — the overlap is where Tier A lives.

---

## 5. What to actually do with this

1. **Pull your realized per-category rate from your earnings report.** Every number in §2 is
   an upper bound until you do. This is the highest-value hour in the whole project.
2. **Sweep Creator Connections for campaigns matching your existing videos.** §1 — 10%
   minimum beats everything here. Revenue with zero filming.
3. **Pick two Tier A categories** — realistically automotive/tools plus pet grooming if the
   `catgroomingdirectory` connection is real domain knowledge. Two, not seven; catalog depth
   compounds and scattering doesn't.
4. **Check carousel video counts before filming anything.** The rate advantage is worthless
   on a listing with 40 existing videos. This stays the binding constraint (§3 of the
   scoring doc).
5. **Film products you already own first.** Zero acquisition cost, immediate volume, and it
   generates the earnings data that replaces every estimate in this document with a fact.

**The honest summary:** the categories above are a reasonable prior. Thirty videos of your
own earnings data will beat this entire report, and generating it costs less than the
research to avoid it.

---

## Sources

- [Amazon Creator Connections Explained (for Sellers) — Archer Affiliates](https://www.archeraffiliates.com/post/amazon-creator-connections)
- [How to Launch a High-Converting Amazon Creator Connections Campaign — BellaVix](https://www.bellavix.com/how-to-launch-a-high-converting-amazon-creator-connections-campaign/)
- [Amazon Creator Connections: A Complete Guide For Influencers — Creator Hero](https://www.creator-hero.com/blog/amazon-creator-connections-a-complete-guide-for-influencers)
- [Amazon Influencer Commission Rates — Referazon](https://www.referazon.com/amazon-influencer-commission-rates/)
- [Amazon Influencer Program Guide 2026 — AMZScout](https://amzscout.net/blog/amazon-influencer-program/)
- [Amazon Influencer Program 2026: Requirements & Pay — Hubfluence](https://www.hubfluence.io/amazon-influencer-program)
- [Amazon Associates Strategy for Brands: 2026 Guide — Hamster Garage](https://www.hamstergarage.com/article/amazon-associates-strategy-for-brands-guide)
- [Amazon Influencer Earnings in 2026 — BizToolkit](https://www.biztoolkit.co/post/how-much-do-amazon-influencers-make-in-2026)
- [Which Amazon Product Categories Are Growing in 2026? — Darkroom](https://www.darkroomagency.com/observatory/which-amazon-product-categories-are-growing-in-2026)
- [Fastest-Growing Amazon Categories to Watch in 2026 — SupplyKick](https://www.supplykick.com/blog/amazon-category-trends)
- [5 Fastest Growing Categories on Amazon in 2026 — Prime Retail Solution](https://primeretailsolution.com/marketplace-trends-5-fastest-growing-categories-on-amazon-in-2026/)
- [Amazon trends report 2026 — Whop](https://whop.com/blog/amazon-trends/)
- [Top niches for Amazon dropshipping in 2026 — Printify](https://printify.com/blog/top-niches-for-amazon-dropshipping/)
- [10 Profitable Amazon Niches & Best-Selling Products (2026) — The Niche Guru](https://thenicheguru.com/niche-investigation/amazon-niche-research/)
- [How to Create Amazon Product Videos That Actually Convert in 2026 — Seller Labs](https://www.sellerlabs.com/blog/amazon-product-video-strategy-2026/)
- [8 Steps to Create an Amazon Product Video that Converts — ZonGuru](https://www.zonguru.com/blog/how-to-create-an-amazon-product-video-that-converts)
- [Beauty Creator Authority Strategy: The 2026 Playbook — Everything PR](https://everything-pr.com/beauty-creator-authority-strategy/)
- [Amazon Influencer Program Statistics 2026 — Amra & Elma](https://www.amraandelma.com/amazon-influencer-program-statistics/) (low confidence; marketing content)
