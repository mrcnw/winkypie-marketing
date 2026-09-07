---
tags: [strategy, kpi]
updated: 2026-09-02
---
# KPI — definitions, floors and targets

**Five metrics, read top-down, one per funnel step; each judged only past an impression or
event floor; the first two decide creative, the last two decide the business.** Shared with
[[09 Analyze KPIs]]. Metric names are Meta's own so the Ads Manager columns match
([video metric definitions](https://www.facebook.com/business/help/2146677122218192),
[how video metrics are calculated](https://www.facebook.com/business/help/1868286323447328)).
The spend and the decision rules are in [[Budget And Thresholds]].

## The funnel and its metrics

| Step | KPI | Meta columns / formula | Read at | Floor before reading |
|---|---|---|---|---|
| Did they stop? | **Hook rate** | *3-second video plays* ÷ *Impressions* | day 7 (directional), day 14 | ≥3,000 impressions per ad `[unsourced]` |
| Did they stay? | **Hold rate** | *ThruPlays* ÷ *3-second video plays* (ThruPlay = 15 s or full video if shorter, unique seconds — replays do not count) | day 14 | same |
| Did they act? | **CTR (link)** | *Link clicks* ÷ *Impressions* | day 14 | same |
| Did they install? | **CPI**, install rate | *Cost per app install*; *App installs* ÷ *Link clicks*. AEM attribution setting (7-day click) as the reporting view; SKAN column for comparison | day 14, ad set level; ad level only at ≥20 installs `[unsourced]` | ad set out of learning (~50 installs in 7 days) |
| Did they pay? | **Trial start rate, trial→paid, CAC** | *StartTrial* (or the custom event we name) ÷ *App installs*; paid ÷ trials from RevenueCat; spend ÷ payers | day 28, aggregated over all ads | ≥40 payers before calling anything more than directional `[unsourced]` |

Statics have no hook or hold rate. For the two static ads the "did they stop" proxy is CTR
and the "did they stay" proxy is *Instant experience view time* only if used — otherwise
skip straight to CTR. Compare statics with statics.

## Where each number comes from, and its lag

| Number | Source | Lag / caveat |
|---|---|---|
| Impressions, 3-second plays, ThruPlays, link clicks, CTR | Meta, near real time | Not affected by SKAdNetwork ([SKAN reporting](https://www.facebook.com/business/help/584603712214119)) |
| App installs, CPI | Meta AEM view: near real time, 7-day click. Meta SKAN view: "delays of at least 24 hours", campaign-level aggregate, statistically modelled at ad level, unstable for "a few days" after launch ([AEM vs SKAN](https://www.facebook.com/business/help/1356268495231843)) | Use AEM for decisions; check SKAN agrees in direction |
| Trial starts, paid conversions, refunds | RevenueCat (entitlement `access`, PRODUCT.md §2), optionally forwarded to Meta as app events | Trial → paid resolves 3 days after trial start; first payers appear day 4 at the earliest |
| Optimisation events since last significant edit | Meta, *Results* and *Last significant edit* columns ([learning phase](https://www.facebook.com/business/help/112167992830700)) | Tells you whether the ad set is judgeable at all |

## Targets for round one

Round one has no baseline, so targets are of two kinds: **relative** (decide) and
**absolute** (orient, all `[unsourced]` until our own data exists).

| KPI | Relative rule (decides) | Absolute orientation `[unsourced]` |
|---|---|---|
| Hook rate | Top two of five = keep; bottom two = iterate the first 1.5 s; bottom two **and** below 20% = kill | Practitioner rules of thumb put "good" at ≥30% and "weak" at <20% for 9:16 video on Meta |
| Hold rate | Below the ad set average with a top-two hook rate = the middle beats are the problem | ≥25–30% of 3-second viewers reaching ThruPlay is commonly called healthy |
| CTR (link) | Below half the ad set average at the impression floor = kill regardless of hook | ~1% is a common orientation for app install video; statics vary widely |
| CPI | ≤0.8× the ad set average for 14 days with ≥20 installs = scale candidate | None sourced for US iOS in this category on 2026-09-02 — the first measured CPI becomes the baseline |
| Install → trial | Measured, not targeted, in round one | RevenueCat 2026, North America: **7.1% median, ~15% P90** (download → trial); almost all on day 0 — see [[Budget And Thresholds]] |
| Trial → paid | Measured, not targeted, in round one | RevenueCat 2026: **25.5% median for ≤4-day trials, 22.2% Photo & Video**; hard-paywall apps convert 10.7% of downloads to paid by day 35 |
| CAC per payer | Measured; compared against the payback table in [[Budget And Thresholds]] | Month-1 payback needs CAC ≤ $30–36 net; year-1 payback CAC ≤ $43–53 net (RevenueCat high-priced-tier LTV, less Apple) |

## Targets by day — what "good" looks like at each read

Targets, not benchmarks: they say what we are aiming at so the read has a yardstick before
the numbers arrive. Absolute percentages carry the same `[unsourced]` caveat as above until
our own data replaces them; the install and payer counts derive from the break-even table in
[[Budget And Thresholds]].

| Day | Good looks like | Red flag → action |
|---|---|---|
| **7** | Ad set out of learning, or clearly heading there: ≈50 installs since launch. Spend on plan. Every ad has impressions. Best video hook rate ≥ 30%, weakest ≥ 20%; CTR ≥ 1% on at least two ads | Learning limited → one budget raise, note the reset. An ad with zero impressions → check for rejection, not creative |
| **14** | ≥ 100 installs in total, so the ad set CPI is a real number. At least one ad with ≥ 20 installs and CPI ≤ 0.8× the average — the scale candidate. At least one clear kill. Install → trial ≥ 15% (the P90) is good, ≥ 7% is the median | Only one ad above 3,000 impressions → a budget or auction problem, not five bad creatives. No ad under 0.8× average → nothing to scale yet; iterate hooks, do not raise spend |
| **28** | Trial → paid ≥ 25% (median for ≤4-day trials) is good, ≥ 40% is strong. Payers at or above the **year-one break-even** for the spend (13–17 payers for $650–850). CAC ≤ $43–53 net = pays back within the year; ≤ $30–36 = pays back in month one | Healthy CPI but payers below break-even → the funnel, not the ads: paywall copy, the free check, the coaching. Fix one step, re-run |

## Reading rules

1. **One funnel step at a time.** The worst step gets the fix; the others wait a round
   ([[09 Analyze KPIs]] step 1).
2. **Floors before verdicts.** An ad under 3,000 impressions has not been tested; an ad set
   inside learning has not been tested. Say "starved" or "learning", never "lost".
3. **Same window for every ad.** Day 0 = launch timestamp from the tracker; day 14 read uses
   exactly 14 days for all five, even if one restarted after a rejection (then it is reported
   separately, [[08 Launch The Ad]] step 5).
4. **Directional under 40 payers.** Write "directional" in the review; a confident CAC from a
   dozen payers is how a dead angle gets scaled.
5. **Thresholds change between rounds, in writing, never mid-round.** When our own numbers
   replace the `[unsourced]` orientations, edit this file and date it.
