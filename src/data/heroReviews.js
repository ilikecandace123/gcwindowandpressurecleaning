// Real Google reviews shown in the page hero on desktop (QuoteHero).
//
// Every quote here is copied word for word from the business's Google
// profile. A quote may be a shorter run of sentences from a longer review, but
// the words are never changed. Do not add a review that is not on Google, and
// do not add one that names another business (see hideReview below).
//
// `service` says which pages a review belongs on, so a roof review never sits
// on a window page. Pages with no review of their own get the general one.
export const HERO_REVIEWS = [
  {
    service: "roof-cleaning",
    name: "Mark Sullivan",
    text: "Our roof had years of built-up mould and dirt, etc and it now looks absolutely brand new. The technician did an incredible job clearing away all the grime without missing a single spot.",
  },
  {
    service: "pressure-cleaning",
    name: "Deb Hawkins",
    text: "I am really pleased with job on sandstone tiles. They had turned 50 shades of black with all the recent rain. The 2 young men on this job were very pleasant and professional.",
  },
  {
    service: "general",
    name: "Ruth Mender",
    text: "From start to finish, his professionalism, attention to detail, and quality of work were outstanding. He arrived on time, communicated clearly about what needed to be done, and completed the job efficiently without cutting corners.",
  },
];

// Public Google Business Profile id, used only for the "read all reviews" link.
export const GOOGLE_REVIEWS_URL = "https://search.google.com/local/reviews?placeid=ChIJpTMe2iOAqU0RqA5p7p-4Aog";

// \broof so "bird-proofing" is not read as a roof page.
const SERVICE_WORDS = [
  ["roof-cleaning", /\broof/i],
  ["pressure-cleaning", /pressure|driveway|paver|concrete|patio/i],
];

// Picks the review for a page from its address and headline.
export function pickHeroReview({ pathname = "", headline = "" } = {}) {
  const where = `${pathname} ${headline}`;
  const hit = SERVICE_WORDS.find(([, re]) => re.test(where));
  const service = hit ? hit[0] : "general";
  return HERO_REVIEWS.find((r) => r.service === service) || HERO_REVIEWS.find((r) => r.service === "general");
}

// Reviews that name another business are never shown on this site.
const OTHER_BUSINESS = /\bjim['’]?s?\b/i;
export function hideReview(text) {
  return OTHER_BUSINESS.test(String(text || ""));
}
