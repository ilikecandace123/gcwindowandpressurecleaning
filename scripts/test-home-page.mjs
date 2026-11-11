// Home page (redesign 11/2026): the content in src/data/homePage.js must point
// at things that exist, and the page must keep the rules Skagen set: real
// photos that show the service, only real Google reviews, no texting wording,
// no high-rise claims, nothing that names another business.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  HOME_HERO,
  HERO_PHOTOS,
  STRIP_SERVICES,
  QUOTE_START_SERVICES,
  HOME_SERVICES,
  HOME_STATS,
  HOME_SLIDERS,
  HOME_COMPARE,
} from "../src/data/homePage.js";
import { SERVICE_ORDER } from "../src/quote/steps.js";
import { GOOGLE_REVIEW_COUNT_SEED } from "../src/data/googleReviewsSeed.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const exists = (p) => fs.existsSync(path.join(ROOT, p));

let failures = 0;
function ok(name, cond, detail = "") {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.error(`  ✗ ${name}${detail ? " — " + detail : ""}`);
  }
}
const photoOk = (src) => exists("public" + src) && exists("public" + src.replace(/\.jpg$/, ".webp"));

console.log("\nHome page top:");
ok("hero photo is one of HERO_PHOTOS", Object.keys(HERO_PHOTOS).includes(HOME_HERO.photo));
ok("hero theme is navy or blue", ["navy", "blue"].includes(HOME_HERO.theme));
for (const [name, p] of Object.entries(HERO_PHOTOS)) {
  ok(`${name} photo exists as jpg and webp`, photoOk(p.src));
  ok(`${name} photo has alt text and a size`, p.alt.length > 10 && p.width > 0 && p.height > 0);
}
ok("headline is short", (HOME_HERO.headline + " " + HOME_HERO.headlineAccent).split(/\s+/).length <= 6);
ok("sentence under the headline names the areas", /Gold Coast/.test(HOME_HERO.sub) && /Northern NSW/.test(HOME_HERO.sub) && /Brisbane/.test(HOME_HERO.sub));

console.log("\nService strip and quote start:");
const iconNames = [...read("src/components/home/ServiceIcon.jsx").matchAll(/^  (\w+): \(/gm)].map((m) => m[1]);
const app = read("src/App.jsx");
ok("six drawings exist", iconNames.length >= 6, iconNames.join(","));
for (const s of STRIP_SERVICES) {
  ok(`strip: ${s.label} has a drawing`, iconNames.includes(s.icon));
  ok(`strip: ${s.label} links a real page`, app.includes(`path="${s.to.replace(/\/$/, "")}"`));
}
for (const s of QUOTE_START_SERVICES) {
  ok(`quote start: ${s.label} is a quote engine service`, SERVICE_ORDER.includes(s.key));
  ok(`quote start: ${s.label} has a drawing`, iconNames.includes(s.icon));
}
{
  const start = read("src/components/home/HomeQuoteStart.jsx");
  ok("wizard is loaded only after Next (lazy)", /lazy\(\(\) => import\("\.\.\/\.\.\/quote\/QuoteWizard"\)\)/.test(start) && /started/.test(start));
  ok("wizard opens at the first question with the ticked services", /initialPhase="questions"/.test(start) && /initialServices=\{picked\}/.test(start));
}

console.log("\nService cards and sliders:");
for (const s of HOME_SERVICES) {
  ok(`${s.title}: photo exists as jpg and webp`, photoOk(s.image));
  ok(`${s.title}: links a real page`, app.includes(`path="/${s.slug}"`));
  ok(`${s.title}: has alt text`, s.alt.length > 10);
}
ok("all seven services are linked", HOME_SERVICES.length === 7);
for (const j of HOME_SLIDERS) {
  ok(`${j.label}: before and after photos exist`, photoOk(j.before) && photoOk(j.after));
}

console.log("\nClaims:");
ok("review count comes from the saved Google count", HOME_STATS.some((s) => s.value === String(GOOGLE_REVIEW_COUNT_SEED)) && HOME_COMPARE.some((r) => r.us.includes(String(GOOGLE_REVIEW_COUNT_SEED))));
{
  const all = read("src/data/homePage.js") + read("src/pages/Services.jsx") + read("src/components/home/HomeHero.jsx") + read("src/components/home/HomeQuoteStart.jsx");
  ok("no texting wording (the number is a landline)", !/\btext us\b|\bsms\b|send us a text/i.test(all));
  ok("no high-rise or rope access claims", !/high[- ]?rise|rope access|abseil/i.test(all));
  ok("does not name another business", !/\bjim['’]?s?\b/i.test(all));
  ok("reviews section is the real Google one", /<GoogleReviews \/>/.test(read("src/pages/Services.jsx")));
}

console.log("\nHeader and page furniture:");
{
  const layout = read("src/Layout.jsx");
  ok("header floats over the photo on the home page only", /const isHome = location\.pathname === "\/";/.test(layout) && /const overlay = isHome && !scrolled && !mobileMenuOpen;/.test(layout));
  ok("home page skips the bottom quote chooser (quote is on the page)", /!isHome && <QuoteCTA variant="section" \/>/.test(layout));
  const page = read("src/pages/Services.jsx");
  ok("page has the quote scroll target", /<section id="quote"/.test(page));
  {
    const strip = read("src/components/home/ServiceStrip.jsx");
    ok("every strip item is a link in every run (no plain-text copies)", strip.includes("<Link to={s.to}") && !strip.includes("<span>{s.label}</span>") && strip.includes("tabIndex={copy ? -1 : undefined}"));
  }
  {
    // "Say we actually answer under the phone number on all pages" (12/11/2026)
    const number = read("src/components/PhoneNumber.jsx");
    ok("PhoneNumber puts 'We actually answer' under the number", number.includes("(07) 5230 8293") && number.includes("We actually answer"));
    for (const f of ["src/Layout.jsx", "src/components/QuoteHero.jsx", "src/components/home/HomeHero.jsx"]) {
      ok(`${f} shows the number with the line under it`, read(f).includes("<PhoneNumber"));
    }
    ok("footer says we actually answer under the number", layout.includes("We actually answer."));
    ok("instant quote landing pages do not mention texts", !/answer texts/i.test(read("src/pages/InstantQuoteLanding.jsx")));
  }
  ok("strip stands still for reduced motion", /prefers-reduced-motion: reduce\) \{\s*\.home-strip__run \{ animation: none; \}/.test(read("src/index.css")));
}

console.log(failures ? `\n${failures} home page check(s) failed.\n` : "\nAll home page checks passed.\n");
process.exit(failures ? 1 : 0);
