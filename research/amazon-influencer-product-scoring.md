# Amazon Influencer Program — Product Selection Research

**Date:** 2026-08-01
**Status:** Research only. No code, no scrapers, no pipeline built.
**Scope:** How to source data for a "best products to film" score, whether Crawl4AI is a
safe way to get that data, and what Trevin Peterson's public method actually is.

---

## 0. TL;DR

1. **Crawl4AI is safe for *your* privacy but not for *your Amazon account*.** Self-hosted
   Crawl4AI sends nothing to a third party — the risk is entirely on Amazon's side, where
   automated collection violates their Conditions of Use and Associates/Influencer
   Operating Agreement. Enforcement is by IP block first, account action second.
   Use it for *public non-Amazon* pages; use licensed data for Amazon itself.
2. **The single highest-value data point you want — "how many influencer videos already
   exist on this listing" — is not in any Amazon API.** It only exists in the rendered
   product page carousel. The two tools that already extract it legally-enough for
   day-to-day use are **Oink for Influencers** and **Viral Vue** (both Chrome extensions
   that read the page *you* are already viewing, in *your* browser session).
3. **Trevin Peterson's method is volume + Creator Connections, not clever product
   research.** He and his family reportedly filmed ~10,000 videos. His differentiator
   is auto-accepting Creator Connections campaigns against videos he *already* made.
   He is also the founder of Viral Vue, so treat his tool recommendations as vendor
   content.
4. **Build the score, buy the data.** A weighted score is straightforward; the hard part
   is inputs. Recommended stack below costs ~$30–80/mo and carries no ToS risk.

---

## 1. Answering the three questions directly

### 1.1 "Can we use Crawl4AI without getting my data/info exposed?"

Two separate risks are being conflated. Separate them:

**Risk A — Crawl4AI itself leaking your data.** Low, and controllable.

| Mode | Where your data goes |
| --- | --- |
| Self-hosted OSS (`pip install crawl4ai`, local Docker) | Nowhere. Crawled content stays on your machine. |
| Crawl4AI **cloud** service | They log input URLs/keywords, config, timestamps, credits, status, plus request method, path, status code, latency, **IP address**, user agent, request ID. API keys stored hashed. Results retained ~30 days. Hosted EU (Hetzner) + US (AWS). |
| Any mode + **LLM-based extraction** | Page content is shipped to whatever model provider you configured, under *their* terms. A local model keeps it on-box. |

→ If privacy is the concern: **self-host, and use a local model (or no LLM extraction) for
parsing.** That closes Risk A entirely.

**Risk B — Amazon tying the scraping to you.** This is the real one, and Crawl4AI does
nothing to reduce it.

- Amazon's Conditions of Use prohibit "data mining, robots, or similar data gathering and
  extraction tools." The Associates/Influencer Operating Agreement separately prohibits
  automated access to the site. Amazon reserves the right to refuse service and terminate
  accounts.
- Practical enforcement ladder: CAPTCHA → soft block → IP ban → (rarely, and mostly for
  high-volume or logged-in scraping) account action. The account-level risk is small for
  low-volume anonymous fetching and material if you scrape **while authenticated as your
  influencer account**, because then the activity is directly attributed.
- Amazon is aggressive about datacenter IPs. Verified empirically during this research:
  plain HTTPS GETs to `amazon.com/robots.txt`, `amazon.com/shop/trevinpeterson`, and even
  `affiliate-program.amazon.com/creatorsapi/docs/...` all returned **HTTP 403** from a
  cloud IP. A residential/datacenter proxy pool is what "solves" this — which is also
  precisely the step that turns "casually reading a page" into "deliberate evasion."

**Bottom line:** Crawl4AI self-hosted answers the privacy question. It does not make
scraping Amazon compliant. Concrete rules:

- ✅ Never run automated collection from a browser profile or IP logged into your
  influencer/Associates account.
- ✅ Use Crawl4AI for non-Amazon public sources (YouTube search results pages, TikTok
  discovery, brand sites, review roundups, Reddit) — that's where it earns its keep.
- ❌ Don't build a high-volume Amazon crawler. It's ToS-violating, it's the one thing that
  can cost you the account the whole business depends on, and licensed data is cheap.
