---
tags: [meta-ads, analytics]
---
# Meta Ads - KPI

Definitions first, targets second. A metric with no definition is a metric two people argue about.

## Funnel
```
Impression -> 3s view -> Click -> App Store page -> Install -> Trial start -> Paid -> Retained
```

## Definitions
| Metric | Definition | Where |
|---|---|---|
| **CPM** | Cost per 1,000 impressions | Meta |
| **Hook rate** | 3s video plays / impressions | Meta (creative health) |
| **Hold rate** | ThruPlays / 3s plays | Meta |
| **CTR (link)** | Link clicks / impressions | Meta |
| **CPC (link)** | Spend / link clicks | Meta |
| **Store CVR** | Installs / link clicks | Meta + App Store Connect |
| **CPI** | Spend / installs | Meta |
| **Install -> Trial** | Trials / installs | app analytics |
| **CPT** | Spend / trial starts | Meta / MMP |
| **Trial -> Paid** | Paid subs / trials | App Store Connect / RevenueCat |
| **CAC** | Spend / paid subscribers | calculated |
| **D1 / D7 retention** | % returning | app analytics |
| **Payback** | Days for LTV to cover CAC | calculated |

## Targets
Fill the "Actual" column weekly from [[Tracker]]. Targets below are **placeholders until we have 2 weeks of data** - replace with our own baselines, do not treat as benchmarks.

| Metric | Target | Kill below / above | Actual |
|---|---|---|---|
| Hook rate | > 25% | < 15% | |
| Hold rate | > 20% | < 10% | |
| CTR (link) | > 1.2% | < 0.6% | |
| CPM | monitor | | |
| CPI | _set after wk2_ | | |
| Install -> Trial | > 25% | < 10% | |
| CPT | _set after wk2_ | | |
| Trial -> Paid | > 30% | < 15% | |
| CAC vs LTV | LTV/CAC > 3 | < 1.5 | |
| Payback | < 60 days | > 120 days | |

## Reading order when something breaks
1. CPM up? -> auction / audience / creative fatigue
2. CPM flat, CTR down? -> **creative** problem
3. CTR fine, Store CVR down? -> **App Store listing** problem, not ads -> [[ASO]]
4. Install fine, Trial down? -> **onboarding/paywall** problem
5. Trial fine, Paid down? -> **pricing/value** problem

## Decision rules
- **Kill** an ad after 1,000 impressions with CTR < 0.6% and 0 installs.
- **Scale** +20-30% budget max per 24h on ads beating target CPT for 3 consecutive days.
- **Never** judge a creative before it exits the learning phase (~50 optimisation events / week).
