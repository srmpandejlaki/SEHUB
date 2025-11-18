import React from "react";
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import InventoryProduct from "../../../components/product-page/inventory-items";
import CheckStock from "../../../components/product-page/check-stock";

import IconHistory from "../../../assets/icon/ri_file-history-line.svg?react";
import IconChecking from "../../../assets/icon/ci_checking.svg?react";

function HistoryInventoryData() {
  return(
    <div className="content product-page">
      <NavProduct />
      <div className="main-inventory">
        <div className="inventory-display">
          <div className="header-inventory">
            <p>Pratinjau Data Inventori Produk</p>
            <div className="button">
              <div className="base-btn black">
                <IconChecking className="icon" />
                <p>Cek Stok Gudang</p>
              </div>
              <div className="base-btn black">
                <IconHistory className="icon" />
                <p>Riwayat Tambah Data</p>
              </div>
            </div>
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