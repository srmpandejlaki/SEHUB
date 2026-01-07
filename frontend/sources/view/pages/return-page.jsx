import React, { useState, useEffect } from "react";
import SearchFilter from "../../components/base/search-filter";
import NavProduct from "../../components/base/nav-product";
import TableReturn from "../../components/product-page/return/table-return";
import IconLaporan from "../../assets/icon/lsicon_report-outline.svg?react";
import { fetchAllReturns, deleteReturn } from "../../utilities/api/return";

function ReturnPage({ isAdmin = true }) {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [damagedPage, setDamagedPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllReturns();
      setReturns(data);
    } catch (error) {
      console.error("Error loading returns:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id_return) => {
    if (!isAdmin) return;
    if (window.confirm("Apakah Anda yakin ingin menghapus data return ini?")) {
      const result = await deleteReturn(id_return);
      if (result) {
        alert("Data return berhasil dihapus");
        loadData();
      } else {
        alert("Gagal menghapus data return");
      }
    }
  };

  // Separate damaged and non-damaged returns
  const normalReturns = returns.filter(
    (ret) => !ret.catatan_return || ret.catatan_return.toLowerCase().trim() !== "barang rusak"
  );
  const damagedReturns = returns.filter(
    (ret) => ret.catatan_return && ret.catatan_return.toLowerCase().trim() === "barang rusak"
  );

  // Pagination for normal returns
  const normalTotalPages = Math.ceil(normalReturns.length / itemsPerPage) || 1;
  const normalPaginatedData = normalReturns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination for damaged returns
  const damagedTotalPages = Math.ceil(damagedReturns.length / itemsPerPage) || 1;
  const damagedPaginatedData = damagedReturns.slice(
    (damagedPage - 1) * itemsPerPage,
    damagedPage * itemsPerPage
  );

  return (
    <div className="content setting">
      <NavProduct />
      <div className="return-content-wrapper">
        {/* Normal Returns Section */}
        <div className="return-section">
          <div className="header-product-page">
            <p className="title">Daftar Return Barang</p>
          </div>
          <div className="distribution-display return-display">
            <SearchFilter />
            <div className="button">
              <button className="base-btn black"> <IconLaporan className="icon" />Laporan</button>
            </div>
          </div>
          {loading ? (
            <p>Memuat data...</p>
          ) : (
            <TableReturn 
              data={normalPaginatedData}
              onDelete={handleDelete}
              currentPage={currentPage}
              totalPages={normalTotalPages}
              onPageChange={setCurrentPage}
              showActions={isAdmin}
            />
          )}
        </div>

        {/* Damaged Goods Section */}
        <div className="return-section damaged-section">
          <div className="header-product-page">
            <p className="title" style={{ color: '#d32f2f' }}>🚫 Daftar Barang Rusak</p>
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
              Barang yang dikembalikan karena rusak (tidak ditambahkan ke stok)
            </p>
          </div>
          <div className="distribution-display return-display">
            <SearchFilter />
            <div className="button">
              <button className="base-btn black"> <IconLaporan className="icon" />Laporan</button>
            </div>
          </div>
          {loading ? (
            <p>Memuat data...</p>
          ) : damagedReturns.length === 0 ? (
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '8px',
              textAlign: 'center',
              color: '#666'
            }}>
              Tidak ada data barang rusak
            </div>
          ) : (
            <TableReturn 
              data={damagedPaginatedData}
              onDelete={handleDelete}
              currentPage={damagedPage}
              totalPages={damagedTotalPages}
              onPageChange={setDamagedPage}
              showActions={isAdmin}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ReturnPage;