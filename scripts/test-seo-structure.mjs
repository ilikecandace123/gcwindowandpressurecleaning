// Structural SEO regression tests. Born from the September 2026 Search Console
// audit, which found three defects the build had been shipping for months:
//
//   1. Every commercial <h1> (and its Service schema) read "Commercial
//      Commercial ..." because a template prepended a word the data already had.
//   2. The 574-page /commercial/ section had ZERO inbound links in the HTML —
//      the only links to it lived in a `{open && ...}` hover dropdown that never
//      reached the prerendered markup — and /commercial/ itself was a redirect.
//   3. /services/ served the homepage under a second URL with a cross-canonical.
//
// Run: node scripts/test-seo-structure.mjs   (also part of `npm test`)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COMMERCIAL_SERVICES } from "../src/data/locations.js";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const exists = (p) => fs.existsSync(path.join(ROOT, p));

let pass = 0;
let fail = 0;
let skip = 0;
function eq(name, actual, expected) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.error(`  ✗ ${name}\n      expected: ${JSON.stringify(expected)}\n      actual:   ${JSON.stringify(actual)}`);
  }
}
const ok = (name, cond) => eq(name, Boolean(cond), true);
const skipped = (name, why) => {
  skip++;
  console.log(`  ⚠ ${name} — skipped (${why})`);
};

// ── 1. "Commercial Commercial" ──────────────────────────────────────────────
console.log('Defect 1 — duplicated "Commercial" prefix:');
{
  ok("every commercial service name already starts with 'Commercial'", COMMERCIAL_SERVICES.every((s) => /^Commercial /.test(s.name)));
  for (const f of ["src/pages/CommercialService.jsx", "src/pages/CommercialLocationService.jsx"]) {
    const src = read(f);
    eq(`${f}: no template prepends 'Commercial ' to service.name`, (src.match(/`Commercial \$\{service\.name\}/g) || []).length, 0);
    ok(`${f}: still interpolates service.name in the headline`, /headline=\{`\$\{service\.name\}/.test(src));
  }
}

// ── 2. /commercial/ section index + crawlable navigation ────────────────────
console.log("\nDefect 2 — orphaned commercial section:");
{
  ok("Commercial.jsx exists", exists("src/pages/Commercial.jsx"));
  const page = read("src/pages/Commercial.jsx");
  ok("index page iterates COMMERCIAL_SERVICES (links every hub)", /COMMERCIAL_SERVICES\.map\(/.test(page) && /to=\{`\/commercial\/\$\{service\.slug\}\/`\}/.test(page));
  ok("index page canonical is /commercial/", page.includes("canonical={`${SITE}/commercial/`}"));

  const app = read("src/App.jsx");
  const idx = app.indexOf('path="/commercial"');
  const param = app.indexOf('path="/commercial/:serviceSlug');
  ok("/commercial route is registered", idx !== -1);
  ok("/commercial route precedes the parameterised commercial routes", idx !== -1 && param !== -1 && idx < param);

  const redirects = read("public/_redirects");
  ok("/commercial no longer redirects to a service hub", !/^\/commercial\/?\s+\/commercial\/window-cleaning/m.test(redirects));

  const prerender = read("scripts/prerender.mjs");
  ok("/commercial is prerendered", /path:\s*"\/commercial",/.test(prerender));

  const layout = read("src/Layout.jsx");
  // The root cause: `{open && (<div>…links…</div>)}` puts the links in the DOM
  // only after a hover, so the prerendered HTML — what crawlers read — never
  // had them. Render always, toggle with a class.
  eq("no dropdown is conditionally rendered", (layout.match(/\{(servicesDropdownOpen|commercialDropdownOpen) && \(/g) || []).length, 0);
  ok("dropdowns toggle via a class instead", /\$\{servicesDropdownOpen \? "block" : "hidden"\}/.test(layout) && /\$\{commercialDropdownOpen \? "block" : "hidden"\}/.test(layout));
  for (const slug of COMMERCIAL_SERVICES.map((s) => s.slug)) {
    ok(`header links /commercial/${slug}/`, layout.includes(`to="/commercial/${slug}/"`));
  }
  eq("header + footer + mobile all link the section index", (layout.match(/to="\/commercial\/"/g) || []).length, 3);
  ok("404 page links the section index", read("public/404.html").includes('href="/commercial/"'));
  ok("markdown 404 links the section index", read("functions/_middleware.js").includes("[Commercial & strata](/commercial/)"));
}

// ── 3. /services/ duplicate homepage ────────────────────────────────────────
console.log("\nDefect 3 — /services/ duplicate:");
{
  const redirects = read("public/_redirects");
  ok("/services 301s to /", /^\/services\s+\/\s+301$/m.test(redirects));
  ok("/services/ 301s to /", /^\/services\/\s+\/\s+301$/m.test(redirects));
  ok("no React route for /services", !/path="\/services"/.test(read("src/App.jsx")));
  ok("not prerendered", !/path:\s*"\/services",/.test(read("scripts/prerender.mjs")));
  ok("nothing links to /services/ any more", !/to="\/services\/?"|href="\/services\/?"/.test(read("src/pages/NotFound.jsx") + read("src/Layout.jsx")));
}

// ── Built output (when a fresh build exists) ────────────────────────────────
console.log("\nBuilt output:");
{
  const dist = path.join(ROOT, "dist");
  const built = fs.existsSync(path.join(dist, "sitemap-static.xml"));
  // A dist/ older than the sources describes a previous site; asserting
  // against it says nothing about this code. Skip rather than cry wolf.
  const distIsStale = () => {
    const builtAt = fs.statSync(path.join(dist, "sitemap-static.xml")).mtimeMs;
    let newest = 0;
    const walk = (d) => {
      if (!fs.existsSync(d)) return;
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        if (e.name === "node_modules" || e.name.startsWith(".")) continue;
        const full = path.join(d, e.name);
        if (e.isDirectory()) walk(full);
        else newest = Math.max(newest, fs.statSync(full).mtimeMs);
      }
    };
    for (const d of ["src", "scripts", "public"]) walk(path.join(ROOT, d));
    return newest > builtAt;
  };
  if (!built) {
    skipped("built-output assertions", "run `npm run build:meta-only` first");
  } else if (distIsStale()) {
    skipped("built-output assertions", "dist/ is older than src/ — rebuild to check it");
  } else {
    const stat = read("dist/sitemap-static.xml");
    ok("sitemap-static lists /commercial/", stat.includes("gcwindowandpressurecleaning.com.au/commercial/</loc>"));
    const all = ["sitemap-static.xml", "sitemap-residential.xml", "sitemap-commercial.xml"].map((f) => read("dist/" + f)).join("");
    ok("no sitemap lists /services/", !all.includes("/services/</loc>"));
    ok("no /services/ file was built", !fs.existsSync(path.join(dist, "services")));
    ok("/commercial/index.html was built", fs.existsSync(path.join(dist, "commercial", "index.html")));
    const hub = fs.existsSync(path.join(dist, "commercial", "window-cleaning", "index.html"))
      ? read("dist/commercial/window-cleaning/index.html")
      : "";
    if (hub) ok("built commercial hub has no 'Commercial Commercial' in its schema", !/Commercial Commercial/.test(hub));
  }
}

console.log(`\n${pass} passed, ${fail} failed, ${skip} skipped`);
process.exit(fail ? 1 : 0);
