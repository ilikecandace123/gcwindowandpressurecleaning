// ─────────────────────────────────────────────────────────────────────────────
// Instant Quote wizard — question flow definition.
// buildSteps(state) derives the ordered list of question screens from the
// current answers (one question per screen, per the spec's design section).
// ─────────────────────────────────────────────────────────────────────────────

import { PANE_BANDS, SOLAR_PANEL_BANDS, PRESSURE_AREA_BANDS, WINDOW_FREQUENCIES, SOLAR_FREQUENCIES } from "./engine.js";

// Hoists the "I don't know" band to the top of a count question and renders it as a
// de-emphasised (muted) full-width card, so it reads as an honest escape hatch rather
// than a peer of the numeric bands. Selecting it still routes to a custom quote.
function withUnsureFirst(bands, sublabel) {
  const unsure = bands.filter((b) => b.value === "unsure");
  const rest = bands.filter((b) => b.value !== "unsure");
  return [
    ...unsure.map((b) => ({ value: b.value, label: b.label, sublabel, muted: true })),
    ...rest.map((b) => ({ value: b.value, label: b.label })),
  ];
}

export const SERVICE_ORDER = ["window", "pressure", "roof", "gutter", "softwash", "solar", "birdproofing"];

export const SERVICE_META = {
  window: { label: "Window Cleaning", icon: "AppWindow", tagline: "Streak-free glass, screens & tracks" },
  pressure: { label: "Pressure Cleaning", icon: "Waves", tagline: "Driveways, patios, pool areas & paths" },
  roof: { label: "Roof Cleaning", icon: "Home", tagline: "Gentle soft wash for tile & Colorbond" },
  gutter: { label: "Gutter Cleaning", icon: "Droplets", tagline: "Debris cleared + downpipes flushed" },
  softwash: { label: "House Softwash", icon: "Brush", tagline: "Whole exterior — gutter to ground" },
  solar: { label: "Solar Panel Cleaning", icon: "Sun", tagline: "Restore lost power output" },
  birdproofing: { label: "Solar Bird Proofing", icon: "Bird", tagline: "Stop birds nesting under panels" },
};

const STOREY_OPTIONS_SIMPLE = [
  { value: "1", label: "Single storey" },
  { value: "2", label: "Double storey" },
  { value: "3+", label: "3 or more storeys" },
];

const PITCH_OPTIONS = [
  { value: "flat", label: "Flat" },
  { value: "moderate", label: "Moderate — easily walkable" },
  { value: "steep", label: "Steep but manageable" },
  { value: "very-steep", label: "Very steep" },
];

const COMMERCIAL_OPTIONS = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
];

function bedroomOptions(storeys) {
  if (storeys === "2") {
    return [
      { value: "3", label: "Up to 3 bedrooms" },
      { value: "4", label: "4 bedrooms" },
      { value: "5", label: "5 bedrooms" },
      { value: "custom", label: "6 or more bedrooms" },
    ];
  }
  return [
    { value: "2", label: "Up to 2 bedrooms" },
    { value: "3", label: "3 bedrooms" },
    { value: "4", label: "4 bedrooms" },
    { value: "custom", label: "5 or more bedrooms" },
  ];
}

// ── Per-service step builders ────────────────────────────────────────────────

// ── Shared "your property" section ──────────────────────────────────────────
// One quote = one property. These are asked ONCE and fanned out to every
// selected service by expandState() below — never ask the same thing twice.

const PROP = { service: "property", serviceLabel: "Your property" };

function needsRC(services) {
  return ["roof", "gutter", "softwash", "solar", "birdproofing"].some((s) => services.includes(s));
}

