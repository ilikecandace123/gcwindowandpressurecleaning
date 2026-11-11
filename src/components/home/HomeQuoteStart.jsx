import React, { useState, lazy, Suspense } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import ServiceIcon from "./ServiceIcon";
import { QUOTE_START_SERVICES } from "../../data/homePage";

// The real quote wizard, loaded only once someone presses Next, so its code
// stays out of the first page load and the quote funnel only counts people
// who actually started (the wizard records a screen as soon as it mounts).
const QuoteWizard = lazy(() => import("../../quote/QuoteWizard"));

const STEPS = ["Service", "Your home", "Price", "Book"];

// First step of the instant quote, sitting on the home page: tick what you
// need, press Next, and the wizard opens right here at its first question
// with those services already chosen.
export default function HomeQuoteStart() {
  const [picked, setPicked] = useState([]);
  const [started, setStarted] = useState(false);

  const toggle = (key) => setPicked((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key]));

  if (started) {
    return (
      <div className="bg-paper-white rounded-[22px] shadow-2xl text-left px-5 sm:px-8 py-7 sm:py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-16 text-ink-3">
              <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading your quote…
            </div>
          }
        >
          <QuoteWizard embedded initialMode="instant" initialPhase="questions" initialServices={picked} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="bg-paper-white rounded-[22px] shadow-2xl overflow-hidden text-left">
      <ol className="home-quote-steps bg-ink text-paper/60 grid grid-cols-4 px-4 sm:px-7 pt-5 pb-4" aria-label="Quote steps">
        {STEPS.map((s, i) => (
          <li key={s} className={`relative text-center text-[10px] sm:text-[11.5px] font-bold tracking-[.12em] uppercase ${i === 0 ? "text-accent" : ""}`}>
            <span className={`relative z-[1] flex w-8 h-8 mx-auto mb-2 rounded-full items-center justify-center text-sm ${i === 0 ? "bg-accent text-ink" : "bg-ink-2 text-paper"}`}>
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
      <div className="px-5 sm:px-8 pt-6 pb-7">
        <h3 className="text-[23px] sm:text-[25px] font-bold text-ink mb-4">What can we clean for you?</h3>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {QUOTE_START_SERVICES.map((s) => {
            const on = picked.includes(s.key);
            return (
              <button
                key={s.key}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.key)}
                className={"flex items-center gap-3 rounded-[14px] border-2 px-3.5 py-3 text-left font-bold text-[16.5px] text-ink transition-colors " + (on ? "border-ink bg-accent-50" : "border-rule bg-paper-white hover:border-ink")}
              >
                <ServiceIcon name={s.icon} className="w-8 h-8 flex-none" />
                <span className="flex-1">{s.label}</span>
                <span className={"w-[22px] h-[22px] rounded-md border-2 flex-none flex items-center justify-center " + (on ? "border-ink bg-ink" : "border-rule bg-paper-white")}>
                  {on && <Check className="w-3.5 h-3.5 text-paper-white" strokeWidth={3.5} />}
                </span>
              </button>
            );
          })}
        </div>
        <button type="button" disabled={!picked.length} onClick={() => setStarted(true)} className="btn btn-ink btn-lg w-full mt-5">
          Next <ArrowRight className="w-5 h-5 ml-2" />
        </button>
        <p className="text-[14px] text-ink-3 text-center mt-3">Tick one or more. About two minutes, no phone call needed.</p>
      </div>
    </div>
  );
}
