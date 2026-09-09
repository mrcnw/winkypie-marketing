---
tags: [produce, scripts]
updated: 2026-09-09
---
# Host Scripts — the AI host lane, seven hooks

**Five third-person host monologues for Higgsfield's `ugc-website-video` workflow, one per
round-one hook, sized to the workflow's limits (25 s = a 15 s clip plus a 10 s clip, ≤40
words per 15 s, hook ≤8 words) and to ours (Lane B of [[Production Guardrails]],
PRODUCT.md §11). Written 2026-09-03 against the workflow's SKILL.md and its monologue,
capture and clip-prompt references, read through the MCP the same day.** The presenter is
a host who narrates what is on screen; the man on the cards is a disclosed demo; nothing
here is a testimonial. The human versions of the same five hooks are in [[Shoot Order]];
the platform and its limits in [[AI Production Platforms]]. The card images are real app
captures — the list to capture is below, and it is the one input this note still waits for.

## What the workflow does with these

One generated creator talks to camera for the whole video. The app appears only as real
screenshots popping in as overlay cards (~1.2–1.5 s each by default, none during the hook
or the closer); the creator's voice runs under everything; the closer has him act on a
phone whose screen is turned away. Cards anchor to the word being spoken, so every script
below maps its beats to cards. Three things the workflow wants that we override, on purpose:

- **Its monologue guide is first person** ("saved me twenty hours", "so I opened…"). Ours
  is third person about the product. The script is passed verbatim; the run may not
  rewrite it (Lane B rules 1–2).
