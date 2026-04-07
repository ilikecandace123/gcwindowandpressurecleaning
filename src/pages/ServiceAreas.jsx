import React, { useEffect } from "react";
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
    label: "Central & Inland",
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
    label: "Northern NSW & Tweed",
    description: "We proudly service across the border — from Tweed Heads to Kingscliff and beyond."
  }
};

const REGION_ORDER = ["south_coast", "central_coast", "central", "hinterland", "northern", "nsw_tweed"];

export default function ServiceAreas() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageSEO
        title="Service Areas | Gold Coast Window and Pressure Cleaning"
        description="We service all Gold Coast suburbs and Northern NSW. Find professional window cleaning, pressure cleaning, roof cleaning and more in your suburb. Call (07) 5651 2386."
        canonical="https://gcwindowandpressurecleaning.com.au/service-areas"
        jsonLd={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Service Areas", url: "/service-areas" }
          ])
        ]}
      />
      {/* Hero */}
      <section className="relative hero-gradient text-white py-16 md:py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Fully Insured
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Police Checked Staff
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Service Areas</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
            Professional exterior cleaning across {SUBURBS.length} suburbs on the Gold Coast and Northern NSW
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://tinyurl.com/jimscleaning"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
            >
              Get Free Quote
            </a>
            <a
              href="tel:0756512386"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              (07) 5651 2386
            </a>
          </div>
        </div>
      </section>

      {/* Quick-jump service selector */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 mb-4 font-medium">Browse by service:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {SERVICES.map(service => (
              <Link
                key={service.slug}
                to={`/${service.parentPage}`}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
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
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">{info.label}</h2>
                  </div>
                  <p className="text-gray-600">{info.description}</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {suburbs.map(suburb => (
                    <div
                      key={suburb.slug}
                      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{suburb.name}</h3>
                          <span className="text-sm text-gray-500">Postcode {suburb.postcode}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {SERVICES.slice(0, 4).map(service => (
                          <Link
                            key={service.slug}
                            to={`/${service.slug}/${suburb.slug}`}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {SERVICES.slice(4).map(service => (
                          <Link
                            key={service.slug}
                            to={`/${service.slug}/${suburb.slug}`}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors"
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
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't See Your Suburb?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We cover the entire Gold Coast region and Northern NSW. Get in touch for a free quote — we'll come to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://tinyurl.com/jimscleaning"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
            >
              Get Free Quote
            </a>
            <a
              href="tel:0756512386"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              (07) 5651 2386
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
