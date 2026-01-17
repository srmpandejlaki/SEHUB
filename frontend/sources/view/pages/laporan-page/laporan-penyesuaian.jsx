import React, { useState, useEffect } from "react";
import NavLaporan from "../../../components/base/nav-laporan";
import { fetchReportProducts } from "../../../utilities/api/report";
import { generatePDFReport } from "../../../utilities/pdf-generator";
import { useTranslation, useLocalizedDateShort } from "../../../contexts/localContext";

function LaporanPenyesuaian() {
  const t = useTranslation();
  const formatDate = useLocalizedDateShort();
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
      let url = `${BASE_URL}report/adjustments`;
      if (selectedProduct) {
        url += `?id_produk=${selectedProduct}`;
      }
      const response = await fetch(url);
      const result = await response.json();
      // Only keep data where stok_gudang != stok_sistem (tidak sesuai)
      const nonMatchingData = (result.data || []).filter(row => row.stok_gudang !== row.stok_sistem);
      setData(nonMatchingData);
    } catch (error) {
      console.error("Error fetching adjustment data:", error);
      setData([]);
    }
    setLoading(false);
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
    totalKurang: filteredData.filter(r => (r.stok_gudang - r.stok_sistem) < 0).length,
    totalLebih: filteredData.filter(r => (r.stok_gudang - r.stok_sistem) > 0).length,
    totalSelisihKurang: filteredData.filter(r => (r.stok_gudang - r.stok_sistem) < 0).reduce((sum, r) => sum + Math.abs(r.stok_gudang - r.stok_sistem), 0),
    totalSelisihLebih: filteredData.filter(r => (r.stok_gudang - r.stok_sistem) > 0).reduce((sum, r) => sum + (r.stok_gudang - r.stok_sistem), 0)
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const downloadCSV = () => {
    const headers = ["No", "Tanggal", "Kode Produk", "Nama Produk", "Ukuran", "Kemasan", "Stok Sistem", "Stok Gudang", "Selisih", "Kondisi", "Catatan"];
    const csvData = filteredData.map((row, i) => [
      i + 1,
      formatDate(row.tanggal),
      row.id_produk,
      row.nama_produk || "-",
      `${row.ukuran_produk || ""}${row.nama_ukuran_satuan || ""}`,
      row.nama_kemasan || "-",
      row.stok_sistem,
      row.stok_gudang,
      row.stok_gudang - row.stok_sistem,
      row.nama_kondisi || "-",
      row.catatan || "-"
    ]);

    // Add recap
    csvData.push([]);
    csvData.push(["REKAPITULASI"]);
    csvData.push(["Total Data Tidak Sesuai", recap.totalData]);
    csvData.push(["Total Stok Kurang", recap.totalKurang, "item", "Selisih:", recap.totalSelisihKurang, "unit"]);
    csvData.push(["Total Stok Lebih", recap.totalLebih, "item", "Selisih:", recap.totalSelisihLebih, "unit"]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_Penyesuaian_Stok_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const downloadPDF = () => {
    const columns = ["No", "Tanggal", "Kode", "Nama Produk", "Ukuran", "Kemasan", "Stok Sistem", "Stok Gudang", "Selisih", "Kondisi", "Catatan"];
    const tableData = filteredData.map((row, i) => [
      i + 1,
      formatDate(row.tanggal),
      row.id_produk,
      row.nama_produk || "-",
      `${row.ukuran_produk || ""}${row.nama_ukuran_satuan || ""}`,
      row.nama_kemasan || "-",
      row.stok_sistem,
      row.stok_gudang,
      row.stok_gudang - row.stok_sistem,
      row.nama_kondisi || "-",
      row.catatan || "-"
    ]);

    const dateRangeStr = (startDate || endDate) 
      ? `${formatDate(startDate) || "Awal"} s/d ${formatDate(endDate) || "Akhir"}`
      : "Semua Waktu";

    const recapData = [
      { label: "Total Data", value: recap.totalData },
      { label: "Stok Kurang", value: `${recap.totalKurang} item` },
      { label: "Stok Lebih", value: `${recap.totalLebih} item` },
      { label: "Total Selisih Kurang", value: `${recap.totalSelisihKurang} unit` },
      { label: "Total Selisih Lebih", value: `${recap.totalSelisihLebih} unit` }
    ];

    generatePDFReport({
      title: "Laporan Penyesuaian Stok",
      dateRange: dateRangeStr,
      columns,
      data: tableData,
      fileName: `Laporan_Penyesuaian_${new Date().toISOString().split('T')[0]}.pdf`,
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
          <h3>{t('reportAdjustmentTitle')}</h3>
          <div className="laporan-actions">
            <select 
              value={selectedProduct} 
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="filter-select"
            >
              <option value="">{t('allProduct')}</option>
              {products.map((p) => (
                <option key={p.id_produk} value={p.id_produk}>
                  {p.id_produk} - {p.nama_produk}
                </option>
              ))}
            </select>
            <button className="btn-download" onClick={downloadCSV} style={{ marginRight: "10px" }}>
              {t('downloadCSV')}
            </button>
            <button className="btn-download" onClick={downloadPDF}>
              {t('downloadPDF')}
            </button>
          </div>
        </div>

        <div className="date-range-filter">
          <div className="date-inputs">
            <label>
              {t('dateFrom')}
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              {t('dateTo')}
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            {(startDate || endDate) && (
              <button className="btn-clear" onClick={clearDateFilter}>
                {t('reset')}
              </button>
            )}
          </div>
          {(startDate || endDate) && (
            <span className="filter-info">
              {t('showingData').replace('{filtered}', filteredData.length).replace('{total}', data.length)}
            </span>
          )}
        </div>

        {/* Recap Section */}
        <div className="recap-section">
          <div className="recap-item">
            <span className="recap-label">{t('totalData')}</span>
            <span className="recap-value">{recap.totalData}</span>
          </div>
          <div className="recap-item kurang">
            <span className="recap-label">{t('stockShort')}</span>
            <span className="recap-value">{recap.totalKurang} {t('itemSuffix')} (-{recap.totalSelisihKurang} {t('unitSuffix')})</span>
          </div>
          <div className="recap-item lebih">
            <span className="recap-label">{t('stockExcess')}</span>
            <span className="recap-value">{recap.totalLebih} {t('itemSuffix')} (+{recap.totalSelisihLebih} {t('unitSuffix')})</span>
          </div>
        </div>

        <div className="laporan-table-container">
          {loading ? (
            <p className="loading">{t('loading')}</p>
          ) : (
            <>
              <table className="laporan-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>{t('date')}</th>
                    <th>{t('productCode')}</th>
                    <th>{t('productName')}</th>
                    <th>{t('size')}</th>
                    <th>{t('packaging')}</th>
                    <th>{t('systemStock')}</th>
                    <th>{t('warehouseStock')}</th>
                    <th>{t('difference')}</th>
                    <th>{t('condition')}</th>
                    <th>{t('note')}</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="no-data">{t('noMatchingData')}</td>
                    </tr>
                  ) : (
                    paginatedData.map((row, index) => {
                      const selisih = row.stok_gudang - row.stok_sistem;
                      return (
                        <tr key={index}>
                          <td>{startIndex + index + 1}</td>
                          <td>{formatDate(row.tanggal)}</td>
                          <td>{row.id_produk}</td>
                          <td>{row.nama_produk || "-"}</td>
                          <td>{row.ukuran_produk}{row.nama_ukuran_satuan}</td>
                          <td>{row.nama_kemasan || "-"}</td>
                          <td className="center">{row.stok_sistem}</td>
                          <td className="center">{row.stok_gudang}</td>
                          <td className={`center ${selisih < 0 ? 'negative' : 'positive'}`}>
                            {selisih > 0 ? `+${selisih}` : selisih}
                          </td>
                          <td>{row.nama_kondisi || "-"}</td>
                          <td>{row.catatan || "-"}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              {totalPages > 1 && (
                <div className="pagination">
                  <span>{t('pages')} {currentPage} {t('of')} {totalPages} ({filteredData.length} data)</span>
                  <div className="pagination-buttons">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                      {t('previous')}
                    </button>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                      {t('next')}
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

export default LaporanPenyesuaian;
