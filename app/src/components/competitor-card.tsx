"use client";

import {
  AtSign,
  Globe,
  Megaphone,
  Music2,
  Play,
  Smartphone,
  Star,
  ThumbsUp,
  type LucideIcon,
} from "lucide-react";

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
import type { Channel, ChannelKind, Competitor, Fact } from "@/lib/competitors";
import { cn } from "@/lib/utils";

const CHANNEL_LABEL: Record<ChannelKind, string> = {
  site: "Site",
  appstore: "App Store",
  play: "Play",
  adlibrary: "Ad Library",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  trustpilot: "Trustpilot",
};

const CHANNEL_ICON: Record<ChannelKind, LucideIcon> = {
  site: Globe,
  appstore: Smartphone,
  play: Play,
  adlibrary: Megaphone,
  instagram: AtSign,
  tiktok: Music2,
  facebook: ThumbsUp,
  trustpilot: Star,
};

function Channels({ channels }: { channels: Channel[] }) {
  if (!channels.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {channels.map((channel) => {
        const Icon = CHANNEL_ICON[channel.kind];
        return (
          <a
            key={channel.kind}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            title={
              channel.found
                ? channel.url
                : `Nothing verified yet — search ${channel.kind} and put the handle in the note`
            }
            className={cn(
              "flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition-colors",
              channel.found
                ? "border-border bg-background/60 text-muted-foreground hover:border-foreground/25 hover:text-foreground"
                : "border-dashed border-border/60 text-muted-foreground/50 hover:text-muted-foreground",
            )}
          >
            <Icon className="size-3.5" />
            {CHANNEL_LABEL[channel.kind]}
            {channel.found && channel.label !== CHANNEL_LABEL[channel.kind] && (
              <span className="text-muted-foreground/70">{channel.label}</span>
            )}
            {!channel.found && <span className="italic">?</span>}
          </a>
        );
      })}
    </div>
  );
}

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

      <Channels channels={competitor.channels} />

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
