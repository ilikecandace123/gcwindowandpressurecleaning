// Home page content (redesign, 11/2026). Skagen compared the old home page
// with a competitor he liked and picked this direction from mock-ups: one big
// photo with a short headline over it, a moving service strip, the instant
// quote on the page, photo service cards, drag before/after sliders and an
// "us vs the cheapest quote" table.
//
// Pure JS (no JSX) so scripts/test-home-page.mjs can load it in Node.
//
// Every claim here already appears elsewhere on the site (insurance, police
// checks, instant quote, phone, Google rating). Reviews are never typed here:
// the reviews section uses the real Google ones.

import { GOOGLE_REVIEW_COUNT_SEED } from "./googleReviewsSeed.js";

// The top of the page. `photo` picks one of HERO_PHOTOS; `theme` is "navy"
// (ink panel, light text) or "blue" (sky panel, ink text).
export const HOME_HERO = {
  photo: "roof",
  theme: "navy",
  rating: "Rated 5.0 on Google",
  headline: "Your place",
  headlineAccent: "cleaned properly.",
  sub: "Windows, roofs, gutters, solar and driveways across the Gold Coast, Northern NSW and Brisbane. See your price online in 2 minutes.",
};

// boxLeft: where the photo starts on a computer screen (the panel colour covers
// the rest). fadeSolid / fadeClear: where the panel colour stops being solid
// and where it has fully cleared. position / mobilePosition: object-position.
export const HERO_PHOTOS = {
  team: {
    src: "/images/services-banner.jpg",
    alt: "Two of the team with their cleaning gear in front of a home",
    width: 1088,
    height: 768,
    boxLeft: "39%",
    fadeSolid: "43%",
    fadeClear: "63%",
    position: "0% 50%",
    mobilePosition: "18% 50%",
  },
  // Skagen's own pick (12/11/2026): his drone photo of a roof being washed,
  // shown at full height so the whole scene is in view.
  roof: {
    src: "/images/home/hero-roof-wash.jpg",
    alt: "Cleaner pressure washing a large metal roof, seen from above",
    width: 1920,
    height: 1080,
    boxLeft: "23%",
    fadeSolid: "30%",
    fadeClear: "57%",
    position: "0% 50%",
    mobilePosition: "39% 50%",
  },
};

// The moving strip under the top photo. `icon` is a ServiceIcon name.
export const STRIP_SERVICES = [
  { icon: "window", label: "Window cleaning", to: "/window-cleaning/" },
  { icon: "roof", label: "Roof cleaning", to: "/roof-cleaning/" },
  { icon: "pressure", label: "Pressure cleaning", to: "/pressure-cleaning/" },
  { icon: "gutter", label: "Gutter cleaning", to: "/gutter-cleaning/" },
  { icon: "solar", label: "Solar panels", to: "/solar-panel-cleaning/" },
  { icon: "house", label: "House washing", to: "/house-softwash/" },
];

// First step of the instant quote, shown on the page. `key` must be a quote
// engine service (SERVICE_ORDER in src/quote/steps.js); the test checks it.
export const QUOTE_START_SERVICES = [
  { key: "window", icon: "window", label: "Windows" },
  { key: "roof", icon: "roof", label: "Roof" },
  { key: "pressure", icon: "pressure", label: "Pressure cleaning" },
  { key: "gutter", icon: "gutter", label: "Gutters" },
  { key: "solar", icon: "solar", label: "Solar panels" },
  { key: "softwash", icon: "house", label: "House wash" },
];

// Photo service cards. Every photo shows that card's service (Skagen's rule).
export const HOME_SERVICES = [
  {
    slug: "window-cleaning",
    title: "Window Cleaning",
    pill: "Inside and out",
    text: "Streak-free glass, with tracks and flyscreens included.",
    go: "See window cleaning",
    image: "/images/home/window-coolangatta.jpg",
    alt: "Clean glass doors and balustrade after a window clean in Coolangatta",
  },
  {
    slug: "roof-cleaning",
    title: "Roof Cleaning",
    pill: "Tile and metal",
    text: "Years of mould and grime gone, without damaging the roof.",
    go: "See roof cleaning",
    image: "/images/home/roof-tweed-heads-south-after.jpg",
    alt: "Tile roof after cleaning in Tweed Heads South",
  },
  {
    slug: "pressure-cleaning",
    title: "Pressure Cleaning",
    pill: "Driveways and patios",
    text: "Concrete, pavers and paths back to their real colour.",
    go: "See pressure cleaning",
    image: "/images/home/pressure-main-beach-after.jpg",
    alt: "Pavers after pressure cleaning in Main Beach",
  },
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning",
    pill: "Storm ready",
    text: "Leaves and sludge cleared so the water runs where it should.",
    go: "See gutter cleaning",
    image: "/images/home/gutter-after.jpg",
    alt: "Gutter cleared of leaves",
  },
  {
    slug: "solar-panel-cleaning",
    title: "Solar Panel Cleaning",
    pill: "Warranty safe",
    text: "Clean panels make more power. Pure water, low pressure.",
    go: "See solar cleaning",
    image: "/images/home/solar-nerang.jpg",
    alt: "Clean solar panels on a roof in Nerang",
  },
  {
    slug: "house-softwash",
    title: "House Washing",
    pill: "Gentle softwash",
    text: "Mould, dirt and cobwebs off walls and eaves.",
    go: "See house washing",
    image: "/images/home/house-wash-after.jpg",
    alt: "House exterior after a softwash",
  },
  {
    slug: "bird-proofing",
    title: "Solar Panel Bird Proofing",
    pill: "Humane",
    text: "Mesh that stops pigeons and mynas nesting under your panels.",
    go: "See bird proofing",
    image: "/images/bird-proofing-hero.jpg",
    alt: "Bird proofing mesh fitted around solar panels",
  },
];

export const HOME_STATS = [
  { value: "5.0 ★", label: "Google rating" },
  { value: String(GOOGLE_REVIEW_COUNT_SEED), label: "Google reviews" },
  { value: "2,500+", label: "Customers" },
  { value: "2 min", label: "To see your price" },
  { value: "$20M", label: "Public liability cover" },
  { value: "✓", label: "Police-checked staff" },
];

// Drag sliders: real jobs, the same two photos already shown on the suburb
// pages, cut into a before half and an after half.
export const HOME_SLIDERS = [
  {
    label: "Roof cleaning · Tweed Heads South",
    before: "/images/home/roof-tweed-heads-south-before.jpg",
    after: "/images/home/roof-tweed-heads-south-after.jpg",
  },
  {
    label: "Driveway clean · Miami",
    before: "/images/home/driveway-miami-before.jpg",
    after: "/images/home/driveway-miami-after.jpg",
  },
];

export const HOME_COMPARE = [
  { what: "Fully insured", us: "Yes, every job", them: "Not always" },
  { what: "Police-checked staff", us: "Everyone who comes to your home", them: "Rarely" },
  { what: "Polite", us: "Always", them: "Hit and miss" },
  { what: "Treats your home with care", us: "Like it’s our own", them: "In a rush" },
  { what: "Price before you book", us: "Instant online quote", them: "Call, wait, site visit" },
  { what: "Answers the phone", us: "(07) 5230 8293", them: "Voicemail" },
  { what: "Reviews you can check", us: `5.0 from ${GOOGLE_REVIEW_COUNT_SEED} Google reviews`, them: "Hard to find" },
];
