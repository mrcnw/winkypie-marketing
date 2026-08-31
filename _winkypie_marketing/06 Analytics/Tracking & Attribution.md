---
tags: [analytics, ops]
---
# Tracking & Attribution

iOS post-ATT means **nothing is deterministic**. Decide up front which number is the source of truth for which decision, or every weekly meeting becomes an argument about whose dashboard is right.

## Source of truth
| Question | Authority | Not |
|---|---|---|
| How many paid subs? | App Store Connect / RevenueCat | Meta |
| How much did we spend? | Meta Ads Manager | anything |
| Which creative works? | Meta (relative, not absolute) | App Store Connect |
| Total installs? | App Store Connect | Meta |
| Blended CAC | spend / total new subs | any platform-reported CAC |

> Platform-reported conversions will **not** match App Store Connect. That is expected under SKAN. Use platform numbers for **ranking creatives**, and first-party numbers for **money decisions**.

## SKAdNetwork
- 64 conversion values, coarse (low/med/high) after the postback window
- Conversion value schema must be defined and versioned -> see [[Configuration]]
- Delay of 24-48h+ on postbacks; do not judge a day-old campaign

## Setup checklist
- [ ] Conversion value schema documented (which value = which event)
- [ ] MMP decided (AppsFlyer / Adjust / Singular) or explicitly Meta-only
- [ ] RevenueCat (or equivalent) wired to subscription events
- [ ] Blended CAC spreadsheet/dashboard exists and is owned by one person
- [ ] winkypie.app: GA4 + Meta pixel + domain verification

## Blended model
```
Blended CAC = total marketing spend / total new paid subscribers
LTV         = ARPU x avg months retained
Rule        = LTV / CAC > 3, payback < 60d
```
