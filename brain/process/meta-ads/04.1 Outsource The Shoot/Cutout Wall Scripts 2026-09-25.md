---
tags: [produce, scripts]
updated: 2026-09-25
---
# Cutout Wall Scripts — three hooks on one fixed format

**Three 24-second host reads for the cutout-wall layout torn down in
[[Reface Cutout Wall Reel 2026-09-25]]: our twelve results full-frame at ~1 s each, actor 04
keyed off his green screen and standing in the bottom-right corner with no box, one-word
karaoke captions, and an end card that carries the whole CTA.** The format is constant across
all three — **the hook is the only variable**, which is the rubric's Single criterion and the
reason these three are worth running as a set rather than one at a time.

The reference's own script cannot be used at all: it is a first-person testimonial with an
invented number, spoken by a generated face. [[Production Guardrails]] Lane B rule 1, PRODUCT.md
§11.1 and 16 CFR 465 each rule it out on their own. Everything below is third person about the
product. The host narrates the wall; the man on the wall is "he"; the viewer's photo is "your
photo"; nobody says "I", "my" or "me" as a user.

Related: [[Host Scripts]] S7 is the same family with a rounded inset instead of a cutout, and
[[Host Run 2026-09-09 Listicle]] is where the green-screen keying recipe was measured.

## The format — identical for all three

