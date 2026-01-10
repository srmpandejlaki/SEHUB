import React, { useState, useEffect } from "react";
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import TableInventory from "../../../components/product-page/inventory/table-inventory";
import FormDataInventory from "../../../components/product-page/inventory/form-data-inventory";
import IconLaporan from "../../../assets/icon/lsicon_report-outline.svg?react";
import { fetchAllInventoryData } from "../../../utilities/api/inventory";
import { NavLink } from "react-router-dom";

function InventoryHistoryPage({ isAdmin = true }) {
  const [existingData, setExistingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Edit state
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
    loadDataInventory();
  }, []);
  
  const loadDataInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllInventoryData();
      
      if (!response || !Array.isArray(response)) {
        console.error("Data inventori tidak valid:", response);
        setExistingData([]);
        // Don't set error if it's just empty, but if response is truly invalid
        if (response === null) setError("Gagal mengambil data dari server.");
      } else {
        setExistingData(response);
      }
    } catch (error) {
      console.error("Gagal memuat data:", error);
      setError("Terjadi kesalahan saat memuat data.");
      setExistingData([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit click
  const handleEdit = (data) => {
    if (!isAdmin) return;
    setEditingData(data);
    setShowFormEdit(true);
  };

  const handleCloseEditForm = () => {
    setShowFormEdit(false);
    setEditingData(null);
  };

  const handleEditSuccess = () => {
    setShowFormEdit(false);
    setEditingData(null);
    loadDataInventory();
  };

  // Filter data based on search query
  const filteredData = existingData.filter(item => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    
    // Search in items array
    const hasMatchingItem = item.items?.some(product => 
      product.nama_produk?.toLowerCase().includes(searchLower) ||
      product.id_produk?.toLowerCase().includes(searchLower)
    );
    
    return hasMatchingItem;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return(
    <div className="content distribution-history">
      <NavProduct />
      <div className="main-distribution">
        <div className="header-distribution-history">
          <p>Riwayat Barang Masuk</p>
          <div className="distribution-display">
            <SearchFilter value={searchQuery} onChange={setSearchQuery} placeholder="Cari produk..." />
            {!isAdmin && (
              <div className="button">
                <NavLink to="/laporan/inventori">
                  <button className="base-btn black"> <IconLaporan className="icon" />Laporan</button>
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="loading-container" style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
            <p>Memuat data inventori...</p>
          </div>
        ) : error ? (
          <div className="error-container" style={{ padding: "2rem", textAlign: "center", color: "#dc2626" }}>
            <p>{error}</p>
            <button 
              onClick={loadDataInventory}
              style={{ 
                marginTop: "1rem", 
                padding: "0.5rem 1rem", 
                backgroundColor: "#dc2626", 
                color: "white", 
                border: "none", 
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <TableInventory 
            existingData={paginatedData} 
            onEdit={isAdmin ? handleEdit : null}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showActions={isAdmin}
          />
        )}

        {/* Edit Form - Same as Add Form but with pre-filled data */}
        {showFormEdit && editingData && (
          <div className="form-overlay">
            <FormDataInventory 
              onCloseForm={handleCloseEditForm} 
              onSuccess={handleEditSuccess}
              editData={editingData}
              isEdit={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryHistoryPage;