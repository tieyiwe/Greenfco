import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import './i18n';
import useAuthStore from './store/authStore';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Blog from './pages/public/Blog';
import BlogPost from './pages/public/BlogPost';
import Gallery from './pages/public/Gallery';
import Contact from './pages/public/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Dashboard
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import CropManager from './pages/dashboard/CropManager';
import IrrigationManager from './pages/dashboard/IrrigationManager';
import FinanceManager from './pages/dashboard/FinanceManager';
import WeatherHub from './pages/dashboard/WeatherHub';
import SpeciesLibrary from './pages/dashboard/SpeciesLibrary';
import GreenBot from './pages/dashboard/GreenBot';
import SoilAdvisor from './pages/dashboard/SoilAdvisor';
import MarketPage from './pages/dashboard/MarketPage';
import NetworkPage from './pages/network/NetworkPage';

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
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

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
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
          </Route>

          {/* Market (Protected) */}
          <Route path="/market" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<MarketPage />} />
          </Route>

          {/* Network (Protected) */}
          <Route path="/network" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<NetworkPage />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
