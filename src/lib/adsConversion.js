// Reliable Google Ads conversion sender for AW-18190004003.
//
// WHY A PIXEL INSTEAD OF gtag(): on this site `gtag('event','conversion',{send_to})`
// is accepted into the dataLayer (its event_callback even runs) but NO network
// request is ever sent — the standalone gtag.js snippet and the GTM container
// (GTM-P4XCZCZZ) both claim AW-18190004003 and the conversion event is dropped
// with nothing firing. That is the cause of 90+ days of zero conversions.
//
// A direct request to the conversion endpoint is Google's documented no-script
// method (the <noscript> half of the event snippet) and reliably returns HTTP 200,
// attributed via the conversion-linker cookie that the on-page AW tag already sets.
//
// We fire the image pixel (guaranteed delivery) AND still call gtag (best-effort,
// so enhanced conversions / better attribution kick in if the gtag pipeline is ever
// repaired). Both target the same ONE_PER_CLICK action, so Google de-dupes to one.

const AW_ID = "18190004003";

// Labels verified against the live Google Ads event snippets (account 293-191-5101):
//   Get Quote Form Submit (Website)  ctId 7626283617  value $200
//   Phone Click (Website)            ctId 7659775083  value $120
export const ADS_LABELS = {
  formSubmit: { label: "W96tCOG0v7QcEKPe1eFD", value: 200, currency: "AUD" },
  phoneClick: { label: "TGp5COvIu8QcEKPe1eFD", value: 120, currency: "AUD" },
};

export function fireAdsConversion(key) {
  if (typeof window === "undefined") return;
  const cfg = ADS_LABELS[key];
  if (!cfg) return;
  const { label, value, currency } = cfg;

  // 1) Reliable delivery: conversion image pixel (Google's no-script method).
  try {
    const qs = new URLSearchParams({
      label,
      guid: "ON",
      script: "0",
      value: String(value),
      currency_code: currency,
      _r: String(Date.now()), // cache-buster so repeat actions still register
    });
    const img = new Image();
    img.src = `https://www.googleadservices.com/pagead/conversion/${AW_ID}/?${qs.toString()}`;
  } catch (e) {
    /* ignore */
  }

  // 2) Best-effort gtag (enhanced conversions if the pipeline is ever fixed).
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: `AW-${AW_ID}/${label}`,
        value,
        currency,
      });
    }
  } catch (e) {
    /* ignore */
  }
}
