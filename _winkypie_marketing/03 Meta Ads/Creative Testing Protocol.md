---
tags: [meta-ads, assets]
---
# Creative Testing Protocol

## Principle
Change **one** variable. Hook or body or CTA - never two.

## Structure
```
Test campaign (CBO, own budget, separate from scaling campaign)
└── 1 ad set, broad
    ├── Control  (current winner)
    ├── Variant A
    ├── Variant B
    └── Variant C
```

## Rules
| Rule | Value |
|---|---|
| Min impressions before judging | 1,000 / ad |
| Min spend before judging | 3x target CPT |
| Max test duration | 7 days |
| Winners promoted to | scaling campaign, fresh ad ID |
| Losers | archived + logged in [[Tracker]] killed table |

## Test ladder — run in this order
1. **Hook** (first 1.5s) - biggest lever
2. **Format** (UGC vs demo vs static vs before/after)
3. **Angle** (A1..A6 from [[Messaging Matrix]])
4. **Primary text**
5. **CTA button**
6. Landing / App Store page -> [[ASO]]

## Log
Every test gets a row in [[Experiment Log]] **before** it launches, with the hypothesis written down. A hypothesis written after the result is not a hypothesis.
