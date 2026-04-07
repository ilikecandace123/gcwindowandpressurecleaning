// Centralised JSON-LD schema builders for SEO.
// Reused across PageSEO components on every page.

export const SITE_URL = "https://gcwindowandpressurecleaning.com.au";
export const BUSINESS_NAME = "Gold Coast Window and Pressure Cleaning";
export const BUSINESS_PHONE = "(07) 5651 2386";
export const BUSINESS_EMAIL = "info@gcwindowandpressurecleaning.com.au";

// Gold Coast centre + coverage radius (covers Coolangatta -> Beenleigh and hinterland)
export const GEO_CENTER = { lat: -28.0167, lng: 153.4000 };
export const SERVICE_RADIUS_KM = 45;

// Core LocalBusiness schema — include on every page.
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE_URL}/#business`,
    "name": BUSINESS_NAME,
    "url": SITE_URL,
    "telephone": BUSINESS_PHONE,
    "email": BUSINESS_EMAIL,
    "priceRange": "$$",
    "image": `${SITE_URL}/images/window.jpg`,
    "logo": `${SITE_URL}/images/logo.avif`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gold Coast",
      "addressRegion": "QLD",
      "postalCode": "4217",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": GEO_CENTER.lat,
      "longitude": GEO_CENTER.lng
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": GEO_CENTER.lat,
        "longitude": GEO_CENTER.lng
      },
      "geoRadius": `${SERVICE_RADIUS_KM * 1000}`
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "14:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "2500"
    },
    "sameAs": [
      "https://www.facebook.com/goldcoastwindowandpressurecleaning",
      "https://g.page/goldcoastwindowcleaning"
    ]
  };
}

// Service schema for a specific service (with optional area)
export function buildServiceSchema({ name, description, image, serviceType, areaName, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      "name": BUSINESS_NAME,
      "telephone": BUSINESS_PHONE,
      "url": SITE_URL
    },
    "areaServed": areaName
      ? { "@type": "City", "name": areaName, "addressRegion": "QLD", "addressCountry": "AU" }
      : { "@type": "AdministrativeArea", "name": "Gold Coast", "addressRegion": "QLD", "addressCountry": "AU" },
    "serviceType": serviceType || name,
    "url": url,
    "image": image && (image.startsWith("http") ? image : `${SITE_URL}${image}`),
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "AUD",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "AUD",
        "description": "Free quote on request"
      }
    }
  };
}

// Breadcrumb builder
export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

// FAQ builder
export function buildFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };
}
