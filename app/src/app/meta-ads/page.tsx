import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AlertTriangle } from "lucide-react";

import { AdCard } from "@/components/ad-card";
import { AdTeardowns } from "@/components/ad-teardowns";
import { AssetGallery } from "@/components/asset-gallery";
import { CampaignCard } from "@/components/campaign-card";
import { CreativeCard } from "@/components/creative-card";
import { DropHint } from "@/components/drop-hint";
import { KpiDashboard } from "@/components/kpi-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadAdTeardowns, TEARDOWNS_DIR } from "@/lib/ad-teardowns";
import { ASSET_DIRS, readAssets } from "@/lib/assets";
import { BRIEFS_DIR, readCampaigns, type CampaignsData } from "@/lib/campaigns";
import type { Creative } from "@/lib/ad-readiness";
import { readCreatives } from "@/lib/creatives";
import { readKpi } from "@/lib/kpi";
import { readProduct } from "@/lib/product";
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

function Count({ children }: { children: React.ReactNode }) {
  return <span className="ms-1.5 font-mono text-xs text-muted-foreground">{children}</span>;
}

function CreativeLane({
  title,
  description,
  creatives,
}: {
  title: string;
  description: string;
  creatives: Creative[];
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {creatives.length} creative{creatives.length === 1 ? "" : "s"}
        </p>
      </div>
      {creatives.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          Nothing in this lane yet.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {creatives.map((creative) => (
            <CreativeCard key={creative.campaign} creative={creative} />
          ))}
        </div>
      )}
    </section>
  );
}

function ErrorNote({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
      <p>{message}</p>
    </div>
  );
}

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

      {error && <ErrorNote message={error} />}

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

function CampaignList({ data }: { data: CampaignsData }) {
  const roundOne = data.briefs.filter((brief) => !brief.isCandidate);
  const candidates = data.briefs.filter((brief) => brief.isCandidate);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="max-w-2xl text-sm text-muted-foreground">
          The step-03 briefs as written in the vault: the hook, the one variable each ad
          tests, the primary text, and the saved Good Ads it was modelled on. Open a card for
          the whole brief and the steps to produce it. Edit the brief in Obsidian; this view
          follows on refresh.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          {roundOne.length} in round one
          {candidates.length ? ` · ${candidates.length} candidate` : ""} · {BRIEFS_DIR}
        </p>
      </div>

      {data.error && <ErrorNote message={data.error} />}

      {roundOne.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2">
          {roundOne.map((brief) => (
            <CampaignCard key={brief.repoPath} brief={brief} />
          ))}
        </div>
      )}

      {candidates.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold">Candidates — not in round one</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {candidates.map((brief) => (
              <CampaignCard key={brief.repoPath} brief={brief} />
            ))}
          </div>
        </section>
      )}

      {!data.briefs.length && !data.error && (
        <DropHint dir={BRIEFS_DIR} verb="Write a brief into">
          <p>
            Frontmatter <code className="font-mono text-foreground">order</code>,{" "}
            <code className="font-mono text-foreground">modelled_on</code> and a{" "}
            <code className="font-mono text-foreground">## Hook</code> blockquote are what this
            view reads.
          </p>
        </DropHint>
      )}
    </div>
  );
}

