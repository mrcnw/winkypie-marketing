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
    ├── Process.excalidraw.md       the queue, drawn
    ├── meta-ads/                   ← ACTIVE — the only channel outside todo/
    │   ├── README.md               index, the loop, the gates, the rhythm
    │   ├── _Template/              copy this folder to add a step
    │   └── NN Step Name/
    │       ├── NN Step Name.md     documentation — the drawing's tile points here
    │       ├── NN TODO.md          the checklist
    │       └── …                   every note this step produces
    └── todo/                       not started, in queue order
        ├── README.md               the queue and how to open a channel
        ├── tiktok-ads/             2 · README stub only
        ├── tiktok-organic/         3 · README stub only
        ├── instagram-organic/      4 · README stub only
        └── influencers/            5 · README stub only
```

**The filing rule: a channel folder at `process/` level is live work; everything not started
lives in `todo/`.** Opening a channel is a `mv` out of `todo/`, then giving it the shape of
`meta-ads/`.

**One channel at a time, and it is meta-ads.** The four in `todo/` hold a README stub and
nothing else, on purpose — do not write steps, TODOs or strategy into a channel nobody is
working. Stale notes get believed. The queue order is fixed (meta-ads → tiktok-ads →
tiktok-organic → instagram-organic → influencers); a channel opens when the one before it has
a repeatable winner.

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

Checklist: [[NN TODO]] · Drawing: [[Process.excalidraw|Process]]

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
  README, not the drawing, not the number of ticked boxes.
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
everything. Renumbering breaks the drawing and every wiki link pointing at it.

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

## Keeping the drawing in sync

One *process* picture: `process/Process.excalidraw.md` — section 1 is the channel queue,
section 2 the ten steps of the active channel. It is the single source of truth for the
process seen from above (`Meta Ads.canvas` was removed 2026-09-02). A step gets a folder, not
a process drawing of its own.

A step **may** produce a drawing as one of its outputs — a plan, a structure, a timeline that
belongs to that step (first one: `05 Ad Strategy And Budget/Campaign Plan.excalidraw.md`,
2026-09-02). Such a drawing is listed in the step's Output section, linked from the note it
illustrates, and generated with the `draw` skill from a script kept in
`.claude/skills/draw/generators/` so it can be re-run. Once someone has moved boxes by hand in
Obsidian, the script is stale — ask before regenerating. It never duplicates the process map.

The Excalidraw file keeps its link targets in an **## Element Links** section and its scene
in a compressed `## Drawing` block. Existing text elements (lines ending `^blockID` under
**## Text Elements**) may be edited as markdown — the plugin syncs them into the scene; the
compressed block is never hand-edited, and **new elements are only added in Obsidian**. Move
or rename a folder and the element links go stale silently — fix them, and the README
tables, in the same commit as the move.
