// Cloudflare Pages Function — server-side Google Places Autocomplete (New).
//
// Keeps the Places key OFF the client (same rule as functions/api/reviews.js).
// The browser calls same-origin /api/address-autocomplete?q=...; we call Google
// server-side with GOOGLE_PLACES_API_KEY and return clean address suggestions.
// On failure we pass Google's error message back (in `error`) so the dropdown
// can be diagnosed without exposing the key.
//
// Route: /api/address-autocomplete

const ENDPOINT = "https://places.googleapis.com/v1/places:autocomplete";

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const q = (new URL(request.url).searchParams.get("q") || "").trim();
  if (q.length < 3) return json({ suggestions: [] });
  const key = env && env.GOOGLE_PLACES_API_KEY;
  if (!key) return json({ suggestions: [], error: "GOOGLE_PLACES_API_KEY not configured" });
  try {
    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "suggestions.placePrediction.text,suggestions.placePrediction.placeId",
      },
      body: JSON.stringify({ input: q, includedRegionCodes: ["au"] }),
    });
    const data = await r.json();
    if (data && data.error) {
      // e.g. "Places API (New) has not been used in project ... or it is disabled"
      return json({ suggestions: [], error: data.error.message || "google_error", status: data.error.status });
    }
    const suggestions = (data.suggestions || [])
      .map((s) => ({
        text: (s.placePrediction && s.placePrediction.text && s.placePrediction.text.text) || "",
        placeId: (s.placePrediction && s.placePrediction.placeId) || "",
      }))
      .filter((s) => s.text);
    return json({ suggestions });
  } catch (e) {
    return json({ suggestions: [], error: String(e) });
  }
}
