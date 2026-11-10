import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageSEO from "../components/PageSEO";
import GoogleReviews from "../components/GoogleReviews";
import FAQ from "../components/FAQ";
import RecentJobs from "../components/RecentJobs";
import { buildLocalBusinessSchema, buildServiceSchema, buildBreadcrumbSchema, buildFAQSchema } from "../data/schema";
import { PlanTierCards, PlanInclusions, PlanNote } from "../components/WellnessPlanSection";
import { PLAN_STEPS, PLAN_BENEFITS } from "../data/plans";
import { getSuburbBySlug, SUBURBS } from "../data/locations";
import { Shield, Star, ArrowRight, CalendarCheck, PiggyBank, Home, Sparkles, CheckCircle, MapPin } from "lucide-react";

const BENEFIT_ICONS = [CalendarCheck, PiggyBank, Home];

const SITE = "https://gcwindowandpressurecleaning.com.au";

// Region-specific plan recommendation copy — keeps each suburb page's advice
// grounded in its actual environment rather than boilerplate.
function getRegionRecommendation(suburb) {
  switch (suburb.region) {
    case "south_coast":
    case "central_coast":
      return {
        plan: "Quarterly",
        reason: `Coastal suburbs like ${suburb.name} cop constant salt spray, so glass hazes and frames pit faster than inland. A quarterly exterior clean keeps salt from baking on permanently — and if you're right on the beachfront, the monthly plan (with the biggest per-visit saving) keeps ocean-facing glass spotless year-round.`,
      };
    case "hinterland":
      return {
        plan: "Quarterly",
        reason: `Hinterland homes in ${suburb.name} deal with heavy pollen loads, tree sap and leaf debris rather than salt. A quarterly exterior clean clears organic build-up before it stains, while well-sheltered homes can often stretch to the half-yearly plan.`,
      };
    case "northern":
      return {
        plan: "Quarterly",
        reason: `The northern corridor around ${suburb.name} sees ongoing construction dust and traffic film settle on glass. Quarterly cleans keep that fine grit from bonding to the surface, and the half-yearly plan suits quieter, established streets.`,
      };
    case "nsw_tweed":
      return {
        plan: "Quarterly",
        reason: `Our Gold Coast team services ${suburb.name} across the border on the same plans and pricing. The Northern Rivers mix of coastal salt and hinterland pollen makes a quarterly exterior clean the reliable sweet spot for most homes here.`,
      };
    default:
      return {
        plan: "Quarterly",
        reason: `For most homes in ${suburb.name}, the quarterly plan is the sweet spot — every three months keeps glass crystal clear through storm season, pollen season and everyday urban dust, with $100 off every single visit.`,
      };
  }
}

