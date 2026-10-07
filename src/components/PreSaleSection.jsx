import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowRight, CalendarCheck } from "lucide-react";

// Pre-sale cleaning section, shown on the window and pressure cleaning pages.
// Answers the "cleaning before selling / before an open home" questions
// directly on the service page and links to the full guide + instant quote.
const COPY = {
  window: {
    heading: "Window cleaning before selling your house",
    answer:
      "Clean windows are one of the cheapest ways to make a home look better in listing photos and at open homes. Book your clean for the 1–3 days before the photographer, so the glass is spotless and the light comes through clear.",
    points: [
      "Inside and out, plus tracks and screens — buyers open windows and slide doors at inspections.",
      "Salt film and hard-water spots show up badly in photos taken into the light.",
      "Book a week or two ahead in spring and summer, when Gold Coast listing season is busiest.",
    ],
  },
  pressure: {
    heading: "Pressure cleaning before an open home",
    answer:
      "A clean driveway and entry is the first thing a buyer sees, before they reach the front door. Pressure clean 2–7 days before photos or the first open home, so the concrete is fully dry and an even colour.",
    points: [
      "Driveway, front path and entry first — they frame the street photo.",
      "Do the roof and house walls before the driveway, so runoff doesn't re-mark clean concrete.",
      "Mould-stained pool surrounds and entertaining areas are worth doing too — they're in the listing photos.",
    ],
  },
};

export default function PreSaleSection({ variant = "window" }) {
  const c = COPY[variant] || COPY.window;
  return (
    <section className="py-16 bg-white" aria-labelledby={`presale-${variant}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <Home className="w-7 h-7 text-blue-600" aria-hidden="true" />
          <h2 id={`presale-${variant}`} className="text-3xl font-bold text-gray-900">
            {c.heading}
          </h2>
        </div>
        <p className="text-lg text-gray-700 mb-6">{c.answer}</p>
        <ul className="space-y-3 mb-8">
          {c.points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-gray-700">
              <CalendarCheck className="w-5 h-5 mt-1 text-green-600 shrink-0" aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/guides/cleaning-before-selling-your-house-gold-coast/"
            className="inline-flex items-center justify-center font-semibold text-blue-600 hover:text-blue-700"
          >
            Guide: What cleaning should you do before selling your house?
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Link>
          <Link
            to="/instant-quote/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Get an instant pre-sale quote
          </Link>
        </div>
      </div>
    </section>
  );
}