- ⚠️ Residential proxy rotation + fingerprint spoofing against Amazon = evasion. Out of
  scope here.

### 1.2 "Can we see what Trevin Peterson has made videos on?"

**Yes, manually.** His storefront is public: `https://www.amazon.com/shop/trevinpeterson`
("Peterson Products"). Videos are browsable there in a normal browser. (Automated fetch
returned 403 from this environment — see above.)

**But it's low-value competitive intel, and here's why.** His public method is not
selective:

| What he actually does | Source |
| --- | --- |
| Extreme volume — reportedly ~10,000 videos filmed as a family | Niche Pursuits profile |
| Longer, authentic videos outperform short low-effort ones | His own channel |
| Get free product from brands, negotiate increased commissions | His own channel |
| Cross-post the same footage to YouTube | His own channel |
| **Creator Connections auto-acceptance against the existing video library** — he cites going from $40 → $900/mo in CC commissions in 30 days *without filming anything new* | His own channel |
| Uses/sells **Viral Vue** for product research | He founded it |

Copying his *catalog* means copying a saturated 10,000-ASIN set where he already ranks.
Copying his *system* — volume, then monetize the back catalog via Creator Connections —
is the transferable part. Also note the conflict of interest: he is the founder of Viral
Vue, so his tooling advice is vendor content, not neutral review.

A better competitive-intel target than one person's storefront: for any ASIN you're
considering, look at *who* has videos on it and whether they're brand-produced or
influencer-produced. Oink surfaces exactly this split (see §3).

### 1.3 "Can we search for products for these rankings?"

Yes, but **not from a single source.** Nine criteria, four different data origins. See §2.

---

## 2. Where each scoring input actually comes from

The user's nine criteria, mapped to real, obtainable data:

| # | Criterion | Obtainable? | Best source | Notes |
| --- | --- | --- | --- | --- |
| 1 | Strong sales rank | ✅ Easy | Keepa API (rank + 90/180-day history), Jungle Scout, SellerAmp | Rank *history* matters more than a snapshot — you want durable, not a one-week spike |
| 2 | Price high enough for worthwhile commission | ✅ Easy | Keepa / Creators API | Combine with #3; price alone is meaningless |
| 3 | Category commission rate | ✅ Easy | Static table from Amazon Associates fee schedule; category comes from the ASIN's browse node | Rates below — verify against your live Associates dashboard |
| 4 | Good rating, not thousands of established reviews | ✅ Easy | Keepa / Creators API (rating + review count) | This is the "new-ish but validated" filter — the single best proxy for opportunity |
| 5 | **Few existing influencer videos** | ⚠️ **Hard — no API** | Rendered product page carousel only. Oink's "Content Gap Analyzer" / upper-carousel video count (brand vs. influencer) | **This is the bottleneck of the whole project.** See §3 |
| 6 | Easy to demonstrate | ❌ Not queryable | Manual, or LLM classification over title + bullets + category | Modelable — see §4.2 |
| 7 | Already own / cheap to obtain | ❌ Personal data | Your own inventory list + Amazon order history export | Join locally on ASIN |
| 8 | Stable inventory | ✅ Medium | Keepa out-of-stock % history, Buy Box ownership history | Keepa tracks OOS over time — a genuinely differentiating input |
| 9 | Multiple related products to review afterward | ✅ Medium | Same brand / same browse node counts; "brand has N ASINs above rank X" | Cheap to compute once you have a catalog slice |

**Key structural insight:** criteria 1, 2, 3, 4, 8, 9 are all satisfiable from **Keepa +
a static commission table**, with zero scraping. Criteria 5 is the only one requiring
page-level data. Criterion 6 is an LLM problem. Criterion 7 is your own spreadsheet.

So the pipeline is: **Keepa filters 10,000 ASINs → 200 candidates → Oink/manual checks
video count on those 200 → you film.** Never scrape the wide funnel; only inspect the
narrow one, in your own browser.

### 2.1 Commission rates (verify before relying on these)

Figures gathered from third-party 2026 summaries — **confirm against your own Associates
fee schedule, they change and vary by marketplace:**

