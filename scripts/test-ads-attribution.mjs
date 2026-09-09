// Google Ads click attribution — src/lib/adsAttribution.js and its wiring.
//
//   1. Unit tests against a fake window/document/localStorage: capture rules
//      (last click wins, UTM-only keeps the click ID), 90-day expiry, cookie
//      fallback, and the never-throw guarantee.
//   2. Static checks: boot calls capture, the wizard's payload spreads the
//      fields, the /api/booking-submit proxy forwards the body untouched.
//   3. Headless Chromium: land with ?gclid=…, navigate in-app, confirm
//      storage, submit the "leave your details" form on two pages and read
//      the exact POST bodies (the proxy is intercepted — no real lead is sent).
//      Skips when dist/ or a browser is unavailable. Set ATTR_BODIES=<file>
//      to write the captured bodies as JSON.
//
// Run: node scripts/test-ads-attribution.mjs

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIST = path.join(ROOT, "dist");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

let pass = 0;
let fail = 0;
let skip = 0;
function eq(name, actual, expected) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.error(`  ✗ ${name}\n      expected: ${JSON.stringify(expected)}\n      actual:   ${JSON.stringify(actual)}`);
  }
}
const ok = (name, cond) => eq(name, Boolean(cond), true);
const skipped = (name, why) => {
  skip++;
  console.log(`  ⚠ ${name} — skipped (${why})`);
};

// ── Fake browser ────────────────────────────────────────────────────────────
function fakeBrowser({ search = "", pathname = "/", origin = "https://gcwindowandpressurecleaning.com.au", storageThrows = false } = {}) {
  const store = new Map();
  const jar = {};
  globalThis.window = {
    location: { search, pathname, origin },
    localStorage: {
      getItem: (k) => {
        if (storageThrows) throw new Error("SecurityError");
        return store.has(k) ? store.get(k) : null;
      },
      setItem: (k, v) => {
        if (storageThrows) throw new Error("QuotaExceededError");
        store.set(k, String(v));
      },
      removeItem: (k) => store.delete(k),
    },
  };
  globalThis.document = {
    get cookie() {
      return Object.entries(jar).map(([k, v]) => `${k}=${v}`).join("; ");
    },
    set cookie(str) {
      const [pair, ...attrs] = str.split(";").map((s) => s.trim());
      const [k, ...rest] = pair.split("=");
      jar[k] = rest.join("=");
      jar.__lastAttrs = attrs.join("; ");
    },
  };
  return { store, jar };
}

const mod = await import("../src/lib/adsAttribution.js");
const { captureAdsAttribution, getAdsAttribution, adsAttributionFields } = mod;

