import React from "react";
import { Phone, Clock, MapPin } from "lucide-react";
import PageSEO from "../components/PageSEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "../data/schema";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageSEO
        title="Contact Us | Gold Coast Window and Pressure Cleaning"
        description="Get in touch with Gold Coast Window and Pressure Cleaning. Call (07) 5651 2386 for a free quote. Serving all Gold Coast suburbs and Northern NSW."
        canonical="https://gcwindowandpressurecleaning.com.au/contact/"
        jsonLd={[
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact/" }
          ])
        ]}
      />

      <Breadcrumbs items={[{ name: "Contact Us", url: "/contact/" }]} />

      {/* Hero */}
      <section className="hero-gradient text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">We'd love to hear from you. Get in touch for a free, no-obligation quote.</p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left - Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:0756512386" className="text-blue-600 text-lg font-medium hover:underline">(07) 5651 2386</a>
                    <p className="text-sm text-gray-500 mt-1">We actually answer our phones!</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Open 24 Hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Service Area</h3>
                    <p className="text-gray-600">All Gold Coast suburbs (Coolangatta to Ormeau), Gold Coast Hinterland, and Northern NSW (Tweed Heads, Kingscliff and surrounds).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Map + CTA */}
            <div>
              <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14083.42582439664!2d153.41225468715817!3d-28.059407199999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4da98023da1e33a5%3A0x8802b89fee690ea8!2sGold%20Coast%20Window%20and%20Pressure%20Cleaning!5e0!3m2!1sen!2sau!4v1775596752940!5m2!1sen!2sau"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gold Coast Window and Pressure Cleaning location on Google Maps"
                />
              </div>

              <div className="bg-blue-50 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Request a Free Quote</h3>
                <p className="text-gray-600 mb-6">Click below to fill out our quick online form and we'll get back to you fast.</p>
                <a
                  href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Get My Free Quote
                </a>
                <p className="text-sm text-gray-500 mt-3">You'll be redirected to our trusted booking partner.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
