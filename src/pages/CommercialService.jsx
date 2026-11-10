import React, { useEffect } from "react";
import FactIcon from "../components/FactIcon";
import QuoteHero from "../components/QuoteHero";
import { useParams, Link } from "react-router-dom";
import { Shield, Users, Star, Phone, Building2, FileCheck, Clock, HardHat } from "lucide-react";
import { getCommercialServiceBySlug } from "../data/locations";
import Benefits from "../components/Benefits";
import FAQ from "../components/FAQ";
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
          <h1 className="text-4xl font-bold text-ink mb-4">Commercial Service Not Found</h1>
          <p className="text-ink-2 text-lg mb-6">The commercial service you're looking for doesn't exist.</p>
          <Link to="/" className="text-ochre-3 hover:text-ink font-semibold">← Back to home</Link>
        </div>
      </div>
    );
  }

  const heroImage = COMMERCIAL_HERO_IMAGES[serviceSlug] || COMMERCIAL_HERO_IMAGES["window-cleaning"];
  const secondaryImage = COMMERCIAL_SECONDARY_IMAGES[serviceSlug] || COMMERCIAL_SECONDARY_IMAGES["window-cleaning"];

  const seoJsonLd = [
    buildLocalBusinessSchema(),
    buildServiceSchema({
      name: `${service.name}`,
      description: service.shortDesc,
      serviceType: `${service.name}`,
      url: `https://gcwindowandpressurecleaning.com.au/commercial/${service.slug}/`
    }),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Commercial & Strata", url: "/commercial/" },
      { name: service.name, url: `/commercial/${service.slug}/` }
    ])
  ];

  const trustBadges = [
    { icon: <Shield className="w-5 h-5 text-ochre-3" />, label: "$20M Public Liability" },
    { icon: <HardHat className="w-5 h-5 text-ochre-3" />, label: "SWMS & JSA Supplied" },
    { icon: <Users className="w-5 h-5 text-ochre-3" />, label: "Police-Checked Staff" },
    { icon: <FileCheck className="w-5 h-5 text-ochre-3" />, label: "Certificates of Currency" }
  ];

  return (
    <div>
      <PageSEO
        title={`${service.name} Gold Coast`}
        description={`${service.name} on the Gold Coast for offices & strata. $20M public liability, SWMS supplied, after-hours service. Call (07) 5230 8293.`}
        canonical={`https://gcwindowandpressurecleaning.com.au/commercial/${service.slug}/`}
        jsonLd={seoJsonLd}
      />

      {/* Hero */}
      <QuoteHero
        headline={`${service.name} on the Gold Coast`}
        subheading={"Offices, strata & body corporate — $20M public liability, SWMS supplied, after-hours service."}
        backgroundImage={heroImage}
      />

      {/* Commercial Trust Strip */}
      <section className="py-8 bg-ink text-white">
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
      <section className="py-16 bg-paper-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-6">
                Built for Commercial & Strata Operators
              </h2>
              <p className="text-lg text-ink-2 mb-6 leading-relaxed">
                We work with facility managers, building managers, strata committees, retail operators
                and industrial site managers across the Gold Coast. Every job is documented, scheduled
                and delivered to the standards commercial and strata clients expect.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-ochre rounded-full mt-2 flex-shrink-0" />
                  <span className="text-ink-2"><strong>Fixed scheduled pricing</strong> — no surprise invoices, budget with confidence</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-ochre rounded-full mt-2 flex-shrink-0" />
                  <span className="text-ink-2"><strong>Full compliance documentation</strong> — SWMS, JSA, COI supplied on request</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-ochre rounded-full mt-2 flex-shrink-0" />
                  <span className="text-ink-2"><strong>After-hours & weekend crews</strong> — zero disruption to trading or tenants</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-ochre rounded-full mt-2 flex-shrink-0" />
                  <span className="text-ink-2"><strong>Photographic reporting</strong> — every visit documented for your records</span>
                </li>
              </ul>
            </div>
            <div>
              <picture>
                <source srcSet={secondaryImage.endsWith('.webp') ? secondaryImage : secondaryImage.replace('.jpg', '.webp')} type="image/webp" />
                <img src={secondaryImage} alt={service.name} className="rounded-[14px] border-2 border-ink shadow-hard-ochre-sm sm:shadow-hard-ochre w-full h-auto max-h-[28rem] object-contain bg-paper" loading="lazy" decoding="async" width="1024" height="768" />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Roof Cleaning — Why Gold Coast Roofs Need Cleaning More Often */}
      {serviceSlug === 'roof-cleaning' && (
        <section className="py-16 bg-ochre-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Why Gold Coast Commercial Roofs Need Cleaning More Often</h2>
              <p className="text-lg text-ink-2 max-w-2xl">The Gold Coast climate accelerates biological growth and roof degradation compared to drier Australian markets — raising maintenance costs for building owners who delay cleaning.</p>
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
                <div key={i} className="bg-paper-white rounded-[14px] border-2 border-ink p-6">
                  <FactIcon icon={item.icon} className="mb-3" />
                  <h3 className="text-lg font-semibold text-ink mb-2">{item.title}</h3>
                  <p className="text-ink-2 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Roof Cleaning — Roof Type Guide */}
      {serviceSlug === 'roof-cleaning' && (
        <section className="py-16 bg-paper-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Commercial Roof Type Cleaning Guide</h2>
              <p className="text-lg text-ink-2">Different commercial roof profiles require different cleaning methods. Here's what we recommend for each.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl shadow-sm border border-rule">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink text-white">
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
                    <tr key={i} className={i % 2 === 0 ? "bg-paper-white" : "bg-paper"}>
                      <td className="px-6 py-4 font-medium text-ink">{row.type}</td>
                      <td className="px-6 py-4 text-ink-2">{row.method}</td>
                      <td className="px-6 py-4 text-ink-2">{row.freq}</td>
                      <td className="px-6 py-4 text-ink-2">{row.concerns}</td>
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
        <section className="py-16 bg-paper-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Why Gold Coast Commercial Solar Arrays Lose Output Faster</h2>
              <p className="text-lg text-ink-2 max-w-2xl">The Gold Coast's coastal and subtropical environment creates multiple soiling sources that combine to reduce commercial solar output faster than most Australian locations.</p>
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
                <div key={i} className="bg-paper-white rounded-[14px] border-2 border-ink p-6">
                  <FactIcon icon={item.icon} className="mb-3" />
                  <h3 className="text-lg font-semibold text-ink mb-2">{item.title}</h3>
                  <p className="text-ink-2 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Solar Panel Cleaning — Dirty vs Clean Comparison Table */}
      {serviceSlug === 'solar-panel-cleaning' && (
        <section className="py-16 bg-paper-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Dirty vs Clean — What Your Commercial Array Is Losing</h2>
              <p className="text-lg text-ink-2">The real cost of skipping a professional clean on a Gold Coast commercial solar installation.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl shadow-sm border border-rule">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink text-white">
                    <th className="px-6 py-4 text-left font-semibold w-1/3"></th>
                    <th className="px-6 py-4 text-center font-semibold text-brick-300">Dirty Array</th>
                    <th className="px-6 py-4 text-center font-semibold text-ochre">After Professional Clean</th>
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
                    <tr key={i} className={i % 2 === 0 ? "bg-paper-white" : "bg-paper"}>
                      <td className="px-6 py-4 font-semibold text-ink">{row.label}</td>
                      <td className="px-6 py-4 text-center text-brick">{row.dirty}</td>
                      <td className="px-6 py-4 text-center text-moss font-medium">{row.clean}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Our Commercial Process</h2>
            <p className="text-lg text-ink-2 max-w-2xl">
              A proven four-step process designed around the needs of commercial and strata clients.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {service.process.map(step => (
              <div key={step.step} className="bg-paper-white rounded-[14px] border-2 border-ink p-6 text-center">
                <div className="w-12 h-12 bg-ochre-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-ochre-3">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-ink">{step.title}</h3>
                <p className="text-ink-2 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Benefits benefits={service.benefits} title={`Benefits of Professional ${service.name}`} />

      <GoogleReviews />

      {/* FAQs */}
      <FAQ faqs={service.faqs} title={`${service.name} FAQs`} subtitle="Common questions from commercial and strata clients" />

      {/* Suburb links */}
      <SuburbLinks serviceSlug={service.slug} serviceName={service.name} basePath="/commercial" />

      {/* Quote form */}
      <QuoteForm serviceName={service.name} />

      {/* CTA Footer */}
      <section className="py-16 bg-ink text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get a Fixed-Price Commercial Quote
          </h2>
          <p className="text-xl text-paper-2 mb-8">
            Talk to the Gold Coast's commercial and strata cleaning specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote" className="btn btn-lg btn-primary">
              Request Quote
            </a>
            <a href="tel:0752308293"
              className="btn btn-lg btn-outline-on-ink">
              <Phone className="w-5 h-5 mr-2" />
              (07) 5230 8293
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
