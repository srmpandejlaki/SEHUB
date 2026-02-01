import React, { useState, useEffect } from "react";
import SearchFilter from "../../components/base/search-filter";
import ProductItems from "../../components/product-page/product-items";
import NavProduct from "../../components/base/nav-product";
import { fetchAllProducts } from "../../utilities/api/products";

function ProductPage({ isAdmin = true }) {
  const [showFormProduct, setFormProduct] = useState(false);
  const [existingData, setExistingData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleOpenFormProduct = () => {
    if (!isAdmin) return;
    setFormProduct(true);
  };

  const handleCloseFormProduct = () => {
    setFormProduct(false);
    loadDataProducts();
  };

  // Filter products by search query
  const filteredProducts = existingData.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.namaProduk?.toLowerCase().includes(query) ||
      product.id?.toLowerCase().includes(query) ||
      product.kemasanProduk?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="content product-page">
      <NavProduct />
      <div className="main-product">
        <div className="product-display">
          <div className="header-product-page">
            <p className="title">Daftar Produk L' Arbre Seho</p>
          </div>
          <SearchFilter value={searchQuery} onChange={setSearchQuery} placeholder="Cari produk..." />
          <ProductItems products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
