import { useEffect } from "react";

const SITE = "https://gcwindowandpressurecleaning.com.au";
const DEFAULT_IMAGE = "/images/window.jpg";

/**
 * Shared SEO component for every page.
 * Sets: document title, meta description, canonical, robots,
 *       Open Graph (og:*) and Twitter card tags, and injects JSON-LD.
 *
 * Props:
 *   title       — full <title> string
 *   description — meta description
 *   canonical   — absolute canonical URL (recommended) or path
 *   image       — absolute or path to social share image (defaults to site default)
 *   noindex     — if true, sets robots to noindex,nofollow
 *   jsonLd      — array of structured-data objects
 */
export default function PageSEO({ title, description, canonical, image, noindex, jsonLd }) {
  useEffect(() => {
    if (title) document.title = title;

    const absolute = (url) => {
      if (!url) return undefined;
      if (url.startsWith("http")) return url;
      return SITE + (url.startsWith("/") ? url : "/" + url);
    };

    // Mirrors scripts/prerender.mjs — Cloudflare Pages serves URLs with
    // trailing slashes as canonical. The client-rendered canonical MUST match
    // the prerendered canonical and the sitemap, otherwise Google sees
    // conflicting signals between SSR HTML and hydrated DOM.
    const withSlash = (url) => {
      if (!url || url.endsWith("/")) return url;
      const last = url.split("/").pop();
      if (last.includes(".")) return url; // don't slash file-like URLs
      return url + "/";
    };

    const canonicalUrl = withSlash(absolute(canonical));
    const imageUrl = absolute(image || DEFAULT_IMAGE);

    const upsertMeta = (selector, attrs) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        Object.entries(attrs).forEach(([k, v]) => {
          if (k !== "content") el.setAttribute(k, v);
        });
        document.head.appendChild(el);
      }
      if (attrs.content !== undefined) el.setAttribute("content", attrs.content);
    };

    // Description
    if (description) {
      upsertMeta('meta[name="description"]', { name: "description", content: description });
    }

    // Robots
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex ? "noindex,nofollow" : "index, follow",
    });

    // Canonical link
    if (canonicalUrl) {
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }

    // Open Graph
    if (title) upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    if (description) upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    if (canonicalUrl) upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    if (imageUrl) upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_AU" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Gold Coast Window and Pressure Cleaning" });

    // Twitter
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    if (title) upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    if (description) upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    if (imageUrl) upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });

    // Remove ALL existing JSON-LD scripts (both static prerender-injected and
    // previously dynamic ones) so stale prerender schemas never duplicate the
    // schemas each page component explicitly declares.
    document.querySelectorAll('script[type="application/ld+json"]').forEach(s => s.remove());

    if (Array.isArray(jsonLd) && jsonLd.length > 0) {
      jsonLd.forEach(data => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-dynamic-jsonld", "true");
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }

    return () => {
      document.querySelectorAll('script[data-dynamic-jsonld]').forEach(s => s.remove());
    };
  }, [title, description, canonical, image, noindex, jsonLd]);

  return null;
}
