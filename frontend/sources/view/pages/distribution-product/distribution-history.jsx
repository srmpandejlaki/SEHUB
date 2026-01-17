import React, { useState, useEffect } from "react";
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import TableDistribution from "../../../components/product-page/distribution/table-distribution";
import FormEditDistribution from "../../../components/product-page/distribution/form-edit-distribution";
import IconLaporan from "../../../assets/icon/lsicon_report-outline.svg?react";
import { fetchAllDistributions, updateDistributionStatus } from "../../../utilities/api/distribution";
import { BASE_URL } from "../../../utilities";
import { NavLink } from "react-router-dom";
import { useTranslation } from "../../../contexts/localContext";

function DistributionHistoryPage({ isAdmin = true }) {
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const t = useTranslation();
  
  // Data state
  const [distributions, setDistributions] = useState([]);
  const [metodePengiriman, setMetodePengiriman] = useState([]);
  const [statusPengiriman, setStatusPengiriman] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
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
    if (!isAdmin) return;
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

  // Filter by status: only show "diterima" (id 3)
  const filteredByStatus = distributions.filter((dist) => {
    return dist.id_status === 3;
  });

  // Filter by search query
  const filteredData = filteredByStatus.filter((dist) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    if (dist.nama_pemesan?.toLowerCase().includes(query)) return true;
    if (dist.items?.some(item => 
      item.nama_produk?.toLowerCase().includes(query) ||
      item.id_produk?.toLowerCase().includes(query)
    )) return true;
    
    return false;
  });

  // Pagination logic (using filtered data)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return(
    <div className="content distribution-history">
      <NavProduct />
      <div className="main-distribution">
        <div className="header-distribution-history">
          <p>{t("distributionHistoryTitle")}</p>
          <div className="distribution-display">
            <SearchFilter value={searchQuery} onChange={setSearchQuery} placeholder={t("searchDistribution")} />
            {!isAdmin && (
              <div className="button">
                <NavLink to="/laporan/distribusi">
                  <button className="base-btn black"> <IconLaporan className="icon" />{t("reportBtn")}</button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
        
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <TableDistribution 
            data={paginatedData}
            statusPengiriman={statusPengiriman}
            onStatusChange={handleStatusChange}
            onEdit={isAdmin ? handleEdit : null}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            disableStatusSelect={true}
            showActions={isAdmin}
          />
        )}

        {/* Form Edit Distribusi dengan tombol Return */}
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
    </div>
  );
}

export default DistributionHistoryPage;