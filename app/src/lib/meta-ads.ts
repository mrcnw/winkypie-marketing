import { promises as fs } from "node:fs";
import path from "node:path";

import { ASSET_DIRS, readAssets, type Asset } from "@/lib/assets";

export type AdSwipe = {
  slug: string;
  title: string;
  advertiser: string | null;
  url: string;
  /** Why it works — the mechanism, not "nice video" */
  note: string | null;
  tags: string[];
  added: string | null;
  /** Read out of the Ad Library URL, for a quick sanity check */
  pageId: string | null;
  adId: string | null;
  previews: Asset[];
};

/** Hand-edited. One entry per ad worth keeping. */
export const SWIPE_FILE = "app/content/meta-ads.json";
const SWIPE_PATH = path.join(process.cwd(), "content", "meta-ads.json");

type RawSwipe = {
  slug?: unknown;
  title?: unknown;
  advertiser?: unknown;
  url?: unknown;
  note?: unknown;
  tags?: unknown;
  added?: unknown;
};

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
 * `public/assets/meta-ads/<slug>/*` or `public/assets/meta-ads/<slug>.<ext>`.
 */
function previewsFor(slug: string, assets: Asset[]) {
  return assets.filter((asset) => {
    if (asset.group === slug || asset.group.startsWith(`${slug}/`)) return true;
    const stem = asset.name.replace(/\.[^.]+$/, "");
    return !asset.group && (stem === slug || stem.startsWith(`${slug}-`));
  });
}

export async function readAdSwipes(): Promise<{
  ads: AdSwipe[];
  error: string | null;
}> {
  let raw: string;
  try {
    raw = await fs.readFile(SWIPE_PATH, "utf8");
  } catch {
    return { ads: [], error: null }; // no file yet — same as an empty swipe file
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    // Hand-edited JSON: say what broke instead of silently showing nothing.
    return {
      ads: [],
      error: `${SWIPE_FILE} is not valid JSON — ${(error as Error).message}`,
    };
  }

  if (!Array.isArray(parsed)) {
    return { ads: [], error: `${SWIPE_FILE} must contain an array of ads.` };
  }

  const assets = await readAssets(ASSET_DIRS.metaAds);
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
      pageId,
      adId,
      previews: previewsFor(slug, assets),
    });
  }

  ads.sort((a, b) => (b.added ?? "").localeCompare(a.added ?? "", "en"));

  return {
    ads,
    error: skipped
      ? `${skipped} entr${skipped === 1 ? "y" : "ies"} skipped — every ad needs a slug and a url.`
      : null,
  };
}