console.log("Unit — capture and read:");
{
  const { store, jar } = fakeBrowser({ search: "?gclid=TESTCLICK123&utm_source=google&utm_medium=cpc&utm_campaign=test", pathname: "/window-cleaning/" });
  const a = captureAdsAttribution();
  eq("gclid captured", a.gclid, "TESTCLICK123");
  eq("utm captured", [a.utm_source, a.utm_medium, a.utm_campaign], ["google", "cpc", "test"]);
  eq("landing_page is origin + pathname (no query)", a.landing_page, "https://gcwindowandpressurecleaning.com.au/window-cleaning/");
  ok("click_ts is an ISO timestamp", /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(a.click_ts));
  ok("expires ≈ 90 days out", Math.abs(a.expires - (Date.now() + 90 * 864e5)) < 5000);
  ok("stored in localStorage under gcwp_ads_attr", JSON.parse(store.get("gcwp_ads_attr")).gclid === "TESTCLICK123");
  ok("stored in the _gcwp_attr cookie, URL-encoded JSON", JSON.parse(decodeURIComponent(jar._gcwp_attr)).gclid === "TESTCLICK123");
  ok("cookie attributes: 90-day max-age, path=/, SameSite=Lax, Secure", /max-age=7776000/.test(jar.__lastAttrs) && /path=\//.test(jar.__lastAttrs) && /SameSite=Lax/.test(jar.__lastAttrs) && /Secure/.test(jar.__lastAttrs));
  eq("getAdsAttribution returns it", getAdsAttribution().gclid, "TESTCLICK123");
  const f = adsAttributionFields();
  eq("payload fields: every key present", Object.keys(f).sort(), ["click_ts", "gbraid", "gclid", "landing_page", "utm_campaign", "utm_medium", "utm_source", "wbraid"]);
  eq("payload fields: absent IDs are empty strings, not undefined", [f.gbraid, f.wbraid], ["", ""]);

  // No params on a later page: nothing changes.
  window.location.search = "";
  window.location.pathname = "/instant-quote/";
  captureAdsAttribution();
  eq("a param-less page keeps the stored click", getAdsAttribution().gclid, "TESTCLICK123");
  eq("landing page stays the first page", getAdsAttribution().landing_page, "https://gcwindowandpressurecleaning.com.au/window-cleaning/");

  // Last click wins, including an iOS-style wbraid with no gclid.
  window.location.search = "?wbraid=WB999";
  const b = captureAdsAttribution();
  eq("new click ID overwrites the old one", [b.gclid, b.wbraid], ["", "WB999"]);
  eq("old utm tags do not leak into the new click", b.utm_source, "");

  // UTM-only visit keeps the existing click ID.
  window.location.search = "?utm_source=newsletter&utm_medium=email&utm_campaign=spring";
  const c = captureAdsAttribution();
  eq("utm-only visit keeps the click ID", c.wbraid, "WB999");
  eq("utm-only visit records the new tags", [c.utm_source, c.utm_medium, c.utm_campaign], ["newsletter", "email", "spring"]);
  eq("utm-only visit keeps the original click_ts", c.click_ts, b.click_ts);
}

console.log("\nUnit — expiry, fallback, resilience:");
{
  const { store } = fakeBrowser();
  store.set("gcwp_ads_attr", JSON.stringify({ gclid: "OLD", expires: Date.now() - 1000 }));
  eq("expired record → {}", getAdsAttribution(), {});
  eq("expired record → empty payload fields", adsAttributionFields().gclid, "");

  const { jar } = fakeBrowser();
  jar._gcwp_attr = encodeURIComponent(JSON.stringify({ gclid: "FROMCOOKIE", click_ts: "2026-09-01T00:00:00.000Z", expires: Date.now() + 1e6 }));
  eq("cookie is used when localStorage is empty", getAdsAttribution().gclid, "FROMCOOKIE");

  const { store: s2 } = fakeBrowser();
  s2.set("gcwp_ads_attr", "{not json");
  eq("corrupt localStorage → {} not a throw", getAdsAttribution(), {});

  fakeBrowser({ search: "?gclid=X", storageThrows: true });
  let threw = false;
  let r;
  try {
    r = captureAdsAttribution();
  } catch {
    threw = true;
  }
  ok("capture never throws when storage throws (Safari private mode)", !threw && r.gclid === "X");
  eq("read falls back to the cookie when storage throws", getAdsAttribution().gclid, "X");

  delete globalThis.window;
  delete globalThis.document;
  eq("no window (SSR/prerender) → {}", [captureAdsAttribution(), getAdsAttribution()], [{}, {}]);
}

// ── Static wiring ───────────────────────────────────────────────────────────
console.log("\nWiring:");
{
  const main = read("src/main.jsx");
  ok("main.jsx imports captureAdsAttribution", /import \{ captureAdsAttribution \} from '\.\/lib\/adsAttribution\.js'/.test(main));
  ok("main.jsx calls it before render", main.indexOf("captureAdsAttribution()") < main.indexOf("createRoot"));
  const wiz = read("src/quote/QuoteWizard.jsx");
  ok("wizard imports adsAttributionFields", /import \{ adsAttributionFields \} from "\.\.\/lib\/adsAttribution\.js"/.test(wiz));
  ok("buildPayload spreads the attribution fields after source", /source: "instant-quote",[\s\S]{0,300}\.\.\.adsAttributionFields\(\),\s*\};/.test(wiz));
  eq("every lead POST goes through buildPayload (one spread point)", (wiz.match(/fetch\(SUBMIT_URL/g) || []).length, (wiz.match(/JSON\.stringify\((payload|buildPayload\(\{\}\))\)/g) || []).length);
  ok("existing payload field names untouched", ["firstName", "lastName", "name:", "email:", "phone:", "address:", "description:", "photoCount", "qa,", "leadId:", 'source: "instant-quote"'].every((k) => wiz.includes(k)));
  ok("conversion pixel wiring untouched", wiz.includes('import { fireAdsConversion } from "../lib/adsConversion"') && wiz.includes("fireConversionOnce()"));
  const proxy = read("functions/api/booking-submit.js");
  ok("proxy forwards the raw body text unchanged", /bodyText = \(await request\.text\(\)\)/.test(proxy) && /body: bodyText,/.test(proxy) && !/JSON\.parse|delete |pick|allowed/i.test(proxy));
}

// Proxy behaviour, in-process: whatever the browser sends reaches n8n byte-for-byte.
console.log("\nProxy pass-through:");
{
  const { onRequestPost } = await import("../functions/api/booking-submit.js");
  const body = JSON.stringify({ name: "TEST", gclid: "TESTCLICK123", click_ts: "2026-09-09T00:00:00.000Z", landing_page: "https://x/", utm_source: "google" });
  let seen = null;
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    seen = { url, body: init.body };
    return new Response(JSON.stringify({ ok: true, leadId: "L1" }), { status: 200 });
  };
  try {
    const res = await onRequestPost({ request: new Request("https://gcwindowandpressurecleaning.com.au/api/booking-submit", { method: "POST", body }), env: { N8N_SUBMIT_URL: "https://example.invalid/hook" } });
    eq("proxy posts the exact body upstream", seen.body, body);
    eq("proxy targets the configured webhook", seen.url, "https://example.invalid/hook");
    eq("proxy relays the upstream response", (await res.json()).leadId, "L1");
  } finally {
    globalThis.fetch = realFetch;
  }
}

