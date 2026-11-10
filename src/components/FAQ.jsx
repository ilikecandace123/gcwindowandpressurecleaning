import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";

// Ruled accordion in the site's serif. `guideLink` (optional): { label, href }
// or an array of them — renders links to the matching expert guides below the
// FAQ list for internal linking to /guides/ content.
export default function FAQ({ faqs, title = "Frequently Asked Questions", subtitle, guideLink }) {
  const [openIndex, setOpenIndex] = useState(0);
  const guideLinks = (Array.isArray(guideLink) ? guideLink : guideLink ? [guideLink] : []).filter(
    (g) => g && g.href && g.label
  );

  return (
    <section className="py-16 bg-paper" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="eyebrow">Questions</p>
          <h2 className="text-3xl md:text-[40px] font-bold text-ink leading-[1.1] mt-3">
            {title}
          </h2>
          {subtitle && <p className="text-lg text-ink-2 mt-3">{subtitle}</p>}
        </div>

        <div className="border-t-2 border-ink">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-rule">
              <button
                className="w-full py-4 text-left flex justify-between items-start gap-4 group"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="font-bold text-ink text-lg sm:text-[21px] leading-snug group-hover:text-ochre-3 transition-colors">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-ochre-2 flex-shrink-0 mt-1" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-ochre-2 flex-shrink-0 mt-1" />
                )}
              </button>

              {/* Answer is always rendered into the DOM (hidden via CSS when
                  collapsed) so crawlers, AI bots and the markdown mirrors can
                  read every answer, not just the open one. */}
              <div className={openIndex === index ? "pb-5 -mt-1" : "hidden pb-5 -mt-1"}>
                <p className="text-ink-2 text-[17px] leading-relaxed max-w-[72ch]">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {guideLinks.length > 0 && (
          <div className="mt-7 flex flex-col items-start gap-3">
            {guideLinks.map((g) => (
              <Link key={g.href} to={g.href} className="link inline-flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-ochre-2" />
                {g.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
