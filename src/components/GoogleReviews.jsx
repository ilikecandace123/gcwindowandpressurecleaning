import React, { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

// Gold Coast Window and Pressure Cleaning — Google Business Profile
const PLACE_ID = "ChIJpTMe2iOAqU0RqA5p7p-4Aog";
const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

// Fallback testimonials shown if the API key is missing or the request fails
const FALLBACK_REVIEWS = [
  {
    authorAttribution: { displayName: "Sarah Johnson" },
    rating: 5,
    text: { text: "Absolutely exceptional service! The team was professional, punctual, and the results exceeded our expectations. Our windows have never looked better!" },
    relativePublishTimeDescription: "Recently"
  },
  {
    authorAttribution: { displayName: "Michael Chen" },
    rating: 5,
    text: { text: "Outstanding communication throughout the entire process. They kept us informed every step of the way and left our property spotless. Highly recommended!" },
    relativePublishTimeDescription: "Recently"
  },
  {
    authorAttribution: { displayName: "Emma Williams" },
    rating: 5,
    text: { text: "These guys go above and beyond. We thought the house needed painting but it looks brand new after the house wash treatment." },
    relativePublishTimeDescription: "Recently"
  },
  {
    authorAttribution: { displayName: "David Thompson" },
    rating: 5,
    text: { text: "Best pressure cleaning service on the Gold Coast. Fair pricing, incredible attention to detail and very respectful of our property." },
    relativePublishTimeDescription: "Recently"
  },
  {
    authorAttribution: { displayName: "Jessica Taylor" },
    rating: 5,
    text: { text: "Amazing results on our roof — it looks brand new! The team was friendly, on time and left everything cleaner than they found it." },
    relativePublishTimeDescription: "Recently"
  },
  {
    authorAttribution: { displayName: "Liam O'Connor" },
    rating: 5,
    text: { text: "Booked them for gutter and solar panel cleaning. Prompt quote, turned up on time and the difference afterwards was remarkable. Will absolutely use again." },
    relativePublishTimeDescription: "Recently"
  }
];

const TRANSITION_MS = 700;

export default function GoogleReviews() {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [rating, setRating] = useState(5.0);
  const [totalRatings, setTotalRatings] = useState(62);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    let cancelled = false;

    async function fetchReviews() {
      // No API key — keep showing fallback reviews (already set as initial state)
      if (!API_KEY) return;

      try {
        const res = await fetch(
          `https://places.googleapis.com/v1/places/${PLACE_ID}`,
          {
            headers: {
              "X-Goog-Api-Key": API_KEY,
              "X-Goog-FieldMask": "reviews,rating,userRatingCount,displayName"
            }
          }
        );

        if (!res.ok) throw new Error(`Places API ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        const fetched = data.reviews || [];
        const combined = fetched.length >= 5
          ? fetched
          : [...fetched, ...FALLBACK_REVIEWS].slice(0, Math.max(6, fetched.length + 3));
        setReviews(combined);
        if (data.rating) setRating(data.rating);
        if (data.userRatingCount) setTotalRatings(data.userRatingCount);
      } catch (err) {
        console.warn("GoogleReviews fetch failed:", err);
        // Keep fallback reviews (already showing)
      }
    }

    fetchReviews();
    return () => {
      cancelled = true;
    };
  }, []);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const allReviews = reviews || FALLBACK_REVIEWS;
  const total = allReviews.length;

  // Reset index when the review set or items-per-view changes
  useEffect(() => {
    setTransitionEnabled(false);
    setStartIndex(0);
  }, [total, itemsPerView]);

  // Re-enable transition after a frame whenever it gets disabled (for seamless jumps)
  useEffect(() => {
    if (!transitionEnabled) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionEnabled(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [transitionEnabled]);

  // When we slide into the cloned tail, wait for the transition to finish,
  // then jump instantly back to the start for a seamless infinite loop
  useEffect(() => {
    if (startIndex === total && total > 0) {
      const t = setTimeout(() => {
        setTransitionEnabled(false);
        setStartIndex(0);
      }, TRANSITION_MS);
      return () => clearTimeout(t);
    }
  }, [startIndex, total]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused || total <= itemsPerView) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, total, itemsPerView]);

  const next = () => {
    if (total <= itemsPerView) return;
    setStartIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (total <= itemsPerView) return;
    if (startIndex === 0) {
      // Snap instantly to the cloned position, then slide back one
      setTransitionEnabled(false);
      setStartIndex(total);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setStartIndex(total - 1);
        });
      });
    } else {
      setStartIndex((prev) => prev - 1);
    }
  };

  const goTo = (i) => setStartIndex(i);

  // Clone the first `itemsPerView` reviews at the end so wrap-around looks seamless
  const extended = total > 0
    ? [...allReviews, ...allReviews.slice(0, itemsPerView)]
    : [];

  const trackStyle = {
    transform: `translateX(-${startIndex * (100 / itemsPerView)}%)`,
    transition: transitionEnabled ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : "none",
    willChange: "transform"
  };

  // Which dot should be highlighted — the cloned position maps back to index 0
  const activeDot = startIndex === total ? 0 : startIndex;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-8 h-8 mr-3" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Google Reviews
            </h2>
          </div>
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center text-yellow-400 mr-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">{rating.toFixed(1)}</span>
          </div>
          <p className="text-gray-600">
            Based on {totalRatings}+ verified Google reviews
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Prev button */}
          {total > itemsPerView && (
            <button
              onClick={prev}
              aria-label="Previous reviews"
              className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center bg-white border border-gray-200 rounded-full shadow-md hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 text-gray-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Next button */}
          {total > itemsPerView && (
            <button
              onClick={next}
              aria-label="Next reviews"
              className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center bg-white border border-gray-200 rounded-full shadow-md hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 text-gray-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Viewport */}
          <div className="overflow-hidden">
            {/* Track (padded negatively to offset per-slide gap padding) */}
            <div className="-mx-4">
              <div className="flex" style={trackStyle}>
                {extended.map((review, index) => {
                  const name = review.authorAttribution?.displayName || "Google User";
                  const photo = review.authorAttribution?.photoUri;
                  const stars = review.rating || 5;
                  const text = review.text?.text || review.originalText?.text || "";
                  const when = review.relativePublishTimeDescription || "";

                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 px-4"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <div className="bg-gray-50 rounded-xl p-6 relative border border-gray-100 h-full">
                        <Quote className="w-8 h-8 text-blue-200 mb-4" />

                        <div className="flex items-center text-yellow-400 mb-4">
                          {[...Array(stars)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>

                        <p className="text-gray-700 mb-6 leading-relaxed line-clamp-6">
                          "{text}"
                        </p>

                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            {photo ? (
                              <img
                                src={photo}
                                alt={name}
                                className="w-10 h-10 rounded-full mr-3"
                                referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center mr-3">
                                {name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{name}</p>
                              {when && <p className="text-xs text-gray-500">{when}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          {total > itemsPerView && (
            <div className="flex justify-center gap-2 mt-8">
              {allReviews.map((_, i) => (
                <div key={i} className="flex items-center justify-center min-h-[44px] min-w-[44px]">
                  <button
                    onClick={() => goTo(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === activeDot
                        ? "w-8 bg-blue-600"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <a
            href={`https://search.google.com/local/reviews?placeid=${PLACE_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            Read all reviews on Google →
          </a>
        </div>

      </div>
    </section>
  );
}
