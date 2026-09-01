#!/usr/bin/env node
/**
 * Fills in missing Meta Ads thumbnails, for both lists.
 *
 * Reads content/good-ads.json and content/competitors.json, opens each entry's
 * Ad Library URL in headless Chrome and saves the viewport next to that list's
 * assets — exactly where the /meta-ads page looks for a preview.
 *
 *   npm run shot                 capture every entry that has no preview yet
 *   npm run shot -- --force      recapture everything
 *   npm run shot -- <slug> …     only these entries
 *
 * The Ad Library renders without a login, but it is someone else's page: this
 * is a screenshot for internal reference, the same thing you would take by
 * hand. Nothing is republished.
 */
import { spawnSync } from "node:child_process";
import { existsSync, promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

// Keep in sync with SWIPE_SOURCES in src/lib/meta-ads.ts.
const SOURCES = [
  { file: "good-ads.json", dir: "public/assets/meta-ads/good-ads" },
  { file: "competitors.json", dir: "public/assets/meta-ads/competitors" },
];

const WINDOW = "1200,1000";
const BUDGET_MS = 15000;

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((arg) => !arg.startsWith("--"));

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "google-chrome",
    "chromium",
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (candidate.includes("/")) {
      if (existsSync(candidate)) return candidate;
      continue;
    }
    const probe = spawnSync(candidate, ["--version"], { stdio: "ignore" });
    if (probe.status === 0) return candidate;
  }
  return null;
}

async function hasPreview(outDir, slug) {
  const entries = await fs.readdir(outDir, { withFileTypes: true }).catch(() => []);
  return entries.some((entry) => {
    if (entry.name.startsWith(".")) return false;
    if (entry.isDirectory()) return entry.name === slug;
    return entry.name.replace(/\.[^.]+$/, "") === slug;
  });
}

const chrome = findChrome();
if (!chrome) {
  console.error(
    "No Chrome found. Install Google Chrome or set CHROME_PATH to the binary.",
  );
  process.exit(1);
}

let captured = 0;
let skipped = 0;

for (const source of SOURCES) {
  const swipeFile = path.join(ROOT, "content", source.file);
  const outDir = path.join(ROOT, source.dir);

  let ads;
  try {
    ads = JSON.parse(await fs.readFile(swipeFile, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(`content/${source.file} — ${error.message}`);
    }
    continue;
  }
  if (!Array.isArray(ads) || ads.length === 0) continue;

  console.log(`\ncontent/${source.file}`);
  await fs.mkdir(outDir, { recursive: true });

  for (const ad of ads) {
    if (!ad?.slug || !ad?.url) continue;
    if (only.length && !only.includes(ad.slug)) continue;
    if (!force && (await hasPreview(outDir, ad.slug))) {
      console.log(`· ${ad.slug} — preview exists, skipping`);
      skipped += 1;
      continue;
    }

    const out = path.join(outDir, `${ad.slug}.png`);
    console.log(`→ ${ad.slug}`);
    const result = spawnSync(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        `--virtual-time-budget=${BUDGET_MS}`,
        `--window-size=${WINDOW}`,
        `--screenshot=${out}`,
        ad.url,
      ],
      { stdio: "ignore", timeout: BUDGET_MS + 30000 },
    );

    if (result.error || !existsSync(out)) {
      console.error(`  failed — ${result.error?.message ?? "no file written"}`);
      continue;
    }
    const { size } = await fs.stat(out);
    console.log(`  saved ${source.dir}/${ad.slug}.png (${Math.round(size / 1024)} KB)`);
    captured += 1;
  }
}

console.log(`\n${captured} captured, ${skipped} already had a preview.`);
if (captured) console.log("Refresh /meta-ads to see them.");