function propertySteps(state) {
  const services = state.services || [];
  const p = state.property || {};
  const steps = [];
  const hasWindow = services.includes("window");

  if (hasWindow) {
    steps.push({
      ...PROP,
      id: "prop-type",
      title: "What type of property is it?",
      question: "Property type",
      type: "select",
      path: ["property", "propertyType"],
      options: [
        { value: "house", label: "House" },
        { value: "townhouse", label: "Townhouse" },
        { value: "apartment", label: "Apartment" },
        { value: "storefront", label: "Storefront" },
        { value: "commercial", label: "Commercial" },
      ],
    });
  } else if (needsRC(services)) {
    steps.push({
      ...PROP,
      id: "prop-commercial",
      title: "Is it a residential or commercial property?",
      question: "Property type",
      type: "select",
      path: ["property", "commercial"],
      options: COMMERCIAL_OPTIONS,
    });
  }

  const windowHouse = hasWindow && (p.propertyType === "house" || p.propertyType === "townhouse");
  if (windowHouse) {
    steps.push({
      ...PROP,
      id: "prop-storeys",
      title: "How many storeys?",
      question: "Storeys",
      type: "select",
      path: ["property", "storeys"],
      options: [
        { value: "1", label: "1 storey" },
        { value: "2", label: "2 storeys" },
        { value: "3", label: "3 storeys" },
        { value: "4", label: "4 storeys" },
        { value: "5+", label: "5 or more storeys" },
      ],
    });
  } else if (needsRC(services)) {
    steps.push({
      ...PROP,
      id: "prop-storeys",
      title: "How many storeys is the property?",
      question: "Storeys",
      type: "select",
      path: ["property", "storeys"],
      options: STOREY_OPTIONS_SIMPLE,
    });
  }

  if (["roof", "gutter", "solar"].some((s) => services.includes(s))) {
    steps.push({
      ...PROP,
      id: "prop-pitch",
      title: "How steep is the roof?",
      question: "Roof pitch",
      type: "select",
      path: ["property", "pitch"],
      options: PITCH_OPTIONS,
    });
  }

  const storeys3 = simplifyStoreys(p.storeys);
  if (["roof", "gutter", "softwash"].some((s) => services.includes(s)) && (storeys3 === "1" || storeys3 === "2")) {
    steps.push({
      ...PROP,
      id: "prop-bedrooms",
      title: "How many bedrooms does the home have?",
      question: "Home size (bedrooms)",
      type: "select",
      path: ["property", "bedrooms"],
      options: bedroomOptions(storeys3),
    });
  }

  return steps;
}

function simplifyStoreys(v) {
  if (v === "1" || v === "2") return v;
  if (v) return "3+";
  return undefined;
}

/**
 * Fan the shared property answers out into each service's fields so the
 * pricing engine (which reads per-service state) stays unchanged.
 */
export function expandState(state) {
  const services = state.services || [];
  const p = state.property || {};
  const s3 = simplifyStoreys(p.storeys);
  const commercial =
    p.commercial ||
    (p.propertyType
      ? p.propertyType === "storefront" || p.propertyType === "commercial"
        ? "commercial"
        : "residential"
      : undefined);

  const out = { ...state };
  if (services.includes("window")) {
    out.window = { ...(state.window || {}), propertyType: p.propertyType, storeys: p.storeys };
  }
  if (services.includes("roof")) {
    out.roof = { ...(state.roof || {}), commercial, storeys: s3, pitch: p.pitch, bedrooms: p.bedrooms };
  }
  if (services.includes("gutter")) {
    out.gutter = { ...(state.gutter || {}), commercial, storeys: s3, pitch: p.pitch, bedrooms: p.bedrooms };
  }
  if (services.includes("softwash")) {
    out.softwash = { ...(state.softwash || {}), commercial, storeys: s3, bedrooms: p.bedrooms };
    if (services.includes("window")) out.softwash.windowAddon = false;
  }
  if (services.includes("solar")) {
    out.solar = { ...(state.solar || {}), commercial, storeys: s3, pitch: p.pitch };
  }
  if (services.includes("birdproofing")) {
    out.birdproofing = { ...(state.birdproofing || {}), commercial, storeys: s3 };
  }
  return out;
}



