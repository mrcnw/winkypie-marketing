---
tags: [step, launch]
status: todo
phase: launch
owner:
updated: 2026-09-01
---
# 09 · Analyze KPIs

Checklist: [[09 TODO]] · Canvas: [[Meta Ads.canvas|Meta Ads]]

## Goal
For each campaign: a decision — scale, iterate or kill — reached by reading the funnel
top-down against thresholds set before launch, plus a written lesson either way.

## Process
1. **Read the funnel top-down and fix only the worst step.** Each step has a distinct cause:

   | Step | Metric | If it is the worst step |
   |---|---|---|
   | Did they stop? | 3s view rate / hook rate | The first 1.5 seconds. Nothing downstream matters. |
   | Did they stay? | Hold rate, thruplay | The middle. Pacing, or a promise that was not kept. |
   | Did they act? | CTR | The CTA, or an unclear offer. |
   | Did they install? | CPI, install rate | The App Store page, not the ad. |
   | Did they pay? | Trial start, trial→paid, CAC | Onboarding and the offer, not the ad. |

   Fixing two steps at once means the next round teaches you nothing.
2. **Compare against the pre-written thresholds, not against feelings.** If a number is
   inside the kill threshold, it is killed. The point of writing them down beforehand was to
   remove the negotiation.
3. **Judge only completed learning phases.** A campaign still learning is not a result. If
   it never exited learning, the finding is about budget, not creative — say that.
4. **Statistical honesty.** Five campaigns at a small budget will not give clean
   significance. Say "directional" when it is directional. A confident conclusion from
   forty conversions is how a dead angle gets scaled.
5. **A refuted hypothesis is a real result.** Write it up with the same care as a winner.
   The retired list is what stops the same losing angle coming back next quarter.
6. **One lesson per campaign, one sentence.** Mechanism, not outcome: "screen-demo hooks
   beat talking-head hooks for P2" is a lesson; "campaign 3 did well" is a note.
7. **Close the loop.** Every finding goes back into research as an input. If nothing from
   this round changes what you do next round, the analysis was not finished.

## Done when
- Every campaign has a decision, a marked hypothesis and a written lesson.
- The worst funnel step is identified per campaign, with the fix named.
- Retired angles are recorded where they will be seen before the next round.
- The next round's research brief is written.

## Output
- `KPI Review <YYYY-MM-DD>.md` — one per round
- `Retired Angles.md`
- Updates to `KPI.md` in [[05 Ad Strategy And Budget]]'s folder, if the thresholds
  themselves turned out to be wrong

## Notes
Thresholds can be revised *between* rounds, on evidence, in writing. They can never be
revised mid-round because a campaign you like is failing.
