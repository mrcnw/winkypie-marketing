# WinkyPie — Product

What the product is. Positioning, audience, flow, pricing, brand and claim limits.

This is the context document for the whole repo. Everything else reads from it and does not
restate it — if a fact about the product is needed somewhere, link here.

| Who reads it | For what |
|---|---|
| `brain/process/meta-ads/` | Every step of the Meta Ads loop. Claims, persona, guardrails, brand kit. |
| `app/` | The asset browser. Labels, brand values and the disclosures that must sit next to an asset. |

**Merged on 2026-09-01** from the landing-page repo (`winky-pie-landing-page`) and the app
repo (`dream-pie`). Where those two disagreed, **shipped app code won over the published
web surface, and the web surface won over older docs.** §12 lists what turned out stale.

Figures marked `[unsourced]` have no citable origin in either codebase and must never ship
in paid creative.

---

## 1. In one line

**WinkyPie turns one selfie into dating-app-grade profile photos — no photographer, no photoshoot.**

Pick a pose from a curated catalog (or upload a reference you saw anywhere), get coached on
how to stand, take a selfie, and the AI renders *you* in that pose and setting — real face,
real build.

Locked lines, identical in the app and on the site. Do not drift them:

| Line | Role |
|---|---|
| `Pro photos. More matches.` | **Primary brand line — decided 2026-09-06** (rationale in `BRAND.md` §7). Not yet in the app: the live paywall headline still reads the support line below until the app ships the change (§12) |
| `Pro photos. No photographer.` | Support line — ease and savings; the live paywall headline today |
| `She decided in 100 ms.` | Hero hook, onboarding screen 1 |
| `First photo. First chance.` | Problem line, onboarding screen 2 |
| `Looks pro. Still you.` | Product-truth line |
| `Be the right swipe.` | Closing CTA |

Supporting paywall copy in production: *"One selfie. AI does the rest. 3 days free, cancel
anytime."* · *"No payment today. Apple notifies you before any charge."*

---

## 2. Facts and IDs

| Field | Value |
|---|---|
| App name | **WinkyPie** |
| Category | AI photo generator / dating-profile photo app (App Store: PhotoApplication) |
| Platform sold | **iOS.** App Store ID `6757441777` |
| Minimum iOS | **15.1** — App Store listing, checked 2026-09-02. The floor for ad targeting: below it the install cannot happen |
| App Store URL | `apps.apple.com/us/app/winkypie/id6757441777` |
| Review deep link | `https://apps.apple.com/app/id6757441777?action=write-review` |
| Bundle | `com.notforget.winkypie` · URL scheme `winkypie://` |
| Store status | 1.0 "Ready for Distribution"; repo version 1.0.2 |
| Website | `https://winkypie.app` |
| Publisher | Minimax Development |
| Support | `winkypie.app@gmail.com` · `winkypie.app/support` |
| Legal | `winkypie.app/privacy` · `winkypie.app/terms` |
| Social | Instagram `@winkypie.app` — the only channel wired today |
| Account model | **No account required.** Anonymous random user ID per install |
| Data handling | Generated photos stay on the phone. Source selfie deleted server-side within 7 days. **Never used to train models** (`/privacy#ai-data-usage`) |
| Backend | Convex, deployment `glad-spaniel-840` (poses in `photoReferencePose`) |
| AI stack | Google Gemini via OpenRouter (pose analysis + photo check) → **FAL.ai** (generation) |
| Billing | RevenueCat, entitlement key `access` |
| Instrumentation | Amplitude (33 events, + session replay) · Sentry · web: GA4 + Meta Pixel component (pixel ID not set) |

**Android:** the codebase is cross-platform and RevenueCat is wired for Play, but only the
iOS listing is live and verified. Market iOS only. `/terms` still mentions Play billing — a
known cleanup item.

Never name the AI vendors in creative. Internal context only.

---

## 3. Who it is for

The product was deliberately narrowed in v2 from "AI photos for everyone" to one wedge:

> **Men, 22–40, on Tinder / Bumble / Hinge, whose profile photo is the bottleneck.**

This is shipped, not planned: the v2 pose catalog is men-only, the selfie pool is filtered
to `gender === 'male'`, and onboarding opens on a dating line.

