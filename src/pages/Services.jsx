
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import GoogleReviews from "../components/GoogleReviews";
import QuoteHero from "../components/QuoteHero";
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

export default function Services() {
  const services = [
  {
    imageUrl: "/images/roof-cleaning-1.jpg",
    title: "Roof Cleaning",
    description: "Professional manufacturer-recommended process extends roof life, improves curb appeal, and prevents costly damage.",
    benefits: ["Extends roof life", "Boosts curb appeal", "Prevents damage"],
    slug: "roof-cleaning"
  },
  {
    imageUrl: "/images/window-hero.jpg",
    title: "Window Cleaning",
    description: "Streak-free interior and exterior window cleaning up to 4 storeys. Includes tracks and flyscreens.",
    benefits: ["Streak-free results", "Up to 4 storeys", "Includes extras"],
    slug: "window-cleaning"
  },
  {
    imageUrl: "/images/commercial-softwash-secondary.jpg",
    title: "House & Building Softwash",
    description: "Gentle surface-safe cleaning removes mould, dirt, spider webs, and wasp nests without damage.",
    benefits: ["Safe for surfaces", "Removes mould", "Long-lasting results"],
    slug: "house-softwash"
  },
  {
    imageUrl: "/images/pressure-1.jpg",
    title: "Pressure Cleaning",
    description: "Industrial-grade cleaning for concrete, driveways, walkways, and patios. Deep clean that lasts.",
    benefits: ["Industrial grade", "Deep cleaning", "Long-lasting"],
    slug: "pressure-cleaning"
  },
  {
    imageUrl: "/images/gutter-1.jpg",
    title: "Gutter Cleaning",
    description: "Complete gutter cleaning and maintenance to prevent water damage and keep your property storm-ready.",
    benefits: ["Prevents water damage", "Storm ready", "Complete maintenance"],
    slug: "gutter-cleaning"
  },
  {
    imageUrl: "/images/solar-panel-hero.jpg",
    title: "Solar Panel Cleaning",
    description: "Professional solar panel cleaning to restore efficiency and maximise your energy output.",
    benefits: ["Restores efficiency", "Maximises output", "Extends panel life"],
    slug: "solar-panel-cleaning"
  },
  {
    imageUrl: "/images/bird-proofing-hero.jpg",
    title: "Solar Panel Bird Proofing",
    description: "Marine-grade mesh that stops pigeons and mynas nesting under your solar panels. Warranty-safe and humane.",
    benefits: ["Protects solar panels", "Restores energy output", "Warranty safe"],
    slug: "bird-proofing"
  }];

  return (
    <div className="min-h-screen">
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
      {/* Hero with Quote Form */}
      <QuoteHero
        headline="Professional Window & Exterior Cleaning on the Gold Coast"
        subheading="Local • Quality • Trustworthy"
        description="Serving the Gold Coast and surrounding areas — fully insured, police-checked staff for your peace of mind."
        backgroundImage="/images/services-banner.jpg"
        imagePosition="48% 33%"
      />

      {/* Services Grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 lg:mb-12 max-w-3xl">
            <p className="eyebrow">What we do</p>
            <h2 className="text-3xl md:text-[44px] font-bold text-ink leading-[1.08] mt-3 mb-3">
              Choose Your Service
            </h2>
            <p className="text-xl text-ink-2">
              Professional exterior cleaning services tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {services.map((service, index) =>
            <Link
              key={index}
              to={`/${service.slug}/`}
              className="group card overflow-hidden flex flex-col transition-all duration-150 hover:shadow-hard hover:-translate-x-[2px] hover:-translate-y-[2px]">

                <div className="aspect-[4/3] overflow-hidden border-b-2 border-ink bg-paper-2">
                  <picture>
                    <source srcSet={service.imageUrl.replace('.jpg', '.webp')} type="image/webp" />
                    <img src={service.imageUrl} alt={service.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" decoding="async" width="600" height="400" />
                  </picture>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-ink mb-2">
                    {service.title}
                  </h3>

                  <p className="text-ink-2 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 mb-6 text-[15px] font-semibold text-ink-2">
                    {service.benefits.map((benefit, i) =>
                  <li key={i} className="flex items-center gap-2 before:content-['✓'] before:text-moss before:font-bold">
                        {benefit}
                      </li>
                  )}
                  </ul>

                  <div className="mt-auto flex items-center font-bold text-ink underline decoration-ochre decoration-2 underline-offset-4">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )}

            {/* Fills the last row beside the seventh service */}
            <div className="md:col-span-1 lg:col-span-2 rounded-[14px] border-2 border-ink bg-ink text-paper p-7 lg:p-10 flex flex-col justify-center">
              <p className="eyebrow !text-ochre">More than one job?</p>
              <h3 className="text-3xl lg:text-[40px] font-bold leading-[1.08] mt-3 mb-3">
                Price the whole place <em className="italic font-medium text-ochre">in one go</em>
              </h3>
              <p className="text-lg text-paper-2/85 max-w-[52ch] mb-7">
                Tick every service you need and the instant quote prices them together, about two minutes, no phone call required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/instant-quote/" className="btn btn-lg btn-primary-on-ink">
                  Get Instant Quote <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a href="tel:0752308293" className="btn btn-lg btn-outline-on-ink">
                  <Phone className="w-5 h-5 mr-2" /> (07) 5230 8293
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews />

      {/* FAQ Section */}
      <FAQ faqs={HOME_FAQS} title="Frequently Asked Questions" subtitle="Common questions about our Gold Coast exterior cleaning services" />

      {/* CTA Section */}
      <section className="no-rule py-16 bg-ink text-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-[40px] font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-paper-2/85 mb-8">We can usually have a free quote to you within 15 minutes.

          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote" className="btn btn-lg btn-primary-on-ink">

              Get Free Quote
            </a>
            <a
              href="tel:0752308293"
              className="btn btn-lg btn-outline-on-ink">

              <span>Call (07) 5230 8293</span>
            </a>
          </div>
        </div>
      </section>
    </div>);

}