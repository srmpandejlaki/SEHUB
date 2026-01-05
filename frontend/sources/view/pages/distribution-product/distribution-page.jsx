import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import DistributionProduct from "../../../components/product-page/distribution/distribution-items";
import { fetchProductsWithStock } from "../../../utilities/api/products";

import IconHistory from "../../../assets/icon/ri_file-history-line.svg?react";

function DistributionPage() {
  const [existingData, setExistingData] = useState([]);
  
  useEffect(() => {
    loadDataProducts();
  }, []);

  const loadDataProducts = async () => {
    try {
      const response = await fetchProductsWithStock();
      console.log("Products with distribution:", response);

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
        totalDistribusi: parseInt(item.total_keluar) || 0,
        distribusiHariIni: parseInt(item.distribusi_hari_ini) || 0,
        imageProduk: item.path_gambar,
      }));

      setExistingData(mapped);
    } catch (error) {
      console.error("Gagal memuat data produk:", error);
    }
  };

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
          <DistributionProduct existingData={existingData} />
        </div>
        <div className="">
        </div>
      </div>
    </div>
  );
}

export default DistributionPage;