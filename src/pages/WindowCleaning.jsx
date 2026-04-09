
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema } from "../data/schema";
import SuburbLinks from "../components/SuburbLinks";
import Benefits from "../components/Benefits";
import QuoteForm from "../components/QuoteForm";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import { Shield, Users, Star, Phone } from 'lucide-react';

export default function WindowCleaning() {
  const benefits = [
  {
    title: "Streak-Free Professional Results",
    description: "Our specialised techniques and professional-grade equipment deliver crystal clear, streak-free windows that sparkle in the sunlight."
  },
  {
    title: "Interior & Exterior Service",
    description: "Complete window cleaning service covers both inside and outside surfaces for maximum clarity and brightness in your home or office."
  },
  {
    title: "Up to 4 Stories High",
    description: "Our professional equipment and safety training allow us to safely clean windows up to 4 stories high, reaching areas you can't."
  },
  {
    title: "Includes Tracks & Flyscreens",
    description: "Comprehensive service includes cleaning window tracks, frames, and flyscreens for complete window maintenance."
  },
  {
    title: "Improves Natural Light",
    description: "Clean windows allow maximum natural light into your space, reducing the need for artificial lighting and creating a brighter environment."
  },
  {
    title: "Professional Safety Standards",
    description: "We use proper safety equipment and techniques for high-access cleaning, eliminating risks associated with DIY window cleaning."
  }];


  const faqs = [
  {
    question: "How often should windows be professionally cleaned?",
    answer: "Most residential properties benefit from window cleaning every 3-6 months, while commercial properties may need monthly or quarterly service depending on location and environmental factors."
  },
  {
    question: "Do you clean windows in all weather conditions?",
    answer: "We avoid cleaning in rain, high winds, or extreme weather for safety and quality reasons. We'll reschedule if conditions aren't suitable for optimal results."
  },
  {
    question: "Can you clean windows with security screens?",
    answer: "Yes, we can clean around most security screens and will remove and clean flyscreens where possible. We work with your existing security features safely and effectively."
  },
  {
    question: "What's included in your window cleaning service?",
    answer: "Our service includes interior and exterior window cleaning, frame cleaning, track cleaning, and flyscreen cleaning where accessible. We provide complete window maintenance."
  },
  {
    question: "Is window cleaning safe for tinted or treated windows?",
    answer: "Yes, our cleaning methods are safe for tinted windows, Low-E coatings, and most window treatments. We use appropriate techniques and solutions for different window types."
  }];

  const seoJsonLd = [
    buildLocalBusinessSchema(),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Window Cleaning",
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Gold Coast Window and Pressure Cleaning",
        "telephone": "(07) 5651 2386",
        "url": "https://gcwindowandpressurecleaning.com.au"
      },
      "areaServed": { "@type": "City", "name": "Gold Coast", "addressRegion": "QLD", "addressCountry": "AU" },
      "description": "Streak-free interior and exterior window cleaning up to 4 stories on the Gold Coast. Includes tracks and flyscreens."
    }
  ];


  return (
    <div>
      <PageSEO
        title="Window Cleaning Gold Coast | Streak-Free Interior & Exterior"
        description="Professional window cleaning on the Gold Coast up to 4 stories. Streak-free interior and exterior service including tracks and flyscreens. Fully insured. Call (07) 5651 2386."
        canonical="https://gcwindowandpressurecleaning.com.au/window-cleaning"
        jsonLd={seoJsonLd}
      />
      <section className="relative bg-white text-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-100 hidden md:block">
          <picture>
            <source srcSet="/images/window.webp" type="image/webp" />
            <img
              src="/images/window.jpg"
              alt="Window cleaner using professional equipment on a Gold Coast high-rise"
              className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" width="768" height="1024" />
          </picture>
        </div>
        
        {/* Mobile: Image first, then text below */}
        <div className="block md:hidden">
          <div className="h-64">
            <picture>
              <source srcSet="/images/window.webp" type="image/webp" />
              <img
                src="/images/window.jpg"
                alt="Window cleaner using professional equipment on a Gold Coast high-rise"
                className="w-full h-full object-cover" loading="lazy" decoding="async" width="768" height="1024" />
            </picture>
          </div>
          <div className="bg-white px-4 py-8">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <Shield className="w-4 h-4 mr-2 text-blue-600" />
                Fully Insured
              </div>
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                Police Checked Staff
              </div>
            </div>

            <h2 className="text-3xl font-bold leading-tight mb-4 text-gray-900">
              Professional Window Cleaning on the Gold Coast
            </h2>
            
            <p className="text-lg mb-4 text-blue-700 font-medium">
              Locally Owned & Operated | Fully Insured | Police Checked Staff
            </p>

            <div className="flex items-center mb-6">
              <div className="flex items-center text-yellow-400 mr-3">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-gray-800 font-medium text-sm">5.0 Stars</span>
              <span className="text-gray-600 ml-2 text-sm">• 2500+ Happy Customers</span>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all"
              >
                Get Free Quote
              </a>
              <a
                href="tel:0756512386"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-all"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Desktop: Overlay design */}
        <div className="hidden md:block relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl bg-white/50 backdrop-blur-sm rounded-lg p-8">
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Shield className="w-4 h-4 mr-2 text-blue-600" />
                Fully Insured
              </div>
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                Police Checked Staff
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
              Professional Window Cleaning on the Gold Coast
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-blue-700 font-medium">
              Locally Owned & Operated | Fully Insured | Police Checked Staff
            </p>
            
            <p className="text-lg mb-8 text-gray-600 max-w-3xl leading-relaxed">
              Streak-free interior and exterior window cleaning up to 4 stories high. Our comprehensive service includes tracks and flyscreens, delivering crystal-clear results that maximise natural light and enhance your property's appearance.
            </p>

            <div className="flex items-center mb-8">
              <div className="flex items-center text-yellow-400 mr-3">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="text-gray-800 font-medium">5.0 Stars</span>
              <span className="text-gray-600 ml-2">• 2500+ Happy Customers</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Get Free Quote
              </a>
              <a
                href="tel:0756512386"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center border border-white/20"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Local Window Cleaning Professionals
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're a trusted local business committed to delivering crystal-clear results. All our staff are 
                police-checked for your complete peace of mind, and we're fully insured for working at height and liability coverage.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We understand the importance of bright, clean living spaces. 
                We communicate clearly about our process and take extra care around your property.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Professional streak-free cleaning techniques</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Safe cleaning up to 4 stories - interior and exterior</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Complete service includes tracks and screens</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Ask us about our window cleaning plans</span>
                </div>
              </div>
            </div>
            <div>
              <picture>
                <source srcSet="/images/window-secondary.webp" type="image/webp" />
                <img
                  src="/images/window-secondary.jpg"
                  alt="Before and after professional window cleaning"
                  loading="lazy"
                  className="rounded-2xl shadow-lg" decoding="async" width="682" height="1024" />
              </picture>

            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md::text-4xl font-bold text-gray-900 mb-6">
              Complete Professional Window Cleaning Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive window cleaning service covers every aspect of window maintenance, from interior and exterior 
              glass cleaning to tracks and flyscreens, ensuring maximum clarity and cleanliness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Exterior Cleaning</h3>
              <p className="text-gray-600 text-sm">Remove dirt, grime, and weather stains from outside window surfaces.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Interior Cleaning</h3>
              <p className="text-gray-600 text-sm">Clean interior glass surfaces for maximum light transmission and clarity.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Cleaning</h3>
              <p className="text-gray-600 text-sm">Clear window tracks of dirt, debris, and buildup for smooth operation.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Flyscreen Care</h3>
              <p className="text-gray-600 text-sm">Clean and maintain flyscreens for improved airflow and appearance.</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Safety & Access Expertise</h3>
            <p className="text-lg text-gray-600 mb-6">
              Our team is trained and equipped for safe high-access window cleaning up to 4 stories. 
              We use professional-grade safety equipment and follow strict safety protocols.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Professional safety equipment</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Height safety training</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Comprehensive insurance coverage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Benefits
        benefits={benefits}
        title="Benefits of Professional Window Cleaning" />


      <Testimonials />

      <QuoteForm serviceName="Window Cleaning" />

      <FAQ faqs={faqs} title="Window Cleaning FAQ" />

      <SuburbLinks serviceSlug="window-cleaning" serviceName="Window Cleaning" />
    </div>);

}
