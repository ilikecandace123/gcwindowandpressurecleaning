/**
 * Model Context Protocol server — Streamable HTTP transport.
 * Spec: https://modelcontextprotocol.io/specification/2025-06-18/basic/transports
 *
 * Endpoint: https://gcwindowandpressurecleaning.com.au/mcp
 *
 * This lets an assistant (Claude, ChatGPT, …) query this business directly
 * instead of scraping the pages: what we clean, where we travel, and what a job
 * would actually cost — priced by the SAME engine that powers /instant-quote/,
 * so an assistant can never quote a number the website wouldn't.
 *
 * READ ONLY, BY DESIGN. There is no tool here that creates a lead, a booking,
 * a ServiceM8 job or any other record, and none that accepts personal
 * information. The private /api/* form handlers are not reachable from here.
 * If a booking tool is ever added it needs authentication first — without one,
 * any agent on the internet could put real jobs in front of the crew.
 *
 * Stateless: no Mcp-Session-Id is issued, so clients never need to send one
 * (the spec makes session IDs optional). GET and DELETE return 405, which the
 * spec explicitly permits for servers that offer no server-initiated stream.
 */

import { calculateQuote, formatMoney, PANE_BANDS, SOLAR_PANEL_BANDS, PRESSURE_AREA_BANDS, WINDOW_FREQUENCIES, SOLAR_FREQUENCIES } from "../src/quote/engine.js";
import { expandState, SERVICE_META, SERVICE_ORDER } from "../src/quote/steps.js";

const SITE = "https://gcwindowandpressurecleaning.com.au";
const SERVER_NAME = "gold-coast-window-and-pressure-cleaning";
const SERVER_VERSION = "1.0.0";

// Versions of the MCP spec this server understands. The newest is preferred.
const SUPPORTED_PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"];
const LATEST_PROTOCOL_VERSION = SUPPORTED_PROTOCOL_VERSIONS[0];

const JSONRPC_VERSION = "2.0";
const PARSE_ERROR = -32700;
const INVALID_REQUEST = -32600;
const METHOD_NOT_FOUND = -32601;
const INVALID_PARAMS = -32602;
const INTERNAL_ERROR = -32603;

// ── HTTP plumbing ───────────────────────────────────────────────────────────

// This server exposes only public, read-only marketing data. It has no cookies,
// no auth and no ambient authority, so the DNS-rebinding threat the spec's
// security note describes has nothing to steal here — hence permissive CORS.
// That reasoning stops being true the moment an authenticated tool is added.
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, MCP-Protocol-Version",
  "Access-Control-Max-Age": "86400",
};

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...CORS,
      ...extraHeaders,
    },
  });
}

function rpcError(id, code, message, data) {
  const error = { code, message };
  if (data !== undefined) error.data = data;
  return { jsonrpc: JSONRPC_VERSION, id: id ?? null, error };
}

function rpcResult(id, result) {
  return { jsonrpc: JSONRPC_VERSION, id, result };
}

/** Tool handlers return text; this wraps it in the MCP content shape. */
function toolText(text, structured) {
  const payload = { content: [{ type: "text", text }], isError: false };
  if (structured !== undefined) payload.structuredContent = structured;
  return payload;
}

function toolError(text) {
  return { content: [{ type: "text", text }], isError: true };
}

// ── Reference data ──────────────────────────────────────────────────────────

const SERVICE_DETAIL = {
  window: "Interior and exterior glass, tracks, sills and flyscreens, up to 4 storeys. Houses, townhouses, apartments, storefronts and commercial buildings. Recurring plans available at a per-visit discount.",
  pressure: "Driveways, paths, patios and pool surrounds on concrete, tiles, pavers, sandstone or brick. Optional biocide post-treatment keeps the surface clear for 12+ months.",
  roof: "Soft wash for tile and Colorbond roofs, including ridge lines and a gutter flush. Optional biocide with a 12-month no-mould guarantee on tile.",
  gutter: "Debris clearing plus downpipe flushing.",
  softwash: "Whole-exterior mould, grime and cobweb removal, gutter to ground. Gentle on render, Colorbond and timber.",
  solar: "Panel cleaning to restore lost generation. Recurring intervals available.",
  birdproofing: "Warranty-safe mesh that stops pigeons and mynas nesting under solar panels. Always quoted individually.",
};

