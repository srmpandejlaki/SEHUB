import React, { useState, useEffect } from "react";
import NavProduct from "../../components/base/nav-product";
import TableStockAdjustment from "../../components/product-page/stock-adjustment/table-stock-adjustment";
import FormStockAdjustment from "../../components/product-page/stock-adjustment/form-stock-adjustment";
import IconLaporan from "../../assets/icon/lsicon_report-outline.svg?react";
import { fetchAllAdjustments, deleteAdjustment } from "../../utilities/api/stock-adjustment";
import { NavLink } from "react-router-dom";

function StockAdjustmentPage({ isAdmin = true }) {
  const [adjustments, setAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllAdjustments();
      setAdjustments(data);
    } catch (error) {
      console.error("Error loading adjustments:", error);
    }
    setLoading(false);
  };

  const handleOpenForm = () => {
    if (!isAdmin) return;
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSuccess = () => {
    loadData();
    handleCloseForm();
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (window.confirm("Apakah Anda yakin ingin menghapus data penyesuaian ini?")) {
      const result = await deleteAdjustment(id);
      if (result && result.success) {
        alert("Data penyesuaian berhasil dihapus");
        loadData();
      } else {
        alert("Gagal menghapus data penyesuaian");
      }
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(adjustments.length / itemsPerPage) || 1;
  const paginatedData = adjustments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="content stock-adjustment-page">
      <NavProduct />
      <div className="main-stock-adjustment">
        <div className="header-stock-adjustment">
          <p>Riwayat Penyesuaian Stok Gudang</p>
          {isAdmin && (
            <div className="adjustment-controls">
              <button className="base-btn green" onClick={handleOpenForm}>
                + Mulai Penyesuaian
              </button>
            </div>
          )}
          {!isAdmin && (
            <div className="button">
              <NavLink to="/laporan/penyesuaian">
                <button className="base-btn black"> <IconLaporan className="icon" />Laporan</button>
              </NavLink>
            </div>
          )}
        </div>

        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <TableStockAdjustment 
            data={paginatedData}
            onDelete={isAdmin ? handleDelete : null}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showActions={isAdmin}
          />
        )}

        {showForm && (
          <div className="form-overlay">
            <FormStockAdjustment 
              onCloseForm={handleCloseForm}
              onSuccess={handleFormSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default StockAdjustmentPage;
