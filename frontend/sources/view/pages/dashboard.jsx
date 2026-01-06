import React, { useState, useEffect } from "react";
import DashboardTable from "../../components/dashboard-page/table-dashboard";
import NotificationSide from "../../components/dashboard-page/notification-side";
import ShortPanel from "../../components/dashboard-page/short-panel";
import { fetchDashboardStatistics, fetchExpiringSoon, fetchRecentDistributions } from "../../utilities/api/dashboard";

function DashboardPage({ user }) {
  const [statistics, setStatistics] = useState(null);
  const [expiringProducts, setExpiringProducts] = useState([]);
  const [recentDistributions, setRecentDistributions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get current date formatted
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all dashboard data concurrently
      const [stats, expiring, distributions] = await Promise.all([
        fetchDashboardStatistics(),
        fetchExpiringSoon(30),
        fetchRecentDistributions(10)
      ]);

      setStatistics(stats);
      setExpiringProducts(expiring);
      setRecentDistributions(distributions);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="content dashboard">
      <div className="opening">
        <h3>Selamat Datang, {user?.nama_pengguna || "Admin!"}!</h3>
        <p>{getCurrentDate()}</p>
      </div>
      {loading ? (
        <div className="container-dashboard">
          <p>Memuat data dashboard...</p>
        </div>
      ) : (
        <div className="container-dashboard">
          <ShortPanel statistics={statistics} />
          <NotificationSide expiringProducts={expiringProducts} />
          <DashboardTable recentDistributions={recentDistributions} />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