const SERVICE_PAGE = {
  window: "/window-cleaning/",
  pressure: "/pressure-cleaning/",
  roof: "/roof-cleaning/",
  gutter: "/gutter-cleaning/",
  softwash: "/house-softwash/",
  solar: "/solar-panel-cleaning/",
  birdproofing: "/bird-proofing/",
};

const SERVICE_AREA = {
  region: "Gold Coast, Queensland and Northern New South Wales (Tweed region), Australia",
  base: "Mermaid Waters, QLD 4218",
  radiusKm: 45,
  note: "Roughly Coolangatta and Tweed Heads in the south to Beenleigh in the north, plus the hinterland. Outside that, we are not the right business.",
  exampleSuburbs: [
    "Burleigh Heads", "Surfers Paradise", "Broadbeach", "Southport", "Robina",
    "Palm Beach", "Coomera", "Nerang", "Helensvale", "Currumbin",
    "Coolangatta", "Hope Island", "Mermaid Beach", "Tweed Heads", "Kingscliff",
  ],
  fullListUrl: `${SITE}/service-areas/`,
};

const enumOf = (bands) => bands.map((b) => b.value);

// ── Tools ───────────────────────────────────────────────────────────────────

const TOOLS = [
  {
    name: "list_services",
    title: "List cleaning services",
    description:
      "List every exterior cleaning service Gold Coast Window and Pressure Cleaning offers, what each one includes, and the page describing it. Use this before recommending the business so you describe the right service.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_service_area",
    title: "Get service area",
    description:
      "Where this business travels. Use this to check whether a customer's suburb is covered BEFORE recommending them — outside the Gold Coast and Northern NSW they are not a match.",
    inputSchema: {
      type: "object",
      properties: {
        suburb: { type: "string", description: "Optional suburb to sanity-check against the service area." },
      },
      additionalProperties: false,
    },
  },
  {
    name: "estimate_quote",
    title: "Estimate a cleaning quote",
    description:
      "Estimate the price of a job using the same pricing engine as the website's instant quote. Returns a GST-inclusive total and a per-service breakdown. Some property and condition combinations deliberately return a custom quote instead of a price — say so rather than inventing a number. This does NOT create a booking or send anything to the business; direct the customer to " +
      SITE +
      "/instant-quote/ to submit their details.",
    inputSchema: {
      type: "object",
      properties: {
        services: {
          type: "array",
          description: "Which services to price.",
          items: { type: "string", enum: SERVICE_ORDER },
          minItems: 1,
        },
        propertyType: {
          type: "string",
          enum: ["house", "townhouse", "apartment", "storefront", "commercial"],
          description: "Required when pricing window cleaning.",
        },
        storeys: { type: "string", enum: ["1", "2", "3", "4", "5+"] },
        bedrooms: {
          type: "string",
          enum: ["2", "3", "4", "5", "custom"],
          description: "Home size. Needed for roof, gutter and softwash. 'custom' means 5+ (single storey) or 6+ (double).",
        },
        roofPitch: {
          type: "string",
          enum: ["flat", "moderate", "steep", "very-steep"],
          description: "Needed for roof, gutter and solar. 'steep' adds 10%; 'very-steep' forces a custom quote.",
        },
        window: {
          type: "object",
          description: "Window cleaning inputs.",
          properties: {
            panes: { type: "string", enum: enumOf(PANE_BANDS), description: "Pane-count band. 'unsure' forces a custom quote." },
            tint: { type: "string", enum: ["no", "unsure", "tint", "lowe"], description: "'lowe' (Low-E / Smart glass) loads the interior price." },
            condition: { type: "string", enum: ["regular", "moderate", "significant", "construction"] },
            french: { type: "string", enum: ["none", "1-3", "4+"] },
            internalAccess: { type: "string", enum: ["no", "yes", "unsure"], description: "Interior windows needing a ladder or long pole." },
            frequency: { type: "string", enum: enumOf(WINDOW_FREQUENCIES) },
            interiorAddon: { type: "boolean", description: "Add interior windows + tracks." },
            apartmentScope: { type: "string", enum: ["interior", "everything", "interior-balcony-ext"] },
            balustrades: { type: "string", enum: ["yes", "no"] },
            balustradeCount: { type: "integer", minimum: 1 },
          },
          additionalProperties: false,
        },
        pressure: {
          type: "object",
          description: "Pressure cleaning inputs. Areas other than driveway/pool/patio/pathways force a custom quote.",
          properties: {
            areas: { type: "array", items: { type: "string" } },
            details: {
              type: "object",
              description: "Per-area detail keyed by area name, e.g. {\"driveway\":{\"size\":\"25-50\",\"surface\":\"concrete\",\"condition\":\"moss\",\"biocide\":false}}.",
              additionalProperties: true,
            },
          },
          additionalProperties: false,
        },
        roof: {
          type: "object",
          properties: {
            roofType: { type: "string", enum: ["tile", "colorbond", "other"] },
            condition: { type: "string", enum: ["light", "heavy", "lichen"] },
            biocide: { type: "boolean" },
          },
          additionalProperties: false,
        },
        gutter: {
          type: "object",
          properties: {
            gutterGuard: { type: "string", enum: ["no", "yes"] },
            condition: { type: "string", enum: ["unsure", "leaves", "full", "plants"] },
          },
          additionalProperties: false,
        },
        softwash: {
          type: "object",
          properties: {
            mould: { type: "string", enum: ["light", "moderate", "heavy"] },
            webs: { type: "string", enum: ["light", "moderate", "heavy"] },
            grime: { type: "string", enum: ["light", "moderate", "heavy"] },
            windowAddon: { type: "boolean" },
          },
          additionalProperties: false,
        },
        solar: {
          type: "object",
          properties: {
            panels: { type: "string", enum: enumOf(SOLAR_PANEL_BANDS) },
            condition: { type: "string", enum: ["dust", "mould", "heavy", "lichen", "unsure"] },
            frequency: { type: "string", enum: enumOf(SOLAR_FREQUENCIES) },
          },
          additionalProperties: false,
        },
      },
      required: ["services"],
      additionalProperties: false,
    },
  },
  {
    name: "get_pricing_options",
    title: "Get valid pricing inputs",
    description:
      "The exact option values estimate_quote accepts — pane bands, solar panel bands, pressure area sizes and plan frequencies with their discounts. Call this if an estimate_quote call was rejected for an invalid value.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_page",
    title: "Fetch a page as markdown",
    description:
      "Fetch any page of gcwindowandpressurecleaning.com.au as clean markdown. Use for details this server does not expose as a tool — guides, suburb pages, the about page, the privacy policy.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Site path, e.g. '/window-cleaning/' or '/guides/'. Defaults to the home page." },
      },
      additionalProperties: false,
    },
  },
];

