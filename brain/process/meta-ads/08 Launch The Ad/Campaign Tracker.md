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

## Reads

### Day 1 — 2026-09-29, 08:07 CEST (API, `maximum`, i.e. everything since activation)

| Object | Impressions | Reach | Spend | CPM |
|---|---|---|---|---|
| Ad set | 352 | 333 | $3.67 | $10.43 |
| `oneselfie_4x5_v1` | 280 | 257 | $1.56 | $5.57 |
| `swipingback_9x16_v3` | 69 | 66 | $2.09 | $30.29 |
| `coworker_4x5_v1` | 3 | 3 | $0.02 | $6.67 |

2026-09-28 (activation day, from 15:07): 1 impression in total. Everything above landed after
00:00 CEST on 09-29, i.e. the US evening of 09-28. Delivery works; the new account is being
fed cautiously. Meta already splits the budget unevenly (oneselfie takes most, coworker is
starved), exactly as [[Budget And Thresholds]] said it would. Installs: "not available" yet
(SKAdNetwork lag, AEM sample). No verdicts from this — day-1 numbers are delivery, not results.

### Day 2 — 2026-09-30, 00:28 CEST (API; 2026-09-29 was the first full account day)

| Day | Impressions | Reach | Link clicks | Spend | CPM | Installs (AEM) |
|---|---|---|---|---|---|---|
| 2026-09-28 (from 15:07) | 1 | 1 | 0 | $0.00 | — | 0 |
| 2026-09-29 | 782 | 654 | 132 | $16.84 | $21.53 | 1 |

$16.84 on a $15 daily budget is inside Meta's rule (up to 25 % over on a single day, the
calendar week averages to the budget); the $210 campaign cap still bounds the total.

Per placement since launch: Audience Network 267 impressions, 128 link clicks, $1.36 — it
stopped growing after the morning of 09-29 (263 → 267), so the account-level exclusion or
Meta's own re-allocation took effect. Facebook 252 impressions, 3 link clicks, $8.78 (CPM ≈ $35).
Instagram 278 impressions, 2 link clicks, $7.07 (CPM ≈ $25). **Every CTR read from this test
excludes Audience Network**: on Facebook + Instagram it is 5 link clicks on 530 impressions,
≈ 0.9 %, a handful of clicks — directional at best.

Per ad since launch: oneselfie 644 impressions, $12.23, 1 install (AEM, 1-day click) ·
swipingback v3 141 impressions, $4.88, CPM $34.61 (Reels-heavy) · coworker 12 impressions,
$0.10 (starved, as the plan expected for the weakest early auctions). One install at $16.84 is
a single event, not a CPI. CPM on Facebook and Instagram is running well above the $16
orientation in the strategy notes; early days on a new account, to be re-read on day 7.

### Day 5 — 2026-10-02, 18:23 CEST (API, since activation)

| Day | Impressions | Reach | Link clicks | Spend | CPM | Installs (AEM, 1-day click) |
|---|---|---|---|---|---|---|
| 2026-09-29 | 791 | 658 | 132 | $16.97 | $21.45 | 1 |
| 2026-09-30 | 1,076 | 800 | 148 | $20.60 | $19.14 | 4 |
| 2026-10-01 | 867 | 608 | 26 | $21.34 | $24.61 | 4 |
| 2026-10-02 (to 18:23) | 844 | 625 | 30 | $20.25 | $23.99 | 3 |
| **Total** | **3,579** | — | 336 | **$79.16** | — | **12** |

Daily spend runs 13–42 % above the $15 budget on single days — Meta's daily-budget
flexibility, bounded by 7 × daily per calendar week ($105 for 09-28 → 10-04) and by the $210
campaign cap. Nobody changed the budget (activity log: only billing events since 09-28). The
account is being billed in $15 chunks against the prepaid funds.

