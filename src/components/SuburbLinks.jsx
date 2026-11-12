import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { SUBURBS } from "../data/locations";

// Top suburbs to feature on service pages — spread across regions for good coverage
const FEATURED_SUBURBS = [
  { name: "Surfers Paradise", slug: "surfers-paradise" },
  { name: "Burleigh Heads", slug: "burleigh-heads" },
  { name: "Broadbeach", slug: "broadbeach" },
  { name: "Southport", slug: "southport" },
  { name: "Robina", slug: "robina" },
  { name: "Palm Beach", slug: "palm-beach" },
  { name: "Coolangatta", slug: "coolangatta" },
  { name: "Coomera", slug: "coomera" },
  { name: "Helensvale", slug: "helensvale" },
  { name: "Mermaid Beach", slug: "mermaid-beach" },
  { name: "Nerang", slug: "nerang" },
  { name: "Tweed Heads", slug: "tweed-heads" },
];

// showAll=true lists every suburb (used on the Window Cleaning Plans hub so
// all 81 suburb plan pages are reachable by clicking around, not just via SEO).
export default function SuburbLinks({ serviceSlug, serviceName, basePath = "", showAll = false }) {
  const suburbs = showAll ? SUBURBS : FEATURED_SUBURBS;
  return (
    <section className="py-16 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow eyebrow-plain mb-3">
            <MapPin className="w-4 h-4" /> Local to you
          </p>
          <h2 className="text-3xl md:text-[38px] md:leading-[1.1] font-bold text-ink mb-3">{serviceName} Near You</h2>
          <p className="text-ink-2 text-lg">We provide professional {serviceName.toLowerCase().replace(/^dva /, "DVA ")} across the Gold Coast and Northern NSW</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {suburbs.map(suburb => (
            <Link
              key={suburb.slug}
              to={`${basePath}/${serviceSlug}/${suburb.slug}/`}
              className="flex items-center justify-between p-3.5 bg-paper-white rounded-lg border border-ink/25 hover:border-ink hover:bg-paper-2 transition-colors group"
            >
              <span className="text-sm font-medium text-ink group-hover:text-ink">{serviceName} in {suburb.name}</span>
              <ArrowRight className="w-4 h-4 text-ink-3 group-hover:text-accent-3 flex-shrink-0" />
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/service-areas/"
            className="link inline-flex items-center gap-2"
          >
            View all service areas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
