import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { CompetitorCard } from "@/components/competitor-card";
import { cardFacts, readLandscape, RESEARCH_DIR } from "@/lib/competitors";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Competitors",
};

export default async function CompetitorsPage() {
  const landscape = await readLandscape();

  if (!landscape) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Competitors
        </h1>
        <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p>
            Could not read{" "}
            <code className="font-mono">
              {RESEARCH_DIR}/Competitor Landscape.md
            </code>
            . This page reads the vault directly, so it only works with the repo
            checked out next to <code className="font-mono">app/</code>.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Competitors
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Read live out of <code className="font-mono">{RESEARCH_DIR}/</code> —
          step 01 of the Meta Ads process. Edit the notes in Obsidian and
          refresh; nothing is copied into this app.
        </p>
      </header>

      {landscape.gap && (
        <section className="rounded-xl border border-border bg-card/50 p-6">
          <h2 className="text-xs uppercase tracking-wide text-muted-foreground">
            The gap, in one sentence
          </h2>
          <p className="mt-2 max-w-4xl text-lg leading-snug">{landscape.gap}</p>
        </section>
      )}

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight">
            Ranked — best competitor first
          </h2>
          <p className="font-mono text-xs text-muted-foreground">
            {landscape.competitors.length} profiled
            {landscape.updated ? ` · ${landscape.updated}` : ""}
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {landscape.competitors.map((competitor) => (
            <CompetitorCard
              key={competitor.slug}
              competitor={competitor}
              facts={cardFacts(competitor)}
            />
          ))}
        </div>
      </section>

      {landscape.livingAds.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Longest-living ads in the niche
          </h2>
          <p className="text-sm text-muted-foreground">
            30+ days live means it pays for itself; 60–90+ is a proven winner.
          </p>
          <ul className="flex flex-col divide-y divide-border/60 rounded-xl border border-border bg-card">
            {landscape.livingAds.map((ad) => (
              <li
                key={`${ad.page}-${ad.since}`}
                className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-4"
              >
                <div className="flex w-56 shrink-0 items-baseline gap-2">
                  <span className="font-medium">{ad.page}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {ad.days}
                  </span>
                </div>
                <p className="min-w-0 flex-1 text-sm text-muted-foreground">
                  {ad.creative}
                </p>
                <span className="font-mono text-xs text-muted-foreground">
                  {ad.since}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {landscape.dismissed.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Checked and dismissed
          </h2>
          <p className="text-sm text-muted-foreground">
            So nobody researches them twice.
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {landscape.dismissed.map((entry) => (
              <li
                key={entry.name}
                className="flex flex-col gap-1 sm:flex-row sm:gap-3"
              >
                <span className="w-44 shrink-0 font-medium">{entry.name}</span>
                <span className="text-muted-foreground">{entry.why}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
