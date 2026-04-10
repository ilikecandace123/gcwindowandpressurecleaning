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

function buildMetaHtml({ title, description, canonical, image, jsonLd = [] }) {
  const img = absolute(image || DEFAULT_IMAGE);
  const can = absolute(canonical);
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${can}" />`,
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
  const { buildLocalBusinessSchema, buildServiceSchema, buildBreadcrumbSchema, buildOrganizationSchema, buildWebSiteSchema } = await loadSchemaBuilders();
  const indexHtml = fs.readFileSync(path.join(DIST, "index.html"), "utf8");

  const routes = [];

  // Home
  routes.push({
    path: "/",
    title: "Gold Coast Window and Pressure Cleaning | Professional Exterior Cleaning",
    description:
      "Gold Coast's trusted window cleaning, pressure cleaning, roof cleaning, and house softwash service. Fully insured, police-checked staff. Call (07) 5651 2386 for a free quote.",
    canonical: `${SITE}/`,
    image: "/images/window.jpg",
    jsonLd: [
      buildOrganizationSchema(),
      buildWebSiteSchema(),
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }])
    ],
  });

  // Hub pages (kebab-case canonical URLs)
  routes.push({
    path: "/services",
    title: "Gold Coast Window and Pressure Cleaning | Professional Exterior Cleaning Services",
    description:
      "Gold Coast's trusted exterior cleaning service. Window, roof, pressure, softwash, gutter and solar panel cleaning. Fully insured. Call (07) 5651 2386.",
    canonical: `${SITE}/`,
    image: "/images/services-banner.jpg",
    jsonLd: [
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }])
    ],
  });
  routes.push({
    path: "/service-areas",
    title: "Service Areas | Gold Coast Window and Pressure Cleaning",
    description:
      "We service all Gold Coast suburbs and Northern NSW. Find professional window, pressure, roof cleaning and more in your suburb. Call (07) 5651 2386.",
    canonical: `${SITE}/service-areas`,
    jsonLd: [
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Service Areas", url: "/service-areas" }])
    ],
  });
  routes.push({
    path: "/about",
    title: "About Us | Gold Coast Window and Pressure Cleaning",
    description: "Gold Coast's trusted exterior cleaning company. Locally owned, fully insured with police-checked staff. Learn about our team and commitment to quality.",
    canonical: `${SITE}/about`,
    jsonLd: [
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])
    ],
  });
  routes.push({
    path: "/contact",
    title: "Contact Us | Gold Coast Window and Pressure Cleaning",
    description: "Get in touch with Gold Coast Window and Pressure Cleaning. Call (07) 5651 2386 for a free quote. Serving all Gold Coast suburbs and Northern NSW.",
    canonical: `${SITE}/contact`,
    jsonLd: [
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }])
    ],
  });

  // Main service pages (kebab-case)
  const mainPages = [
    ["window-cleaning", "Window Cleaning", "/images/window-hero.jpg"],
    ["roof-cleaning", "Roof Cleaning", "/images/roof-hero.jpg"],
    ["house-softwash", "House & Building Softwash", "/images/softwash-1.jpg"],
    ["pressure-cleaning", "Pressure Cleaning", "/images/pressure-hero.jpg"],
    ["gutter-cleaning", "Gutter Cleaning", "/images/gutter-1.jpg"],
    ["solar-panel-cleaning", "Solar Panel Cleaning", "/images/solar-panel-hero.jpg"],
    ["bird-proofing", "Solar Panel Bird Proofing", "/images/bird-proofing-hero.jpg"],
    ["patio-cleaning", "Patio Cleaning", "/images/patio-unsplash.jpg"],
  ];
  for (const [slug, name, img] of mainPages) {
    routes.push({
      path: `/${slug}`,
      title: `${name} Gold Coast | Professional ${name} Services`,
      description: `Professional ${name.toLowerCase()} on the Gold Coast. Fully insured, police-checked staff. Call (07) 5651 2386 for a free quote.`,
      canonical: `${SITE}/${slug}`,
      image: img,
      jsonLd: [
        buildLocalBusinessSchema(),
        buildServiceSchema({
          name: name,
          description: `Professional ${name.toLowerCase()} on the Gold Coast. Fully insured, police-checked staff. Call (07) 5651 2386 for a free quote.`,
          image: img,
          serviceType: name,
          url: `${SITE}/${slug}`
        }),
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: name, url: `/${slug}` }
        ])
      ],
    });
  }

  // Residential service + suburb pages
  for (const service of SERVICES) {
    for (const suburb of SUBURBS) {
      routes.push({
        path: `/${service.slug}/${suburb.slug}`,
        title: `${service.name} in ${suburb.name} | Gold Coast Window and Pressure Cleaning`,
        description: `Professional ${service.name.toLowerCase()} in ${suburb.name} (${suburb.postcode}). Fully insured, police-checked staff. Serving ${suburb.name} and surrounding Gold Coast suburbs. Call (07) 5651 2386.`,
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
            url: `${SITE}/${service.slug}/${suburb.slug}`
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
      title: `${service.name} Gold Coast | Commercial & Strata Specialists`,
      description: `${service.shortDesc}. Fully insured with $20M public liability, SWMS supplied, after-hours scheduling. Call (07) 5651 2386.`,
      canonical: `${SITE}/commercial/${service.slug}`,
      jsonLd: [
        buildLocalBusinessSchema(),
        buildServiceSchema({
          name: service.name,
          description: `${service.shortDesc}. Fully insured with $20M public liability, SWMS supplied, after-hours scheduling.`,
          image: DEFAULT_IMAGE,
          serviceType: service.name,
          url: `${SITE}/commercial/${service.slug}`
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
        title: `${service.name} in ${suburb.name} | Commercial & Strata Gold Coast`,
        description: `Professional ${service.name.toLowerCase()} in ${suburb.name} (${suburb.postcode}) for commercial, strata and body corporate buildings. $20M public liability, SWMS supplied, after-hours service. Call (07) 5651 2386.`,
        canonical: `${SITE}/commercial/${service.slug}/${suburb.slug}`,
        jsonLd: [
          buildLocalBusinessSchema(),
          buildServiceSchema({
            name: `${service.name} in ${suburb.name}`,
            description: `Professional ${service.name.toLowerCase()} in ${suburb.name} (${suburb.postcode}) for commercial, strata and body corporate buildings. $20M public liability, SWMS supplied, after-hours service.`,
            image: DEFAULT_IMAGE,
            serviceType: service.name,
            areaName: suburb.name,
            url: `${SITE}/commercial/${service.slug}/${suburb.slug}`
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
  const CONTENT_DATE = "2026-04-10";

  // Categorize routes
  const staticRoutes = routes.filter(
    (r) => r.path === "/" || (r.path.split("/").filter(Boolean).length === 1 && !r.path.startsWith("/commercial/"))
  );
  const residentialRoutes = routes.filter(
    (r) => r.path.split("/").filter(Boolean).length === 2 && !r.path.startsWith("/commercial/")
  );
  const commercialRoutes = routes.filter((r) => r.path.startsWith("/commercial/"));

  function generateSitemapXml(routeList) {
    const urlEntries = routeList
      .map((r) => {
        const loc = absolute(r.path === "/" ? "/" : r.path);
        // Use CONTENT_DATE (not build date) so lastmod reflects real content
        // changes, not whenever the build pipeline last ran.
        return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${CONTENT_DATE}</lastmod>\n  </url>`;
      })
      .join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
  }

  // Write individual sitemaps
  fs.writeFileSync(path.join(DIST, "sitemap-static.xml"), generateSitemapXml(staticRoutes), "utf8");
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
