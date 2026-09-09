"use client";

import { Fragment, useMemo, useState } from "react";
import Image from "next/image";

import { Inline, Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AdTeardown, TeardownFact } from "@/lib/ad-teardowns";
import type { MdTable } from "@/lib/markdown";

/**
 * Ad analyzer — the grid of torn-down ads, and the box that starts a new one.
 *
 * The box does not run anything: a page cannot call Claude. It turns a pasted ad URL into the
 * prompt that does the work, with a copy button, and says so on the label. The analysis itself
 * writes a note into the swipe folder, and this tab reads whatever is there.
 */

function promptFor(url: string, dir: string) {
  return [
    `Analyse this ad for the swipe file: ${url}`,
    "",
    "Download it, detect the cut points, transcribe it with word-level timings, and measure the",
    "mix — level per section, whether music ducks under the voice, and the tempo. Capture one",
    "frame per second.",
    "",
    `Write the teardown into ${dir}/ with the usual sections: Facts, Structure (the`,
    "shot table: time, what is on screen, register), Mechanism, Transcript, Mix, and Our version",
    "— the same shape rewritten for WinkyPie, with the script and the list of assets I have to",
    "upload. Drop the frames in app/public/assets/winkypie/teardowns/<note slug>/.",
    "",
    "Hold the guardrails: men only, no invented proof, AI disclosed, nothing about the viewer's",
    "dating status, and the hook has to land inside the first 3 seconds.",
  ].join("\n");
}

function Facts({ facts }: { facts: TeardownFact[] }) {
  return (
    <dl className="grid grid-cols-[minmax(7rem,11rem)_minmax(0,1fr)] gap-x-4 gap-y-2 text-sm">
      {facts.map((fact) => (
        <Fragment key={fact.field}>
          <dt className="text-muted-foreground">{fact.field}</dt>
          <dd className="min-w-0 break-words">
            <Inline text={fact.value} />
          </dd>
        </Fragment>
      ))}
    </dl>
  );
}

