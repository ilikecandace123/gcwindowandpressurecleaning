/**
 * Agent-facing discovery documents: the ARD catalog and the MCP server card.
 *
 * Two published standards, one source of truth. Both documents describe
 * resources this site already serves — the MCP server, the read-only REST API
 * and the Agent Skill — so both are generated from the same exports the
 * servers themselves use (TOOLS, SERVER_NAME, SERVER_VERSION) rather than
 * hand-copied. A tool renamed in functions/mcp.js is renamed here too, or the
 * tests fail.
 *
 * Nothing here is a new capability. These are descriptions of what already
 * exists, at the paths the specs reserve for them:
 *
 *   /.well-known/ard.json              Agentic Resource Discovery §5.1
 *   /.well-known/ai-catalog.json       ARD's predecessor path, same document
 *   /.well-known/mcp/server-card.json  MCP Server Card (SEP-2127, experimental)
 *   /mcp/server-card                   the SEP's own recommended location
 *
 * This module is deliberately free of node built-ins so functions/ can import
 * it; the build script passes the Agent Skill entries in, because reading them
 * needs the filesystem.
 */

import { SERVER_NAME, SERVER_VERSION, TOOLS } from "../../functions/mcp.js";

export const SITE = "https://gcwindowandpressurecleaning.com.au";
export const BUSINESS_NAME = "Gold Coast Window and Pressure Cleaning";
export const PUBLISHER_DOMAIN = "gcwindowandpressurecleaning.com.au";

export const MCP_URL = `${SITE}/mcp`;
export const MCP_WELL_KNOWN_URL = `${SITE}/.well-known/mcp`;
export const MCP_PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"];

export const ARD_PATH = "/.well-known/ard.json";
export const AI_CATALOG_PATH = "/.well-known/ai-catalog.json";
export const SERVER_CARD_PATH = "/.well-known/mcp/server-card.json";
// SEP-2127 reserves `GET <streamable-http-url>/server-card` as the recommended
// location for a card describing that endpoint. Serving both costs nothing and
// means a client that knows either convention finds the same document.
export const SERVER_CARD_ALIAS_PATH = "/mcp/server-card";

/**
 * The only Server Card schema URL the v1 shape permits (the schema pins it with
 * a regex), so it is a constant rather than a choice.
 */
export const SERVER_CARD_SCHEMA_URL = "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json";

/** IANA-style media types the ARD entries declare for each artifact. */
export const ARD_TYPES = {
  mcpServerCard: "application/mcp-server-card+json",
  openapi: "application/vnd.oai.openapi+json;version=3.1",
  skill: "application/ai-skill+md",
};

/**
 * ARD §4.5 trust manifest.
 *
 * ARD requires exactly one member — `identity` — and requires its trust domain
 * to match the `<publisher>` segment of the entry's URN (§4.5.1). That is the
 * whole claim being made here: these entries are published by this domain, over
 * TLS, from this origin. No attestations, provenance or signature are declared,
 * because none exist; an unverifiable compliance claim would be worse than none.
 */
export const TRUST_MANIFEST = Object.freeze({
  identity: `https://${PUBLISHER_DOMAIN}`,
  identityType: "https",
});

/** ARD §4.2 / Appendix C: urn:air:<publisher>:<namespace>:<name>. */
export function ardIdentifier(namespace, name) {
  return `urn:air:${PUBLISHER_DOMAIN}:${namespace}:${name}`;
}

/**
 * The MCP Server Card (SEP-2127 / modelcontextprotocol/ext-server-card v1).
 *
 * The `$schema`, `name`, `version` and `description` members are the four the
 * v1 schema requires; `remotes` carries the transport metadata. The card shape
 * is open (the schema does not set additionalProperties: false), so the
 * widely-published `serverUrl` / `transport` / `authentication` / `tools`
 * members are included as well: the extension leaves tool listings to a runtime
 * tools/list, but a static card that names the tools lets a client decide
 * whether to open a connection at all. Every one of them is generated from
 * TOOLS, so the card cannot advertise a tool the server does not implement.
 */
