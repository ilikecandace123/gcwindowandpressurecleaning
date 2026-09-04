/**
 * Markdown content negotiation (acceptmarkdown.com / RFC 9110 §12.5.1).
 *
 * Every page on this site is built with a clean markdown twin beside it
 * (`/window-cleaning/` -> `/window-cleaning/index.md`, written by
 * scripts/generate_markdown_mirrors.py). This middleware wires those mirrors up
 * to proper HTTP content negotiation so an agent can just say what it wants:
 *
 *   curl -H "Accept: text/markdown" https://gcwindowandpressurecleaning.com.au/
 *
 * Behaviour:
 *   - `Accept` is parsed with q-values; the highest-q acceptable type wins, and
 *     ties break in favour of the more specific media range.
 *   - When markdown wins and a mirror exists -> 200 text/markdown.
 *   - When markdown wins on a path that has no mirror -> the HTML is served
 *     (a representation the client also accepts), rather than a spurious 406.
 *   - When neither HTML nor markdown is acceptable -> 406 Not Acceptable, with
 *     a short markdown body listing what we can serve.
 *   - 404s get a markdown recovery body when markdown was requested.
 *   - Every negotiable response carries `Vary: Accept, Accept-Encoding` so a
 *     CDN can never hand the HTML variant to a client that asked for markdown.
 *
 * Deliberately untouched: /api/* (private form handlers), and any request for a
 * concrete file (assets, images, .md, .xml, .txt) — those are served as-is.
 */

const MARKDOWN_TYPES = ["text/markdown", "text/x-markdown"];
const HTML_TYPES = ["text/html", "application/xhtml+xml"];
const MD_CONTENT_TYPE = "text/markdown; charset=utf-8";
const VARY = "Accept, Accept-Encoding";

/** Paths this middleware never touches. */
function isPassThrough(pathname) {
  if (pathname.startsWith("/api/")) return true;
  if (pathname.startsWith("/assets/")) return true;
  if (pathname.startsWith("/images/")) return true;
  // Anything with a file extension is a concrete resource, not a negotiable page.
  const last = pathname.split("/").pop();
  return Boolean(last && last.includes("."));
}

/**
 * Parse an Accept header into media ranges ordered by q, then specificity.
 * Returns [] for a missing/empty header (meaning "no preference expressed").
 */
export function parseAccept(header) {
  if (!header || !header.trim()) return [];
  return header
    .split(",")
    .map((part, index) => {
      const [rawType, ...params] = part.trim().split(";");
      const type = rawType.trim().toLowerCase();
      let q = 1;
      for (const param of params) {
        const [k, v] = param.split("=");
        if (k && k.trim().toLowerCase() === "q") {
          const parsed = Number.parseFloat(v);
          if (!Number.isNaN(parsed)) q = Math.min(Math.max(parsed, 0), 1);
        }
      }
      // Specificity: an exact type beats "type/*" beats "*/*".
      let specificity = 2;
      if (type === "*/*") specificity = 0;
      else if (type.endsWith("/*")) specificity = 1;
      return { type, q, specificity, index };
    })
    .filter((r) => r.type)
    .sort((a, b) => b.q - a.q || b.specificity - a.specificity || a.index - b.index);
}

/** Best q-value the client will accept for `mediaType` (0 = not acceptable). */
export function qualityFor(ranges, mediaType) {
  const [group] = mediaType.split("/");
  let best = 0;
  for (const range of ranges) {
    if (range.type === mediaType || range.type === `${group}/*` || range.type === "*/*") {
      // Ranges are pre-sorted by specificity, so the first match is the
      // most specific one and therefore the governing q-value.
      return range.q;
    }
  }
  return best;
}

/**
 * Decide what to serve. Returns "markdown", "html", or "none" (-> 406).
 * No Accept header, or one that doesn't mention us, means HTML as before.
 */
