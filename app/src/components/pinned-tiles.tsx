import { AssetPreview } from "@/components/asset-preview";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { DropHint } from "@/components/drop-hint";
import type { Asset } from "@/lib/assets";
import { formatBytes } from "@/lib/format";

/**
 * The three tiles pinned above the fold, in file order, each with the caption that is pasted
 * under it. What to pin and in which order is written in the vault; this only shows the files.
 */
export function PinnedTiles({ assets, dir }: { assets: Asset[]; dir: string }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">Pinned tiles</h2>
          <p className="text-sm text-muted-foreground">
            The pitch above the fold — one tile per step of the flow, in the order the app runs
            it. The caption beside each is pasted as-is; the order to pin them is in the note.
          </p>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {assets.length} tile{assets.length === 1 ? "" : "s"} · app/public/{dir}
        </p>
      </div>

      {assets.length === 0 ? (
        <DropHint dir={`app/public/${dir}`}>
          <p>
            A 4:5 PNG per tile, plus a <code className="font-mono">.txt</code> with the same stem
            for its caption.
          </p>
        </DropHint>
      ) : (
        <ol className="grid gap-4 md:grid-cols-3">
          {assets.map((asset, index) => (
            <li
              key={asset.href}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="relative aspect-[4/5] w-full bg-background/60">
                <AssetPreview asset={asset} sizes="(max-width: 768px) 100vw, 33vw" />
                <span className="brand-gradient-text absolute left-3 top-2 font-heading text-lg font-semibold leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <DownloadButton href={asset.href} fileName={asset.name} />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex flex-col gap-0.5">
                  <span className="truncate font-mono text-xs">{asset.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {asset.width && asset.height ? `${asset.width}×${asset.height} · ` : ""}
                    {formatBytes(asset.size)} · {asset.ext.replace(".", "").toUpperCase()}
                  </span>
                </div>
                {asset.caption ? (
                  <>
                    <pre className="whitespace-pre-wrap rounded-lg bg-background/70 p-3 font-sans text-xs leading-relaxed text-muted-foreground">
                      {asset.caption}
                    </pre>
                    <div className="mt-auto flex justify-end">
                      <CopyButton
                        value={asset.caption}
                        label="Copy caption"
                        toastMessage="Caption copied"
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    No caption yet — add{" "}
                    <code className="font-mono">{asset.name.replace(/\.[^.]+$/, ".txt")}</code>{" "}
                    beside the file.
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
