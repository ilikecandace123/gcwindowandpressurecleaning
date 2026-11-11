import React from "react";
import { Phone, Star } from "lucide-react";
import { HOME_HERO, HERO_PHOTOS } from "../../data/homePage";

// Top of the home page: one big photo with a short headline over a solid
// panel that fades into it. On a phone the photo sits across the top and the
// panel fades up from below. The site header floats over this (Layout.jsx).
// Colours and photo come from HOME_HERO in src/data/homePage.js.
export default function HomeHero() {
  const photo = HERO_PHOTOS[HOME_HERO.photo] || HERO_PHOTOS.team;
  const blue = HOME_HERO.theme === "blue";
  return (
    <section
      className={`home-hero no-rule ${blue ? "home-hero--blue bg-accent text-ink" : "home-hero--navy bg-ink text-paper"}`}
      style={{
        "--hero-left": photo.boxLeft,
        "--hero-solid": photo.fadeSolid,
        "--hero-clear": photo.fadeClear,
        "--hero-pos": photo.position,
        "--hero-pos-mobile": photo.mobilePosition,
      }}
    >
      <picture>
        <source srcSet={photo.src.replace(".jpg", ".webp")} type="image/webp" />
        <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} className="home-hero__img" loading="eager" decoding="async" fetchPriority="high" />
      </picture>
      <div className="home-hero__fade" aria-hidden="true" />

      <div className="relative z-[2] max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pt-[300px] md:pt-[150px] lg:pt-[170px] pb-9 md:pb-[90px] lg:pb-[110px] text-center md:text-left">
        <div className="md:max-w-[440px] lg:max-w-[540px]">
          <p className="inline-flex items-center gap-2.5 font-semibold text-[15.5px]">
            <span className={`flex items-center gap-0.5 ${blue ? "text-ink" : "text-accent"}`} role="img" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-[17px] h-[17px] fill-current" aria-hidden="true" />
              ))}
            </span>
            {HOME_HERO.rating}
          </p>
          <h1 className="font-display font-bold tracking-tight leading-[1.04] text-[46px] md:text-[58px] lg:text-[72px] xl:text-[82px] mt-4 md:mt-5">
            {HOME_HERO.headline}
            <br />
            <em className={`italic font-semibold ${blue ? "text-paper-white" : "text-accent"}`}>{HOME_HERO.headlineAccent}</em>
          </h1>
          <p className="text-[18px] lg:text-[21px] leading-normal mt-4 md:mt-5 lg:mt-6 md:max-w-[470px]">{HOME_HERO.sub}</p>
          <div className="flex flex-col md:flex-row md:flex-wrap gap-3.5 mt-6 lg:mt-9">
            <a href="#quote" className={`home-hero__btn ${blue ? "bg-ink text-paper" : "bg-accent text-ink"}`}>
              <span>
                Get your instant quote
                <small className="block font-semibold text-[12.5px] opacity-75 mt-[3px]">About 2 minutes</small>
              </span>
            </a>
            <a href="tel:0752308293" className={`home-hero__btn border-2 ${blue ? "border-ink text-ink" : "border-paper/70 text-paper"}`}>
              <Phone className="w-[18px] h-[18px] mr-2" /> Call (07) 5230 8293
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
