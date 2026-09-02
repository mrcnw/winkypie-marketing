# Excalidraw — the format, and the library that writes it

## Library API (`lib/excalidraw.js`)

```js
const { Scene, PALETTE, FONT, measure, wrap } = require(process.cwd() + '/.claude/skills/draw/lib/excalidraw.js');
const s = new Scene({ font: FONT.hand, roughness: 1, background: '#ffffff' });
```

| Call | What it makes |
|---|---|
| `s.rect(x, y, w, h, o)` · `s.ellipse` · `s.diamond` | a bare shape |
| `s.node(x, y, w, h, 'Label', o)` | shape + **bound** label; `o.sub` adds a small caption line |
| `s.text(x, y, 'str', o)` | standalone text; `o.width` fixes the box and wraps into it |
| `s.bindText(el, 'str', o)` | bind text into a shape **or an arrow** (arrow labels) |
| `s.zone(x, y, w, h, 'PHASE', o)` | dashed tinted backdrop + title above it |
| `s.frame(x, y, w, h, 'name')` | a real Excalidraw frame — **clips** its children, prefer `zone` |
| `s.arrow(a, b, o)` | bound arrow between two elements, anchors picked automatically |
| `s.arrow([[x,y],[x,y],…], o)` | explicit polyline, unbound |
| `s.line([[x,y],…], o)` | plain rule/divider |
| `s.validate()` | `[]` or a list of overlap / id problems — always check |
| `s.bounds()` · `s.previewSVG(f)` · `s.writeObsidian(f)` · `s.writeExcalidraw(f)` | output |

Shape options: `accent` (palette key), `fill: 'tint' \| 'none'`, `bg`, `stroke`, `strokeWidth`,
`strokeStyle: 'dashed' \| 'dotted'`, `sharp`, `link: '[[Note]]'`, `size`, `sub`, `subSize`.
Arrow options: `label`, `labelSize`, `accent`, `dashed`, `elbow`, `both`, `head: null`, `gap`.

Anything the API doesn't cover: mutate `s.elements` directly — they are plain objects.

## Raw element facts worth knowing

- **Text is never a property of a shape.** A label is its own element with
  `containerId: <shape id>`, and the shape lists `{ id, type: 'text' }` in `boundElements`.
  Both directions are required. There is no `label` shorthand.
- **Arrows bind the same way**: `startBinding` / `endBinding` = `{ elementId, focus, gap }`,
  and each end shape lists the arrow in `boundElements`. Unbound arrows keep both `null`.
- `x, y` on an arrow/line is its **first point**, not its bounding box; `points` are relative
  and may be negative. Compute extents from the points (the library's `bounds()` does).
- `elbowed: true` on an arrow gives orthogonal auto-routing — only on `type: 'arrow'`.
- `roundness: { type: 3 }` rounds a rectangle, `{ type: 2 }` curves a multi-point arrow,
  `null` is sharp. Diamonds take `null`.
- `roughness`: `0` architect, `1` artist, `2` cartoonist. `fillStyle`: `hachure`, `cross-hatch`, `solid`.
- `fontFamily`: `5` Excalifont (hand-drawn), `6` Nunito, `7` Lilita One, `8` Comic Shanns,
  `2` Helvetica, `3` Cascadia. Legacy `1` (Virgil) still loads and renders as Excalifont.
- `lineHeight` is `1.25`; text height = `lines × fontSize × 1.25`. Standalone text with a
  fixed `width` needs `autoResize: false` — the library handles this.
- Declaration order = z-order. Shapes, then arrows, then loose text on top.
- Every element needs the full base: `angle, strokeColor, backgroundColor, fillStyle,
  strokeWidth, strokeStyle, roughness, opacity, groupIds, frameId, roundness, seed, version,
  versionNonce, isDeleted, boundElements, updated, link, locked`. Missing fields make the
  file load "empty" with no error.

## The Obsidian plugin file (`.excalidraw.md`)

```
---
excalidraw-plugin: parsed
tags: [excalidraw]
---
…warning line the plugin writes…

# Excalidraw Data

## Text Elements
Every text element's raw text ^<id>

## Element Links
<id>: [[Note Name]]

%%
## Drawing
```json
{ "type": "excalidraw", "version": 2, "source": …, "elements": […], "appState": {…}, "files": {} }
```
%%
```

- **Text element ids must be exactly 8 characters.** The plugin's parser matches
  `\s\^(.{8})\n` — they double as Obsidian block references. The library enforces this.
- The plugin re-saves as `compressed-json` (LZ-String). That is normal and readable back by
  the plugin; the `## Text Elements` section stays plain, so grep it to check which version
  of your content actually landed on disk.
- Element links are `[[wiki links]]` relative to the **vault root**. Prefer a unique note
  name (`[[01 Find Competitors]]`) over a path; use the path when the name repeats
  (`[[process/meta-ads/README]]`).
- Writing a file Obsidian currently has open in an Excalidraw view can be overwritten by the
  plugin's own save. Verify after writing.

## Verify loop on macOS

```bash
node gen.js                                          # writes drawing + preview.svg
qlmanage -t -s 1400 -o . preview.svg >/dev/null 2>&1  # → preview.svg.png
```
`qlmanage` renders SVG into a **square** thumbnail; `previewSVG()` letterboxes the scene to a
square viewBox so nothing gets cropped. Then `Read` the PNG.

## Sources

- [Excalidraw element skeleton / programmatic creation](https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/excalidraw-element-skeleton)
- [Element binding system](https://deepwiki.com/excalidraw/excalidraw/3.2-element-binding-system)
- [Frames and containment](https://deepwiki.com/excalidraw/excalidraw/3.5-frames-and-containment)
- [Excalidraw constants — FONT_FAMILY](https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/constants)
- [ExcalidrawAutomate — the in-Obsidian scripting API](https://zsviczian.github.io/obsidian-excalidraw-plugin/API/introduction.html)
  (an alternative path: scripts run *inside* Obsidian; useful when the user wants a Script
  Engine button rather than a generated file)
