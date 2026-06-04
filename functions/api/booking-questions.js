// Cloudflare Pages Function — proxies the booking "AI follow-up questions"
// request to the n8n webhook server-side.
//
// Why: n8n's webhook does not return a usable Access-Control-Allow-Origin
// header, so the browser cannot call it cross-origin. Routing through this
// same-origin function avoids CORS entirely and keeps the n8n URL out of the
// client bundle (same approach as functions/api/reviews.js).
//
// Route: /api/booking-questions  (auto-mounted by Cloudflare Pages)

const DEFAULT_URL = "https://skagen.app.n8n.cloud/webhook/gc-booking-questions";

export async function onRequestPost(context) {
  const { request, env } = context;
  const target = (env && env.N8N_QUESTIONS_URL) || DEFAULT_URL;
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
    return new Response(text || '{"questions":[]}', {
      status: upstream.status,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch {
    // Never block the form if the AI step is down — return no questions.
    return new Response('{"questions":[]}', {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }
}
