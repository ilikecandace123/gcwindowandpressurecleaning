
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Benefits from "../components/Benefits";
import QuoteForm from "../components/QuoteForm";
import FAQ from "../components/FAQ";
import GoogleReviews from "../components/GoogleReviews";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "../data/schema";
import SuburbLinks from "../components/SuburbLinks";

import { Shield, Users, Star, Phone } from "lucide-react";

const HERO_IMAGE = "/images/bird-proofing-hero.jpg";
const SECONDARY_IMAGE = "/images/bird-proofing-secondary.jpg";

export default function BirdProofing() {
  const benefits = [
    {
      title: "Protects Your Solar Panels",
      description: "Pigeons and mynas love nesting under solar panels. Our purpose-made mesh stops birds getting underneath — protecting panels, wiring and your energy output."
    },
    {
      title: "Restores Energy Output",
      description: "Bird droppings and nesting debris reduce solar panel efficiency significantly (Source: Australian Solar Council - solar panel damage assessment). Mesh keeps panels clean and performing at their best."
    },
    {
      title: "Warranty-Safe Installation",
      description: "We use panel clips instead of screws or bolts, so your solar panel and inverter warranties stay fully intact."
    },
    {
      title: "Marine-Grade Materials",
      description: "Our galvanised steel mesh is UV stable and rust resistant — built to last 10+ years in Gold Coast coastal conditions."
    },
    {
      title: "Humane & Effective",
      description: "Our exclusion-only mesh doesn't harm birds. It simply stops them getting underneath your panels so they nest elsewhere."
    },
    {
      title: "Health & Hygiene",
      description: "Bird droppings and nests under panels harbour mites, lice and harmful bacteria. Solar panel mesh keeps your roof clean and healthy."
    }
  ];

  const faqs = [
    {
      question: "Why do I need bird proofing for my solar panels?",
      answer: "The gap beneath solar panels is the perfect nesting spot for pigeons and mynas. Nests damage wiring and leave acidic droppings all over your panels, dropping output significantly. Solar panel mesh stops the problem permanently and protects your investment."
    },
    {
      question: "Will the mesh void my solar panel warranty?",
      answer: "No. We use purpose-built aluminium clips that attach to the panel frame — there is no drilling, screwing or bolting into your panels. Your panel and inverter warranties stay fully intact."
    },
    {
      question: "What birds cause problems on the Gold Coast?",
      answer: "Feral pigeons and common (Indian) mynas are the biggest culprits. Both love nesting under solar panels on Gold Coast rooftops, which is why mesh proofing is so effective."
    },
    {
      question: "How long does solar panel mesh last?",
      answer: "Our marine-grade galvanised steel mesh is rated for 10+ years, even in coastal Gold Coast conditions. It's UV stable, rust resistant and designed to withstand salt air."
    },
    {
      question: "Do you clean up before installing?",
      answer: "Yes. Every bird proofing job starts with removing nests, droppings and debris from under the panels, then disinfecting the area before the mesh goes on. You can add solar panel cleaning to the same visit for a fully restored system."
    },
    {
      question: "Is solar panel bird proofing humane?",
      answer: "Absolutely. Our mesh is exclusion only — we never harm birds. It simply stops them getting underneath your panels so they move on and nest elsewhere."
    }
  ];

  const seoJsonLd = [
    buildLocalBusinessSchema(),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Solar Panel Bird Proofing",
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Gold Coast Window and Pressure Cleaning",
        "telephone": "(07) 5651 2386",
        "url": "https://gcwindowandpressurecleaning.com.au"
      },
      "areaServed": { "@type": "City", "name": "Gold Coast", "addressRegion": "QLD", "addressCountry": "AU" },
      "description": "Professional solar panel bird proofing mesh on the Gold Coast. Warranty-safe installation that stops pigeons and mynas nesting under your panels. Fully insured."
    },
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Bird Proofing", url: "/bird-proofing" }
    ])
  ];

  return (
    <div>
      <PageSEO
        title="Solar Panel Bird Proofing Gold Coast | Pigeon Mesh Installation"
        description="Professional solar panel bird proofing mesh on the Gold Coast. Stops pigeons and mynas nesting under your panels. Warranty-safe installation. Fully insured. Call (07) 5651 2386."
        canonical="https://gcwindowandpressurecleaning.com.au/bird-proofing"
        jsonLd={seoJsonLd}
      />

      <section className="relative bg-white text-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-100 hidden md:block">
          <picture>
            <source srcSet="/images/bird-proofing-hero.webp" type="image/webp" />
            <img
              src={HERO_IMAGE}
              alt="Professional bird proofing mesh installed around rooftop solar panels"
              className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
          </picture>
        </div>

        {/* Mobile: Image first, then text below */}
        <div className="block md:hidden">
          <div className="h-64">
            <picture>
              <source srcSet="/images/bird-proofing-hero.webp" type="image/webp" />
              <img
                src={HERO_IMAGE}
                alt="Professional bird proofing mesh installed around rooftop solar panels"
                className="w-full h-full object-cover" loading="lazy" decoding="async" width="1536" height="1024" />
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
              Solar Panel Bird Proofing on the Gold Coast
            </h1>

            <p className="text-lg mb-4 text-blue-700 font-medium">
              Solar Panel Mesh • Warranty Safe • Marine Grade
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
                Get Free Bird Proofing Quote
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
          <div className="max-w-4xl bg-white/60 backdrop-blur-sm rounded-lg p-8">
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
              Solar Panel Bird Proofing on the Gold Coast
            </h1>

            <p className="text-xl md:text-2xl mb-4 text-blue-700 font-medium">
              Solar Panel Mesh • Warranty Safe • Marine Grade Installation
            </p>

            <p className="text-lg mb-8 text-gray-600 max-w-3xl leading-relaxed">
              Pigeons and mynas love nesting under solar panels — and the mess, damage and lost energy output that follows costs Gold Coast homeowners thousands every year (Source: Australian Solar Council). Our marine-grade bird proof mesh stops the problem permanently, without voiding your solar warranty. Trusted by 2500+ happy customers.
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
                Get Free Bird Proofing Quote
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
                Solar Panel Bird Proofing That Lasts
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We specialise in permanent, humane solar panel bird proofing for Gold Coast homes and businesses.
                Pigeons and mynas love the sheltered space under your panels — and the mess, wiring damage and lost energy output
                that follows is a headache nobody needs. Our marine-grade steel mesh seals that gap for good.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Every installation is warranty-safe (no drilling into your panels) and backed by our workmanship guarantee.
                We also clean and disinfect the area under the panels first, so you're left with a fresh, protected solar system.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Marine-grade galvanised steel mesh</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Warranty-safe panel clip installation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Humane, exclusion-only solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Workmanship guarantee</span>
                </div>
              </div>
            </div>
            <div>
              <picture>
                <source srcSet="/images/bird-proofing-secondary.webp" type="image/webp" />
                <img
                  src={SECONDARY_IMAGE}
                  alt="Pigeon nesting beneath rooftop solar panels showing why bird proofing is needed"
                  className="rounded-2xl shadow-lg"
                  loading="lazy" decoding="async" width="980" height="400" />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Solar Panel Bird Proofing Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven four-step process that delivers permanent, humane protection for your solar system.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Inspection</h3>
              <p className="text-gray-600">
                Full solar array assessment. Identify bird activity, entry points and any existing damage under the panels.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Clean & Disinfect</h3>
              <p className="text-gray-600">
                Remove existing nests, droppings and debris from under the panels. Disinfect the area before mesh goes on.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Install Mesh</h3>
              <p className="text-gray-600">
                Fit marine-grade galvanised steel mesh around the entire solar array using warranty-safe panel clips.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Guarantee</h3>
              <p className="text-gray-600">
                Final check for full coverage with no gaps. Backed by our long-term workmanship guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Benefits
        benefits={benefits}
        title="Why Solar Panel Bird Proofing Pays For Itself"
      />

      <GoogleReviews />

      <QuoteForm serviceName="Solar Panel Bird Proofing" />

      <FAQ faqs={faqs} title="Solar Panel Bird Proofing FAQ" />

      <SuburbLinks serviceSlug="bird-proofing" serviceName="Bird Proofing" />
    </div>
  );
}
