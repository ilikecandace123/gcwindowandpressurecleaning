// Tests for the agent-readiness layer:
//   - Accept: text/markdown content negotiation (acceptmarkdown.com / RFC 9110)
//   - agent instruction + developer-resource files
//   - the 404 recovery body
//   - heading hierarchy in the built HTML (no skipped levels)
//
// Run: node scripts/test-agent-readiness.mjs
// The DOM-dependent checks are skipped with a notice when dist/ has not been
// built yet, so this is safe to run on a clean checkout.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseAccept, qualityFor, negotiate, mirrorPath } from "../functions/_middleware.js";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PUBLIC = path.join(ROOT, "public");
const DIST = path.join(ROOT, "dist");

let pass = 0;
let fail = 0;
let skip = 0;

function eq(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.error(`  ✗ ${name}\n      expected: ${JSON.stringify(expected)}\n      actual:   ${JSON.stringify(actual)}`);
  }
}

function ok(name, condition, detail = "") {
  eq(name, Boolean(condition) || detail, true);
}

function skipped(name, why) {
  skip++;
  console.log(`  ⚠ ${name} — skipped (${why})`);
}

const read = (p) => fs.readFileSync(p, "utf8");

// ── Accept parsing ──────────────────────────────────────────────────────────
console.log("Accept header parsing (RFC 9110):");
{
  eq("plain type", parseAccept("text/markdown").map((r) => r.type), ["text/markdown"]);
  eq("empty header → no ranges", parseAccept(""), []);
  eq("missing header → no ranges", parseAccept(null), []);
}
{
  const ranges = parseAccept("text/html;q=0.8, text/markdown;q=0.9, */*;q=0.1");
  eq("sorted by q descending", ranges.map((r) => r.type), ["text/markdown", "text/html", "*/*"]);
}
{
  const ranges = parseAccept("*/*, text/markdown");
  eq("equal q → more specific range first", ranges[0].type, "text/markdown");
}
{
  const ranges = parseAccept("text/markdown;q=bogus");
  eq("unparseable q defaults to 1", ranges[0].q, 1);
}
{
  const ranges = parseAccept("text/markdown;q=5");
  eq("q clamped to 1", ranges[0].q, 1);
}
{
  const ranges = parseAccept("TEXT/Markdown");
  eq("type lower-cased", ranges[0].type, "text/markdown");
}
{
  const ranges = parseAccept("text/*;q=0.4");
  eq("subtype wildcard matches markdown", qualityFor(ranges, "text/markdown"), 0.4);
  eq("subtype wildcard does not match json", qualityFor(ranges, "application/json"), 0);
}

// ── Negotiation ─────────────────────────────────────────────────────────────
console.log("\nNegotiation outcome:");
eq("Accept: text/markdown → markdown", negotiate("text/markdown"), "markdown");
eq("Accept: text/x-markdown → markdown", negotiate("text/x-markdown"), "markdown");
eq("browser Accept → html", negotiate("text/html,application/xhtml+xml,image/webp,*/*;q=0.8"), "html");
eq("no Accept header → html", negotiate(null), "html");
eq("empty Accept → html", negotiate(""), "html");
eq("*/* → html (never silently flip clients to markdown)", negotiate("*/*"), "html");
eq("markdown outranks html on q", negotiate("text/html;q=0.5, text/markdown;q=0.9"), "markdown");
eq("html outranks markdown on q", negotiate("text/html;q=0.9, text/markdown;q=0.5"), "html");
eq("equal q → html wins the tie", negotiate("text/html, text/markdown"), "html");
eq("markdown explicitly refused → html", negotiate("text/html, text/markdown;q=0"), "html");
eq("neither acceptable → 406", negotiate("application/json"), "none");
eq("image-only Accept → 406", negotiate("image/png, image/webp"), "none");
eq("json + wildcard → html (wildcard rescues it)", negotiate("application/json, */*;q=0.1"), "html");

