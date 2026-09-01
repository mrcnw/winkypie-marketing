import { promises as fs } from "node:fs";
import path from "node:path";

import { readAssets, type Asset } from "@/lib/assets";

export type AdSwipe = {
  slug: string;
  title: string;
  advertiser: string | null;
  url: string;
  /** Why it works — the mechanism, not "nice video" */
  note: string | null;
  tags: string[];
  added: string | null;
  /** 1 = best. Ranked entries sort first; the rest fall back to newest-first. */
  rank: number | null;
  /** Read out of the Ad Library URL, for a quick sanity check */
  pageId: string | null;
  adId: string | null;
  previews: Asset[];
};

/**
 * Two lists, two files. One holds single ads worth keeping, the other holds
 * competitors' Ad Library pages — a page link shows everything they run today,
 * which is a different thing from one good ad.
 */
export const SWIPE_SOURCES = {
  "good-ads": {
    key: "good-ads",
    label: "Good Ads",
    file: "good-ads.json",
    repoFile: "app/content/good-ads.json",
    assetDir: "assets/meta-ads/good-ads",
    blurb:
      "One entry per ad worth keeping. Use the ad's own ?id=<library id> link so the card opens that ad, not a whole page.",
  },
  competitors: {
    key: "competitors",
    label: "Competitors — Ad Library",
    file: "competitors.json",
    repoFile: "app/content/competitors.json",
    assetDir: "assets/meta-ads/competitors",
    blurb:
      "One entry per competitor page. Paste the Ad Library page link (view_all_page_id=…) — it always shows what they are running right now.",
  },
} as const;

export type SwipeSourceKey = keyof typeof SWIPE_SOURCES;
export type SwipeSource = (typeof SWIPE_SOURCES)[SwipeSourceKey];

type RawSwipe = {
  slug?: unknown;
  title?: unknown;
  advertiser?: unknown;
  url?: unknown;
  note?: unknown;
  tags?: unknown;
  added?: unknown;
  rank?: unknown;
};

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function idsFrom(url: string) {
  try {
    const parsed = new URL(url);
    return {
      pageId: parsed.searchParams.get("view_all_page_id"),
      adId: parsed.searchParams.get("id"),
    };
  } catch {
    return { pageId: null, adId: null };
  }
}

/**
 * Previews are optional and matched by name: either
 * `<assetDir>/<slug>/*` or `<assetDir>/<slug>.<ext>`.
 */
function previewsFor(slug: string, assets: Asset[]) {
  return assets.filter((asset) => {
    if (asset.group === slug || asset.group.startsWith(`${slug}/`)) return true;
    const stem = asset.name.replace(/\.[^.]+$/, "");
    return !asset.group && (stem === slug || stem.startsWith(`${slug}-`));
  });
}

export async function readSwipes(
  source: SwipeSource,
): Promise<{ ads: AdSwipe[]; error: string | null }> {
  const file = path.join(process.cwd(), "content", source.file);

  let raw: string;
  try {
    raw = await fs.readFile(file, "utf8");
  } catch {
    return { ads: [], error: null }; // no file yet — same as an empty list
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    // Hand-edited JSON: say what broke instead of silently showing nothing.
    return {
      ads: [],
      error: `${source.repoFile} is not valid JSON — ${(error as Error).message}`,
    };
  }

  if (!Array.isArray(parsed)) {
    return { ads: [], error: `${source.repoFile} must contain an array.` };
  }

  const assets = await readAssets(source.assetDir);
  const ads: AdSwipe[] = [];
  let skipped = 0;

  for (const entry of parsed as RawSwipe[]) {
    const url = str(entry?.url);
    const slug = str(entry?.slug);
    if (!url || !slug) {
      skipped += 1;
      continue;
    }
    const { pageId, adId } = idsFrom(url);
    ads.push({
      slug,
      title: str(entry?.title) ?? slug,
      advertiser: str(entry?.advertiser),
      url,
      note: str(entry?.note),
      tags: Array.isArray(entry?.tags)
        ? entry.tags.filter((tag): tag is string => typeof tag === "string")
        : [],
      added: str(entry?.added),
      rank: num(entry?.rank),
      pageId,
      adId,
      previews: previewsFor(slug, assets),
    });
  }

  // Ranked entries first (1 = best), unranked after them, newest first.
  ads.sort(
    (a, b) =>
      (a.rank ?? Infinity) - (b.rank ?? Infinity) ||
      (b.added ?? "").localeCompare(a.added ?? "", "en"),
  );

  return {
    ads,
    error: skipped
      ? `${skipped} entr${skipped === 1 ? "y" : "ies"} skipped in ${source.repoFile} — every entry needs a slug and a url.`
      : null,
  };
}
