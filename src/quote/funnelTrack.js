// First-party funnel tracking for the quote wizard. Events queue up and are
// flushed as a single beacon per milestone / page-leave, so we keep n8n
// execution counts low while still surviving tab closes. No cookies, no
// third-party scripts — a session lasts one page load.
//
// Flow: trackQuote() → queue → flushQuoteTrack() → POST /api/quote-analytics
// (Cloudflare Pages function) → n8n webhook → "Quote Funnel Events" data
// table → daily 8am drop-off report email.
const TRACK_URL = "/api/quote-analytics";

let sid = "";
let queue = [];
const seen = new Set();

function sessionId() {
  if (!sid) {
    try {
      sid = crypto.randomUUID();
    } catch {
      sid = Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    }
  }
  return sid;
}

// Record a funnel event. Each unique event+phase+step combination is only
// recorded once per page load, so revisiting a step (back button) doesn't
// inflate the numbers.
export function trackQuote(evt) {
  try {
    const key = evt.event + "|" + evt.phase + "|" + (evt.stepId || "");
    if (seen.has(key)) return;
    seen.add(key);
    queue.push({ ...evt, t: Date.now() });
  } catch {
    /* tracking must never break the wizard */
  }
}

// Send everything queued so far. sendBeacon survives page unloads; the
// keepalive fetch is the fallback. Payloads are tiny JSON — nowhere near the
// 64KB keepalive cap (unlike photos, which must never use keepalive).
export function flushQuoteTrack() {
  if (!queue.length) return;
  const payload = JSON.stringify({
    sessionId: sessionId(),
    page: window.location.pathname,
    events: queue.splice(0),
  });
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      if (navigator.sendBeacon(TRACK_URL, blob)) return;
    }
  } catch {
    /* fall through to fetch */
  }
  try {
    fetch(TRACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* never surface tracking errors */
  }
}

// Flush whatever we have when the visitor leaves — this is what captures the
// drop-off point. Guarded for SSR/prerender where window doesn't exist.
if (typeof window !== "undefined") {
  window.addEventListener("pagehide", flushQuoteTrack);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushQuoteTrack();
  });
}
