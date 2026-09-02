'use strict';
/**
 * excalidraw.js — build Excalidraw scenes from Node, with no dependencies.
 *
 *   const { Scene, PALETTE } = require(process.cwd() + '/.claude/skills/draw/lib/excalidraw.js');
 *   const s = new Scene();
 *   const a = s.node(100, 100, 220, 90, 'Start', { accent: 'blue' });
 *   const b = s.node(460, 100, 220, 90, 'Finish', { accent: 'green' });
 *   s.arrow(a, b, { label: 'gate' });
 *   console.log(s.validate());          // layout warnings before you render
 *   s.writeObsidian('Flow.excalidraw.md');
 *
 * Everything is plain data — reach into `s.elements` if you need something exotic.
 */

const fs = require('fs');

/* ── fonts ───────────────────────────────────────────────────────────────
 * Excalidraw FONT_FAMILY ids. 1/2/3 are the legacy ids and still load
 * (1 renders as Excalifont in current builds). Prefer the modern ones.      */
const FONT = { hand: 5, nunito: 6, lilita: 7, comic: 8, sans: 2, code: 3 };

// Average glyph width as a fraction of fontSize, measured per family.
const CHAR_W = { 1: 0.53, 2: 0.5, 3: 0.6, 5: 0.53, 6: 0.52, 7: 0.55, 8: 0.55, 9: 0.5 };
const LINE_HEIGHT = 1.25;

/* ── palette ─────────────────────────────────────────────────────────────
 * Excalidraw's own swatches: stroke is the pen colour, bg the fill, and
 * tint the washed-out fill for zones. Never invent a colour outside this.  */
const PALETTE = {
  ink:    { stroke: '#1e1e1e', bg: '#ffffff', tint: '#f8f9fa' },
  grey:   { stroke: '#868e96', bg: '#f1f3f5', tint: '#f8f9fa' },
  blue:   { stroke: '#1971c2', bg: '#a5d8ff', tint: '#e7f5ff' },
  green:  { stroke: '#2f9e44', bg: '#b2f2bb', tint: '#ebfbee' },
  yellow: { stroke: '#f08c00', bg: '#ffec99', tint: '#fff9db' },
  red:    { stroke: '#e03131', bg: '#ffc9c9', tint: '#ffe3e3' },
  violet: { stroke: '#6741d9', bg: '#d0bfff', tint: '#f3f0ff' },
  teal:   { stroke: '#0c8599', bg: '#96f2d7', tint: '#e6fcf5' },
  orange: { stroke: '#e8590c', bg: '#ffd8a8', tint: '#ffe8cc' },
};
const accentOf = a => (typeof a === 'string' ? PALETTE[a] || PALETTE.ink : a || PALETTE.ink);

/* ── text metrics ────────────────────────────────────────────────────── */
function measure(str, size, font) {
  const lines = String(str).split('\n');
  const f = CHAR_W[font] ?? 0.53;
  return {
    width: Math.ceil(Math.max(...lines.map(l => l.length)) * size * f),
    height: Math.ceil(lines.length * size * LINE_HEIGHT),
    lines: lines.length,
  };
}

/** Greedy word wrap to a pixel width. Existing \n are kept as hard breaks. */
function wrap(str, maxWidth, size, font) {
  const f = CHAR_W[font] ?? 0.53;
  const max = Math.max(1, Math.floor(maxWidth / (size * f)));
  return String(str).split('\n').map(para => {
    const out = [];
    let line = '';
    for (const word of para.split(/\s+/)) {
      if (!line.length) line = word;
      else if ((line + ' ' + word).length <= max) line += ' ' + word;
      else { out.push(line); line = word; }
    }
    out.push(line);
    return out.join('\n');
  }).join('\n');
}

class Scene {
  /**
   * @param {object} [opts]
   * @param {number} [opts.font]   default FONT_FAMILY id (default FONT.hand)
   * @param {number} [opts.roughness] 0 architect, 1 artist (default 1)
   * @param {string} [opts.background] canvas colour (default '#ffffff')
   */
  constructor(opts = {}) {
    this.elements = [];
    this.font = opts.font ?? FONT.hand;
    this.roughness = opts.roughness ?? 1;
    this.background = opts.background ?? '#ffffff';
    this.meta = new Map();          // id → { zone: bool } — never written to JSON
    this._seq = 0;
    this._rand = 987654321;
  }

