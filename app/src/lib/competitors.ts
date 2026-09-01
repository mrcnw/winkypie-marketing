import { promises as fs } from "node:fs";
import path from "node:path";

import {
  findSection,
  firstTable,
  parseSections,
  splitFrontmatter,
  toPlainText,
  type MdSection,
} from "@/lib/markdown";

/** The research lives in the vault, not in this app. Read it, never copy it. */
export const RESEARCH_DIR = "brain/process/meta-ads/01 Find Competitors";
const ABS_DIR = path.join(process.cwd(), "..", RESEARCH_DIR);

export type Fact = { field: string; value: string; source: string | null };

export type Competitor = {
  slug: string;
  /** `ROAST` out of `# ROAST (roast.dating)` */
  name: string;
  /** the parenthetical, when the file has one */
  qualifier: string | null;
  lede: string;
  facts: Fact[];
  /** everything past Facts, kept as-is for the detail view */
  sections: MdSection[];
  repoPath: string;
  updated: string | null;
  rank: number | null;
  adProof: string | null;
  kpis: string | null;
  nicheFit: string | null;
  why: string | null;
};

export type Landscape = {
  gap: string;
  competitors: Competitor[];
  livingAds: { page: string; since: string; days: string; creative: string }[];
  dismissed: { name: string; why: string }[];
  updated: string | null;
};

function slugFromLink(cell: string) {
  const wiki = cell.match(/\[\[([^\]|]+)/);
  return (wiki ? wiki[1] : toPlainText(cell)).trim();
}

async function readCompetitorFile(file: string): Promise<Competitor | null> {
  const raw = await fs
    .readFile(path.join(ABS_DIR, "competitors", file), "utf8")
    .catch(() => null);
  if (!raw) return null;

  const { data, body } = splitFrontmatter(raw);
  const { title, lede, sections } = parseSections(body);

  const titleMatch = title.match(/^([^(]+?)(?:\s*\(([^)]*)\))?$/);
  const factsTable = firstTable(findSection(sections, "Facts"));

  return {
    slug: file.replace(/\.md$/, ""),
    name: (titleMatch?.[1] ?? title).trim(),
    qualifier: titleMatch?.[2]?.trim() ?? null,
    lede: toPlainText(lede),
    facts:
      factsTable?.rows.map((row) => ({
        field: toPlainText(row[0] ?? ""),
        value: toPlainText(row[1] ?? ""),
        source: row[2] ? toPlainText(row[2]) : null,
      })) ?? [],
    sections: sections.filter(
      (section) => !section.heading.toLowerCase().startsWith("facts"),
    ),
    repoPath: `${RESEARCH_DIR}/competitors/${file}`,
    updated: data.updated ?? null,
    rank: null,
    adProof: null,
    kpis: null,
    nicheFit: null,
    why: null,
  };
}

export async function readLandscape(): Promise<Landscape | null> {
  const raw = await fs
    .readFile(path.join(ABS_DIR, "Competitor Landscape.md"), "utf8")
    .catch(() => null);
  if (!raw) return null;

  const { data, body } = splitFrontmatter(raw);
  const { sections } = parseSections(body);

  // "The gap, in one sentence" — so take the first paragraph, not the section.
  const gapSection = findSection(sections, "The gap");
  const gapBlock = gapSection?.blocks.find((block) => block.kind === "paragraph");
  const gap = toPlainText(gapBlock?.kind === "paragraph" ? gapBlock.text : "");

  const files = (
    await fs.readdir(path.join(ABS_DIR, "competitors")).catch(() => [])
  ).filter((file) => file.endsWith(".md"));
  const parsed = (await Promise.all(files.map(readCompetitorFile))).filter(
    (entry): entry is Competitor => entry !== null,
  );
  const bySlug = new Map(
    parsed.map((entry) => [entry.slug.toLowerCase(), entry]),
  );

  // The ranking table is the editorial order — a card without a rank sorts last.
  const ranking = firstTable(findSection(sections, "Ranking"));
  for (const row of ranking?.rows ?? []) {
    const slug = slugFromLink(row[1] ?? "").toLowerCase();
    const entry = bySlug.get(slug);
    if (!entry) continue;
    entry.rank = Number.parseInt(toPlainText(row[0] ?? ""), 10) || null;
    entry.adProof = toPlainText(row[2] ?? "") || null;
    entry.kpis = toPlainText(row[3] ?? "") || null;
    entry.nicheFit = toPlainText(row[4] ?? "") || null;
    entry.why = toPlainText(row[5] ?? "") || null;
  }

  const livingTable = firstTable(
    findSection(sections, "Where the best living ads"),
  );
  const dismissedTable = firstTable(
    findSection(sections, "Checked and dismissed"),
  );

  return {
    gap,
    updated: data.updated ?? null,
    competitors: parsed.sort(
      (a, b) =>
        (a.rank ?? 99) - (b.rank ?? 99) || a.name.localeCompare(b.name, "en"),
    ),
    livingAds:
      livingTable?.rows.map((row) => ({
        page: toPlainText(row[0] ?? ""),
        since: toPlainText(row[1] ?? ""),
        days: toPlainText(row[2] ?? ""),
        creative: toPlainText(row[3] ?? ""),
      })) ?? [],
    dismissed:
      dismissedTable?.rows.map((row) => ({
        name: toPlainText(row[0] ?? ""),
        why: toPlainText(row[2] ?? row[1] ?? ""),
      })) ?? [],
  };
}

/** The handful of fields worth showing on a card, in this order. */
export const CARD_FACTS = [
  "Pricing",
  "Selfies required",
  "Input",
  "Platform",
  "Traction",
];

export function cardFacts(competitor: Competitor) {
  const picked: Fact[] = [];
  for (const wanted of CARD_FACTS) {
    const fact = competitor.facts.find(
      (candidate) => candidate.field.toLowerCase() === wanted.toLowerCase(),
    );
    if (fact && !picked.some((entry) => entry.field === fact.field))
      picked.push(fact);
  }
  return picked.slice(0, 4);
}
