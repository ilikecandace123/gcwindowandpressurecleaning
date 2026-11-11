import React from "react";
import { Link } from "react-router-dom";
import ServiceIcon from "./ServiceIcon";
import { STRIP_SERVICES } from "../../data/homePage";

// The strip under the top photo: service names with a little drawing each,
// sliding sideways forever. Every item is a link, drawing included, in all
// three runs (Skagen, 12/11/2026: "Only some of these links are clickable").
// The copies only exist so the loop has no gap, so they are hidden from
// screen readers and skipped by the Tab key. It pauses on hover and stands
// still for people who ask for reduced motion.
function Run({ copy = false }) {
  return (
    <ul className="home-strip__run" aria-hidden={copy ? "true" : undefined}>
      {STRIP_SERVICES.map((s) => (
        <li key={s.to}>
          <Link to={s.to} tabIndex={copy ? -1 : undefined} className="flex items-center gap-3 sm:gap-3.5 hover:text-accent-3 transition-colors">
            <ServiceIcon name={s.icon} className="w-9 h-9 sm:w-11 sm:h-11 flex-none" />
            {s.label}
          </Link>
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
