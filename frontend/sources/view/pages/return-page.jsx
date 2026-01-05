import React, { useState, useEffect } from "react";
import SearchFilter from "../../components/base/search-filter";
import NavProduct from "../../components/base/nav-product";
import TableReturn from "../../components/product-page/return/table-return";
import { fetchAllReturns, deleteReturn } from "../../utilities/api/return";

function ReturnPage() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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

  // Pagination logic
  const totalPages = Math.ceil(returns.length / itemsPerPage) || 1;
  const paginatedData = returns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="content product-page">
      <NavProduct />
      <div className="product-display">
        <div className="header-product-page">
          <p className="title">Daftar Return Barang</p>
        </div>
        <SearchFilter />
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <TableReturn 
            data={paginatedData}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default ReturnPage;