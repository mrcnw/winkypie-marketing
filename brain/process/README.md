---
tags: [process, moc]
updated: 2026-09-01
---
# Process — the channels

One folder per channel. [[Process.canvas|Process canvas]] is the to-do: five tiles in queue
order, one checkbox each, each linking into its folder. The reasoning lives here, not on the
canvas — the canvas stays a list.

The queue is fixed. Each channel opens on what the one before it proved:

| # | Channel | Folder | Status | What it is |
|---|---|---|---|---|
| 1 | **Meta Ads** | [[process/meta-ads/README\|meta-ads]] | **active** | Paid on Facebook and Instagram. Nine steps, research → launch → KPI. |
| 2 | TikTok Ads | [[process/tiktok-ads/README\|tiktok-ads]] | not started | Paid on TikTok. Opens when Meta has a creative worth repeating. |
| 3 | TikTok Organic | [[process/tiktok-organic/README\|tiktok-organic]] | not started | Posting as WinkyPie. Fed by whatever the paid creative proved. |
| 4 | Instagram Organic | [[process/instagram-organic/README\|instagram-organic]] | not started | `@winkypie.app` — the only social channel wired today. |
| 5 | Influencers | [[process/influencers/README\|influencers]] | not started | Paid creators and UGC. Needs known hooks and a known CAC first. |

**One channel at a time, and it is meta-ads.** The other four are empty folders on purpose.
Notes written for a channel nobody is working go stale and then get believed.

A channel opens when the one before it has a repeatable winner — not when it looks
interesting.

## Opening a channel

Copy the shape of `meta-ads/`:

```
<channel>/
├── README.md          the loop, the gates, the rhythm, the step table
├── <Channel>.canvas   the loop seen from above — one canvas, the top view
├── _Template/         copy this folder to add a step
└── NN Step Name/      one folder per tile: documentation, NN TODO.md, its outputs
```

Then add the channel's tile to [[Process.canvas|the process canvas]] and a row above.

Steps and numbering belong to the channel. Do not copy Meta's nine steps unquestioned —
TikTok's creative loop turns over faster and its research step is a different job.
