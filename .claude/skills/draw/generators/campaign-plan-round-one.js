'use strict';
/**
 * Round-one Meta campaign plan for WinkyPie — an output of step 05.
 * Writes  brain/process/meta-ads/05 Ad Strategy And Budget/Campaign Plan.excalidraw.md
 * and a flat preview SVG next to this script (or into argv[2]).
 *
 *   node .claude/skills/draw/generators/campaign-plan-round-one.js [previewDir]
 *
 * Run from the repo root. Re-running keeps element ids stable; do not re-run once
 * the drawing has been hand-edited in Obsidian without asking first.
 */
const path = require('path');
const ROOT = process.cwd();
const { Scene, PALETTE } = require(path.join(ROOT, '.claude/skills/draw/lib/excalidraw.js'));

const OUT = path.join(ROOT, 'brain/process/meta-ads/05 Ad Strategy And Budget/Campaign Plan.excalidraw.md');
const PREVIEW = path.join(process.argv[2] || __dirname, 'campaign-plan-round-one.svg');

const s = new Scene();
const grey = PALETTE.grey.stroke;
const red = PALETTE.red.stroke;

/* ── title ─────────────────────────────────────────────────────────── */
s.text(60, 40, 'WinkyPie · Meta round one — the campaign plan', { size: 30 });
s.text(60, 86,
  'Written 2026-09-02 · one Advantage+ app campaign · one ad set · five ads · $45–60 a day · 14 days · 30% reserve',
  { size: 14, color: grey });

/* ── 1 · structure ─────────────────────────────────────────────────── */
s.zone(60, 160, 780, 620, '1 · STRUCTURE — five hypotheses, five ads, one ad set', { accent: 'blue' });

const camp = s.node(100, 200, 300, 112, 'Campaign', {
  accent: 'blue', fill: 'tint', link: '[[Budget And Thresholds]]',
  sub: 'Advantage+ App · iOS 14+ · optimise: app installs · lowest cost, no cap',
});
const adset = s.node(100, 400, 300, 112, 'Ad set', {
  accent: 'blue', fill: 'tint',
  sub: 'US · iOS · English · Advantage+ placements · one ad set by rule',
});
s.arrow(camp, adset, { label: 'daily budget lives here' });

s.text(100, 560, 'Meta splits the budget across the five as it likes — judge an ad only past 3,000 impressions; below that it is starved, not lost.',
  { size: 12, width: 300, color: grey });

const ads = [
  ['WP_P2_STATIC_100ms', 'static · in-house design · "She decided in 100 ms."', 'ink', '[[WP_P2_STATIC_100ms]]'],
  ['WP_P2_DEMO_freecheck', 'video · our own screen capture · "Would your selfie pass?"', 'teal', '[[WP_P2_DEMO_freecheck]]'],
  ['WP_P1_UGC_coached', 'video · human creator, Billo, 3–5 men · confession hook', 'orange', '[[WP_P1_UGC_coached]]'],
  ['WP_P3_POSERESULT_stillyou', 'video or static · one real generation pair · "Looks pro. Still you."', 'ink', '[[WP_P3_POSERESULT_stillyou]]'],
  ['WP_P1_STATIC_algorithm', 'static · in-house design · "Not the algorithm. The first photo."', 'ink', '[[WP_P1_STATIC_algorithm]]'],
];
const adNodes = ads.map(([name, sub, accent, link], i) =>
  s.node(520, 170 + i * 116, 280, 96, name, {
    accent, fill: accent === 'ink' ? undefined : 'tint', bg: accent === 'ink' ? '#ffffff' : undefined,
    sub, size: 14, link,
  }));
for (const ad of adNodes) s.arrow(adset, ad);

s.text(60, 800, 'white = in-house · teal = app capture · orange = external creator — four of the five need no human on camera',
  { size: 12, color: grey });

/* ── 2 · budget ────────────────────────────────────────────────────── */
s.zone(920, 160, 640, 300, '2 · BUDGET — sized to exit learning, not to feel affordable', { accent: 'yellow' });

