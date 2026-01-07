import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import InventoryProduct from "../../../components/product-page/inventory/inventory-items";
import FormProduct from "../../../components/product-page/form-product";
import FormDataInventory from "../../../components/product-page/inventory/form-data-inventory";
import IconHistory from "../../../assets/icon/ri_file-history-line.svg?react";
import IconAddProduct from "../../../assets/icon/Vector-3.svg?react";
import IconTambah from "../../../assets/icon/mdi_add-bold.svg?react";
import { fetchProductsWithStock } from "../../../utilities/api/products";

function InventoryPage({ isAdmin = true }) {
  const [existingData, setExistingData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFormProduct, setShowFormProduct] = useState(false);
  // Edit state
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [showFormDis, setFormDis] = useState(false);
  
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

  const handleOpenFormProduct = () => {
    setShowFormProduct(true);
  };

  const handleCloseFormProduct = () => {
    setShowFormProduct(false);
  };  

  const reloadProducts = () => {
    loadDataProducts();
  };

  
  const handleCloseEditForm = () => {
    setShowFormEdit(false);
    setEditingData(null);
  };

  const handleEditSuccess = () => {
    setShowFormEdit(false);
    setEditingData(null);
    loadDataInventory();
  };

  const handleOpenFormDis = () => {
    if (!isAdmin) return;
    setFormDis(true);
  };

  const handleCloseFormDis = () => {
    setFormDis(false);
  };

  const handleFormSuccess = () => {
    loadDataInventory(); // Reload data after success
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

  return(
    <div className="content product-page">
      <NavProduct />
      <div className="main-inventory">
        <div className="inventory-display">
          <div className="header-inventory">
            <p>Pratinjau Data Inventori Produk</p>
            <div className="buttons">
              {isAdmin && (
                <div className="button">
                  <div className="base-btn black" onClick={handleOpenFormProduct}>
                    <IconAddProduct className="icon" />
                    <p>Tambah Produk</p>
                  </div>
                </div>
              )}
              {isAdmin && (
                <div className="button">
                  <div className="base-btn black" onClick={handleOpenFormDis}>
                    <IconTambah className="icon whiteIcon" />Tambah Data
                  </div>
                </div>
              )}
              <div className="button">
                <div className="base-btn black">
                  <Link to="/product/inventory-history" >
                    <IconHistory className="icon" /> <p>Riwayat Data</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <SearchFilter value={searchQuery} onChange={setSearchQuery} placeholder="Cari produk..." />
          <InventoryProduct existingData={filteredProducts} />
        </div>
        {showFormProduct && (
          <div className="form-overlay">
            <FormProduct closeFormProduct={handleCloseFormProduct} reloadProducts={reloadProducts} />
          </div>
        )}
        
        {showFormDis && (
          <div className="form-overlay">
            <FormDataInventory 
              onCloseForm={handleCloseFormDis} 
              onSuccess={handleFormSuccess}
            />
          </div>
        )}

        {/* Edit Form - Same as Add Form but with pre-filled data */}
        {showFormEdit && editingData && (
          <div className="form-overlay">
            <FormDataInventory 
              onCloseForm={handleCloseEditForm} 
              onSuccess={handleEditSuccess}
              editData={editingData}
              isEdit={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryPage;