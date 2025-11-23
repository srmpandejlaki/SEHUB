import React, { useState } from "react";
import SearchFilter from "../../components/base/search-filter";
import ProductItems from "../../components/product-page/product-items";
import NavProduct from "../../components/base/nav-product";
import FormProduct from "../../components/product-page/form-product";

import IconAddProduct from "../../assets/icon/Vector-3.svg?react";

function ProductPage() {
  const [showFormProduct, setFormProduct] = useState(false);

  const handleOpenFormProduct = () => {
    setFormProduct(true);
  };

  const handleCloseFormProduct = () => {
    setFormProduct(false);
  };

  return(
    <div className="content product-page">
      <NavProduct />
      <div className="main-product">
        <div className="product-display">
          <div className="header-product-page">
            <p className="title">Daftar Produk L' Arbre Seho</p>
            <div className="button">
              <div className="base-btn black" onClick={handleOpenFormProduct}>
                <IconAddProduct className="icon" />
                <p>tambah produk</p>
              </div>
            </div>
          </div>
          <SearchFilter />  
          <ProductItems />
        </div>
        {showFormProduct && (
          <div className="form-overlay">
            <FormProduct closeFormProduct={handleCloseFormProduct} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;