| Rate | Categories (US, approximate) |
| --- | --- |
| ~10% | Luxury Beauty, Amazon Coins |
| ~4.5% | Physical books, Kitchen, Automotive |
| ~4% | Apparel, Jewelry, Amazon devices |
| ~3% | Toys, Home, Beauty, Pets, Sports |
| ~2.5% | PC components |
| ~2% | Televisions |
| ~1% | Grocery, Health & Personal Care |
| 0% | Gift cards, alcohol, vehicles |

**Caveats that matter more than the table:**
- **Onsite shoppable-video commissions often run materially below the standard associate
  rates** for the same category — sometimes half or less. Do not price your effort off
  the affiliate table. Pull your *actual* realized rate per category from your earnings
  report and use that instead. This single correction changes which categories are worth
  filming.
- Claims circulating about a "2026 tiered performance bonus" (e.g. +2% stacked on Luxury
  Beauty above $50k quarterly) appear only in low-quality marketing blogs. **Treat as
  unverified.** Don't build strategy on it.
- The real bonus lever is **Creator Connections** (§5), not category rate.

---

## 3. The video-count problem (criterion #5)

This is worth calling out separately because it determines the whole architecture.

**No Amazon API exposes how many influencer videos are on a listing.** Not PA-API, not
the new Creators API, not Keepa, not Jungle Scout. It exists only in the rendered product
page's video carousel.

Three ways to get it, in descending order of sanity:

**(a) Chrome extensions that read the page you're already on — recommended.**
These run in *your* browser, in *your* session, on pages *you* navigate to. That is
categorically different from a headless crawler hitting Amazon from a datacenter, and it's
the normal, widely-used path in this niche.

| Tool | Relevant capability | Price |
| --- | --- | --- |
| **Oink for Influencers** | Data table of **upper-carousel video count, split brand vs. influencer, sorted by units sold/month**. "Content Gap Analyzer" finds top-selling products *without* videos. Also: broken-video detection on your storefront, commission-rate manager, profit overlay, CC auto-accept, copyright compliance audit. | ~$29.99/mo Pro |
| **Viral Vue** | Product analytics, low-competition/high-demand discovery, campaign tracking, CC automation. Founded by Trevin Peterson. | Varies |

Consensus in comparisons: **Viral Vue leans product research; Oink leans Creator
Connections + storefront management.** For *this* project — the video-gap question — Oink's
Content Gap Analyzer is the closer fit. Both automate Creator Connections, which is where
the "extra bonuses" in the original question actually live.

**(b) Manual spot-check.** For a shortlist of ~200 ASINs from the Keepa funnel, opening
each and eyeballing the carousel is maybe 2–3 hours. Zero risk, zero cost, and honestly
fine for a first pass. Record the count in a sheet and you have training data for later.

**(c) Crawling it yourself.** Requires headless browser + proxy rotation against an actively
hostile anti-bot system, violates ToS, and puts the account at risk. Not recommended.
The economics don't work either: (a) costs $30/mo and already solved it.

---

## 4. Proposed scoring model

### 4.1 Formula

Score every ASIN 0–100. Multiplicative gates first (hard disqualifiers), then a weighted sum.

**Gates — drop the ASIN entirely if any fail:**
```
commission_rate  > 0                 # no gift cards, alcohol, vehicles
price            >= $25              # below this the per-sale commission is noise
rating           >= 4.0
in_stock_pct_90d >= 80%              # dead inventory = dead video
not restricted/gated/adult
```

**Weighted score (weights are a starting point — tune on your own earnings data):**

| Component | Weight | Definition |
| --- | --- | --- |
| **Expected commission per sale** | 25 | `price × realized_onsite_rate(category)`, normalized. Use *realized*, not the published table. |
| **Video gap** | 25 | Inverse of influencer video count on the listing. 0 videos = 100, 1–2 = 75, 3–5 = 40, 6–10 = 15, 10+ = 0. |
| **Demand** | 15 | Log-scaled inverse of BSR *within its category*. Cross-category BSR is not comparable — normalize inside the browse node. |
| **Review sweet spot** | 10 | Peak at ~50–500 reviews. Under 20 = unvalidated; over 5,000 = saturated, brand videos already everywhere. |
| **Rank stability** | 8 | Low variance in 180-day BSR history. Punishes one-hit spikes. |
| **Demonstrability** | 7 | See §4.2. |
| **Acquisition cost** | 5 | 100 if you own it; scaled by `price` otherwise; 100 if a brand will gift it. |
| **Catalog depth** | 5 | Count of sibling ASINs (same brand or node) that also pass the gates. Rewards filming a whole series in one sitting. |

