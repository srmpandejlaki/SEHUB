import React, { useState, useEffect } from "react";
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import NavDistribution from "../../../components/base/nav-distribution";
import TableInventory from "../../../components/product-page/inventory/table-inventory";
import FormDataInventory from "../../../components/product-page/inventory/form-data-inventory";
import IconBar from "../../../assets/icon/material-symbols_menu-rounded.svg?react";
import { fetchAllInventoryData } from "../../../utilities/api/inventory";

function InventoryHistoryPage() {
  const [showNavDis, setNavDis] = useState(false);
  const [closeHumberger, setHumberger] = useState(true);
  const [showFormDis, setFormDis] = useState(false);
  const [existingData, setExistingData] = useState([]);
  
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
    try {
      const response = await fetchAllInventoryData();
      console.log("API Response:", response);

      if (!response || !Array.isArray(response)) {
        console.error("Data inventori tidak valid:", response);
        setExistingData([]);
        return;
      }

      setExistingData(response);
    } catch (error) {
      console.error("Gagal memuat data:", error);
      setExistingData([]);
    }
  };

  const handleOpenNavDis = () => {
    setNavDis(true);
    setHumberger(false);
  };

  const handleCloseNavDis = () => {
    setNavDis(false);
    setHumberger(true);
  };

  const handleOpenFormDis = () => {
    setFormDis(true);
  };

  const handleCloseFormDis = () => {
    setFormDis(false);
  };

  const handleFormSuccess = () => {
    loadDataInventory(); // Reload data after success
  };

  // Handle edit click
  const handleEdit = (data) => {
    setEditingData(data);
    setShowFormEdit(true);
  };

  const handleCloseFormEdit = () => {
    setShowFormEdit(false);
    setEditingData(null);
  };

  // Filter data by search query
  const filteredData = existingData.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    if (item.items?.some(i => 
      i.nama_produk?.toLowerCase().includes(query) ||
      i.id_produk?.toLowerCase().includes(query)
    )) return true;
    
    return false;
  });

  // Sort data by date (newest first)
  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.tanggal_masuk);
    const dateB = new Date(b.tanggal_masuk);
    return dateB - dateA; // Descending order (newest first)
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return(
    <div className="content distribution-history">
      <NavProduct />
      <div className="main-distribution">
        <div className="header-distribution-history">
          <p>Riwayat Data Inventori Produk</p>
          <div className="distribution-display">
            <SearchFilter value={searchQuery} onChange={setSearchQuery} placeholder="Cari produk..." />
            {showNavDis && (
              <NavDistribution onClose={handleCloseNavDis} openForm={handleOpenFormDis} to="/product/inventory" />
            )}
            {closeHumberger && (
              <IconBar onClick={handleOpenNavDis} />
            )}
          </div>
        </div>
        <TableInventory 
          existingData={paginatedData} 
          onEdit={handleEdit}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        {showFormDis && (
          <div className="form-overlay">
            <FormDataInventory 
              onCloseForm={handleCloseFormDis} 
              onSuccess={handleFormSuccess}
            />
          </div>
        )}

        {/* Edit Form - Same as Add Form but with pre-filled data */}
        {showFormEdit && editingData && (
          <div className="form-overlay">
            <FormDataInventory 
              onCloseForm={handleCloseFormEdit} 
              onSuccess={handleFormSuccess}
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