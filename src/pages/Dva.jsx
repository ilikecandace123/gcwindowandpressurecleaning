import React from "react";
import { Link, useParams } from "react-router-dom";
import { Phone, ArrowRight, ExternalLink } from "lucide-react";
import QuoteHero from "../components/QuoteHero";
import QuoteForm from "../components/QuoteForm";
import FAQ from "../components/FAQ";
import GoogleReviews from "../components/GoogleReviews";
import PageSEO from "../components/PageSEO";
import Breadcrumbs from "../components/Breadcrumbs";
import PhoneNumber from "../components/PhoneNumber";
import NotFound from "./NotFound";
import { buildLocalBusinessSchema, buildBreadcrumbSchema, buildFAQSchema } from "../data/schema";
import { DVA_HUB, DVA_PAGES, DVA_SERVICES, DVA_FACTS as F, DVA_STEPS, dvaRequirements, dvaServiceSchema, dvaSuburbPage } from "../data/dva";
import { SUBURBS, getSuburbBySlug } from "../data/locations";
import SuburbLinks from "../components/SuburbLinks";

const SITE = "https://gcwindowandpressurecleaning.com.au";

const SOURCES = [
  { label: "DVA: Household services compensation", href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/household-services-compensation" },
  { label: "DVA: Veterans' Home Care (VHC)", href: "https://www.dva.gov.au/vhc" },
  { label: "DVA: Help with home and garden upkeep", href: "https://www.dva.gov.au/what-we-help-with/care-at-home-and-aged-care-services/living-independently/help-with-home-and-garden-upkeep" },
];

function DirectAnswer({ text }) {
  return (
    <section className="py-12 bg-paper-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">The short answer</p>
        <p className="text-xl leading-relaxed text-ink mt-4">{text}</p>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section className="py-16 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <p className="eyebrow">How DVA pays</p>
          <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mt-3">
            Two ways DVA can pay for your cleaning
          </h2>
          <p className="text-lg text-ink-2 mt-4">
            Most DVA clients get home help through one of these. Your determination letter or Care Plan says which.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-7">
            <h3 className="text-2xl font-bold text-ink">Household Services compensation</h3>
            <p className="text-ink-2 mt-2">For tasks you can no longer manage because of an accepted service-related injury or illness.</p>
            <ul className="mt-5 space-y-3 text-ink-2">
              <li><strong className="text-ink">You choose the provider.</strong> That can be us.</li>
              <li><strong className="text-ink">Standard hourly rate:</strong> up to {F.hhsHourlyRate} an hour inc GST in {F.hhsHourlyRateYear}. A provider can charge up to this without further DVA approval.</li>
              <li><strong className="text-ink">Weekly limit:</strong> {F.hhsWeeklyMaxMrca} under the MRCA from {F.hhsWeeklyMaxFrom}.</li>
              <li><strong className="text-ink">Payment:</strong> DVA pays the provider directly or reimburses you.</li>
              <li><strong className="text-ink">New claims:</strong> since 1 July 2026 all new claims are assessed under the MRCA. Email {F.hhsEmail}.</li>
            </ul>
          </div>
          <div className="card p-7">
            <h3 className="text-2xl font-bold text-ink">Veterans' Home Care (VHC)</h3>
            <p className="text-ink-2 mt-2">For Gold Card and White Card holders who have trouble with jobs around the home.</p>
            <ul className="mt-5 space-y-3 text-ink-2">
              <li><strong className="text-ink">Home and garden maintenance</strong> includes gutters, internal and external windows, light globes, ceiling fans, split-system air conditioners and lawn mowing.</li>
              <li><strong className="text-ink">Hours:</strong> up to {F.vhcHoursPerYear} hours in any 12 months.</li>
              <li><strong className="text-ink">Co-payment:</strong> {F.vhcCoPayPerHour} an hour, capped at {F.vhcCoPayCap} in 12 months. It can be waived if you can't afford it.</li>
              <li><strong className="text-ink">Provider:</strong> named on your VHC Care Plan by the assessment agency.</li>
              <li><strong className="text-ink">To apply:</strong> call the VHC assessment agency on {F.vhcAssessmentPhone}.</li>
            </ul>
          </div>
        </div>
        <p className="text-ink-2 mt-8 max-w-3xl">
          You can't have VHC home and garden maintenance while you're approved for Household Services under the MRCA. Need more than your plan covers, or a job it doesn't include? We can do the extra privately, quoted in writing first.
        </p>
      </div>
    </section>
  );
}

function Requirements() {
  const rows = dvaRequirements();
  return (
    <section className="py-16 bg-paper-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">Provider requirements</p>
        <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mt-3">
          What DVA asks of a provider, and how we meet it
        </h2>
        <p className="text-lg text-ink-2 mt-4 max-w-3xl">
          Under Household Services, DVA asks you to choose a suitable provider and check their insurance. This is the list DVA sets out.
        </p>
        <div className="mt-8 border-t-2 border-ink">
          {rows.map((r) => (
            <div key={r.requirement} className="grid md:grid-cols-[1fr_1.3fr] gap-2 md:gap-8 py-5 border-b border-rule">
              <p className="font-bold text-ink">{r.requirement}</p>
              <p className="text-ink-2">{r.us}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="py-16 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">Booking</p>
        <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mt-3 mb-10">How to book a DVA clean with us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DVA_STEPS.map((s, i) => (
            <div key={s.title} className="card p-6">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <span className="font-display text-xl font-bold text-accent-3">{i + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">{s.title}</h3>
              <p className="text-ink-2">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <a href="tel:0752308293" className="btn btn-primary">
            <Phone className="w-4 h-4 mr-2.5" /> <PhoneNumber call />
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceCards({ exclude }) {
  const list = DVA_SERVICES.filter((s) => s.slug !== exclude);
  return (
    <section className="py-16 bg-paper-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mb-8">
          {exclude ? "Other DVA cleaning services" : "DVA cleaning services"}
        </h2>
        <div className={`grid gap-6 ${list.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {list.map((s) => (
            <Link key={s.slug} to={`/dva/${s.slug}/`} className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-xl font-semibold text-ink mb-2">DVA {s.name}</h3>
              <p className="text-ink-2">{DVA_PAGES[s.slug].subheading}</p>
              <span className="inline-flex items-center mt-4 font-bold text-accent-3">
                Read more <ArrowRight className="w-4 h-4 ml-1.5" />
              </span>
            </Link>
          ))}
          {exclude && (
            <Link to="/dva/" className="block p-6 card hover:shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <h3 className="text-xl font-semibold text-ink mb-2">DVA rates and requirements</h3>
              <p className="text-ink-2">Household Services and Veterans' Home Care explained, with DVA's current rates.</p>
              <span className="inline-flex items-center mt-4 font-bold text-accent-3">
                Read more <ArrowRight className="w-4 h-4 ml-1.5" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function Sources() {
  return (
    <section className="py-10 bg-paper">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-ink-2">
        <p className="font-bold text-ink">Where these figures come from</p>
        <p className="mt-2">
          DVA rates and rules on this page were checked against DVA's own website in November 2026. DVA sets the rules and makes every eligibility decision, so check your own approval before booking.
        </p>
        <ul className="mt-3 space-y-1.5">
          {SOURCES.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center">
                {s.label} <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3">We are a private cleaning business, not part of DVA.</p>
      </div>
    </section>
  );
}

export function DvaHub() {
  const page = DVA_HUB;
  const jsonLd = [
    buildLocalBusinessSchema(),
    dvaServiceSchema(page, "DVA Window, Gutter and Solar Panel Cleaning"),
    buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "DVA Cleaning", url: "/dva/" }]),
    buildFAQSchema(page.faqs),
  ];
  return (
    <div>
      <PageSEO title={page.title} description={page.description} canonical={`${SITE}/dva/`} image={page.image} jsonLd={jsonLd} />
      <QuoteHero headline={page.h1} subheading={page.subheading} backgroundImage={page.image} imageAlt={page.imageAlt} />
      <Breadcrumbs items={[{ name: "DVA Cleaning", url: "/dva/" }]} />
      <DirectAnswer text={page.directAnswer} />
      <ServiceCards />
      <Programs />
      <Requirements />
      <Steps />
      <GoogleReviews />
      <QuoteForm serviceName="DVA Cleaning" />
      <FAQ faqs={page.faqs} title="DVA Cleaning FAQ" />
      <Sources />
    </div>
  );
}

export function DvaService() {
  const { service } = useParams();
  const page = DVA_PAGES[service];
  if (!page) return <NotFound />;
  const jsonLd = [
    buildLocalBusinessSchema(),
    dvaServiceSchema(page, `DVA ${page.name}`),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "DVA Cleaning", url: "/dva/" },
      { name: `DVA ${page.name}`, url: `${page.path}/` },
    ]),
    buildFAQSchema(page.faqs),
  ];
  return (
    <div>
      <PageSEO title={page.title} description={page.description} canonical={`${SITE}${page.path}/`} image={page.image} jsonLd={jsonLd} />
      <QuoteHero headline={page.h1} subheading={page.subheading} backgroundImage={page.image} imageAlt={page.imageAlt} />
      <Breadcrumbs items={[{ name: "DVA Cleaning", url: "/dva/" }, { name: `DVA ${page.name}`, url: `${page.path}/` }]} />
      <DirectAnswer text={page.directAnswer} />

      <section className="py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="eyebrow">What's included</p>
            <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mt-3 mb-6">
              Our DVA {page.name.toLowerCase()} service
            </h2>
            <ul className="space-y-3">
              {page.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-2 text-lg">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            {page.why.map((w) => (
              <div key={w.title} className="card p-6">
                <h3 className="text-xl font-semibold text-ink mb-2">{w.title}</h3>
                <p className="text-ink-2">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Pricing page={page} />

      <Programs />
      <Requirements />
      <Steps />
      <GoogleReviews />
      <QuoteForm serviceName={`DVA ${page.name}`} />
      <FAQ faqs={page.faqs} title={`DVA ${page.name} FAQ`} />
      <ServiceCards exclude={service} />
      <SuburbLinks basePath="/dva" serviceSlug={service} serviceName={`DVA ${page.name}`} showAll />
      <section className="py-10 bg-paper-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-ink-2">
          Not a DVA client? See our standard <Link to={`/${service}/`} className="link font-bold">{page.name.toLowerCase()} page</Link>.
        </div>
      </section>
      <Sources />
    </div>
  );
}

function Pricing({ page }) {
  return (
    <section className="py-16 bg-paper-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">Pricing</p>
        <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mt-3">
          What DVA {page.name.toLowerCase()} costs
        </h2>
        <ul className="mt-6 space-y-3 text-lg text-ink-2">
          <li><strong className="text-ink">Household Services:</strong> charged by the hour at or under DVA's standard rate of {F.hhsHourlyRate} an hour inc GST ({F.hhsHourlyRateYear}) and invoiced to DVA, so approved hours cost you nothing.</li>
          <li><strong className="text-ink">Veterans' Home Care:</strong> {F.vhcCoPayPerHour} an hour co-payment, capped at {F.vhcCoPayCap} in 12 months, paid to your VHC provider.</li>
          <li><strong className="text-ink">Not covered by DVA:</strong> {page.privatePrice}</li>
        </ul>
        <p className="mt-6 text-ink-2">
          Want to see a private price for your home now?{" "}
          <Link to="/instant-quote/" className="link font-bold">Get an instant quote</Link>.
        </p>
      </div>
    </section>
  );
}

// /dva/<service>/<suburb>/ — the DVA service page localised to one suburb.
export function DvaSuburb() {
  const { service, suburb: suburbSlug } = useParams();
  const base = DVA_PAGES[service];
  const suburb = getSuburbBySlug(suburbSlug);
  const page = dvaSuburbPage(service, suburb);
  if (!base || !suburb || !page) return <NotFound />;
  const lower = base.name.toLowerCase();
  const crumbs = [
    { name: "DVA Cleaning", url: "/dva/" },
    { name: `DVA ${base.name}`, url: `${base.path}/` },
    { name: suburb.name, url: `${page.path}/` },
  ];
  const jsonLd = [
    buildLocalBusinessSchema(),
    { ...dvaServiceSchema(page, `DVA ${base.name} in ${suburb.name}`), areaServed: { "@type": "City", name: suburb.name } },
    buildBreadcrumbSchema([{ name: "Home", url: "/" }, ...crumbs]),
    buildFAQSchema(page.faqs),
  ];
  const nearby = (suburb.nearbySuburbs || [])
    .map((n) => SUBURBS.find((s) => s.name === n))
    .filter(Boolean);
  return (
    <div>
      <PageSEO title={page.title} description={page.description} canonical={`${SITE}${page.path}/`} image={page.image} jsonLd={jsonLd} />
      <QuoteHero headline={page.h1} subheading={page.subheading} backgroundImage={page.image} imageAlt={page.imageAlt} />
      <Breadcrumbs items={crumbs} />
      <DirectAnswer text={page.directAnswer} />

      <section className="py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="eyebrow">{suburb.name}, {suburb.postcode}</p>
            <h2 className="text-3xl md:text-[40px] md:leading-[1.1] font-bold text-ink mt-3 mb-6">
              {base.name} for veterans in {suburb.name}
            </h2>
            <p className="text-lg text-ink-2 leading-relaxed mb-4">{suburb.propertyMix}</p>
            <p className="text-lg text-ink-2 leading-relaxed mb-4">{suburb.environmentalNote}</p>
            {page.regionNote && <p className="text-lg text-ink-2 leading-relaxed mb-4">{page.regionNote}</p>}
            <p className="text-lg text-ink-2 leading-relaxed">{suburb.localHook}</p>
          </div>
          <div>
            <p className="eyebrow">What's included</p>
            <h2 className="text-3xl font-bold text-ink mt-3 mb-6">Our DVA {lower} service</h2>
            <ul className="space-y-3">
              {base.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-2 text-lg">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Pricing page={base} />
      <Programs />
      <Requirements />
      <Steps />
      <GoogleReviews />
      <QuoteForm serviceName={`DVA ${base.name}`} />
      <FAQ faqs={page.faqs} title={`DVA ${base.name} in ${suburb.name}: FAQ`} />

      <section className="py-16 bg-paper-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink mb-6">More for DVA clients in {suburb.name}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DVA_SERVICES.filter((s) => s.slug !== service).map((s) => (
              <Link key={s.slug} to={`/dva/${s.slug}/${suburb.slug}/`} className="flex items-center justify-between p-4 bg-paper rounded-lg hover:bg-paper-2 transition-colors border border-rule">
                <span className="font-medium text-ink">DVA {s.name} in {suburb.name}</span>
                <ArrowRight className="w-4 h-4 text-accent-3 flex-shrink-0" />
              </Link>
            ))}
            <Link to={`/${service}/${suburb.slug}/`} className="flex items-center justify-between p-4 bg-paper rounded-lg hover:bg-paper-2 transition-colors border border-rule">
              <span className="font-medium text-ink">{base.name} in {suburb.name} (not DVA)</span>
              <ArrowRight className="w-4 h-4 text-accent-3 flex-shrink-0" />
            </Link>
            <Link to={`${base.path}/`} className="flex items-center justify-between p-4 bg-paper rounded-lg hover:bg-paper-2 transition-colors border border-rule">
              <span className="font-medium text-ink">DVA {base.name}, all Gold Coast</span>
              <ArrowRight className="w-4 h-4 text-accent-3 flex-shrink-0" />
            </Link>
          </div>
          {nearby.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-ink mt-12 mb-6">DVA {lower} in nearby suburbs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nearby.map((n) => (
                  <Link key={n.slug} to={`/dva/${service}/${n.slug}/`} className="flex items-center justify-between p-4 bg-paper rounded-lg hover:bg-paper-2 transition-colors border border-rule">
                    <span className="font-medium text-ink">{n.name}</span>
                    <ArrowRight className="w-4 h-4 text-accent-3 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Sources />
    </div>
  );
}
