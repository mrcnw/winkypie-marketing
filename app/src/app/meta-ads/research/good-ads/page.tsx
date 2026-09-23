import type { Metadata } from "next";

import { SwipeList } from "@/components/swipe-list";
import { goodAds } from "@/lib/meta-ads-data";
import { SWIPE_SOURCES } from "@/lib/meta-ads";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Good Ads · Meta Ads" };

export default async function GoodAdsPage() {
  const { ads, error } = await goodAds();
  return <SwipeList source={SWIPE_SOURCES["good-ads"]} ads={ads} error={error} />;
}
