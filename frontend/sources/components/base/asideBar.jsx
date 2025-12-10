import React from "react";
import { NavLink } from 'react-router-dom';
import logoSehub from "../../assets/public/sehub.png";
import IconMenu from "../../assets/icon/Vector-5.svg?react";
import IconHome from "../../assets/icon/Vector-4.svg?react";
import IconProduct from "../../assets/icon/Vector-7.svg?react";
import IconSetting from "../../assets/icon/Vector-6.svg?react";

function AsideBar() {
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
            <div>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                <IconHome className="icon greenIcon" /> Beranda
              </NavLink>
            </div>
            <div>
              <NavLink to="/product" className={({ isActive }) => (isActive ? "active" : "")}>
                <IconProduct className="icon greenIcon" /> Produk
              </NavLink>
            </div>
            <div>
              <NavLink to="/setting" className={({ isActive }) => (isActive ? "active" : "")}>
                <IconSetting className="icon greenIcon" /> Pengaturan
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="companies-name">
          <p>Powered by : PT. Rumah Seho Nusantara</p>
      </div>
    </div>
  );
}

export default AsideBar;