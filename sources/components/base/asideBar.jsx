import React from "react";
import { Link } from 'react-router-dom';
import logoSehub from "../../assets/public/sehub.png";
import iconMenu from "../../assets/icon/menu-g.png";
import iconHome from "../../assets/icon/home-g.png";
import iconAdd from "../../assets/icon/add-g.png";
import iconSetting from "../../assets/icon/gear-g.png";

function AsideBar() {
  return (
    <div className="aside">
      <div className="navigation">
        <div className="logo-sehub">
          <img src={logoSehub} alt="Logo SEHUB+" />
        </div>
        <div className="nav">
          <div className="menu">
              <img src={iconMenu} alt="" /> 
              <p>MENU</p>
          </div>
          <ul>
            <li>
              <img src={iconHome} alt="" />
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <img src={iconAdd} alt="" />
              <Link to="/product">Produk</Link>
            </li>
            <li>
              <img src={iconSetting} alt="" />
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