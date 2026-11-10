import React from "react";

// Editorial columns: each benefit sits under an ink rule with a serif
// numeral, instead of a grid of icon cards.
export default function Benefits({ benefits, title = "Why Choose Our Service?" }) {
  return (
    <section className="py-16 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">Why it matters</p>
          <h2 className="text-3xl md:text-[40px] font-bold text-ink leading-[1.1] mt-3">
            {title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9">
          {benefits.map((benefit, index) => (
            <div key={index} className="border-t-2 border-ink pt-4">
              <div className="font-display italic font-medium text-2xl text-ochre-2 leading-none mb-2">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">
                {benefit.title}
              </h3>
              <p className="text-ink-2 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
