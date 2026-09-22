import { promises as fs } from "node:fs";
import path from "node:path";

import {
  findSection,
  parseBlocks,
  parseSections,
  splitFrontmatter,
  toPlainText,
  type MdSection,
} from "@/lib/markdown";
import type { AdSwipe } from "@/lib/meta-ads";

/**
 * The Campaigns tab reads the step-03 briefs straight from the vault. The brief's
 * frontmatter carries the decisions the tab needs:
 *   order: 1..n                     position in the round
 *   status: candidate — …           anything starting with "candidate" is not one of the five
 *   modelled_on: [slug, slug]       good-ads.json slugs this brief was modelled on
 *   cta: Install now                the Meta call-to-action button
 *   destination: https://…          where the button goes; defaults to PRODUCT.md §2
 *   approved: [hook, cta]           readiness checks the owner has signed off (ad-readiness.ts)
 *   waived: [disclosure]            checks knowingly not done — running anyway, reason in the brief
 *   real_people: true               a real face is on frame, so the likeness release is back in play
 *   not_applicable: [music]         checks this creative cannot fail — the reason goes in the brief
 * Hook and primary text are the first blockquotes of their sections; evidence is the
 * lede paragraph that starts with "Evidence:".
 *
 * **A brief may declare more than one ad.** Every `## ` section whose heading starts with
 * "Primary text" is one copy set — its quote is the primary text, its `Headline:` and
 * `Description:` lines belong to it, and whatever follows "Primary text" in the heading is
 * the variant's label. Two sections means two ads in the ad set, same creative, and the
 * heading is where you say which single thing is being varied.
 *
 * The campaign page (/meta-ads/campaigns/<campaign>) renders every `## ` section of the
 * brief in document order, and reads the ordered list under `## Do this, in order` as the
 * step list — the vault says what to do, the app shows it.
 */
export const BRIEFS_DIR = "brain/process/meta-ads/03 Choose Videos And Five Campaigns/briefs";
const ROOT = path.join(process.cwd(), "..");

/** The brief section whose ordered list is the step-by-step */
export const STEPS_HEADING = "Do this";

/** One ad's worth of copy. A brief with two of these is a two-ad copy test. */
export type CopySet = {
  /** Whatever follows "Primary text" in the heading — "— B · the question" → "B · the question" */
  label: string | null;
  primaryText: string | null;
  headline: string | null;
  description: string | null;
};

export type CampaignBrief = {
  campaign: string;
  repoPath: string;
  order: number;
  status: string | null;
  isCandidate: boolean;
  persona: string | null;
  format: string | null;
  variable: string | null;
  updated: string | null;
  /** The brief's `# ` title */
  title: string;
  /** The "Single variable tested" paragraph, plain text */
  lede: string | null;
  /** The "Evidence:" paragraph, plain text, prefix removed */
  evidence: string | null;
  /** Hook with its `**punch word**` markers kept for rendering */
  hookMarkdown: string | null;
  primaryText: string | null;
  /** The `Headline: **…**` line under the primary text — the link card's bold line */
  headline: string | null;
  /** The `Description: **…**` line beside it */
  description: string | null;
  /** Every copy set in the brief, in document order. Always at least one entry. */
  copySets: CopySet[];
  /** Frontmatter: the Meta call-to-action button */
  cta: string | null;
  /** Frontmatter: an override for the App Store destination */
  destination: string | null;
  /** Frontmatter: readiness check ids the owner has signed off */
  approved: string[];
  /** Frontmatter: check ids knowingly left undone — a risk carried on purpose */
  waived: string[];
  /** Frontmatter: a real person is on frame — the one case where a release is owed */
  realPeople: boolean;
  /** Frontmatter: readiness check ids that do not apply to this creative */
  notApplicable: string[];
  /** Every `## ` section of the brief, in document order */
  sections: MdSection[];
  /** The ordered list under `## Do this, in order` — production steps in sequence */
  steps: string[];
  modelledOn: string[];
  /** The saved Good Ads behind `modelledOn`, in the brief's order */
  models: AdSwipe[];
  /** Slugs named in the brief that good-ads.json does not have */
  missingModels: string[];
};

export type CampaignsData = {
  briefs: CampaignBrief[];
  error: string | null;
};

export function campaignHref(campaign: string) {
  return `/meta-ads/campaigns/${encodeURIComponent(campaign)}`;
}

function yamlList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function firstQuote(section: MdSection | undefined) {
  const quote = section?.blocks.find((block) => block.kind === "quote");
  return quote && quote.kind === "quote" ? quote.text : null;
}

/**
 * `Headline: **It checks your selfie…**` sits as a plain paragraph under the primary-text
 * quote, so it is read off the section's text rather than given a heading of its own.
 */
