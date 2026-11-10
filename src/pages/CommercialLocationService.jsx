import React, { useEffect } from "react";
import FactIcon from "../components/FactIcon";
import QuoteHero from "../components/QuoteHero";
import { useParams, Link } from "react-router-dom";
import { Shield, Users, Star, Phone, CheckCircle, MapPin, ArrowRight, Building2, FileCheck, Clock, HardHat } from "lucide-react";
import { getSuburbBySlug, getCommercialServiceBySlug, SUBURBS, COMMERCIAL_SERVICES } from "../data/locations";
import Benefits from "../components/Benefits";
import FAQ from "../components/FAQ";
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
  "gutter-cleaning": "/images/gutter-1.jpg",
  "solar-panel-cleaning": "/images/solar-panel-dirty-vs-clean.webp",
  "bird-proofing": "/images/bird-proofing-secondary.jpg"
};

export default function CommercialLocationService() {
  const { serviceSlug, suburb: suburbSlug } = useParams();

  const suburb = getSuburbBySlug(suburbSlug);
  const service = getCommercialServiceBySlug(serviceSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug, suburbSlug]);

  if (!suburb || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ink mb-4">Page Not Found</h1>
          <p className="text-ink-2 text-lg mb-6">The commercial service area you're looking for doesn't exist.</p>
          <Link to="/" className="text-ochre-3 hover:text-ink font-semibold">← Back to home</Link>
        </div>
      </div>
    );
  }

  const heroImage = HERO_IMAGES[serviceSlug] || HERO_IMAGES["window-cleaning"];
  const secondaryImage = SECONDARY_IMAGES[serviceSlug] || SECONDARY_IMAGES["window-cleaning"];

  // Commercial-specific intro copy per suburb.
  // Prefers per-suburb unique fields (propertyMix / environmentalNote / localHook)
  // — falls back to generic regional copy only when those are absent.
  const getLocationIntro = () => {
    const opener = `Professional ${service.name.toLowerCase()} in ${suburb.name} for commercial, strata and body corporate buildings. `;
    const closer = `We deliver fixed-price scheduled programs, site-specific SWMS, after-hours and weekend service, and photographic reporting — everything facility managers and strata committees need to keep ${suburb.name} properties consistently well-maintained.`;

    if (suburb.propertyMix && suburb.environmentalNote && suburb.localHook) {
      return (
        opener +
        suburb.propertyMix + " " +
        suburb.environmentalNote + " " +
        suburb.localHook + " " +
        closer
      );
    }

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

    return opener + regional + closer;
  };

  // Use the per-suburb environmentalNote for a genuinely unique first bullet.
  const commercialSpecialistDescription = suburb.environmentalNote
    ? `Local commercial context in ${suburb.name}: ${suburb.environmentalNote}`
    : `We understand the specific commercial, retail, hospitality and strata buildings in ${suburb.name} and service them to the standards their operators expect.`;

  const whyChooseUs = [
    { icon: <Building2 className="w-6 h-6 text-ochre-3" />, title: `${suburb.name} Commercial Specialists`, description: commercialSpecialistDescription },
    { icon: <FileCheck className="w-6 h-6 text-ochre-3" />, title: "Full Compliance Documentation", description: "Site-specific SWMS, JSA, certificates of currency, WHS inductions and photographic reporting — everything required for commercial and strata records." },
    { icon: <Clock className="w-6 h-6 text-ochre-3" />, title: "After-Hours Scheduling", description: `Early mornings, evenings and weekends so ${suburb.name} businesses, tenants and customers are never disrupted.` },
    { icon: <HardHat className="w-6 h-6 text-ochre-3" />, title: "Height Safety Trained", description: "All technicians are height safety trained, police-checked and uniformed, with $20M public liability on every job." }
  ];

  const localBusinessSchema = buildLocalBusinessSchema();
  const serviceSchema = buildServiceSchema({
    name: `${service.name} in ${suburb.name}`,
    description: `Commercial & strata ${service.name.toLowerCase()} in ${suburb.name}, postcode ${suburb.postcode}. $20M public liability, SWMS supplied, after-hours service.`,
    image: heroImage,
    serviceType: `${service.name}`,
    areaName: suburb.name,
    url: `https://gcwindowandpressurecleaning.com.au/commercial/${serviceSlug}/${suburbSlug}/`
  });
  const breadcrumbData = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Commercial & Strata", url: "/commercial/" },
    { name: service.name, url: `/commercial/${serviceSlug}/` },
    { name: `${service.name} in ${suburb.name}`, url: `/commercial/${serviceSlug}/${suburbSlug}/` }
  ]);

  return (
    <div>
      <PageSEO
        title={`${service.name} in ${suburb.name}`}
        description={`${service.name} in ${suburb.name} (${suburb.postcode}) for strata & body corporate buildings. $20M liability, SWMS supplied. Call (07) 5230 8293.`}
        canonical={`https://gcwindowandpressurecleaning.com.au/commercial/${serviceSlug}/${suburbSlug}/`}
        image={heroImage}
        jsonLd={[localBusinessSchema, serviceSchema, breadcrumbData]}
      />

      {/* Hero */}
      <QuoteHero
        headline={`${service.name} in ${suburb.name}`}
        subheading={`Scheduled commercial & strata ${service.name.toLowerCase()} for ${suburb.name} and the Gold Coast.`}
        backgroundImage={heroImage}
      />

      {/* Trust Strip */}
      <section className="py-8 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><Shield className="w-7 h-7 mx-auto mb-2" /><p className="text-sm font-semibold">$20M Public Liability</p></div>
          <div><FileCheck className="w-7 h-7 mx-auto mb-2" /><p className="text-sm font-semibold">Site-Specific SWMS</p></div>
          <div><Clock className="w-7 h-7 mx-auto mb-2" /><p className="text-sm font-semibold">After-Hours Service</p></div>
          <div><Building2 className="w-7 h-7 mx-auto mb-2" /><p className="text-sm font-semibold">Strata Specialists</p></div>
        </div>
      </section>

      {/* Location intro */}
      <section className="py-16 bg-paper-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-ochre-3 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">{suburb.name}, Postcode {suburb.postcode}</span>
          </div>
          <p className="text-lg text-ink-2 leading-relaxed">{getLocationIntro()}</p>
        </div>
      </section>

      {/* Secondary image */}
      <section className="py-12 bg-paper">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="photo-frame bg-paper">
            <picture>
              <source srcSet={secondaryImage.endsWith('.webp') ? secondaryImage : secondaryImage.replace('.jpg', '.webp')} type="image/webp" />
              <img src={secondaryImage} alt={`${service.name} in ${suburb.name}`} className="w-full h-auto max-h-[28rem] object-contain" loading="lazy" decoding="async" width="1024" height="768" />
            </picture>
          </div>
        </div>
      </section>

      {/* Roof Cleaning — Why Gold Coast Roofs Need Cleaning More Often */}
      {serviceSlug === 'roof-cleaning' && (
        <section className="py-16 bg-ochre-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Why {suburb.name} Commercial Roofs Need Regular Cleaning</h2>
              <p className="text-lg text-ink-2 max-w-2xl">Gold Coast's coastal and subtropical conditions accelerate biological growth and roof degradation compared to drier Australian markets.</p>
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
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Why {suburb.name} Commercial Solar Arrays Lose Output Faster</h2>
              <p className="text-lg text-ink-2 max-w-2xl">Gold Coast's coastal and subtropical environment creates multiple soiling sources that combine to reduce commercial solar output faster than most Australian locations.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "🌊", title: "Ocean Salt Aerosol", desc: "Salt particles from the Coral Sea settle on panel glass within days of a clean for coastal commercial sites, leaving mineral deposits that scatter and absorb sunlight." },
                { icon: "🦅", title: "Heavy Bird Activity", desc: "Coastal ibis, cormorants, cockatoos, and mynas deposit acidic droppings that create hotspots on commercial arrays, causing cell damage and generation loss." },
                { icon: "💧", title: "Subtropical Humidity", desc: "High year-round humidity traps dust and pollen on panel surfaces and promotes algae growth — a problem far less common in drier Australian commercial markets." },
                { icon: "🌸", title: "Hinterland Pollen", desc: "Native species in the hinterland shed heavy pollen loads during spring and summer that coat commercial solar arrays in a yellow-brown film." },
                { icon: "🚗", title: "Industrial and Traffic Pollution", desc: "Fine rubber and bitumen particles from the M1 corridor and nearby industrial areas build up as a dark greasy film on commercial solar panels." },
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
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Dirty vs Clean — What Your {suburb.name} Array Is Losing</h2>
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

      {/* Why Choose Us */}
      <section className="py-16 bg-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink mb-12">
            Why {suburb.name} Commercial Clients Choose Us
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, idx) => (
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

      {/* Process */}
      <section className="py-16 bg-paper-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink mb-12">
            Our {service.name} Process
          </h2>
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
      <FAQ faqs={service.faqs} title={`${service.name} FAQs`} subtitle={`Common questions from ${suburb.name} commercial and strata clients`} />

      {/* Other Commercial Services in this Suburb */}
      <section className="py-16 bg-paper">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink mb-4">
            Other Commercial Services in {suburb.name}
          </h2>
          <p className="text-ink-2 mb-8">
            Full-service commercial and strata exterior cleaning across {suburb.name}:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMERCIAL_SERVICES.filter(s => s.slug !== serviceSlug).map((otherService, idx) => (
              <a
                key={idx}
                href={`/commercial/${otherService.slug}/${suburbSlug}/`}
                className="group flex items-center justify-between p-4 bg-paper-white rounded-lg hover:bg-paper-2 transition-colors border border-rule hover:border-rule shadow-sm"
              >
                <span className="font-medium text-ink group-hover:text-ink">
                  {otherService.name} in {suburb.name}
                </span>
                <ArrowRight className="w-4 h-4 text-ochre-3 flex-shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby */}
      {suburb.nearbySuburbs && suburb.nearbySuburbs.length > 0 && (
        <section className="py-16 bg-paper-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink mb-8">Also Serving Nearby</h2>
            <p className="text-ink-2 mb-8">
              We also provide commercial {service.name.toLowerCase()} in these nearby areas:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suburb.nearbySuburbs.map((nearbySuburbName, idx) => {
                const nearbySuburbData = SUBURBS.find(s => s.name === nearbySuburbName);
                if (!nearbySuburbData) return null;
                return (
                  <a key={idx} href={`/commercial/${serviceSlug}/${nearbySuburbData.slug}/`}
                    className="flex items-center justify-between p-4 bg-paper rounded-lg hover:bg-paper-2 transition-colors border border-rule hover:border-rule">
                    <span className="font-medium text-ink">{nearbySuburbName}</span>
                    <ArrowRight className="w-4 h-4 text-ochre-3" />
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
      <section className="py-16 bg-ink text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Professional {service.name} in {suburb.name}?
          </h2>
          <p className="text-xl text-paper-2 mb-8">
            Commercial and strata specialists on the Gold Coast. Fixed-price quotes, SWMS included.
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
