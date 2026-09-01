---
tags: [step, setup]
status: todo
phase: setup
owner:
updated: 2026-09-02
---
# 06 · Meta Ads Configuration

Checklist: [[06 TODO]] · Drawing: [[Process.excalidraw|Process]]

## Goal
An ad account that can measure what it spends: persona defined, audiences built, events
firing, attribution configured — verified end to end before a single dollar moves.

Includes the **define the persona** step, because the persona is what the audience
configuration is built from. They are one decision, not two.

## Process
1. **Persona first, audience second.** Targeting settings are the *implementation* of a
   persona. Writing them in the other order gets you an audience nobody wrote a hook for.
   Starting point from the existing strategy work: men 22–38, iOS, active on
   Hinge / Tinder / Bumble, English-speaking tier-1 markets.
2. **Name the trigger, not the pain.** "Has bad photos" is a condition; "made a new profile
   last week and got no matches" is a trigger. Ads convert on triggers.
3. **On iOS, tracking is the hard part.** SKAdNetwork limits what comes back and how fast.
   Decide the conversion-value mapping deliberately and write it down — you cannot
   retroactively reinterpret values you never defined.
4. **Set event priority to match the money.** Purchase above trial above install. Only one
   event per user is reported, so the priority order decides what you can optimise for.
5. **Broad beats clever, usually.** With a small budget, narrow interest stacking mostly
   raises costs and starves the learning phase. Test broad as the control; make interest
   targeting earn its place.
6. **Verify before you launch, not after.** Fire a real test event and watch it arrive. A
   tracking bug found on day four costs the entire test budget.
7. **Record every setting in the doc.** Six weeks from now "why is this campaign
   underperforming" starts with "what was it configured to do", and the UI will not tell
   you what it used to be.
8. **Connect the ad account to Claude via Meta's official MCP** —
   `https://mcp.facebook.com/ads`. Official server, auth through Business Suite (no
   developer tokens to store), full Marketing API coverage — so configuration, checks and
   later KPI pulls (step 09) run from the terminal and get recorded in this doc as they
   happen. Community alternatives exist (pipeboard, markifact) but the official one wins on
   auth and account-safety. Per the Notes rule: no tokens or account IDs in the vault.

## Done when
- `Persona.md` holds the primary persona, the trigger, the objection and the answer.
- Every one of the five campaigns is mapped to a persona.
- A test event has been observed arriving in Events Manager.
- Attribution window, event priority order and conversion-value mapping are all written down.
- The campaign shell exists, named per convention, paused, ready to launch.

## Output
- `Persona.md`
- `Meta Ads Configuration.md` — every setting, with the reason for it
- `Audiences.md`

## Notes
Do not put ad account IDs, pixel IDs or access tokens in this vault. Reference them by name
("the main WinkyPie ad account") and keep the values in the password manager.
