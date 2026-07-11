import React from "react";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "../data/schema";
import QuoteWizard from "../quote/QuoteWizard";

export default function InstantQuote() {
  // ?mode=details deep-links straight to the "leave your details" form
  // (used by the site-wide QuoteCTA chooser and any external links).
  const startDetails =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).get("mode") === "details";

  return (
    <div>
      <PageSEO
        title="Instant Quote | Gold Coast Window and Pressure Cleaning"
        description="Get an instant online quote for window, pressure, roof, gutter, softwash and solar panel cleaning on the Gold Coast — answer a few quick questions and see your price now."
        canonical="https://gcwindowandpressurecleaning.com.au/instant-quote/"
        jsonLd={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Instant Quote", url: "/instant-quote/" },
          ]),
        ]}
      />
      <QuoteWizard
        initialMode={startDetails ? "details" : "instant"}
        initialPhase={startDetails ? "contact" : "entry"}
      />
    </div>
  );
}
