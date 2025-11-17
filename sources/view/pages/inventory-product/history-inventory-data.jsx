import React from "react";
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import InventoryProduct from "../../../components/product-page/inventory-items";
import CheckStock from "../../../components/product-page/check-stock";

function HistoryInventoryData() {
  return(
    <div className="content product-page">
      <NavProduct />
      <div className="main-inventory">
        <div className="inventory-display">
          <div className="header-inventory">
            <p>Pratinjau Data Inventori Produk</p>
          </div>
          <SearchFilter />
          <InventoryProduct />
        </div>
        <div className="checking-overlay">
          <CheckStock />
        </div>
      </div>
    </div>
  );
}

export default HistoryInventoryData;