"use client";

import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Fragment, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toPlainText } from "@/lib/markdown";
import { PILLARS, type PillarKey, type PlannedPost } from "@/lib/pillars";
import { cn } from "@/lib/utils";

const DAY = 24 * 60 * 60 * 1000;
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** One look per pillar. The colour tokens live in globals.css — add a pillar there, then here. */
const PILLAR_LOOK: Record<PillarKey, { dot: string; chip: string }> = {
  pinned: { dot: "brand-gradient", chip: "border-border bg-secondary text-foreground" },
  result: { dot: "bg-pillar-result", chip: "border-pillar-result/40 bg-pillar-result/10" },
  education: { dot: "bg-pillar-education", chip: "border-pillar-education/40 bg-pillar-education/10" },
  card: { dot: "bg-pillar-card", chip: "border-pillar-card/40 bg-pillar-card/10" },
};
const UNKNOWN_LOOK = { dot: "bg-muted-foreground", chip: "border-border bg-card" };

const pad = (value: number) => String(value).padStart(2, "0");

/** Dates are handled in UTC on purpose: `YYYY-MM-DD` in, `YYYY-MM-DD` out, no timezone drift. */
function isoOf(ms: number) {
  const date = new Date(ms);
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

type Cell = { iso: string; day: number; month: number; inMonth: boolean };

/** Monday-first weeks from the one holding the 1st to the one holding the last day. */
function monthGrid(year: number, month: number): Cell[] {
  const first = Date.UTC(year, month, 1);
  const mondayOffset = (new Date(first).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const rows = Math.ceil((mondayOffset + daysInMonth) / 7);
  const cells: Cell[] = [];
  for (let index = 0; index < rows * 7; index += 1) {
    const ms = first + (index - mondayOffset) * DAY;
    const date = new Date(ms);
    cells.push({
      iso: isoOf(ms),
      day: date.getUTCDate(),
      month: date.getUTCMonth(),
      inMonth: date.getUTCMonth() === month,
    });
  }
  return cells;
}

/** File names keep their underscores — `toPlainText` would strip them as emphasis marks. */
function plainAsset(asset: string) {
  return asset
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/[`*]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function lookOf(post: PlannedPost) {
  return post.pillarKey ? PILLAR_LOOK[post.pillarKey] : UNKNOWN_LOOK;
}

function isPending(post: PlannedPost) {
  return /needs/i.test(post.status);
}

/** A claimed weekday with nothing decided in it — the vault leaves format, asset and line blank. */
function isEmptySlot(post: PlannedPost) {
  return !post.format.trim() && !post.asset.trim() && !post.line.trim();
}

/** What the chip and the dialog call this row. An empty slot is named by its pillar. */
function titleOf(post: PlannedPost) {
  return toPlainText(post.line) || toPlainText(post.format) || toPlainText(post.pillar);
}

/** `[[WP_IG_EDU1_firstphoto]]` anywhere in the row → the note that holds the post. */
function noteOf(post: PlannedPost) {
  const match = `${post.asset} ${post.line}`.match(/\[\[([^\]|]+)/);
  return match ? match[1].trim() : null;
}

const FIELDS = [
  { label: "Date", read: (post: PlannedPost) => post.date },
  { label: "Time", read: (post: PlannedPost) => post.time ?? "—" },
  { label: "Pillar", read: (post: PlannedPost) => toPlainText(post.pillar) },
  { label: "Format", read: (post: PlannedPost) => toPlainText(post.format) },
  { label: "Post", read: (post: PlannedPost) => noteOf(post) ?? "" },
  { label: "Asset", read: (post: PlannedPost) => plainAsset(post.asset) },
  { label: "Line", read: (post: PlannedPost) => toPlainText(post.line) },
  { label: "Status", read: (post: PlannedPost) => post.status },
] as const;

/** One post, opened from a calendar chip or a table row. The vault is still the source. */
function PostDialog({
  post,
  onClose,
}: {
  post: PlannedPost | null;
  onClose: () => void;
}) {
  const look = post ? lookOf(post) : UNKNOWN_LOOK;
  return (
    <Dialog open={post !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        {post && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-start gap-2 text-left">
                <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", look.dot)} />
                <span>{titleOf(post)}</span>
              </DialogTitle>
              <DialogDescription className="text-left">
                {isEmptySlot(post)
                  ? `An empty ${toPlainText(post.pillar)} slot. The day is claimed; the post is not decided yet.`
                  : `${toPlainText(post.pillar)} · ${post.date}`}
              </DialogDescription>
            </DialogHeader>
            <dl className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-2 text-sm">
              {FIELDS.map((field) => {
                const value = field.read(post);
                return (
                  <Fragment key={field.label}>
                    <dt className="text-muted-foreground">{field.label}</dt>
                    <dd
                      className={cn(
                        "min-w-0 break-words",
                        value ? "text-foreground" : "text-muted-foreground/60",
                        (field.label === "Asset" || field.label === "Post") &&
                          "font-mono text-[0.8rem]",
                      )}
                    >
                      {value || "not decided"}
                    </dd>
                  </Fragment>
                );
              })}
            </dl>
            {noteOf(post) && (
              <Button asChild size="sm" variant="secondary" className="self-start">
                <a href={`/instagram?tab=posts#${noteOf(post)}`}>
                  <Images />
                  Read the post — hook, slides, caption
                </a>
              </Button>
            )}
            <p className="text-xs text-muted-foreground">
              Typed in the vault, in the schedule table of{" "}
              <span className="font-mono">Posts Calendar.md</span>. The words of a written post
              live in its own note, on the Posts tab. Edit either in Obsidian; this page follows
              on refresh.
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function PostsCalendar({ posts, today }: { posts: PlannedPost[]; today: string }) {
  const [todayYear, todayMonth] = today.split("-").map(Number);
  const [view, setView] = useState({ year: todayYear, month: todayMonth - 1 });
  const [open, setOpen] = useState<PlannedPost | null>(null);

  const byDate = useMemo(() => {
    const map = new Map<string, PlannedPost[]>();
    for (const post of posts) {
      const bucket = map.get(post.date) ?? [];
      bucket.push(post);
      map.set(post.date, bucket);
    }
    return map;
  }, [posts]);

  const cells = monthGrid(view.year, view.month);
  const prefix = `${view.year}-${pad(view.month + 1)}`;
  const monthPosts = posts.filter((post) => post.date.startsWith(prefix));

  function shift(delta: number) {
    setView(({ year, month }) => {
      const date = new Date(Date.UTC(year, month + delta, 1));
      return { year: date.getUTCFullYear(), month: date.getUTCMonth() };
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          {MONTHS[view.month]} {view.year}
        </h3>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Previous month"
            onClick={() => shift(-1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setView({ year: todayYear, month: todayMonth - 1 })}
          >
            Today
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Next month"
            onClick={() => shift(1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[46rem] overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-7 border-b border-border bg-card">
            {WEEKDAYS.map((weekday) => (
              <div
                key={weekday}
                className="py-2 text-center text-[0.65rem] uppercase tracking-wide text-muted-foreground"
              >
                {weekday}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((cell, index) => {
              const isToday = cell.iso === today;
              const dayPosts = byDate.get(cell.iso) ?? [];
              return (
                <div
                  key={cell.iso}
                  className={cn(
                    "flex min-h-28 flex-col gap-1 border-border/60 p-1.5",
                    index % 7 !== 6 && "border-r",
                    index < cells.length - 7 && "border-b",
                    !cell.inMonth && "bg-background/50",
                    isToday && "bg-secondary/40",
                  )}
                >
                  <div className="flex items-center justify-end gap-1.5 text-xs">
                    {isToday && <span className="brand-gradient size-2 rounded-full" aria-label="Today" />}
                    <span
                      className={cn(
                        "font-mono",
                        cell.inMonth ? "text-foreground/80" : "text-muted-foreground/60",
                        isToday && "font-semibold text-foreground",
                      )}
                    >
                      {cell.day === 1 ? `${MONTHS[cell.month].slice(0, 3)} 1` : cell.day}
                    </span>
                  </div>
                  {dayPosts.map((post, postIndex) => {
                    const look = lookOf(post);
                    const line = toPlainText(post.line);
                    const empty = isEmptySlot(post);
                    return (
                      <button
                        key={postIndex}
                        type="button"
                        onClick={() => setOpen(post)}
                        title={`${post.time ? `${post.time} · ` : ""}${toPlainText(post.pillar)}\n${line || "Nothing decided yet"}\n${post.status}`}
                        className={cn(
                          "flex w-full items-start gap-1.5 rounded-md border px-1.5 py-1 text-left text-[0.7rem] leading-snug",
                          "transition-colors hover:brightness-125 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                          look.chip,
                          isPending(post) && "border-dashed opacity-80",
                        )}
                      >
                        <span className={cn("mt-1 size-1.5 shrink-0 rounded-full", look.dot)} />
                        <span className="line-clamp-2 min-w-0">
                          {post.time && (
                            <span className="font-mono text-muted-foreground">{post.time} · </span>
                          )}
                          <span className={cn("font-medium", empty && "text-muted-foreground")}>
                            {empty ? toPlainText(post.pillar) : toPlainText(post.format)}
                          </span>
                          {empty ? (
                            <span className="text-muted-foreground"> · empty slot</span>
                          ) : (
                            line && <> · {line}</>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        {PILLARS.map((pillar) => {
          const count = posts.filter((post) => post.pillarKey === pillar.key).length;
          return (
            <li key={pillar.key} className="flex items-center gap-1.5">
              <span className={cn("size-2 rounded-full", PILLAR_LOOK[pillar.key].dot)} />
              {pillar.label}
              <span className="font-mono text-[0.65rem]">{count}</span>
            </li>
          );
        })}
        <li className="flex items-center gap-1.5">
          <span className="size-2 rounded-full border border-dashed border-muted-foreground" />
          needs asset · needs post
        </li>
      </ul>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-card">
              {["Date", "Time", "Pillar", "Format", "Post", "Asset", "Line", "Status"].map((header) => (
                <th key={header} className="px-3 py-2 font-medium text-foreground">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthPosts.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-4 text-muted-foreground">
                  Nothing planned in {MONTHS[view.month]} {view.year} — add rows to the schedule
                  table in the vault.
                </td>
              </tr>
            ) : (
              monthPosts.map((post, index) => {
                const look = lookOf(post);
                return (
                  <tr
                    key={index}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open ${titleOf(post)}`}
                    onClick={() => setOpen(post)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setOpen(post);
                      }
                    }}
                    className={cn(
                      "cursor-pointer border-b border-border/50 align-top last:border-b-0",
                      "hover:bg-secondary/60 focus-visible:bg-secondary/60 focus-visible:outline-none",
                      post.date === today && "bg-secondary/40",
                    )}
                  >
                    <td className="whitespace-nowrap px-3 py-2 font-mono">{post.date}</td>
                    <td className="whitespace-nowrap px-3 py-2 font-mono text-muted-foreground">
                      {post.time ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2">
                      <span className="inline-flex items-center gap-1.5">
                        <span className={cn("size-1.5 rounded-full", look.dot)} />
                        {toPlainText(post.pillar)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2">
                      {toPlainText(post.format) || (
                        <span className="text-muted-foreground/60">empty slot</span>
                      )}
                    </td>
                    <td className="px-3 py-2 font-mono text-[0.7rem]">
                      {noteOf(post) ?? <span className="text-muted-foreground/60">—</span>}
                    </td>
                    <td className="px-3 py-2 font-mono text-[0.7rem] text-muted-foreground">
                      {plainAsset(post.asset)}
                    </td>
                    <td className="px-3 py-2">{toPlainText(post.line)}</td>
                    <td
                      className={cn(
                        "whitespace-nowrap px-3 py-2 font-mono",
                        isPending(post) ? "text-muted-foreground" : "text-foreground/80",
                      )}
                    >
                      {post.status}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <PostDialog post={open} onClose={() => setOpen(null)} />
    </div>
  );
}
