---
tags: [research, swipe]
updated: 2026-09-25
---
# Reface — the cutout wall, "who my photographer was" (2026-09-24)

The third file from this advertiser and the newest thing they are running: **26 seconds, 22
black-and-white studio portraits of one woman at one a second, and a background-removed
cutout of that same woman standing in the bottom-right corner talking over them.** Same page,
same house mix, same end card as [[Reface Studio Portrait Reel 2026-09-08]] and
[[Reface Male Portfolio Cut 2026-09-08]] — but the narrator is no longer in a rounded box, the
captions are one-word karaoke in a white pill, and **the whole script is a first-person
testimonial from a person who does not exist.** That last part is the reason this note exists:
the shape is worth taking and the mechanism is illegal for us.

Swiped for the shape, not the casting — the subject is a woman throughout, which
PRODUCT.md §11.7 forbids us. Method: [[Swipe Method]] § Single-ad teardown.

Files: `reel.mp4`, `reel.info.json`, `transcript.srt`, per-second frames. The frames are in
`app/public/assets/winkypie/teardowns/Reface Cutout Wall Reel 2026-09-25/`; the master is not
committed (raw footage stays out of git, `app/CLAUDE.md`).

## Facts

| Field | Value |
|---|---|
| Link | [facebook.com/reel/1005452749222353](https://www.facebook.com/reel/1005452749222353) |
| Page | "Reface: Generate Infinite Versions of Yourself" — `61580363348437`. The same page as the 2026-08-28 studio-portrait cut |
| Posted | 2026-09-24 (timestamp 1790272401) — **one day old at read time**, 2026-09-25 |
| Post copy | Title "TRY NOW 🔥🔥🔥" · description "Make Your Photos Look Professional! 🔥🔥🔥" — byte-identical to the 2026-08-28 cut |
| File | 9:16, 1080×1920, **AV1** 30 fps, AAC 48 kHz stereo, 0:26.005, 4.3 MB |
| Views | 149,631 at read time |
| Composition | Full frame is one finished B&W portrait, replaced every **~1.02 s** (21 cuts, `scdet=threshold=6`). The narrator is a **keyed cutout with no box or border**, bottom-right, ~48 % of frame height, cropped by the bottom edge |
| Captions | **One word at a time**, black bold grotesk in a white rounded pill. Measured on the 0:03 frame: pill 272–383 × 1188–1297 px, i.e. left edge at 0.252 W, **0.62–0.68 H** — two-thirds down, left of centre, not at the bottom |
| Disclosure | **End card only:** footer "This ad\`s content is created with AI". No persistent line and no watermark on any of the 22 result frames — narrower than the male cut, which carried a line on every frame |
| Loudness | −14.2 LUFS integrated, LRA 3.2 LU — the same delivery target as both 2026-09-08 cuts |

**Same caveat as the other two.** This is a reel URL, not an Ad Library entry: no library ID,
no start date, no variant count, no EU reach panel. The view count is not spend. Before this
shape is briefed against a budget, find the page in the Ad Library
(`view_all_page_id=61580363348437`) and read age and variants there.

## Structure

Cuts measured with `scdet=threshold=6`, speech from `whisper-cli` (`small.en`), fades from
frame luminance sampled at 0.3 s.

| Time | Full frame | Cutout + caption |
|---|---|---|
| 0.00–0.73 | Portrait 1 — seated, white ground, full length | Cutout and caption present **from frame one**. "Posted" |
| 0.73–6.70 | Portraits 2–7, ~1.0 s each — close-up laughing, hand-on-face, blazer seated, black dress | "…and got **50 plus** comments asking who my photographer was" |
| 6.70–12.40 | Portraits 8–13 — shirt-and-tie, glasses, backlit standing | "The truth. No photographer, no studio, just this app and one photo from my phone." |
| 12.40–18.13 | Portraits 14–18 — arm-up, white suit, turtleneck, shadow-play | "My sister-in-law immediately asked for the link. She couldn't believe these were AI-generated." |
| 18.13–19.17 | Portrait 19 — lilies | Speech ends 18.80. **Cutout and caption cross-fade out together over ~0.5 s**, gone by 19.0 |
| 19.17–22.00 | Portraits 20–22, ~1.0 s each | **Nothing. The wall runs alone for the last three shots** — no face, no words, bed only |
| 22.00–22.60 | Fade to black over ~0.6 s | — |
| 22.60–26.00 | **End card**: black, "TRY IT / YOURSELF" in heavy condensed caps, three animated chevrons pointing down, footer "This ad\`s content is created with AI" | — |

**Three structural facts worth carrying.** The cutout is in from frame one, not introduced.
The wall gets the last three seconds of moving picture to itself. And the end card is 13 % of
the runtime — 3.4 s of a 26 s ad, which is where the whole CTA lives.

## Mechanism (the three lines)

- **First 1.5 s:** a finished studio portrait is already full-frame before a word is said, and
  the woman talking in the corner is visibly the same face. The claim is made by the picture;
  the voice only explains it. Works with sound off.
- **Tension:** twenty-two portraits go past at one a second while the voice says none of them
  cost anything. The volume *is* the argument — no single photo has to carry it, and the
  viewer stops asking whether one is retouched and starts asking how there are so many.
- **Asked to believe:** one phone photo buys a portfolio a studio would charge for, and the
  people around you cannot tell. The sister-in-law is there to certify the second half.

## Transcript

Whisper `small.en`; the burned karaoke words corroborate the wording, so this is not a guess.
Punctuation is inferred.

> Posted these portraits on Facebook and got 50 plus comments asking who my photographer was.
> The truth. No photographer, no studio, just this app and one photo from my phone. My
> sister-in-law immediately asked for the link. She couldn't believe these were AI-generated.

**Forty-one words in 18.8 s — 2.2 words per second**, the slow end of the band our own scripts
use. Then 7.2 s with nothing said at all.

## Mix

Measured with `ebur128` and `volumedetect`, 2026-09-25.

- **−14.2 LUFS integrated, LRA 3.2 LU.** Third cut from this house at exactly that target.
- Speech section (0–18.8 s) means −16.8 dB, peaks −0.8 dB. The last 7.2 s — wall alone plus
  end card — means −22.1 to −22.6 dB and peaks −9.4 dB, so **there is a bed under the whole
  thing, about 6 dB down, and it carries the silent tail rather than the ad going quiet.**
- **Readable silent.** The portraits and the end card say everything; the voice adds only the
  proof story, which is the part we cannot use anyway.

## Our version

**The format is the best-evidenced thing in the swipe folder and we still have not shipped it.
The script is the single most disqualifying thing we have torn down.** Those are separate
findings and they need separate handling.

**What ports:**

1. **The keyed cutout instead of a rounded inset.** No box, no border, no rounded corner — the
   presenter stands *in* the frame, cropped by the bottom edge. It reads as one picture rather
   than as a video with a picture-in-picture, and it costs us nothing: actor 04 is already on
   a chroma-key green screen and the keying recipe is written down ([[Host Run 2026-09-09 Listicle]]).
   This is the fourth competitor cut we have measured using narrator-over-results and the first
   that shows the corner box is optional.
2. **~1.0 s per result.** Matches the ~1.07 s measured on the male cut. Two independent cuts
   from the same house at the same cadence is a number worth trusting.
3. **The narrator leaving before the end.** They drop the presenter at 72 % and let the wall
   run alone into the end card. [[Host Scripts]] S7 already does this at 45 % — the same move,
   and now there is a second measurement of it.
4. **A 3.4 s end card carrying the entire CTA**, with an animated down-chevron doing the work
   a button would. Ours points at a real App Store listing, so the card is honest here in a way
   it is not for them (§11.6).
5. **The two-thirds caption position is worth *testing*, not adopting.** Theirs sits at
   0.62–0.68 H — clear of Meta's Reels bottom UI band without being mid-face. Our standing rule
   is bottom, black on white (owner, 2026-09-08). The colour scheme is the same; only the
   height differs, and theirs is the safer one against the 35 % band. Raise it as a question,
   do not silently move it.

**What has to change before anything ships:**

- **The entire script is a fabricated testimonial spoken by a generated person.** "Posted these
  portraits… got 50 plus comments", "my sister-in-law asked for the link" — a person who does
  not exist, presented as an actual consumer, reporting results. That is 16 CFR 465 outright
  and PRODUCT.md §11.1 twice over. [[Production Guardrails]] Lane B rule 1 already bans it:
  our presenter is a host, never a user, and never first person about experience. **Nothing in
  this transcript can be softened into usability — it has to be replaced.**
- **"50 plus comments" is an invented statistic.** §11.4 and guardrail 2. Our scripts carry no
  number except the locked ones.
- **No disclosure on 22 generated portraits.** They put one line on the end card and nothing on
  the frames. §11.2 wants the results-vary line wherever generated imagery appears, and Lane B
  rule 5 wants the presenter line from frame one. Both go on ours.
- **Men only.** §11.7. The wall is actor 01's twelve results in
  `app/public/assets/winkypie/before-after/`; the presenter is actor 04.
- **The presenter must not be the man on the wall.** Theirs is deliberately the same person —
  that is how the testimonial works. Ours cannot be, because a generated face has no bona fide
  use to claim. Host in the corner, demo man on the wall, third person throughout.
- **Colour, not black-and-white.** Their wall is monochrome studio; ours is twelve colour
  environmental shots. Do not grade ours to match — the environments are the differentiator and
  B&W would throw them away.

**Recommended:** brief this as **three hooks on one fixed cutout-wall format**, scripts in
[[Cutout Wall Scripts 2026-09-25]]. Format constant, hook the only variable — the rubric's
Single criterion, and the layout question is answered by four competitor cuts rather than by us.

## Scored for us — the [[02 How To Find A Good Ad]] rubric

| | Sp | Si | Ho | Sn | |
|---|---|---|---|---|---|
| **Keyed cutout over a full-frame wall**, ~1.0 s per result | ✗ | ✓ | ✓ | ✓ | Format, not a hook. **Take it** — fourth measurement of the layout, first with no box, and actor 04 is already on green |
| **Narrator leaves before the end**, wall runs alone into the card | ✗ | ✓ | ✓ | ✓ | Take it. Second independent measurement; S7 already guessed it right |
| 3.4 s end card, animated chevron, no button | ✗ | ✓ | ✓ | ✓ | Take it. Honest for us — we have a real listing to point at |
| Caption pill at 0.62–0.68 H instead of the bottom | ✗ | ✓ | ✓ | ✓ | **Question, not a decision.** Safer against Meta's Reels band; collides with the owner's bottom rule |
| "No photographer, no studio, just one photo from my phone" | ✓ | ✗ | ✓ | ✓ | **The one line worth keeping** — third person, it is the locked support line's own content. Becomes hook K1 |
| "Posted these… got 50 plus comments asking who my photographer was" | ✓ | ✗ | ✗ | ✓ | **Never.** Fabricated testimonial plus an invented number, from a face that does not exist |
| "My sister-in-law immediately asked for the link" | ✓ | ✗ | ✗ | ✓ | Never — same reason. This is the mechanism, so the mechanism does not port |
| No disclosure on the generated portraits | ✗ | ✓ | ✗ | ✓ | Never. §11.2 on every result frame, presenter line from frame one |