Then apply a **Creator Connections multiplier**: `× (1 + cc_bonus_rate)` if the ASIN has
an active CC campaign. A 10% CC bonus on top of a 3% base rate is a >3× swing in earnings —
it dominates almost every other term in the model. **In practice, "does this ASIN have a
live CC campaign" may deserve to be a gate, not a modifier.**

### 4.2 Scoring "easy to demonstrate" (criterion 6)

Not queryable, but very modelable. Feed title + bullets + category to an LLM with a rubric:

- **High (80–100):** visible mechanism or before/after — kitchen gadgets, cleaning products,
  tools, organizers, pet grooming, beauty application, anything that *does something* on camera.
- **Medium (40–79):** wearables, apparel fit, electronics with a screen, furniture assembly.
- **Low (0–39):** supplements, consumables, plain commodity goods, anything whose value is
  invisible or takes weeks to manifest.

Also weight **filming time** — a 90-second demo you can shoot in one take beats a product
needing a week of use. At Trevin-style volume, throughput per hour of filming is the metric
that actually compounds.

### 4.3 What the model deliberately does not include

- **Follower count / your own reach.** Onsite video earnings come from Amazon's shoppers on
  the product page, not your audience. This is the whole point of the program, and the most
  common thing people get wrong.
- **Seasonality.** Worth adding later; needs 12-month Keepa history.

---

## 5. Creator Connections — the actual "extra bonus"

The original question asked about products paying "high commission and extra bonuses."
Category rate is the small lever; **Creator Connections is the large one.**

- Brands post campaigns with a **bonus commission stacked on top of the standard rate**,
  choosing eligible ASINs, rate, start/end dates, and a max budget.
- You browse and opt in — a bounty board. Requires an existing Influencer/Associates
  account; Creator Stars **Bronze** tier is the practical minimum, and higher tiers unlock
  premium campaigns.
- **Campaigns apply to videos you already published.** This is Trevin's cited unlock:
  $40 → $900/mo in CC commissions in 30 days with no new filming.
- Payment lands ~60 days after the end of the earning month — budget for the lag.

**Implication for the score:** the highest-ROI daily action isn't finding new products, it's
sweeping CC for campaigns matching your existing catalog. Both Oink and Viral Vue automate
acceptance (Oink Pro auto-accepts by commission-rate threshold). Commentary in the space
puts the cost of *not* automating this at 10–20% of commissions left on the table.

**Suggested sequencing:** automate CC over the existing library **first** (immediate revenue,
zero filming), then use the score to direct new filming.

---

## 6. Recommended data stack

| Layer | Choice | Why | Cost |
| --- | --- | --- | --- |
| Wide catalog filter (BSR, price, rating, reviews, OOS history, brand siblings) | **Keepa API** | Licensed, no ToS risk, deep history including OOS % and Buy Box. Token/min model, 60-min token expiry. | from ~€49/mo |
| Video counts + CC automation + storefront hygiene | **Oink for Influencers Pro** | Only practical source for influencer-vs-brand carousel counts; Content Gap Analyzer is exactly criterion #5. | ~$29.99/mo |
| Product metadata / links | **Amazon Creators API** | See §6.1 — the official path, replacing PA-API. | Free, gated |
| Non-Amazon research (YouTube/TikTok saturation, brand sites, Reddit) | **Crawl4AI, self-hosted, local LLM** | Legitimate scraping target, no ToS conflict, no data leaves your box. | Free |
| Scoring + storage | Local Python + SQLite/Postgres | Nine inputs, one table. Doesn't need to be more than this. | Free |