| | |
|---|---|
| **Who** | Man, 22–40, single, urban, iPhone-first |
| **Behaviour** | Active on Tinder/Bumble/Hinge. Has 3–6 photos: group shots, mirror selfies, a four-year-old holiday pic |
| **Pain he states** | "I don't get matches" |
| **Pain that is real** | His first photo does all the work and it is bad. No photographer, no model friend, no idea how to pose |
| **Buying blockers** | Thinks AI photos look fake · doesn't want to look like he's trying too hard · unsure it will still look like *him* |
| **Trigger moments** | Rebuilding a profile after a breakup · a dry match streak · a friend's profile outperforming his · travel and summer |
| **Alternatives he weighs** | A friend with a camera · a €150–300 portrait session · a Fiverr retoucher · nothing |
| **Urgency** | Wants results tonight, not next week |

**"She" is the audience he is trying to reach — never the buyer.** Every model, pronoun and
pose asset is male.

Female content exists in the codebase behind a flag, hidden rather than deleted, so female
targeting can be switched back on later. Keep creative male-coded, but do not bake "for men"
into the logo, domain or Page name.

**Secondary use cases already in the product:** LinkedIn headshots (`#formal` poses),
Instagram and travel content. Cheaper, less policy-restricted inventory — worth testing,
but dating stays the wedge.

**Category it competes in:** AI headshot apps · dating-profile-photo services · "ask a friend
with a camera" · doing nothing.