// ── Mirror path mapping ─────────────────────────────────────────────────────
console.log("\nMarkdown mirror paths:");
eq("root", mirrorPath("/"), "/index.md");
eq("empty", mirrorPath(""), "/index.md");
eq("trailing slash", mirrorPath("/window-cleaning/"), "/window-cleaning/index.md");
eq("no trailing slash", mirrorPath("/window-cleaning"), "/window-cleaning/index.md");
eq("nested", mirrorPath("/window-cleaning/burleigh-heads/"), "/window-cleaning/burleigh-heads/index.md");

// ── Published agent files ───────────────────────────────────────────────────
console.log("\nAgent instruction and resource files:");
{
  const p = path.join(PUBLIC, "agent-instructions.md");
  ok("agent-instructions.md exists", fs.existsSync(p), "missing public/agent-instructions.md");
  if (fs.existsSync(p)) {
    const md = read(p);
    ok("has a when-to-use section", /##\s*When to use this site/i.test(md));
    ok("has a when-NOT-to-use section", /##\s*When NOT to use this site/i.test(md));
    ok("says how an agent should call it", /##\s*How an agent should use this site/i.test(md));
    ok("states there is no public API", /no public API/i.test(md));
    ok("names the business", /Gold Coast Window and Pressure Cleaning/.test(md));
    ok("never references the franchise brand", !/jim'?s/i.test(md));
    ok("substantial enough to be guidance", md.length > 1500);
  }
}
{
  const p = path.join(PUBLIC, "for-agents", "index.html");
  ok("for-agents page exists", fs.existsSync(p), "missing public/for-agents/index.html");
  if (fs.existsSync(p)) {
    const html = read(p);
    const titleText = ((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "").replace(/&amp;/g, "&");
    ok(`product name in <title> ("${titleText}")`, /Gold Coast Window (and|&) Pressure Cleaning/.test(titleText));
    ok("product name in the h1", /<h1[^>]*>[^<]*Gold Coast Window and Pressure Cleaning/.test(html));
    ok("links llms.txt", html.includes('href="/llms.txt"'));
    ok("links agent-instructions.md", html.includes('href="/agent-instructions.md"'));
    ok("links the sitemap", html.includes('href="/sitemap.xml"'));
    // JSON-LD is data, not executable script — the page must still render
    // with JavaScript switched off.
    const executableScripts = [...html.matchAll(/<script([^>]*)>/gi)].filter(
      (m) => !/type=["']application\/ld\+json["']/i.test(m[1])
    );
    eq("no executable JavaScript", executableScripts.length, 0);
    ok("carries JSON-LD", /<script type="application\/ld\+json">/.test(html));
    ok("has Open Graph tags", ["og:title", "og:description", "og:image", "og:url"].every((t) => html.includes(`property="${t}"`)));
    ok("has Twitter card tags", ["twitter:card", "twitter:title", "twitter:description", "twitter:image"].every((t) => html.includes(`name="${t}"`)));
    ok("is canonicalised", html.includes('rel="canonical" href="https://gcwindowandpressurecleaning.com.au/for-agents/"'));
    {
      const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
      const decoded = title.replace(/&amp;/g, "&");
      ok(`title within 30-60 chars (${decoded.length})`, decoded.length >= 30 && decoded.length <= 60);
    }
    ok("never references the franchise brand", !/jim'?s/i.test(html));
  }
}
{
  const llms = read(path.join(PUBLIC, "llms.txt"));
  ok("llms.txt has a when-to-use section", /##\s*When to use this site/i.test(llms));
  ok("llms.txt names disqualifying cases", /Do NOT use this business/i.test(llms));
  ok("llms.txt lists agent resources", /##\s*Agent and Developer Resources/i.test(llms));
  ok("llms.txt points at agent-instructions.md", llms.includes("/agent-instructions.md"));
  ok("llms.txt still starts with the H1 title (llms.txt format)", llms.startsWith("# Gold Coast Window and Pressure Cleaning\n"));
  ok("llms.txt keeps its blockquote summary", /\n>\s+\S/.test(llms.slice(0, 400)));
  ok("llms.txt never references the franchise brand", !/jim'?s/i.test(llms));
}
{
  const robots = read(path.join(PUBLIC, "robots.txt"));
  ok("robots.txt still declares the sitemap", /^Sitemap: https:\/\/gcwindowandpressurecleaning\.com\.au\/sitemap\.xml$/m.test(robots));
  ok("robots.txt points at llms.txt", robots.includes("/llms.txt"));
  ok("robots.txt points at agent-instructions.md", robots.includes("/agent-instructions.md"));
  ok("robots.txt still disallows /api", /Disallow:\s*\/api/.test(robots));
}
{
  const headers = read(path.join(PUBLIC, "_headers"));
  ok("markdown served as text/markdown", headers.includes("Content-Type: text/markdown; charset=utf-8"));
  ok("no stale text/plain rule for .md", !/\/\*\*?\/?\*?\.md[\s\S]{0,120}text\/plain/.test(headers));
  eq("Vary: Accept declared on every negotiable rule", (headers.match(/Vary: Accept, Accept-Encoding/g) || []).length, 3);
  // Cloudflare _headers only supports a single "*" wildcard; wrangler rejects
  // "/**/*.md" as an invalid rule (it was silently dead config for months).
  ok("no invalid double-star _headers rule", !/^\/\*\*\//m.test(headers));
}

// ── 404 recovery ────────────────────────────────────────────────────────────
console.log("\n404 recovery:");
{
  const html = read(path.join(PUBLIC, "404.html"));
  ok("points at the sitemap", html.includes('href="/sitemap.xml"'));
  ok("points at llms.txt", html.includes('href="/llms.txt"'));
  ok("points at agent instructions", html.includes('href="/agent-instructions.md"'));
  ok("points at the guides index", html.includes('href="/guides/"'));
  ok("stays noindex", /content="noindex/.test(html));
  const levels = [...html.matchAll(/<h([1-6])/g)].map((m) => Number(m[1]));
  ok("404 heading hierarchy is sequential", levels.every((l, i) => i === 0 || l <= levels[i - 1] + 1), levels.join(","));
}

// ── Built HTML: heading hierarchy must not skip a level ─────────────────────
console.log("\nHeading hierarchy in built pages:");
function headingLevels(html) {
  const body = html.split(/<body[^>]*>/i)[1] || html;
  return [...body.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
}
const SAMPLE_PAGES = ["index.html", "window-cleaning/index.html", "instant-quote/index.html", "for-agents/index.html"];
if (!fs.existsSync(DIST)) {
  skipped("heading hierarchy over dist/", "run `npm run build` first");
} else {
  for (const rel of SAMPLE_PAGES) {
    const p = path.join(DIST, rel);
    if (!fs.existsSync(p)) {
      skipped(`heading hierarchy: ${rel}`, "not in this build");
      continue;
    }
    const html = read(p);
    // `npm run build:meta-only` leaves #root empty — there is no rendered
    // markup to inspect, so there is nothing meaningful to assert here.
    if (/<div id="root">\s*<\/div>/.test(html)) {
      skipped(`heading hierarchy: ${rel}`, "meta-only build, run the full `npm run build`");
      continue;
    }
    const levels = headingLevels(html);
    const firstSkip = levels.findIndex((l, i) => i > 0 && l > levels[i - 1] + 1);
    eq(`${rel}: starts at h1`, levels[0], 1);
    eq(
      `${rel}: no skipped heading levels`,
      firstSkip === -1 ? "ok" : `h${levels[firstSkip - 1]} → h${levels[firstSkip]} at index ${firstSkip}`,
      "ok"
    );
  }
  // The markdown alternate link must be advertised on prerendered pages.
  const home = path.join(DIST, "index.html");
  if (fs.existsSync(home)) {
    ok(
      "home page advertises its markdown mirror",
      /<link rel="alternate" type="text\/markdown"/.test(read(home))
    );
  }
}

console.log(`\n${pass} passed, ${fail} failed, ${skip} skipped`);
process.exit(fail ? 1 : 0);
