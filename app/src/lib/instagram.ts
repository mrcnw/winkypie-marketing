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
  type MdTable,
} from "@/lib/markdown";

/**
 * The Instagram tab reads one note from the vault — the profile audit step 07 of the Meta
 * Ads process produced, because `@winkypie.app` is the handle every Instagram placement runs
 * under. The note's frontmatter names our profile and the account it is modelled on;
 * `## Do this, in order` is the fix list; `## New bio` holds the paste-ready blocks as code
 * fences; every other `## ` section renders in document order. The vault decides, the app
 * shows — no status and no checkbox live here.
 */
export const NOTE_PATH =
  "brain/process/meta-ads/07 Update Facebook Account/Instagram Profile.md";
const ABS_PATH = path.join(process.cwd(), "..", NOTE_PATH);

/** The section whose ordered list is the fix list */
export const STEPS_HEADING = "Do this";
/** The section whose code fences are pasted into Instagram as-is */
export const BIO_HEADING = "New bio";
/** Sections whose first table reads better as one card per row than as a grid */
export const CARD_SECTIONS = ["Where we are", "The model"];

export type InstagramAudit = {
  title: string;
  /** The paragraphs before the first `## `, minus the vault navigation line */
  lede: MdBlock[];
  updated: string | null;
  status: string | null;
  /** Our profile, out of the frontmatter */
  profile: string | null;
  /** The account the fixes are modelled on, out of the frontmatter */
  reference: string | null;
  /** The ordered list under `## Do this, in order` */
  steps: string[];
  /** Every block under `## New bio`, in order — code fences are the paste-ready parts */
  bio: MdBlock[];
  /** Every other `## ` section, in document order */
  sections: MdSection[];
  repoPath: string;
};

function handleOf(url: string | null) {
  if (!url) return null;
  try {
    const segment = new URL(url).pathname.split("/").filter(Boolean)[0];
    return segment ? `@${segment}` : null;
  } catch {
    return null;
  }
}

/** `@roast.dating` out of `https://www.instagram.com/roast.dating/` */
export function instagramHandle(url: string | null) {
  return handleOf(url);
}

/** The first table of a section, when the section should render one card per row */
export function cardTable(section: MdSection): MdTable | null {
  const wanted = CARD_SECTIONS.some((prefix) =>
    section.heading.toLowerCase().startsWith(prefix.toLowerCase()),
  );
  return wanted ? (firstTable(section) ?? null) : null;
}

export async function readInstagramAudit(): Promise<InstagramAudit | null> {
  const raw = await fs.readFile(ABS_PATH, "utf8").catch(() => null);
  if (!raw) return null;

  const { data, body } = splitFrontmatter(raw);
  const { title, lede, sections } = parseSections(body);

  const stepsSection = findSection(sections, STEPS_HEADING);
  const stepsList = stepsSection?.blocks.find(
    (block) => block.kind === "list" && block.ordered,
  );

  const bioSection = findSection(sections, BIO_HEADING);

  const laidOut = [STEPS_HEADING, BIO_HEADING].map((heading) => heading.toLowerCase());

  return {
    title,
    // "Documentation: [[…]] · Checklist: [[…]]" and "The dashboard renders this note…" are
    // vault navigation, not content.
    lede: parseBlocks(lede).filter(
      (block) =>
        !(block.kind === "paragraph" && /^(Documentation:|The dashboard renders)/.test(block.text)),
    ),
    updated: data.updated ?? null,
    status: data.status ?? null,
    profile: data.profile ?? null,
    reference: data.reference ?? null,
    steps: stepsList?.kind === "list" ? stepsList.items : [],
    bio: bioSection?.blocks ?? [],
    sections: sections.filter(
      (section) =>
        !laidOut.some((prefix) => section.heading.toLowerCase().startsWith(prefix)),
    ),
    repoPath: NOTE_PATH,
  };
}
