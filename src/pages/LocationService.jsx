import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Shield, Users, Star, Phone, CheckCircle, ChevronDown, ChevronUp, MapPin, ArrowRight } from 'lucide-react';
import { getSuburbBySlug, getServiceBySlug, SUBURBS, SERVICES } from "../data/locations";
import Benefits from "../components/Benefits";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import QuoteForm from "../components/QuoteForm";
import PageSEO from "../components/PageSEO";
import GoogleReviews from "../components/GoogleReviews";
import { buildLocalBusinessSchema, buildServiceSchema, buildBreadcrumbSchema } from "../data/schema";

const SERVICE_SECONDARY_IMAGES = {
  "window-cleaning": {
    src: "/images/window-hero.jpg",
    alt: "Window cleaning results on Gold Coast home"
  },
  "roof-cleaning": {
    src: "/images/roof-cleaning-1.jpg",
    alt: "Professional roof cleaning on Gold Coast property"
  },
  "house-softwash": {
    src: "/images/commercial-softwash-secondary.jpg",
    alt: "House softwash cleaning removing mould and grime"
  },
  "pressure-cleaning": {
    src: "/images/pressure-1.jpg",
    alt: "Pressure cleaning on concrete driveway"
  },
  "gutter-cleaning": {
    src: "/images/gutter-1.jpg",
    alt: "Gutter cleaning removing leaves and debris"
  },
  "solar-panel-cleaning": {
    src: "/images/solar-panel-dirty-vs-clean.webp",
    alt: "Solar panel cleaning dirty vs clean comparison"
  },
  "bird-proofing": {
    src: "/images/bird-proofing-secondary.jpg",
    alt: "Professional bird proofing mesh around rooftop solar panels"
  }
};

const SERVICE_HERO_IMAGES = {
  "window-cleaning": {
    src: "/images/window.jpg",
    alt: "Professional window cleaning"
  },
  "roof-cleaning": {
    src: "/images/roof-hero.jpg",
    alt: "Professional roof cleaning removing moss and algae"
  },
  "house-softwash": {
    src: "/images/softwash-unsplash.jpg",
    alt: "Professional house softwash cleaning"
  },
  "pressure-cleaning": {
    src: "/images/pressure-hero.jpg",
    alt: "Professional pressure cleaning on concrete driveway"
  },
  "gutter-cleaning": {
    src: "/images/gutter-screenshot.jpg",
    alt: "Professional gutter cleaning removing leaves and debris"
  },
  "solar-panel-cleaning": {
    src: "/images/solar-panel-hero.jpg",
    alt: "Professional solar panel cleaning on residential roof"
  },
  "bird-proofing": {
    src: "/images/bird-proofing-hero.jpg",
    alt: "Bird proofing mesh preventing pigeons from nesting on roof"
  }
};

