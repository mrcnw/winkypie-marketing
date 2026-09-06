# WinkyPie — Brand Guidelines

How the brand is actually built, so creative can be produced without guessing and without
drifting. `PRODUCT.md` holds the product facts and the claim limits; this file holds the
**applied system** — the marks, colours, type, layouts and patterns that are already shipping.

Where the two disagree, `PRODUCT.md` wins on *what may be claimed*; this file wins on *what
it looks like*, because it was read off the live surfaces.

---

## 0. Evidence base

Everything below was read from a first-party surface on **2026-09-01**. Nothing is inferred
from a moodboard.

| Source | What it gave |
|---|---|
| 5 in-app screenshots — `app/public/assets/winkypie/mobile-app/app-flow/` | The live UI system: layout, chips, CTAs, states |
| 5 App Store screenshots — `…/mobile-app/app-store/` | The store creative system: caption style, device framing, glow |
| `winkypie.app` compiled CSS (`/_next/static/chunks/*.css`) | Font tokens and brand hexes as shipped, not as documented |
| `winkypie.app` page copy | Headline formula, section order, the five sourced stats |
| `winkypie.app/privacy` | The privacy wording that creative may repeat |
| App Store listing `id6757441777` | Store copy, IAP names and prices, rating status |
| Apple screenshot specs (see §10) | Which sizes the 6.9" slot accepts |

Re-run this audit whenever the app ships a redesign. A guideline written from memory is a
guideline that drifts.

---

## 1. The brand in one line

**Pro photos. No photographer.** Dark, premium, a little playful — a studio that lives in
your phone and is honest about being AI.

Personality, in the order it should read:

1. **Confident, not loud.** Short sentences, hard stops, no exclamation marks.
2. **Warm, not cold.** Amber-to-pink, never neon, never corporate blue.
3. **Precise.** Every screen shows the mechanism — the pose used, the match score, the check.
4. **Playful in the mark only.** The winking pie face carries the humour; the copy does not
   have to be funny.

---

## 2. The mark

A circular winking face inside a segmented amber→pink ring — an aperture blade ring, which is
the whole idea: a camera that winks. The face is off-white, the left eye a solid dot, the
right eye a black starburst, the smile a thick rounded stroke.

| Rule | Value |
|---|---|
| Master file | `app/public/assets/winkypie/brand/logo.png` (675×676, transparent) |
| Minimum size | 32 px on screen. Below that the starburst eye fills in and reads as a smudge |
| Clear space | One quarter of the mark's diameter on all sides |
| On dark | Use as-is. The white face is the contrast; no outline, no glow |
| On light | Allowed, but the ring loses separation — prefer the dark surface |
| Lockup | Mark left, wordmark right, optically centred on the face, gap ≈ 0.25× mark width |

**Never:** recolour the ring, flatten the gradient to one colour, put the mark inside another
shape, rotate it, or add a drop shadow. If it needs a background, use `#0E0E0E`.

---

## 3. Colour

Read out of the shipped site CSS, cross-checked against the app screens.

### Brand

| Role | Value | Where it shows |
|---|---|---|
| Gradient start — gold | `#F59E0B` | Wordmark, CTA pill, section labels, icons |
| Gradient end — pink | `#EC4899` in the app · `#E85D96` on the web | The web drifted. See §13 |
| Warm midpoint | `#FFD166` → `#FF8347` | Only inside the gradient ramp, never as a flat fill |
| Accent gold | `#FBBF24` | Small emphasis text, the `#hashtag` labels |

**The gradient is `linear-gradient(135deg, #F59E0B, #EC4899)` and there is exactly one of
it.** It appears on: the wordmark, primary CTA pills, the punch word in a headline, section
eyebrow labels, and thin top-edge accents. It does not appear as a background wash behind
body copy, and a second gradient is never introduced — not for a campaign, not for a season.

