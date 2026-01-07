import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import DistributionProduct from "../../../components/product-page/distribution/distribution-items";
import FormDataDistribution from "../../../components/product-page/distribution/form-data-distribution";
import IconHistory from "../../../assets/icon/ri_file-history-line.svg?react";
import IconTambah from "../../../assets/icon/mdi_add-bold.svg?react";
import { checkInventoryExists } from "../../../utilities/api/inventory";
import { BASE_URL } from "../../../utilities";

function DistributionPage({ isAdmin = true }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFormDis, setFormDis] = useState(false);
  
  // Master data
  const [metodePengiriman, setMetodePengiriman] = useState([]);
  const [statusPengiriman, setStatusPengiriman] = useState([]);
  
  // Validation state
  const [hasInventoryData, setHasInventoryData] = useState(false);
  
  // Reload trigger for DistributionProduct
  const [reloadTrigger, setReloadTrigger] = useState(0);
  
  useEffect(() => {
    loadMasterData();
  }, []);

  const loadMasterData = async () => {
    try {
      // Check if inventory data exists
      const inventoryExists = await checkInventoryExists();
      setHasInventoryData(inventoryExists);

      // Fetch master data for metode pengiriman
      const metodeRes = await fetch(`${BASE_URL}master/metode-pengiriman`);
      const metodeData = await metodeRes.json();
      if (metodeData?.data) {
        setMetodePengiriman(metodeData.data);
      }

      // Fetch master data for status pengiriman
      const statusRes = await fetch(`${BASE_URL}master/status-pengiriman`);
      const statusData = await statusRes.json();
      if (statusData?.data) {
        setStatusPengiriman(statusData.data);
      }
    } catch (error) {
      console.error("Error loading master data:", error);
    }
  };

  const handleOpenFormDis = () => {
    if (!isAdmin) return;
    if (!hasInventoryData) {
      alert("Tidak dapat membuat data distribusi. Silakan tambahkan data barang masuk terlebih dahulu di menu Inventori.");
      return;
    }
    setFormDis(true);
  };

  const handleCloseFormDis = () => {
    setFormDis(false);
  };

  const handleFormSuccess = () => {
    setReloadTrigger(prev => prev + 1); // Trigger reload in DistributionProduct
  };

  return(
    <div className="content product-page">
      <NavProduct />
      <div className="main-inventory">
        <div className="inventory-display">
          <div className="header-distribution">
            <p>Pratinjau Data Distribusi Produk</p>
            <div className="buttons">
              <div className="button">
                {isAdmin && (
                  <div 
                    className={`base-btn ${!hasInventoryData ? 'disabled' : 'black'}`}
                    onClick={handleOpenFormDis}
                    style={!hasInventoryData ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    title={!hasInventoryData ? "Tambahkan data barang masuk terlebih dahulu" : "Tambah Data"}
                  >
                    <IconTambah className="icon whiteIcon" />Tambah Data
                  </div>
                )}
              </div>
              <div className="button">
                <div className="base-btn black">
                  <Link to="/product/distribution-history" >
                    <IconHistory className="icon" />Riwayat Data
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <SearchFilter value={searchQuery} onChange={setSearchQuery} placeholder="Cari distribusi..." />
          <DistributionProduct searchQuery={searchQuery} reloadTrigger={reloadTrigger} showActions={isAdmin} />
        </div>
        {/* Form Tambah Distribusi */}
        {showFormDis && (
          <div className="form-overlay">
            <FormDataDistribution 
              onCloseForm={handleCloseFormDis} 
              onSuccess={handleFormSuccess}
              metodePengiriman={metodePengiriman}
              statusPengiriman={statusPengiriman}
            />
          </div>
        )}
      </div>

    </div>
  );
}

export default DistributionPage;