---
tags: [launch, tracker]
updated: 2026-09-26
---
# Campaign Tracker

One row per object. Launch time is the moment the campaign switch went on; every window is
counted from it. No IDs here (step 06 rule) — names only.

## Smoke test 2026-09-26

Decision and settings: [[Smoke Test 2026-09-26]]. Read the rules there before touching anything.

| Object | Name | Hypothesis | Launched | Budget | Status |
|---|---|---|---|---|---|
| Campaign | `WP_SMOKE_2026-09_US_iOS_installs` | — | switched on 2026-09-26 ≈19:40 CEST, ACTIVE confirmed 19:44 | $15/day, cap $210 | live |
| Ad set | `WP_SMOKE_US_iOS_EN_installs` | — | **scheduled start 2026-09-27 00:00 CEST** (2026-09-26 18:00 New York), set by the owner in Ads Manager after the switches went on | campaign budget | scheduled; "learning limited" expected once it delivers |
| Ad | `WP_P2_STATIC_oneselfie_4x5_v1` | [[WP_P2_STATIC_oneselfie]] (hypotheses/, committed 2026-09-22) | same | — | live |
| Ad | `WP_P2_STATIC_coworker_4x5_v1` | [[WP_P2_STATIC_coworker]] (hypotheses/, committed 2026-09-22) | same | — | live |
| Ad | `WP_P2_STATIC_swipingback_9x16_v3` | [[WP_P2_STATIC_swipingback]] (hypotheses/, 2026-09-26) | same | — | live |

**Do not touch until: 2026-10-10, end of the account day (Europe/Warsaw).** Delivery starts
at 00:00 on 2026-09-27, so day 1 is a full account day and the fourteen days run 09-27 to 10-10.

Before delivery starts (2026-09-26, evening): the ad set's attribution setting was found to be
**1-day click** (Ads Manager substituted its own value when the owner saved the ad set); the plan
and [[KPI]] say 7-day click. Being corrected before the first impression, so no clock restarts.

| Read | Date | What |
|---|---|---|
| Day 1 | 2026-09-27 | delivery only: spend above zero, impressions on every ad, events arriving |
| Day 7 | 2026-10-04 | every ad still delivering, event volume, CPM to date |
| Day 14 | 2026-10-11 (morning) | hook rate, hold rate, CTR per ad at the impression floor; measured CPM re-cuts the ads-per-set table; no scaling |
| Day 28 | 2026-10-25 | trial and paid counts from RevenueCat, directional only |

Restarted clocks: none so far. If Meta rejects an ad and it is fixed and re-submitted, it gets
its own launch time here and is reported separately ([[08 Launch The Ad]] step 5).