  /* ids are 8 chars: the Obsidian plugin uses them as block references and
   * its parser matches exactly 8 characters after the caret. */
  _id(prefix = 'e') { return (prefix + String(++this._seq).padStart(7, '0')).slice(0, 8); }
  _nonce() { return (this._rand = (this._rand * 1103515245 + 12345) % 2147483647); }

  _base(id, extra) {
    return {
      id, angle: 0,
      strokeColor: '#1e1e1e', backgroundColor: 'transparent',
      fillStyle: 'solid', strokeWidth: 2, strokeStyle: 'solid',
      roughness: this.roughness, opacity: 100,
      groupIds: [], frameId: null, roundness: null,
      seed: this._nonce(), version: 1, versionNonce: this._nonce(),
      isDeleted: false, boundElements: [], updated: 1, link: null, locked: false,
      ...extra,
    };
  }

  add(el) { this.elements.push(el); return el; }
  get(id) { return this.elements.find(e => e.id === (id && id.id ? id.id : id)); }

  /* ── shapes ────────────────────────────────────────────────────────── */
  /**
   * A bare shape. `o.accent` picks a palette entry; `o.fill` overrides the
   * background ('tint' uses the washed-out variant).
   */
  shape(type, x, y, w, h, o = {}) {
    const c = accentOf(o.accent);
    return this.add(this._base(o.id || this._id(), {
      type, x, y, width: w, height: h,
      strokeColor: o.stroke || c.stroke,
      backgroundColor: o.bg === undefined ? (o.fill === 'tint' ? c.tint : o.fill === 'none' ? 'transparent' : c.bg) : o.bg,
      fillStyle: o.fillStyle || 'solid',
      strokeWidth: o.strokeWidth ?? 2,
      strokeStyle: o.strokeStyle || 'solid',
      roundness: o.sharp || type === 'diamond' ? null : { type: 3 },
      link: o.link || null,
    }));
  }
  rect(x, y, w, h, o) { return this.shape('rectangle', x, y, w, h, o); }
  ellipse(x, y, w, h, o) { return this.shape('ellipse', x, y, w, h, o); }
  diamond(x, y, w, h, o) { return this.shape('diamond', x, y, w, h, o); }

  /* ── text ──────────────────────────────────────────────────────────── */
  /**
   * Standalone text. Pass `o.width` to get a fixed box (text is wrapped to
   * it and `o.align` applies inside that box); otherwise it sizes itself.
   */
  text(x, y, str, o = {}) {
    const size = o.size || 16;
    const font = o.font ?? this.font;
    const body = o.width ? wrap(str, o.width - 4, size, font) : String(str);
    const m = measure(body, size, font);
    return this.add(this._base(o.id || this._id('t'), {
      type: 'text', x, y,
      width: o.width || m.width, height: m.height,
      strokeColor: o.color || '#1e1e1e',
      text: body, rawText: body, originalText: body,
      fontSize: size, fontFamily: font,
      textAlign: o.align || 'left', verticalAlign: 'top',
      containerId: null, autoResize: !o.width, lineHeight: LINE_HEIGHT,
      link: o.link || null,
    }));
  }

  /** Text bound inside a shape or arrow — Excalidraw centres and re-wraps it. */
  bindText(container, str, o = {}) {
    const size = o.size || 16;
    const font = o.font ?? this.font;
    const isArrow = container.type === 'arrow';
    const maxW = isArrow ? (o.width || 220) : container.width - 16;
    const body = wrap(str, maxW, size, font);
    const m = measure(body, size, font);
    const t = this.add(this._base(o.id || this._id('t'), {
      type: 'text',
      x: container.x + (container.width - m.width) / 2,
      y: container.y + (container.height - m.height) / 2,
      width: Math.min(m.width, maxW), height: m.height,
      strokeColor: o.color || '#1e1e1e',
      text: body, rawText: body, originalText: body,
      fontSize: size, fontFamily: font,
      textAlign: 'center', verticalAlign: 'middle',
      containerId: container.id, autoResize: true, lineHeight: LINE_HEIGHT,
    }));
    container.boundElements.push({ id: t.id, type: 'text' });
    return t;
  }

