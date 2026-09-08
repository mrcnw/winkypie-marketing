---
tags: [plan, instagram, calendar]
step: 07
status: plan
updated: 2026-09-08
from: 2026-09-08
---
# Posts Calendar — @winkypie.app, from 2026-09-08

Documentation: [[07 Update Facebook Account]] · Checklist: [[07 TODO]] · Profile fixes: [[Instagram Profile]]

What goes on the `@winkypie.app` grid and when. The profile itself — name, bio, links,
highlights, the pinned tiles — is fixed in [[Instagram Profile]]; this note is only the
posting plan. Product facts and claim limits are not repeated: every post stays inside
`PRODUCT.md` §9–§11, and nothing here is made only for organic — each slot is filled from a
creative paid already runs or an asset in `app/public/assets/winkypie/`.

The shape of a static post — slide grid, type, caption, the first comment — is
[[Static Post Format]]; the queue of topics behind the Education slot is [[Post Ideas]];
each written post is a note in `posts/`.

The dashboard renders this note at `/instagram?tab=calendar` — the `## Schedule` table on a month grid with today marked; every other section as written.

## The three pillars

Asked for on 2026-09-08 as *before/after · education · UGC*. Kept as three, two of them renamed to what we can actually show:

| Pillar | What it is | Source material today | Rules it must keep |
|---|---|---|---|
| **Pose → Result** (asked for as *before/after*) | The pose he picked, the selfie he gave, the photo the app made — the transformation pillar, 40 % of the message weight in `PRODUCT.md` §9 | Pinned tile 3 · the result captures in `mobile-app/app-flow-2026-09-07/` (05, 07, 08) · the phone-in-hand run · `POSERESULT` creatives when step 04.1 delivers them | Reference pose → result, never bad-me → hot-me (`PRODUCT.md` §11). The §11.2 disclosure on the frame and in the caption. Instagram's AI label on. Men only |
| **Education** | How it works and why it is different: the free photo check, pose coaching, one selfie not twenty, deleted in 7 days and never used for training, *not a filter*. The five sourced stats, each with its label | Pinned tiles 1–2 · the app captures · the poses snapshot · the *freecheck* host clip · text cards from the locked lines · the carousels queued in [[Post Ideas]] | A number only with its `PRODUCT.md` §8 source label. No pose count. No "Winky Shots". No vendor names |
| **UGC** | A person on camera using the app — the human creator clips and the disclosed AI host from [[04.1 Outsource The Shoot]] | `WP_UGC_phoneinhand_9x16_v1` · `WP_P2_HOST_freecheck_9x16_v1` · `WP_P3_HOST_triedthemall_9x16_v1` · the wave-two host clips once rendered ([[Host Scripts]]) | Never a testimonial, never a result claim, never an invented user. The host is labelled AI on screen ([[Production Guardrails]]). A creator's likeness release before the clip posts |

## Is the split a good idea

Yes, with three corrections — the split is the right shape, the labels were not.

- **It maps onto what already exists.** Pose → Result is the transformation pillar, Education is *ease* plus *trust*, UGC is the 04.1 lane. The four highlights planned in [[Instagram Profile]] (How it works · Photo check · Poses · FAQ) are Education; the pinned tiles are one of each. Nothing new has to be made.
- **"Before/after" is the one frame to avoid.** It is what Meta restricts in appearance-adjacent categories the moment a post is boosted, and it invites the *bad me → hot me* read `PRODUCT.md` §11 tells us not to make. The app's own result screen already shows *pose used* and *photo used* — the honest frame costs nothing. Hence *Pose → Result*.
- **"UGC" is thin and must stay honest.** There are no real users to quote and guardrail 2 bans testimonials, so the pillar is the creator lane: two host clips and one phone-in-hand run exist today. It gets one slot a week and reuses those until the shoot order delivers more.
- **Equal thirds under-weight transformation** (40 % in §9 against 25 + 8 for the other two). Accepted on purpose: on a grid the rhythm is worth more than the weight, and the text cards — locked lines — are transformation copy too.
- **One pillar per weekday makes the grid read as a page.** Three posts a week on fixed days, nothing else, and each grid column stays one pillar (Instagram fills rows newest-first, three across; the three pinned tiles are the first row). The price is discipline: a fourth post in a week shifts every column below it.

## Rhythm

- **Monday — Pose → Result. Wednesday — Education. Friday — UGC.** 20:00 New York every time — 02:00 Warsaw the next morning, scheduled, never posted live (*When to post* below). Monday and Friday sit on the calendar as empty slots today: the day is fixed, the post is not.
- **Every second Wednesday the Education slot is a text card:** black, one locked line, the punch word in the gradient — *Looks pro. Still you.* · *She decided in 100 ms.* · *Be the right swipe.*
- **Every reel carries the header line** from [[Instagram Profile]] — `Authentic pro photos. More matches.`, top 12 % of the frame.
- **Caption:** two beats, then *Link in bio.*, then `#WinkyPie #AIPhotos #AIPhotography #ProfilePic` and the collection tag of the pose shown (`PRODUCT.md` §6). A comment keyword only once a DM automation answers it.
- **Every result shown:** the §11.2 disclosure on the frame and in the caption, the AI label on.
- **Stories are not in this plan.** The highlights are built once, per [[Instagram Profile]].
- **Status.** A row becomes `posted` the day it goes up — edited here, never in the app. `needs asset` means the slot is claimed but the file does not exist yet.