Implementation note that has bitten before: never interpolate to `transparent` (it goes
through black). Use `#F59E0B00`.

### Surfaces

| Role | Value |
|---|---|
| Page background | `#0A0A0A` – `#0E0E0E` |
| Card / raised | `#141414` – `#1A1A1A` |
| Text primary | `#FFFFFF` |
| Text secondary | `#8A8A8A` |

### State

| Role | Value | Where |
|---|---|---|
| Pass / match | system green `#34C759` | The photo-check ring and tick, the `55% MATCH` chip |
| Warn | `#FF9500` | Analysis in progress |
| Error | `#FF453A` (app) · `#DC2626` (web) | Failures only |

Green is the only colour outside the brand ramp that is allowed to carry meaning, and it
means exactly one thing: *this photo will work*. Do not use it decoratively.

---

## 4. Typography

| Role | Face | Evidence |
|---|---|---|
| Display / headline | **Fraunces** (serif, italic accents) | `--font-fraunces` in the shipped web CSS; the in-app headings match |
| Body / UI | **Inter** | `--font-inter`, mapped to `--font-sans` |
| Mono | **Geist Mono** | `--font-geist-mono` — data and technical labels only |
| App Store captions | A rounded geometric sans (Poppins-like) | Read off the store creative — **not Fraunces, not Inter.** See §13 |

Both Fraunces and Inter are SIL Open Font License 1.1: free for commercial use, embeddable in
video and static creative, modifiable. No licence blocks an ad.

### The signature move

Every headline carries **one punch word in italic gradient**. It is the single most
recognisable typographic asset the brand has, and it is used everywhere:

> She decided in *100 ms*. · First photo. *First chance.* · Looks pro. *Still you.* ·
> It's easy. *One, two, three.* · Be the right *swipe*.

Rules: one punch word per headline, never two. The punch word is the payoff, not the subject.
Gradient runs left→right across the word at 135°. Roman for the statement, italic for the
punch.

### Hierarchy

- Headline — Fraunces, tight tracking, sentence case, two beats with a hard stop between.
- Sub — Inter, `#8A8A8A`, one line, never a paragraph.
- Chips and state labels — Inter, uppercase, wide tracking, small: `REFERENCE POSE`,
  `55% MATCH`, `ANALYZING`, `POSE USED`, `PHOTO USED`.
- Never set body copy in Fraunces. Never set a headline in Inter on a brand surface.

---

## 5. UI patterns worth reusing in creative

These come from the shipped app and are what makes a screen recognisable as WinkyPie in a
1.5-second ad view:

| Pattern | Detail |
|---|---|
| Full-round gradient pill CTA | Icon in a circle on the left, label, arrow right. `Generate photo`, `Download`, `Start free trial` |
| Segmented pill tabs | `Explore · Your poses 2 · Liked 4` — counts live in soft grey badges |
| Serif collection headers | `City & Street` in gradient serif, `#street` beneath in gold |
| Heart affordance | Top-right of every pose card; filled pink when liked |
| State chips | Dark translucent pill, uppercase label, top-left of the media |
| The proof row | `POSE USED` + `PHOTO USED` thumbnails under a result — the honesty pattern |
| Ambient glow | Amber/pink radial bloom behind hero media and at the bottom edge of store creative |
| Corner radius | 16–20 px on cards, full round on CTAs and chips |

The proof row is a brand asset, not a UI detail. It is the visual argument that the output is
*him*, and it is the answer to the "does it still look like me" objection.

---

## 6. Photography and subjects

- **Men only.** Every model, pose and result. This is a product decision, not an aesthetic one
  (`PRODUCT.md` §3), and it is absolute across ads, store creative and the site.
- **Real places, natural light.** Streets, cafés, terraces, poolside, night out. No studio
  seamless, no clipart, no stock-office backdrops.
