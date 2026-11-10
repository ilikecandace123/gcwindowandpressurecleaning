import React from "react";

// Brand mark: a squeegee wiping one clean stripe across a sky-blue pane.
// Drawn in the site's ink + accent so it sits on paper (default) or on an ink
// band (onInk). The raster copies in public/images/ (logo.png/.avif,
// icon-512.png, apple-touch-icon.png) and public/favicon.ico are exported from
// this same drawing by scripts/assets/build-logo.mjs.
export function LogoMark({ className = "w-10 h-10", onInk = false, title }) {
  const edge = onInk ? "#fbfcfd" : "#17233b";
  return (
    <svg viewBox="0 0 96 96" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="80" height="80" rx="16" fill="#7cc8f5" />
      {/* The wiped stripe, cut to the pane's rounded bottom-left corner. */}
      <path d="M38 20L76 58L46 88H24A16 16 0 0 1 8 72V50Z" fill="#ffffff" opacity=".95" />
      {/* Blade, then handle. */}
      <path d="M38 20L76 58" stroke="#17233b" strokeWidth="8" strokeLinecap="round" />
      <path d="M57 39L78 18" stroke="#17233b" strokeWidth="6" strokeLinecap="round" />
      <rect x="8" y="8" width="80" height="80" rx="16" fill="none" stroke={edge} strokeWidth="4" />
    </svg>
  );
}

// Mark + two-line wordmark in bold capitals. `wordmarkClassName` lets tight
// header widths hide the wordmark and keep the mark.
export default function Logo({ onInk = false, markClassName = "w-9 h-9 min-[420px]:w-10 min-[420px]:h-10 sm:w-11 sm:h-11", wordmarkClassName = "" }) {
  return (
    <span className="flex items-center gap-2 min-[420px]:gap-2.5 sm:gap-3 min-w-0">
      <LogoMark className={`${markClassName} flex-shrink-0`} onInk={onInk} />
      <span className={`font-sans font-bold uppercase leading-[1.08] tracking-[.01em] min-[420px]:tracking-[.035em] whitespace-nowrap ${onInk ? "text-paper" : "text-ink"} ${wordmarkClassName}`}>
        <span className="block text-[11px] min-[420px]:text-[13.5px] sm:text-[15.5px]">Gold Coast Window</span>
        <span className="block text-[11px] min-[420px]:text-[13.5px] sm:text-[15.5px]">
          <span className={onInk ? "text-accent" : "text-accent-2"}>&amp;</span> Pressure Cleaning
        </span>
      </span>
    </span>
  );
}
