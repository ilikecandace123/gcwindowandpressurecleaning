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
import { parseAccept, qualityFor, negotiate, mirrorPath, mdTwinPath, pageLinkHeader } from "../functions/_middleware.js";
import { TOOLS, READ_ONLY_ANNOTATIONS } from "../functions/mcp.js";
import { SKILLS_DIR, SCHEMA_URL, SKILL_NAME_PATTERN, buildSkillsIndex, parseFrontmatter, skillDirectories, sha256 } from "./agent-skills.mjs";
import { buildOrganizationSchema as orgSchema, buildLocalBusinessSchema as localSchema } from "../src/data/schema.js";


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

// Tool names the MCP server actually implements, read from its source so the
// manifest and the docs are checked against reality rather than against a copy.
const serverToolNames = new Set(
  [...read(path.join(ROOT, "functions", "mcp.js")).matchAll(/^\s{4}name: "([a-z_]+)",$/gm)].map((m) => m[1])
);

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
    ok("states that only /api/v1/ is public and the rest of /api is private", /Only `\/api\/v1\/` is public/.test(md) && /private\s+form handler/.test(md));
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

/**
 * dist/ is a build artefact. If it predates the sources it was built from it
 * describes an older site, and asserting against it produces failures that say
 * nothing about the current code. Detect that and skip rather than cry wolf.
 */
function distIsStale() {
  const home = path.join(DIST, "index.html");
  if (!fs.existsSync(home)) return true;
  const builtAt = fs.statSync(home).mtimeMs;
  let newestSource = 0;
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else newestSource = Math.max(newestSource, fs.statSync(full).mtimeMs);
    }
  };
  for (const dir of ["src", "scripts", "public"]) walk(path.join(ROOT, dir));
  return newestSource > builtAt;
}

