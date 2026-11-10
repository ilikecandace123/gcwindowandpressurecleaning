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

// Same drawing as <LogoMark />. `simple` thickens the blade, handle and edge
// so the 16px favicon stays readable.
function markSvg({ size, simple = false }) {
  const blade = simple ? 12 : 8;
  const handle = simple ? 10 : 6;
  const edge = simple ? 7 : 4;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="${size}" height="${size}">
  <rect x="8" y="8" width="80" height="80" rx="16" fill="${ACCENT}"/>
  <path d="M38 20L76 58L46 88H24A16 16 0 0 1 8 72V50Z" fill="${PANE}" opacity=".95"/>
  <path d="M38 20L76 58" stroke="${INK}" stroke-width="${blade}" stroke-linecap="round"/>
  <path d="M57 39L78 18" stroke="${INK}" stroke-width="${handle}" stroke-linecap="round"/>
  <rect x="8" y="8" width="80" height="80" rx="16" fill="none" stroke="${INK}" stroke-width="${edge}"/>
</svg>`;
}

const fontUrl = (f) => "file://" + out("fonts/" + f);

function page({ width, height, background, body }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Source Sans 3";font-weight:200 900;font-style:normal;src:url("${fontUrl("source-sans-3-latin.woff2")}") format("woff2")}
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

  // Wide logo: mark + two-line wordmark in bold capitals on paper.
  const wordmark = `<div style="display:flex;align-items:center;gap:30px">
    ${markSvg({ size: 132 })}
    <div style="font-family:'Source Sans 3',sans-serif;font-weight:700;font-size:46px;line-height:1.08;letter-spacing:.035em;text-transform:uppercase;color:${INK};white-space:nowrap">
      <div>Gold Coast Window</div>
      <div><span style="color:${ACCENT_2}">&amp;</span> Pressure Cleaning</div>
    </div></div>`;
  fs.writeFileSync(out("images/logo.png"), await shot({ width: 750, height: 500, background: PAPER, body: wordmark }));

  // Square icons: the mark on paper with breathing room.
  fs.writeFileSync(out("images/icon-512.png"), await shot({ width: 512, height: 512, background: PAPER, body: markSvg({ size: 440 }) }));
  fs.writeFileSync(out("images/apple-touch-icon.png"), await shot({ width: 180, height: 180, background: PAPER, body: markSvg({ size: 158 }) }));

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
