
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Calendar, Star } from "lucide-react"; // Removed Mail import

export default function QuoteForm({ serviceName }) {
  return (
    <section id="quote-form" className="py-16 bg-paper-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="text-3xl md:text-[40px] font-bold text-ink leading-[1.1] mb-6">Get Your Free Quote Today

            </h2>
            <p className="text-xl text-ink-2 mb-8 leading-relaxed">Honest advice and competitive pricing. Give us a call - we usually get a quote to you straight away

            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-ochre-100 border-2 border-ink rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-ink" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink">Call Direct</h3>
                  <a href="tel:0752308293" className="link">
                    (07) 5230 8293
                  </a>
                </div>
              </div>

              {/* Removed Email Us section */}

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-ochre-100 border-2 border-ink rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-ink" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink">Quick Response</h3>
                  <p className="text-ink-2">We will actually answer your calls!</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-ochre bg-paper-2 rounded-r-xl p-6">
              <div className="flex items-center text-ochre mb-2">
                <Star className="w-5 h-5 fill-current mr-1" />
                <Star className="w-5 h-5 fill-current mr-1" />
                <Star className="w-5 h-5 fill-current mr-1" />
                <Star className="w-5 h-5 fill-current mr-1" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-ink-2 font-medium mb-2">
                "Outstanding service and communication!"
              </p>
              <p className="text-ink-2 text-sm">
                - Sarah M., satisfied customer
              </p>
            </div>
          </div>

          {/* Right Column - Link to Quote */}
          <div className="card shadow-hard-ochre p-8 lg:p-10 flex flex-col items-start justify-center">
            <h3 className="text-3xl font-bold text-ink mb-3">Ready for Your Quote?</h3>
            <p className="text-ink-2 mb-6">
              Answer a few quick questions and see your price instantly — or just leave your details and we'll call you. Fast, easy, and completely free.
            </p>
            <Link to="/instant-quote/" className="btn btn-lg btn-primary w-full sm:w-auto">
              Get My Instant Quote
            </Link>
          </div>
        </div>
      </div>
    </section>);

}