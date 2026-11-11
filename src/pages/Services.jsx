
import React from "react";
import PhoneNumber from "../components/PhoneNumber";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Phone, X } from "lucide-react";
import GoogleReviews from "../components/GoogleReviews";
import HomeHero from "../components/home/HomeHero";
import ServiceStrip from "../components/home/ServiceStrip";
import HomeQuoteStart from "../components/home/HomeQuoteStart";
import BeforeAfter from "../components/home/BeforeAfter";
import { HOME_SERVICES, HOME_STATS, HOME_SLIDERS, HOME_COMPARE } from "../data/homePage";
import FAQ from "../components/FAQ";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema, buildOrganizationSchema, buildWebSiteSchema, buildFAQSchema } from "../data/schema";

const HOME_FAQS = [
  {
    question: "How much does window cleaning cost on the Gold Coast?",
    answer: "Window cleaning starts at $220–$440 for most apartments and small offices (inside and out). Single-storey homes are typically $385–$550 including deep track and screen cleaning. Double-storey homes are $500–$800. Large properties with lots of glass are $800+ and require a site visit. All prices are a guide — contact us for a free quote."
  },
  {
    question: "What areas do you service?",
    answer: "We service all 81 Gold Coast suburbs from Coolangatta to Ormeau, including the Gold Coast Hinterland, plus Northern NSW including Tweed Heads, Kingscliff, Casuarina, and surrounding areas."
  },
  {
    question: "How long does a typical job take?",
    answer: "Window cleaning on a standard home takes 1–2 hours. Pressure cleaning a driveway takes about 1 hour. Roof cleaning varies from 2–4 hours depending on size and condition. We'll give you an estimate when you book."
  },
  {
    question: "Are you insured and do you do police checks?",
    answer: "Yes. We carry $20M public liability insurance and all staff are police-checked. We supply SWMS documentation for commercial and strata work."
  },
  {
    question: "Do you clean solar panels without voiding the warranty?",
    answer: "Yes. We use pure water and low-pressure methods that are safe for all major solar panel brands and won't void manufacturer warranties."
  },
  {
    question: "What's included in the full home pressure cleaning package?",
    answer: "Our full outdoor clean covers the driveway, pathways, patio and pool area and is typically $580–$760 depending on the size of each area. It's the best value way to get the whole exterior done in one visit, and the instant quote prices it exactly."
  },
  {
    question: "How do I get a quote or book a job?",
    answer: "Call us on (07) 5230 8293, email gcwindowandpressure@gmail.com, or book online via our website. We offer free, no-obligation quotes for all jobs."
  },
  {
    question: "How often should I have my property professionally cleaned?",
    answer: "Most residential properties benefit from window cleaning every 3–6 months, gutter cleaning once or twice a year, and pressure cleaning annually. Coastal properties near the ocean may need more frequent cleaning due to salt spray exposure."
  }
];

