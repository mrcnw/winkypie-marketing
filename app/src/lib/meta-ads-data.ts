import { cache } from "react";

import { loadAdTeardowns } from "@/lib/ad-teardowns";
import { readCampaigns } from "@/lib/campaigns";
import { readCreatives } from "@/lib/creatives";
import { readKpi } from "@/lib/kpi";
import { readSwipes, SWIPE_SOURCES } from "@/lib/meta-ads";
import { readProduct } from "@/lib/product";

/**
 * The readers behind /meta-ads, wrapped in `cache()`.
 *
 * Each tab is its own route now, and the nav above it needs a count from every tab — so the
 * layout and the page that renders inside it ask for the same files on the same request.
 * `cache()` makes that one read instead of two. It is per-request, so a refresh still picks
 * up an edit: the pages stay `force-dynamic` and nothing is held between requests.
 */

export const goodAds = cache(() => readSwipes(SWIPE_SOURCES["good-ads"]));
export const competitorAds = cache(() => readSwipes(SWIPE_SOURCES.competitors));
export const teardowns = cache(() => loadAdTeardowns());
export const kpi = cache(() => readKpi());

export const campaigns = cache(async () => readCampaigns((await goodAds()).ads));

export const creatives = cache(async () => {
  // One App Store link for every creative — a product fact (PRODUCT.md §2), read once.
  const product = await readProduct();
  const appStore = product?.channels.find((channel) => channel.kind === "appstore")?.url ?? null;
  return readCreatives((await campaigns()).briefs, appStore);
});

/** Labelled "KPI Example" for as long as only scenario rows exist. */
export const kpiLabel = cache(async () =>
  (await kpi()).sources.some((source) => source.scenario) ? "KPI Example" : "KPI",
);
