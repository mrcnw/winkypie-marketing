@AGENTS.md

# app/ — WinkyPie Asset Helper

Internal Next.js app for the WinkyPie marketing team. It is a **helper for browsing the
assets**, plus the reference information that has to travel with them. Product facts and the
non-negotiable brand guardrails are in `../PRODUCT.md` and the root `CLAUDE.md` — read those
before rendering anything. The process lives in `../brain/process/meta-ads/`; this app shows
and organises, it does not restate strategy and it does not track campaigns.

## Scope

Two tabs. One job each:

| Route | What it shows |
|---|---|
| `/` | The two tiles, with a file count on each. |
| `/winkypie` | Three tabs: **Brand Assets** (logo marks, wordmarks), **Before / After** (pairs, with the disclosure) and **Mobile App** (icon, App Store screenshots, recordings). Click a file for a full preview, its repo path, and download. |
| `/meta-ads` | Ads worth keeping. Preview, why it works, and a one-click link into the Meta Ad Library. |

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
app/public/assets/meta-ads/               → /meta-ads previews, matched to an ad by slug:
                                            <slug>.png, or a <slug>/ folder for several
app/content/meta-ads.json                 → the swipe file, one entry per ad
```

Sub-folders are walked four levels deep and shown as a group label. Dotfiles are skipped, so
`.gitkeep` keeps an empty folder in git without appearing in the UI.

`content/meta-ads.json` is hand-edited: an array of `{ slug, title, advertiser, url, note,
tags, added }`, where only `slug` and `url` are required. Broken JSON surfaces as a message on
the page rather than an empty grid — do not "fix" that by swallowing the error.

**Thumbnails: `npm run shot`.** `scripts/capture-previews.mjs` opens every ad that has no
preview in headless Chrome and saves the viewport to `<slug>.png`. The Ad Library renders
without a login, so this needs no credentials and no API key; it is the screenshot you would
otherwise take by hand, kept for internal reference. `-- --force` recaptures, and passing
slugs limits it to those ads. A `?id=<library id>` URL captures a single ad instead of a
page's whole list.

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
