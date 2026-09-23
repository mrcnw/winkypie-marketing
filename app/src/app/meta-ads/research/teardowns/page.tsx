import type { Metadata } from "next";

import { AdTeardowns } from "@/components/ad-teardowns";
import { TEARDOWNS_DIR } from "@/lib/ad-teardowns";
import { teardowns } from "@/lib/meta-ads-data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Ad analyzer · Meta Ads" };

export default async function TeardownsPage() {
  return <AdTeardowns teardowns={await teardowns()} dir={TEARDOWNS_DIR} />;
}
