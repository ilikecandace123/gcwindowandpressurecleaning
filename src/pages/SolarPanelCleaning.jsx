
import React from "react";
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
      title: "Boost Efficiency by 30%",
      description: "Clean panels can produce up to 30% more energy than dirty panels (Source: Clean Energy Council), directly impacting your electricity savings and ROI."
    },
    {
      title: "Protect Your Investment",
      description: "Regular cleaning prevents permanent damage from dirt, bird droppings, and debris that can reduce panel lifespan."
    },
    {
      title: "Maximise Energy Savings",
      description: "Clean panels mean maximum energy production, which translates to bigger savings on your electricity bills."
    },
    {
      title: "Maintain Warranty Coverage",
      description: "Many manufacturers require regular professional maintenance to keep warranties valid."
    },
    {
      title: "Prevent Costly Repairs",
      description: "Regular cleaning identifies potential issues early, preventing expensive repairs or replacements."
    },
    {
      title: "Eco-Friendly Service",
      description: "We use eco-friendly cleaning methods that are safe for your roof, garden, and the environment."
    }
  ];

  const faqs = [
    {
      question: "How often should solar panels be cleaned?",
      answer: "We recommend cleaning solar panels every 6-12 months, or more frequently if you live in dusty areas, near trees, or experience bird activity. Regular cleaning maintains optimal energy production."
    },
    {
      question: "Will dirty solar panels really affect my energy production?",
      answer: "Yes, significantly. Studies show dirty panels can lose 15-30% of their efficiency (Source: Solar Energy International). With the average home solar system, this could mean hundreds of dollars in lost savings annually."
    },
    {
      question: "Is it safe to clean solar panels myself?",
      answer: "We don't recommend DIY solar panel cleaning due to safety risks, potential damage to panels, and voided warranties. Our trained professionals use specialised equipment and techniques."
    },
    {
      question: "Do you provide before and after photos?",
      answer: "Absolutely! We document the condition of your panels before and after cleaning, so you can see the difference our service makes to your solar investment."
    },
    {
      question: "What if it rains after cleaning?",
      answer: "Rain actually helps keep panels clean longer after our service. We time our cleanings appropriately and offers re-cleaning if heavy storms occur within 48 hours of service."
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
        "telephone": "(07) 5651 2386",
        "url": "https://gcwindowandpressurecleaning.com.au"
      },
      "areaServed": { "@type": "City", "name": "Gold Coast", "addressRegion": "QLD", "addressCountry": "AU" },
      "description": "Professional solar panel cleaning on the Gold Coast. Boost energy output by up to 30% with safe, eco-friendly cleaning."
    },
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Solar Panel Cleaning", url: "/solar-panel-cleaning" }
    ]),
    buildFAQSchema(faqs)
  ];

  return (
    <div>
      <PageSEO
        title="Solar Panel Cleaning Gold Coast | Boost Energy Output"
        description="Professional solar panel cleaning on the Gold Coast. Boost energy output by up to 30% with our eco-friendly cleaning process. Fully insured. Call (07) 5651 2386."
        canonical="https://gcwindowandpressurecleaning.com.au/solar-panel-cleaning"
        jsonLd={seoJsonLd}
      />
      <section className="relative bg-white text-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-100 hidden md:block">
          <picture>
            <source srcSet="/images/solar-panel-hero.webp" type="image/webp" />
            <img
              src="/images/solar-panel-hero.jpg"
              alt="Solar panels on residential roof being cleaned by professionals"
              className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" width="1920" height="1920" />
          </picture>
        </div>

        {/* Mobile: Image first, then text below */}
        <div className="block md:hidden">
          <div className="h-64">
            <picture>
              <source srcSet="/images/solar-panel-hero.webp" type="image/webp" />
              <img
                src="/images/solar-panel-hero.jpg"
                alt="Solar panels on residential roof being cleaned by professionals"
                className="w-full h-full object-cover" loading="lazy" decoding="async" width="1920" height="1920" />
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
              Expert Solar Panel Cleaning on the Gold Coast
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
                Get Free Solar Quote
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
              Expert Solar Panel Cleaning on the Gold Coast
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-blue-700 font-medium">
              Locally Owned & Operated | Fully Insured | Police Checked Staff
            </p>
            
            <p className="text-lg mb-8 text-gray-600 max-w-3xl leading-relaxed">
              Boost your solar panel efficiency by up to 30% (Source: Clean Energy Council) with our professional cleaning service. Our eco-friendly process protects your investment while maximising energy production and savings. Trusted by 2500+ happy customers across Brisbane, Gold Coast, and Sunshine Coast.
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
                Get Free Solar Quote
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Local Solar Cleaning Professionals
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're a locally owned and operated business committed to transparent, friendly communication. 
                All our staff are police-checked for your peace of mind, and we're fully insured for liability and damages.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We keep you updated every step of the way. 
                Our honest, clear communication means no surprises – just professional service you can trust.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Police-checked, insured professionals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Clear communication throughout the process</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Supporting local communities</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/images/solar-panel-dirty-vs-clean.webp"
                alt="Professional solar panel cleaning team on roof"
                className="rounded-2xl shadow-lg"
                loading="lazy" decoding="async" width="1936" height="1936" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Professional Solar Panel Cleaning Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our specialised cleaning process is designed to maximise your solar panel efficiency while protecting your investment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Inspection & Assessment</h3>
              <p className="text-gray-600">
                We thoroughly inspect your panels for damage, hotspots, and areas needing special attention before cleaning begins.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Eco-Friendly Cleaning</h3>
              <p className="text-gray-600">
                Using purified water and gentle techniques, we remove all dirt, debris, and buildup without damaging panels or voiding warranties.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Check & Report</h3>
              <p className="text-gray-600">
                We provide before/after photos and a detailed report on panel condition, ensuring you see the value of our service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Benefits 
        benefits={benefits} 
        title="Why Professional Solar Panel Cleaning Pays for Itself"
      />

      <GoogleReviews />

      <QuoteForm serviceName="Solar Panel Cleaning" />

      <FAQ faqs={faqs} title="Solar Panel Cleaning FAQ" />

      {/* Related Services */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/bird-proofing" className="block p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bird Proofing</h3>
              <p className="text-sm text-gray-600">Protect your solar panels and roof from bird damage with professional bird proofing.</p>
            </Link>
            <Link to="/roof-cleaning" className="block p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Roof Cleaning</h3>
              <p className="text-sm text-gray-600">Professional roof cleaning to extend your roof's life and boost curb appeal.</p>
            </Link>
          </div>
        </div>
      </section>

      <SuburbLinks serviceSlug="solar-panel-cleaning" serviceName="Solar Panel Cleaning" />
    </div>
  );
}
