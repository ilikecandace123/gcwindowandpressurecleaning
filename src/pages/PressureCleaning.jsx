
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
      { name: "Pressure Cleaning", url: "/pressure-cleaning" }
    ]),
    buildFAQSchema(faqs)
  ];


  return (
    <div>
      <PageSEO
        title="Pressure Cleaning Gold Coast | Driveways, Paths & Concrete"
        description="Professional pressure cleaning on the Gold Coast. Industrial-grade cleaning for driveways, paths, patios, and concrete surfaces. Fully insured. Call (07) 5651 2386."
        canonical="https://gcwindowandpressurecleaning.com.au/pressure-cleaning"
        jsonLd={seoJsonLd}
      />
      <section className="relative bg-white text-gray-800 overflow-hidden">
        {/* Desktop: Background image for overlay design */}
        <div className="absolute inset-0 opacity-100 hidden md:block">
          <picture>
            <source srcSet="/images/pressure-hero.webp" type="image/webp" />
            <img
              src="/images/pressure-hero.jpg"
              alt="Pressure cleaning removing oil stains and grime from a concrete driveway"
              className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" width="1536" height="1024" />
          </picture>
        </div>

        {/* Mobile: Image first, then text below */}
        <div className="block md:hidden">
          <div className="h-64">
            <picture>
              <source srcSet="/images/pressure-hero.webp" type="image/webp" />
              <img
                src="/images/pressure-hero.jpg"
                alt="Pressure cleaning removing oil stains and grime from a concrete driveway"
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
              Professional Pressure Cleaning on the Gold Coast
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
                Get Free Pressure Cleaning Quote
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
              Professional Pressure Cleaning on the Gold Coast
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-blue-700 font-medium">
              Locally Owned & Operated | Fully Insured | Police Checked Staff
            </p>
            
            <p className="text-lg mb-8 text-gray-600 max-w-3xl leading-relaxed">
              Industrial-grade pressure cleaning for concrete, driveways, walkways, and patios. Our deep cleaning removes years of grime, mould, and stains that regular cleaning can't touch, restoring surfaces to like-new condition.
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
                Get Free Pressure Cleaning Quote
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

      <FAQ faqs={faqs} title="Pressure Cleaning FAQ" />

      {/* Related Services */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/house-soft-wash" className="block p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">House Softwash</h3>
              <p className="text-sm text-gray-600">Gentle, effective cleaning that protects your home's exterior while removing dirt and stains.</p>
            </Link>
            <Link to="/patio-cleaning" className="block p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Patio Cleaning</h3>
              <p className="text-sm text-gray-600">Professional patio and outdoor space cleaning for entertainment areas.</p>
            </Link>
          </div>
        </div>
      </section>

      <SuburbLinks serviceSlug="pressure-cleaning" serviceName="Pressure Cleaning" />
    </div>);

}
