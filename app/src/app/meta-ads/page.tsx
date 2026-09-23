import { redirect } from "next/navigation";

/**
 * Every tab is a route now. This keeps the old `?tab=` links working — they were in briefs,
 * in commit messages and in `app/CLAUDE.md` — and sends a bare /meta-ads to the first tab.
 */
const TAB_ROUTES: Record<string, string> = {
  "good-ads": "/meta-ads/research/good-ads",
  competitors: "/meta-ads/research/competitors",
  teardowns: "/meta-ads/research/teardowns",
  campaigns: "/meta-ads/campaigns/ads-to-copy",
  creations: "/meta-ads/campaigns/our-creations",
  kpi: "/meta-ads/campaigns/kpi",
  // The cast left this page entirely on 2026-09-19.
  actors: "/winkypie?tab=actors",
};

export default async function MetaAdsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  redirect(TAB_ROUTES[tab ?? ""] ?? "/meta-ads/research/good-ads");
}
