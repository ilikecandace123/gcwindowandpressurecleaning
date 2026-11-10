import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Phone, Zap, ArrowRight, ChevronDown, ChevronUp, Camera } from "lucide-react";
import PageSEO from "../components/PageSEO";
import GoogleReviews from "../components/GoogleReviews";
import NotFound from "./NotFound";
import QuoteWizard from "../quote/QuoteWizard";
import { getQuoteLanding, landingExamples, landingFaqs, landingFromPrice, landingPath } from "../data/quoteLanding";
import { getRecentJobsByService } from "../data/recentJobs";
import { buildLocalBusinessSchema, buildServiceSchema, buildBreadcrumbSchema, buildFAQSchema } from "../data/schema";
import { formatMoney } from "../quote/engine";

const SITE = "https://gcwindowandpressurecleaning.com.au";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function monthYear(date) {
  const [y, m] = String(date || "").split("-");
  return MONTHS[Number(m) - 1] && y ? `${MONTHS[Number(m) - 1]} ${y}` : "";
}
function titleCase(slug) {
  return String(slug || "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

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
//
// Look: the site theme ("Local & honest": warm paper, ink, accent, serif
// display) — see tailwind.config.js and src/index.css.
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

  // Hero photo: a real job photo when we have one for this service, else the
  // service's stock hero. Real beats stock every time.
  const heroJob = jobs[0] || null;
  const heroImage = heroJob ? heroJob.photo : landing.image;
  const heroWebp = heroJob ? null : landing.image.replace(".jpg", ".webp");

  // "Gutter Cleaning Gold Coast — See Your Price in 2 Minutes": the keyword
  // part stays upright, the promise after the dash is set in italic accent.
  const [h1Lead, h1Tail] = landing.h1.split(" — ");

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

  const lower = landing.name.toLowerCase();

  return (
    <div className="quote-landing dots">
      <PageSEO title={landing.title} description={landing.description} canonical={canonical} image={landing.image} jsonLd={jsonLd} />

      {/* ── Hero: copy left, photo + quote card right ───────────────────── */}
      <section id="quote" className="no-rule scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-14 pb-8 lg:pb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div>
              <p className="eyebrow">
                {landing.name} · Gold Coast
              </p>
              <h1 className="font-display font-bold text-[40px] sm:text-5xl xl:text-[66px] leading-[1.02] tracking-tight mt-4 mb-5">
                {h1Lead}
                {h1Tail && (
                  <>
                    {" "}
                    <em className="italic font-medium text-accent-2">{h1Tail}</em>
                  </>
                )}
              </h1>
              <p className="text-lg sm:text-xl text-ink-2 max-w-[52ch]">{landing.sub}</p>

              {fromPrice != null && (
                <div className="inline-grid grid-cols-[auto_auto] items-baseline gap-x-4 gap-y-1 mt-7 mb-6 px-5 py-3.5 border-2 border-ink rounded-md bg-paper-white shadow-hard -rotate-[1.5deg]">
                  <div className="font-display font-bold text-[44px] leading-none">
                    <sup className="text-xl align-top mr-0.5">from</sup>
                    {formatMoney(fromPrice)}
                  </div>
                  <span className="text-sm text-ink-2 max-w-[22ch] leading-tight">inc GST · exact price on screen in about 2 minutes</span>
                </div>
              )}

              <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-[15px] font-semibold text-ink-2">
                {["Fully insured", "Police-checked staff", "5.0 stars, 2,500+ customers", "Same price on the day"].map((t) => (
                  <li key={t} className="flex items-center gap-2 before:content-['✓'] before:text-moss before:font-bold">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="hidden lg:flex items-center gap-4 mt-8">
                <a href="tel:0752308293" className="btn btn-outline">
                  <Phone className="w-4 h-4 mr-2" /> (07) 5230 8293
                </a>
                <span className="text-sm text-ink-2">Or skip the call and use the quote tool. We answer texts too.</span>
              </div>
            </div>

            {/* Photo on top, quote card tucked under its bottom edge so the photo
                stays visible (Skagen, 10/11/2026: the card was covering it). */}
            <div>
              <div className="relative photo-frame aspect-[4/3] lg:aspect-[2/1] xl:aspect-[16/9] bg-paper-2">
                <picture>
                  {heroWebp && <source srcSet={heroWebp} type="image/webp" />}
                  <img
                    src={heroImage}
                    alt={heroJob ? heroJob.alt || `${landing.name} job in ${titleCase(heroJob.suburb)}` : ""}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    width={1296}
                    height={972}
                  />
                </picture>
                <span className="absolute top-3.5 left-3.5 bg-ink text-paper text-[11px] tracking-[.1em] uppercase px-2.5 py-1.5 rounded">
                  {heroJob ? `Real job · ${titleCase(heroJob.suburb)} · ${monthYear(heroJob.date)}` : "Gold Coast · fully insured"}
                </span>
              </div>

              <div
                ref={cardRef}
                id="quote-form"
                className="relative mt-6 lg:mt-7 lg:-ml-8 lg:mr-8 card p-5 sm:p-6 shadow-xl scroll-mt-24"
              >
                <h2 className="font-display text-xl font-bold mb-3">Your {lower} price</h2>
                <QuoteWizard key={landing.slug} embedded initialMode="instant" initialPhase="questions" initialServices={[landing.service]} />
              </div>
            </div>

            <a href="tel:0752308293" className="lg:hidden btn btn-outline">
              <Phone className="w-4 h-4 mr-2" /> Prefer to talk? (07) 5230 8293
            </a>
          </div>
        </div>
      </section>

      {/* ── Example prices ──────────────────────────────────────────────── */}
      <section id="prices">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <h2 className="font-display font-bold text-3xl sm:text-[38px] leading-[1.1] max-w-[22ch]">What {lower} actually costs on the Gold Coast</h2>
          <p className="text-ink-2 text-lg mt-3 mb-7 max-w-[62ch]">
            These are the quote tool&rsquo;s own numbers, inc GST. Yours depends on your property, so the tool above gives you the exact figure.
          </p>
          <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
            {examples.map((ex, i) => (
              <div key={ex.label} className="relative bg-paper-white border-2 border-dashed border-ink rounded-[10px] px-5 py-5">
                {i === 1 && (
                  <span className="absolute -top-3 right-4 bg-accent text-ink border-2 border-ink text-[11px] tracking-[.12em] uppercase font-bold px-2.5 py-0.5 rounded-full">Most common</span>
                )}
                <div className="font-display font-bold text-[44px] leading-none">{ex.price}</div>
                <div className="mt-2 text-ink-2 font-semibold">{ex.label}</div>
              </div>
            ))}
          </div>
          {landing.exampleNote && <p className="text-sm text-ink-2 mt-4">{landing.exampleNote}</p>}
          <button type="button" onClick={scrollToQuote} className="mt-7 btn btn-lg btn-primary">
            Get my exact price <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* ── Included + how it works ─────────────────────────────────────── */}
      <section id="included">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14 grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-[34px] leading-[1.1] mb-5">What&rsquo;s included, every time</h2>
            <ul className="grid gap-3">
              {landing.included.map((item) => (
                <li key={item} className="flex gap-3 text-[17px] pb-3 border-b border-rule before:content-['—'] before:text-accent before:font-bold">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-[34px] leading-[1.1] mb-5">How the instant quote works</h2>
            <ol className="grid gap-4">
              {[
                ["Answer a few questions", "Size, storeys and condition, with pictures to help. About two minutes."],
                ["See your price on screen", "The same price we charge, inc GST. Add extras and watch it update."],
                ["We lock in a time", "Leave your number and we get in touch to book a day that suits you."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4 bg-paper-white border-2 border-ink rounded-xl p-5">
                  <span className="font-display font-bold text-3xl text-accent-2 leading-none">{i + 1}</span>
                  <div>
                    <div className="font-bold text-lg">{t}</div>
                    <div className="text-ink-2">{d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* ── Recent jobs for this service ────────────────────────────────── */}
      {jobs.length > 0 && (
        <section id="recent-work">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
            <p className="eyebrow eyebrow-plain mb-3">
              <Camera className="w-4 h-4" /> Real jobs, real photos
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-[34px] leading-[1.1] mb-7">Recent {lower} jobs on the Gold Coast</h2>
            <div className={`grid gap-6 ${jobs.length > 1 ? "md:grid-cols-2" : ""}`}>
              {jobs.map((job) => (
                <figure key={job.photo} className="bg-paper-white border-2 border-ink rounded-[14px] overflow-hidden">
                  <img src={job.photo} alt={job.alt || `Recent job in ${titleCase(job.suburb)}`} width={1200} height={900} className="w-full h-64 sm:h-72 object-cover border-b-2 border-ink" loading="lazy" decoding="async" />
                  <figcaption className="p-5">
                    <div className="text-[12px] tracking-[.1em] uppercase font-bold text-accent-3 mb-2">
                      {titleCase(job.suburb)} · {monthYear(job.date)}
                    </div>
                    <p className="text-ink-2 leading-relaxed">{job.text}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <LandingFaq faqs={faqs} title="Questions people ask before booking" moreHref={landing.servicePage} moreLabel={`More about our ${lower} service`} />

      {/* ── Final call to action ────────────────────────────────────────── */}
      <section className="no-rule bg-ink text-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Ready to see your {lower} price?</h2>
          <p className="text-lg text-paper-2/80 mb-7">About two minutes, no obligation, and the price you see is the price you pay.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button type="button" onClick={scrollToQuote} className="btn btn-lg btn-primary-on-ink">
              Get my instant quote <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <a href="tel:0752308293" className="btn btn-lg btn-outline-on-ink">
              <Phone className="w-5 h-5 mr-2" /> (07) 5230 8293
            </a>
          </div>
          <p className="text-sm text-paper-2/60 mt-6">
            Prefer to browse first? <Link to={landing.servicePage} className="underline hover:text-paper">Read about our {lower} service</Link>.
          </p>
        </div>
      </section>

      {/* ── Sticky mobile bar ───────────────────────────────────────────── */}
      <div
        className={
          "lg:hidden fixed inset-x-0 bottom-0 z-40 bg-paper-white border-t-2 border-ink px-4 py-3 flex gap-3 transition-transform duration-300 " +
          (showBar ? "translate-y-0" : "translate-y-full")
        }
        aria-hidden={!showBar}
      >
        <button type="button" onClick={scrollToQuote} tabIndex={showBar ? 0 : -1} className="flex-1 btn btn-primary !py-2.5">
          <Zap className="w-5 h-5 mr-2" /> See my price
        </button>
        <a href="tel:0752308293" tabIndex={showBar ? 0 : -1} className="btn btn-ink !px-4 !py-2.5" aria-label="Call (07) 5230 8293">
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

// Serif accordion in the landing look. Every answer stays in the DOM (hidden
// when collapsed) so crawlers and the markdown mirrors read all of them.
function LandingFaq({ faqs, title, moreHref, moreLabel }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <h2 className="font-display font-bold text-3xl sm:text-[34px] leading-[1.1] mb-4">{title}</h2>
        <div>
          {faqs.map((faq, i) => (
            <div key={faq.question} className="border-b border-rule py-3.5">
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex justify-between items-start gap-4 text-left">
                <h3 className="font-display font-bold text-lg sm:text-[21px] leading-snug">{faq.question}</h3>
                {open === i ? <ChevronUp className="w-5 h-5 text-accent-2 flex-shrink-0 mt-1" /> : <ChevronDown className="w-5 h-5 text-accent-2 flex-shrink-0 mt-1" />}
              </button>
              <p className={(open === i ? "" : "hidden ") + "mt-2.5 text-ink-2 leading-relaxed max-w-[70ch]"}>{faq.answer}</p>
            </div>
          ))}
        </div>
        {moreHref && (
          <p className="mt-6">
            <Link to={moreHref} className="font-bold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-3">
              {moreLabel}
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