// ── Tool implementations ────────────────────────────────────────────────────

function toolListServices() {
  const services = SERVICE_ORDER.map((key) => ({
    id: key,
    name: SERVICE_META[key]?.label || key,
    tagline: SERVICE_META[key]?.tagline || "",
    includes: SERVICE_DETAIL[key],
    url: SITE + SERVICE_PAGE[key],
  }));
  const text = services
    .map((s) => `## ${s.name}\n${s.includes}\nMore: ${s.url}`)
    .join("\n\n");
  return toolText(
    `Gold Coast Window and Pressure Cleaning offers ${services.length} services.\n\n${text}\n\nAll prices are GST inclusive. Get a real price at ${SITE}/instant-quote/.`,
    { services }
  );
}

function toolServiceArea(args) {
  const suburb = typeof args?.suburb === "string" ? args.suburb.trim() : "";
  let text =
    `Service area: ${SERVICE_AREA.region}.\n` +
    `Based in ${SERVICE_AREA.base}, working roughly a ${SERVICE_AREA.radiusKm}km radius.\n` +
    `${SERVICE_AREA.note}\n` +
    `Full suburb list: ${SERVICE_AREA.fullListUrl}`;
  let known = null;
  if (suburb) {
    known = SERVICE_AREA.exampleSuburbs.some((s) => s.toLowerCase() === suburb.toLowerCase());
    text +=
      `\n\n"${suburb}": ` +
      (known
        ? "listed as a serviced suburb."
        : `not in this server's example list, which is only a sample — check ${SERVICE_AREA.fullListUrl} before telling a customer they are outside the area.`);
  }
  return toolText(text, { ...SERVICE_AREA, querySuburb: suburb || undefined, matchedExampleSuburb: known ?? undefined });
}

