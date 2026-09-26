---
tags: [produce, run-log]
updated: 2026-09-25
---
# Host Run 2026-09-25 — the cutout wall, K1, and an actor with his hands back

**K1 of the cutout-wall set ran end to end as `WP_P2_PORTFOLIO_nophotographer_9x16_v1`:
18.9 s, thirteen full-frame results cut on measured speech gaps, the presenter keyed off a
green screen and standing in the bottom-right corner with no box around him, one-word captions
in a white pill, both disclosures from frame one, and our own end card.** The format is the one
torn down in [[Reface Cutout Wall Reel 2026-09-25]]; the scripts and the layout spec are
[[Cutout Wall Scripts 2026-09-25]]; the guardrails are [[Production Guardrails]] Lane B.

**Two takes, because the first one was wrong.** The whole run is logged, including the take
that got thrown away — the failures are the part worth keeping.

## What was spent

| | Credits |
|---|---|
| Take 1 — Seedance 2.0 Mini, 480p, 15 s, actor 04 as he was (microphone in hand) | 7.5 |
| Actor 04 no-mic variant — Seedream 5.0 Pro `is_inpaint`, 1.5k, 9:16 | 1.25 |
| Take 2 — Seedance 2.0 Mini, 480p, 15 s, the no-mic variant | 7.5 |
| **Composite, captions, end card, keying** | **0** — all local ffmpeg and PIL |
| **Total** | **16.25**, measured against the balance: 705.08 → 688.83 |

**480p at 1 credit/s was wrong in the note: the measured rate is 0.5 credits/s.** `get_cost`
returned 7.5 for a 15 s clip, not the 15 [[Host Scripts]] estimates. The three-hook set is
therefore ~23 credits at 480p, not 45.

## Take 1 — thrown away, and why

The first clip used `portrait_green.png` unchanged, so the actor held a microphone. Two things
came out of it.

**The owner's note: the microphone has to go and the hands have to move.** The reference ad's
presenter talks like a person telling a friend something; a man holding a stick mic reads as a
news anchor. The plan had been to crop above the microphone — that does not fix the register,
it just hides the prop.

**The green screen does not fill the frame.** Measured on the delivered clip: the backdrop
stops at about 0.55 of the frame height and a bright grey floor sits below it — sampled
(212,207,202) where green was expected. Below ~0.45 H the green does not even reach the right
edge. A cutout crop had to stop at y 445 of 864 to stay on green, which is why the crop was
landing at mid-chest whether we wanted it there or not. **This was invisible in the portrait,
which is framed tighter than what Seedance generates around it.**

**One genuine finding kept from take 1: the model pads with a repeat when the script is short.**
Thirty-two words filled ~13.4 s of the 15 s, and Seedance said "Same build." twice — at 0:08
and again at 0:09 — to reach the ceiling. Confirmed at word level, not a Whisper artefact. This
is the mirror of the [[Host Run 2026-09-09 Listicle]] finding, where a 79-word plan came back
denser than written: **the model fills the duration either way.** Take 2 went to 38 words and
came back clean with no repeat.

## Take 2 — what shipped

| | |
|---|---|
| Actor | `actors/04 Mic/portrait_green_nomic.png` — Seedream 5.0 Pro `is_inpaint` from actor 04, job `3ada951c-8d86-482a-bf1f-04ee7e953a1e` |
| Clip | Seedance 2.0 Mini, 480p, 9:16, 15 s, `generate_audio: true`, job `d4a362ae-25cb-4b6b-87e2-826d2acf6ba3`, delivered 496×864 |
| Wall | Actor 01's twelve results plus his source selfie, `app/public/assets/winkypie/before-after/` |
| Output | `app/public/assets/winkypie/creatives/ugc/WP_P2_PORTFOLIO_nophotographer_9x16_v1.mp4` |

**Identity held on the inpaint this time.** The pass that created actor 04 from actor 03 drifted
about five years older despite an explicit lock; this one did not move at all. The difference in
the prompt: the lock named the parts — head, hair, hairline, jawline, eyes, skin, shirt — as a
one-to-one reproduction, instead of the general "his face must not change".

**The framing wording held for the third time.** *Locked off on a tripod at the same wide
chest-up framing (…) the head stays the same size in the frame for the whole clip.* No creep,
no push-in, hands never left the frame.

**Hands.** Asked for empty open palms moving on the beats of the sentence; delivered that in
every frame, with motion blur on the faster gestures at 24 fps. Anatomy is clean at 480p; check
it again if this is ever rendered at 1080p, where the fingers will be readable.

## The script, as delivered

