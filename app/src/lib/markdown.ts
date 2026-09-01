/** The little bit of markdown parsing this app needs. No dependency. */

export type MdTable = { headers: string[]; rows: string[][] };

export type MdBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; level: number; text: string }
  | { kind: "list"; items: string[]; ordered: boolean }
  | { kind: "quote"; text: string }
  | { kind: "code"; text: string }
  | { kind: "table"; table: MdTable };

export type MdSection = { heading: string; blocks: MdBlock[] };

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?/;

export function splitFrontmatter(source: string) {
  const match = source.match(FRONTMATTER);
  if (!match) return { data: {} as Record<string, string>, body: source };
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const at = line.indexOf(":");
    if (at > 0) data[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }
  return { data, body: source.slice(match[0].length) };
}

function isTableRow(line: string) {
  return line.trimStart().startsWith("|");
}

function cells(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split(/(?<!\\)\|/)
    .map((cell) => cell.trim().replace(/\\\|/g, "|"));
}

/** Blocks of one chunk of markdown, in order. */
export function parseBlocks(source: string): MdBlock[] {
  const lines = source.split("\n");
  const blocks: MdBlock[] = [];
  let paragraph: string[] = [];

  const flush = () => {
    if (paragraph.length) {
      blocks.push({ kind: "paragraph", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (!line.trim()) {
      flush();
      continue;
    }

    if (line.trimStart().startsWith("```")) {
      flush();
      const code: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        code.push(lines[i]);
        i += 1;
      }
      blocks.push({ kind: "code", text: code.join("\n") });
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flush();
      blocks.push({
        kind: "heading",
        level: heading[1].length,
        text: heading[2],
      });
      continue;
    }

    if (isTableRow(line)) {
      flush();
      const start = i;
      while (i < lines.length && isTableRow(lines[i])) i += 1;
      const rows = lines.slice(start, i).map(cells);
      i -= 1;
      // Row two is the |---|---| separator; drop it.
      const headers = rows[0] ?? [];
      const body = rows
        .slice(1)
        .filter((row) => !row.every((c) => /^:?-{2,}:?$/.test(c)));
      blocks.push({ kind: "table", table: { headers, rows: body } });
      continue;
    }

    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      flush();
      const ordered = /^\s*\d+\./.test(line);
      const items: string[] = [];
      while (
        i < lines.length &&
        (/^\s*[-*]\s+/.test(lines[i]) ||
          /^\s*\d+\.\s+/.test(lines[i]) ||
          /^\s{2,}\S/.test(lines[i]))
      ) {
        const continuation =
          /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*]|\d+\.)\s+/.test(lines[i]);
        if (continuation && items.length)
          items[items.length - 1] += ` ${lines[i].trim()}`;
        else items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, "").trim());
        i += 1;
      }
      i -= 1;
      blocks.push({ kind: "list", items, ordered });
      continue;
    }

    if (line.trimStart().startsWith(">")) {
      flush();
      const quote: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith(">")) {
        quote.push(lines[i].replace(/^\s*>\s?/, ""));
        i += 1;
      }
      i -= 1;
      blocks.push({ kind: "quote", text: quote.join(" ").trim() });
      continue;
    }

    paragraph.push(line.trim());
  }

  flush();
  return blocks;
}

/** `## ` sections in document order. Text before the first one comes back as `lede`. */
export function parseSections(body: string) {
  const lines = body.split("\n");
  const sections: MdSection[] = [];
  let title = "";
  const lede: string[] = [];
  let current: { heading: string; lines: string[] } | null = null;

  for (const line of lines) {
    const h1 = line.match(/^#\s+(.*)$/);
    if (h1) {
      title = h1[1];
      continue;
    }
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      if (current)
        sections.push({
          heading: current.heading,
          blocks: parseBlocks(current.lines.join("\n")),
        });
      current = { heading: h2[1], lines: [] };
      continue;
    }
    if (current) current.lines.push(line);
    else lede.push(line);
  }
  if (current)
    sections.push({
      heading: current.heading,
      blocks: parseBlocks(current.lines.join("\n")),
    });

  return { title, lede: lede.join("\n").trim(), sections };
}

export function findSection(sections: MdSection[], startsWith: string) {
  return sections.find((section) =>
    section.heading.toLowerCase().startsWith(startsWith.toLowerCase()),
  );
}

export function firstTable(section: MdSection | undefined) {
  return section?.blocks.find((block) => block.kind === "table")?.table;
}

/** Markdown down to readable text — for one-line summaries and card blurbs. */
export function toPlainText(markdown: string) {
  return markdown
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
