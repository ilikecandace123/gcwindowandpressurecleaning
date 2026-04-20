import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Shield, Users, Star, Phone, Building2, FileCheck, Clock, HardHat } from "lucide-react";
import { getCommercialServiceBySlug } from "../data/locations";
import Benefits from "../components/Benefits";
import QuoteForm from "../components/QuoteForm";
import PageSEO from "../components/PageSEO";
import GoogleReviews from "../components/GoogleReviews";
import { buildLocalBusinessSchema, buildServiceSchema, buildBreadcrumbSchema } from "../data/schema";
import SuburbLinks from "../components/SuburbLinks";

// Commercial hero and secondary image mapping — reuses residential image library
const COMMERCIAL_HERO_IMAGES = {
  "window-cleaning": "/images/commercial-window-hero.jpg",
  "roof-cleaning": "/images/commercial-roof-hero.webp",
  "house-softwash": "/images/commercial-softwash-hero.webp",
  "pressure-cleaning": "/images/commercial-pressure-hero.jpg",
  "gutter-cleaning": "/images/commercial-gutter-hero.jpg",
  "solar-panel-cleaning": "/images/solar-panel-hero.jpg",
  "bird-proofing": "/images/bird-proofing-hero.jpg"
};

const COMMERCIAL_SECONDARY_IMAGES = {
  "window-cleaning": "/images/window.jpg",
  "roof-cleaning": "/images/roof-cleaning-1.jpg",
  "house-softwash": "/images/commercial-softwash-secondary.jpg",
  "pressure-cleaning": "/images/commercial-pressure-secondary.jpg",
  "gutter-cleaning": "/images/gutter-screenshot.jpg",
  "solar-panel-cleaning": "/images/solar-panel-dirty-vs-clean.webp",
  "bird-proofing": "/images/bird-proofing-secondary.jpg"
};

