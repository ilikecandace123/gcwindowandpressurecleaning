import React from "react";
import { Link } from "react-router-dom";
import PageSEO from "../components/PageSEO";
import GoogleReviews from "../components/GoogleReviews";
import FAQ from "../components/FAQ";
import { buildLocalBusinessSchema, buildBreadcrumbSchema, buildFAQSchema } from "../data/schema";
import { PlanTierCards, PlanInclusions, PlanNote } from "../components/WellnessPlanSection";
import { PLAN_STEPS, PLAN_BENEFITS } from "../data/plans";
import SuburbLinks from "../components/SuburbLinks";
import { Shield, Star, ArrowRight, CalendarCheck, PiggyBank, Home, Sparkles, CheckCircle } from "lucide-react";

const BENEFIT_ICONS = [CalendarCheck, PiggyBank, Home];

export default function WindowCleaningPlans() {
  const faqs = [
    {
      question: "What are the Window Cleaning Plans?",
      answer:
        "They're our pre-booked window cleaning maintenance plans. Choose a frequency — monthly, quarterly or half-yearly — and we schedule your exterior window and screen cleans automatically, with priority scheduling and $50–$150 off every single visit. You never have to think about your windows again.",
    },
    {
      question: "Which plan frequency is right for my home?",
      answer:
        "Quarterly is our most popular plan and the sweet spot for most Gold Coast homes — every 3 months keeps glass crystal clear through salt air, storms and pollen season. Choose monthly if you're beachfront or love a spotless look year-round, or half-yearly for a lower-cost twice-a-year refresh.",
    },
    {
      question: "Does the plan include interior windows?",
      answer:
        "Plans cover exterior windows and screens — that's the side that gets dirty fastest. We'll also quote your interior windows and tracks, and you can add them on at any of your scheduled exterior visits whenever you like.",
    },
    {
      question: "What does every plan include?",
      answer:
        "Every plan includes a free deep clean of your flyscreens, free frame and sill cleaning, $50–$150 off per visit depending on your frequency, our 100% satisfaction guarantee, and a 7-day rain guarantee — if it rains within 7 days of your clean, we'll come back and touch up affected windows free.",
    },
    {
      question: "Is there a lock-in contract?",
      answer:
        "No lock-in contracts. Plans simply pre-book your cleans at your chosen frequency so you get priority scheduling and the discounted rate. If your situation changes, just talk to us.",
    },
    {
      question: "How do I get started?",
      answer:
        "Use our instant quote tool to get your price in about two minutes — pick your pane count, choose a frequency and see your per-visit price with the plan discount applied. Or call (07) 5651 2386 and we'll sort it out on the spot.",
    },
  ];

  const seoJsonLd = [
    buildLocalBusinessSchema(),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Window Cleaning Maintenance Plan",
      name: "Window Cleaning Plans",
      provider: {
        "@type": "HomeAndConstructionBusiness",
        name: "Gold Coast Window and Pressure Cleaning",
        telephone: "(07) 5651 2386",
        url: "https://gcwindowandpressurecleaning.com.au",
      },
      areaServed: { "@type": "City", name: "Gold Coast", addressRegion: "QLD", addressCountry: "AU" },
      description:
        "Pre-booked, priority-scheduled exterior window and screen cleaning plans on the Gold Coast — monthly, quarterly or half-yearly, with $50–$150 off every visit.",
    },
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Window Cleaning Plans", url: "/window-cleaning-plans/" },
    ]),
    buildFAQSchema(faqs),
  ];

  return (
    <div>
      <PageSEO
        title="Window Cleaning Plans Gold Coast | Save On Every Visit"
        description="Pre-booked window cleaning plans on the Gold Coast — monthly, quarterly or half-yearly with $50–$150 off every visit, free flyscreen deep clean and a 7-day rain guarantee."
        canonical="https://gcwindowandpressurecleaning.com.au/window-cleaning-plans/"
        image="/images/services-banner.jpg"
        jsonLd={seoJsonLd}
      />

      {/* Hero */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <picture>
            <source srcSet="/images/services-banner.webp" type="image/webp" />
            <img
              src="/images/services-banner.jpg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/85 via-blue-900/75 to-blue-950/85" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <span className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-blue-100 mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-300" /> Pre-booked · Priority scheduled · Guaranteed
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">Window Cleaning Plans</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-8">
            Pre-booked, priority-scheduled window cleaning — crystal-clear views, all year round.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/instant-quote/"
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl transition-colors"
            >
              Get My Plan Quote <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <div className="flex items-center text-sm text-blue-100">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300 mr-1.5" />
              5.0 stars — 2500+ happy customers
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps, and your windows stay clean for good.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLAN_STEPS.map((step, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-7 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose your plan</h2>
          </div>
          {/* What plans cover — crucial for sign-ups, so it sits above the tiers */}
          <div className="mb-10">
            <PlanNote />
          </div>
          <div className="text-gray-900 pt-4">
            <PlanTierCards />
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Every plan includes</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-500 mx-auto rounded-full mb-10" />
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 max-w-4xl mx-auto">
            <PlanInclusions />
          </div>
        </div>
      </section>

      {/* Why homeowners join */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why homeowners join</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLAN_BENEFITS.map((b, i) => {
              const Icon = BENEFIT_ICONS[i] || CheckCircle;
              return (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <GoogleReviews />

      <FAQ faqs={faqs} title="Window Cleaning Plans FAQ" />

      {/* Suburb plan pages — every suburb linked so the pages are browsable */}
      <SuburbLinks serviceSlug="window-cleaning-plans" serviceName="Window Cleaning Plans" showAll />

      {/* Final CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-10 h-10 mx-auto mb-4 text-green-400" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Never think about your windows again</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your plan price in about two minutes — pick your frequency, see your saving, and we&rsquo;ll take care
            of the rest.
          </p>
          <Link
            to="/instant-quote/"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-xl transition-colors"
          >
            Get My Plan Quote <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