  /**
   * A labelled box — the workhorse. Returns the shape; its label is bound,
   * so moving the box in Obsidian moves the text with it.
   * `o.sub` adds a small muted caption under the label (its own element).
   */
  node(x, y, w, h, label, o = {}) {
    const box = this.shape(o.type || 'rectangle', x, y, w, h, o);
    if (o.sub) {
      // leave room for the caption: bound text centres in the upper part
      const capSize = o.subSize || 11;
      this.bindText(box, label, { size: o.size || 16, color: o.labelColor });
      const t = this.get(box.boundElements[0].id);
      t.y = y + 14;
      t.verticalAlign = 'top';
      const cap = this.text(x, y + h - capSize * LINE_HEIGHT - 12, o.sub,
        { size: capSize, width: w, align: 'center', color: o.subColor || PALETTE.grey.stroke });
      this.meta.set(cap.id, { inside: box.id });
    } else {
      this.bindText(box, label, { size: o.size || 16, color: o.labelColor });
    }
    return box;
  }

  /**
   * A phase/group backdrop: dashed tinted rectangle with a title above it.
   * Prefer this over a real frame — frames clip anything that pokes out.
   */
  zone(x, y, w, h, title, o = {}) {
    const c = accentOf(o.accent);
    const r = this.rect(x, y, w, h, {
      accent: o.accent, fill: 'tint', strokeWidth: 1,
      strokeStyle: o.strokeStyle || 'dashed', ...o,
    });
    this.meta.set(r.id, { zone: true });
    if (title) this.text(x, y - (o.titleSize || 18) * LINE_HEIGHT - 8, title,
      { size: o.titleSize || 18, color: o.titleColor || c.stroke });
    return r;
  }

  /** A real Excalidraw frame. Children are captured by geometry on write. */
  frame(x, y, w, h, name) {
    const f = this.add(this._base(this._id('f'), {
      type: 'frame', x, y, width: w, height: h,
      strokeColor: '#bbb', backgroundColor: 'transparent',
      roundness: null, name: name || null, children: [],
    }));
    this.meta.set(f.id, { zone: true });
    return f;
  }

  /* ── connectors ────────────────────────────────────────────────────── */
  /**
   * arrow(a, b, o)            bound between two elements, auto anchors
   * arrow([[x,y],[x,y],…], o) explicit polyline, no bindings
   * o.label  bound label text · o.elbow orthogonal auto-routing
   * o.dashed · o.accent · o.gap · o.both (arrowheads at both ends)
   */
  arrow(a, b, o = {}) {
    let pts, from = null, to = null;
    if (Array.isArray(a)) { pts = a; o = b || {}; }
    else {
      from = this.get(a); to = this.get(b);
      pts = anchors(from, to, o.gap ?? 8);
    }
    const c = accentOf(o.accent || 'ink');
    const [ox, oy] = pts[0];
    const rel = pts.map(p => [p[0] - ox, p[1] - oy]);
    const xs = rel.map(p => p[0]), ys = rel.map(p => p[1]);
    const el = this.add(this._base(o.id || this._id('a'), {
      type: 'arrow', x: ox, y: oy,
      width: Math.max(...xs) - Math.min(...xs),
      height: Math.max(...ys) - Math.min(...ys),
      points: rel,
      strokeColor: o.stroke || (o.accent ? c.stroke : '#495057'),
      strokeWidth: o.strokeWidth ?? 2,
      strokeStyle: o.dashed ? 'dashed' : (o.strokeStyle || 'solid'),
      roundness: o.elbow ? null : { type: 2 },
      elbowed: !!o.elbow,
      lastCommittedPoint: null,
      startBinding: from ? { elementId: from.id, focus: 0, gap: o.gap ?? 8 } : null,
      endBinding: to ? { elementId: to.id, focus: 0, gap: o.gap ?? 8 } : null,
      startArrowhead: o.both ? 'arrow' : null,
      endArrowhead: o.head === null ? null : 'arrow',
    }));
    for (const end of [from, to]) if (end) end.boundElements.push({ id: el.id, type: 'arrow' });
    if (o.label) this.bindText(el, o.label, { size: o.labelSize || 13, color: o.labelColor || c.stroke });
    return el;
  }

