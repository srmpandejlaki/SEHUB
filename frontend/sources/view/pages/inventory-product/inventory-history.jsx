import React, { useState, useEffect } from "react";
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import TableInventory from "../../../components/product-page/inventory/table-inventory";
import FormDataInventory from "../../../components/product-page/inventory/form-data-inventory";
import { fetchAllInventoryData } from "../../../utilities/api/inventory";

function InventoryHistoryPage({ isAdmin = true }) {
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
          <p>Riwayat Data Inventori Produk</p>
          <div className="distribution-display">
            <SearchFilter value={searchQuery} onChange={setSearchQuery} placeholder="Cari produk..." />
          </div>
        </div>
        <TableInventory 
          existingData={paginatedData} 
          onEdit={isAdmin ? handleEdit : null}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showActions={isAdmin}
        />

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