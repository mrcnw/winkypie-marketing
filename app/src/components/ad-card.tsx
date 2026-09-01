"use client";

import { ExternalLink, ImageOff } from "lucide-react";

import { AssetPreview } from "@/components/asset-preview";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
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
import type { AdSwipe } from "@/lib/meta-ads";

export function AdCard({ ad }: { ad: AdSwipe }) {
  const [first, ...rest] = ad.previews;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <Dialog>
        <div className="group relative">
          <DialogTrigger asChild disabled={!first}>
            <button
              type="button"
              disabled={!first}
              className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-background/60 disabled:cursor-default"
            >
              {first ? (
                <AssetPreview
                  asset={first}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  // A page screenshot is landscape: fill the tile from the top
                  // rather than letterboxing it into a 4:5 card.
                  className="object-cover object-top"
                />
              ) : (
                <span className="flex flex-col items-center gap-2 p-6 text-center text-xs text-muted-foreground">
                  <ImageOff className="size-6" />
                  No preview yet — drop a screenshot named{" "}
                  <code className="font-mono">{ad.slug}.png</code>
                </span>
              )}
              {rest.length > 0 && (
                <span className="absolute bottom-2 right-2 rounded-full bg-background/85 px-2 py-0.5 text-xs">
                  +{rest.length}
                </span>
              )}
            </button>
          </DialogTrigger>
          {first && <DownloadButton href={first.href} fileName={first.name} />}
        </div>

        {first && (
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="truncate">{ad.title}</DialogTitle>
              <DialogDescription>
                {ad.advertiser ?? "Advertiser not recorded"}
                {ad.added ? ` · saved ${ad.added}` : ""}
              </DialogDescription>
            </DialogHeader>
            <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto">
              {ad.previews.map((preview) => (
                <div
                  key={preview.href}
                  className="relative flex h-[50vh] items-center justify-center overflow-hidden rounded-lg bg-background/60"
                >
                  <AssetPreview
                    asset={preview}
                    interactive
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                  <DownloadButton href={preview.href} fileName={preview.name} />
                </div>
              ))}
            </div>
            <Button asChild size="sm">
              <a href={ad.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                Open in Ad Library
              </a>
            </Button>
          </DialogContent>
        )}
      </Dialog>

      <div className="flex flex-1 flex-col gap-3 border-t border-border/60 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium leading-tight">{ad.title}</h3>
          <p className="text-xs text-muted-foreground">
            {ad.advertiser ?? "Advertiser not recorded"}
            {ad.added ? ` · saved ${ad.added}` : ""}
          </p>
        </div>

        {ad.note && <p className="text-sm text-muted-foreground">{ad.note}</p>}

        {(ad.tags.length > 0 || ad.pageId || ad.adId || ad.rank !== null) && (
          <div className="flex flex-wrap gap-1.5">
            {ad.rank !== null && (
              <Badge className="font-mono text-[0.7rem]">#{ad.rank}</Badge>
            )}
            {ad.pageId && (
              <Badge variant="secondary" className="font-mono text-[0.7rem]">
                page {ad.pageId}
              </Badge>
            )}
            {ad.adId && (
              <Badge variant="secondary" className="font-mono text-[0.7rem]">
                ad {ad.adId}
              </Badge>
            )}
            {ad.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          <Button asChild size="sm">
            <a href={ad.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink />
              Ad Library
            </a>
          </Button>
          <CopyButton
            value={ad.url}
            label="Copy link"
            toastMessage="Link copied"
          />
        </div>
      </div>
    </article>
  );
}
