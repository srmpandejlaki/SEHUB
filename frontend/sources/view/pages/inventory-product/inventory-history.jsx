import React, { useState, useEffect } from "react";
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import NavDistribution from "../../../components/base/nav-distribution";
import TableInventory from "../../../components/product-page/inventory/table-inventory";
import FormDataInventory from "../../../components/product-page/inventory/form-data-inventory";
import IconBar from "../../../assets/icon/material-symbols_menu-rounded.svg?react";
import { fetchAllInventoryData } from "../../../utilities/api/inventory";

function InventoryHistoryPage() {
  const [showNavDis, setNavDis] = useState(false);
  const [closeHumberger, setHumberger] = useState(true);
  const [showFormDis, setFormDis] = useState(false);
  const [existingData, setExistingData] = useState([]);
  
  useEffect(() => {
    loadDataInventory();
  }, []);
  
  const loadDataInventory = async () => {
    try {
      const response = await fetchAllInventoryData();
      console.log("API Response:", response);

      if (!response || !Array.isArray(response)) {
        console.error("Data inventori tidak valid:", response);
        setExistingData([]);
        return;
      }

      setExistingData(response);
    } catch (error) {
      console.error("Gagal memuat data:", error);
      setExistingData([]);
    }
  };

  const handleOpenNavDis = () => {
    setNavDis(true);
    setHumberger(false);
  };

  const handleCloseNavDis = () => {
    setNavDis(false);
    setHumberger(true);
  };

  const handleOpenFormDis = () => {
    setFormDis(true);
  };

  const handleCloseFormDis = () => {
    setFormDis(false);
  };

  const handleFormSuccess = () => {
    loadDataInventory(); // Reload data after success
  };

  return(
    <div className="content distribution-history">
      <NavProduct />
      <div className="main-distribution">
        <div className="header-distribution-history">
          <p>Riwayat Data Inventori Produk</p>
          <div className="distribution-display">
            <SearchFilter />
            {showNavDis && (
              <NavDistribution onClose={handleCloseNavDis} openForm={handleOpenFormDis} to="/product/inventory" />
            )}
            {closeHumberger && (
              <IconBar onClick={handleOpenNavDis} />
            )}
          </div>
        </div>
        <TableInventory existingData={existingData} />
        {showFormDis && (
          <div className="form-overlay">
            <FormDataInventory 
              onCloseForm={handleCloseFormDis} 
              onSuccess={handleFormSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryHistoryPage;