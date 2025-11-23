import React, { useState } from "react";
import NavProduct from "../../../components/base/nav-product";
import SearchFilter from "../../../components/base/search-filter";
import NavDistribution from "../../../components/base/nav-distribution";
import TableDistribution from "../../../components/product-page/table-distribution";
import FormDataDistribution from "../../../components/product-page/form-data-distribution";
import IconBar from "../../../assets/icon/material-symbols_menu-rounded.svg?react";

function DistributionHistoryPage() {
  const [showNavDis, setNavDis] = useState(false);
  const [closeHumberger, setHumberger] = useState(true);
  const [showFormDis, setFormDis] = useState(false);

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

  return(
    <div className="content distribution-history">
      <NavProduct />
      <div className="main-distribution">
        <div className="header-distribution-history">
          <p>Riwayat Data Distribusi Produk</p>
          <div className="distribution-display">
            <SearchFilter />
            {showNavDis && (
              <NavDistribution onClose={handleCloseNavDis} openForm={handleOpenFormDis} to="/product/distribution" />
            )}
            {closeHumberger && (
              <IconBar onClick={handleOpenNavDis} />
            )}
          </div>
        </div>
        <TableDistribution />
        {showFormDis && (
          <div className="form-overlay">
            <FormDataDistribution onCloseForm={handleCloseFormDis} />
          </div>
        )}
      </div>
    </div>
  );
}

export default DistributionHistoryPage;