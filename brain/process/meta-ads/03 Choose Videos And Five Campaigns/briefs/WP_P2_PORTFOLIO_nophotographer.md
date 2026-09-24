---
tags: [brief, strategy]
campaign: WP_P2_PORTFOLIO_nophotographer
persona: P2 Grinder
format: PORTFOLIO — results full frame, keyed presenter bottom-right, one-word captions
variable: ease and cost, said out loud over our own results
status: candidate — the only render is an internal 480p test, not cleared for upload
order: 14
cta: Install now
updated: 2026-09-25
---
# Brief — WP_P2_PORTFOLIO_nophotographer

**Single variable tested:** whether **ease and cost** carry the ad when a keyed presenter says
them over our own results, instead of a text plate making the same point. K1 of the cutout-wall
set — the format is torn down in [[Reface Cutout Wall Reel 2026-09-25]], the script is specified
in [[Cutout Wall Scripts 2026-09-25]], and the build is recorded in
[[Host Run 2026-09-25 Cutout Wall]].

**This brief exists because a rendered file had no brief.** `v1` was delivered on 2026-09-25 and
sat in `creatives/ugc/` with nothing declaring its Meta fields, so the Campaigns tab drew it with
*Missing CTA* and the destination coming only from the PRODUCT.md fallback. The button is now
declared here. **Nothing else about this creative is approved** — the render is the internal test,
and the copy fields are not written yet.

## What exists today

| | |
|---|---|
| Render | `app/public/assets/winkypie/creatives/ugc/WP_P2_PORTFOLIO_nophotographer_9x16_v1.mp4` — 9:16, 18.9 s: 15.1 s of wall plus a 3.8 s end card |
| Clip | Seedance 2.0 Mini, 480p, `generate_audio: true` — **the test tier.** A paid run needs the 1080p pass |
| Cleared | **No.** The sidecar says *internal test render, not cleared for upload* |
| Built | 2026-09-25 — [[Host Run 2026-09-25 Cutout Wall]] |

## Hook (verbatim, spoken, first 1.25 s)

> No photographer. No studio.

Two hard stops in the first second, and the hook plate carries the same words for sound-off.

## The script, as delivered

Speech-verified with `whisper-cli` at word level — the burned captions are a transcript of what
the model said, not the written script timed to gaps.

> No photographer. No studio. One selfie from his phone — that one. Every other shot here came
> out of it. Pick a pose, it coaches you. Same face, same build. Authentic pro photos. No
> photographer. Be the right swipe.

Thirty-eight words in 15.1 s. Third person about the product throughout — "his phone", never
"your phone", so guardrail 8 holds and the man on the wall stays the demo.

## The button, and the line that is not the button

| | |
|---|---|
| Call to action | **Install now** — `INSTALL_MOBILE_APP`, the App promotion objective's own button, held constant across every campaign in the set |
| Destination | The App Store URL in PRODUCT.md §2. No `destination:` override, so the creative inherits it |
| On the end card | **"TRY IT YOURSELF"** in heavy caps above the real App Store badge |

**The end-card line and the Meta button are two different things and must not be swapped.**
"Try it out" is not on Meta's list at all — the closest enum value, `TRY_DEMO`, is not offered
for App promotion. The place for that sentence is the render, which is where it already is.

## Open before this can be approved

- **Meta text fields are unwritten** — no primary text, headline or description. The preflight
  will stay red on all three until they are, and they are the fields a rejection costs an edit in.
- **480p test render.** The paid 1080p pass has not been run and needs its own go-ahead.
- **No music bed**, so the end card's 3.8 s are silent.
- **Caption height is a deviation** — 0.66 H, the reference's position, not the bottom, because
  the cutout occupies the bottom-right corner.
- **The wall stills are 3:4** on a blurred backdrop rather than filling the frame.

## Do this, in order

1. Decide whether the format earns the 1080p pass at all, against K0 and the rest of the
   cutout-wall set in [[Cutout Wall Scripts 2026-09-25]].
2. Write the primary text, headline and description, and add them here as a
   `## Primary text (Meta placement)` section.
3. Close the three render items above — bed, caption height, still framing — before anything is
   rendered at 1080p.
4. Set the call to action to **Install now** and leave the destination on the PRODUCT.md §2 URL.
5. Only then take the render off candidate status and sign the preflight.
