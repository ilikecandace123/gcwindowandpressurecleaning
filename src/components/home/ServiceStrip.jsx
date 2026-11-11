import React from "react";
import { Link } from "react-router-dom";
import ServiceIcon from "./ServiceIcon";
import { STRIP_SERVICES } from "../../data/homePage";

// The strip under the top photo: service names with a little drawing each,
// sliding sideways forever. The first run holds the real links; the copies
// only exist so the loop has no gap, so they are hidden from screen readers
// and crawlers get each link once. It pauses on hover and stands still for
// people who ask for reduced motion.
function Run({ copy = false }) {
  return (
    <ul className="home-strip__run" aria-hidden={copy ? "true" : undefined}>
      {STRIP_SERVICES.map((s) => (
        <li key={s.to} className="flex items-center gap-3 sm:gap-3.5">
          <ServiceIcon name={s.icon} className="w-9 h-9 sm:w-11 sm:h-11 flex-none" />
          {copy ? (
            <span>{s.label}</span>
          ) : (
            <Link to={s.to} className="hover:text-accent-3 transition-colors">
              {s.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function ServiceStrip() {
  return (
    <div className="home-strip bg-paper-white border-b border-rule font-display font-bold text-ink text-[17px] sm:text-[21px]">
      <Run />
      <Run copy />
      <Run copy />
    </div>
  );
}
