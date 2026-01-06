import React, { useEffect, useState } from "react";
import DashboardTable from "../../../components/dashboard-page/table-dashboard";
import DashboardChart from "../../../components/dashboard-page/dashboard-chart";
import { fetchRecentDistributions, fetchMonthlyStats } from "../../../utilities/api/dashboard";

function DashboardOwner({ user }) {
  const [recentDistributions, setRecentDistributions] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState(null);
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
      const [distributions, stats] = await Promise.all([
        fetchRecentDistributions(),
        fetchMonthlyStats()
      ]);
      
      setRecentDistributions(distributions);
      setMonthlyStats(stats);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="content dashboard">
      <div className="opening">
        <h3>Selamat Datang, {user?.nama_pengguna || "Pengguna"}!</h3>
        <p>{getCurrentDate()}</p>
      </div>
      
      {loading ? (
        <div className="container-dashboard">
          <p>Memuat data...</p>
        </div>
      ) : (
        <div className="container-dashboard">
          <DashboardChart monthlyData={monthlyStats} />
          <DashboardTable recentDistributions={recentDistributions} />
        </div>
      )}
    </div>
  );
}

export default DashboardOwner;