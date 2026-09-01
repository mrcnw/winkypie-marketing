# brain/ — Process and Backlog

The thinking half of the repo. Everything here is Markdown. No code, no build step, no
dependencies. Open this folder as the Obsidian vault root — wiki links resolve from here.

Product facts and repo-wide guardrails are in `../PRODUCT.md` and the root `CLAUDE.md`.
Read those first. Nothing here restates them.

## Structure

`brain/` holds one thing: the marketing process, one folder per channel. There is no
`tasks/` and no `docs/` tree — a step and everything it produces live in the same folder.

```
brain/
├── CLAUDE.md                       you are here
└── process/
    ├── README.md                   the channels, and which one is active
    ├── Process.canvas              all four channels seen from above
    ├── meta-ads/                   ← ACTIVE
    │   ├── README.md               index, the loop, the gates, the rhythm
    │   ├── Meta Ads.canvas         the loop seen from above — the channel's only canvas
    │   ├── _Template/              copy this folder to add a step
    │   └── NN Step Name/
    │       ├── NN Step Name.md     documentation — the canvas tile points here
    │       ├── NN TODO.md          the checklist
    │       └── …                   every note this step produces
    ├── tiktok-ads/                 2 · folder + README stub only
    ├── tiktok-organic/             3 · folder + README stub only
    ├── instagram-organic/          4 · folder + README stub only
    └── influencers/                5 · folder + README stub only
```

**One channel at a time, and it is meta-ads.** The other four folders hold a README stub and
nothing else, on purpose — do not write steps, TODOs or strategy into a channel nobody is
working. Stale notes get believed. The queue order is fixed (meta-ads → tiktok-ads →
tiktok-organic → instagram-organic → influencers); a channel opens when the one before it has
a repeatable winner, and then it gets the same shape as `meta-ads/`.

Do not add loose notes at the `brain/` root or at the `process/` root.

## What belongs here

| Belongs | Does not belong |
|---|---|
| How the work is done, in order | Product facts → `../PRODUCT.md` |
| Checklists and step state | Anything that renders in a browser → `../app/` |
| Research, teardowns, briefs, KPI reviews | Binary creative files (video, PSD, exports) |
| The reasoning behind a decision | Secrets, tokens, ad account IDs, pixel IDs |

## The two files in a step folder

**`NN Step Name.md` — documentation.** Five sections, in this order. Do not reorder them,
do not add a sixth without a reason.

```markdown
---
tags: [step, research]
status: todo          # todo | doing | blocked | done
phase: research       # research | strategy | produce | setup | launch
owner:
updated: 2026-09-01
---
# NN · Step Name

Checklist: [[NN TODO]] · Canvas: [[Meta Ads.canvas|Meta Ads]]

## Goal        One sentence. What is true when this is finished.
## Process     Numbered. How the work is actually done — repeatable next time.
## Done when   The acceptance test, specific enough that someone else could check it.
## Output      Which notes this step writes. Paths relative to this folder.
## Notes       The trap in this step. Optional.
```

**`NN TODO.md` — the checklist.** Checkboxes live here and nowhere else. It links back to
the documentation and carries no prose.

Rules:

- **`status` in the documentation's frontmatter is the single source of truth.** Not the
  README, not the canvas, not the number of ticked boxes.
- **Update `updated:` whenever you touch a file.** Absolute date.
- A step that has been `doing` for more than a week is either blocked or too big. Split it.
- Finished steps stay in place with `status: done`. Do not delete them — the process notes
  are the reusable part.
- Outputs land in the step's own folder. If two steps need the same note, it belongs to the
  one that produces it and the other links to it.

## Numbering

`NN` is the step's position in the loop, not its priority. The order is fixed:

| NN | Phase |
|---|---|
| 01–02 | research |
| 03, 05 | strategy |
| 04 | produce |
| 06–07 | setup |
| 08–09 | launch |

Insert urgent work as a decimal — `06.1 Fix Pixel Events/` — rather than renumbering
everything. Renumbering breaks the canvas and every wiki link pointing at it.

## Writing rules

- **Lead with the answer.** First line of a section is the conclusion; the reasoning
  follows. These notes are read in a hurry.
- **Tables over paragraphs** for anything comparative (competitors, budgets, KPI targets).
- **Cite or drop it.** A number without a source cannot be used in an ad — see guardrail 2
  in the root `CLAUDE.md`. Mark unsourced figures `[unsourced]` so they are never shipped.
- **Say what you do not know.** "No data on their CAC" is a useful line. Silence is not.
- Link with `[[Note Name]]`. A link to a note that does not exist yet is fine — it is a
  marker for work to do.
- Internal notes are plain and technical. The brand voice rules apply to ad copy, not here.

## Keeping the canvas in sync

Both canvases contain `file` nodes with vault-relative paths — `process/meta-ads/README.md`,
`process/meta-ads/01 Find Competitors/01 Find Competitors.md`. If you rename or move a step
or a channel folder, fix the canvas and the README table in the same commit. Obsidian will
not repair it and a broken node renders as an empty box.

Two canvases, both top views: `process/Process.canvas` for the channels,
`process/meta-ads/Meta Ads.canvas` for the steps inside the active one. A step gets a folder,
not a canvas of its own.
