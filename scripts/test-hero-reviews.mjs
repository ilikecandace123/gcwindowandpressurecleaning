// The desktop hero shows one real Google review per page. This checks that
// each page gets a review for its own service and that a review naming
// another business can never be shown.
import { HERO_REVIEWS, pickHeroReview, hideReview } from "../src/data/heroReviews.js";

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
for (const p of ["/window-cleaning/", "/gutter-cleaning/", "/solar-panel-cleaning/", "/house-softwash/", "/", "/about/"]) {
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

console.log(`${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
