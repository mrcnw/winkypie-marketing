"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Film, ImageIcon } from "lucide-react";

import { AssetPreview } from "@/components/asset-preview";
import { MetaAdPreview } from "@/components/meta-ad-preview";
import { ReadinessChecks } from "@/components/readiness-checks";
import { ratioLabel, type Creative } from "@/lib/ad-readiness";
import { cn } from "@/lib/utils";

/**
 * One creative, presented as the ad it is about to become: the Meta render on the left,
 * the preflight on the right, and above both the two things that decide whether it is worth
 * running at all — how many scenarios it has, and which saved Good Ad it was built from.
 *
 * Scenarios are versions of the same campaign (`v0-layout-B`, `v1`), so switching between
 * them swaps the media inside the same copy. That is exactly the comparison the ad set makes.
 */
export function CreativeCard({ creative }: { creative: Creative }) {
  const [active, setActive] = useState(creative.scenarios.length - 1);
  // A creative can go out as more than one ad — same media, different copy. The tabs are
  // the ads; the thumbnails under the preview are the renders inside whichever ad is open.
  const [variant, setVariant] = useState(0);
  const scenario = creative.scenarios[active] ?? creative.scenarios[0] ?? null;
  const copy = creative.copySets[variant] ?? creative.copy;
  const { counts, ready } = creative;

  return (
    <article
      className={cn(
        "flex flex-col gap-5 rounded-2xl border p-5",
        ready
          ? counts.waived
            ? "border-ok/30 bg-ok/[0.02]"
            : "border-ok/40 bg-ok/[0.03]"
          : "border-border bg-card",
      )}
    >
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide",
                  creative.format === "video"
                    ? "border-pillar-education/50 text-pillar-education"
                    : "border-border text-muted-foreground",
                )}
              >
                {creative.format === "video" ? (
                  <Film className="size-3" />
                ) : (
                  <ImageIcon className="size-3" />
                )}
                {creative.format}
              </span>
              <h3 className="font-heading text-xl leading-tight">{creative.title}</h3>
            </div>
            <p className="font-mono text-xs text-muted-foreground">{creative.campaign}</p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            <span
              className={cn(
                "rounded-md border px-2 py-1 font-mono text-[0.7rem] uppercase tracking-wide",
                ready ? "border-ok/50 bg-ok/10 text-ok" : "border-border text-muted-foreground",
              )}
            >
              {ready
                ? counts.waived
                  ? "Ready — with a waiver"
                  : "Ready to upload"
                : "Not ready"}
            </span>
            <span className="font-mono text-[0.7rem] text-muted-foreground">
              {counts.approved} approved · {counts.check} to check · {counts.todo} to do
              {counts.waived ? (
                <span className="text-destructive"> · {counts.waived} waived</span>
              ) : null}
              {counts.na ? ` · ${counts.na} n/a` : ""}
            </span>
          </div>
        </div>

        <dl className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
          <div className="flex gap-1.5">
            <dt className="uppercase tracking-wide text-muted-foreground/60">Ads</dt>
            <dd className="font-mono text-foreground">{creative.copySets.length}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="uppercase tracking-wide text-muted-foreground/60">Scenarios</dt>
            <dd className="font-mono text-foreground">{creative.scenarios.length}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="uppercase tracking-wide text-muted-foreground/60">Ratios</dt>
            <dd className="font-mono text-foreground">
              {creative.ratios.length ? creative.ratios.map(ratioLabel).join(" · ") : "—"}
            </dd>
          </div>
          {creative.brief?.persona && (
            <div className="flex gap-1.5">
              <dt className="uppercase tracking-wide text-muted-foreground/60">Persona</dt>
              <dd className="text-foreground">{creative.brief.persona}</dd>
            </div>
          )}
          {creative.brief?.variable && (
            <div className="flex gap-1.5">
              <dt className="uppercase tracking-wide text-muted-foreground/60">Tests</dt>
              <dd className="text-foreground">{creative.brief.variable}</dd>
            </div>
          )}
        </dl>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3">
          {creative.copySets.length > 1 && (
            <div
              role="tablist"
              aria-label="Ad variants"
              className="flex flex-wrap gap-1 rounded-lg border border-border bg-background/40 p-1"
            >
              {creative.copySets.map((set, index) => (
                <button
                  key={set.label ?? index}
                  type="button"
                  role="tab"
                  aria-selected={index === variant}
                  onClick={() => setVariant(index)}
                  className={cn(
                    "flex-1 rounded-md px-3 py-1.5 text-xs transition-colors",
                    index === variant
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {set.label ?? `Ad ${String.fromCharCode(65 + index)}`}
                </button>
              ))}
            </div>
          )}

          <MetaAdPreview copy={copy} asset={scenario?.poster ?? null} />

          {creative.scenarios.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {creative.scenarios.map((entry, index) => (
                <button
                  key={entry.version}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border p-1.5 pe-2.5 text-xs transition-colors",
                    index === active
                      ? "border-brand/60 bg-secondary text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground/25",
                  )}
                >
                  <span className="relative size-8 shrink-0 overflow-hidden rounded bg-background/60">
                    <AssetPreview asset={entry.poster} sizes="32px" />
                  </span>
                  <span className="font-mono">{entry.version}</span>
                </button>
              ))}
            </div>
          )}

          {scenario && (
            <p className="font-mono text-[0.7rem] text-muted-foreground">
              {scenario.poster.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <ReadinessChecks checks={creative.checks} />

          <footer className="flex flex-col gap-2 border-t border-border/60 pt-4">
            {creative.brief ? (
              <>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="uppercase tracking-wide text-muted-foreground/60">
                    Modelled on
                  </span>
                  {creative.brief.models.length ? (
                    creative.brief.models.map((model) => (
                      <a
                        key={model.slug}
                        href={model.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 transition-colors hover:border-foreground/25 hover:text-foreground"
                      >
                        {model.advertiser ?? model.slug}
                        <ArrowUpRight className="size-3" />
                      </a>
                    ))
                  ) : (
                    <span className="italic">
                      {creative.brief.modelledOn.length
                        ? `${creative.brief.modelledOn.join(", ")} — not in good-ads.json`
                        : "nothing named in the brief"}
                    </span>
                  )}
                </div>
                <Link
                  href={`/meta-ads/campaigns/${encodeURIComponent(creative.campaign)}`}
                  className="inline-flex w-fit items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Open the brief
                  <ArrowUpRight className="size-3" />
                </Link>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                No brief in{" "}
                <code className="font-mono text-foreground">
                  03 Choose Videos And Five Campaigns/briefs/
                </code>{" "}
                for <code className="font-mono text-foreground">{creative.campaign}</code> —
                the copy, the model it was built from and the guardrail read all live there, so
                everything above stays open until one exists.
              </p>
            )}
          </footer>
        </div>
      </div>
    </article>
  );
}
