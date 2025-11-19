import React from "react";
import IconClearData from "../../assets/icon/ant-design_clear-outlined.svg?react";

function ClearDataSetting() {
  return(
    <div className="clear-data-setting">
      <div className="title">
        <IconClearData className="icon greenIcon" />
        <h4>PEMBERSIHAN DATA</h4>
      </div>
      <div className="sub-setting">
          <h5>BERSIHKAN DATA INVENTORI PRODUK</h5>
        <div className="btn-setting">
          <p>Semua data inputan inventori produk akan terhapus secara permanen.</p>
          <button className="base-btn red">hapus data</button>
        </div>
      </div>
      <div className="sub-setting">
          <h5>BERSIHKAN DATA DISTRIBUSI PRODUK</h5>
        <div className="btn-setting">
          <p>Semua data inputan distribusi produk akan terhapus secara permanen.</p>
          <button className="base-btn red">hapus data</button>
        </div>
      </div>
      <div className="sub-setting">
          <h5>RESET APLIKASI</h5>
        <div className="btn-setting">
          <p>Semua data yang ada akan terhapus secara permanen.</p>
          <button className="base-btn red">reset sekarang</button>
        </div>
      </div>
    </div>
  );
}

export default ClearDataSetting;