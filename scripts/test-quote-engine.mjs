// Unit tests for the Instant Quote Engine pricing logic.
// Run: node scripts/test-quote-engine.mjs
// Covers every worked example in Section 10 of the spec plus edge cases.

import { calculateQuote } from "../src/quote/engine.js";

let pass = 0;
let fail = 0;

function eq(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.error(`  ✗ ${name}\n      expected: ${JSON.stringify(expected)}\n      actual:   ${JSON.stringify(actual)}`);
  }
}

const windowBase = {
  propertyType: "house",
  storeys: "1",
  tint: "no",
  condition: "moderate",
  french: "none",
  panes: "1-10",
  frequency: "one-off",
  interiorAddon: false,
};

console.log("Section 10 worked examples:");

// 1. Windows raw $100..., one-off, alone → floor $220.
// (7×10=70 + french 1–3 (+50)=120... spec's "$100 raw" is illustrative; we
// verify the floor behaviour: raw < 220 → 220.)
{
  const q = calculateQuote({ services: ["window"], window: { ...windowBase } }); // raw 70
  eq("Ex1: one-off windows below floor → $220", q.total, 220);
  eq("Ex1: floor label", q.floorApplied?.amount, 220);
}

// 2. Windows plan (raw small) + driveway raw $140 → pressure floor $275.
{
  // windows quarterly: raw 7×30=210 −100 = 110; driveway 25–50 concrete very light: 50×3.3=165 ×0.8=132
  // total 242 < 275 → 275
  const q = calculateQuote({
    services: ["window", "pressure"],
    window: { ...windowBase, panes: "21-30", frequency: "quarterly" },
    pressure: { areas: ["driveway"], details: { driveway: { size: "25-50", surface: "concrete", condition: "very-light" } } },
  });
  eq("Ex2: windows plan + driveway, floored at $275", q.total, 275);
}

// 3. Roof single 2bdrm light (660×0.85=561 → line floor 594) + windows.
// (French 1–3 no longer charges the exterior — windows are 7×10=70.)
{
  const q = calculateQuote({
    services: ["roof", "window"],
    roof: { commercial: "residential", roofType: "tile", storeys: "1", bedrooms: "2", pitch: "flat", condition: "light", biocide: false },
    window: { ...windowBase, french: "1-3" },
  });
  eq("Ex3: roof light at line floor $594 + windows $70 = $664", q.total, 664);
  eq("Ex3: roof line subtotal is floored to 594", q.lines.find((l) => l.service === "roof").subtotal, 594);
}

// 4. Driveway 51–75 concrete, moss, + biocide: 75×3.30=247.50 + 75×1.65=123.75 = 371.25
{
  const q = calculateQuote({
    services: ["pressure"],
    pressure: { areas: ["driveway"], details: { driveway: { size: "51-75", surface: "concrete", condition: "moss", biocide: true } } },
  });
  eq("Ex4: driveway + biocide = $371.25", q.total, 371.25);
}

// 5. Solar 11–15, double storey, one-off, light dust: 15×11=165 → floor 220 → +50 = 270
{
  const q = calculateQuote({
    services: ["solar"],
    solar: { commercial: "residential", storeys: "2", pitch: "flat", panels: "11-15", condition: "dust", frequency: "one-off" },
  });
  eq("Ex5: solar one-off dbl storey = $270", q.total, 270);
}

// 6. Solar 11–15, double storey, 3-monthly: 165−150=15 → plan floor 165 → +50 = 215
{
  const q = calculateQuote({
    services: ["solar"],
    solar: { commercial: "residential", storeys: "2", pitch: "flat", panels: "11-15", condition: "dust", frequency: "3-monthly" },
  });
  eq("Ex6: solar 3-monthly dbl storey = $215/visit", q.total, 215);
}

console.log("\nWindow pricing rules:");

// House 2 storey, 11–20 panes, french 1–3, regularly cleaned, one-off:
// (7×20 + 50) × 0.9 = 171 → below one-off floor 220 → 220 (french is interior-only now)
{
  const q = calculateQuote({
    services: ["window"],
    window: { ...windowBase, storeys: "2", panes: "11-20", french: "1-3", condition: "regular" },
  });
  eq("2-storey 20 panes french regular one-off → floored $220", q.total, 220);
}

