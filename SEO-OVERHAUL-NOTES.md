# Technical SEO Overhaul — Notes

Branch: `seo-overhaul` · Date: 2026-05-18

Goal: fix technical SEO across all 1,235 generated pages with **zero visual or
photo changes**. All fixes made at the template/source level so every generated
page inherits them.

## Baseline (before)

`node scripts/seo-validate.mjs` reported **2,908 errors**:

| Issue | Count |
|---|---|
| Title length outside 30–60 chars | 1,232 |
| Meta description outside 120–160 chars | 1,019 |
| Pages with 2 `<h1>` tags | 656 |
| `/services` canonical not self-referencing | 1 |

JSON-LD validity, Open Graph, Twitter cards, image alt text and internal links
were already clean — no changes needed there.

## Fixes

1. **Titles** — rewrote the title templates in `scripts/prerender.mjs` and the
   matching `<PageSEO>` props in `src/pages/*`. New formats:
   - Residential location: `{Service} {Suburb} | Gold Coast`
   - Commercial location: `{Service} in {Suburb}`
   - Service / hub / static pages: bespoke compliant titles
   - All 1,235 titles now 31–59 chars, unique.

2. **Meta descriptions** — rewrote description templates the same way. All
   descriptions now 126–157 chars, unique.

3. **Duplicate `<h1>`** — the 8 main service pages and `LocationService.jsx`
   each rendered two content `<h1>` tags (a mobile-layout copy and a
   desktop-layout copy; only one is ever visible). Converted the mobile-layout
   copy to a `<p>` with the **identical `className`**. Under Tailwind's CSS
   reset, `<h1>` and `<p>` with the same classes render pixel-identically — so
   this is invisible to visitors but gives crawlers a single `<h1>`.

4. **`/services` canonical** — `/services` renders the same component as the
   homepage and canonicalises to `/`. It was both in the sitemap and pointing
   its canonical at `/`, a conflicting signal. Fix: kept the canonical → `/`
   and **removed `/services` from `sitemap-static.xml`** (a canonicalised-away
   URL should not be listed).

## Heading-hierarchy items skipped

None. The only heading change (item 3) preserved appearance exactly, so it was
applied rather than logged.

## Result

`node scripts/seo-validate.mjs` → **PASS — 0 errors across 1,234 pages.**
`npm run build` completes successfully.

## Verification tooling

`scripts/seo-validate.mjs` — read-only validator. Crawls every sitemap URL in
`dist/` and checks title/description length + uniqueness, single `<h1>`,
self-referencing canonical, valid JSON-LD, OG/Twitter tags, image alt text and
internal links. Re-run any time with `node scripts/seo-validate.mjs --samples`.
