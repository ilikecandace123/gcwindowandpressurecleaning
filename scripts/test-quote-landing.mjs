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
import { GUTTER_PRICES, SOFTWASH_PRICES, ROOF_LINE_FLOOR, FLOOR_PRESSURE, FLOOR_ONE_OFF } from "../src/quote/engine.js";
import { jobPhotoService } from "../src/data/jobPhotoService.js";

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
function eq(name, actual, expected) {
  ok(name, actual === expected, `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
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
  ok("landing page has FAQ, reviews, recent jobs and example prices", ["<LandingFaq ", "<GoogleReviews />", "getRecentJobsByService(", "landingExamples("].every((k) => page.includes(k)));
  ok("landing page links back to the full service page", /landing\.servicePage/.test(page));
  const pre = read("scripts/prerender.mjs");
  ok("prerender writes a route per landing with FAQ schema", /for \(const landing of QUOTE_LANDINGS\)/.test(pre) && /buildFAQSchema\(landingFaqs\(landing\)\)/.test(pre));
  ok("prerender keeps landing pages out of the residential sitemap", /!r\.path\.startsWith\("\/instant-quote\/"\)/.test(pre));
  ok("prerender gives landing pages their creation date as lastmod", /LASTMOD_OVERRIDES\[landingPath\(landing\)/.test(pre));
  const jobs = read("src/data/recentJobs.js");
  ok("recent jobs can be listed by service", /export function getRecentJobsByService/.test(jobs));
}

// A job can cover several services but has one photo. The landing pages lead
// with that photo, so it must show the page's own service (Skagen, 10/11/2026:
// "you've got a roof clean photo on the gutter clean page").
console.log("\nPhotos match the page's service:");
{
  const job = (services, alt, extra = {}) => ({ services, alt, ...extra });
  eq(
    "a roof photo on a roof + gutter job is a roof photo",
    jobPhotoService(job(["roof-cleaning", "house-softwash", "pressure-cleaning", "gutter-cleaning"], "Before and after of the rear roof hip junction facing red car. Before: Dirty tile roof with a hip ridge junction")),
    "roof-cleaning"
  );
  eq("panels win over the roof they sit on", jobPhotoService(job(["roof-cleaning", "solar-panel-cleaning"], "Before and after of the panel corner at roof edge. Before: Panel covered in bird droppings, with tile ridge beyond")), "solar-panel-cleaning");
  eq("pavers by a sliding door are pressure cleaning", jobPhotoService(job(["window-cleaning", "pressure-cleaning"], "Before and after of the patio corner by sliding door and step. Before: Dull, weathered travertine pavers")), "pressure-cleaning");
  eq("mould under a patio roof is a softwash photo", jobPhotoService(job(["roof-cleaning", "house-softwash", "pressure-cleaning"], "Before and after of the patio roof underside, looking along the wall. Before: heavy black mould")), "house-softwash");
  eq("a gutter in the subject is a gutter photo", jobPhotoService(job(["roof-cleaning", "gutter-cleaning"], "Before and after of the front gutter run. Before: gutter packed with leaves above the roof edge")), "gutter-cleaning");
  eq("a single-service job is that service", jobPhotoService(job(["window-cleaning"], "Water-fed pole on a tall building")), "window-cleaning");
  eq("photoService on the job wins", jobPhotoService(job(["roof-cleaning", "gutter-cleaning"], "Dirty tile roof", { photoService: "gutter-cleaning" })), "gutter-cleaning");
  eq("an unrecognisable photo is not guessed", jobPhotoService(job(["roof-cleaning", "gutter-cleaning"], "A van parked in the street")), null);

  const dir = path.join(ROOT, "src/data/recent-jobs");
  const jobs = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
  const bad = jobs.filter((j) => { const s = jobPhotoService(j); return s && !(j.services || []).includes(s); });
  ok("every real job photo is filed under a service the job included", bad.length === 0, bad.map((j) => j.photo).join(", "));
  const tweed = jobs.find((j) => j.photo === "/images/jobs/tweed-heads-south-264.jpg");
  if (tweed) eq("the Tweed Heads South roof photo is not a gutter photo", jobPhotoService(tweed), "roof-cleaning");

  const recent = read("src/data/recentJobs.js");
  ok("landing pages pick jobs by what the photo shows", /getRecentJobsByService[\s\S]{0,200}jobPhotoService\(j\) === serviceSlug/.test(recent));
  for (const f of ["src/pages/GutterCleaning.jsx", "src/pages/LocationService.jsx", "src/pages/CommercialService.jsx", "src/pages/CommercialLocationService.jsx"]) {
    ok(`${f} does not use the roof-walk photo for gutters`, !read(f).includes("gutter-screenshot"));
  }
  ok("house softwash hero is a real job, not the stock pool house", !read("src/pages/HouseSoftWash.jsx").includes("softwash-unsplash") && !read("src/pages/LocationService.jsx").includes("softwash-unsplash"));
}

// The old service-page FAQs, suburb pricing guides, guides and llms.txt quoted
// prices that had drifted from the engine (gutters "from $220", roof "from
// $700"...). Since 09/11/2026 they carry the engine's own numbers; this keeps
// them from drifting again.
console.log("\nSite copy matches the engine:");
{
  const money = (n) => "$" + Math.round(n).toLocaleString("en-AU");
  const expect = {
    gutter: [GUTTER_PRICES[1][2], GUTTER_PRICES[1][4], GUTTER_PRICES[2][3], GUTTER_PRICES[2][5]].map(money), // $275 $385 $440 $660
    roof: [ROOF_LINE_FLOOR].map(money), // $594
    softwash: [SOFTWASH_PRICES[1][2], SOFTWASH_PRICES[1][3], SOFTWASH_PRICES[1][4], SOFTWASH_PRICES[2][3], SOFTWASH_PRICES[2][4], SOFTWASH_PRICES[2][5]].map(money),
    pressure: [FLOOR_PRESSURE].map(money), // $275
    solar: [FLOOR_ONE_OFF].map(money), // $220
  };
  const stale = /\$220–\$550|\$330–\$770|\$700 for a flatter|\$700–\$1,600|\$4–\$10 per additional|\$440 for a medium|\$660\+ for an XL|from \$495 for a small single-storey/;
  const files = {
    "src/pages/GutterCleaning.jsx": expect.gutter,
    "src/pages/RoofCleaning.jsx": expect.roof,
    "src/pages/HouseSoftWash.jsx": expect.softwash,
    "src/pages/PressureCleaning.jsx": expect.pressure,
    "src/pages/SolarPanelCleaning.jsx": expect.solar,
    "src/data/locations.js": [...expect.gutter, ...expect.roof, ...expect.softwash, ...expect.pressure],
    "public/llms.txt": [...expect.gutter, ...expect.roof, ...expect.softwash, ...expect.pressure],
    "src/data/guides.js": [...expect.roof, ...expect.pressure],
    "src/data/guides-2026-10.js": [...expect.roof, ...expect.pressure],
  };
  for (const [f, nums] of Object.entries(files)) {
    const text = read(f);
    const missing = nums.filter((n) => !text.includes(n));
    ok(`${f}: carries the engine prices`, missing.length === 0, "missing " + missing.join(", "));
    const m = text.match(stale);
    ok(`${f}: no pre-09/11/2026 price copy`, !m, m && m[0]);
  }
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
