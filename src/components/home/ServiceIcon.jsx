import React from "react";

// Small two-tone drawings for the moving service strip and the quote picker,
// in the site's ink and sky blue. Drawn here (not an icon font) so each one
// shows the actual job: a squeegee on glass, a roof, a pressure wand, a
// gutter with a leaf, a solar panel in the sun, a house with suds.
const INK = "#17233b";
const SKY = "#7cc8f5";
const SKY_DEEP = "#2b8bd0";
const WHITE = "#ffffff";

const DRAWINGS = {
  window: (
    <>
      <rect x="6" y="5" width="26" height="34" rx="3" fill={SKY} />
      <path d="M19 5v34M6 22h26" />
      <path d="M10.5 16l4.5-5.500M23.500 34l4.500-5.500" stroke={WHITE} />
      <path d="M28 27l15 6.500" strokeWidth="4.600" />
      <path d="M35.500 30.500l-3 12.500" strokeWidth="3.200" />
    </>
  ),
  roof: (
    <>
      <path d="M32 13V6h6v12" fill={WHITE} />
      <path d="M4 27L24 9l20 18v4H4z" fill={SKY} />
      <path d="M9 31v11h30V31" fill={WHITE} />
      <path d="M14 22.500h20M9.500 27h29" strokeWidth="1.800" />
      <path d="M9 5v8M5 9h8" stroke={SKY_DEEP} />
    </>
  ),
  pressure: (
    <>
      <path d="M5 42c0-7 6-6 9-9" strokeWidth="2.200" />
      <path d="M9 38l19-19" strokeWidth="5" />
      <path d="M15.500 32.500l4 5.500" strokeWidth="4" />
      <path d="M31 16l5.500-5.500M32.500 19.500l8-2.500M28 13.500l2-8" stroke={SKY_DEEP} />
      <circle cx="40.500" cy="8.500" r="2.200" fill={SKY} strokeWidth="2" />
      <circle cx="43" cy="22" r="1.800" fill={SKY} strokeWidth="2" />
      <circle cx="34" cy="4.500" r="1.600" fill={SKY} strokeWidth="2" />
    </>
  ),
  gutter: (
    <>
      <path d="M4 18h40v5a8 8 0 01-8 8H12a8 8 0 01-8-8z" fill={SKY} />
      <path d="M33 31v12" strokeWidth="5.500" />
      <path d="M14 13c0-5.500 6.500-9 11.500-6.500C25 12 20 15.500 14 13z" fill={WHITE} />
      <path d="M14 13l6.500-4" strokeWidth="1.800" />
      <path d="M14 36c0 2-1.500 3.500-1.500 5a1.500 1.500 0 003 0c0-1.500-1.500-3-1.500-5z" fill={SKY} strokeWidth="1.800" />
    </>
  ),
  solar: (
    <>
      <circle cx="35" cy="10" r="5" fill={WHITE} />
      <path d="M35 1.500v0M43.500 10h0M41 4h0M29 4h0" stroke={SKY_DEEP} strokeWidth="3.200" />
      <path d="M11 21h26l7 21H4z" fill={SKY} />
      <path d="M8.700 28h30.600M6.400 35h35.200M19.500 21l-3 21M28.500 21l3 21" strokeWidth="1.900" />
    </>
  ),
  house: (
    <>
      <path d="M9 23v19h28V23" fill={WHITE} />
      <path d="M4 25L23 8l19 17" />
      <rect x="19" y="30" width="8" height="12" fill={SKY} />
      <circle cx="40" cy="9" r="4.500" fill={SKY} strokeWidth="2.200" />
      <circle cx="33" cy="4.500" r="2.500" fill={SKY} strokeWidth="2" />
      <circle cx="44" cy="18" r="2" fill={SKY} strokeWidth="2" />
    </>
  ),
};

export const SERVICE_ICON_NAMES = Object.keys(DRAWINGS);

export default function ServiceIcon({ name, className = "w-11 h-11" }) {
  const drawing = DRAWINGS[name];
  if (!drawing) return null;
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke={INK}
      strokeWidth="2.600"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {drawing}
    </svg>
  );
}
