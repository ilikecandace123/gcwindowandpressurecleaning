import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import PageSEO from "../components/PageSEO";
import Breadcrumbs from "../components/Breadcrumbs";
import QuoteCTA from "../components/QuoteCTA";
import { GUIDES } from "../data/guides";
import {
  SITE_URL,
  buildLocalBusinessSchema,
  buildBreadcrumbSchema
} from "../data/schema";

export default function Guides() {
  const jsonLd = [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Expert Guides", url: "/guides" }
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Exterior Cleaning Expert Guides — Gold Coast",
      "url": `${SITE_URL}/guides/`,
      "description":
        "Straight answers to the questions Gold Coast homeowners actually ask about window, pressure, roof, gutter and solar panel cleaning.",
      "hasPart": GUIDES.map((g) => ({
        "@type": "Article",
        "headline": g.h1,
        "url": `${SITE_URL}/guides/${g.slug}/`
      }))
    }
  ];

  return (
    <>
      <PageSEO
        title="Exterior Cleaning Guides & Advice | Gold Coast Experts"
        description="Straight answers from working Gold Coast cleaners — window, roof, gutter, pressure and solar panel cleaning questions answered with real local prices."
        canonical={`${SITE_URL}/guides/`}
        jsonLd={jsonLd}
      />
      <Breadcrumbs items={[{ name: "Expert Guides", url: "/guides/" }]} />

      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Expert Cleaning Guides for Gold Coast Homes
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Straight answers to the questions our customers actually ask — written from
              the roofs, driveways and windows we clean every day across the Gold Coast,
              with real local prices and no sales fluff.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {GUIDES.map((g) => (
              <Link
                key={g.slug}
                to={`/guides/${g.slug}/`}
                className="group bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-2xl p-6 transition-colors flex flex-col"
              >
                <BookOpen className="w-7 h-7 text-blue-600 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 mb-3">
                  {g.h1}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4 flex-1">
                  {g.directAnswer.split(". ").slice(0, 2).join(". ") + "."}
                </p>
                <span className="inline-flex items-center font-semibold text-blue-600">
                  Read the full guide
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
