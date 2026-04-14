# SEO Fixes Design — 10 April 2026

## Overview
Three fixes identified from the weekly SEO health check report. Fixes 1 and 2 are small infrastructure changes. Fix 3 is a full content rewrite (Option B) of two service pages.

---

## Fix 1 — CSP Error (Cloudflare Insights Beacon)

**File:** `public/_headers`

**Problem:** The `Content-Security-Policy` `script-src` directive does not include `https://static.cloudflareinsights.com`. Cloudflare Pages injects the analytics beacon automatically, but the CSP blocks it, causing a console error on every page load.

**Change:** Append `https://static.cloudflareinsights.com` to the existing `script-src` value in `public/_headers`.

**Before:**
```
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://places.googleapis.com
```

**After:**
```
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://places.googleapis.com https://static.cloudflareinsights.com
```

---

## Fix 2 — Roof Cleaning Trailing-Slash Duplicate URL

**Files:** `public/_redirects` (new file)

**Problem:** GSC shows `/commercial/roof-cleaning` and `/commercial/roof-cleaning/` as separate URLs with separate impression counts. Canonical tag already points to non-slash version, but no 301 redirect exists to consolidate crawl equity.

**Change:** Create `public/_redirects` with a 301 redirect for the commercial roof-cleaning trailing-slash URL, plus a pre-emptive sweep for any other commercial routes that may have the same issue.

```
/commercial/roof-cleaning/          /commercial/roof-cleaning          301
/commercial/window-cleaning/        /commercial/window-cleaning        301
/commercial/pressure-cleaning/      /commercial/pressure-cleaning      301
/commercial/gutter-cleaning/        /commercial/gutter-cleaning        301
/commercial/house-softwash/         /commercial/house-softwash         301
/commercial/solar-panel-cleaning/   /commercial/solar-panel-cleaning   301
/commercial/bird-proofing/          /commercial/bird-proofing          301
```

Note: Cloudflare Pages processes `_redirects` before serving content, so these run before React Router.

---

## Fix 3a — Solar Panel Cleaning Page Rewrite

**File:** `src/pages/SolarPanelCleaning.jsx`

**Current state:** ~347 lines. Hero → about → process (3 steps) → benefits (6) → reviews → quote form → FAQ (5) → related services → suburb links.

**Target state:** ~550+ lines. Same structure, all sections expanded. No new component dependencies — all additions are inline JSX.

### Changes by section:

**Meta title:** `"Solar Panel Cleaning Gold Coast | Boost Output Up to 30%"` — moves "Gold Coast" earlier for keyword proximity.

**Meta description:** Expand to include suburb names: `"Professional solar panel cleaning across the Gold Coast — Surfers Paradise, Robina, Burleigh Heads, Palm Beach & beyond. Boost energy output up to 30%. Fully insured. Call (07) 5651 2386."`

**H1:** Change to `"Gold Coast Solar Panel Cleaning — Restore Lost Energy Output"` — leads with the target keyword phrase.

**Hero body copy (desktop):** Expand to add: Gold Coast-specific angle (coastal humidity, bird droppings, subtropical heat), efficiency loss framing ($X/year in lost savings), and a third CTA stat (e.g., panels cleaned in last 12 months count).

**New section: "Why Gold Coast Solar Panels Get Dirty Faster"** — inserted after the About section. Content:
- Subtropical humidity traps dust and pollen on panel surfaces
- Salt aerosol from ocean proximity leaves mineral deposits
- Coastal bird species (ibis, cockatoos, cormorants) cause heavy soiling
- Pollen from hinterland eucalyptus and paperbarks during spring/summer
- Dust from M1 motorway corridor for bayside and northern suburbs
- UV intensity accelerates bonding of organic matter to glass
Each point is 1–2 sentences. Presented as a 2-column grid of icon + text cards.

**Process steps:** Expand from 3 to 5:
1. Safety setup & roof access assessment
2. Panel inspection (hotspots, micro-cracks, bird damage)
3. Deionised / purified water pre-rinse (required by most manufacturers to preserve anti-reflective coating)
4. Soft-brush scrub with pH-neutral solution
5. Output test & before/after photo report

**New section: "Dirty vs Clean — What You're Losing"** — comparison table:
| | Dirty Panels | After Professional Clean |
|---|---|---|
| Efficiency | Up to 30% below rated output | Restored to rated output |
| Annual savings impact | ~$300–600 lost/year (6kW system) | Savings fully restored |
| Visual appearance | Streaked, discoloured | Clear, like-new |
| Warranty status | Potentially voided | Maintained |
| Bird damage risk | High (nesting attracted to soiled panels) | Reduced |

**Benefits:** Keep 6, update copy to be more Gold Coast-specific (e.g., "coastal bird activity" instead of generic "bird droppings").

**FAQs:** Expand from 5 to 9. New additions:
- "How does Gold Coast's coastal salt air affect solar panels?" 
- "Do you clean panels on Surfers Paradise high-rise apartments?"
- "Will cleaning void my solar panel warranty?"
- "How much energy am I losing right now if my panels are dirty?"