// Same but 31–40 panes: (7×40+50)×0.9 = 297 (french no longer hits exterior)
{
  const q = calculateQuote({
    services: ["window"],
    window: { ...windowBase, storeys: "2", panes: "31-40", french: "1-3", condition: "regular" },
  });
  eq("2-storey 40 panes french regular one-off = $297", q.total, 297);
}

// Monthly plan: raw 7×40+50=330 → −150 = 180 → above plan floor 165
{
  const q = calculateQuote({
    services: ["window"],
    window: { ...windowBase, storeys: "2", panes: "31-40", frequency: "monthly" },
  });
  eq("2-storey 40 panes monthly = $180/visit", q.total, 180);
}

// Interior add-on: one-off, 21–30 panes: 7×30=210 + 5×30=150 = 360
{
  const q = calculateQuote({
    services: ["window"],
    window: { ...windowBase, panes: "21-30", interiorAddon: true },
  });
  eq("Interior add-on 30 panes = $360", q.total, 360);
}

// Apartment interior only, 11–20 panes: 6×20=120 → below floor 220 → 220
{
  const q = calculateQuote({
    services: ["window"],
    window: {
      propertyType: "apartment",
      apartmentScope: "interior",
      tint: "no",
      condition: "moderate",
      french: "none",
      panes: "11-20",
      frequency: "one-off",
    },
  });
  eq("Apartment interior-only 20 panes one-off → floored $220", q.total, 220);
}

// Apartment interior+exterior 21–30, regular: 12×30=360 ×0.9=324
{
  const q = calculateQuote({
    services: ["window"],
    window: {
      propertyType: "apartment",
      apartmentScope: "everything",
      tint: "no",
      condition: "regular",
      french: "none",
      panes: "21-30",
      frequency: "one-off",
    },
  });
  eq("Apartment int+ext 30 panes regular = $324", q.total, 324);
}

console.log("\nRoof biocide interaction:");

// Light + biocide: 660×0.85=561 ×1.4=785.40 (light discount is 15%)
{
  const q = calculateQuote({
    services: ["roof"],
    roof: { commercial: "residential", roofType: "tile", storeys: "1", bedrooms: "2", pitch: "moderate", condition: "light", biocide: true },
  });
  eq("Roof light (15%) + biocide = $785.40", q.total, 785.4);
}

// Heavy + biocide: surcharge cancelled → 660×1.4 = 924
{
  const q = calculateQuote({
    services: ["roof"],
    roof: { commercial: "residential", roofType: "tile", storeys: "1", bedrooms: "2", pitch: "moderate", condition: "heavy", biocide: true },
  });
  eq("Roof heavy + biocide (surcharge cancelled) = $924", q.total, 924);
}

// Heavy, no biocide: 660×1.1 = 726
{
  const q = calculateQuote({
    services: ["roof"],
    roof: { commercial: "residential", roofType: "tile", storeys: "1", bedrooms: "2", pitch: "moderate", condition: "heavy", biocide: false },
  });
  eq("Roof heavy no biocide = $726", q.total, 726);
}

// Colorbond can't have biocide selected (UI prevents), and biocide flag is ignored:
{
  const q = calculateQuote({
    services: ["roof"],
    roof: { commercial: "residential", roofType: "colorbond", storeys: "1", bedrooms: "3", pitch: "flat", condition: "heavy", biocide: true },
  });
  eq("Colorbond heavy, biocide ignored = 880×1.1 = $968", q.total, 968);
}

// Roof line floor doesn't force up whole quote but roof never below 594:
// double 3bdrm light: 1100×0.85=935 (above floor)
{
  const q = calculateQuote({
    services: ["roof"],
    roof: { commercial: "residential", roofType: "tile", storeys: "2", bedrooms: "3", pitch: "flat", condition: "light", biocide: false },
  });
  eq("Roof double 3bdrm light (15%) = $935", q.total, 935);
}

console.log("\nGutter / softwash:");

{
  const q = calculateQuote({
    services: ["gutter"],
    gutter: { commercial: "residential", storeys: "2", gutterGuard: "no", pitch: "moderate", bedrooms: "4", condition: "plants" },
  });
  eq("Gutter double 4bdrm plants = 550×1.20 = $660", q.total, 660);
}

{
  const q = calculateQuote({
    services: ["gutter"],
    gutter: { commercial: "residential", storeys: "1", gutterGuard: "no", pitch: "flat", bedrooms: "3", condition: "full" },
  });
  eq("Gutter single 3bdrm full of leaves = 330×1.10 = $363", q.total, 363);
}

{
  const q = calculateQuote({
    services: ["softwash"],
    softwash: { commercial: "residential", storeys: "1", bedrooms: "3", mould: "light", webs: "moderate", grime: "light", windowAddon: true },
  });
  eq("Softwash single 3bdrm + window add-on = 495×1.3 = $643.50", q.total, 643.5);
}

console.log("\nCustom-quote triggers:");

{
  const q = calculateQuote({
    services: ["window"],
    window: { ...windowBase, propertyType: "storefront" },
  });
  eq("Storefront → custom", q.custom, true);
}
{
  const q = calculateQuote({
    services: ["window", "gutter"],
    window: { ...windowBase },
    gutter: { commercial: "residential", storeys: "2", gutterGuard: "yes", pitch: "flat", bedrooms: "3", condition: "leaves" },
  });
  eq("Any trigger poisons whole quote (gutter guard)", q.custom, true);
}
{
  const q = calculateQuote({
    services: ["birdproofing", "solar"],
    birdproofing: { commercial: "residential", storeys: "1", birds: "yes" },
    solar: { commercial: "residential", storeys: "1", pitch: "flat", panels: "6-10", condition: "dust", frequency: "one-off" },
  });
  eq("Bird proofing always custom", q.custom, true);
}
{
  const q = calculateQuote({
    services: ["pressure"],
    pressure: { areas: ["driveway", "fences"], details: { driveway: { size: "25-50", surface: "concrete", condition: "moss" } } },
  });
  eq("Custom pressure area (fences) → custom", q.custom, true);
}
{
  const q = calculateQuote({
    services: ["roof"],
    roof: { commercial: "residential", roofType: "tile", storeys: "1", bedrooms: "2", pitch: "very-steep", condition: "light", biocide: false },
  });
  eq("Very steep pitch → custom", q.custom, true);
}

console.log("\nFloor selection (highest applicable wins):");

// windows plan (floor 165) + pressure (floor 275): total small → 275
{
  const q = calculateQuote({
    services: ["window", "pressure"],
    window: { ...windowBase, frequency: "monthly" }, // raw 70−150 → clamped 0
    pressure: { areas: ["pathways"], details: { pathways: { size: "one-side", surface: "concrete", condition: "moss" } } }, // 20×3.3=66
  });
  eq("Plan windows + small pressure → $275", q.total, 275);
}

// gutter alone has no floor: single 2bdrm = 275... use 3bdrm=330 to show no flooring
{
  const q = calculateQuote({
    services: ["gutter"],
    gutter: { commercial: "residential", storeys: "1", gutterGuard: "no", pitch: "flat", bedrooms: "2", condition: "leaves" },
  });
  eq("Gutter alone, no whole-quote floor = $275 base (not floored)", q.total, 275);
  eq("Gutter alone: floorApplied is null", q.floorApplied, null);
}

// mixed one-off windows + plan solar → highest of 220/165 → 220
{
  const q = calculateQuote({
    services: ["window", "solar"],
    window: { ...windowBase }, // 70 one-off
    solar: { commercial: "residential", storeys: "1", pitch: "flat", panels: "1-5", condition: "dust", frequency: "3-monthly" }, // 55−150→0
  });
  eq("One-off windows + plan solar → floor $220", q.total, 220);
}

console.log("\nJuly wizard tweaks:");