function windowSteps(state) {
  const w = state.window || {};
  const steps = [];
  const svc = { service: "window", serviceLabel: "Window Cleaning" };

  const isApartment = w.propertyType === "apartment";

  if (isApartment) {
    steps.push({
      ...svc,
      id: "w-apartment",
      title: "A few quick things about your apartment",
      question: "Window cleaning — apartment details",
      type: "apartment",
    });
  }

  steps.push({
    ...svc,
    id: "w-tint",
    title: "Do your windows have tint, Low-E, or Smart glass?",
    question: "Window cleaning — tint / Low-E / Smart glass",
    type: "select",
    path: ["window", "tint"],
    options: [
      { value: "no", label: "No" },
      { value: "yes", label: "Yes" },
      { value: "unsure", label: "I'm not sure" },
    ],
    hint: "Tinted and coated glass needs special care, so we quote it individually.",
  });

  steps.push({
    ...svc,
    id: "w-condition",
    title: "How dirty are your windows?",
    question: "Window cleaning — condition",
    type: "select",
    path: ["window", "condition"],
    options: [
      { value: "regular", label: "Very little build-up", sublabel: "Already regularly cleaned" },
      { value: "moderate", label: "Moderate build-up", sublabel: "Cleaned within the last 12 months" },
      { value: "significant", label: "Significant build-up", sublabel: "Not cleaned in the last 12 months" },
      { value: "construction", label: "New construction / renovation clean", sublabel: "Paint & building residue" },
    ],
  });

  steps.push({
    ...svc,
    id: "w-french",
    title: "Do you have any French pane windows?",
    question: "Window cleaning — French panes",
    type: "select",
    path: ["window", "french"],
    visual: "french",
    options: [
      { value: "none", label: "No French panes" },
      { value: "1-3", label: "1–3 windows with French panes" },
      { value: "4+", label: "4 or more windows with French panes" },
    ],
  });

  steps.push({
    ...svc,
    id: "w-balustrades",
    title: "Do you have glass balustrades e.g., glass pool or balcony fencing that you would like cleaned?",
    question: "Window cleaning — glass balustrades",
    type: "balustrade",
  });

  steps.push({
    ...svc,
    id: "w-panes",
    title: "Roughly how many panes do you have?",
    question: "Window cleaning — pane count",
    type: "select",
    path: ["window", "panes"],
    visual: "panes",
    columns: 2,
    options: withUnsureFirst(PANE_BANDS, "No problem — we'll just need to count them before we quote"),
  });

  steps.push({
    ...svc,
    id: "w-screens",
    title: "What kind of screens do you have?",
    question: "Window cleaning — screen type",
    type: "select",
    path: ["window", "screens"],
    options: [
      { value: "flyscreens", label: "Normal flyscreens" },
      { value: "security", label: "Security screens" },
      { value: "mix", label: "A mix of both" },
      { value: "none", label: "No screens" },
    ],
  });

  steps.push({
    ...svc,
    id: "w-large-panes",
    title: "Do you have any window or sliding door panes that are larger than a standard sliding door?",
    question: "Window cleaning — oversized panes",
    type: "select",
    path: ["window", "largePanes"],
    options: [
      { value: "none", label: "No" },
      { value: "unsure", label: "I'm not sure" },
      { value: "1-3", label: "Yes — 1 to 3" },
      { value: "4+", label: "Yes — 4 or more" },
    ],
  });

  steps.push({
    ...svc,
    id: "w-internal-access",
    title: "Do you have any windows that would require a ladder or long pole to reach their internal side?",
    question: "Window cleaning — hard-to-reach interior windows",
    type: "select",
    path: ["window", "internalAccess"],
    options: [
      { value: "no", label: "No" },
      { value: "yes", label: "Yes" },
      { value: "unsure", label: "I don't know" },
    ],
  });

  steps.push({
    ...svc,
    id: "w-frequency",
    title: "How often would you like your exterior windows and screens cleaned?",
    question: "Window cleaning — frequency",
    type: "select",
    path: ["window", "frequency"],
    supportPoint: "7-day rain guarantee · 100% satisfaction guaranteed",
    options: WINDOW_FREQUENCIES.map((f) => ({
      value: f.value,
      label: f.label,
      sublabel: f.plan
        ? `${f.savingLabel} + free flyscreen deep clean`
        : "No commitment",
      badge: f.popular ? "Most popular" : null,
    })),
    hint: "Plans cover exterior windows & screens — the side that gets dirty fastest.",
  });

  const isHouse = w.propertyType === "house" || w.propertyType === "townhouse";
  if (isHouse) {
    const band = PANE_BANDS.find((b) => b.value === w.panes);
    const addPrice = band && band.top ? 5 * band.top : null;
    // Plan customers get a tailored pitch: interior can be added at any visit.
    const freqDef = WINDOW_FREQUENCIES.find((f) => f.value === w.frequency);
    const visitsPerYear = { monthly: 12, quarterly: 4, "half-yearly": 2 }[w.frequency];
    const isPlan = !!(freqDef && freqDef.plan && visitsPerYear);
    steps.push({
      ...svc,
      id: "w-interior",
      title: isPlan
        ? `You can add your interior windows and tracks at any of your ${visitsPerYear} exterior visits through the year. Would you like to add them${addPrice ? ` for $${addPrice}` : ""} for your first visit?`
        : "Add interior windows + tracks?",
      question: "Window cleaning — interior add-on",
      type: "select",
      path: ["window", "interiorAddon"],
      options: [
        {
          value: true,
          label: addPrice ? `Yes please — add interior + tracks (+$${addPrice})` : "Yes please — add interior + tracks",
          sublabel: "Full inside-and-out sparkle",
        },
        { value: false, label: "No thanks — exterior only" },
      ],
    });
  }

  return steps;
}

