import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import logoSehub from "../../assets/public/sehub.png";
import IconMenu from "../../assets/icon/Vector-5.svg?react";
import IconHome from "../../assets/icon/Vector-4.svg?react";
import IconProduct from "../../assets/icon/Vector-7.svg?react";
import IconSetting from "../../assets/icon/Vector-6.svg?react";
import IconReport from "../../assets/icon/lsicon_report-filled.svg?react";
import { useTranslation } from "../../contexts/localContext";
import LogoutModal from "./logout-modal";

function AsideBar({ user, onLogout }) {
  const t = useTranslation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    if (onLogout) {
      onLogout();
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div className="aside">
        <div className="navigation">
          <div className="logo-sehub">
            <img src={logoSehub} alt="Logo SEHUB+" />
          </div>
          <div className="nav">
            <div className="menu">
                <IconMenu className="icon whiteIcon" /> 
                <p>{t('menu')}</p>
            </div>
            <div className="links">
              {/* Menu untuk Admin */}
              {!!user?.is_admin && (
                <>
                  <div>
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                      <IconHome className="icon whiteIcon" /> {t('home')}
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to="/product/inventory" className={({ isActive }) => (isActive ? "active" : "")}>
                      <IconProduct className="icon whiteIcon" /> {t('product')}
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to="/laporan" className={({ isActive }) => (isActive ? "active" : "")}>
                      <IconReport className="icon whiteIcon" /> {t('report')}
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to="/setting" className={({ isActive }) => (isActive ? "active" : "")}>
                      <IconSetting className="icon whiteIcon" /> {t('settings')}
                    </NavLink>
                  </div>
                </>
              )}
              {/* Menu untuk Non-Admin */}
              {!user?.is_admin && user !== undefined && (
                <>
                  <div>
                    <NavLink to="/dashboard-owner" className={({ isActive }) => (isActive ? "active" : "")}>
                      <IconHome className="icon whiteIcon" /> {t('home')}
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to="/product/inventory" className={({ isActive }) => (isActive ? "active" : "")}>
                      <IconProduct className="icon whiteIcon" /> {t('product')}
                    </NavLink>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="companies-name">
          {/* Tombol Logout */}
          <div className="logout-section">
            <button className="logout-btn" onClick={handleLogoutClick}>
              {t('logout')}
            </button>
          </div>
          <p>{t('poweredBy')}</p>
        </div>
      </div>
      
      <LogoutModal
        isOpen={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        message={t('logoutConfirm')}
        confirmText={t('logout')}
        cancelText={t('cancel') || "Batal"}
      />
    </>
  );
}

export default AsideBar;
