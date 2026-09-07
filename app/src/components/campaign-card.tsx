import { ExternalLink, ImageOff, Link2Off, ListChecks } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { AssetPreview } from "@/components/asset-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { campaignHref, type CampaignBrief } from "@/lib/campaigns";
import type { AdSwipe } from "@/lib/meta-ads";
import { cn } from "@/lib/utils";

/** `**punch word**` in a hook becomes the brand's italic-gradient move. */
export function renderHook(markdown: string): ReactNode[] {
  return markdown.split(/\*\*/).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="brand-gradient-text not-italic">
        {part}
      </em>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function ModelRow({ ad }: { ad: AdSwipe }) {
  const [preview] = ad.previews;
  return (
    <li className="flex items-center gap-3">
      <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-md border border-border bg-background/60">
        {preview ? (
          <AssetPreview asset={preview} sizes="44px" className="object-cover object-top" />
        ) : (
          <ImageOff className="absolute inset-0 m-auto size-4 text-muted-foreground" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm leading-tight">
          {ad.rank !== null && (
            <span className="me-1.5 font-mono text-xs text-muted-foreground">#{ad.rank}</span>
          )}
          {ad.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {ad.advertiser ?? "Advertiser not recorded"}
        </p>
      </div>
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        aria-label={`Open ${ad.title} in the Ad Library`}
      >
        <ExternalLink className="size-3.5" />
        Ad Library
      </a>
    </li>
  );
}

export function CampaignCard({ brief }: { brief: CampaignBrief }) {
  const href = campaignHref(brief.campaign);
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/30",
        brief.isCandidate && "border-dashed",
      )}
    >
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {Number.isFinite(brief.order) && brief.order < Number.MAX_SAFE_INTEGER && (
            <Badge className="font-mono text-[0.7rem]">#{brief.order}</Badge>
          )}
          {brief.isCandidate && <Badge variant="outline">candidate · wave two</Badge>}
          {brief.persona && <Badge variant="secondary">{brief.persona}</Badge>}
          {brief.format && <Badge variant="outline">{brief.format}</Badge>}
        </div>
        {/* The name and the hook open the brief; the model links below stay their own. */}
        <Link href={href} className="group flex flex-col gap-2">
          <h3 className="font-mono text-sm">{brief.campaign}</h3>
          {brief.hookMarkdown && (
            <blockquote className="font-heading text-2xl font-semibold leading-tight tracking-tight underline-offset-4 decoration-border group-hover:underline">
              {renderHook(brief.hookMarkdown)}
            </blockquote>
          )}
        </Link>
      </header>

      <dl className="flex flex-col gap-2 text-sm">
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
      </dl>

      {brief.primaryText && (
        <p className="rounded-lg bg-background/60 p-3 text-sm text-muted-foreground">
          {brief.primaryText}
        </p>
      )}

      <section className="flex flex-col gap-2 border-t border-border/60 pt-3">
        <h4 className="text-xs uppercase tracking-wide text-muted-foreground">Modelled on</h4>
        {brief.models.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {brief.models.map((ad) => (
              <ModelRow key={ad.slug} ad={ad} />
            ))}
          </ul>
        ) : brief.modelledOn.length === 0 ? (
          <p className="text-sm text-muted-foreground">Our own idea — not modelled on a saved ad.</p>
        ) : (
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <Link2Off className="mt-0.5 size-4 shrink-0" />
            <span>
              No saved Good Ad behind this one
              {brief.evidence ? ` — the brief's evidence: ${brief.evidence}` : "."}
            </span>
          </p>
        )}
        {brief.missingModels.length > 0 && (
          <p className="text-xs text-muted-foreground">
            Not in good-ads.json:{" "}
            <code className="font-mono">{brief.missingModels.join(", ")}</code>
          </p>
        )}
      </section>

      <footer className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
        <Button asChild size="sm" variant="secondary">
          <Link href={href}>
            <ListChecks />
            Brief and steps
            {brief.steps.length > 0 && (
              <span className="font-mono text-xs text-muted-foreground">
                {brief.steps.length}
              </span>
            )}
          </Link>
        </Button>
        {brief.updated && (
          <span className="font-mono text-[0.7rem] text-muted-foreground">{brief.updated}</span>
        )}
      </footer>
    </article>
  );
}
