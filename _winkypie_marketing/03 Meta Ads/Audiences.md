---
tags: [meta-ads]
---
# Audiences

On iOS, broad usually beats interest stacking - the pixel signal is too thin to segment well. Start broad, earn the right to narrow.

## Saved audiences
| Name | Definition | Size | Status |
|---|---|---|---|
| Broad US M 18-45 | Men, 18-45, US, no interests | | primary |
| Broad EN-tier1 | Men 18-45, UK/CA/AU/IE | | secondary |

## Custom audiences
| Name | Source | Window | Min size |
|---|---|---|---|
| App installers | App events | 180d | |
| Trial starters | `StartTrial` | 180d | |
| Video 50% viewers | Engagement | 365d | |
| IG engagers | Engagement | 365d | |

## Lookalikes
Build only after the seed has **>100** events, ideally 1,000+.
| Name | Seed | % | Country |
|---|---|---|---|
| LAL 1% trials US | Trial starters | 1% | US |

## Exclusions
Always exclude existing paid subscribers from acquisition campaigns.

## Targeting notes
- Do **not** target dating-app interests as a proxy — Meta's Personal Attributes policy limits implying a viewer's relationship status in creative, and interest targeting adds little on iOS. -> [[Meta Ad Policy]]
