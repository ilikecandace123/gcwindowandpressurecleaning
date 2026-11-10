import React from "react";
import { Star, Phone } from "lucide-react";
import QuoteCTA from "./QuoteCTA";

// "Roof Cleaning Gold Coast — Tile, Metal & Concrete Roofs" and "Window
// Cleaning in Burleigh Heads" both read better with the second half set in
// italic ochre. Splits on an em dash first, then on the place phrase.
export function splitHeadline(headline) {
  const text = String(headline || "");
  const dash = text.split(" — ");
  if (dash.length === 2) return [dash[0], dash[1]];
  const m = text.match(/^(.+?)\s+((?:on the|in|across the)\s+[A-Z].*)$/);
  return m ? [m[1], m[2]] : [text, ""];
}

// Page hero used at the top of every page: headline, trust points and the
// phone number on the left; the page photo in an ink frame with the quote
// card tucked under it on the right. The card only overlaps the bottom edge
// of the photo, so the photo stays visible. On phones the order is headline,
// photo, quote card, trust points.
// id="quote" is the scroll target for the "Get a Quote" buttons.
export default function QuoteHero({
  headline,
  subheading,
  description,
  eyebrow = "Gold Coast · Northern NSW",
  bullets = ["Fully insured", "Police-checked staff", "5.0 stars from 2500+ customers", "Free, no-obligation quotes"],
  backgroundImage = "/images/services-banner.jpg",
  imagePosition = "center",
  imageAlt = "",
}) {
  const [lead, tail] = splitHeadline(headline);
  return (
    <section id="quote" className="no-rule dots scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-14 pb-10 lg:pb-16">
        <div className="grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-x-14 gap-y-7 items-start">
          {/* Headline block */}
          <div className="lg:col-start-1 lg:row-start-1">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="font-display font-bold text-[38px] sm:text-5xl xl:text-[58px] leading-[1.04] tracking-tight mt-4">
              {lead}
              {tail && (
                <>
                  {" "}
                  <em className="italic font-medium text-ochre-2">{tail}</em>
                </>
              )}
            </h1>
            {subheading && <p className="text-xl sm:text-[22px] leading-snug text-ink-2 mt-5 max-w-[46ch]">{subheading}</p>}
            {description && <p className="text-lg text-ink-2 mt-3 max-w-[54ch] leading-relaxed">{description}</p>}
          </div>

          {/* Photo + quote card */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div className="photo-frame aspect-[16/10] lg:aspect-[2/1] xl:aspect-[16/9] bg-paper-2">
              <picture>
                <source srcSet={backgroundImage ? backgroundImage.replace(".jpg", ".webp") : ""} type="image/webp" />
                <img
                  src={backgroundImage}
                  alt={imageAlt}
                  aria-hidden={imageAlt ? undefined : "true"}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: imagePosition }}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
            </div>
            <div className="relative mt-6 lg:mt-7 lg:-ml-8 lg:mr-8">
              <QuoteCTA variant="hero" />
            </div>
          </div>

          {/* Trust points + phone */}
          <div className="lg:col-start-1 lg:row-start-2">
            <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-[15px] font-semibold text-ink-2">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2 before:content-['✓'] before:text-moss before:font-bold">
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex items-center mt-6">
              <div className="flex items-center text-ochre mr-3">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="text-ink font-semibold">5.0 Stars • 2500+ Happy Customers</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-7">
              <a href="tel:0752308293" className="btn btn-outline">
                <Phone className="w-4 h-4 mr-2" /> (07) 5230 8293
              </a>
              <span className="text-sm text-ink-3">Call or text. We actually answer.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
