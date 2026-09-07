import { promises as fs } from "node:fs";
import path from "node:path";

import {
  findSection,
  firstTable,
  parseSections,
  splitFrontmatter,
  toPlainText,
  type MdTable,
} from "@/lib/markdown";

/**
 * The KPI tab reads the vault and never copies it. Two places feed it:
 *   05 Ad Strategy And Budget/KPI Scenarios.md   — worked examples, `scenario: true`
 *   09 Analyze KPIs/KPI Review *.md              — real rounds, written by step 09
 * Thresholds and definitions come from 05/KPI.md; the decision rules below mirror
 * that note's "Targets for round one" table. If the note changes, change DECIDE too.
 */
export const STRATEGY_DIR = "brain/process/meta-ads/05 Ad Strategy And Budget";
export const REVIEW_DIR = "brain/process/meta-ads/09 Analyze KPIs";
const ROOT = path.join(process.cwd(), "..");

export type AdStatus = "active" | "previous";

export type Decision =
  | "scale"
  | "iterate-hook"
  | "iterate-body"
  | "kill"
  | "hold"
  | "starved"
  | "done";

export type AdRow = {
  round: string;
  status: AdStatus;
  ad: string;
  format: string;
  isVideo: boolean;
  days: number | null;
  spend: number;
  impressions: number;
  plays3s: number | null;
  thruplays: number | null;
  clicks: number;
  installs: number;
  trials: number;
  payers: number;
  /** A decision a human wrote into the table — wins over the computed one. */
  recorded: string | null;
  note: string | null;
};

export type AdMetrics = {
  hookRate: number | null;
  holdRate: number | null;
  ctr: number | null;
  cpi: number | null;
  trialRate: number | null;
  trialToPaid: number | null;
  cac: number | null;
  judged: boolean;
  decision: Decision;
  reason: string;
  /** payers the scale budget would buy at this CAC */
  payersAtScale: number | null;
  /** monthly margin at scale on the 12-month net LTV basis; realised loss when no payer */
  potential12: number | null;
  /** monthly cash at scale on the first-payment basis */
  cash1: number | null;
};

export type Assumptions = {
  net1: number;
  ltv12: number;
  scaleBudget: number;
  impressionFloor: number;
  installFloor: number;
  /** round-one test spend range, for the break-even table */
  spendLow: number;
  spendHigh: number;
  /** funnel rates as fractions: download→trial median and P90, trial→paid, hard-paywall download→paid */
  trialMedian: number;
  trialP90: number;
  trialToPaid: number;
  hardPaywall: number;
  lines: { label: string; value: string; source: string }[];
};

export type KpiAd = AdRow & { metrics: AdMetrics; scenario: boolean; source: string };

export type KpiSource = {
  repoPath: string;
  title: string;
  lede: string;
  scenario: boolean;
  updated: string | null;
};

export type KpiData = {
  sources: KpiSource[];
  ads: KpiAd[];
  assumptions: Assumptions;
  /** the "Targets for round one" table out of KPI.md, rendered as-is */
  targets: MdTable | null;
  /** the "Targets by day" table out of KPI.md — day 7 / 14 / 28 */
  targetsByDay: MdTable | null;
  kpiNotePath: string;
  errors: string[];
};

const DEFAULT_ASSUMPTIONS: Assumptions = {
  net1: 17,
  ltv12: 52.9,
  scaleBudget: 1800,
  impressionFloor: 3000,
  installFloor: 20,
  spendLow: 650,
  spendHigh: 850,
  trialMedian: 0.071,
  trialP90: 0.15,
  trialToPaid: 0.255,
  hardPaywall: 0.107,
  lines: [],
};

/** How many payers and installs a given spend needs to pay back — the break-even row. */
export function breakEven(spend: number, a: Assumptions) {
  const payersYear1 = Math.ceil(spend / a.ltv12);
  const payersMonth1 = Math.ceil(spend / a.net1);
  const rates = {
    median: a.trialMedian * a.trialToPaid,
    p90: a.trialP90 * a.trialToPaid,
    hardPaywall: a.hardPaywall,
  };
  const installs = (payers: number, rate: number) => (rate > 0 ? Math.ceil(payers / rate) : null);
  const year1 = {
    median: installs(payersYear1, rates.median),
    p90: installs(payersYear1, rates.p90),
    hardPaywall: installs(payersYear1, rates.hardPaywall),
  };
  return {
    spend,
    payersYear1,
    payersMonth1,
    installsYear1: year1,
    installsMonth1: {
      median: installs(payersMonth1, rates.median),
      p90: installs(payersMonth1, rates.p90),
      hardPaywall: installs(payersMonth1, rates.hardPaywall),
    },
    maxCpiYear1HardPaywall: year1.hardPaywall ? spend / year1.hardPaywall : null,
    rates,
  };
}

