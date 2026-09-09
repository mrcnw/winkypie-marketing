import { promises as fs } from "node:fs";
import path from "node:path";

import { ASSET_DIRS, readAssets, type Asset } from "@/lib/assets";

/**
 * How one asset of an actor was made. A recipe without a `prompt` is not an
 * omission — actor 01 predates this file, so `promptNote` says where the real
 * source is rather than inventing one.
 */
export type ActorRecipe = {
  label: string;
  model: string;
  params: string | null;
  prompt: string | null;
  promptNote: string | null;
  credits: number | null;
  jobId: string | null;
};

export type Actor = {
  slug: string;
  name: string;
  /** Sub-folder under `assets/winkypie/actors`, which is how the files are found. */
  folder: string;
  look: string | null;
  note: string | null;
  /** Where the AI label stands today — PRODUCT.md §11 is the rule, this is the state. */
  disclosure: string | null;
  added: string | null;
  recipes: ActorRecipe[];
  assets: Asset[];
};

export const ACTORS_FILE = "app/content/actors.json";

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function recipesOf(value: unknown): ActorRecipe[] {
  if (!Array.isArray(value)) return [];
  const recipes: ActorRecipe[] = [];
  for (const entry of value) {
    const label = str((entry as Record<string, unknown>)?.label);
    const model = str((entry as Record<string, unknown>)?.model);
    if (!label || !model) continue;
    const raw = entry as Record<string, unknown>;
    recipes.push({
      label,
      model,
      params: str(raw.params),
      prompt: str(raw.prompt),
      promptNote: str(raw.promptNote),
      credits: num(raw.credits),
      jobId: str(raw.jobId),
    });
  }
  return recipes;
}

/**
 * The cast, joined to its files: `actors.json` carries how each actor was made,
 * the sub-folder under `assets/winkypie/actors` carries what came out.
 */
export async function readActors(): Promise<{ actors: Actor[]; error: string | null }> {
  const file = path.join(process.cwd(), "content", "actors.json");

  let raw: string;
  try {
    raw = await fs.readFile(file, "utf8");
  } catch {
    return { actors: [], error: null }; // no file yet — same as an empty cast
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    // Hand-edited JSON: say what broke instead of silently showing nothing.
    return {
      actors: [],
      error: `${ACTORS_FILE} is not valid JSON — ${(error as Error).message}`,
    };
  }

  if (!Array.isArray(parsed)) {
    return { actors: [], error: `${ACTORS_FILE} must contain an array.` };
  }

  const assets = await readAssets(ASSET_DIRS.actors);
  const actors: Actor[] = [];
  let skipped = 0;

  for (const entry of parsed as Record<string, unknown>[]) {
    const slug = str(entry?.slug);
    const folder = str(entry?.folder);
    if (!slug || !folder) {
      skipped += 1;
      continue;
    }
    actors.push({
      slug,
      name: str(entry?.name) ?? slug,
      folder,
      look: str(entry?.look),
      note: str(entry?.note),
      disclosure: str(entry?.disclosure),
      added: str(entry?.added),
      recipes: recipesOf(entry?.recipes),
      assets: assets.filter(
        (asset) => asset.group === folder || asset.group.startsWith(`${folder}/`),
      ),
    });
  }

  actors.sort((a, b) => a.slug.localeCompare(b.slug, "en"));

  return {
    actors,
    error: skipped
      ? `${skipped} entr${skipped === 1 ? "y" : "ies"} skipped in ${ACTORS_FILE} — every entry needs a slug and a folder.`
      : null,
  };
}
