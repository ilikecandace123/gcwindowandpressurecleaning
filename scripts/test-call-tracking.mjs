// Google Ads website-call conversion (forwarding-number swap) regression test.
//
// Problem (Sept 2026): the Google Ads phone conversion "Call ((07) 5651 2386)"
// recorded zero calls for 45+ days while the site-side tel: click event kept
// firing. Google's tag swaps the number by editing the DOM once; this app is
// mounted with createRoot(), which discards the pre-rendered markup — and any
// number Google has already swapped into it — and re-renders the phone number
// on every route change. The fix in index.html takes the number through
// gtag's phone_conversion_callback instead and re-applies it to every text
// node and tel: link React creates, via a MutationObserver.
//
// Runs the built site in headless Chromium with gtag.js stubbed (no network),
// drives the callback the way Google does — swap, refresh with a new number,
// revert to the real number — and checks the DOM after client-side navigation
// and after the root is wiped. Skips (never fails) when dist/ is missing or a
// browser cannot launch. Static checks on the source run always.

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

const REAL = "(07) 5651 2386";
const REAL_TEL = "tel:0756512386";
const LABEL = "AW-18190004003/UMSTCJDpjNYcEKPe1eFD";

// ── Static: the source has the fix ──────────────────────────────────────────
console.log("Call tracking (source):");
{
  const html = read("index.html");
  ok("gtag config for the call conversion still carries the real number", new RegExp(`'${LABEL.replace("/", "\\/")}',\\s*\\{\\s*'phone_conversion_number':\\s*'\\(07\\) 5651 2386'`).test(html));
  ok("gtag config registers phone_conversion_callback (no one-shot auto-replace)", /'phone_conversion_callback':\s*function \(formattedNumber, mobileNumber\)/.test(html));
  ok("callback hands the number to the site-side replacer", /window\.__gcwpCallTracking\.setNumber\(formattedNumber, mobileNumber\)/.test(html));
  ok("replacer is defined before the gtag snippet", html.indexOf("window.__gcwpCallTracking = {") < html.indexOf("gtag/js?id=AW-18190004003"));
  ok("replacer watches the whole document for React re-renders", /new MutationObserver\([\s\S]*observer\.observe\(document\.documentElement, \{ childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: \['href'\] \}\)/.test(html));
  ok("replacer never edits script/style text", /var SKIP = \{ SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, TITLE: 1 \}/.test(html));
  ok("tel: click conversion pixel still fires on any tel: link", /closest\('a\[href\^="tel:"\]'\)/.test(html));
  const schema = read("src/data/schema.js");
  ok("real number in the replacer matches BUSINESS_PHONE", schema.includes(`BUSINESS_PHONE = "${REAL}"`) && html.includes(`var REAL_DISPLAY = '${REAL}';`));
  const layout = read("src/Layout.jsx");
  ok("header and footer still render the real number (default state)", (layout.match(/\(07\) 5651 2386/g) || []).length >= 2 && layout.includes(`href="${REAL_TEL}"`));
}

// ── Browser: the swap survives React ────────────────────────────────────────
console.log("\nCall tracking (headless Chromium, gtag stubbed):");
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
      const type = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon" }[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": type });
      fs.createReadStream(file).pipe(res);
    });
    await new Promise((r) => server.listen(0, "127.0.0.1", r));
    const port = server.address().port;
    const origin = `http://127.0.0.1:${port}`;

    // Stand-in for gtag.js: finds the phone_conversion_callback the page
    // registered and lets the test invoke it the way Google's loader does —
    // (formatted display number, dial number) on swap and refresh, and
    // (real number, undefined) when the 3-hour window ends.
    const GTAG_STUB = `window.__gtagStub = {
      fire(display, tel) {
        const cfg = (window.dataLayer || []).find((a) => a && a[0] === 'config' && a[2] && typeof a[2].phone_conversion_callback === 'function');
        if (!cfg) throw new Error('no phone_conversion_callback in dataLayer');
        cfg[2].phone_conversion_callback(display, tel);
        return cfg[1];
      }
    };`;

    let browser = null;
    try {
      browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    } catch (err) {
      skipped("browser checks", `Chromium could not launch: ${err.message.split("\n")[0]}`);
    }
    if (browser) {
      try {
        const page = await browser.newPage();
        await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
        await page.setRequestInterception(true);
        page.on("request", (req) => {
          const u = req.url();
          if (u.startsWith("https://www.googletagmanager.com/gtag/js")) return req.respond({ status: 200, contentType: "text/javascript", body: GTAG_STUB });
          if (u.startsWith(origin)) return req.continue();
          return req.respond({ status: 204, body: "" }); // GTM, fonts, pixels: offline
        });

        // What the page looks like, from the point of view of a caller.
        const inspect = () => page.evaluate(() => {
          const SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TITLE: 1 };
          const texts = [];
          const it = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          for (let n = it.nextNode(); n; n = it.nextNode()) if (!SKIP[n.parentNode.nodeName]) texts.push(n.data);
          const count = (re) => texts.filter((t) => re.test(t)).length;
          const hrefs = [...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute("href"));
          const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent).join("");
          return {
            real: count(/5651\s?2386/),
            fwd1: count(/5999\s?1234/),
            fwd2: count(/5888\s?0000/),
            hrefs: [...new Set(hrefs)],
            telCount: hrefs.length,
            path: location.pathname,
            ldHasReal: ld.includes("5651 2386"),
            applied: window.google_wcc_applied || null,
          };
        });

        await page.goto(`${origin}/?gclid=TEST_GCLID_CT`, { waitUntil: "networkidle0", timeout: 60000 });
        await page.waitForSelector('#root a[href^="tel:"]', { timeout: 30000 });
        const before = await inspect();
        ok("page renders the real number before Google calls back", before.real >= 2 && before.hrefs.length === 1 && before.hrefs[0] === REAL_TEL);
        ok("JSON-LD carries the real number", before.ldHasReal);

        // 1. Google swaps the number after React has mounted.
        const label = await page.evaluate(() => window.__gtagStub.fire("(07) 5999 1234", "+61759991234"));
        eq("callback registered on the call-conversion label", label, LABEL);
        let s = await inspect();
        eq("no visible text still shows the real number", s.real, 0);
        ok("header and footer show the forwarding number", s.fwd1 >= 2);
        eq("every tel: link dials the forwarding number", s.hrefs, ["tel:+61759991234"]);
        ok("JSON-LD untouched by the swap", s.ldHasReal);
        eq("status flag records the applied number", s.applied, "(07) 5999 1234");

        // 2. Client-side navigation mounts fresh components with the real number.
        await page.evaluate(() => {
          const a = [...document.querySelectorAll('a[href]')].find((l) => /^\/window-cleaning\/?$/.test(l.getAttribute("href")));
          if (!a) throw new Error("no /window-cleaning/ link on the page");
          a.click();
        });
        await page.waitForFunction(() => location.pathname.startsWith("/window-cleaning"), { timeout: 15000 });
        await page.waitForSelector("main h1", { timeout: 15000 });
        await new Promise((r) => setTimeout(r, 300));
        s = await inspect();
        ok("navigated client-side", s.path.startsWith("/window-cleaning"));
        eq("new page: no visible text shows the real number", s.real, 0);
        ok("new page: forwarding number rendered", s.fwd1 >= 2);
        eq("new page: every tel: link dials the forwarding number", s.hrefs, ["tel:+61759991234"]);

        // 3. The root is wiped and re-rendered with the real number (what createRoot does).
        await page.evaluate(() => {
          const d = document.createElement("div");
          d.id = "wipe-test";
          d.innerHTML = '<a href="tel:0756512386">Call (07) 5651 2386</a><p>Ring us on 07 5651 2386 today</p><a href="tel:0400000000">other</a>';
          document.getElementById("root").appendChild(d);
        });
        await new Promise((r) => setTimeout(r, 100));
        const wiped = await page.evaluate(() => {
          const d = document.getElementById("wipe-test");
          return { link: d.querySelector("a").getAttribute("href"), linkText: d.querySelector("a").textContent, p: d.querySelector("p").textContent, other: d.querySelectorAll("a")[1].getAttribute("href") };
        });
        eq("freshly inserted tel: link re-swapped by the observer", wiped.link, "tel:+61759991234");
        eq("freshly inserted link text re-swapped", wiped.linkText, "Call (07) 5999 1234");
        eq("unbracketed number format re-swapped", wiped.p, "Ring us on (07) 5999 1234 today");
        eq("a different phone number is left alone", wiped.other, "tel:0400000000");

        // 4. Google's periodic refresh hands out a different number.
        await page.evaluate(() => window.__gtagStub.fire("(07) 5888 0000", "+61758880000"));
        s = await inspect();
        eq("refresh: old forwarding number gone", [s.real, s.fwd1], [0, 0]);
        ok("refresh: new forwarding number shown", s.fwd2 >= 3);
        eq("refresh: tel: links follow (other number untouched)", s.hrefs.sort(), ["tel:+61758880000", "tel:0400000000"]);

        // 5. After 3 hours Google sends the real number back.
        await page.evaluate(() => window.__gtagStub.fire("(07) 5651 2386", undefined));
        s = await inspect();
        eq("revert: no forwarding number left in text", [s.fwd1, s.fwd2], [0, 0]);
        ok("revert: real number shown again", s.real >= 3);
        eq("revert: tel: links restored to their originals", s.hrefs.sort(), ["tel:0400000000", REAL_TEL]);
        eq("revert: status flag", s.applied, "reverted");

        // 6. Nothing is re-applied once reverted: new content keeps the real number.
        await page.evaluate(() => {
          const p = document.createElement("p");
          p.id = "after-revert";
          p.textContent = "Call (07) 5651 2386";
          document.getElementById("root").appendChild(p);
        });
        await new Promise((r) => setTimeout(r, 100));
        eq("after revert, new nodes are not rewritten", await page.evaluate(() => document.getElementById("after-revert").textContent), "Call (07) 5651 2386");
      } finally {
        await browser.close();
      }
    }
    server.close();
  }
}

console.log(`\n${pass} passed, ${fail} failed, ${skip} skipped`);
process.exit(fail ? 1 : 0);
