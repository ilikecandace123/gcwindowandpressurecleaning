
import React from "react";
import FactIcon from "../components/FactIcon";
import QuoteHero from "../components/QuoteHero";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Benefits from "../components/Benefits";
import QuoteForm from "../components/QuoteForm";
import FAQ from "../components/FAQ";
import GoogleReviews from "../components/GoogleReviews";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema, buildFAQSchema } from "../data/schema";
import SuburbLinks from "../components/SuburbLinks";

// Importing icons from lucide-react for the new hero section
import { Shield, Users, Star, Phone } from "lucide-react";

export default function SolarPanelCleaning() {
  const benefits = [
    {
      title: "Boost Efficiency by Up to 30%",
      description: "Clean panels restore rated output lost to Gold Coast's coastal dust, salt aerosol, and heavy bird activity. The Clean Energy Council estimates dirty panels lose 15–30% efficiency — professional cleaning recovers every percent."
    },
    {
      title: "Protect Your Investment",
      description: "Gold Coast's coastal humidity accelerates the bonding of grime and bird droppings to panel glass. Regular cleaning prevents permanent etching and micro-scratching that reduces panel lifespan."
    },
    {
      title: "Maximise Energy Savings",
      description: "With electricity rates rising, every kilowatt counts. A professional clean pays for itself within months through restored energy production and reduced grid draw."
    },
    {
      title: "Maintain Manufacturer Warranty",
      description: "Most major manufacturers (SunPower, LG, REC, Jinko) require documented professional cleaning to keep warranties valid. Our service includes a written report for your warranty records."
    },
    {
      title: "Prevent Costly Repairs",
      description: "Our inspection identifies hotspots, micro-cracks, and loose mounting hardware before they become expensive panel replacements. Early detection saves thousands."
    },
    {
      title: "Eco-Friendly, Roof-Safe Process",
      description: "We use purified deionised water and pH-neutral solutions that are safe for your roof membrane, gutters, garden, and the local waterways. No harsh chemicals."
    }
  ];

  const faqs = [
    {
      question: "How much does solar panel cleaning cost on the Gold Coast?",
      answer: "Solar panel cleaning on the Gold Coast starts at $220, which includes up to 20 panels on a single-storey roof. 21–25 panels is $275, 26–30 panels $330 and 31–40 panels $440 (about $11 per extra panel). Double-storey roofs add $50. Heavy mould and systems over 40 panels are quoted after a look. These are the same prices our instant quote tool uses, so you can see your exact figure online in about two minutes."
    },
    {
      question: "How often should Gold Coast solar panels be cleaned?",
      answer: "Every 6–12 months for most Gold Coast properties. Homes near the beach (within 2km of the ocean) or under coastal flight paths for birds like ibis and cockatoos should clean every 6 months. Properties in inland suburbs like Nerang or Mudgeeraba can often go 12 months between cleans."
    },
    {
      question: "How does Gold Coast's coastal salt air affect solar panels?",
      answer: "Salt aerosol from the Coral Sea is carried inland up to 10km and deposits a fine mineral film on panel glass. Unlike dust which can be rinsed by rain, salt deposits bond to the surface over time and create a milky haze that permanently reduces light transmission. Professional cleaning with purified water removes salt buildup that rain cannot."
    },
    {
      question: "Will dirty solar panels really affect my energy bill?",
      answer: "Yes, significantly. Studies show dirty panels can lose 15–30% of their rated efficiency (Source: Solar Energy International). For a typical 6.6kW Gold Coast system producing around 28kWh/day, that's 4–8kWh of lost output daily — or $300–$600 per year at current electricity rates."
    },
    {
      question: "Do you clean solar panels on high-rise apartments in Surfers Paradise?",
      answer: "Yes. We hold working-at-heights certification and carry $20M public liability insurance. We regularly service high-rise buildings throughout Surfers Paradise, Broadbeach, and Southport. For buildings above 3 storeys, contact us for a tailored access assessment."
    },
    {
      question: "Will professional cleaning void my solar panel warranty?",
      answer: "No — in fact, the opposite is true. Most manufacturers require documented professional cleaning to keep warranties valid. Using purified water (as we do) is specifically required by brands like SunPower and REC to prevent micro-scratching of the anti-reflective coating. DIY cleaning with tap water or abrasive tools is what voids warranties."
    },
    {
      question: "How much energy am I losing right now if my panels are dirty?",
      answer: "A quick check: compare your inverter's current daily output to its rated output at your location's peak sun hours. Gold Coast receives around 4.5–5 peak sun hours daily. A 6.6kW system should produce roughly 27–30kWh on a clear day. If you're consistently seeing 20–22kWh, your panels may be losing 20–25% to soiling."
    },
    {
      question: "Is it safe to clean solar panels myself?",
      answer: "We strongly advise against DIY cleaning. Working at roof height is a significant safety risk, and most household cleaning tools scratch the anti-reflective coating on panel glass. Tap water leaves calcium scale deposits that can reduce efficiency further. Our technicians use purified water, non-abrasive brushes, and safe roof access equipment."
    },
    {
      question: "Do you provide before and after photos?",
      answer: "Yes, always. We photograph your panels before cleaning, during, and after — and provide a written condition report. The report documents any panel damage, loose mounting hardware, or hotspot concerns we identified during the inspection. This also serves as a record for warranty claims."
    },
    {
      question: "What if it rains soon after cleaning?",
      answer: "Light rain after cleaning is fine — it won't undo the clean and actually helps flush away any remaining loosened particles. If a significant storm occurs within 48 hours of your service and leaves visible debris on the panels, contact us and we'll arrange a complimentary rinse."
    }
  ];

  const seoJsonLd = [
    buildLocalBusinessSchema(),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Solar Panel Cleaning",
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Gold Coast Window and Pressure Cleaning",
        "telephone": "(07) 5230 8293",
        "url": "https://gcwindowandpressurecleaning.com.au"
      },
      "areaServed": { "@type": "City", "name": "Gold Coast", "addressRegion": "QLD", "addressCountry": "AU" },
      "description": "Professional solar panel cleaning on the Gold Coast. Boost energy output by up to 30% with safe, eco-friendly cleaning."
    },
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Solar Panel Cleaning", url: "/solar-panel-cleaning/" }
    ]),
    buildFAQSchema(faqs)
  ];

  return (
    <div>
      <PageSEO
        title="Solar Panel Cleaning Gold Coast | Boost Output"
        description="Professional solar panel cleaning across the Gold Coast — restore lost generation and boost output by up to 30%. Fully insured. Call (07) 5230 8293."
        canonical="https://gcwindowandpressurecleaning.com.au/solar-panel-cleaning/"
        image="/images/solar-panel-hero.jpg"
        jsonLd={seoJsonLd}
      />
      <QuoteHero
        headline={'Gold Coast Solar Panel Cleaning — Restore Lost Output'}
        subheading={"Safe, pure-water cleaning that won't void your warranty."}
        backgroundImage={'/images/solar-panel-hero.jpg'}
      />

      {/* About Section */}
      <section className="py-16 bg-paper-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-6">
                Your Trusted Local Solar Cleaning Professionals
              </h2>
              <p className="text-lg text-ink-2 mb-6 leading-relaxed">
                We're a locally owned and operated business committed to transparent, friendly communication.
                All our staff are police-checked for your peace of mind, and we're fully insured for liability and damages.
              </p>
              <p className="text-lg text-ink-2 mb-8 leading-relaxed">
                We keep you updated every step of the way.
                Our honest, clear communication means no surprises – just professional service you can trust.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Police-checked, insured professionals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Clear communication throughout the process</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Supporting local communities</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/images/solar-panel-dirty-vs-clean.webp"
                alt="Professional solar panel cleaning team on roof"
                className="rounded-[14px] border-2 border-ink shadow-hard-ochre-sm sm:shadow-hard-ochre"
                loading="lazy" decoding="async" width="1936" height="1936" />
            </div>
          </div>
        </div>
      </section>

      {/* Gold Coast Climate Section */}
      <section className="py-16 bg-paper-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">
              Why Gold Coast Solar Panels Get Dirty Faster
            </h2>
            <p className="text-xl text-ink-2 max-w-3xl">
              Gold Coast's unique coastal environment creates soiling conditions more aggressive than most Australian cities — here's what your panels are up against.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🌊",
                title: "Ocean Salt Aerosol",
                desc: "Salt from the Coral Sea is carried up to 10km inland, depositing mineral films on panel glass that rain cannot dissolve. Beachside suburbs like Currumbin, Burleigh, and Palm Beach are most affected."
              },
              {
                icon: "🦅",
                title: "Heavy Bird Activity",
                desc: "Ibis, cockatoos, cormorants, and seagulls are prolific along the Gold Coast. Bird droppings are acidic and etch into panel glass within weeks, causing permanent efficiency loss if not removed promptly."
              },
              {
                icon: "💧",
                title: "Subtropical Humidity",
                desc: "Gold Coast's year-round humidity (65–80% RH) causes dust and pollen to bond to panel surfaces far more aggressively than in dry climates. Wet-dry cycles bake grime into a hardened crust."
              },
              {
                icon: "🌿",
                title: "Hinterland Pollen",
                desc: "Spring and summer winds carry heavy pollen loads from hinterland eucalyptus, paperbarks, and subtropical rainforest. Pollen films reduce light transmission and attract further particulate buildup."
              },
              {
                icon: "🛣️",
                title: "M1 Motorway Dust",
                desc: "Suburbs along the M1 corridor — Coomera, Ormeau, Pimpama, Oxenford — experience elevated dust and fine particulate from road traffic that accumulates rapidly on horizontal panel surfaces."
              },
              {
                icon: "☀️",
                title: "Intense UV Bonding",
                desc: "Gold Coast's high UV index (daily UV 11–13 in summer) accelerates the photochemical bonding of organic matter to glass. Contaminants literally bake onto panel surfaces faster than in cooler climates."
              }
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

      {/* Service Description */}
      <section className="py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-6">
              Professional Solar Panel Cleaning Process
            </h2>
            <p className="text-xl text-ink-2 max-w-3xl">
              Our specialised cleaning process is designed to maximise your solar panel efficiency while protecting your investment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 mb-12">
            {[
              { num: "1", title: "Safety & Access", desc: "We assess roof access, set up fall-arrest anchors, and confirm system isolation before any technician steps onto your roof." },
              { num: "2", title: "Panel Inspection", desc: "Each panel is inspected for hotspots, micro-cracks, loose frames, bird damage, and shading issues before cleaning begins." },
              { num: "3", title: "Purified Water Pre-Rinse", desc: "We pre-rinse with deionised (purified) water. Tap water leaves calcium scale — purified water is required by most manufacturers to protect the anti-reflective coating." },
              { num: "4", title: "Soft-Brush Scrub", desc: "Panels are scrubbed with a soft-bristle brush and pH-neutral solution that removes all organic matter, salt deposits, and bird droppings without scratching." },
              { num: "5", title: "Report & Output Check", desc: "We provide before/after photos, a written condition report, and advise on any panel issues spotted. You'll see the difference — and so will your inverter." }
            ].map((step, i) => (
              <div key={i} className="border-t-2 border-ink pt-4">
                <span className="block font-display italic text-2xl text-ochre-2 mb-2">0{step.num}</span>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-ink-2 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-paper-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">
            Dirty vs Clean — What You're Losing
          </h2>
          <p className="text-ink-2 mb-10 text-lg max-w-3xl">Based on a typical 6.6kW Gold Coast rooftop solar system.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-paper-2">
                  <th className="text-left p-4 font-semibold text-ink-2 border border-rule">Metric</th>
                  <th className="text-center p-4 font-semibold text-brick border border-rule bg-brick-50">Dirty panels</th>
                  <th className="text-center p-4 font-semibold text-moss border border-rule bg-moss-50">After a professional clean</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Efficiency", "Up to 30% below rated output", "Restored to full rated output"],
                  ["Annual savings lost", "~$300–$600/year (6.6kW system)", "Savings fully recovered"],
                  ["Daily output (clear day)", "~20–22 kWh instead of 28–30 kWh", "28–30 kWh as rated"],
                  ["Visual appearance", "Streaked, grey, discoloured", "Clear, like-new glass"],
                  ["Manufacturer warranty", "Potentially at risk", "Fully maintained"],
                  ["Bird nesting risk", "High — soiled panels attract nesting", "Reduced attraction"]
                ].map(([metric, dirty, clean], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-paper-white" : "bg-paper"}>
                    <td className="p-4 font-medium text-ink border border-rule">{metric}</td>
                    <td className="p-4 text-center text-brick border border-rule bg-brick-50/30">{dirty}</td>
                    <td className="p-4 text-center text-moss border border-rule bg-moss-50/30">{clean}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Benefits
        benefits={benefits}
        title="Why Professional Solar Panel Cleaning Pays for Itself"
      />

      <GoogleReviews />

      {/* Service Areas */}
      <section className="py-12 bg-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink mb-4">Gold Coast Solar Panel Cleaning — Areas We Service</h2>
          <p className="text-ink-2 leading-relaxed text-lg">
            We clean solar panels across the entire Gold Coast region including{" "}
            <Link to="/solar-panel-cleaning/surfers-paradise/" className="text-ochre-3 hover:underline">Surfers Paradise</Link>,{" "}
            <Link to="/solar-panel-cleaning/broadbeach/" className="text-ochre-3 hover:underline">Broadbeach</Link>,{" "}
            <Link to="/solar-panel-cleaning/robina/" className="text-ochre-3 hover:underline">Robina</Link>,{" "}
            <Link to="/solar-panel-cleaning/burleigh-heads/" className="text-ochre-3 hover:underline">Burleigh Heads</Link>,{" "}
            <Link to="/solar-panel-cleaning/palm-beach/" className="text-ochre-3 hover:underline">Palm Beach</Link>,{" "}
            <Link to="/solar-panel-cleaning/currumbin/" className="text-ochre-3 hover:underline">Currumbin</Link>,{" "}
            <Link to="/solar-panel-cleaning/coolangatta/" className="text-ochre-3 hover:underline">Coolangatta</Link>,{" "}
            <Link to="/solar-panel-cleaning/southport/" className="text-ochre-3 hover:underline">Southport</Link>,{" "}
            <Link to="/solar-panel-cleaning/nerang/" className="text-ochre-3 hover:underline">Nerang</Link>,{" "}
            <Link to="/solar-panel-cleaning/mudgeeraba/" className="text-ochre-3 hover:underline">Mudgeeraba</Link>,{" "}
            <Link to="/solar-panel-cleaning/elanora/" className="text-ochre-3 hover:underline">Elanora</Link>,{" "}
            <Link to="/solar-panel-cleaning/tugun/" className="text-ochre-3 hover:underline">Tugun</Link>, and{" "}
            <Link to="/solar-panel-cleaning/mermaid-waters/" className="text-ochre-3 hover:underline">Mermaid Waters</Link>.{" "}
            Not sure if we cover your suburb? <a href="tel:0752308293" className="text-ochre-3 hover:underline">Give us a call</a>.
          </p>
        </div>
      </section>

      <QuoteForm serviceName="Solar Panel Cleaning" />

      <FAQ faqs={faqs} title="Solar Panel Cleaning FAQ" guideLink={{ label: "Guide: Do dirty solar panels reduce output?", href: "/guides/do-dirty-solar-panels-reduce-output/" }} />

      {/* Related Services */}
      <section className="py-12 bg-paper-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink mb-6">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/gutter-cleaning/" className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-lg font-semibold text-ink mb-2">Gutter Cleaning</h3>
              <p className="text-sm text-ink-2">Bird droppings and roof debris block gutters fast. Keep water flowing with professional gutter cleaning.</p>
            </Link>
            <Link to="/bird-proofing/" className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-lg font-semibold text-ink mb-2">Bird Proofing</h3>
              <p className="text-sm text-ink-2">Protect your solar panels and roof from bird damage with professional bird proofing mesh and deterrents.</p>
            </Link>
            <Link to="/roof-cleaning/" className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-lg font-semibold text-ink mb-2">Roof Cleaning</h3>
              <p className="text-sm text-ink-2">Professional roof cleaning to remove moss, lichen, and algae — extending your roof's life and boosting curb appeal.</p>
            </Link>
          </div>
        </div>
      </section>

      <SuburbLinks serviceSlug="solar-panel-cleaning" serviceName="Solar Panel Cleaning" />
    </div>
  );
}
