// Theme guard: the whole site uses the paper / ink / accent tokens in
// tailwind.config.js and the component classes in src/index.css. This fails if
// a stock Tailwind palette colour, a font the theme does not ship, or white
// text on accent creeps back in.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

let failures = 0;
function ok(name, cond, detail = "") {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.error(`  ✗ ${name}${detail ? " — " + detail : ""}`);
  }
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) walk(rel, out);
    else if (/\.(jsx?|css)$/.test(e.name)) out.push(rel);
  }
  return out;
}

// The French-pane diagrams are drawings of real windows and keep their own colours.
const ALLOW = new Set(["src/quote/FrenchPaneExamples.jsx"]);
const files = walk("src").filter((f) => !ALLOW.has(f));

const STOCK =
  /\b(?:bg|text|border|ring|from|via|to|fill|stroke|divide|placeholder|decoration|outline|shadow)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g;
const DYNAMIC = /\b(?:bg|text|border)-\$\{/;

console.log("\nTheme tokens:");
{
  const stock = [];
  const dynamic = [];
  const whiteOnAccent = [];
  for (const f of files) {
    const lines = read(f).split("\n");
    lines.forEach((line, i) => {
      const hits = line.match(STOCK);
      if (hits) stock.push(`${f}:${i + 1} ${hits.join(" ")}`);
      if (DYNAMIC.test(line)) dynamic.push(`${f}:${i + 1}`);
      for (const m of line.matchAll(/"([^"]*)"/g)) {
        if (/(^|\s)bg-accent(\s|$)/.test(m[1]) && /(^|\s)text-(white|paper|paper-white)(\s|$)/.test(m[1])) {
          whiteOnAccent.push(`${f}:${i + 1}`);
        }
      }
    });
  }
  ok("no stock Tailwind palette colours in src/", stock.length === 0, stock.slice(0, 8).join(" | "));
  ok("no colour classes built from template strings (Tailwind cannot see them)", dynamic.length === 0, dynamic.join(" | "));
  ok("no light text on an accent background (fails contrast)", whiteOnAccent.length === 0, whiteOnAccent.join(" | "));
}

console.log("\nFonts and tokens:");
{
  const tw = read("tailwind.config.js");
  for (const token of ["paper", "ink", "accent", "moss", "brick", "rule"]) {
    ok(`tailwind defines the ${token} colour`, new RegExp(`\\b${token}:\\s*[{"']`).test(tw));
  }
  ok("display font is Fraunces", /display:\s*\[\s*'"Fraunces"'/.test(tw));
  ok("body font is Source Sans 3", /sans:\s*\[\s*'"Source Sans 3"'/.test(tw));

  const css = read("src/index.css");
  for (const cls of [".btn-primary", ".btn-ink", ".btn-outline", ".card", ".eyebrow", ".photo-frame", ".link"]) {
    ok(`index.css defines ${cls}`, css.includes(cls + " {"));
  }
  for (const font of ["fraunces-latin.woff2", "fraunces-latin-italic.woff2", "source-sans-3-latin.woff2", "source-sans-3-latin-italic.woff2"]) {
    ok(`public/fonts/${font} is shipped`, fs.existsSync(path.join(ROOT, "public/fonts", font)));
    ok(`index.css loads ${font}`, css.includes(`/fonts/${font}`));
  }
  const html = read("index.html");
  ok("index.html does not pull fonts from Google", !/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(html));
  ok("index.html preloads the display font", html.includes('href="/fonts/fraunces-latin.woff2"'));
  ok("_headers caches /fonts/", /^\/fonts\/\*\n  Cache-Control: public/m.test(read("public/_headers")));
}

console.log("\nHeader, logo and static pages:");
{
  const layout = read("src/Layout.jsx");
  ok("Layout uses the Logo component", /import Logo\b/.test(layout) && /<Logo\b/.test(layout));
  ok("Layout no longer loads the old logo image", !/images\/logo\.(png|avif)/.test(layout));
  ok("logo export script exists", fs.existsSync(path.join(ROOT, "scripts/assets/build-logo.mjs")));
  for (const f of ["public/404.html", "public/for-agents/index.html"]) {
    const page = read(f);
    ok(`${f} has no old blue`, !/#2563eb|#eff6ff|#f8fafc/i.test(page));
    ok(`${f} uses the theme ink`, page.includes("#17233b"));
  }
}

console.log("\nHeadings spell out \"and\":");
{
  const helper = read("src/lib/headingText.js");
  ok("spellAnd helper exists", /export function spellAnd/.test(helper));
  for (const f of ["src/components/QuoteHero.jsx", "src/components/FAQ.jsx", "src/components/Benefits.jsx"]) {
    ok(`${f} spells out "and" in its heading`, read(f).includes("spellAnd("));
  }
  const literal = [];
  for (const f of files.filter((f) => f.endsWith(".jsx"))) {
    for (const m of read(f).matchAll(/<h[1-4]\b[^>]*>([^<{]*?)<\/h[1-4]>/g)) {
      if (/\s(&amp;|&)\s/.test(m[1])) literal.push(`${f}: ${m[1].trim()}`);
    }
  }
  ok("no heading written with an ampersand", literal.length === 0, literal.slice(0, 6).join(" | "));
}

console.log("\nHero photo is not covered by the quote card:");
{
  for (const f of ["src/components/QuoteHero.jsx", "src/pages/InstantQuoteLanding.jsx"]) {
    const src = read(f);
    ok(`${f} frames the photo`, src.includes("photo-frame"));
    ok(`${f} does not pin the quote card over the photo`, !/absolute[^"]*(?:bottom|inset)[^"]*card|card[^"]*absolute/.test(src));
    ok(`${f} does not pull the quote card up over the photo`, !/-mt-\d[^"]*\bcard\b|lg:-mt-\d/.test(src));
  }
}

console.log(failures ? `\n${failures} theme check(s) failed.\n` : "\nAll theme checks passed.\n");
process.exit(failures ? 1 : 0);
