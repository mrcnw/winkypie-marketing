---
tags: [setup, targeting]
updated: 2026-09-06
---
# Audiences — country, language, OS, age

**Round one targets the United States only, English, iOS 15.1+, with no age, gender or
interest settings — Advantage+ app campaigns do not offer them, and the two competitors
whose delivery we can actually see prove the creative selects the men on its own.**
Written 2026-09-06 from a full read of the Meta Ad Library for the two niche advertisers
with public reach data; the ad-by-ad tables are in [[ROAST]] and [[Charmd]]. Poland is not a
round-one market. The whole EU as one audience is a documented mistake, not an option.

## What the ad set can set — and what it cannot

| Setting | Round one | Why |
|---|---|---|
| Country | **United States** | The App Store listing is `/us/`, locale `en_US`, and the US is the only market with a known price (PRODUCT.md §2, §7, §13.7). ROAST, the category leader, bills in USD and shows only a trickle of reach outside the US — see below |
| Language | **English** | Every creative is English (PRODUCT.md §9) |
| OS / version | **iOS only, minimum 15.1** | PRODUCT.md §2; [[06 Meta Ads Configuration]] step 6 |
| Age, gender | **Not available** in Advantage+ app campaigns | AAC sets location, language and OS only ([[Budget And Thresholds]], objective table). The creative does the selecting — evidence below |
| Interests, lookalikes, exclusions | Not available in AAC; not missed | Same |
| Placements | Advantage+ placements (forced) | [[Budget And Thresholds]] |

Once the account exists, these are the ad-set values to record in `Meta Ads Configuration.md`
as set, with this file as the reason.

## Evidence — what the two visible competitors target, and who they reach

Meta publishes reach and audience breakdowns only for ads delivered in the EU (Digital
Services Act) and the UK; for the US it publishes nothing. So the numbers are the two
advertisers' *side* markets — but they are the only hard numbers in the niche, and they say
the same thing twice.

### ROAST (category leader, USD) — United States first; Ireland and England as a trickle

| What | Finding (Ad Library, read 2026-09-06) |
|---|---|
| Countries | USD account. Outside the US, **only Ireland** (EU) and **only England** (UK), on every ad read. No Germany, no Poland, no other EU country since the German photoshoot.dating test ended 2025-09-12 |
| Settings | 18–65+, all genders, on every ad read |
| Who it reached | Ireland, ad 1281683167151415, 23 days: 5,439 accounts — 93% men, 82% aged 18–34. Ireland, ad 1279259706887386, 10 days: 3,551 — 98% men, 94% aged 18–34 |
| Scale outside the US | The longest-running active ad (986693823897984, live since 2026-05-06) shows **782** UK accounts in four months; the newest video (1382118217386363, 2026-08-31) 63 in six days. ~960 ads and 13 months of continuous spend go almost entirely to the US |

Read: the advertiser that has run this funnel longest, with the most tests, puts its money
in the US and adds only two English-speaking, high-income markets for a trickle. That is the
pattern to copy.

### Charmd / "Confessions of a Dater" (payer "Lure App", CAD) — the whole EU as one audience

| What | Finding (Ad Library, read 2026-09-06) |
|---|---|
| Countries | **All 27 EU countries** (plus French Guiana and Åland) in one audience, English creative, 18–65+, all genders — on every one of the page's 17 ads |
| Who it reached | Ad 914569270944890 (2026-02-23 → today): **521,572** accounts, 99% men, ~91% aged 18–34 (18–24: 211,715 · 25–34: 268,746 · 35–44: 38,740) |
| Where the budget went | Germany 70,956 · France 53,490 · Italy 48,222 · Romania 31,268 · Netherlands 29,172 · Spain 28,281 · Belgium 27,023 · Sweden 25,405 · **Poland 24,596 (4.7%)**. Romania, Cyprus (8,669), Bulgaria (11,783) and Greece (18,146) over-index against population on every ad |
| What it bought | Seven months and ~800k EU reach across 17 ads, and the app has 35 App Store ratings ([[Charmd]]). Reach is not payers |

Read: one EU-wide audience lets Meta buy the cheapest impressions in the Union, so delivery
skews to the countries with the lowest CPMs and the lowest purchasing power for a
$19.99-a-month app. That is the pattern not to copy.

## Decisions

1. **United States only in round one.** One country keeps the CPI read clean — the number
   round one exists to measure ([[Budget And Thresholds]]) — and it is the only market where
   price, listing and persona are all confirmed.
2. **No age or gender settings, and no attempt to fake them with interests.** Both
   competitors run 18–65+, all genders, and land 93–99% of reach on men, 82–95% of it aged
   18–34. The hook does the targeting; the briefs already write for men and never about the
   viewer ([[03 Choose Videos And Five Campaigns]]). Consequence to plan for: broad delivery
   puts roughly 40% of reach on 18–24, the band least able to pay $19.99 a month. Cast and
   write for 28–35 (the P1 Restart persona) so the creative pulls the older half of the ICP.
3. **Round two option: Ireland + United Kingdom as a second campaign, not more countries in
   the first.** Roast's exact expansion pair — English-speaking, comparable purchasing power,
   and the only markets where Meta publishes *our own* reach and demographics, which makes
   the creative read verifiable from outside the account (and visible to competitors — a
   price worth paying). Only after round one has a US CPI to compare against.
4. **Poland: not targeted.** Nobody in the niche targets it; the only Polish reach in the
   data is Charmd's 4.7% by-product of EU-wide buying. Open it only with a Polish price point
   (PRODUCT.md §13.1), a Polish App Store locale and Polish creative — none of which exist.
5. **Never one EU-wide audience.** If EU markets are ever tested: one country per ad set,
   and only countries with a confirmed price point.

## Open
- PRODUCT.md §13.7 (geo targeting) stays open on the product side — price points outside
  the US. This file records the marketing decision, not the product fact.
- Meta's dating-policy classification ([[06 TODO]]) may add per-country restrictions on
  top of the above; resolve before launch.
