---
tags: [brief, strategy]
campaign: WP_P2_DEMO_freecheck
persona: P2 Grinder
format: screen demo
variable: free pre-flight check (risk reversal)
order: 2
modelled_on: [charmd-profile-underperforming, regen-control-copy]
updated: 2026-09-06
---
# Brief — WP_P2_DEMO_freecheck

**Single variable tested:** the free-check risk-reversal angle. The mechanism *is* the ad —
screen demo, no talking head.

**Evidence:** the category's #2 universal complaint is paying before seeing anything (ReGen
~$50 blind — its dominant 1★ theme); every proven winner in [[Winning Ads 2026-09-02]]
sells a free first step. Ours is the only one that checks the *input photo* before charging
— unique per the scoreboard in [[Competitor Landscape]]. Re-read 2026-09-06: the model ad
stands at **521,572** EU reach after 195 days while its 0:27 sibling with identical copy
stands at 15,530 — the cut decides, so this hypothesis ships in two cuts (see Cuts).

## Hook (0.0–1.5 s, on-screen text over the app)

> Would your selfie **pass**?

Revised 2026-09-06: "selfie", not "photo" — WinkyPie checks the selfie he takes for the
pose, before it renders or charges. **It does not review a dating profile**: the profile
roast / "Is your profile underperforming?" mechanic is Roast's and Charmd's, not ours, and
no hook or overlay may imply we audit his account. The dating context lives in the
overlays and the primary text ("the photo that earns the match"), never in a promise to
check his profile. The question is about the selfie, never about the man. The
diagnostic-question pattern of the niche's biggest proven ad (Charmd's "Is Your Profile
Underperforming?", 195 days, 521,572 EU reach on 2026-09-06) — second person aimed at the *photo*, never the
person. The check itself is the answer to the question.

## Beat sheet (target 20–25 s, 9:16 screen recording — problem first, demo second)

| Time | On screen | Overlay copy |
|---|---|---|
| 0.0 | Selfie on the Photo Check screen, analysis running | "Would your selfie *pass*?" |
| 1.5 | Verdict lands — pass, with match % | "Most AI photo apps charge you for the bad result." |
| 3.5 | Hold on the verdict | "This one checks your selfie first. Free." |
| 6 | Quick rewind of the flow: pose picked → coaching card (angle, gaze, hands) → selfie taken | "Pick a pose. It coaches you." |
| 13 | Generation staged copy ("Painting your shot…") → result reveal | "One selfie. The photo your profile needed." + §11.2 disclosure line, small |
| 19–25 | Result full screen, then end card | "Pro photos. More matches." · "Be the right swipe." + App Store badge + "3 days free. Cancel anytime." |

## Cuts (added 2026-09-06)

Same hook, same overlays, same end card — two edits of one capture. Evidence: Charmd's #1
copy runs in a 0:32 cut at 521,572 EU reach and a 0:27 cut at 15,530; the words were
identical, the edit was not ([[Charmd]]). This is the sixth creative in the ad set —
inside Meta's "up to six creative options" guidance ([[Budget And Thresholds]]).

| Cut | Name | Length | What changes |
|---|---|---|---|
| A | `WP_P2_DEMO_freecheck_<ratio>_v1` | 20–25 s | The beat sheet above, as written: question → verdict → rewind of the flow → result |
| B | `WP_P2_DEMO_verdict_<ratio>_v1` | ≤ 15 s | Opens on the verdict landing at 0.0 s with the hook over it; **no voice, captions only, music bed** — the silent screen-recording shape that is the longest-running video family on the Roast page ([[Roast AI Creative Teardown 2026-09-06]]); 3 s rewind of pose → coaching → selfie; result at ~8 s; end card |

Both cuts ship all three ratios. If the ad set is capped at six creatives and the budget
cannot carry it, cut B takes the slot of `WP_P1_STATIC_proprices` (kill-first candidate),
not the other way round.

## Primary text

> The first photo on your profile decides the swipe. Most AI photo apps charge you for a
> bad one. WinkyPie checks your selfie for free first — then renders the photo that earns
> the match.

Support line (backup hook, same idea): "It checks your selfie before it costs you anything."

## To record

Fresh in-app screen capture of the real flow: pose → coaching → selfie → **photo check
(pass state)** → generation → result. Existing capture `video_1.mp4` (landing repo, §14)
covers only selfie capture — the check screen is the point, record it. Use a demo profile;
the result shown is an AI demo asset → the §11.2 results-vary disclosure must be on frame
from the reveal on.

## Guardrail check (§11)

AI disclosed on the reveal ✓ · results-vary disclosure on generated imagery ✓ · no match
promise ✓ · no profile-review implication — it is the selfie check, not an account audit ✓ · male demo subject ✓ · no pricing beyond "3 days free, cancel anytime" ✓.

## Do this, in order

1. Watch the two model ads (links in the app card): note the diagnostic question in the first
   1.5 s and the free first step. Study the mechanism, never the wording — their free step is
   a profile review, ours is the selfie check; nothing on frame may imply we audit his profile.
2. Set up a demo profile in the app. Pick a pose, run the coaching, take a selfie that passes
   the Photo Check — the pass state with its match percentage is the shot this ad exists for.
3. Record the real flow on an iPhone (screen recording, portrait, no notifications): pose →
   coaching card → selfie → Photo Check pass → generation → result. One clean take.
4. Edit cut A (`WP_P2_DEMO_freecheck_9x16_v1`, 20–25 s) per the beat sheet, then cut B
   (`WP_P2_DEMO_verdict_9x16_v1`, ≤ 15 s) opening on the verdict — see Cuts.
5. Overlays: the hook legible with sound off inside 1.5 s; the §11.2 results-vary disclosure
   on frame from the reveal on; end card with the App Store badge and "3 days free. Cancel
   anytime." No dollar figures anywhere.
6. Export the 9:16 master, then 4:5 and 1:1 with Meta's caption-crop safe margins; name every
   file per [[Creative Naming]].
7. Run the Guardrail check above line by line; fix what fails, do not argue with it.
8. Register the files in the app's asset browser and hand both cuts to [[08 Launch The Ad]]
   with the hypothesis line written before spend.
