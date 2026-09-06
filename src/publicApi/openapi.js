/**
 * OpenAPI 3.1 description of the public, read-only REST API at /api/v1/.
 *
 * One object, three places: served live at /api/v1/openapi.json by the
 * Function, written to /openapi.json at build time (scripts/write-openapi.mjs),
 * and listed in /.well-known/api-catalog (RFC 9727). Keep it here — never
 * hand-edit a generated copy.
 *
 * The estimate request schema is the MCP tool's input schema verbatim, so the
 * two transports can never drift apart. OpenAPI 3.1 schemas ARE JSON Schema
 * 2020-12, which is what the MCP tool declares, so no translation is needed.
 */

import { TOOLS, SERVER_VERSION } from "../../functions/mcp.js";
import { LIFECYCLE } from "./http.js";

const SITE = "https://gcwindowandpressurecleaning.com.au";
const DOCS = `${SITE}/for-agents/#rest-api`;

const tool = (name) => TOOLS.find((t) => t.name === name);

const PROBLEM_SCHEMA = {
  type: "object",
  description: "RFC 9457 Problem Details. Every error response uses this shape with Content-Type application/problem+json.",
  required: ["type", "title", "status", "detail", "code"],
  properties: {
    type: { type: "string", format: "uri", description: "Stable URI identifying the problem class." },
    title: { type: "string", description: "Short human-readable summary of the problem class." },
    status: { type: "integer", description: "HTTP status code, repeated in the body." },
    detail: { type: "string", description: "What went wrong for this specific request." },
    instance: { type: "string", description: "The request path that produced the error." },
    code: {
      type: "string",
      description: "Machine-readable error code.",
      enum: ["not_found", "method_not_allowed", "invalid_json", "invalid_request", "unsupported_media_type", "unpriceable", "internal_error"],
    },
    hint: { type: "string", description: "What to do instead." },
    docs: { type: "string", format: "uri", description: "Where the endpoint is documented." },
    allowed: { type: "array", items: { type: "string" }, description: "Present on 405: the methods the resource does accept." },
    availableEndpoints: { type: "array", items: { type: "string" }, description: "Present on 404: every path this API serves." },
  },
};

const problem = (description) => ({
  description,
  content: { "application/problem+json": { schema: { $ref: "#/components/schemas/Problem" } } },
});

/**
 * Errors any operation can return, added to every operation below.
 *
 * A function-calling client generates its error handling from the document, so
 * an operation that only documents its happy path leaves the caller guessing
 * what a non-200 body looks like. Every operation here answers the same way —
 * an RFC 9457 problem document — so every operation says so.
 */
const UNIVERSAL_ERRORS = {
  405: problem("The method is not supported on this resource. The response carries an `Allow` header and an `allowed` list; `code` is `method_not_allowed`."),
  500: problem("Something failed inside the API. `code` is `internal_error`. Retry once; the MCP server at " + SITE + "/mcp serves the same operations."),
};

/**
 * Marks every operation as safe to call without asking the user first.
 *
 * OpenAI's GPT Actions treat an undeclared POST as consequential and interrupt
 * the user for confirmation. Nothing in this API writes, so the declaration is
 * true for every operation — including POST /estimate, which only prices a
 * hypothetical job. Delete it the day an operation starts creating anything.
 */
const READ_ONLY_MARKER = { "x-openai-isConsequential": false };

const SERVICE_SCHEMA = {
  type: "object",
  required: ["id", "name", "includes", "url"],
  properties: {
    id: { type: "string", description: "Service key, as accepted by the `services` array of an estimate request.", example: "window" },
    name: { type: "string", example: "Window Cleaning" },
    tagline: { type: "string" },
    includes: { type: "string", description: "What the service covers." },
    url: { type: "string", format: "uri", description: "The page describing the service." },
  },
};

const OPTION_SCHEMA = {
  type: "object",
  required: ["value", "label", "customQuote"],
  properties: {
    value: { type: "string", description: "The value to send." },
    label: { type: "string", description: "How the website labels it." },
    customQuote: { type: "boolean", description: "True when choosing this value means the job cannot be priced automatically." },
  },
};

