import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import DistributionProduct from "../../../components/product-page/distribution/distribution-items";
import { fetchAllProducts } from "../../../utilities/api/products";

import IconHistory from "../../../assets/icon/ri_file-history-line.svg?react";

function DistributionPage() {
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
        id: item.id_product,
        namaProduk: item.nama_product,
        ukuranProduk: item.ukuran_product,
        ukuranSatuan: item.ukuran_satuan,
        kemasanProduk: item.kemasan_product,
        minimumStock: item.minimum_stock,
        imageProduk: item.img_product,
      }));

      setExistingData(mapped);
      console.log(mapped);
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