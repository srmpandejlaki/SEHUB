import React from "react";
import { NavLink } from 'react-router-dom';
import IconListProduct from "../../assets/icon/ep_list.svg?react";
import IconInventoryProduct from "../../assets/icon/material-symbols_inventory.svg?react";
import IconDistribution from "../../assets/icon/lsicon_distribution-filled.svg?react";

function NavProduct() {
  return (
    <div className="nav-product">
      <NavLink to="/product" end className={({ isActive }) => (isActive ? "active" : "")} >
        <IconListProduct className="icon" />Produk
      </NavLink>
      <NavLink to="/product/inventory" className={({ isActive }) => (isActive ? "active" : "")} >
        <IconInventoryProduct className="icon" />Inventori Produk
      </NavLink>
      <NavLink to="/product/distribution" className={({ isActive }) => (isActive ? "active" : "")} >
        <IconDistribution className="icon" />Distribusi Produk
      </NavLink>
      <NavLink to="/product/return" className={({ isActive }) => (isActive ? "active" : "")} >
        <IconDistribution className="icon" />Return Barang
      </NavLink>
    </div>
  );
}

export default NavProduct;