---
tags: [brief, strategy]
campaign: WP_P2_PORTFOLIO_oneselfie
persona: P2 Grinder
format: PORTFOLIO — results full-frame, narrator as a corner inset
variable: "proof density — the finished photos are the ad"
order: 7
updated: 2026-09-08
---
# Brief — WP_P2_PORTFOLIO_oneselfie

**Single variable tested:** whether a wall of finished results outsells an explanation. Every
other creative in the round-one set narrates a mechanism and reveals one photo at the end;
this one shows thirteen photos and never opens the app. Hook, closer, brand line and end card
are the set's locked ones, so the read is the format.

**Evidence:** [[Reface Male Portfolio Cut 2026-09-08]] — the male cut of a creative the same
advertiser posted twice on 2026-08-28, twelve seconds apart, once with a woman and once with
a man. 32 s, 13 finished portraits of one man, a narrator in a corner box, no UI, no
before/after, and a persistent AI-generated-content line on every frame. The female cut of the
same shape is at 121k views ([[Reface Studio Portrait Reel 2026-09-08]]). It is the only
format in the swipe file whose assets we already own: the results *are* WinkyPie's output.
Persona is P2 — the grinder has optimised everything else and wants to see the goods, and the
split moves to 3×P2 / 2×P1 / 2×P3 (step doc §2 allows the adjustment once there is a reason).

## Hook (plate + spoken, 0.0–1.5 s)

> One selfie in. A profile's worth out.

Seven words, legible over the first portrait with the sound off. Spoken in full: *"One selfie
in. A profile's worth of photos out."* No number — the count of results is backend-managed
and changes without a release (guardrail 7), and the wall shows the volume without anyone
stating it. "Profile" carries the dating context every winner in the niche puts in its first
line ([[Hooks And Angles]], 2026-09-06 revision). Nothing is claimed about the viewer.

## Beat sheet (27 s: a 25 s master + a 2 s end card, 9:16)

The composition is the variable. The narrator sits in a rounded inset, bottom-left, ~25 % of
frame height, from frame one. Everything behind him is a finished result, replaced every
~1.8 s. He never holds up a phone, and the app is never on screen.

| Time | Full frame | Inset / voice | Overlay |
|---|---|---|---|
| 0.0 | Result 1 — studio portrait, high contrast | Narrator, talking on the first frame | Hook plate; §11.2 line starts and never leaves |
| 1.5–7.0 | Results 2–4 | "…A profile's worth of photos out. Same face. Same build." | word subtitles |
| 7.0–8.5 | **The source selfie**, full frame — plain room, ordinary light, no phone in shot | one beat of silence | "this one", small |
| 8.5–13.0 | Results 5–7 — street, café, studio | "Street. Café. Studio. Night out." — one result per beat | word subtitles |
| 13.0–15.0 | Result 8 — night out | "Nobody booked a photographer. Nobody stood in a studio." | |
| 15.0–19.0 | Results 9–11 | "One selfie. A pose to mirror. That's the whole thing." | |
| 19.0–23.0 | Results 12–13, the last held ≥2.5 s | "Authentic pro photos. More matches." | |
| 23.0–25.0 | **The inset scales up to full frame** — the wall gives way to the person | Narrator to camera, phone held low, screen away | "Be the right swipe." |
| 25.0–27.0 | End card | — | "Authentic pro photos. More matches." · "Be the right swipe." + App Store badge |

The scale-up at 23.0 is ours, not Reface's, and it is the point of the format: twenty-three
seconds of photographs, then the man they belong to.

## On-screen copy

- Hook plate: **One selfie in. A profile's worth out.**
- Persistent, small, bottom: the §11.2 line — *"Demo. Your photos use your actual face and
  body. Results vary based on selfie quality, lighting, and pose."*
- Persistent on the inset, Lane B only: *"AI-generated presenter. Not a real customer."*
- End card: **Authentic pro photos. More matches.** · **Be the right swipe.** · App Store badge

## Primary text

> One selfie goes in. Street, café, studio, night out — a set of photos for a dating profile
> comes back. Same face, same build. No photographer, no shoot day. WinkyPie starts from a
> pose, coaches the selfie, then renders it. Looks pro. Still you.

Headline: **One selfie in. A profile's worth out.** · Description: **Authentic pro photos.
More matches.**

