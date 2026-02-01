import React from "react";
import { NavLink } from "react-router-dom";
import IconInventoryProduct from "../../assets/icon/material-symbols_inventory.svg?react";
import IconDistribution from "../../assets/icon/lsicon_distribution-filled.svg?react";

function NavLaporan() {
  const menus = [
    {
      label: "Laporan Inventori",
      path: "/laporan/inventori",
      icon: <IconInventoryProduct className="icon" />,
    },
    {
      label: "Laporan Distribusi",
      path: "/laporan/distribusi",
      icon: <IconDistribution className="icon" />,
    },
    {
      label: "Laporan Return",
      path: "/laporan/return",
      icon: <IconDistribution className="icon" />,
    },
    {
      label: "Laporan Penyesuaian Stok",
      path: "/laporan/penyesuaian",
      icon: <IconInventoryProduct className="icon" />,
    },
  ];

  return (
    <div className="nav-product">
      {menus.map(menu => (
        <NavLink
          key={menu.path}
          to={menu.path}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {menu.icon}
          {menu.label}
        </NavLink>
      ))}
    </div>
  );
}

export default NavLaporan;
