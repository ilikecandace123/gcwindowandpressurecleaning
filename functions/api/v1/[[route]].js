/**
 * Public, read-only REST API — /api/v1/
 *
 * The same five operations the MCP server exposes as tools (functions/mcp.js),
 * as plain HTTP + JSON for clients that don't speak MCP: curl, a browser,
 * function-calling LLMs working from the OpenAPI document. One implementation,
 * two transports — every handler here delegates to callTool(), so a REST client
 * can never get a different answer (or a different price) to an MCP client.
 *
 * Described by: /openapi.json (static, written at build) and
 * /api/v1/openapi.json (live, same object) — see src/publicApi/openapi.js.
 *
 * READ ONLY. Nothing here creates a booking, a job, a lead or any record, and
 * nothing accepts personal information. The private form handlers that do
 * live beside this directory under /api/ and are NOT part of this API.
 *
 * Errors are RFC 9457 Problem Details (application/problem+json) with a
 * machine-readable `code` and a `hint` — never an HTML page.
 */

import { callTool, TOOLS, SERVER_NAME, SERVER_VERSION } from "../../mcp.js";
import { buildOpenApi } from "../../../src/publicApi/openapi.js";
import { jsonResponse, problem, preflight, API_BASE, API_DOCS, SITE, LIFECYCLE } from "../../../src/publicApi/http.js";

// route -> { method, tool, operationId, summary }
const ENDPOINTS = [
  { path: "/", method: "GET", operationId: "getApiIndex", summary: "API index" },
  { path: "/openapi.json", method: "GET", operationId: "getOpenApiDocument", summary: "This API's OpenAPI 3.1 document" },
  { path: "/services", method: "GET", tool: "list_services", operationId: "listServices", summary: "List cleaning services" },
  { path: "/service-area", method: "GET", tool: "get_service_area", operationId: "getServiceArea", summary: "Get service area, optionally checking a suburb" },
  { path: "/pricing-options", method: "GET", tool: "get_pricing_options", operationId: "getPricingOptions", summary: "Valid option values for an estimate" },
  { path: "/estimate", method: "POST", tool: "estimate_quote", operationId: "estimateQuote", summary: "Estimate a cleaning quote (GST inclusive, AUD)" },
  { path: "/pages", method: "GET", tool: "get_page", operationId: "getPageMarkdown", summary: "Fetch a site page as markdown" },
];

const KNOWN_PATHS = ENDPOINTS.map((e) => `${e.method} ${API_BASE}${e.path === "/" ? "/" : e.path}`);

let cachedOpenApi = null;
function openApiDocument() {
  if (!cachedOpenApi) cachedOpenApi = buildOpenApi();
  return cachedOpenApi;
}

function apiIndex() {
  return {
    name: "Gold Coast Window and Pressure Cleaning API",
    version: SERVER_VERSION,
    baseUrl: API_BASE,
    openapi: `${SITE}/openapi.json`,
    docs: API_DOCS,
    mcp: `${SITE}/mcp`,
    readOnly: true,
    authentication: "none",
    // Published policy, not a promise made up per response — see LIFECYCLE.
    lifecycle: LIFECYCLE,
    endpoints: ENDPOINTS.map((e) => ({
      method: e.method,
      path: `${API_BASE}${e.path === "/" ? "/" : e.path}`,
      operationId: e.operationId,
      summary: e.summary,
    })),
    note: "Read-only. Nothing here creates a booking or accepts personal information — customers book at " + SITE + "/instant-quote/.",
  };
}

/** Normalise "/api/v1", "/api/v1/", "/api/v1/services/" -> "/", "/", "/services". */
function routeOf(pathname) {
  let rest = pathname.replace(/^\/api\/v1/, "");
  if (rest === "" || rest === "/") return "/";
  return rest.replace(/\/+$/, "");
}

