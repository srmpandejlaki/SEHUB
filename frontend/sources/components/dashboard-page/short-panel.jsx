import React, { useState, useEffect } from "react";
import IconCountProduct from "../../assets/icon/Vector-1.svg?react";
import IconIncoming from "../../assets/icon/material-symbols_inventory.svg?react";
import IconDistribution from "../../assets/icon/lsicon_distribution-filled.svg?react";
import IconReturn from "../../assets/icon/lets-icons_back.svg?react";
import IconAdjustment from "../../assets/icon/fluent_status-12-regular.svg?react";

function ShortPanel({ statistics, monthlySummary }) {
  const { totalProducts = 0 } = statistics || {};
  
  // Destructure with default values to handle missing or null data
  const {
    bulan = "",
    totalBarangMasuk = 0,
    totalDistribusi = 0,
    totalReturn = 0,
    totalPenyesuaian = 0
  } = monthlySummary || {};

  return(
    <div className="short-panel">
      <div className="panel monthly-summary-panel">
        <div className="monthly-header">
          <p className="title">Ringkasan Bulan {bulan}</p>
        </div>
        <div className="monthly-content">
          <div className="monthly-item">
            <div className="item-info">
              <p className="label">Total Produk</p>
            </div>
            <div className="item-data">
              <div className="item-icon count">
                <IconCountProduct className="icon" />
              </div>
              <div className="item-info">
                <p className="value">{totalProducts} jenis</p>
              </div>
            </div>
          </div>
          <div className="monthly-item">
            <div className="item-info">
              <p className="label">Total Barang Masuk</p>
            </div>
            <div className="item-data">
              <div className="item-icon incoming">
                <IconIncoming className="icon" />
              </div>
              <div className="item-info">
                <p className="value">{totalBarangMasuk} unit</p>
              </div>
            </div>
          </div>
          <div className="monthly-item">
            <div className="item-info">
              <p className="label">Total Distribusi</p>
            </div>
            <div className="item-data">
              <div className="item-icon distribution">
                <IconDistribution className="icon" />
              </div>
              <div className="item-info">
                <p className="value">{totalDistribusi} unit</p>
              </div>
            </div>
          </div>
          <div className="monthly-item">
            <div className="item-info">
              <p className="label">Total Barang Retur</p>
            </div>
            <div className="item-data">
              <div className="item-icon return">
                <IconReturn className="icon" />
              </div>
              <div className="item-info">
                <p className="value">{totalReturn} unit</p>
              </div>
            </div>
          </div>
          <div className="monthly-item">
            <div className="item-info">
              <p className="label">Penyesuaian Stok</p>
            </div>
            <div className="item-data">
              <div className="item-icon adjustment">
                <IconAdjustment className="icon" />
              </div>
              <div className="item-info">
                <p className="value">{totalPenyesuaian} kali</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortPanel;
