import { AssetCard } from "@/components/asset-card";
import { AssetGallery } from "@/components/asset-gallery";
import { DropHint } from "@/components/drop-hint";
import { pairBeforeAfter, type Asset } from "@/lib/assets";

function Slot({ label, asset }: { label: string; asset: Asset | null }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {asset ? (
        <AssetCard asset={asset} />
      ) : (
        <div className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
          No {label.toLowerCase()} file — name it{" "}
          <code className="mx-1 font-mono">…_{label.toLowerCase()}</code>
        </div>
      )}
    </div>
  );
}

export function BeforeAfterGallery({
  assets,
  dir,
}: {
  assets: Asset[];
  dir: string;
}) {
  const { pairs, loose } = pairBeforeAfter(assets);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Before / After</h2>
          <p className="text-sm text-muted-foreground">
            Files pair on their name: <code className="font-mono">hero_1_before.png</code>{" "}
            with <code className="font-mono">hero_1_after.png</code>.
          </p>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {pairs.length} pair{pairs.length === 1 ? "" : "s"} · app/public/{dir}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card/50 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">
          Ships with the imagery, every time
        </p>
        <p className="mt-1">
          &ldquo;Demo. Your photos use your actual face and body. Results vary based on
          selfie quality, lighting, and pose.&rdquo; Stylized AI representations, not a
          filter — never imply the pair shows a different person. Men only.
        </p>
      </div>

      {pairs.length === 0 ? (
        <DropHint dir={`app/public/${dir}`} />
      ) : (
        <div className="flex flex-col gap-6">
          {pairs.map((pair) => (
            <div key={pair.key} className="flex flex-col gap-3">
              <p className="font-mono text-xs text-muted-foreground">{pair.key}</p>
              <div className="grid grid-cols-2 gap-4 sm:max-w-xl">
                <Slot label="Before" asset={pair.before} />
                <Slot label="After" asset={pair.after} />
              </div>
            </div>
          ))}
        </div>
      )}

      {loose.length > 0 && (
        <AssetGallery
          title="Unpaired"
          description="No before/after token in the file name — rename to pair them up."
          assets={loose}
          dir={dir}
        />
      )}
    </section>
  );
}
