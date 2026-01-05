import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import InventoryProduct from "../../../components/product-page/inventory/inventory-items";
import CheckStock from "../../../components/product-page/check-stock";
import IconHistory from "../../../assets/icon/ri_file-history-line.svg?react";
import IconChecking from "../../../assets/icon/ci_checking.svg?react";
import { fetchProductsWithStock } from "../../../utilities/api/products";

function InventoryPage() {
  const [showFormCekStock, setFormCekStock] = useState(false);
  const [existingData, setExistingData] = useState([]);
  
  useEffect(() => {
    loadDataProducts();
  }, []);

  const loadDataProducts = async () => {
    try {
      const response = await fetchProductsWithStock();
      console.log("Products with stock:", response);

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
        minimumStock: parseInt(item.stok_minimum) || 0,
        stokSekarang: parseInt(item.stok_sekarang) || 0,
        imageProduk: item.path_gambar,
      }));

      setExistingData(mapped);
    } catch (error) {
      console.error("Gagal memuat data produk:", error);
    }
  };

  const handleOpenFormStock = () => {
    setFormCekStock(true);
  };

  const handleCloseFormStock = () => {
    setFormCekStock(false);
  };

  return(
    <div className="content product-page">
      <NavProduct />
      <div className="main-inventory">
        <div className="inventory-display">
          <div className="header-inventory">
            <p>Pratinjau Data Inventori Produk</p>
            <div className="button">
              <div className="base-btn black" onClick={handleOpenFormStock} >
                <IconChecking className="icon" />
                <p>Cek Stok Gudang</p>
              </div>
              <div className="base-btn black">
                <Link to="/product/inventory-history" >
                  <IconHistory className="icon" /> <p>Riwayat Tambah Data</p>
                </Link>
              </div>
            </div>
          </div>
          <SearchFilter />
          <InventoryProduct existingData={existingData} />
        </div>
        {showFormCekStock && (
          <div className="checking-overlay">
            <CheckStock openCekStok={handleCloseFormStock}  />
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryPage;