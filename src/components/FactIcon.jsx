import React from "react";
import { Droplets, Waves, CloudLightning, Sun, CloudRain, Leaf, Bird, Flower2, Car, Route, Square, Sprout, Droplet, Wind, Paintbrush, Trees, Circle } from "lucide-react";

// Page copy keys its fact cards with an emoji; this draws the matching line
// icon in the site's ochre instead, so the cards sit in the theme.
const ICONS = {
  "💧": Droplets,
  "🌊": Waves,
  "⛈️": CloudLightning,
  "☀️": Sun,
  "🌧️": CloudRain,
  "🌿": Trees,
  "🍃": Leaf,
  "🍂": Leaf,
  "🦅": Bird,
  "🌸": Flower2,
  "🚗": Car,
  "🛣️": Route,
  "⬛": Square,
  "🟢": Sprout,
  "🟤": Droplet,
  "👃": Wind,
  "🎨": Paintbrush,
};

export default function FactIcon({ icon, small = false, className = "" }) {
  const Icon = ICONS[icon] || ICONS[String(icon).replace(/️/g, "")] || Circle;
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center flex-shrink-0 rounded-lg bg-ochre-50 border border-ochre-100 text-ochre-3 ${small ? "w-9 h-9" : "w-11 h-11"} ${className}`}
    >
      <Icon className={small ? "w-[18px] h-[18px]" : "w-5 h-5"} strokeWidth={2} />
    </span>
  );
}
