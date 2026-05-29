import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './i18n';
import useAuthStore from './store/authStore';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Consulting from './pages/public/Consulting';
import Blog from './pages/public/Blog';
import BlogPost from './pages/public/BlogPost';
import Gallery from './pages/public/Gallery';
import Contact from './pages/public/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminListings from './pages/admin/AdminListings';
import AdminBlog from './pages/admin/AdminBlog';
import AdminConsulting from './pages/admin/AdminConsulting';

// Dashboard (lazy-loaded for code splitting)
const DashboardLayout = lazy(() => import('./pages/dashboard/DashboardLayout'));
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const CropManager = lazy(() => import('./pages/dashboard/CropManager'));
const IrrigationManager = lazy(() => import('./pages/dashboard/IrrigationManager'));
const FinanceManager = lazy(() => import('./pages/dashboard/FinanceManager'));
const WeatherHub = lazy(() => import('./pages/dashboard/WeatherHub'));
const SpeciesLibrary = lazy(() => import('./pages/dashboard/SpeciesLibrary'));
const GreenBot = lazy(() => import('./pages/dashboard/GreenBot'));
const SoilAdvisor = lazy(() => import('./pages/dashboard/SoilAdvisor'));
const KoobAssist = lazy(() => import('./pages/dashboard/KoobAssist'));
const MarketPage = lazy(() => import('./pages/dashboard/MarketPage'));
const SellerProfilePage = lazy(() => import('./pages/dashboard/SellerProfilePage'));
const BuyerProfilePage = lazy(() => import('./pages/dashboard/BuyerProfilePage'));
const NetworkPage = lazy(() => import('./pages/network/NetworkPage'));

// Auth bypass for testing — re-enable before production
function ProtectedRoute({ children }) {
  return children;
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 70px)' }}>
        {children}
      </div>
      <Footer />
    </>
  );
}

function LoadingFallback() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌿</div>
        <p style={{ color: 'var(--gray-mid)' }}>Chargement...</p>
      </div>
    </div>
  );
}

function ComingSoon({ title, icon }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--gray-mid)' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
      <h2 style={{ color: 'var(--black)', marginBottom: '0.5rem' }}>{title}</h2>
      <p>Cette fonctionnalité arrive bientôt. / This feature is coming soon.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/consulting" element={<PublicLayout><Consulting /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Dashboard (Protected) */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="crops" element={<CropManager />} />
            <Route path="irrigation" element={<IrrigationManager />} />
            <Route path="finance" element={<FinanceManager />} />
            <Route path="weather" element={<WeatherHub />} />
            <Route path="species" element={<SpeciesLibrary />} />
            <Route path="greenbot" element={<GreenBot />} />
            <Route path="soil-advisor" element={<SoilAdvisor />} />
            <Route path="koob-assist" element={<KoobAssist />} />
            <Route path="map" element={<ComingSoon title="Farm Map" icon="🗺️" />} />
            <Route path="business-plan" element={<ComingSoon title="Business Plan" icon="📋" />} />
          </Route>

          {/* Marketplace (buy/sell listings) */}
          <Route path="/marketplace" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<MarketPage key="marketplace" mode="marketplace" />} />
            <Route path="profile" element={<BuyerProfilePage />} />
          </Route>

          {/* AgroPro (prices & analytics) */}
          <Route path="/agropro" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<MarketPage key="agropro" mode="agropro" />} />
            <Route path="profile" element={<SellerProfilePage />} />
          </Route>

          {/* Legacy redirect */}
          <Route path="/market" element={<Navigate to="/marketplace" replace />} />

          {/* Network (Protected) */}
          <Route path="/network" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<NetworkPage />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="listings" element={<AdminListings />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="consulting" element={<AdminConsulting />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
