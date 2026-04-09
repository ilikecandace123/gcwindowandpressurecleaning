import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './Layout';

// Eager-load the landing page for fastest LCP on first paint
import Services from './pages/Services';

// Lazy-load all other routes — each becomes its own JS chunk
const RoofCleaning = lazy(() => import('./pages/RoofCleaning'));
const WindowCleaning = lazy(() => import('./pages/WindowCleaning'));
const HouseSoftWash = lazy(() => import('./pages/HouseSoftWash'));
const PressureCleaning = lazy(() => import('./pages/PressureCleaning'));
const GutterCleaning = lazy(() => import('./pages/GutterCleaning'));
const SolarPanelCleaning = lazy(() => import('./pages/SolarPanelCleaning'));
const BirdProofing = lazy(() => import('./pages/BirdProofing'));
const ServiceAreas = lazy(() => import('./pages/ServiceAreas'));
const LocationService = lazy(() => import('./pages/LocationService'));
const CommercialService = lazy(() => import('./pages/CommercialService'));
const CommercialLocationService = lazy(() => import('./pages/CommercialLocationService'));
const PatioCleaning = lazy(() => import('./pages/PatioCleaning'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-gray-600 text-sm">Loading…</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Homepage — eager-loaded for fast LCP */}
          <Route path="/" element={<Layout currentPageName="Services"><Services /></Layout>} />

          {/* Kebab-case routes for URL normalization */}
          <Route path="/services" element={<Layout currentPageName="Services"><Services /></Layout>} />
          <Route path="/service-areas" element={<Layout currentPageName="ServiceAreas"><ServiceAreas /></Layout>} />
          <Route path="/window-cleaning" element={<Layout currentPageName="WindowCleaning"><WindowCleaning /></Layout>} />
          <Route path="/roof-cleaning" element={<Layout currentPageName="RoofCleaning"><RoofCleaning /></Layout>} />
          <Route path="/house-softwash" element={<Layout currentPageName="HouseSoftWash"><HouseSoftWash /></Layout>} />
          <Route path="/pressure-cleaning" element={<Layout currentPageName="PressureCleaning"><PressureCleaning /></Layout>} />
          <Route path="/gutter-cleaning" element={<Layout currentPageName="GutterCleaning"><GutterCleaning /></Layout>} />
          <Route path="/solar-panel-cleaning" element={<Layout currentPageName="SolarPanelCleaning"><SolarPanelCleaning /></Layout>} />
          <Route path="/bird-proofing" element={<Layout currentPageName="BirdProofing"><BirdProofing /></Layout>} />
          <Route path="/patio-cleaning" element={<Layout currentPageName="PatioCleaning"><PatioCleaning /></Layout>} />
          <Route path="/about" element={<Layout currentPageName="About"><About /></Layout>} />
          <Route path="/contact" element={<Layout currentPageName="Contact"><Contact /></Layout>} />

          {/* Commercial service + suburb pages (must come BEFORE the generic /:service/:suburb route) */}
          <Route
            path="/commercial/:serviceSlug/:suburb"
            element={
              <Layout currentPageName="CommercialLocationService">
                <CommercialLocationService />
              </Layout>
            }
          />
          <Route
            path="/commercial/:serviceSlug"
            element={
              <Layout currentPageName="CommercialService">
                <CommercialService />
              </Layout>
            }
          />

          {/* Location + Service pages: /service-slug/suburb-slug */}
          <Route
            path="/:service/:suburb"
            element={
              <Layout currentPageName="LocationService">
                <LocationService />
              </Layout>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Layout currentPageName="NotFound"><NotFound /></Layout>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
