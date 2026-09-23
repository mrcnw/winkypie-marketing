---
tags: [setup, instagram, teardown]
step: 07
status: doing
updated: 2026-09-23
reference: https://www.instagram.com/roast.dating/
---
# Static Post Format — the text-card carousel, taken apart

How `@roast.dating` builds a static post, and the version of it we run. Read live on
2026-09-08 through a logged-in browser: 84 grid tiles walked, 28 of them static, ten of those
opened slide by slide. The profile audit is [[Instagram Profile]]; the posting plan is
[[Posts Calendar]]; the posts themselves live in `posts/`.

**The format is worth copying. Their results are not evidence.** Product facts and claim
limits are not repeated here — every line below stays inside `PRODUCT.md` §8–§11.

## What they actually do

| Element | @roast.dating, 2026-09-08 |
|---|---|
| Ratio | 4:5, near-black `#1A1A1A` ground, no photography on most slides |
| Slide 1 | 3–5 words per line, centred, ~4 lines. **One word or number in a green box**, black text inside it. Sometimes a circular photo with a green ring under the type |
| Slides 2–N | Left-aligned, three beats separated by blank lines: **the claim.** → **the detail or a question.** → **the fix.** Two lines per beat, never more |
| Length | 6–11 slides. Ten is the mode |
| Last slide | **Nothing.** The carousel stops on the last tip — no CTA, no link, no next step |
| Caption | **The same 300-word block on every post**, copy-pasted since at least 2025-04. Opens and closes on *"Comment 'ROAST' to get started."*, carries *"600,000+ users"*, ends `#dating #datingapps #ai` |
| Comments | Nothing from the account. The replies are one word — people typing `ROAST` at the keyword |
| Quote cards | A second static shape: a fake tweet — avatar, handle, two sentences, two highlighted words (one green, one purple) |

**Engagement, read off ten posts:** 2 · 4 · 5 · 6 · 7 · 8 · 12 · 14 · 16 · 41 likes, 0–13
comments, against 8,655 followers. Their statics are a **0.05–0.5 % engagement** floor; the
reels are the account. Take the construction, do not take the numbers as proof the topic won.

## What we take

- **The three-beat slide.** Claim → detail → fix. It is the same two-beat voice `PRODUCT.md` §9 asks for, with the fix bolted on. It reads sound-off in under two seconds.
- **One highlighted word per slide.** Theirs is a green box. **Ours is the brand move** — the punch word in italic gradient (`BRAND.md` §4). Never a green box, never a second gradient (guardrail 4).
- **A number in the hook.** *7 rules*, *3 signs*, *6 photos*. It promises the length and earns the swipe.
- **Text-only slides.** No photo means no likeness question, no `PRODUCT.md` §11.2 disclosure, and a slide costs minutes to make.
- **Slide 1 is the grid tile.** It is judged at 160 px next to two neighbours. Four lines maximum, no body copy.

## What we fix

| Their weakness | Ours |
|---|---|
| No CTA slide — the carousel ends on a tip | **Last slide is the ask:** the brand line, *3 days free, cancel anytime*, *Link in bio.* |
| One boilerplate caption on 185 posts | A caption written for the post. Two beats, then the ask, then the tags (`PRODUCT.md` §9) |
| Numbers with no source (*600,000+ users*) | **Every number carries its `PRODUCT.md` §8 label on the slide, and the full source list goes in the first comment.** A number without a source does not ship (root `CLAUDE.md`, guardrail 2) |
| *Comment "ROAST"* with nothing behind it | No comment keyword until a DM automation answers it ([[Instagram Profile]], step 10). Until then the first comment is the sources and one open question |
| Second person about his dating life | Third person about the product, second person only about the photo (`PRODUCT.md` §11) |

## Our spec

**Naming.** `WP_IG_<PILLAR><n>_<slug>_4x5_v<v>` — the organic lane, parallel to the ad
convention in [[Creative Naming]] but never mixed with it. `PILLAR` is `PIN` · `EDU` · `RES`
· `CARD`, matching [[Posts Calendar]]. Slides get `_s01`…`_s10`. The `.txt` beside slide 1 is
the caption, pasted as-is; `.comment.txt` is the first comment.

| Field | Value |
|---|---|
| Canvas | 1080 × 1350 (4:5) |
| Ground | `#0E0E0E`, one amber/pink radial bloom bottom-left at 12 % opacity |
| Hook type | Fraunces 96–120 px, line-height 1.05, centred, punch word italic in `135deg, #F59E0B → #EC4899` |
| Body type | Inter 46 px / 1.35, `#FFFFFF`; the fix beat in `#8A8A8A` |
| Source label | Inter 26 px, `#8A8A8A`, directly under the number it belongs to |
| Margins | 96 px, type block in the middle third |
| Slide count | 10. Hook · 7 beats · one product slide · one CTA |
| Footer | `@winkypie.app` bottom-left, 26 px, `#8A8A8A`, every slide but the hook |

**Upload file.** The canvas above is the master; it is not the file that goes to Instagram.
Instagram serves a feed photo at 1080 px wide and re-encodes anything bigger with its own
downscaler, which bands the near-black ground and smears the gradient hook. So a tile ships as
**1080 × 1350 sRGB JPEG, no alpha channel, 4:4:4 chroma, quality 95** — roughly 250–330 KB,
far under the 8 MB ceiling. 4:4:4 is the part worth remembering: JPEG's default 4:2:0 throws
away three quarters of the colour detail, which is exactly the saturated amber/pink type on
near-black this format is made of. Measured on `WP_IG_PIN1`, 4:4:4 scores 46.1 dB against the
lossless reference where 4:2:0 scores 40.9.

The master stays in `app/public/assets/winkypie/instagram/<lane>/` as a PNG at whatever size
it was drawn; `npm run ig` in `app/` writes the upload file to `<lane>/upload/<stem>.jpg` and
`/instagram` hands that one over on the download button. Nobody exports these by hand — a
tile re-cut in the design tool is re-exported by re-running the command.

**Before it posts:** men only · no invented proof · no dollar figure · one gradient · AI
described honestly · no pose count · the §11.2 disclosure on any frame showing a result.
That is the same QA gate the ads pass through — root `CLAUDE.md`.
