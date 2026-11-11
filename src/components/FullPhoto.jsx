import React from "react";
import IMAGE_SIZES from "../data/imageSizes.json";

// Shows a photo in full, never cropped (Skagen, 12/11/2026: "all the photos
// are showing in full properly"). The frame takes the photo's own shape. A
// tall photo is capped in height and the frame narrows to match, so the
// whole picture is still in view. Sizes come from src/data/imageSizes.json,
// which scripts/assets/build-image-sizes.mjs rewrites on every build.
const FALLBACK = [1200, 900];

export function photoSize(src) {
  const [width, height] = IMAGE_SIZES[src] || FALLBACK;
  return { width, height };
}

// The .webp copy of a .jpg, when one is shipped.
export function webpFor(src) {
  const webp = String(src || "").replace(/\.jpe?g$/i, ".webp");
  return webp !== src && IMAGE_SIZES[webp] ? webp : null;
}

export default function FullPhoto({ src, alt = "", eager = false, className = "", children }) {
  const { width, height } = photoSize(src);
  const webp = webpFor(src);
  return (
    <div className={`photo-fit ${className}`} style={{ "--photo-ratio": String(Math.round((width / height) * 1000) / 1000) }}>
      <picture>
        {webp && <source srcSet={webp} type="image/webp" />}
        <img
          src={src}
          alt={alt}
          aria-hidden={alt ? undefined : "true"}
          width={width}
          height={height}
          className="block w-full h-auto"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : undefined}
        />
      </picture>
      {children}
    </div>
  );
}