// ── Headless Chromium end-to-end ────────────────────────────────────────────
console.log("\nBrowser (headless Chromium):");
const built = fs.existsSync(path.join(DIST, "index.html")) && fs.existsSync(path.join(DIST, "assets"));
if (!built) {
  skipped("browser checks", "run `npm run build:meta-only` first");
} else {
  let puppeteer = null;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    skipped("browser checks", "puppeteer not installed");
  }
  if (puppeteer) {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, "http://x");
      let file = path.join(DIST, decodeURIComponent(url.pathname));
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
      if (!fs.existsSync(file)) file = path.join(DIST, "index.html");
      const ext = path.extname(file);
      const type = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png" }[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": type });
      fs.createReadStream(file).pipe(res);
    });
    await new Promise((r) => server.listen(0, "127.0.0.1", r));
    const base = `http://127.0.0.1:${server.address().port}`;
    let browser = null;
    try {
      browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    } catch (err) {
      skipped("browser checks", `Chromium could not launch: ${err.message.split("\n")[0]}`);
    }
    if (browser) {
      const bodies = {};
      try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 900 });
        // Intercept the lead proxy so no real lead is created; capture the body.
        await page.setRequestInterception(true);
        page.on("request", (req) => {
          const u = new URL(req.url());
          if (u.pathname === "/api/booking-submit" && req.method() === "POST") {
            bodies[bodies.__next || "first"] = JSON.parse(req.postData() || "{}");
            req.respond({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, leadId: "TEST-LEAD" }) });
          } else if (u.pathname.startsWith("/api/") || !u.host.startsWith("127.0.0.1")) {
            req.respond({ status: 204, body: "" });
          } else {
            req.continue();
          }
        });

        // 1. Land from an ad.
        await page.goto(`${base}/?gclid=TESTCLICK123&utm_source=google&utm_medium=cpc&utm_campaign=test`, { waitUntil: "networkidle0", timeout: 60000 });
        // 2. Navigate in-app (no query string on the next page).
        await page.waitForSelector('a[href="/instant-quote/"]', { timeout: 30000 });
        await page.click('a[href="/instant-quote/"]');
        await page.waitForFunction(() => location.pathname === "/instant-quote/", { timeout: 30000 });
        const stored = await page.evaluate(() => ({
          search: location.search,
          ls: JSON.parse(localStorage.getItem("gcwp_ads_attr") || "null"),
          cookie: document.cookie,
        }));
        eq("URL no longer carries the click ID after in-app navigation", stored.search, "");
        eq("localStorage.gcwp_ads_attr holds the gclid", stored.ls && stored.ls.gclid, "TESTCLICK123");
        ok("localStorage record has click_ts and landing_page", stored.ls && stored.ls.click_ts && stored.ls.landing_page === `${base}/`);
        // http://127.0.0.1 is not a secure context, so the Secure cookie is
        // dropped by Chromium here; on the https site it is set. Assert only
        // when present.
        if (stored.cookie.includes("_gcwp_attr=")) ok("cookie _gcwp_attr holds the gclid", decodeURIComponent(stored.cookie).includes("TESTCLICK123"));
        else skipped("cookie check", "Secure cookie not settable over http://127.0.0.1 — verified in the unit tests and on the https site");

        // 3. Skip-form ("leave your details") on /instant-quote/?mode=details.
        await page.goto(`${base}/instant-quote/?mode=details`, { waitUntil: "networkidle0", timeout: 60000 });
        await page.waitForSelector('input[autocomplete="given-name"]', { timeout: 30000 });
        bodies.__next = "skipForm";
        await page.type('input[autocomplete="given-name"]', "TEST — IGNORE");
        await page.type('input[autocomplete="family-name"]', "Attribution");
        await page.type('input[autocomplete="tel"]', "0400000000");
        await page.type('input[autocomplete="email"]', "test-ignore@example.com");
        await page.click('form button[type="submit"]');
        await page.waitForFunction(() => /thank|we.ll be in touch|sent/i.test(document.body.innerText), { timeout: 30000 }).catch(() => {});
        const b1 = bodies.skipForm;
        ok("skip-form POSTed to /api/booking-submit", Boolean(b1));
        eq("skip-form body carries the gclid", b1 && b1.gclid, "TESTCLICK123");
        eq("skip-form body carries the utm fields", b1 && [b1.utm_source, b1.utm_medium, b1.utm_campaign], ["google", "cpc", "test"]);
        ok("skip-form body carries click_ts and landing_page", b1 && b1.click_ts && b1.landing_page === `${base}/`);
        ok("skip-form body still has the original fields", b1 && ["firstName", "lastName", "name", "email", "phone", "address", "description", "photoCount", "qa", "leadId", "source"].every((k) => k in b1));
        eq("skip-form name as typed", b1 && b1.firstName, "TEST — IGNORE");

        // 4. The "Put in your details" form reached from the homepage CTA.
        await page.goto(`${base}/`, { waitUntil: "networkidle0", timeout: 60000 });
        const cta = await page.evaluateHandle(() => [...document.querySelectorAll("button")].find((b) => /Leave my details/.test(b.textContent)) || null);
        if (!(await cta.jsonValue())) {
          skipped("homepage details form", "CTA button not found");
        } else {
          await cta.asElement().click();
          await page.waitForSelector('input[autocomplete="given-name"]', { timeout: 30000 });
          bodies.__next = "homepageForm";
          await page.type('input[autocomplete="given-name"]', "TEST — IGNORE");
          await page.type('input[autocomplete="family-name"]', "Homepage");
          await page.type('input[autocomplete="tel"]', "0400000000");
          await page.type('input[autocomplete="email"]', "test-ignore@example.com");
          await page.click('form button[type="submit"]');
          await page.waitForFunction(() => /thank|we.ll be in touch|sent/i.test(document.body.innerText), { timeout: 30000 }).catch(() => {});
          const b2 = bodies.homepageForm;
          ok("homepage form POSTed to /api/booking-submit", Boolean(b2));
          eq("homepage form body carries the gclid", b2 && b2.gclid, "TESTCLICK123");
          ok("homepage form body carries click_ts, landing_page and utm", b2 && b2.click_ts && b2.landing_page && b2.utm_source === "google");
        }
        delete bodies.__next;
        if (process.env.ATTR_BODIES) fs.writeFileSync(process.env.ATTR_BODIES, JSON.stringify(bodies, null, 2));
      } finally {
        await browser.close();
      }
    }
    server.close();
  }
}

console.log(`\n${pass} passed, ${fail} failed, ${skip} skipped`);
process.exit(fail ? 1 : 0);
