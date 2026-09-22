import { repoPath } from "@/lib/paths";
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
import { pillarKeyOf, type PillarKey } from "@/lib/pillars";

/**
 * The Posts tab reads every written post out of the vault — one note per post in the `posts/`
 * folder step 07 keeps beside the profile audit and the calendar. The frontmatter says what
 * kind of post it is and when it goes up; the sections carry the words that get pasted into
 * Instagram: `## The hook` is slide one and the grid tile, `## The carousel` is the slide
 * table, `## The description` is the caption and `## The first comment` is what is pinned
 * under it. Each of those holds its text in a code fence, so it can be copied unchanged.
 *
 * The vault writes the post; this only shows it. Nothing here is a status.
 */
export const POSTS_DIR = "brain/process/meta-ads/07 Update Facebook Account/posts";
const ABS_DIR = repoPath(POSTS_DIR);

/** Sections matched on their opening words — a rename in the vault degrades, never breaks. */
const HOOK_HEADING = "The hook";
const CAROUSEL_HEADING = "The carousel";
const DESCRIPTION_HEADING = "The description";
const COMMENT_HEADING = "The first comment";
const STEPS_HEADING = "Do this";

export type InstagramPost = {
  /** The file stem — `WP_IG_EDU1_firstphoto`, the name the calendar links to */
  slug: string;
  title: string;
  lede: MdBlock[];
  /** Frontmatter, as written */
  pillar: string | null;
  pillarKey: PillarKey | null;
  format: string | null;
  slides: number | null;
  ratio: string | null;
  /** `posts:` — the day it goes up, matching a row in the calendar */
  date: string | null;
  status: string | null;
  updated: string | null;
  /** Slide one, out of the first code fence under `## The hook` */
  hook: string | null;
  /** Everything under `## The hook` that is not the fence — how the punch word is set */
  hookNotes: MdBlock[];
  /** The slide table under `## The carousel`, plus the fences for the slides after it */
  slideTable: MdTable | null;
  slideBlocks: MdBlock[];
  /** The caption, pasted as-is */
  description: string | null;
  /** The comment posted under it and pinned */
  comment: string | null;
  steps: string[];
  /** Every `## ` section, in document order — the full note for anyone who wants it */
  sections: MdSection[];
  repoPath: string;
};

/** The first code fence in a section, or null when the vault has not written one yet. */
function firstCode(section: MdSection | undefined) {
  const block = section?.blocks.find((item) => item.kind === "code");
  return block && block.kind === "code" ? block.text : null;
}

/** Is this a carousel or a single tile? The frontmatter says so; the slide count backs it up. */
export function isCarousel(post: InstagramPost) {
  if (post.format) return /carousel/i.test(post.format);
  return (post.slides ?? 1) > 1;
}

function parsePost(slug: string, raw: string): InstagramPost {
  const { data, body } = splitFrontmatter(raw);
  const { title, lede, sections } = parseSections(body);

  const hookSection = findSection(sections, HOOK_HEADING);
  const carousel = findSection(sections, CAROUSEL_HEADING);
  const slideTable = firstTable(carousel) ?? null;
  const slides = Number(data.slides);

  const stepsSection = findSection(sections, STEPS_HEADING);
  const stepsBlock = stepsSection?.blocks.find((block) => block.kind === "list");

  return {
    slug,
    title,
    lede: parseBlocks(lede).filter(
      (block) => !(block.kind === "paragraph" && /^(Documentation:|Checklist:)/.test(block.text)),
    ),
    pillar: data.pillar ?? null,
    pillarKey: data.pillar ? pillarKeyOf(data.pillar) : null,
    format: data.format ?? null,
    slides: Number.isFinite(slides) && slides > 0 ? slides : null,
    ratio: data.ratio ?? null,
    date: data.posts ?? null,
    status: data.status ?? null,
    updated: data.updated ?? null,
    hook: firstCode(hookSection),
    hookNotes: (hookSection?.blocks ?? []).filter((block) => block.kind !== "code"),
    slideTable,
    slideBlocks: (carousel?.blocks ?? []).filter((block) => block.kind !== "table"),
    description: firstCode(findSection(sections, DESCRIPTION_HEADING)),
    comment: firstCode(findSection(sections, COMMENT_HEADING)),
    steps: stepsBlock && stepsBlock.kind === "list" ? stepsBlock.items : [],
    sections,
    repoPath: `${POSTS_DIR}/${slug}.md`,
  };
}

/** Every post note, soonest first; undated posts last. */
export async function readInstagramPosts(): Promise<InstagramPost[]> {
  const names = await fs.readdir(ABS_DIR).catch(() => null);
  if (!names) return [];

  const posts = await Promise.all(
    names
      .filter((name) => name.endsWith(".md") && !name.startsWith("."))
      .map(async (name) => {
        const raw = await fs.readFile(path.join(ABS_DIR, name), "utf8").catch(() => null);
        return raw ? parsePost(name.replace(/\.md$/, ""), raw) : null;
      }),
  );

  return posts
    .filter((post): post is InstagramPost => post !== null)
    .sort((a, b) => (a.date ?? "9999").localeCompare(b.date ?? "9999"));
}
