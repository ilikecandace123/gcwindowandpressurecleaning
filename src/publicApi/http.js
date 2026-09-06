/**
 * HTTP helpers shared by the public REST API (functions/api/v1/) and the
 * middleware's /api directory + JSON-404 handling. Kept out of functions/ so
 * Cloudflare Pages does not turn it into a route.
 */

export const SITE = "https://gcwindowandpressurecleaning.com.au";
export const API_BASE = `${SITE}/api/v1`;
export const API_DOCS = `${SITE}/for-agents/#rest-api`;
export const PROBLEM_TYPE_BASE = `${SITE}/for-agents/#errors`;

// Read-only, unauthenticated, no cookies: nothing for a cross-origin caller to
// steal, so CORS can be open. Revisit the moment any operation writes.
export const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Max-Age": "86400",
};

const BASE_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex",
  ...CORS,
};

export function jsonResponse(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": status === 200 ? "public, max-age=300" : "no-store",
      ...BASE_HEADERS,
      ...extra,
    },
  });
}

/** Titles for the problem codes this API emits (RFC 9457 §3.1.2). */
const TITLES = {
  not_found: "Not Found",
  method_not_allowed: "Method Not Allowed",
  invalid_json: "Invalid JSON",
  invalid_request: "Invalid Request",
  unpriceable: "Cannot Be Priced Automatically",
  unsupported_media_type: "Unsupported Media Type",
  internal_error: "Internal Error",
};

/**
 * RFC 9457 Problem Details response. `type` is a stable URI per code, `code`
 * is the machine-readable discriminator, `hint` says what to do instead.
 */
export function problem(status, code, detail, { instance, hint, extra = {}, headers = {} } = {}) {
  const body = {
    type: `${PROBLEM_TYPE_BASE}-${code.replace(/_/g, "-")}`,
    title: TITLES[code] || "Error",
    status,
    detail,
    ...(instance ? { instance } : {}),
    code,
    ...(hint ? { hint } : {}),
    docs: API_DOCS,
    ...extra,
  };
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/problem+json; charset=utf-8",
      "Cache-Control": "no-store",
      ...BASE_HEADERS,
      ...headers,
    },
  });
}

export function preflight() {
  return new Response(null, { status: 204, headers: CORS });
}

/** The /api directory: which APIs exist here and which paths are private. */
export function apiDirectory() {
  return {
    name: "Gold Coast Window and Pressure Cleaning",
    apis: [
      {
        name: "Public read-only API",
        version: "v1",
        baseUrl: API_BASE,
        index: `${API_BASE}/`,
        openapi: `${SITE}/openapi.json`,
        docs: API_DOCS,
        readOnly: true,
        authentication: "none",
      },
    ],
    mcp: `${SITE}/mcp`,
    apiCatalog: `${SITE}/.well-known/api-catalog`,
    note: "Every other path under /api/ is a private form handler for this website's own quote and booking flow — not a public API, not documented, not for third-party use.",
  };
}
