import type { Metadata } from "next";

import { MetaAdsNav, type NavSection } from "@/components/meta-ads-nav";
import {
  campaigns,
  competitorAds,
  creatives,
  goodAds,
  kpiLabel,
  teardowns,
} from "@/lib/meta-ads-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meta Ads",
};

/**
 * The shell every /meta-ads tab renders inside: the heading and the two-level nav.
 *
 * Counts come from the same cached readers the pages use, so the layout costs no extra
 * filesystem work on a request.
 */
export default async function MetaAdsLayout({ children }: { children: React.ReactNode }) {
  const [good, competitors, tears, briefs, ours, kpi] = await Promise.all([
    goodAds(),
    competitorAds(),
    teardowns(),
    campaigns(),
    creatives(),
    kpiLabel(),
  ]);

  const roundOne = briefs.briefs.filter((brief) => !brief.isCandidate).length;

  const sections: NavSection[] = [
    {
      href: "/meta-ads/research",
      label: "Research",
      tabs: [
        { href: "/meta-ads/research/good-ads", label: "Good Ads", count: `${good.ads.length}` },
        {
          href: "/meta-ads/research/competitors",
          label: "Competitors — Ad Library",
          count: `${competitors.ads.length}`,
        },
        {
          href: "/meta-ads/research/teardowns",
          label: "Ad analyzer",
          count: `${tears.length}`,
        },
      ],
    },
    {
      href: "/meta-ads/campaigns",
      label: "Campaigns",
      tabs: [
        {
          href: "/meta-ads/campaigns/ads-to-copy",
          label: "Ads to copy",
          count: `${roundOne}`,
        },
        {
          href: "/meta-ads/campaigns/our-creations",
          label: "Our creations",
          count: `${ours.length}`,
        },
        { href: "/meta-ads/campaigns/kpi", label: kpi },
      ],
    },
  ];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Meta Ads</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Research is what the niche runs and why it works; Campaigns is what we make of it —
          our briefs mapped back to their models, the creatives we have made, and the KPI
          read. The decisions live in{" "}
          <code className="font-mono">brain/process/meta-ads/</code>; this page renders them.
        </p>
      </header>

      <MetaAdsNav sections={sections} />

      {children}
    </main>
  );
}
