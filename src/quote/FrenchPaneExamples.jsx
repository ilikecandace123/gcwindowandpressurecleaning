import React from "react";
import { Info } from "lucide-react";

// French-pane reference visual for the Window Cleaning French-pane question.
// Recreated as clean vector illustrations of typical French-pane windows
// (grid patterns dividing the glass into many small sections).

function FrenchWindow({ cols, rows, frame = "#e8e3da", glass = "#b8d4e8", w = 150, h = 190 }) {
  const pad = 10;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const cw = innerW / cols;
  const ch = innerH / rows;
  const bars = [];
  for (let c = 1; c < cols; c++) {
    bars.push(<line key={`v${c}`} x1={pad + c * cw} y1={pad} x2={pad + c * cw} y2={h - pad} stroke={frame} strokeWidth="6" />);
  }
  for (let r = 1; r < rows; r++) {
    bars.push(<line key={`h${r}`} x1={pad} y1={pad + r * ch} x2={w - pad} y2={pad + r * ch} stroke={frame} strokeWidth="6" />);
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="0" y="0" width={w} height={h} rx="4" fill={frame} />
      <rect x={pad} y={pad} width={innerW} height={innerH} fill={glass} />
      {/* subtle sky reflection */}
      <polygon points={`${pad},${pad} ${pad + innerW * 0.55},${pad} ${pad},${pad + innerH * 0.7}`} fill="#d3e6f2" opacity="0.7" />
      {bars}
      <rect x={pad} y={pad} width={innerW} height={innerH} fill="none" stroke={frame} strokeWidth="4" />
    </svg>
  );
}

export default function FrenchPaneExamples({ className = "" }) {
  return (
    <div className={className}>
      <div className="flex items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-4">
        <Info className="w-5 h-5 text-blue-600 mr-2.5 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-gray-700">
          <strong>Info:</strong> French pane windows require additional cleaning time due to their grid patterns and
          multiple glass sections.
        </p>
      </div>
      <p className="text-sm font-semibold text-gray-800 mb-3">See how French pane windows look</p>
      <div
        className="grid grid-cols-3 gap-3"
        role="img"
        aria-label="Three examples of French pane windows — glass divided by grid bars into many small sections"
      >
        <div className="rounded-lg overflow-hidden border border-gray-200 bg-gradient-to-b from-sky-100 to-gray-100 p-3">
          <FrenchWindow cols={3} rows={4} />
        </div>
        <div className="rounded-lg overflow-hidden border border-gray-200 bg-gradient-to-b from-amber-50 to-gray-100 p-3">
          <FrenchWindow cols={4} rows={5} frame="#ded8cc" />
        </div>
        <div className="rounded-lg overflow-hidden border border-gray-200 bg-gradient-to-b from-stone-100 to-stone-200 p-3">
          <FrenchWindow cols={2} rows={3} frame="#b09a7a" glass="#a9c9de" />
        </div>
      </div>
    </div>
  );
}
