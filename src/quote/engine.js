// ─────────────────────────────────────────────────────────────────────────────
// Instant Quote Engine — pure pricing logic (no UI).
// Implements the "Instant Quote Engine — Build Specification" v1.0.
//
// All prices INCLUDE GST. All bands are charged off the TOP of the band.
// ANY custom-quote trigger anywhere → the WHOLE quote becomes a custom quote.
// Tested by scripts/test-quote-engine.mjs (all Section-10 worked examples).
// ─────────────────────────────────────────────────────────────────────────────

export const GST_NOTE = "inc GST";

// ── Band tops ────────────────────────────────────────────────────────────────
export const PANE_BANDS = [
  { value: "1-10", label: "1–10 panes", top: 10 },
  { value: "11-20", label: "11–20 panes", top: 20 },
  { value: "21-30", label: "21–30 panes", top: 30 },
  { value: "31-40", label: "31–40 panes", top: 40 },
  { value: "41-50", label: "41–50 panes", top: 50 },
  { value: "51-60", label: "51–60 panes", top: 60 },
  { value: "61-70", label: "61–70 panes", top: 70 },
  { value: "71-80", label: "71–80 panes", top: 80 },
  { value: "81-90", label: "81–90 panes", top: 90 },
  { value: "91-100", label: "91–100 panes", top: 100 },
  { value: "100+", label: "More than 100 panes", top: null, custom: true },
  { value: "unsure", label: "I don't know", top: null, custom: true },
];

export const SOLAR_PANEL_BANDS = [
  { value: "1-5", label: "1–5 panels", top: 5 },
  { value: "6-10", label: "6–10 panels", top: 10 },
  { value: "11-15", label: "11–15 panels", top: 15 },
  { value: "16-20", label: "16–20 panels", top: 20 },
  { value: "21-25", label: "21–25 panels", top: 25 },
  { value: "26-30", label: "26–30 panels", top: 30 },
  { value: "31-40", label: "31–40 panels", top: 40 },
  { value: "40+", label: "More than 40 panels", top: null, custom: true },
  { value: "unsure", label: "I don't know", top: null, custom: true },
];

export const PRESSURE_AREA_BANDS = {
  driveway: [
    { value: "25-50", label: "Standard — fits 1–2 cars (25–50 sqm)", top: 50 },
    { value: "51-75", label: "Medium — fits 2–3 cars (51–75 sqm)", top: 75 },
    { value: "76-100", label: "Large — fits 3–4 cars (76–100 sqm)", top: 100 },
    { value: "100+", label: "Bigger than that (100+ sqm)", top: null, custom: true },
    { value: "unsure", label: "I'm not sure", top: null, custom: true },
  ],
  pool: [
    { value: "10-20", label: "10–20 sqm", top: 20 },
    { value: "21-30", label: "21–30 sqm", top: 30 },
    { value: "31-40", label: "31–40 sqm", top: 40 },
    { value: "40+", label: "Bigger than that (40+ sqm)", top: null, custom: true },
    { value: "unsure", label: "I'm not sure", top: null, custom: true },
  ],
  patio: [
    { value: "10-20", label: "10–20 sqm", top: 20 },
    { value: "21-30", label: "21–30 sqm", top: 30 },
    { value: "31-40", label: "31–40 sqm", top: 40 },
    { value: "40+", label: "Bigger than that (40+ sqm)", top: null, custom: true },
    { value: "unsure", label: "I'm not sure", top: null, custom: true },
  ],
  pathways: [
    { value: "one-side", label: "Path on one side of the house (under 20 sqm)", top: 20 },
    { value: "two-sides", label: "Paths on two sides (21–40 sqm)", top: 40 },
    { value: "all-around", label: "Paths all the way around (41–50 sqm)", top: 50 },
    { value: "unsure", label: "I'm not sure", top: null, custom: true },
  ],
};

export const PRESSURE_RATES = {
  concrete: 3.3,
  tiles: 3.3,
  pavers: 3.85, // pavers / sandstone / bricks
};

