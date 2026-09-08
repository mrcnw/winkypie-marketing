"use client";

import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

/** A block of text meant to be taken, not read. */
export function CopyBlock({
  title,
  description,
  text,
  copyLabel = "Copy markdown",
  toastMessage = "Branding copied",
  wrap = false,
}: {
  title: string;
  description?: string;
  text: string;
  copyLabel?: string;
  toastMessage?: string;
  /** Wrap long lines instead of scrolling sideways — for prose meant to be read here too. */
  wrap?: boolean;
}) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-border bg-card/50 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <CopyButton value={text} label={copyLabel} toastMessage={toastMessage} />
      </div>
      <pre
        className={cn(
          "max-h-96 overflow-auto rounded-lg bg-background/70 p-4 font-mono text-xs leading-relaxed text-muted-foreground",
          wrap && "whitespace-pre-wrap break-words",
        )}
      >
        {text}
      </pre>
    </section>
  );
}
