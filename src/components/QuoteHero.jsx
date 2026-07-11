import React from "react";
import { Shield, Users, Star, Phone, CheckCircle } from "lucide-react";
import QuoteCTA from "./QuoteCTA";

// Two-column hero: headline + trust points + call CTA on the left, the booking
// form card on the right (tappt-style). Used at the top of every page.
// id="quote" is the scroll target for the header "Get a Quote" button.
export default function QuoteHero({
  headline,
  subheading,
  description,
  bullets = ["Fully insured", "Police-checked staff", "5.0 stars from 2500+ customers", "Free, no-obligation quotes"],
  backgroundImage = "/images/services-banner.jpg",
  imagePosition = "center",
}) {
  return (
    <section id="quote" className="relative bg-gray-900 text-white overflow-hidden scroll-mt-24">
      {/* Background image (fully visible) */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet={backgroundImage ? backgroundImage.replace(".jpg", ".webp") : ""} type="image/webp" />
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ objectPosition: imagePosition }}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </div>
      {/* Light scrim — darker on the left (under the text), lets the image show through */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: headline + trust */}
          <div className="[text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
              <div className="flex items-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
                <Shield className="w-4 h-4 mr-2" /> Fully Insured
              </div>
              <div className="flex items-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="w-4 h-4 mr-2" /> Police Checked
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-4">{headline}</h1>
            {subheading && <p className="text-xl md:text-2xl mb-4 text-blue-100 font-medium">{subheading}</p>}
            {description && <p className="text-lg mb-6 text-blue-50 max-w-2xl leading-relaxed">{description}</p>}

            <ul className="space-y-2 mb-8">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex items-center mb-8">
              <div className="flex items-center text-yellow-400 mr-3">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="text-white font-medium">5.0 Stars • 2500+ Happy Customers</span>
            </div>

            <a
              href="tel:0756512386"
              className="inline-flex items-center bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white px-6 py-3 rounded-lg font-semibold transition-all border border-white/25"
            >
              <Phone className="w-5 h-5 mr-2" /> (07) 5651 2386
            </a>
          </div>

          {/* Right: booking form card */}
          <div className="lg:pl-4">
            <QuoteCTA variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
