#!/usr/bin/env node

/**
 * Sitemap Generator Script
 * Generates sitemap.xml for all location + service pages
 *
 * Run: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SUBURBS, SERVICES, COMMERCIAL_SERVICES } from '../src/data/locations.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = 'https://gcwindowandpressurecleaning.com.au';
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap.xml');

// Static pages
const staticPages = [
  { url: '/', priority: 1.0, changefreq: 'monthly' },
  { url: '/Services', priority: 0.9, changefreq: 'monthly' },
  { url: '/WindowCleaning', priority: 0.9, changefreq: 'monthly' },
  { url: '/RoofCleaning', priority: 0.9, changefreq: 'monthly' },
  { url: '/HouseSoftWash', priority: 0.9, changefreq: 'monthly' },
  { url: '/PressureCleaning', priority: 0.9, changefreq: 'monthly' },
  { url: '/GutterCleaning', priority: 0.9, changefreq: 'monthly' },
  { url: '/SolarPanelCleaning', priority: 0.9, changefreq: 'monthly' },
  { url: '/BirdProofing', priority: 0.9, changefreq: 'monthly' },
  { url: '/ServiceAreas', priority: 0.8, changefreq: 'monthly' },
];

// Commercial service hub pages (/commercial/:serviceSlug)
const commercialStaticPages = COMMERCIAL_SERVICES.map(service => ({
  url: `/commercial/${service.slug}`,
  priority: 0.9,
  changefreq: 'monthly'
}));

// Generate residential location pages
const locationPages = [];
SERVICES.forEach(service => {
  SUBURBS.forEach(suburb => {
    locationPages.push({
      url: `/${service.slug}/${suburb.slug}`,
      priority: 0.8,
      changefreq: 'weekly'
    });
  });
});

// Generate commercial location pages
const commercialLocationPages = [];
COMMERCIAL_SERVICES.forEach(service => {
  SUBURBS.forEach(suburb => {
    commercialLocationPages.push({
      url: `/commercial/${service.slug}/${suburb.slug}`,
      priority: 0.7,
      changefreq: 'weekly'
    });
  });
});

// Combine all pages
const allPages = [...staticPages, ...commercialStaticPages, ...locationPages, ...commercialLocationPages];

// Generate XML
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

allPages.forEach(page => {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${BASE_URL}${page.url}</loc>\n`;
  sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
  sitemap += `    <priority>${page.priority}</priority>\n`;
  sitemap += '  </url>\n';
});

sitemap += '</urlset>';

// Write file
try {
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, sitemap);
  console.log(`Sitemap generated successfully: ${OUTPUT_FILE}`);
  console.log(`Total URLs: ${allPages.length}`);
  console.log(`- Static pages: ${staticPages.length}`);
  console.log(`- Location pages: ${locationPages.length} (${SERVICES.length} services × ${SUBURBS.length} suburbs)`);
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
