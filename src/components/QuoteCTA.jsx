import React, { useState, lazy, Suspense } from "react";
import { Zap, PhoneCall, ArrowRight, Star, Loader2 } from "lucide-react";

// Lazy-load the wizard so its chunk only downloads when someone actually
// starts a quote — QuoteCTA renders on every page.
const QuoteWizard = lazy(() => import("../quote/QuoteWizard"));

const WizardFallback = () => (
  <div className="flex items-center justify-center py-16 text-gray-400">
    <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading your quote…
  </div>
);

// The two-path quote chooser — replaces the old inline booking form wherever
// it appeared (page heroes + bottom-of-page section). Choosing a path opens
// the quote wizard RIGHT HERE, inline — no page navigation.
function Choices({ compact = false, onInstant, onDetails }) {
  return (
    <div className={compact ? "space-y-3" : "grid sm:grid-cols-2 gap-4 items-stretch"}>
      <button
        type="button"
        onClick={onInstant}
        className="group w-full flex flex-col bg-green-500 hover:bg-green-600 text-white rounded-2xl p-6 text-left shadow-lg transition-colors"
      >
        <Zap className="w-7 h-7 mb-2.5" />
        <span className="text-lg font-bold mb-1">Get Instant Quote</span>
        <span className="text-green-50 text-sm flex-1">
          Answer some quick questions and see your price straight away — about 2 minutes.
        </span>
        <span className="mt-3 inline-flex items-center font-semibold text-sm">
          Start now <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </button>

      <button
        type="button"
        onClick={onDetails}
        className="group w-full flex flex-col bg-white border-2 border-gray-200 hover:border-blue-400 rounded-2xl p-6 text-left shadow-sm transition-colors"
      >
        <PhoneCall className="w-7 h-7 mb-2.5 text-blue-600" />
        <span className="text-lg font-bold text-gray-900 mb-1">Put in your details</span>
        <span className="text-gray-500 text-sm flex-1">
          Skip the questions — leave your details and we&rsquo;ll contact you with your quote.
        </span>
        <span className="mt-3 inline-flex items-center font-semibold text-sm text-blue-600">
          Leave my details <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </button>
    </div>
  );
}

export default function QuoteCTA({ variant = "section" }) {
  // null = chooser; "instant" | "details" = wizard open inline
  const [active, setActive] = useState(null);

  const wizard = active && (
    <Suspense fallback={<WizardFallback />}>
      <QuoteWizard
        key={active}
        embedded
        initialMode={active}
        initialPhase={active === "details" ? "contact" : "services"}
        onBackFromStart={() => setActive(null)}
      />
    </Suspense>
  );

  // Compact card for the hero side column.
  if (variant === "hero") {
    return (
      <div id="quote-form" className="bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-7 w-full">
        {active ? (
          wizard
        ) : (
          <>
            <div className="text-center mb-5">
              {/* h2, not h3: this card sits directly under the page h1, so an h3
                  would skip a heading level for screen readers and agent parsers.
                  Tailwind sizing is explicit, so the rendered design is unchanged. */}
              <h2 className="text-2xl font-bold text-gray-900">Get Your Free Quote</h2>
            </div>
            <Choices compact onInstant={() => setActive("instant")} onDetails={() => setActive("details")} />
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 mr-1" />
              5.0 stars — 2500+ happy customers · Free, no obligation
            </p>
          </>
        )}
      </div>
    );
  }

  // Full-width section (bottom of every page).
  return (
    <section className="py-16 bg-white" id="book-online">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {active ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 sm:px-10 py-8 sm:py-10">{wizard}</div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get Your Free Quote</h2>
              <p className="text-lg text-gray-600">
                Answer some quick questions for an instant online price — or just leave your details and we&rsquo;ll be
                in touch. No phone call required.
              </p>
            </div>
            <Choices onInstant={() => setActive("instant")} onDetails={() => setActive("details")} />
            <p className="text-center text-sm text-gray-400 mt-6">
              Prefer to talk?{" "}
              <a href="tel:0756512386" className="text-blue-600 font-medium hover:underline">
                Call (07) 5651 2386
              </a>{" "}
              — we actually answer.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
