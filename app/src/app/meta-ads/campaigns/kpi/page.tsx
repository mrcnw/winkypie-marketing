import type { Metadata } from "next";

import { KpiDashboard } from "@/components/kpi-dashboard";
import { kpi } from "@/lib/meta-ads-data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "KPI · Meta Ads" };

export default async function KpiPage() {
  return <KpiDashboard data={await kpi()} />;
}