function labelled(section: MdSection | undefined, label: string) {
  const text = (section?.blocks ?? [])
    .map((block) => (block.kind === "paragraph" ? block.text : ""))
    .join("\n");
  const match = text.match(new RegExp(`${label}:\\s*\\*\\*([^*]+)\\*\\*`, "i"));
  return match ? match[1].trim() : null;
}

/** Every `## Primary text…` section, in order — one per ad. */
function copySetsOf(sections: MdSection[]): CopySet[] {
  const sets = sections
    .filter((section) => /^primary text/i.test(section.heading))
    .map((section) => {
      const quote = section.blocks.find((block) => block.kind === "quote");
      const rest = section.heading.replace(/^primary text/i, "").replace(/^[\s—·-]+/, "").trim();
      return {
        label: rest.replace(/^\(.*\)$/, "").trim() || null,
        primaryText: quote && quote.kind === "quote" ? toPlainText(quote.text) : null,
        headline: labelled(section, "Headline"),
        description: labelled(section, "Description"),
      };
    });
  return sets.length ? sets : [{ label: null, primaryText: null, headline: null, description: null }];
}

function stepsOf(sections: MdSection[]) {
  const list = findSection(sections, STEPS_HEADING)?.blocks.find(
    (block) => block.kind === "list",
  );
  return list && list.kind === "list" ? list.items : [];
}

export async function readCampaigns(goodAds: AdSwipe[]): Promise<CampaignsData> {
  const dir = path.join(ROOT, BRIEFS_DIR);
  let files: string[];
  try {
    files = (await fs.readdir(dir)).filter((file) => file.endsWith(".md"));
  } catch {
    return {
      briefs: [],
      error: `Could not read ${BRIEFS_DIR} — the vault has to be checked out beside app/.`,
    };
  }

  const bySlug = new Map(goodAds.map((ad) => [ad.slug, ad]));

  const briefs = await Promise.all(
    files.map(async (file): Promise<CampaignBrief> => {
      const raw = await fs.readFile(path.join(dir, file), "utf8");
      const { data, body } = splitFrontmatter(raw);
      const { title, lede, sections } = parseSections(body);
      const paragraphs = parseBlocks(lede)
        .filter((block) => block.kind === "paragraph")
        .map((block) => (block.kind === "paragraph" ? block.text : ""));
      const evidenceRaw = paragraphs.find((p) => /^\*\*Evidence/i.test(p)) ?? null;
      const ledeRaw =
        paragraphs.find((p) => /^\*\*Single variable/i.test(p)) ?? paragraphs[0] ?? null;
      const modelledOn = yamlList(data.modelled_on);
      const status = data.status?.trim() || null;
      const order = Number.parseInt(data.order ?? "", 10);
      const campaign = data.campaign?.trim() || file.replace(/\.md$/, "");

      return {
        campaign,
        repoPath: `${BRIEFS_DIR}/${file}`,
        order: Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER,
        status,
        isCandidate: /^candidate/i.test(status ?? ""),
        persona: data.persona?.trim() || null,
        format: data.format?.trim() || null,
        variable: data.variable?.trim() || null,
        updated: data.updated?.trim() || null,
        title: title || campaign,
        lede: ledeRaw ? toPlainText(ledeRaw).replace(/^Single variable tested:\s*/i, "") : null,
        evidence: evidenceRaw ? toPlainText(evidenceRaw).replace(/^Evidence:\s*/i, "") : null,
        hookMarkdown: firstQuote(findSection(sections, "Hook")),
        primaryText: (() => {
          const quote = firstQuote(findSection(sections, "Primary text"));
          return quote ? toPlainText(quote) : null;
        })(),
        headline: labelled(findSection(sections, "Primary text"), "Headline"),
        description: labelled(findSection(sections, "Primary text"), "Description"),
        copySets: copySetsOf(sections),
        cta: data.cta?.trim() || null,
        destination: data.destination?.trim() || null,
        approved: yamlList(data.approved),
        waived: yamlList(data.waived),
        realPeople: /^(true|yes)$/i.test(data.real_people?.trim() ?? ""),
        notApplicable: yamlList(data.not_applicable),
        sections,
        steps: stepsOf(sections),
        modelledOn,
        models: modelledOn
          .map((slug) => bySlug.get(slug))
          .filter((ad): ad is AdSwipe => ad !== undefined),
        missingModels: modelledOn.filter((slug) => !bySlug.has(slug)),
      };
    }),
  );

  briefs.sort((a, b) => a.order - b.order || a.campaign.localeCompare(b.campaign, "en"));
  return { briefs, error: null };
}

/** One brief by its campaign name — the page behind a Campaigns card. */
export async function readCampaign(campaign: string, goodAds: AdSwipe[]) {
  const data = await readCampaigns(goodAds);
  return {
    brief: data.briefs.find((brief) => brief.campaign === campaign) ?? null,
    error: data.error,
  };
}
