import type { Metadata } from "next";
import { AlertTriangle, ArrowUpRight, AtSign } from "lucide-react";

import { CopyBlock } from "@/components/copy-block";
import { Inline, Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  cardTable,
  instagramHandle,
  NOTE_PATH,
  readInstagramAudit,
  STEPS_HEADING,
} from "@/lib/instagram";
import { toPlainText, type MdBlock, type MdTable } from "@/lib/markdown";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Instagram",
};

/** A three-column vault table as one card per row: the field, then a column per header. */
function RowCards({ table }: { table: MdTable }) {
  const [, ...columns] = table.headers;
  return (
    <ul className="flex flex-col gap-3">
      {table.rows.map((row, index) => (
        <li
          key={index}
          className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-[9rem_minmax(0,1fr)]"
        >
          <p className="text-sm font-medium leading-snug">
            <Inline text={row[0] ?? ""} />
          </p>
          <div className={cn("grid gap-4", columns.length > 1 && "md:grid-cols-2")}>
            {columns.map((header, column) => (
              <div key={column} className="flex min-w-0 flex-col gap-1">
                <span className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                  <Inline text={header} />
                </span>
                <p
                  className={cn(
                    "text-sm leading-relaxed",
                    column === 0 ? "text-foreground/90" : "text-muted-foreground",
                  )}
                >
                  <Inline text={row[column + 1] ?? ""} />
                </p>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

type BioItem =
  | { kind: "copy"; title: string; description: string | null; text: string }
  | { kind: "md"; block: MdBlock };

/** Each code fence under `## New bio` becomes a copy block titled by the line before it. */
function bioItems(blocks: MdBlock[]): BioItem[] {
  const items: BioItem[] = [];
  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    const next = blocks[index + 1];

    if (block.kind === "paragraph" && next?.kind === "code") {
      const plain = toPlainText(block.text);
      const cut = plain.search(/[(:]/);
      const title = (cut > 0 ? plain.slice(0, cut) : plain).trim();
      const description =
        cut > 0
          ? plain
              .slice(cut + 1)
              .replace(/\)\.?/, ".")
              .replace(/[:.]\s*$/, "")
              .trim()
          : "";
      items.push({ kind: "copy", title, description: description || null, text: next.text });
      index += 1;
      continue;
    }

    if (block.kind === "code") {
      items.push({ kind: "copy", title: "Paste as-is", description: null, text: block.text });
      continue;
    }

    items.push({ kind: "md", block });
  }
  return items;
}

export default async function InstagramPage() {
  const audit = await readInstagramAudit();

  if (!audit) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Instagram</h1>
        <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p>
            Could not read <code className="font-mono">{NOTE_PATH}</code>. This page reads the
            vault directly, so it only works with the repo checked out next to{" "}
            <code className="font-mono">app/</code>.
          </p>
        </div>
      </main>
    );
  }

  const ours = instagramHandle(audit.profile);
  const theirs = instagramHandle(audit.reference);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-10">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {audit.status && <Badge variant="outline">{audit.status}</Badge>}
          {audit.updated && (
            <Badge variant="secondary" className="font-mono text-[0.7rem]">
              audited {audit.updated}
            </Badge>
          )}
        </div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Instagram{ours ? ` — ${ours}` : ""}
        </h1>
        <div className="max-w-3xl">
          <Markdown blocks={audit.lede} />
        </div>
        <div className="flex flex-wrap gap-2">
          {audit.profile && (
            <Button asChild size="sm" variant="secondary">
              <a href={audit.profile} target="_blank" rel="noopener noreferrer">
                <AtSign />
                {ours ?? "Our profile"}
                <ArrowUpRight />
              </a>
            </Button>
          )}
          {audit.reference && (
            <Button asChild size="sm" variant="outline">
              <a href={audit.reference} target="_blank" rel="noopener noreferrer">
                Modelled on {theirs ?? "the reference account"}
                <ArrowUpRight />
              </a>
            </Button>
          )}
        </div>
      </header>

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Do this, in order
          </h2>
          <p className="font-mono text-xs text-muted-foreground">
            {audit.steps.length} fix{audit.steps.length === 1 ? "" : "es"} · ticked in{" "}
            <code>07 TODO.md</code>, never here
          </p>
        </div>
        {audit.steps.length > 0 ? (
          <ol className="grid gap-3 md:grid-cols-2">
            {audit.steps.map((step, index) => (
              <li key={index} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                <span className="brand-gradient-text shrink-0 font-heading text-lg font-semibold leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed">
                  <Inline text={step} />
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-muted-foreground">
            The note has no <code className="font-mono">## {STEPS_HEADING}, in order</code> list
            yet — write one in the vault and it appears here.
          </p>
        )}
      </section>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="flex flex-col gap-10">
          {audit.sections.map((section) => {
            // The card table stays where the note put it; the blocks around it keep their order.
            const table = cardTable(section);
            const at = table
              ? section.blocks.findIndex((block) => block.kind === "table" && block.table === table)
              : -1;
            const before = at >= 0 ? section.blocks.slice(0, at) : section.blocks;
            const after = at >= 0 ? section.blocks.slice(at + 1) : [];
            return (
              <section key={section.heading} className="flex flex-col gap-4">
                <h2 className="font-heading text-xl font-semibold tracking-tight">
                  <Inline text={section.heading} />
                </h2>
                {before.length > 0 && <Markdown blocks={before} />}
                {table && <RowCards table={table} />}
                {after.length > 0 && <Markdown blocks={after} />}
              </section>
            );
          })}
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-xs uppercase tracking-wide text-muted-foreground">
            New bio — paste as-is
          </h2>
          {audit.bio.length > 0 ? (
            bioItems(audit.bio).map((item, index) =>
              item.kind === "copy" ? (
                <CopyBlock
                  key={index}
                  title={item.title}
                  description={item.description ?? undefined}
                  text={item.text}
                  copyLabel="Copy"
                  toastMessage={`${item.title} copied`}
                />
              ) : (
                <Markdown key={index} blocks={[item.block]} />
              ),
            )
          ) : (
            <p className="text-sm text-muted-foreground">
              No <code className="font-mono">## New bio</code> section in the note yet.
            </p>
          )}
          <footer className="flex flex-col gap-1 border-t border-border/60 pt-3 text-xs text-muted-foreground">
            <code className="break-all font-mono text-[0.7rem]">{audit.repoPath}</code>
            <span>Edit the note in Obsidian; this page follows on refresh.</span>
          </footer>
        </aside>
      </div>
    </main>
  );
}
