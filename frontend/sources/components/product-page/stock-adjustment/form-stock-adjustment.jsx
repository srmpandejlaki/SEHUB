import React, { useState, useEffect } from "react";
import IconEditProduct from "../../../assets/icon/flowbite_edit-outline.svg?react";
import IconCancel from "../../../assets/icon/material-symbols_cancel.svg?react";
import IconPanahKiri from "../../../assets/icon/carbon_next-filled.svg?react";
import IconPanahKanan from "../../../assets/icon/carbon_next-filled-right.svg?react";
import { fetchInventoryForAdjustment, createAdjustment } from "../../../utilities/api/stock-adjustment";

function FormStockAdjustment({ onCloseForm, onSuccess }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [catatan, setCatatan] = useState("");
  
  // Adjustment data per product
  const [adjustmentData, setAdjustmentData] = useState({});
  
  // Product pagination
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchInventoryForAdjustment();
      setProducts(data);

      // Initialize adjustment data per product
      const initialData = {};
      data.forEach(product => {
        initialData[product.id_produk] = {
          isSesuai: false,
          jumlahGudang: "",
          alasan: "",
          stokSistem: parseInt(product.stok_sistem) || 0
        };
      });
      
      setAdjustmentData(initialData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
  };

  // Handle checkbox per product (is stock matching)
  const handleSesuaiChange = (id_produk, stokSistem) => {
    setAdjustmentData(prev => ({
      ...prev,
      [id_produk]: {
        ...prev[id_produk],
        isSesuai: !prev[id_produk].isSesuai,
        jumlahGudang: !prev[id_produk].isSesuai ? stokSistem.toString() : "",
        alasan: !prev[id_produk].isSesuai ? "" : prev[id_produk].alasan
      }
    }));
  };

  const handleJumlahChange = (id_produk, value) => {
    setAdjustmentData(prev => ({
      ...prev,
      [id_produk]: {
        ...prev[id_produk],
        jumlahGudang: value,
        isSesuai: false
      }
    }));
  };

  const handleAlasanChange = (id_produk, value) => {
    setAdjustmentData(prev => ({
      ...prev,
      [id_produk]: {
        ...prev[id_produk],
        alasan: value
      }
    }));
  };

  const getStokStatus = (id_produk) => {
    const data = adjustmentData[id_produk];
    if (!data || data.jumlahGudang === "") return "-";
    
    const selisih = parseInt(data.jumlahGudang) - data.stokSistem;
    if (selisih === 0 || data.isSesuai) return "SESUAI";
    if (selisih > 0) return `+${selisih}`;
    return selisih.toString();
  };

  const handleSubmit = async () => {
    // Collect adjustment items
    const items = [];

    products.forEach(product => {
      const data = adjustmentData[product.id_produk];
      if (data && data.jumlahGudang !== "") {
        items.push({
          id_produk: product.id_produk,
          stok_gudang: parseInt(data.jumlahGudang),
          stok_sistem: data.stokSistem,
          alasan: data.alasan || null
        });
      }
    });

    if (items.length === 0) {
      alert("Mohon isi minimal satu data penyesuaian");
      return;
    }

    if (!window.confirm(`Akan dilakukan penyesuaian untuk ${items.length} produk. Lanjutkan?`)) {
      return;
    }

    setIsSubmitting(true);
    const result = await createAdjustment(catatan || null, items);
    setIsSubmitting(false);

    if (result && result.success) {
      alert("Penyesuaian stok berhasil!");
      if (onSuccess) onSuccess();
    } else {
      alert("Gagal menyimpan penyesuaian stok");
    }
  };

  const currentProduct = products[currentProductIndex];
  const totalProducts = products.length;

  return (
    <div className="form-stock-adjustment">
      <div className="form-header">
        <div>
          <IconEditProduct className="icon darkGreenIcon" />
          <p>Penyesuaian Stok Gudang</p>
        </div>
        <IconCancel className="icon" onClick={onCloseForm} style={{ cursor: 'pointer' }} />
      </div>

      <div className="form-content">
        {loading ? (
          <p>Memuat data...</p>
        ) : products.length === 0 ? (
          <p>Tidak ada data inventori</p>
        ) : (
          <>
            {/* Product Navigation */}
            <div className="product-navigation">
              <button 
                className="nav-btn"
                disabled={currentProductIndex === 0}
                onClick={() => setCurrentProductIndex(prev => prev - 1)}
              >
                <IconPanahKiri className="blackIcon" /> Sebelumnya
              </button>
              <span className="product-counter">
                Produk {currentProductIndex + 1} dari {totalProducts}
              </span>
              <button 
                className="nav-btn"
                disabled={currentProductIndex === totalProducts - 1}
                onClick={() => setCurrentProductIndex(prev => prev + 1)}
              >
                Selanjutnya <IconPanahKanan className="blackIcon" />
              </button>
            </div>

            {/* Current Product Card */}
            {currentProduct && (() => {
              const data = adjustmentData[currentProduct.id_produk] || {};
              const status = getStokStatus(currentProduct.id_produk);
              const isSesuai = status === "SESUAI";
              const stokSistem = parseInt(currentProduct.stok_sistem) || 0;

              return (
                <div className="product-card">
                  <div className="product-info">
                    <div className="product-left">
                      <span className="product-code">{currentProduct.id_produk}</span>
                      <span className="product-name">
                        {currentProduct.nama_produk} {currentProduct.ukuran_produk}{currentProduct.nama_ukuran_satuan}
                      </span>
                    </div>
                  </div>

                  <div className="adjustment-input">
                    <div className="input-row">
                      <label>Stok Sistem (Data):</label>
                      <span className="stok-value">{stokSistem} botol</span>
                    </div>
                    
                    <div className="input-row">
                      <label>
                        <input 
                          type="checkbox"
                          checked={data.isSesuai || false}
                          onChange={() => handleSesuaiChange(currentProduct.id_produk, stokSistem)}
                        />
                        Stok Sesuai
                      </label>
                    </div>

                    <div className="input-row">
                      <label>Jumlah di Gudang:</label>
                      <input 
                        type="number"
                        className="jumlah-input"
                        value={data.jumlahGudang || ""}
                        onChange={(e) => handleJumlahChange(currentProduct.id_produk, e.target.value)}
                        placeholder="0"
                        min="0"
                        disabled={data.isSesuai}
                      />
                      <span>botol</span>
                    </div>

                    <div className="input-row">
                      <label>Alasan Tidak Sesuai:</label>
                      <input 
                        type="text"
                        className="alasan-input"
                        value={data.alasan || ""}
                        onChange={(e) => handleAlasanChange(currentProduct.id_produk, e.target.value)}
                        placeholder="Berikan Alasan..."
                        disabled={isSesuai}
                      />
                    </div>

                    <div className="status-row">
                      <label>Status Stok Gudang:</label>
                      <span className={`status ${isSesuai ? 'sesuai' : 'tidak-sesuai'}`}>
                        {status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Catatan */}
            <div className="catatan-section">
              <label>Catatan Penyesuaian (opsional):</label>
              <input 
                type="text"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Masukkan catatan..."
              />
            </div>
          </>
        )}
      </div>

      <div className="form-footer">
        <button className="base-btn cancel" onClick={onCloseForm}>Batal</button>
        <button 
          className="base-btn green" 
          onClick={handleSubmit}
          disabled={isSubmitting || loading}
        >
          {isSubmitting ? "Menyimpan..." : "Sesuaikan Sekarang"}
        </button>
      </div>
    </div>
  );
}

export default FormStockAdjustment;
