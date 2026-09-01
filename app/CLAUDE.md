@AGENTS.md

# app/ — WinkyPie Asset Helper

Internal Next.js app for the WinkyPie marketing team. It is a **helper for browsing the
assets**, plus the reference information that has to travel with them. Product facts and the
non-negotiable brand guardrails are in `../PRODUCT.md` and the root `CLAUDE.md` — read those
before rendering anything. The process lives in `../brain/process/meta-ads/`; this app shows
and organises, it does not restate strategy and it does not track campaigns.

## Scope

Three tabs. One job each:

| Route | What it shows |
|---|---|
| `/` | The three tiles, with a count on each. |
| `/winkypie` | Three tabs. **Overview** — the one-liner, our own channels (and which ones do not exist yet), the locked lines, the shipped flow, the limits. **Assets** — brand marks, before/after pairs with the disclosure, mobile-app captures; click a file for a full preview, its repo path and a download. **Branding** — colour swatches, live components, type, and one copyable markdown block of the whole brand. |
| `/meta-ads` | Two tabs: **Good Ads** (single ads worth keeping) and **Competitors — Ad Library** (a competitor's page link, which always shows what they run today). Preview, why it works, one-click link into the library. |
| `/competitors` | The step-01 research, rendered: the gap sentence, ranked competitor cards with the facts that matter, the longest-living ads, and the dismissed list. Each card opens the full note. |

Anything that is a *decision* — budgets, hypotheses, KPI thresholds, which creative is live —
belongs in `brain/process/meta-ads/`, not here. If a view would need a checkbox or a status,
it is process, and it is in the wrong repo half.

## Where the content comes from

There is no database and no CMS. Every page reads the filesystem at request time
(`export const dynamic = "force-dynamic"`), so dropping a file in and refreshing is the whole
workflow.

```
app/public/assets/winkypie/brand/         → /winkypie · Brand Assets
app/public/assets/winkypie/before-after/  → /winkypie · pairs on the file name:
                                            hero_1_before.png + hero_1_after.png
                                            (before|pre and after|post both work)
app/public/assets/winkypie/mobile-app/    → /winkypie · Mobile App
app/content/good-ads.json                 → /meta-ads · Good Ads tab
app/content/competitors.json              → /meta-ads · Competitors tab
../brain/process/meta-ads/
  01 Find Competitors/                    → /competitors, read straight from the vault
../PRODUCT.md                             → /winkypie · Overview
../BRAND.md                               → /winkypie · Branding
app/public/assets/meta-ads/good-ads/      → previews for the first list, by slug:
app/public/assets/meta-ads/competitors/     <slug>.png, or a <slug>/ folder for several
```

Sub-folders are walked four levels deep and shown as a group label. Dotfiles are skipped, so
`.gitkeep` keeps an empty folder in git without appearing in the UI.

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

Assets are committed to the repo. A multi-hundred-MB video is worth a second thought before
`git add`; everything else just goes in.

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
