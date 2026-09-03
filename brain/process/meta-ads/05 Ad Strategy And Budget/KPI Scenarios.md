---
tags: [strategy, kpi, scenario]
scenario: true
updated: 2026-09-02
---
# KPI Scenarios — the thresholds applied to invented numbers

**Worked examples, not results. Every figure in the `Ads` table below is made up to show how
[[KPI]] and [[Budget And Thresholds]] decide; nothing here has been observed, and nothing here
may be quoted as performance.** The app's KPI tab renders this file behind a "Scenario"
banner until a real `KPI Review <date>.md` exists in [[09 Analyze KPIs]]; then the real file
takes the Active view and this one stays as the worked example.

The shape is deliberate: one ad that clears the scale gate and still needs three months to pay
back, one that is unprofitable by construction, one whose hook works but whose body does not,
one starved below the impression floor, one merely holding, and two finished AI-host clips from
the hook test. That is the full vocabulary of verdicts the reviewer needs.

## Assumptions

| Assumption | Value | Source |
|---|---|---|
| Net revenue per payer, first payment | $17.00 | $19.99 monthly (PRODUCT.md §7) less 15% Apple Small Business Program `[assumption — confirm tier]` |
| Net revenue per payer, 12 months | $52.90 | RevenueCat State of Subscription Apps 2026, high-priced tier realised LTV year one $62.19 × 0.85 `[tier fit assumed]` |
| Scale budget per month | $1,800 | $60/day, the top of the round-one daily range in [[Budget And Thresholds]] |
| Impression floor per ad | 3000 | [[KPI]] |
| Install floor per ad for CPI | 20 | [[KPI]] |
| Learning exit | 50 | installs in 7 days per ad set (Meta) |

## Ads

Columns are Meta's own where Meta has one. `3s plays` and `ThruPlays` are blank for statics.
`Decision` is filled only when a human recorded one; otherwise the app computes it from
[[KPI]]. `Status` is `active` (still delivering) or `previous` (paused, killed or finished).

| Round | Status | Ad | Format | Days | Spend | Impressions | 3s plays | ThruPlays | Link clicks | Installs | Trials | Payers | Decision | Note |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Round one | active | WP_P2_DEMO_freecheck_9x16_v1 | video · screen demo | 14 | $262 | 61,400 | 21,490 | 6,660 | 737 | 68 | 14 | 7 | | The keep example: clears the scale gate on CPI, pays back on the 12-month basis, is cash-negative for about two months |
| Round one | active | WP_P1_UGC_coached_9x16_v1 | video · UGC | 14 | $198 | 44,000 | 17,600 | 3,520 | 396 | 36 | 5 | 1 | | Best hook of the five, worst hold — the middle beats lose them; recut from raw footage |
| Round one | active | WP_P3_POSERESULT_stillyou_9x16_v1 | video · slideshow | 14 | $41 | 2,600 | 780 | 300 | 26 | 6 | 1 | 0 | | Starved by the auction: below the impression floor, so not judged — re-run in wave two |
| Round one | active | WP_P2_STATIC_100ms_4x5_v1 | static | 14 | $117 | 39,000 | | | 429 | 27 | 3 | 1 | | Holding: CTR above average, CPI not low enough to scale, one payer is no evidence |
| Round one | previous | WP_P1_STATIC_proprices_4x5_v1 | static | 14 | $142 | 41,800 | | | 142 | 14 | 1 | 0 | | The unprofitable example: CTR under half the ad set average, CPI over twice the average, zero payers — the brief called it the kill-first candidate |
| Hook test | previous | WP_P2_DEMO_hostA_pass_9x16_v1 | video · AI host | 7 | $70 | 21,000 | 6,090 | 1,830 | 210 | 15 | 2 | 0 | Test done | "Would your photo pass?" — won the host test on hook rate; feeds the DEMO campaign's overlay |
| Hook test | previous | WP_P2_DEMO_hostB_charge_9x16_v1 | video · AI host | 7 | $70 | 22,400 | 4,930 | 1,380 | 179 | 13 | 1 | 0 | Test done | "Most AI photo apps charge you for the bad result…" — second; kept as the support line |

## How to read the two examples

**Keep (`WP_P2_DEMO_freecheck`).** CPI $3.85 against an ad set average of about $5 clears the
0.8× gate with 68 installs. Trial rate 20.6% and trial→paid 50% are *above* the RevenueCat
medians (7.1% download→trial in North America, 25.5% for trials of four days or less) — this
scenario assumes the creative pre-sells the paywall and the free check earns the conversion.
CAC ≈ $37 per payer. Against $17 net on the first payment it loses ≈ $20 per payer in month
one; against $52.90 net over twelve months it earns ≈ $15 per payer. At $1,800/month that is
≈ 48 payers, ≈ +$740/month on the twelve-month basis and ≈ −$980 cash in the first month —
profitable, and it needs about three months of runway per cohort. Scale it, and watch trial→paid.

**Unprofitable (`WP_P1_STATIC_proprices`).** $142 spent, 14 installs at $10.14, one trial, no
payer. CTR 0.34% is under half the ad set average, so the creative gate kills it before the
business gate is even reached; the realised result is −$142 with nothing to project. The
brief predicted this (no dating winner runs on price); the lesson goes to the retired list.

**The honest third reading.** At the RevenueCat medians rather than this scenario's optimistic
funnel, 68 installs would yield about one payer and a CAC above $200. The scale example only
exists because install→trial and trial→paid are assumed well above median. Round one measures
whether that assumption is true — see the payback table in [[Budget And Thresholds]].
