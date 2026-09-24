---
tags: [brief, strategy]
campaign: WP_P2_PORTFOLIO_oneselfie
persona: P2 Grinder
format: PORTFOLIO — results full-frame, narrator as a corner inset
variable: "proof density — the finished photos are the ad"
order: 7
cta: Install now
updated: 2026-09-22
---
# Brief — WP_P2_PORTFOLIO_oneselfie

**Single variable tested:** whether a wall of finished results outsells an explanation. Every
other creative in the round-one set narrates a mechanism and reveals one photo at the end;
this one shows thirteen photos and never opens the app. Hook, closer, brand line and end card
are the set's locked ones, so the read is the format.

**Evidence:** [[Reface Male Portfolio Cut 2026-09-08]] — the male cut of a creative the same
advertiser posted twice on 2026-08-28, twelve seconds apart, once with a woman and once with
a man. 32 s, 13 finished portraits of one man, a narrator in a corner box, no UI, no
before/after, and a persistent AI-generated-content line on every frame. The female cut of the
same shape is at 121k views ([[Reface Studio Portrait Reel 2026-09-08]]). It is the only
format in the swipe file whose assets we already own: the results *are* WinkyPie's output.
Persona is P2 — the grinder has optimised everything else and wants to see the goods, and the
split moves to 3×P2 / 2×P1 / 2×P3 (step doc §2 allows the adjustment once there is a reason).

## Hook (plate + spoken, 0.0–1.5 s)

> One selfie in. A profile's worth out.

Seven words, legible over the first portrait with the sound off. Spoken in full: *"One selfie
in. A profile's worth of photos out."* No number — the count of results is backend-managed
and changes without a release (guardrail 7), and the wall shows the volume without anyone
stating it. "Profile" carries the dating context every winner in the niche puts in its first
line ([[Hooks And Angles]], 2026-09-06 revision). Nothing is claimed about the viewer.

## Beat sheet (22.2 s: an 18.2 s wall + 2 s of the host full frame + a 2 s end card, 9:16)

Built 2026-09-08. The composition is the variable. The host sits in a rounded inset,
bottom-left, ~25 % of frame height — **but only for the first ten seconds.** From 10.0 s his
voice keeps going and he leaves the frame entirely, so the middle of the ad is nothing but
results. He returns full frame for the closer. The app is never on screen.

| Time | Full frame | Host / voice |
|---|---|---|
| 0.0–2.1 | Result 1 | inset · "One selfie in." |
| 2.1–5.5 | **The source selfie**, held 3.4 s | inset · "This one. Same face, same build," |
| 5.5–7.0 | Result 2 | inset · "same shirt you had on." |
| 7.0–8.2 | Result 3 | inset · "Pick a pose from the collection," |
| 8.2–10.0 | The custom-pose result | inset · "or upload your own pose." |
| 10.0–18.2 | Eight results, ~1.0 s each | **gone from frame** · "Nobody booked a photographer. Nobody hired a studio. Authentic pro photos. More matches." |
| 18.2–20.2 | The host, full frame | to camera · "Be the right swipe." |
| 20.2–22.2 | End card | "Try it yourself." + the AI line + App Store badge |

Twelve results plus the source selfie. The middle section runs at about a second a frame —
fast, and the place a music bed would earn its keep if one is ever licensed.

## On-screen copy

- Hook plate: **One selfie in. A profile's worth out.**
- Caption plates: black text on a white rounded box, bottom band, one phrase at a time,
  anchored to the real Whisper word timings.
- Persistent, small, bottom right: **`*AI Creator`**
- End card: **Authentic pro photos. More matches.** · **Be the right swipe.** ·
  **Try it yourself.** · App Store badge · **This ad contains AI-Generated Content**

**Disclosure deviation, owner's decision 2026-09-08.** The §11.2 results-vary line and the
"AI-generated presenter. Not a real customer." line were both removed from the frames; the
watermark and the end-card line replace them. That is narrower than PRODUCT.md §11.2,
BRAND.md ("ships with the §11.2 disclosure or it does not ship") and Lane B rule 5 in
[[Production Guardrails]]. Recorded, not normalised: nothing on the frames now says the man
talking does not exist, and the AI line rides two seconds of twenty-two.

## Primary text

> One selfie goes in. A set of photos for a dating profile comes back — different places,
> different light. Same face, same build. No photographer, no shoot day. WinkyPie starts from
> a pose, coaches the selfie, then renders it. Looks pro. Still you.

Headline: **One selfie in. A profile's worth out.** · Description: **Authentic pro photos.
More matches.**

**The scene list came out 2026-09-22.** It used to name four of §6's seven collections —
"Street, café, studio, night out". Nothing in it was false, and that is not why it went:
**the collections are admin-managed and sync live from the backend** (§6), so an ad that
names them can stop being true without anyone touching the ad. It is the same reasoning that
forbids a pose count, applied to the names instead of the number. "Different places, different
light" says the range and stays true whatever ships next. [[WP_P2_STATIC_oneselfie]] carries
the identical line — that is the point of it, so the two move together or the format test
stops meaning anything.

