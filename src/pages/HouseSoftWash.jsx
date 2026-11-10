
import React from "react";
import QuoteHero from "../components/QuoteHero";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema, buildFAQSchema } from "../data/schema";
import SuburbLinks from "../components/SuburbLinks";
import Benefits from "../components/Benefits";
import QuoteForm from "../components/QuoteForm";
import FAQ from "../components/FAQ";
import GoogleReviews from "../components/GoogleReviews";
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
    question: "How much does a house softwash cost on the Gold Coast?",
    answer: "House softwash on the Gold Coast is $385 for a single-storey home with up to 2 bedrooms, $495 for 3 bedrooms and $660 for 4 bedrooms. Double-storey homes are $880 (3 bedrooms), $1,100 (4 bedrooms) and $1,390 (5 bedrooms). Heavy cobwebs or heavy grime add 20%. Larger homes, heavy mould, three or more storeys and commercial buildings are quoted after a look. These are the same prices our instant quote tool uses, so you can see your exact figure online in about two minutes."
  },
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
      "name": "House Softwash Gold Coast",
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Gold Coast Window and Pressure Cleaning",
        "telephone": "(07) 5230 8293",
        "url": "https://gcwindowandpressurecleaning.com.au"
      },
      "areaServed": { "@type": "City", "name": "Gold Coast", "addressRegion": "QLD", "addressCountry": "AU" },
      "description": "Gentle house softwash cleaning on the Gold Coast. Safely removes mould, dirt, and grime without damaging surfaces."
    },
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "House Softwash", url: "/house-softwash/" }
    ]),
    buildFAQSchema(faqs)
  ];


  return (
    <div>
      <PageSEO
        title="House Softwash Gold Coast | Gentle Mould Removal"
        description="Gold Coast house softwash — safely removes mould, dirt and grime without damaging render, Colorbond or timber. Fully insured. Free quote: (07) 5230 8293."
        canonical="https://gcwindowandpressurecleaning.com.au/house-softwash/"
        image="/images/softwash-1.jpg"
        jsonLd={seoJsonLd}
      />
      <QuoteHero
        headline={'Professional House & Building Washing on the Gold Coast'}
        subheading={'Gentle low-pressure washing for renders, walls & eaves.'}
        backgroundImage={'/images/softwash-secondary.jpg'}
        imageAlt="Before and after: a rendered two-storey house softwashed clean of mould and grime"
      />

      {/* About Section */}
      <section className="py-16 bg-paper-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/commercial-softwash-secondary.jpg"
                alt="Before and after: black mould softwashed off the eaves and brickwork of a Gold Coast home"
                loading="lazy"
                className="rounded-[14px] border-2 border-ink shadow-hard-ochre-sm sm:shadow-hard-ochre" decoding="async" width="1195" height="896" />

            </div>
            <div>
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-6">
                Your Trusted Local House Washing Specialists
              </h2>
              <p className="text-lg text-ink-2 mb-6 leading-relaxed">
                We're a trusted local business committed to transparent, friendly communication. All staff are 
                police-checked for your complete peace of mind, and we're fully insured for liability and damages.
              </p>
              <p className="text-lg text-ink-2 mb-8 leading-relaxed">
                We proudly serve NDIS & Aged Care clients and keep you updated every step of the way. 
                Our commitment to honest communication means no surprises – just professional results you can trust.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Gentle, surface-safe cleaning technology</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Comprehensive mould and organic stain removal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Spider web and wasp nest removal included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Eco-friendly solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-6">
              Our Advanced Softwash Cleaning Process
            </h2>
            <p className="text-xl text-ink-2 max-w-3xl">
              Unlike high-pressure washing, our softwash system uses specialised cleaning solutions and low pressure 
              to kill mould, mildew, and dirt at their source while protecting your property's surfaces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-ochre-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl font-bold text-ochre-3">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Surface Assessment</h3>
              <p className="text-sm text-ink-2">Evaluate surfaces and identify specific cleaning needs and delicate areas.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ochre-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl font-bold text-ochre-3">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pre-Treatment</h3>
              <p className="text-sm text-ink-2">Apply specialised solutions to kill mould, mildew, and organic growth.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ochre-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl font-bold text-ochre-3">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Gentle Cleaning</h3>
              <p className="text-sm text-ink-2">Low-pressure cleaning removes dirt and debris without surface damage.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ochre-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl font-bold text-ochre-3">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Final Rinse</h3>
              <p className="text-sm text-ink-2">Thorough rinse reveals clean surfaces and long-lasting results.</p>
            </div>
          </div>
        </div>
      </section>

      <Benefits
        benefits={benefits}
        title="Why Choose Professional Softwashing?" />


      <GoogleReviews />

      <QuoteForm serviceName="House & Building Softwash" />

      <FAQ faqs={faqs} title="House Softwash FAQ" guideLink={[{ label: "Guide: Why does my house grow mould outside — and how do I remove it?", href: "/guides/house-washing-mould-gold-coast/" }, { label: "Guide: Pressure cleaning vs soft washing — which is better?", href: "/guides/pressure-cleaning-vs-soft-washing/" }]} />

      {/* Related Services */}
      <section className="py-12 bg-paper-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink mb-6">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/pressure-cleaning/" className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-lg font-semibold text-ink mb-2">Pressure Cleaning</h3>
              <p className="text-sm text-ink-2">Powerful pressure cleaning for driveways, patios, and hard surfaces.</p>
            </Link>
            <Link to="/window-cleaning/" className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-lg font-semibold text-ink mb-2">Window Cleaning</h3>
              <p className="text-sm text-ink-2">Streak-free professional window cleaning for crystal clear results.</p>
            </Link>
            <Link to="/roof-cleaning/" className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-lg font-semibold text-ink mb-2">Roof Cleaning</h3>
              <p className="text-sm text-ink-2">Professional roof cleaning to extend your roof's life and boost curb appeal.</p>
            </Link>
          </div>
        </div>
      </section>

      <SuburbLinks serviceSlug="house-softwash" serviceName="House Softwash" />
    </div>);

}
