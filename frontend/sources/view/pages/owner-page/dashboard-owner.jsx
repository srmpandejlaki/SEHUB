import React, { useEffect, useState } from "react";
import DashboardTable from "../../../components/dashboard-page/table-dashboard";
import DashboardChart from "../../../components/dashboard-page/dashboard-chart";
import { fetchRecentDistributions, fetchMonthlyStats } from "../../../utilities/api/dashboard";
import { fetchAllProducts } from "../../../utilities/api/products";

function DashboardOwner({ user }) {
  const [recentDistributions, setRecentDistributions] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
    loadProducts();
  }, []);

  // Reload chart when product selection changes
  useEffect(() => {
    loadMonthlyStats();
  }, [selectedProduct]);

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

  const loadProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const loadMonthlyStats = async () => {
    try {
      const stats = await fetchMonthlyStats(selectedProduct);
      setMonthlyStats(stats);
    } catch (error) {
      console.error("Error fetching monthly stats:", error);
    }
  };

  const handleProductChange = (productId) => {
    setSelectedProduct(productId);
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
          <DashboardChart 
            monthlyData={monthlyStats} 
            products={products}
            selectedProduct={selectedProduct}
            onProductChange={handleProductChange}
          />
          <DashboardTable recentDistributions={recentDistributions} />
        </div>
      )}
    </div>
  );
}

export default DashboardOwner;