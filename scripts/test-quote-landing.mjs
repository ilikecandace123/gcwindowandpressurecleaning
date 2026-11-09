// Google Ads landing pages (/instant-quote/<service>/) regression test.
//
// Guards:
// - every landing has the fields the page and prerender need, slugs are unique
// - every example price still prices in the quote engine (no custom trigger),
//   and the "from $X" in the meta description equals the cheapest example
// - FAQ copy is complete, names no other business, and the price FAQ carries
//   the engine's own numbers
// - the route, Layout exclusion, wizard prop and prerender wiring are in place
// - after a build, each page is prerendered with FAQPage schema and sits in
//   the static sitemap (skipped, never failed, when dist/ is missing)
//
// Run: node scripts/test-quote-landing.mjs   (also part of `npm test`)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { QUOTE_LANDINGS, landingExamples, landingFaqs, landingFromPrice, landingPath, getQuoteLanding } from "../src/data/quoteLanding.js";
import { SERVICE_ORDER } from "../src/quote/steps.js";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

let pass = 0;
let fail = 0;
let skip = 0;
function ok(name, cond, detail = "") {
  if (cond) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.error(`  ✗ ${name}${detail ? `\n      ${detail}` : ""}`);
  }
}

const FORBIDDEN = /\b(jim'?s|bunnings|bluescope|windex|karcher|kärcher|gerni|mitre ?10|hipages|airtasker|oneflare)\b/i;
const EXPECTED_SLUGS = ["window-cleaning", "pressure-cleaning", "roof-cleaning", "gutter-cleaning", "solar-panel-cleaning", "house-washing"];

console.log("Landing config:");
{
  ok("six landing pages, one per advertised service", JSON.stringify(QUOTE_LANDINGS.map((l) => l.slug)) === JSON.stringify(EXPECTED_SLUGS), QUOTE_LANDINGS.map((l) => l.slug).join(", "));
  ok("slugs are unique", new Set(QUOTE_LANDINGS.map((l) => l.slug)).size === QUOTE_LANDINGS.length);
  ok("unknown slug returns null", getQuoteLanding("nope") === null);
  const app = read("src/App.jsx");
  for (const l of QUOTE_LANDINGS) {
    ok(`${l.slug}: wizard service key is real`, SERVICE_ORDER.includes(l.service));
    ok(`${l.slug}: has title, description, h1, sub, image, servicePage`, [l.title, l.description, l.h1, l.sub, l.image, l.servicePage].every((v) => typeof v === "string" && v.length > 0));
    ok(`${l.slug}: title at most 60 chars`, l.title.length <= 60, `${l.title.length}: ${l.title}`);
    ok(`${l.slug}: description 120 to 165 chars`, l.description.length >= 120 && l.description.length <= 165, `${l.description.length}`);
    ok(`${l.slug}: h1 names Gold Coast`, /Gold Coast/.test(l.h1));
    ok(`${l.slug}: hero image exists (jpg + webp)`, fs.existsSync(path.join(ROOT, "public", l.image)) && fs.existsSync(path.join(ROOT, "public", l.image.replace(".jpg", ".webp"))));
    ok(`${l.slug}: service page exists in the router`, app.includes(`path="${l.servicePage.replace(/\/$/, "")}"`));
    ok(`${l.slug}: at least five included points`, Array.isArray(l.included) && l.included.length >= 5);
    ok(`${l.slug}: path is /instant-quote/${l.slug}/`, landingPath(l) === `/instant-quote/${l.slug}/`);
  }
}

console.log("\nPrices come from the quote engine:");
{
  for (const l of QUOTE_LANDINGS) {
    const ex = landingExamples(l);
    ok(`${l.slug}: three example prices`, ex.length === 3);
    ok(`${l.slug}: every example prices (no custom-quote trigger)`, ex.every((e) => typeof e.total === "number" && e.total > 0), ex.map((e) => `${e.label}: ${e.price}`).join(" | "));
    ok(`${l.slug}: examples are distinct prices`, new Set(ex.map((e) => e.total)).size === ex.length, ex.map((e) => e.total).join(", "));
    const from = landingFromPrice(l);
    const m = l.description.match(/from \$([\d,]+)/i);
    if (m) ok(`${l.slug}: meta "from $${m[1]}" equals cheapest example ($${from})`, Number(m[1].replace(/,/g, "")) === from);
    else ok(`${l.slug}: meta description quotes no price (fine)`, true);
  }
}

console.log("\nFAQ copy:");
{
  for (const l of QUOTE_LANDINGS) {
    const faqs = landingFaqs(l);
    const ex = landingExamples(l);
    ok(`${l.slug}: 5 to 8 FAQs`, faqs.length >= 5 && faqs.length <= 8);
    ok(`${l.slug}: every FAQ has a question and a 40+ char answer`, faqs.every((f) => f.question.endsWith("?") && f.answer.length >= 40));
    ok(`${l.slug}: price FAQ carries all three engine prices`, ex.every((e) => faqs[0].answer.includes(e.price)), faqs[0].answer);
    const text = [l.h1, l.sub, l.description, ...l.included, ...faqs.map((f) => f.question + " " + f.answer)].join("\n");
    const bad = text.match(FORBIDDEN);
    ok(`${l.slug}: names no other business`, !bad, bad && bad[0]);
    ok(`${l.slug}: copy never says "Jim"`, !/\bjim/i.test(text));
  }
}

console.log("\nWiring:");
{
  const app = read("src/App.jsx");
  ok("route /instant-quote/:service registered", app.includes('path="/instant-quote/:service"') && app.includes("InstantQuoteLanding"));
  ok("route sits before the generic /:service/:suburb route", app.indexOf('path="/instant-quote/:service"') < app.indexOf('path="/:service/:suburb"'));
  const layout = read("src/Layout.jsx");
  ok("Layout skips the bottom QuoteCTA on landing pages", /currentPageName !== "InstantQuoteLanding"/.test(layout));
  const wiz = read("src/quote/QuoteWizard.jsx");
  ok("QuoteWizard accepts initialServices", /initialServices = \[\]/.test(wiz) && /services: initialServices/.test(wiz));
  const page = read("src/pages/InstantQuoteLanding.jsx");
  ok("landing page opens the wizard at the first question with the service ticked", /initialPhase="questions"/.test(page) && /initialServices=\{\[landing\.service\]\}/.test(page));
  ok("landing page renders NotFound for unknown slugs", /if \(!landing\) return <NotFound \/>/.test(page));
  ok("landing page has FAQ, reviews, recent jobs and example prices", ["<FAQ ", "<GoogleReviews />", "<RecentJobs ", "landingExamples("].every((k) => page.includes(k)));
  ok("landing page links back to the full service page", /landing\.servicePage/.test(page));
  const pre = read("scripts/prerender.mjs");
  ok("prerender writes a route per landing with FAQ schema", /for \(const landing of QUOTE_LANDINGS\)/.test(pre) && /buildFAQSchema\(landingFaqs\(landing\)\)/.test(pre));
  ok("prerender keeps landing pages out of the residential sitemap", /!r\.path\.startsWith\("\/instant-quote\/"\)/.test(pre));
  ok("prerender gives landing pages their creation date as lastmod", /LASTMOD_OVERRIDES\[landingPath\(landing\)/.test(pre));
  const jobs = read("src/data/recentJobs.js");
  ok("recent jobs can be listed by service", /export function getRecentJobsByService/.test(jobs));
}

console.log("\nBuilt output:");
{
  const dist = path.join(ROOT, "dist");
  if (!fs.existsSync(dist)) {
    skip++;
    console.log("  ⚠ skipped (no dist/ — run a build to check the prerendered pages)");
  } else {
    for (const l of QUOTE_LANDINGS) {
      const f = path.join(dist, "instant-quote", l.slug, "index.html");
      const html = fs.existsSync(f) ? fs.readFileSync(f, "utf8") : "";
      ok(`${l.slug}: prerendered`, html.length > 0);
      ok(`${l.slug}: FAQPage schema`, /"@type":\s*"FAQPage"/.test(html));
      ok(`${l.slug}: canonical with trailing slash`, html.includes(`<link rel="canonical" href="https://gcwindowandpressurecleaning.com.au/instant-quote/${l.slug}/" />`));
    }
    const smFile = path.join(dist, "sitemap-static.xml");
    const sm = fs.existsSync(smFile) ? fs.readFileSync(smFile, "utf8") : "";
    for (const l of QUOTE_LANDINGS) ok(`${l.slug}: in the static sitemap`, sm.includes(`/instant-quote/${l.slug}/`));
    const res = path.join(dist, "sitemap-residential.xml");
    ok("no landing page in the residential sitemap", !fs.existsSync(res) || !fs.readFileSync(res, "utf8").includes("/instant-quote/"));
  }
}

console.log(`\n${pass} passed, ${fail} failed, ${skip} skipped`);
process.exit(fail ? 1 : 0);
