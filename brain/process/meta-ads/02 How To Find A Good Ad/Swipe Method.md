---
tags: [research, method]
updated: 2026-09-01
---
# Swipe Method — finding ads that pay for themselves

The weekly 30-minute ritual from [[02 How To Find A Good Ad]], reduced to exact clicks.
The Ad Library shows no CTR, spend or ROAS for normal ads — **the only reliable signals are
how long an ad has lived, and how many variants of it the advertiser runs.** Everything
below exists to read those two signals fast. Method sources and thresholds:
[AdRiseLab](https://adriselab.com/blog/meta-ad-library-competitor-analysis),
[Foreplay](https://www.foreplay.co/post/facebook-ads-library),
[Airbridge](https://www.airbridge.io/en/blog/how-to-research-competitor-app-ads-for-free).
Live-verified in the Ad Library on 2026-09-01.

## The click path, in order

1. Open **facebook.com/ads/library**. Log in with any FB account — logged-out you can't see
   18+-targeted ads (dating-adjacent ads often are).
2. **Country — first, before anything else.** Wrong country is the #1 reason "there are no
   ads". Set:
   - **United States** — our market (App Store link is `/us/`), the richest inventory.
   - **A second pass with an EU country (Germany or France)** — for any ad delivered in the
     EU, "See ad details" shows **EU transparency: real reach numbers + age/gender
     breakdown + targeting**. This is the only free way to see hard numbers. An ad with
     six-figure EU reach and a male 25–44 skew is a winner with a receipt.
3. **Ad category → All ads. Active status → Active.** (Inactive history only survives for
   EU-delivered ads, ~1 year.)
4. **Search.** Two modes, use both:
   - **Advertiser search:** type the page name, pick the page from the dropdown → every ad
     that page runs. Do this for each name in the list below.
   - **Keyword search in quotes** (exact phrase) — unquoted search matches words in any
     order and drowns you in noise (verified: unquoted `roast.dating` returned ~220 junk
     results, quoted returned 9 clean ones). Domains work as keywords.
5. **Filters after search:** Media type → Video (our format); Platform → Facebook/Instagram.
   Language → English.
5a. **The page view is where the gold is.** Click an advertiser's name on any ad card (or
   use `view_all_page_id=<ID>` in the URL) to see *all* ads from that page — and there the
   **Sortuj/Sort dropdown offers sorting by total impressions** (verified live 2026-09-01;
   URL param `sort_data[mode]=total_impressions&sort_data[direction]=desc`). Sorted by
   impressions, the first row IS their best ad — no date arithmetic needed. Known page:
   Roast Dating = `574845319034849`.
6. **Read each result for exactly three things:**
   - **"Started running on" date** → compute days alive.
   - **"N ads use this creative and text"** / "This ad has multiple versions" → replication.
   - The first sentence of the copy → the hook.
7. **Save the search** (Save search button) so next week is one click. Save keeper ads as
   screenshot + link + the three-line mechanism note into `swipe/` — non-EU ads vanish from
   the library the day they're turned off.

## How to know an ad is earning its money

| Signal | Reading |
|---|---|
| < 14 days live | Noise. A test, maybe already failing. Ignore. |
| **30+ days live** | Paying for itself — nobody funds a loser for a month. Swipe it. |
| **60–90+ days live** | Proven winner. Study it line by line. |
| **Many near-identical variants** of one copy | The advertiser validated the angle and is scaling it (ReGen runs ~18 variants of one control text). Strongest signal when combined with age. |
| Same creative re-launched with a new date | They're re-buying a proven asset. |
| Page runs 20+ active ads | Serious budget behind the account — worth a full teardown. |
| EU reach in six figures (EU-country view) | Hard number; no interpretation needed. |

Caveat: age alone can be a zombie ad nobody pruned — trust **age + variants** together
before trusting either alone.

## Keywords for our case (validated 2026-09-01, US, exact phrase)

**Advertiser pages** (checked live — these are the niche's active spenders):
`Roast AI` · `Photoshoot Dating` · `ReGen - AI Profile Photos` · `Trushot App` ·
`Ethan Park` (TruShot's persona page) · `Aragon.ai` · `SWAY Ai` · `Remini` ·
watchlist: `Charmd` · `UnrealPhotos` · `GetDates` · `Datepix`.

**Category phrases** (result counts at check time — re-run these first each week):
- `"dating photos"` — ~41 active. The core net; catches new entrants and photographers.
- `"AI dating photos"` — ~12 active. Pure-niche, almost zero noise.
- `"dating profile"` — broad; run monthly.
- `"more matches"` — ~290, noisy (dating apps, tennis) but caught SWAY Ai; run monthly.

**Angle phrases** (search the promise, not the brand — finds unknown competitors):
`"it's the photos"` · `"your photos are"` · `"swiped left"` · `"no photographer"` ·
`"profile photos"` · `"get more dates"`.

**Dead ends, don't re-scan:** `"photoai.com"` (only rip-off pages), `"Umax"` (golf carts;
the app buys influencers, not Meta), `"Lensa"` (job board Lensa.com), `"Dawn AI"` /
`"Softbox"` / `"photofeeler"` / `"yourmove"` (zero niche ads), `"Prequel"` (skincare-brand
noise — their GIO app advertises on TikTok, not Meta), `"radiantsnaps"` / `"datephotos"` /
`"pose.ai"` (zero — SEO players don't buy ads). `"Retake AI"` works but is ~1,000 generic
editor ads — scan only when checking whether they've entered dating.

## Automated mode — the scraper

The manual click path above has an automated equivalent: the local tool at
`~/Downloads/meta-ads-library/` (GraphQL scraper, no login/browser needed; its README
documents the method and pitfalls). It pulls ads + EU reach + creatives and ranks by the
same winner signals. First run's results: [[Winning Ads 2026-09-02]]. Whether this is the
best available method (yes, for our scale), its risks and the upgrade list: [[Scraper Verdict]].

```bash
cd ~/Downloads/meta-ads-library
# who advertises on a phrase
node scripts/meta-ads-research.mjs --who "dating photos" --country US --pages 6
# full pull of one competitor page, with EU reach + creative downloads
node scripts/meta-ads-research.mjs --page-id 574845319034849 --country US --pages 5 --details --media --out out/research-roast
```

Niche page-ids (verified 2026-09-02): Roast AI `574845319034849` · Photoshoot Dating
`663945973475500` · ReGen `874777212395608` · SWAY Ai `391389437389627` · Confessions of a
Dater (Charmd) `924014977461395` · Ethan Park (TruShot) `1292203403984517`.

Caveats that stay true in the tool: no spend/impressions for commercial ads (EU reach is
the only hard number, and only for ads delivered in the EU); the date filter means "ran in
period", not "started"; Meta rotates `doc_id` — the repo's `12-capture-shapes.mjs` refreshes it.

## Current winners to study first

The scan results and hooks live in [[Competitor Landscape]] (step 01) — start with the
longevity table there: SWAY Ai (~196 days), Roast AI (~103 days), ReGen's control copy
(~54 days, 18 variants). ROAST's winning formula: lowercase UGC confession → "it's the
photos, not your face" reframe → free 2-min quiz. ReGen's: third-person product-led copy
that Meta approves without personal-attributes risk — the compliance template for us.

## What we never copy

From the winners above, take the *mechanism*, never: second-person appearance/relationship
implications ("You're not ugly" — ROAST runs it, Meta rejection risk we don't eat, PRODUCT.md
§11) · fake-persona advertorial pages (TruShot's "Ethan Park") · invented stats ("3x more
matches") · fake countdown timers.