if (!fs.existsSync(DIST)) {
  skipped("heading hierarchy over dist/", "run `npm run build` first");
} else if (distIsStale()) {
  skipped("heading hierarchy over dist/", "dist/ is older than src/ — rebuild to check it");
  skipped("markdown alternate link over dist/", "dist/ is older than src/ — rebuild to check it");
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

// ── Organization schema completeness ────────────────────────────────────────
console.log("\nOrganization schema:");
{
  const org = orgSchema();
  ok("has address (PostalAddress)", org.address && org.address["@type"] === "PostalAddress");
  ok("address is complete", ["streetAddress", "addressLocality", "addressRegion", "postalCode", "addressCountry"].every((k) => org.address[k]));
  ok("has contactPoint", Array.isArray(org.contactPoint) && org.contactPoint.length > 0);
  ok("every contactPoint is typed", (org.contactPoint || []).every((c) => c["@type"] === "ContactPoint"));
  ok("every contactPoint has a contactType", (org.contactPoint || []).every((c) => typeof c.contactType === "string" && c.contactType));
  ok("every contactPoint has phone AND email", (org.contactPoint || []).every((c) => c.telephone && c.email));
  ok("declares areaServed", (org.contactPoint || []).every((c) => Array.isArray(c.areaServed) && c.areaServed.length));
  // (07) 5651 2386 is a normal landline — claiming TollFree would be false.
  ok("makes no toll-free claim", !JSON.stringify(org).includes("TollFree"));
  {
    const local = localSchema();
    const orgHours = (org.contactPoint || []).find((c) => c.hoursAvailable)?.hoursAvailable;
    const localHours = (local.openingHoursSpecification || [])[0];
    eq("contactPoint hours match openingHoursSpecification", [orgHours?.opens, orgHours?.closes], [localHours?.opens, localHours?.closes]);
  }
}

// ── Trust anchor pages ──────────────────────────────────────────────────────
console.log("\nTrust anchor pages:");
{
  const p = path.join(ROOT, "src", "pages", "Privacy.jsx");
  ok("privacy page component exists", fs.existsSync(p));
  if (fs.existsSync(p)) {
    const src = read(p);
    // Strip JSX tags/attributes to approximate the rendered prose length.
    const prose = src.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
    ok(`privacy prose well over 500 chars (${prose.length})`, prose.length > 2000);
    for (const topic of [/collect/i, /Australian Privacy Principles/, /ServiceM8/, /cookie/i, /delete/i, /complain/i]) {
      ok(`privacy covers ${topic}`, topic.test(src));
    }
    ok("privacy is canonicalised", src.includes("https://gcwindowandpressurecleaning.com.au/privacy/"));
    ok("privacy is not noindexed", !/noindex/.test(src));
  }
  const app = read(path.join(ROOT, "src", "App.jsx"));
  ok("privacy route registered", /path="\/privacy"/.test(app));
  const prerender = read(path.join(ROOT, "scripts", "prerender.mjs"));
  ok("privacy prerendered", /path:\s*"\/privacy"/.test(prerender));
  ok("privacy counts as a sitemap utility page", /UTILITY_PATHS[\s\S]{0,120}\/privacy/.test(prerender));
  const mirrors = read(path.join(ROOT, "scripts", "generate_markdown_mirrors.py"));
  ok("privacy gets a markdown mirror", !/SKIP_PATH_SEGMENTS = \{[^}]*"privacy"/.test(mirrors));
  const layout = read(path.join(ROOT, "src", "Layout.jsx"));
  for (const href of ["/about/", "/contact/", "/privacy/", "/for-agents/"]) {
    ok(`footer links ${href}`, layout.includes(`"${href}"`));
  }
  // /for-agents/ is static, outside the router — a <Link> would 404.
  ok("for-agents uses a plain anchor, not a router Link", /<a href="\/for-agents\/"/.test(layout));
}

// ── MCP server ──────────────────────────────────────────────────────────────
console.log("\nMCP manifest and server:");
{
  const manifestPath = path.join(PUBLIC, ".well-known", "mcp");
  ok("manifest exists at /.well-known/mcp", fs.existsSync(manifestPath));
  if (fs.existsSync(manifestPath)) {
    let manifest = null;
    try {
      manifest = JSON.parse(read(manifestPath));
    } catch (e) {
      ok(`manifest is valid JSON (${e.message})`, false);
    }
    if (manifest) {
      eq("declares streamable-http transport", manifest.servers[0].transport, "streamable-http");
      eq("endpoint URL", manifest.servers[0].url, "https://gcwindowandpressurecleaning.com.au/mcp");
      ok("declares the current protocol version", manifest.servers[0].protocolVersions.includes("2025-06-18"));
      ok("declares tools capability", manifest.capabilities.tools === true);
      ok("marked read-only", manifest.readOnly === true);
      ok("names the business", /Gold Coast Window and Pressure Cleaning/.test(JSON.stringify(manifest)));
      ok("never references the franchise brand", !/jim'?s/i.test(JSON.stringify(manifest)));
      const manifestTools = manifest.tools.map((t) => t.name).sort();
      eq("manifest tool list matches the server", manifestTools, [...serverToolNames].sort());
    }
  }
  const src = read(path.join(ROOT, "functions", "mcp.js"));
  ok("no lead/booking/submit tool is exposed", !/(book|submit|create_job|lead)\s*[:(]/i.test(src.split("const TOOLS")[1].split("];")[0]));
  ok("refuses to read /api/ through get_page", src.includes('requested.startsWith("/api/")'));
  const middleware = read(path.join(ROOT, "functions", "_middleware.js"));
  ok("/mcp bypasses content negotiation", middleware.includes('pathname === "/mcp"'));
  ok("/.well-known bypasses content negotiation", middleware.includes('pathname.startsWith("/.well-known/")'));
  const headers = read(path.join(PUBLIC, "_headers"));
  ok("manifest served as JSON", /\/\.well-known\/mcp[\s\S]{0,120}application\/json/.test(headers));
}

// ── Discoverability of the new surfaces ─────────────────────────────────────
console.log("\nDiscoverability:");
{
  const llms = read(path.join(PUBLIC, "llms.txt"));
  ok("llms.txt advertises the MCP server", llms.includes("/mcp"));
  ok("llms.txt advertises the manifest", llms.includes("/.well-known/mcp"));
  ok("llms.txt links the privacy policy", llms.includes("/privacy/"));
  const instructions = read(path.join(PUBLIC, "agent-instructions.md"));
  ok("agent instructions document the MCP server", /Model Context Protocol server/i.test(instructions));
  ok("agent instructions list every tool", [...serverToolNames].every((t) => instructions.includes(t)));
  const agentsPage = read(path.join(PUBLIC, "for-agents", "index.html"));
  ok("for-agents documents the MCP server", agentsPage.includes('href="/.well-known/mcp"'));
  ok("for-agents lists every tool", [...serverToolNames].every((t) => agentsPage.includes(t)));
  const robots = read(path.join(PUBLIC, "robots.txt"));
  ok("robots.txt points at the MCP endpoint", robots.includes("/.well-known/mcp"));
}

// ── Well-known live handshake + predictable dev URLs ────────────────────────
console.log("\nWell-known handshake and predictable URLs:");
{
  const mw = read(path.join(ROOT, "functions", "_middleware.js"));
  ok("middleware imports the MCP handler", /import \{ onRequest as mcpRequest \} from "\.\/mcp\.js"/.test(mw));
  ok("POST /.well-known/mcp is delegated to it", /WELL_KNOWN_MCP && request\.method !== "GET"/.test(mw));
  ok("GET /.well-known/mcp still falls through to the manifest", /request\.method !== "GET" && request\.method !== "HEAD"/.test(mw));

  const manifest = JSON.parse(read(path.join(PUBLIC, ".well-known", "mcp")));
  const urls = manifest.servers.map((s) => s.url);
  ok("manifest advertises the canonical endpoint", urls.includes("https://gcwindowandpressurecleaning.com.au/mcp"));
  ok("manifest advertises the well-known alias", urls.includes("https://gcwindowandpressurecleaning.com.au/.well-known/mcp"));
  ok("every advertised server declares streamable-http", manifest.servers.every((s) => s.transport === "streamable-http"));
  ok("every advertised server declares 2025-06-18", manifest.servers.every((s) => s.protocolVersions.includes("2025-06-18")));

  const redirects = read(path.join(PUBLIC, "_redirects"));
  for (const guess of ["/developers", "/developer", "/docs", "/api-docs", "/mcp-server"]) {
    ok(`${guess} resolves to the docs page`, new RegExp(`^${guess}\\s+/for-agents/\\s+301`, "m").test(redirects));
  }
  // /for-agents/ must stay canonical — redirecting it would churn a crawled URL.
  ok("/for-agents/ is not itself redirected", !/^\/for-agents\/?\s+\//m.test(redirects));
}

// ── Name-based discoverability of the docs page ─────────────────────────────
console.log("\nName-based discoverability:");
{
  const html = read(path.join(PUBLIC, "for-agents", "index.html"));
  const title = ((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "").replace(/&amp;/g, "&");
  ok(`title carries the business name ("${title}")`, /Gold Coast Window (and|&) Pressure Cleaning/.test(title));
  ok("title says what the page is for", /Developer|Agent/i.test(title));
  ok(`title within 30-60 chars (${title.length})`, title.length >= 30 && title.length <= 60);
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || "";
  ok("h1 carries the full business name", /Gold Coast Window and Pressure Cleaning/.test(h1));
  ok("h1 names both audiences", /Agent/.test(h1) && /Developer/.test(h1));
  const lede = html.split('class="lede"')[1] || "";
  ok("lede names the business and the MCP server", /Gold Coast Window and\s+Pressure Cleaning/.test(lede) && /MCP server/.test(lede));
  ok("indexable with full snippets", /content="index, follow, max-snippet:-1/.test(html));
  const llms = read(path.join(PUBLIC, "llms.txt"));
  ok("llms.txt lists the developer documentation URL", /Developer documentation: \[?https:\/\/gcwindowandpressurecleaning\.com\.au\/for-agents\//.test(llms));
  ok("llms.txt names the predictable aliases", /\/developers/.test(llms));
}

// ── MCP tool behaviour annotations (spec 2025-06-18) ────────────────────────
// The point of these is that a client can tell, from the protocol alone, that
// calling any tool here is safe. If a tool that writes is ever added, it must
// not inherit the claim — so the assertion is on every tool, not on a constant.
console.log("\nMCP tool annotations:");
{
  const expected = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
  for (const tool of TOOLS) {
    eq(`${tool.name} is annotated read-only`, tool.annotations, expected);
  }
  eq("every tool carries annotations", TOOLS.filter((t) => t.annotations).length, TOOLS.length);

  const manifest = JSON.parse(read(path.join(PUBLIC, ".well-known", "mcp")));
  for (const tool of manifest.tools) {
    eq(`manifest agrees for ${tool.name}`, tool.annotations, expected);
  }
  // The manifest is a preview of the server; a client must not learn one thing
  // from it and another from tools/list.
  const serverByName = new Map(TOOLS.map((t) => [t.name, t.annotations]));
  ok(
    "manifest annotations match the server tool-for-tool",
    manifest.tools.every((t) => JSON.stringify(t.annotations) === JSON.stringify(serverByName.get(t.name)))
  );
  ok("the read-only claim is frozen in source", Object.isFrozen(READ_ONLY_ANNOTATIONS));
}

// ── RFC 9727 API catalog shape ──────────────────────────────────────────────
console.log("\nAPI catalog (RFC 9727):");
{
  const catalog = JSON.parse(read(path.join(PUBLIC, ".well-known", "api-catalog")));
  const SITE = "https://gcwindowandpressurecleaning.com.au";
  ok("is a linkset", Array.isArray(catalog.linkset) && catalog.linkset.length > 0);

  const root = catalog.linkset[0];
  eq("first context is anchored at the catalog itself", root.anchor, `${SITE}/.well-known/api-catalog`);
  ok("the catalog lists its APIs with rel=item", Array.isArray(root.item) && root.item.length >= 2);
  const items = root.item.map((i) => i.href);
  ok("the REST API is an item", items.includes(`${SITE}/api/v1/`));
  ok("the MCP server is an item", items.includes(`${SITE}/mcp`));
  ok("every item is titled", root.item.every((i) => typeof i.title === "string" && i.title.length > 0));

  // RFC 9727 §3: each API gets its own context, anchored at the API itself,
  // carrying its description and documentation. An item with no context behind
  // it is a dead end for a client that follows it.
  const anchors = new Set(catalog.linkset.map((c) => c.anchor));
  for (const href of items) {
    ok(`${href} has its own linkset context`, anchors.has(href));
    const ctx = catalog.linkset.find((c) => c.anchor === href);
    ok(`${href} declares a service-desc`, Array.isArray(ctx["service-desc"]) && ctx["service-desc"].length > 0);
    ok(`${href} declares a service-doc`, Array.isArray(ctx["service-doc"]) && ctx["service-doc"].length > 0);
  }

  // Only registered relation types; a bare unregistered token is not valid
  // RFC 8288 (§2.1.2 requires extension relations to be URIs).
  const REGISTERED = new Set(["item", "service-desc", "service-doc", "service-meta", "status"]);
  const rels = catalog.linkset.flatMap((c) => Object.keys(c).filter((k) => k !== "anchor"));
  ok(`only registered relation types (${[...new Set(rels)].join(", ")})`, rels.every((r) => REGISTERED.has(r)));

  const hrefs = catalog.linkset.flatMap((c) =>
    Object.entries(c).filter(([k]) => k !== "anchor").flatMap(([, v]) => v.map((l) => l.href))
  );
  ok("every href is an absolute URL on this site", hrefs.every((h) => h.startsWith(SITE)));
  ok("never references the franchise brand", !/jim'?s/i.test(JSON.stringify(catalog)));

  // The documentation anchors the catalog points at have to exist on the page.
  const agentsPage = read(path.join(PUBLIC, "for-agents", "index.html"));
  for (const fragment of ["rest-api", "versioning", "mcp"]) {
    ok(`/for-agents/#${fragment} exists`, agentsPage.includes(`id="${fragment}"`));
  }
}

// ── RFC 8288 Link header on pages, and .md twin URLs ────────────────────────
console.log("\nPage Link header and .md twins:");
{
  const SITE = "https://gcwindowandpressurecleaning.com.au";
  const header = pageLinkHeader("/window-cleaning/");
  ok("advertises this page's markdown twin", header.includes('</window-cleaning/index.md>; rel="alternate"; type="text/markdown"'));
  ok("advertises the OpenAPI document", header.includes(`<${SITE}/openapi.json>; rel="service-desc"`));
  ok("advertises the developer docs", header.includes(`<${SITE}/for-agents/>; rel="service-doc"`));
  ok("advertises the API catalog", header.includes(`<${SITE}/.well-known/api-catalog>; rel="api-catalog"`));
  // rel="sitemap" is not a registered relation type and RFC 8288 §2.1.2 requires
  // extension relations to be URIs — the sitemap is advertised in robots.txt.
  ok("claims no unregistered relation types", !/rel="sitemap"/.test(header));
  ok("the twin is per-page, not hard-coded", pageLinkHeader("/guides/").includes("</guides/index.md>"));
  eq("home page twin", pageLinkHeader("/").split(";")[0], "</index.md>");

  eq("/window-cleaning.md → the mirror", mdTwinPath("/window-cleaning.md"), "/window-cleaning/index.md");
  eq("nested twin", mdTwinPath("/window-cleaning/burleigh-heads.md"), "/window-cleaning/burleigh-heads/index.md");
  eq("an existing mirror is not re-mapped", mdTwinPath("/window-cleaning/index.md"), null);
  eq("non-markdown paths are untouched", mdTwinPath("/window-cleaning/"), null);
  eq("the private API is never twinned", mdTwinPath("/api/booking-submit.md"), null);
  eq("well-known files are never twinned", mdTwinPath("/.well-known/mcp.md"), null);

  const mw = read(path.join(ROOT, "functions", "_middleware.js"));
  ok("a real file wins over a twin lookup", /const direct = await context\.next\(\);[\s\S]{0,80}status !== 404/.test(mw));
  ok("the Link header is only set on a rendered page", /response\.status === 200 && \/text\\\/html\//.test(mw));
}

// ── llms.txt as an index (llmstxt.org) ──────────────────────────────────────
console.log("\nllms.txt formatting:");
{
  const llms = read(path.join(PUBLIC, "llms.txt"));
  const links = llms.match(/\[[^\]]+\]\(https?:\/\/[^)]+\)/g) || [];
  ok(`is a linked index, not a wall of bare URLs (${links.length} markdown links)`, links.length >= 15);
  ok(`stays under 30,000 characters (${llms.length})`, llms.length < 30000);
  ok("points at the full mirror index", llms.includes("/llms-full.txt"));
  ok("documents the .md suffix", /append `?\.md`? to/i.test(llms));

  const full = read(path.join(PUBLIC, "llms-full.txt"));
  ok("llms-full.txt starts with a heading", full.startsWith("# Gold Coast Window and Pressure Cleaning"));
  ok("llms-full.txt never references the franchise brand", !/jim'?s/i.test(full));

  // The build overwrites llms-full.txt with every mirror URL and leaves llms.txt
  // as a pointer. If that ever flipped back, llms.txt would grow to ~120 KB again.
  const mirrors = read(path.join(ROOT, "scripts", "generate_markdown_mirrors.py"));
  ok("the build writes llms-full.txt", /full_file\s*=\s*DIST_DIR\s*\/\s*"llms-full\.txt"/.test(mirrors));
  ok("the build keeps the URL list out of llms.txt", !/url_list.*\n.*llms_file/.test(mirrors) && mirrors.includes("Full mirror index"));
}


// ── Agent Skills discovery (agentskills.io 0.2.0) ───────────────────────────
console.log("\nAgent Skills discovery:");
{
  const dirs = skillDirectories();
  ok(`at least one skill is published (${dirs.length})`, dirs.length >= 1);

  const index = buildSkillsIndex();
  eq("declares the 0.2.0 discovery schema", index.$schema, SCHEMA_URL);
  eq("the index lists exactly the published skill directories", index.skills.map((s) => s.name), dirs);

  for (const entry of index.skills) {
    const dir = path.join(SKILLS_DIR, entry.name);
    const bytes = fs.readFileSync(path.join(dir, "SKILL.md"));
    const front = parseFrontmatter(bytes.toString("utf8"));

    // Required entry fields, per the discovery specification.
    eq(`${entry.name}: type is skill-md`, entry.type, "skill-md");
    eq(`${entry.name}: url points at the SKILL.md`, entry.url, `/.well-known/agent-skills/${entry.name}/SKILL.md`);
    ok(`${entry.name}: digest is sha256:<64 hex>`, /^sha256:[0-9a-f]{64}$/.test(entry.digest));
    // The whole point of the digest: it is the file, not a copy of a claim.
    eq(`${entry.name}: digest matches the published bytes`, entry.digest, sha256(bytes));
    eq(`${entry.name}: description is the frontmatter description`, entry.description, front.description);

    // SKILL.md format rules (agentskills.io specification).
    eq(`${entry.name}: frontmatter name matches the directory`, front.name, entry.name);
    ok(`${entry.name}: name is lowercase, hyphen-separated, <= 64 chars`, SKILL_NAME_PATTERN.test(front.name) && front.name.length <= 64);
    ok(`${entry.name}: description is non-empty and <= 1024 chars`, front.description.length > 0 && front.description.length <= 1024);
    ok(`${entry.name}: compatibility (if set) is <= 500 chars`, !front.compatibility || front.compatibility.length <= 500);
    const body = bytes.toString("utf8").split(/^---\r?\n/m).slice(2).join("---\n");
    ok(`${entry.name}: body leads with a top-level heading`, /^\s*# \S/.test(body));

    // Read-only is the claim the rest of this site makes; the skill must not
    // quietly tell an agent something different.
    ok(`${entry.name}: tells agents not to book on someone's behalf`, /do \*\*not\*\* submit|never .{0,40}booking|not to book/i.test(body));
    ok(`${entry.name}: warns off the private /api paths`, /private form handler/i.test(body));
    ok(`${entry.name}: never references the franchise brand`, !/jim'?s/i.test(bytes.toString("utf8")));
  }
}

console.log("\nAgent Skills wiring:");
{
  const pkg = JSON.parse(read(path.join(ROOT, "package.json")));
  // Generated, never hand-written — a checked-in index would drift the moment a
  // SKILL.md changed, and the digest would stop meaning anything.
  ok("the full build writes the index", pkg.scripts.build.includes("scripts/write-agent-skills.mjs"));
  ok("the meta-only build writes it too", pkg.scripts["build:meta-only"].includes("scripts/write-agent-skills.mjs"));
  ok("no index is checked in under public/", !fs.existsSync(path.join(SKILLS_DIR, "index.json")));

  const headers = read(path.join(PUBLIC, "_headers"));
  ok("_headers types the index as JSON", /\/\.well-known\/agent-skills\/index\.json[\s\S]{0,160}application\/json/.test(headers));
  ok("_headers opens CORS on the skills directory", /\/\.well-known\/agent-skills\/\*\n\s+Access-Control-Allow-Origin: \*/.test(headers));
  // Two matching rules both setting the header emit "…: *, *", which no browser
  // accepts. The wildcard rule carries it for every file under the directory.
  const skillRuleCors = headers
    .split(/\n(?=\/)/)
    .filter((rule) => rule.startsWith("/.well-known/agent-skills"))
    .filter((rule) => /Access-Control-Allow-Origin/.test(rule));
  eq("CORS is declared on exactly one skills rule", skillRuleCors.length, 1);

  const llms = read(path.join(PUBLIC, "llms.txt"));
  ok("llms.txt lists the skill", llms.includes("/.well-known/agent-skills/gold-coast-window-and-pressure-cleaning/SKILL.md"));
  ok("llms.txt lists the discovery index", llms.includes("/.well-known/agent-skills/index.json"));

  const robots = read(path.join(PUBLIC, "robots.txt"));
  ok("robots.txt points at the discovery index", robots.includes("/.well-known/agent-skills/index.json"));

  const agentsPage = read(path.join(PUBLIC, "for-agents", "index.html"));
  ok("the docs page has an #agent-skills section", agentsPage.includes('id="agent-skills"'));
  ok("the docs page links the index", agentsPage.includes('href="/.well-known/agent-skills/index.json"'));
}

// ── Scoped llms.txt for the agent/developer surface ─────────────────────────
console.log("\nScoped /for-agents/llms.txt:");
{
  const scoped = read(path.join(PUBLIC, "for-agents", "llms.txt"));
  ok("starts with an H1 (llms.txt format)", scoped.startsWith("# Gold Coast Window and Pressure Cleaning"));
  ok("keeps a blockquote summary", /\n>\s+\S/.test(scoped.slice(0, 500)));
  const links = scoped.match(/\[[^\]]+\]\(https?:\/\/[^)]+\)/g) || [];
  ok(`is a linked index (${links.length} markdown links)`, links.length >= 12);
  ok(`stays well under 30,000 characters (${scoped.length})`, scoped.length < 30000);
  ok("hands the whole-site view back to /llms.txt", scoped.includes("/llms.txt"));
  ok("never references the franchise brand", !/jim'?s/i.test(scoped));

  // Every fragment it points at has to exist on the page it points at.
  const agentsPage = read(path.join(PUBLIC, "for-agents", "index.html"));
  for (const fragment of [...scoped.matchAll(/\/for-agents\/#([a-z-]+)\)/g)].map((m) => m[1])) {
    ok(`/for-agents/#${fragment} exists`, agentsPage.includes(`id="${fragment}"`));
  }
  // And every static file it names is actually published.
  for (const rel of ["llms.txt", "agent-instructions.md", "llms-full.txt", "robots.txt", "sitemap.xml", ".well-known/api-catalog", ".well-known/mcp"]) {
    ok(`${rel} exists to be linked`, !scoped.includes(`/${rel}`) || fs.existsSync(path.join(PUBLIC, rel)));
  }

  const main = read(path.join(PUBLIC, "llms.txt"));
  ok("the main llms.txt points at the scoped one", main.includes("/for-agents/llms.txt"));
  ok("robots.txt points at the scoped one", read(path.join(PUBLIC, "robots.txt")).includes("/for-agents/llms.txt"));

  // The docs page answers to /docs and /developers; its llms.txt should too.
  const redirects = read(path.join(PUBLIC, "_redirects"));
  for (const alias of ["/docs/llms.txt", "/developers/llms.txt"]) {
    ok(`${alias} resolves to the scoped file`, new RegExp(`^${alias.replace(/\//g, "\\/")}\\s+/for-agents/llms\\.txt\\s+301`, "m").test(redirects));
  }
}

// ── Built output: the index ships and describes what shipped ────────────────
{
  const builtIndex = path.join(DIST, ".well-known", "agent-skills", "index.json");
  if (!fs.existsSync(DIST)) {
    skipped("agent-skills index over dist/", "run `npm run build` first");
  } else if (!fs.existsSync(builtIndex)) {
    skipped("agent-skills index over dist/", "not in this build — rebuild to check it");
  } else {
    console.log("\nAgent Skills index in dist/:");
    const built = JSON.parse(read(builtIndex));
    eq("built index declares the 0.2.0 schema", built.$schema, SCHEMA_URL);
    for (const entry of built.skills) {
      const shipped = path.join(DIST, entry.url.replace(/^\//, ""));
      ok(`${entry.name}: the SKILL.md it points at shipped`, fs.existsSync(shipped));
      if (fs.existsSync(shipped)) {
        // Self-consistency within the build: the digest describes the bytes a
        // client will actually download, not the ones on someone's laptop.
        eq(`${entry.name}: digest matches the shipped bytes`, entry.digest, sha256(fs.readFileSync(shipped)));
      }
    }
  }
}


console.log(`\n${pass} passed, ${fail} failed, ${skip} skipped`);
process.exit(fail ? 1 : 0);
