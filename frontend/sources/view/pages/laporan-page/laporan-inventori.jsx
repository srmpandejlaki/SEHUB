import React, { useState, useEffect } from "react";
import NavLaporan from "../../../components/base/nav-laporan";
import { fetchReportProducts } from "../../../utilities/api/report";
import { generatePDFReport } from "../../../utilities/pdf-generator";

function LaporanInventori() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Date range filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/sehub/";

  useEffect(() => {
    loadProducts();
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [selectedProduct]);

  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate]);

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

  // Filter data by date range
  const filteredData = data.filter(row => {
    if (!startDate && !endDate) return true;
    
    const rowDate = new Date(row.tanggal);
    if (startDate && endDate) {
      return rowDate >= new Date(startDate) && rowDate <= new Date(endDate);
    }
    if (startDate) {
      return rowDate >= new Date(startDate);
    }
    if (endDate) {
      return rowDate <= new Date(endDate);
    }
    return true;
  });

  // Calculate recap
  const recap = {
    totalData: filteredData.length,
    totalJumlah: filteredData.reduce((sum, r) => sum + (parseInt(r.jumlah) || 0), 0),
    produkUnik: [...new Set(filteredData.map(r => r.id_produk))].length
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

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

    // Add recap
    csvData.push([]);
    csvData.push(["REKAPITULASI"]);
    csvData.push(["Total Data", recap.totalData]);
    csvData.push(["Total Barang Masuk", recap.totalJumlah, "unit"]);
    csvData.push(["Produk Unik", recap.produkUnik, "produk"]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_Inventori_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Download PDF
  const downloadPDF = () => {
    const columns = ["No", "Tanggal", "Kode", "Nama Produk", "Ukuran", "Kemasan", "Jumlah", "Kadaluwarsa", "Catatan"];
    const tableData = filteredData.map((row, i) => [
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

    const dateRangeStr = (startDate || endDate) 
      ? `${formatDate(startDate) || "Awal"} s/d ${formatDate(endDate) || "Akhir"}`
      : "Semua Waktu";

    const recapData = [
      { label: "Total Data", value: recap.totalData },
      { label: "Total Barang Masuk", value: `${recap.totalJumlah} unit` },
      { label: "Produk Unik", value: `${recap.produkUnik} produk` }
    ];

    generatePDFReport({
      title: "Laporan Inventori (Barang Masuk)",
      dateRange: dateRangeStr,
      columns,
      data: tableData,
      fileName: `Laporan_Inventori_${new Date().toISOString().split('T')[0]}.pdf`,
      recap: recapData
    });
  };

  const clearDateFilter = () => {
    setStartDate("");
    setEndDate("");
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
            <button className="btn-download" onClick={downloadCSV} style={{ marginRight: "10px" }}>
              📄 Unduh CSV
            </button>
            <button className="btn-download" onClick={downloadPDF}>
              📄 Unduh PDF
            </button>
          </div>
        </div>

        <div className="date-range-filter">
          <div className="date-inputs">
            <label>
              Dari:
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              Sampai:
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            {(startDate || endDate) && (
              <button className="btn-clear" onClick={clearDateFilter}>
                ✕ Reset
              </button>
            )}
          </div>
          {(startDate || endDate) && (
            <span className="filter-info">
              Menampilkan {filteredData.length} dari {data.length} data
            </span>
          )}
        </div>

        {/* Recap Section */}
        <div className="recap-section">
          <div className="recap-item">
            <span className="recap-label">Total Data:</span>
            <span className="recap-value">{recap.totalData}</span>
          </div>
          <div className="recap-item">
            <span className="recap-label">Total Barang Masuk:</span>
            <span className="recap-value">{recap.totalJumlah} unit</span>
          </div>
          <div className="recap-item">
            <span className="recap-label">Produk Unik:</span>
            <span className="recap-value">{recap.produkUnik} produk</span>
          </div>
        </div>

        <div className="laporan-table-container">
          {loading ? (
            <p className="loading">Memuat data...</p>
          ) : (
            <>
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
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="no-data">Tidak ada data</td>
                    </tr>
                  ) : (
                    paginatedData.map((row, index) => (
                      <tr key={index}>
                        <td>{startIndex + index + 1}</td>
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
              {totalPages > 1 && (
                <div className="pagination">
                  <span>Halaman {currentPage} dari {totalPages} ({filteredData.length} data)</span>
                  <div className="pagination-buttons">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                      Sebelumnya
                    </button>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                      Selanjutnya
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LaporanInventori;
