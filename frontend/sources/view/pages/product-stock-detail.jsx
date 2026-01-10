import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import NavProduct from "../../components/base/nav-product";
import IconBack from "../../assets/icon/material-symbols_cancel.svg?react";

function ProductStockDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // For back button
  const productData = location.state?.productData || {};
  
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/sehub/";

  useEffect(() => {
    fetchBatches();
  }, [id]);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}inventory/product/${id}`);
      const result = await response.json();
      if (result.success) {
        setBatches(result.data);
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <div className="content product-stock-detail">
      <NavProduct />
      <div className="main-product" style={{ padding: "20px" }}>
        
        <div className="header-detail" style={{ display: "flex", alignItems: "center", marginBottom: "20px", gap: "10px" }}>
           <div 
            onClick={() => navigate(-1)} 
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", color: "#666" }}
          >
            <IconBack className="blackIcon" />
            <span>Kembali</span>
          </div>
        </div>

        <div className="product-info-card" style={{ 
          background: "white", 
          padding: "20px", 
          borderRadius: "10px", 
          marginBottom: "20px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
          boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
        }}>
          {productData.imageProduk ? (
             <img src={productData.imageProduk} alt={productData.namaProduk} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
          ) : (
            <div style={{ width: "80px", height: "80px", background: "#eee", borderRadius: "8px" }}></div>
          )}
          
          <div>
            <h2 style={{ margin: 0, fontSize: "24px" }}>{productData.namaProduk || id}</h2>
            <p style={{ margin: "5px 0 0", color: "#888" }}>
              {productData.ukuranProduk} {productData.ukuranSatuan} - {productData.kemasanProduk}
            </p>
          </div>
        </div>

        <div className="batches-table-container" style={{ background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginBottom: "15px" }}>Riwayat Stok (Per Batch)</h3>
          
          {loading ? (
             <p>Memuat data stok...</p>
          ) : (
            <table className="laporan-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #eee", textAlign: "left", height: "40px" }}>
                  <th style={{ padding: "10px" }}>No</th>
                  <th style={{ padding: "10px" }}>Tanggal Masuk</th>
                  <th style={{ padding: "10px" }}>Jumlah Awal</th>
                  <th style={{ padding: "10px", color: "var(--primary)" }}>Stok Sekarang</th>
                  <th style={{ padding: "10px" }}>Tanggal Kadaluwarsa</th>
                  <th style={{ padding: "10px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {batches.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: "20px", textAlign: "center", color: "#888" }}>Belum ada riwayat stok.</td>
                  </tr>
                ) : (
                  batches.map((batch, index) => {
                     const isExpired = new Date(batch.tanggal_expired) < new Date();
                     const isOut = batch.stok_sekarang <= 0;
                     let status = "Tersedia";
                     let color = "green";
                     
                     if (isOut) { status = "Habis"; color = "red"; }
                     else if (isExpired) { status = "Kadaluwarsa"; color = "orange"; }

                     return (
                      <tr key={index} style={{ borderBottom: "1px solid #f9f9f9", height: "40px" }}>
                        <td style={{ padding: "10px" }}>{index + 1}</td>
                        <td style={{ padding: "10px" }}>{formatDate(batch.tanggal_masuk)}</td>
                        <td style={{ padding: "10px" }}>{batch.jumlah_barang_masuk}</td>
                        <td style={{ padding: "10px", fontWeight: "bold" }}>{batch.stok_sekarang}</td>
                        <td style={{ padding: "10px" }}>{formatDate(batch.tanggal_expired)}</td>
                        <td style={{ padding: "10px", color: color, fontWeight: 500 }}>{status}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProductStockDetail;
