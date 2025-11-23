import React from "react";
import { Link } from 'react-router-dom';
import IconListProduct from "../../assets/icon/ep_list.svg?react";
import IconInventoryProduct from "../../assets/icon/material-symbols_inventory.svg?react";
import IconDistribution from "../../assets/icon/lsicon_distribution-filled.svg?react";

function NavProduct() {
  return (
    <div className="nav-product">
      <Link to="/product" >
        <IconListProduct className="icon" />Produk
      </Link>
      <Link to="/product/inventory" >
        <IconInventoryProduct className="icon" />Inventori Produk
      </Link>
      <Link to="/product/distribution" >
        <IconDistribution className="icon" />Distribusi Produk
      </Link>
    </div>
  );
}

export default NavProduct;