const PRESSURE_AREA_LABELS = { driveway: "Driveway", pool: "Pool area", patio: "Patio", pathways: "Pathways" };

function pressureSteps(state) {
  const p = state.pressure || {};
  const steps = [];
  const svc = { service: "pressure", serviceLabel: "Pressure Cleaning" };

  steps.push({
    ...svc,
    id: "p-areas",
    title: "What would you like pressure cleaned?",
    subtitle: "Select everything that applies.",
    question: "Pressure cleaning — areas",
    type: "multi",
    path: ["pressure", "areas"],
    supportPoint: "Mould treatment included as standard",
    columns: 2,
    options: [
      { value: "driveway", label: "Driveway" },
      { value: "pool", label: "Pool area" },
      { value: "patio", label: "Patio" },
      { value: "pathways", label: "Pathways" },
      { value: "fences", label: "Fences" },
      { value: "retaining-walls", label: "Retaining walls" },
      { value: "sheds", label: "Sheds / outbuildings" },
      { value: "walls", label: "Individual walls" },
      { value: "eaves", label: "Eaves" },
      { value: "structures", label: "Other outdoor structures" },
      { value: "tennis-court", label: "Tennis court" },
      { value: "commercial-carpark", label: "Commercial carpark" },
      { value: "commercial-other", label: "Commercial — other" },
      { value: "other", label: "Something else", freeText: true },
    ],
  });

  for (const area of (p.areas || []).filter((a) => PRESSURE_AREA_LABELS[a])) {
    const label = PRESSURE_AREA_LABELS[area];
    const d = (p.details || {})[area] || {};

    steps.push({
      ...svc,
      id: `p-${area}-size`,
      title: area === "pathways" ? "How much path is there?" : `How big is the ${label.toLowerCase()}?`,
      question: `Pressure cleaning — ${label.toLowerCase()} size`,
      type: "select",
      path: ["pressure", "details", area, "size"],
      options: PRESSURE_AREA_BANDS[area].map((b) => ({ value: b.value, label: b.label })),
    });

    steps.push({
      ...svc,
      id: `p-${area}-surface`,
      title: `What surface is the ${label.toLowerCase()}?`,
      question: `Pressure cleaning — ${label.toLowerCase()} surface`,
      type: "select",
      path: ["pressure", "details", area, "surface"],
      options: [
        { value: "concrete", label: "Concrete" },
        { value: "tiles", label: "Tiles" },
        { value: "pavers", label: "Pavers / Sandstone / Bricks" },
        { value: "other", label: "Something else", freeText: true },
      ],
    });

    steps.push({
      ...svc,
      id: `p-${area}-condition`,
      title: `What condition is the ${label.toLowerCase()} in?`,
      question: `Pressure cleaning — ${label.toLowerCase()} condition`,
      type: "select",
      path: ["pressure", "details", area, "condition"],
      options: [
        { value: "moss", label: "Moss / mould / dirt build-up", sublabel: "The usual suspects" },
        { value: "oil-rust", label: "Oil or rust stains" },
      ],
    });

    if (d.surface && d.surface !== "tiles" && d.surface !== "other") {
      const bands = PRESSURE_AREA_BANDS[area];
      const band = bands.find((b) => b.value === d.size);
      const bio = band && band.top ? Math.round(1.65 * band.top * 100) / 100 : null;
      steps.push({
        ...svc,
        id: `p-${area}-biocide`,
        title: `Add biocide post-treatment to the ${label.toLowerCase()}?`,
        question: `Pressure cleaning — ${label.toLowerCase()} biocide add-on`,
        type: "select",
        path: ["pressure", "details", area, "biocide"],
        supportPoint: "Stays clean & mould-free for 12+ months",
        options: [
          {
            value: true,
            label: bio ? `Yes please (+$${bio})` : "Yes please",
            sublabel: "Keeps the surface clean & mould-free for 12+ months",
            badge: d.surface === "pavers" ? "Highly recommended" : null,
          },
          { value: false, label: "No thanks" },
        ],
      });
    }
  }

  return steps;
}

