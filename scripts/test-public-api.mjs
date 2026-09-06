// Tests for the public read-only REST API (functions/api/v1/[[route]].js),
// its OpenAPI document (src/publicApi/openapi.js), the /api directory and the
// JSON 404 behaviour in functions/_middleware.js, and the RFC 9727 catalog.
//
// Everything runs in-process against the Function handlers with Request /
// Response objects — no network, no Cloudflare. Run: node scripts/test-public-api.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { onRequest as api, PUBLIC_API_ENDPOINTS, MIRRORED_TOOLS } from "../functions/api/v1/[[route]].js";
import { onRequest as middleware } from "../functions/_middleware.js";
import { buildOpenApi } from "../src/publicApi/openapi.js";
import { TOOLS } from "../functions/mcp.js";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = "https://gcwindowandpressurecleaning.com.au";
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

// Minimal Pages Function context. ASSETS.fetch serves markdown mirrors from
// dist/ when it exists so get_page can be exercised without a network.
const DIST = path.join(ROOT, "dist");
const ctx = (request) => ({
  request,
  env: {
    ASSETS: {
      fetch: async (req) => {
        const u = new URL(req.url);
        const file = path.join(DIST, u.pathname);
        if (fs.existsSync(file) && fs.statSync(file).isFile()) {
          return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "Content-Type": "text/markdown" } });
        }
        return new Response("not found", { status: 404 });
      },
    },
  },
  next: async () => new Response("<!doctype html><title>404</title>", { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }),
});

const call = (method, pathname, { body, headers = {} } = {}) => {
  const init = { method, headers: new Headers(headers) };
  if (body !== undefined) init.body = typeof body === "string" ? body : JSON.stringify(body);
  return api(ctx(new Request(SITE + pathname, init)));
};
const asJson = async (res) => ({ status: res.status, ct: res.headers.get("Content-Type") || "", body: await res.json(), headers: res.headers });

