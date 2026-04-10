import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Shield, Users, Star, Phone, CheckCircle, ChevronDown, ChevronUp, MapPin, ArrowRight, Building2, FileCheck, Clock, HardHat } from "lucide-react";
import { getSuburbBySlug, getCommercialServiceBySlug, SUBURBS, COMMERCIAL_SERVICES } from "../data/locations";
import Benefits from "../components/Benefits";
import QuoteForm from "../components/QuoteForm";
import PageSEO from "../components/PageSEO";
import GoogleReviews from "../components/GoogleReviews";
import { buildLocalBusinessSchema, buildServiceSchema, buildBreadcrumbSchema } from "../data/schema";

const HERO_IMAGES = {
  "window-cleaning": "/images/commercial-window-hero.jpg",
  "roof-cleaning": "/images/commercial-roof-hero.webp",
  "house-softwash": "/images/commercial-softwash-hero.webp",
  "pressure-cleaning": "/images/commercial-pressure-hero.jpg",
  "gutter-cleaning": "/images/commercial-gutter-hero.jpg",
  "solar-panel-cleaning": "/images/solar-panel-hero.jpg",
  "bird-proofing": "/images/bird-proofing-hero.jpg"
};

const SECONDARY_IMAGES = {
  "window-cleaning": "/images/window.jpg",
  "roof-cleaning": "/images/roof-cleaning-1.jpg",
  "house-softwash": "/images/commercial-softwash-secondary.jpg",
  "pressure-cleaning": "/images/commercial-pressure-secondary.jpg",
  "gutter-cleaning": "/images/gutter-screenshot.jpg",
  "solar-panel-cleaning": "/images/solar-panel-dirty-vs-clean.webp",
  "bird-proofing": "/images/bird-proofing-secondary.jpg"
};

export default function CommercialLocationService() {
  const { serviceSlug, suburb: suburbSlug } = useParams();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const suburb = getSuburbBySlug(suburbSlug);
  const service = getCommercialServiceBySlug(serviceSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug, suburbSlug]);

  if (!suburb || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 text-lg mb-6">The commercial service area you're looking for doesn't exist.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold">← Back to home</Link>
        </div>
      </div>
    );
  }

  const heroImage = HERO_IMAGES[serviceSlug] || HERO_IMAGES["window-cleaning"];
  const secondaryImage = SECONDARY_IMAGES[serviceSlug] || SECONDARY_IMAGES["window-cleaning"];

  // Commercial-specific intro copy per suburb
  const getLocationIntro = () => {
    let regional = "";
    if (suburb.region === "south_coast" || suburb.region === "central_coast") {
      regional = `${suburb.name} is a busy coastal Gold Coast hub with retail strips, hospitality venues, offices, medical practices and strata residential towers. The heavy salt air, UV exposure and high foot traffic mean commercial and strata properties in ${suburb.name} need scheduled professional maintenance to stay presentable and protect the building fabric. `;
    } else if (suburb.region === "central") {
      regional = `${suburb.name} is a busy central Gold Coast commercial area with office parks, retail precincts, medical centres and strata apartment buildings. Ongoing dust, traffic grime and humidity create steady maintenance demand from local facility managers and strata committees. `;
    } else if (suburb.region === "northern") {
      regional = `${suburb.name} is in the fast-growing northern Gold Coast corridor with new retail developments, industrial estates, schools and strata complexes. We service facility managers, strata committees and commercial operators across ${suburb.name} and surrounding business parks. `;
    } else if (suburb.region === "hinterland") {
      regional = `${suburb.name} sits in the Gold Coast hinterland where tree cover, organic debris and humidity put extra pressure on commercial roofs, gutters and building facades. Our scheduled programs keep ${suburb.name} businesses, schools and strata sites consistently maintained. `;
    } else if (suburb.region === "nsw_tweed") {
      regional = `${suburb.name} sits just across the border in the Northern Rivers region of NSW. Our Gold Coast commercial crews service retail, hospitality, strata and industrial clients in ${suburb.name} with the same fully insured, SWMS-documented standards as our Queensland work. `;
    }

    return `Professional ${service.name.toLowerCase()} in ${suburb.name} for commercial, strata and body corporate buildings. ${regional}We deliver fixed-price scheduled programs, site-specific SWMS, after-hours and weekend service, and photographic reporting — everything facility managers and strata committees need to keep ${suburb.name} properties consistently well-maintained.`;
  };

  const whyChooseUs = [
    { icon: <Building2 className="w-6 h-6 text-blue-600" />, title: `${suburb.name} Commercial Specialists`, description: `We understand the specific commercial, retail, hospitality and strata buildings in ${suburb.name} and service them to the standards their operators expect.` },
    { icon: <FileCheck className="w-6 h-6 text-blue-600" />, title: "Full Compliance Documentation", description: "Site-specific SWMS, JSA, certificates of currency, WHS inductions and photographic reporting — everything required for commercial and strata records." },
    { icon: <Clock className="w-6 h-6 text-blue-600" />, title: "After-Hours Scheduling", description: `Early mornings, evenings and weekends so ${suburb.name} businesses, tenants and customers are never disrupted.` },
    { icon: <HardHat className="w-6 h-6 text-blue-600" />, title: "Height Safety Trained", description: "All technicians are height safety trained, police-checked and uniformed, with $20M public liability on every job." }
  ];

  const localBusinessSchema = buildLocalBusinessSchema();
  const serviceSchema = buildServiceSchema({
    name: `Commercial ${service.name} in ${suburb.name}`,
    description: `Commercial & strata ${service.name.toLowerCase()} in ${suburb.name}, postcode ${suburb.postcode}. $20M public liability, SWMS supplied, after-hours service.`,
    image: heroImage,
    serviceType: `Commercial ${service.name}`,
    areaName: suburb.name,
    url: `https://gcwindowandpressurecleaning.com.au/commercial/${serviceSlug}/${suburbSlug}`
  });
  const breadcrumbData = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Commercial & Strata", url: "/commercial" },
    { name: service.name, url: `/commercial/${serviceSlug}` },
    { name: `${service.name} in ${suburb.name}`, url: `/commercial/${serviceSlug}/${suburbSlug}` }
  ]);

  return (
    <div>
      <PageSEO
        title={`${service.name} in ${suburb.name} | Commercial & Strata Gold Coast`}
        description={`Professional ${service.name.toLowerCase()} in ${suburb.name} (${suburb.postcode}) for commercial, strata and body corporate buildings. $20M public liability, SWMS supplied, after-hours service. Call (07) 5651 2386.`}
        canonical={`https://gcwindowandpressurecleaning.com.au/commercial/${serviceSlug}/${suburbSlug}`}
        image={heroImage}
        jsonLd={[localBusinessSchema, serviceSchema, breadcrumbData]}
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-gray-900">
                {service.name} in {suburb.name}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl mb-4 text-blue-700 font-medium">
                Fully Insured • SWMS Supplied • After-Hours Service • Gold Coast Based
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
                    alt={`${service.name} in ${suburb.name}`}
                    className="w-full h-auto block" loading="eager" decoding="async" fetchPriority="high" width="1024" height="768" />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><Shield className="w-7 h-7 mx-auto mb-2" /><p className="text-sm font-semibold">$20M Public Liability</p></div>
          <div><FileCheck className="w-7 h-7 mx-auto mb-2" /><p className="text-sm font-semibold">Site-Specific SWMS</p></div>
          <div><Clock className="w-7 h-7 mx-auto mb-2" /><p className="text-sm font-semibold">After-Hours Service</p></div>
          <div><Building2 className="w-7 h-7 mx-auto mb-2" /><p className="text-sm font-semibold">Strata Specialists</p></div>
        </div>
      </section>

      {/* Location intro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-600 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">{suburb.name}, Postcode {suburb.postcode}</span>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">{getLocationIntro()}</p>
        </div>
      </section>

      {/* Secondary image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-50">
            <picture>
              <source srcSet={secondaryImage.endsWith('.webp') ? secondaryImage : secondaryImage.replace('.jpg', '.webp')} type="image/webp" />
              <img src={secondaryImage} alt={`${service.name} in ${suburb.name}`} className="w-full h-auto max-h-[28rem] object-contain" loading="lazy" decoding="async" width="1024" height="768" />
            </picture>
          </div>
        </div>
      </section>

      {/* Roof Cleaning — Why Gold Coast Roofs Need Cleaning More Often */}
      {serviceSlug === 'roof-cleaning' && (
        <section className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why {suburb.name} Commercial Roofs Need Regular Cleaning</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Gold Coast's coastal and subtropical conditions accelerate biological growth and roof degradation compared to drier Australian markets.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "💧", title: "Year-Round Humidity", desc: "Average 65–80% relative humidity year-round accelerates moss and lichen growth on commercial roofs faster than almost any other major Australian city." },
                { icon: "🌊", title: "Coastal Salt Aerosol", desc: "Salt from the Coral Sea is carried inland, leaving mineral deposits that trigger paint degradation and corrosion on Colorbond, Kliplok, and metal deck profiles." },
                { icon: "⛈️", title: "Summer Storm Season", desc: "The Nov–Apr wet season deposits debris on commercial roofs that traps moisture and accelerates biological growth between maintenance visits." },
                { icon: "☀️", title: "Intense UV Exposure", desc: "High UV intensity causes thermal expansion cracking in tiles and coatings, creating micro-crevices where moss and lichen spores establish and spread." },
                { icon: "🌧️", title: "High Annual Rainfall", desc: "Over 1,400mm of annual rainfall keeps commercial roof surfaces wetter for longer than inland Queensland, accelerating algae and lichen growth cycles." },
                { icon: "🌿", title: "Surrounding Vegetation", desc: "Coastal and hinterland vegetation deposits pollen, seeds, and debris that feed biological growth on commercial and strata roof surfaces." }
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why {suburb.name} Commercial Solar Arrays Lose Output Faster</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Gold Coast's coastal and subtropical environment creates multiple soiling sources that combine to reduce commercial solar output faster than most Australian locations.</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dirty vs Clean — What Your {suburb.name} Array Is Losing</h2>
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

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why {suburb.name} Commercial Clients Choose Us
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our {service.name} Process
          </h2>
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

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{service.name} FAQs</h2>
            <p className="text-gray-600">Common questions from {suburb.name} commercial and strata clients</p>
          </div>
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}>
                  <h3 className="font-semibold text-gray-900 text-lg">{faq.question}</h3>
                  {openFaqIndex === index ? <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Commercial Services in this Suburb */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Other Commercial Services in {suburb.name}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Full-service commercial and strata exterior cleaning across {suburb.name}:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMERCIAL_SERVICES.filter(s => s.slug !== serviceSlug).map((otherService, idx) => (
              <a
                key={idx}
                href={`/commercial/${otherService.slug}/${suburbSlug}`}
                className="group flex items-center justify-between p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200 shadow-sm"
              >
                <span className="font-medium text-gray-900 group-hover:text-blue-700">
                  {otherService.name} in {suburb.name}
                </span>
                <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby */}
      {suburb.nearbySuburbs && suburb.nearbySuburbs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Also Serving Nearby</h2>
            <p className="text-center text-gray-600 mb-8">
              We also provide commercial {service.name.toLowerCase()} in these nearby areas:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suburb.nearbySuburbs.map((nearbySuburbName, idx) => {
                const nearbySuburbData = SUBURBS.find(s => s.name === nearbySuburbName);
                if (!nearbySuburbData) return null;
                return (
                  <a key={idx} href={`/commercial/${serviceSlug}/${nearbySuburbData.slug}`}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200">
                    <span className="font-medium text-gray-900">{nearbySuburbName}</span>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Quote Form */}
      <QuoteForm serviceName={service.name} />

      {/* CTA Footer */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Professional {service.name} in {suburb.name}?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Commercial and strata specialists on the Gold Coast. Fixed-price quotes, SWMS included.
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