export const BIOCIDE_RATE = 1.65; // per sqm, porous surfaces only (not tiles)

// bedrooms tables: [storeys][bedroomsValue] = price
export const ROOF_PRICES = {
  1: { 2: 660, 3: 880, 4: 1100 },
  2: { 3: 1100, 4: 1320, 5: 1540 },
};
export const GUTTER_PRICES = {
  1: { 2: 275, 3: 330, 4: 385 },
  2: { 3: 440, 4: 550, 5: 660 },
};
export const SOFTWASH_PRICES = {
  1: { 2: 385, 3: 495, 4: 660 },
  2: { 3: 880, 4: 1100, 5: 1390 },
};

export const ROOF_LINE_FLOOR = 594;
export const FLOOR_PRESSURE = 275;
export const FLOOR_ONE_OFF = 220; // windows and/or solar, one-off
export const FLOOR_PLAN = 165; // windows and/or solar, plan

export const WINDOW_FREQUENCIES = [
  { value: "one-off", label: "One-off clean", discount: 0, plan: false },
  { value: "monthly", label: "Monthly plan", discount: 150, plan: true, savingLabel: "Save $150 every visit" },
  { value: "quarterly", label: "Quarterly plan", discount: 100, plan: true, savingLabel: "Save $100 every visit", popular: true },
  { value: "half-yearly", label: "Half-Yearly plan", discount: 50, plan: true, savingLabel: "Save $50 every visit" },
];

export const SOLAR_FREQUENCIES = [
  { value: "one-off", label: "One-off clean", discount: 0, plan: false },
  { value: "3-monthly", label: "Every 3 months", discount: 150, plan: true, savingLabel: "Save $150 every visit" },
  { value: "6-monthly", label: "Every 6 months", discount: 100, plan: true, savingLabel: "Save $100 every visit" },
  { value: "12-monthly", label: "Every 12 months", discount: 50, plan: true, savingLabel: "Save $50 every visit" },
];

const round2 = (n) => Math.round(n * 100) / 100;

function bandTop(bands, value) {
  const b = bands.find((x) => x.value === value);
  return b ? b.top : null;
}

// ── Per-service calculators ─────────────────────────────────────────────────
// Each returns { customReasons: [], line: {service, label, frequency?, items, subtotal} | null }

