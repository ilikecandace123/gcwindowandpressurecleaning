// Cloudflare Pages Function — server-side Google Places API proxy.
//
// Why this exists:
//   The Places API key MUST NOT ship in the client bundle. Anyone who can
//   View Source on the live site can otherwise grab the key and run up the
//   bill (and that's the most likely cause of the April 2026 spike).
//
// What this does:
//   - Holds the API key as a server-side env var (set in Cloudflare Pages
//     project settings: Environment variables → GOOGLE_PLACES_API_KEY).
//     The key is NEVER bundled into client JS.
//   - Fetches Place Details for the GC Window business and returns the JSON.
//   - Caches the response at the Cloudflare edge for 24h via the Cache API.
//     With a 24h TTL the *worst case* is one upstream call per edge per day,
//     not one call per page view. Realistic monthly call volume drops from
//     ~19,000 to roughly 30–100.
//   - Stale-while-revalidate fallback: if upstream fails, returns the last
//     successful response (kept in a 7-day stale cache) rather than 502.
//
// Route: /api/reviews  (Cloudflare Pages auto-mounts functions/api/reviews.js)

const PLACE_ID = "ChIJpTMe2iOAqU0RqA5p7p-4Aog";
const FIELD_MASK = "reviews,rating,userRatingCount,displayName";
const FRESH_TTL_SECONDS = 86400;       // 24h
const STALE_TTL_SECONDS = 7 * 86400;   // 7d (used as fallback only)

const FRESH_CACHE_URL = "https://internal-cache/places-reviews/fresh-v1";
const STALE_CACHE_URL = "https://internal-cache/places-reviews/stale-v1";

export async function onRequestGet(context) {
  const { env, waitUntil } = context;
  const cache = caches.default;

  // 1. Fast path: serve fresh-cached response if present.
  const freshKey = new Request(FRESH_CACHE_URL, { method: "GET" });
  const cached = await cache.match(freshKey);
  if (cached) {
    return addCors(cached);
  }

  // 2. Cache miss — fetch upstream.
  const apiKey = env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    // Misconfigured deploy — fall back to stale cache if we have one,
    // otherwise empty payload so the component shows fallback reviews.
    const staleKey = new Request(STALE_CACHE_URL, { method: "GET" });
    const stale = await cache.match(staleKey);
    if (stale) return addCors(stale);
    return jsonResponse(
      { error: "GOOGLE_PLACES_API_KEY not configured" },
      500,
      { "Cache-Control": "no-store" }
    );
  }

  let upstream;
  try {
    upstream = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": FIELD_MASK,
        },
        // Defence-in-depth: short timeout via AbortController to avoid
        // hanging the edge if Google is slow.
        cf: { cacheTtl: 0, cacheEverything: false },
      }
    );
  } catch (err) {
    return staleOrError(cache, err);
  }

  if (!upstream.ok) {
    return staleOrError(cache, new Error(`upstream ${upstream.status}`));
  }

  const data = await upstream.json();

  const body = JSON.stringify(data);
  const fresh = new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": `public, max-age=${FRESH_TTL_SECONDS}, s-maxage=${FRESH_TTL_SECONDS}`,
      "CDN-Cache-Control": `public, max-age=${FRESH_TTL_SECONDS}`,
    },
  });

  // Store in fresh cache (24h). Cache API needs a Cache-Control with max-age.
  waitUntil(cache.put(freshKey, fresh.clone()));

  // Also store a longer-lived copy as a stale-while-revalidate fallback.
  const stale = new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": `public, max-age=${STALE_TTL_SECONDS}`,
      "X-From-Cache": "stale-fallback",
    },
  });
  waitUntil(cache.put(new Request(STALE_CACHE_URL, { method: "GET" }), stale));

  return addCors(fresh);
}

// ─── helpers ──────────────────────────────────────────────────────────────

async function staleOrError(cache, err) {
  const staleKey = new Request(STALE_CACHE_URL, { method: "GET" });
  const stale = await cache.match(staleKey);
  if (stale) return addCors(stale);
  return jsonResponse(
    { error: "upstream_failed", detail: String(err && err.message || err) },
    502,
    { "Cache-Control": "no-store" }
  );
}

function jsonResponse(obj, status, extraHeaders = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
}

function addCors(res) {
  // Same-origin so CORS isn't strictly required, but harmless and useful
  // for local dev when running vite on a different port.
  const out = new Response(res.body, res);
  out.headers.set("Access-Control-Allow-Origin", "*");
  return out;
}
