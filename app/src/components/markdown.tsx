import { Fragment, type ReactNode } from "react";

import type { MdBlock } from "@/lib/markdown";

/** `**bold**`, `code`, [text](url) and [[wiki links]] — nothing else is used in the vault. */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const pattern =
    /(\*\*[^*]+\*\*)|(`[^`]+`)|(\[\[[^\]]+\]\])|(\[[^\]]+\]\((?:https?:\/\/|\/)[^)]+\))/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${index++}`;

    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key} className="font-medium text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key}
          className="rounded bg-secondary px-1 py-0.5 font-mono text-[0.85em]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[[")) {
      const inner = token.slice(2, -2);
      nodes.push(inner.includes("|") ? inner.split("|")[1] : inner);
    } else {
      const link = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      nodes.push(
        <a
          key={key}
          href={link?.[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-2 hover:text-foreground"
        >
          {link?.[1]}
        </a>,
      );
    }
    last = match.index + token.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ blocks }: { blocks: MdBlock[] }) {
  return (
    <div className="flex flex-col gap-3 text-sm text-muted-foreground">
      {blocks.map((block, index) => {
        const key = `b${index}`;
        switch (block.kind) {
          case "heading":
            return (
              <h4
                key={key}
                className="mt-1 text-sm font-semibold text-foreground"
              >
                {inline(block.text, key)}
              </h4>
            );
          case "paragraph":
            return (
              <p key={key} className="leading-relaxed">
                {inline(block.text, key)}
              </p>
            );
          case "quote":
            return (
              <blockquote
                key={key}
                className="border-l-2 border-border pl-3 italic"
              >
                {inline(block.text, key)}
              </blockquote>
            );
          case "list":
            return block.ordered ? (
              <ol key={key} className="flex list-decimal flex-col gap-1.5 pl-5">
                {block.items.map((item, i) => (
                  <li key={i}>{inline(item, `${key}-${i}`)}</li>
                ))}
              </ol>
            ) : (
              <ul key={key} className="flex list-disc flex-col gap-1.5 pl-5">
                {block.items.map((item, i) => (
                  <li key={i}>{inline(item, `${key}-${i}`)}</li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div key={key} className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      {block.table.headers.map((header, i) => (
                        <th
                          key={i}
                          className="py-1.5 pr-4 font-medium text-foreground"
                        >
                          {inline(header, `${key}-h${i}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.table.rows.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-border/50 align-top"
                      >
                        {row.map((cell, j) => (
                          <td key={j} className="py-1.5 pr-4">
                            {inline(cell, `${key}-${i}-${j}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return <Fragment key={key} />;
        }
      })}
    </div>
  );
}
