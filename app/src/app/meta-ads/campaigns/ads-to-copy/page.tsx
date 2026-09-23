import type { Metadata } from "next";

import { CampaignList } from "@/components/campaign-list";
import { campaigns } from "@/lib/meta-ads-data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Ads to copy · Meta Ads" };

export default async function AdsToCopyPage() {
  return <CampaignList data={await campaigns()} />;
}
