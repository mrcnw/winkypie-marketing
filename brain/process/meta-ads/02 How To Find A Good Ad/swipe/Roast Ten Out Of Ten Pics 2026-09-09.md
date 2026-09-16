---
tags: [research, swipe]
updated: 2026-09-09
---
# Roast AI — "10/10 pics every single guy needs", the checklist with a corner (2026-08-17)

A 39-second **listicle in a reaction frame**: a young man's selfie video pinned in the
bottom-left corner while the rest of the screen is a full-bleed photo of somebody else. Seven
list items, one photo each, roughly 3.5 s apart — then the App Store card, then the face swap,
then the payoff. It is the cheapest format in the swipe file to shoot and the most dangerous
one for us to copy, because its mechanism is **"swap your face onto a photo women already simp
over"** — the exact thing `PRODUCT.md` §11.5 forbids us from implying.

Same page as [[Roast AI Creative Teardown 2026-09-06]], same day as
[[Photoshoot Real Talk From A Girl 2026-09-09]] on the sister brand. Between them, ROAST is
running the two opposite ends of the format range on 17 Aug: 1:16 of one face, and 0:39 of
nothing but other people's photos.

Files: `~/Downloads/photoshoot-dating-ads-2026-09-09/` — `media/1579081293769974.mp4`,
`transcripts/`, `frames/`.

## Facts