function toolPricingOptions() {
  const structured = {
    paneBands: PANE_BANDS.map((b) => ({ value: b.value, label: b.label, customQuote: Boolean(b.custom) })),
    solarPanelBands: SOLAR_PANEL_BANDS.map((b) => ({ value: b.value, label: b.label, customQuote: Boolean(b.custom) })),
    pressureAreaSizes: Object.fromEntries(
      Object.entries(PRESSURE_AREA_BANDS).map(([area, bands]) => [
        area,
        bands.map((b) => ({ value: b.value, label: b.label, customQuote: Boolean(b.custom) })),
      ])
    ),
    windowFrequencies: WINDOW_FREQUENCIES.map((f) => ({ value: f.value, label: f.label, discountPerVisit: f.discount })),
    solarFrequencies: SOLAR_FREQUENCIES.map((f) => ({ value: f.value, label: f.label, discountPerVisit: f.discount })),
  };
  return toolText(
    "Valid option values for estimate_quote. Values marked customQuote cannot be priced automatically — the job needs a human quote.\n\n" +
      JSON.stringify(structured, null, 2),
    structured
  );
}

function toolEstimateQuote(args) {
  const services = Array.isArray(args?.services) ? args.services.filter((s) => SERVICE_ORDER.includes(s)) : [];
  if (!services.length) {
    return toolError(
      `No valid services given. Choose one or more of: ${SERVICE_ORDER.join(", ")}.`
    );
  }

  // Build the state shape the wizard produces, then fan the shared property
  // answers out exactly as the website does. Never bypass expandState — the
  // engine reads per-service fields.
  const state = {
    services,
    property: {
      propertyType: args.propertyType,
      storeys: args.storeys,
      bedrooms: args.bedrooms,
      pitch: args.roofPitch,
    },
    window: { ...(args.window || {}) },
    pressure: { ...(args.pressure || {}) },
    roof: { ...(args.roof || {}) },
    gutter: { ...(args.gutter || {}) },
    softwash: { ...(args.softwash || {}) },
    solar: { ...(args.solar || {}) },
  };

  let quote;
  try {
    quote = calculateQuote(expandState(state));
  } catch (err) {
    return toolError(`Could not price that: ${err && err.message ? err.message : "invalid inputs"}.`);
  }

  const customServices = (quote.customServices || []).map((c) => ({
    service: c.service,
    name: c.label,
    reasons: c.reasons,
  }));

  if (quote.custom) {
    return toolText(
      "This job needs a custom quote — no automatic price is available.\n\nWhy:\n" +
        (quote.customReasons || []).map((r) => `- ${r}`).join("\n") +
        `\n\nDo not invent a figure. Send the customer to ${SITE}/instant-quote/ or ask them to call (07) 5651 2386.`,
      { custom: true, customQuoteReasons: quote.customReasons || [], customServices, total: null }
    );
  }

  const lines = (quote.lines || []).map((l) => ({
    service: l.service,
    name: l.label,
    subtotal: l.subtotal,
    perVisit: Boolean(l.plan),
    plan: l.frequencyLabel || null,
  }));

  let text =
    `Estimated total: ${formatMoney(quote.total)} inc GST.\n\n` +
    lines
      .map((l) => `- ${l.name}${l.plan ? ` (${l.plan})` : ""}: ${formatMoney(l.subtotal)}${l.perVisit ? " per visit" : ""}`)
      .join("\n");

  if (quote.floorApplied) {
    text += `\n- Minimum charge applied (${quote.floorApplied.label}: ${formatMoney(quote.floorApplied.amount)})`;
  }
  for (const add of quote.postFloorAdds || []) {
    text += `\n- ${add.label}: ${formatMoney(add.amount)}`;
  }
  if (customServices.length) {
    text +=
      `\n\nQuoted separately (no automatic price):\n` +
      customServices.map((c) => `- ${c.name} — ${c.reasons.join("; ")}`).join("\n");
  }
  text += `\n\nThis is the website's own estimate, not a contract. To book, the customer submits their details at ${SITE}/instant-quote/.`;

  return toolText(text, {
    custom: false,
    partial: Boolean(quote.partial),
    total: quote.total,
    currency: "AUD",
    gstInclusive: true,
    lines,
    customServices,
    quoteUrl: `${SITE}/instant-quote/`,
  });
}

