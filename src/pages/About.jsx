import React from "react";
import { Link } from "react-router-dom";
import { Shield, Users, Star, Phone, Award, Clock, MapPin, CheckCircle } from "lucide-react";
import PageSEO from "../components/PageSEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "../data/schema";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageSEO
        title="About Us | Gold Coast Window and Pressure Cleaning"
        description="Gold Coast's trusted exterior cleaning company. Locally owned, fully insured with police-checked staff. Learn about our team, qualifications, and commitment to quality service."
        canonical="https://gcwindowandpressurecleaning.com.au/about"
        jsonLd={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About Us", url: "/about" }
          ])
        ]}
      />

      <Breadcrumbs items={[{ name: "About Us", url: "/about" }]} />

      {/* Hero */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Gold Coast Window and Pressure Cleaning</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Locally owned and operated, we're proud to be the Gold Coast's trusted exterior cleaning professionals. Fully insured with police-checked staff for your complete peace of mind.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:gap-10 md:items-start">
            <div className="md:flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Gold Coast Window and Pressure Cleaning was built on a simple idea: provide honest, professional exterior cleaning services that Gold Coast residents and businesses can rely on. We know that finding trustworthy tradespeople can be stressful, which is why we go above and beyond to earn and keep your trust.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Based on the Gold Coast, we service all suburbs from Coolangatta to Ormeau, across the hinterland, and into Northern NSW including Tweed Heads and Kingscliff. Our local knowledge means we understand the unique cleaning challenges that coastal and subtropical conditions present — from salt spray and humidity to mould and tree debris.
              </p>
            </div>
            <div className="md:w-80 flex-shrink-0 mt-6 md:mt-0">
              <picture>
                <source srcSet="/images/services-banner.webp" type="image/webp" />
                <img
                  src="/images/services-banner.jpg"
                  alt="Gold Coast Window and Pressure Cleaning team working on a residential property"
                  width="1280"
                  height="512"
                  loading="eager"
                  decoding="async"
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fully Insured</h3>
                <p className="text-gray-600">Comprehensive public liability insurance coverage for residential and commercial work. $20M coverage for commercial projects.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Police-Checked Staff</h3>
                <p className="text-gray-600">Every team member holds a current police check. Your safety and peace of mind is our top priority.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Award className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Standards</h3>
                <p className="text-gray-600">We use professional-grade equipment and follow manufacturer-recommended processes. Our staff are trained in safety and best-practice techniques.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Star className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">5-Star Reputation</h3>
                <p className="text-gray-600">Rated 5.0 stars across Google. We let our results and customer feedback speak for themselves.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Responsive Communication</h3>
                <p className="text-gray-600">We actually answer our phones. Fast quotes, clear communication, and reliable scheduling so you're never left wondering.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Locally Owned</h3>
                <p className="text-gray-600">We're a Gold Coast local business, not a franchise call centre. When you call, you're speaking with someone who knows the area.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Services</h2>
          <p className="text-lg text-gray-600 text-center mb-10">We provide a complete range of exterior cleaning services for residential, commercial, and strata properties.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "Window Cleaning", url: "/window-cleaning", desc: "Interior and exterior, up to 4 stories" },
              { name: "Roof Cleaning", url: "/roof-cleaning", desc: "Manufacturer-recommended process" },
              { name: "Pressure Cleaning", url: "/pressure-cleaning", desc: "Driveways, paths, patios, pool areas" },
              { name: "House & Building Softwash", url: "/house-softwash", desc: "Gentle mould and grime removal" },
              { name: "Gutter Cleaning", url: "/gutter-cleaning", desc: "Includes downpipe checks" },
              { name: "Solar Panel Cleaning", url: "/solar-panel-cleaning", desc: "Warranty-safe methods" },
              { name: "Solar Panel Bird Proofing", url: "/bird-proofing", desc: "Marine-grade mesh installation" },
            ].map((s) => (
              <Link key={s.url} to={s.url} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-colors">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">{s.name}</span>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 hero-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">Get in touch for a free, no-obligation quote.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0756512386" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              (07) 5651 2386
            </a>
            <a href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Get Free Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
