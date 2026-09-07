import Link from "next/link";
import { ArrowRight, AtSign, Crosshair, Images, Megaphone } from "lucide-react";

import { ASSET_DIRS, readAssets } from "@/lib/assets";
import { readLandscape } from "@/lib/competitors";
import { instagramHandle, readInstagramAudit } from "@/lib/instagram";
import { readSwipes, SWIPE_SOURCES } from "@/lib/meta-ads";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [brand, beforeAfter, mobileApp, goodAds, competitorAds, landscape, instagram] = await Promise.all([
    readAssets(ASSET_DIRS.brand),
    readAssets(ASSET_DIRS.beforeAfter),
    readAssets(ASSET_DIRS.mobileApp),
    readSwipes(SWIPE_SOURCES["good-ads"]),
    readSwipes(SWIPE_SOURCES.competitors),
    readLandscape(),
    readInstagramAudit(),
  ]);

  const winkypieCount = brand.length + beforeAfter.length + mobileApp.length;

  const tiles = [
    {
      href: "/winkypie",
      title: "WinkyPie",
      icon: Images,
      lines: ["Brand Assets — including Before / After", "Mobile App"],
      count: `${winkypieCount} file${winkypieCount === 1 ? "" : "s"}`,
    },
    {
      href: "/meta-ads",
      title: "Meta Ads",
      icon: Megaphone,
      lines: [
        "Good Ads — single ads worth keeping",
        "Competitors — their whole live Ad Library",
      ],
      count: `${goodAds.ads.length} good · ${competitorAds.ads.length} competitors`,
    },
    {
      href: "/competitors",
      title: "Competitors",
      icon: Crosshair,
      lines: [
        "Who else sells this, ranked",
        "Read live from the research notes in brain/",
      ],
      count: `${landscape?.competitors.length ?? 0} profiled`,
    },
    {
      href: "/instagram",
      title: "Instagram",
      icon: AtSign,
      lines: [
        `${instagramHandle(instagram?.profile ?? null) ?? "Our profile"} — what to fix, in order`,
        `Modelled on ${instagramHandle(instagram?.reference ?? null) ?? "the reference account"}`,
        "Read live from the step-07 audit in brain/",
      ],
      count: `${instagram?.steps.length ?? 0} fix${instagram?.steps.length === 1 ? "" : "es"}`,
    },
  ];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-14">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-4xl font-semibold tracking-tight">
          <span className="brand-gradient-text italic">WinkyPie</span> Dashboard
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Local helper for the assets. Everything is read off disk — drop a file in the right
          folder and refresh. Decisions live in{" "}
          <code className="font-mono text-foreground">brain/process/meta-ads/</code>, not here.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-card p-7 transition-colors hover:border-foreground/25"
          >
            <span className="brand-gradient absolute inset-x-0 top-0 h-0.5 opacity-60 transition-opacity group-hover:opacity-100" />
            <tile.icon className="size-6 text-muted-foreground" />
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                {tile.title}
              </h2>
              <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
                {tile.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="mt-auto flex items-center justify-between pt-2 text-sm">
              <span className="font-mono text-xs text-muted-foreground">{tile.count}</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
