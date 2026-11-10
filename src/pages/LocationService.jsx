import React, { useEffect } from "react";
import FactIcon from "../components/FactIcon";
import QuoteHero from "../components/QuoteHero";
import { useParams, Link } from "react-router-dom";
import { Shield, Users, Star, Phone, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { getSuburbBySlug, getServiceBySlug, SUBURBS, SERVICES } from "../data/locations";
import Benefits from "../components/Benefits";
import FAQ from "../components/FAQ";
import QuoteForm from "../components/QuoteForm";
import PageSEO from "../components/PageSEO";
import GoogleReviews from "../components/GoogleReviews";
import { buildLocalBusinessSchema, buildServiceSchema, buildBreadcrumbSchema, buildFAQSchema } from "../data/schema";
import WellnessPlanSection from "../components/WellnessPlanSection";
import RecentJobs from "../components/RecentJobs";

const SERVICE_SECONDARY_IMAGES = {
  "window-cleaning": {
    src: "/images/window-hero.jpg",
    alt: "Window cleaning results on Gold Coast home"
  },
  "roof-cleaning": {
    src: "/images/roof-cleaning-1.jpg",
    alt: "Professional roof cleaning on Gold Coast property"
  },
  "house-softwash": {
    src: "/images/commercial-softwash-secondary.jpg",
    alt: "House softwash cleaning removing mould and grime"
  },
  "pressure-cleaning": {
    src: "/images/pressure-1.jpg",
    alt: "Pressure cleaning on concrete driveway"
  },
  "gutter-cleaning": {
    src: "/images/gutter-1.jpg",
    alt: "Gutter cleaning removing leaves and debris"
  },
  "solar-panel-cleaning": {
    src: "/images/solar-panel-dirty-vs-clean.webp",
    alt: "Solar panel cleaning dirty vs clean comparison"
  },
  "bird-proofing": {
    src: "/images/bird-proofing-secondary.jpg",
    alt: "Professional bird proofing mesh around rooftop solar panels"
  }
};

const SERVICE_HERO_IMAGES = {
  "window-cleaning": {
    src: "/images/window.jpg",
    alt: "Professional window cleaning"
  },
  "roof-cleaning": {
    src: "/images/roof-hero.jpg",
    alt: "Professional roof cleaning removing moss and algae"
  },
  "house-softwash": {
    src: "/images/softwash-secondary.jpg",
    alt: "Before and after: a rendered two-storey house softwashed clean of mould and grime"
  },
  "pressure-cleaning": {
    src: "/images/pressure-hero.jpg",
    alt: "Professional pressure cleaning on concrete driveway"
  },
  "gutter-cleaning": {
    src: "/images/gutter-1.jpg",
    alt: "Before and after: a gutter packed with leaves, then cleared and flowing"
  },
  "solar-panel-cleaning": {
    src: "/images/solar-panel-hero.jpg",
    alt: "Professional solar panel cleaning on residential roof"
  },
  "bird-proofing": {
    src: "/images/bird-proofing-hero.jpg",
    alt: "Bird proofing mesh preventing pigeons from nesting on roof"
  }
};

export default function LocationService() {
  const { service: serviceSlug, suburb: suburbSlug } = useParams();

  const suburb = getSuburbBySlug(suburbSlug);
  const service = getServiceBySlug(serviceSlug);
  const heroImage = SERVICE_HERO_IMAGES[serviceSlug] || SERVICE_HERO_IMAGES["window-cleaning"];
  const secondaryImage = SERVICE_SECONDARY_IMAGES[serviceSlug] || SERVICE_SECONDARY_IMAGES["window-cleaning"];

  useEffect(() => { window.scrollTo(0, 0); }, [serviceSlug, suburbSlug]);

  if (!suburb || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ink mb-4">Page Not Found</h1>
          <p className="text-ink-2 text-lg">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Generate location-aware intro.
  // Prefers per-suburb unique fields (propertyMix / environmentalNote / localHook)
  // — falls back to generic regional copy only when those fields are absent.
  const getLocationSpecificIntro = () => {
    const baseIntro = `Professional ${service.name.toLowerCase()} in ${suburb.name}. `;

    // Per-suburb unique content (added to break cross-page duplicate patterns
    // that were causing Google to mark 948 location pages as "discovered but
    // not indexed"). Each block is hand-written and verifiably distinct.
    if (suburb.propertyMix && suburb.environmentalNote && suburb.localHook) {
      return (
        baseIntro +
        suburb.propertyMix + " " +
        suburb.environmentalNote + " " +
        suburb.localHook
      );
    }

    // ── Fallback: generic regional boilerplate (only hit if a suburb is
    // missing the unique fields above).
    let regionalContext = "";
    if (suburb.region === "south_coast") {
      regionalContext = `${suburb.name} is a beautiful coastal suburb with pristine beaches and strong salt air exposure. The combination of humid subtropical weather, salt spray from the ocean, and frequent beachgoer traffic means properties here require more frequent professional cleaning maintenance. `;
    } else if (suburb.region === "central_coast") {
      regionalContext = `${suburb.name} is a vibrant waterfront community with high-rise living and holiday culture. The coastal environment with salt air exposure and busy urban activity creates unique cleaning challenges. `;
    } else if (suburb.region === "central") {
      regionalContext = `${suburb.name} is a modern suburban hub with family homes and local businesses. The expanding urban environment and regular dust from development and traffic means consistent professional cleaning helps maintain property value. `;
    } else if (suburb.region === "hinterland") {
      regionalContext = `${suburb.name} sits in the beautiful Gold Coast hinterland with rainforest surroundings and natural charm. Tree coverage, fallen leaves, pollen, and natural debris accumulation are significant factors, making regular professional cleaning essential for property maintenance. `;
    } else if (suburb.region === "northern") {
      regionalContext = `${suburb.name} is in the growing northern Gold Coast corridor with a mix of modern developments and rural properties. The developing infrastructure and varied property types mean professional cleaning services are essential for maintaining curb appeal. `;
    } else if (suburb.region === "nsw_tweed") {
      regionalContext = `${suburb.name} is a charming NSW community just south of the Queensland border in the Northern Rivers region. Our Gold Coast team proudly services across the border into NSW, delivering the same professional standards for Northern Rivers residents. The coastal and hinterland environment here requires regular professional maintenance. `;
    }

    const landmarkRef = suburb.landmarks && suburb.landmarks.length > 0
      ? `Near ${suburb.landmarks[0]}, ${suburb.name} residents trust us for professional cleaning services. `
      : ``;

    return baseIntro + regionalContext + landmarkRef +
      `Whether you're a long-time resident or new to the area, our team understands the specific cleaning challenges your location presents and delivers results that keep your property looking its best.`;
  };

  // Localised "why choose us" points.
  // The first point uses the per-suburb environmentalNote so that each location
  // page has a genuinely different bullet — keeps this section from being
  // copy-paste across 82 suburbs.
  const getLocalizedWhyChooseUs = () => {
    const localExpertiseDescription = suburb.environmentalNote
      ? `Local knowledge of ${suburb.name}: ${suburb.environmentalNote}`
      : `We understand ${suburb.name}'s unique environment and what it takes to keep properties clean in this area.`;

    const basePoints = [
      {
        icon: <CheckCircle className="w-6 h-6 text-moss" />,
        title: "Local Expertise",
        description: localExpertiseDescription
      },
      {
        icon: <CheckCircle className="w-6 h-6 text-moss" />,
        title: "Prompt Local Service",
        description: `Based on the Gold Coast, we can respond quickly to service requests from ${suburb.name} and surrounding areas.`
      },
      {
        icon: <CheckCircle className="w-6 h-6 text-moss" />,
        title: "Professional Results",
        description: `Every ${service.name.toLowerCase()} job in ${suburb.name} is performed to our highest standards with fully trained staff.`
      }
    ];

    // Add region-specific point (runs in addition to the per-suburb copy above).
    if (suburb.region === "south_coast" || suburb.region === "central_coast") {
      basePoints.push({
        icon: <CheckCircle className="w-6 h-6 text-moss" />,
        title: "Salt Air Expertise",
        description: `We specialise in coastal cleaning, understanding the impact of salt spray on properties in ${suburb.name}.`
      });
    } else if (suburb.region === "hinterland") {
      basePoints.push({
        icon: <CheckCircle className="w-6 h-6 text-moss" />,
        title: "Tree & Debris Specialists",
        description: `Expert at managing tree coverage, fallen leaves, and natural debris common to ${suburb.name} hinterland properties.`
      });
    }

    return basePoints;
  };


  // Structured data: LocalBusiness + Service + Breadcrumb
  const localBusinessSchema = buildLocalBusinessSchema();
  const serviceSchema = buildServiceSchema({
    name: `${service.name} in ${suburb.name}`,
    description: `Professional ${service.name.toLowerCase()} in ${suburb.name}, postcode ${suburb.postcode}. Fully insured, police-checked staff.`,
    image: heroImage.src,
    serviceType: service.name,
    areaName: suburb.name,
    url: `https://gcwindowandpressurecleaning.com.au/${serviceSlug}/${suburbSlug}/`
  });
  const breadcrumbData = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: service.name, url: `/${serviceSlug}/` },
    { name: `${service.name} in ${suburb.name}`, url: `/${serviceSlug}/${suburbSlug}/` }
  ]);
  const allFaqs = [
    ...(service.pricingGuide ? [{
      question: `How much does ${service.name.toLowerCase()} cost in ${suburb.name}?`,
      answer: service.pricingGuide.replace(/\[suburb\]/g, suburb.name)
    }] : []),
    ...service.faqs
  ];
  const faqSchema = buildFAQSchema(allFaqs);

  return (
    <div>
      <PageSEO
        title={`${service.name} ${suburb.name} | Gold Coast`}
        description={`Professional ${service.name.toLowerCase()} in ${suburb.name} (${suburb.postcode}). Fully insured & police-checked staff. Get a free quote — call (07) 5230 8293 today.`}
        canonical={`https://gcwindowandpressurecleaning.com.au/${serviceSlug}/${suburbSlug}/`}
        image={heroImage.src}
        jsonLd={[localBusinessSchema, serviceSchema, breadcrumbData, faqSchema]}
      />

      {/* Hero with Quote Form */}
      <QuoteHero
        headline={`${service.name} in ${suburb.name}`}
        subheading={`Professional ${service.name.toLowerCase()} for ${suburb.name} and across the Gold Coast.`}
        backgroundImage={heroImage.src}
        imageAlt={heroImage.alt}
      />

      {/* Location-Aware Introduction */}
      <section className="py-16 bg-paper-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-ochre-3 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">{suburb.name}, Postcode {suburb.postcode}</span>
            </div>
            <p className="text-lg text-ink-2 leading-relaxed">
              {getLocationSpecificIntro()}
            </p>
          </div>
        </div>
      </section>

      {/* Real recent jobs in this suburb (added by the content engine after approval) */}
      <RecentJobs suburbSlug={suburbSlug} suburbName={suburb.name} serviceSlug={serviceSlug} />

      {/* Window Cleaning Plans — focal section on window cleaning suburb pages */}
      {serviceSlug === 'window-cleaning' && <WellnessPlanSection />}

      {/* Secondary Service Image */}
      <section className="py-12 bg-paper">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="photo-frame">
            <img
              src={secondaryImage.src}
              alt={`${service.name} in ${suburb.name} - ${secondaryImage.alt}`}
              width={1024}
              height={682}
              className="w-full"
              loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      {/* Roof Cleaning — Why Gold Coast Roofs Need Cleaning More Often */}
      {serviceSlug === 'roof-cleaning' && (
        <section className="py-16 bg-ochre-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Why Gold Coast Roofs Need Cleaning More Often</h2>
              <p className="text-lg text-ink-2 max-w-2xl">The Gold Coast climate creates conditions that accelerate biological growth and surface degradation on roofs compared to drier, inland areas.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "💧", title: "Year-Round Humidity", desc: "Average 65–80% relative humidity year-round accelerates moss and lichen growth faster than almost any other major Australian city." },
                { icon: "🌊", title: "Coastal Salt Aerosol", desc: "Salt from the Coral Sea is carried up to 10km inland, leaving mineral deposits that trigger paint degradation and corrosion on Colorbond and terracotta." },
                { icon: "⛈️", title: "Summer Storm Season", desc: "The Nov–Apr wet season deposits leaves, organic matter, and debris that trap moisture against roof surfaces, accelerating biological growth." },
                { icon: "☀️", title: "Intense UV Exposure", desc: "High UV intensity causes thermal expansion cracking in tiles, creating micro-crevices where moss and lichen spores take hold and spread." },
                { icon: "🌧️", title: "High Annual Rainfall", desc: "Over 1,400mm of annual rainfall keeps roof surfaces wetter for longer than inland Queensland, dramatically speeding up algae and lichen cycles." },
                { icon: "🌿", title: "Surrounding Vegetation", desc: "Hinterland eucalyptus, paperbarks, and coastal Norfolk pines deposit pollen, seeds, and debris that feed biological growth on roof surfaces." }
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
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Roof Type Cleaning Guide</h2>
              <p className="text-lg text-ink-2">Different roof materials require different cleaning methods. Here's what we recommend for each type.</p>
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

      {/* Roof Cleaning — Signs Your Roof Needs Cleaning */}
      {serviceSlug === 'roof-cleaning' && (
        <section className="py-16 bg-paper">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Signs Your Roof Needs Cleaning</h2>
              <p className="text-lg text-ink-2">If you notice any of these, it's time to book a professional clean.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: "⬛", text: "Dark streaks or black staining — a sign of algae colonies spreading across the surface" },
                { icon: "🟢", text: "Green or grey patches — moss and lichen actively growing and holding moisture against the roof" },
                { icon: "🍂", text: "Visible debris in valleys and gutters — damp leaf packs accelerate biological growth" },
                { icon: "💧", text: "Discolouration around downpipes — sediment and algae spores washing down from a dirty roof" },
                { icon: "👃", text: "Musty smell in your ceiling space after rain — often a sign of biological matter on or under roof surfaces" },
                { icon: "🎨", text: "Paint peeling or chalking on the roof surface — UV degradation compounded by moisture from biological growth" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-paper-white rounded-[14px] border-2 border-ink p-5">
                  <FactIcon icon={item.icon} small />
                  <p className="text-ink-2 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Solar Panel Cleaning — Why Gold Coast Solar Panels Get Dirty Faster */}
      {serviceSlug === 'solar-panel-cleaning' && (
        <section className="py-16 bg-paper-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Why Gold Coast Solar Panels Get Dirty Faster</h2>
              <p className="text-lg text-ink-2 max-w-2xl">The Gold Coast's coastal and subtropical environment creates multiple soiling sources that combine to reduce panel output faster than most Australian locations.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "🌊", title: "Ocean Salt Aerosol", desc: "Salt particles from the Coral Sea settle on panel glass and leave mineral deposits that scatter and absorb sunlight, reducing output within weeks of a clean for coastal properties." },
                { icon: "🦅", title: "Heavy Bird Activity", desc: "Coastal ibis, cormorants, cockatoos, and mynas are prolific along the Gold Coast. Bird droppings are acidic and create hotspots that can permanently damage individual cells if left on panels." },
                { icon: "💧", title: "Subtropical Humidity", desc: "High year-round humidity traps dust and pollen on panel surfaces and promotes algae growth — a problem far less common in drier Australian cities like Perth or Adelaide." },
                { icon: "🌸", title: "Hinterland Pollen", desc: "Eucalyptus, paperbarks, and other native species in the hinterland shed heavy pollen loads during spring and summer that coat south-facing panels in a yellow-brown film." },
                { icon: "🚗", title: "M1 Motorway Dust", desc: "Fine rubber and bitumen particles from the M1 corridor settle on solar panels in bayside and northern suburbs, building up as a dark greasy film." },
                { icon: "☀️", title: "Intense UV Bonding", desc: "Gold Coast's high UV intensity accelerates the bonding of organic matter to panel glass, making deposits harder to remove and requiring professional-grade techniques to clean safely." }
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
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Dirty vs Clean — What You're Losing</h2>
              <p className="text-lg text-ink-2">The real cost of skipping a professional solar panel clean on the Gold Coast.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl shadow-sm border border-rule">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink text-white">
                    <th className="px-6 py-4 text-left font-semibold w-1/3"></th>
                    <th className="px-6 py-4 text-center font-semibold text-brick-300">Dirty Panels</th>
                    <th className="px-6 py-4 text-center font-semibold text-ochre">After Professional Clean</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Efficiency", dirty: "Up to 30% below rated output", clean: "Restored to rated output" },
                    { label: "Annual savings impact", dirty: "~$300–600 lost/year (6kW system)", clean: "Savings fully restored" },
                    { label: "Visual appearance", dirty: "Streaked, discoloured", clean: "Clear, like-new" },
                    { label: "Warranty status", dirty: "Potentially voided by soiling damage", clean: "Maintained" },
                    { label: "Bird damage risk", dirty: "High — droppings attract more birds", clean: "Reduced" }
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

      {/* Why Choose Us - Location Specific */}
      <section className="py-16 bg-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink mb-12">
            Why Choose Us for {service.name} in {suburb.name}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {getLocalizedWhyChooseUs().map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-2">{item.title}</h3>
                  <p className="text-ink-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 bg-paper-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink mb-12">
            Our {service.name} Process
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {service.process.map((item) => (
              <div key={item.step} className="bg-paper-white rounded-[14px] border-2 border-ink p-6 text-center">
                <div className="w-12 h-12 bg-ochre-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-ochre-3">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-ink">{item.title}</h3>
                <p className="text-ink-2 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Benefits benefits={service.benefits} title={`Benefits of Professional ${service.name}`} />

      {/* Google Reviews */}
      <GoogleReviews />

      {/* FAQ */}
      <FAQ
        faqs={allFaqs}
        title={`${service.name} FAQs`}
        subtitle={`Answers to common questions about ${service.name.toLowerCase()} in ${suburb.name}`}
      />

      {/* Other Services in this Suburb */}
      <section className="py-16 bg-paper">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink mb-4">
            Other Services in {suburb.name}
          </h2>
          <p className="text-ink-2 mb-8">
            We provide a full range of exterior cleaning services in {suburb.name}:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to={`/window-cleaning-plans/${suburbSlug}/`}
              className="group flex items-center justify-between p-4 bg-paper-white rounded-lg hover:bg-paper-2 transition-colors border border-rule hover:border-rule shadow-sm"
            >
              <span className="font-medium text-ink group-hover:text-ink">
                Window Cleaning Plans in {suburb.name}
              </span>
              <ArrowRight className="w-4 h-4 text-ochre-3 flex-shrink-0 ml-2" />
            </Link>
            {SERVICES.filter(s => s.slug !== serviceSlug).map((otherService, idx) => (
              <Link
                key={idx}
                to={`/${otherService.slug}/${suburbSlug}/`}
                className="group flex items-center justify-between p-4 bg-paper-white rounded-lg hover:bg-paper-2 transition-colors border border-rule hover:border-rule shadow-sm"
              >
                <span className="font-medium text-ink group-hover:text-ink">
                  {otherService.name} in {suburb.name}
                </span>
                <ArrowRight className="w-4 h-4 text-ochre-3 flex-shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Also Serving Nearby */}
      {suburb.nearbySuburbs && suburb.nearbySuburbs.length > 0 && (
        <section className="py-16 bg-paper-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink mb-8">
              Also Serving Nearby
            </h2>
            <p className="text-ink-2 mb-8">
              We also provide {service.name.toLowerCase()} services to these nearby areas:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suburb.nearbySuburbs.map((nearbySuburbName, idx) => {
                const nearbySuburbData = SUBURBS.find(s => s.name === nearbySuburbName);
                if (!nearbySuburbData) return null;
                return (
                  <Link
                    key={idx}
                    to={`/${serviceSlug}/${nearbySuburbData.slug}/`}
                    className="flex items-center justify-between p-4 bg-paper rounded-lg hover:bg-paper-2 transition-colors border border-rule hover:border-rule"
                  >
                    <span className="font-medium text-ink">{nearbySuburbName}</span>
                    <ArrowRight className="w-4 h-4 text-ochre-3" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Quote Form */}
      <QuoteForm serviceName={service.name} />

      {/* CTA Footer */}
      <section className="py-16 bg-ink text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Professional {service.name}?
          </h2>
          <p className="text-xl text-paper-2 mb-8">
            Contact Gold Coast Window and Pressure Cleaning today for a free quote.
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