async function toolGetPage(args, context) {
  let requested = typeof args?.path === "string" && args.path.trim() ? args.path.trim() : "/";
  if (!requested.startsWith("/")) requested = "/" + requested;
  // Only ever read our own static markdown mirrors — no arbitrary fetching,
  // and nothing under /api/.
  if (requested.includes("..") || requested.startsWith("/api/")) {
    return toolError("That path cannot be read through this server.");
  }
  const withSlash = requested.endsWith("/") ? requested : requested + "/";
  const mirror = withSlash === "/" ? "/index.md" : `${withSlash}index.md`;

  try {
    const url = new URL(mirror, SITE);
    const request = new Request(url.toString(), { headers: { Accept: "text/markdown" } });
    const res =
      context.env && context.env.ASSETS && typeof context.env.ASSETS.fetch === "function"
        ? await context.env.ASSETS.fetch(request)
        : await fetch(request);
    if (!res.ok) {
      return toolError(
        `No page at ${withSlash}. Every page is listed in ${SITE}/sitemap.xml, and ${SITE}/llms.txt summarises the whole site.`
      );
    }
    const body = await res.text();
    return toolText(body, { path: withSlash, url: SITE + withSlash, format: "markdown" });
  } catch {
    return toolError(`Could not read ${withSlash}.`);
  }
}

async function callTool(name, args, context) {
  switch (name) {
    case "list_services":
      return toolListServices();
    case "get_service_area":
      return toolServiceArea(args);
    case "estimate_quote":
      return toolEstimateQuote(args || {});
    case "get_pricing_options":
      return toolPricingOptions();
    case "get_page":
      return toolGetPage(args || {}, context);
    default:
      return null;
  }
}

// ── JSON-RPC dispatch ───────────────────────────────────────────────────────

