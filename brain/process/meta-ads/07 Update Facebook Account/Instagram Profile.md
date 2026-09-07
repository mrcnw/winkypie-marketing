---
tags: [setup, instagram, audit]
step: 07
status: todo
updated: 2026-09-07
profile: https://www.instagram.com/winkypie.app/
reference: https://www.instagram.com/roast.dating/
---
# Instagram Profile — what to fix, modelled on @roast.dating

Documentation: [[07 Update Facebook Account]] · Checklist: [[07 TODO]]

`@winkypie.app` is the handle every Instagram-placement ad runs under, and the profile a man
taps before he installs. Today it undercuts the ad: one post, a woman in it, none of the
locked lines. Audited 2026-09-07 through a logged-in browser against
[[ROAST]]'s account — the competitor that matters (`../../../PRODUCT.md` §3) and the only one
in the niche with a profile that works as a landing surface. Product facts and claim limits
are not repeated here; every fix below stays inside `PRODUCT.md` §9–§11.

The dashboard renders this note at `/instagram`. Edit it here; the page follows on refresh.

## Where we are — 2026-09-07

| Field | Live value | Verdict |
|---|---|---|
| Name field | `WinkyPie - AI Photo Studio` | Generic. No "dating", the one keyword the buyer searches. The name field is searchable; the bio barely is |
| Bio | 📸✨ Your AI photographer in your pocket · 🔥 One selfie → stunning pro photos · 📲 Download now👇 · #WinkyPie | None of the locked lines. "Stunning" is hype (§9). The 👇 points at a website, not the store. A hashtag in a bio links to nothing useful |
| Link | `winkypie.app` — one link | The App Store is two taps away. Instagram allows five links |
| Picture | The mark on the gradient ring | **Keep.** Reads at 40 px, matches the app icon |
| Posts | 1, pinned, posted 2026-04-24, tagged New York City. "Same Face. New level" phone mockup — the result shown is a **woman** | Breaks guardrail 1 (men only). The caption says "Upload. Pick a pose. Run" — the reversed flow listed as stale in `PRODUCT.md` §12 — plus "Free shots on us" (the retired credit word) and "ready in seconds" (unsourced, §13). Archive it |
| Followers / following | 2 / 0 | Nothing is at stake in a reset. 0 following reads as a bot account |
| Highlights | None | The profile has no second screen |
| Reels | None — the tab does not appear | Reels are the only reach lever an account with 2 followers has |

## The model — what @roast.dating does

185 posts, 8.6k followers, 69 following on 2026-09-07. Their profile is built to catch a
search and turn a tap into a DM. Element by element, and what we take from each:

| Element | @roast.dating | For us |
|---|---|---|
| Name field | `ROAST - Best Dating Profile Review` — the category keyword in the searchable field | `WinkyPie · Authentic AI Dating Photos` |
| Bio | Three lines, one repeated glyph (⚡️): what it is → why follow → a CTA ending in 👇 | Four lines that already exist — the primary line, the live paywall line, the product-truth line, the trial. One 👇 |
| Links | Site + Threads | App Store first, site second |
| Highlights | Photoshoot · FAQs · Testimonials · Tips — four, flat brand-colour covers on black | How it works · Photo check · Poses · FAQ. **No Testimonials** until real reviews exist (`BRAND.md` §11) |
| Grid | Almost every tile a 9:16 Reel. The same header line sits on top of every reel — *"If only there was a page dedicated to getting you more dates…"* — with one word in brand green. Every fourth tile is a text card: black, one sentence, one highlighted word | The same two devices, in our kit: one fixed header line on every reel with the punch word in the gradient, and text cards made of the locked lines (*Looks pro. **Still you.***) |
| Content | Street interviews, skits, single-life humour — mostly other people's clips — and tips carousels on bios and texting | Our own material only: the host clips from [[04.1 Outsource The Shoot]], the campaign statics from [[03 Choose Videos And Five Campaigns]], the store screens. Organic reuses what paid proved; it does not get its own content strategy |
| Caption | *"Comment ROAST to get started"* at the top and the bottom, a long body, three hashtags | The comment keyword only once a DM automation answers it. Until then: *Link in bio.* Hashtag core from `PRODUCT.md` §9 plus one thematic set |
| Following | 69 accounts | Follow ~50 in the niche — competitors, dating coaches, photographers — so the account stops looking automated |

## Do not copy

