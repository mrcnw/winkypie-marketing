---
tags: [produce, guardrails]
updated: 2026-09-09
---
# Production Guardrails — the one-pager that goes into every order and every AI run

**Two risks found on 2026-09-02 change how the UGC piece is produced, on both lanes: Meta's
dating policy may treat us as "dating facilitation" and bans selfie-taking on frame, and the
FTC requires a creator who speaks about using the product to have used it.** This note is the
handling, lane by lane, written so it can be pasted into `Shoot Order.md` and into the
Higgsfield brief without re-deriving it. PRODUCT.md §11 stays the source for the standing
claim rules; nothing here repeats them. Research and sources: [[Production Platforms]],
[[AI Production Platforms]].

## The two risks, in one table

| Risk | Where it comes from | What it forbids for us | Status |
|---|---|---|---|
| **Meta dating policy** | "Dating facilitation (for example, dating profile management)" is a dating ad: prior written permission, 18+, and dating ads may not show "selfies, images where a person is visibly photographing themselves" or "fictitious individuals" ([Meta help 765622867361201](https://www.facebook.com/business/help/765622867361201)) | If Meta classifies WinkyPie as dating: the selfie beat on frame, any generated presenter ("fictitious individual"), and running without permission | **Unresolved.** Queued in [[06 Meta Ads Configuration]]. Until answered, produce so that both outcomes are covered (below) |
| **FTC bona fide use** | Endorsement Guides: an endorser represented as using the product "must have been a bona fide user" (16 CFR 255.1(c)); people presented as actual consumers who are not need a clear disclosure (255.2(c)); fabricated testimonials by people who do not exist are banned outright (16 CFR 465) | A creator saying "all my photos were group shots… tried the AI photo thing" without having used the app; any generated presenter telling that story at all | **Handled by production rules below** |

## Lane A — human creator (Billo, or a direct hire)

Paste these into the order. Every line is a deliverable or a warranty, not advice.

1. **He uses the app before he films.** Deliverable zero: a screenshot of his own result
   screen (his selfie, his generated photo) taken on his phone, sent before the shoot date.
   The contract carries the warranty: "Creator has installed and used WinkyPie on his own
   selfie before filming and the statements in the script reflect his own use." No
   screenshot, no shoot. We supply the trial or cover the subscription — never "buy it, we
   reimburse".
2. **The script is his story about his photos, disclosed as an ad.** The hook and the twist
   beat are verbatim; the middle beats are his words. He talks about *his photos and the app*,
   never his dating life, never results (no matches, dates, numbers). The order says
   "scripted spokesperson video, disclosed as an ad" — never "record a review".
3. **Shoot the selfie beat twice.** Variant A as the brief has it (he mirrors the pose and
   takes the selfie on camera). Variant B: phone in hand, over-the-shoulder on the coaching
   card and the photo-check pass, **no visible act of photographing himself** — the selfie
   moment is implied by the cut, not shown. Both from the same shoot, both in the raw footage.
   If Meta says "dating", variant B is the master; if not, A. Cost: five minutes on set.
4. **On-frame text is ours, not his.** He delivers clean footage with gaps; we add the
   overlays, the §11.2 disclosure at the reveal and the App Store end card. He is asked not
   to burn in captions.
5. **Rights in the order, before payment:** paid social incl. Meta, 12 months or perpetual;
   editing and re-cuts; name, image, likeness **and voice**; raw footage as a deliverable;
   **AI modification of his likeness either bought and priced now or explicitly excluded** —
   a standard release does not obviously cover `ad-multiplier`. Clause table in
   [[Production Platforms]].
6. **What he must not do:** claim outcomes; mention other apps by name; show anyone but
   himself; improvise "proof" (numbers, friends' stories); use the word "review" on screen.
7. **The trial is never mentioned** — not spoken, not on the end card (owner\'s decision,
   2026-09-07). The closing line is "Be the right swipe."; the App Store listing carries the
   trial. Nothing about money or days on camera.

## Lane B — Higgsfield (AI host clips for the hook test)

Paste these into the run brief. The workflow enforces some of them; we enforce the rest.

1. **The presenter is a host, never a user.** No first-person past tense, no experience, no
   reaction to "his" result. Allowed: present-tense narration of what is on screen ("it checks
   the photo before it charges") and the third-person product lines. The confession hook is
   **not** generated on this lane — the workflow's truth gate refuses it and so do we.
2. **`approved_claims` is the whole allowlist.** Pass only lines that already exist in
   PRODUCT.md: the five locked lines (§1), the three §5 framings, and the campaign's own
   primary text. The workflow preserves them verbatim and may not strengthen or combine
   them. Nothing about matches, dates, speed or pose counts.
3. **The screen is always ours.** Use `ugc-website-video` with 6–10 real captures: pose card,
   coaching card, photo-check *pass* state, generation copy, result on a male demo profile.
   Never a generated UI, never an animated screenshot. The result image is an AI demo asset —
   the §11.2 line goes on the card that shows it.
4. **No selfie on frame.** The workflow already keeps the product out of the body of the
   clip and shows the phone only in the closer, turned away. Do not prompt a selfie-taking
   beat. This keeps the AI lane clean under the dating policy's selfie rule whatever Meta
   decides — but a generated presenter is still a "fictitious individual" under that policy,
   so **if Meta classifies us as dating, the AI lane cannot run as an ad at all** and becomes
   an internal animatic only.
5. **Disclosure from the first frame:** "AI-generated presenter. Not a real customer." as a
   persistent caption, not an end card — same-modality (visible) and at first exposure (EU
   Art. 50). The workflow's caption layers cover the hook plate and subtitles; the persistent
   line is burned by us in post (`video-editing` workflow or ffmpeg). **Recipe, verified on the
   first run 2026-09-07** (frame 1080×1920, full parameters and the script in
   [[Host Run 2026-09-07]]): the line sits in a 75 % `#0E0E0E` pill at y = 290–370 (just under
   Meta's top 14 %), Helvetica 30, every presenter frame; the workflow's hook plate is forced to
   ONE line at size 56 and top margin 0.09 H so it ends above the pill — the default two-line
   plate covers the disclosure for the whole hook; cards contain-fit 0.78 W × 0.50 H centred at
   0.47 H; captions bottom-aligned with margin 0.22 H (Stories-safe; inside Meta's Reels 35 %
   band — check the Reels template before a paid run), **black text on a white box** (ASS
   BorderStyle 3, white outline/back colour, outline ≈ 8 as padding — owner's rule
   2026-09-08: every burned transcript sits at the bottom, black on white, legible on a phone). The §11.2 line is baked onto the result
   card at 42 px so it survives the scale-down.
6. **Keep the metadata.** Do not strip C2PA/IPTC marks from the export; Meta's automatic
   "AI info" label is neutral to delivery and removing marks is the one thing that turns a
   labelled ad into a deceptive one.
7. **Voice:** Seedance native speech only. No cloning of a real person's voice — no consent
   problem, no Art. 50 voice question.
8. **QA before anything leaves the sandbox:** the list in [[AI Production Platforms]] —
   script reads like speech, clean lips mid-word, ≤2 hands, no baked text, no generated
   screen, disclosure legible on a phone.
9. **No generation without the owner's explicit per-run command** (rule set 2026-09-07 after
   the first run went out on the strength of the plan alone). **Test runs on Seedance 2.0 Mini
   at 480p** (owner's rule 2026-09-08, 1 credit/s); the final on Seedance 2.5 at 1080p only
   once the owner has approved the test. Everything that costs
   nothing — prompts, cards, ffmpeg, the sandbox caption pass — may be prepared unasked.
10. **No trial line, spoken or on frame** (owner\'s decision, 2026-09-07) — the closer is "Be
    the right swipe." Same rule as Lane A item 7.
11. **Write to clips; the assembly is ours** (rule set 2026-09-09). No model on this platform
    renders past 15 s ([[AI Production Platforms]] item 6), so a script is a list of clips
    before it is anything else: each clip ≤15 s, boundaries on sentence ends, words sized to
    ≈2.4 words/s. The platform delivers **talking clips and nothing else** — the wall of
    results, the caption plates, the inset and its hide/show windows, the watermark, the end
    card and the mix are all ours, after the fact. Marketing Studio cannot do any of it
    ([[AI Production Platforms]] item 7); do not reach for it.
12. **Assemble in the Higgsfield sandbox, not on the Mac, whenever captions are involved.**
    The local Homebrew ffmpeg has no `drawtext`, `subtitles` or `ass` filter, so rule 5's ASS
    recipe cannot run there at all — it only actually works in the sandbox, which ships libass,
    libfreetype and the Montserrat/Metropolis caption fonts. Full recipe and the traps:
    [[Host Run 2026-09-08 S7]].

## What the creator brief inherits from this note

When `Shoot Order.md` is written, it copies Lane A verbatim into its guardrail section and
links here for the reasoning. When [[03 Choose Videos And Five Campaigns]] revises
`WP_P1_UGC_coached`, the brief gains: the bona-fide-use deliverable, the two-variant selfie
beat, and the rule that on-frame text is added by us. The brief's confession hook itself
stays — it is honest once he has used the app.

## Open

- Meta's classification (dating facilitation or not). Everything above is built to survive
  either answer; the answer decides which selfie variant is the master and whether Lane B may
  run as paid media.
- ~~The disclosure burn-in recipe for Lane B~~ — recorded above, 2026-09-07.
- Whether Billo's standard release is enough for `ad-multiplier` face replacement — assume no.