## To produce

**The assets are thirteen real WinkyPie results of one man, from one session, plus his source
selfie.** That is the whole shoot. No location, no creator, no b-roll.

Two lanes for the narrator, and the script is identical in both because it is third person
throughout — nobody says "I", "my" or "me" as a user:

- **Lane B (default, now):** the host clip from [[Host Scripts]] S7, generated on the existing
  seed, then scaled to a corner inset in post. Reuses the host already paid for; the results
  behind him are stills we composite locally. Carries the presenter disclosure.
- **Lane A (better, when it is free):** the creator booked for [[WP_P1_UGC_coached]] and
  [[WP_P3_UGC_triedthemall]] reads the same lines in the same session — one extra setup, no
  extra travel, and the presenter disclosure disappears because he is real. Add it to
  [[Shoot Order]] rather than ordering it on its own.

## Guardrail check (§11)

Men only, one man, no female frame anywhere ✓ · every frame is a generated result, so §11.2
is persistent rather than per-card ✓ · no number spoken or written, no result count, no pose
count ✓ · no before/after — the source selfie appears once, alone, never side by side with a
result ✓ · nothing about the viewer's dating status, no second-person appearance claim ✓ ·
no price, no trial line ✓ · no competitor named or shown ✓ · "same face, same build", never
"better" ✓ · no bare-torso or physique frames — this is about photographs, not bodies ✓.

## Production flags (resolve before anything is composited)

1. **The blocking input is a release, not a render.** Thirteen results of one man in a paid ad
   are his likeness. [[Host Scripts]] card rule 1 already flags that the man in
   `app/public/assets/winkypie/mobile-app/app-flow/` (2026-09-01) has not signed one. Use
   yourself, or a signed release — name, image, likeness; paid social; perpetual; AI-labelled
   output. Nothing renders until that exists.
2. **One man across all thirteen frames.** Mixing subjects breaks "same face, same build" and
   reads as a stock gallery — the single fastest way to lose this format.
3. **The source selfie must not be a visible self-photograph.** Meta's dating policy bans a
   person visibly photographing themselves; a mirror shot with the phone in frame is exactly
   that. Shoot the input at the same body angle on a tripod or front camera and check it
   passes. If only the mirror shot passes, cut the 7.0 s beat rather than ship the phone.
4. **Wardrobe and location range is the proof.** Thirteen near-identical studio frames prove
   nothing. Spread them across the catalog's registers the way the swipe does — and pick the
   poses from the live catalog on the day, never from a remembered list.
5. **Two persistent disclosures is the format's real cost.** The §11.2 line plus the presenter
   line both ride the whole runtime. Lay them out against Meta's safe-zone template on the
   first composite; if they crowd the frame, that is the argument for Lane A, which drops one.

## Do this, in order

1. Read [[Reface Male Portfolio Cut 2026-09-08]] — the beat rhythm, the inset size and the
   persistent disclosure are all measured there. Take the composition, not the copy.
2. Get the release signed. Then one WinkyPie session, one man: the source selfie plus results
   across street, café, studio and night-out registers. Keep every original.
3. Pick thirteen. Reject any two that read as the same photograph, and any that show torso
   rather than face. Sequence them so no two neighbours share a background.
4. Narrator: Lane B now — run [[Host Scripts]] S7 on the existing host seed, test at 480p,
   final only on the owner's go. Or hold it for the Billo session and add it to [[Shoot Order]].
5. Composite locally: results full-frame at ~1.8 s each, host scaled into the bottom-left
   inset, the scale-up at 23.0 s, word subtitles from the real Whisper timings, the §11.2 line
   from frame one. Same ffmpeg path as [[Host Run 2026-09-07]].
6. QA against the beat sheet and the guardrail check: hook legible sound-off inside 1.5 s, no
   "I / my / me", no number, no UI, no before/after pairing, disclosures inside the safe zone.
7. Export 9:16, then 4:5 and 1:1 — the inset moves to the bottom-left of the new crop, it does
   not get cropped off. Name `WP_P2_PORTFOLIO_oneselfie_<ratio>_v1` per [[Creative Naming]].
8. Register in the app's asset browser; hand to [[08 Launch The Ad]] with the hypothesis line
   written before spend. The ad set is now eight creatives against Meta's six — decide here
   which two wait for wave two.