| Field | Value |
|---|---|
| Link | [facebook.com/ads/library/?id=1579081293769974](https://www.facebook.com/ads/library/?id=1579081293769974) |
| Account | Roast AI — Ad Library page `574845319034849`, page profile `61571457640866`. See [[ROAST]] |
| Posted | Started 17 Aug 2026 → **23 days live** on 2026-09-09. Video asset is also 23 days old (`asset_age_days: 23`), so this creative is **new**, not a re-launch |
| Rank | **17th of 31** active ads on the page by total impressions — mid-pack, and the page's veterans go back to 6 May 2026 |
| Replication | **One ad, one copy.** No sibling variants share this primary text |
| Engagement | 348 likes (Ad Library counter) |
| File | 9:16, 576×1024 — **the low-resolution one**, H.264 30 fps, AAC, **0:39.4**, 3.3 MB |
| Destination | `ROASTDATING.COM` — a web funnel, with the description line "Takes 2 minutes." |
| Headline | "Fix your photos. Get more matches." |
| Disclosure | **None.** No AI-generated-content label anywhere, on a cut that ends with two generated portraits of the narrator |
| Composition | Reaction layout: narrator's selfie video pinned bottom-left, ~30 % of frame width, for the whole runtime. The other ~70 % is a full-bleed reference photo, replaced at each list item |

**Verdict on the winner signals first, because it is not one yet.** 23 days is inside the
"noise / still testing" band in [[Swipe Method]], there are no sibling variants, and it sits
17th of 31 on its own page. The format is worth studying; the ad is not yet proven. Re-check
it on the next weekly pass — if it is still up at 45+ days it has earned its budget.

## Structure

**Cut points measured with ffmpeg `scdet=threshold=10`, 2026-09-09.** Nine cuts, six of which
survive `threshold=25` — these are real hard cuts, unlike the overlay events in the sister
brand's cut. Every cut lands on a spoken list item. The corner inset never cuts: it is one
continuous take running underneath the whole thing.

| # | Od–do | Full frame (behind the inset) | Said over it |
|---|---|---|---|
| 1 | 0.00–4.60 | 2×2 collage of four lifestyle shots, white title card **"10/10 pics every single guy needs"** across the top | "10 out of 10 photos for your dating profile — guys who get no matches edition" |
| 2 | 4.60–8.43 | Beach, striped shirt open, walking toward camera | "a clear face shot, no sunglasses, no hat, no filters" |
| 3 | 8.43–12.30 | Sunset beach, white shirt, full body | "a full body shot so nobody feels lied to about what you look like" |
| 4 | 12.30–15.50 | Street, sunglasses, mid-walk past a diner sign | "a candid photo where you're looking away and laughing" |
| 5 | 15.50–19.47 | Terrace table, drink in hand, flowers in frame | "a photo of you in a nice fancy restaurant, across the table" |
| 6 | 19.47–22.43 | Fjord dock, cap, seated, mountains behind | "a travel shot that isn't just an airport ceiling" |
| 7 | 22.43–25.80 | Coast, navy jumper, seated alone, knees up | "a photo where a friend is clearly enjoying your company" |
| 8 | 25.80–30.87 | Paris at night, Eiffel Tower — plus an **App Store install card** pinned top: ROAST icon, "Roast: Dating Profile Review", publisher RemixMe, blue **Get** button, "In-App Purchases" | "if you own none of these photos, you want to use an app called Roast" |
| 9 | 30.87–36.40 | White-tee studio portrait — **the narrator's own face**, generated | "simply take a photo women already simp over and swap your face with theirs, and you'll get something like this" |
| 10 | 36.40–39.43 | Balcony, green cap, seated with a camera — narrator's face again | "in no time your dating profile will be cooking" |

**Item 7 does not match its picture.** The line promises "a friend clearly enjoying your
company"; the frame is one man sitting alone on a rock. Nobody caught it, and the ad still
runs. Useful calibration on how much production polish this format actually needs.

**No end card.** It ends on the last result photo at 39.4 s. As with the sister brand, the CTA
lives in the ad unit, not in the video — except here they smuggle a full App Store card into
the middle of the creative while the ad's own destination is a website.

## Mechanism (the three lines)

- **First 1.5 s:** a title card that promises a numbered list, over four photos that already
  look like the answer. The corner face makes it a person talking, not an ad reading a list.
  Works with sound off — the title card carries it alone.
- **Tension:** by item three you have mentally audited your camera roll and found it empty.
  The list is not advice, it is an inventory check designed to fail.
- **Asked to believe:** you can have all seven without taking any of them, because the app
  will put your face where those photos already are.

## Transcript

Voiceover across the whole 0:39. Captions are small white sans, no outline and no box, sitting
just above the inset — a much plainer treatment than the sister brand's heavy karaoke.

> 10 out of 10 photos for your dating profile — guys who get no matches edition. A clear face
> shot, with no sunglasses, no hat, no filters on. A full body shot, so nobody feels lied to
> about what you look like. A candid photo where you're looking away and laughing. A photo of
> you in a nice fancy restaurant, across the table. A travel shot that isn't just an airport
> ceiling. A photo where a friend is clearly enjoying your company. Now, if you own none of
> these photos, you want to use an app called Roast. Simply take a photo women already simp
> over and swap your face with theirs, and you'll get something like this. In no time your
> dating profile will be cooking.

## Mix

Measured with `ffmpeg -af ebur128` and `volumedetect`, 2026-09-09.

- **−14.2 LUFS integrated, LRA 4.7 LU** — the same delivery target as the sister brand's cut,
  from the same house.
- Speech sits around −18 dB mean; the one inter-item gap measures −27.6 dB mean, about 10 dB
  down. That is consistent with room tone, not a music bed — no bed I could isolate.
- **Readable silent.** Unlike the 1:16 cut, this one survives with sound off: the title card
  states the promise and the seven photos are self-explanatory. The face swap in the last nine
  seconds is the only beat that needs the words.

## Our version

The **format** is portable and cheap. The **mechanism** is not portable at all.

**What ports:**

1. **The inventory-check listicle.** "The photos every profile needs" is a genuinely good
   structure: it makes the viewer audit their camera roll, and the product is the answer to
   the gap they just found. It is Specific to our ICP, works silent, needs no claim and no
   number. Our pose catalog *is* the list.
2. **The corner-inset reaction layout.** One phone take in the corner, results full-bleed
   behind it. Between this and [[Reface Male Portfolio Cut 2026-09-08]] the inset-plus-results
   layout is now the third competitor cut we have measured using it, and we test none.
3. **~3.5 s per item.** Long enough to read a photo, short enough that seven fit in 25
   seconds. Use it as the cadence for a pose-catalog cut.
4. **The App Store card mid-creative.** They put a real install card *inside* the video while
   pointing the ad at a website. We are iOS-first with a real App Store listing (§11.6, one
   badge above the fold) — the card would be honest for us in a way it is not for them.

**What has to change before anything ships:**

- **"Swap your face with theirs" is the whole product claim and we cannot make it.** §11.5:
  never imply the output shows a different person. Our version is *your* face, *your* body, a
  reference **pose** — "reference pose → result", the framing §11 explicitly asks for. That is
  not a softening of their line, it is the opposite claim.
- **"A photo women already simp over."** Second-person implication about the viewer's romantic
  standing, and the personal-attributes rejection risk we do not eat (§11, guardrail 8).
- **The narrator reads well under our ICP.** He looks like a teenager; our audience is men
  22–40. Casting for a WinkyPie version of this has to sit inside the band.
- **"Guys who get no matches edition"** — addresses the viewer's dating outcome directly.
  Third-person product framing instead: "the photos a profile needs".
- **No disclosure on generated portraits.** We label. §11.5.
- **576×1024.** Whatever they are doing, do not copy the resolution.

**Recommended:** brief a **25–30 s pose-catalog listicle** — inset narrator, one pose per
~3.5 s, ending on a result and the App Store card. It is the cheapest untested format we have
and it lands the Variety pillar (§9, weight 12%) which nothing in the round-one set currently
carries. Sits naturally next to [[WP_P2_PORTFOLIO_oneselfie]] as its short, structured sibling.

## Scored for us — the [[02 How To Find A Good Ad]] rubric

| | Sp | Si | Ho | Sn | |
|---|---|---|---|---|---|
| **The inventory-check listicle** — "the photos every profile needs", one per ~3.5 s | ✓ | ✓ | ✓ | ✓ | **Take it.** Passes all four, needs no claim, and the pose catalog supplies the content free |
| **Corner-inset reaction layout**, results full-bleed behind | ✗ | ✓ | ✓ | ✓ | Format, not a hook. Third competitor cut using it and we still test none |
| App Store install card inside the creative | ✗ | ✓ | ✓ | ✓ | Honest for us, dishonest for them — their ad points at a website. Cheap to add |
| "A travel shot that isn't just an airport ceiling" | ✓ | ✗ | ✓ | ✓ | The one line worth stealing verbatim in spirit — specific, funny, no claim. Rewrite for [[Hooks And Angles]] |
| "Swap your face with theirs" | ✓ | ✓ | ✗ | ✓ | **Never** — §11.5. This is the mechanism, so the mechanism does not port |
| "A photo women already simp over" | ✓ | ✓ | ✗ | ✓ | Never — personal attributes, guardrail 8 |
| "Guys who get no matches edition" | ✓ | ✓ | ✗ | ✓ | Never as written. Third-person rewrite only |
