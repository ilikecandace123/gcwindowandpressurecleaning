
import React from "react";
import { Phone, Star, Shield, Users } from "lucide-react";

export default function Hero({ 
  headline, 
  subheading, 
  description, 
  backgroundImage,
  primaryCTA = "Get Free Quote",
  secondaryCTA = "Call Now",
  topOverlayClass = "absolute inset-0 bg-black/20",
  imageContainerClassName = "absolute inset-0 opacity-20",
  imageClassName = "w-full h-full object-cover"
}) {
  // scrollToQuote is no longer needed as the primary CTA is now an external link
  // const scrollToQuote = () => {
  //   const element = document.getElementById('quote-form');
  //   element?.scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <section className="relative hero-gradient text-white overflow-hidden">
      <div className={topOverlayClass}></div>
      <div className={imageContainerClassName}>
        <img
          src={backgroundImage || "/images/hero-bg-unsplash.jpg"}
          alt="Professional cleaning service"
          className={imageClassName} loading="eager" decoding="async" fetchPriority="high" width="2070" height="1380" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl">
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Fully Insured
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Police Checked Staff
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {headline}
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-blue-100 font-medium">
            {subheading}
          </p>
          
          <p className="text-lg mb-8 text-blue-50 max-w-3xl leading-relaxed">
            {description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-8">
            <div className="flex items-center text-yellow-400 mr-3">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-white font-medium">5.0 Stars</span>
            <span className="text-blue-200 ml-2">• 2500+ Happy Customers</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {primaryCTA}
            </a>
            <a
              href="tel:0756512386"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center border border-white/20"
            >
              <Phone className="w-5 h-5 mr-2" />
              {secondaryCTA}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
