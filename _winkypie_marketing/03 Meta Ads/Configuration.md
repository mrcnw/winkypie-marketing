---
tags: [meta-ads, ops]
---
# Meta Ads - Configuration

> iOS app advertiser. Everything below is shaped by ATT / SKAdNetwork limits.

## Account
| Item | Value |
|---|---|
| Business Manager | _fill_ |
| Ad account ID | _fill_ |
| Page | @winkypie.app |
| App ID (Meta) | _fill_ |
| App Store ID | 6757441777 |
| Bundle ID | _fill_ |
| Billing / cap | _fill_ |

## Tracking stack
- [ ] App registered in Meta **Apps** dashboard, App Store ID linked
- [ ] **Facebook SDK** installed in the iOS app, `AEM` (Aggregated Event Measurement) enabled
- [ ] **SKAdNetwork** conversion value schema mapped -> [[Tracking & Attribution]]
- [ ] ATT prompt shown, worded to maximise opt-in (system prompt preceded by a pre-prompt)
- [ ] Events configured & prioritised (max 8 SKAN slots, order matters)
- [ ] MMP in place (AppsFlyer / Adjust / Singular) or Meta-only - **decide and record here**
- [ ] Domain verified for winkypie.app (web funnel)

### Event priority (draft)
1. `Purchase` (paid sub)
2. `StartTrial`
3. `CompleteRegistration`
4. `fb_mobile_first_render` / first Winky Shot generated
5. `AppInstall`

## Campaign structure
Start broad, few ad sets, let the algorithm learn. Do not over-segment on an iOS app.

```
CBO Campaign - App Promotion (App Installs / App Events)
├── AdSet: Broad | 18-45 | US | no interests
├── AdSet: Broad | 18-45 | UK+CA+AU
└── AdSet: Lookalike 1% (trial starters)  [once >100 events]
```
Separate campaign per objective. Never mix Install and Trial optimisation in one campaign.

## Naming convention
```
Campaign : WP | <objective> | <country> | <YYYY-MM>
Ad set   : <audience> | <placement> | <optimisation>
Ad       : <creative filename>        # see [[Creative Naming]]
```
Example:
```
WP | AppInstalls | US | 2026-09
Broad-18-45 | Advantage+ | AppInstall
WP_A1_UGC_100ms_9x16_v1
```

## Defaults
| Setting | Default | Why |
|---|---|---|
| Placements | Advantage+ (all) | more SKAN volume |
| Budget | CBO at campaign level | fewer learning phases |
| Attribution | 7-day click / 1-day view (SKAN-limited) | platform max for app |
| Bid strategy | Highest volume, no cap at start | escape learning fast |
| Min budget per ad set | 20-50x target CPA per week | exit learning phase |

## Special ad categories
WinkyPie is a **photo tool**, not a dating service - so the Dating category should not apply. **Verify before first launch**: if Meta flags it, the Dating category requires written permission and restricts targeting. Record the outcome here. -> [[Meta Ad Policy]]

## Change log
| Date | Change | By |
|---|---|---|
| | | |