{
  const q = calculateQuote({
    services: ["window"],
    window: { ...windowBase, panes: "21-30", internalAccess: "no" },
  }); // 7×30 = 210 → below the $220 one-off floor
  eq("Oversized-pane question removed — 30 panes floors to $220", q.total, 220);
}
{
  const q = calculateQuote({ services: ["window"], window: { ...windowBase, internalAccess: "yes" } });
  eq("Ladder-access interior windows → custom", q.custom, true);
}
{
  const q = calculateQuote({ services: ["window"], window: { ...windowBase, internalAccess: "unsure" } });
  eq("Unsure interior access → custom", q.custom, true);
}
{
  const q = calculateQuote({ services: ["window"], window: { ...windowBase, tint: "unsure" } });
  eq("Tint unsure → priced, not custom", q.custom, false);
}
{
  const q = calculateQuote({
    services: ["solar"],
    solar: { commercial: "residential", storeys: "1", pitch: "flat", panels: "unsure", condition: "dust", frequency: "one-off" },
  });
  eq("Solar panel count unknown → custom", q.custom, true);
}

// French 1–3 charges the interior side only
{
  const q = calculateQuote({
    services: ["window"],
    window: { ...windowBase, panes: "21-30", french: "1-3", interiorAddon: true },
  }); // 210 exterior + (150 interior + 50 french) = 410
  eq("French 1–3 with interior add-on = $410", q.total, 410);
}
{
  const q = calculateQuote({
    services: ["window"],
    window: { ...windowBase, panes: "31-40", french: "1-3" },
  }); // exterior only: 280 — no french charge without interiors
  eq("French 1–3 exterior-only = $280 (no french charge)", q.total, 280);
}
{
  const q = calculateQuote({
    services: ["window"],
    window: { propertyType: "apartment", apartmentScope: "everything", tint: "no", condition: "moderate", french: "1-3", panes: "21-30", frequency: "one-off" },
  }); // apartments always include interiors: 12×30 + 50 = 410
  eq("Apartment french 1–3 still applies = $410", q.total, 410);
}

console.log("\nSeptember 2026 trigger reductions:");

// #3 — commercial windows priced exactly like a house
{
  const house = calculateQuote({ services: ["window"], window: { ...windowBase, panes: "21-30" } });
  const comm = calculateQuote({
    services: ["window"],
    window: { ...windowBase, propertyType: "commercial", panes: "21-30" },
  });
  eq("Commercial windows priced, not custom", comm.custom, false);
  eq("Commercial windows == house price", comm.total, house.total);
}
{
  const q = calculateQuote({
    services: ["window"],
    window: { ...windowBase, propertyType: "commercial", storeys: "3" },
  });
  eq("Commercial + 3 storeys still custom", q.custom, true);
}

// #5/#6 — tint options
{
  const q = calculateQuote({ services: ["window"], window: { ...windowBase, panes: "21-30", tint: "tint" } });
  eq("Tint = no price change (floors to $220)", q.total, 220);
}
{
  const q = calculateQuote({ services: ["window"], window: { ...windowBase, panes: "21-30", tint: "no" } });
  eq("Tint 'no' = $220 (floor)", q.total, 220);
}
{
  // Exterior only: no interior price to load, so no change.
  const q = calculateQuote({ services: ["window"], window: { ...windowBase, panes: "21-30", tint: "lowe" } });
  eq("Low-E exterior-only = unchanged $220 (floor)", q.total, 220);
}
{
  // 7×30=210 exterior + interior 5×30=150 × 1.20 = 180 → 390
  const q = calculateQuote({
    services: ["window"],
    window: { ...windowBase, panes: "21-30", tint: "lowe", interiorAddon: true },
  });
  eq("Low-E loads interior 20% → $390", q.total, 390);
  eq("Low-E loading reported on line", q.lines[0].interiorLoading.amount, 30);
}

