---
tags: [step, strategy]
status: doing
phase: strategy
owner:
updated: 2026-09-02
---
# 05 · Ad Strategy And Budget

Checklist: [[05 TODO]] · Drawing: [[Process.excalidraw|Process]]

## Goal
A written spending plan: how much, split how, for how long, and the exact numbers at which
a campaign gets scaled, iterated or killed — decided before any money moves.

## Process
1. **Work backwards from what a customer is worth.** Target CAC comes from price and
   retention, not from what feels affordable. Then: target CPI = target CAC × (install →
   trial → paid conversion rate). If you do not have those rates yet, say so — the first
   round of spend is buying that number, and that is a legitimate goal on its own.
2. **Budget the learning phase, not the day.** Meta needs a meaningful number of optimisation
   events before its delivery is worth reading. A budget too small to exit the learning
   phase produces noise, and noise is more expensive than no data.
3. **Split testing and scaling.** A reasonable starting shape is most of the budget on the
   five test campaigns and the rest held back for whatever wins. Do not spend the reserve
   before there is a winner.
4. **Write the thresholds before launch.** Fill this in with real numbers:

   | Decision | Trigger | Action |
   |---|---|---|
   | Kill | CPI above ___ after ___ days *and* the learning phase is complete | Stop, write the lesson |
   | Iterate | Hook rate below ___ but CPI acceptable | New hook, same offer |
   | Scale | CPI below ___ for ___ consecutive days | Raise budget by no more than ~20%/day |
   | Hold | Anything inside the learning phase | Do nothing. Do not touch it. |

   Round one's filled-in table, with impression floors and the reserve rule, is in
   `Budget And Thresholds.md` (2026-09-02); the metric definitions are in `KPI.md`.

5. **The hardest rule: leave it alone.** Editing a campaign inside its learning phase resets
   it and burns the spend that came before. Most wasted budget goes this way.
6. **One change at a time when scaling.** Raising the budget and swapping the creative on
   the same day means you will never know which one moved the number.
7. **No dollar pricing on web surfaces** regardless of what the ad promises — App Store is
   authoritative. See guardrail 3 in the root `CLAUDE.md`.

## Done when
- Total budget, per-campaign daily minimum and test window are written down.
- Every cell in the threshold table holds a number.
- Target CAC and target CPI are derived, with the assumptions behind them stated.
- The rule for what happens to the reserve budget is written.

## Output
- `Budget And Thresholds.md`
- `KPI.md` — target definitions, shared with [[09 Analyze KPIs]]
- `KPI Scenarios.md` — the thresholds applied to invented numbers (`scenario: true`);
  rendered by the app's KPI tab until step 09 writes a real review
- `Campaign Plan.excalidraw.md` — the round-one plan drawn: structure, budget, timeline and
  gates. Generator: `.claude/skills/draw/generators/campaign-plan-round-one.js`

## Notes
The thresholds exist to protect you from yourself at 11pm on day three. Their whole value
is that they were set while you were calm. Do not renegotiate them mid-flight.

Vocabulary, settled 2026-09-02: the loop's five "campaigns" are five *hypotheses*. In Ads
Manager they run as **five ads in one ad set in one Advantage+ app campaign** — five Meta
campaigns would each need ~50 installs a week to exit learning, and iOS 14+ app campaigns
are single-ad-set by rule. The reasoning and Meta's own articles are in
`Budget And Thresholds.md`; steps 03, 08 and 09 keep saying "campaign" for the hypothesis.
