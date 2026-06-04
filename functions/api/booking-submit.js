// Cloudflare Pages Function — proxies the booking submission to the n8n
// webhook server-side (emails the lead + creates the ServiceM8 job).
//
// Same-origin proxy so the browser avoids CORS and the n8n URL stays out of
// the client bundle. Route: /api/booking-submit

const DEFAULT_URL = "https://skagen.app.n8n.cloud/webhook/gc-booking-submit";

export async function onRequestPost(context) {
  const { request, env } = context;
  const target = (env && env.N8N_SUBMIT_URL) || DEFAULT_URL;
  let bodyText = "{}";
  try {
    bodyText = (await request.text()) || "{}";
  } catch {
    bodyText = "{}";
  }
  try {
    const upstream = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyText,
    });
    const text = await upstream.text();
    return new Response(text || JSON.stringify({ ok: upstream.ok }), {
      status: upstream.status,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "upstream_unreachable" }), {
      status: 502,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }
}