export default function CommercialService() {
  const { serviceSlug } = useParams();
  const service = getCommercialServiceBySlug(serviceSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Commercial Service Not Found</h1>
          <p className="text-gray-600 text-lg mb-6">The commercial service you're looking for doesn't exist.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold">← Back to home</Link>
        </div>
      </div>
    );
  }

  const heroImage = COMMERCIAL_HERO_IMAGES[serviceSlug] || COMMERCIAL_HERO_IMAGES["window-cleaning"];
  const secondaryImage = COMMERCIAL_SECONDARY_IMAGES[serviceSlug] || COMMERCIAL_SECONDARY_IMAGES["window-cleaning"];

  const seoJsonLd = [
    buildLocalBusinessSchema(),
    buildServiceSchema({
      name: `Commercial ${service.name}`,
      description: service.shortDesc,
      serviceType: `Commercial ${service.name}`,
      url: `https://gcwindowandpressurecleaning.com.au/commercial/${service.slug}`
    }),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Commercial & Strata", url: "/commercial" },
      { name: service.name, url: `/commercial/${service.slug}` }
    ])
  ];

  const trustBadges = [
    { icon: <Shield className="w-5 h-5 text-blue-600" />, label: "$20M Public Liability" },
    { icon: <HardHat className="w-5 h-5 text-blue-600" />, label: "SWMS & JSA Supplied" },
    { icon: <Users className="w-5 h-5 text-blue-600" />, label: "Police-Checked Staff" },
    { icon: <FileCheck className="w-5 h-5 text-blue-600" />, label: "Certificates of Currency" }
  ];

  return (
    <div>
      <PageSEO
        title={`${service.name} Gold Coast | Commercial & Strata Specialists`}
        description={`${service.shortDesc}. Fully insured with $20M public liability, SWMS supplied, after-hours scheduling. Call (07) 5651 2386.`}
        canonical={`https://gcwindowandpressurecleaning.com.au/commercial/${service.slug}/`}
        jsonLd={seoJsonLd}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Text column */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <Building2 className="w-4 h-4 mr-2" />
                Commercial & Strata Specialists
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 text-gray-900">
                {service.hero}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-6 text-blue-700 font-medium">{service.subhead}</p>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                {trustBadges.map((b, i) => (
                  <div key={i} className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs sm:text-sm shadow-sm">
                    {b.icon}
                    <span className="ml-2 text-gray-800 font-medium">{b.label}</span>
                  </div>
                ))}
              </div>

              <p className="text-base lg:text-lg mb-6 text-gray-700 leading-relaxed">
                {service.intro}
              </p>

              <div className="flex items-center mb-6">
                <div className="flex items-center text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-gray-800 font-medium">5.0 Stars</span>
                <span className="text-gray-600 ml-2">• 2500+ Happy Customers</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b" target="_blank" rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg text-center transition-all transform hover:scale-105 shadow-lg">
                  Request Commercial Quote
                </a>
                <a href="tel:0756512386"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (07) 5651 2386
                </a>
              </div>
            </div>

            {/* Image column */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
                <picture>
                  <source srcSet={heroImage.endsWith('.webp') ? heroImage : heroImage.replace('.jpg', '.webp')} type="image/webp" />
                  <img
                    src={heroImage}
                    alt={service.name}
                    className="w-full h-auto block" loading="eager" decoding="async" fetchPriority="high" width="1024" height="768" />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Trust Strip */}
      <section className="py-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <Shield className="w-7 h-7 mx-auto mb-2" />
            <p className="text-sm font-semibold">$20M Public Liability</p>
          </div>
          <div>
            <FileCheck className="w-7 h-7 mx-auto mb-2" />
            <p className="text-sm font-semibold">Site-Specific SWMS</p>
          </div>
          <div>
            <Clock className="w-7 h-7 mx-auto mb-2" />
            <p className="text-sm font-semibold">After-Hours Service</p>
          </div>
          <div>
            <Building2 className="w-7 h-7 mx-auto mb-2" />
            <p className="text-sm font-semibold">Strata Specialists</p>
          </div>
        </div>
      </section>

      {/* Two-column intro + image */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built for Commercial & Strata Operators
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We work with facility managers, building managers, strata committees, retail operators
                and industrial site managers across the Gold Coast. Every job is documented, scheduled
                and delivered to the standards commercial and strata clients expect.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Fixed scheduled pricing</strong> — no surprise invoices, budget with confidence</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Full compliance documentation</strong> — SWMS, JSA, COI supplied on request</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700"><strong>After-hours & weekend crews</strong> — zero disruption to trading or tenants</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Photographic reporting</strong> — every visit documented for your records</span>
                </li>
              </ul>
            </div>
            <div>
              <picture>
                <source srcSet={secondaryImage.endsWith('.webp') ? secondaryImage : secondaryImage.replace('.jpg', '.webp')} type="image/webp" />
                <img src={secondaryImage} alt={service.name} className="rounded-2xl shadow-lg w-full h-auto max-h-[28rem] object-contain bg-gray-50" loading="lazy" decoding="async" width="1024" height="768" />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Roof Cleaning — Why Gold Coast Roofs Need Cleaning More Often */}
      {serviceSlug === 'roof-cleaning' && (
        <section className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Gold Coast Commercial Roofs Need Cleaning More Often</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">The Gold Coast climate accelerates biological growth and roof degradation compared to drier Australian markets — raising maintenance costs for building owners who delay cleaning.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "💧", title: "Year-Round Humidity", desc: "Average 65–80% relative humidity year-round accelerates moss and lichen growth on commercial roofs faster than almost any other major Australian city." },
                { icon: "🌊", title: "Coastal Salt Aerosol", desc: "Salt from the Coral Sea is carried up to 10km inland, leaving mineral deposits that trigger paint degradation and corrosion on Colorbond, Kliplok, and metal deck profiles." },
                { icon: "⛈️", title: "Summer Storm Season", desc: "The Nov–Apr wet season deposits leaves, organic matter, and debris on commercial roofs that trap moisture and accelerate biological growth between maintenance visits." },
                { icon: "☀️", title: "Intense UV Exposure", desc: "High UV intensity causes thermal expansion cracking in tiles and coatings, creating micro-crevices where moss and lichen spores establish and spread across the roof." },
                { icon: "🌧️", title: "High Annual Rainfall", desc: "Over 1,400mm of annual rainfall keeps commercial roof surfaces wetter for longer than inland Queensland, dramatically accelerating algae and lichen growth cycles." },
                { icon: "🌿", title: "Surrounding Vegetation", desc: "Hinterland eucalyptus, paperbarks, and coastal vegetation deposit pollen, seeds, and debris that feed biological growth on commercial and strata roof surfaces." }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Roof Cleaning — Roof Type Guide */}
      {serviceSlug === 'roof-cleaning' && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Commercial Roof Type Cleaning Guide</h2>
              <p className="text-lg text-gray-600">Different commercial roof profiles require different cleaning methods. Here's what we recommend for each.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Roof Type</th>
                    <th className="px-6 py-4 text-left font-semibold">Recommended Method</th>
                    <th className="px-6 py-4 text-left font-semibold">Frequency</th>
                    <th className="px-6 py-4 text-left font-semibold">Key Concerns</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Concrete / Terracotta Tile", method: "Soft wash + low-pressure rinse", freq: "Every 2–3 years", concerns: "Moss, lichen, paint fade" },
                    { type: "Metal (Colorbond, Zincalume)", method: "Low-pressure soft wash", freq: "Every 2–3 years", concerns: "Rust stains, sealant integrity" },
                    { type: "Flat Membrane / TPO", method: "Gentle hand wash", freq: "Annually", concerns: "Debris blockage, UV degradation" }
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 font-medium text-gray-900">{row.type}</td>
                      <td className="px-6 py-4 text-gray-700">{row.method}</td>
                      <td className="px-6 py-4 text-gray-700">{row.freq}</td>
                      <td className="px-6 py-4 text-gray-600">{row.concerns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Solar Panel Cleaning — Why Gold Coast Solar Panels Get Dirty Faster */}
      {serviceSlug === 'solar-panel-cleaning' && (
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Gold Coast Commercial Solar Arrays Lose Output Faster</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">The Gold Coast's coastal and subtropical environment creates multiple soiling sources that combine to reduce commercial solar output faster than most Australian locations.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "🌊", title: "Ocean Salt Aerosol", desc: "Salt particles from the Coral Sea settle on panel glass within days of a clean for coastal commercial sites, leaving mineral deposits that scatter and absorb sunlight." },
                { icon: "🦅", title: "Heavy Bird Activity", desc: "Coastal ibis, cormorants, cockatoos, and mynas deposit acidic droppings that create hotspots on commercial arrays, causing cell damage and generation loss." },
                { icon: "💧", title: "Subtropical Humidity", desc: "High year-round humidity traps dust and pollen on panel surfaces and promotes algae growth — a problem far less common in drier Australian commercial markets." },
                { icon: "🌸", title: "Hinterland Pollen", desc: "Native species in the hinterland shed heavy pollen loads during spring and summer that coat commercial solar arrays in a yellow-brown film." },
                { icon: "🚗", title: "Industrial & Traffic Pollution", desc: "Fine rubber and bitumen particles from the M1 corridor and nearby industrial areas build up as a dark greasy film on commercial solar panels." },
                { icon: "☀️", title: "Intense UV Bonding", desc: "Gold Coast's high UV intensity accelerates the bonding of organic matter to panel glass on commercial rooftops, requiring professional-grade techniques to remove safely." }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Solar Panel Cleaning — Dirty vs Clean Comparison Table */}
      {serviceSlug === 'solar-panel-cleaning' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dirty vs Clean — What Your Commercial Array Is Losing</h2>
              <p className="text-lg text-gray-600">The real cost of skipping a professional clean on a Gold Coast commercial solar installation.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-6 py-4 text-left font-semibold w-1/3"></th>
                    <th className="px-6 py-4 text-center font-semibold text-red-300">Dirty Array</th>
                    <th className="px-6 py-4 text-center font-semibold text-green-300">After Professional Clean</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Generation output", dirty: "Up to 30% below rated output", clean: "Restored to rated output" },
                    { label: "Annual revenue impact", dirty: "$3,000+/year lost on 100kW system", clean: "Revenue fully restored" },
                    { label: "Hotspot risk", dirty: "High — bird droppings cause cell damage", clean: "Eliminated" },
                    { label: "Panel warranty status", dirty: "Potentially voided by soiling damage", clean: "Maintained" },
                    { label: "Array lifespan", dirty: "Shortened by UV-bonded deposits", clean: "Protected" }
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 font-semibold text-gray-900">{row.label}</td>
                      <td className="px-6 py-4 text-center text-red-700">{row.dirty}</td>
                      <td className="px-6 py-4 text-center text-green-700 font-medium">{row.clean}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Commercial Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven four-step process designed around the needs of commercial and strata clients.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {service.process.map(step => (
              <div key={step.step} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Benefits benefits={service.benefits} title={`Benefits of Professional ${service.name}`} />

      <GoogleReviews />

      {/* Quote form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{service.name} FAQs</h2>
            <p className="text-gray-600">Common questions from commercial and strata clients</p>
          </div>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <details key={i} className="bg-gray-50 rounded-xl border border-gray-100 group">
                <summary className="px-6 py-4 font-semibold text-gray-900 text-lg cursor-pointer list-none flex justify-between items-center">
                  <span>{faq.question}</span>
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Suburb links */}
      <SuburbLinks serviceSlug={service.slug} serviceName={service.name} basePath="/commercial" />

      {/* Quote form */}
      <QuoteForm serviceName={service.name} />

      {/* CTA Footer */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get a Fixed-Price Commercial Quote
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Talk to the Gold Coast's commercial and strata cleaning specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b" target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all">
              Request Quote
            </a>
            <a href="tel:0756512386"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              (07) 5651 2386
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
