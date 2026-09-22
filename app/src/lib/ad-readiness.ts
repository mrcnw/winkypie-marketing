import type { Asset } from "@/lib/assets";
import type { CampaignBrief } from "@/lib/campaigns";

/**
 * One creative, read as an ad that is about to be uploaded rather than as a file.
 *
 * No `fs` in here on purpose — the card that renders a creative is a client component, so
 * this module stays pure and `creatives.ts` does the reading.
 *
 * A render is named `<campaign>_<ratio>_<version>.<ext>` ([[Creative Naming]]), so the files
 * group themselves: every file sharing a campaign prefix is one creative, and each distinct
 * version inside it is a scenario — the thing that actually goes into an ad set as an option.
 * The copy, the models it was built from and the guardrail read all come from that campaign's
 * step-03 brief; nothing about an ad is decided in this app.
 *
 * Readiness is four states, never a boolean:
 *   todo      the field or the file does not exist yet — someone has to make it
 *   check     it exists and nobody has signed it off
 *   approved  the brief's frontmatter `approved:` names it — the owner's sign-off
 *   waived    the brief's `waived:` names it — known, not done, running anyway. The one
 *             state that says a risk is being carried on purpose; the reason goes in the
 *             brief, and the precedent is the check card's headline
 *   na        the brief's `not_applicable:` names it, with the reason in the brief
 *
 * A creative is ready when nothing is left todo or to check. Approved, waived and n/a all
 * clear it — waived clears it because the decision has been made, not because the work has.
 * That is the only definition; there is no separate "ready" flag to fall out of sync.
 */

export type CheckState = "todo" | "check" | "approved" | "waived" | "na";
export type CheckGroup = "copy" | "asset" | "video" | "compliance" | "launch";

/** A moving file is a video ad to Meta even when we call it a motion static. */
export type CreativeFormat = "video" | "static";

export type ReadinessCheck = {
  /** The id used in the brief's `approved:` / `not_applicable:` lists */
  id: string;
  group: CheckGroup;
  label: string;
  /** What satisfies it, in one line */
  hint: string;
  state: CheckState;
  /** What we found in the vault, when there is something */
  value: string | null;
};

export type Scenario = {
  /** The version token — `v1`, `v0-layout-B` */
  version: string;
  /** Ratios this version was exported at, e.g. ["4x5"] */
  ratios: string[];
  assets: Asset[];
  /** The render the preview uses — the first image, else the first file */
  poster: Asset;
};

export type AdCopy = {
  /** The variant's label, when the brief declares more than one ad */
  label: string | null;
  hook: string | null;
  primaryText: string | null;
  headline: string | null;
  description: string | null;
  cta: string | null;
  destination: string | null;
};

export type Creative = {
  campaign: string;
  /** The brief's title, or the campaign name when there is no brief */
  title: string;
  /** What Meta will treat it as — one moving file makes the whole creative a video */
  format: CreativeFormat;
  brief: CampaignBrief | null;
  assets: Asset[];
  scenarios: Scenario[];
  /** Every ratio any scenario was exported at */
  ratios: string[];
  /** The first ad. Kept for anything that wants one set without caring about the test. */
  copy: AdCopy;
  /** Every ad this creative goes out as — one entry per `## Primary text…` in the brief */
  copySets: AdCopy[];
  checks: ReadinessCheck[];
  ready: boolean;
  counts: Record<CheckState, number>;
  /** Position: the brief's `order`, then name */
  order: number;
};

export const CHECK_GROUP_LABEL: Record<CheckGroup, string> = {
  copy: "Copy — what Meta asks for",
  asset: "Asset",
  video: "Sound and captions",
  compliance: "Compliance — PRODUCT.md §11",
  launch: "Launch",
};

/** The ratios a creative is expected to ship at — step 7 of every brief's run order. */
export const TARGET_RATIOS = ["9x16", "4x5", "1x1"] as const;

export const RATIO_LABEL: Record<string, string> = {
  "9x16": "9:16",
  "4x5": "4:5",
  "1x1": "1:1",
};

