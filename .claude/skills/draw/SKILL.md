---
name: draw
description: Draw a diagram, graph or visual map — Excalidraw by default. Use whenever the user asks for a rysunek, diagram, schemat, graf, wykres, mapę, wizualizację, mockup, "narysuj", "zwizualizuj", "pokaż to obrazkiem", and whenever a process, architecture, decision tree, dependency or comparison would land better as a picture than as prose. Always asks the user before drawing.
user-invocable: true
---

# /draw — put it on a canvas

The user thinks in graphs. A picture is often the deliverable, not decoration — but a
drawing nobody asked for is noise, and one drawn to the wrong scope is worse. So: **ask,
then draw well, then look at what you drew.**

## 1 · Always ask first

**Never start drawing unprompted, and never start drawing straight off a request either.**
Before any canvas work, ask one short question with `AskUserQuestion` — 2–4 concrete
options, no essay. It is a scope question, not a permission ritual:

- *what* — the whole thing, or one slice of it?
- *shape* — flow / layered architecture / dependency graph / timeline / comparison grid?
- *where* — a file in the vault, or something disposable to look at once?

Then draw the answer. One question, not a dialogue. Exceptions, and only these:

- The user said "nie pytaj" / "just draw" — in that turn or that session. Honour it, ask again next session.
- You are only *updating* a drawing you made minutes ago on an instruction that is already unambiguous.

When the request is prose-shaped but a graph would carry it better (a process, a
dependency web, "explain how X works", deep thinking about something structural), **offer
one line**: "mogę to narysować jako graf — chcesz?" Then wait. Do not draw on spec.

## 2 · Pick the shape before the pixels

| Content | Shape |
|---|---|
| Steps with conditions between them | Left→right flow, boustrophedon (snake) when it needs a second row |
| Something that loops back | Snake rows + one dashed return edge routed *outside* the body |
| Layers / responsibilities | Stacked zones, dependencies drawn downward |
| Things related to things | Graph — cluster by colour, keep edge crossings near zero |
| Options against criteria | Grid of nodes, one column per option |
| When things happen | Single axis line, events pinned above and below |

Zones carry the phases, colour carries the meaning, arrows carry the order — never make an
arrow carry meaning that isn't also written down. Label edges that have a condition.

## 3 · Build it with the library, not by hand

`.claude/skills/draw/lib/excalidraw.js` builds valid scenes from Node with no
dependencies: shapes, bound labels, labelled arrows, zones, palette, wrapping, an overlap
validator, a preview renderer, and both output formats. The skill lives in this repo only —
run `node` from the repo root so `process.cwd()` resolves, or require the absolute path.

```bash
node - <<'EOF'
const { Scene } = require(process.cwd() + '/.claude/skills/draw/lib/excalidraw.js');
const s = new Scene();
const a = s.node(100, 100, 240, 90, 'Research', { accent: 'blue', fill: 'tint', sub: '01–02' });
const b = s.node(460, 100, 240, 90, 'Strategy',  { accent: 'yellow', fill: 'tint' });
s.arrow(a, b, { label: 'gate: evidence' });
console.log(s.validate());                       // must print []
s.previewSVG('/tmp/preview.svg');
s.writeObsidian('/path/Vault/Excalidraw/Thing.excalidraw.md');
EOF
```

Write the generator as a **script in the scratchpad**, not inline one-liners — you will
re-run it four or five times while fixing the layout. Full API and the file-format rules:
`.claude/skills/draw/reference/excalidraw-format.md`. Layout numbers, palette, spacing: `.claude/skills/draw/reference/diagram-craft.md`.

## 4 · Look at it before you hand it over — non-negotiable

A diagram you have not seen is a diagram with a text label sitting on top of an arrow.

```bash
node gen.js && qlmanage -t -s 1400 -o . preview.svg >/dev/null 2>&1
```

Then `Read` the resulting `preview.svg.png` and actually inspect it: overlaps, arrows
crossing boxes, text past a container edge, a lonely element in a sea of white. Fix, re-run,
look again. `s.validate()` catches box overlaps mechanically — it does not catch ugly.

The preview is a flat approximation: no hand-drawn stroke, elbow arrows drawn straight,
arrow labels sitting on the line instead of splitting it. Do not "fix" those three — they
are artefacts of the preview, not of the drawing.

## 5 · Where the file goes

- **Obsidian vault** (a `.obsidian/` folder above the target): `<vault>/Excalidraw/<Name>.excalidraw.md`
  via `writeObsidian()`. Link the drawing's boxes to their notes with `link: '[[Note Name]]'` —
  in Excalidraw view the box becomes clickable. Mention the drawing in the note that owns
  the topic if it deserves to be found again.
- **Anywhere else**: `writeExcalidraw()` → a plain `.excalidraw`, opens on excalidraw.com and in VS Code.
- **Throwaway / just to look at**: scratchpad, and send the PNG with `SendUserFile`.

Send the preview PNG with the file either way — the user cannot see the canvas from the
terminal, and a picture in the reply beats a path.

## Gotchas that cost time

- **Obsidian fights you for the file.** If the drawing is open in Obsidian while you write
  it, the plugin re-saves its own in-memory copy over yours (compressed, possibly a merge of
  both). Write once, wait, re-read, and check your latest text is there. If it got clobbered,
  ask the user to close the tab.
- **Never regenerate over a hand-edited drawing.** Once the user has moved boxes, your
  script is stale. Ask before overwriting; otherwise their edits are gone.
- **Keep the generator.** Same scratchpad, same name, so "przesuń to niżej" is a two-line
  edit instead of a rewrite.
- **Stable ids.** The library numbers elements deterministically, so re-running the same
  script keeps element links and block references pointing at the same things. Don't shuffle
  the order of `s.*` calls when you only meant to change a colour.
- Project rules still apply on the canvas — brand colours, claims, guardrails from the
  repo's `CLAUDE.md` bind a drawing exactly as they bind a note.
