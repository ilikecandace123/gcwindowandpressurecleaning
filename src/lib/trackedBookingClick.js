// Fires the Google Ads conversion event for AW-18190004003 / W96tCOG0v7QcEKPe1eFD
// before navigating to the ServiceM8 booking URL.
//
// Behaviour:
// - Modifier/middle clicks or target="_blank" links: fire conversion, let
//   the browser open the new tab (no preventDefault).
// - Plain left-click: preventDefault, fire conversion with event_callback,
//   navigate when the callback resolves. Hard 1200ms timeout fallback in
//   case gtag fails to call back.
//
// The AW-18190004003 gtag is loaded globally in site/index.html, so
// window.gtag is available on every page (after the snippet loads).
export function trackedBookingClick(e) {
  const anchor = e.currentTarget;
  const href = anchor.href;
  const opensInNewTab =
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.button === 1 ||
    anchor.target === "_blank";

  if (opensInNewTab) {
    // Don't block navigation — fire and forget.
    fireConversion();
    return;
  }

  e.preventDefault();
  let navigated = false;
  const go = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = href;
  };

  fireConversion(go);
  // Fallback: if gtag is missing, blocked, or event_callback never fires,
  // make sure the user still gets to the booking page.
  setTimeout(go, 1200);
}

function fireConversion(callback) {
  const w = typeof window !== "undefined" ? window : undefined;
  if (!w || typeof w.gtag !== "function") {
    if (callback) callback();
    return;
  }
  w.gtag("event", "conversion", {
    send_to: "AW-18190004003/W96tCOG0v7QcEKPe1eFD",
    value: 200,
    currency: "AUD",
    transport_type: "beacon",
    event_callback: callback,
  });
}
