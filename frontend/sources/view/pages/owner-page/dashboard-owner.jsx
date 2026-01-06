import React, { useEffect, useState } from "react";
import DashboardTable from "../../../components/dashboard-page/table-dashboard";
import { fetchDashboardStatistics, fetchRecentDistributions } from "../../../utilities/api/dashboard";

function DashboardOwner({ user }) {
  const [recentDistributions, setRecentDistributions] = useState([]);

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
    try {
      const [stats, recentDistributions] = await Promise.all([
        fetchDashboardStatistics(),
        fetchRecentDistributions()
      ]);
      
      // Update state with fetched data
      setRecentDistributions(recentDistributions);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="content">
      <div className="opening">
        <h3>Selamat Datang, {user?.nama_pengguna || "Pengguna"}!</h3>
        <p>{getCurrentDate()}</p>
      </div>
      <DashboardTable recentDistributions={recentDistributions} />
    </div>
  );
}

export default DashboardOwner;