function roofSteps(state) {
  const r = state.roof || {};
  const svc = { service: "roof", serviceLabel: "Roof Cleaning" };
  const steps = [
    {
      ...svc,
      id: "r-type",
      title: "What type of roof is it?",
      question: "Roof cleaning — roof type",
      type: "select",
      path: ["roof", "roofType"],
      options: [
        { value: "tile", label: "Tile" },
        { value: "colorbond", label: "Colorbond" },
        { value: "other", label: "Something else", freeText: true },
      ],
      hint: "Tile and Colorbond are both gently soft-washed.",
      supportPoint: "Includes ridge lines + gutter flush",
    },
  ];

  steps.push({
    ...svc,
    id: "r-condition",
    title: "How much build-up is on the roof?",
    question: "Roof cleaning — condition",
    type: "select",
    path: ["roof", "condition"],
    options: [
      { value: "light", label: "Light — not much build-up" },
      { value: "heavy", label: "Heavy growth & build-up" },
      { value: "lichen", label: "Lichen present", sublabel: "Crusty white/green patches" },
    ],
  });

  if (r.roofType === "tile") {
    steps.push({
      ...svc,
      id: "r-biocide",
      title: "Add biocide post-treatment to your roof?",
      question: "Roof cleaning — biocide add-on",
      type: "select",
      path: ["roof", "biocide"],
      supportPoint: "12-month no-mould-growth guarantee",
      options: [
        {
          value: true,
          label: "Yes please (+40%)",
          sublabel: "12-month no-mould-growth guarantee",
          badge: "Highly recommended",
        },
        { value: false, label: "No thanks" },
      ],
    });
  }

  return steps;
}

function gutterSteps(state) {
  const svc = { service: "gutter", serviceLabel: "Gutter Cleaning" };
  const steps = [
    {
      ...svc,
      id: "g-guard",
      title: "Do you have gutter guard installed?",
      question: "Gutter cleaning — gutter guard",
      type: "select",
      path: ["gutter", "gutterGuard"],
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" },
      ],
      supportPoint: "Includes downpipe flushing",
    },
  ];

  steps.push({
    ...svc,
    id: "g-condition",
    title: "How full are the gutters?",
    question: "Gutter cleaning — condition",
    type: "select",
    path: ["gutter", "condition"],
    options: [
      { value: "unsure", label: "Not sure — I just want them checked", sublabel: "We'll inspect & clear them" },
      { value: "leaves", label: "I know they have some leaves" },
      { value: "full", label: "They are full of leaves" },
      { value: "plants", label: "I can see plants growing out of them!" },
    ],
  });

  return steps;
}

