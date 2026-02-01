import React, { useState, useEffect } from "react";
import DashboardTable from "../../components/dashboard-page/table-dashboard";
import NotificationSide from "../../components/dashboard-page/notification-side";
import ShortPanel from "../../components/dashboard-page/short-panel";
import { fetchDashboardStatistics, fetchExpiringSoon, fetchPendingDistributions, fetchMonthlySummary } from "../../utilities/api/dashboard";
import { useTranslation, useLocalizedDate } from "../../contexts/localContext";

function DashboardPage({ user }) {
  const [statistics, setStatistics] = useState(null);
  const [expiringProducts, setExpiringProducts] = useState([]);
  const [pendingDistributions, setPendingDistributions] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslation();
  const formatDate = useLocalizedDate();

  // Get current date formatted
  const getCurrentDate = () => {
    return formatDate(new Date());
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all dashboard data concurrently
      const [stats, expiring, distributions, summary] = await Promise.all([
        fetchDashboardStatistics(),
        fetchExpiringSoon(30),
        fetchPendingDistributions(),
        fetchMonthlySummary()
      ]);

      setStatistics(stats);
      setExpiringProducts(expiring);
      setPendingDistributions(distributions);
      setMonthlySummary(summary);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="content dashboard">
      <div className="opening">
        <h3>{t('greeting')}, {user?.nama_pengguna || "Admin!"}!</h3>
        <p>{getCurrentDate()}</p>
      </div>
      {loading ? (
        <div className="container-dashboard">
          <p>{t('loadingDashboard')}...</p>
        </div>
      ) : (
        <div className="container-dashboard">
          <ShortPanel statistics={statistics} monthlySummary={monthlySummary} />
          <NotificationSide expiringProducts={expiringProducts} />
          <DashboardTable pendingDistributions={pendingDistributions} />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
