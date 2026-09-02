---
tags: [todo, setup]
step: 06
updated: 2026-09-02
---
# 06 · TODO — Meta Ads Configuration

Documentation: [[06 Meta Ads Configuration]]

## Persona
- [ ] Write the primary persona: age, geography, platform, what he is doing on a Tuesday
      night, what he has already tried.
- [ ] Write the trigger — the moment he becomes a buyer, not just a sufferer.
- [ ] Write the objection that stops him, and the line that answers it.
- [ ] Map each of the five campaigns to the persona it targets.
- [ ] Decide which personas we are explicitly *not* targeting in round one.

## Account
- [ ] Connect Claude to the ad account via Meta's official MCP —
      `https://mcp.facebook.com/ads` (auth through Business Suite; no tokens in the vault).
- [ ] Confirm the iOS SDK / SKAdNetwork setup on the app side.
- [ ] Configure Aggregated Event Measurement and set the event priority order.
- [ ] Define the conversion events: install, trial start, purchase.
- [ ] Set the attribution window and record which one you chose.
- [ ] Build the audiences: broad, plus any interest sets worth testing.
- [ ] Set device targeting to iOS only on every ad set — devices mobile-only, mobile OS
      iOS, minimum version from the app's deployment target. Android is not sold
      (PRODUCT.md §2).
- [ ] Set up the campaign structure and naming to match [[03 Choose Videos And Five Campaigns]].
- [ ] Fire a test event and confirm it lands in Events Manager.
- [ ] Confirm creative specs pass Meta's review rules before upload.