function MdTableView({ table }: { table: MdTable }) {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            {table.headers.map((h, i) => (
              <TableHead key={i} className="align-bottom whitespace-normal">
                <Inline text={h} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell
                  key={j}
                  className={
                    j === 0
                      ? "align-top whitespace-nowrap tabular-nums text-muted-foreground"
                      : "align-top break-words whitespace-normal"
                  }
                >
                  <Inline text={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}

function FrameStrip({ frames, title }: { frames: string[]; title: string }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {frames.map((src, i) => (
        <figure key={src} className="shrink-0">
          <Image
            src={src}
            alt={`${title} — second ${i}`}
            width={120}
            height={213}
            className="h-[213px] w-[120px] rounded-md border border-border object-cover"
            unoptimized
          />
          <figcaption className="pt-1 text-center text-[10px] text-muted-foreground">
            {i}s
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function Detail({ teardown, dir }: { teardown: AdTeardown; dir: string }) {
  const t = teardown;
  return (
    <div className="flex flex-col gap-6">
      {t.lede.length > 0 && <Markdown blocks={t.lede} />}

      {t.frames.length > 0 && (
        <Section title="Second by second">
          <FrameStrip frames={t.frames} title={t.title} />
        </Section>
      )}

      {t.facts.length > 0 && (
        <Section title="Facts">
          <Facts facts={t.facts} />
        </Section>
      )}

      {t.shots && (
        <Section title="Shot list">
          <MdTableView table={t.shots} />
        </Section>
      )}

      {t.transcript.length > 0 && (
        <Section title="Transcript">
          <Markdown blocks={t.transcript} />
        </Section>
      )}

      {t.mix.length > 0 && (
        <Section title="Mix">
          <Markdown blocks={t.mix} />
        </Section>
      )}

      {t.mechanism.length > 0 && (
        <Section title="Mechanism">
          <Markdown blocks={t.mechanism} />
        </Section>
      )}

      {t.ours.length > 0 && (
        <Section title="Our version">
          <Markdown blocks={t.ours} />
        </Section>
      )}

      {t.rest.map((section) => (
        <Section key={section.heading} title={section.heading}>
          <Markdown blocks={section.blocks} />
        </Section>
      ))}

      <p className="border-t border-border pt-3 text-xs text-muted-foreground">
        Written in the vault at{" "}
        <code className="font-mono">
          {dir}/{t.slug}.md
        </code>
        . Edit it there — this page only reads it.
      </p>
    </div>
  );
}

export function AdTeardowns({ teardowns, dir }: { teardowns: AdTeardown[]; dir: string }) {
  const [url, setUrl] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const open = useMemo(
    () => teardowns.find((t) => t.slug === openSlug) ?? null,
    [teardowns, openSlug],
  );

  const trimmed = url.trim();
  const looksLikeUrl = /^https?:\/\/\S+$/i.test(trimmed);

  async function copy() {
    try {
      await navigator.clipboard.writeText(promptFor(trimmed, dir));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3 rounded-xl border border-border bg-card/50 p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold">Tear down a new ad</h2>
          <p className="text-sm text-muted-foreground">
            Paste the ad&rsquo;s link. This box does not run the analysis — a page cannot call
            Claude. It writes the prompt that does; copy it into Claude Code and the teardown
            lands in the swipe folder, then shows up in the grid below.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.instagram.com/p/… or https://www.facebook.com/reel/…"
            className="font-mono text-sm"
            aria-label="Ad URL"
          />
          <Button onClick={copy} disabled={!looksLikeUrl} className="sm:w-44">
            {copied ? "Copied" : "Copy the prompt"}
          </Button>
        </div>
        {trimmed && !looksLikeUrl && (
          <p className="text-xs text-muted-foreground">
            That is not a link yet — paste the whole URL, protocol included.
          </p>
        )}
      </section>

      {teardowns.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nothing torn down yet. Paste a link above, run the prompt, and the note it writes into{" "}
          <code className="font-mono">{dir}/</code> appears here.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teardowns.map((t) => (
            <Card
              key={t.slug}
              role="button"
              tabIndex={0}
              onClick={() => setOpenSlug(t.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenSlug(t.slug);
                }
              }}
              className="cursor-pointer transition-colors hover:border-foreground/30 focus-visible:border-foreground/50 focus-visible:outline-none"
            >
              <CardHeader>
                <CardTitle className="text-base leading-snug">
                  <Inline text={t.title} />
                </CardTitle>
                {t.account && (
                  <CardDescription>
                    <Inline text={t.account} />
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {t.frames.length > 0 && (
                  <Image
                    src={t.frames[0]}
                    alt={t.title}
                    width={160}
                    height={284}
                    className="h-40 w-auto rounded-md border border-border object-cover"
                    unoptimized
                  />
                )}
                <div className="flex flex-wrap gap-1.5">
                  {t.posted && <Badge variant="secondary">{t.posted}</Badge>}
                  {t.shots && <Badge variant="outline">{t.shots.rows.length} shots</Badge>}
                  {t.transcript.length > 0 && <Badge variant="outline">transcript</Badge>}
                  {t.mix.length > 0 && <Badge variant="outline">mix</Badge>}
                  {t.ours.length > 0 && <Badge>our version</Badge>}
                </div>
                {t.file && (
                  <p className="text-xs text-muted-foreground">
                    <Inline text={t.file} />
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpenSlug(null)}>
        <DialogContent className="flex h-[94vh] w-[96vw] flex-col gap-4 overflow-hidden sm:max-w-none">
          {open && (
            <>
              <DialogHeader className="shrink-0 pr-10 text-left">
                <DialogTitle>
                  <Inline text={open.title} />
                </DialogTitle>
                <DialogDescription>
                  {open.link ? (
                    <a
                      href={open.link}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4"
                    >
                      Open the original ad
                    </a>
                  ) : (
                    "No link recorded in the note's Facts table."
                  )}
                </DialogDescription>
              </DialogHeader>
              {/* only the body scrolls — the title and the link stay in view */}
              <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto pr-2">
                <div className="mx-auto max-w-5xl">
                  <Detail teardown={open} dir={dir} />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