export default function WindowCleaningPlansLocation() {
  const { suburb: suburbSlug } = useParams();
  const suburb = getSuburbBySlug(suburbSlug);

  useEffect(() => { window.scrollTo(0, 0); }, [suburbSlug]);

  if (!suburb) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ink mb-4">Page Not Found</h1>
          <p className="text-ink-2 text-lg">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const recommendation = getRegionRecommendation(suburb);
  // Pick the first landmark that isn't just the suburb's own name — avoids
  // awkward copy like "near Burleigh Heads or anywhere else in Burleigh Heads".
  const landmark = (suburb.landmarks || []).find(
    (l) =>
      !l.toLowerCase().includes(suburb.name.toLowerCase()) &&
      !suburb.name.toLowerCase().includes(l.toLowerCase())
  ) || null;

  const faqs = [
    {
      question: `How much do the Window Cleaning Plans cost in ${suburb.name}?`,
      answer: `Plan pricing in ${suburb.name} depends on your home's window count — but every plan takes $50–$150 off each visit compared to a one-off clean, depending on the frequency you choose. Use our instant quote tool to see your exact per-visit price in about two minutes, or call (07) 5230 8293.`,
    },
    {
      question: `Which plan frequency is right for homes in ${suburb.name}?`,
      answer: recommendation.reason,
    },
    {
      question: `Do you already service ${suburb.name}?`,
      answer: suburb.localHook
        ? `Yes. ${suburb.localHook} We also run plans in nearby ${(suburb.nearbySuburbs || []).slice(0, 3).join(", ")}.`
        : `Yes — we service ${suburb.name} (${suburb.postcode}) and the surrounding suburbs regularly, with pre-booked plan visits given priority scheduling.`,
    },
    {
      question: "Does the plan include interior windows?",
      answer: `Plans cover exterior windows and screens — that's the side that gets dirty fastest in ${suburb.name}. We'll also quote your interior windows and tracks, and you can add them on at any of your scheduled exterior visits whenever you like.`,
    },
    {
      question: "Is there a lock-in contract?",
      answer: "No lock-in contracts. Plans simply pre-book your cleans at your chosen frequency so you get priority scheduling and the discounted rate. If your situation changes, just talk to us.",
    },
  ];

  const seoJsonLd = [
    buildLocalBusinessSchema(),
    buildServiceSchema({
      name: `Window Cleaning Plans in ${suburb.name}`,
      description: `Pre-booked, priority-scheduled exterior window and screen cleaning plans in ${suburb.name} (${suburb.postcode}) — monthly, quarterly or half-yearly, with $50–$150 off every visit.`,
      image: "/images/services-banner.jpg",
      serviceType: "Window Cleaning Maintenance Plan",
      areaName: suburb.name,
      url: `${SITE}/window-cleaning-plans/${suburb.slug}/`,
    }),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Window Cleaning Plans", url: "/window-cleaning-plans/" },
      { name: suburb.name, url: `/window-cleaning-plans/${suburb.slug}/` },
    ]),
    buildFAQSchema(faqs),
  ];

  const nearbyWithPages = (suburb.nearbySuburbs || [])
    .map((name) => SUBURBS.find((s) => s.name === name))
    .filter(Boolean);

  return (
    <div>
      <PageSEO
        title={`Window Cleaning Plans ${suburb.name} | Gold Coast`}
        description={`Pre-booked window cleaning plans in ${suburb.name} (${suburb.postcode}) — monthly, quarterly or half-yearly with $50–$150 off every visit. Call (07) 5230 8293.`}
        canonical={`${SITE}/window-cleaning-plans/${suburb.slug}/`}
        image="/images/services-banner.jpg"
        jsonLd={seoJsonLd}
      />

      {/* Hero */}
      <section className="relative bg-ink text-white overflow-hidden">
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
        <div className="absolute inset-0 bg-ink/80" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <span className="inline-flex items-center bg-paper-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-paper-2 mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-ochre" /> Pre-booked · Priority scheduled · Guaranteed
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            Window Cleaning Plans in {suburb.name}
          </h1>
          <p className="text-xl md:text-2xl text-paper-2 max-w-2xl mx-auto mb-8">
            Pre-booked, priority-scheduled window cleaning for {suburb.name} homes — crystal-clear views, all year
            round.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/instant-quote/"
              className="btn btn-lg btn-primary"
            >
              Get My Plan Quote <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <div className="flex items-center text-sm text-paper-2">
              <Star className="w-4 h-4 fill-ochre text-ochre mr-1.5" />
              5.0 stars — 2500+ happy customers
            </div>
          </div>
        </div>
      </section>

      {/* Suburb-specific intro */}
      <section className="py-16 bg-paper-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-ochre-3 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">{suburb.name}, Postcode {suburb.postcode}</span>
          </div>
          <p className="text-lg text-ink-2 leading-relaxed mb-6">
            A Window Cleaning Plan pre-books your exterior window and screen cleans in {suburb.name} at the frequency
            you choose — monthly, quarterly or half-yearly — with priority scheduling and $50–$150 off every single
            visit. {suburb.environmentalNote ? `It matters here more than most places: ${suburb.environmentalNote}` : ""}
          </p>

          {/* Local recommendation */}
          <div className="bg-paper-2 border border-rule rounded-2xl p-6">
            <h2 className="text-xl font-bold text-ink mb-2">
              Our recommendation for {suburb.name}: the {recommendation.plan} plan
            </h2>
            <p className="text-ink-2 leading-relaxed">
              {recommendation.reason}
              {landmark ? ` Whether you're near ${landmark} or anywhere else in ${suburb.name}, your plan visits are scheduled automatically — you never have to remember to book.` : ""}
            </p>
          </div>
        </div>
      </section>

      <RecentJobs suburbSlug={suburbSlug} suburbName={suburb.name} serviceSlug="window-cleaning" />

      {/* How it works */}
      <section className="py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">How it works</h2>
            <p className="text-lg text-ink-2 max-w-2xl">
              Three simple steps, and your {suburb.name} windows stay clean for good.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLAN_STEPS.map((step, i) => (
              <div key={i} className="bg-paper-white rounded-[14px] border-2 border-ink p-7 text-center">
                <div className="font-display italic text-3xl text-ochre-2 mb-3">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2">{step.title}</h3>
                <p className="text-ink-2 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose your plan</h2>
          </div>
          {/* What plans cover — crucial for sign-ups, so it sits above the tiers */}
          <div className="mb-10">
            <PlanNote />
          </div>
          <div className="text-ink pt-4">
            <PlanTierCards />
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <section className="py-16 bg-paper-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">Every plan includes</h2>
          <div className="heading-rule mx-auto mb-10" />
          <div className="bg-paper border border-rule rounded-2xl p-8 max-w-4xl mx-auto">
            <PlanInclusions />
          </div>
        </div>
      </section>

      {/* Why homeowners join */}
      <section className="py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-4">
              Why {suburb.name} homeowners join
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLAN_BENEFITS.map((b, i) => {
              const Icon = BENEFIT_ICONS[i] || CheckCircle;
              return (
                <div key={i} className="bg-paper-white rounded-[14px] border-2 border-ink p-8 text-center">
                  <div className="w-14 h-14 bg-ochre-100 rounded-xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-ochre-3" />
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-2">{b.title}</h3>
                  <p className="text-ink-2 text-sm leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <GoogleReviews />

      <FAQ faqs={faqs} title={`Window Cleaning Plans in ${suburb.name} — FAQ`} />

      {/* One-off clean cross-link */}
      <section className="py-12 bg-paper-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-ink-2">
            Just after a one-off clean instead?{" "}
            <Link to={`/window-cleaning/${suburb.slug}/`} className="text-ochre-3 font-semibold underline hover:text-ink">
              See Window Cleaning in {suburb.name}
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Nearby plan pages */}
      {nearbyWithPages.length > 0 && (
        <section className="py-16 bg-paper">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink mb-8">Plans also available nearby</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyWithPages.map((nearby, idx) => (
                <Link
                  key={idx}
                  to={`/window-cleaning-plans/${nearby.slug}/`}
                  className="flex items-center justify-between p-4 bg-paper-white rounded-lg hover:bg-paper-2 transition-colors border border-rule hover:border-rule"
                >
                  <span className="font-medium text-ink">Window Cleaning Plans in {nearby.name}</span>
                  <ArrowRight className="w-4 h-4 text-ochre-3 flex-shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 bg-ink text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-10 h-10 mx-auto mb-4 text-ochre" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Never think about your windows again
          </h2>
          <p className="text-lg text-paper-2 mb-8 max-w-2xl mx-auto">
            Get your {suburb.name} plan price in about two minutes — pick your frequency, see your saving, and
            we&rsquo;ll take care of the rest.
          </p>
          <Link
            to="/instant-quote/"
            className="btn btn-lg btn-primary"
          >
            Get My Plan Quote <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
