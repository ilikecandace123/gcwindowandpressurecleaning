// Mobile navigation regression test.
//
// Bug (Sept 2026): the mobile menu rendered inside the sticky header in normal
// flow, so on a phone a menu taller than the screen made the header taller
// than the screen. Swiping inside the menu scrolled the document instead, the
// header bar slid away, and iOS painted hover tints on every link the finger
// crossed. The fix anchors the panel below the header bar, caps it to the
// viewport, gives it its own scroll and locks the page behind it.
//
// Runs the built site in headless Chromium with an iPhone viewport. Skips
// (never fails) when dist/ is missing or a browser cannot launch, so a clean
// checkout still passes `npm test`. Static checks on the source run always.

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

// ── Static: the source has the fix ──────────────────────────────────────────
console.log("Mobile menu (source):");
{
  const layout = read("src/Layout.jsx");
  ok("panel is positioned below the header bar, out of flow", /mobile-menu-panel lg:hidden absolute inset-x-0 top-full/.test(layout));
  ok("panel scrolls on its own and contains overscroll", /overflow-y-auto overscroll-contain/.test(layout));
  ok("page scroll is locked while the menu is open", /html\.style\.overflow = "hidden";\s*body\.style\.overflow = "hidden";/.test(layout));
  ok("lock is released on close", /html\.style\.overflow = prev\[0\];/.test(layout));
  const css = read("src/index.css");
  ok("panel height capped with a dvh rule and a vh fallback", /\.mobile-menu-panel \{[^}]*max-height: calc\(100vh - 4rem\);[^}]*max-height: calc\(100dvh - 4rem\);/.test(css));
  ok("hover styles only apply where hover exists (no touch tint)", /hoverOnlyWhenSupported: true/.test(read("tailwind.config.js")));
}

// ── Browser: behaviour on a phone viewport ──────────────────────────────────
console.log("\nMobile menu (headless iPhone):");
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
    let browser = null;
    try {
      browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    } catch (err) {
      skipped("browser checks", `Chromium could not launch: ${err.message.split("\n")[0]}`);
    }
    if (browser) {
      try {
        const page = await browser.newPage();
        await page.setViewport({ width: 390, height: 664, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
        await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle0", timeout: 60000 });
        await page.waitForSelector('button[aria-label="Open menu"]', { timeout: 30000 });
        await page.click('button[aria-label="Open menu"]');
        await page.waitForSelector(".mobile-menu-panel", { timeout: 10000 });

        const m = await page.evaluate(() => {
          const panel = document.querySelector(".mobile-menu-panel");
          const header = document.querySelector("header");
          const r = panel.getBoundingClientRect();
          const h = header.getBoundingClientRect();
          return {
            panelTop: Math.round(r.top),
            headerBottom: Math.round(h.bottom),
            panelBottom: Math.round(r.bottom),
            viewport: window.innerHeight,
            headerHeight: Math.round(h.height),
            scrollable: panel.scrollHeight > panel.clientHeight,
            overflowY: getComputedStyle(panel).overflowY,
            bodyOverflow: document.body.style.overflow,
            htmlOverflow: document.documentElement.style.overflow,
          };
        });
        if (process.env.MENU_SHOT) await page.screenshot({ path: process.env.MENU_SHOT });
        eq("panel starts exactly under the header bar", m.panelTop, m.headerBottom);
        ok("panel never extends past the viewport", m.panelBottom <= m.viewport + 1);
        ok("header bar stays its normal height (menu is out of flow)", m.headerHeight <= 80);
        ok("menu is taller than the space and scrolls itself", m.scrollable && m.overflowY === "auto");
        eq("page scroll locked while open", [m.htmlOverflow, m.bodyOverflow], ["hidden", "hidden"]);

        // Scroll inside the panel: the panel moves, the document does not.
        await page.evaluate(() => document.querySelector(".mobile-menu-panel").scrollBy(0, 400));
        await page.mouse.wheel({ deltaY: 400 });
        const after = await page.evaluate(() => ({
          panelScroll: document.querySelector(".mobile-menu-panel").scrollTop,
          pageScroll: window.scrollY,
          headerTop: Math.round(document.querySelector("header").getBoundingClientRect().top),
        }));
        ok("panel scrolled", after.panelScroll > 0);
        eq("document did not scroll", after.pageScroll, 0);
        eq("header bar still pinned to the top", after.headerTop, 0);

        // Closing releases the lock and the page scrolls again.
        await page.click('button[aria-label="Close menu"]');
        await page.waitForFunction(() => !document.querySelector(".mobile-menu-panel"));
        const closed = await page.evaluate(() => [document.documentElement.style.overflow, document.body.style.overflow]);
        eq("scroll lock released on close", closed, ["", ""]);
        await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" })); // html has scroll-behavior: smooth
        eq("page scrolls again after close", await page.evaluate(() => window.scrollY), 300);
      } finally {
        await browser.close();
      }
    }
    server.close();
  }
}

console.log(`\n${pass} passed, ${fail} failed, ${skip} skipped`);
process.exit(fail ? 1 : 0);
