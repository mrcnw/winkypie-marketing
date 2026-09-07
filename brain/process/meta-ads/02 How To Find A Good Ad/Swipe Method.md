---
tags: [research, method]
updated: 2026-09-06
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

The manual click path above had an automated equivalent: a local GraphQL scraper at
`~/Downloads/meta-ads-library/` (no login, no browser; pulls ads + EU reach + creatives and
ranks by the winner signals). First run's results: [[Winning Ads 2026-09-02]]. Whether it
was the best available method (yes, for our scale), its risks and the upgrade list:
[[Scraper Verdict]].

**2026-09-06: the folder is not on this Mac** — Spotlight, `~/Downloads` and the Trash
have no `meta-ads-research.mjs`. The commands are kept for when it is restored; until then
the page-level pull is the Ad Library page view (all IDs are in the page text after "See
more") and the single-ad teardown below does the creatives.

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

## Single-ad teardown — download, transcript, frames

For "what is actually in this ad": video file, spoken words with timecodes, one frame every
three seconds. Verified 2026-09-06 on the whole Roast AI page (19 videos, 21 statics) —
result in [[Roast AI Creative Teardown 2026-09-06]]. Options weighed:

| Tool | Gets | Verdict |
|---|---|---|
| **yt-dlp** (`facebook:ads` extractor) + **whisper-cpp** + **ffmpeg** | mp4, headline + primary text (`.info.json`), transcript `.txt`/`.srt`, contact sheet | **The pick.** Free, local, ~20 s per ad on an M-series Mac. Video ads only |
| Meta Ads MCP `ads_library_search` (`page_ids`) | IDs, headline, dates, snapshot URL | Metadata only; caps at 25 per call, no paging, no media |
| Ad Library page in a browser | Primary text, headline, CTA, durations, `<100` flags, EU/UK reach panel, image URLs | The only source for statics and for the full 40-ID list; no transcript |
| Apify / ScrapeCreators | Same data as the scraper, paid | Cold standby ([[Scraper Verdict]]) |
| Higgsfield `video_analysis` (MCP) | Scene-by-scene description | Needs an upload, costs credits, 3–5 min per clip; whisper + a contact sheet does it in seconds |

```bash
brew install yt-dlp whisper-cpp ffmpeg                     # one-time
mkdir -p ~/models && curl -L -o ~/models/ggml-small.en.bin \
  https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.en.bin   # 488 MB, one-time

ID=1382118217386363                                        # the library ID from the ad URL
yt-dlp -o "%(id)s.%(ext)s" --write-info-json "https://www.facebook.com/ads/library/?id=$ID"
ffmpeg -i "$ID.mp4" -ar 16000 -ac 1 "$ID.wav" \
  && whisper-cli -m ~/models/ggml-small.en.bin -f "$ID.wav" -l en -otxt -osrt -of "$ID"
ffmpeg -i "$ID.mp4" -vf "fps=1/3,scale=270:-1,tile=5x3" "${ID}_sheet.jpg"   # one frame per 3 s
```

Rules learned on the first run:

- **Rate limit:** more than ~10 downloads a minute gets `HTTP 429` on yt-dlp's
  verification cookie. Eight seconds between ads was clean for 16 in a row.
- **`Unable to extract ad data` = an image ad.** yt-dlp only takes video. For statics, open
  the page view and read the card's `<img>` URL from the DOM (signed CDN links, valid for a
  few hours), then `curl` them.
- **All IDs of a page:** the page view, click "See more" once, then regex the page text for
  `Library ID: (\d+)` (`Identyfikator biblioteki` in a Polish locale). 40 IDs on Roast.
- **Sound-off ads transcribe as `[Music]`** — that is the answer, not a failure; read the
  contact sheet instead.
- **Keep the output outside the repo:** `~/Downloads/<page>-ads-<date>/{media,transcripts,frames,images,index.tsv}`.
  The vault gets the teardown note, not the files.

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