Speech-verified with `whisper-cli` (`small.en`) at word level — **the burned captions are a
transcript of what the model said, not the written script timed to gaps.** That closes the item
[[Host Run 2026-09-09 Listicle]] was blocked on, for this creative.

> No photographer. No studio. One selfie from his phone — that one. Every other shot here came
> out of it. Pick a pose, it coaches you. Same face, same build. Authentic pro photos. No
> photographer. Be the right swipe.

Thirty-eight words in 15.1 s — 2.5 words/s. Word-level timings gave the thirteen cut points, so
nothing cuts mid-word.

| # | From–to | Full frame | Said over it |
|---|---|---|---|
| 1 | 0.00–1.25 | `wall_07_pool-dusk` | "No photographer." |
| 2 | 1.25–2.19 | `wall_02_paris-rooftop-night` | "No studio." |
| 3 | 2.19–4.23 | **`wall_00_sofa_before`** — the source selfie, held 2.04 s | "One selfie from his phone. That one." |
| 4 | 4.23–5.35 | `wall_00_sofa_after` — the pair to it | "Every other shot here" |
| 5 | 5.35–6.36 | `wall_01_paris-cafe` | "came out of it." |
| 6 | 6.36–7.25 | `wall_03_orangery-espresso` | "Pick a pose." |
| 7 | 7.25–8.34 | `wall_05_coast-pergola` | "It coaches you." |
| 8 | 8.34–9.28 | `wall_04_stone-facade` | "Same face." |
| 9 | 9.28–10.25 | `wall_08_anitkabir` | "Same build." |
| 10 | 10.25–11.15 | `wall_10_dune-dusk` | "Authentic." |
| 11 | 11.15–12.26 | `wall_11_terrace-sun` | "Pro photos." |
| 12 | 12.26–13.58 | `wall_06_stairs-indoor` | "No photographer." |
| 13 | 13.58–15.10 | `wall_12_kitchen-wine` | "Be the right swipe." |
| — | 15.10–18.88 | **End card** | silent |

## Keying — the numbers, and why they are not portable

Sampled from the delivered clip's own corners before any key, as [[Host Run 2026-09-09 Listicle]]
says to. **Take 1's green and take 2's green are different again**, at prompts that asked for the
same thing:

| | Take 1 | Take 2 |
|---|---|---|
| Top-left | `#004420` | `#002F18` |
| Top-right | `#1C783C` | `#1A6437` |
| Mid-left | `#005E33` | `#006236` |
| Bottom corners | not green — grey floor | green |
| Key that worked | `chromakey=0x0A5A2C:0.10:0.02` | `chromakey=0x1A9A46:0.14:0.02` |

**The shirt is the probe and it caught the failure again.** The sweep measured what survives at
each similarity: at 0.14 the background was 99.2 % gone with face, shirt and hands all intact;
at 0.17 the hands dropped to 22 % and the shirt to 83 %. A **chained second pass on a darker
green removed the actor almost entirely** and left fragments of his face floating on the
background — one pass at the right value beats two at a safe-looking one. `despill=type=green`
after it, no edge fringe left.

## What is ours and what we built for free

The platform delivers a talking clip and nothing else. Everything else here is local:

- **Wall video** — thirteen stills, per-slot durations from the word timings, `concat`.
- **Cutout** — `chromakey` → `despill` → scale to 900 px tall → `overlay` bottom-right, flush
  with the bottom edge, ~47 % of frame height. The reference's is ~48 %.
- **Captions and disclosures** — 362 RGBA frames rendered in PIL and overlaid as an image
  sequence. **This Mac's ffmpeg still has no `drawtext`, `subtitles` or `ass` filter**, so the
  ASS recipe in [[Production Guardrails]] Lane B rule 5 could not run; the PIL route is the same
  workaround actor 02's sidecar records, extended from a single still to a sequence. It works
  and it is free, so the "assemble in the sandbox" rule is not needed for a caption pass of this
  shape.
- **End card** — PIL: the real logo, Arial Black caps, three chevrons, the real App Store badge,
  and `This ad contains AI-Generated Content`.

## Disclosures as built

Both, from frame one, for the whole 15.1 s — every frame here shows a result:

- `AI-generated presenter. Not a real customer.` — 75 % `#0E0E0E` pill at y 290–356.
- The PRODUCT.md §11.2 results-vary line, two lines at y 372–450.
- End card: `This ad contains AI-Generated Content`.

**The word "free" is not on the card.** That is the cheapest resolution of the conflict
[[Production Guardrails]] Lane B rule 10 leaves open — nothing on this creative is
purchase-adjacent, so §11.3 has nothing to attach to.

## K0, the same day — the beat-for-beat port, cast three ways