// #7 — significant build-up loads interior 15%
{
  const q = calculateQuote({ services: ["window"], window: { ...windowBase, panes: "21-30", condition: "significant" } });
  eq("Significant build-up exterior-only = unchanged $220 (floor)", q.total, 220);
  eq("Significant build-up no longer custom", q.custom, false);
}
{
  // interior 150 × 1.15 = 172.50 → 210 + 172.50 = 382.50
  const q = calculateQuote({
    services: ["window"],
    window: { ...windowBase, panes: "21-30", condition: "significant", interiorAddon: true },
  });
  eq("Significant build-up loads interior 15% → $382.50", q.total, 382.5);
}
{
  // Both loadings stack: 150 × 1.35 = 202.50 → 412.50
  const q = calculateQuote({
    services: ["window"],
    window: { ...windowBase, panes: "21-30", condition: "significant", tint: "lowe", interiorAddon: true },
  });
  eq("Low-E + build-up stack to 35% → $412.50", q.total, 412.5);
}
{
  // Apartment, both sides: 12×30=360 + (6×30 × 0.20 = 36) = 396
  const q = calculateQuote({
    services: ["window"],
    window: {
      propertyType: "apartment", apartmentScope: "everything", tint: "lowe",
      condition: "moderate", french: "none", panes: "21-30", frequency: "one-off",
    },
  });
  eq("Apartment Low-E loads interior half only → $396", q.total, 396);
}

// #37/#43/#54 — steep-but-manageable pitch = +10%
{
  const q = calculateQuote({
    services: ["roof"],
    roof: { commercial: "residential", roofType: "tile", storeys: "1", bedrooms: "4", pitch: "steep", condition: "heavy", biocide: false },
  }); // 1100 × 1.1 heavy = 1210 × 1.1 pitch = 1331
  eq("Roof steep pitch +10% → $1331", q.total, 1331);
  eq("Roof steep pitch not custom", q.custom, false);
}
{
  const q = calculateQuote({
    services: ["gutter"],
    gutter: { commercial: "residential", storeys: "1", gutterGuard: "no", pitch: "steep", bedrooms: "3", condition: "leaves" },
  }); // 330 × 1.1 = 363
  eq("Gutter steep pitch +10% → $363", q.total, 363);
}
{
  const q = calculateQuote({
    services: ["solar"],
    solar: { commercial: "residential", storeys: "1", pitch: "steep", panels: "31-40", condition: "dust", frequency: "one-off" },
  }); // 11×40=440 × 1.1 = 484 (clear of the $220 floor)
  eq("Solar steep pitch +10% → $484", q.total, 484);
}
{
  const q = calculateQuote({
    services: ["gutter"],
    gutter: { commercial: "residential", storeys: "1", gutterGuard: "no", pitch: "very-steep", bedrooms: "3", condition: "leaves" },
  });
  eq("Gutter very-steep still custom", q.custom, true);
}

// #50/#51 — heavy webs / grime = one flat 20%, heavy mould still custom
{
  const q = calculateQuote({
    services: ["softwash"],
    softwash: { commercial: "residential", storeys: "1", bedrooms: "3", mould: "light", webs: "heavy", grime: "light", windowAddon: false },
  }); // 495 × 1.2 = 594
  eq("Heavy webs +20% → $594", q.total, 594);
}
{
  const q = calculateQuote({
    services: ["softwash"],
    softwash: { commercial: "residential", storeys: "1", bedrooms: "3", mould: "light", webs: "heavy", grime: "heavy", windowAddon: false },
  });
  eq("Heavy webs AND grime still only +20% → $594", q.total, 594);
}
{
  const q = calculateQuote({
    services: ["softwash"],
    softwash: { commercial: "residential", storeys: "1", bedrooms: "3", mould: "heavy", webs: "heavy", grime: "heavy", windowAddon: false },
  });
  eq("Heavy mould still custom", q.custom, true);
}
{
  // 495 base + 20% (99) + window add-on 30% of base (148.50) = 742.50
  const q = calculateQuote({
    services: ["softwash"],
    softwash: { commercial: "residential", storeys: "1", bedrooms: "3", mould: "light", webs: "light", grime: "heavy", windowAddon: true },
  });
  eq("Heavy grime + window add-on both off base → $742.50", q.total, 742.5);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
