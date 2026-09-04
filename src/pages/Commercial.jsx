import React from "react";
import { Link } from "react-router-dom";
import { Shield, FileCheck, Clock, HardHat, ArrowRight, Building2 } from "lucide-react";
import QuoteHero from "../components/QuoteHero";
import PageSEO from "../components/PageSEO";
import Breadcrumbs from "../components/Breadcrumbs";
import GoogleReviews from "../components/GoogleReviews";
import { COMMERCIAL_SERVICES } from "../data/locations";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "../data/schema";

const SITE = "https://gcwindowandpressurecleaning.com.au";

/**
 * /commercial/ — the section index for commercial & strata work.
 *
 * Before this page existed /commercial/ was a 301 to one service hub, and the
 * only links to any commercial page lived inside a hover-only dropdown that
 * was never in the HTML. Search Console showed the result: the whole 574-page
 * section was effectively orphaned. This page is linked from the header, the
 * footer and the 404, and links every commercial hub in turn.
 */
export default function Commercial() {
  const jsonLd = [
    buildLocalBusinessSchema(),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${SITE}/commercial/#page`,
      name: "Commercial & Strata Cleaning Services Gold Coast",
      url: `${SITE}/commercial/`,
      description:
        "Commercial and strata exterior cleaning on the Gold Coast: windows, roofs, pressure cleaning, building softwash, gutters, solar panels and bird proofing for offices, retail, hospitality and body corporate.",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#business` },
      hasPart: COMMERCIAL_SERVICES.map((s) => ({
        "@type": "Service",
        name: s.name,
        url: `${SITE}/commercial/${s.slug}/`,
        description: s.shortDesc,
      })),
    },
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Commercial & Strata", url: "/commercial/" },
    ]),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageSEO
        title="Commercial & Strata Cleaning Gold Coast | All Services"
        description="Commercial and strata exterior cleaning on the Gold Coast: windows, roofs, pressure cleaning, softwash, gutters, solar and bird proofing. $20M insured."
        canonical={`${SITE}/commercial/`}
        jsonLd={jsonLd}
      />

      <Breadcrumbs items={[{ name: "Commercial & Strata", url: "/commercial/" }]} />

      <QuoteHero
        headline={"Commercial & Strata Cleaning on the Gold Coast"}
        subheading={
          "Offices, retail, hospitality, body corporate and strata — every exterior cleaning service under one insured, SWMS-documented contractor."
        }
        backgroundImage={"/images/commercial-window-hero.jpg"}
      />

      {/* Trust strip — same one the commercial hubs use */}
      <section className="py-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <Shield className="w-7 h-7 mx-auto mb-2" />
            <p className="text-sm font-semibold">$20M Public Liability</p>
          </div>
          <div>
            <FileCheck className="w-7 h-7 mx-auto mb-2" />
            <p className="text-sm font-semibold">SWMS &amp; JSA Supplied</p>
          </div>
          <div>
            <Clock className="w-7 h-7 mx-auto mb-2" />
            <p className="text-sm font-semibold">After-Hours &amp; Weekends</p>
          </div>
          <div>
            <HardHat className="w-7 h-7 mx-auto mb-2" />
            <p className="text-sm font-semibold">Police-Checked Technicians</p>
          </div>
        </div>
      </section>

      {/* Service index */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Commercial Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              One contractor for the whole building exterior. Scheduled maintenance programs with a fixed price per
              visit, or one-off works for handovers, tenders and end-of-lease. Certificates of currency and site
              documentation provided on request.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COMMERCIAL_SERVICES.map((service) => (
              <Link
                key={service.slug}
                to={`/commercial/${service.slug}/`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col p-7"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-blue-700 font-medium mb-3">{service.subhead}</p>
                <p className="text-gray-600 text-sm flex-1">{service.shortDesc}</p>
                <span className="mt-5 inline-flex items-center text-blue-600 font-semibold text-sm">
                  View service <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Who We Work With</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-gray-700">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Strata &amp; body corporate</h3>
              <p className="text-sm">
                Detailed quotes, invoices and completion reports written for committees and strata managers. Scheduled
                programs across the whole scheme, with access arranged around residents.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Offices, retail &amp; hospitality</h3>
              <p className="text-sm">
                Early-morning, evening and weekend cleans so trading is never interrupted. Fixed per-visit pricing
                that budgets cleanly.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Property &amp; facilities managers</h3>
              <p className="text-sm">
                One point of contact for every building in a portfolio. Certificates of currency, SWMS and JSA
                documentation supplied for tenders and compliance.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Builders &amp; handovers</h3>
              <p className="text-sm">
                Post-construction glass, render and pavement cleans to bring a new building up to handover standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Quote for a Commercial Property?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Tell us about the building and we&rsquo;ll put together a written quote, with site documentation on
            request.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/instant-quote/"
              className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Request a Quote
            </Link>
            <a
              href="tel:0756512386"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Call (07) 5651 2386
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
