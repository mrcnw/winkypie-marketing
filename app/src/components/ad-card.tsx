import { Badge } from "@/components/ui/badge";
import type { AdSwipe } from "@/lib/meta-ads";

/** Format is a different kind of fact from the rest of the tags — filled, not outlined. */
const MEDIA_TAGS = new Set(["image", "video"]);

export function AdCard({ ad }: { ad: AdSwipe }) {
  const media = ad.tags.filter((tag) => MEDIA_TAGS.has(tag.toLowerCase()));
  const rest = ad.tags.filter((tag) => !MEDIA_TAGS.has(tag.toLowerCase()));

  return (
    <a
      href={ad.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/50 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
    >
      <div className="flex flex-col gap-1">
        <h3 className="brand-gradient-text font-medium leading-tight">{ad.title}</h3>
        <p className="text-xs text-muted-foreground">
          {ad.advertiser ?? "Advertiser not recorded"}
          {ad.added ? ` · saved ${ad.added}` : ""}
        </p>
      </div>

      {ad.note && <p className="text-sm text-muted-foreground">{ad.note}</p>}

      {(ad.tags.length > 0 || ad.rank !== null) && (
        <div className="flex flex-wrap gap-1.5">
          {ad.rank !== null && <Badge className="font-mono text-[0.7rem]">#{ad.rank}</Badge>}
          {media.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          {rest.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </a>
  );
}