export default function LocationService() {
  const { service: serviceSlug, suburb: suburbSlug } = useParams();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const suburb = getSuburbBySlug(suburbSlug);
  const service = getServiceBySlug(serviceSlug);
  const heroImage = SERVICE_HERO_IMAGES[serviceSlug] || SERVICE_HERO_IMAGES["window-cleaning"];
  const secondaryImage = SERVICE_SECONDARY_IMAGES[serviceSlug] || SERVICE_SECONDARY_IMAGES["window-cleaning"];

  useEffect(() => { window.scrollTo(0, 0); }, [serviceSlug, suburbSlug]);

  if (!suburb || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 text-lg">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Generate location-aware intro based on region
  const getLocationSpecificIntro = () => {
    const baseIntro = `Professional ${service.name.toLowerCase()} in ${suburb.name}. `;

    let regionalContext = "";
    if (suburb.region === "south_coast") {
      regionalContext = `${suburb.name} is a beautiful coastal suburb with pristine beaches and strong salt air exposure. The combination of humid subtropical weather, salt spray from the ocean, and frequent beachgoer traffic means properties here require more frequent professional cleaning maintenance. `;
    } else if (suburb.region === "central_coast") {
      regionalContext = `${suburb.name} is a vibrant waterfront community with high-rise living and holiday culture. The coastal environment with salt air exposure and busy urban activity creates unique cleaning challenges. `;
    } else if (suburb.region === "central") {
      regionalContext = `${suburb.name} is a modern suburban hub with family homes and local businesses. The expanding urban environment and regular dust from development and traffic means consistent professional cleaning helps maintain property value. `;
    } else if (suburb.region === "hinterland") {
      regionalContext = `${suburb.name} sits in the beautiful Gold Coast hinterland with rainforest surroundings and natural charm. Tree coverage, fallen leaves, pollen, and natural debris accumulation are significant factors, making regular professional cleaning essential for property maintenance. `;
    } else if (suburb.region === "northern") {
      regionalContext = `${suburb.name} is in the growing northern Gold Coast corridor with a mix of modern developments and rural properties. The developing infrastructure and varied property types mean professional cleaning services are essential for maintaining curb appeal. `;
    } else if (suburb.region === "nsw_tweed") {
      regionalContext = `${suburb.name} is a charming NSW community just south of the Queensland border in the Northern Rivers region. Our Gold Coast team proudly services across the border into NSW, delivering the same professional standards for Northern Rivers residents. The coastal and hinterland environment here requires regular professional maintenance. `;
    }

    const landmarkRef = suburb.landmarks && suburb.landmarks.length > 0
      ? `Near ${suburb.landmarks[0]}, ${suburb.name} residents trust us for professional cleaning services. `
      : ``;

    return baseIntro + regionalContext + landmarkRef +
      `Whether you're a long-time resident or new to the area, our team understands the specific cleaning challenges your location presents and delivers results that keep your property looking its best.`;
  };

  // Localised "why choose us" points
  const getLocalizedWhyChooseUs = () => {
    const basePoints = [
      {
        icon: <CheckCircle className="w-6 h-6 text-green-500" />,
        title: "Local Expertise",
        description: `We understand ${suburb.name}'s unique environment and what it takes to keep properties clean in this area.`
      },
      {
        icon: <CheckCircle className="w-6 h-6 text-green-500" />,
        title: "Prompt Local Service",
        description: `Based on the Gold Coast, we can respond quickly to service requests from ${suburb.name} and surrounding areas.`
      },
      {
        icon: <CheckCircle className="w-6 h-6 text-green-500" />,
        title: "Professional Results",
        description: `Every ${service.name.toLowerCase()} job in ${suburb.name} is performed to our highest standards with fully trained staff.`
      }
    ];

    // Add region-specific point
    if (suburb.region === "south_coast" || suburb.region === "central_coast") {
      basePoints.push({
        icon: <CheckCircle className="w-6 h-6 text-green-500" />,
        title: "Salt Air Expertise",
        description: `We specialise in coastal cleaning, understanding the impact of salt spray on properties in ${suburb.name}.`
      });
    } else if (suburb.region === "hinterland") {
      basePoints.push({
        icon: <CheckCircle className="w-6 h-6 text-green-500" />,
        title: "Tree & Debris Specialists",
        description: `Expert at managing tree coverage, fallen leaves, and natural debris common to ${suburb.name} hinterland properties.`
      });
    }

    return basePoints;
  };


  // Structured data: LocalBusiness + Service + Breadcrumb
  const localBusinessSchema = buildLocalBusinessSchema();
  const serviceSchema = buildServiceSchema({
    name: `${service.name} in ${suburb.name}`,
    description: `Professional ${service.name.toLowerCase()} in ${suburb.name}, postcode ${suburb.postcode}. Fully insured, police-checked staff.`,
    image: heroImage.src,
    serviceType: service.name,
    areaName: suburb.name,
    url: `https://gcwindowandpressurecleaning.com.au/${serviceSlug}/${suburbSlug}`
  });
  const breadcrumbData = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: service.name, url: `/${service.parentPage}` },
    { name: `${service.name} in ${suburb.name}`, url: `/${serviceSlug}/${suburbSlug}` }
  ]);

  return (
    <div>
      <PageSEO
        title={`${service.name} in ${suburb.name} | Gold Coast Window and Pressure Cleaning`}
        description={`Professional ${service.name.toLowerCase()} in ${suburb.name} (${suburb.postcode}). Fully insured, police-checked staff. Serving ${suburb.name} and surrounding Gold Coast suburbs. Call (07) 5651 2386 for a free quote.`}
        canonical={`https://gcwindowandpressurecleaning.com.au/${serviceSlug}/${suburbSlug}`}
        image={heroImage.src}
        jsonLd={[localBusinessSchema, serviceSchema, breadcrumbData]}
      />

      {/* Hero Section */}
      <section className="relative bg-white text-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-40 hidden md:block">
          <img
            src={heroImage.src}
            alt={`Professional ${service.name} in ${suburb.name}`}
            width={1024}
            height={682}
            className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="h-48">
            <img
              src={heroImage.src}
              alt={`Professional ${service.name} in ${suburb.name}`}
              width={1024}
              height={682}
              className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </div>
          <div className="bg-white px-4 py-8">
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
              <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                <Shield className="w-3 h-3 mr-1 text-blue-600" />
                Fully Insured
              </div>
              <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                <Users className="w-3 h-3 mr-1 text-blue-600" />
                Police Checked
              </div>
            </div>

            <h1 className="text-2xl font-bold leading-tight mb-3 text-gray-900">
              {service.name} in {suburb.name}
            </h1>

            <p className="text-sm mb-3 text-blue-700 font-medium">
              Gold Coast Service
            </p>

            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-400 mr-2">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-gray-800 font-medium text-xs">5.0 Stars</span>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm text-center transition-all"
              >
                Get Free Quote
              </a>
              <a
                href="tel:0756512386"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center transition-all text-sm"
              >
                <Phone className="w-3 h-3 mr-1" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
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

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
              {service.name} in {suburb.name}
            </h1>

            <p className="text-lg md:text-xl mb-3 text-blue-700 font-medium">
              Professional Service • Locally Owned • Gold Coast Based
            </p>

            <div className="flex items-center mb-6">
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
                Call Now: (07) 5651 2386
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location-Aware Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">{suburb.name}, Postcode {suburb.postcode}</span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {getLocationSpecificIntro()}
            </p>
          </div>
        </div>
      </section>

      {/* Secondary Service Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={secondaryImage.src}
              alt={`${service.name} in ${suburb.name} - ${secondaryImage.alt}`}
              width={1024}
              height={682}
              className="w-full h-64 md:h-96 object-cover"
              loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      {/* Why Choose Us - Location Specific */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Us for {service.name} in {suburb.name}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {getLocalizedWhyChooseUs().map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our {service.name} Process
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {service.process.map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Benefits benefits={service.benefits} title={`Benefits of Professional ${service.name}`} />

      {/* Google Reviews */}
      <GoogleReviews />

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {service.name} FAQs
            </h2>
            <p className="text-gray-600">Answers to common questions about {service.name.toLowerCase()} in {suburb.name}</p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {service.faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                >
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {faq.question}
                  </h3>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {openFaqIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services in this Suburb */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Other Services in {suburb.name}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            We provide a full range of exterior cleaning services in {suburb.name}:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.filter(s => s.slug !== serviceSlug).map((otherService, idx) => (
              <Link
                key={idx}
                to={`/${otherService.slug}/${suburbSlug}`}
                className="group flex items-center justify-between p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200 shadow-sm"
              >
                <span className="font-medium text-gray-900 group-hover:text-blue-700">
                  {otherService.name} in {suburb.name}
                </span>
                <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Also Serving Nearby */}
      {suburb.nearbySuburbs && suburb.nearbySuburbs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Also Serving Nearby
            </h2>
            <p className="text-center text-gray-600 mb-8">
              We also provide {service.name.toLowerCase()} services to these nearby areas:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suburb.nearbySuburbs.map((nearbySuburbName, idx) => {
                const nearbySuburbData = SUBURBS.find(s => s.name === nearbySuburbName);
                if (!nearbySuburbData) return null;
                return (
                  <Link
                    key={idx}
                    to={`/${serviceSlug}/${nearbySuburbData.slug}`}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200"
                  >
                    <span className="font-medium text-gray-900">{nearbySuburbName}</span>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Quote Form */}
      <QuoteForm serviceName={service.name} />

      {/* CTA Footer */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Professional {service.name}?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact Gold Coast Window and Pressure Cleaning today for a free quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
            >
              Get Free Quote
            </a>
            <a
              href="tel:0756512386"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              (07) 5651 2386
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
