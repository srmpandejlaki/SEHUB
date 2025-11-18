import React from "react";
import LanguageSetting from "../../components/setting-section/language";
import ClearDataSetting from "../../components/setting-section/clear-data";
import IconOtherSetting from "../../assets/icon/Vector-8.svg?react";

function SettingPage() {
  return (
    <div className="content setting">
      <div className="product-display">
        <p>PRODUK</p>
      </div>
      <div className="other-setting">
        <div className="other-setting-header">
          <IconOtherSetting className="icon darkGreenIcon" />
          <p>Pengaturan Lainnya</p>
        </div>
        <LanguageSetting />
        <ClearDataSetting />
      </div>
    </div>
  );
}

export default SettingPage;