- **Its craft rule wants a number in every claim.** Ours forbids numbers except the locked
  ones. "A hundred milliseconds" and "one selfie" are the only ones spoken; the trial is
  never mentioned (owner's rule, 2026-09-07).
- **It captures a URL first.** Do not let it capture `apps.apple.com` (the listing carries
  the stale pose counts, PRODUCT.md §12) or `winkypie.app`. Supply the stills below through
  its "I'll send screenshots" path; the workflow uses them as-is.

**2026-09-07, two changes in every script (owner's decisions):** `Pro photos.` became
`Authentic pro photos.`, and the closer "Three days free. Cancel anytime." became "Be the right
swipe." — the trial is never spoken. **The end-card half of that decision was reversed on
2026-09-09:** the card carries "Try it yourself free." The §11.3 auto-renewal sentence was
burned onto the first build and then removed at the owner's instruction — the open conflict
with PRODUCT.md §11.3 is written up in [[Production Guardrails]] Lane B rule 10. Nothing
changes in what the host says. Word counts are unchanged net (+1 −1). S2 was rendered before both changes and says the
old lines; it is regenerated only on the owner's command, at 480p first.

## Run parameters — identical for all five

| Parameter | Value | Why |
|---|---|---|
| Duration | 15 s + 10 s **on the test model** — 2.0 Mini caps at 15 s, so a test of a 20–25 s ad is two clips. **The final need not be:** Seedance 2.5 takes 30 s in one continuous read ([[AI Production Platforms]] item 6, corrected 2026-09-09). Split boundaries fall on sentence ends so the seam is inaudible | The Shoot Order's 20–25 s |
| Words | clip 1 ≤ 40, clip 2 ≤ 26; totals 55–61 | Workflow ceiling; ≈2.3–2.5 words/s, the calm end of its band |
| Creator | male, 25–40, US accent, plain room, natural light, self-filmed framing | Persona match; the workflow generates him (Soul 2.0 → Seedream de-slop) |
| **One host for all five** | Reuse the de-slopped seed from the first run as the "person photo" of runs 2–5 | Holds the person constant so the hook stays the only variable; saves the Soul + Seedream credits four times |
| Caption mode | `Both` — hook plate on top, word subtitles at the bottom | Hook legible with sound off |
| Closer action | Phone in hand, screen turned away or blank. Never a selfie mime | Dating-policy selfie rule; the workflow's own "no rendered UI" ban |
| Cards | 4–5 per script from the set below, 3:4 crops | Legibility — see the card set |
| Disclosures | Persistent "AI-generated presenter. Not a real customer." from frame one; the §11.2 line baked onto every result card | Lane B rule 5; PRODUCT.md §11.2 |
| Output name | `WP_<persona>_HOST_<slug>_9x16_v1` per [[Creative Naming]] | 4:5 and 1:1 cut from the master in post |
| **Go** | **Nothing is generated without the owner's explicit command, per run.** Free preparation — prompts, card crops, local ffmpeg, sandbox captions — may proceed unasked | Owner's rule, 2026-09-07 |
| **Test model** | **Every test run: Seedance 2.0 Mini at 480p** (1 credit/s → 12 for a 12 s clip, ≈ 25 per 25 s run), `image_references` = the same host seed, `generate_audio: true`, clips ≤ 15 s. Owner's rule 2026-09-08 | The cheapest model in the catalog that takes the seed and speaks — [[AI Production Platforms]] |
| **Final model** | **Seedance 2.5 at 1080p** (9 credits/s → 225 per 25 s run), only after the owner has approved the test — a 1080p render is a *new take* of the same prompt and seed, not an upscale | The workflow's locked model |

## The card set — what to capture from the app

**Rules first.**

1. **The man in the captures is in a paid ad.** His selfie and his result are his likeness.
   Use yourself, or a person who signs a one-line release (name, image, likeness; paid
   social; perpetual; AI-labelled output). The 2026-09-01 set in
   `app/public/assets/winkypie/mobile-app/app-flow/` shows a man who has not signed one —
   it is a layout reference until he does, not ad material.
2. **One profile, one session.** The same man in the check, the generating screen, the
   result and the gallery, so the cards tell one story.
3. **Source selfie without a visible phone.** The app asks for "a quick mirror picture". If
   the check accepts a front-camera or tripod photo at the same body angle, use that one:
   Meta's dating policy bans "a person visibly photographing themselves", and a mirror
   selfie with the phone in frame is exactly that. If only a mirror shot passes, capture
   both sets and keep the mirror set as the fallback.
4. **Native iPhone screenshots**, PNG, dark UI, portrait. Before the session: battery
   charged, silent-mode icon off, nothing running in the Dynamic Island. The status bar is
   cropped away anyway, but a low battery on a card looks sloppy.
5. **Nothing generated, nothing staged.** A warn state comes from a genuinely wrong selfie,
   never from a mock-up. No screen with a price on it (the paywall — §11.6), no pose count
   anywhere in frame, no App Store listing capture.

**The captures.** Drop them into `app/public/assets/winkypie/mobile-app/app-flow/` under
these names; the asset browser shows them on refresh. Keep the 2026-09-01 five until the
new set is complete, then replace them (git keeps the old ones).

| # | File | What is on it | Have? | Used by |
|---|---|---|---|---|
| 1 | `01-poses-grid.png` | Explore tab, WinkyPie wordmark, a category header and its poses. The hero card | ✓ 2026-09-01; redo only if the "Your poses / Liked" chips should match the new profile | S1 S3 S5 |
| 2 | `02-pose-card.png` | Reference pose + "Add your photo" | ✓ 2026-09-01 | S4 (S3 optional) |
| 3 | `03-coaching.png` | **The coaching text, fully legible: body angle, gaze, hands, expression, "photos to pick / photos to avoid".** Scroll or expand; two captures if it does not fit one screen | ✗ **missing — the beat every script names** | all |
| 4 | `04-photo-check-running.png` | The check in progress | ✗ optional | S2 fallback |
| 5 | `05-photo-check-pass.png` | Green tick + match % on the new profile's selfie | ✓ old profile — **redo** | all |
| 6 | `06-photo-check-warn.png` | A real warn or block with its reason text, from a genuinely mismatched selfie | ✗ **new** | S2 |
| 7 | `07-generating.png` | "Warming up the studio…" or "Painting your shot…", wordmark in frame | ✓ 2026-09-01 | S5 |
| 8 | `08-result.png` | Full result with the **Pose used / Photo used** row, new profile | ✓ old profile — **redo** | all |
| 9 | `09-result-2.png` | A second result, different scene (Studio or Café), same profile | ✗ **new** | S4; spare for S1 and S5 |
| 10 | `10-gallery.png` | Gallery with 2–4 results, same profile | ✗ optional | spare |

**While the app is open, in the same session:** a 9:16 screen recording of the whole flow
(pose → coaching → selfie → check pass → generating → result), no cuts. It is the raw
material for the in-house `WP_P2_DEMO_freecheck` ad ([[WP_P2_DEMO_freecheck]], "To
record"), not for the host clips — but it is the same session, the same profile and the
same five minutes.

**Not from the app, needed in post for every lane:** the end card, 1080×1920 — App Store
badge, "Authentic pro photos. More matches.", "Be the right swipe." — from the brand kit (PRODUCT.md
§10). Design-only, shared with the human lane's edits. **Decided 2026-09-07: the trial is never mentioned — not on the end card, not spoken**; the
closer is "Be the right swipe." and the App Store listing carries the trial. The badge is `app/public/assets/winkypie/brand/app-store-badge.png`.

**Crops.** A full phone screenshot contain-fit into the workflow's card box (0.78 of the
width, at most 0.60 of the height) lands about 530 px wide, and the match pill and the tick
are marginal on a phone at that size. Each still is cropped here to the region that matters
at 3:4 — the check: the selfie with the tick and the pill; the result: the photo plus the
Pose used / Photo used row; the coaching: the text block — so the card fills the box at
about 840 px. Capture full screens, never pre-cropped; the crops are made from the raw
files.

## How a script is built

Hook (locked, ≤8 words, no card) → the first body beat names WinkyPie and brings the hero
card → one card per beat, in the order in each table → the result card, with the §11.2
line, holds through "Authentic pro photos. More matches." → closer "Be the right swipe." with the phone action, no card → end card (ours, 2 s). The closer and the brand
line are held constant across all five; the hook is the variable. Nobody on screen says
"I", "my" or "me" as a user: the host narrates the demo in the present tense, the demo man
on the cards is "he", the viewer's photo is "your photo". Word counts are exact and sit in
the middle of the workflow's bands. Delivery notes are prompt cues for Seedance, not
on-screen text.

### S1 · `WP_P2_HOST_100ms_9x16_v1` — She decided in 100 ms.

| | |
|---|---|
| Hypothesis | The decision moment — [[WP_P2_STATIC_100ms]] |
| Hook plate (`hook.txt`) | She decided in 100 ms. |
| Delivery | Dry, to camera, the first word on the first frame. One lift on "work" |

**Clip 1 · 15 s · 38 words**

> She decided in a hundred milliseconds. Before she even reads a name. The first photo does
> all the work. WinkyPie makes that photo from one selfie. Pick a pose. It tells you how to
> stand. Angle, gaze, hands.

**Clip 2 · 10 s · 20 words**

> It checks the selfie first. Free. Then it renders the shot. Authentic pro photos. More matches.
> Be the right swipe.

| Spoken beat | Card |
|---|---|
| She decided … does all the work | none — hook, face |
| WinkyPie makes that photo from one selfie. Pick a pose | 01 poses grid — hero |
| It tells you how to stand. Angle, gaze, hands | 03 coaching |
| It checks the selfie first. Free | 05 check pass |
| Then it renders the shot. Authentic pro photos. No photographer | 08 result + §11.2, hold ≥2.5 s |
| Be the right swipe | none — closer, phone in hand, screen away |

Guardrails: "a hundred milliseconds" is a line, never a statistic — no "studies", no
percentage. "A name", not "your name": the softer form for a host talking to the viewer
(§11, personal attributes); the Billo brief keeps its own line. "She" is only ever the
person swiping.

Alt opening, wave two: "One swipe. One photo. One shot."

### S2 · `WP_P2_HOST_freecheck_9x16_v1` — Would your selfie pass?

| | |
|---|---|
| Hypothesis | The free check — [[WP_P2_DEMO_freecheck]]. The host-native hook: the check is on screen and the host narrates it |
| Hook plate | Would your selfie pass? |
| Delivery | A question to camera, then flat certainty on "Free". One lift on "why" |

**Clip 1 · 15 s · 35 words**

> Would your selfie pass? Most AI photo apps charge you for the bad result. WinkyPie checks
> the selfie first. Free. Green tick, it's a go. If it won't work, it says why. Retake.
> Nothing charged.

**Clip 2 · 10 s · 24 words**

> The rest is quick. Pick a pose, it tells you how to stand. One selfie. Authentic pro photos. No
> photographer. Be the right swipe.

| Spoken beat | Card |
|---|---|
| Would your selfie pass? Most AI photo apps charge you for the bad result | none — hook and the claim, face; the plate carries the question |
| WinkyPie checks the selfie first. Free. Green tick, it's a go | 05 check pass — hero, hold ≥2 s |
| If it won't work, it says why. Retake. Nothing charged | 06 check warn (04 running if no warn was captured; no card otherwise) |
| The rest is quick. Pick a pose, it tells you how to stand | 03 coaching |
| One selfie. Authentic pro photos. No photographer | 08 result + §11.2, hold ≥2.5 s |
| Be the right swipe | none — closer |

Guardrails: the hook carries no numeric token, which the workflow's hook rule asks for —
the locked line wins. "Most AI photo apps…" is the §5 framing verbatim; no app is named.
The warn card is a real state or no card.

Alt opening, wave two: "It checks your selfie before it costs you anything."

### S3 · `WP_P1_HOST_coached_9x16_v1` — You don't need to know how to pose.

| | |
|---|---|
| Hypothesis | Pose coaching — [[WP_P1_UGC_coached]]. **Not the confession hook**: that line is first person and stays human (Lane B rule 1). This clip tests the coaching idea under a host hook, so its read informs the idea, not the Billo line |
| Hook plate | You don't need to know how to pose. |
| Delivery | Reassuring, unhurried. One lift on "coaches" |

**Clip 1 · 15 s · 34 words**

> You don't need to know how to pose. WinkyPie coaches you. Pick a pose from the catalog.
> It tells you how to stand. Body angle, where to look, hands, expression. Mirror it. One
> selfie.

**Clip 2 · 10 s · 21 words**

> It checks the selfie first. Free. His pose, his selfie, his result. Authentic pro photos. No
> photographer. Be the right swipe.

| Spoken beat | Card |
|---|---|
| You don't need to know how to pose | none — hook, face |
| WinkyPie coaches you. Pick a pose from the catalog | 01 poses grid — hero (02 pose card only if the cards do not crowd) |
| It tells you how to stand. Body angle, where to look, hands, expression | 03 coaching — hold ≥2 s, the variable |
| Mirror it. One selfie | none — face |
| It checks the selfie first. Free | 05 check pass |
| His pose, his selfie, his result. Authentic pro photos. No photographer | 08 result with the Pose used / Photo used row + §11.2, hold ≥2.5 s |
| Be the right swipe | none — closer |

Guardrails: "his" is the demo man on the card, never the host. "Catalog", never a count.
The hook is exactly 8 words — the workflow's ceiling.

Alt opening, wave two: "Pick a pose. Mirror it. Done."

### S4 · `WP_P3_HOST_stillyou_9x16_v1` — Looks pro. Still you.

| | |
|---|---|
| Hypothesis | Likeness — [[WP_P3_POSERESULT_stillyou]]. The weakest fit for a host: the proof is a face, and the host's face is not the one on the cards. The disclosure carries it. Wave two |
| Hook plate | Looks pro. Still you. |
| Delivery | Matter-of-fact. One lift on "same" |

**Clip 1 · 15 s · 36 words**

> Looks pro. Still you. Not a filter. Not a face swap. WinkyPie takes one selfie and renders
> that same face in the pose he picked. Pose used, photo used, right there on the result.
> Same guy.

**Clip 2 · 10 s · 22 words**

> It's AI. It says so on screen. It checks the selfie first, free. Authentic pro photos. No
> photographer. Be the right swipe.

| Spoken beat | Card |
|---|---|
| Looks pro. Still you. Not a filter. Not a face swap | none — hook and the locked second line, face |
| WinkyPie takes one selfie and renders that same face | 08 result — hero, + §11.2, hold ≥2.5 s |
| in the pose he picked | 02 pose card |
| Pose used, photo used, right there on the result | 08 again, cropped to the Pose used / Photo used row |
| Same guy | 09 result-2 — the same face, another scene |
| It's AI. It says so on screen | none — face; the §11.2 line was just on screen |
| It checks the selfie first, free. Authentic pro photos. No photographer | 05 check pass, then 08 result + §11.2 through the brand line |
| Be the right swipe | none — closer |

Guardrails: never an old photo of anyone next to a result — pose → result only. "It says
so on screen" is true only if the §11.2 line is on every result card. Never "better";
always "same".

Alt opening, wave two: "Same face. New level."

### S5 · `WP_P1_HOST_algorithm_9x16_v1` — Not the algorithm. The first photo.

| | |
|---|---|
| Hypothesis | Blame-shift — [[WP_P1_STATIC_algorithm]]. Replaced the savings script on 2026-09-06 |
| Hook plate | Not the algorithm. The first photo. |
| Delivery | Flat, certain, a beat after "algorithm". The host talks about apps and photos, never about the viewer |

**Clip 1 · 15 s · 36 words**

> Not the algorithm. The first photo. On Hinge, Tinder and Bumble the first photo does the
> work. WinkyPie makes that photo from one selfie. Pick a pose. It tells you how to stand.
> Angle, gaze, hands.

**Clip 2 · 10 s · 20 words**

> It checks the selfie first. Free. Then it renders the shot. Authentic pro photos. More matches.
> Be the right swipe.

| Spoken beat | Card |
|---|---|
| Not the algorithm … does the work | none — hook, face |
| WinkyPie makes that photo from one selfie. Pick a pose | 01 poses grid — hero |
| It tells you how to stand. Angle, gaze, hands | 03 coaching |
| It checks the selfie first. Free | 05 check pass |
| Then it renders the shot. Authentic pro photos. More matches | 08 result + §11.2, hold ≥2.5 s |
| Be the right swipe | none — closer |

Guardrails: the host never diagnoses the viewer — no "you're not getting matches", no
"shadowban", no percentages. The app names are where the photo works; only the hook argues
with the algorithm. "The first photo" is the fixable thing; the selfie check is a selfie
check, not a profile review.

Alt opening, wave two: "Not the app. Not luck. The first photo."

### S6 · `WP_P3_HOST_triedthemall_9x16_v1` — Someone else's face. That's most AI photo apps.

| | |
|---|---|
| Hypothesis | The switcher's likeness angle — [[WP_P3_UGC_triedthemall]] (the owner's sixth campaign, 2026-09-07). **Not the first-person line**: "I tried every AI photo app" is his experience and stays human (Lane B rule 1). The host says the brief's primary text in the third person |
| Hook plate | Someone else's face. That's most AI photo apps. |
| Delivery | Dry and flat on the first two sentences, a small lift on "pose", slow down and hold on "Still you." |
| **Card** | **The app screen recording, not a still** — a 9:16 capture of the Explore tab being scrolled (City & Street → Café → Studio → Night Out → a pose card), status bar cropped off, played as a moving inset while the host looks down and scrolls his own phone. Run 2026-09-08 |

**Clip 1 · 12 s · 28 words** — to camera

> Someone else's face. That's most AI photo apps. WinkyPie starts from a pose. It coaches
> you. One selfie. It renders your face, your build. Looks pro. Still you.

**Clip 2 · 10 s · 9 words** — five seconds of him scrolling a phone (screen turned away,
never rendered), then up to the lens

> Authentic pro photos. No photographer. Be the right swipe.

| Spoken beat | Card |
|---|---|
| Someone else's face … Still you | none — face; the whole of clip 1 is the pitch |
| (silent scroll, clip 2 first 5 s) | the screen recording, from clip-2 start + 0.3 s to the closer − 0.3 s |
| Authentic pro photos. No photographer. Be the right swipe | none — closer, phone held low |

Guardrails: "someone else's face" is about the apps' output, never the viewer; no app named;
"your face, your build" is the brief's primary text; "same", never "better". The moving
inset replaces the result card, so the §11.2 line is not needed on it (nothing generated is
shown — only the catalog of reference poses, which are themselves AI demo assets: keep the
§11.2 line on any frame that shows a *result*).

### S7 · `WP_P2_PORTFOLIO_oneselfie_9x16_v4` — One selfie in. A profile's worth out.

| | |
|---|---|
| Hypothesis | Proof density — [[WP_P2_PORTFOLIO_oneselfie]], campaign 7, from [[Reface Male Portfolio Cut 2026-09-08]]. **The format is inverted:** the full frame is a wall of finished results and the host is a corner inset — and from 2026-09-08 he is only there for the first ten seconds |
| Hook plate | One selfie in. A profile's worth out. |
| Delivery | Even, unhurried, no lift — the frame is doing the selling. Long pauses are the point, not dead air |
| **Cards** | **None. Take the clips and composite ourselves.** Every full frame is one of our own result stills. Post-production rule 2 gives us that path |
| Run | Seedance 2.0 Mini, 480p, 9:16, `image_references` = the source selfie, native audio. The host ends up 25 % of frame height, so 480p is the *final* quality here, not a test compromise |

**Clip 1 · 12 s · 25 words**

> One selfie in. This one. Same face, same build, same shirt you had on. Pick a pose from
> the collection, or upload your own pose.

**Clip 2 · 10 s · 16 words**

> Nobody booked a photographer. Nobody hired a studio. Authentic pro photos. More matches.
> Be the right swipe.

**41 words total, against the 55-61 band above — deliberate.** In this format the silence is
the proof beat; filling it to the ceiling turns the ad back into an explanation, which is the
thing campaign 7 exists to test against.

| Spoken beat | Full frame | Host |
|---|---|---|
| One selfie in. | result 1 | inset, bottom-left |
| This one. / Same face, same build, | **the source selfie**, held 3.4 s | inset |
| same shirt you had on. | result 2 | inset |
| Pick a pose from the collection, | result 3 | inset |
| or upload your own pose. | the custom-pose result | inset — **last frame he appears in** |
| Nobody booked a photographer … More matches. | eight results, ~1.0 s each | **hidden — the wall runs alone** |
| Be the right swipe. | — | **full frame**, to camera |
| (end card, 2 s) | Try it yourself. + the AI line | — |

Guardrails: nothing first person — "nobody booked a photographer" is the third-person form of
the swipe's "I've never done a photoshoot", which stays in a human mouth (Lane B rule 1). No
count of results, ever. "Same shirt **you** had on" is second person about the viewer's photo,
which this note already allows ("the viewer's photo is *your photo*"); it drifted in from the
model on the first run and was kept.

**Disclosures — owner's decisions, 2026-09-08, and a deviation from Lane B rule 5.** The
persistent "AI-generated presenter. Not a real customer." line was removed; the §11.2
results-vary line was removed from the frames and replaced with a small `*AI Creator`
watermark, bottom right; `This ad contains AI-Generated Content` was added to the end card,
which carries it for the last two seconds of twenty-two. This is narrower than
PRODUCT.md §11.2 and BRAND.md ("ships with the §11.2 disclosure or it does not ship") and
than rule 5 above. Recorded here as the owner's call rather than folded into the rules; the
open risk is that nothing on the frames says the man talking does not exist.

## Priority and credits

Run in this order; stop where the credits stop.

| Order | Script | Why here |
|---|---|---|
| 1 | S2 freecheck | The one differentiator no competitor has; the check is on screen and a host narrating it is the honest format |
| 2 | S1 100ms | The hero hook; gives the static a video sibling |
| 3 | S3 coached-host | The only AI read available on hypothesis 3 — under a host hook, not the confession |
| 4 | S5 algorithm | The blame-shift under a host; its static already tests the angle, the host read is the cheap second look |
| 5 | S4 stillyou | Weakest fit for a generated face; runs only with the disclosure doing the work |
| 6 | S6 triedthemall-host | The owner's sixth hook under a host; **ran 2026-09-08 at 480p, 55 credits** — the first run with a moving inset ([[Host Run 2026-09-08]]) |

Credits, from the estimates in [[AI Production Platforms]]: one 25 s run ≈ 250–330 (two
Seedance 2.5 clips at 1080p with audio, plus captions), plus ~60–100 once for the host seed;
three runs with retries ≈ 1,000 — the Plus month. An alternate opening costs a full clip-1
regeneration (~120–165 each); alternates are wave two, after the human takes have been
read. **First run 2026-09-07 — S2 went through the whole chain for 228.24 credits measured**
(clips 135 + 90, de-slop 3, two seeds 0.24; captions and ffmpeg free); the estimate above was
high. The de-slopped seed — Higgsfield job `9310da71-0129-404f-9892-38d3fded0cfa` — is the
host for runs 2–5. The run, its overrides and its QA: [[Host Run 2026-09-07]]. Runs 2–5 wait
for the released card set: the clips are the cost, the composite is free, so nothing is lost
by waiting.

## Post-production — ours, after the workflow delivers

1. **Persistent disclosure.** "AI-generated presenter. Not a real customer." burned over
   `final_captioned.mp4` from frame one — small, inside the vertical area Meta's Reels and
   Stories UI leaves visible, clear of the hook plate and the subtitle band. Check against
   Meta's safe-zone template on the first run; if the workflow's subtitle band sits in the
   bottom cut zone, re-burn the subtitles higher from the Whisper word timings. Record the
   recipe in [[Production Guardrails]].
2. **Card holds.** The variable's card holds longer than the default: the check card ≥2 s
   (S2), the coaching card ≥2 s (S3), every result card ≥2.5 s so the §11.2 line is
   readable. If the composite step has no per-card duration, re-composite locally from
   `creator_full.mp4` and the cards with ffmpeg — both are ours after the run.
3. **End card**, 2 s, after the closer. Then 4:5 and 1:1 cut from the master; the cards sit
   centred, so the 4:5 crop keeps them.
4. **Keep the C2PA/IPTC metadata.** Meta's own AI label is neutral to delivery; stripping it
   is the one thing that turns a labelled ad into a deceptive one.

## QA before anything is uploaded

Lane B's list in [[AI Production Platforms]], plus per script: locked lines verbatim · hook
≤8 words and readable sound-off inside 1.5 s · no "I / my / me" as a user · no number beyond
the locked ones · no price, no pose count, no other app, no outcome · §11.2 on every result
card · the presenter line from frame one · real screens only · closer with the screen turned
away · one host across the set.

## Open

- The card captures (table above) and the release for the man on them.
- Which selfie variant the check accepts without a phone in frame.
- ~~Credit cost per run and the disclosure recipe~~ — measured and recorded 2026-09-07 in
  [[Host Run 2026-09-07]] and [[Production Guardrails]] (Lane B rule 5).
- ~~Whether the composite step takes per-card durations~~ — we composite locally from the real
  Whisper word times, so the windows are ours; the script is in [[Host Run 2026-09-07]].
- Meta's dating classification: if "dating", these clips are internal animatics only
  ([[Production Guardrails]]); the Billo order goes ahead regardless.
