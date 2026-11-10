// The desktop hero shows one real Google review per page. This checks that
// each page gets a review for its own service and that a review naming
// another business can never be shown.
import fs from "node:fs";
import { HERO_REVIEWS, pickHeroReview, hideReview } from "../src/data/heroReviews.js";
import { GOOGLE_REVIEWS_SEED, GOOGLE_RATING_SEED, GOOGLE_REVIEW_COUNT_SEED } from "../src/data/googleReviewsSeed.js";

let passed = 0;
let failed = 0;
function ok(name, cond) {
  if (cond) passed++;
  else {
    failed++;
    console.error(`  ✗ ${name}`);
  }
}

console.log("\nHero reviews:");
ok("roof page gets the roof review", pickHeroReview({ pathname: "/roof-cleaning/" }).service === "roof-cleaning");
ok("commercial roof page gets the roof review", pickHeroReview({ pathname: "/commercial/roof-cleaning/" }).service === "roof-cleaning");
ok("pressure page gets the pressure review", pickHeroReview({ pathname: "/pressure-cleaning/" }).service === "pressure-cleaning");
ok("driveway headline gets the pressure review", pickHeroReview({ pathname: "/x/", headline: "Driveway Cleaning in Robina" }).service === "pressure-cleaning");
ok("roof headline gets the roof review", pickHeroReview({ pathname: "/x/", headline: "Tile, Metal and Concrete Roofs" }).service === "roof-cleaning");
ok("bird proofing page does not get the roof review", pickHeroReview({ pathname: "/bird-proofing/burleigh-heads/", headline: "Solar Panel Bird Proofing in Burleigh Heads" }).service === "general");
for (const p of ["/window-cleaning/", "/gutter-cleaning/", "/solar-panel-cleaning/", "/house-softwash/", "/bird-proofing/", "/", "/about/"]) {
  ok(`${p} gets the general review`, pickHeroReview({ pathname: p }).service === "general");
}
ok("there is a general review", HERO_REVIEWS.some((r) => r.service === "general"));
for (const r of HERO_REVIEWS) {
  ok(`${r.name}: has text and a name`, r.text.length > 40 && r.name.length > 2);
  ok(`${r.name}: does not name another business`, !hideReview(r.text));
}
ok("hides a review that says Jims", hideReview("I will definitely rebook Jims for my next window clean."));
ok("hides a review that says Jim's", hideReview("Great job from Jim's"));
ok("hides a review that says Jim’s (curly apostrophe)", hideReview("Jim’s were great"));
ok("keeps an ordinary review", !hideReview("Dean washed our roof for us! He did a great job!"));
ok("keeps a review with a word that only contains jim", !hideReview("Came in a jiffy, Jimmy next door booked too"));


// Only real Google reviews are ever shown: the carousel starts from reviews
// saved word for word from Google, and has no made-up stand-ins.
console.log("\nSaved Google reviews:");
ok("at least three saved reviews (fills the widest row)", GOOGLE_REVIEWS_SEED.length >= 3);
ok("saved rating and count are numbers", GOOGLE_RATING_SEED > 0 && GOOGLE_RATING_SEED <= 5 && Number.isInteger(GOOGLE_REVIEW_COUNT_SEED) && GOOGLE_REVIEW_COUNT_SEED > 0);
for (const r of GOOGLE_REVIEWS_SEED) {
  const who = r.authorAttribution.displayName;
  ok(`${who}: has text, a name and a rating`, r.text.text.length > 40 && who.length > 2 && r.rating >= 1 && r.rating <= 5);
  ok(`${who}: does not name another business`, !hideReview(r.text.text));
}
ok("no saved reviewer appears twice", new Set(GOOGLE_REVIEWS_SEED.map((r) => r.authorAttribution.displayName)).size === GOOGLE_REVIEWS_SEED.length);
for (const h of HERO_REVIEWS) {
  const full = GOOGLE_REVIEWS_SEED.find((r) => r.authorAttribution.displayName === h.name);
  ok(`${h.name}: hero quote is word for word from the saved Google review`, !!full && full.text.text.includes(h.text));
}
{
  const carousel = fs.readFileSync(new URL("../src/components/GoogleReviews.jsx", import.meta.url), "utf8");
  ok("carousel has no stand-in reviews", !/FALLBACK_REVIEWS|Sarah Johnson|Michael Chen|Emma Williams|David Thompson|Jessica Taylor|Liam O'Connor/.test(carousel));
  ok("carousel starts from the saved Google reviews", /useState\(GOOGLE_REVIEWS_SEED\)/.test(carousel));
}

console.log(`${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
