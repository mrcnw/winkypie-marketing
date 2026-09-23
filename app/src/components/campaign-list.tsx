import { CampaignCard } from "@/components/campaign-card";
import { DropHint } from "@/components/drop-hint";
import { ErrorNote } from "@/components/error-note";
import { BRIEFS_DIR, type CampaignsData } from "@/lib/campaigns";

export function CampaignList({ data }: { data: CampaignsData }) {
  const roundOne = data.briefs.filter((brief) => !brief.isCandidate);
  const candidates = data.briefs.filter((brief) => brief.isCandidate);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="max-w-2xl text-sm text-muted-foreground">
          The step-03 briefs as written in the vault: the hook, the one variable each ad
          tests, the primary text, and the saved Good Ads it was modelled on. Open a card for
          the whole brief and the steps to produce it. Edit the brief in Obsidian; this view
          follows on refresh.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          {roundOne.length} in round one
          {candidates.length ? ` · ${candidates.length} candidate` : ""} · {BRIEFS_DIR}
        </p>
      </div>

      {data.error && <ErrorNote message={data.error} />}

      {roundOne.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2">
          {roundOne.map((brief) => (
            <CampaignCard key={brief.repoPath} brief={brief} />
          ))}
        </div>
      )}

      {candidates.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold">Candidates — not in round one</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {candidates.map((brief) => (
              <CampaignCard key={brief.repoPath} brief={brief} />
            ))}
          </div>
        </section>
      )}

      {!data.briefs.length && !data.error && (
        <DropHint dir={BRIEFS_DIR} verb="Write a brief into">
          <p>
            Frontmatter <code className="font-mono text-foreground">order</code>,{" "}
            <code className="font-mono text-foreground">modelled_on</code> and a{" "}
            <code className="font-mono text-foreground">## Hook</code> blockquote are what this
            view reads.
          </p>
        </DropHint>
      )}
    </div>
  );
}
