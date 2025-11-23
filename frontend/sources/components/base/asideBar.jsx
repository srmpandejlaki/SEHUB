import React from "react";
import { Link } from 'react-router-dom';
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
          <ul>
            <li>
              <IconHome className="icon greenIcon" /> 
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <IconProduct className="icon greenIcon" /> 
              <Link to="/product">Produk</Link>
            </li>
            <li>
              <IconSetting className="icon greenIcon" /> 
              <Link to="/setting">Pengaturan</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="companies-name">
          <p>PT. Rumah Seho Nusantara</p>
      </div>
    </div>
  );
}

export default AsideBar;