**Same format, the reference's own script structure, three presenters.** Built as
`WP_P2_PORTFOLIO_thetruth_9x16_v1…v3` in `creatives/ugc/`. The script and the side-by-side with
her transcript are in [[Cutout Wall Scripts 2026-09-25]] § K0.

### Getting three men onto a green screen

Only actor 04 was on green. Two more had to be put there, and **the first attempt on both
failed in the same way.** A prompt that asked for the hands *and* the background, opening with a
face lock, moved the arms forward and left the sofa, the bookshelf and the hallway exactly where
they were. Seedream honoured the first concrete instruction and dropped the second.

**One instruction per pass.** The second prompt asked for the background and nothing else, named
the objects to remove one by one, and the green landed on both. Recorded in the actors' sidecars
so nobody re-derives it.

A `remove_bg: true` pass was fired first as the fallback — the plan being to cut the men out and
paste them onto a flat green canvas locally, which would also have fixed the run-to-run green
drift at the source. **Both jobs were still running when the single-instruction retry had already
finished**, so they were abandoned rather than waited on. The idea is still the better one and
is worth trying properly: a canvas we paint is the same green every time.

### Two of the three were the same man

Actor 03 on green in his stone oxford shirt and actor 04 are near-identical — same haircut, same
cream button-down, same build, **because 04 was inpainted out of 03 in the first place**. Two
casting variants that look like one person test nothing, so 03 got a third pass into a grey
crew-neck t-shirt. Navy polo / grey tee / cream shirt reads as three men.

| Cast | Actor | Clip job | Result |
|---|---|---|---|
| `v1` | 02 — blond, navy polo | `f2f0e9d4-0ea5-4fb6-af2d-8f6bd2ddb7e5` | Script verbatim, no padding |
| `v2` | 03 — grey tee | `b57ece4f-032f-4438-84f2-4f8e653f73c6` | Script verbatim **except a stutter — "free, free"**. Needs a re-run or a trim |
| `v3` | 04 — cream shirt | `f7f4495f-9551-47f6-aece-72177397b848` | Script verbatim, no padding |

**38 words filled 15 s cleanly on all three** — no repeated sentence, which is the take-1 failure
above. The only defect across the set is v2's single stuttered word, and `chromakey=0x1A9A46:0.14:0.02`
keyed all three without a sweep, which is the first time one value has carried across clips.

### Credits, K0

Two failed inpaints 2.5 · two that worked 2.5 · the wardrobe pass 1.25 · three clips 22.5 ·
**28.75.** Composite, captions and end cards free.

**The whole day: 62.5 credits**, balance 705.08 → 642.58. Six finished 18.9 s cuts, three
green-screen actors, one brand end card. The clips are the only thing that costs — everything
after Seedance delivers is ffmpeg and PIL, and it is free.

## Two voice cuts, and the line that could not be spoken

The owner wrote a script out longhand on 2026-09-25 and asked for it in two reads, two actors,
two voices:

> Posted these portraits on Facebook and got 50 plus comments asking who my photographer was.
> The truth. No photographer, no studio, just this app and one photo from my phone. My friend
> asked me and he couldn't believe it's AI generated and looks so authentic.

**Two clauses of it cannot come out of a generated mouth.** "Got 50 plus comments" is an
invented statistic; "my friend asked me" is a second-hand endorsement. Both are fabricated proof
attributed to a presenter who does not exist — 16 CFR 465, PRODUCT.md §11.1, and
[[Production Guardrails]] Lane B rule 1, which the repo has held since 2026-09-03. Everything
else in the line survived: the rhythm, the pause on "The truth?", the triple negation, and the
closing beat about AI that still looks authentic — which is the best thing in his draft and the
one we can say straighter than the reference can.

| Cut | Actor | Voice asked for | Says |
|---|---|---|---|
| `WP_P2_PORTFOLIO_whoshot_9x16_v1` | 02 — blond, navy polo | Low, warm, slow and dry, a smile in it | "Look at these. You'd ask who shot them. The truth? No photographer. No studio. Just the app and one photo from his phone. And it's AI — which is the part nobody believes, because it still looks like him." |
| `WP_P2_PORTFOLIO_stillhim_9x16_v1` | 04 — cream shirt | Bright, higher, quick, slightly breathless | "These are all one selfie. Same guy, same face, same build. No photographer. No studio. No photoshoot. It tells him how to stand, then it renders the shot. And yes, it's AI. It still looks like him." |

**Seedance takes a voice direction and the difference is measurable, not just audible:** the dry
read came back at −22.4 dB mean, the bright one at −18.3. Both are now normalised to −14 LUFS in
the composite, which is also the reference ad's own target.

