import { promises as fs } from "node:fs";
import path from "node:path";

import {
  findSection,
  firstTable,
  parseBlocks,
  parseSections,
  splitFrontmatter,
  type MdBlock,
  type MdSection,
} from "@/lib/markdown";
import { pillarKeyOf, type PlannedPost } from "@/lib/pillars";

/**
 * The Posts calendar tab reads one note from the vault — the posting plan step 07 keeps beside
 * the profile audit. `## Schedule` holds one table, one row per post, `Date` as `YYYY-MM-DD`, `Time` optional;
 * every other `## ` section renders in document order. The vault decides what goes up and
 * when; the app lays the rows on a month grid and marks today. A row's `Status` is typed in
 * the vault, never here.
 */
export const CALENDAR_NOTE_PATH =
  "brain/process/meta-ads/07 Update Facebook Account/Posts Calendar.md";
const ABS_PATH = path.join(process.cwd(), "..", CALENDAR_NOTE_PATH);

/** The section whose first table is the schedule */
export const SCHEDULE_HEADING = "Schedule";

export type PostsCalendar = {
  title: string;
  /** The paragraphs before the first `## `, minus the vault navigation lines */
  lede: MdBlock[];
  updated: string | null;
  status: string | null;
  /** Every schedule row with a well-formed date, oldest first */
  posts: PlannedPost[];
  /** Every `## ` section except the schedule, in document order */
  sections: MdSection[];
  repoPath: string;
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export async function readPostsCalendar(): Promise<PostsCalendar | null> {
  const raw = await fs.readFile(ABS_PATH, "utf8").catch(() => null);
  if (!raw) return null;

  const { data, body } = splitFrontmatter(raw);
  const { title, lede, sections } = parseSections(body);

  const schedule = findSection(sections, SCHEDULE_HEADING);
  const table = firstTable(schedule);
  const posts: PlannedPost[] = [];
  if (table) {
    // Columns by header name, so the vault can reorder or add columns without breaking this.
    const column = (name: string) =>
      table.headers.findIndex((header) => header.trim().toLowerCase() === name);
    const at = {
      date: column("date"),
      time: column("time"),
      pillar: column("pillar"),
      format: column("format"),
      asset: column("asset"),
      line: column("line"),
      status: column("status"),
    };
    const cell = (row: string[], index: number) => (index >= 0 ? (row[index] ?? "").trim() : "");
    for (const row of table.rows) {
      const date = cell(row, at.date).replace(/`/g, "");
      if (!ISO_DATE.test(date)) continue;
      const pillar = cell(row, at.pillar);
      const time = cell(row, at.time).replace(/`/g, "");
      posts.push({
        date,
        time: time || null,
        pillar,
        pillarKey: pillarKeyOf(pillar),
        format: cell(row, at.format),
        asset: cell(row, at.asset),
        line: cell(row, at.line),
        status: cell(row, at.status).replace(/`/g, ""),
      });
    }
  }
  posts.sort((a, b) => a.date.localeCompare(b.date));

  return {
    title,
    lede: parseBlocks(lede).filter(
      (block) =>
        !(block.kind === "paragraph" && /^(Documentation:|The dashboard renders)/.test(block.text)),
    ),
    updated: data.updated ?? null,
    status: data.status ?? null,
    posts,
    sections: sections.filter(
      (section) => !section.heading.toLowerCase().startsWith(SCHEDULE_HEADING.toLowerCase()),
    ),
    repoPath: CALENDAR_NOTE_PATH,
  };
}

/** Today as `YYYY-MM-DD` in the server's local time — the same machine the reader sits at. */
export function todayIso() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}
