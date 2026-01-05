import React, { useState, useEffect } from "react";
import NavProduct from "../../components/base/nav-product";
import { fetchInventoryForAdjustment, adjustStock } from "../../utilities/api/stock-adjustment";

function StockAdjustmentPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State untuk menyimpan input per item
  const [adjustmentData, setAdjustmentData] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchInventoryForAdjustment();
      setProducts(data);

      // Initialize adjustment data for each item
      const initialData = {};
      data.forEach(product => {
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

  const handleCheckboxChange = (id_detail, jumlahSistem) => {
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

  const handleJumlahChange = (id_detail, value) => {
    setAdjustmentData(prev => ({
      ...prev,
      [id_detail]: {
        ...prev[id_detail],
        jumlahGudang: value,
        isChecked: false // Uncheck if manually editing
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
    // Collect adjustments that need to be made
    const adjustments = [];

    products.forEach(product => {
      product.items.forEach(item => {
        const data = adjustmentData[item.id_detail_barang_masuk];
        if (data && data.jumlahGudang !== "" && !data.isChecked) {
          const selisih = parseInt(data.jumlahGudang) - data.jumlahSistem;
          if (selisih !== 0) {
            adjustments.push({
              id_produk: product.id_produk,
              id_detail_barang_masuk: item.id_detail_barang_masuk,
              selisih: selisih,
              alasan: data.alasan || null,
              tanggal_expired: item.tanggal_expired
            });
          }
        }
      });
    });

    if (adjustments.length === 0) {
      alert("Tidak ada penyesuaian yang perlu dilakukan");
      return;
    }

    if (!window.confirm(`Akan dilakukan ${adjustments.length} penyesuaian stok. Lanjutkan?`)) {
      return;
    }

    setIsSubmitting(true);
    const result = await adjustStock(adjustments);
    setIsSubmitting(false);

    if (result && result.success) {
      alert("Penyesuaian stok berhasil dilakukan!");
      loadData(); // Reload data
    } else {
      alert("Gagal melakukan penyesuaian stok");
    }
  };

  // Calculate total per product
  const calculateProductTotal = (items) => {
    return items.reduce((sum, item) => sum + item.jumlah_barang_masuk, 0);
  };

  return (
    <div className="content stock-adjustment">
      <NavProduct />
      <div className="stock-adjustment-container">
        <div className="header-stock-adjustment">
          <p className="title">Penyesuaian Stok Gudang</p>
          <p className="date">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        {loading ? (
          <p>Memuat data...</p>
        ) : products.length === 0 ? (
          <p>Tidak ada data inventori</p>
        ) : (
          <div className="products-list">
            {products.map((product) => (
              <div key={product.id_produk} className="product-adjustment-card">
                <div className="product-header">
                  <span className="product-code">{product.id_produk}</span>
                  <span className="product-name">
                    {product.nama_produk} {product.ukuran_produk}{product.nama_ukuran_satuan}
                  </span>
                </div>

                <div className="adjustment-table">
                  <table>
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
                      {product.items.map((item, index) => {
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
                                onChange={() => handleCheckboxChange(
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
                            <td className={`status ${isSesuai ? 'sesuai' : 'tidak-sesuai'}`}>
                              {status}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="total-row">
                        <td colSpan="3" className="text-right">Total Produk</td>
                        <td className="center">{calculateProductTotal(product.items)} botol</td>
                        <td colSpan="4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="submit-section">
          <button 
            className="base-btn green submit-btn"
            onClick={handleSubmit}
            disabled={isSubmitting || loading}
          >
            {isSubmitting ? "Memproses..." : "Sesuaikan Sekarang"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StockAdjustmentPage;
