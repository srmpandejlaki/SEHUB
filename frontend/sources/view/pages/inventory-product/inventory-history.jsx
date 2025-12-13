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

      if (!response || !response.items || !Array.isArray(response.items)) {
        console.error("Data inventori tidak valid:", response);
        return;
      }

      const mapped = response.map((item) => ({
        incoming_stock_id: item.incoming_stock_id,
        date: item.date,
        items: item.items.map((p) => ({
          incoming_product_id: p.incoming_product_id,
          id_product: p.id_product,
          product_name: p.product_name,
          quantity: p.quantity,
          expired_date: p.expired_date,
          notes: p.notes
        }))
      }));

      console.log("Mapped:", mapped);
      setExistingData([mapped]);

    } catch (error) {
      console.error("Gagal memuat data:", error);
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
            <FormDataInventory onCloseForm={handleCloseFormDis} />
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryHistoryPage;