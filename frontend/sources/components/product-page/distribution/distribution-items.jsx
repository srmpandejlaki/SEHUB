import React, { useState, useEffect } from "react";
import TableDistribution from "./table-distribution";
import FormEditDistribution from "./form-edit-distribution";
import { fetchAllDistributions, updateDistributionStatus } from "../../../utilities/api/distribution";
import { BASE_URL } from "../../../utilities";

function DistributionProduct({ searchQuery = "", reloadTrigger = 0, showActions = true }) {
  const [distributions, setDistributions] = useState([]);
  const [statusPengiriman, setStatusPengiriman] = useState([]);
  const [metodePengiriman, setMetodePengiriman] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit form state
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadData();
  }, [reloadTrigger]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Fetch distributions
      const distData = await fetchAllDistributions();
      setDistributions(distData);

      // Fetch master data for status pengiriman
      const statusRes = await fetch(`${BASE_URL}master/status-pengiriman`);
      const statusData = await statusRes.json();
      if (statusData?.data) {
        setStatusPengiriman(statusData.data);
      }

      // Fetch master data for metode pengiriman
      const metodeRes = await fetch(`${BASE_URL}master/metode-pengiriman`);
      const metodeData = await metodeRes.json();
      if (metodeData?.data) {
        setMetodePengiriman(metodeData.data);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
  };

  // Handle status change - reload data when status changes
  const handleStatusChange = async (id_distribusi, id_status) => {
    const result = await updateDistributionStatus(id_distribusi, id_status);
    if (result) {
      // Reload data - if status changed to "diterima" (3), it will disappear from this view
      loadData();
    }
  };

  // Handle edit click
  const handleEdit = (distribution) => {
    if (!showActions) return;
    setEditingData(distribution);
    setShowFormEdit(true);
  };

  const handleCloseFormEdit = () => {
    setShowFormEdit(false);
    setEditingData(null);
  };

  const handleEditSuccess = () => {
    loadData();
    handleCloseFormEdit();
  };

  // Filter by status: only show "diproses" (id 1) and "dalam perjalanan" (id 2)
  const filteredByStatus = distributions.filter((dist) => {
    return dist.id_status === 1 || dist.id_status === 2;
  });

  // Filter by search query
  const filteredData = filteredByStatus.filter((dist) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    // Search in nama_pemesan
    if (dist.nama_pemesan?.toLowerCase().includes(query)) return true;
    
    // Search in product items
    if (dist.items?.some(item => 
      item.nama_produk?.toLowerCase().includes(query) ||
      item.id_produk?.toLowerCase().includes(query)
    )) return true;
    
    return false;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading) {
    return <p>Memuat data...</p>;
  }

  return(
    <div className="distribution-items">
      <TableDistribution 
        data={paginatedData}
        statusPengiriman={statusPengiriman}
        onStatusChange={handleStatusChange}
        onEdit={handleEdit}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        showActions={showActions}
      />

      {/* Form Edit Distribusi */}
      {showFormEdit && editingData && (
        <div className="form-overlay">
          <FormEditDistribution 
            onCloseForm={handleCloseFormEdit} 
            onSuccess={handleEditSuccess}
            metodePengiriman={metodePengiriman}
            statusPengiriman={statusPengiriman}
            editData={editingData}
          />
        </div>
      )}
    </div>
  );
}

export default DistributionProduct;