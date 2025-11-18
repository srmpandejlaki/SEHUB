import React from "react";
import SearchFilter from "../../components/base/search-filter";
import ProductItems from "../../components/product-page/product-items";
import NavProduct from "../../components/base/nav-product";
import FormProduct from "../../components/product-page/form-product";

import IconAddProduct from "../../assets/icon/Vector-3.svg?react";

function ProductPage() {
  return(
    <div className="content product-page">
      <NavProduct />
      <div className="main-product">
        <div className="product-display">
          <div className="header-product-page">
            <p>Daftar Produk L' Arbre Seho</p>
            <div className="base-btn black">
              <IconAddProduct className="icon" />
              <p>tambah produk</p>
            </div>
          </div>
          <SearchFilter />  
          <ProductItems />
        </div>
        <div className="form-overlay">
          <FormProduct />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;