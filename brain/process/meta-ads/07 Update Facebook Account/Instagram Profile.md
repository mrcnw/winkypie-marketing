---
tags: [setup, instagram, audit]
step: 07
status: todo
updated: 2026-09-24
profile: https://www.instagram.com/winkypie.app/
reference: https://www.instagram.com/roast.dating/
---
# Instagram Profile — what to fix, modelled on @roast.dating

Documentation: [[07 Update Facebook Account]] · Checklist: [[07 TODO]]

`@winkypie.app` is the handle every Instagram-placement ad runs under, and the profile a man
taps before he installs. First audited 2026-09-07 through a logged-in browser against
[[ROAST]]'s account — the competitor that matters (`../../../PRODUCT.md` §3) and the only one
in the niche with a profile that works as a landing surface. **Steps 1–6 were all run on
2026-09-24**: the profile carries the name field, the bio, both links and the three pinned
tiles. What is left is 7–10 — highlights, following, the posting rhythm and the DM
automation decision. See *Where we are*. Product facts and claim limits are not repeated here; every fix below stays
inside `PRODUCT.md` §9–§11.

The dashboard renders this note at `/instagram`. Edit it here; the page follows on refresh.

## Where we are — 2026-09-24

Read off the profile on 2026-09-24, after the owner ran steps 1–6. What it replaces — the
2026-09-07 audit that opened this note — is in git history.

| Field | Live value | Verdict |
|---|---|---|
| Name field | `WinkyPie - AI Authentic Dating Photos` | Carries *Dating*, which was the point of renaming it. Two drifts from the block in *New bio*: the words are swapped — *AI Authentic* where *Authentic AI* is what parses — and the separator is a hyphen, not `·`. Cosmetic; fix on the next edit |
| Bio | Four lines, emoji-prefixed. Lines 1–3 are the locked lines from *New bio*; line 4 read *Get more x10 matches.👇* in the 2026-09-24 screenshot | Raised against `PRODUCT.md` §9 and **closed by the owner on 2026-09-24**. Settled, not an open item — do not re-open it from this note. This row is a dated snapshot; the live bio is edited on the profile, which is the only source of truth for what it says today |
| Link | App Store first, `winkypie.app` second | **Step 4 done 2026-09-24.** The store is one tap from the profile, which is the whole point of the link order |
| Picture | The mark on the gradient ring | **Keep.** Reads at 40 px, matches the app icon |
| Posts | 3, all three pinned, posted 2026-09-24 | The whole pitch above the fold — *Pick a pose · Upload a photo · More matches*, reading 1 · 2 · 3 left to right. The 2026-04-24 female-model post is archived |
| Followers / following | 2 / 0 | Step 8 not done. 0 following still reads as a bot account |
| Highlights | None | Step 7 not done. The four are named in *Highlights to build* and their construction is `BRAND.md` §8; none of the covers is designed yet |
| Reels | None — the tab does not appear | Reels are the only reach lever an account with 2 followers has |

## The model — what @roast.dating does

185 posts, 8.6k followers, 69 following on 2026-09-07. Their profile is built to catch a
search and turn a tap into a DM. Element by element, and what we take from each:

