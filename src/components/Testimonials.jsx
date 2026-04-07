
import React from "react";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Burleigh Heads",
      rating: 5,
      text: "Absolutely exceptional service! The team was professional, punctual, and the results exceeded our expectations. Our windows have never looked better!",
      service: "Window Cleaning"
    },
    {
      name: "Michael Chen",
      location: "Robina",
      rating: 5,
      text: "Outstanding communication throughout the entire process. They kept us informed every step of the way and left our property spotless. Highly recommended!",
      service: "Roof Cleaning"
    },
    {
      name: "Emma Williams",
      location: "Coomera",
      rating: 5,
      text: "These guys go above and beyond. We thought the house needed painting but it looks brand new after the house wash treatment.",
      service: "House Softwash"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 relative border border-gray-100"
            >
              <Quote className="w-8 h-8 text-blue-200 mb-4" />
              
              <div className="flex items-center text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">
                      {testimonial.service}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
