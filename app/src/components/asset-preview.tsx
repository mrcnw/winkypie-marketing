import Image from "next/image";
import { FileIcon, Play } from "lucide-react";

import type { Asset } from "@/lib/assets";
import { cn } from "@/lib/utils";

const UNOPTIMIZED = new Set([".svg", ".gif"]);

type AssetPreviewProps = {
  asset: Asset;
  /** `true` inside a dialog: real video controls, contained image */
  interactive?: boolean;
  /** Start a video on mount — the dialog opened because someone asked to watch it */
  autoPlay?: boolean;
  /** Drop the corner play badge where the parent draws its own play control */
  hideBadge?: boolean;
  sizes?: string;
  className?: string;
};

/** Fills its parent — the parent must be `relative` and give it a height. */
export function AssetPreview({
  asset,
  interactive = false,
  autoPlay = false,
  hideBadge = false,
  sizes = "(max-width: 768px) 50vw, 25vw",
  className,
}: AssetPreviewProps) {
  // The URL never changes when a file is replaced in place, so the browser and the image
  // optimizer would keep the old pixels. The modified time on the src busts both.
  const src = `${asset.href}?v=${Date.parse(asset.modified)}`;
  if (asset.kind === "image") {
    return (
      <Image
        src={src}
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
          src={src}
          controls={interactive}
          muted={!interactive}
          autoPlay={autoPlay}
          playsInline
          preload="metadata"
          className={cn("h-full w-full object-contain", className)}
        />
        {!interactive && !hideBadge && (
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