export function calcWindow(w) {
  const reasons = [];
  if (!w) return { customReasons: [], line: null };

  if (w.propertyType === "storefront") reasons.push("Storefront window cleaning");
  if (w.propertyType === "commercial") reasons.push("Commercial window cleaning");

  const isApartment = w.propertyType === "apartment";
  const isHouse = w.propertyType === "house" || w.propertyType === "townhouse";

  if (isHouse && ["3", "4", "5+"].includes(w.storeys)) reasons.push("3+ storey property");
  if (w.tint === "yes") reasons.push("Tinted or Low-E / Smart glass");
  if (w.tint === "unsure") reasons.push("Possibly tinted or Low-E / Smart glass (unsure)");
  if (w.condition === "significant") reasons.push("Significant build-up (not cleaned in 12+ months)");
  if (w.condition === "filthy") reasons.push("Heavy build-up");
  if (w.condition === "construction") reasons.push("New construction / renovation clean");
  if (w.french === "4+") reasons.push("4+ windows with French panes");
  if (w.largePanes === "4+") reasons.push("4+ oversized window panes");
  if (w.largePanes === "unsure") reasons.push("Unsure about oversized window panes");
  if (w.internalAccess === "yes") reasons.push("Interior windows need ladder / long pole access");
  if (w.internalAccess === "unsure") reasons.push("Unsure about interior window access");

  const paneBand = PANE_BANDS.find((b) => b.value === w.panes);
  if (paneBand && paneBand.custom) {
    reasons.push(paneBand.value === "unsure" ? "Unsure of pane count" : "More than 100 panes");
  }

  if (reasons.length) return { customReasons: reasons, line: null };

  const panes = paneBand ? paneBand.top : 0;
  const items = [];
  let raw;
  let balustradesUnspecified = false;

  if (isApartment) {
    const perPanel = w.apartmentScope === "interior" ? 6 : 12;
    raw = perPanel * panes;
    items.push({
      label:
        w.apartmentScope === "interior"
          ? `Interior windows — ${panes} panes`
          : `Windows — ${panes} panes`,
      amount: raw,
    });
  } else {
    raw = 7 * panes;
    items.push({ label: `Exterior windows & screens — ${panes} panes`, amount: raw });
    if (w.storeys === "2") {
      raw += 50;
      items.push({ label: "Two-storey access", amount: 50 });
    }
  }

  if (isApartment && w.french === "1-3") {
    raw += 50;
    items.push({ label: "French panes (1–3 windows)", amount: 50 });
  }

  if (w.condition === "regular") {
    const disc = round2(raw * -0.1);
    raw = round2(raw * 0.9);
    items.push({ label: "Regularly cleaned — 10% off", amount: disc });
  }

  if (w.largePanes === "1-3") {
    raw += 40;
    items.push({ label: "Oversized panes (1–3 windows)", amount: 40, visible: true });
  }

  if (w.balustrades === "yes") {
    const n = parseInt(w.balustradeCount, 10);
    if (Number.isFinite(n) && n > 0) {
      const add = 11 * n;
      raw += add;
      items.push({ label: `Glass balustrades — ${n}`, amount: add, visible: true });
    } else {
      // Said yes but gave no quantity — can't price it, so it's excluded and
      // the result screen tells them why.
      balustradesUnspecified = true;
    }
  }

  const freq = WINDOW_FREQUENCIES.find((f) => f.value === w.frequency) || WINDOW_FREQUENCIES[0];
  if (freq.discount) {
    raw -= freq.discount;
    items.push({ label: `${freq.label} discount`, amount: -freq.discount, visible: true });
  }

  if (w.interiorAddon && isHouse) {
    // French panes (1–3) surcharge applies to the interior side only.
    const add = 5 * panes + (w.french === "1-3" ? 50 : 0);
    raw += add;
    items.push({ label: "Interior windows + tracks add-on", amount: add, visible: true });
  }

  // A plan discount can exceed a small job's raw price — never let one line
  // subsidise the rest of the quote below zero (floors catch the solo case).
  const subtotal = Math.max(0, round2(raw));

  return {
    customReasons: [],
    line: {
      service: "window",
      label: "Window Cleaning",
      frequency: freq.value,
      frequencyLabel: freq.plan ? freq.label : null,
      plan: freq.plan,
      items,
      subtotal,
      balustradesUnspecified,
    },
  };
}

