// Content regression test — AI-search content (Oct 2026).
//
// Guards the rules the guide and FAQ copy must keep:
// - meta lengths within seo-validate limits, every guide opens with a direct answer
// - every guide links to a service page and to the instant quote
// - no other company, brand or franchise is named in guide or service-page copy
// - plan prices quoted in the plans guide match the quote engine
// - the new FAQs, pre-sale sections and guide links are wired into the pages
// - after a build, the prerendered guides carry Article + FAQPage schema
//
// Source checks always run. Built-output checks skip (never fail) when dist/
// is missing, so a clean checkout still passes `npm test`.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GUIDES } from "../src/data/guides.js";
import { NEW_GUIDES_2026_10 } from "../src/data/guides-2026-10.js";
import { calculateQuote } from "../src/quote/engine.js";

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

const SERVICE_PAGES = [
  "/window-cleaning/",
  "/window-cleaning-plans/",
  "/pressure-cleaning/",
  "/house-softwash/",
  "/roof-cleaning/",
  "/gutter-cleaning/",
  "/solar-panel-cleaning/",
  "/solar-panel-bird-proofing/",
];

// Other businesses' names that must never appear in on-site copy. "Colorbond"
// is deliberately not here: it is the everyday name for the roofing material.
const FORBIDDEN = /\b(jim'?s|bunnings|bluescope|windex|karcher|kärcher|gerni|mitre ?10|hipages|airtasker|oneflare)\b/i;

const NEW_SLUGS = [
  "is-a-window-cleaning-plan-worth-it",
  "cleaning-before-selling-your-house-gold-coast",
  "salt-air-mould-windows-gold-coast",
];

// ── Guides ──────────────────────────────────────────────────────────────────
console.log("Guides:");
{
  const slugs = GUIDES.map((g) => g.slug);
  ok("slugs are unique", new Set(slugs).size === slugs.length);
  for (const s of NEW_SLUGS) ok(`new guide registered: ${s}`, slugs.includes(s));
  ok("new guides file exports exactly the three new guides", NEW_GUIDES_2026_10.length === 3);

  for (const g of GUIDES) {
    const t = g.metaTitle.length;
    const d = g.metaDescription.length;
    ok(`${g.slug}: metaTitle 31–59 chars (${t})`, t >= 31 && t <= 59);
    ok(`${g.slug}: metaDescription 126–157 chars (${d})`, d >= 126 && d <= 157);
    ok(`${g.slug}: has a direct answer`, typeof g.directAnswer === "string" && g.directAnswer.length > 80);
    ok(`${g.slug}: has FAQs`, Array.isArray(g.faqs) && g.faqs.length >= 3);
    const hrefs = (g.related || []).map((r) => r.href);
    ok(`${g.slug}: links to a service page`, hrefs.some((h) => SERVICE_PAGES.includes(h)));
    ok(`${g.slug}: links to the instant quote`, hrefs.includes("/instant-quote/"));
    const text = JSON.stringify(g);
    const m = text.match(FORBIDDEN);
    ok(`${g.slug}: names no other brand`, !m, m ? `found "${m[0]}"` : "");
  }

  const vs = GUIDES.find((g) => g.slug === "pressure-cleaning-vs-soft-washing");
  const heads = vs.sections.map((s) => s.heading);
  ok("vs guide answers 'which is better'", heads.includes("Which is better, pressure cleaning or soft washing?"));
  ok("vs guide answers 'when to use each'", heads.includes("When to use each"));
  ok("vs guide answers 'which is right for roof tiles'", heads.includes("Which is right for roof tiles?"));
  ok("vs guide links to roof cleaning", vs.related.some((r) => r.href === "/roof-cleaning/"));
}

// ── Plan prices in copy match the quote engine ──────────────────────────────
console.log("\nPlan guide prices vs quote engine:");
{
  const w = (storeys, panes, frequency) =>
    calculateQuote({
      services: ["window"],
      window: { propertyType: "house", storeys, tint: "no", condition: "moderate", french: "none", panes, frequency, interiorAddon: false },
    }).total;
  const guide = JSON.stringify(GUIDES.find((g) => g.slug === "is-a-window-cleaning-plan-worth-it"));
  const cases = [
    ["2", "41-50", "one-off"],
    ["2", "41-50", "quarterly"],
    ["1", "41-50", "one-off"],
    ["1", "41-50", "quarterly"],
    ["1", "21-30", "one-off"],
    ["1", "21-30", "quarterly"],
  ];
  for (const [s, p, f] of cases) {
    const price = w(s, p, f);
    ok(`${s}-storey ${p} panes ${f} = $${price} appears in the guide`, guide.includes(`$${price}`));
  }
  const wi = (storeys, panes, frequency) =>
    calculateQuote({
      services: ["window"],
      window: { propertyType: "house", storeys, tint: "no", condition: "moderate", french: "none", panes, frequency, interiorAddon: true },
    }).total;
  ok(`inside-and-out 1-storey 41–50 one-off = $${wi("1", "41-50", "one-off")} appears in the guide`, guide.includes(`$${wi("1", "41-50", "one-off")}`));
  ok(`inside-and-out 1-storey 41–50 quarterly = $${wi("1", "41-50", "quarterly")} appears in the guide`, guide.includes(`$${wi("1", "41-50", "quarterly")}`));
  const g = GUIDES.find((x) => x.slug === "is-a-window-cleaning-plan-worth-it");
  const priceList = g.sections.find((x) => x.heading.includes("real numbers")).list;
  ok("every pane-count price states its scope", priceList.every((i) => /exterior only|inside and out/i.test(i)));
  ok("2-storey 41–50 one-off is $400", w("2", "41-50", "one-off") === 400);
  ok("2-storey 41–50 quarterly is $300", w("2", "41-50", "quarterly") === 300);
}

// ── Service pages ───────────────────────────────────────────────────────────
console.log("\nService pages:");
{
  const plans = read("src/pages/WindowCleaningPlans.jsx");
  ok("plans: 'is it worth it' FAQ", plans.includes("What is a window cleaning plan, and is it worth it?"));
  ok("plans: Gold Coast frequency FAQ", plans.includes("How often should I get my windows cleaned on the Gold Coast?"));
  ok("plans: subscription FAQ", plans.includes("How does a window cleaning subscription work?"));
  ok("plans: links to plan guide", plans.includes("/guides/is-a-window-cleaning-plan-worth-it/"));
  ok("plans: FAQPage schema", plans.includes("buildFAQSchema(faqs)"));

  const win = read("src/pages/WindowCleaning.jsx");
  ok("window: cost FAQ explains drivers and points to instant quote", /How much does window cleaning cost on the Gold Coast\?[\s\S]{0,1200}panes[\s\S]{0,600}\/instant-quote\//.test(win));
  ok("window: professional vs DIY FAQ", win.includes("Is it worth paying for professional window cleaning instead of doing it myself?"));
  ok("window: one commercial/strata FAQ", (win.match(/question: "[^"]*strata[^"]*"/gi) || []).length === 1);
  ok("window: pre-sale section", win.includes('<PreSaleSection variant="window" />'));

  const pres = read("src/pages/PressureCleaning.jsx");
  ok("pressure: pre-sale section", pres.includes('<PreSaleSection variant="pressure" />'));

  const roof = read("src/pages/RoofCleaning.jsx");
  for (const q of [
    "What does roof cleaning on the Gold Coast involve?",
    "What causes the black streaks and algae on roof tiles?",
    "Does roof cleaning extend the life of roof tiles?",
    "Why do roofs need regular cleaning in Queensland?",
  ])
    ok(`roof: FAQ "${q}"`, roof.includes(q));
  ok("roof: links vs guide", roof.includes("/guides/pressure-cleaning-vs-soft-washing/"));
  ok("house softwash: links vs guide", read("src/pages/HouseSoftWash.jsx").includes("/guides/pressure-cleaning-vs-soft-washing/"));

  for (const f of ["WindowCleaning", "WindowCleaningPlans", "PressureCleaning", "RoofCleaning", "HouseSoftWash"]) {
    const src = read(`src/pages/${f}.jsx`);
    ok(`${f}: LocalBusiness + Service + FAQPage schema`, src.includes("buildLocalBusinessSchema()") && /"?@type"?: "Service"/.test(src) && src.includes("buildFAQSchema(faqs)"));
    const m = src.match(FORBIDDEN);
    ok(`${f}: names no other brand`, !m, m ? `found "${m[0]}"` : "");
  }

  const pre = read("src/components/PreSaleSection.jsx");
  ok("pre-sale section links to guide and instant quote", pre.includes("/guides/cleaning-before-selling-your-house-gold-coast/") && pre.includes("/instant-quote/"));
  const faq = read("src/components/FAQ.jsx");
  ok("FAQ accepts a single guide link or an array", faq.includes("Array.isArray(guideLink)"));
  const llms = read("public/llms.txt");
  for (const s of NEW_SLUGS) ok(`llms.txt lists ${s}`, llms.includes(`/guides/${s}/`));
}

// ── Guide images ────────────────────────────────────────────────────────────
console.log("\nGuide images:");
for (const g of GUIDES) {
  for (const sec of g.sections.filter((x) => x.image)) {
    const im = sec.image;
    const base = path.join(ROOT, "public", im.src);
    ok(`${g.slug}: ${im.src} exists (jpg + webp)`, fs.existsSync(base) && fs.existsSync(base.replace(/\.jpg$/, ".webp")));
    ok(`${g.slug}: ${im.src} has descriptive alt + dimensions`, im.alt && im.alt.length > 30 && im.width > 0 && im.height > 0);
  }
}
ok("salt-air guide has the etching and track photos", (GUIDES.find((g) => g.slug === "salt-air-mould-windows-gold-coast").sections.filter((x) => x.image).length === 2));

// ── Built output ────────────────────────────────────────────────────────────
console.log("\nBuilt guides:");
const dist = path.join(ROOT, "dist", "guides");
if (!fs.existsSync(dist)) {
  skip++;
  console.log("  ⚠ built output — skipped (run `npm run build:meta-only` first)");
} else {
  for (const s of NEW_SLUGS) {
    const f = path.join(dist, s, "index.html");
    const html = fs.existsSync(f) ? fs.readFileSync(f, "utf8") : "";
    ok(`${s}: prerendered`, html.length > 0);
    ok(`${s}: Article schema`, /"@type":\s*"Article"/.test(html));
    ok(`${s}: FAQPage schema`, /"@type":\s*"FAQPage"/.test(html));
    if (s === "salt-air-mould-windows-gold-coast") ok(`${s}: Article/OG image is the guide photo`, html.includes("/images/glass-salt-mineral-etching.jpg"));
  }
  const sm = ["sitemap.xml", "sitemap-static.xml"].map((n) => path.join(ROOT, "dist", n)).filter((p) => fs.existsSync(p)).map((p) => fs.readFileSync(p, "utf8")).join("");
  for (const s of NEW_SLUGS) ok(`${s}: in a sitemap`, sm.includes(`/guides/${s}`));
}

console.log(`\n${pass} passed, ${fail} failed, ${skip} skipped`);
process.exit(fail ? 1 : 0);
