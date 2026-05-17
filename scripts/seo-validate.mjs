// SEO validation script for the technical SEO overhaul.
// Crawls every URL in the dist/ sitemaps and checks each page's built HTML
// against the overhaul's pass/fail criteria. Read-only — never writes files.
//
// Usage:  node scripts/seo-validate.mjs            (full report)
//         node scripts/seo-validate.mjs --samples  (also print example failures)
//
// Exit code 0 only when every check passes across every page.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SITE = "https://gcwindowandpressurecleaning.com.au";
const SHOW_SAMPLES = process.argv.includes("--samples");

// --- Tunable thresholds (mirror the /goal criteria) ----------------------
const TITLE_MIN = 30, TITLE_MAX = 60;
const DESC_MIN = 120, DESC_MAX = 160;
const GENERIC_ALT = /^(image|photo|picture|img|icon|logo|banner|untitled|\s*)$/i;

// --- Helpers -------------------------------------------------------------
function decodeEntities(s) {
  return String(s)
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function readSitemapUrls(file) {
  const full = path.join(DIST, file);
  if (!fs.existsSync(full)) return [];
  const xml = fs.readFileSync(full, "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

// Map a public URL to its built HTML file on disk.
function urlToFile(url) {
  let p = url.replace(SITE, "").replace(/[#?].*$/, "");
  if (!p.startsWith("/")) p = "/" + p;
  if (p === "/") return path.join(DIST, "index.html");
  p = p.replace(/\/$/, "");
  return path.join(DIST, p, "index.html");
}

// Resolve an internal href to a file that must exist in dist/.
function internalHrefToFile(href) {
  let p = href.replace(SITE, "").replace(/[#?].*$/, "");
  if (p === "" || p === "/") return path.join(DIST, "index.html");
  if (!p.startsWith("/")) return null; // relative/odd — skip
  if (/\.[a-z0-9]+$/i.test(p)) return path.join(DIST, p); // file (image, css…)
  return path.join(DIST, p.replace(/\/$/, ""), "index.html");
}

// --- Per-page checks -----------------------------------------------------
function checkPage(url, html, errors, seenTitles, seenDescs) {
  const add = (type, detail) => errors.push({ type, url, detail });

  // Title
  const titleM = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!titleM) add("title-missing", "no <title>");
  else {
    const title = decodeEntities(titleM[1].trim());
    if (title.length < TITLE_MIN || title.length > TITLE_MAX)
      add("title-length", `${title.length} chars: "${title}"`);
    if (seenTitles.has(title)) add("title-duplicate", `"${title}"`);
    seenTitles.set(title, url);
  }

  // Meta description
  const descM = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  if (!descM) add("desc-missing", "no meta description");
  else {
    const desc = decodeEntities(descM[1].trim());
    if (desc.length < DESC_MIN || desc.length > DESC_MAX)
      add("desc-length", `${desc.length} chars: "${desc.slice(0, 80)}…"`);
    if (seenDescs.has(desc)) add("desc-duplicate", `"${desc.slice(0, 60)}…"`);
    seenDescs.set(desc, url);
  }

  // Exactly one H1
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1Count !== 1) add("h1-count", `${h1Count} <h1> tags`);

  // Self-referencing canonical
  const canM = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canM) add("canonical-missing", "no canonical");
  else {
    const expected = url.endsWith("/") || /\.[a-z0-9]+$/i.test(url) ? url : url + "/";
    if (canM[1] !== expected)
      add("canonical-mismatch", `canonical=${canM[1]} expected=${expected}`);
  }

  // JSON-LD validity
  const ldBlocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (ldBlocks.length === 0) add("jsonld-missing", "no JSON-LD");
  for (const [, body] of ldBlocks) {
    try { JSON.parse(body); }
    catch (e) { add("jsonld-invalid", `parse error: ${e.message}`); }
  }

  // Open Graph + Twitter
  for (const prop of ["og:title", "og:description", "og:image", "og:url"]) {
    if (!new RegExp(`<meta\\s+property=["']${prop}["']`, "i").test(html))
      add("og-missing", `missing ${prop}`);
  }
  for (const name of ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]) {
    if (!new RegExp(`<meta\\s+name=["']${name}["']`, "i").test(html))
      add("twitter-missing", `missing ${name}`);
  }

  // Alt text on every <img>
  for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
    const altM = tag.match(/\balt=["']([^"']*)["']/i);
    if (!altM) add("alt-missing", tag.slice(0, 90));
    else if (GENERIC_ALT.test(decodeEntities(altM[1]).trim()))
      add("alt-generic", `alt="${altM[1]}"`);
  }

  // Internal broken links
  for (const m of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
    const href = m[1];
    if (/^(#|tel:|mailto:|javascript:)/i.test(href)) continue;
    if (/^https?:\/\//i.test(href) && !href.startsWith(SITE)) continue; // external
    const file = internalHrefToFile(href);
    if (file && !fs.existsSync(file)) add("broken-link", `${href}`);
  }
}

// --- Run -----------------------------------------------------------------
function main() {
  if (!fs.existsSync(DIST)) {
    console.error("dist/ not found — run `npm run build` first.");
    process.exit(1);
  }
  const urls = [
    ...readSitemapUrls("sitemap-static.xml"),
    ...readSitemapUrls("sitemap-residential.xml"),
    ...readSitemapUrls("sitemap-commercial.xml"),
  ];
  if (urls.length === 0) {
    console.error("No sitemap URLs found in dist/.");
    process.exit(1);
  }

  const errors = [];
  const seenTitles = new Map();
  const seenDescs = new Map();
  let missingFiles = 0;

  for (const url of urls) {
    const file = urlToFile(url);
    if (!fs.existsSync(file)) {
      errors.push({ type: "page-missing", url, detail: file });
      missingFiles++;
      continue;
    }
    checkPage(url, fs.readFileSync(file, "utf8"), errors, seenTitles, seenDescs);
  }

  // Report
  const byType = {};
  for (const e of errors) (byType[e.type] ||= []).push(e);

  console.log(`\nSEO validation — ${urls.length} pages checked\n${"=".repeat(50)}`);
  if (errors.length === 0) {
    console.log("PASS — 0 errors across all pages.\n");
    process.exit(0);
  }
  const order = Object.keys(byType).sort((a, b) => byType[b].length - byType[a].length);
  for (const type of order) {
    console.log(`\n[${type}]  ${byType[type].length} error(s)`);
    if (SHOW_SAMPLES) {
      for (const e of byType[type].slice(0, 5))
        console.log(`   ${e.url}\n     ${e.detail}`);
      if (byType[type].length > 5) console.log(`   … +${byType[type].length - 5} more`);
    }
  }
  console.log(`\n${"=".repeat(50)}\nFAIL — ${errors.length} total error(s) across ${order.length} categor(ies).`);
  if (missingFiles) console.log(`(${missingFiles} sitemap URLs had no built file.)`);
  console.log();
  process.exit(1);
}

main();