| Element | @roast.dating | For us |
|---|---|---|
| Name field | `ROAST - Best Dating Profile Review` — the category keyword in the searchable field | `WinkyPie · Authentic AI Dating Photos` |
| Bio | Three lines, one repeated glyph (⚡️): what it is → why follow → a CTA ending in 👇 | Four lines that already exist — the primary line, the live paywall line, the product-truth line, the trial. One 👇 |
| Links | Site + Threads | App Store first, site second |
| Highlights | Photoshoot · FAQs · Testimonials · Tips — four, flat brand-colour covers on black | How it works · Photo check · Poses · FAQ. **No Testimonials** until real reviews exist (`BRAND.md` §11) |
| Grid | Almost every tile a 9:16 Reel. The same header line sits on top of every reel — *"If only there was a page dedicated to getting you more dates…"* — with one word in brand green. Every fourth tile is a text card: black, one sentence, one highlighted word | The same two devices, in our kit: one fixed header line on every reel with the punch word in the gradient, and text cards made of the locked lines (*Looks pro. **Still you.***) |
| Content | Street interviews, skits, single-life humour — mostly other people's clips — and tips carousels on bios and texting | Our own material only: the host clips from [[04.1 Outsource The Shoot]], the campaign statics from [[03 Choose Videos And Five Campaigns]], the store screens. Organic reuses what paid proved; it does not get its own content strategy |
| Caption | *"Comment ROAST to get started"* at the top and the bottom, a long body, three hashtags | The comment keyword only once a DM automation answers it. Until then: *Link in bio.* Hashtag core from `PRODUCT.md` §9 plus one thematic set |
| Following | 69 accounts | Follow ~50 in the niche — competitors, dating coaches, photographers — so the account stops looking automated |

## Do not copy

- **"10x your dates."** A multiplier is the claim `PRODUCT.md` §11 bans. Our line stops at *More matches.*
- **"600,000+ users"** and a **Testimonials** highlight. We have no ratings and no user count to show. Guardrail 2 — not even as a placeholder.
- **Women and couples in the grid.** Guardrail 1. Every face on our profile is a man.
- **"You're not ugly" / blaming the viewer for being single.** Off-voice, and the personal-attributes rule the moment a post is boosted.
- **Reposted clips of strangers.** Rights. Our clips are licensed through the 04.1 shoot order.
- **A comment-keyword CTA with nothing behind it.** Bait without a reply loses the follower it just won.

## New bio

Name field (64-character limit):

```
WinkyPie · Authentic AI Dating Photos
```

Bio (150-character limit — this is 125). Every line is a locked line or live app copy from
`PRODUCT.md` §1; nothing is paraphrased:

```
Authentic pro photos. More matches.
One selfie. AI does the rest.
Looks pro. Still you.
Free trial on iOS, cancel anytime 👇
```

Links, in this order:

1. `https://apps.apple.com/us/app/winkypie-ai-dating-photos/id6757441777` — title *Download on the App Store*
2. `https://winkypie.app` — title *winkypie.app*

Shorter name if the long one wraps on a phone: `WinkyPie · AI Dating Photos`. Keep *Authentic*
if it fits — it answers the buyer's first blocker (`PRODUCT.md` §3) and it is not a claim.

## Highlights to build

Four covers: near-black, one gradient glyph, one word under it. Same construction as the
store-screenshot captions (`BRAND.md` §8).

| Highlight | Stories inside | Source |
|---|---|---|
| How it works | Pick a pose or upload → mirror the pose → your photo. Three stories | Store slots 2, 3 and 5 |
| Photo check | The free pre-flight: pass / warn / block, and *"It checks your selfie before it charges you."* | Store slot 4, an in-app capture |
| Poses | One story per scene collection — seven — no count anywhere | The catalog snapshot in `app/public/assets/winkypie/poses/` |
| FAQ | 3 days free, cancel anytime · selfie deleted within 7 days, never used for training · iOS · *not a filter* | `PRODUCT.md` §2, §7, §11 |

A *Results* highlight comes later and only with the §11.2 disclosure on every story.

## Pinned tiles — built 2026-09-08

Three 4:5 tiles, one per step of the shipped flow, in the order the app runs it — the Cal AI
*Scan · Track · Improve* device, in our kit. Files and paste-ready captions live in
`app/public/assets/winkypie/instagram/pinned/`; the `.txt` beside each tile is its caption,
and `/instagram` shows them with a copy button.

