import React, { useState, lazy, Suspense } from "react";
import { Zap, PhoneCall, ArrowRight, Star, Loader2 } from "lucide-react";

// Lazy-load the wizard so its chunk only downloads when someone actually
// starts a quote — QuoteCTA renders on every page.
const QuoteWizard = lazy(() => import("../quote/QuoteWizard"));

const WizardFallback = () => (
  <div className="flex items-center justify-center py-16 text-ink-3">
    <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading your quote…
  </div>
);

// The two-path quote chooser — replaces the old inline booking form wherever
// it appeared (page heroes + bottom-of-page section). Choosing a path opens
// the quote wizard RIGHT HERE, inline — no page navigation.
function Choices({ compact = false, onInstant, onDetails }) {
  return (
    <div className={compact ? "space-y-3.5" : "grid sm:grid-cols-2 gap-5 items-stretch"}>
      <button
        type="button"
        onClick={onInstant}
        className="group w-full flex flex-col bg-ochre text-ink border-2 border-ink rounded-xl p-5 sm:p-6 text-left shadow-hard-sm transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      >
        <Zap className="w-7 h-7 mb-2.5" />
        <span className="font-display text-xl font-bold mb-1">Get Instant Quote</span>
        <span className="text-ink/85 text-[15px] flex-1">
          Answer some quick questions and see your price straight away — about 2 minutes.
        </span>
        <span className="mt-3 inline-flex items-center font-bold text-[15px]">
          Start now <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </button>

      <button
        type="button"
        onClick={onDetails}
        className="group w-full flex flex-col bg-paper-white border-2 border-ink/25 hover:border-ink rounded-xl p-5 sm:p-6 text-left transition-colors"
      >
        <PhoneCall className="w-7 h-7 mb-2.5 text-ochre-2" />
        <span className="font-display text-xl font-bold text-ink mb-1">Put in your details</span>
        <span className="text-ink-2 text-[15px] flex-1">
          Skip the questions — leave your details and we&rsquo;ll contact you with your quote.
        </span>
        <span className="mt-3 inline-flex items-center font-bold text-[15px] text-ink">
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
      <div id="quote-form" className="card text-ink shadow-xl p-5 sm:p-7 w-full">
        {active ? (
          wizard
        ) : (
          <>
            <div className="mb-4">
              {/* h2, not h3: this card sits directly under the page h1, so an h3
                  would skip a heading level for screen readers and agent parsers.
                  Tailwind sizing is explicit, so the rendered design is unchanged. */}
              <h2 className="font-display text-2xl sm:text-[28px] font-bold text-ink">Get Your Free Quote</h2>
            </div>
            <Choices compact onInstant={() => setActive("instant")} onDetails={() => setActive("details")} />
            <p className="text-[13px] text-ink-3 mt-4 flex items-center">
              <Star className="w-3.5 h-3.5 fill-ochre text-ochre mr-1.5" />
              5.0 stars — 2500+ happy customers · Free, no obligation
            </p>
          </>
        )}
      </div>
    );
  }

  // Full-width section (bottom of every page).
  return (
    <section className="py-16 bg-paper-2" id="book-online">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {active ? (
          <div className="card shadow-lg px-5 sm:px-10 py-8 sm:py-10">{wizard}</div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-[40px] font-bold text-ink mb-4 leading-tight">Get Your Free Quote</h2>
              <p className="text-lg text-ink-2">
                Answer some quick questions for an instant online price — or just leave your details and we&rsquo;ll be
                in touch. No phone call required.
              </p>
            </div>
            <Choices onInstant={() => setActive("instant")} onDetails={() => setActive("details")} />
            <p className="text-center text-[15px] text-ink-2 mt-7">
              Prefer to talk?{" "}
              <a href="tel:0752308293" className="link">
                Call (07) 5230 8293
              </a>{" "}
              — we actually answer.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
