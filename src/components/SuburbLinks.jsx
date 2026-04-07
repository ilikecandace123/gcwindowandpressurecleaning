import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

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

export default function SuburbLinks({ serviceSlug, serviceName, basePath = "" }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">{serviceName} Near You</h2>
          </div>
          <p className="text-gray-600">We provide professional {serviceName.toLowerCase()} across the Gold Coast and Northern NSW</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {FEATURED_SUBURBS.map(suburb => (
            <Link
              key={suburb.slug}
              to={`${basePath}/${serviceSlug}/${suburb.slug}`}
              className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700">{serviceName} in {suburb.name}</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/service-areas"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            View all service areas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