| Tile | Word on the frame | Screen shown | File |
|---|---|---|---|
| 1 | *1. Pick a pose.* | The poses grid — City & Street, Café & Drinks. Men only, no count anywhere | `WP_IG_PIN1_pickapose_4x5_v1.png` |
| 2 | *2. Upload a photo.* | The reference pose over the selfie, the free check's green tick and its match % | `WP_IG_PIN2_uploadaphoto_4x5_v1.png` |
| 3 | *3. More matches.* | The result, with *pose used* and *photo used* under it | `WP_IG_PIN3_morematches_4x5_v1.png` |

- **Words.** The owner's set, 2026-09-08: *Pick · Upload · More matches*. *More matches* is the second half of the primary line, so it needs no source. The multiplier version (*x10 matches*) was dropped — it is the claim `PRODUCT.md` §9 and §11 ban, and the 9× in onboarding is `[unsourced]`.
- **Order.** Post all three the same day and pin them in reverse — tile 3 first, then 2, then 1 — because Instagram puts the most recently pinned post first. Check the row after pinning; it should read 1 · 2 · 3 left to right.
- **Tile 3 is a result frame.** Its caption carries the §11.2 disclosure and the post gets Instagram's AI label. The frame itself has no disclosure line yet — add it in the source file (bottom, under the word, small) before the tile is ever boosted; on the organic grid the caption is the disclosure.
- **Captions.** Two beats, *Link in bio.*, the hashtag core, the collection tag of the pose shown. Tiles 2 and 3 show a poolside pose — `#goldenhour` is a guess until the collection is checked in the admin panel.

## Grid rhythm

- **The week is in [[Posts Calendar]]:** Monday pose → result, Wednesday education — two posts, fixed days, nothing else. Every second Wednesday is a text card, the other a ten-slide carousel in the [[Static Post Format]] shape. UGC and its Friday slot were dropped 2026-09-24: the 04.1 host clips never landed and `creatives/ugc/` does not exist.
- **One header line on every reel**, top 12 % of the frame: `Authentic pro photos. More matches.` in Fraunces, *matches* italic in the gradient. Roast's header is what makes their grid read as one page; ours does the same job with the brand line.
- **Text cards:** black, one locked line, the punch word in the gradient. The first three: *Looks pro. Still you.* · *She decided in 100 ms.* · *Be the right swipe.*
- **Pin three:** the tiles in *Pinned tiles* above — *Pick a pose · Upload a photo · More matches*. That is the whole pitch above the fold.
- **Caption:** two beats, then *Link in bio.*, then the hashtags. **Instagram capped hashtags at 5 per post on 2025-12-18**, so the old 15–20 in `PRODUCT.md` §9 cannot be followed and that section still has to be rewritten. No stat without its source label.
- **Every result shown carries the disclosure** — *"Demo. Your photos use your actual face and body. Results vary based on selfie quality, lighting, and pose."*

## Do this, in order

1. **Archive the pinned post.** A woman as the result, the reversed flow, "shots" — three rules broken in one tile. Same day, before anything else.
2. **Rename the name field** to `WinkyPie · Authentic AI Dating Photos`.
3. **Replace the bio** with the four-line block above, pasted as-is.
4. **Set the links:** App Store first with the title *Download on the App Store*, `winkypie.app` second.
5. **Check the account type.** Professional account, category *App page*, so insights and the contact button exist. Confirm it is the account linked to the Page in [[Account Setup]].
6. **Post the three tiles and pin them** — *Pick a pose · Upload a photo · More matches*, built 2026-09-08, files and captions under *Pinned tiles*. All three the same day, pinned in reverse order. Tile 3 gets the AI label and the disclosure in its caption.
7. **Build the four highlights** — How it works, Photo check, Poses, FAQ — with brand covers.
8. **Follow ~50 accounts** in the niche.
9. **Start the rhythm** from [[Posts Calendar]]: Monday pose → result, Wednesday education, every reel with the header line. UGC and the Friday slot were dropped 2026-09-24. Source: the paid creative that runs, nothing made only for organic.
10. **Decide on the comment-keyword DM automation** before writing *Comment POSE* in any caption. It needs a tool and a reply script; until it exists, *Link in bio.*
