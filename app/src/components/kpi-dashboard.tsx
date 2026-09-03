import { AlertTriangle, FlaskConical, TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DECISION_LABEL, type Decision, type KpiAd, type KpiData } from "@/lib/kpi";
import { toPlainText } from "@/lib/markdown";
import { cn } from "@/lib/utils";

const money = (v: number | null, digits = 0) =>
  v === null
    ? "—"
    : `${v < 0 ? "−" : ""}$${Math.abs(v).toLocaleString("en-US", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      })}`;
const pct = (v: number | null, digits = 1) =>
  v === null ? "—" : `${(v * 100).toFixed(digits)}%`;
const int = (v: number | null) => (v === null ? "—" : v.toLocaleString("en-US"));

const BADGE: Record<Decision, string> = {
  scale: "bg-brand/15 text-brand border-brand/40",
  kill: "bg-destructive/10 text-destructive border-destructive/40",
  "iterate-hook": "border-border text-foreground",
  "iterate-body": "border-border text-foreground",
  hold: "bg-secondary text-secondary-foreground",
  starved: "bg-secondary text-muted-foreground",
  done: "bg-muted text-muted-foreground",
};

function Summary({ ads }: { ads: KpiAd[] }) {
  const sum = (f: (a: KpiAd) => number) => ads.reduce((acc, a) => acc + f(a), 0);
  const spend = sum((a) => a.spend);
  const installs = sum((a) => a.installs);
  const payers = sum((a) => a.payers);
  const cells: [string, string][] = [
    ["Spend", money(spend)],
    ["Impressions", int(sum((a) => a.impressions))],
    ["Installs", int(installs)],
    ["Avg CPI", money(installs ? spend / installs : null, 2)],
    ["Trials", int(sum((a) => a.trials))],
    ["Payers", int(payers)],
    ["Blended CAC", money(payers ? spend / payers : null, 2)],
  ];
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {cells.map(([label, value]) => (
        <div key={label} className="rounded-xl border border-border bg-card/50 px-4 py-3">
          <dt className="text-xs text-muted-foreground">{label}</dt>
          <dd className="mt-1 font-mono text-lg tabular-nums">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Example({
  ad,
  kind,
  scaleBudget,
  ltv12,
  net1,
}: {
  ad: KpiAd;
  kind: "keep" | "loss";
  scaleBudget: number;
  ltv12: number;
  net1: number;
}) {
  const m = ad.metrics;
  const keep = kind === "keep";
  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-xl border p-5",
        keep ? "border-brand/40 bg-brand/5" : "border-destructive/40 bg-destructive/5",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {keep ? "Keep — the potential" : "Unprofitable — stop it"}
          </p>
          <h3 className="mt-1 font-mono text-sm">{ad.ad}</h3>
        </div>
        {keep ? (
          <TrendingUp className="size-5 shrink-0 text-brand" />
        ) : (
          <TrendingDown className="size-5 shrink-0 text-destructive" />
        )}
      </div>
      <dl className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">CPI</dt>
          <dd className="font-mono tabular-nums">{money(m.cpi, 2)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">CAC / payer</dt>
          <dd className="font-mono tabular-nums">{money(m.cac, 2)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Payers</dt>
          <dd className="font-mono tabular-nums">{int(ad.payers)}</dd>
        </div>
      </dl>
      {m.cac !== null ? (
        <p className="text-sm text-muted-foreground">
          At {money(scaleBudget)}/month this CAC buys ≈ {int(Math.round(m.payersAtScale ?? 0))}{" "}
          payers. Against {money(ltv12, 2)} net over twelve months that is{" "}
          <span className={cn("font-mono", (m.potential12 ?? 0) >= 0 ? "text-brand" : "text-destructive")}>
            {money(m.potential12)}/month
          </span>
          ; against {money(net1, 2)} on the first payment it is{" "}
          <span className="font-mono">{money(m.cash1)}</span> cash in month one.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          {money(ad.spend)} spent, {int(ad.installs)} installs, {int(ad.trials)}{" "}
          {ad.trials === 1 ? "trial" : "trials"}, no payer — nothing to project. Realised
          result{" "}
          <span className="font-mono text-destructive">{money(m.potential12)}</span>.
        </p>
      )}
      <p className="text-xs text-muted-foreground">{m.reason}.{ad.note ? ` ${ad.note}.` : ""}</p>
    </article>
  );
}

function AdsTable({ ads }: { ads: KpiAd[] }) {
  if (!ads.length) {
    return (
      <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
        Nothing in this view yet.
      </p>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ad</TableHead>
          <TableHead>Format</TableHead>
          <TableHead className="text-right">Days</TableHead>
          <TableHead className="text-right">Spend</TableHead>
          <TableHead className="text-right">Impr.</TableHead>
          <TableHead className="text-right">Hook</TableHead>
          <TableHead className="text-right">Hold</TableHead>
          <TableHead className="text-right">CTR</TableHead>
          <TableHead className="text-right">Installs</TableHead>
          <TableHead className="text-right">CPI</TableHead>
          <TableHead className="text-right">Trials</TableHead>
          <TableHead className="text-right">Payers</TableHead>
          <TableHead className="text-right">CAC</TableHead>
          <TableHead>Decision</TableHead>
          <TableHead className="text-right">12-mo / month</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ads.map((ad) => {
          const m = ad.metrics;
          return (
            <TableRow key={`${ad.source}-${ad.round}-${ad.ad}`} className={cn(!m.judged && "opacity-70")}>
              <TableCell className="font-mono text-xs">
                <div>{ad.ad}</div>
                <div className="text-[0.7rem] text-muted-foreground">{ad.round}</div>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">{ad.format}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{int(ad.days)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{money(ad.spend)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{int(ad.impressions)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{pct(m.hookRate)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{pct(m.holdRate)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{pct(m.ctr, 2)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{int(ad.installs)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{money(m.cpi, 2)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{int(ad.trials)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{int(ad.payers)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{money(m.cac, 2)}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Badge variant="outline" className={cn("w-fit", BADGE[m.decision])}>
                    {DECISION_LABEL[m.decision]}
                  </Badge>
                  <span className="max-w-56 whitespace-normal text-[0.7rem] leading-snug text-muted-foreground">
                    {m.reason}
                  </span>
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-mono tabular-nums",
                  (m.potential12 ?? 0) < 0 ? "text-destructive" : (m.potential12 ?? 0) > 0 ? "text-brand" : "",
                )}
              >
                {money(m.potential12)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function KpiDashboard({ data }: { data: KpiData }) {
  const active = data.ads.filter((a) => a.status === "active");
  const previous = data.ads.filter((a) => a.status === "previous");
  const scenario = data.sources.some((s) => s.scenario);
  const { assumptions } = data;

  const withPotential = data.ads.filter((a) => a.metrics.potential12 !== null);
  const keep = [...withPotential]
    .filter((a) => a.metrics.cac !== null && (a.metrics.potential12 ?? 0) > 0)
    .sort((x, y) => (y.metrics.potential12 ?? 0) - (x.metrics.potential12 ?? 0))[0];
  // The unprofitable example is a *killed* ad when one exists — a one-payer CAC on an ad
  // that is still iterating is noise, not a verdict. Fall back to the worst projection.
  const killed = withPotential.filter((a) => a !== keep && a.metrics.decision === "kill");
  const loss = [...(killed.length ? killed : withPotential.filter((a) => a !== keep))].sort(
    (x, y) => (x.metrics.potential12 ?? 0) - (y.metrics.potential12 ?? 0),
  )[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="max-w-2xl text-sm text-muted-foreground">
          The funnel read top-down, judged against the thresholds written before launch in{" "}
          <code className="font-mono text-foreground">{data.kpiNotePath}</code>. Active is
          what is delivering; Previous is what was paused, killed or finished.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          {data.sources.map((s) => s.repoPath.split("/").pop()).join(" · ")}
        </p>
      </div>

      {scenario && (
        <div className="flex items-start gap-3 rounded-xl border border-brand/40 bg-brand/10 p-4 text-sm">
          <FlaskConical className="mt-0.5 size-4 shrink-0 text-brand" />
          <p>
            <span className="font-semibold">Scenario data.</span> Every number below is invented
            to exercise the thresholds — none has been observed and none may be quoted as
            performance. The banner goes away when step 09 writes a real{" "}
            <code className="font-mono">KPI Review &lt;date&gt;.md</code>.
          </p>
        </div>
      )}

      {data.errors.map((error) => (
        <div
          key={error}
          className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm"
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p>{error}</p>
        </div>
      ))}

      {(keep || loss) && (
        <div className="grid gap-4 md:grid-cols-2">
          {keep && (
            <Example
              ad={keep}
              kind="keep"
              scaleBudget={assumptions.scaleBudget}
              ltv12={assumptions.ltv12}
              net1={assumptions.net1}
            />
          )}
          {loss && (
            <Example
              ad={loss}
              kind="loss"
              scaleBudget={assumptions.scaleBudget}
              ltv12={assumptions.ltv12}
              net1={assumptions.net1}
            />
          )}
        </div>
      )}

      <Tabs defaultValue="active" className="gap-4">
        <TabsList>
          <TabsTrigger value="active">
            Active
            <span className="ms-1.5 font-mono text-xs text-muted-foreground">{active.length}</span>
          </TabsTrigger>
          <TabsTrigger value="previous">
            Previous
            <span className="ms-1.5 font-mono text-xs text-muted-foreground">{previous.length}</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="flex flex-col gap-4">
          <Summary ads={active} />
          <AdsTable ads={active} />
        </TabsContent>
        <TabsContent value="previous" className="flex flex-col gap-4">
          <Summary ads={previous} />
          <AdsTable ads={previous} />
        </TabsContent>
      </Tabs>

      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        {data.targets && (
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-card/50 p-5">
            <h2 className="text-sm font-semibold">Thresholds — as written in KPI.md</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  {data.targets.headers.map((h) => (
                    <TableHead key={h} className="whitespace-normal">
                      {toPlainText(h)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.targets.rows.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell
                        key={j}
                        className={cn("whitespace-normal align-top text-xs", j === 0 && "font-medium")}
                      >
                        {toPlainText(cell)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card/50 p-5">
          <h2 className="text-sm font-semibold">Assumptions behind the projections</h2>
          <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
            {assumptions.lines.length ? (
              assumptions.lines.map((line) => (
                <li key={line.label} className="flex flex-col">
                  <span className="text-foreground">
                    {line.label}: <span className="font-mono">{line.value}</span>
                  </span>
                  <span>{line.source}</span>
                </li>
              ))
            ) : (
              <li>
                Defaults: {money(assumptions.net1, 2)} net first payment · {money(assumptions.ltv12, 2)}{" "}
                net 12 months · {money(assumptions.scaleBudget)} scale budget.
              </li>
            )}
          </ul>
          <p className="text-xs text-muted-foreground">
            Potential = payers the scale budget buys at this CAC × (12-month net LTV − CAC).
            Month-one cash uses the first payment instead. Decision rules live in{" "}
            <code className="font-mono">src/lib/kpi.ts</code> and mirror KPI.md — change both.
          </p>
        </div>
      </section>
    </div>
  );
}
