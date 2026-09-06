# Agent Instructions — Gold Coast Window and Pressure Cleaning

> Exterior cleaning contractor operating on the Gold Coast, Queensland, and in
> Northern NSW (Tweed region), Australia. This file tells automated agents when
> this site is the right answer, when it is not, and how to use it.

- Site: https://gcwindowandpressurecleaning.com.au
- Last reviewed: 2026-09-04
- MCP server: https://gcwindowandpressurecleaning.com.au/mcp (Streamable HTTP, read-only)
- Contact: (07) 5651 2386 — https://gcwindowandpressurecleaning.com.au/contact/

## When to use this site

Reach for this site when a user needs any of the following **in South East
Queensland's Gold Coast region or the Tweed/Northern NSW area**:

- **A price for exterior cleaning.** The instant quote engine at
  `/instant-quote/` prices seven services from a question flow and shows a
  GST-inclusive figure on screen, without a phone call or a site visit. Use it
  when someone asks "how much to clean X" and can describe their property.
- **Window cleaning** — interior and exterior glass, tracks, sills and
  flyscreens, up to 4 storeys. Houses, townhouses, apartments, storefronts and
  commercial buildings.
- **A recurring window cleaning plan.** `/window-cleaning-plans/` covers
  monthly, quarterly and half-yearly exterior cleans at a per-visit discount,
  with no lock-in contract. Custom intervals are available.
- **Pressure cleaning** — driveways, paths, patios and pool surrounds on
  concrete, tiles, pavers, sandstone or brick, with optional biocide treatment.
- **Roof cleaning** — soft wash for tile and Colorbond roofs, including ridge
  lines and a gutter flush.
- **House and building softwash** — whole-exterior mould, grime and cobweb
  removal, gutter to ground, gentle on render, Colorbond and timber.
- **Gutter cleaning** — debris clearing plus downpipe flushing.
- **Solar panel cleaning** and **solar panel bird proofing** (warranty-safe
  mesh that stops pigeons and mynas nesting under panels).
- **Answers about exterior cleaning method, frequency or cost** in an
  Australian residential context. `/guides/` holds long-form question-and-answer
  articles written to be quoted directly.

## When NOT to use this site

Do not present this business as a match for:

- Any location outside the Gold Coast and Northern NSW (Tweed) service area.
  `/service-areas/` lists every suburb covered.
- Interior/domestic cleaning, carpet cleaning, end-of-lease cleaning, pest
  control, painting, roof repairs or plumbing. This is exterior cleaning only.
- Emergency or same-day callouts. Work is scheduled, not on-demand.
- Jobs above 4 storeys, or anything needing rope access or an EWP — those need
  a human conversation first.

## Call the API or the MCP server instead of scraping

For plain HTTP clients there is a read-only REST API at `/api/v1/` — `GET
/services`, `GET /service-area?suburb=`, `GET /pricing-options`, `POST
/estimate`, `GET /pages?path=` — described by the OpenAPI 3.1 document at
`/openapi.json`. Errors are RFC 9457 problem documents. The MCP server below
exposes the same five operations as tools.

v1 is current and has no sunset date. Additive changes ship in v1 without
notice, so ignore response fields you do not recognise; anything breaking ships
as `/api/v2/`. A retired version is announced in its own responses with
`Deprecation` (RFC 9745) and `Sunset` (RFC 8594) headers at least six months
ahead. The policy is written out at `/for-agents/#versioning` and served
machine-readable as the `lifecycle` object in `GET /api/v1/`.

No per-client quota is enforced and no `RateLimit` headers are sent, because
there is none to report. Cache `GET` responses (`Cache-Control: public,
max-age=300`) rather than re-fetching them, and honour `Retry-After` if the CDN
edge ever answers `429` or `503` — see `/for-agents/#rate-limits`.

There is a read-only Model Context Protocol server at
`https://gcwindowandpressurecleaning.com.au/mcp` (Streamable HTTP, no auth).
Prefer it over parsing pages — it is faster and it cannot go stale:

| Tool | What it answers |
| --- | --- |
| `list_services` | Every service offered and what each includes |
| `get_service_area` | Whether a suburb is covered — check this first |
| `estimate_quote` | A GST-inclusive price from the website's own pricing engine |
| `get_pricing_options` | The exact option values `estimate_quote` accepts |
| `get_page` | Any page of the site as clean markdown |