## To produce

**The assets are thirteen real WinkyPie results of one man, from one session, plus his source
selfie.** That is the whole shoot. No location, no creator, no b-roll.

Two lanes for the narrator, and the script is identical in both because it is third person
throughout — nobody says "I", "my" or "me" as a user:

- **Lane B (default, now):** the host clip from [[Host Scripts]] S7, generated on the existing
  seed, then scaled to a corner inset in post. Reuses the host already paid for; the results
  behind him are stills we composite locally. Carries the presenter disclosure.
- **Lane A (better, when it is free):** the creator booked for [[WP_P1_UGC_coached]] and
  [[WP_P3_UGC_triedthemall]] reads the same lines in the same session — one extra setup, no
  extra travel, and the presenter disclosure disappears because he is real. Add it to
  [[Shoot Order]] rather than ordering it on its own.

## Guardrail check (§11)

Men only, one man, no female frame anywhere ✓ · no number spoken or written, no result count,
no pose count ✓ · no before/after — the source selfie appears once, alone, never side by side
with a result ✓ · nothing about the viewer's dating status, no appearance claim ✓ · no price,
no trial line ✓ · no competitor named or shown ✓ · "same face, same build", never "better" ✓ ·
no bare-torso or physique frames ✓ · **§11.2 not on the frames — see the deviation recorded
under On-screen copy.**

## Production flags

1. **The man is synthetic, so there is no release to get.** He was generated by the owner
   (confirmed 2026-09-08), and the twelve results are genuine WinkyPie renders made from his
   selfie. That is what makes the wall honest: the app really produced those frames. It also
   permanently rules out the first person — a generated face saying "I uploaded one selfie"
   is a fabricated testimonial by a person who does not exist, 16 CFR 465, the row already in
   [[Production Guardrails]]. Every line stays third person or about the viewer's own photo.
2. **The wall is never generated elsewhere.** Higgsfield could render the same man in the same
   places, and it must not: the ad's claim is that the app returned these from one selfie.
   Images made anywhere else are invented proof (§11.1). More frames means another WinkyPie
   session, never another platform.
3. **One man across all twelve frames**, or "same face, same build" collapses and it reads as
   a stock gallery.
4. **The source selfie must not be a visible self-photograph.** Meta's dating policy bans a
   person visibly photographing themselves. The one in use is a front-camera shot with no
   phone in frame ✓.
5. **The results in hand are 768×1024.** They arrived downscaled, so the 1080×1920 frame
   upscales them ~1.9× and crops 25 % of the width — soft, and monuments and palms lose their
   edges. Fine for an animatic; **get the originals before this is ever bought.**
6. **Wardrobe range is doing the variety work, and there isn't any** — the same grey shirt is
   in every frame. The script turns that into the proof ("same shirt you had on") rather than
   hiding it, but a second outfit in a future session would widen the format.

## Do this, in order

1. Read [[Reface Male Portfolio Cut 2026-09-08]] — the beat rhythm and the inset size are
   measured there. Take the composition, not the copy.
2. One WinkyPie session, one man: the source selfie plus results across as many registers as
   the catalog offers. Keep the originals at full resolution.
3. Sequence them so no two neighbours share a register — indoor against outdoor, day against
   night, sitting against standing. The order lives in the build script, not the file names.
4. Narrator: Lane B — [[Host Scripts]] S7 on the existing seed, Seedance 2.0 Mini at 480p.
   The host ends up a 25 % inset, so 480p is the final quality, not a test compromise. Two
   clips, ~22 credits.
5. Composite locally: the wall with a slow 1.00→1.06 push and 0.15 s crossfades, the host
   scaled into the bottom-left inset for the first ten seconds only, caption plates from the
   real Whisper word timings, the watermark, then the end card. **This ffmpeg build has no
   `drawtext`, `subtitles` or `ass`** — plates are rendered in PIL and laid on with `overlay`,
   and rounded corners come from `alphamerge`. Recipe in [[Host Run 2026-09-08 S7]].
6. QA against the beat sheet: hook legible sound-off inside 1.5 s, no "I / my / me", no
   number, no UI, no before/after pairing, disclosures inside the safe zone.
7. Export 9:16, then 4:5 and 1:1 — the inset moves to the bottom-left of the new crop, it does
   not get cropped off. Name `WP_P2_PORTFOLIO_oneselfie_<ratio>_v<n>` per [[Creative Naming]].
8. Register in the app's asset browser; hand to [[08 Launch The Ad]] with the hypothesis line
   written before spend. The ad set is eight creatives against Meta's six — decide here which
   two wait for wave two.
