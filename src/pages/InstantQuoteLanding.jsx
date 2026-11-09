import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Shield, Users, Star, Phone, CheckCircle, Zap, ArrowRight, MessageSquare, CalendarCheck, ListChecks } from "lucide-react";
import PageSEO from "../components/PageSEO";
import FAQ from "../components/FAQ";
import GoogleReviews from "../components/GoogleReviews";
import RecentJobs from "../components/RecentJobs";
import NotFound from "./NotFound";
import QuoteWizard from "../quote/QuoteWizard";
import { getQuoteLanding, landingExamples, landingFaqs, landingFromPrice, landingPath } from "../data/quoteLanding";
import { getRecentJobsByService } from "../data/recentJobs";
import { buildLocalBusinessSchema, buildServiceSchema, buildBreadcrumbSchema, buildFAQSchema } from "../data/schema";
import { formatMoney } from "../quote/engine";

const SITE = "https://gcwindowandpressurecleaning.com.au";

function scrollToQuote() {
  const el = document.getElementById("quote-form");
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

// Google Ads landing page for one service: /instant-quote/<service>/
//
// The quote wizard sits in the hero with the service already ticked, so a
// visitor who searched "gutter cleaning gold coast" lands on a gutter page,
// sees gutter prices, and is one tap from the first gutter question. Below
// the fold: example prices from the engine, what is included, how it works,
// Google reviews, recent jobs for this service and the questions people ask.
// Layout.jsx skips the site-wide QuoteCTA on this page (currentPageName
// "InstantQuoteLanding") because the lead capture is already built in.
export default function InstantQuoteLanding() {
  const { service: slug } = useParams();
  const landing = getQuoteLanding(slug);

  if (!landing) return <NotFound />;
  return <Landing landing={landing} />;
}

function Landing({ landing }) {
  const examples = landingExamples(landing);
  const faqs = landingFaqs(landing);
  const fromPrice = landingFromPrice(landing);
  const path = landingPath(landing);
  const canonical = `${SITE}${path}`;
  const jobs = getRecentJobsByService(landing.serviceSlug, 4);

  // Sticky mobile bar: only once the quote card has scrolled out of view.
  const cardRef = useRef(null);
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const obs = new IntersectionObserver(([entry]) => setShowBar(!entry.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const jsonLd = [
    buildLocalBusinessSchema(),
    buildServiceSchema({
      name: `${landing.name} Gold Coast`,
      description: landing.description,
      image: landing.image,
      serviceType: landing.name,
      url: canonical,
    }),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Instant Quote", url: "/instant-quote/" },
      { name: landing.name, url: path },
    ]),
    buildFAQSchema(faqs),
  ];

  return (
    <div className="quote-landing">
      <PageSEO title={landing.title} description={landing.description} canonical={canonical} image={landing.image} jsonLd={jsonLd} />

      {/* ── Hero: copy left, quote wizard right ─────────────────────────── */}
      <section id="quote" className="relative bg-gray-900 text-white overflow-hidden scroll-mt-24">
        <div className="absolute inset-0">
          <picture>
            <source srcSet={landing.image.replace(".jpg", ".webp")} type="image/webp" />
            <img
              src={landing.image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-gray-900 lg:bg-gradient-to-r lg:from-black/75 lg:via-black/55 lg:to-black/35"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="[text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
              <div className="flex flex-wrap items-center gap-3 mb-5 text-sm">
                <span className="inline-flex items-center bg-green-500 text-white rounded-full px-4 py-2 font-semibold">
                  <Zap className="w-4 h-4 mr-2" /> {landing.eyebrow}
                </span>
                <span className="hidden sm:inline-flex items-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" /> Fully Insured
                </span>
                <span className="hidden sm:inline-flex items-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="w-4 h-4 mr-2" /> Police Checked
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight mb-4">{landing.h1}</h1>
              <p className="text-lg md:text-xl text-blue-100 font-medium mb-5">{landing.sub}</p>

              {fromPrice != null && (
                <p className="text-white mb-6">
                  <span className="text-3xl font-bold">From {formatMoney(fromPrice)}</span>
                  <span className="text-blue-100 ml-2">inc GST · exact price on screen in about 2 minutes</span>
                </p>
              )}

              {/* On phones the quote card comes straight after the price line;
                  the trust list and phone number follow it (order-last). */}
              <div className="hidden lg:block">
                <TrustList />
              </div>
            </div>

            <div ref={cardRef} id="quote-form" className="bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-7 w-full scroll-mt-24">
              {/* The wizard's own progress bar already carries the star line. */}
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your {landing.name.toLowerCase()} price</h2>
              <QuoteWizard key={landing.slug} embedded initialMode="instant" initialPhase="questions" initialServices={[landing.service]} />
            </div>

            <div className="lg:hidden [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
              <TrustList />
            </div>
          </div>
        </div>
      </section>

      {/* ── Example prices ──────────────────────────────────────────────── */}
      <section className="py-16 bg-white" id="prices">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What does {landing.name.toLowerCase()} cost on the Gold Coast?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real prices from our quote tool, inc GST. Yours depends on your property, so answer the questions above for the exact figure.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {examples.map((ex) => (
              <div key={ex.label} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col">
                <div className="text-3xl font-bold text-blue-600 mb-2">{ex.price}</div>
                <div className="text-gray-700 flex-1">{ex.label}</div>
              </div>
            ))}
          </div>
          {landing.exampleNote && <p className="text-center text-sm text-gray-500 mt-6">{landing.exampleNote}</p>}
          <div className="text-center mt-8">
            <button type="button" onClick={scrollToQuote} className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-colors">
              Get my exact price <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* ── What's included ─────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50" id="included">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What&rsquo;s included in our {landing.name.toLowerCase()}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-500 mx-auto rounded-full"></div>
          </div>
          <ul className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {landing.included.map((item) => (
              <li key={item} className="flex items-start bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How the instant quote works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">No site visit, no waiting for a call back. Three steps and you know the price.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { Icon: ListChecks, title: "1. Answer a few questions", text: "Size, storeys and condition, with pictures to help. About two minutes." },
              { Icon: Zap, title: "2. See your price on screen", text: "The same price we charge, inc GST. Add extras and watch it update." },
              { Icon: CalendarCheck, title: "3. We lock in a time", text: "Leave your number and we call or text to book a day that suits you." },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />

      <RecentJobs jobs={jobs} title={`Recent ${landing.name.toLowerCase()} jobs on the Gold Coast`} />

      <FAQ faqs={faqs} title={`${landing.name} questions, answered`} guideLink={{ label: `More about our ${landing.name.toLowerCase()} service`, href: landing.servicePage }} />

      {/* ── Final call to action ────────────────────────────────────────── */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to see your {landing.name.toLowerCase()} price?</h2>
          <p className="text-lg text-blue-100 mb-8">About two minutes, no obligation, and the price you see is the price you pay.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button type="button" onClick={scrollToQuote} className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-colors">
              Get my instant quote <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <a href="tel:0752308293" className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 text-white px-8 py-4 rounded-lg font-semibold text-lg border border-white/25 transition-colors">
              <Phone className="w-5 h-5 mr-2" /> (07) 5230 8293
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Prefer to browse first? <Link to={landing.servicePage} className="text-blue-300 hover:underline">Read about our {landing.name.toLowerCase()} service</Link>.
          </p>
        </div>
      </section>

      {/* ── Sticky mobile bar ───────────────────────────────────────────── */}
      <div
        className={
          "lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 py-3 flex gap-3 transition-transform duration-300 " +
          (showBar ? "translate-y-0" : "translate-y-full")
        }
        aria-hidden={!showBar}
      >
        <button type="button" onClick={scrollToQuote} tabIndex={showBar ? 0 : -1} className="flex-1 inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold shadow transition-colors">
          <Zap className="w-5 h-5 mr-2" /> See my price
        </button>
        <a href="tel:0752308293" tabIndex={showBar ? 0 : -1} className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold shadow transition-colors" aria-label="Call (07) 5230 8293">
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

function TrustList() {
  return (
    <div>
      <ul className="space-y-2 mb-6">
        {["Fully insured, police-checked staff", "5.0 stars from 2500+ Gold Coast customers", "The price on screen is the price you pay", "Free, no obligation, no phone call needed"].map((b) => (
          <li key={b} className="flex items-center text-white">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400 flex-shrink-0" />
            {b}
          </li>
        ))}
      </ul>
      <div className="flex items-center mb-6">
        <div className="flex items-center text-yellow-400 mr-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
        <span className="text-white font-medium">5.0 Stars • 2500+ Happy Customers</span>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href="tel:0752308293" className="inline-flex items-center bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white px-6 py-3 rounded-lg font-semibold transition-all border border-white/25">
          <Phone className="w-5 h-5 mr-2" /> (07) 5230 8293
        </a>
        <span className="inline-flex items-center text-blue-100 text-sm">
          <MessageSquare className="w-4 h-4 mr-2" /> Or just use the quote tool, we actually answer texts too
        </span>
      </div>
    </div>
  );
}
