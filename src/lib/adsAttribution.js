// Google Ads click attribution, first-party.
//
// When a visitor lands from an ad, the URL carries a click identifier
// (gclid, or gbraid / wbraid on iOS where the gclid is withheld) and usually
// utm_* tags. Those live only on the landing URL; by the time the visitor
// fills in a form three pages later they are gone. This module captures them
// once on boot and hands them back when a lead payload is built, so every lead
// can be matched to the ad click that produced it.
//
// Storage: localStorage (primary) and a first-party cookie (fallback, and it
// survives some storage-clearing that localStorage does not). 90-day life,
// matching the Google Ads click-attribution window. Last click wins.
//
// Everything is wrapped in try/catch: Safari private mode throws on
// localStorage writes, and a lead must never fail because attribution did.

const STORAGE_KEY = "gcwp_ads_attr";
const COOKIE_NAME = "_gcwp_attr";
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days
const COOKIE_MAX_AGE = 7776000; // 90 days, seconds

const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid"];
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"];
const ALL_KEYS = [...CLICK_ID_KEYS, "gclsrc", ...UTM_KEYS];

function now() {
  return Date.now();
}

function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* unavailable or corrupt */
  }
  return null;
}

function readCookie() {
  try {
    const parts = (document.cookie || "").split(";");
    for (const part of parts) {
      const [k, ...rest] = part.trim().split("=");
      if (k === COOKIE_NAME) return JSON.parse(decodeURIComponent(rest.join("=")));
    }
  } catch {
    /* unavailable or corrupt */
  }
  return null;
}

function writeStorage(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* Safari private mode, quota, disabled storage */
  }
  try {
    document.cookie =
      `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(data))}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax; Secure`;
  } catch {
    /* cookies disabled */
  }
}

function isLive(data) {
  return Boolean(data && typeof data === "object" && typeof data.expires === "number" && data.expires > now());
}

/** Parse the current URL for click IDs and UTM tags. Empty strings when absent. */
function readUrlParams() {
  const out = {};
  try {
    const params = new URLSearchParams(window.location.search || "");
    for (const key of ALL_KEYS) out[key] = (params.get(key) || "").trim();
  } catch {
    for (const key of ALL_KEYS) out[key] = "";
  }
  return out;
}

/**
 * Call once on app boot. Reads click IDs / UTM tags from the URL and stores
 * them for 90 days. A new click ID overwrites an old one (last click wins);
 * UTM tags on their own are stored alongside whatever click ID is already
 * held. Never throws. Returns what is now stored ({} when nothing).
 */
export function captureAdsAttribution() {
  try {
    if (typeof window === "undefined" || !window.location) return {};
    const url = readUrlParams();
    const hasClickId = CLICK_ID_KEYS.some((k) => url[k]);
    const hasUtm = UTM_KEYS.some((k) => url[k]);
    if (!hasClickId && !hasUtm) return getAdsAttribution();

    const existing = getAdsAttribution();
    const landing = `${window.location.origin}${window.location.pathname}`;
    const stamp = new Date().toISOString();
    let next;

    if (hasClickId) {
      // Last click wins: everything comes from this URL.
      next = {
        gclid: url.gclid,
        gbraid: url.gbraid,
        wbraid: url.wbraid,
        gclsrc: url.gclsrc,
        utm_source: url.utm_source,
        utm_medium: url.utm_medium,
        utm_campaign: url.utm_campaign,
        click_ts: stamp,
        landing_page: landing,
        expires: now() + TTL_MS,
      };
    } else {
      // UTM-only visit: record the tags, keep the click ID already held.
      next = {
        gclid: existing.gclid || "",
        gbraid: existing.gbraid || "",
        wbraid: existing.wbraid || "",
        gclsrc: existing.gclsrc || "",
        utm_source: url.utm_source,
        utm_medium: url.utm_medium,
        utm_campaign: url.utm_campaign,
        click_ts: existing.click_ts || stamp,
        landing_page: existing.landing_page || landing,
        expires: now() + TTL_MS,
      };
    }
    writeStorage(next);
    return next;
  } catch {
    return {};
  }
}

/**
 * The stored attribution, or {} when nothing is stored or it has expired.
 * localStorage first, cookie as fallback. Never throws.
 */
export function getAdsAttribution() {
  try {
    if (typeof window === "undefined") return {};
    const fromStorage = readStorage();
    if (isLive(fromStorage)) return fromStorage;
    const fromCookie = readCookie();
    if (isLive(fromCookie)) return fromCookie;
    return {};
  } catch {
    return {};
  }
}

/**
 * The attribution fields a lead payload carries, every key present, empty
 * string when unknown — the webhook treats missing and empty alike.
 */
export function adsAttributionFields() {
  const a = getAdsAttribution();
  return {
    gclid: a.gclid || "",
    gbraid: a.gbraid || "",
    wbraid: a.wbraid || "",
    click_ts: a.click_ts || "",
    landing_page: a.landing_page || "",
    utm_source: a.utm_source || "",
    utm_medium: a.utm_medium || "",
    utm_campaign: a.utm_campaign || "",
  };
}

export const ADS_ATTRIBUTION_STORAGE_KEY = STORAGE_KEY;
export const ADS_ATTRIBUTION_COOKIE = COOKIE_NAME;
