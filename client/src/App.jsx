import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './i18n';
import useAuthStore from './store/authStore';
import ErrorBoundary from './components/ErrorBoundary';

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
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));

// Admin (lazy-loaded for code splitting)
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminListings = lazy(() => import('./pages/admin/AdminListings'));
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'));
const AdminConsulting = lazy(() => import('./pages/admin/AdminConsulting'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));

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
const VerifyTransaction = lazy(() => import('./pages/dashboard/VerifyTransaction'));
const AdminTransactions = lazy(() => import('./pages/admin/AdminTransactions'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const AdminActivity = lazy(() => import('./pages/admin/AdminActivity'));
const AdminTeamChat = lazy(() => import('./pages/admin/AdminTeamChat'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AdminRoute({ children }) {
  const session = (() => {
    try { return JSON.parse(localStorage.getItem('greenfco_admin_session')); } catch { return null; }
  })();
  if (!session?.verified) {
    return <Navigate to="/admin/login" replace />;
  }
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
      <ErrorBoundary>
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
          <Route path="/reset-password" element={<ResetPassword type="user" />} />
          <Route path="/admin/reset-password" element={<ResetPassword type="admin" />} />

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

          {/* QR Transaction verification — standalone (no layout) */}
          <Route path="/verify-transaction" element={<VerifyTransaction />} />

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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="listings" element={<AdminListings />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="consulting" element={<AdminConsulting />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="activity" element={<AdminActivity />} />
            <Route path="messages" element={<AdminTeamChat />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
