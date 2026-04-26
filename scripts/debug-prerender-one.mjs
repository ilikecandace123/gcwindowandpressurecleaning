// Debug helper — render ONE page with full error logging.
// Run with:  node scripts/debug-prerender-one.mjs
//
// This boots the same static server + puppeteer setup as
// prerender-content.mjs, but visits a single route and prints
// every console message, network failure, and page error so we
// can see exactly why the prerender is timing out.

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");
const PORT = 4174; // different from real prerender to avoid collision
const ROUTE = process.argv[2] || "/window-cleaning/mermaid-beach/";

console.log(`Debug prerender on route: ${ROUTE}`);
console.log(`DIST: ${DIST}`);

// Static server (same logic as prerender-content.mjs)
const MIME = {
  ".html": "text/html", ".js": "application/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".avif": "image/avif", ".woff2": "font/woff2", ".woff": "font/woff",
};
const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  let filePath = path.join(DIST, urlPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const withIndex = path.join(filePath, "index.html");
    filePath = fs.existsSync(withIndex) ? withIndex : path.join(DIST, "index.html");
  }
  const ext = path.extname(filePath);
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
await new Promise(r => server.listen(PORT, "127.0.0.1", r));
console.log(`Static server up on http://127.0.0.1:${PORT}`);

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
});

const page = await browser.newPage();

// Log everything
page.on("console", msg => console.log(`[page console:${msg.type()}]`, msg.text()));
page.on("pageerror", err => console.log("[page error]", err.message));
page.on("requestfailed", req => console.log("[request failed]", req.url(), req.failure()?.errorText));
page.on("response", res => {
  if (res.status() >= 400) {
    console.log(`[response ${res.status()}]`, res.url());
  }
});

const url = `http://127.0.0.1:${PORT}${ROUTE}`;
console.log(`\nNavigating to ${url} ...`);
const start = Date.now();

try {
  await page.goto(url, { waitUntil: "networkidle0", timeout: 20000 });
  console.log(`✓ networkidle0 reached in ${Date.now() - start}ms`);
} catch (err) {
  console.log(`✗ goto failed after ${Date.now() - start}ms:`, err.message);
  // Capture in-flight requests
  const inflight = await page.evaluate(() => {
    return performance.getEntriesByType("resource")
      .map(r => ({ url: r.name, duration: r.duration, type: r.initiatorType }))
      .slice(-30);
  }).catch(e => `(could not collect: ${e.message})`);
  console.log("\nLast 30 resources fetched:");
  console.log(inflight);
}

const rootHtml = await page.evaluate(() => {
  const r = document.getElementById("root");
  return r ? `(root has ${r.innerHTML.length} chars of content)` : "(no #root element)";
}).catch(e => `(eval failed: ${e.message})`);
console.log("\nRoot status:", rootHtml);

await browser.close();
server.close();
console.log("Done.");
