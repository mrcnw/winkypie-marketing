---
tags: [brief, strategy]
campaign: WP_P2_STATIC_firstchance
persona: P2 Grinder
format: static (two frames, stacked)
variable: the first-photo angle carried photographically instead of by type
order: 10
modelled_on: [photoshoot-she-swiped-left]
cta: Install now
approved: [hook, primary-text, headline, description, cta, destination, render, guardrails, hypothesis]
not_applicable: [ratios, flags]
updated: 2026-09-22
---
# Brief — WP_P2_STATIC_firstchance

**Single variable tested:** whether the first-photo angle lands **as two photographs** rather
than as a type card. Campaign 1 ([[WP_P2_STATIC_100ms]]) argues the decision moment in words
on a dark ground and carries "First photo. First chance." as its second beat; this creative
promotes that line to the hook and puts the argument in the frames — a real first photo above,
the render below, nothing between them but the line. **The variable is the carrier, not the
angle** — the same deliberate exception campaigns 8 and 9 make.

**Evidence:** the model is Photoshoot Dating's `967085836345548` — saved as
`photoshoot-she-swiped-left`, named by the owner on 2026-09-21 as the ad this creative was
built from. It dramatizes the same moment we do: *"girls decide in half a second and it's
your photos making the call, not your face"*, then *"that part's fixable"*. Our whole first-
photo family sits on that mechanism, and our locked line **"She decided in 100 ms."** is the
compressed version of it.

**Two things the library says today that change how much it is worth.** It ran
**2026-07-21 → 2026-09-17 and has stopped** — 58 days, not the living veteran the 2026-09-02
read recorded. A retired model is still evidence that an angle *worked*; it is not evidence
that it is working now, and the hypothesis should not pretend otherwise.

And **the form is exactly what we may not copy.** Its primary text opens *"she swiped left
before she even got to your bio"* and its headline is *"fix your photos now"* — both second
person about the viewer's own dating results, which is the PRODUCT.md §11 personal-attributes
line and the most common rejection cause in this category. Whether that is what ended its run
is unknowable from outside, but it is the obvious candidate. **We take the mechanism and
leave the form**: our copy puts the same idea on the photograph — *"The first photo decides
whether the rest of the profile gets seen"* — and never on the man.

## Hook (verbatim, must be legible in 1.5 s, sound off)

> First photo. **First chance.**

Locked line (PRODUCT.md §1), the problem line from onboarding screen 2 — so the ad and the app
say one thing. It sits between the two frames, not above them, which is what makes the layout
read top-down as a sentence: *this photo* → *first chance* → *this photo*.

**Naming note.** The render shipped as `WP_STATIC_firstchance`, without a persona token,
before [[Creative Naming]] was applied to it. Renamed to `WP_P2_STATIC_firstchance` on
2026-09-21. It is campaign 10, and it needs its own number precisely because it shares a line
with campaign 1 — two creatives testing the same words under one name make the read useless.

## The two frames

| | Top | Bottom |
|---|---|---|
| Frame | A first photo as they actually are: black and white, cropped tight, shot at an event, a bottle in hand, other people's heads in the frame | The render — same man, Paris café, seated, good light, one subject |
| Label | none | none |

**No labels at all, and that is the design.** Campaign 9's brief forbids the words BEFORE and
AFTER because they turn a two-frame layout into an appearance claim; this creative goes
further and labels nothing. The hook between the frames does the work the labels would have
done, and it names the *photo*, never the man.

**The same man in both frames** — confirmed by the owner 2026-09-21. PRODUCT.md §11.5 is
satisfied: nothing here implies two people.

**Both frames are generated.** The subject is synthetic and is not one of the cast in
`app/content/actors.json` — that cast is presenters, this is a photographic subject, so no
AI-presenter label applies. Two consequences: there is no likeness release to chase, for him
or for the bystanders in the top frame, and no frame on this card is a real customer result.

## Primary text (Meta placement)

> The first photo decides whether the rest of the profile gets seen. WinkyPie turns one selfie
> into that photo — you pick the pose, it renders your face and your build into it. No
> photographer, no photoshoot. Authentic pro photos. More matches.

Headline: **The photo your profile leads with.** ·
Description: **One selfie. No photographer.**

The mechanism lands inside the first ~125 characters, before Meta's *See more* cut. Second
person is aimed at the **photo** — "your face", "your build", "the profile" — never at his
dating results, which is the §11 line and the reason campaign 9's hook needed an owner's
decision and this one does not. The free pre-flight check is deliberately left out: that is
campaigns 2 and 9's variable, and naming it here would test two things at once.

Closing beat is the locked primary line (§1). Note the **frame** says "Pro photos. More
matches." — see the waiver below.

## Guardrail check (§11)

Third person about the product, second person only about the photo ✓ · nothing asserted about
the viewer's appearance, results, status or finances ✓ · same man in both frames, owner-
confirmed ✓ · no BEFORE / AFTER wording, no labels at all ✓ · AI described honestly ✓ · no
third-party mark and no dating-app interface ✓ · no stat, no percentage ✓ · no user count, no
rating, no testimonial ✓ · no dollar figure, no trial line ✓ · no pose count ✓ · male subject,
and a synthetic one ✓ · one gradient ✓ · **§11.2 disclosure — not on frame, decided below.**

## Decisions carried on purpose

Two things on this creative are known and are running anyway. Both are the owner's call,
recorded here so nobody re-discovers them as bugs.

| What | Why it is a risk | The decision |
|---|---|---|
| **No §11.2 disclosure strip** | [[Before After Card Bullets]] calls the line mandatory from the moment a rendered photo is on the card | **Waived 2026-09-21, and the research says the cost is near zero.** The line's second half ("Results vary based on…") is the disclaimer shape the FTC ruled insufficient in 2009, and Meta prohibits before/after imagery outright rather than permitting it with a footer. Its first half ("your photos use your actual face and body") is not a disclaimer at all but the mechanism claim — and the primary text already carries it: *"it renders your face and your build into it"*. What the strip would have protected is already in the ad. **The preflight stopped tracking this on 2026-09-22** — it is a line of the §11 read now, and this table is where the decision lives |
| **"Pro photos. More matches." on frame** | The locked line gained *Authentic* on 2026-09-07 (§1), and that word answers the persona's first buying blocker — "thinks AI photos look fake" (§3). The frame predates it | **Leave as is, 2026-09-21.** The primary text carries the current wording, so the ad says *Authentic* even where the frame does not |

Neither is `N/A` and neither is `approved`. They are `waived:` in the frontmatter, which is
the one state that clears a creative for upload without ever claiming it passed.

## Production flags

**None — nothing is left to shoot.** Both frames exist, both are generated, and the two things
that would normally sit here are decisions rather than flags: they are in the table above.
The one open item is not production, it is [[08 Launch The Ad]]'s hypothesis.

## Ratios

**9:16 only, by decision (2026-09-21).** [[Creative Naming]] asks every campaign for all three,
and this one is the exception: the layout is a vertical stack — photo, line, photo, mark — so
a 4:5 is a re-layout, not a crop, and there is no 4:5 to re-lay out yet.

**The consequence belongs in [[06 Meta Ads Configuration]]: turn the feed off for this ad and
leave Reels and Stories on.** The feed tops out at 4:5, so a 9:16 served there is cropped by
Meta, and what the crop eats is the top frame and the mark — the two things the ad is made of.

## Not on this card

| Tempting | Why it stays off |
|---|---|
| The App Store badge | Guardrail 6's "one badge above the fold" is web language; a Meta ad has no fold, and the link card already carries the store and the button. Owner's call 2026-09-21: it stays off |
| The free-check line | Campaigns 2 and 9's variable. One test per creative |
| "Maximize your dating." | §9 allows it off Meta only — on Meta it is a statement about the viewer's romantic life |
| Any percentage | Only the five §8 stats, and only with the label on frame |

## Do this, in order

1. Rename the render to `WP_P2_STATIC_firstchance_9x16_v1` per [[Creative Naming]] — done
   2026-09-21.
2. Paste the primary text, headline and description above into the ad, unchanged. The closing
   beat says *Authentic*; the frame does not, and that is the recorded waiver.
3. Set the call to action to **Install now** and the destination to the App Store URL in
   PRODUCT.md §2.
4. In the ad set, **turn the feed off** — Reels and Stories only, until a 4:5 exists.
5. Write the hypothesis before spend starts ([[08 Launch The Ad]]), in the step's format.
6. **On a rejection, do not reach for the §11.2 strip** — researched 2026-09-21, it buys
   nothing. Meta treats before/after imagery as a prohibited misleading claim, not as
   something a footer makes acceptable, and the FTC removed the "results not typical" safe
   harbour in 2009: a "results vary" line is held insufficient to cure a misleading
   impression. If this is rejected, the cause is the **layout** — two stacked photos, the
   weak one above the strong one, read as a transformation whatever the words say. Re-cut it
   so the frames stop being a pair: one result full-frame with the selfie as an inset, the
   way campaign 7 does it.

## Set-size note

Campaign 10, and the fourth creative to exist as a file rather than as a plan. It does not
compete with campaign 1 for an ad set: same line, different carrier, so running both at once
answers the carrier question and nothing else. Say so in the hypothesis if they run together.
