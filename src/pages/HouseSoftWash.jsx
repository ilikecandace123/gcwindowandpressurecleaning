
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema } from "../data/schema";
import SuburbLinks from "../components/SuburbLinks";
import Benefits from "../components/Benefits";
import QuoteForm from "../components/QuoteForm";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import { Shield, Users, Star, Phone } from 'lucide-react'; // Import necessary icons

export default function HouseSoftWash() {
  const benefits = [
  {
    title: "Safe for All Surfaces",
    description: "Our gentle softwash technique safely cleans delicate surfaces like painted walls, render, and weatherboard without damage."
  },
  {
    title: "Complete Mould & Dirt Removal",
    description: "Specialised treatments eliminate mould, mildew, dirt, and organic stains at their source for long-lasting results."
  },
  {
    title: "Removes Spider Webs & Wasp Nests",
    description: "Comprehensive cleaning includes removal of spider webs, wasp nests, and other pest-related issues around your property."
  },
  {
    title: "Boosts Curb Appeal",
    description: "Transform your property's appearance with professional cleaning that makes your home look fresh and well-maintained."
  },
  {
    title: "Long-Lasting Results",
    description: "Our thorough cleaning process and treatments provide results that last significantly longer than pressure washing alone."
  },
  {
    title: "Eco-Friendly Solutions",
    description: "We use environmentally responsible cleaning products that are safe for your family, pets, and landscaping."
  }];


  const faqs = [
  {
    question: "What's the difference between softwash and pressure washing?",
    answer: "Softwashing uses low pressure with specialised cleaning solutions to kill mould and dirt at source, while pressure washing relies on high pressure alone. Softwashing is safer for surfaces and provides longer-lasting results."
  },
  {
    question: "Is softwashing safe for painted surfaces?",
    answer: "Yes, softwashing is specifically designed to be safe for painted surfaces, render, vinyl weatherboard, and other delicate materials. It won't damage paint or cause surface erosion like high-pressure washing can."
  },
  {
    question: "How long do softwash results last?",
    answer: "Softwash results typically last 4-6 times longer than pressure washing alone (Source: International Softwash Association - comparative testing) because we kill the organisms causing stains rather than just blasting them away. Most properties stay clean for 2-3 years."
  },
  {
    question: "Will you clean around windows and delicate plants?",
    answer: "Absolutely. We take special care around windows, plants, and delicate areas. Our solutions are plant-safe, and we pre-wet and protect sensitive vegetation as needed."
  },
  {
    question: "Do you handle commercial buildings too?",
    answer: "Yes, we provide softwashing services for both residential homes and commercial buildings. Our methods are perfect for office buildings, retail spaces, and multi-story properties."
  }];

  const seoJsonLd = [
    buildLocalBusinessSchema(),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "House Softwash",
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Gold Coast Window and Pressure Cleaning",
        "telephone": "(07) 5651 2386",
        "url": "https://gcwindowandpressurecleaning.com.au"
      },
      "areaServed": { "@type": "City", "name": "Gold Coast", "addressRegion": "QLD", "addressCountry": "AU" },
      "description": "Gentle house softwash cleaning on the Gold Coast. Safely removes mould, dirt, and grime without damaging surfaces."
    }
  ];


  return (
    <div>
      <PageSEO
        title="House Softwash Gold Coast | Gentle Mould & Grime Removal"
        description="Professional house softwash on the Gold Coast. Gentle, surface-safe cleaning removes mould, dirt, spider webs, and grime. Fully insured. Call (07) 5651 2386 for a free quote."
        canonical="https://gcwindowandpressurecleaning.com.au/house-softwash"
        jsonLd={seoJsonLd}
      />
      <section className="relative bg-white text-gray-800 overflow-hidden">
        {/* Desktop: Background image only */}
        <div className="absolute inset-0 opacity-100 hidden md:block">
          <picture>
            <source srcSet="/images/softwash-unsplash.webp" type="image/webp" />
            <img
              src="/images/softwash-unsplash.jpg"
              alt="Softwash cleaning removing mould from house exterior on the Gold Coast"
              className="w-full h-full object-contain" loading="eager" decoding="async" fetchPriority="high" width="1920" height="1280" />
          </picture>
        </div>

        {/* Mobile: Image first, then text below */}
        <div className="block md:hidden">
          <div className="h-64">
            <picture>
              <source srcSet="/images/softwash-unsplash.webp" type="image/webp" />
              <img
                src="/images/softwash-unsplash.jpg"
                alt="Softwash cleaning removing mould from house exterior on the Gold Coast"
                className="w-full h-full object-cover" loading="lazy" decoding="async" width="1920" height="1280" />
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
              Professional House & Building Washing on the Gold Coast
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
              Professional House & Building Washing on the Gold Coast
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-blue-700 font-medium">
              Locally Owned & Operated | Fully Insured | Police Checked Staff
            </p>
            
            <p className="text-lg mb-8 text-gray-600 max-w-3xl leading-relaxed hidden md:block">
              Gentle, surface-safe cleaning that removes mould, dirt, spider webs, and wasp nests without damage. Our specialized softwash process provides superior, long-lasting results while protecting your property's surfaces and landscaping.
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
              <img
                src="/images/softwash-secondary.jpg"
                alt="Softwash cleaning removing mould and dirt from rendered house walls on the Gold Coast"
                loading="lazy"
                className="rounded-2xl shadow-lg" decoding="async" width="1024" height="683" />

            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Local House Washing Specialists
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're a trusted local business committed to transparent, friendly communication. All staff are 
                police-checked for your complete peace of mind, and we're fully insured for liability and damages.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We proudly serve NDIS & Aged Care clients and keep you updated every step of the way. 
                Our commitment to honest communication means no surprises – just professional results you can trust.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Gentle, surface-safe cleaning technology</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Comprehensive mould and organic stain removal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Spider web and wasp nest removal included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Eco-friendly solutions</span>
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
              Our Advanced Softwash Cleaning Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlike high-pressure washing, our softwash system uses specialised cleaning solutions and low pressure 
              to kill mould, mildew, and dirt at their source while protecting your property's surfaces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Surface Assessment</h3>
              <p className="text-sm text-gray-600">Evaluate surfaces and identify specific cleaning needs and delicate areas.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pre-Treatment</h3>
              <p className="text-sm text-gray-600">Apply specialised solutions to kill mould, mildew, and organic growth.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Gentle Cleaning</h3>
              <p className="text-sm text-gray-600">Low-pressure cleaning removes dirt and debris without surface damage.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Final Rinse</h3>
              <p className="text-sm text-gray-600">Thorough rinse reveals clean surfaces and long-lasting results.</p>
            </div>
          </div>
        </div>
      </section>

      <Benefits
        benefits={benefits}
        title="Why Choose Professional Softwashing?" />


      <Testimonials />

      <QuoteForm serviceName="House & Building Softwash" />

      <FAQ faqs={faqs} title="House Softwash FAQ" />

      <SuburbLinks serviceSlug="house-softwash" serviceName="House Softwash" />
    </div>);

}
