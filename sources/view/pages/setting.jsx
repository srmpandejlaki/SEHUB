import React from "react";
import LanguageSetting from "../../components/setting-section/language";
import ClearDataSetting from "../../components/setting-section/clear-data";
import BackBtn from "../../components/button/back-btn";
import AddProductBtn from "../../components/button/add-product-btn";

function SettingPage() {
  return (
    <div className="content setting">
      <div className="product-display">
        <h2>PRODUK</h2>
        <div className="product-items">
          <div className="product">
            <p>Produk 1</p>
            <img src="" alt="" />
          </div>
          <div className="product">
            <p>Produk 2</p>
            <img src="" alt="" />
          </div>
          <div className="product">
            <p>Produk 3</p>
            <img src="" alt="" />
          </div>
        </div>
        <div className="button-side">
          <BackBtn />
          <AddProductBtn />
        </div>
      </div>
      <div className="other-setting">
        <LanguageSetting />
        <ClearDataSetting />
      </div>
    </div>
  );
}

export default SettingPage;