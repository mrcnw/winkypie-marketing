---
tags: [todo, setup]
step: 07
updated: 2026-09-07
---
# 07 · TODO — Update Facebook Account

Documentation: [[07 Update Facebook Account]]

- [ ] Audit the current Page: name, profile image, cover, bio, category, link.
- [ ] Bring branding in line with the app — same gradient, same wordmark, same tone.
- [ ] Confirm Business Manager owns the Page, the ad account and the pixel/app.
- [ ] Complete business verification if it is not already done.
- [ ] Add a payment method and confirm the billing threshold and currency.
- [ ] Check Account Quality for existing restrictions or rejected ads.
- [ ] Set two-factor authentication and check admin access — remove anyone who left.
- [ ] Confirm the linked Instagram account for placements.
- [ ] Fix the `@winkypie.app` profile in the order in [[Instagram Profile]]: archive the
      female-model post, rename the name field, paste the new bio, App Store link first,
      three pinned tiles, four highlights. Audited 2026-09-07.
- [ ] Post enough real content that the Page does not look abandoned to a click-through.
- [ ] Confirm the App Store link and the app's Meta association.
- [ ] Verify the minimum iOS version yourself, in both places, before the first launch:
      the **App Store listing** (Information → Compatibility → "Requires iOS …") and the
      **build** in `dream-pie`. Both should read 15.1 (PRODUCT.md §2). The repo pins no
      `deploymentTarget`, so the floor is the Expo SDK default and an SDK bump can raise it
      silently — if it ever moves, the Meta targeting floor moves the same day ([[06 TODO]]).
