import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { AdCard } from "@/components/ad-card";
import { DropHint } from "@/components/drop-hint";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  readSwipes,
  SWIPE_SOURCES,
  type AdSwipe,
  type SwipeSource,
} from "@/lib/meta-ads";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meta Ads",
};

const EXAMPLE = `[
  {
    "slug": "gio-upload-a-photo-hook",
    "title": "Screen demo — one photo, result in frame",
    "advertiser": "Page name as it appears in the library",
    "url": "https://www.facebook.com/ads/library/?id=1101597932224599",
    "note": "Why it works — the mechanism, not 'nice video'.",
    "tags": ["screen-demo", "P2"],
    "added": "2026-09-01",
    "rank": 1
  }
]`;

function SwipeList({
  source,
  ads,
  error,
}: {
  source: SwipeSource;
  ads: AdSwipe[];
  error: string | null;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="max-w-2xl text-sm text-muted-foreground">{source.blurb}</p>
        <p className="font-mono text-xs text-muted-foreground">
          {ads.length} saved · {source.repoFile}
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p>{error}</p>
        </div>
      )}

      {ads.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <AdCard key={ad.slug} ad={ad} />
          ))}
        </div>
      ) : (
        <DropHint dir={source.repoFile} verb="Paste an Ad Library link into">
          <p>
            Then run <code className="font-mono text-foreground">npm run shot</code> for the
            thumbnail.
          </p>
        </DropHint>
      )}

      <section className="flex flex-col gap-3 rounded-xl border border-border bg-card/50 p-6">
        <h2 className="text-sm font-semibold">Adding a link</h2>
        <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-sm text-muted-foreground">
          <li>
            Paste the Ad Library URL as a new entry in{" "}
            <code className="font-mono text-foreground">{source.repoFile}</code>. Only{" "}
            <code className="font-mono text-foreground">slug</code> and{" "}
            <code className="font-mono text-foreground">url</code> are required.
          </li>
          <li>
            Thumbnail: run <code className="font-mono text-foreground">npm run shot</code>. It
            opens every entry without a preview in headless Chrome and saves the page to{" "}
            <code className="font-mono text-foreground">
              app/public/{source.assetDir}/&lt;slug&gt;.png
            </code>
            .
          </li>
          <li>
            Or drop your own screenshot or screen recording in there, named{" "}
            <code className="font-mono text-foreground">&lt;slug&gt;.png</code> — or a folder{" "}
            <code className="font-mono text-foreground">&lt;slug&gt;/</code> for several.
          </li>
        </ol>
        <pre className="overflow-x-auto rounded-lg bg-background/70 p-4 font-mono text-xs text-muted-foreground">
          {EXAMPLE}
        </pre>
        <p className="text-xs text-muted-foreground">
          A library screenshot is someone else&rsquo;s creative — reference for us, not
          material to republish.
        </p>
      </section>
    </div>
  );
}

export default async function MetaAdsPage() {
  const [goodAds, competitors] = await Promise.all([
    readSwipes(SWIPE_SOURCES["good-ads"]),
    readSwipes(SWIPE_SOURCES.competitors),
  ]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Meta Ads</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Links worth keeping, one click from the Ad Library. What to do with them is step{" "}
          <code className="font-mono">02 How To Find A Good Ad</code> in{" "}
          <code className="font-mono">brain/process/meta-ads/</code>.
        </p>
      </header>

      <Tabs defaultValue="good-ads" className="gap-6">
        <TabsList>
          <TabsTrigger value="good-ads">
            Good Ads
            <span className="ms-1.5 font-mono text-xs text-muted-foreground">
              {goodAds.ads.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="competitors">
            Competitors — Ad Library
            <span className="ms-1.5 font-mono text-xs text-muted-foreground">
              {competitors.ads.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="good-ads">
          <SwipeList
            source={SWIPE_SOURCES["good-ads"]}
            ads={goodAds.ads}
            error={goodAds.error}
          />
        </TabsContent>

        <TabsContent value="competitors">
          <SwipeList
            source={SWIPE_SOURCES.competitors}
            ads={competitors.ads}
            error={competitors.error}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
