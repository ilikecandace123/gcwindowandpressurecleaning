import React from "react";

// The phone number with "We actually answer" under it (Skagen, 12/11/2026:
// "Say we actually answer under the phone number on all pages"). Goes inside
// a call button or link; the small line takes the button's own colour.
// The number is a landline, so this never mentions texting.
export default function PhoneNumber({ call = false, className = "" }) {
  return (
    <span className={`inline-flex flex-col items-start text-left leading-tight ${className}`}>
      <span>{call ? "Call " : ""}(07) 5230 8293</span>
      <small className="block font-semibold text-[0.74em] opacity-80 mt-0.5">We actually answer</small>
    </span>
  );
}
