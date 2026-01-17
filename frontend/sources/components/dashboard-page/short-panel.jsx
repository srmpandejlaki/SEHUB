import React, { useState, useEffect } from "react";
import IconCountProduct from "../../assets/icon/Vector-1.svg?react";
import IconIncoming from "../../assets/icon/material-symbols_inventory.svg?react";
import IconDistribution from "../../assets/icon/lsicon_distribution-filled.svg?react";
import IconReturn from "../../assets/icon/lets-icons_back.svg?react";
import IconAdjustment from "../../assets/icon/fluent_status-12-regular.svg?react";
import { useTranslation } from "../../contexts/localContext";

function ShortPanel({ statistics }) {
  const { totalProducts = 0 } = statistics || {};
  const [monthlySummary, setMonthlySummary] = useState({
    bulan: "",
    totalBarangMasuk: 0,
    totalDistribusi: 0,
    totalReturn: 0,
    totalPenyesuaian: 0
  });
  const t = useTranslation();

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
      <div className="panel monthly-summary-panel">
        <div className="monthly-header">
          <p className="title">{t('monthlySummaryTitle')} {monthlySummary.bulan}</p>
        </div>
        <div className="monthly-content">
          <div className="monthly-item">
            <div className="item-info">
              <p className="label">{t('totalProducts')}</p>
            </div>
            <div className="item-data">
              <div className="item-icon count">
                <IconCountProduct className="icon" />
              </div>
              <div className="item-info">
                <p className="value">{totalProducts} {t('unit')}</p>
              </div>
            </div>
          </div>
          <div className="monthly-item">
            <div className="item-info">
              <p className="label">{t('totalIncoming')}</p>
            </div>
            <div className="item-data">
              <div className="item-icon incoming">
                <IconIncoming className="icon" />
              </div>
              <div className="item-info">
                <p className="value">{monthlySummary.totalBarangMasuk} {t('unit')}</p>
              </div>
            </div>
          </div>
          <div className="monthly-item">
            <div className="item-info">
              <p className="label">{t('totalDistribution')}</p>
            </div>
            <div className="item-data">
              <div className="item-icon distribution">
                <IconDistribution className="icon" />
              </div>
              <div className="item-info">
                <p className="value">{monthlySummary.totalDistribusi} {t('unit')}</p>
              </div>
            </div>
          </div>
          <div className="monthly-item">
            <div className="item-info">
              <p className="label">{t('totalReturn')}</p>
            </div>
            <div className="item-data">
              <div className="item-icon return">
                <IconReturn className="icon" />
              </div>
              <div className="item-info">
                <p className="value">{monthlySummary.totalReturn} {t('unit')}</p>
              </div>
            </div>
          </div>
          <div className="monthly-item">
            <div className="item-info">
              <p className="label">{t('totalAdjustment')}</p>
            </div>
            <div className="item-data">
              <div className="item-icon adjustment">
                <IconAdjustment className="icon" />
              </div>
              <div className="item-info">
                <p className="value">{monthlySummary.totalPenyesuaian} {t('kali')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortPanel;
