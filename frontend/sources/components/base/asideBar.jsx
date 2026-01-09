import React from "react";
import { NavLink } from 'react-router-dom';
import logoSehub from "../../assets/public/sehub.png";
import IconMenu from "../../assets/icon/Vector-5.svg?react";
import IconHome from "../../assets/icon/Vector-4.svg?react";
import IconProduct from "../../assets/icon/Vector-7.svg?react";
import IconSetting from "../../assets/icon/Vector-6.svg?react";
import IconReport from "../../assets/icon/lsicon_report-filled.svg?react";

function AsideBar({ user, onLogout }) {
  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      if (onLogout) {
        onLogout();
      }
    }
  };

  return (
    <div className="aside">
      <div className="navigation">
        <div className="logo-sehub">
          <img src={logoSehub} alt="Logo SEHUB+" />
        </div>
        <div className="nav">
          <div className="menu">
              <IconMenu className="icon greenIcon" /> 
              <p>MENU</p>
          </div>
          <div className="links">
            {/* Menu untuk Admin */}
            {user?.is_admin && (
              <>
                <div>
                  <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                    <IconHome className="icon greenIcon" /> Beranda
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/product/inventory" className={({ isActive }) => (isActive ? "active" : "")}>
                    <IconProduct className="icon greenIcon" /> Produk
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/laporan" className={({ isActive }) => (isActive ? "active" : "")}>
                    <IconReport className="icon greenIcon" /> Laporan
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/setting" className={({ isActive }) => (isActive ? "active" : "")}>
                    <IconSetting className="icon greenIcon" /> Pengaturan
                  </NavLink>
                </div>
              </>
            )}
            {/* Menu untuk Non-Admin */}
            {!user?.is_admin && (
              <>
                <div>
                  <NavLink to="/dashboard-owner" className={({ isActive }) => (isActive ? "active" : "")}>
                    <IconHome className="icon greenIcon" /> Beranda
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/product/inventory" className={({ isActive }) => (isActive ? "active" : "")}>
                    <IconProduct className="icon greenIcon" /> Produk
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
          <button className="logout-btn" onClick={handleLogout}>
            Keluar
          </button>
        </div>
        {/* <p>Powered by : PT. Rumah Seho Nusantara</p> */}
      </div>
    </div>
  );
}

export default AsideBar;