---
tags: [strategy, budget]
updated: 2026-09-02
---
# Budget And Thresholds — round one

**One Meta campaign, one ad set, five ads, US · iOS · English, optimised for app installs,
$45–60 a day for 14 days (~$650–850), plus a 30% reserve released only to a creative that
passes the day-14 gates. Not "$50 per creative for 4 days" — that spend rate is fine, the
duration is not: on day 4 the ad set has not exited learning, SKAdNetwork installs are still
arriving, and no trial has had time to convert.** Written 2026-09-02, before any account or
campaign exists; every input that is an assumption is labelled. Sources: Meta Business Help
articles read live through the Meta MCP, one practitioner framework, and RevenueCat's
subscription benchmarks. Definitions and targets are in [[KPI]]; the thresholds applied to
worked numbers in [[KPI Scenarios]]; the whole plan on one canvas in
[[Campaign Plan.excalidraw|Campaign Plan]].

## What the five "campaigns" are, in Meta terms

The loop's five campaigns ([[03 Choose Videos And Five Campaigns]]) are five **hypotheses**.
In Ads Manager they are **five ads inside one ad set inside one campaign** — not five
campaigns. Reasons, all from Meta's own guidance:

- An ad set exits the learning phase "after about 50 results in the week after the ad set's
  last significant edit"; below that it is *learning limited* and "your budget isn't being
  spent effectively" ([learning phase](https://www.facebook.com/business/help/112167992830700),
  [learning limited](https://www.facebook.com/business/help/269269737396981)). Five ad sets
  need five times the installs to say anything; one ad set needs 50.
- Meta's fix for learning limited is exactly this: "combine ad sets and campaigns", "raise
  your budget", "avoid high ad volumes" — many ads and ad sets mean the system "learns less
  about each" ([learning phase](https://www.facebook.com/business/help/112167992830700)).
- iOS 14+ App Promotion campaigns are Advantage+ app campaigns only — "manual setup is not
  supported" — each "limited to one ad set", up to 24 campaigns per app, and Meta suggests
  "up to six creative options in the ad set for optimal results"
  ([iOS 14.5+ considerations](https://www.facebook.com/business/help/651033805513936)). Five
  ads is inside that — six, with `freecheck` in two cuts (2026-09-06), still is.
- Advantage+ app campaigns take up to 50 images or videos per ad set and report per creative
  unit ([about AAC](https://www.facebook.com/business/help/309994246788275),
  [creative reporting](https://www.facebook.com/business/help/716015512512235)) — the
  per-hypothesis readout survives consolidation.

The cost of consolidation is honest and must be written down: Meta allocates the ad set's
budget unevenly, to whichever ad wins early auctions, so the five do **not** get matched
budgets. The framework that prescribes matched budgets (one ad set per concept, 50 events
each, 7–14 days — [bir.ch, 2026-04](https://bir.ch/blog/meta-ad-creative-testing-framework))
is right and unaffordable at our scale. We compensate by judging creatives on leading
indicators at an **impression floor per ad** (see [[KPI]]), and by re-running a starved ad in
the next wave rather than declaring it dead.

| Hypothesis (brain "campaign") | Meta object | Produced by |
|---|---|---|
| `WP_P2_STATIC_100ms` | ad (image, 3 ratios) | in-house design |
| `WP_P2_DEMO_freecheck` | ad (video, screen capture) | in-house capture + AI host voice variants optional |
| `WP_P2_DEMO_verdict` | ad (video, screen capture) — **cut B of the same hypothesis**, ≤ 15 s, verdict-first; the sixth creative, added 2026-09-06 on the Charmd cut-gap evidence ([[Winning Ads 2026-09-02]]) | same capture, second edit |
| `WP_P1_UGC_coached` | ad (video, UGC) — **the only one needing a creator**; the Billo package's 3–5 creators are 3–5 variants of this one ad | external creator — [[04.1 Outsource The Shoot]] |
| `WP_P3_POSERESULT_stillyou` | ad (video slideshow or image) | in-house from a real generation pair |
| `WP_P1_STATIC_proprices` | ad (image, 3 ratios) | in-house design |

So: one creator, one brief, several takes — not one creator recording all five. Four of the
five need no human on camera at all.

## Objective, optimisation, attribution

| Setting | Choice | Why |
|---|---|---|
| Objective | **App Promotion → Advantage+ app campaign**, iOS 14+ | The only setup Meta allows for iOS 14.5+ app ads; link-out traffic to the App Store is the fallback if the app is not registered with Meta, and it is a materially worse optimisation target ([[Account Setup]]) |
| Optimisation | **App installs** in round one | Most frequent event → fastest exit from learning. Optimising for trial start needs ~50 trials/week ([app event optimisation](https://www.facebook.com/business/help/2308889442692949)); at an assumed 15% install→trial that is ~330 installs/week — not round one |
| Bid strategy | Lowest cost, **no bid cap, no cost cap** | Meta's recommendation for AAC; cost-per-result goal needs 50–100 weekly conversions and a daily budget ≥5× the goal ([AAC best practices](https://www.facebook.com/business/help/711378409718185), [cost per result goal](https://www.facebook.com/business/help/272336376749096), [minimum budgets](https://www.facebook.com/business/help/203183363050448)) |
| Attribution | **Aggregated Event Measurement** as the reporting view; SKAdNetwork configured alongside | AEM reports near real time with 7-day click; SKAN reports with "delays of at least 24 hours", campaign-level aggregates, statistical modelling at ad level, and A/B tests only at campaign level ([SKAN reporting](https://www.facebook.com/business/help/584603712214119), [AEM vs SKAN](https://www.facebook.com/business/help/1356268495231843)) |
| Targeting | US · iOS · English. Nothing else is available in AAC (no age, gender, interests) | [AAC targeting](https://www.facebook.com/business/help/1153577308409919). Men-only reach comes from the creative, not the settings — the briefs already do this. Country decision and the competitor delivery data behind it: [[Audiences]] (2026-09-06) |
| Placements | Advantage+ placements (forced in AAC) | Same article. Deliver 9:16 master + 4:5 + 1:1 so every placement has a native ratio |
| Budget type | Campaign budget (default on for App Promotion), **daily** | [campaign vs ad set budgets](https://www.facebook.com/business/help/458847204894307) |

**Dependency:** none of this is available until the WinkyPie ad account exists and the iOS app
is registered with Meta with SKAdNetwork and AEM events configured — the pending list in
[[Account Setup]]. The app currently ships Amplitude, Sentry and RevenueCat (PRODUCT.md §2);
the Meta SDK or a mobile measurement partner is a step-06 deliverable before launch.

## How much, for how long

**The number that sets the budget is the CPI, and we do not know it.** No public CPI
benchmark for US iOS in this category could be sourced on 2026-09-02 (four benchmark pages
returned 403/404/429; the Meta MCP industry benchmark returned no data for app installs). So
the plan is a sensitivity table, and round one's first job is to replace the column header
with a measured number.

Rule: the ad set needs ~50 installs in 7 days to exit learning. Weekly budget = 50 × CPI.

| If CPI is | Weekly budget to exit learning | Daily | 14-day test |
|---|---|---|---|
| $2 | $100 | $15 | $200 |
| $4 | $200 | $29 | $400 |
| $6 | $300 | $43 | $600 |
| $8 | $400 | $57 | $800 |
| $10 | $500 | $72 | $1,000 |

**Decision: $45–60/day, 14 days, ≈ $650–850 test spend**, sized for a CPI of $6–8 so the ad
set exits learning even at the pessimistic end. If the real CPI comes in at $3, the same
budget simply produces more installs and a cleaner read. Plus a **reserve of 30%** (~$200–250)
that is not touched during the test.

Why 14 days and not 4:

1. Learning needs ~50 results in a 7-day window; performance inside learning "isn't
   necessarily indicative" ([learning phase](https://www.facebook.com/business/help/112167992830700)).
2. SKAdNetwork installs land ≥24 h late and "allow a few days for the data to become stable"
   ([AEM vs SKAN](https://www.facebook.com/business/help/1356268495231843)).
3. The trial is 3 days (PRODUCT.md §7): a user who installs on day 4 can pay on day 7 at the
   earliest. A 4-day window contains zero purchases by construction.
4. "The first 72 hours can be misleading… minimum of seven days", 10–14 for conversion
   decisions ([bir.ch](https://bir.ch/blog/meta-ad-creative-testing-framework)).

**What "$50 per creative, 4 days" actually buys**: $250 total, ~$62/day. The daily rate is
fine. In four days it yields, at a $4–8 CPI, roughly 30–60 installs across five ads — the ad
set is still learning, per-ad installs are single digits, SKAN has reported perhaps half of
them, and no trial has converted. The only honest readout on day 4 is delivery health plus
hook rate and CTR. Keep the daily rate, run it 14 days.

If the total must stay near $250: run **two or three ads, not five**, for 7 days, and read
only the creative metrics (hook, hold, CTR). Do not read CPI or CAC from it.

## The learning-phase rules (the do-not-touch list)

Any of these is a "significant edit" and resets learning: changing budget (more than a small
step), creative, targeting, optimisation event or bid strategy
([learning phase](https://www.facebook.com/business/help/112167992830700)). During the 14 days:
no edits, no pausing individual ads, no adding ads. A rejected ad is fixed and its clock
restarted, and it is reported as such ([[08 Launch The Ad]] step 5).

## Thresholds — decided now, applied at day 14 and day 28

Because five ads share one ad set, each ad is judged only once it has crossed an
**impression floor**; below the floor the verdict is "starved, re-run", not "lost".

| Decision | Trigger | Action |
|---|---|---|
| **Not judged** | Ad below 3,000 impressions at day 14 `[unsourced floor — practitioner rule of thumb]` | Re-run in wave two with the budget it did not get |
| **Kill (creative)** | At ≥3,000 impressions: **hook rate in the bottom two of five AND below 20%**, or CTR below half the ad set's average | Pause at day 14 (not before). Write the lesson in [[09 Analyze KPIs]]'s retired list |
| **Iterate (hook)** | Hook rate in the bottom two but hold rate and CTR at or above the ad set average | The first 1.5 s is the problem, not the idea: new hook, same body, next wave |
| **Iterate (body)** | Hook rate top two, hold rate below the ad set average | The middle beats; recut from raw footage |
| **Scale** | At day 14, ad set out of learning, ad has ≥20 installs `[unsourced small-sample floor]` and CPI ≤ 0.8× the ad set average for the full 14 days | Release the reserve to a **new** ad set carrying the winner + its two best hook variants; raise any budget by ≤20% per day |
| **Hold** | Anything inside learning, or an ad set marked learning limited | Do nothing. If learning limited persists past day 7, the finding is *budget*, not creative — raise the daily budget once, note the reset |
| **Business read** | Day 28: install→trial, trial→paid, CAC per payer, from RevenueCat + Meta, aggregated over all ads | Fills the two blank columns in the LTV table below. Directional only under ~40 payers |

Absolute percentages above are `[unsourced]` guidance from practitioner material and can be
revised *between* rounds; the relative rules (bottom two of five, vs ad set average) are the
ones that decide.

## Target CAC and target CPI — the business case, with the blanks visible

Inputs from PRODUCT.md §7: US price $19.99/month, $44.99/six months; trial 3 days. Apple's
commission is 30%, or 15% under the Small Business Program `[assumption — check App Store
Connect]`. Net first payment: **$14.0–17.0** monthly, **$31.5–38.2** six-month.

Two rates decide everything. Neither is known for us, but the industry medians are, and
they are lower than the first draft of this note assumed:

| Rate | Why it matters | Industry benchmark | Source |
|---|---|---|---|
| download → trial start | The paywall comes **before** the first generation (PRODUCT.md §4): this is where the hard paywall bites | **7.1% median, ~15% P90** (North America); nearly all trial starts happen on day 0 | [RevenueCat State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps/) (115k apps) |
| trial → paid | 3-day trial, Apple notifies before charge | **25.5% median for trials of ≤4 days**; Photo & Video category **22.2%**; 55% of 3-day-trial cancellations happen on day 0; 17–32-day trials convert 42.5% | same |
| download → paid at day 35, hard paywall | The shortcut for a hard-paywall app: how many installs pay by day 35 | **10.7% median** (freemium 2.1%) | same |
| year-1 retention, monthly plan | How many paid months a payer is worth | **17% median** still subscribed after a year | [RevenueCat 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/) |
| realised LTV per payer, high-priced tier (~$20/month) | What a payer is worth over time | **$35.89 by month 1, $62.19 by year 1** (gross) | RevenueCat 2026 |

Net of Apple (15% under the Small Business Program, 30% otherwise `[tier unconfirmed]`), a
payer is worth **$30.5–35.9 by month 1** and **$43.5–52.9 by year 1** at those medians.

Target CPI = target CAC × payers per install. Three funnel assumptions, two payback rules:

| Funnel assumption | Payers per 100 installs | Target CPI, month-1 payback (CAC ≤ $30–36 net) | Target CPI, year-1 payback (CAC ≤ $43–53 net) |
|---|---|---|---|
| Medians: 7.1% × 25.5% | 1.8 | $0.55–0.65 | $0.78–0.95 |
| P90 trial start: 15% × 25.5% | 3.8 | $1.16–1.36 | $1.65–2.01 |
| Hard-paywall median, download→paid 10.7% | 10.7 | $3.26–3.84 | **$4.65–5.66** |

Read this plainly: **at median funnel numbers the plan needs a sub-$1 CPI, which US iOS
does not sell. It closes only if WinkyPie behaves like a median hard-paywall app — roughly
one payer per ten installs — and then it needs a CPI under about $5–6 for year-one payback,
under about $3.50 for month-one payback.** The levers that decide which row we are in are the
product's, not the ad's: the free check and the coaching must turn a trial into a paid month
inside three days, and the creative must pre-sell the paywall so the trial rate sits at the
P90, not the median. Round one is not expected to be profitable; it is expected to tell us
which row we live in, so round two can be planned against a real CAC. That is a legitimate
goal and it is the one written on the tracker. The worked example of a round that *does*
clear the gates — and what it still costs in cash — is in [[KPI Scenarios]].

## Break-even for round one — how many have to install and pay

**For the $650–850 test to pay for itself within the year, 13–17 men have to pay; to pay
for itself in the first month, 39–50 (or 47–61 if Apple takes 30%).** "Sixty at $19" is the
harshest version of the month-one case, not the plan. Net revenue per payer as above:
$17.00 first payment, $52.90 over twelve months (15% commission `[tier unconfirmed]`).

| Spend | Payers, year-1 payback | Payers, month-1 payback | Installs needed for year-1 payback at median funnel (1.8%) · P90 (3.8%) · hard-paywall median (10.7%) | Max CPI for year-1 payback at the hard-paywall rate |
|---|---|---|---|---|
| $650 | **13** | 39 | 719 · 340 · **122** | **$5.33** |
| $750 | **15** | 45 | 829 · 393 · **141** | **$5.32** |
| $850 | **17** | 50 | 939 · 445 · **159** | **$5.35** |

Read across: at the RevenueCat median funnel the test would need 700–950 installs at under
$1 each — not a real market. At the hard-paywall median (one payer per ~9 installs) it needs
120–160 installs at ≤ $5.35, which is a plausible US iOS CPI. So the round-one question in one
line: **do we get roughly one payer per ten installs?** If yes, the plan closes at CPIs the
market actually sells; if no, no creative fixes it — the paywall, the check and the coaching do.

The scenario in [[KPI Scenarios]] spends $760 for 151 installs and 9 payers — below the
year-one break-even of 15 for that spend, with the best single ad (`DEMO_freecheck`) the only
one whose own CAC pays back. That is the realistic shape of a first round: one ad that works,
a total that does not yet. The app's KPI tab computes this table live from the same inputs.

## Reserve rule

30% of the round-one total is held back. It is released only at day 14, only to a creative
that met the Scale row above, into a new ad set (so the test ad set's learning is not reset).
If nothing qualifies, the reserve funds wave two's re-runs and iterations, not "one more try"
on the same ads. Mid-window winners are noted, not funded — the window closes on the date
written in the tracker.

## Open

- CPI, install→trial, trial→paid, Apple commission tier — all measured or confirmed in round
  one; the tables above are re-cut with real numbers in the KPI review.
- Whether Meta classifies WinkyPie under the dating policy ([[06 Meta Ads Configuration]]
  TODO) — it changes creative, not budget.
- Whether the Meta SDK or an MMP goes into the app before launch (step 06).
