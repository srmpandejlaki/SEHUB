import React from "react";
import { Link } from 'react-router-dom';
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import DistributionProduct from "../../../components/product-page/distribution-items";

import IconHistory from "../../../assets/icon/ri_file-history-line.svg?react";

function DistributionPage() {
  return(
    <div className="content product-page">
      <NavProduct />
      <div className="main-inventory">
        <div className="inventory-display">
          <div className="header-distribution">
            <p>Pratinjau Data Distribusi Produk</p>
            <div className="button">
              <div className="base-btn black">
                <Link to="/product/distribution-history" >
                  <IconHistory className="icon" />Riwayat Tambah Data
                </Link>
              </div>
            </div>
          </div>
          <SearchFilter />
          <DistributionProduct />
        </div>
        <div className="">
        </div>
      </div>
    </div>
  );
}

export default DistributionPage;