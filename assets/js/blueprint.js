// Draws a wireframe "blueprint" of the product described by the brief.
// Output is an SVG string on a 480 × 360 canvas: a device frame plus a goal module,
// with lettered markers (A, B, C) that match the spec sheet's module list.

const BRANDS = {
  startup: "acme.app", restaurant: "thebistro.com", clinic: "carewell.health", retail: "norththread.store",
  realestate: "keystone.homes", school: "brightfield.edu", enterprise: "ops.internal",
};

let t = 0; // running animation delay
const d = (step = 0.035) => (t += step).toFixed(3);

const rect = (x, y, w, h, r = 0, cls = "bp-stroke", extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" class="${cls} bp-draw" style="--len:${Math.round(2 * (w + h))};--d:${d()}s" ${extra}/>`;
const block = (x, y, w, h, r = 2, cls = "bp-soft") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" class="${cls} bp-pop" style="--d:${d(0.02)}s"/>`;
const line = (x1, y1, x2, y2, cls = "bp-stroke") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls} bp-draw" style="--len:${Math.round(Math.hypot(x2 - x1, y2 - y1)) + 2};--d:${d()}s"/>`;
const circle = (cx, cy, r, cls = "bp-stroke") =>
  cls.includes("bp-stroke") || cls.includes("bp-thin") || cls.includes("blue-stroke")
    ? `<circle cx="${cx}" cy="${cy}" r="${r}" class="${cls} bp-draw" style="--len:${Math.round(2 * Math.PI * r) + 2};--d:${d()}s"/>`
    : `<circle cx="${cx}" cy="${cy}" r="${r}" class="${cls} bp-pop" style="--d:${d(0.02)}s"/>`;
const text = (x, y, s, cls = "bp-label", anchor = "start") =>
  `<text x="${x}" y="${y}" class="${cls} bp-pop" text-anchor="${anchor}" style="--d:${d(0.02)}s">${s}</text>`;
const lines = (x, y, w, n = 2, gap = 7) =>
  Array.from({ length: n }, (_, i) => block(x, y + i * gap, i === n - 1 ? w * 0.6 : w, 3, 1.5)).join("");

const marker = (x, y, letter) =>
  `<g class="bp-pop" style="--d:${d(0.05)}s"><circle cx="${x}" cy="${y}" r="8.5" class="bp-blue"/><text x="${x}" y="${y + 3.2}" class="bp-tag" text-anchor="middle">${letter}</text></g>`;

/* ---------- Frames: return markup + the content box ---------- */

function browserFrame(brand, ghost) {
  let s = "";
  if (ghost) {
    s += `<rect x="28" y="40" width="400" height="296" rx="10" fill="none" style="stroke:var(--ink-3)" stroke-dasharray="4 5" opacity=".6"/>`;
    s += text(32, 352, "BEFORE");
  }
  s += `<rect x="40" y="28" width="400" height="296" rx="10" fill="#fbfaf6"/>`;
  s += rect(40, 28, 400, 296, 10);
  s += line(40, 56, 440, 56);
  s += circle(56, 42, 3.5, "bp-soft") + circle(68, 42, 3.5, "bp-soft") + circle(80, 42, 3.5, "bp-soft");
  s += rect(150, 35, 180, 14, 7, "bp-thin");
  s += text(240, 45, brand, "bp-label", "middle");
  // dimension line
  s += line(40, 14, 440, 14, "bp-dim") + line(40, 10, 40, 18, "bp-dim") + line(440, 10, 440, 18, "bp-dim");
  s += `<rect x="212" y="8" width="56" height="12" class="bp-bg"/>` + text(240, 17, ghost ? "AFTER · 1440" : "1440 PX", "bp-label", "middle");
  return { svg: s, box: { x: 58, y: 72, w: 364, h: 236 } };
}

function phoneFrame(brand) {
  let s = "";
  s += `<rect x="170" y="16" width="140" height="328" rx="24" fill="#fbfaf6"/>`;
  s += rect(170, 16, 140, 328, 24);
  s += rect(177, 23, 126, 314, 18, "bp-thin");
  s += `<rect x="219" y="29" width="42" height="10" rx="5" class="bp-fill bp-pop" style="--d:${d()}s"/>`;
  s += line(222, 331, 258, 331);
  s += text(240, 54, brand, "bp-label", "middle");
  s += line(330, 16, 330, 344, "bp-dim") + line(326, 16, 334, 16, "bp-dim") + line(326, 344, 334, 344, "bp-dim");
  s += `<text x="346" y="184" class="bp-label bp-pop" transform="rotate(90 346 184)" text-anchor="middle" style="--d:${d()}s">390 × 844</text>`;
  s += text(150, 184, "iOS", "bp-label", "end") + text(150, 196, "ANDROID", "bp-label", "end");
  return { svg: s, box: { x: 186, y: 64, w: 108, h: 258 } };
}

