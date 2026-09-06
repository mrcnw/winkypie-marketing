---
tags: [brief, strategy]
campaign: WP_P3_POSERESULT_stillyou
persona: P3 Camera-Shy
format: pose → result
variable: likeness-trust hook
order: 4
modelled_on: [roast-same-face-10x, charmd-youre-not-ugly]
updated: 2026-09-06
---
# Brief — WP_P3_POSERESULT_stillyou

**Single variable tested:** likeness trust — "it will still look like *you*" — the #1
objection in the entire category (every rival's worst reviews say "doesn't look like me",
see [[Competitor Landscape]]). Re-read 2026-09-06: "Same face" is the most-cloned promise on the
Roast page (~257 ads), and Charmd answers the objection inside the copy ("No fake filters.
No weird AI look.") on ads at 50–61k EU reach ([[ROAST]], [[Charmd]]). The objection is
pre-loaded; the market already pays to have it answered.

**Framing rule:** **pose → result, never before/after.** "The pose he picked → the photo he
got" sidesteps Meta's appearance-transformation restrictions and never implies a different
person (PRODUCT.md §11.5; §11 explicitly prefers this framing).

## Hook (0.0–1.5 s)

> Looks pro. **Still you.**

Locked line. "Still you." carries the italic-gradient punch.

## Beat sheet (12–15 s slideshow, or single static split)

| Time | On screen | Overlay |
|---|---|---|
| 0.0 | The pose card from the catalog (reference image) | "He picked this pose for his profile." |
| 1.5 | Coaching card flash + selfie moment (can be a still) | "Mirrored it with one selfie." |
| 5 | The generated result, full frame | "Looks pro. *Still you.*" + §11.2 disclosure |
| 10–15 | End card | "Be the right *swipe*." + App Store badge + "3 days free. Cancel anytime." |

Static variant: left = pose reference, right = result, same overlays; disclosure under the
right panel. Alt overlay for the static, if a second frame is wanted: "Same face. New level." —
the honest replacement for Roast's "Same face. 10x the matches." ([[Hooks And Angles]], backup).

## Primary text

> Not a filter. Not a face swap. Pick a pose, mirror it with one selfie, and WinkyPie
> renders you in the scene — real face, real build. The photo your dating profile leads
> with. Stylized AI representations, not a filter.

## To produce

No shoot. Needs one **real generation pair**: a pose card from the live catalog (admin
panel) + its generated output on a male demo profile. Do not reuse the landing-page hero
before/after pairs here — they are framed as before/after, which this campaign deliberately
avoids. Both images are AI demo assets → §11.2 disclosure on the result, always.

## Guardrail check (§11)

Pose→result framing, no before/after ✓ · "Stylized AI representations, not a filter" in
copy ✓ · results-vary disclosure on frame ✓ · same-person implication honest (it *is* the
mechanism) ✓ · men only ✓ · no pose-count claim ✓.

## Do this, in order

1. Look at the two model ads (links in the app card): the likeness promise as the headline,
   and the objection answered in the copy. Never the "10x" and never "you're not ugly".
2. Get one real generation pair from the live catalog: the pose card from the admin panel and
   its generated result on a male demo profile. Not the landing-page before/after pairs.
3. Build the 12–15 s slideshow per the beat sheet, or the static split (pose left, result
   right). The §11.2 results-vary disclosure sits on the result frame, always.
4. Optional second static with the alt overlay "Same face. New level."
5. Export 9:16, 4:5 and 1:1; name `WP_P3_POSERESULT_stillyou_<ratio>_v1` per
   [[Creative Naming]].
6. Guardrail check above: pose → result, never before/after; "Stylized AI representations,
   not a filter" in the copy; no pose count; men only.
7. Register in the app's asset browser; hand to [[08 Launch The Ad]] with the hypothesis line.
