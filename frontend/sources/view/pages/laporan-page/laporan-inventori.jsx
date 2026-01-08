import React, { useState, useEffect } from "react";
import NavLaporan from "../../../components/base/nav-laporan";
import SearchFilter from "../../../components/base/search-filter";
import { fetchReportProducts } from "../../../utilities/api/report";

function LaporanInventori() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/sehub/";

  useEffect(() => {
    loadProducts();
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [selectedProduct]);

  const loadProducts = async () => {
    const prods = await fetchReportProducts();
    setProducts(prods);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      let url = `${BASE_URL}report/inventory`;
      if (selectedProduct) {
        url += `?id_produk=${selectedProduct}`;
      }
      const response = await fetch(url);
      const result = await response.json();
      setData(result.data || []);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      setData([]);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  // Filter data by search
  const filteredData = data.filter(row => {
    const query = searchQuery.toLowerCase();
    return (
      row.id_produk?.toLowerCase().includes(query) ||
      row.nama_produk?.toLowerCase().includes(query) ||
      row.catatan?.toLowerCase().includes(query)
    );
  });

  // Download CSV
  const downloadCSV = () => {
    const headers = ["No", "Tanggal", "Kode Produk", "Nama Produk", "Ukuran", "Kemasan", "Jumlah", "Kadaluwarsa", "Catatan"];
    const csvData = filteredData.map((row, i) => [
      i + 1,
      formatDate(row.tanggal),
      row.id_produk,
      row.nama_produk || "-",
      `${row.ukuran_produk || ""}${row.nama_ukuran_satuan || ""}`,
      row.nama_kemasan || "-",
      row.jumlah,
      formatDate(row.tanggal_expired),
      row.catatan || "-"
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_Inventori_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="content laporan-page">
      <NavLaporan />
      <div className="main-laporan">
        <div className="laporan-header">
          <h3>Laporan Barang Masuk (Inventori)</h3>
          <div className="laporan-actions">
            <select 
              value={selectedProduct} 
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="filter-select"
            >
              <option value="">Semua Produk</option>
              {products.map((p) => (
                <option key={p.id_produk} value={p.id_produk}>
                  {p.id_produk} - {p.nama_produk}
                </option>
              ))}
            </select>
            <button className="btn-download" onClick={downloadCSV}>
              📄 Unduh CSV
            </button>
          </div>
        </div>

        <SearchFilter 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Cari data..." 
        />

        <div className="laporan-table-container">
          {loading ? (
            <p className="loading">Memuat data...</p>
          ) : (
            <table className="laporan-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Kode Produk</th>
                  <th>Nama Produk</th>
                  <th>Ukuran</th>
                  <th>Kemasan</th>
                  <th>Jumlah</th>
                  <th>Kadaluwarsa</th>
                  <th>Catatan</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="no-data">Tidak ada data</td>
                  </tr>
                ) : (
                  filteredData.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{formatDate(row.tanggal)}</td>
                      <td>{row.id_produk}</td>
                      <td>{row.nama_produk || "-"}</td>
                      <td>{row.ukuran_produk}{row.nama_ukuran_satuan}</td>
                      <td>{row.nama_kemasan || "-"}</td>
                      <td className="center">{row.jumlah}</td>
                      <td>{formatDate(row.tanggal_expired)}</td>
                      <td>{row.catatan || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default LaporanInventori;
