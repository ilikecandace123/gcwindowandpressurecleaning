import React, { useRef, useState } from "react";

// Drag (or arrow-key) slider over two photos of the same job. The "after"
// photo fills the frame; the "before" photo sits on top and is clipped to the
// left of the handle. The frame is the photos' own shape (640 x 690), so
// both show in full.
export default function BeforeAfter({ before, after, label, className = "" }) {
  const [pos, setPos] = useState(50);
  const frame = useRef(null);
  const dragging = useRef(false);

  const moveTo = (clientX) => {
    const r = frame.current.getBoundingClientRect();
    setPos(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  };

  const webp = (src) => src.replace(/\.jpg$/, ".webp");

  return (
    <figure className={className}>
      <div
        ref={frame}
        className="home-ba relative overflow-hidden rounded-t-[22px] bg-ink-deep aspect-[64/69]"
        onPointerDown={(e) => {
          dragging.current = true;
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch (_) {
            /* older browsers */
          }
          moveTo(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <picture>
          <source srcSet={webp(after)} type="image/webp" />
          <img src={after} alt={`After: ${label}`} loading="lazy" decoding="async" width="640" height="690" className="absolute inset-0 w-full h-full object-cover" />
        </picture>
        <picture>
          <source srcSet={webp(before)} type="image/webp" />
          <img
            src={before}
            alt={`Before: ${label}`}
            loading="lazy"
            decoding="async"
            width="640"
            height="690"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          />
        </picture>
        <span className="absolute top-4 left-4 bg-ink/85 text-paper text-[12px] font-bold tracking-[.12em] uppercase px-3 py-1.5 rounded-full">Before</span>
        <span className="absolute top-4 right-4 bg-accent text-ink text-[12px] font-bold tracking-[.12em] uppercase px-3 py-1.5 rounded-full">After</span>
        <span className="absolute inset-y-0 w-1 -ml-0.5 bg-paper-white" style={{ left: `${pos}%` }} aria-hidden="true" />
        <button
          type="button"
          role="slider"
          aria-label={`Drag to compare before and after: ${label}`}
          aria-valuemin={4}
          aria-valuemax={96}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 5));
            if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 5));
          }}
          className="absolute top-1/2 w-[54px] h-[54px] -mt-[27px] -ml-[27px] rounded-full bg-paper-white text-ink shadow-xl flex items-center justify-center text-xl font-bold"
          style={{ left: `${pos}%` }}
        >
          <span aria-hidden="true">⇔</span>
        </button>
      </div>
      <figcaption className="bg-accent text-ink font-bold text-[17px] text-center px-4 py-3.5 rounded-b-[22px]">{label}</figcaption>
    </figure>
  );
}
