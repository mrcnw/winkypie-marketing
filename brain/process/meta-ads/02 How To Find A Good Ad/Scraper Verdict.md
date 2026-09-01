---
tags: [research, method]
updated: 2026-09-02
---
# Scraper Verdict — is our method the best available?

**Yes for our scale (~10 competitor pages/week): nothing strictly dominates it.** The paid
APIs (Apify $0.75/1k, ScrapeCreators $47/mo, Bright Data) sell the *identical* dataset
obtained the *identical* way — reverse-engineered Ad Library GraphQL; their only real
product is absorbing breakage. The official Meta API is strictly worse for commercial ads
(EU/political only, ~200 calls/h, identity verification). The one genuinely additive paid
tool is **AdSpy (~$149/mo)** — the only index with real engagement + comment text; a
nice-to-have, not a need. Full source list in the research below; key rulings and docs:
[Meta v. Bright Data 2024](https://www.fbm.com/publications/major-decision-affects-law-of-scraping-and-online-data-collection-meta-platforms-v-bright-data/) ·
[ads_archive reference](https://developers.facebook.com/docs/graph-api/reference/ads_archive/) ·
[curious_coder Apify actor](https://apify.com/curious_coder/facebook-ads-library-scraper) ·
[public GraphQL gist](https://gist.github.com/thuykaka/d3df57f14042a7d5786047f3e976841d).

## What holds up

- **Technique is industry-standard**: Apify actors and public gists use the same
  GraphQL + doc_id flow. Our variant is *leaner* than anything published (zero cookies,
  zero LSD token — every public implementation harvests tokens first).
- **Legal posture is the good one**: logged-out scraping of public data — Meta v. Bright
  Data (2024) held Meta's ToS don't prohibit it; hiQ v. LinkedIn still stands; DSA Art. 39
  *requires* this repository to be machine-accessible. No known enforcement against
  ad-library scrapers since. Rule that keeps it clean: **never run it logged-in and never
  from infrastructure tied to our Meta ad accounts.**
- **"This ad earns money" state of the art** = composite, never one signal: 45+ days live ×
  variant/collation density × EU reach (the only hard number) × impression bucket. Nobody
  can prove profit from public data — the defensible claim is "this ad is being scaled
  deliberately." Our tool's score already matches this.

## What does NOT hold up (fix list)

1. **Honest-UA-wins is corroborated nowhere** — treat as an undocumented accident that can
   vanish. Same for the zero-cookie path. Keep `12-capture-shapes.mjs` ready; better,
   automate doc_id re-capture per run (what commercial actors do).
2. **~270 req/min headroom contradicts practitioner reports** of IP blocks within hours.
   Throttle to ≤1 req/s — our workload is a few hundred requests/week anyway.
3. **`first: 30` likely works** (public implementations get 30/page vs our 10) — 3× fewer
   requests. Try it.
4. **Impression-range buckets** (<1K … 1M+) reportedly rolled out to all ads in late
   2025/26 [vendor-reported, unverified] — if present in the payload, they beat longevity
   as the winning-ad signal. Also re-verify "impressions sort is client-side": capture the
   sorted request; a server-side param likely exists.
5. **Log EU reach + collation weekly** — reach *deltas* over time are the closest public
   thing to a spend estimate (exactly what Brandsearch/Trendtrack sell).
6. Cold-standby fallback for broken weeks: the Apify actor (~$0.75/1k ads).

First real run of the tool on our niche: [[Winning Ads 2026-09-02]].
