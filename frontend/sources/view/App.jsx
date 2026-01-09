import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from '../components/base/headerBar';
import AsideBar from '../components/base/asideBar';
import DashboardPage from '../view/pages/dashboard';
import ProductPage from './pages/product';
import SettingPage from './pages/setting';
import InventoryPage from './pages/inventory-product/inventory-page';
import InventoryHistoryPage from './pages/inventory-product/inventory-history';
import DistributionPage from './pages/distribution-product/distribution-page';
import DistributionHistoryPage from './pages/distribution-product/distribution-history';
import ReturnPage from './pages/return-page';
import LoginPage from './pages/login-page';
import StockAdjustmentPage from './pages/stock-adjustment-page';
import DashboardOwner from './pages/owner-page/dashboard-owner';

// Laporan pages
import LaporanInventori from './pages/laporan-page/laporan-inventori';
import LaporanDistribusi from './pages/laporan-page/laporan-distribusi';
import LaporanReturn from './pages/laporan-page/laporan-return';
import LaporanPenyesuaian from './pages/laporan-page/laporan-penyesuaian';

import LocaleContext, { LocaleProvider } from '../contexts/localContext';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("user", error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Loading state
  if (isLoading) {
    return <div className="loading">Memuat...</div>;
  }

  // Not logged in - show login page
  if (!user) {
    return (
      <LocaleProvider value={{ locale: 'id', toggleLocale: () => {} }}>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </LocaleProvider>
    );
  }

  // Logged in as non-admin - show limited view (read-only)
  if (!user.is_admin) {
    return (
      <LocaleProvider value={{ locale: 'id', toggleLocale: () => {} }}>
        <main className="main-side">
          <Header user={user} onLogout={handleLogout} />
          <AsideBar user={user} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard-owner" replace />} />
            <Route path="/dashboard-owner" element={<DashboardOwner user={user} />} />
            <Route path="/product/inventory" element={<InventoryPage isAdmin={false} />} />
            <Route path="/product/inventory-history" element={<InventoryHistoryPage isAdmin={false} />} />
            <Route path="/product/distribution" element={<DistributionPage isAdmin={false} />} />
            <Route path="/product/distribution-history" element={<DistributionHistoryPage isAdmin={false} />} />
            <Route path="/product/return" element={<ReturnPage isAdmin={false} />} />
            <Route path="/product/stock-adjustment" element={<StockAdjustmentPage isAdmin={false} />} />
            {/* Laporan routes for non-admin */}
            <Route path="/laporan/inventori" element={<LaporanInventori />} />
            <Route path="/laporan/distribusi" element={<LaporanDistribusi />} />
            <Route path="/laporan/return" element={<LaporanReturn />} />
            <Route path="/laporan/penyesuaian" element={<LaporanPenyesuaian />} />
            <Route path="*" element={<Navigate to="/dashboard-owner" replace />} />
          </Routes>
        </main>
      </LocaleProvider>
    );
  }

  // Logged in as admin - show full app
  return (
    <LocaleProvider value={{ locale: 'id', toggleLocale: () => {} }}>
      <main className="main-side">
        <Header user={user} onLogout={handleLogout} />
        <AsideBar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage user={user} />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/product/inventory" element={<InventoryPage />} />
          <Route path="/product/inventory-history" element={<InventoryHistoryPage />} />
          <Route path="/product/distribution" element={<DistributionPage />} />
          <Route path="/product/distribution-history" element={<DistributionHistoryPage />} />
          <Route path="/product/return" element={<ReturnPage />} />
          <Route path="/product/stock-adjustment" element={<StockAdjustmentPage />} />
          {/* Laporan routes for admin */}
          <Route path="/laporan" element={<Navigate to="/laporan/inventori" replace />} />
          <Route path="/laporan/inventori" element={<LaporanInventori />} />
          <Route path="/laporan/distribusi" element={<LaporanDistribusi />} />
          <Route path="/laporan/return" element={<LaporanReturn />} />
          <Route path="/laporan/penyesuaian" element={<LaporanPenyesuaian />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </LocaleProvider>
  );
}

export default App;

