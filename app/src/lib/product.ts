import { promises as fs } from "node:fs";
import path from "node:path";

import {
  findSection,
  firstTable,
  parseSections,
  toPlainText,
  type MdSection,
  type MdTable,
} from "@/lib/markdown";

/** Both files live at the repo root. This app renders them; it never restates them. */
const ROOT = path.join(process.cwd(), "..");

export type OurChannel = {
  label: string;
  url: string | null;
  detail: string;
};

export type Product = {
  oneLiner: string;
  lockedLines: MdTable | null;
  facts: MdTable | null;
  pricing: MdTable | null;
  flow: MdSection | undefined;
  channels: OurChannel[];
  sections: MdSection[];
};

export type Swatch = { role: string; hex: string; where: string };

export type Brand = {
  oneLine: string;
  swatches: { group: string; items: Swatch[] }[];
  typography: MdTable | null;
  patterns: MdTable | null;
  never: string[];
  sections: MdSection[];
};

async function readRoot(file: string) {
  return fs.readFile(path.join(ROOT, file), "utf8").catch(() => null);
}

function factValue(table: MdTable | null | undefined, field: string) {
  const row = table?.rows.find((entry) =>
    toPlainText(entry[0] ?? "").toLowerCase().startsWith(field.toLowerCase()),
  );
  return row ? toPlainText(row[1] ?? "") : null;
}

function urlish(value: string | null) {
  if (!value) return null;
  const match = value.match(/(https?:\/\/[^\s,)]+|[a-z0-9-]+(?:\.[a-z0-9-]+)+\/[^\s,)]*|[a-z0-9-]+(?:\.[a-z0-9-]+)+)/i);
  if (!match) return null;
  return match[1].startsWith("http") ? match[1] : `https://${match[1]}`;
}

export async function readProduct(): Promise<Product | null> {
  const raw = await readRoot("PRODUCT.md");
  if (!raw) return null;

  const { sections } = parseSections(raw);
  const one = findSection(sections, "1.");
  const facts = firstTable(findSection(sections, "2."));
  const pricing = firstTable(findSection(sections, "7."));

  const oneLinerBlock = one?.blocks.find((block) => block.kind === "paragraph");

  // Our own channels, read out of the facts table — never hardcoded here.
  const instagram = factValue(facts, "Social");
  const handle = instagram?.match(/@([\w.]+)/)?.[1] ?? null;

  const channels: OurChannel[] = [
    {
      label: "Website",
      url: urlish(factValue(facts, "Website")),
      detail: factValue(facts, "Website") ?? "—",
    },
    {
      label: "App Store",
      url: urlish(factValue(facts, "App Store URL")),
      detail: factValue(facts, "Platform sold") ?? "iOS",
    },
    {
      label: "Instagram",
      url: handle ? `https://www.instagram.com/${handle}/` : null,
      detail: instagram ?? "—",
    },
    {
      label: "Facebook Page",
      url: null,
      detail: "Not set up — step 07 of the Meta Ads process",
    },
    {
      label: "TikTok",
      url: null,
      detail: "No account. The channel is parked in process/todo/",
    },
    {
      label: "Support",
      url: urlish(factValue(facts, "Support")),
      detail: factValue(facts, "Support") ?? "—",
    },
  ];

  return {
    oneLiner: oneLinerBlock?.kind === "paragraph" ? toPlainText(oneLinerBlock.text) : "",
    lockedLines: firstTable(one) ?? null,
    facts: facts ?? null,
    pricing: pricing ?? null,
    flow: findSection(sections, "4."),
    channels,
    sections,
  };
}

const HEX = /#[0-9A-Fa-f]{6}/g;

export async function readBrand(): Promise<Brand | null> {
  const raw = await readRoot("BRAND.md");
  if (!raw) return null;

  const { sections } = parseSections(raw);
  const colour = findSection(sections, "3.");

  // Swatches follow the sub-headings inside the colour section: Brand, Surfaces, State.
  const swatches: { group: string; items: Swatch[] }[] = [];
  let group = "Brand";
  for (const block of colour?.blocks ?? []) {
    if (block.kind === "heading") {
      group = block.text;
      continue;
    }
    if (block.kind !== "table") continue;
    const items: Swatch[] = [];
    for (const row of block.table.rows) {
      const cells = row.map(toPlainText);
      for (const hex of cells.join(" ").match(HEX) ?? []) {
        items.push({ role: cells[0] ?? "", hex: hex.toUpperCase(), where: cells[2] ?? cells[1] ?? "" });
      }
    }
    if (items.length) swatches.push({ group, items });
  }

  const oneLineSection = findSection(sections, "1.");
  const oneLineBlock = oneLineSection?.blocks.find((block) => block.kind === "paragraph");
  const neverSection = findSection(sections, "11.");
  const neverList = neverSection?.blocks.find((block) => block.kind === "list");

  return {
    oneLine: oneLineBlock?.kind === "paragraph" ? toPlainText(oneLineBlock.text) : "",
    swatches,
    typography: firstTable(findSection(sections, "4.")) ?? null,
    patterns: firstTable(findSection(sections, "5.")) ?? null,
    never: neverList?.kind === "list" ? neverList.items.map(toPlainText) : [],
    sections,
  };
}

/** One block to paste into a brief, a prompt or a designer's DM. */
export function brandMarkdown(product: Product | null, brand: Brand | null) {
  const lines: string[] = ["# WinkyPie — brand in one block", ""];

  if (product?.oneLiner) lines.push(product.oneLiner, "");

  if (product?.lockedLines?.rows.length) {
    lines.push("## Locked lines — use verbatim", "");
    for (const row of product.lockedLines.rows) {
      lines.push(`- ${toPlainText(row[0] ?? "")} — ${toPlainText(row[1] ?? "")}`);
    }
    lines.push("");
  }

  if (brand?.swatches.length) {
    lines.push("## Colour", "");
    for (const swatchGroup of brand.swatches) {
      const seen = new Set<string>();
      const values = swatchGroup.items
        .filter((item) => !seen.has(item.hex) && seen.add(item.hex))
        .map((item) => `${item.hex} ${item.role}`.trim());
      lines.push(`- **${swatchGroup.group}:** ${values.join(" · ")}`);
    }
    lines.push("", "Gradient: `linear-gradient(135deg, #F59E0B, #EC4899)` — the only one.", "");
  }

  if (brand?.typography?.rows.length) {
    lines.push("## Type", "");
    for (const row of brand.typography.rows) {
      lines.push(`- ${toPlainText(row[0] ?? "")}: ${toPlainText(row[1] ?? "")}`);
    }
    lines.push(
      "",
      "Signature move: one punch word per headline, italic, in the gradient.",
      "",
    );
  }

  if (brand?.never.length) {
    lines.push("## Never", "");
    for (const item of brand.never) lines.push(`- ${item}`);
    lines.push("");
  }

  lines.push("Source: PRODUCT.md and BRAND.md in the marketing repo.");
  return lines.join("\n");
}