## When to post

The audience is in the US; the poster is in Poland. The slot is **20:00 New York** — his
evening, after dinner, phone in hand — which is **02:00 Warsaw the next morning**. Nobody posts
live at 02:00: every row is scheduled ahead. `Date` in the schedule is the **US day** the post
lands on, because that is the day the audience lives in; the Warsaw clock only matters when the
scheduler asks for a time. Decided 2026-09-08, replacing the 18:00-Warsaw compromise of the same day.

| Slot | New York | Los Angeles | Warsaw | What it hits | Verdict |
|---|---|---|---|---|---|
| **20:00 ET** | 20:00 | 17:00 | 02:00, next day | East Coast after dinner, West Coast home from work — the evening he is on the dating apps | **Pick.** Every row, scheduled |
| 12:00 ET | 12:00 | 09:00 | 18:00, same day | East Coast lunch, West Coast just at its desk. Postable by hand from Poland | Dropped — a compromise for the poster, not the audience |
| 22:00 ET | 22:00 | 19:00 | 04:00, next day | Both coasts in the evening scroll, East Coast about to sleep | Second choice if 20:00 ever reads weak in Insights |

- **How much the hour matters: little, today.** An account with two followers gets its reach from Reels distribution to non-followers, which Instagram spreads over days, not minutes. The hour decides the first hours, not the result; the hook in the first second, the header line and a post every week decide the result. The hour starts to matter once there are followers to reach — and Insights shows *Most active times* only from 100 followers. Revisit then, with our own data.
- **Scheduling.** Instagram's own scheduler (Advanced settings on a new post or reel) takes a post up to 75 days ahead and uses the phone's clock — from Poland, pick the next day and 02:00. Meta Business Suite does the same from the desktop and can be set to New York time, where 20:00 is typed as written. One of the two, never both.
- **Clock change.** Poland leaves summer time on 2026-10-25, the US on 2026-11-01. In that week 20:00 New York is 01:00 Warsaw; from 2026-11-01 it is 02:00 again. The New York slot never moves.
- No third-party "best time" study is cited on purpose — they disagree with each other and none is about men on dating apps `[assumption]`.

## Schedule

`Date` is the US day the post lands on and `Time` is New York; in Warsaw that is 02:00 the next morning — see *When to post*. `Asset` is the file under `app/public/assets/winkypie/` or the creative name from [[Creative Naming]]. `Status`: `planned` · `needs asset` · `needs post` · `posted`.

**Pose → Result and UGC are empty slots, 2026-09-08.** Both pillars were cleared at the owner's call and put back as placeholders: the day is claimed, nothing else is decided. A placeholder carries a date, a time and a pillar, and `needs post` in `Status` — no format, no asset, no line. It holds the weekday so the grid keeps its shape and nobody has to re-derive the rhythm; filling one is a separate decision, and until it is made the slot stays blank rather than carrying a guess. **Only Pinned and Education are actually scheduled.**

| Date | Weekday | Time | Pillar | Format | Asset | Line | Status |
|---|---|---|---|---|---|---|---|
| 2026-09-08 | Tue | 20:00 ET | Pinned | 3 tiles | `instagram/pinned/WP_IG_PIN1…PIN3` | *Pick a pose · Upload a photo · More matches* — post all three, pin 3 → 2 → 1 | planned |
| 2026-09-09 | Wed | 20:00 ET | Education | Reel | `creatives/ugc/WP_P2_HOST_freecheck_9x16_v1.mp4` | *Would your selfie pass?* — the free check | planned |
| 2026-09-11 | Fri | 20:00 ET | UGC |  |  |  | needs post |
| 2026-09-14 | Mon | 20:00 ET | Pose → Result |  |  |  | needs post |
| 2026-09-16 | Wed | 20:00 ET | Education | Carousel | Ten 4:5 text cards, written but not designed — [[WP_IG_EDU1_firstphoto]] | *The first photo does all the work.* — seven rules, every number sourced in the first comment | needs asset |
| 2026-09-18 | Fri | 20:00 ET | UGC |  |  |  | needs post |
| 2026-09-21 | Mon | 20:00 ET | Pose → Result |  |  |  | needs post |
| 2026-09-23 | Wed | 20:00 ET | Education | Carousel | `mobile-app/app-flow-2026-09-07/03-photo-check-analyzing.png` → `04-photo-check-90-match.png` | *It checks your selfie before it charges you.* | planned |
| 2026-09-25 | Fri | 20:00 ET | UGC |  |  |  | needs post |
| 2026-09-28 | Mon | 20:00 ET | Pose → Result |  |  |  | needs post |
| 2026-09-30 | Wed | 20:00 ET | Text card | Static | Made from the locked line — black, punch word in the gradient | *Looks pro. Still you.* | needs asset |
| 2026-10-14 | Wed | 20:00 ET | Text card | Static | Made from the locked line | *She decided in 100 ms.* | needs asset |

While Pose → Result and UGC are empty slots, only the Wednesday Education slot runs — one post a week, alternating a carousel from [[Post Ideas]] with a text card. When Pose → Result and UGC come back, the three-a-week cycle resumes and each slot is filled from whatever paid creative ran that week. Add rows here; the calendar follows on refresh.