/** Identifiers keep their underscores — `toPlainText` would strip them as emphasis. */
function rawCell(cell: string | undefined) {
  return (cell ?? "")
    .replace(/`/g, "")
    .replace(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/g, "$1")
    .replace(/\*\*/g, "")
    .trim();
}

function num(cell: string | undefined): number | null {
  if (!cell) return null;
  const clean = toPlainText(cell).replace(/[$,\s%]/g, "");
  if (!clean || clean === "—" || clean === "-") return null;
  const value = Number.parseFloat(clean);
  return Number.isFinite(value) ? value : null;
}

function col(headers: string[], ...needles: string[]) {
  const lower = headers.map((h) => toPlainText(h).toLowerCase());
  for (const needle of needles) {
    const at = lower.findIndex((h) => h.includes(needle));
    if (at >= 0) return at;
  }
  return -1;
}

function assumptionsFrom(table: MdTable | undefined): Assumptions {
  const out: Assumptions = { ...DEFAULT_ASSUMPTIONS, lines: [] };
  for (const row of table?.rows ?? []) {
    const label = toPlainText(row[0] ?? "");
    const value = toPlainText(row[1] ?? "");
    const source = toPlainText(row[2] ?? "");
    out.lines.push({ label, value, source });
    const n = num(row[1]);
    if (n === null) continue;
    const key = label.toLowerCase();
    const isPercent = /%/.test(toPlainText(row[1] ?? ""));
    const rate = isPercent ? n / 100 : n;
    if (key.includes("first payment")) out.net1 = n;
    else if (key.includes("12 months")) out.ltv12 = n;
    else if (key.includes("scale budget")) out.scaleBudget = n;
    else if (key.includes("impression floor")) out.impressionFloor = n;
    else if (key.includes("install floor")) out.installFloor = n;
    else if (key.includes("spend") && key.includes("low")) out.spendLow = n;
    else if (key.includes("spend") && key.includes("high")) out.spendHigh = n;
    else if (key.includes("trial") && key.includes("p90")) out.trialP90 = rate;
    else if (key.includes("download") && key.includes("trial")) out.trialMedian = rate;
    else if (key.includes("trial") && key.includes("paid")) out.trialToPaid = rate;
    else if (key.includes("hard-paywall") || key.includes("hard paywall")) out.hardPaywall = rate;
  }
  return out;
}

function adsFrom(table: MdTable | undefined): AdRow[] {
  if (!table) return [];
  const h = table.headers;
  const c = {
    round: col(h, "round"),
    status: col(h, "status"),
    ad: col(h, "ad"),
    format: col(h, "format"),
    days: col(h, "days"),
    spend: col(h, "spend"),
    impressions: col(h, "impression"),
    plays3s: col(h, "3s", "3-second"),
    thruplays: col(h, "thruplay"),
    clicks: col(h, "click"),
    installs: col(h, "install"),
    trials: col(h, "trial"),
    payers: col(h, "payer"),
    decision: col(h, "decision"),
    note: col(h, "note"),
  };
  const rows: AdRow[] = [];
  for (const row of table.rows) {
    const ad = rawCell(row[c.ad]);
    if (!ad) continue;
    const format = toPlainText(row[c.format] ?? "");
    const statusText = toPlainText(row[c.status] ?? "").toLowerCase();
    rows.push({
      round: rawCell(row[c.round]) || "Round",
      status: statusText.startsWith("prev") ? "previous" : "active",
      ad,
      format,
      isVideo: /video|ugc|demo|slideshow|reel/i.test(format),
      days: num(row[c.days]),
      spend: num(row[c.spend]) ?? 0,
      impressions: num(row[c.impressions]) ?? 0,
      plays3s: num(row[c.plays3s]),
      thruplays: num(row[c.thruplays]),
      clicks: num(row[c.clicks]) ?? 0,
      installs: num(row[c.installs]) ?? 0,
      trials: num(row[c.trials]) ?? 0,
      payers: num(row[c.payers]) ?? 0,
      recorded: toPlainText(row[c.decision] ?? "") || null,
      note: toPlainText(row[c.note] ?? "") || null,
    });
  }
  return rows;
}

function ratio(a: number | null, b: number | null) {
  return a !== null && b !== null && b > 0 ? a / b : null;
}

function recordedDecision(text: string): Decision {
  const t = text.toLowerCase();
  if (t.startsWith("scale")) return "scale";
  if (t.startsWith("kill")) return "kill";
  if (t.includes("hook")) return "iterate-hook";
  if (t.startsWith("iterate")) return "iterate-body";
  if (t.startsWith("starv") || t.includes("not judged")) return "starved";
  if (t.startsWith("test") || t.startsWith("done") || t.startsWith("finish")) return "done";
  return "hold";
}

/**
 * The rules from KPI.md, "Targets for round one", applied inside one round:
 * floors first, then the creative gates (relative to the round), then the CPI gate.
 */
function decide(rows: AdRow[], a: Assumptions): Map<AdRow, AdMetrics> {
  const out = new Map<AdRow, AdMetrics>();
  const judged = rows.filter((r) => r.impressions >= a.impressionFloor);
  const sum = (f: (r: AdRow) => number) => judged.reduce((acc, r) => acc + f(r), 0);
  const avgCtr = ratio(sum((r) => r.clicks), sum((r) => r.impressions));
  const avgCpi = ratio(sum((r) => r.spend), sum((r) => r.installs));
  const videos = judged.filter((r) => r.isVideo && r.plays3s !== null);
  const avgHold = ratio(
    videos.reduce((acc, r) => acc + (r.thruplays ?? 0), 0),
    videos.reduce((acc, r) => acc + (r.plays3s ?? 0), 0),
  );
  const hookOrder = [...videos].sort(
    (x, y) => (ratio(y.plays3s, y.impressions) ?? 0) - (ratio(x.plays3s, x.impressions) ?? 0),
  );

  for (const r of rows) {
    const hookRate = r.isVideo ? ratio(r.plays3s, r.impressions) : null;
    const holdRate = r.isVideo ? ratio(r.thruplays, r.plays3s) : null;
    const ctr = ratio(r.clicks, r.impressions);
    const cpi = ratio(r.spend, r.installs);
    const trialRate = ratio(r.trials, r.installs);
    const trialToPaid = ratio(r.payers, r.trials);
    const cac = r.payers > 0 ? r.spend / r.payers : null;

    let decision: Decision;
    let reason: string;
    const isJudged = r.impressions >= a.impressionFloor;

    if (r.recorded) {
      decision = recordedDecision(r.recorded);
      reason = `Recorded: ${r.recorded}`;
    } else if (!isJudged) {
      decision = "starved";
      reason = `Below the ${a.impressionFloor.toLocaleString("en-US")}-impression floor — not tested, re-run`;
    } else if (avgCtr !== null && ctr !== null && ctr < 0.5 * avgCtr) {
      decision = "kill";
      reason = "CTR under half the ad set average";
    } else {
      const rank = hookOrder.indexOf(r);
      const n = hookOrder.length;
      const bottomTwo = rank >= 0 && n >= 3 && rank >= n - 2;
      const topTwo = rank >= 0 && rank < 2;
      if (r.isVideo && bottomTwo && hookRate !== null && hookRate < 0.2) {
        decision = "kill";
        reason = "Hook rate in the bottom two and under 20%";
      } else if (
        r.isVideo &&
        bottomTwo &&
        holdRate !== null &&
        avgHold !== null &&
        holdRate >= avgHold &&
        ctr !== null &&
        avgCtr !== null &&
        ctr >= avgCtr
      ) {
        decision = "iterate-hook";
        reason = "Hook in the bottom two, hold and CTR fine — fix the first 1.5 s";
      } else if (r.isVideo && topTwo && holdRate !== null && avgHold !== null && holdRate < avgHold) {
        decision = "iterate-body";
        reason = "Top-two hook, hold below average — the middle beats lose them";
      } else if (
        r.installs >= a.installFloor &&
        cpi !== null &&
        avgCpi !== null &&
        cpi <= 0.8 * avgCpi
      ) {
        decision = "scale";
        reason = `CPI ≤ 0.8× the ad set average with ${r.installs} installs`;
      } else {
        decision = "hold";
        reason =
          r.installs < a.installFloor
            ? `Under ${a.installFloor} installs — CPI not readable yet`
            : "Inside the gates; nothing to act on";
      }
    }

    let payersAtScale: number | null = null;
    let potential12: number | null = null;
    let cash1: number | null = null;
    if (cac !== null) {
      payersAtScale = a.scaleBudget / cac;
      potential12 = payersAtScale * (a.ltv12 - cac);
      cash1 = payersAtScale * (a.net1 - cac);
    } else if (r.spend > 0) {
      potential12 = -r.spend; // realised loss, nothing to project
      cash1 = -r.spend;
    }

    out.set(r, {
      hookRate,
      holdRate,
      ctr,
      cpi,
      trialRate,
      trialToPaid,
      cac,
      judged: isJudged,
      decision,
      reason,
      payersAtScale,
      potential12,
      cash1,
    });
  }
  return out;
}

async function readSource(repoPath: string): Promise<{ source: KpiSource; ads: AdRow[]; assumptions: Assumptions | null } | null> {
  const raw = await fs.readFile(path.join(ROOT, repoPath), "utf8").catch(() => null);
  if (!raw) return null;
  const { data, body } = splitFrontmatter(raw);
  const { title, lede, sections } = parseSections(body);
  const assumptionsTable = firstTable(findSection(sections, "Assumptions"));
  return {
    source: {
      repoPath,
      title,
      lede: toPlainText(lede.split("\n\n")[0] ?? ""),
      scenario: /^true$/i.test(data.scenario ?? ""),
      updated: data.updated ?? null,
    },
    ads: adsFrom(firstTable(findSection(sections, "Ads"))),
    assumptions: assumptionsTable ? assumptionsFrom(assumptionsTable) : null,
  };
}

export async function readKpi(): Promise<KpiData> {
  const errors: string[] = [];
  const reviewFiles = (await fs.readdir(path.join(ROOT, REVIEW_DIR)).catch(() => []))
    .filter((f) => /^KPI Review .*\.md$/.test(f))
    .sort()
    .reverse();
  const candidates = [
    ...reviewFiles.map((f) => `${REVIEW_DIR}/${f}`),
    `${STRATEGY_DIR}/KPI Scenarios.md`,
  ];
  const loaded = (await Promise.all(candidates.map(readSource))).filter(
    (entry): entry is NonNullable<typeof entry> => entry !== null,
  );

  // Real reviews win: if any exist, scenarios are shown only when they are the only thing.
  const real = loaded.filter((l) => !l.source.scenario);
  const used = real.length ? real : loaded;
  if (!loaded.length) {
    errors.push(
      `No KPI source found — expected ${REVIEW_DIR}/KPI Review <date>.md or ${STRATEGY_DIR}/KPI Scenarios.md.`,
    );
  }

  const assumptions = used.find((l) => l.assumptions)?.assumptions ?? DEFAULT_ASSUMPTIONS;

  const ads: KpiAd[] = [];
  for (const entry of used) {
    const byRound = new Map<string, AdRow[]>();
    for (const row of entry.ads) {
      const list = byRound.get(row.round) ?? [];
      list.push(row);
      byRound.set(row.round, list);
    }
    for (const rows of byRound.values()) {
      const metrics = decide(rows, assumptions);
      for (const row of rows) {
        ads.push({
          ...row,
          metrics: metrics.get(row)!,
          scenario: entry.source.scenario,
          source: entry.source.repoPath,
        });
      }
    }
  }

  const kpiNotePath = `${STRATEGY_DIR}/KPI.md`;
  const kpiRaw = await fs.readFile(path.join(ROOT, kpiNotePath), "utf8").catch(() => null);
  let targets: MdTable | null = null;
  let targetsByDay: MdTable | null = null;
  if (kpiRaw) {
    const { sections } = parseSections(splitFrontmatter(kpiRaw).body);
    targets = firstTable(findSection(sections, "Targets for round one")) ?? null;
    targetsByDay = firstTable(findSection(sections, "Targets by day")) ?? null;
  } else {
    errors.push(`Could not read ${kpiNotePath} — thresholds table not shown.`);
  }

  return {
    sources: used.map((l) => l.source),
    ads,
    assumptions,
    targets,
    targetsByDay,
    kpiNotePath,
    errors,
  };
}

export const DECISION_LABEL: Record<Decision, string> = {
  scale: "Scale",
  "iterate-hook": "Iterate · hook",
  "iterate-body": "Iterate · body",
  kill: "Kill",
  hold: "Hold",
  starved: "Starved",
  done: "Test done",
};
