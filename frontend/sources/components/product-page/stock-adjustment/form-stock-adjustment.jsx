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
  
  // Adjustment data per item (detail_barang_masuk)
  const [adjustmentData, setAdjustmentData] = useState({});
  
  // Product-level checkbox (select all items sesuai)
  const [productChecked, setProductChecked] = useState({});
  
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

      // Initialize adjustment data per item
      const initialData = {};
      const initialProductChecked = {};
      
      data.forEach(product => {
        initialProductChecked[product.id_produk] = false;
        
        product.items.forEach(item => {
          initialData[item.id_detail_barang_masuk] = {
            isChecked: false,
            jumlahGudang: "",
            alasan: "",
            jumlahSistem: item.jumlah_barang_masuk
          };
        });
      });
      
      setAdjustmentData(initialData);
      setProductChecked(initialProductChecked);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Handle checkbox per item
  const handleItemCheckboxChange = (id_detail, jumlahSistem) => {
    setAdjustmentData(prev => ({
      ...prev,
      [id_detail]: {
        ...prev[id_detail],
        isChecked: !prev[id_detail].isChecked,
        jumlahGudang: !prev[id_detail].isChecked ? jumlahSistem.toString() : "",
        alasan: !prev[id_detail].isChecked ? "" : prev[id_detail].alasan
      }
    }));
  };

  // Handle master checkbox per product (check/uncheck all items)
  const handleProductCheckboxChange = (product) => {
    const isChecking = !productChecked[product.id_produk];
    
    setProductChecked(prev => ({
      ...prev,
      [product.id_produk]: isChecking
    }));

    // Update all items in this product
    const updatedData = { ...adjustmentData };
    product.items.forEach(item => {
      updatedData[item.id_detail_barang_masuk] = {
        ...updatedData[item.id_detail_barang_masuk],
        isChecked: isChecking,
        jumlahGudang: isChecking ? item.jumlah_barang_masuk.toString() : "",
        alasan: isChecking ? "" : updatedData[item.id_detail_barang_masuk].alasan
      };
    });
    setAdjustmentData(updatedData);
  };

  const handleJumlahChange = (id_detail, value) => {
    setAdjustmentData(prev => ({
      ...prev,
      [id_detail]: {
        ...prev[id_detail],
        jumlahGudang: value,
        isChecked: false
      }
    }));
  };

  const handleAlasanChange = (id_detail, value) => {
    setAdjustmentData(prev => ({
      ...prev,
      [id_detail]: {
        ...prev[id_detail],
        alasan: value
      }
    }));
  };

  const getStokGudangStatus = (id_detail) => {
    const data = adjustmentData[id_detail];
    if (!data || data.jumlahGudang === "") return "-";
    
    const selisih = parseInt(data.jumlahGudang) - data.jumlahSistem;
    if (selisih === 0 || data.isChecked) return "SESUAI";
    if (selisih > 0) return `+${selisih}`;
    return selisih.toString();
  };

  const handleSubmit = async () => {
    // Collect adjustment items - aggregate per product
    const productAggregates = {};

    products.forEach(product => {
      let totalSistem = 0;
      let totalGudang = 0;
      let hasData = false;
      let alasan = "";

      product.items.forEach(item => {
        const data = adjustmentData[item.id_detail_barang_masuk];
        if (data && data.jumlahGudang !== "") {
          hasData = true;
          totalSistem += data.jumlahSistem;
          totalGudang += parseInt(data.jumlahGudang);
          if (data.alasan && !alasan) alasan = data.alasan;
        }
      });

      if (hasData) {
        productAggregates[product.id_produk] = {
          id_produk: product.id_produk,
          stok_gudang: totalGudang,
          stok_sistem: totalSistem,
          alasan: alasan || null
        };
      }
    });

    const items = Object.values(productAggregates);

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

  // Calculate product total
  const getProductTotal = (product) => {
    return product.items.reduce((sum, item) => sum + item.jumlah_barang_masuk, 0);
  };

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
            {currentProduct && (
              <div className="product-card">
                <div className="product-info">
                  <div className="product-left">
                    <span className="product-code">{currentProduct.id_produk}</span>
                    <span className="product-name">
                      {currentProduct.nama_produk} {currentProduct.ukuran_produk}{currentProduct.nama_ukuran_satuan}
                    </span>
                  </div>
                  <div className="product-right">
                    <label className="master-checkbox">
                      <input 
                        type="checkbox"
                        checked={productChecked[currentProduct.id_produk] || false}
                        onChange={() => handleProductCheckboxChange(currentProduct)}
                      />
                      Semua Sesuai
                    </label>
                  </div>
                </div>

                <div className="adjustment-table-wrapper">
                  <table className="adjustment-table">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Tanggal Masuk</th>
                        <th>Tanggal Kadaluarsa</th>
                        <th>Data Barang Masuk</th>
                        <th></th>
                        <th>Jumlah di Gudang</th>
                        <th>Alasan Tidak Sesuai</th>
                        <th>Stok Gudang</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProduct.items.map((item, index) => {
                        const data = adjustmentData[item.id_detail_barang_masuk] || {};
                        const status = getStokGudangStatus(item.id_detail_barang_masuk);
                        const isSesuai = status === "SESUAI";
                        
                        return (
                          <tr key={item.id_detail_barang_masuk}>
                            <td className="center">{index + 1}</td>
                            <td>{formatDate(item.tanggal_masuk)}</td>
                            <td>{formatDate(item.tanggal_expired)}</td>
                            <td className="center">{item.jumlah_barang_masuk} botol</td>
                            <td className="center">
                              <input 
                                type="checkbox"
                                checked={data.isChecked || false}
                                onChange={() => handleItemCheckboxChange(
                                  item.id_detail_barang_masuk, 
                                  item.jumlah_barang_masuk
                                )}
                              />
                            </td>
                            <td>
                              <input 
                                type="number"
                                className="jumlah-input"
                                value={data.jumlahGudang || ""}
                                onChange={(e) => handleJumlahChange(
                                  item.id_detail_barang_masuk, 
                                  e.target.value
                                )}
                                placeholder="0"
                                min="0"
                                disabled={data.isChecked}
                              />
                            </td>
                            <td>
                              <input 
                                type="text"
                                className="alasan-input"
                                value={data.alasan || ""}
                                onChange={(e) => handleAlasanChange(
                                  item.id_detail_barang_masuk, 
                                  e.target.value
                                )}
                                placeholder="Berikan Alasan..."
                                disabled={isSesuai}
                              />
                            </td>
                            <td className={`status-cell ${isSesuai ? 'sesuai' : 'tidak-sesuai'}`}>
                              {status}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="total-row">
                        <td colSpan="3" className="text-right">Total Produk</td>
                        <td className="center">{getProductTotal(currentProduct)} botol</td>
                        <td colSpan="4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

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
