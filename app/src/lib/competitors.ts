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

export type ChannelKind =
  | "appstore"
  | "play"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "adlibrary"
  | "trustpilot"
  | "site";

export type Channel = {
  kind: ChannelKind;
  label: string;
  url: string;
  /** false = we have no verified account, the link is a search on that platform */
  found: boolean;
};

/** Always shown, in this order — an empty slot is information too. */
const CHANNEL_SLOTS: ChannelKind[] = [
  "site",
  "appstore",
  "adlibrary",
  "instagram",
  "tiktok",
  "facebook",
];
/** Shown only when the note actually has one. */
const EXTRA_SLOTS: ChannelKind[] = ["play", "trustpilot"];

/** Nothing verified yet — point at the platform's own search so it can be found. */
function searchUrl(kind: ChannelKind, name: string): string | null {
  const q = encodeURIComponent(name);
  switch (kind) {
    case "instagram":
      return `https://www.instagram.com/explore/search/keyword/?q=${q}`;
    case "tiktok":
      return `https://www.tiktok.com/search?q=${q}`;
    case "facebook":
      return `https://www.facebook.com/search/pages/?q=${q}`;
    case "appstore":
      return `https://apps.apple.com/us/search?term=${q}`;
    case "site":
      return `https://duckduckgo.com/?q=${q}`;
    default:
      return null;
  }
}

// App-data aggregators and review farms rank well and end up in the notes as
// sources. They are not the competitor's channel.
const NOT_THEIRS =
  /(mwm\.ai|appbrain|apkpure|apkgk|apkcombo|appadvice|justuseapp|appshunter|appfollow|similarweb|sensortower|data\.ai|screensdesign|swipestats|wikipedia|producthunt|g2\.com|reddit|quora|medium\.com|youtube)/;

/** Where a link points, judged by host — never by the text someone typed around it. */
function classify(url: string, brand: string): Channel | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^www\./, "");
  const handle = parsed.pathname.split("/").filter(Boolean)[0];

  if (host.endsWith("apps.apple.com")) return { kind: "appstore", label: "App Store", url, found: true };
  if (host.endsWith("play.google.com")) return { kind: "play", label: "Google Play", url, found: true };
  if (host.endsWith("instagram.com") && handle)
    return { kind: "instagram", label: `@${handle}`, url, found: true };
  if (host.endsWith("tiktok.com") && handle?.startsWith("@"))
    return { kind: "tiktok", label: handle, url, found: true };
  if (host.endsWith("facebook.com"))
    return parsed.pathname.startsWith("/ads/library")
      ? { kind: "adlibrary", label: "Ad Library", url, found: true }
      : { kind: "facebook", label: "Facebook", url, found: true };
  if (host.endsWith("trustpilot.com")) return { kind: "trustpilot", label: "Trustpilot", url, found: true };

  if (NOT_THEIRS.test(host)) return null;

  // Their own domain nearly always carries the brand name. Without that, a
  // link is somebody writing about them, not their site.
  const domain = host.replace(/\.[a-z.]+$/, "").replace(/[^a-z0-9]/g, "");
  if (!brand || !domain.includes(brand)) return null;

  return { kind: "site", label: host, url, found: true };
}

/** Their live ads are always one click away, even when the note has no link. */
function adLibrarySearch(name: string) {
  const query = new URLSearchParams({
    active_status: "active",
    ad_type: "all",
    country: "ALL",
    media_type: "all",
    q: name,
    search_type: "keyword_unordered",
  });
  return `https://www.facebook.com/ads/library/?${query}`;
}

export type Competitor = {
  slug: string;
  /** `ROAST` out of `# ROAST (roast.dating)` */
  name: string;
  /** the parenthetical, when the file has one */
  qualifier: string | null;
  lede: string;
  facts: Fact[];
  /** every link the note carries, deduped and classified */
  channels: Channel[];
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

function linksIn(text: string) {
  const md = [...text.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((match) => match[1]);
  const bare = [...text.matchAll(/(?<!\()\bhttps?:\/\/[^\s|)]+/g)].map((match) => match[0]);
  return [...md, ...bare];
}

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
  const name = (titleMatch?.[1] ?? title).trim();
  const qualifier = titleMatch?.[2]?.trim() ?? null;

  // A `## Channels` section wins; otherwise take whatever links the note carries.
  const channelsTable = firstTable(findSection(sections, "Channels"));
  const found = new Map<ChannelKind, Channel>();
  const urls = channelsTable
    ? channelsTable.rows.flatMap((row) => row.flatMap(linksIn))
    : [...raw.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((match) => match[1]);

  // `# ROAST (roast.dating)` — the parenthetical is often the site itself.
  if (qualifier && /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(qualifier)) {
    urls.unshift(`https://${qualifier}`);
  }

  const brandToken = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const url of urls) {
    const channel = classify(url, brandToken);
    if (channel && !found.has(channel.kind)) found.set(channel.kind, channel);
  }
  if (!found.has("adlibrary")) {
    found.set("adlibrary", {
      kind: "adlibrary",
      label: "Ad Library",
      url: adLibrarySearch(name),
      found: true,
    });
  }

  return {
    slug: file.replace(/\.md$/, ""),
    name,
    qualifier,
    channels: [
      ...CHANNEL_SLOTS.map((kind): Channel | null => {
        const hit = found.get(kind);
        if (hit) return hit;
        const url = searchUrl(kind, name);
        return url ? { kind, label: "search", url, found: false } : null;
      }),
      ...EXTRA_SLOTS.map((kind) => found.get(kind) ?? null),
    ].filter((channel): channel is Channel => channel !== null),
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
