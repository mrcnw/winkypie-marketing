@AGENTS.md

# app/ — WinkyPie Asset Helper

Internal Next.js app for the WinkyPie marketing team. It is a **helper for browsing the
assets**, plus the reference information that has to travel with them. Product facts and the
non-negotiable brand guardrails are in `../PRODUCT.md` and the root `CLAUDE.md` — read those
before rendering anything. The process lives in `../brain/process/meta-ads/`; this app shows
and organises, it does not restate strategy and it does not track campaigns.

## Scope

Four tabs. One job each:

| Route | What it shows |
|---|---|
| `/` | The four tiles, with a count on each. |
| `/winkypie` | Four tabs. **Overview** — the one-liner, our own channels (and which ones do not exist yet), the locked lines, the shipped flow, the limits. **Assets** — brand marks, before/after pairs with the disclosure, mobile-app captures, the pose catalog snapshot, bad photos (the problem side); click a file for a full preview, its repo path and a download. **Branding** — colour swatches, live components, type, and one copyable markdown block of the whole brand. **Actors** — the synthetic UGC cast read from `app/content/actors.json` and the matching sub-folder of `assets/winkypie/actors/`: portrait, casting sample, the disclosure state, and the prompt each asset was made with behind a copy button; `/winkypie?tab=actors` opens here, and both `/actors` and the old `/meta-ads?tab=actors` redirect to it. |
| `/meta-ads/*` | **Every tab is a route.** Two sections, three tabs each, and a bare `/meta-ads` sends you to the first one. **Research** — `research/good-ads` (single ads worth keeping), `research/competitors` (a competitor's page link, which always shows what they run today), `research/teardowns` (the Ad analyzer). **Campaigns** — `campaigns/ads-to-copy` (the step-03 briefs read from the vault: hook, variable tested, primary text, and the Good Ads each one was modelled on, joined on the brief's `modelled_on` slugs; a card opens `campaigns/<campaign>`, the whole brief section by section with its `## Do this, in order` list as numbered steps), `campaigns/our-creations` (one card per creative, split into *Video* and *Static* by whether any of its files moves. A card is the ad as Meta will draw it — page name, Sponsored, primary text, media, the link card with headline, description and CTA button — and a brief that declares more than one `## Primary text…` section gets **tabs above the preview, one per ad**. The media opens on click: a clip plays full size with sound, a still opens big enough to read what is on it. Beside it sits a **preflight** in five states: `TO DO` (does not exist), `TO CHECK` (exists, unsigned), `APPROVED` (the brief's `approved:` names it), `WAIVED` (the brief's `waived:` — known, not done, running anyway), `N/A` (the brief's `not_applicable:`). A creative is *ready to upload* when nothing is left todo or to check. Files group by the [[Creative Naming]] convention `<campaign>_<ratio>_<version>`, so each version is a **scenario** and the card switches media between them inside the same copy; a `.txt` beside a file is its caption), and `campaigns/kpi` (the step-09 review tables rendered as a dashboard — Active / Previous ads, the funnel per ad, the decision each row earns under `KPI.md`, the projected margin at scale; labelled *KPI Example* while only scenario data exists). The old `?tab=` links all redirect, including `?tab=actors` → `/winkypie?tab=actors`. |
| `/competitors` | The step-01 research, rendered: the gap sentence, ranked competitor cards with the facts that matter, the longest-living ads, and the dismissed list. Each card opens the full note. |
| `/instagram` | Three tabs. **Profile** — the step-07 profile audit, rendered: where `@winkypie.app` stands today, what `@roast.dating` does that we take or leave, the fix list as numbered steps, the paste-ready name field and bio behind a copy button, and *Pinned tiles* — the three 4:5 tiles from `assets/winkypie/instagram/pinned/` with the caption beside each behind a copy button. Both profile links come out of the note's frontmatter. **Posts calendar** — the step-07 posting plan on a month grid: Monday-first, today marked, one chip per planned post coloured by pillar (dashed while it still `needs asset`), the month's rows as a table under it, then the note's other sections; a chip or a table row opens a dialog with the whole row, and a link into the post when one is written; `/instagram?tab=calendar` opens here. **Posts** — every written post, read from the step-07 `posts/` folder: the hook drawn at its own ratio because slide one is the grid tile, whether it is a carousel or a single tile, the slide table verbatim, and the caption and first comment behind copy buttons; `/instagram?tab=posts` opens here, and `#<post slug>` scrolls to one. |

Anything that is a *decision* — budgets, hypotheses, KPI thresholds, which creative is live —
belongs in `brain/process/meta-ads/`, not here. If a view would need a checkbox or a status,
it is process, and it is in the wrong repo half. The KPI tab respects this the same way
`/competitors` does: it **renders** the vault's review tables and applies the thresholds
written there; the numbers and the recorded decisions are typed in the vault, never here.

## Where the content comes from

There is no database and no CMS. Every page reads the filesystem at request time
(`export const dynamic = "force-dynamic"`), so dropping a file in and refreshing is the whole
workflow.

```
app/public/assets/winkypie/brand/         → /winkypie · Brand Assets — marks, the App Store
                                            badge, the 9:16 end card
app/public/assets/winkypie/before-after/  → /winkypie · pairs on the file name:
                                            hero_1_before.png + hero_1_after.png
                                            (before|pre and after|post both work)
app/public/assets/winkypie/mobile-app/    → /winkypie · Mobile App. A still cut from a raw
                                            recording lives here; the recording does not —
                                            see `assets/videos/` below
app/public/assets/videos/                 → served at /assets/videos/ locally and **git-
                                            ignored**. Raw captures: screen recordings,
                                            rushes, anything that exists so a still can be
                                            cut out of it. GitHub rejects a file over 100 MB
                                            and a 157 MB recording stopped a push on
                                            2026-09-22. Delivered creatives stay in git —
                                            they are the work product and the largest is
                                            under 11 MB. Footage does not. A fresh clone has
                                            the stills, not the rushes; back the rushes up
                                            somewhere that is not a git repo
app/public/assets/winkypie/poses/         → /winkypie · Poses — a snapshot of the in-app
                                            catalog; its file count is not a pose count
app/public/assets/winkypie/bad-photos/    → /winkypie · Bad Photos — problem-side examples;
                                            real people, release before any ad use
app/public/assets/winkypie/creatives/     → /meta-ads · Campaigns · Our creations, and
  static/                                   nowhere else (one lane per sub-folder). `x.txt`
                                            beside `x.mp4` or `x.png` is that file's caption
app/public/assets/winkypie/instagram/     → /winkypie · Instagram, and /instagram · Profile ·
  pinned/                                   Pinned tiles (the `pinned/` sub-folder only). `x.txt`
                                            beside `x.png` is the post caption, pasted as-is
app/public/assets/winkypie/actors/        → /winkypie · Actors — one
  01 Host/  02 Blonde/                      sub-folder per actor, joined to `actors.json` on
                                            its `folder`. A portrait plus a short casting
                                            sample, kept small on purpose: the delivered
                                            creatives stay in `creatives/`. `x.txt`
                                            beside a file is its caption
app/content/actors.json                   → the same tab's recipes — the prompt as it was
                                            sent, model, settings, credits, job id. A recipe
                                            with no `prompt` carries a `promptNote` saying
                                            where the real source is; do not invent one
app/content/good-ads.json                 → /meta-ads/research/good-ads
app/content/competitors.json              → /meta-ads/research/competitors
../brain/process/meta-ads/
  01 Find Competitors/                    → /competitors, read straight from the vault
  03 Choose Videos And Five Campaigns/briefs/*.md
                                          → /meta-ads/campaigns/ads-to-copy (frontmatter
                                            `order`, `status`, `modelled_on: [good-ads slugs]`;
                                            Hook and Primary text quotes; Evidence paragraph;
                                            `## Do this, in order` list → the steps on
                                            /meta-ads/campaigns/<campaign>), and the same
                                            brief feeds Our creations: the `Headline: **…**`
                                            and `Description: **…**` lines under the primary
                                            text, plus frontmatter `cta:`, `destination:`
                                            (defaults to PRODUCT.md §2), `approved: [ids]`
                                            and `not_applicable: [ids]` — the readiness ids
                                            are listed in `src/lib/ad-readiness.ts`. The
                                            sign-off lives in the vault, never in the app
  05 Ad Strategy And Budget/KPI.md        → /meta-ads/campaigns/kpi: thresholds table
  05 Ad Strategy And Budget/KPI Scenarios.md → the same page, until a real review exists
  07 Update Facebook Account/Instagram Profile.md
                                          → /instagram: frontmatter `profile` and `reference`
                                            are the two links; `## Do this, in order` → the
                                            fix list; `## New bio` code fences → copy blocks;
                                            `## Where we are` and `## The model` tables →
                                            one card per row; every other section in order
  07 Update Facebook Account/posts/*.md   → /instagram · Posts, one card per note (frontmatter
                                            `pillar`, `format`, `slides`, `ratio`, `posts` as the
                                            date, `status`; `## The hook`, `## The description` and
                                            `## The first comment` each hand over their first code
                                            fence; `## The carousel` hands over its table)
  07 Update Facebook Account/Posts Calendar.md
                                          → /instagram · Posts calendar: the `## Schedule`
                                            table (`Date` as YYYY-MM-DD, `Time` optional, `Pillar`,
                                            `Format`, `Asset`, `Line`, `Status`) → the month grid and
                                            the rows under it; every other section in order
  09 Analyze KPIs/KPI Review *.md         → /meta-ads/campaigns/kpi: real rounds
../PRODUCT.md                             → /winkypie · Overview
../BRAND.md                               → /winkypie · Branding
app/public/assets/meta-ads/good-ads/      → previews for the first list, by slug:
app/public/assets/meta-ads/competitors/     <slug>.png, or a <slug>/ folder for several
```

Sub-folders are walked four levels deep and shown as a group label. Dotfiles are skipped, so
`.gitkeep` keeps an empty folder in git without appearing in the UI. A `.txt` with the same
stem as a media file is not listed on its own — it becomes that file's `caption`, shown under
the preview in the card and in the dialog.

Both swipe files are hand-edited and share one shape: an array of `{ slug, title, advertiser,
url, note, tags, added, rank }`, where only `slug` and `url` are required. `rank` (1 = best)
orders the grid — ranked entries first, the rest newest-first. `SWIPE_SOURCES` in
`src/lib/meta-ads.ts` binds each file to its tab and its asset folder — add a list there, not
by copying the loader. Broken JSON surfaces as a message on the page rather than an empty grid
— do not "fix" that by swallowing the error.

The split is on purpose: a **good ad** is one creative (`?id=<library id>`), a **competitor**
is a page (`view_all_page_id=…`) whose contents change under the same link. Mixing them makes
"how many ads have we saved" meaningless.

**Thumbnails: `npm run shot`.** `scripts/capture-previews.mjs` walks both files, opens every
entry that has no preview in headless Chrome and saves the viewport to that list's folder as
`<slug>.png`. The Ad Library renders without a login, so this needs no credentials and no API
key; it is the screenshot you would otherwise take by hand, kept for internal reference.
`-- --force` recaptures, and passing slugs limits it to those entries. Its `SOURCES` array
must stay in sync with `SWIPE_SOURCES`.

**`/winkypie` Overview and Branding read `../PRODUCT.md` and `../BRAND.md`.** Our own channel
links come out of the §2 facts table, so adding a Facebook Page there makes it appear here.
Colour swatches are every hex found in BRAND.md §3, grouped by its sub-headings. The copyable
block in Branding is assembled by `brandMarkdown()` from both files — if a brand fact is wrong
there, fix the markdown, not the component.

**`/competitors` reads `../brain/` and does not copy it.** `src/lib/competitors.ts` parses
`Competitor Landscape.md` for the gap, the ranking order and the living-ads table, and one
file per competitor for the lede and the Facts table; `src/lib/markdown.ts` is the small
parser behind it (frontmatter, sections, tables, lists — no dependency). Editing a note in
Obsidian changes the page on refresh. Two consequences: the app only works with the vault
checked out beside it, and **a heading rename in the vault silently empties a section here** —
sections are matched by their opening words (`The gap`, `Ranking`, `Where the best living
ads`, `Checked and dismissed`, `Facts`). The page degrades to an explanatory error rather
than crashing.

**`/instagram` reads three places in the vault and copies none of them.** `src/lib/instagram.ts` loads
`07 Update Facebook Account/Instagram Profile.md`; the sections it treats specially are
matched by their opening words (`Do this`, `New bio`, `Where we are`, `The model`), so a rename
in the vault silently turns that part back into plain markdown rather than breaking the page.
`src/lib/posts-calendar.ts` loads `Posts Calendar.md` from the same folder: the first table
under `## Schedule` is the plan, columns matched by header name (`Date`, `Time`, `Pillar`, `Format`,
`Asset`, `Line`, `Status`; `Time` optional, the poster's clock), a row without a `YYYY-MM-DD` date is skipped, and the pillar is
matched on the cell's opening words in `src/lib/pillars.ts` (`Pinned`, `Pose`, `Education`,
`UGC`, `Text card`) — a new pillar needs a key there and a colour token in `globals.css`
(`--pillar-*`). Today comes from the server's clock, which is the reader's own machine. `src/lib/instagram-posts.ts` reads every `.md` in `posts/`; its sections are matched on their
opening words too (`The hook`, `The carousel`, `The description`, `The first comment`, `Do this`),
and a section it cannot find degrades to a missing block on the card rather than an error. Whether
a post is a carousel is the note's `format`, with the slide count as the fallback — the app never
decides it.
Nothing here is a tracker: the fix list is numbered, never ticked — the checkboxes stay in
`07 TODO.md` — and a post's `Status` is typed in the vault, never here.

**Routes, not tab state.** `src/app/meta-ads/layout.tsx` is the shell — heading, the two-level
nav (`meta-ads-nav.tsx`, a client component reading `usePathname()`), and the children. Each
tab is a page under `research/` or `campaigns/`. The nav's counts and the pages' data come from
the same `cache()`-wrapped readers in `src/lib/meta-ads-data.ts`, so a request reads each file
once. A detail page — a brief at `campaigns/<campaign>` — highlights its section's first tab
rather than none. `src/app/meta-ads/page.tsx` is only a redirect table for the old `?tab=` URLs.

**`/meta-ads/campaigns/kpi` reads two vault locations.** `src/lib/kpi.ts` loads every
`../brain/process/meta-ads/09 Analyze KPIs/KPI Review *.md` (real rounds, newest first) and,
when no real review exists, `../brain/process/meta-ads/05 Ad Strategy And Budget/KPI
Scenarios.md` — worked examples with `scenario: true` in the frontmatter, which the tab shows
behind a "Scenario data" banner and never mixes with real rows. Each file carries an
`## Assumptions` table (net first payment, 12-month net LTV, scale budget, floors) and an
`## Ads` table whose columns are Meta's own (`Spend`, `Impressions`, `3s plays`, `ThruPlays`,
`Link clicks`, `Installs`, `Trials`, `Payers`) plus `Round`, `Status` (`active` | `previous`),
`Decision` (optional, a human's recorded verdict wins) and `Note`. Hook rate, hold rate, CTR,
CPI, CAC and the projected margin are computed here; **the decision rules in `decide()`
mirror the "Targets for round one" table in `05 Ad Strategy And Budget/KPI.md` — change
both or the dashboard lies.** The thresholds table itself is rendered from that note. Root
guardrail 2 applies: no invented results anywhere in this app — scenario rows exist only to
exercise the rules and say so on screen.

Assets are committed to the repo — **except raw footage**, which goes in
`public/assets/videos/` and is ignored. That soft "worth a second thought" advice used to live
here and it did not hold: a 157 MB screen recording went in on 2026-09-07 and blocked the next
push. The line is now drawn by `.gitignore` rather than by judgement.

Before/after imagery carries the `PRODUCT.md` §11.2 disclosure in the UI. If that section
moves or the wording changes, `before-after-gallery.tsx` has to change with it.

## Stack

Next.js 16.3.4 (App Router, Turbopack) · React 19.2 · TypeScript · Tailwind CSS v4 ·
shadcn/ui (`radix-nova` preset, Radix primitives, Lucide icons) · next-themes · sonner.

```
src/
├── app/          routes — App Router
│   ├── layout.tsx    root layout, dark class, Toaster
│   ├── globals.css   Tailwind v4 config + design tokens (no tailwind.config.js exists)
│   └── page.tsx
├── components/
│   └── ui/       shadcn primitives — added via CLI, see below
└── lib/utils.ts  cn()
```

Path alias is `@/*` → `src/*`.

## Dark theme

**The app is dark-only.** `<html>` carries `className="dark"` and
`style={{ colorScheme: "dark" }}` in `src/app/layout.tsx`. There is no theme toggle and no
system-preference detection — creative work is judged against a dark surface, and a
light/dark split doubles the review burden for no benefit.

Consequences to respect:

- `next-themes` is installed as a shadcn dependency but is **not wired up**. Do not add a
  `ThemeProvider` or a toggle without changing this note first.
- Tailwind v4 does not use the `media` dark strategy here — `globals.css` declares
  `@custom-variant dark (&:is(.dark *))`, i.e. the class strategy. `dark:` utilities work
  because of that class on `<html>`, not because of `prefers-color-scheme`.
- Because dark is permanent, prefer plain semantic tokens over `dark:` variants:
  write `bg-card text-muted-foreground`, not `bg-white dark:bg-zinc-900`.

## Styling rules

- **Semantic tokens only.** `background`, `foreground`, `card`, `muted`, `primary`,
  `border`, `ring`, `destructive`, `chart-1..5`. Never a raw palette colour
  (`text-zinc-400`) in feature code — it will not survive a token change.
- **Tailwind v4 has no JS config.** Tokens and theme live in `src/app/globals.css` under
  `@theme inline` and the `:root` / `.dark` blocks. Colours are OKLCH. Add a new token
  there, then use it as a utility — do not hardcode the value at the call site.
- **The brand gradient is `135deg, #f59e0b → #ec4899` and there is exactly one of it.**
  Define it once as a utility or token; do not inline a second gradient anywhere.
- `cn()` from `@/lib/utils` for every conditional class. Never string-concatenate classes.

## shadcn/ui

- Add components with the CLI, never by hand:
  `npx shadcn@latest add <name>` (run from `app/`).
- Files in `src/components/ui/` are vendored primitives. Edit them only to make a
  deliberate, project-wide change — and say so in the commit message, because
  `shadcn add --reinstall` will silently overwrite your edit.
- Feature components go in `src/components/`, not in `ui/`.
- `components.json` records the preset (`radix-nova`, base colour `neutral`, CSS
  variables). Do not hand-edit it; re-run `init` if it needs to change.

## Next.js 16 patterns

The `AGENTS.md` warning above is real — this version differs from older App Router code.
Check `node_modules/next/dist/docs/` before using an API you are unsure of.

- **Server Components by default.** Add `"use client"` only to the leaf that needs
  interactivity, and push it as far down the tree as it will go. A page that fetches data
  and hands it to a small client component beats a fully client-side page.
- **`params` and `searchParams` are Promises.** `const { id } = await params`. This is the
  breaking change most old snippets get wrong.
- **Fetch in parallel.** Independent requests go through `Promise.all`, not sequential
  `await`s — sequential awaits are the most common performance bug in this router.
- **Deduplicate with `cache()`.** If two components need the same resource, wrap the
  fetch in React's `cache()` rather than passing it down through props.
- **Stream slow work.** Wrap slow data components in `<Suspense>` with a real skeleton so
  the fast part of the page paints immediately. Use `loading.tsx` for route-level fallback.
- **Prefer static.** Opt into dynamic rendering only when the page genuinely needs
  per-request data. The asset catalog changes when someone adds a file, not every second.
- **Mutations are Server Actions**, followed by `revalidatePath` / `revalidateTag`. Route
  handlers (`src/app/api/`) are for webhooks and third-party callbacks.
- **Images through `next/image`** with explicit `width`/`height`. Before/after assets are
  large; an unoptimised `<img>` will wreck the page.
- **Error boundaries:** `error.tsx` per route segment. One unreadable asset must not blank
  the whole grid.

## Secrets

Any API key, token or ad account ID is **server-only**. They live in
`.env.local` (git-ignored) without the `NEXT_PUBLIC_` prefix — that prefix inlines the
value into the client bundle. Read them inside Server Components, Server Actions or route
handlers, never in a `"use client"` file.

## Before you say it is done

```bash
npm run lint
npm run build     # catches type and RSC boundary errors that dev mode tolerates
```

Dev server: `npm run dev` → http://localhost:3000
