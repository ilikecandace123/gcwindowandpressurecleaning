// Tracking price for custom quotes (internal lead line, never shown on screen).
import { calculateQuote, trackingEstimate, leadQuoteData } from "../src/quote/engine.js";
let pass = 0, fail = 0;
const eq = (name, a, b) => { const ok = JSON.stringify(a) === JSON.stringify(b); ok ? pass++ : fail++; console.log(`${ok ? "PASS" : "FAIL"} ${name}${ok ? "" : ` — got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`}`); };
const win = { propertyType: "house", storeys: "2", panes: "51-60", condition: "moderate", french: "none", balustrades: "no", internalAccess: "no", frequency: "one-off", interiorAddon: true };

// 1. Normal priced quote → no tracking block
eq("priced quote → null", trackingEstimate({ services: ["window"], window: win }), null);
// 2. Long-pole interior windows → custom for the customer, tracking = the price it would have been
{
  const s = { services: ["window"], window: { ...win, internalAccess: "yes" } };
  eq("customer still gets a custom quote", calculateQuote(s).custom, true);
  const t = trackingEstimate(s);
  const normal = calculateQuote({ services: ["window"], window: win }).total;
  eq("tracking total = same answers without the trigger", t.total, normal);
  eq("assumption listed", t.lines[0].assumed.length > 0, true);
}
// 3. Half-yearly plan keeps its plan pricing
{
  const s = { services: ["window"], window: { ...win, internalAccess: "yes", frequency: "half-yearly" } };
  eq("plan tracking = plan price", trackingEstimate(s).total, calculateQuote({ services: ["window"], window: { ...win, frequency: "half-yearly" } }).total);
}
// 4. Unknown pane count → not estimable, no fake number
{
  const t = trackingEstimate({ services: ["window"], window: { ...win, panes: "unsure" } });
  eq("unsure panes → no total", t.total, null);
  eq("unsure panes → listed as not estimable", t.notEstimable.length, 1);
}
// 5. Very steep roof → priced as steep (+10%)
{
  const roof = { commercial: "residential", roofType: "tile", storeys: "1", bedrooms: "4", pitch: "very-steep", condition: "heavy", biocide: false };
  const t = trackingEstimate({ services: ["roof"], roof });
  eq("very steep roof tracking = steep price", t.total, calculateQuote({ services: ["roof"], roof: { ...roof, pitch: "steep" } }).total);
}
// 6. Partial quote: gutter priced, pressure (fences) still to quote → tracking only covers pressure
{
  const s = {
    services: ["pressure", "gutter"],
    pressure: { areas: ["driveway", "fences"], details: { driveway: { size: "25-50", surface: "concrete", condition: "moss", biocide: false } } },
    gutter: { commercial: "residential", storeys: "1", gutterGuard: "no", pitch: "flat", bedrooms: "3", condition: "leaves" },
  };
  const t = trackingEstimate(s);
  eq("partial: tracking line is pressure only", t.lines.map((l) => l.service), ["pressure"]);
  eq("partial: fences flagged as not included", t.lines[0].assumed.some((a) => a.includes("fences")), true);
}
// 7. Bird proofing → never estimated
eq("bird proofing not estimable", trackingEstimate({ services: ["birdproofing"] }).notEstimable.length, 1);
// 8. Customer-facing quote is unchanged by the new code
eq("calculateQuote untouched for custom case", calculateQuote({ services: ["window"], window: { ...win, internalAccess: "yes" } }).total, null);

// 9. leadQuoteData: interior add-on split, tracking, pane bands, biocide flag
{
  const d = leadQuoteData({ services: ["window"], window: { ...win, internalAccess: "yes", frequency: "half-yearly" } });
  eq("lqd: custom", d.custom, true);
  eq("lqd: tracking window line has interior add-on $300", d.tracking.lines[0].interiorAddon, 300);
  eq("lqd: tracking total", d.tracking.total, 720);
  const p = leadQuoteData({ services: ["window"], window: { ...win } });
  eq("lqd: priced line interior add-on", p.lines[0].interiorAddon, 300);
  eq("lqd: no pane bands when count known", p.paneBands, null);
  const u = leadQuoteData({ services: ["window"], window: { ...win, panes: "unsure" } });
  eq("lqd: 10 pane bands", u.paneBands.length, 10);
  eq("lqd: 51-60 band = normal price", u.paneBands.find((b) => b.band === "51-60").price, calculateQuote({ services: ["window"], window: win }).total);
  const pr = leadQuoteData({ services: ["pressure"], pressure: { areas: ["driveway"], details: { driveway: { size: "25-50", surface: "concrete", condition: "moss", biocide: true } } } });
  eq("lqd: pressure biocide flagged", pr.selections.pressureBiocide, true);
  eq("lqd: pressure biocide amount", pr.lines[0].biocide, 82.5);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
