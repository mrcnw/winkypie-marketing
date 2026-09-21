"use client";

import Image from "next/image";
import { Play } from "lucide-react";

import { AssetPreview } from "@/components/asset-preview";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Asset } from "@/lib/assets";
import type { AdCopy } from "@/lib/ad-readiness";

/**
 * The ad as Meta renders it — the same chrome the Ad Library shows, so a creative is judged
 * in the shape it will actually be seen in rather than as a file in a grid.
 *
 * Facebook's feed is light whatever our app is set to, so the colours here are literal
 * hex values, not our tokens: this block is a mock of someone else's UI, and matching it is
 * the point. A field the brief does not have renders as a gap, in words — an empty ad slot
 * is the most direct way to say what is missing.
 *
 * The media opens: a clip plays full size with sound, a still opens big enough to read the
 * bullets on it. At 380 px neither of those is a judgement anyone can actually make.
 */

const FB = {
  border: "#dadde1",
  text: "#050505",
  muted: "#65676b",
  media: "#f0f2f5",
  card: "#f7f8fa",
  button: "#e4e6eb",
  missing: "#b42318",
  missingBg: "#fef3f2",
};

function Missing({ what }: { what: string }) {
  return (
    <span
      className="inline-block rounded border border-dashed px-1.5 py-0.5 text-[13px] italic"
      style={{ borderColor: FB.missing, backgroundColor: FB.missingBg, color: FB.missing }}
    >
      no {what} yet
    </span>
  );
}

/** `https://apps.apple.com/us/app/…` → `APPS.APPLE.COM`, the way the link card prints it. */
function hostOf(url: string | null) {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "").toUpperCase();
  } catch {
    return null;
  }
}

export function MetaAdPreview({
  copy,
  asset,
  pageName = "WinkyPie",
}: {
  copy: AdCopy;
  asset: Asset | null;
  pageName?: string;
}) {
  const host = hostOf(copy.destination);

  return (
    <div
      className="w-full overflow-hidden rounded-lg border bg-white"
      style={{ borderColor: FB.border, color: FB.text }}
    >
      <div className="flex items-center gap-2 px-3 pt-3">
        <Image
          src="/logo.png"
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full"
        />
        <div className="min-w-0">
          <p className="text-[15px] font-semibold leading-tight">{pageName}</p>
          <p className="text-[13px] leading-tight" style={{ color: FB.muted }}>
            Sponsored
          </p>
        </div>
      </div>

      <div className="whitespace-pre-line px-3 py-2.5 text-[15px] leading-[1.35]">
        {copy.primaryText ?? <Missing what="primary text" />}
      </div>

      {asset ? (
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="group relative flex h-72 w-full items-center justify-center"
              style={{ backgroundColor: FB.media }}
              aria-label={`Open ${asset.name}`}
            >
              <AssetPreview asset={asset} hideBadge sizes="(max-width: 768px) 100vw, 380px" />
              {asset.kind === "video" && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-white/90 shadow-md transition-transform group-hover:scale-110">
                    <Play className="ms-0.5 size-6" style={{ fill: FB.text, color: FB.text }} />
                  </span>
                </span>
              )}
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="truncate font-mono text-sm">{asset.name}</DialogTitle>
              {asset.caption && (
                <DialogDescription className="text-left leading-relaxed">
                  {asset.caption}
                </DialogDescription>
              )}
            </DialogHeader>
            <div className="relative flex h-[60vh] items-center justify-center overflow-hidden rounded-lg bg-background/60">
              <AssetPreview
                asset={asset}
                interactive
                autoPlay={asset.kind === "video"}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div
          className="relative flex h-72 items-center justify-center"
          style={{ backgroundColor: FB.media }}
        >
          <Missing what="render" />
        </div>
      )}

      <div
        className="flex items-center gap-3 border-t px-3 py-2.5"
        style={{ backgroundColor: FB.card, borderColor: FB.border }}
      >
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wide" style={{ color: FB.muted }}>
            {host ?? "no destination"}
          </p>
          <p className="truncate text-[15px] font-semibold leading-tight">
            {copy.headline ?? <Missing what="headline" />}
          </p>
          <p className="truncate text-[13px] leading-tight" style={{ color: FB.muted }}>
            {copy.description ?? <Missing what="description" />}
          </p>
        </div>
        {copy.cta ? (
          <span
            className="shrink-0 rounded-md px-3 py-2 text-[13px] font-semibold"
            style={{ backgroundColor: FB.button }}
          >
            {copy.cta}
          </span>
        ) : (
          <Missing what="CTA" />
        )}
      </div>
    </div>
  );
}