- **Wardrobe:** neutral, well-fitted, quiet — linen, knit polos, plain tees. No logos.
- **Composition:** subject off-centre, looking away from the lens more often than at it. The
  poses are candid-by-design; that is what dating apps reward.
- **Never** show a pose or result that is not male, and never show two people.

Everything currently in the repo is an **AI-generated demo asset**, not a customer result. It
ships with the §11.2 disclosure or it does not ship.

---

## 7. Copy system

Locked lines — identical in the app, on the site, and in ads. Do not paraphrase:

| Line | Role |
|---|---|
| `Pro photos. More matches.` | Primary brand line — since 2026-09-06 |
| `Pro photos. No photographer.` | Support line — ease and savings; still the live paywall headline until the app ships the new one |
| `She decided in 100 ms.` | Hero hook |
| `First photo. First chance.` | Problem line |
| `Looks pro. Still you.` | Product-truth line |
| `Be the right swipe.` | Closing CTA |

Formulas that already work on live surfaces: `Old → New` · `Thing. Thing. Punchline.` ·
`Pro X. Not pro Y.` · `Number + benefit`.

**Why the primary line changed on 2026-09-06.** Every proven ad in the niche states the dating
outcome in its headline — Charmd's "Better Photos. More Matches." (179 days live), Roast's
"Fix your photos. Get more matches." and its most-cloned title "Same face. 10x the matches."
(~257 ads) — while our line stated the mechanism. "Pro photos. More matches." keeps the
"Pro photos." equity of the paywall and the `Pro X.` family, and puts the outcome in the second
beat, in the word PRODUCT.md §9 lists first among the Do-words. No number, ever: the multiplier
is what §11 bans. Considered and not taken: "One selfie. More matches." (one selfie is not a
headline — GIO and Pose AI take one photo too, see the competitor landscape), "Same face. More
matches." (Roast's phrase, in 257 of their ads). Backup if Meta ever objects to "matches":
"Pro photos. Right swipes." The evidence: `brain/process/meta-ads/02 How To Find A Good Ad/`.

The five weighted messaging pillars live in `PRODUCT.md` §9 — transformation 40 %, ease 25 %,
savings 15 %, variety 12 %, trust 8 %. Creative briefs pick **one** pillar, not three.

---

## 8. The store screenshot system

The five App Store slots are the most complete expression of the brand and the best source
material for ads. The pattern, slot by slot:

| Slot | Caption | Screen shown | Job |
|---|---|---|---|
| 1 | *(logo lockup, no caption)* | Poses grid | Brand + breadth |
| 2 | `Select a pose or upload` | Onboarding "It's easy. One, two, three." | The mechanism |
| 3 | `Add your photo` | Pose mimic with the reference above | The ask |
| 4 | `Analyze before generation` | Photo check, 55 % match, green pass | **The moat** |
| 5 | `Get noticed online` | Result with the proof row | The payoff |

Construction rules, read off the files:

- **Caption:** one line, gradient left→right across the whole line, rounded geometric sans,
  heavy weight, tight tracking. Top ~12 % of the frame.
- **Device:** a dark iPhone frame, centred, generous margin, bottom edge bleeding out.
- **Background:** near-black with a faint vertical light behind the device and a
  pink/amber bloom at the bottom corners.
- **Never** more than one line of caption, and never a caption that makes a claim the app
  cannot show on that same screen.

---

## 9. Ad creative rules

- Ratios: 9:16 for Reels and Stories, 1:1 and 4:5 for feed. The hook must read with sound off
  inside the first 1.5 s.
- Lead with the mechanism, not the logo. A frame of the photo check or the proof row says more
  in a second than a wordmark does.
- **Meta personal-attributes rule:** write in the third person about the product. Never imply
  the viewer's relationship status. ❌ "Still single?" ✅ "One selfie → pro photos for your
  dating profile."
- Prefer **reference pose → result** framing over "bad me → hot me". Before/after in an
  appearance category attracts review, and the reference-pose framing is both safer and more
  honest about the mechanism.
