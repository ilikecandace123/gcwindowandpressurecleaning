// Photos show in full (Skagen, 12/11/2026: "some of the photos are really
// cropped ... make sure that everything, all the photos, are showing in full
// properly"). The page photo at the top of every page and the recent-job
// photos take the photo's own shape, so nothing is sliced off. This fails if
// a fixed-shape, crop-to-fill photo frame comes back.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readImageSizes } from "./assets/build-image-sizes.mjs";

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

function walk(dir, out = []) {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) walk(rel, out);
    else if (/\.jsx$/.test(e.name)) out.push(rel);
  }
  return out;
}

console.log("\nPhoto size list:");
{
  const saved = JSON.parse(read("src/data/imageSizes.json"));
  const real = readImageSizes();
  // Job photos are added by the content engine between builds; the build
  // rewrites the list, so only the photos already listed must be right.
  const wrong = Object.entries(saved).filter(([k, v]) => !real[k] || real[k][0] !== v[0] || real[k][1] !== v[1]).map(([k]) => k);
  ok("every listed size matches the photo on disk", wrong.length === 0, wrong.slice(0, 5).join(" | "));
  const missing = Object.keys(real).filter((k) => !k.startsWith("/images/jobs/") && !saved[k]);
  ok("every site photo is listed (run: npm run image-sizes)", missing.length === 0, missing.slice(0, 5).join(" | "));
  const pkg = JSON.parse(read("package.json"));
  ok("the build rewrites the list first (npm prebuild)", pkg.scripts.prebuild === "node scripts/assets/build-image-sizes.mjs" && pkg.scripts["prebuild:meta-only"] === pkg.scripts.prebuild);
}

console.log("\nPage photo at the top of each page:");
{
  const full = read("src/components/FullPhoto.jsx");
  ok("FullPhoto sizes the frame from the photo's own shape", /--photo-ratio/.test(full) && /photoSize\(src\)/.test(full));
  ok("FullPhoto never crops (no cover fit, height follows the photo)", !/className="[^"]*object-cover/.test(full) && /className="block w-full h-auto"/.test(full));
  ok("FullPhoto only offers a .webp copy that exists", /IMAGE_SIZES\[webp\]/.test(full));
  const css = read("src/index.css");
  ok("index.css narrows the frame for tall photos instead of cropping", /\.photo-fit \{[^}]*width: min\(100%, calc\(var\(--photo-max-h\) \* var\(--photo-ratio/.test(css));
  for (const f of ["src/components/QuoteHero.jsx", "src/pages/InstantQuoteLanding.jsx"]) {
    const src = read(f);
    ok(`${f} shows its photo with FullPhoto`, /<FullPhoto\b/.test(src));
    ok(`${f} has no crop-to-fill photo`, !/className="[^"]*object-cover/.test(src));
    ok(`${f} has no fixed-shape photo frame`, !/photo-frame[^"]*aspect-\[/.test(src));
  }
}

console.log("\nRecent job photos:");
{
  const css = read("src/index.css");
  const rule = (css.match(/\.job-photo \{[^}]*\}/) || [""])[0];
  ok("job photos are shown whole", /object-contain/.test(rule) && /h-auto/.test(rule) && !/object-cover/.test(rule));
  for (const f of ["src/components/RecentJobs.jsx", "src/pages/InstantQuoteLanding.jsx"]) {
    const src = read(f);
    ok(`${f} uses the whole-photo style`, /className="job-photo"/.test(src) && /photoSize\(job\.photo\)/.test(src));
  }
}

console.log("\nNo other cropped photos:");
{
  // Places where filling a fixed box is on purpose:
  //  - home page service cards and sliders: photos cut to the card shape first
  //  - window plan pages: the team photo is a dimmed backdrop behind the heading
  //  - About: height follows the photo (h-auto), so nothing is cut
  //  - quote wizard: thumbnails of photos the customer uploads
  const ALLOW = new Set([
    "src/pages/Services.jsx",
    "src/components/home/BeforeAfter.jsx",
    "src/pages/WindowCleaningPlans.jsx",
    "src/pages/WindowCleaningPlansLocation.jsx",
    "src/pages/About.jsx",
    "src/quote/QuoteWizard.jsx",
  ]);
  const cropped = [];
  for (const f of walk("src")) {
    if (ALLOW.has(f)) continue;
    read(f)
      .split("\n")
      .forEach((line, i) => {
        if (/object-cover/.test(line)) cropped.push(`${f}:${i + 1}`);
      });
  }
  ok("no crop-to-fill photo outside the listed places", cropped.length === 0, cropped.join(" | "));
}

console.log("\nCommercial and Strata page photo:");
{
  const page = read("src/pages/Commercial.jsx");
  const photo = "/images/commercial-strata-hero.jpg";
  ok("page uses Skagen's boom lift photo", page.includes(`backgroundImage={"${photo}"}`));
  ok("photo ships as jpg and webp", exists("public" + photo) && exists("public" + photo.replace(".jpg", ".webp")));
  ok("photo has alt text", /imageAlt=\{"[^"]{20,}"\}/.test(page));
  ok("share image for /commercial is the same photo", read("scripts/prerender.mjs").includes(`image: "${photo}"`));
}

console.log(failures ? `\n${failures} photo check(s) failed.\n` : "\nAll photo checks passed.\n");
process.exit(failures ? 1 : 0);
