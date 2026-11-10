// Which service a recent-job photo actually shows.
//
// A job often covers several services (roof + gutters + softwash) but has one
// photo, so "this job included gutter cleaning" does not mean the photo shows
// gutters. Pages that lead with a photo for one service (the Google Ads
// landing pages) must only use photos of that service: a roof photo on the
// gutter page reads as a mistake.
//
// The content engine can set "photoService" on the job to say so outright.
// Without it we read the photo description (alt), which the engine writes
// from the picture itself, and score it against each service the job covered.

const WORDS = {
  "solar-panel-cleaning": /solar|panel/gi,
  "gutter-cleaning": /gutter|downpipe/gi,
  "window-cleaning": /window|glass|\bpanes?\b/gi,
  "house-softwash": /mould|\bwalls?\b|render|eave|underside|pergola|beam|fascia|cladding|weatherboard/gi,
  "pressure-cleaning": /paver|driveway|\bpath|concrete|courtyard|aggregate|patio/gi,
  "roof-cleaning": /roof|\btiles?\b|ridge|corrugated/gi,
};

// Ties go to the earlier entry.
const ORDER = ["window-cleaning", "house-softwash", "pressure-cleaning", "roof-cleaning"];

const count = (text, re) => (text.match(re) || []).length;

export function jobPhotoService(job) {
  if (!job) return null;
  const services = job.services || [];
  if (job.photoService && services.includes(job.photoService)) return job.photoService;
  if (services.length === 1) return services[0];

  const alt = String(job.alt || "");
  // The description opens with the subject of the photo ("Before and after of
  // the patio corner…", "Clean solar panels on…"); the rest is surroundings.
  const subject = alt.split(/[.:;]/)[0];
  const rest = alt.slice(subject.length);

  // Panels and gutters are unmistakable when they are in the picture.
  if (services.includes("solar-panel-cleaning") && count(alt, WORDS["solar-panel-cleaning"])) return "solar-panel-cleaning";
  if (services.includes("gutter-cleaning") && count(subject, WORDS["gutter-cleaning"])) return "gutter-cleaning";

  let best = null;
  let bestScore = 0;
  for (const svc of ORDER) {
    if (!services.includes(svc)) continue;
    const score = 3 * count(subject, WORDS[svc]) + count(rest, WORDS[svc]);
    if (score > bestScore) {
      best = svc;
      bestScore = score;
    }
  }
  // Nothing recognisable: do not guess. The job still shows on suburb pages.
  return best;
}
