// Cloudflare Pages Function — proxies quote-wizard funnel events to the n8n
// webhook server-side (same-origin so sendBeacon works without CORS and the
// n8n URL stays out of the client bundle). Route: /api/quote-analytics
//
// Events land in the "Quote Funnel Events" n8n data table and feed the daily
// 8am drop-off report email.

const DEFAULT_URL = "https://skagen.app.n8n.cloud/webhook/gc-quote-analytics";

export async function onRequestPost(context) {
  const { request, env } = context;
  const target = (env && env.N8N_QUOTE_ANALYTICS_URL) || DEFAULT_URL;
  let bodyText = "{}";
  try {
    bodyText = (await request.text()) || "{}";
  } catch {
    bodyText = "{}";
  }
  try {
    await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyText,
    });
  } catch {
    /* analytics must never error back to the client */
  }
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
