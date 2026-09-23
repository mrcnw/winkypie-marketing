import type { Metadata } from "next";

import { SwipeList } from "@/components/swipe-list";
import { competitorAds } from "@/lib/meta-ads-data";
import { SWIPE_SOURCES } from "@/lib/meta-ads";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Competitors · Meta Ads" };

export default async function CompetitorsTabPage() {
  const { ads, error } = await competitorAds();
  return <SwipeList source={SWIPE_SOURCES.competitors} ads={ads} error={error} />;
}
