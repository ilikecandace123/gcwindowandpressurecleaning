/**
 * HTTP helpers shared by the public REST API (functions/api/v1/) and the
 * middleware's /api directory + JSON-404 handling. Kept out of functions/ so
 * Cloudflare Pages does not turn it into a route.
 */

export const SITE = "https://gcwindowandpressurecleaning.com.au";
export const API_BASE = `${SITE}/api/v1`;
export const API_DOCS = `${SITE}/for-agents/#rest-api`;
export const PROBLEM_TYPE_BASE = `${SITE}/for-agents/#errors`;
export const OPENAPI_URL = `${SITE}/openapi.json`;
export const VERSIONING_DOCS = `${SITE}/for-agents/#versioning`;

// Read-only, unauthenticated, no cookies: nothing for a cross-origin caller to
// steal, so CORS can be open. Revisit the moment any operation writes.
export const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Max-Age": "86400",
  // A cross-origin client can only read a response header it is told about.
  // Without this, `Link` is invisible to browser-based agents.
  "Access-Control-Expose-Headers": "Link",
};

/**
 * RFC 8631 service-desc / service-doc links, on every API response.
 *
 * A client that arrives at one endpoint — from a bookmark, a log line, a
 * half-remembered URL — can find the machine-readable description and the
 * human documentation from the response alone, without already knowing the
 * discovery files exist. Registered relation types, absolute URLs.
 */
export const API_LINK_HEADER = [
  `<${OPENAPI_URL}>; rel="service-desc"; type="application/vnd.oai.openapi+json;version=3.1"`,
  `<${SITE}/for-agents/#rest-api>; rel="service-doc"; type="text/html"`,
  `<${SITE}/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
].join(", ");

const BASE_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex",
  Link: API_LINK_HEADER,
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

/**
 * Published versioning and deprecation policy, in one object.
 *
 * Served in the /api/v1/ index, the /api directory and the OpenAPI document so
 * a client can read it wherever it lands. `deprecated` and `sunset` are the
 * honest current state: v1 is the only version, it is current, and no sunset
 * date exists. If v1 is ever retired, this object changes and the responses
 * start carrying the Deprecation (RFC 9745) and Sunset (RFC 8594) headers
 * described at `policy` — a client that watches either will see it coming.
 */
export const LIFECYCLE = {
  version: "v1",
  status: "current",
  deprecated: false,
  sunset: null,
  versioningScheme: "url-path",
  minimumNoticeMonths: 6,
  breakingChangePolicy:
    "Breaking changes ship as a new path version (/api/v2/); this version keeps its contract. Additive changes — new endpoints, new response fields, new option values — can appear in v1 at any time, so ignore fields you do not recognise.",
  deprecationSignals: ["Deprecation (RFC 9745)", "Sunset (RFC 8594)", 'Link rel="deprecation"'],
  policy: VERSIONING_DOCS,
};

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
        lifecycle: LIFECYCLE,
      },
    ],
    mcp: `${SITE}/mcp`,
    apiCatalog: `${SITE}/.well-known/api-catalog`,
    note: "Every other path under /api/ is a private form handler for this website's own quote and booking flow — not a public API, not documented, not for third-party use.",
  };
}