| Layer | Spec |
|---|---|
| Master | 9:16, 1080×1920, **24.0 s** |
| Full frame | Actor 01's results from `app/public/assets/winkypie/before-after/` — twelve colour environmental shots plus `wall_00_sofa_before.png`, his source selfie. Cover-fit to 1080×1920. **Colour, never graded to mono** — the environments are the differentiator the reference's B&W studio wall throws away |
| Cadence | **~1.05 s per shot** through the spoken section, ~1.15 s in the tail. Measured twice on this advertiser: 1.02 s here, 1.07 s on [[Reface Male Portfolio Cut 2026-09-08]] |
| Slots | 17 total. Thirteen assets, so **four results repeat in the tail**; the source selfie appears exactly once, on the beat that names it |
| Presenter | **Actor 04**, keyed off `actors/04 Mic/portrait_green.png`. Bottom-right, **no box, no border, no rounded corner** — cropped by the frame's bottom edge, ~45 % of frame height. Crop at upper chest so the microphone and both hands fall below the edge |
| Hook plate | One line, top, 0.0–2.2 s, above Meta's top 14 %. **Ours, not theirs** — the reference has no plate and relies on a monochrome studio portrait to read silently in 1.5 s. Our wall is colour environmental, so the plate does the Silent criterion instead |
| Captions | One word at a time, **Inter Bold in charcoal `#2B2B2E` on an off-white `#FCFCFC` rounded pill**, radius 24, 28 px side padding, 110 px tall, with a soft drop shadow (black at 43 %, offset 6 px down, 9 px blur). Left edge at **0.252 W**, centred at **0.648 H** — the reference ad's own measured position and treatment, matched on the owner's instruction 2026-09-25 |
| Caption words | **From the sentence transcript, aligned character by character to the `-ml 1` word timings.** Whisper's word splitter cuts inside tokens (`phot`+`o`, `it`+`'s`) and its first cue has empty text, which blank-line block parsing silently drops — that ate the first word of every early build. Parse the SRT line by line, never by blank-line blocks |
| Presenter out | Cross-fade the cutout and the captions out together over 0.5 s at the last word. The wall then runs alone — the reference does this at 72 % of runtime, S7 at 45 %, ours at 63 % |
| End card | The last 3.8 s. `brand/WP_endcard_tryitnow_9x16.png` — warm radial glow, the mark, "Authentic pro photos." in Inter Bold, **"More matches." in gradient bold italic**, "Be the right swipe.", a gradient **"Try it now"** pill and the real App Store badge. Footer: `This ad contains AI-Generated Content`. Built on the kit, not in Arial Black on flat black like the first two builds |
| Disclosures | **None on the frames. Owner's standing instruction, 2026-09-25** — neither the presenter pill nor the §11.2 results-vary line is ever burned again. [[Production Guardrails]] Lane B rule 5 is overruled and says so, with what it costs. The end card's `This ad contains AI-Generated Content` is the whole on-frame disclosure |
| Audio | Seedance native speech. Bed optional; if one is used, sit it ~6 dB under the read and **let it carry the silent tail** rather than going quiet, which is what the reference does. Deliver at −14 LUFS |

**The trial is never spoken and the word "free" is not on the card.** "TRY IT YOURSELF" without
it, so PRODUCT.md §11.3 has nothing to disclose — the cheapest resolution of the conflict
[[Production Guardrails]] Lane B rule 10 leaves open, taken here on purpose.

## Timing — identical for all three

| From–to | Full frame | Overlay |
|---|---|---|
| 0.00–2.20 | Result 1, then result 2 | Hook plate; cutout and karaoke in from frame one |
| 2.20–15.00 | The selfie on its beat, then results 3–12, ~1.05 s each | Karaoke through the last word |
| 15.00–15.50 | continues | **Cutout + captions cross-fade out** |
| 15.50–19.60 | Four repeats, ~1.15 s — the strongest results, no selfie | Wall alone, bed only |
| 19.60–20.20 | Fade to black, 0.6 s | — |
| 20.20–24.00 | End card, 3.8 s | The whole CTA |

Spoken section 15.0 s exactly: **that is Seedance 2.0 Mini's ceiling, and it is why these
scripts are 15 s and not 19.** A test therefore runs as one clip with one voice, instead of two
Mini clips whose native speech is regenerated per job and changes voice mid-ad — the failure
[[Host Run 2026-09-09 Listicle]] rejected. Word counts sit at ≈2.2 words/s, the reference's own
rate.

## KH · `WP_P2_PORTFOLIO_thatsme_9x16_v1` — the demo subject speaks

**The only cut in the set whose presenter is the man on the wall, and therefore the only one
that reproduces the reference ad's actual mechanism.** Every result in `before-after/` is
rendered from actor 01's selfie, so when he says *that's me*, he is describing the picture
behind him rather than claiming anything.

**15 s · 39 words**

> That's me. One selfie, on my sofa, grey shirt. Everything else here is the app. Pick a pose.
> It tells you how to stand. Same face, same build. No photographer. No studio. And yes, it's
> AI. That's the point.

On the word **"selfie"** the wall cuts to `wall_00_sofa_before` — his actual source photo. That
is the proof beat, and it is the one moment in the whole set where the format does what the
reference does.

**Where the line sits.** [[Production Guardrails]] Lane B rule 1 bans first person because a
generated presenter has no bona fide use to claim. That reasoning does not reach a sentence like
"that's me, one selfie, on my sofa": it is a true description of an asset on screen, not an
account of using the product. What would cross the line, and is absent here, is any of the
three: **a claimed outcome, a number, or somebody else's reaction.** Those are exactly the two
clauses that had to come out of the owner's original draft — "got 50 plus comments" and "my
friend asked me". Rule 1 still holds for actors 02, 03 and 04, who are not the demo subject and
speak in the third person throughout.

| | |
|---|---|
| Actor | 01 Host — `actors/01 Host/portrait_green.png`, built in two inpaint passes from his source selfie |
| Voice | Mid-pitched, easy, conversational — deliberately between actor 02's deep dry read and actor 04's bright quick one |
| Run | Job `11e9f546-5342-4648-9f4a-cc4d971d2542`. **Second take** — the first garbled "no studio", fixed by writing the two clauses as separate sentences with hard stops and saying so in the prompt |
| Key | `chromakey=0x149448:0.12:0.02` — his grey t-shirt sits closer to green than the cream shirts, so the window is narrower and 0.18 already eats it |

## K0 · `WP_P2_PORTFOLIO_thetruth_9x16_v1…v3` — the beat-for-beat port

**Her script, transcribed at word level, next to ours.** The reference's read is a machine with
five moving parts, and four of them are proof we are not allowed to fabricate. The fifth — the
AI reveal delivered as the punchline rather than as a footnote — is the one we can do *better*
than they do, because for us it is simply true.

Her words, from `whisper-cli -ml 1` on the master, timings measured:

> Posted these portraits on Facebook and got 50 plus comments asking who my photographer was.
> The truth. No photographer, no studio, just this app and one photo from my phone. My
> sister-in-law immediately asked for the link. She couldn't believe these were AI generated.

Forty-one words in 18.8 s — 2.2 words/s, and then 7.2 s with nothing said at all.

| # | Her beat | Timing | What it does | Ours |
|---|---|---|---|---|
| 1 | "Posted these portraits on Facebook and got 50 plus comments asking who my photographer was." | 0.13–6.07 · 17 w | Outside reaction as the hook. **Fabricated testimonial + invented number** | **"Every photo up there came off one selfie."** The proof is the wall itself, not a crowd |
| 2 | "The truth." | 6.07 + **a 1.2 s pause** | The turn. The longest gap in the read | **"The truth?"** — kept, it is free and it is the hinge |
| 3 | "No photographer, no studio, just this app and one photo from my phone." | 7.26–12.05 · 13 w | Triple negation, then the mechanism | **"No photographer. No studio. Just the app and one photo from his phone."** — near-verbatim; it is the locked support line's own content, and third person |
| 4 | "My sister-in-law immediately asked for the link." | 12.84–15.21 · 7 w | Second, closer proof. **Fabricated** | **"It checks the selfie before it renders — free."** A product fact (§5) in the same slot |
| 5 | "She couldn't believe these were AI generated." | 15.71–18.80 · 7 w | The twist: the disclosure *is* the punchline | **"And yes, it's AI. That's the point."** The one beat we can say straighter than they can |
| 6 | — | 18.80–26.00 | Wall alone, bed only | Same, once the final runs on a model that is not capped at 15 s |

**15 s · 38 words**

> Every photo up there came off one selfie. The truth? No photographer. No studio. Just the app
> and one photo from his phone. It checks the selfie before it renders — free. And yes, it's AI.
> That's the point.

| Spoken beat | Full frame |
|---|---|
| Every photo up there came off one selfie. | two results, then **`wall_00_sofa_before` — the source selfie** on "one selfie" |
| The truth? | hold the selfie through the pause |
| No photographer. / No studio. | two results |
| Just the app and one photo from his phone. | two results |
| It checks the selfie before it renders — free. | two results |
| And yes, it's AI. That's the point. | the last two results, held longest |

**Three actors, one script — the variable is the casting.** Reface ship the same creative cast
two ways twelve seconds apart ([[Reface Male Portfolio Cut 2026-09-08]]); this is the same move.
`v1` actor 02, `v2` actor 03, `v3` actor 04. Everything else is identical, so whatever the
numbers say is about the face.

Guardrails: no count of the results, ever — "every photo up there", never a number. "His phone",
never "your phone". "Free" is the pre-flight check (§5), **not the trial**, which is still never
mentioned. "That's the point" is §11.5 said out loud and is the only place in the whole set where
the AI disclosure carries the joke instead of the small print.

## K1 · `WP_P2_PORTFOLIO_nophotographer_9x16_v1` — No photographer. No studio.

| | |
|---|---|
| Hypothesis | Ease and cost. The only line in the reference's script that survives our rules, rewritten third person — it is the locked support line's own content |
| Hook plate | No photographer. No studio. |
| Delivery | **Casual UGC, not a narrator read** — he talks like he is telling a friend something, warm and a little quick, hands moving on the beats. Two hard stops in the first second. One lift on "that one" |
| Persona | P2 Grinder |
| Built | **2026-09-25 — [[Host Run 2026-09-25 Cutout Wall]].** `app/public/assets/winkypie/creatives/ugc/WP_P2_PORTFOLIO_nophotographer_9x16_v1.mp4` |

**15 s · 38 words**

> No photographer. No studio. One selfie from his phone — that one. Every other shot here came
> out of it. Pick a pose, it coaches you. Same face, same build. Authentic pro photos. No
> photographer. Be the right swipe.

| Spoken beat | Full frame |
|---|---|
| No photographer. / No studio. | `wall_07_pool-dusk`, `wall_02_paris-rooftop-night` |
| One selfie from his phone — that one. | **`wall_00_sofa_before` — the source selfie, held 2.04 s** |
| Every other shot here / came out of it. | `wall_00_sofa_after`, `wall_01_paris-cafe` |
| Pick a pose. / It coaches you. | `wall_03_orangery-espresso`, `wall_05_coast-pergola` |
| Same face. / Same build. | `wall_04_stone-facade`, `wall_08_anitkabir` |
| Authentic. / Pro photos. | `wall_10_dune-dusk`, `wall_11_terrace-sun` |
| No photographer. | `wall_06_stairs-indoor` |
| Be the right swipe. | `wall_12_kitchen-wine` |

**Grown from 32 words to 38 after the first take.** At 32 the model filled the 15 s ceiling by
saying "Same build." twice — it pads rather than pauses. 38 words at 2.5 words/s fills it
honestly. Size K2 and K3 the same way.

Guardrails: "his phone", never "your phone" — the man on the wall is the demo. No price, no
time saved, no studio rate. The bookend repeat of "No photographer" is deliberate and is the
locked line, not a second claim.

## K2 · `WP_P3_PORTFOLIO_stillyou_9x16_v1` — Looks pro. Still you.

| | |
|---|---|
| Hypothesis | Likeness. **The strongest fit of the three for this format**: the proof is that one face survives twelve places, and a wall is the only layout that can show it |
| Hook plate | Looks pro. Still you. |
| Delivery | Matter-of-fact. Slow down and hold on "Every single one" |
| Persona | P3 Camera-Shy |

**15 s · 38 words**

> Looks pro. Still you. Not a filter. Not a face swap. One selfie goes in and the same face
> comes back. His jaw, his build. Every single one. It's AI. It says so on screen. Be the
> right swipe.

| Spoken beat | Full frame |
|---|---|
| Looks pro. Still you. | results 1–2 |
| Not a filter. Not a face swap. | results 3–4 |
| One selfie goes in | **`wall_00_sofa_before`, held 1.6 s** |
| and the same face comes back. | result 5 — `wall_00_sofa_after`, the pair to the selfie |
| His jaw, his build. | results 6–7, both close enough to read the face |
| Every single one. | results 8–10, cut fast |
| Be the right swipe. | results 11–12 |

Guardrails: "Not a filter. Not a face swap." is PRODUCT.md §3's explicit non-claim list,
verbatim. Never "better", always "same". The selfie → its own result is a pose→result pair, not
a before/after of a person — never frame it as an improvement.

## K3 · `WP_P1_PORTFOLIO_algorithm_9x16_v1` — Not the algorithm. The first photo.

| | |
|---|---|
| Hypothesis | Blame-shift — the angle [[WP_P1_STATIC_algorithm]] already tests as a static. This is the cheap second look at it, and the wall reads as a rack of first-photo candidates |
| Hook plate | Not the algorithm. The first photo. |
| Delivery | Flat and certain, a beat after "algorithm" |
| Persona | P1 Restart |

**15 s · 37 words**

> Not the algorithm. The first photo. On Hinge, Tinder and Bumble it does all the work. These
> came from one selfie. Pick a pose, it tells you how to stand. Angle, gaze, hands. Be the
> right swipe.

| Spoken beat | Full frame |
|---|---|
| Not the algorithm. The first photo. | results 1–2 |
| On Hinge, Tinder and Bumble it does all the work. | results 3–5 |
| These came from one selfie. | **`wall_00_sofa_before`, held 1.6 s** |
| Pick a pose. | results 6–7 |
| It coaches you. | results 8–9 |
| Be the right swipe. | results 10–12 |

Guardrails: the host never diagnoses the viewer — no "you're not getting matches", no
shadowban, no percentage. The app names are only where the photo does its work; the hook is the
only sentence that argues with the algorithm at all.

## Run parameters — the test

Per [[Production Guardrails]] Lane B rule 9: **nothing is generated without the owner's explicit
per-run command.** Everything below costs nothing until that command.

| Parameter | Value |
|---|---|
| Model | **Seedance 2.0 Mini, 480p, 9:16** — the owner's fixed test model. **0.5 credits/s, measured with `get_cost` on 2026-09-25 → 7.5 credits for a 15 s read**, not the 15 the older notes estimate |
| Reference | **`app/public/assets/winkypie/actors/04 Mic/portrait_green_nomic.png`** as `image_references` — actor 04 with the microphone inpainted out and the green extended to the frame edge. **Not `portrait_green.png`:** its backdrop stops at ~0.55 H and a grey floor sits below it, which is unkeyable |
| Audio | `generate_audio: true`, native speech, no voice clone |
| Duration | 15 s, one clip — Mini's ceiling and the reason the scripts are this length |
| Framing | The wording that held on 2026-09-09 and has now held three times: *locked off on a tripod at the same wide chest-up framing, the head stays the same size in the frame for the whole clip.* Plain "no push in, no zoom" has failed three times |
| Hands | **Empty, open, moving on the beats of the sentence** — the whole clip. Owner's note, 2026-09-25: the reference presenter talks like a person, and a man holding a stick microphone reads as a news anchor. Cropping the prop out of frame does not fix the register; removing it does. Name "nothing held, no microphone, five fingers per hand" |
| Register | **Casual UGC, self-filmed, talking to a friend** — not a presenter and not reading. Say so in the prompt; it is what separates this from the S1–S7 host reads |
| Blinking | Do not write steady-eyes wording. It worked once and has failed on every clip since — treat blinking as a limit of the model |
| Keying | **Sample the corners of the delivered clip and sweep `chromakey` before compositing.** Five clips across three runs, five different greens; the values are not portable. The shirt and the hands are the probes. **One pass at the right value, never two** — a chained second pass on a darker green removed the actor entirely on 2026-09-25. Working values so far: `0x0A5A2C:0.10:0.02` and `0x1A9A46:0.14:0.02`, then `despill=type=green` |
| Composite | Ours, locally. This Mac's ffmpeg has no `drawtext`, `subtitles` or `ass` filter, so the ASS recipe cannot run here — **captions and disclosures are rendered as an RGBA frame sequence in PIL and overlaid**, which works and is free ([[Host Run 2026-09-25 Cutout Wall]]). The sandbox is not needed for a caption pass of this shape |
| Name | `WP_<persona>_PORTFOLIO_<slug>_9x16_v1` per [[Creative Naming]]; 4:5 and 1:1 cut from the master in post |

**K1 ran on 2026-09-25 and is built** — [[Host Run 2026-09-25 Cutout Wall]]. K2 and K3 wait for
the owner's read of it.

## What this costs

| | Credits |
|---|---|
| One 15 s test clip, Seedance 2.0 Mini 480p | **7.5** — measured with `get_cost`, 0.5 credits/s |
| K1, as spent: take 1 (discarded) 7.5, the no-mic inpaint 1.25, take 2 7.5 | **16.25** |
| K2 + K3 still to run | ~15 |
| Composite, captions, end card, keying | **0** — all local |
| A 1080p final on Seedance 2.5, 15 s | ~135, and only after the owner approves the test |

A 1080p render is a new take of the same prompt and seed, not an upscale.

## QA before anything is uploaded

Lane B's list in [[AI Production Platforms]], plus per script: hook plate readable sound-off
inside 1.5 s · no "I / my / me" as a user · no number at all · no price, no pose count, no
other app, no outcome · the §11.2 line on every frame · the presenter line for every frame the
cutout is in · men only on the wall · no microphone and no hands in the crop · the key holds
on the shirt and the hair · **the read is speech-verified against the written script**, which
[[Host Run 2026-09-09 Listicle]] is still blocked on.

## Open

- **Caption height.** Bottom (the owner's 2026-09-08 rule) or 0.62–0.68 H (the reference, and
  safer against Meta's Reels 35 % band). **Built at 0.66 H** on 2026-09-25, because the cutout
  occupies the bottom-right corner and a bottom pill collides with him. Owner's call; it is one
  number in the composite.
- **No music bed.** The end card's last seconds are silent. The reference runs a bed ~6 dB under
  the read all the way to the final frame, and that is what carries its silent tail.
- **The wall stills are 3:4 and the frame is 9:16.** Cover-fit crops a third off the sides and
  zooms 1.5×; the build contain-fits them over a blurred copy of themselves instead. Native 9:16
  results would remove the problem rather than work around it.
- **`PORTFOLIO` covers this.** [[Creative Naming]] defines the token as "narrator as a corner
  inset"; a keyed cutout is the same format with the box removed. The definition needs one
  clause — *corner inset or keyed cutout* — rather than a new token.
- **Actor 04 reads below the 25–40 persona band**, carried over from [[Host Run 2026-09-09 Listicle]]
  and not fixed here. He is the only actor on a green screen, which is why he is cast.
- **K2 and K3 reuse hook slugs** that already exist under other formats
  (`WP_P3_POSERESULT_stillyou`, `WP_P1_STATIC_algorithm`). Do not run either in the same ad set
  as its sibling unless the format question is the one being asked.
- Meta's dating classification. If "dating", a generated presenter is a fictitious individual
  and all three are internal animatics only ([[Production Guardrails]]).
