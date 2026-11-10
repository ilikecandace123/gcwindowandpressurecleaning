import React, { useEffect } from "react";
import QuoteHero from "../components/QuoteHero";
import { Link } from "react-router-dom";
import { MapPin, Phone, ArrowRight, Shield, Users } from "lucide-react";
import { SUBURBS, SERVICES, getSuburbsByRegion } from "../data/locations";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "../data/schema";

const REGION_INFO = {
  south_coast: {
    label: "Southern Gold Coast",
    description: "Beachside suburbs from Coolangatta to Tallebudgera — salt air and coastal weather demand regular professional cleaning."
  },
  central_coast: {
    label: "Central Coast",
    description: "The heart of the Gold Coast from Burleigh to Broadbeach — busy tourist hubs with high-rise living and ocean exposure."
  },
  central: {
    label: "Central and Inland",
    description: "Growing suburban communities from Robina to Southport — family homes and commercial properties benefiting from regular maintenance."
  },
  hinterland: {
    label: "Gold Coast Hinterland",
    description: "Rainforest surrounds, tree coverage, and natural debris — our hinterland specialists handle the unique challenges of elevated properties."
  },
  northern: {
    label: "Northern Gold Coast",
    description: "Rapidly growing corridor from Helensvale to Ormeau — modern developments and established homes needing expert exterior care."
  },
  nsw_tweed: {
    label: "Northern NSW and Tweed",
    description: "We proudly service across the border — from Tweed Heads to Kingscliff and beyond."
  }
};

const REGION_ORDER = ["south_coast", "central_coast", "central", "hinterland", "northern", "nsw_tweed"];

export default function ServiceAreas() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <PageSEO
        title="Service Areas | Gold Coast Window and Pressure Cleaning"
        description="We service all Gold Coast suburbs and Northern NSW — window, pressure, roof, gutter and solar cleaning in your suburb. Call (07) 5230 8293 for a quote."
        canonical="https://gcwindowandpressurecleaning.com.au/service-areas/"
        jsonLd={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Service Areas", url: "/service-areas/" }
          ])
        ]}
      />
      {/* Hero */}
      <QuoteHero
        headline={'Our Service Areas'}
        subheading={'Servicing all 81 Gold Coast suburbs and Northern NSW.'}
        backgroundImage={'/images/services-banner.jpg'}
      />

      {/* Quick-jump service selector */}
      <section className="py-8 bg-paper-white border-b border-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-ink-2 mb-4 font-medium">Browse by service:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {SERVICES.map(service => (
              <Link
                key={service.slug}
                to={`/${service.slug}/`}
                className="px-4 py-2 bg-paper-2 text-ink rounded-full text-sm font-medium hover:bg-ochre-100 transition-colors"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Suburb listings by region */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {REGION_ORDER.map(regionKey => {
            const info = REGION_INFO[regionKey];
            const suburbs = getSuburbsByRegion(regionKey);
            if (!suburbs || suburbs.length === 0) return null;

            return (
              <div key={regionKey} className="mb-12">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-ochre-3" />
                    <h2 className="text-2xl font-bold text-ink">{info.label}</h2>
                  </div>
                  <p className="text-ink-2">{info.description}</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {suburbs.map(suburb => (
                    <div
                      key={suburb.slug}
                      className="bg-paper-white rounded-[14px] border-2 border-ink p-5 hover:shadow-hard-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-ink text-lg">{suburb.name}</h3>
                          <span className="text-sm text-ink-3">Postcode {suburb.postcode}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {SERVICES.slice(0, 4).map(service => (
                          <Link
                            key={service.slug}
                            to={`/${service.slug}/${suburb.slug}/`}
                            className="text-xs px-2 py-1 bg-paper-2 text-ink-2 rounded hover:bg-paper-2 hover:text-ink transition-colors"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {SERVICES.slice(4).map(service => (
                          <Link
                            key={service.slug}
                            to={`/${service.slug}/${suburb.slug}/`}
                            className="text-xs px-2 py-1 bg-paper-2 text-ink-2 rounded hover:bg-paper-2 hover:text-ink transition-colors"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ink text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't See Your Suburb?
          </h2>
          <p className="text-xl text-paper-2 mb-8">
            We cover the entire Gold Coast region and Northern NSW. Get in touch for a free quote — we'll come to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote" className="btn btn-lg btn-primary">
              Get Free Quote
            </a>
            <a
              href="tel:0752308293"
              className="btn btn-lg btn-outline-on-ink"
            >
              <Phone className="w-5 h-5 mr-2" />
              (07) 5230 8293
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
