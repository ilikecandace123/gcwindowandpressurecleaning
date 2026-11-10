
import React from "react";
import QuoteHero from "../components/QuoteHero";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Benefits from "../components/Benefits";
import QuoteForm from "../components/QuoteForm";
import FAQ from "../components/FAQ";
import PreSaleSection from "../components/PreSaleSection";
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
    title: "Removes Deep Grime and Mould",
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
    answer: "Pressure cleaning on the Gold Coast starts at $275, which covers a standard or medium concrete driveway (up to about 75 sqm, or one to three cars). A large driveway (76–100 sqm) is $330 on concrete or $385 on pavers, sandstone or brick. A full outdoor clean of the driveway, paths, patio and pool area is typically $580–$760 depending on the size of each area. Mould treatment is included, and an optional biocide treatment keeps surfaces clean for 12 months or more. These are the same prices our instant quote tool uses, so you can see your exact figure online in about two minutes."
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
      "name": "Pressure Cleaning Gold Coast",
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Gold Coast Window and Pressure Cleaning",
        "telephone": "(07) 5230 8293",
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
        description="Gold Coast pressure cleaning specialists — industrial-grade cleaning for driveways, concrete, paths and patios. Fully insured. Free quote: (07) 5230 8293."
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
      <section className="py-16 bg-paper-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-6">
                Your Trusted Local Pressure Cleaning Professionals
              </h2>
              <p className="text-lg text-ink-2 mb-6 leading-relaxed">
                We're a locally owned and operated business committed to transparent, friendly communication. 
                All our staff are police-checked for your peace of mind, and we're fully insured for complete protection.
              </p>
              <p className="text-lg text-ink-2 mb-8 leading-relaxed">
                As registered NDIS & Aged Care providers, we understand the importance of safety and reliability. 
                We keep you informed throughout the process and ensure your outdoor spaces are clean and safe.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Industrial-grade commercial equipment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Specialised treatments for oil and stubborn stains</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Surface-appropriate pressure settings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">No job too big or small</span>
                </div>
              </div>
            </div>
            <div>
              <picture>
                <source srcSet="/images/pressure-secondary.webp" type="image/webp" />
                <img
                  src="/images/pressure-secondary.jpg"
                  alt="Pressure cleaning service team demonstrating concrete surface restoration"
                  className="rounded-[14px] border-2 border-ink shadow-hard-ochre-sm sm:shadow-hard-ochre"
                  loading="lazy" decoding="async" width="1024" height="682" />
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
              Professional Pressure Cleaning Services
            </h2>
            <p className="text-xl text-ink-2 max-w-3xl">
              Our industrial-grade pressure cleaning removes deep-set grime, oil stains, mould, and organic growth 
              from concrete, pavers, and hard surfaces that regular cleaning simply can't handle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-paper-white rounded-[14px] border-2 border-ink p-6">
              <h3 className="text-xl font-semibold mb-4 text-ochre-3">Driveways and Concrete</h3>
              <p className="text-ink-2 mb-4">
                Remove oil stains, tyre marks, and years of built-up grime to restore your driveway's appearance.
              </p>
              <ul className="text-sm text-ink-3 space-y-1">
                <li>• Oil stain removal</li>
                <li>• Tyre mark elimination</li>
                <li>• Mould and algae treatment</li>
              </ul>
            </div>
            
            <div className="bg-paper-white rounded-[14px] border-2 border-ink p-6">
              <h3 className="text-xl font-semibold mb-4 text-moss">Walkways and Paths</h3>
              <p className="text-ink-2 mb-4">
                Make walkways safe and attractive by removing slip-hazard mould and restoring original appearance.
              </p>
              <ul className="text-sm text-ink-3 space-y-1">
                <li>• Safety hazard removal</li>
                <li>• Non-slip surface restoration</li>
                <li>• Weather stain elimination</li>
              </ul>
            </div>
            
            <div className="bg-paper-white rounded-[14px] border-2 border-ink p-6">
              <h3 className="text-xl font-semibold mb-4 text-ochre-3">Patios and Outdoor Areas</h3>
              <p className="text-ink-2 mb-4">
                Transform outdoor entertainment areas by removing stains and organic growth for a fresh, clean look.
              </p>
              <ul className="text-sm text-ink-3 space-y-1">
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

      <PreSaleSection variant="pressure" />

      <QuoteForm serviceName="Pressure Cleaning" />

      <FAQ faqs={faqs} title="Pressure Cleaning FAQ" guideLink={[{ label: "Guide: How much does driveway pressure cleaning cost on the Gold Coast?", href: "/guides/driveway-pressure-cleaning-cost/" }, { label: "Guide: Pressure cleaning vs soft washing — which is better?", href: "/guides/pressure-cleaning-vs-soft-washing/" }]} />

      {/* Related Services */}
      <section className="py-12 bg-paper-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink mb-6">Related Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/house-softwash/" className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-lg font-semibold text-ink mb-2">House Softwash</h3>
              <p className="text-sm text-ink-2">Gentle, effective cleaning that protects your home's exterior while removing dirt and stains.</p>
            </Link>
            <Link to="/gutter-cleaning/" className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-lg font-semibold text-ink mb-2">Gutter Cleaning</h3>
              <p className="text-sm text-ink-2">Full gutter and downpipe clearing with inspection and written report.</p>
            </Link>
          </div>
        </div>
      </section>

      <SuburbLinks serviceSlug="pressure-cleaning" serviceName="Pressure Cleaning" />
    </div>);

}
