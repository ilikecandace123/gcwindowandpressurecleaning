// Google Ads landing pages: /instant-quote/<service>/
//
// One page per service the Instant Quote campaign sells. Each page opens the
// quote wizard at the first question with that service already ticked, and
// wraps it in the things a cold visitor wants before answering questions:
// a headline that matches what they searched, real example prices, what is
// included, how it works, reviews, recent jobs and the questions people ask.
//
// Pure JS (no JSX, no Vite-only imports) because scripts/prerender.mjs loads
// it in Node to write the static HTML, meta tags and FAQ schema.
//
// PRICES ARE NEVER TYPED HERE. Every example price is calculated by the same
// engine the wizard uses (src/quote/engine.js), so the page can never promise
// a number the quote tool then contradicts. scripts/test-quote-landing.mjs
// checks every example still prices (no custom-quote trigger).

import { calculateQuote, formatMoney } from "../quote/engine.js";
import { expandState } from "../quote/steps.js";

const house1 = { propertyType: "house", storeys: "1" };
const house2 = { propertyType: "house", storeys: "2" };

export const QUOTE_LANDINGS = [
  {
    slug: "window-cleaning",
    service: "window",
    serviceSlug: "window-cleaning", // recent-jobs + service page slug
    servicePage: "/window-cleaning/",
    name: "Window Cleaning",
    title: "Window Cleaning Gold Coast | Instant Online Price",
    description:
      "Window cleaning on the Gold Coast from $220. Answer a few quick questions and see your price online in about 2 minutes. Fully insured, police-checked, 5.0 stars.",
    h1: "Window Cleaning Gold Coast — See Your Price in 2 Minutes",
    sub: "Streak-free glass, screens and tracks. Answer a few quick questions and your price appears on screen, no phone call needed.",
    image: "/images/window-hero.jpg",
    eyebrow: "Instant online quote",
    included: [
      "Exterior glass cleaned with purified water for a streak-free finish",
      "Flyscreens cleaned where accessible",
      "Frames and sills wiped down",
      "Interior glass and tracks available as an add-on you can tick in the quote",
      "Up to 4 storeys with professional poles and heights-trained staff",
      "Fully insured, police-checked cleaners",
    ],
    examples: [
      {
        label: "Single-storey home, 21–30 panes, outside only",
        state: {
          services: ["window"],
          property: house1,
          window: { tint: "no", condition: "moderate", french: "none", panes: "21-30", screens: "flyscreens", internalAccess: "no", frequency: "one-off", interiorAddon: false },
        },
      },
      {
        label: "Single-storey home, 41–50 panes, outside only",
        state: {
          services: ["window"],
          property: house1,
          window: { tint: "no", condition: "moderate", french: "none", panes: "41-50", screens: "flyscreens", internalAccess: "no", frequency: "one-off", interiorAddon: false },
        },
      },
      {
        label: "Double-storey home, 41–50 panes, outside only",
        state: {
          services: ["window"],
          property: house2,
          window: { tint: "no", condition: "moderate", french: "none", panes: "41-50", screens: "flyscreens", internalAccess: "no", frequency: "one-off", interiorAddon: false },
        },
      },
    ],
    exampleNote: "Inside and out with tracks is an add-on you can tick in the quote. Regular plans save $50–$150 every visit.",
    faqs: (ex) => [
      {
        question: "How much does window cleaning cost on the Gold Coast?",
        answer: `Most Gold Coast homes pay $220–$800 for a professional window clean. As a guide, ${ex[0].label.toLowerCase()} is ${ex[0].price}, ${ex[1].label.toLowerCase()} is ${ex[1].price} and ${ex[2].label.toLowerCase()} is ${ex[2].price}. Inside glass and tracks are an add-on. The quote tool on this page gives you your exact price in about two minutes.`,
      },
      {
        question: "Do you clean the tracks and screens too?",
        answer: "Flyscreens and frames are part of every exterior clean. Window tracks are cleaned with the interior add-on, which you can tick in the quote and see the price change straight away.",
      },
      {
        question: "How do you count panes?",
        answer: "A pane is each separate piece of glass. A sliding window with two sheets of glass is two panes, a standard sliding door is two panes. You only need a rough count; the quote tool shows pictures to help, and if you are not sure we will confirm it before the clean.",
      },
      {
        question: "Can you reach second-storey windows?",
        answer: "Yes. We clean windows up to four storeys high using water-fed poles and heights-trained staff, so there is no need for scaffolding at a normal home.",
      },
      {
        question: "Is the price on screen the price I pay?",
        answer: "Yes, as long as the answers match the property. If the glass is very different from what was described (for example a lot more panes, or builder's residue from a renovation) we tell you before we start, never after.",
      },
      {
        question: "How soon can you come?",
        answer: "Usually within the week. Once your details are in, we get in touch to lock in a time that suits you, and we send a reminder the day before.",
      },
    ],
  },

  {
    slug: "pressure-cleaning",
    service: "pressure",
    serviceSlug: "pressure-cleaning",
    servicePage: "/pressure-cleaning/",
    name: "Pressure Cleaning",
    title: "Pressure Cleaning Gold Coast | Driveway Price Online",
    description:
      "Driveway, patio and path pressure cleaning on the Gold Coast from $275, mould treatment included. See your price online in about 2 minutes. Fully insured, 5.0 stars.",
    h1: "Pressure Cleaning Gold Coast — Driveway Prices in 2 Minutes",
    sub: "Driveways, patios, pool areas and paths restored without damage. Pick the areas, answer a few questions and see your price straight away.",
    image: "/images/pressure-hero.jpg",
    eyebrow: "Instant online quote",
    included: [
      "Mould and grime treatment included as standard",
      "Surface-safe pressure for concrete, pavers, sandstone and tiles",
      "Runoff contained, gardens and plants protected",
      "Optional biocide treatment that keeps surfaces clean for 12+ months",
      "Driveways, patios, pool areas, paths, fences, retaining walls and more",
      "Fully insured, police-checked operators",
    ],
    examples: [
      {
        label: "Standard concrete driveway (fits 1–2 cars)",
        state: { services: ["pressure"], property: house1, pressure: { areas: ["driveway"], details: { driveway: { size: "25-50", surface: "concrete", condition: "moss", biocide: false } } } },
      },
      {
        label: "Large concrete driveway (fits 3–4 cars)",
        state: { services: ["pressure"], property: house1, pressure: { areas: ["driveway"], details: { driveway: { size: "76-100", surface: "concrete", condition: "moss", biocide: false } } } },
      },
      {
        label: "Large driveway plus a 21–30 sqm patio",
        state: {
          services: ["pressure"],
          property: house1,
          pressure: { areas: ["driveway", "patio"], details: { driveway: { size: "76-100", surface: "concrete", condition: "moss", biocide: false }, patio: { size: "21-30", surface: "concrete", condition: "moss", biocide: false } } },
        },
      },
    ],
    exampleNote: "Pavers, sandstone and brick cost a little more per square metre. Oil and rust stains are quoted after a look.",
    faqs: (ex) => [
      {
        question: "How much does pressure cleaning cost on the Gold Coast?",
        answer: `Pressure cleaning starts at ${ex[0].price} for ${ex[0].label.toLowerCase()}, ${ex[1].label.toLowerCase()} is ${ex[1].price}, and ${ex[2].label.toLowerCase()} is ${ex[2].price}. Prices are per square metre and depend on the surface, so the quote tool on this page gives you an exact figure for your areas.`,
      },
      {
        question: "Will pressure cleaning damage my driveway or pavers?",
        answer: "Not when the pressure matches the surface. We use lower pressure and a surface cleaner on pavers, sandstone and brick, and higher pressure only on sound concrete. Mould is treated first so it does not need to be blasted off.",
      },
      {
        question: "Is mould treatment included?",
        answer: "Yes. Every pressure clean includes a mould and grime treatment as standard. The optional biocide post-treatment slows regrowth so the surface stays clean for 12 months or more.",
      },
      {
        question: "Can you remove oil stains?",
        answer: "Usually most of it. Fresh oil and rust marks lift well with the right treatment; very old stains that have soaked deep into concrete may lighten rather than disappear. Choose oil or rust stains in the quote and we will confirm before the job.",
      },
      {
        question: "How long does a driveway take?",
        answer: "A standard driveway takes about an hour, a whole outdoor area two to three hours. You can use the surfaces again as soon as they dry.",
      },
      {
        question: "Do you need me to be home?",
        answer: "No. As long as we can reach the areas and an outdoor tap, you can leave us to it. We send photos when the job is done.",
      },
    ],
  },

  {
    slug: "roof-cleaning",
    service: "roof",
    serviceSlug: "roof-cleaning",
    servicePage: "/roof-cleaning/",
    name: "Roof Cleaning",
    title: "Roof Cleaning Gold Coast | See Your Price Online",
    description:
      "Soft-wash roof cleaning on the Gold Coast for tile and Colorbond roofs. Answer a few quick questions and see your price in about 2 minutes. Fully insured, 5.0 stars.",
    h1: "Roof Cleaning Gold Coast — Your Price in 2 Minutes",
    sub: "Low-pressure soft wash that removes moss, lichen and black streaks without damaging tiles or Colorbond. Priced by roof size, on screen, straight away.",
    image: "/images/roof-hero.jpg",
    eyebrow: "Instant online quote",
    included: [
      "Low-pressure soft wash, safe for tile, concrete and Colorbond roofs",
      "Biodegradable treatment that kills moss, lichen and algae at the root",
      "Gardens pre-wet and rinsed, downpipes to tanks disconnected",
      "Debris the clean dislodges cleared from the gutters",
      "Cracked tiles or lifted ridge capping reported to you with photos",
      "Heights-trained, fully insured, police-checked staff",
    ],
    examples: [
      {
        label: "Single-storey home, up to 3 bedrooms, light build-up",
        state: { services: ["roof"], property: { ...house1, pitch: "moderate", bedrooms: "3" }, roof: { roofType: "tile", condition: "light" } },
      },
      {
        label: "Single-storey home, 4 bedrooms, heavy build-up",
        state: { services: ["roof"], property: { ...house1, pitch: "moderate", bedrooms: "4" }, roof: { roofType: "tile", condition: "heavy" } },
      },
      {
        label: "Double-storey home, 4 bedrooms, heavy build-up",
        state: { services: ["roof"], property: { ...house2, pitch: "moderate", bedrooms: "4" }, roof: { roofType: "tile", condition: "heavy" } },
      },
    ],
    exampleNote: "Steep roofs add 10%. Very steep roofs, lichen and three or more storeys are quoted after a look.",
    faqs: (ex) => [
      {
        question: "How much does roof cleaning cost on the Gold Coast?",
        answer: `As a guide, ${ex[0].label.toLowerCase()} is ${ex[0].price}, ${ex[1].label.toLowerCase()} is ${ex[1].price} and ${ex[2].label.toLowerCase()} is ${ex[2].price}. Steeper roofs and heavier growth cost more. The quote tool on this page prices your roof from its size, pitch and condition.`,
      },
      {
        question: "Is soft washing safe for my roof?",
        answer: "Yes, and it is the method roofing manufacturers recommend. High pressure strips the coating off concrete tiles and can force water under them. Our soft wash uses low pressure and a treatment that does the work, so the surface is not damaged.",
      },
      {
        question: "What are the black streaks on my roof?",
        answer: "Mostly algae, which feeds on the minerals in concrete tiles and thrives in Gold Coast heat and humidity. Green patches are moss, and crusty grey, orange or yellow patches are lichen. All three come off with a soft wash.",
      },
      {
        question: "How often should a Gold Coast roof be cleaned?",
        answer: "Every two to three years for most homes, every one to two years within about 2 km of the beach where salt air holds moisture on the tiles. If you can already see streaks or moss, now is the time.",
      },
      {
        question: "Will you clean the gutters at the same time?",
        answer: "We clear whatever the roof clean dislodges into the gutters as standard. A full gutter clean and downpipe flush is an add-on you can tick in the quote while we are already up there.",
      },
      {
        question: "Can you clean a Colorbond roof?",
        answer: "Yes. Colorbond is soft washed the same way, with a gentler rinse to protect the paint finish. Choose Colorbond in the quote so the price reflects it.",
      },
    ],
  },

  {
    slug: "gutter-cleaning",
    service: "gutter",
    serviceSlug: "gutter-cleaning",
    servicePage: "/gutter-cleaning/",
    name: "Gutter Cleaning",
    title: "Gutter Cleaning Gold Coast | Price Online in 2 Minutes",
    description:
      "Gutter cleaning on the Gold Coast from $275, downpipes flushed and checked. Answer a few quick questions and see your price online. Fully insured, 5.0 stars.",
    h1: "Gutter Cleaning Gold Coast — See Your Price in 2 Minutes",
    sub: "Gutters cleared by hand, downpipes flushed and drainage checked before the next storm. Priced by home size, on screen, straight away.",
    image: "/images/gutter-1.jpg",
    eyebrow: "Instant online quote",
    included: [
      "All leaves, dirt and debris removed from every gutter",
      "Downpipes flushed and checked so water actually flows",
      "Debris bagged and taken away, not left on the lawn",
      "Loose brackets, rust or damage photographed and reported to you",
      "Gutter guard lifted and refitted where it is installed",
      "Heights-trained, fully insured, police-checked staff",
    ],
    examples: [
      {
        label: "Single-storey home, up to 2 bedrooms",
        state: { services: ["gutter"], property: { ...house1, pitch: "moderate", bedrooms: "2" }, gutter: { gutterGuard: "no", condition: "leaves" } },
      },
      {
        label: "Single-storey home, 3 bedrooms",
        state: { services: ["gutter"], property: { ...house1, pitch: "moderate", bedrooms: "3" }, gutter: { gutterGuard: "no", condition: "leaves" } },
      },
      {
        label: "Double-storey home, 4 bedrooms",
        state: { services: ["gutter"], property: { ...house2, pitch: "moderate", bedrooms: "4" }, gutter: { gutterGuard: "no", condition: "leaves" } },
      },
    ],
    exampleNote: "Gutters with plants growing out of them, gutter guard, and very steep roofs are quoted after a look.",
    faqs: (ex) => [
      {
        question: "How much should it cost to get my gutters cleaned?",
        answer: `On the Gold Coast, ${ex[0].label.toLowerCase()} is ${ex[0].price}, ${ex[1].label.toLowerCase()} is ${ex[1].price} and ${ex[2].label.toLowerCase()} is ${ex[2].price}. The price covers all gutters and downpipes, not a per-metre rate. The quote tool on this page gives you the exact figure for your home.`,
      },
      {
        question: "How often should gutters be cleaned?",
        answer: "Twice a year for most Gold Coast homes, in late spring before the storm season and again in autumn. Homes under large trees may need it more often.",
      },
      {
        question: "What happens if I leave them?",
        answer: "Blocked gutters overflow into the eaves and fascia, rot timber, stain walls and can flood the ceiling in a summer storm. Standing water also breeds mosquitoes. A clean costs far less than any of those repairs.",
      },
      {
        question: "Do you flush the downpipes?",
        answer: "Yes. Every job includes flushing each downpipe and checking that water runs through to the drain. A clear gutter with a blocked downpipe still overflows, so we do not skip it.",
      },
      {
        question: "Do you clean gutters with gutter guard?",
        answer: "Yes. Guard needs to be lifted, the gutter cleared underneath, and the guard refitted, which takes longer, so it is quoted after a look rather than priced on screen.",
      },
      {
        question: "Will you tell me if something is damaged?",
        answer: "Yes. We photograph rust, sagging sections, loose brackets or leaking joins while we are up there and send them to you, so you know what is coming before it becomes a leak.",
      },
    ],
  },

  {
    slug: "solar-panel-cleaning",
    service: "solar",
    serviceSlug: "solar-panel-cleaning",
    servicePage: "/solar-panel-cleaning/",
    name: "Solar Panel Cleaning",
    title: "Solar Panel Cleaning Gold Coast | Price Online",
    description:
      "Solar panel cleaning on the Gold Coast from $220 for up to 20 panels. Purified water, warranty safe. See your price online in about 2 minutes. Fully insured.",
    h1: "Solar Panel Cleaning Gold Coast — Your Price in 2 Minutes",
    sub: "Purified-water cleaning that brings back lost output without voiding your warranty. Tell us how many panels and see your price straight away.",
    image: "/images/solar-panel-hero.jpg",
    eyebrow: "Instant online quote",
    included: [
      "Purified water and soft brushes, no detergents or scratching",
      "Salt film, bird droppings, dust and pollen removed from every panel",
      "Before and after photos sent to you",
      "Loose fittings, cracked glass or hot-spot staining reported",
      "Safe roof access with heights-trained staff",
      "Fully insured, police-checked cleaners",
    ],
    examples: [
      {
        label: "Up to 20 panels, single-storey",
        state: { services: ["solar"], property: { ...house1, pitch: "moderate" }, solar: { panels: "16-20", condition: "dust", frequency: "one-off" } },
      },
      {
        label: "21–30 panels, single-storey",
        state: { services: ["solar"], property: { ...house1, pitch: "moderate" }, solar: { panels: "26-30", condition: "dust", frequency: "one-off" } },
      },
      {
        label: "Up to 20 panels, double-storey",
        state: { services: ["solar"], property: { ...house2, pitch: "moderate" }, solar: { panels: "16-20", condition: "dust", frequency: "one-off" } },
      },
    ],
    exampleNote: "Heavy mould or lichen on the panels costs more. Regular plans save $50–$150 every visit.",
    faqs: (ex) => [
      {
        question: "How much does solar panel cleaning cost on the Gold Coast?",
        answer: `${ex[0].label} is ${ex[0].price}, ${ex[1].label.toLowerCase()} is ${ex[1].price} and ${ex[2].label.toLowerCase()} is ${ex[2].price}. Price depends on the number of panels, the roof height and how dirty they are. The quote tool on this page gives you the exact figure.`,
      },
      {
        question: "Is it worth cleaning solar panels?",
        answer: "On the Gold Coast, yes. Salt air leaves a film that rain does not rinse off, and bird droppings shade whole cells. Dirty panels commonly lose 15–30% of their output, which on a typical 6.6 kW system is a few hundred dollars a year.",
      },
      {
        question: "Will cleaning void my warranty?",
        answer: "No. Panel makers expect panels to be cleaned, and most specify purified water and soft tools, which is exactly what we use. Tap water, detergents and abrasive brushes are what cause problems.",
      },
      {
        question: "How often should panels be cleaned?",
        answer: "Every six to twelve months. Homes within about 2 km of the beach or with a lot of bird traffic should clean every six months; inland suburbs can usually go a year.",
      },
      {
        question: "Can you clean panels on a double-storey house?",
        answer: "Yes. Double-storey roofs are a small extra for the access time, and the quote tool prices it when you choose two storeys. Three storeys and above need a quick look first.",
      },
      {
        question: "Do you check the panels while you are up there?",
        answer: "Yes. We look for cracked glass, loose mounting hardware, lifted cabling and hot-spot staining, and send you photos with the before and after shots.",
      },
    ],
  },

  {
    slug: "house-washing",
    service: "softwash",
    serviceSlug: "house-softwash",
    servicePage: "/house-softwash/",
    name: "House Washing",
    title: "House Washing Gold Coast | Soft Wash Price Online",
    description:
      "Exterior house washing on the Gold Coast from $385. Gentle soft wash for render, brick and weatherboard, gutter to ground. See your price online in about 2 minutes.",
    h1: "House Washing Gold Coast — See Your Price in 2 Minutes",
    sub: "A gentle low-pressure soft wash that lifts mould, cobwebs and grime off render, brick and weatherboard, from the gutters to the ground.",
    image: "/images/softwash-1.jpg",
    eyebrow: "Instant online quote",
    included: [
      "Whole exterior, gutter line to ground, including eaves and soffits",
      "Low-pressure soft wash, safe for paint, render and weatherboard",
      "Treatment that kills mould at the root so it stays away longer",
      "Cobwebs and wasp nests removed from eaves and corners",
      "Plants pre-wet and rinsed, outdoor furniture moved and replaced",
      "Fully insured, police-checked staff",
    ],
    examples: [
      {
        label: "Single-storey home, up to 2 bedrooms",
        state: { services: ["softwash"], property: { ...house1, bedrooms: "2" }, softwash: { cladding: ["render"], conditions: [], windowAddon: false } },
      },
      {
        label: "Single-storey home, 3 bedrooms",
        state: { services: ["softwash"], property: { ...house1, bedrooms: "3" }, softwash: { cladding: ["render"], conditions: [], windowAddon: false } },
      },
      {
        label: "Double-storey home, 4 bedrooms",
        state: { services: ["softwash"], property: { ...house2, bedrooms: "4" }, softwash: { cladding: ["render"], conditions: [], windowAddon: false } },
      },
    ],
    exampleNote: "Heavy cobwebs or grime add 20%. Heavy mould and three or more storeys are quoted after a look.",
    faqs: (ex) => [
      {
        question: "How much does house washing cost on the Gold Coast?",
        answer: `${ex[0].label} is ${ex[0].price}, ${ex[1].label.toLowerCase()} is ${ex[1].price} and ${ex[2].label.toLowerCase()} is ${ex[2].price}. The price covers the whole exterior from gutter line to ground. The quote tool on this page gives you the exact figure for your home.`,
      },
      {
        question: "What is the difference between soft washing and pressure washing?",
        answer: "Soft washing uses low pressure and a cleaning treatment to kill mould and lift dirt, so it is safe on paint, render and weatherboard. Pressure washing relies on force alone and can strip paint or drive water into walls. Houses get soft washed, driveways get pressure cleaned.",
      },
      {
        question: "Is it safe for painted render and weatherboard?",
        answer: "Yes. Soft washing was developed for exactly those surfaces. We also pre-wet and rinse plants and keep the treatment off glass and metal fittings.",
      },
      {
        question: "How long does the result last?",
        answer: "Because the treatment kills the mould rather than just moving it, most homes stay clean for two to three years. Shaded south-facing walls may need attention a little sooner.",
      },
      {
        question: "Can you add the windows?",
        answer: "Yes. Tick exterior window cleaning in the quote and we finish the wash with streak-free glass on the same visit, at a lower price than booking it separately.",
      },
      {
        question: "Do I need to do anything before you arrive?",
        answer: "Close the windows, move cars off the driveway if we need to reach it, and let us know about any pets. We handle the rest, including moving and replacing outdoor furniture.",
      },
    ],
  },
];

export function getQuoteLanding(slug) {
  return QUOTE_LANDINGS.find((l) => l.slug === slug) || null;
}

// Example prices straight from the quote engine. Returns
// [{ label, price: "$275", total: 275 }, ...]; `total` is null when the
// example trips a custom-quote rule (the test fails on that).
export function landingExamples(landing) {
  return landing.examples.map((ex) => {
    const q = calculateQuote(expandState(ex.state));
    const total = q && !q.custom && !q.partial ? q.total : null;
    return { label: ex.label, total, price: total == null ? "quoted after a look" : formatMoney(total) };
  });
}

// Lowest example price, used for the "from $X" line and the meta description.
export function landingFromPrice(landing) {
  const totals = landingExamples(landing).map((e) => e.total).filter((t) => typeof t === "number");
  return totals.length ? Math.min(...totals) : null;
}

export function landingFaqs(landing) {
  return landing.faqs(landingExamples(landing));
}

export function landingPath(landing) {
  return `/instant-quote/${landing.slug}/`;
}