- **"10x your dates."** A multiplier is the claim `PRODUCT.md` §11 bans. Our line stops at *More matches.*
- **"600,000+ users"** and a **Testimonials** highlight. We have no ratings and no user count to show. Guardrail 2 — not even as a placeholder.
- **Women and couples in the grid.** Guardrail 1. Every face on our profile is a man.
- **"You're not ugly" / blaming the viewer for being single.** Off-voice, and the personal-attributes rule the moment a post is boosted.
- **Reposted clips of strangers.** Rights. Our clips are licensed through the 04.1 shoot order.
- **A comment-keyword CTA with nothing behind it.** Bait without a reply loses the follower it just won.

## New bio

Name field (64-character limit):

```
WinkyPie · Authentic AI Dating Photos
```

Bio (150-character limit — this is 125). Every line is a locked line or live app copy from
`PRODUCT.md` §1; nothing is paraphrased:

```
Authentic pro photos. More matches.
One selfie. AI does the rest.
Looks pro. Still you.
Free trial on iOS, cancel anytime 👇
```

Links, in this order:

1. `https://apps.apple.com/us/app/winkypie/id6757441777` — title *Download on the App Store*
2. `https://winkypie.app` — title *winkypie.app*

Shorter name if the long one wraps on a phone: `WinkyPie · AI Dating Photos`. Keep *Authentic*
if it fits — it answers the buyer's first blocker (`PRODUCT.md` §3) and it is not a claim.

## Highlights to build

Four covers: near-black, one gradient glyph, one word under it. Same construction as the
store-screenshot captions (`BRAND.md` §8).

| Highlight | Stories inside | Source |
|---|---|---|
| How it works | Pick a pose or upload → mirror the pose → your photo. Three stories | Store slots 2, 3 and 5 |
| Photo check | The free pre-flight: pass / warn / block, and *"It checks your selfie before it charges you."* | Store slot 4, an in-app capture |
| Poses | One story per scene collection — seven — no count anywhere | The catalog snapshot in `app/public/assets/winkypie/poses/` |
| FAQ | 3 days free, cancel anytime · selfie deleted within 7 days, never used for training · iOS · *not a filter* | `PRODUCT.md` §2, §7, §11 |

A *Results* highlight comes later and only with the §11.2 disclosure on every story.

## Grid rhythm

- **Reels first.** Three a week, cut from the paid creative — the 04.1 host clips are already 9:16 and already say the locked lines.
- **One header line on every reel**, top 12 % of the frame: `Authentic pro photos. More matches.` in Fraunces, *matches* italic in the gradient. Roast's header is what makes their grid read as one page; ours does the same job with the brand line.
- **Every fourth tile a text card.** Black, one locked line, the punch word in the gradient. The first three cards: *She decided in 100 ms.* · *Looks pro. Still you.* · *Be the right swipe.*
- **Pin three:** the primary-line card, the *How it works* reel, the *Photo check* reel. That is the whole pitch above the fold.
- **Caption:** two beats, then *Link in bio.*, then `#WinkyPie #AIPhotos #AIPhotography #ProfilePic` plus the scene-collection tag of the pose shown (`PRODUCT.md` §6). No stat without its source label.
- **Every result shown carries the disclosure** — *"Demo. Your photos use your actual face and body. Results vary based on selfie quality, lighting, and pose."*

## Do this, in order

1. **Archive the pinned post.** A woman as the result, the reversed flow, "shots" — three rules broken in one tile. Same day, before anything else.
2. **Rename the name field** to `WinkyPie · Authentic AI Dating Photos`.
3. **Replace the bio** with the four-line block above, pasted as-is.
4. **Set the links:** App Store first with the title *Download on the App Store*, `winkypie.app` second.
5. **Check the account type.** Professional account, category *App page*, so insights and the contact button exist. Confirm it is the account linked to the Page in [[Account Setup]].
6. **Post three tiles and pin them:** the primary-line text card, the *How it works* reel, the *Photo check* reel. All male, disclosure on every result frame.
7. **Build the four highlights** — How it works, Photo check, Poses, FAQ — with brand covers.
8. **Follow ~50 accounts** in the niche.
9. **Start the rhythm:** three reels and one text card a week, every reel with the header line. Source: the paid creative that runs, nothing made only for organic.
10. **Decide on the comment-keyword DM automation** before writing *Comment POSE* in any caption. It needs a tool and a reply script; until it exists, *Link in bio.*
