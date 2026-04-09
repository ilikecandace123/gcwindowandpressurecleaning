
import React from "react";
// Keep Hero for now, might be used elsewhere or removed if not needed.
import Benefits from "../components/Benefits";
import QuoteForm from "../components/QuoteForm";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import { Shield, Users, Star, Phone } from "lucide-react"; // Import necessary icons
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema } from "../data/schema";
import SuburbLinks from "../components/SuburbLinks";

export default function RoofCleaning() {
  const benefits = [
  {
    title: "Extends Roof Life",
    description: "Regular roof cleaning removes harmful growths and debris that cause deterioration, significantly extending your roof's lifespan."
  },
  {
    title: "Boosts Curb Appeal & Property Value",
    description: "A clean roof dramatically improves your home's appearance and can increase property value (Source: Real Estate Institute Australia - curb appeal studies). Regular maintenance prevents costly damage that could require expensive roof replacement."
  },
  {
    title: "Prevents Costly Damage",
    description: "Early removal of moss, lichen, and algae prevents permanent damage that could require expensive roof replacement."
  },
  {
    title: "Manufacturer-Recommended Process",
    description: "Our gentle cleaning methods follow manufacturer guidelines, maintaining warranty coverage while achieving superior results."
  },
  {
    title: "EPA Compliant Methods",
    description: "We use environmentally responsible cleaning solutions that are safe for your family, pets, and surrounding landscape."
  },
  {
    title: "Protects Paint & Surfaces",
    description: "Our low-pressure techniques clean effectively without damaging paint, tiles, or surface integrity."
  }];


  const faqs = [
  {
    question: "How often should I have my roof cleaned?",
    answer: "Most roofs benefit from professional cleaning every 2-3 years, or sooner if you notice moss, lichen, or dark streaks. Regular maintenance prevents permanent damage and extends roof life."
  },
  {
    question: "Will roof cleaning damage my roof or gutters?",
    answer: "Not when done correctly. Our gentle, low-pressure cleaning methods are manufacturer-approved and designed to clean effectively without causing damage to tiles, paint, or gutters."
  },
  {
    question: "Is roof cleaning worth the investment?",
    answer: "Absolutely. Roof cleaning costs a fraction of roof replacement and can extend your roof's life by years. It also improves curb appeal and can increase property value significantly."
  }];

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
    }
  ];

  return (
    <div>
      <PageSEO
        title="Professional Roof Cleaning Gold Coast | Moss & Lichen Removal"
        description="Expert roof cleaning on the Gold Coast. Manufacturer-recommended process removes moss, lichen, and algae. Fully insured, police-checked staff. Free quotes — call (07) 5651 2386."
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

            <h2 className="text-3xl font-bold leading-tight mb-4 text-gray-900">
              Professional Roof Cleaning on the Gold Coast
            </h2>
            
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
              Professional Roof Cleaning on the Gold Coast
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-blue-700 font-medium">
              Locally Owned & Operated | Fully Insured | Police Checked Staff
            </p>
            
            <p className="text-lg mb-8 text-gray-600 max-w-3xl leading-relaxed">
              Extend the life of your roof and boost curb appeal with our manufacturer-recommended cleaning process. Our EPA-compliant methods remove harmful grime, moss, lichen, and algae while protecting your roof's integrity and maintaining warranty coverage.
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

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pre-Treatment</h3>
              <p className="text-sm text-gray-600">Apply anti-microbial solutions to kill moss, lichen, and algae growth safely.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Gentle Scrubbing</h3>
              <p className="text-sm text-gray-600">Remove stubborn dirt, grime, and organic matter without damaging surfaces.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Low-Pressure Rinse</h3>
              <p className="text-sm text-gray-600">Thoroughly rinse with controlled pressure to reveal a like-new appearance.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Check</h3>
              <p className="text-sm text-gray-600">Final inspection and cleanup to ensure exceptional results.</p>
            </div>
          </div>
        </div>
      </section>

      <Benefits
        benefits={benefits}
        title="The Benefits of Professional Roof Cleaning" />


      <Testimonials />

      <QuoteForm serviceName="Roof Cleaning" />

      <FAQ faqs={faqs} title="Roof Cleaning FAQ" />
      <SuburbLinks serviceSlug="roof-cleaning" serviceName="Roof Cleaning" />
    </div>);

}
