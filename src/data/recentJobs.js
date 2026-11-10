// Real recent jobs shown on suburb pages ("Recent work in <suburb>").
//
// Each approved job is one JSON file in src/data/recent-jobs/ plus one photo in
// public/images/jobs/. The GCWP content engine in n8n adds both after Skagen
// approves the post in Telegram, so nothing here is hand-edited.
//
// File shape:
// { "suburb": "southport", "date": "2026-10-26", "services": ["roof-cleaning"],
//   "text": "...", "photo": "/images/jobs/southport-58.jpg", "alt": "..." }

import { jobPhotoService } from "./jobPhotoService.js";

const files = import.meta.glob("./recent-jobs/*.json", { eager: true, import: "default" });

export const RECENT_JOBS = Object.values(files)
  .filter((j) => j && j.suburb && j.text && j.photo)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

// Up to 4 jobs for one suburb, newest first. Jobs that match the page's service go first.
export function getRecentJobs(suburbSlug, serviceSlug, limit = 4) {
  const list = RECENT_JOBS.filter((j) => j.suburb === suburbSlug);
  if (serviceSlug) {
    // Photo of this service first, then jobs that at least included it.
    const rank = (j) => (jobPhotoService(j) === serviceSlug ? 2 : (j.services || []).includes(serviceSlug) ? 1 : 0);
    list.sort((a, b) => rank(b) - rank(a) || String(b.date).localeCompare(String(a.date)));
  }
  return list.slice(0, limit);
}

// Up to `limit` jobs whose PHOTO shows one service, newest first, across every
// suburb. Used by the Google Ads landing pages (/instant-quote/<service>/),
// where the photo leads the page: a job that merely included the service but
// is pictured doing something else (a roof on the gutter page) is left out.
export function getRecentJobsByService(serviceSlug, limit = 4) {
  return RECENT_JOBS.filter((j) => jobPhotoService(j) === serviceSlug).slice(0, limit);
}
