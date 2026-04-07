import React from "react";
import { Link } from "react-router-dom";
import { Home, Phone, MapPin } from "lucide-react";
import PageSEO from "../components/PageSEO";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <PageSEO
        title="Page Not Found | Gold Coast Window and Pressure Cleaning"
        description="The page you're looking for doesn't exist. Browse our services or contact us on (07) 5651 2386 for professional exterior cleaning on the Gold Coast."
        canonical="https://gcwindowandpressurecleaning.com.au/404"
        noindex
      />
      <div className="max-w-2xl text-center">
        <p className="text-7xl font-bold text-blue-600 mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page not found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. Try one
          of the links below, or give us a call on{" "}
          <a href="tel:0756512386" className="text-blue-600 font-semibold hover:underline">
            (07) 5651 2386
          </a>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            View services
          </Link>
          <Link
            to="/service-areas"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <MapPin className="w-5 h-5" /> Service areas
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-8">
          <Phone className="w-4 h-4 inline mr-1" />
          Gold Coast Window and Pressure Cleaning · Fully insured · Police-checked staff
        </p>
      </div>
    </div>
  );
}
