
import React from "react";
import QuoteHero from "../components/QuoteHero";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema, buildFAQSchema } from "../data/schema";
import SuburbLinks from "../components/SuburbLinks";
import Benefits from "../components/Benefits";
import QuoteForm from "../components/QuoteForm";
import FAQ from "../components/FAQ";
import GoogleReviews from "../components/GoogleReviews";
import { Shield, Users, Star, Phone, ArrowRight, Home, Camera, HardHat } from 'lucide-react';
import WellnessPlanSection from "../components/WellnessPlanSection";

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
    title: "Up to 4 Storeys High",
    description: "Our professional equipment and safety training allow us to safely clean windows up to 4 storeys high, reaching areas you can't."
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
    question: "How much does window cleaning cost on the Gold Coast?",
    answer: "Window cleaning on the Gold Coast starts at $220–$440 for most apartments and small offices (inside and out). Single-storey homes and medium businesses are typically $385–$550, including deep track and screen cleaning. Double-storey homes and larger businesses are usually $500–$800, including tracks and screens. Large commercial properties, car dealerships, and homes with extensive glazing are $800+ and require a site visit. These are guide prices — every property is individual, so contact us for a free, no-obligation quote."
  },
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
      "description": "Streak-free interior and exterior window cleaning up to 4 storeys on the Gold Coast. Includes tracks and flyscreens."
    },
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Window Cleaning", url: "/window-cleaning/" }
    ]),
    buildFAQSchema(faqs)
  ];


  return (
    <div>
      <PageSEO
        title="Window Cleaning Gold Coast | Streak-Free Results"
        description="Streak-free window cleaning across the Gold Coast — interior & exterior up to 4 storeys, including tracks & flyscreens. Fully insured, police-checked."
        canonical="https://gcwindowandpressurecleaning.com.au/window-cleaning/"
        image="/images/window-hero.jpg"
        jsonLd={seoJsonLd}
      />
      <QuoteHero
        headline={'Professional Window Cleaning on the Gold Coast'}
        subheading={'Streak-free glass, tracks & screens — inside and out.'}
        backgroundImage={'/images/window.jpg'}
      />

      {/* Window Cleaning Plans — the focal point of this page */}
      <WellnessPlanSection />

      {/* Other window services — clearly visible, visually secondary */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Just need a one-time clean?</h2>
            <p className="text-gray-600">No problem — we do those too.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Once-off window clean</h3>
              </div>
              <p className="text-sm text-gray-600 flex-1">One-time clean, no commitment — inside, outside or both.</p>
              <Link to="/instant-quote/" className="mt-4 inline-flex items-center text-blue-600 font-semibold text-sm hover:underline">
                Get an instant quote <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Camera className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Pre-sale window clean</h3>
              </div>
              <p className="text-sm text-gray-600 flex-1">Get the property photo-ready before it goes to market.</p>
              <Link to="/instant-quote/" className="mt-4 inline-flex items-center text-blue-600 font-semibold text-sm hover:underline">
                Get an instant quote <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <HardHat className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Builders / construction clean</h3>
              </div>
              <p className="text-sm text-gray-600 flex-1">Removing paint, render and building residue after a build or reno.</p>
              <Link to="/instant-quote/" className="mt-4 inline-flex items-center text-blue-600 font-semibold text-sm hover:underline">
                Request a quote <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
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
                  <span className="text-gray-700">Safe cleaning up to 4 storeys - interior and exterior</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
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
              Our team is trained and equipped for safe high-access window cleaning up to 4 storeys. 
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


      <GoogleReviews />

      <QuoteForm serviceName="Window Cleaning" />

      <FAQ faqs={faqs} title="Window Cleaning FAQ" />

      {/* Related Services */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/roof-cleaning/" className="block p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Roof Cleaning</h3>
              <p className="text-sm text-gray-600">Professional roof cleaning to extend your roof's life and boost curb appeal.</p>
            </Link>
            <Link to="/house-softwash/" className="block p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">House Softwash</h3>
              <p className="text-sm text-gray-600">Gentle, effective cleaning that protects your home's exterior while removing dirt and stains.</p>
            </Link>
          </div>
        </div>
      </section>

      <SuburbLinks serviceSlug="window-cleaning" serviceName="Window Cleaning" />
    </div>);

}
