#!/usr/bin/env node
/**
 * Turns an Instagram tile master into the file you actually upload.
 *
 *   npm run ig                 export every tile whose upload file is missing or older
 *                              than its master
 *   npm run ig -- --force      re-export everything
 *   npm run ig -- <stem> …     only these tiles, by file stem
 *
 * Masters live in `public/assets/winkypie/instagram/<lane>/`, the export lands beside them
 * in `<lane>/upload/<stem>.jpg`. The master is the archive — it is never touched.
 *
 * Why an export step exists at all: Instagram serves a feed photo at 1080 px wide and
 * re-encodes anything bigger with its own downscaler, which bands the near-black ground and
 * smears the gradient hook. Handing it a file already at the canvas size in
 * `07 Update Facebook Account/Static Post Format.md` leaves it nothing to do.
 *
 * The one non-obvious flag is `-sampling-factor 1x1` — 4:4:4 chroma. The tiles are saturated
 * amber/pink type on near-black, the exact case JPEG's default 4:2:0 destroys: measured on
 * WP_IG_PIN1, 4:4:4 scores 46.1 dB against the lossless reference where 4:2:0 scores 40.9.
 */
import { spawnSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE_DIR = "public/assets/winkypie/instagram";
/** The sub-folder an export goes into — and the one the walk never reads back. */
const UPLOAD_DIR = "upload";

// Canvas from `brain/process/meta-ads/07 Update Facebook Account/Static Post Format.md`
// → Our spec. Change it there first.
const CANVAS = { width: 1080, height: 1350 };
const RATIO = CANVAS.width / CANVAS.height;
/** A master a hair off 4:5 is a rounding artefact; further off is a cropping decision. */
const RATIO_TOLERANCE = 0.005;
/** 4:4:4, quality 95 lands ~330 KB — far under Instagram's 8 MB ceiling, so do not skimp. */
const QUALITY = 95;

const MASTER_EXT = new Set([".png", ".jpg", ".jpeg"]);

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((arg) => !arg.startsWith("--"));

function findMagick() {
  for (const candidate of ["magick", "convert"]) {
    const probe = spawnSync(candidate, ["-version"], { stdio: "ignore" });
    if (probe.status === 0) return candidate;
  }
  return null;
}

/** Every tile master under the Instagram assets, upload folders excluded. */
async function findMasters(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== UPLOAD_DIR) out.push(...(await findMasters(full)));
      continue;
    }
    if (MASTER_EXT.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out.sort();
}

/** Geometry and colour straight out of the header, so a bad master is caught before encoding. */
function probe(magick, file) {
  const result = spawnSync(
    magick,
    [file, "-format", "%w %h %[colorspace] %[icc:description]", "info:"],
    { encoding: "utf8" },
  );
  if (result.status !== 0) return null;
  const [width, height, colorspace, ...rest] = result.stdout.trim().split(/\s+/);
  return {
    width: Number(width),
    height: Number(height),
    colorspace,
    profile: rest.join(" ").trim(),
  };
}

const magick = findMagick();
if (!magick) {
  console.error("No ImageMagick found. Install it with `brew install imagemagick`.");
  process.exit(1);
}

const sourceRoot = path.join(ROOT, SOURCE_DIR);
const masters = await findMasters(sourceRoot);
if (masters.length === 0) {
  console.error(`No tiles under ${SOURCE_DIR}.`);
  process.exit(1);
}

let exported = 0;
let skipped = 0;
const warnings = [];

for (const master of masters) {
  const stem = path.basename(master).replace(/\.[^.]+$/, "");
  const rel = path.relative(ROOT, master);
  if (only.length && !only.includes(stem)) continue;

  const outDir = path.join(path.dirname(master), UPLOAD_DIR);
  const out = path.join(outDir, `${stem}.jpg`);

  if (!force) {
    const [masterStat, outStat] = await Promise.all([
      fs.stat(master),
      fs.stat(out).catch(() => null),
    ]);
    if (outStat && outStat.mtimeMs >= masterStat.mtimeMs) {
      console.log(`· ${stem} — up to date, skipping`);
      skipped += 1;
      continue;
    }
  }

  const info = probe(magick, master);
  if (!info) {
    warnings.push(`${stem} — could not be read, skipped`);
    continue;
  }

  const ratio = info.width / info.height;
  if (Math.abs(ratio - RATIO) > RATIO_TOLERANCE) {
    warnings.push(
      `${stem} — ${info.width}×${info.height} is not 4:5. Instagram would crop it and this ` +
        `script does not pick the crop. Re-export the master at ${CANVAS.width}×${CANVAS.height}.`,
    );
    continue;
  }

  // Below the canvas there is nothing to downscale — upscaling would only invent pixels, so
  // the master goes out at its own size and the shortfall is reported.
  const undersized = info.width < CANVAS.width;
  if (undersized) {
    warnings.push(
      `${stem} — master is ${info.width}×${info.height}, under the ${CANVAS.width}×${CANVAS.height} ` +
        `canvas. Exported at its own size; Instagram will upscale it.`,
    );
  }
  if (info.profile && !/srgb/i.test(info.profile)) {
    warnings.push(`${stem} — carries a "${info.profile}" profile, converted to sRGB.`);
  }

  await fs.mkdir(outDir, { recursive: true });
  console.log(`→ ${stem}`);

  const resize = undersized ? [] : ["-filter", "Lanczos", "-resize", `${CANVAS.width}x${CANVAS.height}`];
  const result = spawnSync(
    magick,
    [
      master,
      "-colorspace",
      "sRGB",
      ...resize,
      // The tiles are fully opaque; the channel is dead weight and Instagram flattens it
      // against a background of its own choosing anyway.
      "-alpha",
      "remove",
      "-alpha",
      "off",
      "-sampling-factor",
      "1x1",
      "-interlace",
      "none",
      "-strip",
      "-quality",
      String(QUALITY),
      out,
    ],
    { stdio: "inherit" },
  );

  const stat = result.status === 0 ? await fs.stat(out).catch(() => null) : null;
  if (!stat) {
    warnings.push(`${stem} — encode failed`);
    continue;
  }
  const size = undersized ? `${info.width}×${info.height}` : `${CANVAS.width}×${CANVAS.height}`;
  console.log(`  saved ${path.relative(ROOT, out)} — ${size} JPEG, ${Math.round(stat.size / 1024)} KB`);
  console.log(`  from ${rel}`);
  exported += 1;
}

if (warnings.length) {
  console.log("");
  for (const warning of warnings) console.log(`! ${warning}`);
}

console.log(`\n${exported} exported, ${skipped} already up to date.`);
if (exported) console.log("Refresh /instagram — the tiles download the upload file.");
