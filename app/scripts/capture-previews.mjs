#!/usr/bin/env node
/**
 * Fills in missing Meta Ads thumbnails.
 *
 * Reads content/meta-ads.json, opens each ad's Ad Library URL in headless
 * Chrome and saves the viewport to public/assets/meta-ads/<slug>.png — which
 * is exactly where the /meta-ads page looks for a preview.
 *
 *   npm run shot                 capture every ad that has no preview yet
 *   npm run shot -- --force      recapture everything
 *   npm run shot -- <slug> …     only these ads
 *
 * The Ad Library renders without a login, but it is someone else's page: this
 * is a screenshot for internal reference, the same thing you would take by
 * hand. Nothing is republished.
 */
import { spawnSync } from "node:child_process";
import { existsSync, promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SWIPE_FILE = path.join(ROOT, "content", "meta-ads.json");
const OUT_DIR = path.join(ROOT, "public", "assets", "meta-ads");
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

async function hasPreview(slug) {
  const entries = await fs.readdir(OUT_DIR, { withFileTypes: true }).catch(() => []);
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

const ads = JSON.parse(await fs.readFile(SWIPE_FILE, "utf8"));
await fs.mkdir(OUT_DIR, { recursive: true });

let captured = 0;
let skipped = 0;

for (const ad of ads) {
  if (!ad?.slug || !ad?.url) continue;
  if (only.length && !only.includes(ad.slug)) continue;
  if (!force && (await hasPreview(ad.slug))) {
    console.log(`· ${ad.slug} — preview exists, skipping`);
    skipped += 1;
    continue;
  }

  const out = path.join(OUT_DIR, `${ad.slug}.png`);
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
  console.log(`  saved public/assets/meta-ads/${ad.slug}.png (${Math.round(size / 1024)} KB)`);
  captured += 1;
}

console.log(`\n${captured} captured, ${skipped} already had a preview.`);
if (captured) console.log("Refresh /meta-ads to see them.");
