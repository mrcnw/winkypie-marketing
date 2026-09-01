---
tags: [process, moc]
updated: 2026-09-02
---
# Process — the channels

**The channel being worked sits here. Everything not started sits in `todo/`.** That is the
whole filing rule: if you can see a channel folder at this level, it is live work.

[[Process.excalidraw|The process drawing]] is the same thing as a picture.

```
process/
├── Process.excalidraw.md   the queue, drawn
├── meta-ads/               ← active. The nine-step loop
└── todo/                   parked, in queue order
    ├── tiktok-ads/
    ├── tiktok-organic/
    ├── instagram-organic/
    └── influencers/
```

The queue is fixed. Each channel opens on what the one before it proved:

| # | Channel | Where | Status | What it is |
|---|---|---|---|---|
| 1 | **Meta Ads** | [[process/meta-ads/README\|meta-ads]] | **active** | Paid on Facebook and Instagram. Nine steps, research → launch → KPI. |
| 2 | TikTok Ads | [[process/todo/tiktok-ads/README\|todo/tiktok-ads]] | not started | Paid on TikTok. Opens when Meta has a creative worth repeating. |
| 3 | TikTok Organic | [[process/todo/tiktok-organic/README\|todo/tiktok-organic]] | not started | Posting as WinkyPie. Fed by whatever the paid creative proved. |
| 4 | Instagram Organic | [[process/todo/instagram-organic/README\|todo/instagram-organic]] | not started | `@winkypie.app` — the only social channel wired today. |
| 5 | Influencers | [[process/todo/influencers/README\|todo/influencers]] | not started | Paid creators and UGC. Needs known hooks and a known CAC first. |

**One channel at a time, and it is meta-ads.** The four in `todo/` are README stubs and
nothing else, on purpose. Notes written for a channel nobody is working go stale and then get
believed.

A channel opens when the one before it has a repeatable winner — not when it looks
interesting.

## Opening a channel

Move the folder out of `todo/` into `process/`, then give it the shape of `meta-ads/`:

```
<channel>/
├── README.md          the loop, the gates, the rhythm, the step table
├── <Channel>.canvas   the loop seen from above — one canvas, the top view
├── _Template/         copy this folder to add a step
└── NN Step Name/      one folder per tile: documentation, NN TODO.md, its outputs
```

Then update the table above, [[process/todo/README|todo]], and the process drawing.

Steps and numbering belong to the channel. Do not copy Meta's nine steps unquestioned —
TikTok's creative loop turns over faster and its research step is a different job.
