import React, { useState, useEffect } from "react";
import SearchFilter from "../../components/base/search-filter";
import ProductItems from "../../components/product-page/product-items";
import NavProduct from "../../components/base/nav-product";
import FormProduct from "../../components/product-page/form-product";

import IconAddProduct from "../../assets/icon/Vector-3.svg?react";
import { fetchAllProducts } from "../../utilities/api/products";

function ProductPage() {
  const [showFormProduct, setFormProduct] = useState(false);
  const [existingData, setExistingData] = useState([]);

  useEffect(() => {
    loadDataProducts();
  }, []);

  const loadDataProducts = async () => {
    try {
      const response = await fetchAllProducts();
      console.log(response);

      if (!response || !Array.isArray(response)) {
        console.error("Data produk tidak valid:", response);
        return;
      }

      const mapped = response.map((item) => ({
        id: item.id_produk,
        namaProduk: item.nama_produk,
        ukuranProduk: item.ukuran_produk,
        ukuranSatuan: item.nama_ukuran_satuan,
        kemasanProduk: item.nama_kemasan,
        stokMinimum: item.stok_minimum,
        imageProduk: item.path_gambar,
      }));

      setExistingData(mapped);
      console.log(mapped);
    } catch (error) {
      console.error("Gagal memuat data produk:", error);
    }
  };

  const reloadProducts = () => {
    loadDataProducts();
  };

  const handleOpenFormProduct = () => setFormProduct(true);

  const handleCloseFormProduct = () => {
    setFormProduct(false);
    loadDataProducts();
  };

  return (
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
          <ProductItems products={existingData} />
        </div>

        {showFormProduct && (
          <div className="form-overlay">
            <FormProduct closeFormProduct={handleCloseFormProduct} reloadProducts={reloadProducts} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
