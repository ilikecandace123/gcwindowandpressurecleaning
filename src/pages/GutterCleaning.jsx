
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Benefits from "../components/Benefits";
import QuoteForm from "../components/QuoteForm";
import FAQ from "../components/FAQ";
import GoogleReviews from "../components/GoogleReviews";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema } from "../data/schema";
import SuburbLinks from "../components/SuburbLinks";
import { Shield, Users, Star, Phone } from "lucide-react";

export default function GutterCleaning() {
  const benefits = [
  {
    title: "Prevents Water Damage",
    description: "Clogged gutters can cause water to overflow and damage foundations, walls, and landscaping. Regular cleaning prevents costly water damage."
  },
  {
    title: "Storm Ready Protection",
    description: "Clean gutters handle heavy rainfall effectively, protecting your property during severe weather events and storms."
  },
  {
    title: "Prevents Pest Infestations",
    description: "Standing water and debris in gutters attract mosquitoes, rodents, and other pests. Clean gutters eliminate breeding grounds."
  },
  {
    title: "Extends Gutter Lifespan",
    description: "Regular maintenance prevents rust, corrosion, and structural damage, significantly extending your gutter system's life."
  },
  {
    title: "Protects Roof Integrity",
    description: "Proper water flow prevents ice dams, roof damage, and structural issues that can be extremely expensive to repair."
  },
  {
    title: "Complete Maintenance Service",
    description: "We clear blockages, check for damage, ensure proper drainage, and make minor repairs to keep systems functioning optimally."
  }];


  const faqs = [
  {
    question: "How often should gutters be cleaned?",
    answer: "Most homes need gutter cleaning twice per year - once in late spring and once in autumn. Properties with many trees may require more frequent cleaning to prevent blockages."
  },
  {
    question: "What happens if gutters aren't cleaned regularly?",
    answer: "Blocked gutters can cause water overflow, leading to foundation damage, roof leaks, fascia board rot, and landscape erosion. The repair costs far exceed regular maintenance (Source: National Association of Home Builders - water damage prevention studies)."
  },
  {
    question: "Is gutter cleaning dangerous to do myself?",
    answer: "Yes, ladder work is inherently dangerous, especially when handling debris and water. Professional cleaners have proper equipment, insurance, and training for safe completion."
  },
  {
    question: "Do you clean downpipes and drains too?",
    answer: "Absolutely. We clear all downpipes, check drainage outlets, and ensure water flows freely through the entire system from gutters to ground drainage."
  }];

  const seoJsonLd = [
    buildLocalBusinessSchema(),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Gutter Cleaning",
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Gold Coast Window and Pressure Cleaning",
        "telephone": "(07) 5651 2386",
        "url": "https://gcwindowandpressurecleaning.com.au"
      },
      "areaServed": { "@type": "City", "name": "Gold Coast", "addressRegion": "QLD", "addressCountry": "AU" },
      "description": "Complete gutter cleaning and maintenance on the Gold Coast. Prevent water damage and keep your property storm-ready."
    }
  ];


  return (
    <div>
      <PageSEO
        title="Gutter Cleaning Gold Coast | Storm-Ready Maintenance"
        description="Professional gutter cleaning on the Gold Coast. Complete gutter and downpipe clearing to prevent water damage. Fully insured, police-checked staff. Call (07) 5651 2386."
        canonical="https://gcwindowandpressurecleaning.com.au/gutter-cleaning"
        jsonLd={seoJsonLd}
      />
      <section className="relative bg-white text-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-100 hidden md:block">
          <picture>
            <source srcSet="/images/gutter-screenshot.webp" type="image/webp" />
            <img
              src="/images/gutter-screenshot.jpg"
              alt="Professional gutter cleaning removing leaves and debris from roof gutters"
              className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" width="1024" height="520" />
          </picture>

        </div>

        {/* Mobile: Image first, then text below */}
        <div className="block md:hidden">
          <div className="h-64">
            <picture>
              <source srcSet="/images/gutter-screenshot.webp" type="image/webp" />
              <img
                src="/images/gutter-screenshot.jpg"
                alt="Professional gutter cleaning removing leaves and debris from roof gutters"
                className="w-full h-full object-cover" loading="lazy" decoding="async" width="1024" height="520" />
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
              Expert Gutter Cleaning on the Gold Coast
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
                Get Free Gutter Quote
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
              Expert Gutter Cleaning on the Gold Coast
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-blue-700 font-medium">
              Locally Owned & Operated | Fully Insured | Police Checked Staff
            </p>
            
            <p className="text-lg mb-8 text-gray-600 max-w-3xl leading-relaxed">
              Complete gutter cleaning and maintenance to prevent water damage and keep your property storm-ready. Our thorough service includes clearing blockages, checking drainage, and ensuring your gutter system functions perfectly year-round.
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
                Get Free Gutter Quote
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
                Your Trusted Local Gutter Maintenance Experts
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're a locally owned and operated business committed to keeping your property protected. All our staff 
                are police-checked for your peace of mind, and we're fully insured for complete protection.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                As registered NDIS & Aged Care providers, we understand the importance of clear communication and reliable service. 
                We keep you informed throughout the process and ensure your property is storm-ready.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Complete blockage removal and drainage check</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Heights trained staff</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Storm preparation and weather protection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Safe, professional ladder work</span>
                </div>
              </div>
            </div>
            <div>
              <picture>
                <source srcSet="/images/gutter-secondary.webp" type="image/webp" />
                <img
                  src="/images/gutter-secondary.jpg"
                  alt="Clean residential gutters with proper drainage system installed"
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
              Comprehensive Gutter Cleaning & Maintenance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our thorough gutter cleaning service removes all debris, clears downpipes, checks for damage, 
              and ensures proper water flow to keep your property protected.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Debris Removal</h3>
              <p className="text-gray-600">
                We remove all leaves, twigs, dirt, and debris from gutters and downpipes, ensuring complete blockage clearance.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Drainage Testing</h3>
              <p className="text-gray-600">
                We test water flow through the entire system, ensuring proper drainage and identifying any issues.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Inspection</h3>
              <p className="text-gray-600">We inspect for damage, loose brackets, or wear, and let you know if we find anything

              </p>
            </div>
          </div>
        </div>
      </section>

      <Benefits
        benefits={benefits}
        title="Why Regular Gutter Cleaning is Essential" />


      <GoogleReviews />

      <QuoteForm serviceName="Gutter Cleaning" />

      <FAQ faqs={faqs} title="Gutter Cleaning FAQ" />

      <SuburbLinks serviceSlug="gutter-cleaning" serviceName="Gutter Cleaning" />
    </div>);

}
