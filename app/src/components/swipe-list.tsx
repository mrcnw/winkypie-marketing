import { AdCard } from "@/components/ad-card";
import { DropHint } from "@/components/drop-hint";
import { ErrorNote } from "@/components/error-note";
import type { AdSwipe, SwipeSource } from "@/lib/meta-ads";

const EXAMPLE = `[
  {
    "slug": "gio-upload-a-photo-hook",
    "title": "Screen demo — one photo, result in frame",
    "advertiser": "Page name as it appears in the library",
    "url": "https://www.facebook.com/ads/library/?id=1101597932224599",
    "note": "Why it works — the mechanism, not 'nice video'.",
    "tags": ["screen-demo", "P2"],
    "added": "2026-09-01",
    "rank": 1
  }
]`;

export function SwipeList({
  source,
  ads,
  error,
}: {
  source: SwipeSource;
  ads: AdSwipe[];
  error: string | null;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="max-w-2xl text-sm text-muted-foreground">{source.blurb}</p>
        <p className="font-mono text-xs text-muted-foreground">
          {ads.length} saved · {source.repoFile}
        </p>
      </div>

      {error && <ErrorNote message={error} />}

      {ads.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <AdCard key={ad.slug} ad={ad} />
          ))}
        </div>
      ) : (
        <DropHint dir={source.repoFile} verb="Paste an Ad Library link into">
          <p>
            Then run <code className="font-mono text-foreground">npm run shot</code> for the
            thumbnail.
          </p>
        </DropHint>
      )}

      <section className="flex flex-col gap-3 rounded-xl border border-border bg-card/50 p-6">
        <h2 className="text-sm font-semibold">Adding a link</h2>
        <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-sm text-muted-foreground">
          <li>
            Paste the Ad Library URL as a new entry in{" "}
            <code className="font-mono text-foreground">{source.repoFile}</code>. Only{" "}
            <code className="font-mono text-foreground">slug</code> and{" "}
            <code className="font-mono text-foreground">url</code> are required.
          </li>
          <li>
            Thumbnail: run <code className="font-mono text-foreground">npm run shot</code>. It
            opens every entry without a preview in headless Chrome and saves the page to{" "}
            <code className="font-mono text-foreground">
              app/public/{source.assetDir}/&lt;slug&gt;.png
            </code>
            .
          </li>
          <li>
            Or drop your own screenshot or screen recording in there, named{" "}
            <code className="font-mono text-foreground">&lt;slug&gt;.png</code> — or a folder{" "}
            <code className="font-mono text-foreground">&lt;slug&gt;/</code> for several.
          </li>
        </ol>
        <pre className="overflow-x-auto rounded-lg bg-background/70 p-4 font-mono text-xs text-muted-foreground">
          {EXAMPLE}
        </pre>
        <p className="text-xs text-muted-foreground">
          A library screenshot is someone else&rsquo;s creative — reference for us, not
          material to republish.
        </p>
      </section>
    </div>
  );
}
