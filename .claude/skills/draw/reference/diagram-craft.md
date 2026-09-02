# Diagram craft — the numbers that make it look drawn on purpose

## Grid and spacing

Everything on a **20 px grid**. Pick one column pitch and one row pitch and never deviate;
misalignment reads as sloppiness faster than any wrong colour.

| Thing | Value |
|---|---|
| Node box | 220–280 × 90 (two-line label), 240 × 70 (one line) |
| Horizontal gap between nodes | 120–200 (leave 180+ where an edge label has to sit) |
| Vertical gap between nodes | 40 inside a zone, 120–160 between rows |
| Zone padding | 20–30 around its nodes |
| Row-to-row gap (snake layouts) | 120 minimum — the return edge routes through it |
| Canvas margin | 60 from the outermost element |
| Max elements | ~25 shapes. More than that and it wants to be two drawings |

## Type scale

| Role | Size |
|---|---|
| Title | 28–36 |
| Section heading | 20 |
| Zone title | 18 |
| Node label | 16 (14 when it must wrap to three lines) |
| Caption / deliverable under a label | 11–12, muted grey |
| Edge label, annotation | 13 |

One family per drawing. Hand-drawn (Excalifont, `FONT.hand`) for anything conceptual;
Helvetica (`FONT.sans`) only when the drawing has to look like a document.

## Colour

Palette keys in the library: `ink, grey, blue, green, yellow, red, violet, teal, orange`.
Each has `stroke` (pen), `bg` (solid fill) and `tint` (washed fill for zones).

- **Colour means something or it isn't used.** One hue per phase/category, held across the
  whole canvas. A legend is only needed when the mapping isn't obvious from the labels.
- Nodes: white or `tint` fill with a coloured stroke. Solid `bg` only for the one thing you
  want the eye to land on first.
- Zones: `tint` fill, dashed 1 px stroke of the same hue.
- Grey = inactive, blocked, not-yet, out-of-scope. Red = the constraint, the gate, the
  failure path — never merely "important".
- Dashed = conditional, deferred, or a feedback edge. Solid = the real path.

## Composition

- **Reading order is left→right, top→bottom.** When a flow needs a second row, snake it
  (row 2 runs right→left) — the return edge then closes the loop naturally instead of
  crossing the whole canvas.
- Route long feedback edges **outside** the body: down past the last row, back along the
  margin, up into the first node's free side. Never through the middle.
- An arrow entering a box should hit a side nothing else is using. If two arrows converge on
  the same edge, move one to another side or offset its entry point.
- Edge labels sit **on** the arrow (bound label) when short, or beside it in the gap column
  when long. Never let one land on top of another element.
- Fill dead space with the drawing's own notes — a rhythm panel, a legend, the rule that
  governs the arrows — rather than stretching the layout to cover it.
- Titles left-aligned above their block, not centred inside it. A block's title should be
  outside the block, so nothing has to fight the fill for contrast.

## Checks before handing it over

1. `s.validate()` returns `[]`.
2. You have **looked** at the rendered PNG.
3. Every arrow starts and ends on an edge, not inside a shape, not on a label.
4. No text crosses a container border.
5. Something is visibly the entry point — a title, a highlighted first node.
6. Every colour used appears at least twice, or is doing legend-free work you can explain.
7. The drawing says one thing. If you needed two sentences to name it, split it.
