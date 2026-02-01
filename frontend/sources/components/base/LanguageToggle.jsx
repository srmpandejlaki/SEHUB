import React from "react";
import { useLocale } from "../../contexts/localContext";

function LanguageToggle() {
  const { locale, toggleLocale } = useLocale();

  return (
    <button 
      className="lang-toggle" 
      onClick={toggleLocale}
      title={locale === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
    >
      <span className={`lang-option ${locale === 'id' ? 'active' : ''}`}>ID</span>
      <span className="lang-separator">|</span>
      <span className={`lang-option ${locale === 'en' ? 'active' : ''}`}>EN</span>
    </button>
  );
}

export default LanguageToggle;
