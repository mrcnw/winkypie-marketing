---
tags: [brief, strategy]
campaign: WP_P2_STATIC_oneselfie
persona: P2 Grinder
format: static (results grid, selfie as centre inset)
variable: proof density as one frame instead of a 22-second wall
order: 11
modelled_on: []
cta: Install now
approved: [hook, primary-text, headline, description, cta, destination, render, guardrails, hypothesis]
not_applicable: [flags, ratios]
updated: 2026-09-22
---
# Brief — WP_P2_STATIC_oneselfie

**Single variable tested:** whether proof density survives being compressed into **one frame**.
[[WP_P2_PORTFOLIO_oneselfie]] — campaign 7 — argues that a wall of finished results outsells
an explanation, and spends 22 seconds building that wall. This card makes the same argument in
a single 4:5 still: five results in a grid, the source selfie as a circular inset in the
middle, and nothing else. **The variable is the carrier, not the angle**, which is why the
copy below is campaign 7's copy, held constant. Same exception campaigns 8 and 9 make.

Reading the two together answers something neither answers alone: whether the *duration* is
doing the work, or whether the photographs are.

**Evidence:** inherited from campaign 7, and it is a teardown rather than a saved ad —
[[Reface Male Portfolio Cut 2026-09-08]], 32 seconds, thirteen finished portraits of one man,
a narrator in a corner box, no UI and no before/after. `modelled_on` is empty because no entry
in `good-ads.json` corresponds to it; the note is the source. **No static in the swipe file
runs this shape**, which is the risk and the reason to test it: the niche's proven statics are
text-led cards, not galleries.

## Hook (verbatim, must be legible in 1.5 s, sound off)

> One selfie.
> **Authentic pro photos.**

Two lozenges over the grid, split by the centre inset — the first above it, the second below,
so the eye reads *input → the thing → output*. The punch is the italic gradient (the one brand
gradient), never uppercase (`BRAND.md` §4). "Authentic pro photos." is the front half of the
locked primary line (PRODUCT.md §1), and *Authentic* is load-bearing: it answers the persona's
first buying blocker, "thinks AI photos look fake" (§3).

**The centre inset is the brief.** Without it this is a gallery of a good-looking man and the
viewer has no reason to believe it came from his own phone. With it the layout states the
mechanism without a word of explanation: that selfie, these photos. Anything that removes the
inset removes the argument.

## The grid

| | What |
|---|---|
| Five outer cells | Finished results of one man — Paris street, café, kitchen, poolside, terrace. Different light, different setting, same face and build |
| Centre inset | The source selfie, circular, ringed in the brand gradient |
| Foot | The wordmark. **No App Store badge** — the link card carries the store, and a badge on frame would only repeat the button |

**Men only, one man, and he is generated.** No likeness release is owed, for him or for anyone
in the backgrounds. No app UI is on frame, no dating-app interface, no third-party mark.

## The retired scenario — `v0-endless`

The first render of this card said **"Endless pro photos. One selfie."** and carried the App
Store badge. Its layout is sound and it is kept as the record, but it cannot run: **"Endless"
is false against PRODUCT.md §7** — Pro allows 50 generations per rolling week and 100 per
rolling month, and the trial allows 5 over 3 days.

That is not a risk to weigh against an upside. It is a claim that contradicts the app's own
limits, which is the class of mismatch both Meta ad review and App Store review look for, and
§7 already flags three public surfaces disagreeing about those numbers. Renamed from `v1` to
`v0-endless` on 2026-09-22 so the version token says so. `v1` is the same argument with the
locked line in its place.

## Two ads, one creative

This campaign goes out as **two ads in the same ad set**, same card, different copy. The
variable is **which pillar sells the grid**: A sells *volume* — one in, a profile's worth out
— and B sells *ease* — nobody was hired and no day was booked. Both are true of the same
photographs; the question is which reason makes a man tap.

They map to §9's weighted pillars, which is why this is the pair worth running: A is pillar 1
(Transformation, 40 %) and B is pillar 3 (Savings, 15 %). If B wins on a card like this, the
weighting is wrong and that finding is worth more than this campaign.

One idea, carried through the primary text and the headline together. The description and the
call to action are held constant — a copy test that also moves the button is two tests.

## Primary text — A · volume

> One selfie goes in. A set of photos for a dating profile comes back — different places,
> different light. Same face, same build. No photographer, no shoot day. WinkyPie starts from
> a pose, coaches the selfie, then renders it. Looks pro. Still you.

Headline: **One selfie in. A profile's worth out.** ·
Description: **Authentic pro photos. More matches.**

**Held constant with campaign 7.** This is that campaign's copy verbatim, which is what makes
the wall-against-still comparison readable if campaign 7 is ever produced. Do not improve it.