// Home page. Layout chosen by Skagen from mock-ups (11/2026): big photo top,
// moving service strip, instant quote on the page, photo service cards,
// "why" band with drag before/after sliders, an "us vs the cheapest quote"
// table, the real Google reviews, FAQs and a closing call to action.
// Content lives in src/data/homePage.js.
export default function Services() {
  return (
    <div className="home-page min-h-screen">
      <PageSEO
        title="Gold Coast Window and Pressure Cleaning | Free Quote"
        description="Gold Coast's trusted window, pressure, roof, gutter and solar panel cleaning. Fully insured, police-checked staff. Free quote — call (07) 5230 8293."
        canonical="https://gcwindowandpressurecleaning.com.au/"
        image="/images/services-banner.jpg"
        jsonLd={[
          buildOrganizationSchema(),
          buildWebSiteSchema(),
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([{ name: "Home", url: "/" }]),
          buildFAQSchema(HOME_FAQS)
        ]}
      />

      <HomeHero />
      <ServiceStrip />

      {/* Instant quote, first step on the page. id="quote" is the scroll
          target for every "Get your instant quote" button on this page. */}
      <section id="quote" className="no-rule scroll-mt-20 bg-gradient-to-b from-accent-50 to-paper-white py-14 sm:py-20">
        <div className="max-w-[640px] mx-auto px-4 sm:px-6 text-center">
          <p className="eyebrow eyebrow-plain">Instant quote</p>
          <h2 className="text-[34px] sm:text-[50px] font-bold text-ink leading-[1.05] mt-2.5">See your price now</h2>
          <p className="text-[18px] sm:text-[19px] text-ink-2 mt-3.5 mb-8 max-w-[520px] mx-auto">
            Tick what you need, answer a couple of quick questions and your price shows straight away.
          </p>
          <HomeQuoteStart />
          <p className="text-[16px] text-ink-2 mt-6">
            Prefer to talk?{" "}
            <a href="tel:0752308293" className="link">
              Call (07) 5230 8293
            </a>
            . We actually answer.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="no-rule pt-4 pb-16 sm:pb-24 bg-paper-white">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-7">
          <div className="text-center mb-9 sm:mb-11">
            <p className="eyebrow eyebrow-plain">What we do</p>
            <h2 className="text-[34px] sm:text-[50px] font-bold text-ink leading-[1.05] mt-2.5">Pick your service</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-[18px]">
            {HOME_SERVICES.map((service) => (
              <Link
                key={service.slug}
                to={`/${service.slug}/`}
                className="group relative block aspect-[5/6] rounded-[22px] overflow-hidden bg-ink text-paper"
              >
                <picture>
                  <source srcSet={service.image.replace(".jpg", ".webp")} type="image/webp" />
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="800"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </picture>
                <span className="absolute inset-0 bg-gradient-to-b from-ink/0 from-[38%] to-ink/95" aria-hidden="true" />
                <span className="absolute top-4 left-4 bg-accent text-ink font-bold text-[13.5px] px-3.5 py-1.5 rounded-full">{service.pill}</span>
                <div className="absolute left-[22px] right-[22px] bottom-5">
                  <h3 className="text-[26px] sm:text-[30px] font-bold leading-[1.08] mb-1.5">{service.title}</h3>
                  <span className="block text-[16px] leading-snug text-paper/90">{service.text}</span>
                  <span className="mt-2.5 inline-flex items-center font-bold text-accent text-[16px]">
                    {service.go} <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}

            {/* Fills the last row beside the seventh service */}
            <div className="lg:col-span-2 rounded-[22px] bg-ink text-paper p-7 lg:p-10 flex flex-col justify-center min-h-[300px]">
              <p className="eyebrow eyebrow-plain !text-accent">More than one job?</p>
              <h3 className="text-3xl lg:text-[40px] font-bold leading-[1.08] mt-3 mb-3">
                Price the whole place <em className="italic font-medium text-accent">in one go</em>
              </h3>
              <p className="text-lg text-paper-2/85 max-w-[52ch] mb-7">
                Tick every service you need and the instant quote prices them together, about two minutes, no phone call required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#quote" className="btn btn-lg btn-primary-on-ink">
                  Get Instant Quote <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <a href="tel:0752308293" className="btn btn-lg btn-outline-on-ink">
                  <Phone className="w-5 h-5 mr-2.5" /> <PhoneNumber />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why people pick us + before/after sliders */}
      <section className="no-rule bg-ink text-paper py-16 sm:py-24">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-7">
          <div className="grid lg:grid-cols-2 gap-9 lg:gap-16 items-center">
            <div>
              <p className="eyebrow eyebrow-plain !text-accent">Why people pick us</p>
              <h2 className="text-[34px] sm:text-[50px] font-bold leading-[1.05] mt-3 mb-5">
                Built around what usually <em className="italic font-semibold text-accent">goes wrong.</em>
              </h2>
              <p className="text-[18.5px] leading-relaxed text-paper/85">
                No-shows, quotes you have to chase, jobs half done. We set this up to fix all of it: your price before you book, a phone that
                gets answered, and insured, police-checked people at your home.
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-x-5 gap-y-7">
              {HOME_STATS.map((stat) => (
                <div key={stat.label} className="border-t-2 border-accent/40 pt-3.5 flex flex-col-reverse justify-end">
                  <dt className="text-[15.5px] text-paper/80 mt-1">{stat.label}</dt>
                  <dd className="font-display font-bold text-accent leading-none text-[30px] sm:text-[44px]">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-14 sm:mt-20 text-center">
            <h2 className="text-[32px] sm:text-[44px] font-bold leading-[1.08]">Don’t take our word for it.</h2>
            <p className="text-[18.5px] text-paper/85 mt-3 mb-8">Drag the slider on each photo. Real jobs, real homes.</p>
            <div className="grid md:grid-cols-2 gap-5 sm:gap-[22px] text-left">
              {HOME_SLIDERS.map((job) => (
                <BeforeAfter key={job.label} {...job} />
              ))}
            </div>
            <a href="#quote" className="btn btn-lg btn-primary-on-ink mt-9">
              Get your instant quote <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Us vs the cheapest quote */}
      <section className="no-rule py-16 sm:py-24 bg-paper-white">
        <div className="max-w-[900px] mx-auto px-3 sm:px-7">
          <div className="text-center mb-9 sm:mb-11">
            <p className="eyebrow eyebrow-plain">Us vs the cheapest quote</p>
            <h2 className="text-[32px] sm:text-[50px] font-bold text-ink leading-[1.05] mt-2.5">Hiring a cleaner shouldn’t be a gamble</h2>
          </div>
          <table className="home-compare w-full border-separate border-spacing-0 text-[13.5px] sm:text-[16.5px]">
            <thead>
              <tr>
                <th scope="col" className="w-[29%]">
                  <span className="sr-only">What matters</span>
                </th>
                <th scope="col" className="w-[41%] bg-ink text-paper rounded-t-[20px] font-display font-bold text-[15px] sm:text-[21px] leading-tight px-2.5 sm:px-5 py-4 sm:py-5">
                  Gold Coast Window &amp; Pressure Cleaning
                </th>
                <th scope="col" className="w-[30%] font-bold text-ink px-2.5 sm:px-5 py-4">
                  The cheapest quote
                </th>
              </tr>
            </thead>
            <tbody>
              {HOME_COMPARE.map((row, i) => {
                const last = i === HOME_COMPARE.length - 1;
                return (
                  <tr key={row.what}>
                    <th scope="row" className={`text-left font-bold text-ink px-2.5 sm:px-5 py-3.5 sm:py-4 ${last ? "" : "border-b border-dashed border-rule"}`}>
                      {row.what}
                    </th>
                    <td className={`bg-ink text-paper px-2.5 sm:px-5 py-3.5 sm:py-4 ${last ? "rounded-b-[20px]" : "border-b border-paper/15"}`}>
                      <span className="flex items-center gap-2 sm:gap-2.5">
                        <span className="w-[22px] h-[22px] rounded-full bg-accent text-ink flex-none flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" strokeWidth={3.5} aria-hidden="true" />
                        </span>
                        {row.us}
                      </span>
                    </td>
                    <td className={`text-ink-2 px-2.5 sm:px-5 py-3.5 sm:py-4 ${last ? "" : "border-b border-dashed border-rule"}`}>
                      <span className="flex items-center gap-2 sm:gap-2.5">
                        <X className="w-[18px] h-[18px] text-brick flex-none" strokeWidth={3} aria-hidden="true" />
                        {row.them}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews />

      {/* FAQ Section */}
      <FAQ faqs={HOME_FAQS} title="Frequently Asked Questions" subtitle="Common questions about our Gold Coast exterior cleaning services" />

      {/* Closing call to action */}
      <section className="no-rule py-16 sm:py-20 bg-accent text-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[40px] sm:text-[60px] font-bold leading-[1.04]">Get your price now.</h2>
          <p className="text-xl mt-3 mb-7">About two minutes online, or call and we’ll sort it on the phone.</p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <a href="#quote" className="btn btn-lg btn-ink">
              Get your instant quote <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a href="tel:0752308293" className="btn btn-lg btn-outline">
              <PhoneNumber call />
            </a>
          </div>
        </div>
      </section>
    </div>);

}