const daily = s.node(960, 200, 260, 90, '$45–60 a day', {
  accent: 'yellow', fill: 'tint', sub: '~50 installs in 7 days = out of learning',
});
const test = s.node(1260, 200, 260, 90, '14 days ≈ $650–850', {
  accent: 'yellow', fill: 'tint', sub: 'the window nobody touches',
});
s.arrow(daily, test);
s.node(960, 330, 260, 104, 'Reserve 30% ≈ $200–250', {
  accent: 'grey', fill: 'tint', strokeStyle: 'dashed',
  sub: 'locked until day 14 · funds a new ad set for the winner',
});
s.text(1260, 316, 'Sizing rule: weekly budget = 50 × CPI\nCPI $4 → $29 a day\nCPI $6 → $43 a day\nCPI $8 → $57 a day\nCPI is unknown — round one measures it',
  { size: 13, width: 280, color: PALETTE.yellow.stroke });

/* ── 3 · timeline and gates ────────────────────────────────────────── */
s.zone(60, 880, 1500, 320, '3 · TIMELINE & GATES — read, do not touch, then decide', { accent: 'violet' });
s.line([[100, 976], [1440, 976]], { stroke: PALETTE.violet.stroke, strokeWidth: 2 });

const days = [
  ['Day 1 — delivery only', 'spending? impressions? events arriving? no performance read', null],
  ['Day 7 — learning check', '~50 installs? learning limited → raise budget once, note the reset', null],
  ['Day 14 — creative gates', 'per ad ≥3,000 impressions → kill · iterate · scale', '[[KPI]]'],
  ['Day 28 — business read', 'install→trial · trial→paid · CAC against the payback table', '[[09 Analyze KPIs]]'],
];
const dayNodes = days.map(([label, sub, link], i) =>
  s.node(100 + i * 360, 924, 260, 104, label, { accent: 'violet', fill: 'tint', sub, size: 15, link: link || undefined }));
s.arrow(dayNodes[0], dayNodes[1], { label: 'no edits' });
s.arrow(dayNodes[1], dayNodes[2], { label: 'no edits' });
s.arrow(dayNodes[2], dayNodes[3], { label: 'reserve call' });

s.text(100, 1044, 'Days 1–14: no budget, creative or targeting edits — a significant edit resets learning (Meta). A rejected ad is fixed, its clock restarts, and it is reported separately.',
  { size: 12, width: 560, color: red });

const kill = s.node(700, 1090, 200, 70, 'Kill → retired list', { accent: 'red', fill: 'tint', size: 14 });
const iter = s.node(920, 1090, 220, 70, 'Iterate → wave two', { accent: 'ink', bg: '#ffffff', size: 14 });
const scale = s.node(1160, 1090, 300, 70, 'Scale → new ad set, winner + 2 hooks', { accent: 'green', fill: 'tint', size: 14 });
s.arrow([[880, 1028], [880, 1060], [800, 1060], [800, 1090]], { elbow: true, accent: 'red' });
s.arrow([[950, 1028], [950, 1060], [1030, 1060], [1030, 1090]], { elbow: true, accent: 'ink' });
s.arrow([[1020, 1028], [1020, 1060], [1310, 1060], [1310, 1090]], { elbow: true, accent: 'green' });
void kill; void iter; void scale;

/* ── footer ────────────────────────────────────────────────────────── */
s.text(60, 1220,
  'Sources: Meta Business Help (learning phase · Advantage+ app campaigns · iOS 14+ limits · minimum budgets · SKAdNetwork reporting) · bir.ch creative-testing framework · RevenueCat State of Subscription Apps 2025/2026. The reasoning: Budget And Thresholds.md · KPI.md.',
  { size: 12, width: 1500, color: grey });

const problems = s.validate();
if (problems.length) {
  console.error('validate():', problems);
  process.exitCode = 1;
} else {
  console.log('validate(): []');
}
s.previewSVG(PREVIEW);
s.writeObsidian(OUT);
console.log('wrote', OUT);
console.log('preview', PREVIEW);
