---
tags: [assets, ops]
---
# Creative Naming

The tracker is only as good as the naming. One convention, no exceptions.

## Format
```
WP_<angle>_<format>_<hook>_<ratio>_<version>
```

| Token | Values |
|---|---|
| `angle` | A1..A6 from [[Messaging Matrix]] |
| `format` | UGC · DEMO · STATIC · CAROUSEL · SCREENREC · BA (before/after) |
| `hook` | 2-3 word slug, e.g. `100ms`, `nophotog`, `oneselfie` |
| `ratio` | 9x16 · 1x1 · 4x5 |
| `version` | v1, v2 ... |

## Examples
```
WP_A1_UGC_100ms_9x16_v1
WP_A3_DEMO_oneselfie_4x5_v2
WP_A4_BA_stillyou_1x1_v1
```

## Rules
- The **same file name** is used in the Meta ad name, the vault note title, and the [[Tracker]] row.
- Version bump = any change to pixels. New hook = new hook slug, not a version bump.
- Campaign/ad set naming lives in [[Configuration]].
