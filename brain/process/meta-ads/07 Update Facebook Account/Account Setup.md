---
tags: [setup]
updated: 2026-09-02
---
# Account Setup

Audit date: 2026-09-02. Read live through the official Meta MCP (`https://mcp.facebook.com/ads`,
connected per [[06 Meta Ads Configuration]] step 8), authenticated as the owner's personal
Facebook profile. Per that step's Notes rule, no account, page or business IDs are recorded
here — assets are referenced by name and the values live in the password manager.

## What exists

| Asset | State on 2026-09-02 |
|---|---|
| **WinkyPie** business portfolio | Exists. Owns the WinkyPie Page. **Owns no ad account.** |
| **WinkyPie** Page | Exists, owned by the WinkyPie portfolio, eligible for advertising. |
| **WinkyPie** ad account | **Does not exist.** |
| **WinkyPie** Instagram account | Not linked to any ad account reachable from this profile. |
| Personal ad account | Exists, active, PLN, no payment method, no linked Page, no linked Instagram, zero campaigns in its entire history. |
| KnivesWorx portfolio + ad account | Exist. Different product — not part of this channel. |

The one structural fact behind everything below: **the WinkyPie portfolio has a Page but no
ad account.** Ads for WinkyPie currently cannot be created anywhere, from any account.

## Pending — blocks the launch

In order. Each is a Business Settings operation on the WinkyPie portfolio and has to be done
by a human; none of them is reachable through the Meta MCP (see below).

1. **Create an ad account under the WinkyPie portfolio.** Currency and time zone are set once
   and cannot be changed afterwards.
2. **Attach the WinkyPie Page to that ad account** as a connected asset. Without it no ad
   creative can be built — the creative's story spec requires the Page.
3. **Link the WinkyPie Instagram account** to the portfolio and assign it to the ad account,
   or Instagram placements are unavailable.
4. **Add a payment method** and confirm the billing threshold and currency.
5. **Register the iOS app with Meta** and add it to the WinkyPie portfolio, then configure
   SKAdNetwork and the event priority order. Without this, App Promotion objectives are not
   available and only link-out traffic campaigns to the App Store can run — which is a
   materially worse optimisation target. The conversion-value mapping itself is step 06's
   deliverable, not this step's.
6. **Second admin with 2FA** on both the portfolio and the ad account.

Steps 1–4 also gate the remaining 07 checklist items: business verification, Account Quality
and the Page content audit can only be judged once the account they belong to exists.

## Division of labour with the MCP

Worth stating once, because it decides who does what for the rest of setup and launch.

**The MCP cannot** create ad accounts, attach Pages to ad accounts, link Instagram accounts,
add payment methods, or run business verification. It exposes no tool for any of them — these
are Business Settings operations and stay manual.

**The MCP can**, once the account above exists: read the full account tree and its metrics,
create campaigns, ad sets, ads and creatives, upload image and video assets, build custom
audiences, pull ad previews, and read Ad Library, benchmarks and diagnostics. That covers the
executable half of steps 06, 08 and 09.

## Not yet verified

Needs the account to exist, or a surface the MCP does not read:

- Business verification status for the WinkyPie portfolio.
- Account Quality — restrictions or past rejections.
- Page branding against the app (name, profile image, cover, bio, category, link) and whether
  the Page has enough real content to survive a click-through from an ad.
- 2FA state on the admin profiles.
- The App Store link and the app's Meta association.

Re-check this list at the start of every campaign round — access lists rot fast.
