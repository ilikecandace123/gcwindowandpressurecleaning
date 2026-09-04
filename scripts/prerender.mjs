// Lightweight post-build prerenderer.
// Reads dist/index.html and generates per-route index.html files with
// route-specific <title>, <meta description>, <link rel=canonical>, OG/Twitter tags.
// The React app still hydrates client-side for actual rendering, but crawlers
// and link previewers get the correct meta immediately from the HTML response.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SITE = "https://gcwindowandpressurecleaning.com.au";
const DEFAULT_IMAGE = "/images/window.jpg";

async function loadData() {
  const mod = await import(pathToFileURL(path.join(ROOT, "src/data/locations.js")).href);
  return mod;
}

async function loadSchemaBuilders() {
  const mod = await import(pathToFileURL(path.join(ROOT, "src/data/schema.js")).href);
  return mod;
}


function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function absolute(url) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return SITE + (url.startsWith("/") ? url : "/" + url);
}

/** Ensure a URL ends with a trailing slash (Cloudflare Pages enforces this). */
function withSlash(url) {
  if (!url || url.endsWith("/")) return url;
  // Don't add slash to file-like paths (images, xml, etc.)
  const last = url.split("/").pop();
  if (last.includes(".")) return url;
  return url + "/";
}

function buildMetaHtml({ title, description, canonical, image, jsonLd = [] }) {
  const img = absolute(image || DEFAULT_IMAGE);
  const can = withSlash(absolute(canonical));
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${can}" />`,
    // RFC 8288 link to the markdown mirror of this page. Agents that don't do
    // Accept negotiation can still discover the clean-text version.
    `<link rel="alternate" type="text/markdown" href="${can}index.md" title="Markdown version" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_AU" />`,
    `<meta property="og:site_name" content="Gold Coast Window and Pressure Cleaning" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${can}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ];

  // Generate JSON-LD script tags
  if (jsonLd.length > 0) {
    for (const schema of jsonLd) {
      tags.push(`<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
    }
  }

  return tags.join("\n    ");
}

function injectMeta(html, metaBlock) {
  // Remove existing title + description + canonical + og:* + twitter:* tags
  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/i, "");
  out = out.replace(/<meta\s+name=["']description["'][^>]*>/gi, "");
  out = out.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "");
  out = out.replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "");
  out = out.replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, "");
  // Remove hardcoded JSON-LD blocks from template
  out = out.replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");
  // Inject new block before </head>
  out = out.replace("</head>", `    ${metaBlock}\n  </head>`);
  return out;
}

