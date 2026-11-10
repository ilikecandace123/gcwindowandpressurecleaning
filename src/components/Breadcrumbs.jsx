import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-paper border-b border-rule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center flex-wrap gap-1 text-sm text-ink-3">
          <li className="flex items-center">
            <Link to="/" className="hover:text-accent-3 transition-colors flex items-center">
              <Home className="w-3.5 h-3.5 mr-1" />
              Home
            </Link>
          </li>
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-ink-3 flex-shrink-0" />
              {idx === items.length - 1 ? (
                <span className="text-ink font-medium">{item.name}</span>
              ) : (
                <Link to={item.url} className="hover:text-accent-3 transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