| Ad | Impressions | of which Audience Network | Link clicks FB+IG | CTR FB+IG | Spend | CPM | Installs (AEM) |
|---|---|---|---|---|---|---|---|
| `oneselfie_4x5_v1` | 3,114 | 729 | 41 / 2,381 | 1.7 % | $62.33 | $20.02 | 11 (FB 5 · IG 2 · AN 4) |
| `swipingback_9x16_v3` | 442 | 54 | 9 / 388 | 2.3 % | $16.31 | $36.90 | 1 (AN) |
| `coworker_4x5_v1` | 23 | 0 | 3 / 23 | — | $0.52 | $22.61 | 0 |

Audience Network is back (729 + 54 impressions, 283 of the 336 link clicks, $4.46 of spend):
the account-level exclusion either was not applied or does not bind Advantage+ app campaigns.
Spend there is 6 % of the total; its clicks are excluded from every CTR above; its 5 installs
are kept apart until RevenueCat says whether they trial.

Video funnel, ad-set level (≈ swipingback, coworker is 23 impressions): 439 plays, 132
3-second plays, 22 ThruPlays. Swipingback hook rate ≈ 130 / 442 ≈ **29 %** (orientation
"good ≥ 30 %"), hold rate ≈ 21 / 130 ≈ **16 %** (orientation "healthy 25–30 %") — the opening
works, the middle beats lose them, on 442 impressions, so directional. Blended AEM CPI
$6.60 `[smoke test, n<20 installs, AEM only]` — inside the plan's $6–8 pessimistic band, and
AEM undercounts (ATT opt-ins only), so the true figure is lower. Oneselfie has crossed the
3,000-impression floor overall but not on Facebook + Instagram alone (2,381); the other two are
starved. No verdicts; next read day 7.

**App Store Connect, first-time downloads (owner's screenshot, 2026-10-02):** 09-29: 3 ·
09-30: 7 · 10-01: 7 — 17 over the three days against Meta's 9 AEM installs for the same days,
i.e. AEM sees roughly half, as expected (ATT opt-ins only). If the organic baseline is near
zero, paid CPI for those days is ≈ $58.91 / 17 ≈ **$3.50** `[smoke test, organic not yet
subtracted]`. Open: the pre-campaign baseline (09-20 → 09-27) and the Sources breakdown (App
Referrer: Facebook / Instagram) in App Store Connect. Apple's day is UTC, Meta's is
Europe/Warsaw — compare multi-day sums, not single days. **From here on, installs for CPI come
from App Store Connect minus organic, not from Meta's column.**

**SDK events (dataset, 2026-09-28 → 2026-10-02 17:35 CEST, ATT opt-ins only):** first_app_launch
21 · initiated_checkout (paywall reached) 9 · StartTrial 1 · purchase 3 · achievement_unlocked 4.
The one trial started 2026-09-29 at about 15:00 CEST, so its three days ran out on 2026-10-02 at
about 15:00 CEST; RevenueCat decides whether it converted or was cancelled. The 3 purchase events
and 2 of the 9 paywalls sit in one hour on 2026-10-01 around 11:00 CEST; the owner confirmed on
2026-10-02 that nobody has bought, so they are not customers and do not count. Funnel so far:
launches → paywall 9 / 21 (43 %), paywall → trial 1 / 9, installs → trial 1 / 17 (≈ 6 % against
the 7.1 % median in [[KPI]]). At 17 installs the hard-paywall median (10.7 % download → paid by
day 35) predicts under two payers, so zero paid is the expected reading, not a verdict. The
business read needs ≥ 40 payers ([[KPI]]), roughly 400 installs at that rate — not this test's
job ([[Budget And Thresholds]]).

Drawn: [[Smoke Test Funnel 2026-10-02]] — spend → impressions → taps → installs → paywall →
trial with the drop at each step, plus the per-ad strip. Same numbers as this read; the
drawing does not get updated, the day-7 read gets its own if one is worth drawing.
