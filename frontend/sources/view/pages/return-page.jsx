import React, { useState, useEffect } from "react";
import SearchFilter from "../../components/base/search-filter";
import NavProduct from "../../components/base/nav-product";
import TableReturn from "../../components/product-page/return/table-return";
import IconLaporan from "../../assets/icon/lsicon_report-outline.svg?react";
import { fetchAllReturns, deleteReturn } from "../../utilities/api/return";
import { NavLink } from "react-router-dom";
import { useTranslation } from "../../contexts/localContext";
import { useToast } from "../../contexts/toastContext";

function ReturnPage({ isAdmin = true }) {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [damagedPage, setDamagedPage] = useState(1);
  const itemsPerPage = 10;
  const t = useTranslation();
  const { showToast } = useToast();

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
    if (window.confirm(t('deleteConfirmReturn'))) {
      const result = await deleteReturn(id_return);
      if (result) {
        showToast(t('deleteReturnSuccess'), 'success');
        loadData();
      } else {
        showToast(t('deleteReturnFailed'), 'error');
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
            <p className="title">{t('returnListTitle')}</p>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>
              {t('returnListDesc')}
            </p>
          </div>
          <div className="distribution-display return-display">
            <SearchFilter />
            {!isAdmin && (
              <div className="button">
                <NavLink to="/laporan/return">
                  <button className="base-btn black"> <IconLaporan className="icon" />{t('reportBtn')}</button>
                </NavLink>
              </div>
            )}
          </div>
          {loading ? (
            <p>{t('loading')}</p>
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
            <p className="title" style={{ color: '#d32f2f' }}>{t('damagedListTitle')}</p>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>
              {t('damagedListDesc')}
            </p>
          </div>
          <div className="distribution-display return-display">
            <SearchFilter />
          </div>
          {loading ? (
            <p>{t('loading')}</p>
          ) : damagedReturns.length === 0 ? (
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '8px',
              textAlign: 'center',
              color: '#666'
            }}>
              {t('noDamagedData')}
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