export function negotiate(acceptHeader) {
  const ranges = parseAccept(acceptHeader);
  if (!ranges.length) return "html";

  const mdQ = Math.max(...MARKDOWN_TYPES.map((t) => qualityFor(ranges, t)));
  const htmlQ = Math.max(...HTML_TYPES.map((t) => qualityFor(ranges, t)));

  if (mdQ === 0 && htmlQ === 0) return "none";
  // Ties go to HTML: that is the historical behaviour, and `*/*` should not
  // silently flip every browser and bot onto the markdown variant.
  return mdQ > htmlQ ? "markdown" : "html";
}

/** `/window-cleaning/` and `/window-cleaning` both mirror to `.../index.md`. */
export function mirrorPath(pathname) {
  if (pathname === "" || pathname === "/") return "/index.md";
  return pathname.endsWith("/") ? `${pathname}index.md` : `${pathname}/index.md`;
}

function markdownResponse(body, status) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": MD_CONTENT_TYPE,
      Vary: VARY,
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function notFoundMarkdown(pathname) {
  return `# 404 — page not found

\`${pathname}\` does not exist on gcwindowandpressurecleaning.com.au.

Gold Coast Window and Pressure Cleaning — exterior cleaning on the Gold Coast, QLD
and in Northern NSW.

## Where to look next

- [Sitemap index](/sitemap.xml) — every page on this site
- [llms.txt](/llms.txt) — services, indicative pricing, suburbs, hours, FAQs
- [Agent instructions](/agent-instructions.md) — when to use this site and how
- [Agent & developer resources](/for-agents/) — every machine-readable file
- [Expert guides](/guides/) — long-form Q&A articles

## Main pages

- [Home](/)
- [Window cleaning](/window-cleaning/)
- [Window cleaning plans](/window-cleaning-plans/)
- [Roof cleaning](/roof-cleaning/)
- [Pressure cleaning](/pressure-cleaning/)
- [House & building softwash](/house-softwash/)
- [Gutter cleaning](/gutter-cleaning/)
- [Solar panel cleaning](/solar-panel-cleaning/)
- [Solar panel bird proofing](/bird-proofing/)
- [Instant quote](/instant-quote/)
- [Service areas](/service-areas/)
- [Contact](/contact/)

Every page also has a markdown twin: append \`index.md\` to its URL, or send
\`Accept: text/markdown\`.
`;
}

function notAcceptableMarkdown() {
  return `# 406 — not acceptable

This URL can be served as \`text/html\` or \`text/markdown\`. The \`Accept\`
header on this request permits neither.

Retry with one of:

- \`Accept: text/markdown\`
- \`Accept: text/html\`
- \`Accept: */*\`
`;
}

/** Add Vary so caches key HTML and markdown variants separately. */
function withVary(response) {
  const headers = new Headers(response.headers);
  headers.set("Vary", VARY);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function fetchAsset(context, url) {
  const request = new Request(url.toString(), { headers: { Accept: "*/*" } });
  if (context.env && context.env.ASSETS && typeof context.env.ASSETS.fetch === "function") {
    return context.env.ASSETS.fetch(request);
  }
  return fetch(request);
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  if (isPassThrough(url.pathname)) return context.next();
  if (request.method !== "GET" && request.method !== "HEAD") return context.next();

  const wants = negotiate(request.headers.get("Accept"));

  if (wants === "none") {
    return new Response(notAcceptableMarkdown(), {
      status: 406,
      headers: { "Content-Type": MD_CONTENT_TYPE, Vary: VARY },
    });
  }

  if (wants === "markdown") {
    const mirrorUrl = new URL(mirrorPath(url.pathname), url.origin);
    let mirror = null;
    try {
      mirror = await fetchAsset(context, mirrorUrl);
    } catch {
      mirror = null;
    }

    if (mirror && mirror.ok) {
      const body = await mirror.text();
      return markdownResponse(body, 200);
    }

    // No mirror for this path. If the page itself doesn't exist either, answer
    // the 404 in the format that was asked for; otherwise fall through to HTML.
    const page = await context.next();
    if (page.status === 404) {
      return markdownResponse(notFoundMarkdown(url.pathname), 404);
    }
    return withVary(page);
  }

  return withVary(await context.next());
}
