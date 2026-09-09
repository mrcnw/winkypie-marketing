import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { AdCard } from "@/components/ad-card";
import { AdTeardowns } from "@/components/ad-teardowns";
import { AssetGallery } from "@/components/asset-gallery";
import { CampaignCard } from "@/components/campaign-card";
import { DropHint } from "@/components/drop-hint";
import { KpiDashboard } from "@/components/kpi-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadAdTeardowns, TEARDOWNS_DIR } from "@/lib/ad-teardowns";
import { ASSET_DIRS, readAssets } from "@/lib/assets";
import { BRIEFS_DIR, readCampaigns, type CampaignsData } from "@/lib/campaigns";
import { readKpi } from "@/lib/kpi";
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
  const section = tab === "campaigns" || tab === "creations" ? "campaigns" : "research";
  const campaignTab = tab === "creations" ? "creations" : "ads-to-copy";
  const researchTab =
    tab === "teardowns" ? "teardowns" : tab === "competitors" ? "competitors" : "good-ads";
  const [goodAds, competitors, kpi, ugc, statics, teardowns] = await Promise.all([
    readSwipes(SWIPE_SOURCES["good-ads"]),
    readSwipes(SWIPE_SOURCES.competitors),
    readKpi(),
    readAssets(`${ASSET_DIRS.creatives}/ugc`),
    readAssets(`${ASSET_DIRS.creatives}/static`),
    loadAdTeardowns(),
  ]);
  const campaigns = await readCampaigns(goodAds.ads);
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
                <Count>{ugc.length + statics.length}</Count>
              </TabsTrigger>
              <TabsTrigger value="kpi">{kpiLabel}</TabsTrigger>
            </TabsList>
            <TabsContent value="ads-to-copy">
              <CampaignList data={campaigns} />
            </TabsContent>
            <TabsContent value="creations" className="flex flex-col gap-10">
              <p className="max-w-2xl text-sm text-muted-foreground">
                What we have actually made, one lane per sub-folder. A file is not cleared to
                run by being here — the step-04.1 QA, the §11 guardrails and the likeness
                release for anyone on screen still apply. A{" "}
                <code className="font-mono text-foreground">.txt</code> next to a file is its
                caption: what the presenter says, or what is on screen.
              </p>
              <AssetGallery
                title="UGC"
                description="Talking-head pieces: the human creator lane and the AI host lane (a disclosed AI presenter, third person about the product — never a testimonial)."
                assets={ugc}
                dir={`${ASSET_DIRS.creatives}/ugc`}
              />
              <AssetGallery
                title="Static"
                description="Design-only pieces: stills and silent motion statics. Before/after framing needs the §11.2 disclosure on frame."
                assets={statics}
                dir={`${ASSET_DIRS.creatives}/static`}
              />
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