Total ~$80/mo, no account risk. Compare with: building a compliant-ish Amazon crawler =
residential proxies (~$100s/mo) + ongoing anti-bot maintenance + the risk of losing the
account. The build-vs-buy math is not close.

### 6.1 API note — PA-API is dead, use the Creators API

**Important timing change, verify current state before building:**

- **PA-API v5 was deprecated in 2026** (recommended migration ~April 30, full endpoint
  retirement reported ~May 15, 2026 — reports vary, some cite January 31). As of this
  writing (August 2026) it should be considered gone.
- Replacement: **Amazon Creators API** —
  `https://affiliate-program.amazon.com/creatorsapi/docs/en-us/introduction`
  (returned 403 to automated fetch from this environment; open it in a browser).
- Auth changed from AWS SigV4 to **OAuth 2.0** (Client ID + Client Secret + standard flow).
- Eligibility historically required **3 qualifying sales within 180 days** to get access,
  and ongoing sales volume to keep it — reports of ~10 qualifying sales in a trailing 30-day
  window, with keys revoked after 30 days below ~3 sales. Assume the Creators API carries
  similar gating and confirm in the dashboard.
- Either way, it **does not** expose full category trees, comprehensive listings, or video
  counts. It is a link/metadata API, not a research API. Keepa remains necessary.

---

## 7. Legal / ToS summary

| Activity | Assessment |
| --- | --- |
| Self-hosted Crawl4AI on non-Amazon public sites | Fine. Respect robots.txt and rate limits. |
| Crawl4AI **cloud** on anything | Your URLs, IP, and UA are logged by a third party, ~30-day retention, EU/US hosting. Avoid if privacy is the concern. |
| LLM extraction via a hosted provider | Page content goes to that provider under their terms. Use a local model if that matters. |
| Buying data from Keepa / Jungle Scout / Rainforest / Bright Data | Standard, licensed, low risk. Cost is the tradeoff. |
| Chrome extension reading pages you're browsing | Normal for this niche. You're a logged-in human viewing pages. |
| Headless crawling Amazon at volume | Violates Conditions of Use + Associates Operating Agreement. IP blocks are near-certain; account action is possible. |
| Same, **while authenticated as your influencer account** | Worst case. Directly attributable. Don't. |
| Proxy rotation + fingerprint spoofing vs. Amazon | Deliberate evasion. Not covered here. |

Note: US case law on scraping *public* data (hiQ v. LinkedIn line) limits **CFAA** exposure
but does **not** override a site's contractual terms or its right to terminate your account.
For someone whose income depends on an Amazon account, the contract risk is the one that
matters, not the criminal-statute risk.

---

## 8. Suggested next steps

1. **Pull your own earnings report** and compute realized onsite commission rate per
   category. Everything in §4.1 depends on this and nothing else can substitute for it.
2. **Turn on Creator Connections automation** over the existing video library. Fastest
   revenue, no filming, no research.
3. **Buy one month of Keepa** and export a candidate set using the §4.1 gates.
4. **Manually check carousel video counts on the top 200.** Costs an afternoon, produces
   the labeled dataset that tells you whether the video-gap weight of 25 is right.
5. **Then** decide whether Oink is worth automating step 4 — by then you'll know the answer
   from real data instead of guessing.
6. Build the scorer only after steps 1–4. Nine weighted inputs is a day of work; sourcing
   them correctly is the project.

---

## Sources