export function buildServerCard() {
  return {
    $schema: SERVER_CARD_SCHEMA_URL,
    name: `${PUBLISHER_DOMAIN}/${SERVER_NAME}`,
    title: BUSINESS_NAME,
    // The v1 schema caps `description` at 100 characters, so the full
    // read-only statement lives in `_meta` rather than being truncated here.
    description: "Read-only exterior-cleaning tools: services, service area, page markdown and real price estimates.",
    version: SERVER_VERSION,
    websiteUrl: `${SITE}/`,
    icons: [{ src: `${SITE}/images/icon-512.png`, mimeType: "image/png", sizes: ["512x512"] }],
    remotes: [
      {
        type: "streamable-http",
        url: MCP_URL,
        supportedProtocolVersions: MCP_PROTOCOL_VERSIONS,
      },
      {
        type: "streamable-http",
        url: MCP_WELL_KNOWN_URL,
        supportedProtocolVersions: MCP_PROTOCOL_VERSIONS,
      },
    ],
    // Open members, for clients that read a card rather than a `remotes` array.
    serverUrl: MCP_URL,
    transport: "streamable-http",
    authentication: "none",
    readOnly: true,
    documentationUrl: `${SITE}/for-agents/#mcp`,
    tools: TOOLS.map((tool) => ({
      name: tool.name,
      title: tool.title,
      description: tool.description,
      inputSchema: tool.inputSchema,
      annotations: tool.annotations,
    })),
    _meta: {
      "au.com.gcwindowandpressurecleaning/about": {
        longDescription:
          "Read-only MCP tools for a Gold Coast (QLD, Australia) exterior cleaning business: list the services offered, check whether a suburb is in the service area, fetch any page as markdown, and price a job with the same engine that powers the website's instant quote. No tool creates a booking, a job or any other record, and none accepts personal information.",
      },
      "au.com.gcwindowandpressurecleaning/surfaces": {
        restApi: `${SITE}/api/v1/`,
        openapi: `${SITE}/openapi.json`,
        apiCatalog: `${SITE}/.well-known/api-catalog`,
        mcpManifest: MCP_WELL_KNOWN_URL,
      },
    },
  };
}

/**
 * The ARD manifest published at /.well-known/ard.json (ARD §5.1).
 *
 * One entry per agentic resource actually served here. `skills` comes from the
 * build script, which reads the SKILL.md files off disk; passing it in keeps
 * this module importable from a Cloudflare Function.
 */
export function buildArdCatalog({ skills = [] } = {}) {
  const entries = [
    {
      identifier: ardIdentifier("server", SERVER_NAME),
      displayName: `${BUSINESS_NAME} — MCP server`,
      type: ARD_TYPES.mcpServerCard,
      url: `${SITE}${SERVER_CARD_PATH}`,
      version: SERVER_VERSION,
      description:
        "Read-only Model Context Protocol server for a Gold Coast (QLD, Australia) exterior cleaning business. Lists services, checks the service area, returns any page as markdown, and prices a job with the website's own quote engine. Creates nothing and accepts no personal information.",
      capabilities: TOOLS.map((tool) => tool.name),
      tags: ["cleaning", "home-services", "gold-coast", "australia", "read-only", "mcp"],
      representativeQueries: [
        "how much does window cleaning cost on the Gold Coast",
        "do they clean roofs in Burleigh Heads",
        "price a house wash and gutter clean for a four bedroom home",
        "what does solar panel cleaning include",
      ],
      trustManifest: TRUST_MANIFEST,
    },
    {
      identifier: ardIdentifier("api", "public-rest-v1"),
      displayName: `${BUSINESS_NAME} — public REST API v1`,
      type: ARD_TYPES.openapi,
      url: `${SITE}/openapi.json`,
      version: SERVER_VERSION,
      description:
        "OpenAPI 3.1 description of the public, read-only REST API at /api/v1/ — services, service area, pricing options, page markdown and job estimates. No authentication, permissive CORS, RFC 9457 problem documents on error. The same operations as the MCP server, over plain HTTP.",
      capabilities: ["listServices", "getServiceArea", "getPricingOptions", "estimateQuote", "getPageMarkdown"],
      tags: ["cleaning", "home-services", "gold-coast", "australia", "read-only", "openapi", "rest"],
      representativeQueries: [
        "estimate an exterior cleaning job on the Gold Coast over HTTP",
        "which suburbs does this Gold Coast cleaning business serve",
        "list the cleaning services and what each one includes",
      ],
      trustManifest: TRUST_MANIFEST,
    },
    ...skills.map((skill) => ({
      identifier: ardIdentifier("skill", skill.name),
      displayName: `${BUSINESS_NAME} — Agent Skill`,
      type: ARD_TYPES.skill,
      url: skill.url.startsWith("http") ? skill.url : `${SITE}${skill.url}`,
      description: skill.description,
      tags: ["cleaning", "home-services", "gold-coast", "australia", "agent-skill"],
      representativeQueries: [
        "quote an exterior clean on the Gold Coast without guessing the price",
        "check whether a Gold Coast suburb is covered before recommending a cleaner",
      ],
      trustManifest: TRUST_MANIFEST,
    })),
  ];

  return { entries };
}
