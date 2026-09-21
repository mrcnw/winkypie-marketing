import { assembleCreatives, type Creative } from "@/lib/ad-readiness";
import { ASSET_DIRS, readAssets } from "@/lib/assets";
import type { CampaignBrief } from "@/lib/campaigns";

/** The fs half of the readiness model — `ad-readiness.ts` stays client-safe. */
export async function readCreatives(
  briefs: CampaignBrief[],
  appStoreUrl: string | null,
): Promise<Creative[]> {
  return assembleCreatives(await readAssets(ASSET_DIRS.creatives), briefs, appStoreUrl);
}
