import React from "react";
import { NavLink } from "react-router-dom";
import IconInventoryProduct from "../../assets/icon/material-symbols_inventory.svg?react";
import IconDistribution from "../../assets/icon/lsicon_distribution-filled.svg?react";
import { useTranslation } from "../../contexts/localContext";

function NavProduct({ user }) {
  const isAdmin = user?.is_admin === true;
  const t = useTranslation();

  const menus = [
    {
      label: t('inventoryBtn'),
      path: "/product/inventory",
      icon: <IconInventoryProduct className="icon nav-btn" />,
    },
    {
      label: t('distributionBtn'),
      path: "/product/distribution",
      icon: <IconDistribution className="icon nav-btn" />,
    },
    {
      label: t('returnBtn'),
      path: "/product/return",
      icon: <IconDistribution className="icon nav-btn" />,
    },
    {
      label: t('stockAdjustmentBtn'),
      path: "/product/stock-adjustment",
      icon: <IconInventoryProduct className="icon nav-btn" />,
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

