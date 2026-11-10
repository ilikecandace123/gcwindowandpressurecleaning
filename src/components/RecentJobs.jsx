import React from "react";
import { Camera } from "lucide-react";
import { getRecentJobs } from "../data/recentJobs";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function monthYear(date) {
  const [y, m] = String(date || "").split("-");
  const name = MONTHS[Number(m) - 1];
  return name && y ? `${name} ${y}` : "";
}

// "Recent work in <suburb>": real jobs with a real photo. Renders nothing
// when the suburb has no approved jobs yet. Pass `jobs` + `title` to show a
// different selection (the Google Ads landing pages list jobs by service).
export default function RecentJobs({ suburbSlug, suburbName, serviceSlug, jobs: jobsProp, title }) {
  const jobs = jobsProp || getRecentJobs(suburbSlug, serviceSlug);
  if (!jobs.length) return null;
  return (
    <section className="py-16 bg-paper" id="recent-work">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="eyebrow eyebrow-plain mb-3">
          <Camera className="w-4 h-4" /> Real jobs, real photos
        </p>
        <h2 className="text-3xl md:text-[38px] font-bold text-ink leading-[1.1] mb-8">{title || `Recent work in ${suburbName}`}</h2>
        <div className={`grid gap-8 ${jobs.length > 1 ? "md:grid-cols-2" : ""}`}>
          {jobs.map((job) => (
            <figure key={job.photo} className="card overflow-hidden">
              <img
                src={job.photo}
                alt={job.alt || `Recent job in ${suburbName || "the Gold Coast"}`}
                width={1200}
                height={900}
                className="w-full h-72 object-cover border-b-2 border-ink"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="p-6">
                {monthYear(job.date) && (
                  <div className="text-[12px] tracking-[.1em] uppercase font-bold text-ochre-3 mb-2">{monthYear(job.date)}</div>
                )}
                <p className="text-ink-2 leading-relaxed">{job.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
