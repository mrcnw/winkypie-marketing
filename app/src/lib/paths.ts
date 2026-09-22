import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Where the app is, and where the vault is — found, not assumed.
 *
 * Every reader here used to build its paths from `process.cwd()`: `cwd/public` for assets and
 * `cwd/..` for the vault. That is true only when the dev server is started from `app/`. Start
 * it from the repo root, or from anywhere else, and `cwd/..` points outside the repo — so
 * every brief, every note and every KPI table comes back missing. Nothing throws. Every card
 * just says "No brief" and the whole preflight reads as unapproved, which looks exactly like
 * a repo that did not pull.
 *
 * So both roots are resolved by walking up from the working directory and looking for a
 * marker: `package.json` beside `public/` is the app, `PRODUCT.md` beside `brain/` is the
 * repo. If neither is found the old assumption is used, which keeps the failure no worse
 * than it was.
 */

function findUp(start: string, matches: (dir: string) => boolean): string | null {
  let dir = path.resolve(start);
  // Stop at the filesystem root — `path.dirname("/") === "/"`.
  for (let depth = 0; depth < 12; depth += 1) {
    if (matches(dir)) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

const isApp = (dir: string) =>
  existsSync(path.join(dir, "package.json")) && existsSync(path.join(dir, "public"));

/**
 * The Next.js app — the folder holding `public/` and `content/`. Looked for upwards first,
 * then one step down into `app/`, which is where it sits when a command is run from the
 * repo root.
 */
export const APP_DIR = (() => {
  const up = findUp(process.cwd(), isApp);
  if (up) return up;
  const nested = path.join(process.cwd(), "app");
  return isApp(nested) ? nested : process.cwd();
})();

/** The repo root — the folder holding `PRODUCT.md` and `brain/`. */
export const REPO_ROOT =
  findUp(
    APP_DIR,
    (dir) => existsSync(path.join(dir, "PRODUCT.md")) && existsSync(path.join(dir, "brain")),
  ) ?? path.join(APP_DIR, "..");

/** A path inside `app/` — `appPath("public")`, `appPath("content", "actors.json")`. */
export function appPath(...parts: string[]) {
  return path.join(APP_DIR, ...parts);
}

/** A path inside the repo — `repoPath("PRODUCT.md")`, `repoPath(BRIEFS_DIR)`. */
export function repoPath(...parts: string[]) {
  return path.join(REPO_ROOT, ...parts);
}
