// Real recent jobs shown on suburb pages ("Recent work in <suburb>").
//
// Each approved job is one JSON file in src/data/recent-jobs/ plus one photo in
// public/images/jobs/. The GCWP content engine in n8n adds both after Skagen
// approves the post in Telegram, so nothing here is hand-edited.
//
// File shape:
// { "suburb": "southport", "date": "2026-10-26", "services": ["roof-cleaning"],
//   "text": "...", "photo": "/images/jobs/southport-58.jpg", "alt": "..." }

const files = import.meta.glob("./recent-jobs/*.json", { eager: true, import: "default" });

export const RECENT_JOBS = Object.values(files)
  .filter((j) => j && j.suburb && j.text && j.photo)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

// Jobs for one suburb, newest first. Jobs that match the page's service go first.
export function getRecentJobs(suburbSlug, serviceSlug, limit = 3) {
  const list = RECENT_JOBS.filter((j) => j.suburb === suburbSlug);
  if (serviceSlug) {
    list.sort((a, b) => {
      const am = (a.services || []).includes(serviceSlug) ? 1 : 0;
      const bm = (b.services || []).includes(serviceSlug) ? 1 : 0;
      return bm - am || String(b.date).localeCompare(String(a.date));
    });
  }
  return list.slice(0, limit);
}
