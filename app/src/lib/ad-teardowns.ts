import { promises as fs } from "node:fs";
import path from "node:path";

import {
  findSection,
  firstTable,
  parseBlocks,
  parseSections,
  splitFrontmatter,
  toPlainText,
  type MdBlock,
  type MdSection,
  type MdTable,
} from "@/lib/markdown";

/**
 * The Ad analyzer tab reads the swipe file — one note per torn-down ad, in the folder step 02
 * keeps them. The note is written by the `analyze-ad` skill and by hand; this only shows it.
 *
 * Sections are matched on their opening words, so a rename in the vault turns that part back
 * into plain markdown rather than breaking the page:
 *   `## Facts`       a Field/Value table — the card's metadata, and where the link lives
 *   `## Structure`   (or `## Shot list`) the shot table: time, what is on screen, register
 *   `## Mechanism`   the three lines from step 02
 *   `## Transcript`  what is said, with timings
 *   `## Mix`         measured audio — level per section, ducking, tempo
 *   `## Our version` the same shape rewritten for WinkyPie, and what has to be uploaded
 * Everything else renders in the order the note has it.
 *
 * Per-second frames are optional: drop them in
 * `app/public/assets/winkypie/teardowns/<note slug>/` and the detail view shows the strip.
 */
export const TEARDOWNS_DIR = "brain/process/meta-ads/02 How To Find A Good Ad/swipe";
const ABS_DIR = path.join(process.cwd(), "..", TEARDOWNS_DIR);
const FRAMES_REL = "assets/winkypie/teardowns";
const FRAMES_ABS = path.join(process.cwd(), "public", FRAMES_REL);

const FACTS_HEADING = "Facts";
const STRUCTURE_HEADING = "Structure";
const SHOTS_HEADING = "Shot list";
const MECHANISM_HEADING = "Mechanism";
const TRANSCRIPT_HEADING = "Transcript";
const MIX_HEADING = "Mix";
const OURS_HEADING = "Our version";

/** The headings that get their own slot; the rest fall through to `rest`, in order. */
const CLAIMED = [
  FACTS_HEADING,
  STRUCTURE_HEADING,
  SHOTS_HEADING,
  MECHANISM_HEADING,
  TRANSCRIPT_HEADING,
  MIX_HEADING,
  OURS_HEADING,
];

export type TeardownFact = { field: string; value: string };

export type AdTeardown = {
  /** File stem — the id the grid and the dialog key on */
  slug: string;
  title: string;
  updated: string | null;
  lede: MdBlock[];
  facts: TeardownFact[];
  /** Pulled out of the Facts table so the card can show them without the reader opening it */
  link: string | null;
  account: string | null;
  posted: string | null;
  file: string | null;
  /** The shot table, straight from `## Structure` or `## Shot list` */
  shots: MdTable | null;
  mechanism: MdBlock[];
  transcript: MdBlock[];
  mix: MdBlock[];
  ours: MdBlock[];
  rest: MdSection[];
  /** Web paths under /assets/winkypie/teardowns/<slug>/, sorted; empty when none were captured */
  frames: string[];
};

const IMAGE = /\.(jpe?g|png|webp)$/i;

/** First URL in a cell, whether it is bare or wrapped in a markdown link. */
function urlIn(value: string) {
  const md = value.match(/\]\((https?:\/\/[^\s)]+)\)/);
  if (md) return md[1];
  const bare = value.match(/https?:\/\/[^\s)]+/);
  return bare ? bare[0] : null;
}

/** A Facts row whose field starts with any of these words, case-insensitively. */
function factValue(facts: TeardownFact[], ...starts: string[]) {
  for (const start of starts) {
    const hit = facts.find((f) => f.field.toLowerCase().startsWith(start.toLowerCase()));
    if (hit) return hit.value;
  }
  return null;
}

function blocksOf(sections: MdSection[], startsWith: string) {
  return findSection(sections, startsWith)?.blocks ?? [];
}

async function framesFor(slug: string) {
  try {
    const names = await fs.readdir(path.join(FRAMES_ABS, slug));
    return names
      .filter((n) => IMAGE.test(n))
      .sort((a, b) => a.localeCompare(b, "en"))
      // the slug is a note title with spaces — encode each segment, not the slashes
      .map((n) => `/${FRAMES_REL}/${encodeURIComponent(slug)}/${encodeURIComponent(n)}`);
  } catch {
    return [];
  }
}

function parseOne(slug: string, source: string): Omit<AdTeardown, "frames"> {
  const { data, body } = splitFrontmatter(source);
  const { title, lede: ledeText, sections } = parseSections(body);

  const factsTable = firstTable(findSection(sections, FACTS_HEADING));
  const facts: TeardownFact[] =
    factsTable?.rows
      .filter((r) => r.length >= 2 && r[0].trim())
      .map((r) => ({ field: r[0].trim(), value: r[1].trim() })) ?? [];

  const shots =
    firstTable(findSection(sections, STRUCTURE_HEADING)) ??
    firstTable(findSection(sections, SHOTS_HEADING)) ??
    null;

  const rest = sections.filter(
    (section) => !CLAIMED.some((c) => section.heading.toLowerCase().startsWith(c.toLowerCase())),
  );

  return {
    slug,
    title: title || slug,
    updated: data.updated ?? null,
    lede: parseBlocks(ledeText),
    facts,
    link: facts.map((f) => urlIn(f.value)).find(Boolean) ?? null,
    account: factValue(facts, "Account", "Page"),
    posted: factValue(facts, "Posted", "Started"),
    file: factValue(facts, "File", "Format"),
    shots,
    mechanism: blocksOf(sections, MECHANISM_HEADING),
    transcript: blocksOf(sections, TRANSCRIPT_HEADING),
    mix: blocksOf(sections, MIX_HEADING),
    ours: blocksOf(sections, OURS_HEADING),
    rest,
  };
}

/**
 * Every teardown in the swipe folder, newest `updated` first. A missing folder is not an
 * error — it means nothing has been torn down yet, and the tab says so.
 */
export async function loadAdTeardowns(): Promise<AdTeardown[]> {
  let names: string[];
  try {
    names = await fs.readdir(ABS_DIR);
  } catch {
    return [];
  }

  const out: AdTeardown[] = [];
  for (const name of names.filter((n) => n.endsWith(".md"))) {
    const slug = name.replace(/\.md$/, "");
    const source = await fs.readFile(path.join(ABS_DIR, name), "utf8");
    out.push({ ...parseOne(slug, source), frames: await framesFor(slug) });
  }

  return out.sort((a, b) => {
    const byDate = (b.updated ?? "").localeCompare(a.updated ?? "", "en");
    return byDate !== 0 ? byDate : a.slug.localeCompare(b.slug, "en");
  });
}

/** The one-line summary the card shows under the title. */
export function teardownSummary(teardown: AdTeardown) {
  const first = teardown.lede.find((b) => b.kind === "paragraph");
  return first ? toPlainText(first.text).slice(0, 220) : "";
}
