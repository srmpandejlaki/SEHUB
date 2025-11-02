import React from "react";
import logoLarbre from "../../assets/public/logo-larbreseho.png"

function Header() {
  return (
    <header>
      <div className="logo-larbre">
        <h2>Selamat Datang!</h2>
        <img src={logoLarbre} alt="Logo L'Arbre Seho" />
      </div>
      <div class="hari-tgl">
          <p>20 September 2025</p>
      </div>
    </header>
  );
}

export default Header;