export function calcPressure(p) {
  const reasons = [];
  if (!p) return { customReasons: [], line: null };

  const CUSTOM_AREAS = {
    "tennis-court": "Tennis court",
    "commercial-carpark": "Commercial carpark",
    "commercial-other": "Commercial — other",
    fences: "Fences",
    "retaining-walls": "Retaining walls",
    sheds: "Sheds / outbuildings",
    walls: "Individual walls",
    eaves: "Eaves",
    structures: "Other outdoor structures",
    other: "Other area",
  };

  for (const area of p.areas || []) {
    if (CUSTOM_AREAS[area]) reasons.push(`${CUSTOM_AREAS[area]} pressure cleaning`);
  }

  const AREA_LABELS = { driveway: "Driveway", pool: "Pool area", patio: "Patio", pathways: "Pathways" };
  const items = [];
  let subtotal = 0;

  for (const area of (p.areas || []).filter((a) => AREA_LABELS[a])) {
    const d = (p.details || {})[area] || {};
    const bands = PRESSURE_AREA_BANDS[area];
    const band = bands.find((b) => b.value === d.size);
    if (band && band.custom) {
      reasons.push(
        d.size === "unsure" ? `Unsure of ${AREA_LABELS[area].toLowerCase()} size` : `Oversize ${AREA_LABELS[area].toLowerCase()}`
      );
      continue;
    }
    if (d.surface === "other") {
      reasons.push(`Non-standard surface (${AREA_LABELS[area].toLowerCase()})`);
      continue;
    }
    if (d.condition === "oil-rust") {
      reasons.push(`Oil / rust stains (${AREA_LABELS[area].toLowerCase()})`);
      continue;
    }
    if (!band || !d.surface) continue;

    const sqm = band.top;
    const rate = PRESSURE_RATES[d.surface];
    let areaPrice = rate * sqm;
    const surfaceLabel = { concrete: "concrete", tiles: "tiles", pavers: "pavers / sandstone / bricks" }[d.surface];
    items.push({ label: `${AREA_LABELS[area]} — ${surfaceLabel}, up to ${sqm} sqm`, amount: round2(areaPrice) });

    if (d.condition === "very-light") {
      const disc = round2(areaPrice * -0.2);
      areaPrice = areaPrice * 0.8;
      items.push({ label: `${AREA_LABELS[area]} — very light build-up, 20% off`, amount: disc });
    }

    if (d.biocide && d.surface !== "tiles") {
      const bio = round2(BIOCIDE_RATE * sqm);
      areaPrice += bio;
      items.push({ label: `${AREA_LABELS[area]} — biocide post-treatment`, amount: bio, visible: true });
    }

    subtotal += areaPrice;
  }

  if (reasons.length) return { customReasons: reasons, line: null };
  if (!items.length) return { customReasons: [], line: null };

  return {
    customReasons: [],
    line: {
      service: "pressure",
      label: "Pressure Cleaning / Softwashing",
      plan: false,
      items,
      subtotal: round2(subtotal),
    },
  };
}

export function calcRoof(r) {
  const reasons = [];
  if (!r) return { customReasons: [], line: null };

  if (r.commercial === "commercial") reasons.push("Commercial roof cleaning");
  if (r.roofType === "other") reasons.push("Non-standard roof type");
  if (r.storeys === "3+") reasons.push("3+ storey roof");
  if (r.bedrooms === "custom") reasons.push("Extra-large roof");
  if (r.pitch === "steep" || r.pitch === "very-steep") reasons.push("Steep roof pitch");
  if (r.condition === "lichen") reasons.push("Lichen on roof");
  if (reasons.length) return { customReasons: reasons, line: null };

  const storeys = r.storeys === "2" ? 2 : 1;
  const base = (ROOF_PRICES[storeys] || {})[Number(r.bedrooms)];
  if (!base) return { customReasons: [], line: null };

  const items = [{ label: `${storeys === 2 ? "Double" : "Single"}-storey ${r.roofType === "colorbond" ? "Colorbond" : "tile"} roof — soft wash`, amount: base }];
  let price = base;
  const biocide = !!r.biocide && r.roofType === "tile";

  if (r.condition === "light") {
    const disc = round2(base * -0.15);
    price = base * 0.85;
    items.push({ label: "Light build-up discount", amount: disc });
  } else if (r.condition === "heavy" && !biocide) {
    const sur = round2(base * 0.1);
    price = base * 1.1;
    items.push({ label: "Heavy growth & build-up", amount: sur });
  }
  // heavy + biocide: surcharge cancelled — biocide replaces it.

  if (biocide) {
    const bio = round2(price * 0.4);
    price = price * 1.4;
    items.push({ label: "Biocide post-treatment (12-month no-mould guarantee)", amount: bio, visible: true });
  }

  if (price < ROOF_LINE_FLOOR) {
    items.push({ label: "Roof cleaning minimum charge adjustment", amount: round2(ROOF_LINE_FLOOR - price) });
    price = ROOF_LINE_FLOOR;
  }

  return {
    customReasons: [],
    line: {
      service: "roof",
      label: "Roof Cleaning",
      plan: false,
      items,
      subtotal: round2(price),
      note: "Includes roof face, ridge lines + gutter flush",
    },
  };
}