export function ratioLabel(ratio: string) {
  return RATIO_LABEL[ratio] ?? ratio.replace("x", ":");
}

/** `WP_P2_STATIC_checkcard_4x5_v0-layout-B` → campaign, ratio, version */
function parseName(name: string) {
  const stem = name.replace(/\.[^.]+$/, "");
  const match = stem.match(/^(.+?)_(\d+x\d+)_(.+)$/);
  if (!match) return { campaign: stem, ratio: null, version: "v1" };
  return { campaign: match[1], ratio: match[2], version: match[3] };
}

function unique(values: (string | null)[]) {
  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

/** Ratios in export order, not the order the files happened to be named in. */
function sortRatios(ratios: string[]) {
  return [...ratios].sort((a, b) => {
    const ai = TARGET_RATIOS.indexOf(a as (typeof TARGET_RATIOS)[number]);
    const bi = TARGET_RATIOS.indexOf(b as (typeof TARGET_RATIOS)[number]);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || a.localeCompare(b, "en");
  });
}

function state(
  found: boolean,
  id: string,
  approved: string[],
  waived: string[],
  notApplicable: string[],
): CheckState {
  if (notApplicable.includes(id)) return "na";
  // Waived outranks approved: if both name a check, the honest reading is the riskier one.
  if (waived.includes(id)) return "waived";
  if (approved.includes(id)) return "approved";
  return found ? "check" : "todo";
}

/**
 * The `## Guardrail check` section is the owner's §11 read, written line by line in the
 * brief. Present and clean counts as done; a ✗ anywhere in it means it is not.
 *
 * This is where §11.2 lives now. It had its own row until 2026-09-22 and the row was
 * redundant: a missing results-vary strip is one line of a §11 read, and the read is prose
 * that can say *why* it is missing. A binary row could only say that it was.
 */
function guardrailRead(brief: CampaignBrief | null) {
  const section = brief?.sections.find((entry) => /^guardrail/i.test(entry.heading));
  if (!section) return { found: false, clean: false };
  const text = section.blocks
    .map((block) => (block.kind === "paragraph" || block.kind === "quote" ? block.text : ""))
    .join(" ");
  return { found: true, clean: !/[✗✘❌]/.test(text) };
}

/** Meta cuts a link-card headline around here. Measured, not eyeballed. */
const HEADLINE_LIMIT = 40;

/** `"a"` for one ad, `"a · b"` for two — a copy check has to hold for every variant. */
function acrossSets(sets: AdCopy[], pick: (set: AdCopy) => string | null) {
  const values = sets.map(pick);
  if (values.every((value) => !value)) return null;
  if (values.length === 1) return values[0];
  const missing = values.filter((value) => !value).length;
  const shown = values
    .map((value, index) => `${sets[index].label ?? String.fromCharCode(65 + index)}: ${value ?? "—"}`)
    .join("  ·  ");
  return missing ? `${shown}  — ${missing} variant${missing === 1 ? "" : "s"} missing it` : shown;
}

function allSetsHave(sets: AdCopy[], pick: (set: AdCopy) => string | null) {
  return sets.every((set) => Boolean(pick(set)));
}

function buildChecks(
  brief: CampaignBrief | null,
  copy: AdCopy,
  copySets: AdCopy[],
  scenarios: Scenario[],
  ratios: string[],
  format: CreativeFormat,
): ReadinessCheck[] {
  const approved = brief?.approved ?? [];
  const waived = brief?.waived ?? [];
  // Every face in a WinkyPie ad is generated — the product makes them and the cast is
  // synthetic — so a release is owed only where a brief says a real person is on frame.
  const na = [...(brief?.notApplicable ?? []), ...(brief?.realPeople ? [] : ["likeness"])];
  const guardrails = guardrailRead(brief);
  const missingRatios = TARGET_RATIOS.filter((ratio) => !ratios.includes(ratio));

  const rows: Omit<ReadinessCheck, "state">[] = [
    {
      id: "hook",
      group: "copy",
      label: "Hook on frame",
      hint: "Legible in 1.5 s, sound off — the Hook section of the brief, verbatim",
      value: copy.hook?.replace(/\*\*/g, "") ?? null,
    },
    {
      id: "primary-text",
      group: "copy",
      label: "Primary text",
      hint: "The paragraph above the media — the Primary text section of the brief",
      value: acrossSets(copySets, (set) => set.primaryText),
    },
    {
      id: "headline",
      group: "copy",
      label: "Headline",
      hint: `The bold line on the link card. Meta cuts it past about ${HEADLINE_LIMIT} characters`,
      value: acrossSets(copySets, (set) =>
        set.headline
          ? `${set.headline} (${set.headline.length}${
              set.headline.length > HEADLINE_LIMIT ? " — Meta will cut this" : ""
            })`
          : null,
      ),
    },
    {
      id: "description",
      group: "copy",
      label: "Description",
      hint: "The line under the headline. Optional, and dropped in some placements",
      value: acrossSets(copySets, (set) => set.description),
    },
    {
      id: "cta",
      group: "copy",
      label: "Call to action",
      hint: "The button. Set cta: in the brief's frontmatter — the niche runs Install now",
      value: copy.cta,
    },
    {
      id: "destination",
      group: "copy",
      label: "Destination",
      hint: "Where the button goes. The App Store URL from PRODUCT.md §2",
      value: copy.destination,
    },
    {
      id: "render",
      group: "asset",
      label: "Render exists",
      hint: "At least one exported file under creatives/",
      value: scenarios.length
        ? `${scenarios.length} scenario${scenarios.length === 1 ? "" : "s"}`
        : null,
    },
    {
      id: "ratios",
      group: "asset",
      label: "Ratios exported",
      hint: "9:16, 4:5 and 1:1 with Meta's caption-crop safe margins",
      value: ratios.length
        ? `${ratios.map(ratioLabel).join(" · ")}${
            missingRatios.length ? ` — missing ${missingRatios.map(ratioLabel).join(", ")}` : ""
          }`
        : null,
    },
    // Sound is a decision only a moving file has to make. A silent motion static answers
    // it with `not_applicable: [voice, music]` in the brief rather than by being exempt.
    ...(format === "video"
      ? ([
          {
            id: "captions",
            group: "video",
            label: "Captions burned in",
            hint: "Every spoken line on screen — black on white, bottom, legible on a phone",
            value: null,
          },
          {
            id: "voice",
            group: "video",
            label: "Voice track",
            hint: "The read is recorded and in sync. N/A when the piece runs silent",
            value: null,
          },
          {
            id: "music",
            group: "video",
            label: "Music bed",
            hint: "A bed under the read, ducked where he speaks. N/A when it runs silent",
            value: null,
          },
          {
            id: "sound-off",
            group: "video",
            label: "Reads with sound off",
            hint: "Meta autoplays muted: the hook lands in 1.5 s, the captions carry the rest",
            value: null,
          },
        ] satisfies Omit<ReadinessCheck, "state">[])
      : []),
    {
      id: "guardrails",
      group: "compliance",
      label: "§11 guardrail check",
      hint: "The brief's Guardrail check, read line by line — no ✗ left in it",
      value: guardrails.found
        ? guardrails.clean
          ? "Written in the brief, no ✗"
          : "Written, and something in it still fails"
        : null,
    },
    {
      id: "likeness",
      group: "compliance",
      label: "Likeness release",
      hint: brief?.realPeople
        ? "Signed for every real person on frame — this brief says there is one"
        : "N/A by default: every face we put in an ad is generated. A brief with a real person on frame sets real_people: true",
      value: null,
    },
    {
      id: "flags",
      group: "compliance",
      label: "Production flags resolved",
      hint: "The brief's Production flags — every one answered, not argued with",
      value: brief?.sections.some((entry) => /^production flags/i.test(entry.heading))
        ? "Listed in the brief"
        : null,
    },
    {
      id: "hypothesis",
      group: "launch",
      label: "Hypothesis written",
      hint: "Before spend starts — step 08: if we show <hook> to <persona>, then <metric>…",
      value: null,
    },
  ];

  return rows.map((row) => {
    // The guardrail row is the one check the vault can fail on its own: a ✗ left in the
    // section means the read was done and something did not pass.
    const found =
      row.id === "guardrails"
        ? guardrails.found && guardrails.clean
        : row.id === "ratios"
          ? ratios.length > 0 && missingRatios.length === 0
          : row.id === "primary-text"
            ? allSetsHave(copySets, (set) => set.primaryText)
            : row.id === "headline"
              ? copySets.every(
                  (set) => set.headline && set.headline.length <= HEADLINE_LIMIT,
                )
              : row.id === "description"
                ? allSetsHave(copySets, (set) => set.description)
                : Boolean(row.value);
    return { ...row, state: state(found, row.id, approved, waived, na) };
  });
}

/**
 * Assemble creatives out of files that have already been read. `destination` falls back to
 * the one App Store URL for all of them — it is a product fact, not a per-campaign decision.
 */
export function assembleCreatives(
  assets: Asset[],
  briefs: CampaignBrief[],
  appStoreUrl: string | null,
): Creative[] {
  const byCampaign = new Map<string, Asset[]>();

  for (const asset of assets) {
    const { campaign } = parseName(asset.name);
    byCampaign.set(campaign, [...(byCampaign.get(campaign) ?? []), asset]);
  }

  const briefByCampaign = new Map(briefs.map((brief) => [brief.campaign, brief]));

  const creatives = [...byCampaign.entries()].map(([campaign, own]): Creative => {
    const brief = briefByCampaign.get(campaign) ?? null;

    const byVersion = new Map<string, Asset[]>();
    for (const asset of own) {
      const { version } = parseName(asset.name);
      byVersion.set(version, [...(byVersion.get(version) ?? []), asset]);
    }

    const scenarios: Scenario[] = [...byVersion.entries()]
      .map(([version, versionAssets]) => ({
        version,
        ratios: sortRatios(unique(versionAssets.map((asset) => parseName(asset.name).ratio))),
        assets: versionAssets,
        poster: versionAssets.find((asset) => asset.kind === "image") ?? versionAssets[0],
      }))
      .sort((a, b) => a.version.localeCompare(b.version, "en"));

    // Every `## Primary text…` section is an ad. The CTA and the destination are the
    // creative's, not the variant's — a copy test that also moves the button is two tests.
    const shared = {
      hook: brief?.hookMarkdown ?? null,
      cta: brief?.cta ?? null,
      destination: brief?.destination ?? appStoreUrl,
    };
    const copySets: AdCopy[] = (brief?.copySets ?? [
      { label: null, primaryText: null, headline: null, description: null },
    ]).map((set) => ({ ...shared, ...set }));
    const copy = copySets[0];

    const ratios = sortRatios(unique(own.map((asset) => parseName(asset.name).ratio)));
    const format: CreativeFormat = own.some((asset) => asset.kind === "video")
      ? "video"
      : "static";
    const checks = buildChecks(brief, copy, copySets, scenarios, ratios, format);
    const counts: Record<CheckState, number> = {
      todo: 0,
      check: 0,
      approved: 0,
      waived: 0,
      na: 0,
    };
    for (const check of checks) counts[check.state] += 1;

    return {
      campaign,
      title: brief?.title?.replace(/^Brief\s*—\s*/i, "") ?? campaign,
      format,
      brief,
      assets: own,
      scenarios,
      ratios,
      copy,
      copySets,
      checks,
      ready: counts.todo === 0 && counts.check === 0,
      counts,
      order: brief?.order ?? Number.MAX_SAFE_INTEGER,
    };
  });

  return creatives.sort(
    (a, b) => a.order - b.order || a.campaign.localeCompare(b.campaign, "en"),
  );
}
