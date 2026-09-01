import { AssetCard } from "@/components/asset-card";
import { DropHint } from "@/components/drop-hint";
import type { Asset } from "@/lib/assets";

type AssetGalleryProps = {
  title: string;
  description?: string;
  assets: Asset[];
  dir: string;
  hint?: React.ReactNode;
};

export function AssetGallery({
  title,
  description,
  assets,
  dir,
  hint,
}: AssetGalleryProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {assets.length} file{assets.length === 1 ? "" : "s"} · app/public/{dir}
        </p>
      </div>

      {assets.length === 0 ? (
        <DropHint dir={`app/public/${dir}`}>{hint}</DropHint>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {assets.map((asset) => (
            <AssetCard key={asset.href} asset={asset} />
          ))}
        </div>
      )}
    </section>
  );
}