**The competitor that matters is [ROAST](https://roast.dating)** — profile review plus AI
dating photos, the only serious paid-Meta spender in the niche, self-reporting 724k users.
They need 4–10 selfies, have no pose coaching and no pre-generation check, and their most
common bad review is "it didn't look like me". Full profile and their keyword vocabulary:
`brain/process/meta-ads/01 Find Competitors/`. Do not copy their proof claims or their
"you're not ugly" framing — §11.

**The line to hold:** not *"look better"* — *"get the photo you'd need a photographer for."*

**Explicit non-claims.** Not a filter. Not a face swap. Not a photo editor. Not a dating app.
Not a bio or opener writer.

---

## 4. What happens in the app

Two tabs: **Generate** (home) and **Gallery**.

```
1. POSES GRID          Curated catalog by scene collection.
                       Sub-tabs: Explore · Your Poses · Liked (♥)
2. POSE MIMIC          Tap a pose → coaching: body angle, gaze, hands, expression,
                       plus "photos to pick / photos to avoid". Then selfie or upload.
3. PHOTO CHECK  ←moat  A free AI pre-flight compares YOUR photo against THAT pose.
                       Returns pass / warn / block + a match %. A block costs nothing.
4. GENERATING          Staged copy: "Warming up the studio…" → "Checking your pose…" →
                       "Painting your shot…" → "Final touches…" → "Almost there…"
5. RESULT              Full-screen reveal → download / share / save.
6. GALLERY             All generations + the selfie pool. Zoom, share, delete.
```

**Onboarding is three screens, then the paywall:**

1. **Hook** — "She decided in **100 ms**." / "Before she even read your name." → *See what works*
2. **The numbers** — "First photo. **First chance**." / "One swipe. One photo. One shot at making her stop scrolling." → *How it works*
3. **How it works** — *Pick a pose or upload* → *Mirror the pose* → *Get your dream photo* → opens the paywall

Note the order: **the paywall comes before the first generation.** He pays on the promise,
not on a result he has seen. That puts all the convincing on the creative and the onboarding,
and makes the free photo check the strongest risk-reversal argument available.

---

## 5. Why it wins

Most AI photo apps take the money, generate garbage from a bad input, and blame the user.
WinkyPie does two things they don't:

1. **Pose coaching before the shot.** Per-pose instructions — body angle, gaze direction,
   hands, expression. He is not guessing.
2. **A free pre-flight check.** The AI compares the selfie to the target pose *before*
   charging a generation. If it won't work it says why and lets him retake — free.

Framings that already respect the claim rules in §10:

- *"It tells you if your photo will work — before it costs you anything."*
- *"Most AI photo apps charge you for the bad result. This one won't let you make it."*
- *"You don't need to know how to pose. It coaches you."*

The full differentiator set, for scoring competitors:

| # | Differentiator | Why it matters |
|---|---|---|
| 1 | **Upload your own reference** | Copy any aesthetic you've seen. Most rivals ship fixed style packs only |
| 2 | **Selfie-mirroring workflow** | You match the pose, so the composition is real — not a head pasted on a stock body |
| 3 | **One selfie** | No 10–20 photo training upload, no model-training wait |
| 4 | **Free pre-generation check** | No wasted credits |
| 5 | **Privacy posture** | Output on the phone, selfie deleted in 7 days, never used for training |
| 6 | **Dating-specific curation** | Poses chosen for what dating apps reward, not generic headshot packs |

---

## 6. The pose catalog

Seven scene collections. Admin-managed and synced live from the backend, so poses ship
without an app release — that makes "new drop" a usable recurring campaign beat.

| Collection | Vibe | Web hashtag | What it is |
|---|---|---|---|
| 🏙️ City & Street | candid | `#citystreet` | Urban streets, landmarks, parks |
| ☕ Café & Drinks | relaxed | `#cafedrinks` | Sat-down candids — cafés, bars, restaurants |
| 📸 Studio & Indoor Portrait | moody | `#studio` | Controlled indoor backdrops |
| 🌃 Night Out | bold | `#nightout` | Nightlife energy, low light |
| 🌇 Terrace & Golden Hour | warm | `#goldenhour` | Balconies, rooftops, sunset |
| 🌊 Coast & Beach | easy | `#beach` | Sea, sand, waterfront |
| 🤵 Smart & Formal | sharp | `#formal` | Suits, blazers — the LinkedIn wedge |

Plus `#uploadyourpose` — user-supplied references, saved under "Your Poses", hearted to favourite.

**Never claim a pose count.** The catalog is backend-managed and changes without a release;
the 101 images in the landing repo are a website gallery, not the in-app catalog. Count it
live in the admin panel or say nothing.

**Where the output is meant to be used:** Tinder · Hinge · Bumble · Raya · Instagram · LinkedIn · Travel.

---

## 7. Pricing and limits

| Tier | Allowance | Notes |
|---|---|---|
| **Trial** | **5 generations over 3 days** | Apple store trial, one per user/device, one-time |
| **Pro** | **50 / rolling week AND 100 / rolling month** | Both caps must have room. Identical on every price tier |
| **Expired** | 0 | Can browse, cannot generate |

- Auto-renewing via Apple ID. Converts to paid unless cancelled ≥24 h before the trial ends.
- Cancel path: Settings → [Your Name] → Subscriptions → WinkyPie.
- **A monthly and a six-month subscriber get the same allowance.** Price is the only lever.

**US price points, read off the public listing on 2026-09-01 — internal only:** WinkyPie
Monthly `$19.99`, WinkyPie Half-Year `$44.99`. Other markets unknown. These are for LTV and
CAC maths; they never appear in copy.

🚩 **Never put a dollar figure anywhere off the App Store.** Prices vary by region and change;
the App Store listing is authoritative. Say "free trial" and "cancel anytime", nothing more.
Real prices live in RevenueCat / App Store Connect and are needed for LTV maths, never for copy.

🚩 **The published Terms are out of date.** `/terms` §6 still describes the retired "Winky
Shots" credit model (25/week · 50/month · 300/6 months) and a 5-shot trial, while the landing
FAQ says 3. Shipped limits are more generous than published — the safer direction — but three
public surfaces disagree. Fix `/terms` and the FAQ before running paid traffic; this is the
class of mismatch App Store review and Meta ad review both flag.

🚩 **Drop the term "Winky Shots" from anything new.** The app no longer has a credit currency.
Say "generations" or "photos".

---

## 8. Proof points

Five stats carry a source label and may be used **with the attribution attached**:

| Stat | Claim | Source label |
|---|---|---|
| 2.5/sec | Posts she scrolls past | Social Media · 2025 |
| +38% | Faces beat no-face posts | Image-engagement · 2025 |
| +102% | Forward-facing wins likes | Hinge · 2023 |
| +203% | More messages with full-body | Match · 2024 |
| +200% | Matches with quality photos | Hinge · 2024 |

Three more ship in onboarding with **no source anywhere in either codebase** — barred from
paid creative until traced:

| Stat | Claim | Status |
|---|---|---|
| `<1s` | She decides on a swipe | `[unsourced]` |
| `90%` | Of her decision is your first photo | `[unsourced]` |
| `9×` | More matches with pro shots | `[unsourced]` |

Rules:

- These are **research-backed industry averages, never individual-user promises.** "You will
  get +200% matches" is a different and unsupportable claim.
- Even the sourced five carry only a label, not a link. Trace the primary source before paid
  use — the `/methodology` page meant to hold the citations was never built.
- **`She decided in 100 ms` is a locked tagline with no citation.** It works as a narrative
  device. The moment it is framed as a statistic, it needs a source. Keep it as a line, not a stat.

---

## 9. Voice and messaging

Short sentences. Hard stops. Second person, addressed to a man. Two-beat rhythm: a statement,
then the payoff. Confident, light locker-room. Never cringe, never body-shaming.

| Do | Don't |
|---|---|
| Specifics — "3 taps", "seconds" | Technical jargon — "diffusion model" |
| Second person, product-led | Clickbait — "you WON'T believe" |
| Confident and short | Desperation, emoji spam, exclamation marks |
| "matches", "swipes", "your profile" | "look better", "fix your face", "10x your matches" |

**Emotions to hit:** Awe ("wow, is that me?") → Curiosity → Ease → Empowerment.
**Emotions to avoid:** body insecurity, overwhelm, cheapness, uncanny-valley creep.

Five pillars, weighted:

| # | Pillar | Weight | Core message | Sample headlines |
|---|---|---|---|---|
| 1 | **Transformation** | 40% | One selfie → a photo that stops the scroll | "Same face. New level." · "One selfie. Endless profiles." |
| 2 | **Absurd ease** | 25% | 3 taps, no skill, no gear | "Pick a pose. Mirror it. Done." · "You don't need to know how to pose." |
| 3 | **Savings** | 15% | Photographer quality without photographer prices | "Skip the €300 session. Keep the quality." · "Pro photos. Not pro prices." |
| 4 | **Variety** | 12% | Every scene, every mood | "Street. Café. Golden hour. Night out." · "New week. New pose." |
| 5 | **Trust / quality** | 8% | Real AI, looks like you, safe data | "Not a filter. Real AI." · "It checks your photo before it charges you." |

**Copy formulas:** `Old → New` · `Thing. Thing. Punchline.` · `Pro X. Not pro Y.` ·
`POV: [relatable]` · `Number + benefit`.

**Hashtag core:** `#WinkyPie #AIPhotos #AIPhotography #ProfilePic` + one thematic set, 15–20 max.

*These rules are for outward copy. Internal notes in `brain/` stay plain and technical.*

---

## 10. Brand kit

The values below are canonical. **How they are applied** — the mark, the lockup, the UI
patterns, the store-screenshot system, the ad rules — is in [`BRAND.md`](BRAND.md), which was
audited against the live app, site and listing on 2026-09-01.

**DNA:** Dark Premium Playful — luxury aesthetic, friendly edges, warm not cold.

| Role | Value | Surface |
|---|---|---|
| Background | `#0E0E0E` | both — near-black, always |
| Card / surface | `#141414` / `#1A1A1A` | app |
| Primary (gold) | `#F59E0B` | both |
| **Brand gradient** | **`135deg, #F59E0B → #EC4899`** | both — **the only gradient** |
| Gold accent text | `#D4A84B` (app) / `#F4B942` (web) | ⚠️ unresolved, see §13 |
| Text primary / secondary | `#FFFFFF` / `#8A8A8A` | app |
| Success / warning / error | `#34C759` / `#FF9500` / `#FF453A` | app |

**Typography:** display **Fraunces** (serif, italic accents) · body **Inter** on web and in
ads · **Plus Jakarta Sans** (400/500/700/800) in the app UI.

**Signature typographic move:** every headline has one punch word in italic gradient —
*"She decided in **100 ms**"*, *"Looks pro. **Still you.**"*, *"Be the right **swipe**."*
Carry this into every creative.

**Visual rules:** dark background · warm amber/pink radial glow behind hero elements ·
16–20 px rounded cards · full-round gradient pill CTAs · generous negative space.
**Never** neon, clipart, or cold blue/teal. **Never a second gradient.**

**Implementation note:** never use `transparent` in a gradient — it interpolates through
black. Use `rgba(255,255,255,0)` or `#RRGGBB00`.

---

## 11. What may not be claimed

1. **No invented proof.** No fabricated user counts, testimonials, star ratings or statistics
   — not even as placeholder data. FTC and EU UCPD both enforce this. "Fresh launch — be among
   the first" is fine; "12,000 happy users" is a lawsuit. Show the App Store rating only once
   real ratings exist (planned threshold: 50+ reviews).
2. **Results-vary disclosure** wherever before/after imagery appears:
   *"Demo. Your photos use your actual face and body. Results vary based on selfie quality,
   lighting, and pose."*
3. **Auto-renewal disclosure** at any purchase-adjacent surface: *"Subscription automatically
   renews unless auto-renew is turned off at least 24 hours before the current period ends.
   Manage or cancel in App Store account settings."*
4. **Every percentage traces to a citable source.** Never invent a stat. See §8.
5. **Honest about AI.** "Stylized AI representations, not a filter." Never imply the
   before/after shows a different person. Label AI imagery where a platform requires it.
6. **No dollar figures** off the App Store. See §7.
7. **Men only** in any imagery representing the user.
8. **No pose count** without a live check. See §6.

**Meta specifically — the usual rejection causes for this category:**

- **Personal attributes.** Meta prohibits copy implying knowledge of a person's attributes,
  including relationship status and appearance. Write in the third person about the product.
  ❌ "Still single?" · "Tired of being ignored?" · "Your photos are why you're single"
  ✅ "One selfie → pro photos for your dating profile" · "Photos that get a second look"
- **Before/after imagery** is restricted in appearance-adjacent categories. Prefer
  **"reference pose → result"** framing over "bad me → hot me".
- **Dating-adjacent targeting** carries extra restrictions in some markets. Check per country.
- Budget for rejections on the personal-attributes rule.

---

## 12. Stale claims — do not repeat

Both upstream repos still contain older documents that contradict the above. If you read one
of these, this file wins.

**The live App Store listing is the worst offender**, checked 2026-09-01. It is the surface a
buyer actually reads, and it still carries four stale claims plus one that contradicts the
privacy policy. See `BRAND.md` §12 for the full audit.

| Stale claim | Where it still appears | Reality |
|---|---|---|
| Selfies "deleted from servers within 60 seconds" | **Live App Store description** | 7 days, per `/privacy` and §2. Two public surfaces, two numbers — fix the listing |
| "Winky Shots" credits: 25/week, 50/month, 300/6 months | `/terms` §6, landing FAQ, **live App Store description** (25/50/50) | Quota engine: trial 5 over 3 days · Pro 50/week + 100/month |
| Trial is 3 shots | Landing FAQ | 5 generations. The "3" is the number of *days* |
| "70+ poses" / "101 poses" / "500+ poses" | `WINKYPIE_CONTEXT.md`, landing gallery, **live App Store description — which says both 70+ and 500+** | Backend-managed. Count it live or don't claim it |
| "Upload a selfie, then pick a pose" | `WINKYPIE_CONTEXT.md`, **live App Store description** | Reversed: pick pose → coaching → selfie → free check → generate. The listing omits the free check entirely — the one differentiator |
| "Both men and women, full gender support" | `WINKYPIE_CONTEXT.md` | Men-only catalog; female content flag-hidden |
| 4-step onboarding, "Transform yourself, own the spotlight" | `WINKYPIE_CONTEXT.md` | 3 screens, dating-led, "She decided in 100 ms" |
| Convex `lovely-mosquito-876` | `WINKYPIE_CONTEXT.md` | `glad-spaniel-840` |
| "Android coming" / Play billing | `/terms` | iOS only is what we sell |
| Paywall headline `Pro photos. No photographer.` | **Live app paywall**, site | Primary brand line is `Pro photos. More matches.` since 2026-09-06 (§1). Ship it in the app and on the site; until then the ads and the paywall disagree |
| "~30 seconds to generate" | Repo docs | `[unsourced]` — never timed. See §13 |

`dream-pie`'s `release-checklist/apple-store-connect/WINKYPIE_CONTEXT.md` describes v1 in
full. Ignore that file entirely.

---

## 13. Not yet known

Facts that cannot be read out of either codebase and that block specific claims.

| # | Unknown | Where the answer is | Blocks |
|---|---|---|---|
| 1 | Price points outside the US — US is `$19.99`/mo and `$44.99`/6mo as of 2026-09-01 | RevenueCat + App Store Connect | LTV/CAC maths per market |
| 2 | Current live pose count | Admin panel | Any "N poses" claim |
| 3 | Primary sources for the §8 stats | Research | Any stat in paid creative |
| 4 | Install and conversion baseline. **Ratings: none yet** — the listing showed "not enough ratings" on 2026-09-01 | App Store Connect Analytics | Social proof does not exist yet. Do not plan creative around it |
| 5 | Median generation time — "~30 seconds" was never measured | Amplitude `generation_started` → `generation_completed` | Any speed claim |
| 6 | One gold accent: `#D4A84B` or `#F4B942`. **The web serif is confirmed Fraunces** (`--font-fraunces` in the shipped CSS, 2026-09-01); the app's own config is still unverified, and the store creative uses a third, unnamed face | Design · `BRAND.md` §13 | Brand kit |
| 7 | Geo targeting. The App Store link is `/us/`, page locale `en_US` | Product | Campaign setup |
| 8 | Whether female targeting reopens | Product | Whether creative can be male-coded permanently |
| 9 | Is there a Play listing, or is Android dead? | Product | Terms cleanup, ad copy |
| 10 | Whether **15.1 stays** the floor. The listing says 15.1 (§2), but `dream-pie` pins no `deploymentTarget` in `app.json` and has no `expo-build-properties` override — the floor is whatever Expo SDK 54 defaults to, so an SDK bump can raise it with no signal to advertising | `dream-pie` build + App Store Connect | The Meta minimum-iOS targeting floor, which has to match |

---

## 14. Where the assets live

Neither repo is in this one. Pull what you need, register it in the `app/` asset browser, and
keep the note about *why* it was pulled in the step folder under `brain/process/meta-ads/`
that asked for it.

**`winky-pie-landing-page`**

| Asset | Path | Notes |
|---|---|---|
| Pose gallery | `public/poses-v3/` | 101 images, manifest `lib/poses.ts` |
| Hero before/after pairs | `public/mobile-app/hero/` | 4 pairs (`hero_N_pre` → `hero_N_after`) — **the best raw material for ads** |
| "Bad photo" examples | `public/mobile-app/bad-photos/` | 7 — used in the LIKE/NOPE swipe animation; strong problem-side creative |
| App screen recording | `public/mobile-app/video_1.mp4 / .webm` | selfie capture flow |
| App screenshots | `public/mobile-app/step_1.png`, `step_3.png` | pose library + result screen |
| Logo · OG image | `public/logo.png` · `/opengraph-image` | OG needs a designed replacement |

**`dream-pie`**

| Asset | Path |
|---|---|
| Logo marks (SVG + PNG, adaptive icon) | `assets/` |
| App icon, iPhone 6.9" / iPad 13" store templates (SVG) | `release-checklist/apple-store-connect/przykladowe-grafiki/` |
| App flow + App Store Connect screenshots | `screenshots/` · `release-checklist/apple-store-connect/screenshots/` |
| Full ASO / release checklist (EN+PL) | `release-checklist/APPSTORE.md` |
| Instagram marketing process (reels templates, weekly schedule, kanban) | `_brain/PROCESSES/INSTAGRAM MARKETING/` — **gitignored, copy manually** |
| v2 UX / positioning rationale (PL) | `_brain/PROCESSES/APP_V2_REDESIGN/UX_PLAN_REVIEW.md` — **gitignored, copy manually** |

**Pose imagery is not in the app repo** — it lives in the backend asset store and syncs to
the client. Pull hero creative from the admin panel or from real generations.

⚠️ Every hero pair and pose image is an **AI-generated demo asset**, not a real customer
result. Any use needs the §11.2 disclosure and must never be framed as a testimonial.