**Two changes to the build, both from the owner:**

- **The wall order is randomised per cut**, seeded so a cut is reproducible. The source selfie
  is not shuffled with the rest — it is pinned to the slot holding the word "selfie", or
  "photo" when a script never says "selfie".
- **A new end card**, `brand/WP_endcard_tryitnow_9x16.png`. The first one was Arial Black on
  black and carried no brand at all. This one is the kit: the mark, the wordmark in **Fraunces**,
  and a full-round gradient **"Try it now"** pill — the CTA pattern BRAND.md specifies. One
  gradient, on the wordmark and the pill, nowhere else. Fraunces and Inter are not installed on
  this machine and are fetched from the Google Fonts repo into the scratchpad at build time;
  both are SIL OFL 1.1.

**One defect to fix before anyone outside the team sees cut B:** two burned captions read "phot"
and "'s", because Whisper's word-level splitter cut `photo` and `it's` across subtitle rows. The
audio is right, the caption frames are not. Group word timings into whole tokens before the next
build.

## The rebuild — captions, no overlays, a real end card

Three owner instructions late on 2026-09-25 changed the finish, so every cut was rebuilt. The
clips were not re-generated: **the composite is free, so five cuts were remade for nothing.**

**1 · The captions now match the reference exactly.** Inter Bold in charcoal `#2B2B2E` on an
off-white `#FCFCFC` pill, radius 24, 28 px side padding, 110 px tall, with a soft drop shadow —
left edge 0.252 W, centred 0.648 H, all measured off the reference master. The earlier build
used Arial Bold in pure black on pure white at 0.10 W, which read as a subtitle rather than as
the reference's karaoke.

**2 · No persistent disclosure overlays, ever again.** See [[Production Guardrails]] Lane B
rule 5, which is now marked overruled with the reasoning and the exposure kept underneath it.
The end card's `This ad contains AI-Generated Content` is the whole on-frame disclosure.

**3 · A real end card.** `brand/WP_endcard_tryitnow_9x16.png` — warm radial glow, the mark,
"Authentic pro photos." in Inter Bold, "More matches." in gradient bold italic, "Be the right
swipe.", a gradient "Try it now" pill and the App Store badge. It follows the existing
`WP_endcard_9x16_placeholder.png` design language instead of inventing one. Inter Italic was
fetched alongside Inter and Fraunces for it.

### Two caption bugs, both found by looking at frames

**The first word of every early cut was missing.** `whisper-cli -ml 1` emits a first cue with
empty text, and splitting the SRT on blank lines makes the *next* cue absorb the stray newline —
its index line lands in the timestamp slot, the regex misses, and the cue is dropped. So "No"
never appeared in K1 and "Look" never appeared in the whoshot cut. **Parse SRT line by line,
scanning for timestamps; never split on blank-line blocks.**

**Then a fix made it worse.** Whisper's word splitter also cuts inside tokens (`phot`+`o`,
`it`+`'s`, `Authent`+`ic`), and a length heuristic to glue fragments back merged the real word
"no" onto "photographer" — a caption reading `photographerno` went out in a build. The right fix
is not a heuristic: **take the words from the sentence-level transcript and align them character
by character to the word-level timings**, using the tokens only as a clock. Both transcripts come
from the same pass on the same audio, so the alignment is exact, and a word that will not match
leaves the clock untouched instead of derailing everything after it.

## Open before this could go anywhere near a paid run

- **No music bed**, so the end card's 3.8 s are silent. The reference runs a bed ~6 dB under
  the read all the way to the last frame and it is what carries its silent tail.
- **Caption height is a deviation.** They sit at 0.66 H, the reference's position, not at the
  bottom as the owner's 2026-09-08 rule says — the cutout occupies the bottom-right corner and a
  bottom pill would collide with it. Owner's call; it is one number in the composite.
- **The wall stills are 3:4 and the frame is 9:16.** Cover-fitting them crops a third off the
  sides and zooms 1.5×, which turned the source selfie into a face close-up; the build uses
  contain-fit over a blurred, darkened copy of the same image instead. Native 9:16 results
  would remove the problem at the source.
- **No wall-alone tail.** The reference drops the presenter at 72 % and lets the wall run for
  three shots; here the speech fills all 15 s because that is Mini's ceiling. A final on
  Seedance 2.5 can be 30 s and get the tail back.
- **Actor 04 still reads below the 25–40 persona band.**
- **480p.** Fine for a test; a 1080p final is a new take of the same prompt, not an upscale.
- K2 (`stillyou`) and K3 (`algorithm`) not run — ~15 credits for the pair.
