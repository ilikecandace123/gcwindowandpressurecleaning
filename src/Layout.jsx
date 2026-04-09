
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
const createPageUrl = (pageName) => "/" + pageName.replace(/ /g, "-");
import { Phone, Star, Shield, Users, Home, MapPin, Menu, X, ChevronDown } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = React.useState(false);
  const [commercialDropdownOpen, setCommercialDropdownOpen] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setCommercialDropdownOpen(false);
  }, [location.pathname]);


  return (
    <div className="min-h-screen bg-white">
      {/* Trust Bar */}
      <div className="bg-blue-600 text-white text-xs sm:text-sm py-1.5 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center gap-6">
          <div className="flex items-center">
            <Shield className="w-3.5 h-3.5 mr-1.5" />
            Fully Insured
          </div>
          <div className="flex items-center">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            Police Checked Staff
          </div>
          <div className="flex items-center">
            <Star className="w-3.5 h-3.5 mr-1.5 fill-yellow-300 text-yellow-300" />
            5.0 Stars — 2500+ Happy Customers
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-4 h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 min-w-0">
              <img src="/images/logo.avif" alt="Gold Coast Window and Pressure Cleaning" className="h-10 sm:h-12 object-contain flex-shrink-0" loading="eager" decoding="async" fetchPriority="high" />
              <div className="hidden xl:block min-w-0">
                <span className="text-base font-bold text-gray-900 leading-tight whitespace-nowrap">Gold Coast Window and Pressure Cleaning</span>
                <p className="text-xs text-gray-500 whitespace-nowrap">Professional Exterior Cleaning Services</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap">
                  Residential
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link to="/window-cleaning" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      Window Cleaning
                    </Link>
                    <Link to="/roof-cleaning" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      Roof Cleaning
                    </Link>
                    <Link to="/pressure-cleaning" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      Pressure Cleaning
                    </Link>
                    <Link to="/house-softwash" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      House Softwash
                    </Link>
                    <Link to="/gutter-cleaning" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      Gutter Cleaning
                    </Link>
                    <Link to="/solar-panel-cleaning" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      Solar Panel Cleaning
                    </Link>
                    <Link to="/bird-proofing" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      Solar Panel Bird Proofing
                    </Link>
                  </div>
                )}
              </div>

              {/* Commercial & Strata Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCommercialDropdownOpen(true)}
                onMouseLeave={() => setCommercialDropdownOpen(false)}
              >
                <button onClick={() => setCommercialDropdownOpen(!commercialDropdownOpen)} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap">
                  Commercial & Strata
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${commercialDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {commercialDropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link to="/commercial/window-cleaning" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      Commercial Window Cleaning
                    </Link>
                    <Link to="/commercial/roof-cleaning" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      Commercial Roof Cleaning
                    </Link>
                    <Link to="/commercial/pressure-cleaning" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      Commercial Pressure Cleaning
                    </Link>
                    <Link to="/commercial/house-softwash" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      Commercial Building Softwash
                    </Link>
                    <Link to="/commercial/gutter-cleaning" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      Commercial Gutter Cleaning
                    </Link>
                    <Link to="/commercial/solar-panel-cleaning" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      Commercial Solar Panel Cleaning
                    </Link>
                    <Link to="/commercial/bird-proofing" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      Commercial Solar Bird Proofing
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap">About</Link>
              <Link to="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap">Contact</Link>

            </nav>

            {/* CTA Buttons + Mobile Menu Toggle */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href="https://book.servicem8.com/request_booking?uuid=49a4f311-ef6e-4542-8d7b-206e67cd288b"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-5 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                <span className="hidden sm:inline">Get Free Quote</span>
                <span className="sm:hidden">Quote</span>
              </a>
              <a href="tel:0756512386" className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center">
                <Phone className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">(07) 5651 2386</span>
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="lg:hidden ml-1 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              <div className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Residential</div>
              <Link to="/window-cleaning" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                Window Cleaning
              </Link>
              <Link to="/roof-cleaning" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                Roof Cleaning
              </Link>
              <Link to="/pressure-cleaning" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                Pressure Cleaning
              </Link>
              <Link to="/house-softwash" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                House Softwash
              </Link>
              <Link to="/gutter-cleaning" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                Gutter Cleaning
              </Link>
              <Link to="/solar-panel-cleaning" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                Solar Panel Cleaning
              </Link>
              <Link to="/bird-proofing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                Solar Panel Bird Proofing
              </Link>

              <div className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Commercial & Strata</div>
              <Link to="/commercial/window-cleaning" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                Commercial Window Cleaning
              </Link>
              <Link to="/commercial/roof-cleaning" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                Commercial Roof Cleaning
              </Link>
              <Link to="/commercial/pressure-cleaning" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                Commercial Pressure Cleaning
              </Link>
              <Link to="/commercial/house-softwash" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                Commercial Building Softwash
              </Link>
              <Link to="/commercial/gutter-cleaning" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                Commercial Gutter Cleaning
              </Link>
              <Link to="/commercial/solar-panel-cleaning" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                Commercial Solar Panel Cleaning
              </Link>
              <Link to="/commercial/bird-proofing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors pl-6">
                Commercial Solar Bird Proofing
              </Link>

              <div className="border-t border-gray-100 mt-2 pt-2">
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">About Us</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">Contact</Link>
              </div>

              <div className="border-t border-gray-100 mt-2 pt-2 flex items-center gap-4 px-3 py-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <Shield className="w-3.5 h-3.5 mr-1 text-blue-600" />
                  Fully Insured
                </div>
                <div className="flex items-center">
                  <Users className="w-3.5 h-3.5 mr-1 text-blue-600" />
                  Police Checked
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-5 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                 <img src="/images/logo.avif" alt="Company Logo" className="h-12 w-12 object-contain bg-white rounded-lg p-1" loading="lazy" decoding="async" />
                <div>
                  <h3 className="text-lg font-bold leading-tight">Gold Coast Window and Pressure Cleaning</h3>
                  {/* 'Professionals' is spelled the same in US and Australian English */}
                  <p className="text-gray-400 text-xs">Your Trusted Local Cleaning Professionals</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                {/* 'Premier', 'service', 'insured', 'police-checked' are spelled the same in US and Australian English, or are common variations. */}
                Gold Coast's premier exterior cleaning service. Fully insured and police-checked staff 
                for your complete peace of mind.
              </p>
            </div>
            
            <div className="md:col-span-3 flex justify-center">
              <div className="text-center">
                {/* 'Services' is spelled the same in US and Australian English */}
                <h4 className="font-semibold mb-4">Our Services</h4>
                <div className="flex gap-16">
                  <div className="space-y-2 text-sm text-gray-400">
                    <Link to={"/roof-cleaning"} className="block hover:text-white transition-colors">Roof Cleaning</Link>
                    <Link to={"/window-cleaning"} className="block hover:text-white transition-colors">Window Cleaning</Link>
                    <Link to={"/house-softwash"} className="block hover:text-white transition-colors">House &amp; Building Softwash</Link>
                    <Link to={"/pressure-cleaning"} className="block hover:text-white transition-colors">Pressure Cleaning</Link>
                  </div>
                  <div className="space-y-2 text-sm text-gray-400">
                    <Link to={"/gutter-cleaning"} className="block hover:text-white transition-colors">Gutter Cleaning</Link>
                    <Link to={"/solar-panel-cleaning"} className="block hover:text-white transition-colors">Solar Panel Cleaning</Link>
                    <Link to={"/bird-proofing"} className="block hover:text-white transition-colors">Solar Panel Bird Proofing</Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  (07) 5651 2386
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center text-yellow-400 mb-2">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <Star className="w-4 h-4 fill-current mr-1" />
                  {/* 'Rating' is spelled the same in US and Australian English */}
                  <span className="text-white text-sm ml-2">5.0 Rating</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Service Areas + Map */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <Link to="/service-areas" className="block hover:text-blue-400 transition-colors">
                  <h4 className="font-semibold mb-4">Service Areas — View All Suburbs</h4>
                </Link>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-400">
                  {["Burleigh Heads", "Surfers Paradise", "Broadbeach", "Southport", "Robina",
                    "Palm Beach", "Coomera", "Nerang", "Helensvale", "Currumbin",
                    "Coolangatta", "Hope Island", "Mermaid Beach", "Tweed Heads", "Kingscliff"].map(suburb => {
                    const slug = suburb.toLowerCase().replace(/ /g, '-');
                    return (
                      <Link key={slug} to={`/window-cleaning/${slug}`} className="hover:text-white transition-colors">
                        {suburb}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:w-72 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14083.42582439664!2d153.41225468715817!3d-28.059407199999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4da98023da1e33a5%3A0x8802b89fee690ea8!2sGold%20Coast%20Window%20and%20Pressure%20Cleaning!5e0!3m2!1sen!2sau!4v1775596752940!5m2!1sen!2sau"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gold Coast Window and Pressure Cleaning location on Google Maps"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="text-center text-gray-400 text-sm mb-2">
              <p>© {new Date().getFullYear()} Gold Coast Window and Pressure Cleaning.</p>
            </div>
            <div className="text-center text-gray-500 text-xs">
              <p>Last updated: April 2026</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