- [Amazon Influencer Program Guide 2026 — AMZScout](https://amzscout.net/blog/amazon-influencer-program/)
- [Amazon Influencer Commission Rates — Referazon](https://www.referazon.com/amazon-influencer-commission-rates/)
- [Amazon Influencer Program 2026: Requirements & Pay — Hubfluence](https://www.hubfluence.io/amazon-influencer-program)
- [Amazon Influencer Program: Requirements, Rules, and Pay — CreatorFlow](https://creatorflow.so/blog/amazon-influencer-program-requirements/)
- [Amazon Influencer Program Statistics 2026 — Amra & Elma](https://www.amraandelma.com/amazon-influencer-program-statistics/) (low confidence; marketing content)
- [How Trevin Peterson Turned Rejection into Almost $40K/month — Niche Pursuits](https://www.nichepursuits.com/trevin-peterson/)
- [Trevin Peterson — YouTube](https://www.youtube.com/@TrevinPeterson/videos)
- [Peterson Products Amazon storefront](https://www.amazon.com/shop/trevinpeterson)
- [Amazon Influencer Program (UGC Strategy Amazon Sellers Aren't Talking About) — YouTube](https://www.youtube.com/watch?v=gY0Nqv_bvFo)
- [I've Simplified Amazon Influencer to These 4 Steps for 2026 — Weekend Growth](https://weekendgrowth.com/amazon-influencer-program-plan/)
- [Oink Workflow: Find Winning Products for Amazon Creator Connections — Weekend Growth](https://weekendgrowth.com/oink-workflow-amazon-creator-connections/)
- [Viral Vue vs Oink for Amazon Influencers (2026) — Miles Insights](https://milesinsights.com/viral-vue-vs-oink-amazon-influencers/)
- [Oink for Influencers vs. Viral Vue — EntreResource](https://entreresource.com/oink-vs-viral-vue/)
- [Oink for Influencers — Chrome Web Store](https://chromewebstore.google.com/detail/oink-for-influencers/jjlaeadagpolpecbbaeonlfadkmoffgo)
- [Viral Vue for Amazon Influencers — Chrome Web Store](https://chromewebstore.google.com/detail/viral-vue-for-amazon-infl/pakblppeciifkjmkfleeeomhmfiikaej)
- [Amazon Creator Connections: A Complete Guide For Influencers — Creator Hero](https://www.creator-hero.com/blog/amazon-creator-connections-a-complete-guide-for-influencers)
- [What Are Amazon Creator Connections? — HALO Maximizer](https://halomaximizer.com/blog/what-are-amazon-creator-connections)
- [How to Maximize Your Creator Connections Earnings in 2026 — HALO Maximizer](https://halomaximizer.com/blog/maximize-creator-connections-earnings)
- [Amazon Creator Hub 2026 Guide — Influencer Marketing Hub](https://influencermarketinghub.com/amazon-influencer-marketing/amazon-creator-hub/)
- [Crawl4AI Privacy Policy](https://docs.crawl4ai.com/privacy/)
- [Crawl4AI Self-Hosting Guide](https://docs.crawl4ai.com/core/self-hosting/)
- [The Ultimate Legal Guide to Scraping Amazon — ScrapeLead](https://scrapelead.substack.com/p/the-ultimate-legal-guide-to-scraping)
- [Does Amazon Allow Web Scraping or Will You Get Blocked? — Pixelscan](https://pixelscan.net/blog/does-amazon-allow-web-scraping-or-will-you-get-blocked/)
- [Is It Legal to Scrape Amazon — Octoparse](https://www.octoparse.com/blog/is-it-legal-to-scrape-amazon-data)
- [Does Amazon Block Scraping? — ScrapeOps](https://scrapeops.io/websites/amazon/)
- [Amazon Product API (PA-API) in 2026: Restrictions, Alternatives — DEV](https://dev.to/agenthustler/amazon-product-api-pa-api-in-2026-restrictions-alternatives-and-web-scraping-4l35)
- [Amazon Creators API: What Changed and How to Switch — KeywordRush](https://www.keywordrush.com/blog/amazon-creator-api-what-changed-and-how-to-switch/)
- [Amazon PA-API "AssociateNotEligible" Error — KeywordRush](https://www.keywordrush.com/blog/amazon-pa-api-associatenoteligible-error-is-there-a-new-10-sales-rule/)
- [Register for Product Advertising API — Amazon](https://webservices.amazon.com/paapi5/documentation/register-for-pa-api.html)
- [Amazon Creators API docs](https://affiliate-program.amazon.com/creatorsapi/docs/en-us/introduction)
- [Keepa pricing (2026) — The Front Desk Review](https://frontdeskreview.com/software/amazon-seller-tools/keepa/)
- [Keepa Pricing and Plan: Is It Worth It? — RevenueGeeks](https://revenuegeeks.com/software/keepa/pricing)
- [Rainforest API Alternatives (2026) — FlyByAPIs](https://flybyapis.com/blog/rainforest-api-alternatives/)
