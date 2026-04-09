
import React from "react";
import { Link } from "react-router-dom";
import { Shield, Users, Star, Phone } from "lucide-react";
import Benefits from "../components/Benefits";
import QuoteForm from "../components/QuoteForm";
import FAQ from "../components/FAQ";
import GoogleReviews from "../components/GoogleReviews";
import PageSEO from "../components/PageSEO";
import SuburbLinks from "../components/SuburbLinks";
import { buildLocalBusinessSchema, buildServiceSchema, buildBreadcrumbSchema, buildFAQSchema } from "../data/schema";

export default function PatioCleaning() {
  const benefits = [
    {
      title: "Restores Surface Beauty",
      description: "Professional cleaning removes years of dirt, stains, and organic growth to reveal the original beauty of your patio surfaces."
    },
    {
      title: "Improves Outdoor Safety",
      description: "Eliminate slippery mould, algae, and moss that create dangerous slip hazards on patio surfaces, making outdoor areas safe for family."
    },
    {
      title: "Makes Patios Inviting Again",
      description: "Transform neglected outdoor spaces into welcoming entertainment areas where you'll actually want to spend time."
    },
    {
      title: "Increases Property Value",
      description: "Clean, well-maintained outdoor spaces significantly boost curb appeal and add value to your property investment."
    },
    {
      title: "Extends Surface Life",
      description: "Regular professional cleaning prevents permanent staining and deterioration, protecting your patio investment long-term."
    },
    {
      title: "Prepares for Entertainment",
      description: "Create the perfect backdrop for outdoor dining, BBQs, and gatherings with clean, attractive patio surfaces."
    }
  ];

  const faqs = [
    {
      question: "What types of patio surfaces can you clean?",
      answer: "We clean all types of patio surfaces including concrete, pavers, natural stone, brick, tile, and composite decking. Our techniques are adapted for each specific material."
    },
    {
      question: "How do you handle delicate patio surfaces?",
      answer: "For delicate surfaces like natural stone or aged pavers, we use lower pressure settings and specialised cleaning solutions to achieve excellent results without damage."
    },
    {
      question: "Can you remove stains from patio furniture areas?",
      answer: "Yes, we can remove most stains including rust marks from furniture, food and drink spills, and organic stains. We use specialised treatments for different stain types."
    },
    {
      question: "Will you clean around plants and garden areas?",
      answer: "Absolutely. We take special care around landscaping, pre-wetting plants and using plant-safe cleaning solutions. We protect your garden while cleaning effectively."
    },
    {
      question: "How long before I can use my patio after cleaning?",
      answer: "Most patios are ready to use immediately after cleaning and drying. For treatments that require curing time, we'll let you know the recommended wait period."
    }
  ];

  return (
    <div>
      <PageSEO
        title="Patio Cleaning Gold Coast | Professional Pressure Cleaning"
        description="Professional patio cleaning on the Gold Coast. Remove mould, algae and stains from pavers, concrete and tiled patios. Fully insured. Call (07) 5651 2386 for a free quote."
        canonical="https://gcwindowandpressurecleaning.com.au/patio-cleaning"
        image="/images/patio-unsplash.jpg"
        jsonLd={[
          buildLocalBusinessSchema(),
          buildServiceSchema({
            name: "Patio Cleaning",
            description: "Professional patio cleaning removes mould, algae and stains from pavers, concrete and tiled patios.",
            image: "/images/patio-unsplash.jpg",
            serviceType: "Patio Cleaning",
            url: "https://gcwindowandpressurecleaning.com.au/patio-cleaning"
          }),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Patio Cleaning", url: "/patio-cleaning" }
          ]),
          buildFAQSchema(faqs)
        ]}
      />
      <section className="relative bg-white text-gray-800 overflow-hidden">
        
        {/* Mobile: Image first, then text below */}
        <div className="block md:hidden">
          <div className="h-64">
            <picture>
              <source srcSet="/images/patio-unsplash.webp" type="image/webp" />
              <img
                src="/images/patio-unsplash.jpg"
                alt="Professional patio cleaning service"
                className="w-full h-full object-cover" loading="lazy" decoding="async" width="2070" height="1376" />
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

            <h1 className="text-3xl font-bold leading-tight mb-4 text-gray-900">
              Professional Patio Cleaning on the Gold Coast
            </h1>
            
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
                Get Free Patio Quote
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
        <div className="hidden md:block">
          <div className="absolute inset-0 opacity-100">
            <picture>
              <source srcSet="/images/patio-unsplash.webp" type="image/webp" />
              <img
                src="/images/patio-unsplash.jpg"
                alt="Professional patio cleaning service"
                className="w-full h-full object-cover" loading="lazy" decoding="async" width="2070" height="1376" />
            </picture>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
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
                Professional Patio Cleaning on the Gold Coast
              </h1>
              
              <p className="text-xl md:text-2xl mb-4 text-blue-700 font-medium">
                Locally Owned & Operated | Fully Insured | Police Checked Staff
              </p>
              
              <p className="text-lg mb-8 text-gray-600 max-w-3xl leading-relaxed">
                Restore and revitalise your outdoor spaces with professional patio cleaning. We make patios safe, clean, and inviting again by removing stains, mould, and organic growth while protecting surface integrity.
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
                  Get Free Patio Quote
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
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/patio-secondary-unsplash.jpg"
                alt="Professional patio cleaning transformation"
                className="rounded-2xl shadow-lg" loading="lazy" decoding="async" width="1000" height="1500" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Local Patio Restoration Experts
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're a trusted local business committed to transforming your outdoor spaces. All our staff are 
                police-checked for your peace of mind, and we're fully insured for complete protection.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Surface-specific cleaning techniques</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Safe for all patio surface materials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Plant and garden protection included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Creates safe, slip-free surfaces</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transform Your Outdoor Living Space
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive patio cleaning service removes years of stains, mould, and buildup while protecting 
              your surfaces, creating beautiful outdoor spaces perfect for entertainment and relaxation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Before & After Results</h3>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Before Cleaning:</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Stained, discoloured surfaces</li>
                    <li>• Slippery mould and algae</li>
                    <li>• Dirt-filled joints and cracks</li>
                    <li>• Uninviting appearance</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">After Professional Cleaning:</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Restored original surface colour</li>
                    <li>• Safe, slip-free surfaces</li>
                    <li>• Clean joints and renewed appearance</li>
                    <li>• Inviting entertainment space</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-blue-600 mb-2">Concrete Patios</h4>
                  <p className="text-sm text-gray-600">Deep cleaning removes oil stains and restores original colour.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-green-600 mb-2">Stone & Pavers</h4>
                  <p className="text-sm text-gray-600">Gentle techniques preserve surface integrity while cleaning thoroughly.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-purple-600 mb-2">Tile & Brick</h4>
                  <p className="text-sm text-gray-600">Specialised cleaning removes years of weather staining.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-orange-600 mb-2">Composite Decks</h4>
                  <p className="text-sm text-gray-600">Safe cleaning methods maintain material warranties.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Benefits 
        benefits={benefits} 
        title="Why Professional Patio Cleaning Makes a Difference"
      />

      <GoogleReviews />

      <QuoteForm serviceName="Patio Cleaning" />

      <FAQ faqs={faqs} title="Patio Cleaning FAQ" />

      {/* Related Services */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/pressure-cleaning" className="block p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pressure Cleaning</h3>
              <p className="text-sm text-gray-600">Powerful pressure cleaning for driveways, patios, and hard surfaces.</p>
            </Link>
            <Link to="/house-soft-wash" className="block p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">House Softwash</h3>
              <p className="text-sm text-gray-600">Gentle, effective cleaning that protects your home's exterior while removing dirt and stains.</p>
            </Link>
          </div>
        </div>
      </section>

      <SuburbLinks serviceSlug="patio-cleaning" serviceName="Patio Cleaning" />
    </div>
  );
}