function softwashSteps(state) {
  const svc = { service: "softwash", serviceLabel: "House Softwash" };
  const steps = [];

  steps.push({
    ...svc,
    id: "s-cladding",
    title: "What's the exterior made of?",
    subtitle: "Select everything that applies.",
    supportPoint: "Gentle on render, Colorbond & timber",
    question: "House softwash — cladding",
    type: "multi",
    path: ["softwash", "cladding"],
    options: [
      { value: "render", label: "Render" },
      { value: "brick", label: "Brick" },
      { value: "weatherboard", label: "Weatherboard" },
      { value: "other", label: "Something else", freeText: true },
    ],
  });

  steps.push({
    ...svc,
    id: "s-conditions",
    title: "How's the exterior looking?",
    subtitle: "A quick rating on three things.",
    question: "House softwash — condition",
    type: "softwash-cond",
  });

  // Skip the exterior-window upsell when Window Cleaning is already in the
  // quote — they're getting a windows price anyway.
  if (!(state.services || []).includes("window")) {
    steps.push({
      ...svc,
      id: "s-window-addon",
      title: "Add exterior window cleaning?",
      question: "House softwash — exterior window add-on",
      type: "select",
      path: ["softwash", "windowAddon"],
      hint: "After a house wash, exterior windows can be left with water marks.",
      options: [
        { value: true, label: "Yes please", sublabel: "Finish with streak-free glass" },
        { value: false, label: "No thanks" },
      ],
    });
  }

  return steps;
}