function chatFrame(brand) {
  let s = "";
  s += `<rect x="88" y="28" width="304" height="300" rx="16" fill="#fbfaf6"/>`;
  s += rect(88, 28, 304, 300, 16);
  s += line(88, 70, 392, 70);
  s += circle(112, 49, 11, "bp-blue");
  s += `<path d="M107 49h10M112 44v10" stroke="#fff" stroke-width="1.6" class="bp-pop" style="--d:${d()}s"/>`;
  s += text(131, 46, "ASSISTANT") + text(131, 58, brand);
  s += circle(372, 49, 3, "bp-blue");
  s += rect(102, 292, 246, 24, 12, "bp-thin");
  s += circle(366, 304, 12, "bp-blue");
  s += `<path d="M361 304h9M366 299l5 5-5 5" stroke="#fff" stroke-width="1.6" fill="none" class="bp-pop" style="--d:${d()}s"/>`;
  s += line(400, 28, 400, 328, "bp-dim");
  s += text(408, 180, "24/7", "bp-label");
  return { svg: s, box: { x: 102, y: 82, w: 276, h: 198 } };
}

/* ---------- Goal modules: return markup + 3 marker anchors ---------- */

const modules = {
  bookings(b) {
    const narrow = b.w < 160;
    let s = text(b.x, b.y + 6, "BOOK A SLOT");
    const calW = narrow ? b.w : b.w * 0.56, top = b.y + 16;
    const cols = 7, rows = 5, cw = calW / cols, ch = narrow ? 16 : 26;
    s += rect(b.x, top, calW, ch * rows, 6, "bp-thin");
    for (let c = 1; c < cols; c++) s += line(b.x + c * cw, top, b.x + c * cw, top + ch * rows, "bp-thin");
    for (let r = 1; r < rows; r++) s += line(b.x, top + r * ch, b.x + calW, top + r * ch, "bp-thin");
    s += `<rect x="${b.x + 3 * cw + 2}" y="${top + 2 * ch + 2}" width="${cw - 4}" height="${ch - 4}" rx="3" class="bp-blue bp-pop" style="--d:${d()}s"/>`;
    const sx = narrow ? b.x : b.x + calW + 16, sw = narrow ? b.w : b.w - calW - 16;
    const sy = narrow ? top + ch * rows + 14 : top;
    const n = narrow ? 3 : 4, ph = narrow ? 18 : 24;
    for (let i = 0; i < n; i++) {
      const cls = i === 1 ? "bp-wash" : "bp-thin";
      s += `<rect x="${sx}" y="${sy + i * (ph + 8)}" width="${sw}" height="${ph}" rx="${ph / 2}" class="${cls} bp-pop" style="--d:${d()}s"/>`;
      s += block(sx + 12, sy + i * (ph + 8) + ph / 2 - 1.5, sw * 0.35, 3);
    }
    const by = sy + n * (ph + 8) + 4;
    s += `<rect x="${sx}" y="${by}" width="${sw}" height="${ph + 4}" rx="${(ph + 4) / 2}" class="bp-fill bp-pop" style="--d:${d()}s"/>`;
    s += `<text x="${sx + sw / 2}" y="${by + (ph + 4) / 2 + 3}" class="bp-tag" text-anchor="middle">CONFIRM</text>`;
    return { svg: s, marks: [[b.x + calW - 4, top + 4], [sx + sw - 4, by + 4], narrow ? [b.x + 4, sy + 4] : [sx + sw - 4, sy + 4]] };
  },

  sells(b) {
    const narrow = b.w < 160;
    let s = text(b.x, b.y + 6, "SHOP");
    s += rect(b.x + b.w - 22, b.y - 4, 20, 16, 4, "bp-thin");
    s += circle(b.x + b.w - 2, b.y - 4, 6, "bp-blue");
    const cols = narrow ? 2 : 3, rows = 2, gap = 10, top = b.y + 20;
    const cw = (b.w - gap * (cols - 1)) / cols, chh = narrow ? 92 : 92;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const x = b.x + c * (cw + gap), y = top + r * (chh + gap);
        s += rect(x, y, cw, chh, 6, "bp-thin");
        s += block(x + 6, y + 6, cw - 12, chh * 0.5, 4, r === 0 && c === 1 ? "bp-wash" : "bp-soft");
        s += lines(x + 6, y + chh * 0.5 + 14, cw - 24, 2);
        s += block(x + 6, y + chh - 14, 22, 6, 3, "bp-fill");
      }
    const end = top + rows * (chh + gap);
    if (end + 18 < b.y + b.h + 8) {
      s += `<rect x="${b.x}" y="${end}" width="${b.w}" height="22" rx="11" class="bp-blue bp-pop" style="--d:${d()}s"/>`;
      s += `<text x="${b.x + b.w / 2}" y="${end + 14}" class="bp-tag" text-anchor="middle">CHECKOUT</text>`;
    }
    return { svg: s, marks: [[b.x + 6, top + 6], [b.x + b.w - 2, b.y - 4], [b.x + b.w - 8, top + chh + gap + 6]] };
  },

  answers(b) {
    let s = text(b.x, b.y + 6, "SUPPORT");
    const bw = Math.min(b.w * 0.72, 220);
    const rows = [
      { right: false, h: 30, cls: "bp-soft" },
      { right: true, h: 22, cls: "bp-wash" },
      { right: false, h: 44, cls: "bp-soft" },
      { right: true, h: 22, cls: "bp-wash" },
    ];
    let y = b.y + 18;
    const pts = [];
    for (const r of rows) {
      if (y + r.h > b.y + b.h - 18) break;
      const x = r.right ? b.x + b.w - bw * 0.8 : b.x;
      const w = r.right ? bw * 0.8 : bw;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${r.h}" rx="10" class="${r.cls} bp-pop" style="--d:${d(0.08)}s"/>`;
      pts.push([r.right ? x + w - 4 : x + w - 4, y + 4]);
      y += r.h + 10;
    }
    s += circle(b.x + 10, y + 6, 3, "bp-fill") + circle(b.x + 20, y + 6, 3, "bp-fill") + circle(b.x + 30, y + 6, 3, "bp-fill");
    return { svg: s, marks: [pts[0] || [b.x, b.y], pts[2] || pts[1] || [b.x + 40, b.y], [b.x + 40, y + 6]] };
  },

  automates(b) {
    const narrow = b.w < 160;
    let s = text(b.x, b.y + 6, "WORKFLOW");
    const labels = ["TRIGGER", "PROCESS", "NOTIFY"];
    const marks = [];
    if (narrow) {
      const nh = 52, gap = 30;
      labels.forEach((l, i) => {
        const y = b.y + 22 + i * (nh + gap);
        s += rect(b.x, y, b.w, nh, 8, i === 1 ? "bp-blue-stroke" : "bp-stroke");
        s += text(b.x + 10, y + 18, l) + lines(b.x + 10, y + 28, b.w - 30, 2);
        if (i < 2) s += line(b.x + b.w / 2, y + nh, b.x + b.w / 2, y + nh + gap, "bp-blue-stroke");
        marks.push([b.x + b.w - 4, y + 4]);
      });
    } else {
      const nw = (b.w - 2 * 34) / 3, nh = 74, y = b.y + 40;
      labels.forEach((l, i) => {
        const x = b.x + i * (nw + 34);
        s += rect(x, y, nw, nh, 8, i === 1 ? "bp-blue-stroke" : "bp-stroke");
        s += text(x + 10, y + 20, l) + lines(x + 10, y + 32, nw - 28, 3);
        if (i < 2) {
          s += line(x + nw, y + nh / 2, x + nw + 34, y + nh / 2, "bp-blue-stroke");
          s += `<path d="M${x + nw + 28} ${y + nh / 2 - 4}l6 4-6 4" class="bp-blue-stroke bp-pop" style="--d:${d()}s"/>`;
        }
        marks.push([x + nw - 4, y + 4]);
      });
      // integrations row
      const iy = y + nh + 32;
      s += text(b.x, iy - 8, "CONNECTED TO");
      ["SHEETS", "EMAIL", "CRM", "SLACK"].forEach((n, i) => {
        const iw = (b.w - 30) / 4, ix = b.x + i * (iw + 10);
        s += rect(ix, iy, iw, 26, 13, "bp-thin") + text(ix + iw / 2, iy + 16, n, "bp-label", "middle");
      });
      s += circle(b.x + b.w - 10, y + nh + 12, 7, "bp-blue");
      marks[1] = [b.x + nw + 34 + nw - 4, y + 4];
      marks[2] = [b.x + b.w - 4, iy + 4];
    }
    return { svg: s, marks };
  },

  customers(b) {
    const narrow = b.w < 160;
    let s = text(b.x, b.y + 6, "CUSTOMERS");
    s += rect(b.x + b.w - (narrow ? 40 : 90), b.y - 4, narrow ? 40 : 90, 16, 8, "bp-thin");
    const top = b.y + 22, rh = narrow ? 34 : 28, n = narrow ? 6 : 7;
    if (!narrow) s += line(b.x, top + 4, b.x + b.w, top + 4, "bp-thin");
    for (let i = 0; i < n; i++) {
      const y = top + (narrow ? 0 : 12) + i * rh;
      if (y + rh > b.y + b.h + 6) break;
      if (i === 2) s += `<rect x="${b.x - 4}" y="${y - 4}" width="${b.w + 8}" height="${rh - 2}" rx="6" class="bp-wash bp-pop" style="--d:${d()}s"/>`;
      s += circle(b.x + 9, y + rh / 2 - 3, 7, i === 2 ? "bp-blue" : "bp-soft");
      s += lines(b.x + 24, y + 4, narrow ? b.w - 30 : b.w * 0.28, 2, 7);
      if (!narrow) {
        s += block(b.x + b.w * 0.45, y + 8, b.w * 0.2, 3);
        s += `<rect x="${b.x + b.w - 56}" y="${y + 3}" width="48" height="13" rx="6.5" class="${i % 3 === 0 ? "bp-fill" : "bp-thin"} bp-pop" style="--d:${d(0.02)}s"/>`;
      }
    }
    return { svg: s, marks: [[b.x + 16, top + (narrow ? 0 : 12) + 2], [b.x + b.w - 4, top + (narrow ? 0 : 12) + 2 * rh + 2], [b.x + b.w - 4, b.y - 4]] };
  },

  tracks(b) {
    const narrow = b.w < 160;
    let s = text(b.x, b.y + 6, "DASHBOARD");
    const kpis = narrow ? 2 : 3, gap = 10, kw = (b.w - gap * (kpis - 1)) / kpis, kh = 46, top = b.y + 18;
    for (let i = 0; i < kpis; i++) {
      const x = b.x + i * (kw + gap);
      s += rect(x, top, kw, kh, 8, i === 0 ? "bp-blue-stroke" : "bp-thin");
      s += block(x + 8, top + 10, kw * 0.4, 3);
      s += block(x + 8, top + 22, kw * 0.55, 12, 3, i === 0 ? "bp-blue" : "bp-fill");
    }
    const cy = top + kh + 18, chH = b.y + b.h - cy - 4;
    s += rect(b.x, cy, b.w, chH, 8, "bp-thin");
    const bars = narrow ? 6 : 10, bw = (b.w - 24) / bars;
    const hs = [0.35, 0.5, 0.42, 0.6, 0.55, 0.72, 0.64, 0.8, 0.74, 0.9];
    const pts = [];
    for (let i = 0; i < bars; i++) {
      const h = (chH - 24) * hs[i + (10 - bars)];
      const x = b.x + 12 + i * bw + bw * 0.2;
      const y = cy + chH - 10 - h;
      s += `<rect x="${x}" y="${y}" width="${bw * 0.6}" height="${h}" rx="2" class="${i === bars - 1 ? "bp-blue" : "bp-soft"} bp-pop" style="--d:${d(0.03)}s"/>`;
      pts.push(`${x + bw * 0.3},${y - 8}`);
    }
    s += `<polyline points="${pts.join(" ")}" class="bp-blue-stroke bp-draw" style="--len:${b.w * 1.4};--d:${d()}s"/>`;
    return { svg: s, marks: [[b.x + kw - 4, top + 4], [b.x + b.w - 4, cy + 4], [b.x + b.w - 14, cy + chH - 18]] };
  },
};