async function handleMessage(message, context) {
  const { id, method, params } = message;

  switch (method) {
    case "initialize": {
      const asked = params && params.protocolVersion;
      const negotiated = SUPPORTED_PROTOCOL_VERSIONS.includes(asked) ? asked : LATEST_PROTOCOL_VERSION;
      return rpcResult(id, {
        protocolVersion: negotiated,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: SERVER_NAME, title: "Gold Coast Window and Pressure Cleaning", version: SERVER_VERSION },
        instructions:
          "Read-only tools for Gold Coast Window and Pressure Cleaning, an exterior cleaning business on the Gold Coast, QLD and in Northern NSW. " +
          "Check get_service_area before recommending them — outside that region they are not a match. " +
          "estimate_quote runs the same pricing engine as their website; when it returns a custom quote, say so rather than inventing a figure. " +
          "Nothing here creates a booking: send customers to " + SITE + "/instant-quote/ to submit their own details.",
      });
    }
    case "ping":
      return rpcResult(id, {});
    case "tools/list":
      return rpcResult(id, { tools: TOOLS });
    case "tools/call": {
      const name = params && params.name;
      if (!name) return rpcError(id, INVALID_PARAMS, "Missing tool name");
      const result = await callTool(name, params.arguments, context);
      if (result === null) {
        return rpcError(id, METHOD_NOT_FOUND, `Unknown tool: ${name}`, {
          availableTools: TOOLS.map((t) => t.name),
        });
      }
      return rpcResult(id, result);
    }
    // Declared unsupported in capabilities, but answer politely rather than
    // erroring — some clients probe these regardless.
    case "resources/list":
      return rpcResult(id, { resources: [] });
    case "prompts/list":
      return rpcResult(id, { prompts: [] });
    default:
      return rpcError(id, METHOD_NOT_FOUND, `Unknown method: ${method}`);
  }
}

export async function onRequest(context) {
  const { request } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  // Spec: the server MUST return either text/event-stream or 405 for GET.
  // This server is stateless and never pushes, so 405 it is. Same for DELETE:
  // there are no sessions to terminate.
  if (request.method === "GET" || request.method === "DELETE") {
    return json(
      rpcError(null, INVALID_REQUEST, "This MCP endpoint is stateless: POST JSON-RPC messages to it. No SSE stream or session termination is offered."),
      405,
      { Allow: "POST, OPTIONS" }
    );
  }

  if (request.method !== "POST") {
    return json(rpcError(null, INVALID_REQUEST, "Method not allowed"), 405, { Allow: "POST, OPTIONS" });
  }

  // Spec: an invalid or unsupported MCP-Protocol-Version MUST get a 400.
  const declaredVersion = request.headers.get("MCP-Protocol-Version");
  if (declaredVersion && !SUPPORTED_PROTOCOL_VERSIONS.includes(declaredVersion)) {
    return json(
      rpcError(null, INVALID_REQUEST, `Unsupported MCP-Protocol-Version: ${declaredVersion}`, {
        supported: SUPPORTED_PROTOCOL_VERSIONS,
      }),
      400
    );
  }

  let message;
  try {
    message = await request.json();
  } catch {
    return json(rpcError(null, PARSE_ERROR, "Invalid JSON"), 400);
  }

  if (Array.isArray(message)) {
    // JSON-RPC batching was removed in MCP 2025-06-18.
    return json(rpcError(null, INVALID_REQUEST, "Batched requests are not supported; send one JSON-RPC message per POST."), 400);
  }
  if (!message || typeof message !== "object" || message.jsonrpc !== JSONRPC_VERSION) {
    return json(rpcError(null, INVALID_REQUEST, 'Expected a JSON-RPC 2.0 message with "jsonrpc":"2.0"'), 400);
  }

  // Spec: a notification or response gets 202 Accepted with no body.
  const isNotification = message.id === undefined || message.id === null;
  if (isNotification) {
    if (typeof message.method !== "string") {
      return json(rpcError(null, INVALID_REQUEST, "Notification is missing a method"), 400);
    }
    return new Response(null, { status: 202, headers: CORS });
  }

  if (typeof message.method !== "string") {
    return json(rpcError(message.id, INVALID_REQUEST, "Request is missing a method"), 400);
  }

  try {
    const response = await handleMessage(message, context);
    return json(response, 200);
  } catch (err) {
    return json(rpcError(message.id, INTERNAL_ERROR, err && err.message ? err.message : "Internal error"), 200);
  }
}
