// Centralised JSON-LD schema builders for SEO.
// Reused across PageSEO components on every page.

export const SITE_URL = "https://gcwindowandpressurecleaning.com.au";
export const BUSINESS_NAME = "Gold Coast Window and Pressure Cleaning";
export const BUSINESS_PHONE = "(07) 5651 2386";
export const BUSINESS_EMAIL = "info@gcwindowandpressurecleaning.com.au";

// Business address (must match GBP exactly for NAP consistency)
export const BUSINESS_ADDRESS = {
  streetAddress: "54 Karbunya St",
  addressLocality: "Mermaid Waters",
  addressRegion: "QLD",
  postalCode: "4218",
  addressCountry: "AU"
};

// GBP-verified coordinates + coverage radius (covers Coolangatta -> Beenleigh and hinterland)
export const GEO_CENTER = { lat: -28.0594072, lng: 153.4313091 };
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
    "description": "Professional window cleaning, roof cleaning, pressure cleaning, house softwash, gutter cleaning, solar panel cleaning and bird proofing on the Gold Coast. Fully insured, police-checked staff.",
    "additionalType": "https://www.wikidata.org/wiki/Q2308643",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_ADDRESS.streetAddress,
      "addressLocality": BUSINESS_ADDRESS.addressLocality,
      "addressRegion": BUSINESS_ADDRESS.addressRegion,
      "postalCode": BUSINESS_ADDRESS.postalCode,
      "addressCountry": BUSINESS_ADDRESS.addressCountry
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
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      // Note: reviewCount is sourced dynamically from GoogleReviews.jsx (data.userRatingCount)
      // This hardcoded value serves as a fallback and should be updated periodically during content refreshes
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
