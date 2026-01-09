import React, { useState, useEffect } from "react";
import IconCountProduct from "../../assets/icon/Vector-1.svg?react";
import IconIncoming from "../../assets/icon/material-symbols_inventory.svg?react";
import IconDistribution from "../../assets/icon/lsicon_distribution-filled.svg?react";

function ShortPanel({ statistics }) {
  const { totalProducts = 0 } = statistics || {};
  const [monthlySummary, setMonthlySummary] = useState({
    bulan: "",
    totalBarangMasuk: 0,
    totalDistribusi: 0
  });

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/sehub/";

  useEffect(() => {
    loadMonthlySummary();
  }, []);

  const loadMonthlySummary = async () => {
    try {
      const response = await fetch(`${BASE_URL}dashboard/monthly-summary`);
      const result = await response.json();
      if (result.success && result.data) {
        setMonthlySummary(result.data);
      }
    } catch (error) {
      console.error("Error loading monthly summary:", error);
    }
  };

  return(
    <div className="short-panel">
      <div className="panel">
        <div className="text">
          <p className="title">Jumlah Produk</p>
          <p className="number">{totalProducts}</p>
        </div>
        <div className="iconCircle">
          <div></div>
          <IconCountProduct className="icon onPanel" />
        </div>
      </div>
      <div className="panel monthly-summary-panel">
        <div className="monthly-header">
          <p className="title">Ringkasan Bulan {monthlySummary.bulan}</p>
        </div>
        <div className="monthly-content">
          <div className="monthly-item">
            <div className="item-icon incoming">
              <IconIncoming className="icon" />
            </div>
            <div className="item-info">
              <p className="label">Total Barang Masuk</p>
              <p className="value">{monthlySummary.totalBarangMasuk} unit</p>
            </div>
          </div>
          <div className="monthly-item">
            <div className="item-icon distribution">
              <IconDistribution className="icon" />
            </div>
            <div className="item-info">
              <p className="label">Total Distribusi</p>
              <p className="value">{monthlySummary.totalDistribusi} unit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortPanel;
