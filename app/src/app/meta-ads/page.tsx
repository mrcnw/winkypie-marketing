import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { AdCard } from "@/components/ad-card";
import { ASSET_DIRS } from "@/lib/assets";
import { readAdSwipes, SWIPE_FILE } from "@/lib/meta-ads";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meta Ads swipe file",
};

const EXAMPLE = `[
  {
    "slug": "competitor-hook-2026-09-01",
    "title": "Screen demo — one selfie, result in frame",
    "advertiser": "Page name as it appears in the library",
    "url": "https://www.facebook.com/ads/library/?...&view_all_page_id=111792985260795",
    "note": "Why it works — the mechanism, not 'nice video'.",
    "tags": ["screen-demo", "P2"],
    "added": "2026-09-01"
  }
]`;

export default async function MetaAdsPage() {
  const { ads, error } = await readAdSwipes();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Meta Ads</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Ads worth keeping. Each card opens the Ad Library link in a new tab, so a good ad is
          one click away. What to do with them is step{" "}
          <code className="font-mono">02 How To Find A Good Ad</code> in{" "}
          <code className="font-mono">brain/process/meta-ads/</code>.
        </p>
      </header>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p>{error}</p>
        </div>
      )}

      {ads.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <AdCard key={ad.slug} ad={ad} />
          ))}
        </div>
      )}

      <section className="flex flex-col gap-3 rounded-xl border border-border bg-card/50 p-6">
        <h2 className="text-sm font-semibold">Adding an ad</h2>
        <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-sm text-muted-foreground">
          <li>
            Copy the Ad Library URL and add an entry to{" "}
            <code className="font-mono text-foreground">{SWIPE_FILE}</code>.
          </li>
          <li>
            Optional preview: drop a screenshot or screen recording into{" "}
            <code className="font-mono text-foreground">
              app/public/{ASSET_DIRS.metaAds}/
            </code>{" "}
            named after the slug —{" "}
            <code className="font-mono text-foreground">&lt;slug&gt;.png</code>, or a folder{" "}
            <code className="font-mono text-foreground">&lt;slug&gt;/</code> for several.
          </li>
          <li>
            Refresh. Cards are sorted newest first by{" "}
            <code className="font-mono text-foreground">added</code>.
          </li>
        </ol>
        <pre className="overflow-x-auto rounded-lg bg-background/70 p-4 font-mono text-xs text-muted-foreground">
          {EXAMPLE}
        </pre>
        <p className="text-xs text-muted-foreground">
          The library screenshot is someone else&rsquo;s creative — it is reference for us, not
          material to republish.
        </p>
      </section>
    </main>
  );
}
