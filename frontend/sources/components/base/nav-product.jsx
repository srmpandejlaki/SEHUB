import React from "react";
import { NavLink } from "react-router-dom";
import IconListProduct from "../../assets/icon/ep_list.svg?react";
import IconInventoryProduct from "../../assets/icon/material-symbols_inventory.svg?react";
import IconDistribution from "../../assets/icon/lsicon_distribution-filled.svg?react";

function NavProduct({ user }) {
  const isAdmin = user?.is_admin === true;

  const menus = [
    {
      label: "Produk",
      path: "/product",
      icon: <IconListProduct className="icon" />,
      adminOnly: true,
    },
    {
      label: "Inventori Barang",
      path: "/product/inventory",
      icon: <IconInventoryProduct className="icon" />,
    },
    {
      label: "Distribusi Barang",
      path: "/product/distribution",
      icon: <IconDistribution className="icon" />,
    },
    {
      label: "Return Barang",
      path: "/product/return",
      icon: <IconDistribution className="icon" />,
    },
    {
      label: "Penyesuaian Stok Gudang",
      path: "/product/stock-adjustment",
      icon: <IconInventoryProduct className="icon" />,
    },
  ];

  return (
    <div className="nav-product">
      {menus
        .filter(menu => !menu.adminOnly || isAdmin)
        .map(menu => (
          <NavLink
            key={menu.path}
            to={menu.path}
            end={menu.path === "/product"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {menu.icon}
            {menu.label}
          </NavLink>
        ))}
    </div>
  );
}

export default NavProduct;
