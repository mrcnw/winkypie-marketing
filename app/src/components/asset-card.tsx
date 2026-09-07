"use client";

import { Download, ExternalLink } from "lucide-react";

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
import type { Asset } from "@/lib/assets";
import { formatBytes, formatDate } from "@/lib/format";

export function AssetCard({ asset }: { asset: Asset }) {
  return (
    <Dialog>
      <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/25">
        <DialogTrigger asChild>
          <button type="button" className="flex flex-col text-left">
            <span className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-background/60">
              <AssetPreview asset={asset} />
            </span>
            <span className="flex flex-col gap-1 border-t border-border/60 p-3">
              <span className="truncate text-sm font-medium">{asset.name}</span>
              <span className="text-xs text-muted-foreground">
                {asset.width && asset.height ? `${asset.width}×${asset.height} · ` : ""}
                {formatBytes(asset.size)} ·{" "}
                {asset.ext.replace(".", "").toUpperCase()}
              </span>
              {asset.caption && (
                <span className="line-clamp-3 text-xs italic leading-snug text-muted-foreground">
                  {asset.caption}
                </span>
              )}
            </span>
          </button>
        </DialogTrigger>
        <DownloadButton href={asset.href} fileName={asset.name} />
      </div>

      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="truncate">{asset.name}</DialogTitle>
          <DialogDescription>
            {asset.width && asset.height ? `${asset.width}×${asset.height} · ` : ""}
            {formatBytes(asset.size)} ·{" "}
            {asset.ext.replace(".", "").toUpperCase()} · added{" "}
            {formatDate(asset.modified)}
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex h-[55vh] items-center justify-center overflow-hidden rounded-lg bg-background/60">
          <AssetPreview
            asset={asset}
            interactive
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {asset.caption && (
          <p className="rounded-lg border border-border/60 bg-background/60 p-3 text-sm leading-relaxed">
            <span className="me-2 font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground">
              Caption
            </span>
            {asset.caption}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="font-mono text-[0.7rem]">
            {asset.repoPath}
          </Badge>
          <div className="ms-auto flex flex-wrap gap-2">
            <CopyButton value={asset.repoPath} />
            <Button asChild variant="secondary" size="sm">
              <a href={asset.href} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                Open
              </a>
            </Button>
            <Button asChild size="sm">
              <a href={asset.href} download={asset.name}>
                <Download />
                Download
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
