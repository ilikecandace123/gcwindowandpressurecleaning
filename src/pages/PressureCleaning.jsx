
import React from "react";
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

// Import icons needed for the new hero section (assuming lucide-react or similar)
import { Shield, Users, Star, Phone } from 'lucide-react';

export default function PressureCleaning() {
  const benefits = [
  {
    title: "Industrial-Grade Deep Cleaning",
    description: "Our commercial-grade equipment removes years of built-up dirt, grime, oil stains, and organic growth that regular cleaning can't touch."
  },
  {
    title: "Long-Lasting Results",
    description: "Professional pressure cleaning provides superior results that last significantly longer than DIY attempts or surface-level cleaning."
  },
  {
    title: "Removes Deep Grime & Mould",
    description: "Eliminate stubborn mould, mildew, algae, and organic stains that compromise both appearance and safety of hard surfaces."
  },
  {
    title: "Improves Safety",
    description: "Remove slippery mould, algae, and oil that create slip hazards on driveways, walkways, and outdoor surfaces."
  },
  {
    title: "Restores Original Appearance",
    description: "Bring concrete, pavers, and stone surfaces back to their original condition, dramatically improving curb appeal."
  },
  {
    title: "Protects Surface Longevity",
    description: "Regular professional cleaning prevents permanent staining and deterioration, extending the life of your hard surfaces (Source: American Concrete Institute - maintenance guidelines)."
  }];


  const faqs = [
  {
    question: "How much does pressure cleaning cost on the Gold Coast?",
    answer: "Pressure cleaning on the Gold Coast starts at around $220 for an average driveway, $440 for a medium driveway, and $660+ for an XL driveway. A full home clean covering the driveway, pathways, patio, and pool area is typically around $660. These are guide prices — every property is individual, so contact us for a free, no-obligation quote."
  },
  {
    question: "What surfaces can you pressure clean?",
    answer: "We clean concrete driveways, walkways, patios, pool areas, retaining walls, brick surfaces, stone pavers, and most hard outdoor surfaces. We adjust pressure and techniques for each material."
  },
  {
    question: "Will pressure cleaning damage my surfaces?",
    answer: "Not when done correctly. Our experienced team uses appropriate pressure settings and techniques for each surface type. We avoid damage while achieving superior cleaning results."
  },
  {
    question: "How often should concrete surfaces be pressure cleaned?",
    answer: "Most concrete surfaces benefit from professional pressure cleaning every 1-2 years, or sooner if you notice staining, mould, or slip hazards developing."
  },
  {
    question: "Can you remove oil stains from driveways?",
    answer: "Yes, we have specialised equipment and treatments for oil stains, rust stains, and other stubborn marks. While some very old stains may not come out completely, we achieve excellent results."
  },
  {
    question: "Do you clean up the mess afterward?",
    answer: "Absolutely. We contain runoff, clean up debris, and leave your property neat and tidy. We're also mindful of landscaping and protect plants during the cleaning process."
  }];

  const seoJsonLd = [
    buildLocalBusinessSchema(),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Pressure Cleaning",
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Gold Coast Window and Pressure Cleaning",
        "telephone": "(07) 5651 2386",
        "url": "https://gcwindowandpressurecleaning.com.au"
      },
      "areaServed": { "@type": "City", "name": "Gold Coast", "addressRegion": "QLD", "addressCountry": "AU" },
      "description": "Industrial-grade pressure cleaning for driveways, paths, patios, and concrete on the Gold Coast."
    },
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Pressure Cleaning", url: "/pressure-cleaning/" }
    ]),
    buildFAQSchema(faqs)
  ];


  return (
    <div>
      <PageSEO
        title="Pressure Cleaning Gold Coast | Driveways & Paths"
        description="Gold Coast pressure cleaning specialists — industrial-grade cleaning for driveways, concrete, paths and patios. Fully insured. Free quote: (07) 5651 2386."
        canonical="https://gcwindowandpressurecleaning.com.au/pressure-cleaning/"
        image="/images/pressure-hero.jpg"
        jsonLd={seoJsonLd}
      />
      <QuoteHero
        headline={'Professional Pressure Cleaning on the Gold Coast'}
        subheading={'Driveways, paths & patios restored — never damaged.'}
        backgroundImage={'/images/pressure-hero.jpg'}
      />

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Local Pressure Cleaning Professionals
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're a locally owned and operated business committed to transparent, friendly communication. 
                All our staff are police-checked for your peace of mind, and we're fully insured for complete protection.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                As registered NDIS & Aged Care providers, we understand the importance of safety and reliability. 
                We keep you informed throughout the process and ensure your outdoor spaces are clean and safe.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Industrial-grade commercial equipment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Specialised treatments for oil and stubborn stains</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Surface-appropriate pressure settings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">No job too big or small</span>
                </div>
              </div>
            </div>
            <div>
              <picture>
                <source srcSet="/images/pressure-secondary.webp" type="image/webp" />
                <img
                  src="/images/pressure-secondary.jpg"
                  alt="Pressure cleaning service team demonstrating concrete surface restoration"
                  className="rounded-2xl shadow-lg"
                  loading="lazy" decoding="async" width="1024" height="682" />
              </picture>

            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Professional Pressure Cleaning Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our industrial-grade pressure cleaning removes deep-set grime, oil stains, mould, and organic growth 
              from concrete, pavers, and hard surfaces that regular cleaning simply can't handle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Driveways & Concrete</h3>
              <p className="text-gray-600 mb-4">
                Remove oil stains, tyre marks, and years of built-up grime to restore your driveway's appearance.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Oil stain removal</li>
                <li>• Tyre mark elimination</li>
                <li>• Mould and algae treatment</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-green-600">Walkways & Paths</h3>
              <p className="text-gray-600 mb-4">
                Make walkways safe and attractive by removing slip-hazard mould and restoring original appearance.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Safety hazard removal</li>
                <li>• Non-slip surface restoration</li>
                <li>• Weather stain elimination</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">Patios & Outdoor Areas</h3>
              <p className="text-gray-600 mb-4">
                Transform outdoor entertainment areas by removing stains and organic growth for a fresh, clean look.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Entertainment area cleaning</li>
                <li>• Paver restoration</li>
                <li>• Pool area treatment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Benefits
        benefits={benefits}
        title="Why Choose Professional Pressure Cleaning?" />


      <GoogleReviews />

      <QuoteForm serviceName="Pressure Cleaning" />

      <FAQ faqs={faqs} title="Pressure Cleaning FAQ" guideLink={{ label: "Guide: How much does driveway pressure cleaning cost on the Gold Coast?", href: "/guides/driveway-pressure-cleaning-cost/" }} />

      {/* Related Services */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/house-softwash/" className="block p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">House Softwash</h3>
              <p className="text-sm text-gray-600">Gentle, effective cleaning that protects your home's exterior while removing dirt and stains.</p>
            </Link>
            <Link to="/patio-cleaning/" className="block p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Patio Cleaning</h3>
              <p className="text-sm text-gray-600">Professional patio and outdoor space cleaning for entertainment areas.</p>
            </Link>
          </div>
        </div>
      </section>

      <SuburbLinks serviceSlug="pressure-cleaning" serviceName="Pressure Cleaning" />
    </div>);

}
