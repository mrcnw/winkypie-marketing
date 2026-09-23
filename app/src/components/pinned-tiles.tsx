import { Check, TriangleAlert } from "lucide-react";

import { AssetPreview } from "@/components/asset-preview";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { DropHint } from "@/components/drop-hint";
import type { UploadPair } from "@/lib/assets";
import { formatBytes } from "@/lib/format";

/** The export command that fills `upload/`, quoted on the card when a tile has no export. */
const EXPORT_COMMAND = "npm run ig";

/**
 * The three tiles pinned above the fold, in file order, each with the caption that is pasted
 * under it. What to pin and in which order is written in the vault; this only shows the files.
 *
 * The preview is the master, the download is the export — Instagram re-encodes anything wider
 * than its own 1080 px, so the master is the archive and `upload/` is what actually gets
 * posted. A tile with no export says so rather than quietly handing over the wrong file.
 */
export function PinnedTiles({ tiles, dir }: { tiles: UploadPair[]; dir: string }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">Pinned tiles</h2>
          <p className="text-sm text-muted-foreground">
            The pitch above the fold — one tile per step of the flow, in the order the app runs
            it. The caption beside each is pasted as-is; the order to pin them is in the note.
            The download button hands over the upload file, not the master.
          </p>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {tiles.length} tile{tiles.length === 1 ? "" : "s"} · app/public/{dir}
        </p>
      </div>

      {tiles.length === 0 ? (
        <DropHint dir={`app/public/${dir}`}>
          <p>
            A 4:5 PNG per tile, plus a <code className="font-mono">.txt</code> with the same stem
            for its caption. Then <code className="font-mono">{EXPORT_COMMAND}</code> to write
            the upload file.
          </p>
        </DropHint>
      ) : (
        <ol className="grid gap-4 md:grid-cols-3">
          {tiles.map(({ master, upload }, index) => (
            <li
              key={master.href}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="relative aspect-[4/5] w-full bg-background/60">
                <AssetPreview asset={master} sizes="(max-width: 768px) 100vw, 33vw" />
                <span className="brand-gradient-text absolute left-3 top-2 font-heading text-lg font-semibold leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <DownloadButton
                  href={(upload ?? master).href}
                  fileName={(upload ?? master).name}
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex flex-col gap-0.5">
                  <span className="truncate font-mono text-xs">{(upload ?? master).name}</span>
                  {upload ? (
                    <>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Check className="size-3.5 shrink-0" />
                        {upload.width && upload.height
                          ? `${upload.width}×${upload.height} · `
                          : ""}
                        {formatBytes(upload.size)} ·{" "}
                        {upload.ext.replace(".", "").toUpperCase()} — ready to upload
                      </span>
                      <span className="text-xs text-muted-foreground/70">
                        master {master.width}×{master.height}{" "}
                        {master.ext.replace(".", "").toUpperCase()}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs text-muted-foreground">
                        {master.width && master.height
                          ? `${master.width}×${master.height} · `
                          : ""}
                        {formatBytes(master.size)} ·{" "}
                        {master.ext.replace(".", "").toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-destructive">
                        <TriangleAlert className="size-3.5 shrink-0" />
                        No upload file — run{" "}
                        <code className="font-mono">{EXPORT_COMMAND}</code>
                      </span>
                    </>
                  )}
                </div>
                {master.caption ? (
                  <>
                    <pre className="whitespace-pre-wrap rounded-lg bg-background/70 p-3 font-sans text-xs leading-relaxed text-muted-foreground">
                      {master.caption}
                    </pre>
                    <div className="mt-auto flex justify-end">
                      <CopyButton
                        value={master.caption}
                        label="Copy caption"
                        toastMessage="Caption copied"
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    No caption yet — add{" "}
                    <code className="font-mono">{master.name.replace(/\.[^.]+$/, ".txt")}</code>{" "}
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