/** Turn an MCP tool result into a REST body, or a problem response on isError. */
function fromTool(result, instance, { errorCode = "invalid_request", errorStatus = 400 } = {}) {
  const text = result?.content?.[0]?.text ?? "";
  if (result?.isError) {
    return problem(errorStatus, errorCode, text, {
      instance,
      hint: errorCode === "not_found" ? `Every page is listed in ${SITE}/sitemap.xml.` : `GET ${API_BASE}/pricing-options lists every accepted value.`,
    });
  }
  return { text, data: result?.structuredContent ?? {} };
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const route = routeOf(url.pathname);
  const instance = url.pathname;

  if (request.method === "OPTIONS") return preflight();

  const endpoint = ENDPOINTS.find((e) => e.path === route);
  if (!endpoint) {
    return problem(404, "not_found", `No endpoint at ${url.pathname}.`, {
      instance,
      hint: `GET ${API_BASE}/ lists every endpoint; the OpenAPI document is at ${SITE}/openapi.json.`,
      extra: { availableEndpoints: KNOWN_PATHS },
    });
  }

  const allowed = endpoint.method === "GET" ? "GET, HEAD, OPTIONS" : `${endpoint.method}, OPTIONS`;
  const methodOk = request.method === endpoint.method || (endpoint.method === "GET" && request.method === "HEAD");
  if (!methodOk) {
    return problem(405, "method_not_allowed", `${request.method} is not supported on ${url.pathname}; use ${endpoint.method}.`, {
      instance,
      hint: endpoint.method === "POST" ? "Send a JSON body with Content-Type: application/json." : "This resource is read-only.",
      extra: { allowed: allowed.split(", ") },
      headers: { Allow: allowed },
    });
  }

  try {
    switch (endpoint.operationId) {
      case "getApiIndex":
        return jsonResponse(apiIndex());

      case "getOpenApiDocument":
        return jsonResponse(openApiDocument(), 200, { "Cache-Control": "public, max-age=3600" });

      case "listServices": {
        const r = fromTool(await callTool("list_services", {}, context), instance);
        return r instanceof Response ? r : jsonResponse(r.data);
      }

      case "getServiceArea": {
        const suburb = url.searchParams.get("suburb") || undefined;
        const r = fromTool(await callTool("get_service_area", { suburb }, context), instance);
        return r instanceof Response ? r : jsonResponse(r.data);
      }

      case "getPricingOptions": {
        const r = fromTool(await callTool("get_pricing_options", {}, context), instance);
        return r instanceof Response ? r : jsonResponse(r.data);
      }

      case "estimateQuote": {
        const ct = (request.headers.get("Content-Type") || "").toLowerCase();
        if (!ct.includes("application/json")) {
          return problem(415, "unsupported_media_type", `Content-Type must be application/json (got "${ct || "none"}").`, {
            instance,
            hint: "Send the estimate inputs as a JSON object. The schema is EstimateRequest in the OpenAPI document.",
          });
        }
        let body;
        try {
          body = await request.json();
        } catch {
          return problem(400, "invalid_json", "The request body is not valid JSON.", {
            instance,
            hint: "Send a JSON object such as {\"services\":[\"window\"],\"propertyType\":\"house\",\"storeys\":\"1\",\"window\":{\"panes\":\"11-20\"}}.",
          });
        }
        if (!body || typeof body !== "object" || Array.isArray(body)) {
          return problem(400, "invalid_request", "The request body must be a JSON object.", {
            instance,
            hint: "See the EstimateRequest schema in the OpenAPI document.",
          });
        }
        const result = await callTool("estimate_quote", body, context);
        const r = fromTool(result, instance, { errorCode: "unpriceable" });
        if (r instanceof Response) return r;
        return jsonResponse({ ...r.data, summary: r.text }, 200, { "Cache-Control": "no-store" });
      }

      case "getPageMarkdown": {
        const path = url.searchParams.get("path") || "/";
        const result = await callTool("get_page", { path }, context);
        if (result?.isError) {
          const text = result.content?.[0]?.text || "";
          const forbidden = /cannot be read/i.test(text);
          return problem(forbidden ? 400 : 404, forbidden ? "invalid_request" : "not_found", text, {
            instance,
            hint: forbidden ? "Only site pages can be read — nothing under /api/ and no parent-directory traversal." : `Every page is listed in ${SITE}/sitemap.xml.`,
          });
        }
        const data = result.structuredContent || {};
        return jsonResponse({ ...data, markdown: result.content?.[0]?.text ?? "" });
      }

      default:
        return problem(404, "not_found", `No endpoint at ${url.pathname}.`, { instance });
    }
  } catch (err) {
    return problem(500, "internal_error", err && err.message ? err.message : "Unexpected error.", {
      instance,
      hint: "Retry once; if it persists, use the MCP server at " + SITE + "/mcp or the website.",
    });
  }
}

// Exposed for tests: the routing table and the tool list the API mirrors.
export const PUBLIC_API_ENDPOINTS = ENDPOINTS;
export const MIRRORED_TOOLS = TOOLS.map((t) => t.name);
export { SERVER_NAME as API_NAME };
