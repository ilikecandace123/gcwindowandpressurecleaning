// Cloudflare Pages Function — proxies uploaded photos to the n8n
// "attach photos to ServiceM8 job" webhook server-side. Same-origin so the
// browser avoids CORS and the n8n URL stays out of the client bundle.
//
// Route: /api/booking-photos   Body: { leadId, photos: [{ name, dataUrl }] }

const DEFAULT_URL = "https://skagen.app.n8n.cloud/webhook/gc-attach-photos";

export async function onRequestPost(context) {
  const { request, env } = context;
  const target = (env && env.N8N_PHOTOS_URL) || DEFAULT_URL;
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
    return new Response(text || '{"ok":true}', {
      status: upstream.status,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch {
    return new Response('{"ok":false,"error":"upstream_unreachable"}', {
      status: 502,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }
}