export function calcGutter(g) {
  const reasons = [];
  if (!g) return { customReasons: [], line: null };

  if (g.commercial === "commercial") reasons.push("Commercial gutter cleaning");
  if (g.storeys === "3+") reasons.push("3+ storey gutters");
  if (g.gutterGuard === "yes") reasons.push("Gutter guard installed");
  if (g.pitch === "steep" || g.pitch === "very-steep") reasons.push("Steep roof pitch");
  if (g.bedrooms === "custom") reasons.push("Extra-large home (gutters)");
  if (reasons.length) return { customReasons: reasons, line: null };

  const storeys = g.storeys === "2" ? 2 : 1;
  const base = (GUTTER_PRICES[storeys] || {})[Number(g.bedrooms)];
  if (!base) return { customReasons: [], line: null };

  const items = [{ label: `${storeys === 2 ? "Double" : "Single"}-storey gutter clean`, amount: base }];
  let price = base;
  if (g.condition === "full") {
    const sur = round2(base * 0.1);
    price = base * 1.1;
    items.push({ label: "Gutters full of leaves", amount: sur });
  } else if (g.condition === "plants") {
    const sur = round2(base * 0.2);
    price = base * 1.2;
    items.push({ label: "Plants growing in gutters", amount: sur });
  }

  return {
    customReasons: [],
    line: {
      service: "gutter",
      label: "Gutter Cleaning",
      plan: false,
      items,
      subtotal: round2(price),
      note: "Includes debris clearing + downpipe flushing",
    },
  };
}

export function calcSoftwash(s) {
  const reasons = [];
  if (!s) return { customReasons: [], line: null };

  if (s.commercial === "commercial") reasons.push("Commercial building softwash");
  if (s.storeys === "3+") reasons.push("3+ storey building");
  if (s.bedrooms === "custom") reasons.push("Extra-large home (softwash)");
  if (s.mould === "heavy") reasons.push("Heavy mould / organic growth");
  if (s.webs === "heavy") reasons.push("Heavy spiderwebs / bug nests");
  if (s.grime === "heavy") reasons.push("Heavy grime / dust");
  if (reasons.length) return { customReasons: reasons, line: null };

  const storeys = s.storeys === "2" ? 2 : 1;
  const base = (SOFTWASH_PRICES[storeys] || {})[Number(s.bedrooms)];
  if (!base) return { customReasons: [], line: null };

  const items = [{ label: `${storeys === 2 ? "Double" : "Single"}-storey exterior house softwash`, amount: base }];
  let price = base;
  if (s.windowAddon) {
    const add = round2(base * 0.3);
    price = base * 1.3;
    items.push({ label: "Exterior window cleaning add-on", amount: add, visible: true });
  }

  return {
    customReasons: [],
    line: {
      service: "softwash",
      label: "Exterior House Softwash",
      plan: false,
      items,
      subtotal: round2(price),
      note: "Everything from gutter to ground — walls, eaves, exterior gutter face",
    },
  };
}

