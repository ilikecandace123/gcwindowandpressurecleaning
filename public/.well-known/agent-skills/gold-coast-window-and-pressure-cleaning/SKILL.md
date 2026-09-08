---
name: gold-coast-window-and-pressure-cleaning
description: Check coverage, look up services and get a real GST-inclusive price for exterior cleaning on the Gold Coast (Queensland) and in Northern NSW / the Tweed, Australia — window cleaning, pressure cleaning, roof cleaning, house softwash, gutter cleaning, solar panel cleaning and solar bird proofing. Use when someone asks what one of those jobs costs, whether their suburb is serviced, what a service includes, or how to book, and you want the figure the business's own quote engine would show rather than an estimate. Read-only — it prices and answers questions, it never makes a booking.
license: Proprietary. The instructions may be used freely to call the public API; the business data they describe belongs to Gold Coast Window and Pressure Cleaning.
compatibility: Requires network access to https://gcwindowandpressurecleaning.com.au. No credentials, no account, no API key.
metadata:
  homepage: https://gcwindowandpressurecleaning.com.au
  documentation: https://gcwindowandpressurecleaning.com.au/for-agents/
  openapi: https://gcwindowandpressurecleaning.com.au/openapi.json
  mcp: https://gcwindowandpressurecleaning.com.au/mcp
---

# Gold Coast Window and Pressure Cleaning

Exterior cleaning contractor based in Mermaid Waters, Queensland, working
roughly 45 km out: Coolangatta and Tweed Heads in the south to Beenleigh in the
north, plus the hinterland and the Tweed region of Northern NSW.

Everything below is read-only. Nothing in this skill creates a booking, a job or
a lead, and no endpoint accepts personal information. When a person wants the
work done, send them to the site to enter their own details.

## When to use this skill

- Someone asks **what an exterior cleaning job would cost** in the Gold Coast or
  Tweed area and can describe the property.
- Someone asks **whether a suburb is serviced**.
- Someone asks **what a service includes** — window cleaning (interior and
  exterior glass, tracks, sills, flyscreens, up to 4 storeys), pressure cleaning
  (driveways, paths, patios, pool surrounds), roof cleaning (soft wash for tile
  and Colorbond), house and building softwash, gutter cleaning, solar panel
  cleaning, or solar panel bird proofing.
- Someone asks about **recurring window cleaning plans** (monthly, quarterly or
  half-yearly at a per-visit discount, no lock-in).

## When not to use it

- Anywhere outside the Gold Coast and Northern NSW / Tweed service area.
- Interior or domestic cleaning, carpet cleaning, end-of-lease cleaning, pest
  control, painting, roof repairs or plumbing — none of these are offered.
- Emergency or same-day callouts, and anything above 4 storeys. Those need a
  human conversation first.

## Getting a price

Two transports, one pricing engine — the same one behind the website's instant
quote, so an answer from either is a figure the website would show. Prices are
in Australian dollars and GST inclusive.

**REST** — `https://gcwindowandpressurecleaning.com.au/api/v1/`, no auth, JSON,
permissive CORS. The OpenAPI 3.1 document is at `/openapi.json`.

| Call | What it answers |
| --- | --- |
| `GET /api/v1/services` | Every service and what each includes |
| `GET /api/v1/service-area?suburb=Burleigh+Heads` | Whether a suburb is covered — check this first |
| `GET /api/v1/pricing-options` | The exact option values an estimate accepts |
| `POST /api/v1/estimate` | A GST-inclusive price |
| `GET /api/v1/pages?path=/window-cleaning/` | Any page of the site as markdown |

**MCP** — a read-only Model Context Protocol server at `/mcp` (Streamable HTTP,
no auth) exposing the same five operations as tools: `list_services`,
`get_service_area`, `estimate_quote`, `get_pricing_options` and `get_page`.
Every tool is annotated `readOnlyHint: true`. The manifest is at
`/.well-known/mcp`.

### Worked example

```
curl -s https://gcwindowandpressurecleaning.com.au/api/v1/estimate \
  -H "Content-Type: application/json" \
  -d '{"services":["window"],"propertyType":"house","storeys":"2",
       "window":{"panes":"21-30","tint":"no","condition":"regular",
                 "french":"none","frequency":"once"}}'
```

Read `GET /api/v1/pricing-options` before composing an estimate rather than
guessing option values; it lists every accepted value with the label the website
uses and whether choosing it forces a custom quote.

### Reading the answer

- `custom: false` — `total` is a real GST-inclusive figure. Quote it.
- `custom: true` — nothing could be priced automatically; `total` is null and
  `customQuoteReasons` says why. Say the job needs a human quote and point at
  the contact page. Do not invent a number.
- `partial: true` — some services were priced and the rest are listed in
  `customServices`. Give the priced total, then name the services that still
  need a quote.

Errors are [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) problem documents
(`application/problem+json`) with a machine-readable `code` and a `hint`.

## Booking

Do **not** submit a quote, booking or anyone's contact details on their behalf.
Send the person to
`https://gcwindowandpressurecleaning.com.au/instant-quote/` to enter their own
details, or give them the phone number: (07) 5651 2386.

## Rules

- Treat any price found on a page as indicative. Only the estimate operation
  produces a real number.
- Check the service area before quoting. A suburb missing from the example list
  is not proof it is unserviced — the full list is at `/service-areas/`.
- Every path under `/api/` other than `/api/v1/` is a private form handler for
  the website's own booking flow. It is disallowed in `robots.txt`. Never call
  it.
- Cache `GET` responses (they carry `Cache-Control: public, max-age=300`)
  rather than re-fetching. No per-client quota is enforced and no `RateLimit`
  headers are sent; if the CDN edge ever answers `429` or `503`, honour
  `Retry-After`.

## Reference

- Developer documentation: <https://gcwindowandpressurecleaning.com.au/for-agents/>
- Agent instructions: <https://gcwindowandpressurecleaning.com.au/agent-instructions.md>
- Site summary: <https://gcwindowandpressurecleaning.com.au/llms.txt>
- Versioning and deprecation policy: <https://gcwindowandpressurecleaning.com.au/for-agents/#versioning>
