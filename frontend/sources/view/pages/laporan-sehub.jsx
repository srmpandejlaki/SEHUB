import React, { useState, useEffect } from "react";
import { fetchAllReportData, fetchReportProducts } from "../../utilities/api/report";
import jsPDF from "jspdf";
import "jspdf-autotable";

function LaporanSehub({ user }) {
  const [reportData, setReportData] = useState({
    inventory: [],
    distribution: [],
    returns: [],
    adjustments: []
  });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("inventory");

  useEffect(() => {
    loadProducts();
    loadReportData();
  }, []);

  useEffect(() => {
    loadReportData();
  }, [selectedProduct]);

  const loadProducts = async () => {
    const data = await fetchReportProducts();
    setProducts(data);
  };

  const loadReportData = async () => {
    setLoading(true);
    const data = await fetchAllReportData(selectedProduct || null);
    if (data) {
      setReportData(data);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const tabs = [
    { key: "inventory", label: "Barang Masuk", data: reportData.inventory },
    { key: "distribution", label: "Distribusi", data: reportData.distribution },
    { key: "returns", label: "Return Barang", data: reportData.returns },
    { key: "adjustments", label: "Penyesuaian Stok", data: reportData.adjustments }
  ];

  const currentData = tabs.find(t => t.key === activeTab)?.data || [];

  // Download single table CSV
  const downloadCSV = (dataType) => {
    const dataToExport = dataType === "all" 
      ? tabs 
      : [tabs.find(t => t.key === dataType)];
    
    let csvContent = "\ufeff"; // BOM for UTF-8

    dataToExport.forEach(tab => {
      csvContent += `\n=== ${tab.label} ===\n`;
      
      if (tab.key === "inventory") {
        csvContent += "No,Tanggal,Kode Produk,Nama Produk,Ukuran,Kemasan,Jumlah,Kadaluwarsa,Catatan\n";
        tab.data.forEach((row, i) => {
          csvContent += `${i+1},"${formatDate(row.tanggal)}","${row.id_produk}","${row.nama_produk || '-'}","${row.ukuran_produk || ''}${row.nama_ukuran_satuan || ''}","${row.nama_kemasan || '-'}",${row.jumlah},"${formatDate(row.tanggal_expired)}","${row.catatan || '-'}"\n`;
        });
      } else if (tab.key === "distribution") {
        csvContent += "No,Tanggal,Kode Produk,Nama Produk,Ukuran,Kemasan,Jumlah,Pemesan,Catatan\n";
        tab.data.forEach((row, i) => {
          csvContent += `${i+1},"${formatDate(row.tanggal)}","${row.id_produk}","${row.nama_produk || '-'}","${row.ukuran_produk || ''}${row.nama_ukuran_satuan || ''}","${row.nama_kemasan || '-'}",${row.jumlah},"${row.nama_pemesan || '-'}","${row.catatan || '-'}"\n`;
        });
      } else if (tab.key === "returns") {
        csvContent += "No,Tanggal,Kode Produk,Nama Produk,Ukuran,Kemasan,Jumlah,Catatan\n";
        tab.data.forEach((row, i) => {
          csvContent += `${i+1},"${formatDate(row.tanggal)}","${row.id_produk}","${row.nama_produk || '-'}","${row.ukuran_produk || ''}${row.nama_ukuran_satuan || ''}","${row.nama_kemasan || '-'}",${row.jumlah},"${row.catatan || '-'}"\n`;
        });
      } else if (tab.key === "adjustments") {
        csvContent += "No,Tanggal,Kode Produk,Nama Produk,Ukuran,Kemasan,Stok Sistem,Stok Gudang,Selisih,Kondisi,Catatan\n";
        tab.data.forEach((row, i) => {
          csvContent += `${i+1},"${formatDate(row.tanggal)}","${row.id_produk}","${row.nama_produk || '-'}","${row.ukuran_produk || ''}${row.nama_ukuran_satuan || ''}","${row.nama_kemasan || '-'}",${row.stok_sistem},${row.stok_gudang},${row.selisih},"${row.nama_kondisi || '-'}","${row.catatan || '-'}"\n`;
        });
      }
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_SEHUB_${dataType === "all" ? "Semua" : tabs.find(t => t.key === dataType)?.label}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Download PDF
  const downloadPDF = (dataType) => {
    const doc = new jsPDF("landscape");
    const dataToExport = dataType === "all" 
      ? tabs 
      : [tabs.find(t => t.key === dataType)].filter(Boolean);
    
    if (dataToExport.length === 0) {
      alert("Tidak ada data untuk diunduh");
      return;
    }

    doc.setFontSize(16);
    doc.text("Laporan SEHUB+", 14, 15);
    doc.setFontSize(10);
    doc.text(`Tanggal: ${new Date().toLocaleDateString("id-ID")}`, 14, 22);
    if (selectedProduct) {
      const product = products.find(p => p.id_produk === selectedProduct);
      doc.text(`Filter: ${product?.nama_produk || selectedProduct}`, 14, 28);
    } else {
      doc.text("Filter: Semua Data", 14, 28);
    }

    let startY = 35;

    dataToExport.forEach((tab, tabIndex) => {
      if (!tab || !tab.data) return;
      
      if (tabIndex > 0) {
        doc.addPage();
        startY = 15;
      }

      doc.setFontSize(12);
      doc.text(tab.label || "Data", 14, startY);
      startY += 5;

      let headers = [], body = [];

      if (tab.key === "inventory") {
        headers = [["No", "Tanggal", "Kode", "Nama", "Ukuran", "Kemasan", "Jumlah", "Kadaluwarsa", "Catatan"]];
        body = (tab.data || []).map((row, i) => [
          i+1, formatDate(row.tanggal), row.id_produk, row.nama_produk || "-",
          `${row.ukuran_produk || ""}${row.nama_ukuran_satuan || ""}`, row.nama_kemasan || "-",
          row.jumlah, formatDate(row.tanggal_expired), row.catatan || "-"
        ]);
      } else if (tab.key === "distribution") {
        headers = [["No", "Tanggal", "Kode", "Nama", "Ukuran", "Kemasan", "Jumlah", "Pemesan", "Catatan"]];
        body = (tab.data || []).map((row, i) => [
          i+1, formatDate(row.tanggal), row.id_produk, row.nama_produk || "-",
          `${row.ukuran_produk || ""}${row.nama_ukuran_satuan || ""}`, row.nama_kemasan || "-",
          row.jumlah, row.nama_pemesan || "-", row.catatan || "-"
        ]);
      } else if (tab.key === "returns") {
        headers = [["No", "Tanggal", "Kode", "Nama", "Ukuran", "Kemasan", "Jumlah", "Catatan"]];
        body = (tab.data || []).map((row, i) => [
          i+1, formatDate(row.tanggal), row.id_produk, row.nama_produk || "-",
          `${row.ukuran_produk || ""}${row.nama_ukuran_satuan || ""}`, row.nama_kemasan || "-",
          row.jumlah, row.catatan || "-"
        ]);
      } else if (tab.key === "adjustments") {
        headers = [["No", "Tanggal", "Kode", "Nama", "Ukuran", "Stok Sistem", "Stok Gudang", "Selisih", "Kondisi"]];
        body = (tab.data || []).map((row, i) => [
          i+1, formatDate(row.tanggal), row.id_produk, row.nama_produk || "-",
          `${row.ukuran_produk || ""}${row.nama_ukuran_satuan || ""}`,
          row.stok_sistem, row.stok_gudang, row.selisih, row.nama_kondisi || "-"
        ]);
      }

      if (headers.length > 0) {
        doc.autoTable({
          head: headers,
          body: body,
          startY: startY,
          styles: { fontSize: 8 },
          headStyles: { fillColor: [34, 85, 51] }
        });

        startY = doc.lastAutoTable.finalY + 10;
      }
    });

    doc.save(`Laporan_SEHUB_${dataType === "all" ? "Semua" : tabs.find(t => t.key === dataType)?.label || "Data"}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Render table based on active tab
  const renderTable = () => {
    if (currentData.length === 0) {
      return <p className="no-data">Tidak ada data</p>;
    }

    if (activeTab === "inventory") {
      return (
        <table>
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
            {currentData.map((row, index) => (
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
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === "distribution") {
      return (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Kode Produk</th>
              <th>Nama Produk</th>
              <th>Ukuran</th>
              <th>Kemasan</th>
              <th>Jumlah</th>
              <th>Pemesan</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatDate(row.tanggal)}</td>
                <td>{row.id_produk}</td>
                <td>{row.nama_produk || "-"}</td>
                <td>{row.ukuran_produk}{row.nama_ukuran_satuan}</td>
                <td>{row.nama_kemasan || "-"}</td>
                <td className="center">{row.jumlah}</td>
                <td>{row.nama_pemesan || "-"}</td>
                <td>{row.catatan || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === "returns") {
      return (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Kode Produk</th>
              <th>Nama Produk</th>
              <th>Ukuran</th>
              <th>Kemasan</th>
              <th>Jumlah</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatDate(row.tanggal)}</td>
                <td>{row.id_produk}</td>
                <td>{row.nama_produk || "-"}</td>
                <td>{row.ukuran_produk}{row.nama_ukuran_satuan}</td>
                <td>{row.nama_kemasan || "-"}</td>
                <td className="center">{row.jumlah}</td>
                <td>{row.catatan || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeTab === "adjustments") {
      return (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Kode Produk</th>
              <th>Nama Produk</th>
              <th>Ukuran</th>
              <th>Kemasan</th>
              <th>Stok Sistem</th>
              <th>Stok Gudang</th>
              <th>Selisih</th>
              <th>Kondisi</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatDate(row.tanggal)}</td>
                <td>{row.id_produk}</td>
                <td>{row.nama_produk || "-"}</td>
                <td>{row.ukuran_produk}{row.nama_ukuran_satuan}</td>
                <td>{row.nama_kemasan || "-"}</td>
                <td className="center">{row.stok_sistem}</td>
                <td className="center">{row.stok_gudang}</td>
                <td className={`center ${row.selisih < 0 ? 'negative' : row.selisih > 0 ? 'positive' : ''}`}>
                  {row.selisih > 0 ? `+${row.selisih}` : row.selisih}
                </td>
                <td>{row.nama_kondisi || "-"}</td>
                <td>{row.catatan || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="content laporan-page">
      <div className="opening">
        <h3>Laporan SEHUB+</h3>
        <p>Selamat datang, {user?.nama_pengguna || "Pengguna"}</p>
      </div>

      <div className="laporan-controls">
        <div className="filter-section">
          <label>Filter Produk:</label>
          <select 
            value={selectedProduct} 
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Semua Data</option>
            {products.map((product) => (
              <option key={product.id_produk} value={product.id_produk}>
                {product.id_produk} - {product.nama_produk} {product.ukuran_produk}{product.nama_ukuran_satuan}
              </option>
            ))}
          </select>
        </div>

        <div className="download-section">
          <div className="download-group">
            <span>Unduh Tabel Ini:</span>
            <button className="btn-download csv" onClick={() => downloadCSV(activeTab)}>
              📄 CSV
            </button>
            <button className="btn-download pdf" onClick={() => downloadPDF(activeTab)}>
              📕 PDF
            </button>
          </div>
          <div className="download-group">
            <span>Unduh Semua:</span>
            <button className="btn-download csv-all" onClick={() => downloadCSV("all")}>
              📄 CSV
            </button>
            <button className="btn-download pdf-all" onClick={() => downloadPDF("all")}>
              📕 PDF
            </button>
          </div>
        </div>
      </div>

      <div className="laporan-tabs">
        {tabs.map(tab => (
          <button 
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span className="tab-count">{tab.data.length}</span>
          </button>
        ))}
      </div>

      <div className="laporan-table">
        {loading ? (
          <p className="loading">Memuat data...</p>
        ) : (
          renderTable()
        )}
      </div>
    </div>
  );
}

export default LaporanSehub;
