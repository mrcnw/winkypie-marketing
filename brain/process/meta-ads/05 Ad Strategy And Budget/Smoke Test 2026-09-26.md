---
tags: [strategy, budget, smoke-test]
updated: 2026-09-26
---
# Smoke Test 2026-09-26 — $15 a day, three ads, fourteen days

**The owner's decision on 2026-09-26: before the round one written in [[Budget And Thresholds]]
($45–60 a day, six ads), run a $15-a-day smoke test with three ads for fourteen days.** It is
not round one and must never be read as one. Round one follows as a **new campaign** at a
budget decided after this test reads; this ad set is not raised or extended into it.

## What it is for

| Reads | Does not read |
|---|---|
| The pipeline: payment, review, delivery, events arriving in Events Manager and SKAdNetwork postbacks | CPI. A handful of installs is not a number |
| The real US CPM for this account, which re-cuts the ads-per-set table in [[Budget And Thresholds]] | CAC, install→trial, trial→paid, anything about the business |
| Hook rate and CTR on three creatives, directional | Which creative "won". At this sample it is noise |

The ad set cannot exit the learning phase at $15 a day (it needs ~50 installs a week; see
[[Budget And Thresholds]]). "Learning limited" is the expected state and is not a reason to
touch anything. Any CPI from this test is written `[smoke test, n<20 installs]`, never as a
baseline in [[KPI]].

## The set

One Advantage+ app campaign, one ad set, three ads, chosen by the owner:

| Ad | Medium | Why it is in |
|---|---|---|
| `WP_P2_STATIC_oneselfie_4x5_v1` | image 4:5 | clean under §11, fully approved, mechanism visible in one frame |
| `WP_P2_STATIC_coworker_4x5_v1` | silent video 4:5, 12 s | peer-discovery story; runs with four waived §11 items, which makes it a compliance probe as much as a creative test |
| `WP_P2_STATIC_swipingback_9x16_v3` | video 9:16, 13 s, voice-over | profile-as-a-set angle; v0 picture with the owner's voice-over, black lead-in trimmed (v3). First plate still asks the viewer about his results |

Three different carriers, no twins, all P2. Copy, headline, description and button per brief,
CTA "Install now" on all three, App Store destination from PRODUCT.md §2.

## Settings as launched

| Setting | Value |
|---|---|
| Objective · optimisation | App Promotion (iOS 14+, SKAdNetwork) · app installs, lowest cost, no cap |
| Targeting | United States · iOS 15.1+ · English · mobile · Advantage+ placements |
| Attribution | AEM as reporting view, **1-day click** — the only window Meta allows for install-optimised iOS 14+ ad sets; the API accepted a 7-day request at creation and stored 1-day at publish |
| Budget | $15 a day on the campaign · campaign spend cap $210 · account funded with $300 prepaid |
| Account currency · time zone | USD (changed from PLN at first payment setup) · Europe/Warsaw, so the reporting day ends at 18:00 New York |
| Identity | WinkyPie Page on both Facebook and Instagram (the Instagram profile is deliberately not linked while it has no followers) |
| Advantage+ creative enhancements | off. Standard enhancements left at Meta's defaults except as the owner edits them |
| AI disclosure | OPT_IN on oneselfie and swipingback (rendered men on frame); not set on coworker |

Switched on 2026-09-26 at about 19:40 CEST (13:40 New York); all five objects confirmed ACTIVE
through the API at 19:44 CEST. The owner then scheduled the ad set to start at 00:00 CEST on
2026-09-27 (18:00 New York), which makes day 1 a full account day. Timeline and the do-not-touch date are in
[[08 Launch The Ad]]'s `Campaign Tracker.md`.

## Rules for the fourteen days

1. No edits: budget, copy, targeting, creative, placements. No new ads. No pausing the ad set.
2. Allowed: pausing an ad Meta rejects, and pausing the campaign if spend runs off plan.
3. Day 1 is a delivery check only. Day 7: is every ad above zero impressions, are events
   arriving. Day 14: hook rate and CTR per ad at the impression floor from [[KPI]], CPM
   recorded. Nothing is scaled from this test.

## What setting it up taught us (2026-09-26)

- Meta's creative API deprecated `link_title` / `link_description` inside the CTA; an ad that
  carries them loses up to 18 placements. Headline and description go in the link or video
  data only.
- A video ad needs an explicit cover image; Meta does not generate one at ad level. Covers
  live in `app/public/assets/meta-posters/` at a public URL.
- Meta builds the asset thumbnail from frame zero. A cut that opens on black shows a black
  tile everywhere. Frame zero is the hook plate from now on.
- Drafts marked deleted through the API stay in Ads Manager with an error; only the owner's
  "Discard draft" removes them.
- Meta's "format display options" (single media + carousel) are on by default and let Meta
  cut a single image into a two-card carousel for some viewers. Left on for the smoke test
  (switching it off three hours before launch would have re-triggered review); switch it off
  at creation in the next campaign, together with the standard enhancements.
- Ads Manager's preview panel does not load `fbcdn.net` media in the owner's browser; blank
  previews there are not evidence. Meta's own renders through the API, or "Preview on mobile
  device", are.
