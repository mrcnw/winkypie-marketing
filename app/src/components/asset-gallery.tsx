import { AssetCard } from "@/components/asset-card";
import { DropHint } from "@/components/drop-hint";
import type { Asset } from "@/lib/assets";

/** Root-level files first, then one entry per sub-folder, alphabetically. */
function groupsOf(assets: Asset[]): [string, Asset[]][] {
  const groups = new Map<string, Asset[]>();
  for (const asset of assets) {
    const bucket = groups.get(asset.group) ?? [];
    bucket.push(asset);
    groups.set(asset.group, bucket);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b, "en"));
}

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
        // A sub-folder is a set — App Store slots are not the same thing as
        // in-app captures, so they get their own heading rather than one grid.
        groupsOf(assets).map(([group, groupAssets]) => (
          <div key={group} className="flex flex-col gap-3">
            {group && (
              <h3 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                {group} · {groupAssets.length}
              </h3>
            )}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {groupAssets.map((asset) => (
                <AssetCard key={asset.href} asset={asset} />
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
