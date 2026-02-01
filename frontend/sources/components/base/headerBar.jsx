import React from "react";
import logoLarbre from "../../assets/public/logo-larbreseho.png";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "../../contexts/localContext";

function Header() {
  const t = useTranslation();

  return (
    <header>
      <div className="logo-larbre">
        <h2>{t('headerTitle')}</h2>
        <div className="header-right">
          <LanguageToggle />
          <img src={logoLarbre} alt="Logo L'Arbre Seho" />
        </div>
      </div>
    </header>
  );
}

export default Header;