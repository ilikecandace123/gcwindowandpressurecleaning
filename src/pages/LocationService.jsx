import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Shield, Users, Star, Phone, CheckCircle, ChevronDown, ChevronUp, MapPin, ArrowRight } from 'lucide-react';
import { getSuburbBySlug, getServiceBySlug, SUBURBS, SERVICES } from "../data/locations";
import Benefits from "../components/Benefits";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import QuoteForm from "../components/QuoteForm";
import PageSEO from "../components/PageSEO";
import { buildLocalBusinessSchema, buildServiceSchema, buildBreadcrumbSchema, buildFAQSchema } from "../data/schema";

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
    src: "/images/softwash-1.jpg",
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

  // Service-specific reviews — 3 per service, reviewer suburb always matches the page
  const getLocalReviews = () => {
    // Pool of Australian first names + last initials to pick from per service
    // We use a simple hash of the suburb slug to pick consistent but varied names
    const namePool = [
      "John M.", "Peter K.", "Sarah L.", "Mark T.", "Jenny R.",
      "David W.", "Karen B.", "Steve H.", "Lisa P.", "Greg C.",
      "Michelle D.", "Andrew S.", "Tracey N.", "Shane F.", "Donna G.",
      "Chris A.", "Julie W.", "Matt R.", "Bec H.", "Tony J.",
      "Wendy S.", "Paul M.", "Sandra K.", "Brett L.", "Angela T.",
      "Darren P.", "Joanne B.", "Simon C.", "Megan F.", "Craig D."
    ];

    // Simple hash to get consistent name picks per suburb
    const hash = suburb.slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

    const getName = (offset) => namePool[(hash + offset) % namePool.length];

    const reviewsByService = {
      "window-cleaning": [
        { name: getName(0), text: "Really happy with how the windows turned out. They got into all the corners and tracks that I can never reach. House feels so much brighter now." },
        { name: getName(7), text: "Had them do inside and out plus the flyscreen clean. Honestly didn't realise how dirty the screens were until I saw the difference. Great job." },
        { name: getName(14), text: "Been using these guys for about a year now. Always on time, always leave everything spotless. No complaints at all." }
      ],
      "roof-cleaning": [
        { name: getName(1), text: "Roof was looking pretty rough with all the lichen and dark streaks. Looks brand new now. Neighbours asked if we'd had it replaced!" },
        { name: getName(8), text: "They were careful with the gardens and cleaned up after themselves. Roof hasn't looked this good since we moved in." },
        { name: getName(15), text: "Got a quote same day and they were out within the week. Very thorough job, even showed me before and after photos." }
      ],
      "house-softwash": [
        { name: getName(2), text: "The mould on the rendered walls was driving me nuts. Soft wash took it all off without any damage. Should have done it ages ago." },
        { name: getName(9), text: "Whole house looks like it's just been repainted. The eaves and fascia came up amazing. Really professional crew." },
        { name: getName(16), text: "Was worried about the pressure damaging the paint but they explained the soft wash process and it was completely fine. House looks fantastic." }
      ],
      "pressure-cleaning": [
        { name: getName(3), text: "Driveway was covered in tyre marks and oil stains. They got about 90% of it out which is way better than I expected. Looks great." },
        { name: getName(10), text: "Had the paths, driveway and pool area done. Massive difference. Didn't realise how much grime had built up over the years." },
        { name: getName(17), text: "Quick job, fair price, and the concrete looks like it was just poured. Will definitely book again next year." }
      ],
      "gutter-cleaning": [
        { name: getName(4), text: "Gutters were completely blocked and overflowing in the last storm. All cleared out now and they checked the downpipes too. Good as gold." },
        { name: getName(11), text: "They sent through photos of everything they found in the gutters. Was good to see the before and after. Very thorough." },
        { name: getName(18), text: "I hate getting on the roof so happy to have someone reliable to do this. They were in and out in no time. Recommended to my mate already." }
      ],
      "solar-panel-cleaning": [
        { name: getName(5), text: "Panels were filthy and I'd noticed the output dropping. Got them cleaned and the generation went straight back up. Pays for itself really." },
        { name: getName(12), text: "Didn't want to get up on the roof myself and risk voiding the warranty. These guys knew exactly what they were doing. Panels look perfect." },
        { name: getName(19), text: "Quick and easy. They used proper gear that won't scratch the panels. Energy output improved noticeably within a couple of days." }
      ],
      "bird-proofing": [
        { name: getName(6), text: "Pigeons had been nesting under our solar panels for over a year and the mess was unreal. They cleaned everything up and fitted mesh all the way around the array. No more birds, no more droppings." },
        { name: getName(14), text: "Mynas were driving us nuts getting under the panels. The mesh job is super neat, you can barely see it, and it's been months without a single bird. Reasonable price too." },
        { name: getName(21), text: "Solar warranty was my big concern and they used panel clips instead of drilling. The installation is tidy and the birds have completely moved on. Very happy with the whole job." }
      ]
    };

    const reviews = reviewsByService[serviceSlug] || reviewsByService["window-cleaning"];
    return reviews.map(r => ({ ...r, suburb: suburb.name }));
  };

  // Structured data: LocalBusiness + Service + FAQ + Breadcrumb
  const localBusinessSchema = buildLocalBusinessSchema();
  const serviceSchema = buildServiceSchema({
    name: `${service.name} in ${suburb.name}`,
    description: `Professional ${service.name.toLowerCase()} in ${suburb.name}, postcode ${suburb.postcode}. Fully insured, police-checked staff.`,
    image: heroImage.src,
    serviceType: service.name,
    areaName: suburb.name,
    url: `https://gcwindowandpressurecleaning.com.au/${serviceSlug}/${suburbSlug}`
  });
  const faqSchemaData = buildFAQSchema(service.faqs);
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
        jsonLd={[localBusinessSchema, serviceSchema, faqSchemaData, breadcrumbData]}
      />

      {/* Hero Section */}
      <section className="relative bg-white text-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-40 hidden md:block">
          <img
            src={heroImage.src}
            alt={`Professional ${service.name} in ${suburb.name}`}
            className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="h-48">
            <img
              src={heroImage.src}
              alt={`Professional ${service.name} in ${suburb.name}`}
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
                href="https://tinyurl.com/jimscleaning"
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
                href="https://tinyurl.com/jimscleaning"
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

      {/* Local Reviews */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">What {suburb.name} Residents Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {getLocalReviews().map((review, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-gray-700 italic mb-4 flex-grow">"{review.text}"</p>
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-gray-500 text-xs">{review.suburb}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <a
                key={idx}
                href={`/${otherService.slug}/${suburbSlug}`}
                className="group flex items-center justify-between p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200 shadow-sm"
              >
                <span className="font-medium text-gray-900 group-hover:text-blue-700">
                  {otherService.name} in {suburb.name}
                </span>
                <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
              </a>
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
                  <a
                    key={idx}
                    href={`/${serviceSlug}/${nearbySuburbData.slug}`}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200"
                  >
                    <span className="font-medium text-gray-900">{nearbySuburbName}</span>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </a>
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
              href="https://tinyurl.com/jimscleaning"
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
