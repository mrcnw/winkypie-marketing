# WinkyPie Marketing — Repository Guide

Marketing workspace for **WinkyPie**: an iOS AI photo studio that turns one selfie into
dating-profile photos. Audience: men 22–40 on Tinder / Hinge / Bumble. We sell *being
picked* — the photo is the mechanism.

**Read [`PRODUCT.md`](PRODUCT.md) first.** It is the product: positioning, persona, the
shipped flow, pricing, brand kit, and what may and may not be claimed. Nothing in this repo
restates it — a fact about the product lives there and is linked to from everywhere else.

## Layout

| Path | What it is | Read first |
|---|---|---|
| `PRODUCT.md` | The product. Single source of truth for every claim about the app. | — |
| `BRAND.md` | How the brand is built — mark, colour, type, UI patterns, store creative, ad rules. Audited against the live surfaces. | — |
| `brain/` | The marketing process, one folder per channel. Markdown only, Obsidian vault — vault root is `brain/`. | `brain/CLAUDE.md` |
| `app/` | Next.js helper — browse the creative assets, plus the reference views around them. | `app/CLAUDE.md` |
| `_winkypie_marketing/` | Legacy vault. Emptied; content is in git history at `a72270a`. Do not add anything here. | — |

`brain/process/` is one folder per channel, with `Process.canvas` as the view from above:

```
brain/process/
├── Process.excalidraw.md   the queue, drawn
├── meta-ads/               ← ACTIVE — the only channel being worked
│   ├── README.md           index, the loop, the gates, the rhythm
│   ├── Meta Ads.canvas     the nine-step loop seen from above
│   ├── _Template/          copy this folder to add a step
│   └── NN Step Name/       one folder per canvas tile, 01 → 09
│       ├── NN Step Name.md documentation — the tile points here
│       ├── NN TODO.md      the checklist
│       └── …               every note that step produces
└── todo/                   not started, in queue order
    ├── tiktok-ads/         2 · next in line — README stub, nothing else
    ├── tiktok-organic/     3 · queued — README stub, nothing else
    ├── instagram-organic/  4 · queued — README stub, nothing else
    └── influencers/        5 · queued — README stub, nothing else
```

**A channel folder at `process/` level is live work; everything not started sits in `todo/`.**
Opening a channel is a `mv` out of `todo/`, then giving it the shape of `meta-ads/`. A queued
channel stays a stub until the channel before it produces a winner worth repeating — notes
written for work nobody is doing go stale and then get believed.

## Division of labour

- **`PRODUCT.md` states what is true about the product.** Facts, limits, claims, brand values.
- **`brain/` decides what to do about it.** Process, checklists, campaign documentation,
  results — all inside the step folder that produced them.
- **`app/` shows the assets.** It browses, inspects and exports; it does not hold strategy or
  product facts.
- A fact lives in exactly one place. If `brain/` or `app/` needs a product fact, it links to
  `PRODUCT.md` rather than copying it. Duplicated facts drift.

## Conventions

- **English everywhere** — notes, code, comments, file names, commit messages.
- **Absolute dates** (`2026-09-01`), never "last week" or "yesterday".
- One topic per file. If a note needs two `#` headings of unrelated subject, split it.
- Wiki links (`[[Note Name]]`) inside `brain/`. Relative paths in `app/` and to `PRODUCT.md`.
- Commit `brain/` and `app/` changes separately — different review surface.
- **Cite or drop it.** A number without a source cannot ship. Mark unsourced figures
  `[unsourced]` so they are never used in creative.

## Guardrails (repo-wide, non-negotiable)

These apply to notes, ad copy, mockups, seed data and anything rendered in `app/`. The full
reasoning and the exact disclosure wording are in `PRODUCT.md` §11.

1. **Men only.** No female imagery in poses, gallery, hero or before/after.
2. **No invented proof.** No fabricated user counts, testimonials, star ratings or statistics
   — not even as placeholder data in the app. FTC and EU UCPD both enforce this. A new number
   needs a citable source.
3. **No dollar pricing on web surfaces.** The App Store listing is authoritative. "Free trial"
   plus the cancellation path, nothing more.
4. **One brand gradient:** `135deg, #F59E0B → #EC4899`. Never a second one.
5. **Honest about AI.** "Stylized AI representations, not a filter." Never imply the
   before/after shows a different person.
6. **iOS-first.** One App Store badge above the fold. No "coming soon to Android".
7. **No pose count** without checking the live catalog — it is backend-managed and changes
   without a release.
8. **Meta personal-attributes rule.** Write in the third person about the product, never
   second-person implications about the viewer's romantic life.

## Voice (outward copy only — not internal notes)

Short sentences. Hard stops. Second person, addressed to a man. Two-beat rhythm: a statement,
then the payoff. No hype, no exclamation marks, no "10x your matches". Full rules and the five
messaging pillars are in `PRODUCT.md` §9. Internal notes in `brain/` are plain and technical —
the voice rules do not apply there.

## Commands

```bash
cd app && npm run dev        # dev server on :3000
cd app && npm run build      # production build — run before shipping
cd app && npm run lint
```

```bash
git show a72270a:"_winkypie_marketing/01 Strategy/Positioning.md"   # recover a legacy note
git ls-tree -r --name-only a72270a                                   # list the legacy vault
```

## When you are asked to do marketing work

1. Read `PRODUCT.md` — every claim you are allowed to make is bounded by it. If the job is
   making something look like WinkyPie, read `BRAND.md` too.
2. Go to `brain/process/meta-ads/`. It is the active channel; if the job belongs to another
   one, say so rather than starting it. `README.md` or `Meta Ads.canvas` shows the loop.
3. Find the step, work from its documentation, tick its `NN TODO.md`, and write what you
   produce into that same step folder.
4. Touch `app/` only when the job is showing or organising an asset.
