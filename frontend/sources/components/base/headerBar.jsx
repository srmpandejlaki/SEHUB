import React from "react";
import logoLarbre from "../../assets/public/logo-larbreseho.png"

function Header() {
  return (
    <header>
      <div className="logo-larbre">
        <h2>Aplikasi Pendataan Inventori dan Distribusi Produk L' Arbre Seho</h2>
        <img src={logoLarbre} alt="Logo L'Arbre Seho" />
      </div>
    </header>
  );
}

export default Header;