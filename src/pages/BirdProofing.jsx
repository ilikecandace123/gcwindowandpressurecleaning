
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
      question: "How much does solar panel bird proofing cost on the Gold Coast?",
      answer: "Solar panel bird proofing on the Gold Coast costs $25–$35 per metre, depending on how dirty the roof and panels are. This price includes cleaning the roof and solar panels, plus supply and installation of marine-grade mesh. These are guide prices — every installation is different, so contact us for a free, no-obligation quote."
    },
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
        "telephone": "(07) 5230 8293",
        "url": "https://gcwindowandpressurecleaning.com.au"
      },
      "areaServed": { "@type": "City", "name": "Gold Coast", "addressRegion": "QLD", "addressCountry": "AU" },
      "description": "Professional solar panel bird proofing mesh on the Gold Coast. Warranty-safe installation that stops pigeons and mynas nesting under your panels. Fully insured."
    },
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Bird Proofing", url: "/bird-proofing/" }
    ]),
    buildFAQSchema(faqs)
  ];

  return (
    <div>
      <PageSEO
        title="Solar Panel Bird Proofing Gold Coast | Pigeon Mesh"
        description="Solar panel bird proofing on the Gold Coast — warranty-safe mesh that stops pigeons and mynas nesting under your panels. Fully insured. Call (07) 5230 8293."
        canonical="https://gcwindowandpressurecleaning.com.au/bird-proofing/"
        image="/images/bird-proofing-hero.jpg"
        jsonLd={seoJsonLd}
      />

      <QuoteHero
        headline={'Solar Panel Bird Proofing on the Gold Coast'}
        subheading={'Keep pigeons out from under your panels — for good.'}
        backgroundImage={HERO_IMAGE}
        imageAlt="Bird proofing mesh fitted around the edge of rooftop solar panels"
      />

      {/* About Section */}
      <section className="py-16 bg-paper-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-6">
                Solar Panel Bird Proofing That Lasts
              </h2>
              <p className="text-lg text-ink-2 mb-6 leading-relaxed">
                We specialise in permanent, humane solar panel bird proofing for Gold Coast homes and businesses.
                Pigeons and mynas love the sheltered space under your panels — and the mess, wiring damage and lost energy output
                that follows is a headache nobody needs. Our marine-grade steel mesh seals that gap for good.
              </p>
              <p className="text-lg text-ink-2 mb-8 leading-relaxed">
                Every installation is warranty-safe (no drilling into your panels) and backed by our workmanship guarantee.
                We also clean and disinfect the area under the panels first, so you're left with a fresh, protected solar system.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Marine-grade galvanised steel mesh</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Warranty-safe panel clip installation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Humane, exclusion-only solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ochre rounded-full"></div>
                  <span className="text-ink-2">Workmanship guarantee</span>
                </div>
              </div>
            </div>
            <div>
              <picture>
                <source srcSet="/images/bird-proofing-secondary.webp" type="image/webp" />
                <img
                  src={SECONDARY_IMAGE}
                  alt="Pigeon nesting beneath rooftop solar panels showing why bird proofing is needed"
                  className="rounded-[14px] border-2 border-ink shadow-hard-ochre-sm sm:shadow-hard-ochre"
                  loading="lazy" decoding="async" width="980" height="400" />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-6">
              Our Solar Panel Bird Proofing Process
            </h2>
            <p className="text-xl text-ink-2 max-w-3xl">
              A proven four-step process that delivers permanent, humane protection for your solar system.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-ochre-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl font-bold text-ochre-3">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Inspection</h3>
              <p className="text-ink-2">
                Full solar array assessment. Identify bird activity, entry points and any existing damage under the panels.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ochre-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl font-bold text-ochre-3">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Clean & Disinfect</h3>
              <p className="text-ink-2">
                Remove existing nests, droppings and debris from under the panels. Disinfect the area before mesh goes on.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ochre-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl font-bold text-ochre-3">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Install Mesh</h3>
              <p className="text-ink-2">
                Fit marine-grade galvanised steel mesh around the entire solar array using warranty-safe panel clips.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ochre-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl font-bold text-ochre-3">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Guarantee</h3>
              <p className="text-ink-2">
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

      <FAQ faqs={faqs} title="Solar Panel Bird Proofing FAQ" guideLink={{ label: "Guide: How do I get rid of birds nesting under my solar panels?", href: "/guides/birds-under-solar-panels/" }} />

      {/* Related Services */}
      <section className="py-12 bg-paper-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink mb-6">Related Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/solar-panel-cleaning/" className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-lg font-semibold text-ink mb-2">Solar Panel Cleaning</h3>
              <p className="text-sm text-ink-2">Maintain solar panel efficiency with regular professional cleaning service.</p>
            </Link>
            <Link to="/roof-cleaning/" className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-lg font-semibold text-ink mb-2">Roof Cleaning</h3>
              <p className="text-sm text-ink-2">Professional roof cleaning to extend your roof's life and boost curb appeal.</p>
            </Link>
          </div>
        </div>
      </section>

      <SuburbLinks serviceSlug="bird-proofing" serviceName="Bird Proofing" />
    </div>
  );
}
