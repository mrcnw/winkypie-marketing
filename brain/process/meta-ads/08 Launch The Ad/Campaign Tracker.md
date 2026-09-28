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

**Do not touch until: 2026-10-12, end of the account day (Europe/Warsaw).** See the restarted
clock below: the 09-27 start never delivered; the fourteen full days run 09-29 to 10-12.

Attribution setting: **1-day click**. Not an error and not editable — for install-optimised
iOS 14+ ad sets under AEM Meta offers no other window (7-day click exists only for app-event
or value optimisation). [[KPI]] and [[Budget And Thresholds]] corrected on 2026-09-26; installs
that happen more than a day after the click are counted by SKAdNetwork, not by the AEM view.

| Read | Date | What |
|---|---|---|
| Day 1 | 2026-09-27 | delivery only: spend above zero, impressions on every ad, events arriving |
| Day 7 | 2026-10-04 | every ad still delivering, event volume, CPM to date |
| Day 14 | 2026-10-11 (morning) | hook rate, hold rate, CTR per ad at the impression floor; measured CPM re-cuts the ads-per-set table; no scaling |
| Day 28 | 2026-10-25 | trial and paid counts from RevenueCat, directional only |

**Restarted clock, 2026-09-28.** The account's activity log shows the campaign and all three ads
switched off on 2026-09-26 at 21:02 CEST (owner's account, about twenty minutes after launch,
while the attribution question was being checked) and switched back on 2026-09-28 at 15:07 CEST
from a second admin's account. Nothing delivered on 2026-09-27. The scheduled 00:00 start was
therefore never used. New reference: delivery possible from 2026-09-28 15:07 CEST; first full
account day 2026-09-29; **do not touch until 2026-10-12**; reads on 2026-09-29 (delivery),
2026-10-06 (day 7), 2026-10-13 (day 14), 2026-10-27 (day 28).

Restarted clocks: the one above. If Meta rejects an ad and it is fixed and re-submitted, it gets
its own launch time here and is reported separately ([[08 Launch The Ad]] step 5).