  line(pts, o = {}) {
    const [ox, oy] = pts[0];
    const rel = pts.map(p => [p[0] - ox, p[1] - oy]);
    const xs = rel.map(p => p[0]), ys = rel.map(p => p[1]);
    return this.add(this._base(this._id('l'), {
      type: 'line', x: ox, y: oy,
      width: Math.max(...xs) - Math.min(...xs),
      height: Math.max(...ys) - Math.min(...ys),
      points: rel,
      strokeColor: o.stroke || '#dee2e6',
      strokeWidth: o.strokeWidth ?? 1,
      strokeStyle: o.strokeStyle || 'solid',
      lastCommittedPoint: null, startBinding: null, endBinding: null,
      startArrowhead: null, endArrowhead: null,
    }));
  }

  /* ── checks ────────────────────────────────────────────────────────── */
  /** Returns human-readable layout warnings. Run it before you render. */
  validate() {
    const w = [];
    const ids = this.elements.map(e => e.id);
    for (const id of new Set(ids.filter((v, i) => ids.indexOf(v) !== i))) w.push(`duplicate id: ${id}`);
    for (const e of this.elements) {
      if (e.type === 'text' && e.id.length !== 8) w.push(`text id must be 8 chars: ${e.id}`);
      if (e.type === 'text' && !e.text.trim()) w.push(`empty text: ${e.id}`);
    }
    const boxes = this.elements.filter(e =>
      ['text', 'rectangle', 'ellipse', 'diamond'].includes(e.type) &&
      !(this.meta.get(e.id) || {}).zone && !e.containerId);
    const overlap = (a, b) => a.x < b.x + b.width && b.x < a.x + a.width &&
                              a.y < b.y + b.height && b.y < a.y + a.height;
    for (let i = 0; i < boxes.length; i++)
      for (let j = i + 1; j < boxes.length; j++)
        if (overlap(boxes[i], boxes[j]) && !this._nested(boxes[i], boxes[j])) {
          const label = e => e.type === 'text' ? `text "${e.text.split('\n')[0].slice(0, 28)}"` : `${e.type} ${e.id}`;
          w.push(`overlap: ${label(boxes[i])} × ${label(boxes[j])}`);
        }
    return w;
  }

  _nested(a, b) {
    const ia = (this.meta.get(a.id) || {}).inside, ib = (this.meta.get(b.id) || {}).inside;
    return ia === b.id || ib === a.id || (ia && ia === ib);
  }

  bounds() {
    const xs = [], ys = [];
    for (const e of this.elements) {
      if (e.points) {                       // arrows/lines: x,y is the first point
        for (const [px, py] of e.points) { xs.push(e.x + px); ys.push(e.y + py); }
      } else {
        xs.push(e.x, e.x + (e.width || 0));
        ys.push(e.y, e.y + (e.height || 0));
      }
    }
    return { x: Math.min(...xs), y: Math.min(...ys), x2: Math.max(...xs), y2: Math.max(...ys) };
  }

  /* ── output ────────────────────────────────────────────────────────── */
  toJSON() {
    // frames capture whatever sits inside them
    for (const f of this.elements.filter(e => e.type === 'frame')) {
      f.children = this.elements
        .filter(e => e.id !== f.id && e.x >= f.x && e.y >= f.y &&
                     e.x + (e.width || 0) <= f.x + f.width && e.y + (e.height || 0) <= f.y + f.height)
        .map(e => { e.frameId = f.id; return e.id; });
    }
    return {
      type: 'excalidraw', version: 2,
      source: 'https://github.com/zsviczian/obsidian-excalidraw-plugin',
      elements: this.elements,
      appState: { gridSize: null, gridStep: 5, gridModeEnabled: false, viewBackgroundColor: this.background },
      files: {},
    };
  }

  /** Plain .excalidraw file — excalidraw.com, VS Code, anything. */
  writeExcalidraw(file) {
    fs.writeFileSync(file, JSON.stringify(this.toJSON(), null, 2));
    return file;
  }

  /** Obsidian Excalidraw plugin file (.excalidraw.md, uncompressed/parsed). */
  writeObsidian(file, o = {}) {
    const texts = this.elements.filter(e => e.type === 'text');
    const links = this.elements.filter(e => e.link);
    const tags = o.tags || ['excalidraw'];
    const md = `---

excalidraw-plugin: parsed
tags: [${tags.join(', ')}]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
${texts.map(t => `${t.rawText} ^${t.id}`).join('\n\n')}
${links.length ? `\n## Element Links\n${links.map(e => `${e.id}: ${e.link}`).join('\n\n')}\n` : ''}
%%
## Drawing
\`\`\`json
${JSON.stringify(this.toJSON(), null, '\t')}
\`\`\`
%%`;
    fs.writeFileSync(file, md);
    return file;
  }

