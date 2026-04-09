
import React from "react";
import { Phone, Calendar, Star } from "lucide-react"; // Removed Mail import

export default function QuoteForm({ serviceName }) {
  return (
    <section id="quote-form" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Get Your Free Quote Today

            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">Honest advice and competitive pricing. Give us a call - we usually get a quote to you straight away

            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Direct</h3>
                  <a href="tel:0756512386" className="text-blue-600 font-medium hover:underline">
                    (07) 5651 2386
                  </a>
                </div>
              </div>

              {/* Removed Email Us section */}

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Quick Response</h3>
                  <p className="text-gray-600">We will actually answer your calls!</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center text-yellow-500 mb-2">
                <Star className="w-5 h-5 fill-current mr-1" />
                <Star className="w-5 h-5 fill-current mr-1" />
                <Star className="w-5 h-5 fill-current mr-1" />
                <Star className="w-5 h-5 fill-current mr-1" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-gray-700 font-medium mb-2">
                "Outstanding service and communication!"
              </p>
              <p className="text-gray-600 text-sm">
                - Sarah M., satisfied customer
              </p>
            </div>
          </div>

          {/* Right Column - Link to Quote */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for Your Quote?</h3>
            <p className="text-gray-600 mb-6">
              Click the button below to be directed to our secure online quote form. It's fast, easy, and completely free.
            </p>
            <a
              href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-semibold text-lg rounded-lg flex items-center justify-center transition-all transform hover:scale-105 shadow-lg">

              Get My Free Quote Now
            </a>
             <p className="text-center text-sm text-gray-500 mt-4">
                You will be redirected to our trusted partner's website.
              </p>
          </div>
        </div>
      </div>
    </section>);

}