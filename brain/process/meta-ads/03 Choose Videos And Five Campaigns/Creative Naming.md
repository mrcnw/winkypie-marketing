---
tags: [strategy, reference]
updated: 2026-09-06
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
| format | `UGC` phone-shot talking · `DEMO` screen demo · `STATIC` design-only · `POSERESULT` pose → result · `HOST` AI host clip — generated presenter, third person, disclosed (the synthetic lane in [[04.1 Outsource The Shoot]]) |
| hook-slug | short, stable, lowercase — set in the brief |
| ratio | `9x16` · `4x5` · `1x1` |
| v | version, bumped on any visible change |

## The round-one set — five campaigns, six creatives (2026-09-06)

| Campaign name | Brief | Variable tested |
|---|---|---|
| `WP_P2_STATIC_100ms_<ratio>_v1` | [[WP_P2_STATIC_100ms]] | Decision-moment hook |
| `WP_P2_DEMO_freecheck_<ratio>_v1` | [[WP_P2_DEMO_freecheck]] | Free pre-flight check |
| `WP_P2_DEMO_verdict_<ratio>_v1` | [[WP_P2_DEMO_freecheck]] — cut B | Same hook, ≤ 15 s, opens on the verdict. The sixth creative, added 2026-09-06 on the Charmd cut-gap evidence |
| `WP_P1_UGC_coached_<ratio>_v1` | [[WP_P1_UGC_coached]] | Pose coaching |
| `WP_P3_POSERESULT_stillyou_<ratio>_v1` | [[WP_P3_POSERESULT_stillyou]] | Likeness trust |
| `WP_P1_STATIC_algorithm_<ratio>_v1` | [[WP_P1_STATIC_algorithm]] | Blame-shift — replaced the savings hook 2026-09-06 |

Every campaign ships all three ratios (9:16 master, 4:5, 1:1). Persona split 2×P2 / 2×P1 /
1×P3 per the step doc. The primary test axis across the set is the **hook/angle**; format
follows hook and stays constant inside a campaign.

## The host variants (2026-09-03)

The synthetic lane renders each hook as an AI host clip — same hook slug, format `HOST`,
9:16 only (4:5 and 1:1 are cut in post). Scripts and card maps: [[Host Scripts]].

| Host clip | Hook it carries | Note |
|---|---|---|
| `WP_P2_HOST_freecheck_9x16_v1` | Would your selfie pass? | first to run |
| `WP_P2_HOST_100ms_9x16_v1` | She decided in 100 ms. | |
| `WP_P1_HOST_coached_9x16_v1` | You don't need to know how to pose. | host hook, **not** the confession line — that stays human |
| `WP_P1_HOST_algorithm_9x16_v1` | Not the algorithm. The first photo. | |
| `WP_P3_HOST_stillyou_9x16_v1` | Looks pro. Still you. | wave two |

Dropped hook candidates and the reasons live in [[Hooks And Angles]] (step 02) — recorded
so they stay dropped.
