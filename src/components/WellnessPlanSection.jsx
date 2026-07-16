import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Star, Sparkles, ArrowRight, Info } from "lucide-react";
import { PLAN_TIERS, PLAN_STEPS, PLAN_INCLUSIONS, PLAN_BENEFITS } from "../data/plans";

// The Window Cleaning Plans tier cards — shared between the Window Cleaning
// page (focal section) and the standalone /window-cleaning-plans page.
export function PlanTierCards() {
  return (
    <>
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
      {PLAN_TIERS.map((tier) => (
        <div
          key={tier.id}
          className={
            tier.popular
              ? "relative bg-white rounded-2xl shadow-xl border-2 border-blue-600 p-8 flex flex-col md:scale-105 z-10"
              : "relative bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col"
          }
        >
          {tier.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="inline-flex items-center bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow">
                <Star className="w-3.5 h-3.5 mr-1.5 fill-current" /> Most Popular
              </span>
            </div>
          )}
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{tier.name}</h3>
          <p className="text-sm text-gray-500 mb-5">{tier.frequency}</p>
          <div
            className={
              (tier.popular ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700") +
              " rounded-xl px-4 py-4 text-center mb-5"
            }
          >
            <div className="text-3xl font-extrabold leading-none">${tier.saving} off</div>
            <div className={(tier.popular ? "text-blue-100" : "text-blue-600") + " text-sm font-medium mt-1"}>
              every visit
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed flex-1">{tier.blurb}</p>
          <Link
            to="/instant-quote/"
            className={
              (tier.popular
                ? "bg-green-500 hover:bg-green-600 text-white shadow-lg"
                : "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50") +
              " mt-6 inline-flex items-center justify-center px-5 py-3 rounded-lg font-semibold transition-colors"
            }
          >
            Get My Plan Quote <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      ))}
    </div>
    <div className="max-w-3xl mx-auto mt-6 bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex items-start text-left">
      <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
      <p className="text-sm text-gray-700 leading-relaxed">
        We can do discounts for any regular cleaning interval. Just ask, e.g., four monthly, $75 off per visit, or
        two monthly, $125 off per visit.
      </p>
    </div>
    </>
  );
}

export function PlanInclusions({ dark = false }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl mx-auto text-left">
      {PLAN_INCLUSIONS.map((item, i) => (
        <li key={i} className="flex items-start">
          <CheckCircle className={(dark ? "text-green-400" : "text-green-500") + " w-5 h-5 mr-2.5 mt-0.5 flex-shrink-0"} />
          <span className={dark ? "text-blue-50" : "text-gray-700"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PlanNote() {
  return (
    <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex items-start text-left">
      <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
      <p className="text-sm text-gray-700 leading-relaxed">
        Our Window Cleaning Plans cover <strong>exterior window &amp; screen cleaning</strong> (this is what gets
        dirtier, faster). We&rsquo;ll also give you a quote for your <strong>interior windows &amp; tracks</strong> —
        you can add these on at any of your exterior cleaning visits as needed.
      </p>
    </div>
  );
}

// Full focal-point section used on the Window Cleaning page.
export default function WellnessPlanSection() {
  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      {/* soft decorative glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-blue-100 mb-4">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-300" /> Our most popular way to keep windows clean
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Window Cleaning Plans</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Pre-booked, priority-scheduled window cleaning — crystal-clear views, all year round.
          </p>
        </div>

        {/* How it works */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          {PLAN_STEPS.map((step, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-5 text-center">
              <div className="w-10 h-10 rounded-full bg-white text-blue-800 font-bold text-lg flex items-center justify-center mx-auto mb-3">
                {i + 1}
              </div>
              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-blue-100">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Tier cards */}
        <div className="text-gray-900 mb-10 pt-4">
          <PlanTierCards />
        </div>

        {/* Note + inclusions */}
        <div className="space-y-8 mb-12">
          <PlanNote />
          <div>
            <h3 className="text-center text-lg font-semibold text-blue-100 mb-4">Every plan also includes</h3>
            <PlanInclusions dark />
          </div>
        </div>

        {/* Why homeowners join */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {PLAN_BENEFITS.map((b, i) => (
            <div key={i} className="text-center px-4">
              <h3 className="font-bold text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-blue-100 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/instant-quote/"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-xl transition-colors"
          >
            Build My Plan — Get an Instant Quote <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
