import {
  ArrowUpRight,
  AtSign,
  Globe,
  LifeBuoy,
  Megaphone,
  Music2,
  Play,
  Smartphone,
  Star,
  ThumbsUp,
  type LucideIcon,
} from "lucide-react";

import { CHANNEL_LABEL, type Channel, type ChannelKind } from "@/lib/channels";
import { cn } from "@/lib/utils";

// lucide v1 dropped brand icons, so these are the neutral stand-ins.
const CHANNEL_ICON: Record<ChannelKind, LucideIcon> = {
  site: Globe,
  appstore: Smartphone,
  play: Play,
  adlibrary: Megaphone,
  instagram: AtSign,
  tiktok: Music2,
  facebook: ThumbsUp,
  trustpilot: Star,
  support: LifeBuoy,
};

/**
 * One row of channel slots. A slot always renders: solid when it is verified,
 * dashed when there is nothing there yet — an absent account is information.
 *
 * `lg` is for our own channels, where the row is the thing you came to click.
 * `sm` stays compact: a competitor card carries nine of these under a title.
 */
export function ChannelChips({
  channels,
  size = "sm",
}: {
  channels: Channel[];
  size?: "sm" | "lg";
}) {
  if (!channels.length) return null;

  const large = size === "lg";

  return (
    <div className={cn("flex flex-wrap", large ? "gap-2" : "gap-1.5")}>
      {channels.map((channel) => {
        const Icon = CHANNEL_ICON[channel.kind];
        const className = cn(
          "flex items-center transition-colors",
          large
            ? "gap-2 rounded-lg border px-3 py-2 text-sm"
            : "gap-1.5 rounded-md border px-2 py-1 text-xs",
          channel.found
            ? large
              ? "border-border bg-card font-medium text-foreground hover:border-brand/60 hover:bg-secondary"
              : "border-border bg-background/60 text-muted-foreground hover:border-foreground/25 hover:text-foreground"
            : "border-dashed border-border/60 text-muted-foreground/50",
          channel.url && !channel.found && "hover:text-muted-foreground",
        );

        const body = (
          <>
            <Icon className={cn(large ? "size-4" : "size-3.5", large && channel.found && "text-brand")} />
            {CHANNEL_LABEL[channel.kind]}
            {channel.label && (
              <span className={large ? "font-mono text-xs text-muted-foreground" : "text-muted-foreground/70"}>
                {channel.label}
              </span>
            )}
            {!channel.found && <span className="italic">?</span>}
            {large && channel.found && channel.url && (
              <ArrowUpRight className="size-3.5 text-muted-foreground" />
            )}
          </>
        );

        return channel.url ? (
          <a
            key={channel.kind}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            title={channel.hint ?? channel.url}
            className={className}
          >
            {body}
          </a>
        ) : (
          <span key={channel.kind} title={channel.hint} className={className}>
            {body}
          </span>
        );
      })}
    </div>
  );
}
