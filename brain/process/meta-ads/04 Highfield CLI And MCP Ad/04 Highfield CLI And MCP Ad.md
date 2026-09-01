---
tags: [step, produce]
status: blocked
phase: produce
owner:
updated: 2026-09-01
---
# 04 · Highfield CLI And MCP Ad

Checklist: [[04 TODO]] · Canvas: [[Meta Ads.canvas|Meta Ads]]

> **Open question — resolve before starting.** Highfield CLI & MCP is a developer product.
> It is not WinkyPie, and none of the WinkyPie positioning, personas or guardrails in this
> vault apply to it: different buyer, different channel, different proof. This step is
> `blocked` until two things are decided:
>
> 1. **Is this a separate product line, or a WinkyPie feature?** If separate, it needs its
>    own positioning and persona notes — do not borrow WinkyPie's.
> 2. **Is Meta even the right channel?** Developer tools rarely convert on Meta. The honest
>    default for a CLI + MCP server is where developers already are.
>
> Everything below assumes a separate developer product. Rewrite it if that is wrong.

## Goal
A creative set for Highfield CLI & MCP that a developer recognises as being for them, built
on a demonstrated capability rather than a claim.

## Process
1. **Show the terminal.** For a CLI, the demo *is* the ad. Real commands, real output, real
   latency. A developer detects a faked terminal instantly and it costs you the whole ad.
2. **Lead with the command.** The first frame should be something a viewer could type. Not
   a logo, not a value proposition — a command.
3. **MCP needs a concrete client.** "Works with MCP" means nothing on its own. Show it
   inside the client the audience actually uses, doing one specific job end to end.
4. **One workflow, not a feature tour.** Pick the single thing that is annoying today and
   show it taking one step instead of six. Feature lists do not convert.
5. **Readable code on a phone.** Large font, high contrast, short lines. If the terminal
   text is unreadable at phone size, the ad does not exist. Test it on a phone before export.
6. **Copy in three lines**: what it is (technical, precise) · what it saves (concrete) ·
   how to start (`npm i -g …` or equivalent). No adjectives.
7. **Same honesty guardrail as the rest of the repo.** No invented install counts, no
   fabricated benchmarks, no "used by teams at …" without permission in writing.

## Done when
- The two blocking questions are answered in writing at the top of this file.
- A demo recording exists showing a real, unedited run.
- Three cuts exported: 30s, 10s, static.
- Copy written, install command verified by running it on a clean machine.

## Output
- `highfield/Positioning.md` — only if it is confirmed as a separate product
- `briefs/highfield-cli-mcp.md`

## Notes
This step sits inside the WinkyPie loop in the canvas because it is on the same production
pipeline, not because it shares an audience. Keep its docs in their own `highfield/`
subtree so the two products' positioning never gets mixed.
