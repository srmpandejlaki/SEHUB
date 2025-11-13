import React from "react";
import LanguageSetting from "../../components/setting-section/language";
import ClearDataSetting from "../../components/setting-section/clear-data";

function SettingPage() {
  return (
    <div className="content setting">
      <div className="product-display">
        <h4>PRODUK</h4>
      </div>
      <div className="other-setting">
        <LanguageSetting />
        <ClearDataSetting />
      </div>
    </div>
  );
}

export default SettingPage;