function writeRoute(routePath, html) {
  const dir = routePath === "/" ? DIST : path.join(DIST, routePath.replace(/^\/+/, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
}

async function main() {
  const { SUBURBS, SERVICES, COMMERCIAL_SERVICES } = await loadData();
  const { buildLocalBusinessSchema, buildServiceSchema, buildBreadcrumbSchema, buildOrganizationSchema, buildWebSiteSchema, buildFAQSchema, buildArticleSchema } = await loadSchemaBuilders();
  const { GUIDES } = await import(pathToFileURL(path.join(ROOT, "src/data/guides.js")).href);
  const indexHtml = fs.readFileSync(path.join(DIST, "index.html"), "utf8");

  const routes = [];

  // Home
  routes.push({
    path: "/",
    title: "Gold Coast Window and Pressure Cleaning | Free Quote",
    description:
      "Gold Coast's trusted window, pressure, roof, gutter and solar panel cleaning. Fully insured, police-checked staff. Free quote — call (07) 5651 2386.",
    canonical: `${SITE}/`,
    image: "/images/services-banner.jpg",
    jsonLd: [
      buildOrganizationSchema(),
      buildWebSiteSchema(),
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }])
    ],
  });

  // Hub pages (kebab-case canonical URLs)
  // (/services is a 301 to "/" in public/_redirects — not prerendered, not in the sitemap.)
  routes.push({
    path: "/service-areas",
    title: "Service Areas | Gold Coast Window and Pressure Cleaning",
    description:
      "We service all Gold Coast suburbs and Northern NSW — window, pressure, roof, gutter and solar cleaning in your suburb. Call (07) 5651 2386 for a quote.",
    canonical: `${SITE}/service-areas`,
    jsonLd: [
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Service Areas", url: "/service-areas" }])
    ],
  });
  routes.push({
    path: "/window-cleaning-plans",
    title: "Window Cleaning Plans Gold Coast | Save On Every Visit",
    description:
      "Pre-booked window cleaning plans on the Gold Coast — monthly, quarterly or half-yearly with $50–$150 off every visit and a 7-day rain guarantee.",
    canonical: `${SITE}/window-cleaning-plans`,
    image: "/images/services-banner.jpg",
    jsonLd: [
      buildLocalBusinessSchema(),
      buildServiceSchema({
        name: "Window Cleaning Plans",
        description:
          "Pre-booked, priority-scheduled exterior window and screen cleaning plans on the Gold Coast — monthly, quarterly or half-yearly, with $50–$150 off every visit.",
        image: "/images/services-banner.jpg",
        serviceType: "Window Cleaning Maintenance Plan",
        url: `${SITE}/window-cleaning-plans/`
      }),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Window Cleaning Plans", url: "/window-cleaning-plans" }])
    ],
  });
  routes.push({
    path: "/instant-quote",
    title: "Instant Quote | Gold Coast Window and Pressure Cleaning",
    description:
      "Instant online quote for window, pressure, roof, gutter, softwash and solar panel cleaning on the Gold Coast — see your price in about two minutes.",
    canonical: `${SITE}/instant-quote`,
    jsonLd: [
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Instant Quote", url: "/instant-quote" }])
    ],
  });
  routes.push({
    path: "/about",
    title: "About Us | Gold Coast Window and Pressure Cleaning",
    description: "Gold Coast's trusted exterior cleaning company — locally owned, fully insured, with police-checked staff. Learn about our team and commitment to quality.",
    canonical: `${SITE}/about`,
    jsonLd: [
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])
    ],
  });
  routes.push({
    path: "/contact",
    title: "Contact Us | Gold Coast Window and Pressure Cleaning",
    description: "Contact Gold Coast Window and Pressure Cleaning — call (07) 5651 2386 or email us for a free quote. Serving all Gold Coast suburbs and Northern NSW.",
    canonical: `${SITE}/contact`,
    jsonLd: [
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }])
    ],
  });

  routes.push({
    path: "/commercial",
    title: "Commercial & Strata Cleaning Gold Coast | All Services",
    description:
      "Commercial and strata exterior cleaning on the Gold Coast: windows, roofs, pressure cleaning, softwash, gutters, solar and bird proofing. $20M insured.",
    canonical: `${SITE}/commercial`,
    image: "/images/commercial-window-hero.jpg",
    jsonLd: [
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Commercial & Strata", url: "/commercial" }])
    ],
  });
  routes.push({
    path: "/privacy",
    title: "Privacy Policy | Gold Coast Window & Pressure",
    description:
      "How Gold Coast Window and Pressure Cleaning collects, uses, stores and discloses your personal information when you request a quote or book a clean.",
    canonical: `${SITE}/privacy`,
    jsonLd: [
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy" }])
    ],
  });

  // Expert guides hub + articles (AI-search / AI Overviews content)
  routes.push({
    path: "/guides",
    title: "Exterior Cleaning Guides & Advice | Gold Coast Experts",
    description:
      "Straight answers from working Gold Coast cleaners — window, roof, gutter, pressure and solar panel cleaning questions answered with real local prices.",
    canonical: `${SITE}/guides`,
    jsonLd: [
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Expert Guides", url: "/guides" }])
    ],
  });
  for (const g of GUIDES) {
    routes.push({
      path: `/guides/${g.slug}`,
      title: g.metaTitle,
      description: g.metaDescription,
      canonical: `${SITE}/guides/${g.slug}`,
      jsonLd: [
        buildLocalBusinessSchema(),
        buildArticleSchema({
          title: g.h1,
          description: g.metaDescription,
          url: `${SITE}/guides/${g.slug}/`,
          datePublished: g.updated,
          dateModified: g.updated
        }),
        buildFAQSchema(g.faqs),
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Expert Guides", url: "/guides" },
          { name: g.h1, url: `/guides/${g.slug}` }
        ])
      ],
    });
  }

  // Main service pages (kebab-case)
  // [slug, name, image, title, description] — title/description must stay in
  // sync with the matching page component's <PageSEO> props (see src/pages/).
  const mainPages = [
    ["window-cleaning", "Window Cleaning", "/images/window-hero.jpg",
      "Window Cleaning Gold Coast | Streak-Free Results",
      "Streak-free window cleaning across the Gold Coast — interior & exterior up to 4 storeys, including tracks & flyscreens. Fully insured, police-checked."],
    ["roof-cleaning", "Roof Cleaning", "/images/roof-hero.jpg",
      "Roof Cleaning Gold Coast | Tile, Metal & Concrete",
      "Professional roof cleaning across the Gold Coast — tile, metal and concrete roof specialists. Soft-wash safe. Fully insured. Free quote: (07) 5651 2386."],
    ["house-softwash", "House & Building Softwash", "/images/softwash-1.jpg",
      "House Softwash Gold Coast | Gentle Mould Removal",
      "Gold Coast house softwash — safely removes mould, dirt and grime without damaging render, Colorbond or timber. Fully insured. Free quote: (07) 5651 2386."],
    ["pressure-cleaning", "Pressure Cleaning", "/images/pressure-hero.jpg",
      "Pressure Cleaning Gold Coast | Driveways & Paths",
      "Gold Coast pressure cleaning specialists — industrial-grade cleaning for driveways, concrete, paths and patios. Fully insured. Free quote: (07) 5651 2386."],
    ["gutter-cleaning", "Gutter Cleaning", "/images/gutter-1.jpg",
      "Gutter Cleaning Gold Coast | Storm-Ready Maintenance",
      "Gutter cleaning on the Gold Coast — full gutter and downpipe clearing with inspection and written report. Fully insured. Free quote: (07) 5651 2386."],
    ["solar-panel-cleaning", "Solar Panel Cleaning", "/images/solar-panel-hero.jpg",
      "Solar Panel Cleaning Gold Coast | Boost Output",
      "Professional solar panel cleaning across the Gold Coast — restore lost generation and boost output by up to 30%. Fully insured. Call (07) 5651 2386."],
    ["bird-proofing", "Solar Panel Bird Proofing", "/images/bird-proofing-hero.jpg",
      "Solar Panel Bird Proofing Gold Coast | Pigeon Mesh",
      "Solar panel bird proofing on the Gold Coast — warranty-safe mesh that stops pigeons and mynas nesting under your panels. Fully insured. Call (07) 5651 2386."],
  ];
  for (const [slug, name, img, title, description] of mainPages) {
    routes.push({
      path: `/${slug}`,
      title,
      description,
      canonical: `${SITE}/${slug}`,
      image: img,
      jsonLd: [
        buildLocalBusinessSchema(),
        buildServiceSchema({
          name: name,
          description: `Professional ${name.toLowerCase()} on the Gold Coast. Fully insured, police-checked staff. Call (07) 5651 2386 for a free quote.`,
          image: img,
          serviceType: name,
          url: `${SITE}/${slug}/`
        }),
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: name, url: `/${slug}` }
        ])
      ],
    });
  }

  // Window Cleaning Plans suburb pages
  // title/description must stay in sync with src/pages/WindowCleaningPlansLocation.jsx <PageSEO>.
  for (const suburb of SUBURBS) {
    routes.push({
      path: `/window-cleaning-plans/${suburb.slug}`,
      title: `Window Cleaning Plans ${suburb.name} | Gold Coast`,
      description: `Pre-booked window cleaning plans in ${suburb.name} (${suburb.postcode}) — monthly, quarterly or half-yearly with $50–$150 off every visit. Call (07) 5651 2386.`,
      canonical: `${SITE}/window-cleaning-plans/${suburb.slug}`,
      image: "/images/services-banner.jpg",
      jsonLd: [
        buildLocalBusinessSchema(),
        buildServiceSchema({
          name: `Window Cleaning Plans in ${suburb.name}`,
          description: `Pre-booked, priority-scheduled exterior window and screen cleaning plans in ${suburb.name} (${suburb.postcode}) — monthly, quarterly or half-yearly, with $50–$150 off every visit.`,
          image: "/images/services-banner.jpg",
          serviceType: "Window Cleaning Maintenance Plan",
          areaName: suburb.name,
          url: `${SITE}/window-cleaning-plans/${suburb.slug}/`
        }),
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Window Cleaning Plans", url: "/window-cleaning-plans" },
          { name: suburb.name, url: `/window-cleaning-plans/${suburb.slug}` }
        ])
      ],
    });
  }

  // Residential service + suburb pages
  for (const service of SERVICES) {
    for (const suburb of SUBURBS) {
      routes.push({
        path: `/${service.slug}/${suburb.slug}`,
        title: `${service.name} ${suburb.name} | Gold Coast`,
        description: `Professional ${service.name.toLowerCase()} in ${suburb.name} (${suburb.postcode}). Fully insured & police-checked staff. Get a free quote — call (07) 5651 2386 today.`,
        canonical: `${SITE}/${service.slug}/${suburb.slug}`,
        image: "/images/window.jpg",
        jsonLd: [
          buildLocalBusinessSchema(),
          buildServiceSchema({
            name: `${service.name} in ${suburb.name}`,
            description: `Professional ${service.name.toLowerCase()} in ${suburb.name} (${suburb.postcode}). Fully insured, police-checked staff. Serving ${suburb.name} and surrounding Gold Coast suburbs.`,
            image: "/images/window.jpg",
            serviceType: service.name,
            areaName: suburb.name,
            url: `${SITE}/${service.slug}/${suburb.slug}/`
          }),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: service.name, url: `/${service.slug}` },
            { name: suburb.name, url: `/${service.slug}/${suburb.slug}` }
          ])
        ],
      });
    }
  }

  // Commercial hub + service pages
  for (const service of COMMERCIAL_SERVICES) {
    routes.push({
      path: `/commercial/${service.slug}`,
      title: `${service.name} Gold Coast`,
      description: `${service.name} on the Gold Coast for offices & strata. $20M public liability, SWMS supplied, after-hours service. Call (07) 5651 2386.`,
      canonical: `${SITE}/commercial/${service.slug}`,
      jsonLd: [
        buildLocalBusinessSchema(),
        buildServiceSchema({
          name: service.name,
          description: `${service.shortDesc}. Fully insured with $20M public liability, SWMS supplied, after-hours scheduling.`,
          image: DEFAULT_IMAGE,
          serviceType: service.name,
          url: `${SITE}/commercial/${service.slug}/`
        }),
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Commercial", url: "/commercial" },
          { name: service.name, url: `/commercial/${service.slug}` }
        ])
      ],
    });
    for (const suburb of SUBURBS) {
      routes.push({
        path: `/commercial/${service.slug}/${suburb.slug}`,
        title: `${service.name} in ${suburb.name}`,
        description: `${service.name} in ${suburb.name} (${suburb.postcode}) for strata & body corporate buildings. $20M liability, SWMS supplied. Call (07) 5651 2386.`,
        canonical: `${SITE}/commercial/${service.slug}/${suburb.slug}`,
        jsonLd: [
          buildLocalBusinessSchema(),
          buildServiceSchema({
            name: `${service.name} in ${suburb.name}`,
            description: `Professional ${service.name.toLowerCase()} in ${suburb.name} (${suburb.postcode}) for commercial, strata and body corporate buildings. $20M public liability, SWMS supplied, after-hours service.`,
            image: DEFAULT_IMAGE,
            serviceType: service.name,
            areaName: suburb.name,
            url: `${SITE}/commercial/${service.slug}/${suburb.slug}/`
          }),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Commercial", url: "/commercial" },
            { name: service.name, url: `/commercial/${service.slug}` },
            { name: suburb.name, url: `/commercial/${service.slug}/${suburb.slug}` }
          ])
        ],
      });
    }
  }

  console.log(`Prerendering ${routes.length} routes...`);
  for (const r of routes) {
    const meta = buildMetaHtml(r);
    const html = injectMeta(indexHtml, meta);
    writeRoute(r.path, html);
  }
  console.log(`Done. Wrote ${routes.length} per-route HTML files.`);

  // Generate sitemaps with index
  const today = new Date().toISOString().slice(0, 10);

  // CONTENT_DATE: the date when the site's page content was last meaningfully
  // updated. Update this whenever you make substantive content changes so that
  // Google treats the lastmod signal as reliable rather than ignoring it.
  // Using the build date (today) for every URL causes Google to discount
  // lastmod entirely because it never signals real content change.
  const CONTENT_DATE = "2026-07-17";

  // Per-URL overrides. A brand-new page claiming the site-wide July date is
  // worse than no date at all: Google uses lastmod to prioritise recrawls, so
  // "modified in July" on a page born in September says "nothing to see here",
  // and every other lastmod on the site becomes a little less believable.
  // Add an entry when a page is created or substantively rewritten.
  const LASTMOD_OVERRIDES = {
    "/for-agents": "2026-09-04", // created
    "/privacy": "2026-09-04", // created
    "/commercial": "2026-09-04", // created
  };
  // Whole sections that changed on a given date. The commercial templates were
  // corrected on 04/09/2026 (duplicated "Commercial" in every h1 and Service
  // schema), which is a real content change on all 574 commercial URLs.
  const SECTION_LASTMOD = [{ prefix: "/commercial/", date: "2026-09-04" }];

  function lastmodFor(path) {
    if (LASTMOD_OVERRIDES[path]) return LASTMOD_OVERRIDES[path];
    const section = SECTION_LASTMOD.find((s) => path.startsWith(s.prefix));
    return section ? section.date : CONTENT_DATE;
  }

  // Static pages that live in public/ rather than as React routes, so they
  // never appear in `routes` but must still be in the sitemap.
  const PUBLIC_STATIC_ROUTES = [{ path: "/for-agents" }];

  // Categorize routes
  const staticRoutes = routes.filter(
    (r) => r.path === "/" || r.path.startsWith("/guides") || (r.path.split("/").filter(Boolean).length === 1 && !r.path.startsWith("/commercial/") && r.path !== "/services")
  );
  const residentialRoutes = routes.filter(
    (r) => r.path.split("/").filter(Boolean).length === 2 && !r.path.startsWith("/commercial/") && !r.path.startsWith("/guides/")
  );
  const commercialRoutes = routes.filter((r) => r.path.startsWith("/commercial/"));

  // Assign priority and changefreq based on page type
  const UTILITY_PATHS = new Set(["/about", "/contact", "/service-areas", "/privacy"]);
  const SECTION_HUBS = new Set(["/commercial"]);
  const SERVICE_SLUGS = new Set([
    "/window-cleaning", "/window-cleaning-plans", "/roof-cleaning", "/house-softwash",
    "/pressure-cleaning", "/gutter-cleaning", "/solar-panel-cleaning",
    "/bird-proofing"
  ]);

  function getUrlMeta(path) {
    if (path === "/") return { priority: "1.0", changefreq: "weekly" };
    if (SERVICE_SLUGS.has(path)) return { priority: "0.9", changefreq: "monthly" };
    if (SECTION_HUBS.has(path)) return { priority: "0.9", changefreq: "monthly" };
    if (path === "/guides" || path.startsWith("/guides/")) return { priority: "0.8", changefreq: "monthly" };
    if (UTILITY_PATHS.has(path)) return { priority: "0.8", changefreq: "monthly" };
    // Location/service pages and commercial pages
    return { priority: "0.7", changefreq: "monthly" };
  }

  function generateSitemapXml(routeList) {
    const urlEntries = routeList
      .map((r) => {
        const loc = withSlash(absolute(r.path === "/" ? "/" : r.path));
        const { priority, changefreq } = getUrlMeta(r.path);
        // Never the build date: lastmod must reflect a real content change,
        // per URL where one is known, otherwise the site-wide CONTENT_DATE.
        return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmodFor(r.path)}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
      })
      .join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
  }

  // Write individual sitemaps
  fs.writeFileSync(
    path.join(DIST, "sitemap-static.xml"),
    generateSitemapXml([...staticRoutes, ...PUBLIC_STATIC_ROUTES]),
    "utf8"
  );
  fs.writeFileSync(path.join(DIST, "sitemap-residential.xml"), generateSitemapXml(residentialRoutes), "utf8");
  fs.writeFileSync(path.join(DIST, "sitemap-commercial.xml"), generateSitemapXml(commercialRoutes), "utf8");

  // Write sitemap index
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE}/sitemap-static.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE}/sitemap-residential.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE}/sitemap-commercial.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemapIndex, "utf8");
  console.log(`Wrote 4 sitemaps: sitemap.xml (index), sitemap-static.xml (${staticRoutes.length} URLs), sitemap-residential.xml (${residentialRoutes.length} URLs), sitemap-commercial.xml (${commercialRoutes.length} URLs).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