export function calcSolar(s) {
  const reasons = [];
  if (!s) return { customReasons: [], line: null };

  if (s.commercial === "commercial") reasons.push("Commercial solar cleaning");
  if (s.storeys === "3+") reasons.push("3+ storey roof (solar)");
  if (s.pitch === "steep" || s.pitch === "very-steep") reasons.push("Steep roof pitch (solar)");
  if (s.condition === "unsure") reasons.push("Unsure of solar panel condition");
  if (s.condition === "lichen") reasons.push("Lichen on solar panels");
  if (s.condition === "heavy") reasons.push("Heavy mould or dirt on solar panels");

  const band = SOLAR_PANEL_BANDS.find((b) => b.value === s.panels);
  if (band && band.custom) reasons.push(s.panels === "unsure" ? "Unsure of solar panel count" : "More than 40 solar panels");
  if (reasons.length) return { customReasons: reasons, line: null };
  if (!band) return { customReasons: [], line: null };

  const freq = SOLAR_FREQUENCIES.find((f) => f.value === s.frequency) || SOLAR_FREQUENCIES[0];
  const items = [{ label: `Solar panel clean — up to ${band.top} panels`, amount: round2(11 * band.top) }];
  let price = 11 * band.top;
  if (freq.discount) {
    price -= freq.discount;
    items.push({ label: `${freq.label} plan discount`, amount: -freq.discount, visible: true });
  }

  return {
    customReasons: [],
    line: {
      service: "solar",
      label: "Solar Panel Cleaning",
      frequency: freq.value,
      frequencyLabel: freq.plan ? freq.label : null,
      plan: freq.plan,
      items,
      subtotal: Math.max(0, round2(price)),
      // +$50 double storey is added AFTER the whole-quote floor (spec §8).
      postFloorAdd:
        s.storeys === "2" ? { label: "Solar — double-storey access", amount: 50 } : null,
    },
  };
}

// ── Whole-quote combination (Section 10) ────────────────────────────────────

export function calculateQuote(state) {
  const services = state.services || [];
  const customReasons = [];
  const lines = [];
  const postFloorAdds = [];

  if (services.includes("birdproofing")) {
    customReasons.push("Solar panel bird proofing (always quoted individually)");
  }

  const calcs = {
    window: () => calcWindow(state.window),
    pressure: () => calcPressure(state.pressure),
    roof: () => calcRoof(state.roof),
    gutter: () => calcGutter(state.gutter),
    softwash: () => calcSoftwash(state.softwash),
    solar: () => calcSolar(state.solar),
  };

  for (const svc of services) {
    if (!calcs[svc]) continue;
    const { customReasons: r, line } = calcs[svc]();
    customReasons.push(...r);
    if (line) {
      lines.push(line);
      if (line.postFloorAdd) postFloorAdds.push(line.postFloorAdd);
    }
  }

  if (customReasons.length) {
    return { custom: true, customReasons, lines: [], total: null };
  }

  // Step 2 — raw combined total (roof line already floored at line level)
  let total = lines.reduce((sum, l) => sum + l.subtotal, 0);

  // Step 3 — whole-quote floor: single highest applicable wins
  const floors = [];
  if (services.includes("pressure") && lines.some((l) => l.service === "pressure")) {
    floors.push({ amount: FLOOR_PRESSURE, label: "pressure cleaning minimum" });
  }
  const windowLine = lines.find((l) => l.service === "window");
  const solarLine = lines.find((l) => l.service === "solar");
  if ((windowLine && !windowLine.plan) || (solarLine && !solarLine.plan)) {
    floors.push({ amount: FLOOR_ONE_OFF, label: "one-off service minimum" });
  }
  if ((windowLine && windowLine.plan) || (solarLine && solarLine.plan)) {
    floors.push({ amount: FLOOR_PLAN, label: "maintenance plan minimum" });
  }

  let floorApplied = null;
  if (floors.length) {
    const highest = floors.reduce((a, b) => (b.amount > a.amount ? b : a));
    if (total < highest.amount) {
      floorApplied = { ...highest, adjustment: round2(highest.amount - total) };
      total = highest.amount;
    }
  }

  // Post-floor additions (solar double-storey +$50)
  for (const add of postFloorAdds) total += add.amount;

  return {
    custom: false,
    customReasons: [],
    lines,
    floorApplied,
    postFloorAdds,
    total: round2(total),
  };
}

export function formatMoney(n) {
  if (n == null) return "";
  const isWhole = Math.abs(n - Math.round(n)) < 0.005;
  return (
    "$" +
    Math.abs(n).toLocaleString("en-AU", {
      minimumFractionDigits: isWhole ? 0 : 2,
      maximumFractionDigits: 2,
    })
  );
}
