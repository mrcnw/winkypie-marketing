"use client";

import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChannelChips } from "@/components/channel-chips";
import type { Competitor, Fact } from "@/lib/competitors";

export function CompetitorCard({
  competitor,
  facts,
}: {
  competitor: Competitor;
  facts: Fact[];
}) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
      <header className="flex items-start gap-3">
        {competitor.rank !== null && (
          <span className="brand-gradient mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-background">
            {competitor.rank}
          </span>
        )}
        <div className="min-w-0">
          <h2 className="font-heading text-xl font-semibold leading-tight">
            {competitor.name}
          </h2>
          {competitor.qualifier && (
            <p className="truncate text-xs text-muted-foreground">
              {competitor.qualifier}
            </p>
          )}
        </div>
      </header>

      <ChannelChips channels={competitor.channels} />

      <p className="text-sm leading-relaxed text-muted-foreground">
        {competitor.lede}
      </p>

      {facts.length > 0 && (
        <dl className="flex flex-col gap-1.5 border-t border-border/60 pt-3 text-sm">
          {facts.map((fact) => (
            <div key={fact.field} className="flex gap-3">
              <dt className="w-28 shrink-0 text-xs uppercase tracking-wide text-muted-foreground">
                {fact.field}
              </dt>
              <dd className="min-w-0 flex-1">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {competitor.adProof && (
        <p className="rounded-lg bg-background/60 p-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Meta ads: </span>
          {competitor.adProof}
        </p>
      )}

      {competitor.why && (
        <p className="text-sm">
          <span className="text-muted-foreground">Why this rank: </span>
          {competitor.why}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        {competitor.nicheFit && (
          <Badge variant="secondary">{competitor.nicheFit}</Badge>
        )}
        {competitor.updated && (
          <Badge variant="outline" className="font-mono text-[0.7rem]">
            {competitor.updated}
          </Badge>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="secondary" className="ms-auto">
              Full note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">
                {competitor.name}
              </DialogTitle>
              <DialogDescription className="font-mono text-xs">
                {competitor.repoPath}
              </DialogDescription>
            </DialogHeader>

            <p className="text-sm leading-relaxed">{competitor.lede}</p>

            {competitor.facts.length > 0 && (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full border-collapse text-left text-xs">
                  <tbody>
                    {competitor.facts.map((fact) => (
                      <tr
                        key={fact.field}
                        className="border-b border-border/50 align-top"
                      >
                        <th className="w-32 px-3 py-2 font-medium">
                          {fact.field}
                        </th>
                        <td className="px-3 py-2 text-muted-foreground">
                          {fact.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {competitor.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">{section.heading}</h3>
                <Markdown blocks={section.blocks} />
              </section>
            ))}
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}
