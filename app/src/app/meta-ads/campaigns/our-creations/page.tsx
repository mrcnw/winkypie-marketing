import type { Metadata } from "next";

import { AssetGallery } from "@/components/asset-gallery";
import { CreativeLane } from "@/components/creative-lane";
import { ASSET_DIRS, readAssets } from "@/lib/assets";
import { creatives } from "@/lib/meta-ads-data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Our creations · Meta Ads" };

export default async function OurCreationsPage() {
  const [all, statics] = await Promise.all([
    creatives(),
    readAssets(`${ASSET_DIRS.creatives}/static`),
  ]);

  const videos = all.filter((creative) => creative.format === "video");
  const stills = all.filter((creative) => creative.format === "static");
  const readyCount = all.filter((creative) => creative.ready).length;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="max-w-2xl text-sm text-muted-foreground">
          One card per creative, drawn the way Meta will draw it, with the preflight beside it.
          A file is not cleared to run by being here: every check has to reach{" "}
          <span className="text-ok">APPROVED</span> or N/A first, and the sign-off is written
          in the brief&rsquo;s <code className="font-mono text-foreground">approved:</code>{" "}
          list — never in this app.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          {readyCount}/{all.length} ready · {statics.length} files
        </p>
      </div>

      <CreativeLane
        title="Video"
        description="Anything that moves — a talking head, a screen demo, a silent motion static. Meta autoplays it muted, so the captions carry the read and the hook has to land in 1.5 s."
        creatives={videos}
      />
      <CreativeLane
        title="Static"
        description="Design-only pieces: one frame, no sound. Before/after framing needs the §11.2 disclosure on frame."
        creatives={stills}
      />

      <details className="rounded-xl border border-border/60 p-4">
        <summary className="cursor-pointer text-sm text-muted-foreground">
          Every file, as files
        </summary>
        <div className="pt-4">
          <AssetGallery
            title="Static"
            description="The raw exports behind the cards above."
            assets={statics}
            dir={`${ASSET_DIRS.creatives}/static`}
          />
        </div>
      </details>
    </div>
  );
}
