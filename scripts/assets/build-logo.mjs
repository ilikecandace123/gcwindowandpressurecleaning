// Exports the raster copies of the brand mark drawn in src/components/Logo.jsx:
//
//   public/images/logo.png + logo.avif   750x500 mark + wordmark on paper (schema / social)
//   public/images/icon-512.png           512x512 app icon
//   public/images/apple-touch-icon.png   180x180
//   public/favicon.ico                   16/32/48 (PNG-in-ICO)
//
// Run by hand after changing the mark:  node scripts/assets/build-logo.mjs
// Needs Chrome via puppeteer (already a devDependency). logo.avif is written
// with Python's Pillow when it is installed; otherwise it is left as it was.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import puppeteer from "puppeteer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const out = (p) => path.join(ROOT, "public", p);

const INK = "#17233b";
const PAPER = "#fbfcfd";
const PANE = "#ffffff";
const ACCENT = "#7cc8f5";
const ACCENT_2 = "#2b8bd0";

// Same drawing as <LogoMark />. `simple` drops the wave and sparkle and
// thickens the lines so the 16px favicon stays readable.
function markSvg({ size, simple = false }) {
  const frame = simple ? 5 : 3;
  const bar = simple ? 4 : 2.5;
  const inset = frame / 2 + 3;
  const side = 48 - inset * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="${size}" height="${size}">
  <rect x="${inset}" y="${inset}" width="${side}" height="${side}" rx="7" fill="${PANE}" stroke="${INK}" stroke-width="${frame}"/>
  <path d="${simple ? "M11 34a13 13 0 0 1 26 0z" : "M13 31.5a11 11 0 0 1 22 0z"}" fill="${ACCENT}"/>
  <path d="M24 ${inset}v${side}M${inset} 24h${side}" stroke="${INK}" stroke-width="${bar}"/>
  ${
    simple
      ? ""
      : `<path d="M8 35.5c2.7-2.6 5.3-2.6 8 0s5.3 2.6 8 0 5.3-2.6 8 0 5.3 2.6 8 0" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M33.5 9.5l1.4 3.6 3.6 1.4-3.6 1.4-1.4 3.6-1.4-3.6-3.6-1.4 3.6-1.4z" fill="${ACCENT}"/>`
  }
</svg>`;
}

const fontUrl = (f) => "file://" + out("fonts/" + f);

function page({ width, height, background, body }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Fraunces;font-weight:100 900;font-style:normal;src:url("${fontUrl("fraunces-latin.woff2")}") format("woff2")}
@font-face{font-family:Fraunces;font-weight:100 900;font-style:italic;src:url("${fontUrl("fraunces-latin-italic.woff2")}") format("woff2")}
html,body{margin:0;width:${width}px;height:${height}px;background:${background};overflow:hidden}
body{display:flex;align-items:center;justify-content:center}
</style></head><body>${body}</body></html>`;
}

// PNG-in-ICO: 6-byte header, one 16-byte directory entry per image, then the PNGs.
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + dir.length;
  images.forEach(({ size, png }, i) => {
    const e = i * 16;
    dir.writeUInt8(size, e);
    dir.writeUInt8(size, e + 1);
    dir.writeUInt16LE(1, e + 4);
    dir.writeUInt16LE(32, e + 6);
    dir.writeUInt32LE(png.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += png.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.png)]);
}

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox", "--allow-file-access-from-files"] });
try {
  const tab = await browser.newPage();

  async function shot({ width, height, background, body, transparent = false }) {
    await tab.setViewport({ width, height, deviceScaleFactor: 1 });
    const html = page({ width, height, background: transparent ? "transparent" : background, body });
    const tmp = path.join(ROOT, "scripts/assets/.logo-tmp.html");
    fs.writeFileSync(tmp, html);
    try {
      await tab.goto("file://" + tmp, { waitUntil: "load" });
      await tab.evaluate(() => document.fonts.ready);
      return Buffer.from(await tab.screenshot({ type: "png", omitBackground: transparent }));
    } finally {
      fs.rmSync(tmp, { force: true });
    }
  }

  // Wide logo: mark + two-line wordmark on paper.
  const wordmark = `<div style="display:flex;align-items:center;gap:30px">
    ${markSvg({ size: 150 })}
    <div style="font-family:Fraunces,serif;font-weight:700;font-size:52px;line-height:1.05;letter-spacing:-.015em;color:${INK};white-space:nowrap">
      <div>Gold Coast Window</div>
      <div><span style="font-style:italic;font-weight:500;color:${ACCENT_2}">&amp;</span> Pressure Cleaning</div>
    </div></div>`;
  fs.writeFileSync(out("images/logo.png"), await shot({ width: 750, height: 500, background: PAPER, body: wordmark }));

  // Square icons: the mark on paper with breathing room.
  fs.writeFileSync(out("images/icon-512.png"), await shot({ width: 512, height: 512, background: PAPER, body: markSvg({ size: 400 }) }));
  fs.writeFileSync(out("images/apple-touch-icon.png"), await shot({ width: 180, height: 180, background: PAPER, body: markSvg({ size: 144 }) }));

  // Favicon: transparent, edge to edge; the simplified mark at 16px.
  const ico = [];
  for (const size of [16, 32, 48]) {
    ico.push({ size, png: await shot({ width: size, height: size, transparent: true, body: markSvg({ size, simple: size < 32 }) }) });
  }
  fs.writeFileSync(out("favicon.ico"), buildIco(ico));
} finally {
  await browser.close();
}

try {
  execFileSync("python3", [
    "-c",
    "import sys; from PIL import Image; Image.open(sys.argv[1]).convert('RGB').save(sys.argv[2], 'AVIF', quality=70)",
    out("images/logo.png"),
    out("images/logo.avif"),
  ]);
} catch {
  console.warn("logo.avif not rebuilt (python3 + Pillow with AVIF support not available).");
}

for (const f of ["images/logo.png", "images/logo.avif", "images/icon-512.png", "images/apple-touch-icon.png", "favicon.ico"]) {
  console.log(f.padEnd(32), fs.statSync(out(f)).size, "bytes");
}
