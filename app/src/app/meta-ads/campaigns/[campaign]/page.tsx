import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, ImageOff, Link2Off } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AssetPreview } from "@/components/asset-preview";
import { renderHook } from "@/components/campaign-card";
import { Inline, Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { readCampaign, STEPS_HEADING } from "@/lib/campaigns";
import { readSwipes, SWIPE_SOURCES, type AdSwipe } from "@/lib/meta-ads";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ campaign: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { campaign } = await params;
  return { title: decodeURIComponent(campaign) };
}

/** Sections the page lays out itself; every other section renders in document order. */
const LAID_OUT = ["hook", "primary text", STEPS_HEADING.toLowerCase()];

function ModelCard({ ad }: { ad: AdSwipe }) {
  const [preview] = ad.previews;
  return (
    <li className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-background/60">
        {preview ? (
          <AssetPreview
            asset={preview}
            sizes="(max-width: 1024px) 100vw, 22rem"
            className="object-cover object-top"
          />
        ) : (
          <ImageOff className="size-6 text-muted-foreground" />
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <p className="text-sm font-medium leading-tight">
          {ad.rank !== null && (
            <span className="me-1.5 font-mono text-xs text-muted-foreground">#{ad.rank}</span>
          )}
          {ad.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {ad.advertiser ?? "Advertiser not recorded"}
          {ad.added ? ` · saved ${ad.added}` : ""}
        </p>
        {ad.note && <p className="text-xs leading-relaxed text-muted-foreground">{ad.note}</p>}
        {ad.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {ad.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[0.7rem]">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <Button asChild size="sm" variant="secondary" className="mt-1 self-start">
          <a href={ad.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink />
            Ad Library
          </a>
        </Button>
      </div>
    </li>
  );
}

export default async function CampaignPage({ params }: Props) {
  const { campaign } = await params;
  const goodAds = await readSwipes(SWIPE_SOURCES["good-ads"]);
  const { brief } = await readCampaign(decodeURIComponent(campaign), goodAds.ads);
  if (!brief) notFound();

  const rest = brief.sections.filter(
    (section) => !LAID_OUT.some((prefix) => section.heading.toLowerCase().startsWith(prefix)),
  );

  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/meta-ads/campaigns/ads-to-copy"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Campaigns
      </Link>

      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {Number.isFinite(brief.order) && brief.order < Number.MAX_SAFE_INTEGER && (
            <Badge className="font-mono text-[0.7rem]">#{brief.order}</Badge>
          )}
          {brief.isCandidate && <Badge variant="outline">candidate · wave two</Badge>}
          {brief.persona && <Badge variant="secondary">{brief.persona}</Badge>}
          {brief.format && <Badge variant="outline">{brief.format}</Badge>}
          {brief.status && !brief.isCandidate && <Badge variant="outline">{brief.status}</Badge>}
        </div>
        <h1 className="font-mono text-lg">{brief.campaign}</h1>
        {brief.hookMarkdown && (
          <blockquote className="max-w-3xl font-heading text-4xl font-semibold leading-tight tracking-tight">
            {renderHook(brief.hookMarkdown)}
          </blockquote>
        )}
        <dl className="flex max-w-3xl flex-col gap-2 text-sm">
          {brief.variable && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-muted-foreground">Tests</dt>
              <dd>{brief.variable}</dd>
            </div>
          )}
          {brief.lede && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-muted-foreground">Why</dt>
              <dd className="text-muted-foreground">{brief.lede}</dd>
            </div>
          )}
          {brief.evidence && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-muted-foreground">Evidence</dt>
              <dd className="text-muted-foreground">{brief.evidence}</dd>
            </div>
          )}
        </dl>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-4">
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Do this, in order
            </h2>
            {brief.steps.length > 0 ? (
              <ol className="flex flex-col gap-3">
                {brief.steps.map((step, index) => (
                  <li
                    key={index}
                    className="flex gap-4 rounded-xl border border-border bg-card p-4"
                  >
                    <span className="brand-gradient-text shrink-0 font-heading text-lg font-semibold leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed">
                      <Inline text={step} />
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-muted-foreground">
                This brief has no <code className="font-mono">## Do this, in order</code> list yet
                — write one in the vault and it appears here.
              </p>
            )}
          </section>

          {brief.primaryText && (
            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-semibold tracking-tight">Primary text</h2>
              <p className="rounded-lg bg-card p-4 text-sm leading-relaxed text-muted-foreground">
                {brief.primaryText}
              </p>
            </section>
          )}

          {rest.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-semibold tracking-tight">
                <Inline text={section.heading} />
              </h2>
              <Markdown blocks={section.blocks} />
            </section>
          ))}
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-6 lg:self-start">
          <section className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-wide text-muted-foreground">Modelled on</h2>
            {brief.models.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {brief.models.map((ad) => (
                  <ModelCard key={ad.slug} ad={ad} />
                ))}
              </ul>
            ) : brief.modelledOn.length === 0 ? (
              <p className="text-sm text-muted-foreground">Our own idea — not modelled on a saved ad.</p>
            ) : (
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <Link2Off className="mt-0.5 size-4 shrink-0" />
                <span>No saved Good Ad behind this one — the evidence is in the brief.</span>
              </p>
            )}
            {brief.missingModels.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Not in good-ads.json:{" "}
                <code className="font-mono">{brief.missingModels.join(", ")}</code>
              </p>
            )}
          </section>

          <footer className="flex flex-col gap-1 border-t border-border/60 pt-3 text-xs text-muted-foreground">
            <code className="break-all font-mono text-[0.7rem]">{brief.repoPath}</code>
            {brief.updated && <span className="font-mono">updated {brief.updated}</span>}
            <span>Edit the brief in Obsidian; this page follows on refresh.</span>
          </footer>
        </aside>
      </div>
    </div>
  );
}