  /** Flat SVG for the verify loop — layout only, no hand-drawn styling. */
  previewSVG(file, o = {}) {
    const b = this.bounds(), pad = 40;
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const dash = e => e.strokeStyle === 'dashed' ? ' stroke-dasharray="8 6"'
                    : e.strokeStyle === 'dotted' ? ' stroke-dasharray="2 4"' : '';
    let body = '';
    for (const e of this.elements) {
      if (e.type === 'rectangle' || e.type === 'frame') {
        body += `<rect x="${e.x}" y="${e.y}" width="${e.width}" height="${e.height}" rx="8" fill="${e.backgroundColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}"${dash(e)}/>`;
      } else if (e.type === 'ellipse') {
        body += `<ellipse cx="${e.x + e.width / 2}" cy="${e.y + e.height / 2}" rx="${e.width / 2}" ry="${e.height / 2}" fill="${e.backgroundColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}"${dash(e)}/>`;
      } else if (e.type === 'diamond') {
        const [cx, cy] = [e.x + e.width / 2, e.y + e.height / 2];
        body += `<polygon points="${cx},${e.y} ${e.x + e.width},${cy} ${cx},${e.y + e.height} ${e.x},${cy}" fill="${e.backgroundColor}" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}"${dash(e)}/>`;
      } else if (e.type === 'text') {
        const anchor = e.textAlign === 'center' ? 'middle' : e.textAlign === 'right' ? 'end' : 'start';
        const tx = anchor === 'middle' ? e.x + e.width / 2 : anchor === 'end' ? e.x + e.width : e.x;
        if (o.boxes) body += `<rect x="${e.x}" y="${e.y}" width="${e.width}" height="${e.height}" fill="none" stroke="#00000014"/>`;
        e.text.split('\n').forEach((l, i) => {
          body += `<text x="${tx}" y="${e.y + (i + 0.82) * e.fontSize * LINE_HEIGHT}" font-family="Segoe UI, Helvetica, sans-serif" font-size="${e.fontSize}" fill="${e.strokeColor}" text-anchor="${anchor}">${esc(l)}</text>`;
        });
      } else if (e.type === 'arrow' || e.type === 'line') {
        const pts = e.points.map(p => `${e.x + p[0]},${e.y + p[1]}`).join(' ');
        body += `<polyline points="${pts}" fill="none" stroke="${e.strokeColor}" stroke-width="${e.strokeWidth}"${dash(e)}${e.type === 'arrow' ? ' marker-end="url(#ah)"' : ''}/>`;
      }
    }
    // square viewBox: macOS `qlmanage` renders SVG into a square thumbnail and
    // crops whatever sticks out, so letterbox the scene rather than lose it.
    const W = b.x2 - b.x + pad * 2, H = b.y2 - b.y + pad * 2, S = Math.max(W, H);
    const vx = b.x - pad - (S - W) / 2, vy = b.y - pad - (S - H) / 2;
    fs.writeFileSync(file, `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="${vx} ${vy} ${S} ${S}">
<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#495057"/></marker></defs>
<rect x="${vx}" y="${vy}" width="${S}" height="${S}" fill="${this.background}"/>
${body}</svg>`);
    return file;
  }
}

/** Edge anchor points between two elements, picking the dominant axis. */
function anchors(a, b, gap) {
  const ac = { x: a.x + a.width / 2, y: a.y + a.height / 2 };
  const bc = { x: b.x + b.width / 2, y: b.y + b.height / 2 };
  const dx = bc.x - ac.x, dy = bc.y - ac.y;
  if (Math.abs(dx) > Math.abs(dy)) {
    const s = dx > 0 ? 1 : -1;
    return [[ac.x + s * (a.width / 2 + gap), ac.y], [bc.x - s * (b.width / 2 + gap), bc.y]];
  }
  const s = dy > 0 ? 1 : -1;
  return [[ac.x, ac.y + s * (a.height / 2 + gap)], [bc.x, bc.y - s * (b.height / 2 + gap)]];
}

module.exports = { Scene, PALETTE, FONT, measure, wrap, anchors };