## Primary text — B · ease

> No photographer. No shoot day. One selfie goes into WinkyPie and a set of photos for a
> dating profile comes back — different places, different light, same face and build. Pick a
> pose, it coaches the shot, then it renders you in it. Looks pro. Still you.

Headline: **No photographer. No shoot day.** ·
Description: **Authentic pro photos. More matches.**

Same sentences, reordered so the cost beat lands first instead of last. The headline drops the
volume claim entirely and states only what is not needed. **No dollar figure and no comparison
to what a photographer charges** — §7's rule holds off the App Store, so "no photographer" is
the whole of the savings argument we are allowed to make, and it turns out to be enough of one.

Second person is aimed at the photographs and the profile in both, never at the man's dating
results, so neither needs the owner's exception that campaign 9's headline needed.

## Guardrail check (§11)

Third person about the product, second person only about the photos ✓ · nothing asserted about
the viewer's appearance, results, status or finances ✓ · no before/after imagery and no
before/after wording — the inset is an input, not a worse version of him ✓ · AI described
honestly ✓ · no third-party mark, no app UI, no dating-app interface ✓ · no stat, no
percentage ✓ · no user count, no rating, no testimonial ✓ · **no claim beyond the app's own
limits — the reason `v0-endless` is retired** ✓ · no dollar figure, no trial line ✓ · no pose
count ✓ · male subject, and a generated one ✓ · one gradient ✓ · **no before/after imagery, so §11.2 does not attach.**

## Production flags

**None.** Both renders exist, the subject is generated and there is nothing left to shoot. The
two open items are decisions, not production.

## Ratio and placements — decided 2026-09-22

**4:5 only, all placements on, and the crop is accepted.**

Meta does not reject a mismatched ratio. It does one of two things in Stories and Reels, and
**the advertiser does not get to choose which**: *Smart Zoom* crops the left and right edges
to fill the screen, or *letterboxing* keeps the whole frame and adds bars. Either can happen
on the same ad.

**This layout survives both, which is why the decision is cheap here.** Going from 4:5 to 9:16
by Smart Zoom trims roughly 15 % off each side — it shaves the outer edges of the two outer
photographs, it does not remove them. Everything the card argues with is centre-weighted: the
selfie inset, both hook lozenges and the wordmark all sit on the middle axis and come through
untouched. Letterboxing costs size, not content.

A purpose-built 9:16 would still look better, and for a square grid that is a re-layout rather
than a crop: the five cells restacked vertically, the lozenges repositioned inside the safe
zone (top ~14 %, bottom ~20 %, sides ~6 %, where the platform UI sits). Worth doing if this
creative earns a second round — and it goes in through **per-placement asset customisation**,
not as a second ad, so the copy and the learning stay on one creative.

**The card carrying this decision differently is [[WP_P2_STATIC_checkcard]]**: two device
mockups side by side, with the argument in the outer thirds. That one would genuinely lose
content to a Smart Zoom, and the same decision should not be copied to it without looking.

## Not on this card

| Tempting | Why it stays off |
|---|---|
| "Endless", "unlimited", any count of photos | §7 caps. The retired scenario is what that looks like |
| The App Store badge | The link card carries the store; on frame it repeats the button and costs a cell |
| A sixth result in place of the inset | The inset *is* the argument — five results and no input is a gallery |
| A before frame | Campaign 10 owns the two-photograph layout, and it carries the rejection risk that comes with it. This card's whole advantage is that it has no "before" to be misread |

## Do this, in order

1. Renumber the renders — `v0-endless` for the "Endless" card, `v1` for the shippable one.
   Done 2026-09-22.
2. Decide the two open items above, and record them as `waived:` or `not_applicable:` in the
   frontmatter rather than as prose.
3. Build **both ads** in the same ad set — same card, A and B copy above, identical CTA and
   description. A's wording is campaign 7's and changing it breaks the other comparison; if
   only one slot is available, run A.
4. Set the call to action to **Install now** and the destination to the App Store URL in
   PRODUCT.md §2.
5. Leave the placements open. Meta will Smart Zoom or letterbox it in Stories and Reels and
   the card is built to survive both — see *Ratio and placements*.
6. Write the hypothesis before spend starts ([[08 Launch The Ad]]).
7. If it is rejected, the first suspect is **not** the missing strip — it is the grid reading
   as a set of results with no stated mechanism. The fix is the inset getting larger, not a
   footer getting added.

## Set-size note

Campaign 11. It does not compete with campaign 7 for an ad set — same copy, different carrier,
so running them together answers the duration question and nothing else. Say so in the
hypothesis if they run at the same time, or the read is neither.
