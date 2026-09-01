---
tags: [step, strategy]
status: todo
phase: strategy
owner:
updated: 2026-09-01
---
# 03 · Choose Videos And Five Campaigns

Checklist: [[03 TODO]] · Canvas: [[Meta Ads.canvas|Meta Ads]]

## Goal
Five campaigns picked, each testing exactly one idea, each with a brief and a named video
concept — so production knows what to shoot and analysis knows what the result means.

## Process
1. **One variable per campaign.** Five campaigns that differ in hook *and* format *and*
   persona teach you nothing — you cannot attribute the result. Pick the axis you are
   testing first, then hold everything else constant.
2. **Cover the personas, do not repeat them.** Roughly: two campaigns at P2 (the analytical
   grinder — largest addressable group), two at P1, one at P3. Adjust once you have data.
3. **Format follows hook, not preference.**

   | Hook type | Format that carries it |
   |---|---|
   | "You don't have a good photo of yourself" | UGC, phone-shot, talking |
   | "One selfie, 30 seconds" | Screen demo — the mechanism *is* the ad |
   | "Her decision is made in 100 ms" | Static or text-led, research framing |
   | "Your face, your build" | Before/after — face preserved, clearly disclosed as AI |

4. **Write the brief before anything is shot.** A brief is: the hook verbatim, the beat
   sheet (what happens at 0.0s / 1.5s / 5s / end), on-screen copy, CTA, and specs. If the
   first 1.5 seconds are not written down, the video will not have a hook.
5. **Name it now, not after export.** Naming drift is the reason results cannot be compared
   later. Convention:
   `WP_<persona>_<format>_<hook-slug>_<ratio>_v<n>` → `WP_P2_UGC_100ms_9x16_v1`
6. **Specs are non-negotiable.** 9:16 for Reels/Stories, 1:1 and 4:5 for feed. Hook legible
   with sound off. Safe margins respected — Meta crops, and it always crops the caption.
7. **Run the guardrail check before the brief is approved**, not after production: men only,
   AI disclosed, no unsourced stat, no implied different person, no assumed dating status.

## Done when
- Five briefs exist in `briefs/`, each naming its persona, its format and its single
  variable.
- Every brief has a written 1.5-second hook and a beat sheet.
- The naming convention is documented and all five names are assigned.
- The dropped candidates and the reason for dropping them are recorded.

## Output
- `briefs/<name>.md` — five of them
- `Creative Naming.md`

## Notes
Five is the number because it is the smallest set that can produce a clear winner and a
clear loser at a sane budget. Do not stretch to eight because eight hooks looked good.
