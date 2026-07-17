import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, CalendarDays, ShieldCheck } from "lucide-react";
import PageSEO from "../components/PageSEO";
import Breadcrumbs from "../components/Breadcrumbs";
import FAQ from "../components/FAQ";
import QuoteCTA from "../components/QuoteCTA";
import NotFound from "./NotFound";
import { getGuide } from "../data/guides";
import {
  SITE_URL,
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildArticleSchema
} from "../data/schema";

function formatUpdated(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}

export default function GuideArticle() {
  const { slug } = useParams();
  const guide = getGuide(slug);

  if (!guide) return <NotFound />;

  const url = `${SITE_URL}/guides/${guide.slug}/`;
  const jsonLd = [
    buildLocalBusinessSchema(),
    buildArticleSchema({
      title: guide.h1,
      description: guide.metaDescription,
      url,
      datePublished: guide.updated,
      dateModified: guide.updated
    }),
    buildFAQSchema(guide.faqs),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Expert Guides", url: "/guides" },
      { name: guide.h1, url: `/guides/${guide.slug}` }
    ])
  ];

  return (
    <>
      <PageSEO
        title={guide.metaTitle}
        description={guide.metaDescription}
        canonical={url}
        jsonLd={jsonLd}
      />
      <Breadcrumbs
        items={[
          { name: "Expert Guides", url: "/guides/" },
          { name: guide.h1, url: `/guides/${guide.slug}/` }
        ]}
      />

      <article className="bg-white">
        {/* Header + direct answer */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{guide.h1}</h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-8">
            <span className="inline-flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-green-600" />
              By Gold Coast Window and Pressure Cleaning
            </span>
            <span className="inline-flex items-center">
              <CalendarDays className="w-4 h-4 mr-1.5 text-blue-600" />
              Updated {formatUpdated(guide.updated)}
            </span>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">
              Quick answer
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">{guide.directAnswer}</p>
          </div>
        </header>

        {/* Sections */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          {guide.sections.map((section, i) => (
            <section key={i} className="pt-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                {section.heading}
              </h2>
              {section.paragraphs &&
                section.paragraphs.map((p, j) => (
                  <p key={j} className="text-lg text-gray-600 leading-relaxed mb-5">
                    {p}
                  </p>
                ))}
              {section.list && (
                <ul className="space-y-3 mb-5">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-lg text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* FAQs (also emitted as FAQPage schema) */}
        <FAQ faqs={guide.faqs} title="Related Questions" />

        {/* Related links */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Keep Reading</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {guide.related.map((r, i) => (
                <Link
                  key={i}
                  to={r.href}
                  className="group flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-xl px-5 py-4 transition-colors"
                >
                  <span className="font-medium text-gray-800 group-hover:text-blue-700">
                    {r.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 ml-3" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <QuoteCTA />
    </>
  );
}