// ── OpenAPI document ────────────────────────────────────────────────────────
console.log("OpenAPI document:");
const spec = buildOpenApi();
{
  eq("openapi version", spec.openapi, "3.1.0");
  ok("info.title, version, description present", spec.info.title && spec.info.version && spec.info.description);
  ok("servers points at /api/v1", spec.servers[0].url === `${SITE}/api/v1`);
  const ops = [];
  for (const [p, item] of Object.entries(spec.paths)) {
    for (const [m, op] of Object.entries(item)) ops.push({ path: p, method: m.toUpperCase(), op });
  }
  ok("at least six operations", ops.length >= 6);
  eq("every operation has a unique operationId", new Set(ops.map((o) => o.op.operationId)).size, ops.length);
  ok("every operation has a description and summary", ops.every((o) => o.op.description && o.op.summary));
  ok("every operation has a 200 response with a schema", ops.every((o) => o.op.responses[200]?.content?.["application/json"]?.schema));
  ok("every parameter is typed", ops.every((o) => (o.op.parameters || []).every((p) => p.schema && p.schema.type && p.description)));
  ok("every error response is application/problem+json", ops.every((o) => Object.entries(o.op.responses).filter(([s]) => Number(s) >= 400).every(([, r]) => r.content?.["application/problem+json"])));
  ok("every $ref resolves", JSON.stringify(spec).match(/#\/components\/schemas\/([A-Za-z]+)/g).every((r) => spec.components.schemas[r.split("/").pop()]));
  eq("estimate request schema IS the MCP tool's input schema", spec.components.schemas.EstimateRequest, TOOLS.find((t) => t.name === "estimate_quote").inputSchema);
  ok("Problem schema documents the codes the API emits", ["not_found", "method_not_allowed", "invalid_json", "invalid_request", "unsupported_media_type", "unpriceable", "internal_error"].every((c) => spec.components.schemas.Problem.properties.code.enum.includes(c)));
  ok("description says read-only and names the MCP server", /read-only/i.test(spec.info.description) && spec.info.description.includes("/mcp"));
  ok("no mention of the private form handlers' names", !/booking-submit|booking-photos|quote-analytics|address-autocomplete/.test(JSON.stringify(spec)));
  // The routing table and the document must agree.
  const table = new Set(PUBLIC_API_ENDPOINTS.map((e) => `${e.method} ${e.path}`));
  eq("routing table matches the document", [...table].sort(), ops.map((o) => `${o.method} ${o.path}`).sort());
  eq("routing table operationIds match the document", PUBLIC_API_ENDPOINTS.map((e) => e.operationId).sort(), ops.map((o) => o.op.operationId).sort());
  eq("REST mirrors every MCP tool", MIRRORED_TOOLS.sort(), TOOLS.map((t) => t.name).sort());
  ok("every tool-backed endpoint names a real tool", PUBLIC_API_ENDPOINTS.filter((e) => e.tool).every((e) => TOOLS.some((t) => t.name === e.tool)));

  // Universal error contract: an operation that documents only its happy path
  // leaves a generated client guessing what a non-200 body looks like.
  ok("every operation documents 405 and 500", ops.every((o) => o.op.responses[405] && o.op.responses[500]));
  ok("every operation is declared non-consequential (nothing here writes)", ops.every((o) => o.op["x-openai-isConsequential"] === false));
  ok("the OpenAPI-document response is typed, not a bare object", spec.paths["/openapi.json"].get.responses[200].content["application/json"].schema.$ref === "#/components/schemas/OpenApiDocument");
  ok("OpenApiDocument schema names the parts of a 3.1 document", ["openapi", "info", "paths", "components"].every((k) => spec.components.schemas.OpenApiDocument.properties[k]));

  // Versioning and deprecation policy — one object, three places.
  const life = spec.info["x-api-lifecycle"];
  ok("info carries the lifecycle policy", life && life.version === "v1" && life.status === "current");
  eq("v1 is not deprecated and has no sunset date", [life.deprecated, life.sunset], [false, null]);
  eq("policy links the written-out section", life.policy, `${SITE}/for-agents/#versioning`);
  ok("deprecation signals name RFC 9745 and RFC 8594", /9745/.test(JSON.stringify(life.deprecationSignals)) && /8594/.test(JSON.stringify(life.deprecationSignals)));
  ok("notice period is at least six months", life.minimumNoticeMonths >= 6);
  ok("description states the versioning and rate-limit policy", /Versioning/.test(spec.info.description) && /Rate limits/.test(spec.info.description));
  eq("Lifecycle schema is referenced from the index schema", spec.components.schemas.ApiIndex.properties.lifecycle.$ref, "#/components/schemas/Lifecycle");
  ok("Lifecycle status enum covers the whole life", ["current", "deprecated", "sunset"].every((s) => spec.components.schemas.Lifecycle.properties.status.enum.includes(s)));
  // Honesty guard: no RateLimit headers are sent, so the document must not
  // claim a quota. If a real quota is ever enforced, change this test first.
  ok("no fabricated RateLimit quota in the document", !/RateLimit-Limit|RateLimit-Remaining|"RateLimit"/.test(JSON.stringify(spec)));
}

// ── Endpoints ───────────────────────────────────────────────────────────────
console.log("\nEndpoints:");
{
  let r = await asJson(await call("GET", "/api/v1/"));
  eq("GET /api/v1/ → 200", r.status, 200);
  ok("index is JSON", r.ct.startsWith("application/json"));
  ok("index links spec, docs and mcp", r.body.openapi === `${SITE}/openapi.json` && r.body.docs.startsWith(`${SITE}/for-agents/`) && r.body.mcp === `${SITE}/mcp`);
  eq("index readOnly", r.body.readOnly, true);
  eq("index lists every endpoint", r.body.endpoints.length, PUBLIC_API_ENDPOINTS.length);
  eq("CORS open", r.headers.get("Access-Control-Allow-Origin"), "*");
  eq("API responses are not indexed as pages", r.headers.get("X-Robots-Tag"), "noindex");
  // RFC 8631: a client holding only a response can still find the spec, the
  // docs and the catalog. Exposed through CORS or a browser client can't read it.
  {
    const link = r.headers.get("Link") || "";
    ok("Link header points at the spec", link.includes(`<${SITE}/openapi.json>; rel="service-desc"`));
    ok("Link header points at the docs", link.includes(`rel="service-doc"`) && link.includes(`${SITE}/for-agents/#rest-api`));
    ok("Link header points at the catalog", link.includes(`<${SITE}/.well-known/api-catalog>; rel="api-catalog"`));
    eq("Link is exposed to cross-origin readers", r.headers.get("Access-Control-Expose-Headers"), "Link");
  }
  ok("index carries the lifecycle policy", r.body.lifecycle && r.body.lifecycle.status === "current" && r.body.lifecycle.deprecated === false);
  eq("index lifecycle equals the document's", r.body.lifecycle, spec.info["x-api-lifecycle"]);

  r = await asJson(await call("GET", "/api/v1"));
  eq("GET /api/v1 (no slash) → 200", r.status, 200);

  r = await asJson(await call("GET", "/api/v1/openapi.json"));
  eq("GET /api/v1/openapi.json → 200", r.status, 200);
  eq("live document equals the built one", r.body, JSON.parse(JSON.stringify(spec)));

  r = await asJson(await call("GET", "/api/v1/services"));
  eq("GET /services → 200", r.status, 200);
  ok("seven services with id/name/includes/url", r.body.services.length === 7 && r.body.services.every((s) => s.id && s.name && s.includes && s.url.startsWith(SITE)));

  r = await asJson(await call("GET", "/api/v1/service-area?suburb=Robina"));
  eq("GET /service-area?suburb=Robina → 200", r.status, 200);
  eq("suburb echoed and matched", [r.body.querySuburb, r.body.matchedExampleSuburb], ["Robina", true]);
  r = await asJson(await call("GET", "/api/v1/service-area"));
  ok("without suburb: no echo, still region/base/radius", r.body.querySuburb === undefined && r.body.region && r.body.base && r.body.radiusKm);

  r = await asJson(await call("GET", "/api/v1/pricing-options"));
  eq("GET /pricing-options → 200", r.status, 200);
  ok("pane bands, solar bands, frequencies present", r.body.paneBands.length && r.body.solarPanelBands.length && r.body.windowFrequencies.length && r.body.pressureAreaSizes.driveway);
  ok("the unsure pane band is flagged customQuote", r.body.paneBands.find((b) => b.value === "unsure")?.customQuote === true);

  const est = { services: ["window"], propertyType: "house", storeys: "2", window: { panes: "21-30", tint: "no", condition: "regular", french: "none", frequency: "once" } };
  r = await asJson(await call("POST", "/api/v1/estimate", { body: est, headers: { "Content-Type": "application/json" } }));
  eq("POST /estimate → 200", r.status, 200);
  ok("priced: custom false, numeric total, AUD, GST inclusive", r.body.custom === false && typeof r.body.total === "number" && r.body.total > 0 && r.body.currency === "AUD" && r.body.gstInclusive === true);
  ok("has a plain-English summary and the quote URL", /inc GST/.test(r.body.summary) && r.body.quoteUrl === `${SITE}/instant-quote/`);
  eq("estimate is not cached", r.headers.get("Cache-Control"), "no-store");

  r = await asJson(await call("POST", "/api/v1/estimate", { body: { ...est, window: { ...est.window, panes: "unsure" } }, headers: { "Content-Type": "application/json" } }));
  eq("custom-quote combination still 200", r.status, 200);
  ok("custom true, total null, reasons listed", r.body.custom === true && r.body.total === null && r.body.customQuoteReasons.length > 0);

  r = await asJson(await call("GET", "/api/v1/pages?path=/window-cleaning/"));
  if (r.status === 200) {
    ok("GET /pages returns markdown with path/url/format", r.body.format === "markdown" && r.body.path === "/window-cleaning/" && r.body.markdown.length > 100);
  } else {
    skipped("GET /pages (needs dist/ mirrors)", `got ${r.status}`);
  }
  r = await asJson(await call("GET", "/api/v1/pages?path=/api/reviews"));
  eq("GET /pages refuses /api/ paths → 400", [r.status, r.body.code], [400, "invalid_request"]);
}

// ── Errors: RFC 9457, never HTML ────────────────────────────────────────────
console.log("\nErrors (RFC 9457):");
{
  const isProblem = (r) =>
    r.ct.startsWith("application/problem+json") &&
    typeof r.body.type === "string" && r.body.type.startsWith(SITE) &&
    typeof r.body.title === "string" && r.body.status === r.status &&
    typeof r.body.detail === "string" && typeof r.body.code === "string" &&
    typeof r.body.hint === "string" && r.body.docs.startsWith(`${SITE}/for-agents/`);

  let r = await asJson(await call("GET", "/api/v1/no-such-thing"));
  eq("unknown endpoint → 404", r.status, 404);
  ok("404 is a problem document", isProblem(r));
  eq("404 code", r.body.code, "not_found");
  ok("404 lists availableEndpoints", Array.isArray(r.body.availableEndpoints) && r.body.availableEndpoints.length === PUBLIC_API_ENDPOINTS.length);
  eq("instance is the path", r.body.instance, "/api/v1/no-such-thing");

  r = await asJson(await call("GET", "/api/v1/estimate"));
  eq("GET on a POST endpoint → 405", r.status, 405);
  ok("405 is a problem document", isProblem(r));
  eq("Allow header", r.headers.get("Allow"), "POST, OPTIONS");
  eq("allowed in body", r.body.allowed, ["POST", "OPTIONS"]);

  r = await asJson(await call("POST", "/api/v1/services"));
  eq("POST on a GET endpoint → 405", r.status, 405);

  r = await asJson(await call("POST", "/api/v1/estimate", { body: "{not json", headers: { "Content-Type": "application/json" } }));
  eq("malformed JSON → 400 invalid_json", [r.status, r.body.code], [400, "invalid_json"]);
  ok("malformed JSON is a problem document", isProblem(r));

  r = await asJson(await call("POST", "/api/v1/estimate", { body: "services=window", headers: { "Content-Type": "application/x-www-form-urlencoded" } }));
  eq("wrong content type → 415", [r.status, r.body.code], [415, "unsupported_media_type"]);

  r = await asJson(await call("POST", "/api/v1/estimate", { body: { services: ["carpet"] }, headers: { "Content-Type": "application/json" } }));
  eq("unknown service → 400 unpriceable", [r.status, r.body.code], [400, "unpriceable"]);
  ok("hint points at pricing-options", r.body.hint.includes("/pricing-options"));

  r = await asJson(await call("POST", "/api/v1/estimate", { body: [1, 2], headers: { "Content-Type": "application/json" } }));
  eq("array body → 400 invalid_request", [r.status, r.body.code], [400, "invalid_request"]);

  r = await asJson(await call("GET", "/api/v1/pages?path=/no-such-page/"));
  eq("missing page → 404 not_found", [r.status, r.body.code], [404, "not_found"]);

  const pre = await call("OPTIONS", "/api/v1/estimate");
  eq("preflight → 204", pre.status, 204);
  ok("preflight allows POST", /POST/.test(pre.headers.get("Access-Control-Allow-Methods") || ""));
}

// ── Middleware: /api directory + JSON 404 for unknown /api/* ────────────────
console.log("\nMiddleware:");
{
  const mw = (method, pathname, next = ctx().next) => middleware({ request: new Request(SITE + pathname, { method }), env: {}, next });
  let r = await asJson(await mw("GET", "/api"));
  eq("GET /api → 200 JSON directory", [r.status, r.ct.startsWith("application/json")], [200, true]);
  ok("directory names v1, the spec and the private note", r.body.apis[0].baseUrl === `${SITE}/api/v1` && r.body.apis[0].openapi === `${SITE}/openapi.json` && /private/.test(r.body.note));
  eq("directory carries the same lifecycle policy", r.body.apis[0].lifecycle, spec.info["x-api-lifecycle"]);
  r = await asJson(await mw("GET", "/api/"));
  eq("GET /api/ → 200 too", r.status, 200);
  r = await asJson(await mw("POST", "/api"));
  eq("POST /api → 405 problem", [r.status, r.body.code, r.headers.get("Allow")], [405, "method_not_allowed", "GET, HEAD, OPTIONS"]);

  r = await asJson(await mw("GET", "/api/nonexistent"));
  eq("unhandled /api/* HTML 404 → problem+json 404", [r.status, r.ct.startsWith("application/problem+json"), r.body.code], [404, true, "not_found"]);
  ok("hint points at /api/v1/ and the spec", r.body.hint.includes("/api/v1/") && r.body.hint.includes("/openapi.json"));

  // A private handler's own response (JSON, any status) must pass through untouched.
  const passthrough = async () => new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  r = await asJson(await mw("GET", "/api/reviews", passthrough));
  eq("existing /api handler responses pass through", [r.status, r.body.ok], [200, true]);
  const private404 = async () => new Response(JSON.stringify({ error: "x" }), { status: 404, headers: { "Content-Type": "application/json" } });
  r = await asJson(await mw("GET", "/api/booking-submit", private404));
  eq("a handler's own JSON 404 is left alone", [r.status, r.body.error], [404, "x"]);
}

// ── Discovery files ─────────────────────────────────────────────────────────
console.log("\nDiscovery:");
{
  const catalog = JSON.parse(read("public/.well-known/api-catalog"));
  ok("api-catalog is a linkset with one anchor", Array.isArray(catalog.linkset) && catalog.linkset.length === 1 && catalog.linkset[0].anchor === `${SITE}/`);
  ok("api-catalog service-desc names the OpenAPI document", catalog.linkset[0]["service-desc"].some((l) => l.href === `${SITE}/openapi.json` && /openapi/.test(l.type)));
  ok("api-catalog service-doc names /for-agents/", catalog.linkset[0]["service-doc"].some((l) => l.href === `${SITE}/for-agents/`));
  const headers = read("public/_headers");
  ok("_headers types the catalog as application/linkset+json", /\/\.well-known\/api-catalog\n\s+Content-Type: application\/linkset\+json/.test(headers));
  ok("_headers opens CORS on /openapi.json", /\/openapi\.json\n(?:.*\n){0,3}?\s+Access-Control-Allow-Origin: \*/.test(headers));
  const html = read("index.html");
  ok("every page links the spec with rel=service-desc", /rel="service-desc" href="\/openapi\.json"/.test(html));
  ok("every page links the docs with rel=service-doc", /rel="service-doc" href="\/for-agents\/"/.test(html));
  ok("every page links the catalog with rel=api-catalog", /rel="api-catalog" href="\/\.well-known\/api-catalog"/.test(html));
  const robots = read("public/robots.txt");
  ok("robots allows /api/v1/ while keeping /api disallowed", /^Allow: \/api\/v1\/$/m.test(robots) && /^Disallow: \/api$/m.test(robots));
  const llms = read("public/llms.txt");
  ok("llms.txt lists the REST API and the spec", llms.includes(`${SITE}/api/v1/`) && llms.includes(`${SITE}/openapi.json`));
  ok("llms.txt no longer claims there is no public API", !/There is no\s+public API/.test(llms));
  const instr = read("public/agent-instructions.md");
  ok("agent instructions describe /api/v1/ and keep the private warning", instr.includes("`/api/v1/`") && /private\s+form handler/.test(instr));
  const page = read("public/for-agents/index.html");
  ok("for-agents has a #rest-api section listing every operationId", page.includes('id="rest-api"') && PUBLIC_API_ENDPOINTS.every((e) => page.includes(`<code>${e.operationId}</code>`)));
  ok("for-agents has the #errors anchor the problem types point at", page.includes('id="errors"'));
  // The policy links in the API responses must land on real anchors.
  ok("for-agents has the #versioning anchor the lifecycle policy points at", page.includes('id="versioning"'));
  ok("for-agents has a #rate-limits section", page.includes('id="rate-limits"'));
  ok("versioning section names the deprecation RFCs", /rfc9745/.test(page) && /rfc8594/.test(page));
  ok("versioning section says v1 is current with no sunset", /v1 is current/i.test(page) && /no sunset date/i.test(page));
  ok("rate-limits section is honest about there being no quota", /no per-client quota/i.test(page) && /Retry-After/.test(page));
  ok("llms.txt publishes the versioning and rate-limit policy", llms.includes("/for-agents/#versioning") && llms.includes("/for-agents/#rate-limits"));
  ok("agent instructions publish the same policy", instr.includes("/for-agents/#versioning") && /Deprecation/.test(instr) && /Retry-After/.test(instr));
  ok("footer links the API docs", /href="\/for-agents\/#rest-api"/.test(read("src/Layout.jsx")));
  ok("package.json builds write the static document", /"build": "vite build && node scripts\/write-openapi\.mjs/.test(read("package.json")) && /"build:meta-only": "vite build && node scripts\/write-openapi\.mjs/.test(read("package.json")));
  const built = path.join(DIST, "openapi.json");
  if (fs.existsSync(built) && fs.statSync(built).mtimeMs >= fs.statSync(path.join(ROOT, "src/publicApi/openapi.js")).mtimeMs) {
    eq("dist/openapi.json equals the live document", JSON.parse(read("dist/openapi.json")), JSON.parse(JSON.stringify(spec)));
  } else {
    skipped("dist/openapi.json equality", "run `npm run build:meta-only` first");
  }
}

console.log(`\n${pass} passed, ${fail} failed, ${skip} skipped`);
process.exit(fail ? 1 : 0);