- Every appearance of before/after carries: *"Demo. Your photos use your actual face and body.
  Results vary based on selfie quality, lighting, and pose."*
- No dollar figures anywhere off the App Store. "Free trial", "cancel anytime", nothing more.

---

## 10. Specs

| Surface | Spec |
|---|---|
| App Store screenshots, 6.9" | 1290 × 2796 accepted. Apple's 6.9" class also takes 1320 × 2868 and 1260 × 2736. 1–10 per class, JPEG or PNG. Current set: 1290 × 2796 ✓ |
| In-app captures | 1206 × 2622 (iPhone 16 Pro). Fine for ads, **not** a valid store size |
| Ads | 1080 × 1920 (9:16) · 1080 × 1080 (1:1) · 1080 × 1350 (4:5) |
| Logo master | 675 × 676 PNG, transparent |

Sizes are visible on every tile in the dashboard's asset browser — check there before
exporting rather than trusting a file name.

---

## 11. Never

1. A second gradient. Ever.
2. Female imagery representing the user.
3. An invented number, testimonial, rating or user count — the app has **no ratings yet**
   (App Store, 2026-09-01), so social proof does not exist to be shown.
4. A dollar price on any surface except the App Store listing.
5. "Winky Shots" — the credit currency is retired. Say "generations" or "photos".
6. A pose count. The catalog is backend-managed; count it live or say nothing.
7. Implying the before/after shows a different person, or that the output is a filter.
8. Naming the AI vendors in creative. FAL.ai and Google Gemini are named in the privacy policy;
   that is the only place they belong.

---

## 12. Conflicts this audit found

These are live contradictions between shipped surfaces. Each one is a review risk, and the
first two are the urgent ones.

| # | Conflict | Detail | Fix |
|---|---|---|---|
| 1 | **Selfie retention** | The App Store description says photos are "deleted from servers within 60 seconds". The privacy policy and the site say **7 days** | One number. Update the listing to match the policy |
| 2 | **Pose count, twice** | The same listing says "70+ poses" and "500+ professional poses" | Drop the count entirely (guardrail 7) |
| 3 | **Retired currency** | The listing still sells "25 / 50 / 50 WinkyShots" per plan | Rewrite to the shipped quota: trial 5 over 3 days, Pro 50/week + 100/month |
| 4 | **Reversed flow** | The listing says "upload a selfie, pick a pose". Shipped order is pick pose → coaching → selfie → free check → generate | Rewrite; the check is the differentiator and it is missing from the listing |
| 5 | **Gradient end** | App `#EC4899`, live web `#E85D96` | App wins per `PRODUCT.md` precedence. Fix the web token |
| 6 | **Publisher name** | Listing shows "Marcin Wojciechowski"; repo docs say "Minimax Development" | Decide which is the public seller name and align |
| 7 | **Third typeface** | Store captions use a rounded geometric sans that is neither Fraunces nor Inter | Either adopt it as the official display-for-creative face and name it here, or rebuild the captions in Fraunces |
| 8 | **Age rating vs positioning** | Listing is rated 13+ while the wedge is dating for 22–40 | Harmless for the store, but ad targeting must stay 18+ regardless |

---

## 13. Open questions

| # | Question | Where the answer is |
|---|---|---|
| 1 | What is the store-caption typeface? | Whoever built the store creative — a source file will name it |
| 2 | Is `#E85D96` a deliberate web softening of `#EC4899`, or drift? | Design |
| 3 | Does the app's own display face resolve to Fraunces, or only the web? | The app repo's font config |
| 4 | Is there a wordmark lockup file, or is the wordmark always set live in type? | Design — a locked SVG lockup is worth having before the first influencer brief |

---

**Related:** `PRODUCT.md` (facts and claim limits) · `CLAUDE.md` (repo-wide guardrails) ·
`brain/process/meta-ads/` (what to do with all of this).
