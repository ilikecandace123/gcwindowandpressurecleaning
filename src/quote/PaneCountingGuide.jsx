import React from "react";

// Faithful SVG recreation of the "Count your window panes" reference diagram.
// Shown inline at the Window Cleaning pane-count question.
const NAVY = "#1e3a5f";
const SW = 5;

function Label({ x, y, children, italic = false }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily="'Poppins', 'Segoe UI', system-ui, sans-serif"
      fontWeight="700"
      fontStyle={italic ? "italic" : "normal"}
      fontSize="30"
      fill={NAVY}
    >
      {children}
    </text>
  );
}

export default function PaneCountingGuide({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1210 900"
      role="img"
      aria-label="Diagram showing how to count window panes: one undivided window is 1 pane, a window split vertically is 2 panes, an arched window with two sections is 3 panes, a window split into a two-by-two grid is 4 panes, a window split horizontally is 2 panes, and a sliding glass door counts as 4 panes"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="605"
        y="55"
        textAnchor="middle"
        fontFamily="'Poppins', 'Segoe UI', system-ui, sans-serif"
        fontWeight="800"
        fontSize="44"
        fill={NAVY}
      >
        Count your window panes
      </text>

      {/* Row 1 — 1 pane */}
      <rect x="55" y="130" width="270" height="210" fill="none" stroke={NAVY} strokeWidth={SW} />
      <Label x="190" y="395">1 pane</Label>

      {/* Row 1 — 2 panes (vertical split) */}
      <rect x="470" y="130" width="270" height="210" fill="none" stroke={NAVY} strokeWidth={SW} />
      <line x1="605" y1="130" x2="605" y2="340" stroke={NAVY} strokeWidth={SW} />
      <Label x="605" y="395">2 panes</Label>

      {/* Row 1 — 3 panes (arch over two panes) */}
      <path d="M 905 130 Q 1020 55 1135 130" fill="none" stroke={NAVY} strokeWidth={SW} />
      <rect x="905" y="130" width="230" height="210" fill="none" stroke={NAVY} strokeWidth={SW} />
      <line x1="1020" y1="130" x2="1020" y2="340" stroke={NAVY} strokeWidth={SW} />
      <Label x="1020" y="395">3 panes</Label>

      {/* Row 2 — 4 panes (2×2 grid) */}
      <rect x="55" y="480" width="270" height="210" fill="none" stroke={NAVY} strokeWidth={SW} />
      <line x1="190" y1="480" x2="190" y2="690" stroke={NAVY} strokeWidth={SW} />
      <line x1="55" y1="585" x2="325" y2="585" stroke={NAVY} strokeWidth={SW} />
      <Label x="190" y="745">4 panes</Label>

      {/* Row 2 — 2 panes (horizontal split) */}
      <rect x="470" y="480" width="270" height="210" fill="none" stroke={NAVY} strokeWidth={SW} />
      <line x1="470" y1="585" x2="740" y2="585" stroke={NAVY} strokeWidth={SW} />
      <Label x="605" y="745">2 panes</Label>

      {/* Row 2 — Sliding glass door (4 panes) */}
      <rect x="895" y="460" width="250" height="230" fill="none" stroke={NAVY} strokeWidth={SW} />
      <line x1="1020" y1="460" x2="1020" y2="690" stroke={NAVY} strokeWidth={SW} />
      <text x="957" y="545" textAnchor="middle" fontFamily="'Poppins', 'Segoe UI', system-ui, sans-serif" fontWeight="700" fontSize="24" fill={NAVY}>
        2 panes
      </text>
      <text x="1083" y="545" textAnchor="middle" fontFamily="'Poppins', 'Segoe UI', system-ui, sans-serif" fontWeight="700" fontSize="24" fill={NAVY}>
        2 panes
      </text>
      {/* sliding arrow */}
      <g fill={NAVY}>
        <rect x="928" y="580" width="38" height="18" />
        <polygon points="966,568 966,610 995,589" />
      </g>
      <Label x="1020" y="745" italic>Sliding Glass Door</Label>
      <Label x="1020" y="785">4 panes</Label>
    </svg>
  );
}
