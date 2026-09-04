import React from "react";
import { Link } from "react-router-dom";
import PageSEO from "../components/PageSEO";
import Breadcrumbs from "../components/Breadcrumbs";
import QuoteHero from "../components/QuoteHero";
import { buildLocalBusinessSchema, buildBreadcrumbSchema, BUSINESS_EMAIL, BUSINESS_PHONE } from "../data/schema";

const UPDATED = "4 September 2026";

/**
 * Privacy policy. Describes what this website actually does — the booking and
 * instant-quote forms, the address autocomplete, the Google reviews proxy, the
 * AI follow-up questions and the analytics — rather than boilerplate. If any of
 * those data flows change, this page must change with them.
 */
export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageSEO
        title="Privacy Policy | Gold Coast Window & Pressure"
        description="How Gold Coast Window and Pressure Cleaning collects, uses, stores and discloses your personal information when you request a quote or book a clean. Australian Privacy Principles."
        canonical="https://gcwindowandpressurecleaning.com.au/privacy/"
        jsonLd={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Privacy Policy", url: "/privacy/" }
          ])
        ]}
      />

      <Breadcrumbs items={[{ name: "Privacy Policy", url: "/privacy/" }]} />

      <QuoteHero
        headline={"Privacy Policy"}
        subheading={"How we handle your personal information."}
        backgroundImage={"/images/services-banner.jpg"}
      />

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-headings:text-gray-900">
          <p className="text-sm text-gray-500 mb-8">Last updated: {UPDATED}</p>

          <p className="text-lg text-gray-700 mb-8">
            Gold Coast Window and Pressure Cleaning (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides exterior cleaning
            services on the Gold Coast, Queensland and in Northern New South Wales. This policy explains what personal
            information this website collects, why we collect it, who we share it with, and how you can get it removed.
            We handle personal information in accordance with the Australian Privacy Principles in the{" "}
            <em>Privacy Act 1988</em> (Cth).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">What we collect</h2>
          <p className="text-gray-700 mb-4">
            We only collect what we need to quote and carry out a clean. Depending on which form you use, that is:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li>
              <strong>Your name and phone number</strong> — entered on the instant quote form before your price is
              shown, so we can call you back about the job.
            </li>
            <li>
              <strong>Your email address and the property address</strong> — entered after your price, so we can send
              the written quote and find the property.
            </li>
            <li>
              <strong>Details about the property and the job</strong> — the answers you give in the quote questions
              (property type, storeys, condition, how many panes, and so on), plus any notes you add.
            </li>
            <li>
              <strong>Photos you choose to upload</strong> — optional, and only used to quote the job accurately.
            </li>
            <li>
              <strong>Anonymous usage data</strong> — which pages and quote steps were viewed, so we can see where
              people get stuck. This is not linked to your name and we do not use it to build a profile of you.
            </li>
          </ul>
          <p className="text-gray-700 mb-6">
            We do not collect payment card details through this website, and we never ask for them by email. We do not
            knowingly collect information from children.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">How we use it</h2>
          <p className="text-gray-700 mb-6">
            To prepare your quote, contact you about it, schedule and complete the work, invoice you, and keep records
            we are required to keep. If you ask us not to contact you again, we will stop. We do not sell your personal
            information, and we do not share it with anyone for their own marketing.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">Who we share it with</h2>
          <p className="text-gray-700 mb-4">
            We use a small number of service providers to run the business. Your information is only shared with them
            for the purposes above:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li>
              <strong>ServiceM8</strong> — our job management system. Quote requests, contact details, job notes and
              any photos you upload are stored here.
            </li>
            <li>
              <strong>Google</strong> — the address field uses Google Places to suggest addresses as you type, our
              reviews are fetched from Google, and we use Google Analytics for anonymous usage statistics.
            </li>
            <li>
              <strong>Google Gemini</strong> — the booking form generates follow-up questions about your job from the
              description you write. Only that description is sent; your name, phone, email and address are not.
            </li>
            <li>
              <strong>Cloudflare</strong> — hosts this website and protects it from abuse.
            </li>
            <li>
              <strong>n8n</strong> — moves form submissions from this website into ServiceM8 and our inbox.
            </li>
          </ul>
          <p className="text-gray-700 mb-6">
            Some of these providers store data on servers outside Australia, including in the United States. We may
            also disclose information where we are required to by law.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">Cookies and tracking</h2>
          <p className="text-gray-700 mb-6">
            This site uses Google Analytics cookies to count visits and see which pages are useful. The quote form also
            keeps a short-lived, anonymous identifier in your browser so we can tell one quote session from another and
            see which questions people abandon. You can block or delete these in your browser settings; the site will
            still work. We do not run advertising or retargeting cookies on this website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">How long we keep it</h2>
          <p className="text-gray-700 mb-6">
            Quote requests that do not become jobs are kept while they are still worth following up, then deleted.
            Records for completed work are kept for at least seven years, as tax and insurance obligations require.
            Anonymous analytics are retained on the standard Google Analytics schedule.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">Security</h2>
          <p className="text-gray-700 mb-6">
            This website is served over HTTPS and form submissions are encrypted in transit. Access to ServiceM8 and
            our email is restricted to people who need it. No system is perfectly secure, but if a breach ever occurred
            that was likely to cause you serious harm, we would notify you and the Office of the Australian Information
            Commissioner as the Notifiable Data Breaches scheme requires.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">Accessing, correcting or deleting your information</h2>
          <p className="text-gray-700 mb-6">
            You can ask us what personal information we hold about you, ask us to correct it, or ask us to delete it.
            Email{" "}
            <a href={`mailto:${BUSINESS_EMAIL}`} className="text-blue-600 font-medium hover:underline">
              {BUSINESS_EMAIL}
            </a>{" "}
            or call{" "}
            <a href="tel:0756512386" className="text-blue-600 font-medium hover:underline">
              {BUSINESS_PHONE}
            </a>
            . We will respond within 30 days. There is no charge. If we cannot delete something because we are required
            to keep it, we will tell you why.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">Complaints</h2>
          <p className="text-gray-700 mb-6">
            If you think we have mishandled your personal information, contact us first using the details above and we
            will try to resolve it. If you are not satisfied with our response, you can complain to the Office of the
            Australian Information Commissioner at oaic.gov.au or on 1300 363 992.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">Changes to this policy</h2>
          <p className="text-gray-700 mb-6">
            If we change how we handle personal information, we will update this page and the date at the top. The
            current version always lives at this address.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">Contact us</h2>
          <p className="text-gray-700 mb-2">Gold Coast Window and Pressure Cleaning</p>
          <p className="text-gray-700 mb-2">
            Phone:{" "}
            <a href="tel:0756512386" className="text-blue-600 font-medium hover:underline">
              {BUSINESS_PHONE}
            </a>
          </p>
          <p className="text-gray-700 mb-8">
            Email:{" "}
            <a href={`mailto:${BUSINESS_EMAIL}`} className="text-blue-600 font-medium hover:underline">
              {BUSINESS_EMAIL}
            </a>
          </p>

          <p className="text-gray-600">
            See also our <Link to="/about/" className="text-blue-600 font-medium hover:underline">About</Link> and{" "}
            <Link to="/contact/" className="text-blue-600 font-medium hover:underline">Contact</Link> pages.
          </p>
        </div>
      </section>
    </div>
  );
}
