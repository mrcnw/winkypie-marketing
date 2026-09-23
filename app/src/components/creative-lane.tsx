import { CreativeCard } from "@/components/creative-card";
import type { Creative } from "@/lib/ad-readiness";

export function CreativeLane({
  title,
  description,
  creatives,
}: {
  title: string;
  description: string;
  creatives: Creative[];
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {creatives.length} creative{creatives.length === 1 ? "" : "s"}
        </p>
      </div>
      {creatives.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          Nothing in this lane yet.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {creatives.map((creative) => (
            <CreativeCard key={creative.campaign} creative={creative} />
          ))}
        </div>
      )}
    </section>
  );
}
