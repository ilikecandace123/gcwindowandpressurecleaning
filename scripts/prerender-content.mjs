#!/usr/bin/env node
// ──────────────────────────────────────────────────────────────────────────────
// Content Pre-renderer (Phase 2)
// Runs AFTER the meta-only prerender.mjs which creates per-route index.html
// files with correct <title>, meta tags, and JSON-LD.
//
// This script:
//   1. Starts a lightweight static server on dist/
//   2. Launches headless Chromium via Puppeteer
//   3. Visits every pre-rendered route in parallel (pool of browser tabs)
//   4. Waits for React to hydrate and the page to settle
//   5. Captures the rendered innerHTML of <div id="root">
//   6. Injects that HTML into the static file so crawlers see real content
//   7. Adds a <noscript> fallback message
//
// Result: every page in dist/ has full visible HTML in the initial response,
// so AI crawlers (GPTBot, ClaudeBot, PerplexityBot) and search engine bots
// that don't execute JS can read the page content.
// ──────────────────────────────────────────────────────────────────────────────

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");

// ── Configuration ──────────────────────────────────────────────────────────
const PORT = 4173;           // Local dev server port (Vite preview default)
const CONCURRENCY = 6;       // Number of parallel browser tabs
const NAV_TIMEOUT = 15000;   // Per-page navigation timeout (ms)
const SETTLE_DELAY = 800;    // Wait for async state (reviews carousel, etc.)

// ── Static file server ─────────────────────────────────────────────────────
function startServer() {
  return new Promise((resolve) => {
    const MIME = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
      ".avif": "image/avif",
      ".woff2": "font/woff2",
      ".woff": "font/woff",
      ".ttf": "font/ttf",
    };

    const server = http.createServer((req, res) => {
      let urlPath = decodeURIComponent(req.url.split("?")[0]);

      // Try exact file first, then index.html for SPA routes
      let filePath = path.join(DIST, urlPath);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        const withIndex = path.join(filePath, "index.html");
        if (fs.existsSync(withIndex)) {
          filePath = withIndex;
        } else {
          // Fall back to root index.html (SPA fallback)
          filePath = path.join(DIST, "index.html");
        }
      }

      const ext = path.extname(filePath);
      const contentType = MIME[ext] || "application/octet-stream";

      try {
        const data = fs.readFileSync(filePath);
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    });

    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

// ── Discover all routes from dist/ directory structure ─────────────────────
function discoverRoutes() {
  const routes = [];

  function walk(dir, prefix) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), prefix + "/" + entry.name);
      } else if (entry.name === "index.html") {
        const route = prefix || "/";
        routes.push(route);
      }
    }
  }

  walk(DIST, "");
  return routes;
}

// ── Render a single route ──────────────────────────────────────────────────
async function renderRoute(page, route) {
  const url = `http://127.0.0.1:${PORT}${route}`;

  await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: NAV_TIMEOUT,
  });

  // Give React effects a moment to settle (carousel init, lazy images, etc.)
  await page.evaluate((ms) => new Promise((r) => setTimeout(r, ms)), SETTLE_DELAY);

  // Wait for #root to have content
  await page.waitForFunction(
    () => {
      const root = document.getElementById("root");
      return root && root.innerHTML.trim().length > 100;
    },
    { timeout: 5000 }
  ).catch(() => {
    // If content doesn't appear, we'll still capture whatever is there
  });

  // Capture the rendered HTML inside #root
  const rootHtml = await page.evaluate(() => {
    const root = document.getElementById("root");
    return root ? root.innerHTML : "";
  });

  return rootHtml;
}

// ── Inject rendered content into the static HTML file ──────────────────────
function injectContent(route, renderedHtml) {
  const dir = route === "/"
    ? DIST
    : path.join(DIST, route.replace(/^\/+/, ""));
  const filePath = path.join(dir, "index.html");

  if (!fs.existsSync(filePath)) return false;

  let html = fs.readFileSync(filePath, "utf8");

  // Replace empty <div id="root"></div> with rendered content
  // The rendered content goes inside the div; the React app will hydrate over it
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${renderedHtml}</div>`
  );

  // Also handle case where root might have whitespace
  html = html.replace(
    /<div id="root">\s*<\/div>/,
    `<div id="root">${renderedHtml}</div>`
  );

  fs.writeFileSync(filePath, html, "utf8");
  return true;
}

// ── Worker pool: process routes with N concurrent tabs ─────────────────────
async function processRoutes(browser, routes) {
  let completed = 0;
  let failed = 0;
  const total = routes.length;
  const queue = [...routes];

  // Progress logging
  const logProgress = () => {
    const pct = ((completed + failed) / total * 100).toFixed(1);
    process.stdout.write(
      `\r  Rendered: ${completed}/${total} (${pct}%) | Failed: ${failed}`
    );
  };

  async function worker(workerId) {
    const page = await browser.newPage();

    // Block images and fonts to speed up rendering — we only need the DOM
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const type = req.resourceType();
      if (["image", "font", "media"].includes(type)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // Suppress console noise from the rendered pages
    page.on("pageerror", () => {});
    page.on("console", () => {});

    // Set a desktop viewport
    await page.setViewport({ width: 1280, height: 800 });

    while (queue.length > 0) {
      const route = queue.shift();
      try {
        const html = await renderRoute(page, route);
        if (html && html.trim().length > 50) {
          injectContent(route, html);
          completed++;
        } else {
          // Rendered but empty — likely an error page or failed render
          failed++;
        }
      } catch (err) {
        failed++;
        if (failed <= 5) {
          console.error(`\n  [Worker ${workerId}] Failed: ${route} — ${err.message}`);
        }
      }
      logProgress();
    }

    await page.close();
  }

  // Launch worker pool
  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(worker(i));
  }
  await Promise.all(workers);

  console.log(""); // newline after progress
  return { completed, failed };
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log("Content pre-renderer starting...");
  console.log(`  dist: ${DIST}`);

  // 1. Discover routes
  const routes = discoverRoutes();
  console.log(`  Found ${routes.length} routes to render`);

  if (routes.length === 0) {
    console.log("  No routes found. Run 'vite build && node scripts/prerender.mjs' first.");
    process.exit(1);
  }

  // 2. Start static server
  console.log(`  Starting local server on port ${PORT}...`);
  const server = await startServer();

  // 3. Launch browser
  console.log(`  Launching headless browser (${CONCURRENCY} concurrent tabs)...`);
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-extensions",
      "--disable-background-networking",
      "--disable-default-apps",
      "--disable-sync",
      "--disable-translate",
      "--metrics-recording-only",
      "--mute-audio",
      "--no-first-run",
    ],
  });

  try {
    // 4. Render all routes
    console.log("  Rendering pages...");
    const startTime = Date.now();
    const { completed, failed } = await processRoutes(browser, routes);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log(`\nContent pre-rendering complete!`);
    console.log(`  ${completed} pages rendered successfully`);
    if (failed > 0) console.log(`  ${failed} pages failed (will use client-side rendering)`);
    console.log(`  Total time: ${elapsed}s (~${(elapsed / routes.length * 1000).toFixed(0)}ms/page)`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error("Content pre-renderer failed:", err);
  process.exit(1);
});
