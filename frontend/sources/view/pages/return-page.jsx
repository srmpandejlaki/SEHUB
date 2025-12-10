import React from "react";
import SearchFilter from "../../components/base/search-filter";
import NavProduct from "../../components/base/nav-product";

function ReturnPage() {
  return (
    <div className="content product-page">
      <NavProduct />
      <div className="product-display">
        <div className="header-product-page">
          <p className="title">Daftar Return Barang</p>
        </div>
        <SearchFilter />
      </div>

    </div>
  );
}

export default ReturnPage;