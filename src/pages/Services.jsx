
import React from "react";
import { Link } from "react-router-dom";
// Convert PascalCase page name to kebab-case URL
const createPageUrl = (pageName) =>
  "/" + pageName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
import {
  ArrowRight,
  Star,
  Shield,
  Users,
  CheckCircle } from
"lucide-react";
import { useEffect } from "react";
import GoogleReviews from "../components/GoogleReviews";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "../data/schema";

export default function Services() {
  const services = [
  {
    imageUrl: "/images/roof-cleaning-1.jpg",
    title: "Roof Cleaning",
    description: "Professional manufacturer-recommended process extends roof life, improves curb appeal, and prevents costly damage.",
    benefits: ["Extends roof life", "Boosts curb appeal", "Prevents damage"],
    page: "RoofCleaning"
  },
  {
    imageUrl: "/images/window-hero.jpg",
    title: "Window Cleaning",
    description: "Streak-free interior and exterior window cleaning up to 4 stories. Includes tracks and flyscreens.",
    benefits: ["Streak-free results", "Up to 4 stories", "Includes extras"],
    page: "WindowCleaning"
  },
  {
    imageUrl: "/images/commercial-softwash-secondary.jpg",
    title: "House & Building Softwash",
    description: "Gentle surface-safe cleaning removes mould, dirt, spider webs, and wasp nests without damage.",
    benefits: ["Safe for surfaces", "Removes mould", "Long-lasting results"],
    page: "HouseSoftWash"
  },
  {
    imageUrl: "/images/pressure-1.jpg",
    title: "Pressure Cleaning",
    description: "Industrial-grade cleaning for concrete, driveways, walkways, and patios. Deep clean that lasts.",
    benefits: ["Industrial grade", "Deep cleaning", "Long-lasting"],
    page: "PressureCleaning"
  },
  {
    imageUrl: "/images/gutter-1.jpg",
    title: "Gutter Cleaning",
    description: "Complete gutter cleaning and maintenance to prevent water damage and keep your property storm-ready.",
    benefits: ["Prevents water damage", "Storm ready", "Complete maintenance"],
    page: "GutterCleaning"
  },
  {
    imageUrl: "/images/solar-panel-hero.jpg",
    title: "Solar Panel Cleaning",
    description: "Professional solar panel cleaning to restore efficiency and maximise your energy output.",
    benefits: ["Restores efficiency", "Maximises output", "Extends panel life"],
    page: "SolarPanelCleaning"
  },
  {
    imageUrl: "/images/bird-proofing-hero.jpg",
    title: "Solar Panel Bird Proofing",
    description: "Marine-grade mesh that stops pigeons and mynas nesting under your solar panels. Warranty-safe and humane.",
    benefits: ["Protects solar panels", "Restores energy output", "Warranty safe"],
    page: "BirdProofing"
  }];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageSEO
        title="Gold Coast Window & Pressure Cleaning | Exterior Cleaning Services"
        description="Gold Coast's trusted exterior cleaning service. Window cleaning, roof cleaning, pressure cleaning, softwash, gutter cleaning and solar panel cleaning. Fully insured, police-checked staff. Call (07) 5651 2386."
        canonical="https://gcwindowandpressurecleaning.com.au/"
        image="/images/services-banner.jpg"
        jsonLd={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" }
          ])
        ]}
      />
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 opacity-30 z-0">
          <img
            src="/images/services-banner.jpg"
            alt="Professional exterior cleaning team working on a Gold Coast residential property"
            className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" width="1024" height="768" />

        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="w-5 h-5 mr-2" />
              Fully Insured
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="w-5 h-5 mr-2" />
              Police Checked Staff
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Professional Window and Exterior Cleaning
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-100">• Local • Quality • Trustworthy

          </p>
          <p className="text-lg mb-8 text-blue-50 max-w-3xl mx-auto">Serving the Gold Coast and surrounding areas. 
We are fully insured and all staff are police-checked for your peace of mind.

          </p>

          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center text-yellow-400 mr-3">
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
            </div>
            <span className="text-white font-medium text-lg">5.0 Stars • 2500+ Happy Customers</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Service
            </h2>
            <p className="text-xl text-gray-600">
              Professional exterior cleaning services tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) =>
            <Link
              key={index}
              to={createPageUrl(service.page)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col">

                <div className="p-8 flex flex-col flex-grow items-center text-center">
                  {service.imageUrl ?
                <div className="w-64 h-64 mb-8 flex items-center justify-center overflow-hidden rounded-2xl">
                      <picture className="flex items-center justify-center max-w-full max-h-full">
                        <source srcSet={service.imageUrl.replace('.jpg', '.webp')} type="image/webp" />
                        <img src={service.imageUrl} alt={service.title} loading="lazy" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" decoding="async" width="256" height="256" />
                      </picture>
                    </div> :

                <div className="w-64 h-64 bg-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-105 transition-transform">
                      {/* Fallback in case icon is used and imageUrl is not */}
                      {service.icon && <service.icon className="w-32 h-32 text-gray-400" />}
                    </div>
                }

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6 text-left self-stretch">
                    {service.benefits.map((benefit, i) =>
                  <div key={i} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </div>
                  )}
                  </div>

                  <div className="mt-auto flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews />

      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">We can usually have a free quote to you within 15 minutes.

          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0756512386"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center">

              <span>Call (07) 5651 2386</span>
            </a>
            <a
              href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">

              Get Free Quote
            </a>
          </div>
        </div>
      </section>
    </div>);

}