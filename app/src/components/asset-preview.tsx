import Image from "next/image";
import { FileIcon, Play } from "lucide-react";

import type { Asset } from "@/lib/assets";
import { cn } from "@/lib/utils";

const UNOPTIMIZED = new Set([".svg", ".gif"]);

type AssetPreviewProps = {
  asset: Asset;
  /** `true` inside a dialog: real video controls, contained image */
  interactive?: boolean;
  sizes?: string;
  className?: string;
};

/** Fills its parent — the parent must be `relative` and give it a height. */
export function AssetPreview({
  asset,
  interactive = false,
  sizes = "(max-width: 768px) 50vw, 25vw",
  className,
}: AssetPreviewProps) {
  if (asset.kind === "image") {
    return (
      <Image
        src={asset.href}
        alt={asset.label}
        fill
        sizes={sizes}
        unoptimized={UNOPTIMIZED.has(asset.ext)}
        className={cn("object-contain", className)}
      />
    );
  }

  if (asset.kind === "video") {
    return (
      <>
        <video
          src={asset.href}
          controls={interactive}
          muted={!interactive}
          playsInline
          preload="metadata"
          className={cn("h-full w-full object-contain", className)}
        />
        {!interactive && (
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-background/80 p-1.5">
            <Play className="size-3.5" />
          </span>
        )}
      </>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
      <FileIcon className="size-7" />
      <span className="text-xs uppercase">{asset.ext.replace(".", "") || "file"}</span>
    </div>
  );
}
