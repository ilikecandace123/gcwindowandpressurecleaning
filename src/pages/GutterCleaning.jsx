
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
    question: "How much does gutter cleaning cost on the Gold Coast?",
    answer: "Gutter cleaning on the Gold Coast is $275–$385 for a single-storey home (up to 2, 3 or 4 bedrooms) and $440–$660 for a double-storey home (3 to 5 bedrooms), with downpipes flushed and checked as part of the job. Gutters that are packed full add 10% and gutters with plants growing out of them add 20%. Gutter guard, very steep roofs and larger or commercial buildings are quoted after a look. These are the same prices our instant quote tool uses, so you can see your exact figure online in about two minutes."
  },
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
        "telephone": "(07) 5230 8293",
        "url": "https://gcwindowandpressurecleaning.com.au"
      },
      "areaServed": { "@type": "City", "name": "Gold Coast", "addressRegion": "QLD", "addressCountry": "AU" },
      "description": "Complete gutter cleaning and maintenance on the Gold Coast. Prevent water damage and keep your property storm-ready."
    },
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Gutter Cleaning", url: "/gutter-cleaning/" }
    ]),
    buildFAQSchema(faqs)
  ];


  return (
    <div>
      <PageSEO
        title="Gutter Cleaning Gold Coast | Storm-Ready Maintenance"
        description="Gutter cleaning on the Gold Coast — full gutter and downpipe clearing with inspection and written report. Fully insured. Free quote: (07) 5230 8293."
        canonical="https://gcwindowandpressurecleaning.com.au/gutter-cleaning/"
        image="/images/gutter-1.jpg"
        jsonLd={seoJsonLd}
      />
      <QuoteHero
        headline={'Expert Gutter Cleaning on the Gold Coast'}
        subheading={'Cleared, flushed and flowing before the next downpour.'}
        backgroundImage={'/images/gutter-1.jpg'}
        imageAlt="Before and after: a gutter packed with leaves, then cleared and flowing"
      />

      {/* About Section */}
      <section className="py-16 bg-paper-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-6">
                Your Trusted Local Gutter Maintenance Experts
              </h2>
              <p className="text-lg text-ink-2 mb-6 leading-relaxed">
                We're a locally owned and operated business committed to keeping your property protected. All our staff 
                are police-checked for your peace of mind, and we're fully insured for complete protection.
              </p>
              <p className="text-lg text-ink-2 mb-8 leading-relaxed">
                As registered NDIS & Aged Care providers, we understand the importance of clear communication and reliable service. 
                We keep you informed throughout the process and ensure your property is storm-ready.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Complete blockage removal and drainage check</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Heights trained staff</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Storm preparation and weather protection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Safe, professional ladder work</span>
                </div>
              </div>
            </div>
            <div>
              <picture>
                <source srcSet="/images/commercial-gutter-hero.webp" type="image/webp" />
                <img
                  src="/images/commercial-gutter-hero.jpg"
                  alt="Technician in a safety harness clearing a gutter with a vacuum pole from the roof"
                  className="rounded-[14px] border-2 border-ink shadow-hard-ochre-sm sm:shadow-hard-ochre"
                  loading="lazy" decoding="async" width="1920" height="1080" />
              </picture>

            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-6">
              Comprehensive Gutter Cleaning and Maintenance
            </h2>
            <p className="text-xl text-ink-2 max-w-3xl">
              Our thorough gutter cleaning service removes all debris, clears downpipes, checks for damage, 
              and ensures proper water flow to keep your property protected.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-paper-white rounded-[14px] border-2 border-ink p-6">
              <div className="w-12 h-12 bg-ochre-100 rounded-lg flex items-center justify-center mb-4">
                <span className="font-display text-xl font-bold text-ochre-3">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Debris Removal</h3>
              <p className="text-ink-2">
                We remove all leaves, twigs, dirt, and debris from gutters and downpipes, ensuring complete blockage clearance.
              </p>
            </div>
            <div className="bg-paper-white rounded-[14px] border-2 border-ink p-6">
              <div className="w-12 h-12 bg-ochre-100 rounded-lg flex items-center justify-center mb-4">
                <span className="font-display text-xl font-bold text-ochre-3">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Drainage Testing</h3>
              <p className="text-ink-2">
                We test water flow through the entire system, ensuring proper drainage and identifying any issues.
              </p>
            </div>
            <div className="bg-paper-white rounded-[14px] border-2 border-ink p-6">
              <div className="w-12 h-12 bg-ochre-100 rounded-lg flex items-center justify-center mb-4">
                <span className="font-display text-xl font-bold text-ochre-3">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Inspection</h3>
              <p className="text-ink-2">We inspect for damage, loose brackets, or wear, and let you know if we find anything

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

      <FAQ faqs={faqs} title="Gutter Cleaning FAQ" guideLink={{ label: "Guide: How often should gutters be cleaned in South East Queensland?", href: "/guides/how-often-should-gutters-be-cleaned/" }} />

      {/* Related Services */}
      <section className="py-12 bg-paper-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink mb-6">Related Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/roof-cleaning/" className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-lg font-semibold text-ink mb-2">Roof Cleaning</h3>
              <p className="text-sm text-ink-2">Professional roof cleaning to extend your roof's life and boost curb appeal.</p>
            </Link>
            <Link to="/solar-panel-cleaning/" className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-lg font-semibold text-ink mb-2">Solar Panel Cleaning</h3>
              <p className="text-sm text-ink-2">Maintain solar panel efficiency with regular professional cleaning service.</p>
            </Link>
          </div>
        </div>
      </section>

      <SuburbLinks serviceSlug="gutter-cleaning" serviceName="Gutter Cleaning" />
    </div>);

}
