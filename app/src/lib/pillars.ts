/**
 * The content pillars a planned post can carry — the `Pillar` column of the schedule table in
 * `07 Update Facebook Account/Posts Calendar.md`, matched on its opening words. No node
 * imports here: the calendar grid is a client component and shares this file with the loader.
 */
export const PILLARS = [
  { key: "pinned", label: "Pinned" },
  { key: "result", label: "Pose → Result" },
  { key: "education", label: "Education" },
  { key: "ugc", label: "UGC" },
  { key: "card", label: "Text card" },
] as const;

export type PillarKey = (typeof PILLARS)[number]["key"];

export type PlannedPost = {
  /** `YYYY-MM-DD` */
  date: string;
  /** `HH:MM` in the poster's clock, when the vault gives one */
  time: string | null;
  /** The `Pillar` cell as written in the vault */
  pillar: string;
  pillarKey: PillarKey | null;
  format: string;
  asset: string;
  line: string;
  status: string;
};

/** `Pose → Result (asked for as before/after)` → `result` */
export function pillarKeyOf(pillar: string): PillarKey | null {
  const text = pillar.replace(/[*_`]/g, "").trim().toLowerCase();
  if (text.startsWith("pinned")) return "pinned";
  if (text.startsWith("pose")) return "result";
  if (text.startsWith("education")) return "education";
  if (text.startsWith("ugc")) return "ugc";
  if (text.startsWith("text card")) return "card";
  return null;
}