export function drawBlueprint({ who, product, goal }) {
  t = 0;
  const brand = BRANDS[who.id] || "yourbrand.com";
  let frame;
  if (product.frame === "phone") frame = phoneFrame(brand);
  else if (product.frame === "chat") frame = chatFrame(brand);
  else frame = browserFrame(brand, product.id === "redesign");

  let body;
  if (product.frame === "chat" && goal.id !== "answers") {
    // The assistant replies with the goal module as a rich card.
    const b = frame.box;
    let s = `<rect x="${b.x + b.w - 150}" y="${b.y}" width="150" height="22" rx="11" class="bp-wash bp-pop" style="--d:${d()}s"/>`;
    s += block(b.x + b.w - 138, b.y + 9.5, 100, 3, 1.5);
    s += rect(b.x, b.y + 32, b.w - 20, b.h - 32, 12, "bp-thin");
    const inner = modules[goal.id]({ x: b.x + 12, y: b.y + 46, w: b.w - 44, h: b.h - 58 });
    // Shrink the module into the reply card.
    const cx = b.x + 12, cy = b.y + 46;
    s += `<g transform="translate(${cx} ${cy}) scale(0.62) translate(${-cx} ${-cy})">${inner.svg}</g>`;
    const marks = inner.marks.map(([x, y]) => [cx + (x - cx) * 0.62, cy + (y - cy) * 0.62]);
    body = { svg: s, marks };
  } else {
    body = modules[goal.id](frame.box);
  }

  const marks = body.marks.map(([x, y], i) => marker(x, y, "ABC"[i])).join("");
  return `<svg viewBox="0 0 480 360" role="img" aria-label="Wireframe of ${product.label} that ${goal.label}">${frame.svg}${body.svg}${marks}</svg>`;
}