function solarSteps() {
  const svc = { service: "solar", serviceLabel: "Solar Panel Cleaning" };
  return [
    {
      ...svc,
      id: "so-panels",
      title: "How many solar panels do you have?",
      question: "Solar cleaning — panel count",
      type: "select",
      path: ["solar", "panels"],
      supportPoint: "Dirty panels can lose up to 30% output",
      columns: 2,
      options: withUnsureFirst(SOLAR_PANEL_BANDS, "No problem — we'll just need to count them before we quote"),
    },
    {
      ...svc,
      id: "so-condition",
      title: "What condition are the panels in?",
      question: "Solar cleaning — condition",
      type: "select",
      path: ["solar", "condition"],
      options: [
        { value: "dust", label: "Light dust" },
        { value: "mould", label: "Light mould build-up" },
        { value: "heavy", label: "Heavy mould or dirt" },
        { value: "lichen", label: "Lichen visible", sublabel: "Crusty white/green patches" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      ...svc,
      id: "so-frequency",
      title: "How often would you like them cleaned?",
      question: "Solar cleaning — frequency",
      type: "select",
      path: ["solar", "frequency"],
      options: SOLAR_FREQUENCIES.map((f) => ({
        value: f.value,
        label: f.label,
        sublabel: f.plan ? f.savingLabel : "No commitment",
      })),
    },
  ];
}

function birdproofingSteps() {
  const svc = { service: "birdproofing", serviceLabel: "Solar Panel Bird Proofing" };
  return [
    {
      ...svc,
      id: "b-birds",
      title: "Have you seen or heard birds under the panels?",
      question: "Bird proofing — birds seen or heard",
      type: "select",
      path: ["birdproofing", "birds"],
      supportPoint: "Warranty-safe mesh — birds out, airflow in",
      options: [
        { value: "yes", label: "Yes — they're definitely in there" },
        { value: "no", label: "No — I just want to prevent them" },
      ],
    },
  ];
}

// ── Full flow ────────────────────────────────────────────────────────────────

const BUILDERS = {
  window: windowSteps,
  pressure: pressureSteps,
  roof: roofSteps,
  gutter: gutterSteps,
  softwash: softwashSteps,
  solar: solarSteps,
  birdproofing: birdproofingSteps,
};

/** All question steps for the currently selected services, in service order. */
export function buildQuestionSteps(state) {
  const steps = [...propertySteps(state)];
  for (const svc of SERVICE_ORDER) {
    if ((state.services || []).includes(svc)) {
      steps.push(...BUILDERS[svc](state));
    }
  }
  return steps;
}

export function getByPath(state, path) {
  let cur = state;
  for (const key of path) {
    if (cur == null) return undefined;
    cur = cur[key];
  }
  return cur;
}

export function setByPath(state, path, value) {
  const next = { ...state };
  let cur = next;
  for (let i = 0; i < path.length - 1; i++) {
    cur[path[i]] = { ...(cur[path[i]] || {}) };
    cur = cur[path[i]];
  }
  cur[path[path.length - 1]] = value;
  return next;
}

/** Human-readable answers for the lead payload (owner context). */
export function collectAnswers(state) {
  const qa = [];
  const services = (state.services || []).map((s) => SERVICE_META[s]?.label || s).join(", ");
  qa.push({ question: "Services requested", answer: services || "—" });

  for (const step of buildQuestionSteps(state)) {
    if (step.type === "apartment") {
      const a = state.window || {};
      const scopeLabels = {
        interior: "Interior only",
        everything: "Interior + exterior of everything",
        "interior-balcony-ext": "Interior of everything + exterior of balcony only",
      };
      qa.push({ question: "Apartment — balcony?", answer: a.balcony === "yes" ? "Yes" : a.balcony === "no" ? "No" : "—" });
      qa.push({ question: "Apartment — scope", answer: scopeLabels[a.apartmentScope] || "—" });
      if (a.balcony === "yes") {
        qa.push({ question: "Apartment — tap on balcony?", answer: a.balconyTap === "yes" ? "Yes" : a.balconyTap === "no" ? "No" : "—" });
      }
      continue;
    }
    if (step.type === "balustrade") {
      const w = state.window || {};
      const ans = w.balustrades === "yes" ? "Yes" : w.balustrades === "no" ? "No" : "—";
      qa.push({ question: "Window cleaning — glass balustrades", answer: ans });
      if (w.balustrades === "yes" && String(w.balustradeCount || "").trim()) {
        qa.push({ question: "Window cleaning — glass balustrades (how many)", answer: String(w.balustradeCount).trim() });
      }
      continue;
    }
    if (step.type === "softwash-cond") {
      const s = state.softwash || {};
      const lvl = (v) => ({ light: "Light", moderate: "Moderate", heavy: "Heavy" }[v] || "—");
      qa.push({ question: "Softwash — mould / organic growth", answer: lvl(s.mould) });
      qa.push({ question: "Softwash — spiderwebs / bug nests", answer: lvl(s.webs) });
      qa.push({ question: "Softwash — grime / dust", answer: lvl(s.grime) });
      continue;
    }
    const value = getByPath(state, step.path);
    if (value === undefined || value === null || (Array.isArray(value) && !value.length)) continue;
    if (step.type === "multi") {
      const labels = value.map((v) => {
        const opt = step.options.find((o) => o.value === v);
        return opt ? opt.label : v;
      });
      qa.push({ question: step.question, answer: labels.join(", ") });
      const otherText = getByPath(state, [...step.path.slice(0, -1), step.path[step.path.length - 1] + "Other"]);
      if (value.includes("other") && otherText) qa.push({ question: `${step.question} — other`, answer: otherText });
    } else {
      const opt = step.options && step.options.find((o) => o.value === value);
      qa.push({ question: step.question, answer: opt ? opt.label : String(value) });
      if (value === "other" || (opt && opt.freeText)) {
        const otherText = getByPath(state, [...step.path.slice(0, -1), step.path[step.path.length - 1] + "Other"]);
        if (otherText) qa.push({ question: `${step.question} — details`, answer: otherText });
      }
    }
  }
  return qa;
}