const FREQUENCY_SCHEMA = {
  type: "object",
  required: ["value", "label", "discountPerVisit"],
  properties: {
    value: { type: "string" },
    label: { type: "string" },
    discountPerVisit: { type: "number", description: "AUD taken off every visit on that plan." },
  },
};

export function buildOpenApi() {
  const doc = {
    openapi: "3.1.0",
    info: {
      title: "Gold Coast Window and Pressure Cleaning API",
      version: SERVER_VERSION,
      summary: "Read-only API for a Gold Coast exterior cleaning business: services, service area, and price estimates from the website's own quote engine.",
      description:
        "A small, public, read-only REST API for Gold Coast Window and Pressure Cleaning (Gold Coast, QLD and Northern NSW, Australia). " +
        "It answers what the business cleans, where it travels, and what a job would cost — priced by the same engine that powers the website's instant quote, so a client can never quote a figure the website wouldn't.\n\n" +
        "**Read-only by design.** No operation creates a booking, a job, a lead or any other record, and none accepts personal information. " +
        "To book, a customer submits their own details at " + SITE + "/instant-quote/.\n\n" +
        "No authentication, no API key. Permissive CORS. Every error is an RFC 9457 problem document (`application/problem+json`) with a machine-readable `code` and a `hint`. " +
        "The same five operations are also available as MCP tools at " + SITE + "/mcp.\n\n" +
        "**Versioning.** The version is in the path (`/api/v1/`). This version is current and carries no sunset date. " +
        "Additive changes — new endpoints, new response fields, new option values — can appear in v1 without notice, so ignore fields you do not recognise; " +
        "anything breaking ships as `/api/v2/` instead. If v1 is ever retired, responses will carry `Deprecation` (RFC 9745) and `Sunset` (RFC 8594) headers " +
        "at least " + LIFECYCLE.minimumNoticeMonths + " months before it stops answering. Policy: " + LIFECYCLE.policy + "\n\n" +
        "**Rate limits.** No per-client quota is enforced and no `RateLimit` headers are sent, because there is no quota to report — this API would rather be honest than advertise a limit it does not apply. " +
        "Successful GET responses are cacheable for five minutes (`Cache-Control: public, max-age=300`); cache them rather than re-fetching. " +
        "Abusive traffic can still be throttled at the CDN edge, which answers `429` or `503` with a `Retry-After` header and an edge error page rather than a problem document — honour `Retry-After` and back off.\n\n" +
        "Other paths under `/api/` on this domain are private form handlers for the website itself and are not part of this API.",
      termsOfService: `${SITE}/privacy/`,
      contact: {
        name: "Gold Coast Window and Pressure Cleaning",
        url: `${SITE}/contact/`,
        email: "gcwindowandpressure@gmail.com",
      },
      "x-logo": { url: `${SITE}/images/icon-512.png`, altText: "Gold Coast Window and Pressure Cleaning" },
      // The same lifecycle object the /api/v1/ index and the /api directory
      // serve, so the three can never disagree about whether v1 is current.
      "x-api-lifecycle": LIFECYCLE,
    },
    externalDocs: { description: "Developer documentation", url: DOCS },
    servers: [{ url: `${SITE}/api/v1`, description: "Production" }],
    tags: [
      { name: "Catalogue", description: "What the business offers and where." },
      { name: "Pricing", description: "Estimates from the website's own pricing engine." },
      { name: "Content", description: "Site pages as markdown." },
      { name: "Meta", description: "About this API." },
    ],
    paths: {
      "/": {
        get: {
          operationId: "getApiIndex",
          tags: ["Meta"],
          summary: "API index",
          description: "Lists every endpoint in this version with its method, purpose and documentation link. A good first call for a client discovering the API.",
          responses: {
            200: {
              description: "The endpoint index.",
              content: { "application/json": { schema: { $ref: "#/components/schemas/ApiIndex" } } },
            },
          },
        },
      },
      "/openapi.json": {
        get: {
          operationId: "getOpenApiDocument",
          tags: ["Meta"],
          summary: "This OpenAPI document",
          description: "Returns this OpenAPI 3.1 description. The same document is served statically at " + SITE + "/openapi.json.",
          responses: {
            200: {
              description: "The OpenAPI document.",
              content: { "application/json": { schema: { $ref: "#/components/schemas/OpenApiDocument" } } },
            },
          },
        },
      },
      "/services": {
        get: {
          operationId: "listServices",
          tags: ["Catalogue"],
          summary: "List cleaning services",
          description: tool("list_services").description,
          responses: {
            200: {
              description: "Every service offered.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["services"],
                    properties: { services: { type: "array", items: { $ref: "#/components/schemas/Service" } } },
                  },
                },
              },
            },
          },
        },
      },
      "/service-area": {
        get: {
          operationId: "getServiceArea",
          tags: ["Catalogue"],
          summary: "Get service area",
          description: tool("get_service_area").description,
          parameters: [
            {
              name: "suburb",
              in: "query",
              required: false,
              description: "Optional suburb to sanity-check against the service area.",
              schema: { type: "string", maxLength: 80 },
              example: "Burleigh Heads",
            },
          ],
          responses: {
            200: {
              description: "The service area, and the result of the optional suburb check.",
              content: { "application/json": { schema: { $ref: "#/components/schemas/ServiceArea" } } },
            },
          },
        },
      },
      "/pricing-options": {
        get: {
          operationId: "getPricingOptions",
          tags: ["Pricing"],
          summary: "Get valid pricing inputs",
          description: tool("get_pricing_options").description.replace("estimate_quote", "the estimate operation"),
          responses: {
            200: {
              description: "Every option value the estimate operation accepts, with the website's labels and whether each forces a custom quote.",
              content: { "application/json": { schema: { $ref: "#/components/schemas/PricingOptions" } } },
            },
          },
        },
      },
      "/estimate": {
        post: {
          operationId: "estimateQuote",
          tags: ["Pricing"],
          summary: "Estimate a cleaning quote",
          description: tool("estimate_quote").description,
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EstimateRequest" },
                examples: {
                  windows: {
                    summary: "Exterior windows on a two-storey house",
                    value: {
                      services: ["window"],
                      propertyType: "house",
                      storeys: "2",
                      window: { panes: "21-30", tint: "no", condition: "regular", french: "none", frequency: "once" },
                    },
                  },
                  roofAndGutters: {
                    summary: "Roof and gutters on a four-bedroom single-storey home",
                    value: {
                      services: ["roof", "gutter"],
                      propertyType: "house",
                      storeys: "1",
                      bedrooms: "4",
                      roofPitch: "moderate",
                      roof: { roofType: "tile", condition: "light", biocide: false },
                      gutter: { gutterGuard: "no", condition: "leaves" },
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description:
                "An estimate. `custom: false` means `total` is a GST-inclusive AUD figure; `custom: true` means the whole job needs a human quote and `total` is null. `partial: true` means some services were priced and the rest are listed in `customServices`.",
              content: { "application/json": { schema: { $ref: "#/components/schemas/Estimate" } } },
            },
            400: problem("The request body was not valid JSON, named no valid service, or the pricing engine rejected the inputs. `code` is `invalid_json`, `invalid_request` or `unpriceable`."),
            415: problem("The request did not declare `Content-Type: application/json`."),
          },
        },
      },
      "/pages": {
        get: {
          operationId: "getPageMarkdown",
          tags: ["Content"],
          summary: "Fetch a page as markdown",
          description: tool("get_page").description,
          parameters: [
            {
              name: "path",
              in: "query",
              required: false,
              description: "Site path, e.g. `/window-cleaning/` or `/guides/`. Defaults to the home page. Paths under `/api/` cannot be read.",
              schema: { type: "string", maxLength: 300, default: "/" },
              example: "/window-cleaning/",
            },
          ],
          responses: {
            200: {
              description: "The page as markdown.",
              content: { "application/json": { schema: { $ref: "#/components/schemas/PageMarkdown" } } },
            },
            404: problem("No page exists at that path. Every page is listed in /sitemap.xml."),
          },
        },
      },
    },
    components: {
      schemas: {
        Problem: PROBLEM_SCHEMA,
        OpenApiDocument: {
          type: "object",
          description: "An OpenAPI 3.1 document — this one. Described rather than left as a bare object so a generated client knows the shape it is getting.",
          required: ["openapi", "info", "paths", "components"],
          properties: {
            openapi: { type: "string", const: "3.1.0" },
            info: {
              type: "object",
              required: ["title", "version", "description"],
              properties: {
                title: { type: "string" },
                version: { type: "string", description: "The document's version, which tracks the API implementation." },
                summary: { type: "string" },
                description: { type: "string" },
                termsOfService: { type: "string", format: "uri" },
                contact: { type: "object", properties: { name: { type: "string" }, url: { type: "string", format: "uri" }, email: { type: "string" } } },
                "x-api-lifecycle": { $ref: "#/components/schemas/Lifecycle" },
              },
            },
            externalDocs: { type: "object", properties: { description: { type: "string" }, url: { type: "string", format: "uri" } } },
            servers: { type: "array", items: { type: "object", properties: { url: { type: "string", format: "uri" }, description: { type: "string" } } } },
            tags: { type: "array", items: { type: "object", properties: { name: { type: "string" }, description: { type: "string" } } } },
            paths: { type: "object", description: "Path item objects keyed by path, relative to the server URL.", additionalProperties: { type: "object" } },
            components: { type: "object", description: "Reusable schemas referenced from the path items.", additionalProperties: { type: "object" } },
          },
        },
        Lifecycle: {
          type: "object",
          description: "This API version's published versioning and deprecation policy. The same object is served at GET /api/v1/ and GET /api/.",
          required: ["version", "status", "deprecated", "sunset", "policy"],
          properties: {
            version: { type: "string", description: "The path version this document describes.", example: "v1" },
            status: { type: "string", enum: ["current", "deprecated", "sunset"], description: "Where this version sits in its life." },
            deprecated: { type: "boolean", description: "True once the version is deprecated; responses then also carry a Deprecation header (RFC 9745)." },
            sunset: {
              type: ["string", "null"],
              format: "date-time",
              description: "The date the version stops answering, once one is set; also sent as a Sunset header (RFC 8594). Null while none exists.",
            },
            versioningScheme: { type: "string", description: "How the version is expressed.", example: "url-path" },
            minimumNoticeMonths: { type: "integer", description: "Least notice given between deprecation and sunset." },
            breakingChangePolicy: { type: "string", description: "What counts as breaking, and what does not." },
            deprecationSignals: { type: "array", items: { type: "string" }, description: "The headers a client should watch for." },
            policy: { type: "string", format: "uri", description: "The policy written out in full." },
          },
        },
        ApiIndex: {
          type: "object",
          required: ["name", "version", "baseUrl", "openapi", "docs", "readOnly", "endpoints"],
          properties: {
            name: { type: "string" },
            version: { type: "string" },
            baseUrl: { type: "string", format: "uri" },
            openapi: { type: "string", format: "uri" },
            docs: { type: "string", format: "uri" },
            mcp: { type: "string", format: "uri", description: "The MCP server exposing the same operations as tools." },
            readOnly: { type: "boolean", const: true },
            authentication: { type: "string", const: "none" },
            lifecycle: { $ref: "#/components/schemas/Lifecycle" },
            note: { type: "string" },
            endpoints: {
              type: "array",
              items: {
                type: "object",
                required: ["method", "path", "operationId", "summary"],
                properties: {
                  method: { type: "string" },
                  path: { type: "string" },
                  operationId: { type: "string" },
                  summary: { type: "string" },
                },
              },
            },
          },
        },
        Service: SERVICE_SCHEMA,
        ServiceArea: {
          type: "object",
          required: ["region", "base", "radiusKm", "note", "exampleSuburbs", "fullListUrl"],
          properties: {
            region: { type: "string" },
            base: { type: "string", description: "Where the crew starts from." },
            radiusKm: { type: "integer" },
            note: { type: "string" },
            exampleSuburbs: { type: "array", items: { type: "string" }, description: "A sample, not the full list." },
            fullListUrl: { type: "string", format: "uri", description: "The complete suburb list." },
            querySuburb: { type: "string", description: "Echo of the `suburb` parameter, when given." },
            matchedExampleSuburb: {
              type: "boolean",
              description: "Whether `querySuburb` is in the example list. False is NOT proof the suburb is unserviced — check `fullListUrl`.",
            },
          },
        },
        PricingOptions: {
          type: "object",
          required: ["paneBands", "solarPanelBands", "pressureAreaSizes", "windowFrequencies", "solarFrequencies"],
          properties: {
            paneBands: { type: "array", items: { $ref: "#/components/schemas/Option" } },
            solarPanelBands: { type: "array", items: { $ref: "#/components/schemas/Option" } },
            pressureAreaSizes: {
              type: "object",
              description: "Keyed by pressure-cleaning area (driveway, pool, patio, pathways).",
              additionalProperties: { type: "array", items: { $ref: "#/components/schemas/Option" } },
            },
            windowFrequencies: { type: "array", items: { $ref: "#/components/schemas/Frequency" } },
            solarFrequencies: { type: "array", items: { $ref: "#/components/schemas/Frequency" } },
          },
        },
        Option: OPTION_SCHEMA,
        Frequency: FREQUENCY_SCHEMA,
        EstimateRequest: tool("estimate_quote").inputSchema,
        EstimateLine: {
          type: "object",
          required: ["service", "name", "subtotal", "perVisit"],
          properties: {
            service: { type: "string" },
            name: { type: "string" },
            subtotal: { type: "number", description: "AUD, GST inclusive." },
            perVisit: { type: "boolean", description: "True when the figure is per visit on a recurring plan." },
            plan: { type: ["string", "null"], description: "The plan frequency label, when on a plan." },
          },
        },
        CustomService: {
          type: "object",
          required: ["service", "name", "reasons"],
          properties: {
            service: { type: "string" },
            name: { type: "string" },
            reasons: { type: "array", items: { type: "string" }, description: "Why this service could not be priced automatically." },
          },
        },
        Estimate: {
          type: "object",
          required: ["custom", "total", "customServices", "quoteUrl"],
          properties: {
            custom: { type: "boolean", description: "True when nothing could be priced automatically." },
            partial: { type: "boolean", description: "True when some services were priced and others need a custom quote." },
            total: { type: ["number", "null"], description: "GST-inclusive AUD total of the priced services, or null when `custom` is true." },
            currency: { type: "string", const: "AUD" },
            gstInclusive: { type: "boolean", const: true },
            lines: { type: "array", items: { $ref: "#/components/schemas/EstimateLine" } },
            customServices: { type: "array", items: { $ref: "#/components/schemas/CustomService" } },
            customQuoteReasons: { type: "array", items: { type: "string" }, description: "Present when `custom` is true." },
            summary: { type: "string", description: "The estimate written out in plain English, suitable to show a customer." },
            quoteUrl: { type: "string", format: "uri", description: "Where a customer submits their own details to book." },
          },
        },
        PageMarkdown: {
          type: "object",
          required: ["path", "url", "format", "markdown"],
          properties: {
            path: { type: "string" },
            url: { type: "string", format: "uri" },
            format: { type: "string", const: "markdown" },
            markdown: { type: "string", description: "The page content as markdown." },
          },
        },
      },
    },
  };

  // Applied here rather than repeated on every operation above: each one gets
  // the universal error responses and the read-only declaration, and none can
  // be added later without them.
  for (const item of Object.values(doc.paths)) {
    for (const operation of Object.values(item)) {
      Object.assign(operation, READ_ONLY_MARKER);
      operation.responses = { ...operation.responses, ...UNIVERSAL_ERRORS };
    }
  }

  return doc;
}
