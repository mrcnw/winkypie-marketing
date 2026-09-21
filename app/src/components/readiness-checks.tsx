import { Check, CircleDashed, CircleSlash, Circle } from "lucide-react";

import {
  CHECK_GROUP_LABEL,
  type CheckGroup,
  type CheckState,
  type ReadinessCheck,
} from "@/lib/ad-readiness";
import { cn } from "@/lib/utils";

/**
 * The preflight, four states wide. `todo` is work, `check` is a signature, `approved` is
 * the green light and `na` is a check this creative cannot fail — with the reason written
 * in the brief, never here.
 */

const STATE: Record<
  CheckState,
  { label: string; icon: typeof Check; dot: string; text: string; row: string }
> = {
  todo: {
    label: "TO DO",
    icon: Circle,
    dot: "border-destructive/50 text-destructive",
    text: "text-destructive",
    row: "",
  },
  check: {
    label: "TO CHECK",
    icon: CircleDashed,
    dot: "border-brand/50 text-brand",
    text: "text-brand",
    row: "",
  },
  approved: {
    label: "APPROVED",
    icon: Check,
    dot: "border-ok/50 bg-ok/10 text-ok",
    text: "text-ok",
    row: "",
  },
  na: {
    label: "N/A",
    icon: CircleSlash,
    dot: "border-border text-muted-foreground/60",
    text: "text-muted-foreground/60",
    row: "opacity-60",
  },
};

export function StateBadge({ state }: { state: CheckState }) {
  const style = STATE[state];
  const Icon = style.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide",
        style.dot,
      )}
    >
      <Icon className="size-3" />
      {style.label}
    </span>
  );
}

function Row({ check }: { check: ReadinessCheck }) {
  const style = STATE[check.state];
  return (
    <li className={cn("flex items-start gap-3 py-2", style.row)}>
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
          style.dot,
        )}
      >
        <style.icon className="size-3" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-sm font-medium">{check.label}</span>
          <span className={cn("font-mono text-[0.65rem] uppercase tracking-wide", style.text)}>
            {style.label}
          </span>
        </span>
        <span className="text-xs leading-snug text-muted-foreground">{check.hint}</span>
        {check.value && (
          <span className="truncate font-mono text-[0.7rem] text-muted-foreground/80">
            {check.value}
          </span>
        )}
      </span>
    </li>
  );
}

export function ReadinessChecks({ checks }: { checks: ReadinessCheck[] }) {
  const groups = new Map<CheckGroup, ReadinessCheck[]>();
  for (const check of checks) {
    groups.set(check.group, [...(groups.get(check.group) ?? []), check]);
  }

  return (
    <div className="flex flex-col gap-4">
      {[...groups.entries()].map(([group, rows]) => (
        <section key={group} className="flex flex-col gap-1">
          <h4 className="font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground/70">
            {CHECK_GROUP_LABEL[group]}
          </h4>
          <ul className="divide-y divide-border/50">
            {rows.map((check) => (
              <Row key={check.id} check={check} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