**New section: "Areas We Service"** — short paragraph (not a component) naming 12–15 key GC suburbs with natural language: "We clean solar panels across the Gold Coast including Surfers Paradise, Broadbeach, Robina, Burleigh Heads, Palm Beach, Currumbin, Coolangatta, Southport, Nerang, Mudgeeraba, Elanora, Tugun, and Mermaid Waters." Suburb names link to their respective location service pages where they exist.

**Related services:** Add "Gutter Cleaning" as a third card (bird droppings block gutters — natural cross-sell).

---

## Fix 3b — Roof Cleaning Page Rewrite

**File:** `src/pages/RoofCleaning.jsx`

**Current state:** ~347 lines. Hero → about → process (4 steps) → benefits (6) → reviews → quote form → FAQ (3) → related services → suburb links.

**Target state:** ~560+ lines. Same structure, all sections expanded.

### Changes by section:

**Meta title:** `"Roof Cleaning Gold Coast | Tile, Metal & Concrete Specialists"` — targets primary keyword directly, adds surface type keywords.

**Meta description:** Expand with suburb names and roof types: `"Professional roof cleaning across the Gold Coast. Tile, metal & concrete roof specialists — Surfers Paradise, Robina, Burleigh Heads & more. Fully insured. Free quotes — call (07) 5651 2386."`

**H1:** Change to `"Roof Cleaning Gold Coast — Tile, Metal & Concrete Roofs"` — leads with target keyword, adds surface modifiers.

**Hero body copy (desktop):** Add Gold Coast-specific framing — coastal salt air, subtropical humidity, storm debris, moss/lichen acceleration in QLD climate.

**New section: "Why Gold Coast Roofs Need Cleaning More Often"** — inserted after About section. Content:
- Subtropical humidity (avg 65–80% RH year-round) accelerates moss and lichen growth vs drier climates
- Salt aerosol from Coral Sea carried inland up to 10km — triggers mineral deposit buildup and paint degradation
- Summer storm season (Nov–Apr) deposits debris, leaves, and organic matter that traps moisture
- High UV intensity causes thermal expansion cracking in tiles, creating crevices where growth takes hold
- Annual rainfall (1,400mm+) keeps surfaces wet longer than inland QLD, accelerating biological growth
Presented as 2-column grid of icon + text cards.

**New section: "Roof Type Guide"** — inserted after the "Why Gold Coast" section. Comparison table:
| Roof Type | Recommended Method | Frequency | Key Concerns |
|---|---|---|---|
| Concrete/terracotta tile | Soft wash + low-pressure rinse | Every 2–3 years | Moss, lichen, paint fade |
| Metal (Colorbond, Zincalume) | Low-pressure soft wash | Every 2–3 years | Rust stains, sealant integrity |
| Flat membrane | Gentle hand wash | Annually | Debris blockage, UV degradation |
| Asphalt shingle | Soft wash only | Every 3–5 years | Granule loss risk with pressure |

**Process steps:** Expand from 4 to 6:
1. Safety setup — non-slip footwear, harness points, neighbour notification
2. Roof inspection — identify cracked tiles, rusted flashings, blocked valleys
3. Anti-microbial pre-treatment — kills moss, lichen, algae at root level
4. Soft-brush agitation — loosens embedded organic matter without surface damage
5. Low-pressure rinse — controlled wash removes all residue
6. Final inspection + optional post-treatment sealant

**New section: "Signs Your Roof Needs Cleaning"** — visual checklist section. Items:
- Dark streaks or black staining (algae)
- Green or grey patches (moss/lichen)
- Visible debris accumulation in valleys and gutters
- Discolouration around downpipes
- Musty smell in ceiling space after rain
- Paint peeling or chalking on roof surface
Presented as a 2-column checklist grid.

**Benefits:** Keep 6, update copy to be GC-specific (e.g., call out salt air, subtropical conditions).

**FAQs:** Expand from 3 to 9. New additions:
- "What does roof cleaning cost on the Gold Coast?"
- "Will you clean my roof after a storm?"
- "Can you apply anti-moss coating after cleaning?"
- "Do you clean gutters at the same time as the roof?"
- "Is soft washing or pressure washing better for Gold Coast tile roofs?"
- "How do I know if I have lichen vs moss on my roof?"

**New section: "Areas We Service"** — same pattern as solar. Names 12–15 key suburbs with links.

**Related services:** Keep existing 3 (Gutter Cleaning, Solar Panel Cleaning, Window Cleaning). Update window cleaning card's description — currently says "to extend your roof's life" which is copy/paste error from another card.

---

## Verification Steps

After implementation, verify:
1. Load homepage in browser — no CSP errors in console
2. Visit `/commercial/roof-cleaning/` (trailing slash) — confirm 301 redirect to non-slash URL
3. Solar panel cleaning page — confirm new sections render, no layout breaks on mobile/desktop
4. Roof cleaning page — same
5. Confirm canonical tags still correct on both pages
6. Run a quick Lighthouse check on both rewritten pages — score should not drop