export default async function MetaAdsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  // /meta-ads?tab=campaigns opens on the Campaigns section — the way back from a brief;
  // ?tab=creations opens the same section on Our creations; ?tab=teardowns opens Research on
  // the Ad analyzer, which is where a link pasted from elsewhere wants to land.
  const { tab } = await searchParams;
  // The cast moved to /winkypie · Actors — keep the old link working.
  if (tab === "actors") redirect("/winkypie?tab=actors");
  const section = tab === "campaigns" || tab === "creations" ? "campaigns" : "research";
  const campaignTab = tab === "creations" ? "creations" : "ads-to-copy";
  const researchTab =
    tab === "teardowns" ? "teardowns" : tab === "competitors" ? "competitors" : "good-ads";
  const [goodAds, competitors, kpi, statics, teardowns, product] = await Promise.all([
    readSwipes(SWIPE_SOURCES["good-ads"]),
    readSwipes(SWIPE_SOURCES.competitors),
    readKpi(),
    readAssets(`${ASSET_DIRS.creatives}/static`),
    loadAdTeardowns(),
    readProduct(),
  ]);
  const campaigns = await readCampaigns(goodAds.ads);
  // One App Store link for every creative — it is a product fact (PRODUCT.md §2), not a
  // per-campaign decision, so it is read once and handed down.
  const appStore = product?.channels.find((channel) => channel.kind === "appstore")?.url ?? null;
  const creatives = await readCreatives(campaigns.briefs, appStore);
  const videos = creatives.filter((creative) => creative.format === "video");
  const stills = creatives.filter((creative) => creative.format === "static");
  const readyCount = creatives.filter((creative) => creative.ready).length;
  const kpiLabel = kpi.sources.some((source) => source.scenario) ? "KPI Example" : "KPI";
  const roundOne = campaigns.briefs.filter((brief) => !brief.isCandidate).length;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Meta Ads</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Research is what the niche runs and why it works; Campaigns is what we make of it —
          our briefs mapped back to their models, the creatives we have made, and the KPI read. The decisions live in{" "}
          <code className="font-mono">brain/process/meta-ads/</code>; this page renders them.
        </p>
      </header>

      <Tabs defaultValue={section} className="gap-8">
        {/* Level one: section switch — underlined headings, no counts. The pill tabs
            inside each section are level two. */}
        <TabsList
          variant="line"
          aria-label="Section"
          className="w-full justify-start gap-8 border-b border-border p-0 group-data-horizontal/tabs:h-auto"
        >
          <TabsTrigger
            value="research"
            className="h-auto flex-none px-0 pb-3 font-heading text-xl font-semibold tracking-tight after:bottom-[-1px] after:bg-brand"
          >
            Research
          </TabsTrigger>
          <TabsTrigger
            value="campaigns"
            className="h-auto flex-none px-0 pb-3 font-heading text-xl font-semibold tracking-tight after:bottom-[-1px] after:bg-brand"
          >
            Campaigns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="research">
          <Tabs defaultValue={researchTab} className="gap-6">
            <TabsList>
              <TabsTrigger value="good-ads">
                Good Ads
                <Count>{goodAds.ads.length}</Count>
              </TabsTrigger>
              <TabsTrigger value="competitors">
                Competitors — Ad Library
                <Count>{competitors.ads.length}</Count>
              </TabsTrigger>
              <TabsTrigger value="teardowns">
                Ad analyzer
                <Count>{teardowns.length}</Count>
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
            <TabsContent value="teardowns">
              <AdTeardowns teardowns={teardowns} dir={TEARDOWNS_DIR} />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="campaigns">
          <Tabs defaultValue={campaignTab} className="gap-6">
            <TabsList>
              <TabsTrigger value="ads-to-copy">
                Ads to copy
                <Count>{roundOne}</Count>
              </TabsTrigger>
              <TabsTrigger value="creations">
                Our creations
                <Count>{creatives.length}</Count>
              </TabsTrigger>
              <TabsTrigger value="kpi">{kpiLabel}</TabsTrigger>
            </TabsList>
            <TabsContent value="ads-to-copy">
              <CampaignList data={campaigns} />
            </TabsContent>
            <TabsContent value="creations" className="flex flex-col gap-10">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="max-w-2xl text-sm text-muted-foreground">
                  One card per creative, drawn the way Meta will draw it, with the preflight
                  beside it. A file is not cleared to run by being here: every check has to
                  reach <span className="text-ok">APPROVED</span> or N/A first, and the
                  sign-off is written in the brief&rsquo;s{" "}
                  <code className="font-mono text-foreground">approved:</code> list — never in
                  this app.
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {readyCount}/{creatives.length} ready · {statics.length} files
                </p>
              </div>

              <CreativeLane
                title="Video"
                description="Anything that moves — a talking head, a screen demo, a silent motion static. Meta autoplays it muted, so the captions carry the read and the hook has to land in 1.5 s."
                creatives={videos}
              />
              <CreativeLane
                title="Static"
                description="Design-only pieces: one frame, no sound. Before/after framing needs the §11.2 disclosure on frame."
                creatives={stills}
              />

              <details className="rounded-xl border border-border/60 p-4">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  Every file, as files
                </summary>
                <div className="pt-4">
                  <AssetGallery
                    title="Static"
                    description="The raw exports behind the cards above."
                    assets={statics}
                    dir={`${ASSET_DIRS.creatives}/static`}
                  />
                </div>
              </details>
            </TabsContent>
            <TabsContent value="kpi">
              <KpiDashboard data={kpi} />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </main>
  );
}
