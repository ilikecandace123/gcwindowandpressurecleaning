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
    <section className="py-16 bg-white" id="recent-work">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-blue-600 mb-3">
          <Camera className="w-5 h-5" />
          <span className="font-semibold">Real jobs, real photos</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{title || `Recent work in ${suburbName}`}</h2>
        <div className={`grid gap-8 ${jobs.length > 1 ? "md:grid-cols-2" : ""}`}>
          {jobs.map((job) => (
            <figure key={job.photo} className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img
                src={job.photo}
                alt={job.alt || `Recent job in ${suburbName || "the Gold Coast"}`}
                width={1200}
                height={900}
                className="w-full h-72 object-cover"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="p-6">
                {monthYear(job.date) && (
                  <div className="text-sm font-semibold text-blue-600 mb-2">{monthYear(job.date)}</div>
                )}
                <p className="text-gray-700 leading-relaxed">{job.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
