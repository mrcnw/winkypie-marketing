---
tags: [strategy, reference]
updated: 2026-09-02
---
# Creative Naming

The convention from [[03 Choose Videos And Five Campaigns]], locked. Naming drift is the
reason results stop being comparable — the name is assigned in the brief, before any
footage exists, and never changes after export.

## Convention

```
WP_<persona>_<format>_<hook-slug>_<ratio>_v<n>
```

| Part | Values |
|---|---|
| persona | `P1` Restart · `P2` Grinder · `P3` Camera-Shy |
| format | `UGC` phone-shot talking · `DEMO` screen demo · `STATIC` design-only · `POSERESULT` pose → result |
| hook-slug | short, stable, lowercase — set in the brief |
| ratio | `9x16` · `4x5` · `1x1` |
| v | version, bumped on any visible change |

## The five campaigns (round one, 2026-09-02)

| Campaign name | Brief | Variable tested |
|---|---|---|
| `WP_P2_STATIC_100ms_<ratio>_v1` | [[WP_P2_STATIC_100ms]] | Decision-moment hook |
| `WP_P2_DEMO_freecheck_<ratio>_v1` | [[WP_P2_DEMO_freecheck]] | Free pre-flight check |
| `WP_P1_UGC_coached_<ratio>_v1` | [[WP_P1_UGC_coached]] | Pose coaching |
| `WP_P3_POSERESULT_stillyou_<ratio>_v1` | [[WP_P3_POSERESULT_stillyou]] | Likeness trust |
| `WP_P1_STATIC_proprices_<ratio>_v1` | [[WP_P1_STATIC_proprices]] | Savings |

Every campaign ships all three ratios (9:16 master, 4:5, 1:1). Persona split 2×P2 / 2×P1 /
1×P3 per the step doc. The primary test axis across the set is the **hook/angle**; format
follows hook and stays constant inside a campaign.

Dropped hook candidates and the reasons live in [[Hooks And Angles]] (step 02) — recorded
so they stay dropped.
