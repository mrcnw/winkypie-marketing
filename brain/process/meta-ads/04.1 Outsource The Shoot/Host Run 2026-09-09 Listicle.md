---
tags: [produce, run-log]
updated: 2026-09-16
---
# Host Run 2026-09-09 — the seven-photos listicle, a new actor and a green screen

**The Roast listicle format ran end to end on 2026-09-09 as `WP_P4_LIST_sevenphotos_9x16_v1`:
a new actor cast on a chroma-key green screen with a microphone, one continuous 30 s Seedance
2.5 narration (75 credits), ten beats cut on measured speech gaps, our own App Store card, an
animated before/after, and both disclosures burned from frame one.** Still an internal test
render. The brief is the "Our version" section of [[Roast Ten Out Of Ten Pics 2026-09-09]];
the guardrails are [[Production Guardrails]] Lane B; the actor and narration files live in
`app/public/assets/winkypie/actors/04 Mic/`.

This is the first run on this lane to use a green screen and a corner inset, and the first to
need a model other than the Mini test model.

## What was new

| | |
|---|---|
| **Actor 04** | Seedream 5.0 Pro `is_inpaint` from actor 03's portrait. Identity drifted despite an explicit one-to-one lock on the face — he reads about five years older with a heavier jaw. Consistent across all three microphone generations, so he is filed as his own actor rather than a variant |
| **Green screen** | Generated into the portrait, keyed locally in ffmpeg. Never ships green |
| **Seedance 2.5** | First departure from the Mini-only test rule, because Mini stops at 15 s and the script needs 30. 480p, not 1080p — the narrator ships as a ~324 px corner inset |
| **Corner inset** | Third competitor cut we have measured using the inset-plus-results layout, and the first one we have actually built |

## Three findings worth carrying

**The green is different every run, at an identical prompt.** Three clips, three greens:
`#038A3A` even and keyable in one pass at similarity 0.07; `#0F5630` dark with a gradient and a
near-black corner, needing three chained `chromakey` passes; `#0E7038` keyable at 0.05 with
blend 0.02. **Keying values are not portable between runs.** Sample the corners of each clip and
sweep before compositing — roughly two minutes per clip, and it cannot be written into the
recipe once and forgotten. The one number that generalised: a similarity that clears the
background but eats the shirt is always too high, and the shirt is the probe that catches it.
A first attempt at 0.20 removed the shirt, the microphone and the hair and left a floating face.

**Naming the framing stops the push-in.** "No push in, no zoom" does not hold. What holds is
`locked off on a tripod at the same wide chest-up framing (...) the head stays the same size in
the frame for the whole clip`. Before that wording, Seedance crept in until the actor's hands
left the frame and a hand-held microphone read as a stand.

**The steady-eyes wording is spent.** It worked once, on actor 03's second take, and has since
failed on three clips in a row. Stop rewriting it and treat blinking as a limit of the model.
On a 30 s take natural blinking is correct anyway.

## Structure

Ten beats. Cut points are not a planned grid: the narration was measured with
`silencedetect=noise=-32dB:d=0.25`, which found 15 speech segments between 0.46 s and 30.04 s,
and every cut lands in one of those gaps. Nothing cuts mid-word.

| # | Od–do | Full frame | Said over it |
|---|---|---|---|
| 1 | 0.00–4.06 | 2×2 of wall_01/05/11/07, white title card "The photos a profile needs" | "The photos a dating profile needs. All seven." |
| 2 | 4.06–8.19 | wall_01_paris-cafe | "A clear face shot. No sunglasses, no hat, no filter." |
| 3 | 8.19–11.17 | wall_04_stone-facade | "A full body shot, so nobody feels lied to." |
| 4 | 11.17–13.41 | wall_08_anitkabir | "A candid one, looking away." |
| 5 | 13.41–16.06 | wall_12_kitchen-wine | "One across a table, somewhere decent." |
| 6 | 16.06–18.99 | wall_10_dune-dusk | "A travel shot that isn't just an airport ceiling." |
| 7 | 18.99–21.65 | wall_03_orangery-espresso | "And one where something is actually happening." |
| 8 | 21.65–25.17 | **our App Store card** — logo, "WinkyPie", real badge | "Seven photos. WinkyPie makes them from one selfie." |
| 9 | 25.17–29.05 | **animated** wall_00_sofa_before → wall_00_sofa_after, wipe right | "Pick a pose, it renders you in it. Your face, your build." |
| 10 | 29.05–32.20 | wall_07_pool-dusk | "Be the right swipe." |

Beat 7 started as wall_09_vineyard-barrel and was swapped: wall_09 is near-identical to
wall_00_sofa_after, so the beat-9 reveal would not have read as a change.

The closing beat carries 2 s of padded silence. Seedance read denser than the 79-word/28 s
plan and filled all 30 s, which left "Be the right swipe." 0.9 s — too short to read. The
padding is the fix; the alternative is a shorter script.

## What ported and what did not

Three of Roast's beats are barred by our own rules and were rewritten exactly as
[[Roast Ten Out Of Ten Pics 2026-09-09]] prescribes. "Guys who get no matches edition" →
"The photos a dating profile needs" (guardrail 8). "Swap your face with theirs" → "Pick a pose,
it renders you in it. Your face, your build." — not a softening of their line but the opposite
claim, per PRODUCT.md §11.5. "A photo women already simp over" cut with no replacement.

Their item about a friend enjoying your company went too. We own no two-person imagery — and
their own frame for that line showed one man alone, which the teardown flags as a mismatch
nobody caught.

Their App Store card sits mid-creative while their ad points at a website. Ours points at a
real listing, so the card is honest here. It uses our logo and the real badge, with no faked
Apple chrome.

## QA — Lane B list

Rule 1 host not user: pass, third person throughout. Rule 2 approved claims: pass, and the
closing line is the locked §1 CTA. Rule 3 the screen is ours: pass, every background is our own
result. Rule 5 disclosure from frame one: pass, both lines — the presenter pill at y 290–370 and
the §11.2 line at 42 px across the top, needed because every frame here shows a result
(Host Scripts.md:334). Rule 7 no trial: pass, not spoken, not on screen.

## Blocked on

**The narration is not speech-verified.** The burned captions are the written script timed to
measured speech gaps, not a transcript of what the model actually said. If Seedance dropped or
garbled a line, a burned caption is wrong — which is disqualifying, not cosmetic. Verify before
this goes near a paid run.

**The blocker is gone, the check is not done.** This note said `whisper-cli` had no model
downloaded; that is stale — `~/models/ggml-small.en.bin` is on the machine and
[[Host Run 2026-09-25 Cutout Wall]] used it to verify a read at word level. Nothing stands in
the way of re-checking this cut except doing it — and the 2026-09-25 run found the model
repeating a whole sentence to fill its duration, which is exactly the failure a written-script
caption would hide.

Also unchecked: this cut against Meta's Reels 35 % band, and the actor still reads below the
25–40 persona band.
