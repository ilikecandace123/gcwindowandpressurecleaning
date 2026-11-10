import React from "react";

// Brand mark: a window pane with the sun coming up over the water, and one
// clean-glass sparkle. Drawn in the site's ink + accent so it sits on paper
// (default) or on an ink band (onInk). The raster copies in public/images/
// (logo.png/.avif, icon-512.png, apple-touch-icon.png) and public/favicon.ico
// are exported from this same drawing by scripts/assets/build-logo.mjs.
export function LogoMark({ className = "w-10 h-10", onInk = false, title }) {
  const line = onInk ? "#fbfcfd" : "#17233b";
  const pane = onInk ? "#17233b" : "#ffffff";
  return (
    <svg viewBox="0 0 48 48" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} xmlns="http://www.w3.org/2000/svg">
      <rect x="4.5" y="4.5" width="39" height="39" rx="7" fill={pane} stroke={line} strokeWidth="3" />
      <path d="M13 31.5a11 11 0 0 1 22 0z" fill="#7cc8f5" />
      <path d="M24 5v38M5 24h38" stroke={line} strokeWidth="2.5" />
      <path d="M8 35.5c2.7-2.6 5.3-2.6 8 0s5.3 2.6 8 0 5.3-2.6 8 0 5.3 2.6 8 0" fill="none" stroke={line} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M33.5 9.500l1.4 3.6 3.6 1.4-3.6 1.4-1.4 3.6-1.4-3.6-3.6-1.4 3.6-1.400z" fill="#7cc8f5" />
    </svg>
  );
}

// Mark + two-line wordmark. `compact` hides the wordmark (tight header widths
// handle that with their own classes via wordmarkClassName).
export default function Logo({ onInk = false, markClassName = "w-9 h-9 min-[420px]:w-10 min-[420px]:h-10 sm:w-11 sm:h-11", wordmarkClassName = "" }) {
  return (
    <span className="flex items-center gap-2 min-[420px]:gap-2.5 min-w-0">
      <LogoMark className={`${markClassName} flex-shrink-0`} onInk={onInk} />
      <span className={`font-display font-bold leading-[1.05] tracking-tight whitespace-nowrap ${onInk ? "text-paper" : "text-ink"} ${wordmarkClassName}`}>
        <span className="block text-[13px] min-[420px]:text-[15px] sm:text-[17px]">Gold Coast Window</span>
        <span className="block text-[13px] min-[420px]:text-[15px] sm:text-[17px]">
          <span className="italic font-medium text-accent-2">&amp;</span> Pressure Cleaning
        </span>
      </span>
    </span>
  );
}
