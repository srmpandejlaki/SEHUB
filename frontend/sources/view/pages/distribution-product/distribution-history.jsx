import React, { useState, useEffect } from "react";
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import NavDistribution from "../../../components/base/nav-distribution";
import TableDistribution from "../../../components/product-page/distribution/table-distribution";
import FormDataDistribution from "../../../components/product-page/distribution/form-data-distribution";
import IconBar from "../../../assets/icon/material-symbols_menu-rounded.svg?react";
import { fetchAllDistributions, updateDistributionStatus } from "../../../utilities/api/distribution";
import { checkInventoryExists } from "../../../utilities/api/inventory";
import { BASE_URL } from "../../../utilities";

function DistributionHistoryPage() {
  const [showNavDis, setNavDis] = useState(false);
  const [closeHumberger, setHumberger] = useState(true);
  const [showFormDis, setFormDis] = useState(false);
  
  // Data state
  const [distributions, setDistributions] = useState([]);
  const [metodePengiriman, setMetodePengiriman] = useState([]);
  const [statusPengiriman, setStatusPengiriman] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Validation state
  const [hasInventoryData, setHasInventoryData] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Check if inventory data exists
      const inventoryExists = await checkInventoryExists();
      setHasInventoryData(inventoryExists);

      // Fetch distributions
      const distData = await fetchAllDistributions();
      setDistributions(distData);

      // Fetch master data for metode pengiriman
      const metodeRes = await fetch(`${BASE_URL}master/metode-pengiriman`);
      const metodeData = await metodeRes.json();
      if (metodeData?.data) {
        setMetodePengiriman(metodeData.data);
      }

      // Fetch master data for status pengiriman
      const statusRes = await fetch(`${BASE_URL}master/status-pengiriman`);
      const statusData = await statusRes.json();
      if (statusData?.data) {
        setStatusPengiriman(statusData.data);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
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
    // Validasi: tidak bisa buat distribusi jika belum ada data barang masuk
    if (!hasInventoryData) {
      alert("Tidak dapat membuat data distribusi. Silakan tambahkan data barang masuk terlebih dahulu di menu Inventori.");
      return;
    }
    setFormDis(true);
  };

  const handleCloseFormDis = () => {
    setFormDis(false);
  };

  const handleFormSuccess = () => {
    loadData(); // Reload data after successful form submission
  };

  const handleStatusChange = async (id_distribusi, id_status) => {
    const result = await updateDistributionStatus(id_distribusi, id_status);
    if (result) {
      // Update local state
      setDistributions(prev => 
        prev.map(dist => 
          dist.id_distribusi === id_distribusi 
            ? { ...dist, id_status, nama_status: statusPengiriman.find(s => s.id_status === id_status)?.nama_status }
            : dist
        )
      );
    }
  };

  const handleEdit = (distribution) => {
    // TODO: Implement edit functionality
    console.log("Edit distribution:", distribution);
  };

  // Pagination logic
  const totalPages = Math.ceil(distributions.length / itemsPerPage) || 1;
  const paginatedData = distributions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return(
    <div className="content distribution-history">
      <NavProduct />
      <div className="main-distribution">
        <div className="header-distribution-history">
          <p>Riwayat Data Distribusi Produk</p>
          <div className="distribution-display">
            <SearchFilter />
            {showNavDis && (
              <NavDistribution 
                onClose={handleCloseNavDis} 
                openForm={handleOpenFormDis} 
                to="/product/distribution"
                disableAddButton={!hasInventoryData}
              />
            )}
            {closeHumberger && (
              <IconBar onClick={handleOpenNavDis} />
            )}
          </div>
        </div>
        
        {/* Warning message if no inventory data */}
        {!loading && !hasInventoryData && (
          <div className="warning-message" style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px',
            color: '#856404'
          }}>
            ⚠️ Belum ada data barang masuk. Silakan tambahkan data inventori terlebih dahulu sebelum membuat distribusi.
          </div>
        )}
        
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <TableDistribution 
            data={paginatedData}
            statusPengiriman={statusPengiriman}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        {showFormDis && (
          <div className="form-overlay">
            <FormDataDistribution 
              onCloseForm={handleCloseFormDis} 
              onSuccess={handleFormSuccess}
              metodePengiriman={metodePengiriman}
              statusPengiriman={statusPengiriman}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DistributionHistoryPage;