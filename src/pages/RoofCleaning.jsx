
import React from "react";
import Benefits from "../components/Benefits";
import QuoteForm from "../components/QuoteForm";
import FAQ from "../components/FAQ";
import GoogleReviews from "../components/GoogleReviews";
import { Shield, Users, Star, Phone } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema, buildFAQSchema } from "../data/schema";
import SuburbLinks from "../components/SuburbLinks";

export default function RoofCleaning() {
  const benefits = [
    {
      title: "Extends Roof Life by Years",
      description: "Moss and lichen root systems penetrate tile and concrete surfaces, causing micro-fractures that allow water ingress. Removing them before they establish prevents the structural damage that leads to costly re-roofing."
    },
    {
      title: "Stops Salt Air Corrosion",
      description: "Gold Coast's coastal salt aerosol accelerates paint degradation and rust on metal roofs. Regular cleaning removes salt deposits before they break down protective coatings, preserving Colorbond and Zincalume surfaces."
    },
    {
      title: "Boosts Curb Appeal & Property Value",
      description: "A clean roof transforms a property's appearance. Real estate agents consistently report that clean roofs improve first impressions and can add measurable value — particularly important in Gold Coast's competitive property market."
    },
    {
      title: "Manufacturer-Approved Methods",
      description: "Our soft-wash process follows manufacturer guidelines for all major roof types. High-pressure cleaning voids many tile and membrane warranties — our low-pressure technique protects your coverage."
    },
    {
      title: "EPA-Compliant & Safe",
      description: "Our anti-microbial solutions are biodegradable and safe for families, pets, gardens, and the Gold Coast's waterways. All runoff is managed in compliance with local council environmental requirements."
    },
    {
      title: "Protects All Roof Types",
      description: "Whether you have terracotta tile, concrete tile, Colorbond metal, or flat membrane — we have a specific technique for each. No one-size-fits-all approach that risks damage."
    }
  ];

  const faqs = [
    {
      question: "How often should I have my Gold Coast roof cleaned?",
      answer: "Most Gold Coast roofs benefit from professional cleaning every 2–3 years. Coastal properties within 2km of the beach should clean every 1–2 years due to elevated salt aerosol. If you notice dark streaks, green patches, or moss starting to form, book a clean immediately — early treatment is far cheaper than waiting until growth is established."
    },
    {
      question: "Is soft washing or pressure washing better for Gold Coast tile roofs?",
      answer: "Soft washing is always the correct method for Gold Coast tile roofs. High-pressure cleaning strips the protective coating from concrete tiles, blasts away terracotta glaze, dislodges ridge capping mortar, and can force water under tiles causing internal water damage. Our low-pressure soft-wash process cleans to the same standard without any of these risks."
    },
    {
      question: "What does roof cleaning cost on the Gold Coast?",
      answer: "Pricing depends on roof size, pitch, access difficulty, and the degree of organic growth. Most residential roofs on the Gold Coast range from $350 to $800. We provide free, no-obligation quotes — contact us with your approximate roof size and suburb for a quick estimate."
    },
    {
      question: "Will roof cleaning damage my roof or gutters?",
      answer: "Not with our methods. Our low-pressure soft-wash technique is specifically designed to clean without dislodging mortar, cracking tiles, or bending gutters. We also clear gutters of any debris that dislodges during cleaning as standard. Our technicians are trained to work safely on all roof types."
    },
    {
      question: "Will you clean my roof after a storm?",
      answer: "Yes. Post-storm roof cleaning is one of our most common services during Gold Coast's summer storm season (November–April). Storm cleaning removes leaves, debris, and organic matter before it decomposes and accelerates moss growth. We also check for storm damage — cracked tiles, lifted ridge capping, and blocked valleys — as part of the service."
    },
    {
      question: "Can you apply anti-moss coating after cleaning?",
      answer: "Yes. We offer a post-clean anti-microbial sealant treatment that inhibits future moss and lichen growth for 12–24 months. It's particularly recommended for heavily shaded roofs or coastal properties with persistent biological growth. Ask about this when booking."
    },
    {
      question: "Do you clean gutters at the same time as the roof?",
      answer: "Roof cleaning always dislodges some debris into gutters, so we clear gutters of any loose material created by the clean as standard. We also offer a full gutter cleaning and flush service as an add-on — highly recommended since you're already paying for roof access time."
    },
    {
      question: "Is roof cleaning worth the investment?",
      answer: "Absolutely. A professional roof clean costs $400–$800 for most homes. Replacing a damaged roof costs $15,000–$60,000. The maths are clear. A clean roof also adds immediate curb appeal, which Gold Coast real estate agents consistently say matters at sale time."
    },
    {
      question: "How do I know if I have lichen vs moss on my roof?",
      answer: "Moss is the soft, green, spongy growth — it traps moisture but is relatively easy to remove. Lichen is the flat, crusty growth that appears grey, orange, or yellow and bonds directly to the tile surface at a root level. Lichen is harder to remove and causes more structural damage. Both are common in Gold Coast's humid conditions and both need professional treatment."
    }
  ];

  const seoJsonLd = [
    buildLocalBusinessSchema(),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Roof Cleaning",
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Gold Coast Window and Pressure Cleaning",
        "telephone": "(07) 5651 2386",
        "url": "https://gcwindowandpressurecleaning.com.au"
      },
      "areaServed": { "@type": "City", "name": "Gold Coast", "addressRegion": "QLD", "addressCountry": "AU" },
      "description": "Professional roof cleaning on the Gold Coast. Manufacturer-recommended process removes moss, lichen, and algae while protecting your roof."
    },
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Roof Cleaning", url: "/roof-cleaning" }
    ]),
    buildFAQSchema(faqs)
  ];

  return (
    <div>
      <PageSEO
        title="Roof Cleaning Gold Coast | Tile, Metal & Concrete Specialists"
        description="Professional roof cleaning across the Gold Coast. Tile, metal & concrete roof specialists — Surfers Paradise, Robina, Burleigh Heads & more. Fully insured. Free quotes — call (07) 5651 2386."
        canonical="https://gcwindowandpressurecleaning.com.au/roof-cleaning"
        jsonLd={seoJsonLd}
      />
      <section className="relative bg-white text-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-100 md:block">
          <picture>
            <source srcSet="/images/roof-hero.webp" type="image/webp" />
            <img
              src="/images/roof-hero.jpg"
              alt="Roof cleaning removing moss and algae from tiles on a Gold Coast home"
              className="w-full h-64 md:h-full object-cover" loading="eager" decoding="async" fetchPriority="high" width="1024" height="682" />
          </picture>
        </div>

        {/* Mobile: Image first, then text below */}
        <div className="block md:hidden">
          <div className="h-64">
            <picture>
              <source srcSet="/images/roof-hero.webp" type="image/webp" />
              <img
                src="/images/roof-hero.jpg"
                alt="Roof cleaning removing moss and algae from tiles on a Gold Coast home"
                className="w-full h-full object-cover" loading="lazy" decoding="async" width="1024" height="682" />
            </picture>
          </div>
          <div className="bg-white px-4 py-8">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <Shield className="w-4 h-4 mr-2 text-blue-600" />
                Fully Insured
              </div>
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                Police Checked Staff
              </div>
            </div>

            <h1 className="text-3xl font-bold leading-tight mb-4 text-gray-900">
              Roof Cleaning Gold Coast — Tile, Metal & Concrete Roofs
            </h1>
            
            <p className="text-lg mb-4 text-blue-700 font-medium">
              Locally Owned & Operated | Fully Insured | Police Checked Staff
            </p>

            <div className="flex items-center mb-6">
              <div className="flex items-center text-yellow-400 mr-3">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-gray-800 font-medium text-sm">5.0 Stars</span>
              <span className="text-gray-600 ml-2 text-sm">• 2500+ Happy Customers</span>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all"
              >
                Get Free Quote
              </a>
              <a
                href="tel:0756512386"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-all"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Desktop: Overlay design */}
        <div className="hidden md:block relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl bg-white/50 backdrop-blur-sm rounded-lg p-8">
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Shield className="w-4 h-4 mr-2 text-blue-600" />
                Fully Insured
              </div>
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                Police Checked Staff
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
              Roof Cleaning Gold Coast — Tile, Metal & Concrete Roofs
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-blue-700 font-medium">
              Locally Owned & Operated | Fully Insured | Police Checked Staff
            </p>
            
            <p className="text-lg mb-8 text-gray-600 max-w-3xl leading-relaxed">
              Gold Coast's subtropical climate is one of the harshest environments for roofs in Australia. Coastal salt air, year-round humidity, heavy summer storms, and intense UV combine to accelerate moss, lichen, and algae growth far faster than inland cities. Our manufacturer-recommended soft-wash process safely removes organic growth and surface grime from tile, metal, and concrete roofs — without the damage that high-pressure cleaning causes.
            </p>

            <div className="flex items-center mb-8">
              <div className="flex items-center text-yellow-400 mr-3">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="text-gray-800 font-medium">5.0 Stars</span>
              <span className="text-gray-600 ml-2">• 2500+ Happy Customers</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Get Free Quote
              </a>
              <a
                href="tel:0756512386"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center border border-white/20"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <picture>
                <source srcSet="/images/roof-secondary.webp" type="image/webp" />
                <img
                  src="/images/roof-secondary.jpg"
                  alt="Before and after roof cleaning showing lichen removal on concrete tiles"
                  loading="lazy"
                  className="rounded-2xl shadow-lg" decoding="async" width="1024" height="682" />
              </picture>

            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Local Roof Cleaning Experts
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're a trusted local business committed to transparent, friendly communication. All staff are 
                police-checked for your complete peace of mind, and we're fully insured for liability and damages.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our honest, clear communication means no hidden costs or surprises.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Manufacturer-approved cleaning methods</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">EPA-compliant environmentally safe process</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Respectful and well paid staff who take pride in their work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Comprehensive Roof Cleaning Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our roof cleaning service includes a full treatment to kill organic growth, gentle scrubbing to remove dirt and grime, 
              and a low-pressure rinse to make your roof shine—all while protecting paint and surface integrity.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {[
              { num: "1", color: "slate", title: "Safety Setup", desc: "Non-slip footwear, harness anchor points, and neighbour notification. Every job starts safe." },
              { num: "2", color: "blue", title: "Roof Inspection", desc: "We check for cracked tiles, rusted flashings, mortar failure, and blocked valleys before any water is applied." },
              { num: "3", color: "red", title: "Anti-Microbial Pre-Treatment", desc: "A biodegradable solution kills moss, lichen, and algae at root level — preventing regrowth." },
              { num: "4", color: "amber", title: "Soft-Brush Agitation", desc: "Gentle scrubbing loosens embedded organic matter and grime without scratching or dislodging tiles." },
              { num: "5", color: "green", title: "Low-Pressure Rinse", desc: "Controlled low-pressure washing removes all residue and reveals a clean surface — no paint or mortar damage." },
              { num: "6", color: "purple", title: "Final Inspection + Sealant", desc: "We inspect the result, clear gutters of dislodged debris, and offer optional anti-moss sealant for lasting protection." }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className={`w-12 h-12 bg-${step.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <span className={`text-lg font-bold text-${step.color}-600`}>{step.num}</span>
                </div>
                <h3 className="text-sm font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold Coast Climate Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Gold Coast Roofs Need Cleaning More Often
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gold Coast's subtropical coastal environment is one of the most demanding for roof surfaces in Australia.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "💧",
                title: "Year-Round Humidity",
                desc: "Gold Coast averages 65–80% relative humidity year-round. Persistently moist surfaces are ideal growing conditions for moss and lichen — far more aggressive than drier inland climates like Brisbane or Toowoomba."
              },
              {
                icon: "🌊",
                title: "Coastal Salt Aerosol",
                desc: "Salt from the Coral Sea carries up to 10km inland. Salt deposits trigger mineral buildup on tiles and accelerate paint degradation on metal roofs — especially for properties in Surfers Paradise, Broadbeach, and Palm Beach."
              },
              {
                icon: "⛈️",
                title: "Summer Storm Season",
                desc: "Gold Coast's storm season (November–April) deposits leaves, organic debris, and moisture into roof valleys and gutters. Decomposing matter accelerates mould and moss growth between professional cleans."
              },
              {
                icon: "☀️",
                title: "Intense UV Exposure",
                desc: "Daily UV index of 11–13 in summer causes thermal expansion cracking in concrete and terracotta tiles. Microscopic crevices created by UV damage become entry points for moss and lichen root systems."
              },
              {
                icon: "🌧️",
                title: "High Annual Rainfall",
                desc: "Gold Coast receives over 1,400mm of rain per year — more than double Sydney's average. Extended wet periods keep roof surfaces damp long enough for biological growth to take hold between dry spells."
              },
              {
                icon: "🍃",
                title: "Surrounding Vegetation",
                desc: "Subtropical hinterland trees shed year-round. Leaf debris accumulates in valleys and gutters, trapping moisture and providing organic matter that feeds moss, algae, and lichen colonies."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roof Type Guide */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Roof Type Cleaning Guide
          </h2>
          <p className="text-gray-600 text-center mb-10 text-lg">Different roof materials require different techniques. Here's what we recommend for each.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200">Roof Type</th>
                  <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200">Recommended Method</th>
                  <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200">Cleaning Frequency</th>
                  <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200">Key Concerns</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Concrete / Terracotta Tile", "Soft wash + low-pressure rinse", "Every 2–3 years", "Moss, lichen, paint fade, mortar integrity"],
                  ["Metal (Colorbond, Zincalume)", "Low-pressure soft wash", "Every 2–3 years", "Salt corrosion, rust stains, sealant degradation"],
                  ["Flat Membrane / TPO", "Gentle hand wash + soft brush", "Annually", "UV degradation, debris blockage, ponding water"]
                ].map(([type, method, freq, concerns], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-medium text-gray-900 border border-gray-200">{type}</td>
                    <td className="p-4 text-gray-700 border border-gray-200">{method}</td>
                    <td className="p-4 text-gray-700 border border-gray-200">{freq}</td>
                    <td className="p-4 text-gray-600 text-sm border border-gray-200">{concerns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Benefits
        benefits={benefits}
        title="The Benefits of Professional Roof Cleaning" />

      {/* Signs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Signs Your Roof Needs Cleaning</h2>
          <p className="text-gray-600 text-center mb-10">If you notice any of the following, book a professional clean before damage sets in.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: "⬛", sign: "Dark streaks or black staining", detail: "Caused by algae (Gloeocapsa magma) — very common in Gold Coast's humid climate." },
              { icon: "🟢", sign: "Green or grey patches", detail: "Active moss or lichen colonies — need treatment before root systems cause tile damage." },
              { icon: "🍂", sign: "Debris in valleys and gutters", detail: "Decomposing organic matter traps moisture and accelerates biological growth." },
              { icon: "🟤", sign: "Discolouration around downpipes", detail: "Indicates algae or dirt runoff from the roof surface — a sign of widespread soiling." },
              { icon: "👃", sign: "Musty smell in ceiling space", detail: "After rain, a musty odour can indicate biological growth trapping moisture under tiles." },
              { icon: "🎨", sign: "Peeling or chalking paint", detail: "On metal roofs, paint breakdown from salt and UV accelerates without regular cleaning." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{item.sign}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* Service Areas */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Gold Coast Roof Cleaning — Areas We Service</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            We provide professional roof cleaning across the entire Gold Coast region including{" "}
            <Link to="/roof-cleaning/surfers-paradise" className="text-blue-600 hover:underline">Surfers Paradise</Link>,{" "}
            <Link to="/roof-cleaning/broadbeach" className="text-blue-600 hover:underline">Broadbeach</Link>,{" "}
            <Link to="/roof-cleaning/robina" className="text-blue-600 hover:underline">Robina</Link>,{" "}
            <Link to="/roof-cleaning/burleigh-heads" className="text-blue-600 hover:underline">Burleigh Heads</Link>,{" "}
            <Link to="/roof-cleaning/palm-beach" className="text-blue-600 hover:underline">Palm Beach</Link>,{" "}
            <Link to="/roof-cleaning/currumbin" className="text-blue-600 hover:underline">Currumbin</Link>,{" "}
            <Link to="/roof-cleaning/coolangatta" className="text-blue-600 hover:underline">Coolangatta</Link>,{" "}
            <Link to="/roof-cleaning/southport" className="text-blue-600 hover:underline">Southport</Link>,{" "}
            <Link to="/roof-cleaning/nerang" className="text-blue-600 hover:underline">Nerang</Link>,{" "}
            <Link to="/roof-cleaning/mudgeeraba" className="text-blue-600 hover:underline">Mudgeeraba</Link>,{" "}
            <Link to="/roof-cleaning/elanora" className="text-blue-600 hover:underline">Elanora</Link>,{" "}
            <Link to="/roof-cleaning/tugun" className="text-blue-600 hover:underline">Tugun</Link>, and{" "}
            <Link to="/roof-cleaning/mermaid-waters" className="text-blue-600 hover:underline">Mermaid Waters</Link>.{" "}
            <a href="tel:0756512386" className="text-blue-600 hover:underline">Call us</a> to confirm coverage for your suburb.
          </p>
        </div>
      </section>

      <QuoteForm serviceName="Roof Cleaning" />

      <FAQ faqs={faqs} title="Roof Cleaning FAQ" />

      {/* Related Services */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/gutter-cleaning" className="block p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gutter Cleaning</h3>
              <p className="text-sm text-gray-600">Keep your gutters flowing freely with professional cleaning and maintenance.</p>
            </Link>
            <Link to="/solar-panel-cleaning" className="block p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Solar Panel Cleaning</h3>
              <p className="text-sm text-gray-600">Maintain solar panel efficiency with regular professional cleaning service.</p>
            </Link>
            <Link to="/window-cleaning" className="block p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Window Cleaning</h3>
              <p className="text-sm text-gray-600">Crystal-clear windows inside and out, streak-free results. Residential and commercial window cleaning across the Gold Coast.</p>
            </Link>
          </div>
        </div>
      </section>

      <SuburbLinks serviceSlug="roof-cleaning" serviceName="Roof Cleaning" />
    </div>);

}
