
import React, { useEffect } from "react";
import PhoneNumber from "./components/PhoneNumber";
import { Link, useLocation } from "react-router-dom";
import QuoteCTA from "./components/QuoteCTA";
import { Phone, Star, Shield, Users, Menu, X, ChevronDown } from "lucide-react";
import Logo from "./components/Logo";
import { HOME_HERO } from "./data/homePage";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = React.useState(false);
  const [commercialDropdownOpen, setCommercialDropdownOpen] = React.useState(false);

  // Home page only: the header floats over the big photo at the top, see-through
  // with light text, until the visitor scrolls or opens the menu. Then it is
  // the same solid header every other page has.
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);
  useEffect(() => {
    if (!isHome) return undefined;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);
  const overlay = isHome && !scrolled && !mobileMenuOpen;
  const lightHeader = overlay && HOME_HERO.theme !== "blue";
  const navText = lightHeader ? "text-paper hover:text-accent" : "text-ink hover:text-accent-3";

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setCommercialDropdownOpen(false);
  }, [location.pathname]);

  // The mobile menu is a viewport-height panel with its own scroll. While it
  // is open the page behind it must not scroll — otherwise a swipe inside the
  // menu drags the whole document (and the sticky header) instead.
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const { documentElement: html, body } = document;
    const prev = [html.style.overflow, body.style.overflow];
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev[0];
      body.style.overflow = prev[1];
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-paper">
      {/* Trust Bar */}
      <div className={`bg-ink text-paper text-[13px] tracking-wide py-1.5 hidden ${isHome ? "" : "sm:block"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center gap-5">
          <div className="flex items-center">
            <Shield className="w-3.5 h-3.5 mr-1.5 text-accent" />
            Fully insured
          </div>
          <span className="w-1 h-1 rounded-full bg-accent" aria-hidden="true"></span>
          <div className="flex items-center">
            <Users className="w-3.5 h-3.5 mr-1.5 text-accent" />
            Police-checked staff
          </div>
          <span className="w-1 h-1 rounded-full bg-accent" aria-hidden="true"></span>
          <div className="flex items-center">
            <Star className="w-3.5 h-3.5 mr-1.5 fill-accent text-accent" />
            5.0 stars from 2,500+ happy customers
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-colors duration-200 ${isHome ? "-mb-16" : ""} ${overlay ? "bg-transparent" : "bg-paper shadow-[0_2px_0_#17233b]"}`}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-4 h-16">
            {/* Logo */}
            <Link to="/" aria-label="Gold Coast Window and Pressure Cleaning, home" className="flex items-center flex-shrink-0 min-w-0">
              <Logo onInk={lightHeader} wordmarkClassName="hidden min-[375px]:block lg:hidden xl:block" />
            </Link>

            {/* Desktop Navigation */}
            <nav className={`hidden lg:flex items-center gap-1 flex-shrink-0 rounded-full px-1.5 py-0.5 ${overlay ? (lightHeader ? "bg-paper/15 backdrop-blur-sm" : "bg-ink/10") : ""}`}>
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)} className={`flex items-center gap-1 px-3 py-2 text-[15px] font-semibold ${navText} transition-colors whitespace-nowrap`}>
                  Residential
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Always rendered, toggled with a class. A `{open && ...}` dropdown
                    never reaches the prerendered HTML, so crawlers never saw these
                    links — the same trap the FAQ accordion had. */}
                <div className={`absolute top-full left-0 mt-0 w-56 bg-paper-white rounded-xl border-2 border-ink shadow-hard-sm py-2 z-50 ${servicesDropdownOpen ? "block" : "hidden"}`}>
                    <Link to="/window-cleaning/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      Window Cleaning
                    </Link>
                    <Link to="/roof-cleaning/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      Roof Cleaning
                    </Link>
                    <Link to="/pressure-cleaning/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      Pressure Cleaning
                    </Link>
                    <Link to="/house-softwash/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      House Softwash
                    </Link>
                    <Link to="/gutter-cleaning/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      Gutter Cleaning
                    </Link>
                    <Link to="/solar-panel-cleaning/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      Solar Panel Cleaning
                    </Link>
                    <Link to="/bird-proofing/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      Solar Panel Bird Proofing
                    </Link>
                    <Link to="/dva/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors border-t border-rule mt-1">
                      DVA Clients (Veterans)
                    </Link>
                  </div>
              </div>

              {/* Commercial & Strata Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCommercialDropdownOpen(true)}
                onMouseLeave={() => setCommercialDropdownOpen(false)}
              >
                <button onClick={() => setCommercialDropdownOpen(!commercialDropdownOpen)} className={`flex items-center gap-1 px-3 py-2 text-[15px] font-semibold ${navText} transition-colors whitespace-nowrap`}>
                  Commercial & Strata
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${commercialDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`absolute top-full left-0 mt-0 w-64 bg-paper-white rounded-xl border-2 border-ink shadow-hard-sm py-2 z-50 ${commercialDropdownOpen ? "block" : "hidden"}`}>
                    <Link to="/commercial/" className="block px-4 py-2.5 text-[15px] font-bold text-ink hover:bg-paper-2 transition-colors border-b border-rule mb-1">
                      All Commercial &amp; Strata Services
                    </Link>
                    <Link to="/commercial/window-cleaning/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      Commercial Window Cleaning
                    </Link>
                    <Link to="/commercial/roof-cleaning/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      Commercial Roof Cleaning
                    </Link>
                    <Link to="/commercial/pressure-cleaning/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      Commercial Pressure Cleaning
                    </Link>
                    <Link to="/commercial/house-softwash/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      Commercial Building Softwash
                    </Link>
                    <Link to="/commercial/gutter-cleaning/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      Commercial Gutter Cleaning
                    </Link>
                    <Link to="/commercial/solar-panel-cleaning/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      Commercial Solar Panel Cleaning
                    </Link>
                    <Link to="/commercial/bird-proofing/" className="block px-4 py-2.5 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 transition-colors">
                      Commercial Solar Bird Proofing
                    </Link>
                  </div>
              </div>

              <Link to="/window-cleaning-plans/" className={`px-3 py-2 text-[15px] font-semibold ${navText} transition-colors whitespace-nowrap`}>Window Cleaning Plans</Link>
              <Link to="/guides/" className={`px-3 py-2 text-[15px] font-semibold ${navText} transition-colors whitespace-nowrap`}>Guides</Link>

            </nav>

            {/* CTA Buttons + Mobile Menu Toggle */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                to="/instant-quote/"
                className="btn btn-primary btn-sm !px-3.5 sm:!px-5 whitespace-nowrap"
              >
                <span className="hidden sm:inline">Get Instant Quote</span>
                <span className="sm:hidden">Quote</span>
              </Link>
              <a href="tel:0752308293" aria-label="Call (07) 5230 8293" className={`btn btn-sm !px-3 sm:!px-5 whitespace-nowrap ${lightHeader ? "bg-paper-white text-ink border-paper-white hover:bg-paper-2" : "btn-ink"}`}>
                <Phone className="w-4 h-4 sm:mr-1.5" />
                <PhoneNumber className="hidden sm:inline-flex" />
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className={`lg:hidden ml-0.5 p-2 rounded-lg transition-colors ${lightHeader ? "text-paper hover:bg-paper/15" : "text-ink hover:bg-paper-2"}`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {/* Anchored below the header bar, capped to the viewport, scrolls on its
            own (overscroll-contain stops the swipe leaking to the page). Kept
            out of the document flow so a long menu can never make the sticky
            header taller than the screen. */}
        {mobileMenuOpen && (
          <div className="mobile-menu-panel lg:hidden absolute inset-x-0 top-full overflow-y-auto overscroll-contain border-t-2 border-b-2 border-ink bg-paper shadow-lg">
            <nav className="max-w-7xl mx-auto px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] space-y-1">
              <div className="px-3 pt-3 pb-1 text-xs font-bold text-accent-3 uppercase tracking-[.12em]">Residential</div>
              <Link to="/window-cleaning/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                Window Cleaning
              </Link>
              <Link to="/roof-cleaning/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                Roof Cleaning
              </Link>
              <Link to="/pressure-cleaning/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                Pressure Cleaning
              </Link>
              <Link to="/house-softwash/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                House Softwash
              </Link>
              <Link to="/gutter-cleaning/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                Gutter Cleaning
              </Link>
              <Link to="/solar-panel-cleaning/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                Solar Panel Cleaning
              </Link>
              <Link to="/bird-proofing/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                Solar Panel Bird Proofing
              </Link>
              <Link to="/dva/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                DVA Clients (Veterans)
              </Link>

              <div className="px-3 pt-3 pb-1 text-xs font-bold text-accent-3 uppercase tracking-[.12em]">Commercial & Strata</div>
              <Link to="/commercial/window-cleaning/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                Commercial Window Cleaning
              </Link>
              <Link to="/commercial/roof-cleaning/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                Commercial Roof Cleaning
              </Link>
              <Link to="/commercial/pressure-cleaning/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                Commercial Pressure Cleaning
              </Link>
              <Link to="/commercial/house-softwash/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                Commercial Building Softwash
              </Link>
              <Link to="/commercial/gutter-cleaning/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                Commercial Gutter Cleaning
              </Link>
              <Link to="/commercial/solar-panel-cleaning/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                Commercial Solar Panel Cleaning
              </Link>
              <Link to="/commercial/bird-proofing/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors pl-6">
                Commercial Solar Bird Proofing
              </Link>

              <div className="border-t border-rule mt-2 pt-2">
                <Link to="/commercial/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] font-semibold text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors">Commercial &amp; Strata</Link>
                <Link to="/window-cleaning-plans/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] font-semibold text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors">Window Cleaning Plans</Link>
                <Link to="/instant-quote/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] font-semibold text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors">Get Instant Quote</Link>
                <Link to="/guides/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[15px] text-ink hover:text-accent-3 hover:bg-paper-2 rounded-lg transition-colors">Expert Guides</Link>
              </div>

              <div className="border-t border-rule mt-2 pt-2 flex items-center gap-4 px-3 py-2 text-xs text-ink-3">
                <div className="flex items-center">
                  <Shield className="w-3.5 h-3.5 mr-1 text-accent-2" />
                  Fully Insured
                </div>
                <div className="flex items-center">
                  <Users className="w-3.5 h-3.5 mr-1 text-accent-2" />
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

      {/* Quote chooser at the bottom of every page — except the instant-quote
          wizard and the per-service quote landing pages, which have their own
          lead capture built in, and the home page, which has the quote on the
          page and ends on its own call to action */}
      {currentPageName !== "InstantQuote" && currentPageName !== "InstantQuoteLanding" && !isHome && <QuoteCTA variant="section" />}

      {/* Footer */}
      <footer className="bg-ink text-paper border-t-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="mb-5">
                <Logo onInk markClassName="w-12 h-12" />
              </div>
              {/* h2/h3, not h3/h4: the footer must not skip a heading level on
                  pages whose body has only an h1 (e.g. /instant-quote/). */}
              <h2 className="sr-only">Gold Coast Window and Pressure Cleaning</h2>
              <p className="text-paper-2/80 text-[15px] leading-relaxed max-w-[38ch]">
                Gold Coast's premier exterior cleaning service. Fully insured and police-checked staff
                for your complete peace of mind.
              </p>
              <div className="flex items-center text-accent mt-5">
                <Star className="w-4 h-4 fill-current mr-1" />
                <Star className="w-4 h-4 fill-current mr-1" />
                <Star className="w-4 h-4 fill-current mr-1" />
                <Star className="w-4 h-4 fill-current mr-1" />
                <Star className="w-4 h-4 fill-current mr-1" />
                <span className="text-paper text-sm ml-2">5.0 Rating</span>
              </div>
            </div>

            <div className="md:col-span-5">
              <h3 className="font-sans text-xs font-bold uppercase tracking-[.14em] text-accent mb-4">Our Services</h3>
              <div className="grid grid-cols-2 gap-x-8">
                <div className="space-y-2.5 text-[15px] text-paper-2/85">
                  <Link to="/roof-cleaning/" className="block hover:text-accent transition-colors">Roof Cleaning</Link>
                  <Link to="/window-cleaning/" className="block hover:text-accent transition-colors">Window Cleaning</Link>
                  <Link to="/window-cleaning-plans/" className="block hover:text-accent transition-colors">Window Cleaning Plans</Link>
                  <Link to="/house-softwash/" className="block hover:text-accent transition-colors">House &amp; Building Softwash</Link>
                  <Link to="/pressure-cleaning/" className="block hover:text-accent transition-colors">Pressure Cleaning</Link>
                </div>
                <div className="space-y-2.5 text-[15px] text-paper-2/85">
                  <Link to="/gutter-cleaning/" className="block hover:text-accent transition-colors">Gutter Cleaning</Link>
                  <Link to="/solar-panel-cleaning/" className="block hover:text-accent transition-colors">Solar Panel Cleaning</Link>
                  <Link to="/bird-proofing/" className="block hover:text-accent transition-colors">Solar Panel Bird Proofing</Link>
                  <Link to="/dva/" className="block hover:text-accent transition-colors">DVA Cleaning for Veterans</Link>
                  <Link to="/commercial/" className="block hover:text-accent transition-colors">Commercial &amp; Strata</Link>
                  <Link to="/guides/" className="block hover:text-accent transition-colors">Expert Guides</Link>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <h3 className="font-sans text-xs font-bold uppercase tracking-[.14em] text-accent mb-4">Contact Us</h3>
              <a href="tel:0752308293" className="inline-flex items-center font-display font-bold text-2xl text-paper hover:text-accent transition-colors">
                <Phone className="w-5 h-5 mr-2 text-accent" />
                (07) 5230 8293
              </a>
              <p className="text-[15px] font-semibold text-paper-2/85 mt-1.5">We actually answer.</p>
              <div className="space-y-2.5 text-[15px] text-paper-2/85 mt-4">
                <Link to="/instant-quote/" className="block hover:text-accent transition-colors">Get an instant quote</Link>
                <Link to="/about/" className="block hover:text-accent transition-colors">About Us</Link>
                <Link to="/contact/" className="block hover:text-accent transition-colors">Contact</Link>
              </div>
            </div>
          </div>

          {/* Service Areas + Map */}
          <div className="border-t border-paper/15 mt-10 pt-10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <Link to="/service-areas/" className="inline-block group">
                  <h3 className="font-sans text-xs font-bold uppercase tracking-[.14em] text-accent mb-4 group-hover:text-paper transition-colors">Service Areas — View All Suburbs</h3>
                </Link>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[15px] text-paper-2/85">
                  {["Burleigh Heads", "Surfers Paradise", "Broadbeach", "Southport", "Robina",
                    "Palm Beach", "Coomera", "Nerang", "Helensvale", "Currumbin",
                    "Coolangatta", "Hope Island", "Mermaid Beach", "Tweed Heads", "Kingscliff"].map(suburb => {
                    const slug = suburb.toLowerCase().replace(/ /g, '-');
                    return (
                      <Link key={slug} to={`/window-cleaning/${slug}/`} className="hover:text-accent transition-colors">
                        {suburb}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:w-72 rounded-xl overflow-hidden border-2 border-paper/25">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14083.42582439664!2d153.41225468715817!3d-28.059407199999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4da98023da1e33a5%3A0x8802b89fee690ea8!2sGold%20Coast%20Window%20and%20Pressure%20Cleaning!5e0!3m2!1sen!2sau!4v1775596752940!5m2!1sen!2sau"
                  width="100%"
                  height="200"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gold Coast Window and Pressure Cleaning location on Google Maps"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-paper/15 mt-10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-paper-2/70">
            <p>© {new Date().getFullYear()} Gold Coast Window and Pressure Cleaning.</p>
            {/* Trust-anchor links. Agents check about/contact/privacy before
                recommending a business, and they need to be reachable from
                every page, not just the sitemap. */}
            <p>
              <Link to="/about/" className="hover:text-paper transition-colors">About</Link>
              <span className="mx-2">·</span>
              <Link to="/contact/" className="hover:text-paper transition-colors">Contact</Link>
              <span className="mx-2">·</span>
              <Link to="/privacy/" className="hover:text-paper transition-colors">Privacy Policy</Link>
              <span className="mx-2">·</span>
              <a href="/for-agents/" className="hover:text-paper transition-colors">For AI Agents</a>
              <span className="mx-2">·</span>
              <a href="/for-agents/#rest-api" className="hover:text-paper transition-colors">API</a>
            </p>
            <p>Last updated: September 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