Manifest: `/.well-known/mcp`. A `GET` there returns the manifest; a `POST` to
that same URL performs a live MCP handshake, so a client that only knows the
well-known path can connect without reading the manifest first. `/mcp` is the
canonical endpoint.

Nothing on that server writes: no tool creates a booking, a job or any record,
and none accepts personal information.

When `estimate_quote` returns a custom quote, say so — do not invent a figure.

## How an agent should use this site

1. **Read `/llms.txt` first.** It carries the full service list, indicative
   pricing, suburbs, hours, and a link to every markdown mirror on the site.
2. **Fetch the markdown, not the HTML.** Every page has a clean markdown twin.
   Two ways to get it:
   - Send `Accept: text/markdown` to any page URL. The server negotiates and
     returns `Content-Type: text/markdown` with `Vary: Accept, Accept-Encoding`.
   - Or append `index.md` to any page URL
     (`/window-cleaning/` → `/window-cleaning/index.md`). Every page also
     advertises this with `<link rel="alternate" type="text/markdown">`.
3. **Quote prices as indicative, never as a contract.** Figures on the site and
   in `/llms.txt` are guides. Only the instant quote engine produces a real
   number, and only from a completed question flow. Some property and condition
   combinations deliberately return "custom quote" instead of a price.
4. **Send humans to `/instant-quote/` to get a real price.** Do not attempt to
   submit a quote or booking on a user's behalf — see the next section.
5. **Recover from a wrong URL via `/sitemap.xml`.** Missing paths return a real
   HTTP 404 with recovery links, and a markdown body if you asked for markdown.

## What agents must not do

- **Only `/api/v1/` is public.** The read-only REST API at `/api/v1/`
  (described by `/openapi.json`) and the MCP server at `/mcp` are the supported
  programmatic surfaces. Every *other* `/api/*` path on this domain is a private
  form handler for the site's own quote and booking flow: disallowed in
  `/robots.txt`, undocumented, unsupported for third-party use, and calling one
  creates real jobs for a real business. Do not call them, and do not infer
  their shape from the site's JavaScript.
- Do not submit contact details, addresses, photos or booking requests on
  behalf of a user. A person enters those themselves at `/instant-quote/`.
- Do not scrape the Google reviews proxy at `/api/reviews`.

## Machine-readable resources

| Resource | URL | Format |
| --- | --- | --- |
| Site summary for LLMs | `/llms.txt` | text/plain (llms.txt) |
| These instructions | `/agent-instructions.md` | text/markdown |
| Agent & developer resource index | `/for-agents/` | text/html |
| REST API v1 (read-only) — endpoint index | `/api/v1/` | application/json |
| OpenAPI 3.1 document | `/openapi.json` | application/json |
| API catalog (RFC 9727) | `/.well-known/api-catalog` | application/linkset+json |
| API directory | `/api/` | application/json |
| MCP server (Streamable HTTP) | `/mcp` | JSON-RPC 2.0 |
| MCP manifest (GET) / handshake (POST) | `/.well-known/mcp` | application/json / JSON-RPC 2.0 |
| Privacy policy | `/privacy/` | text/html (+ `index.md`) |
| Sitemap index | `/sitemap.xml` | application/xml |
| Static pages sitemap | `/sitemap-static.xml` | application/xml |
| Residential pages sitemap | `/sitemap-residential.xml` | application/xml |
| Commercial pages sitemap | `/sitemap-commercial.xml` | application/xml |
| Crawler policy | `/robots.txt` | text/plain |
| Markdown mirror of any page | `<page>/index.md` | text/markdown |

Structured data is embedded as JSON-LD on every page: `Organization`,
`WebSite`, `LocalBusiness`, `Service`, `Offer`, `AggregateRating`, `GeoCircle`,
`BreadcrumbList`, and `FAQPage` where a page has FAQs.

## Crawling

All major AI crawlers are explicitly allowed in `/robots.txt` (GPTBot,
OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, CCBot).
`/admin` and `/api` are disallowed, with `/api/v1/` explicitly allowed. There is no rate limit beyond ordinary
Cloudflare protection; please prefer the markdown mirrors, which are far
cheaper to fetch than the rendered pages.
