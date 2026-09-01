import { promises as fs } from "node:fs";
import path from "node:path";

export type AssetKind = "image" | "video" | "other";

export type Asset = {
  /** File name, e.g. `hero_1_after.png` */
  name: string;
  /** Human label derived from the file name */
  label: string;
  /** Public URL, e.g. `/assets/winkypie/brand/logo.png` */
  href: string;
  /** Path to paste into a brief, e.g. `app/public/assets/winkypie/brand/logo.png` */
  repoPath: string;
  /** Sub-folder inside the category, empty when the file sits at its root */
  group: string;
  kind: AssetKind;
  ext: string;
  size: number;
  /** ISO date */
  modified: string;
};

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const MAX_DEPTH = 4;

/** Where each category lives under `app/public/`. Drop files in, refresh the page. */
export const ASSET_DIRS = {
  brand: "assets/winkypie/brand",
  beforeAfter: "assets/winkypie/before-after",
  mobileApp: "assets/winkypie/mobile-app",
  metaAds: "assets/meta-ads",
} as const;

function kindOf(ext: string): AssetKind {
  if (IMAGE_EXT.has(ext)) return "image";
  if (VIDEO_EXT.has(ext)) return "video";
  return "other";
}

export function labelOf(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Every file under `public/<relDir>`, recursively. Missing folder → empty list. */
export async function readAssets(relDir: string): Promise<Asset[]> {
  const root = path.join(PUBLIC_DIR, relDir);
  const out: Asset[] = [];

  async function walk(dir: string, depth: number) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return; // folder not created yet — that is an empty gallery, not an error
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (depth < MAX_DEPTH) await walk(full, depth + 1);
        continue;
      }
      const stat = await fs.stat(full);
      const rel = path.relative(root, full).split(path.sep).join("/");
      const relToPublic = path.posix.join(relDir, rel);
      const group = rel.includes("/") ? rel.slice(0, rel.lastIndexOf("/")) : "";
      out.push({
        name: entry.name,
        label: labelOf(entry.name),
        href: `/${relToPublic}`,
        repoPath: `app/public/${relToPublic}`,
        group,
        kind: kindOf(path.extname(entry.name).toLowerCase()),
        ext: path.extname(entry.name).toLowerCase(),
        size: stat.size,
        modified: stat.mtime.toISOString(),
      });
    }
  }

  await walk(root, 0);
  return out.sort((a, b) => a.href.localeCompare(b.href, "en"));
}

const BEFORE = /(^|[-_ ])(before|pre)([-_ ]|$)/i;
const AFTER = /(^|[-_ ])(after|post)([-_ ]|$)/i;

export type BeforeAfterPair = {
  key: string;
  before: Asset | null;
  after: Asset | null;
};

/**
 * Pairs `hero_1_before.png` with `hero_1_after.png`. Anything without a
 * before/after token in its name comes back as loose.
 */
export function pairBeforeAfter(assets: Asset[]) {
  const pairs = new Map<string, BeforeAfterPair>();
  const loose: Asset[] = [];

  for (const asset of assets) {
    const stem = asset.name.replace(/\.[^.]+$/, "");
    const isBefore = BEFORE.test(stem);
    const isAfter = AFTER.test(stem);
    if (!isBefore && !isAfter) {
      loose.push(asset);
      continue;
    }
    const base = stem
      .replace(isBefore ? BEFORE : AFTER, "$1")
      .replace(/^[-_ ]+|[-_ ]+$/g, "");
    const key = asset.group ? `${asset.group}/${base}` : base;
    const entry = pairs.get(key) ?? { key, before: null, after: null };
    if (isBefore) entry.before = asset;
    else entry.after = asset;
    pairs.set(key, entry);
  }

  return {
    pairs: [...pairs.values()].sort((a, b) => a.key.localeCompare(b.key, "en")),
    loose,
  };
}
