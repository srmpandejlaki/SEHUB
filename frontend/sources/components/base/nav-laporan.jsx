import React from "react";
import { NavLink } from "react-router-dom";
import IconInventoryProduct from "../../assets/icon/material-symbols_inventory.svg?react";
import IconDistribution from "../../assets/icon/lsicon_distribution-filled.svg?react";
import { useTranslation } from "../../contexts/localContext";

function NavLaporan() {
  const t = useTranslation();

  const menus = [
    {
      label: t('reportInventory'),
      path: "/laporan/inventori",
      icon: <IconInventoryProduct className="icon" />,
    },
    {
      label: t('reportDistribution'),
      path: "/laporan/distribusi",
      icon: <IconDistribution className="icon" />,
    },
    {
      label: t('reportReturn'),
      path: "/laporan/return",
      icon: <IconDistribution className="icon" />,
    },
    {
      label: t('reportStockAdjustment'),
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

