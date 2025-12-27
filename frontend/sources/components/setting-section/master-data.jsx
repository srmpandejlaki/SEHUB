import React from "react";

function MasterData() {
  return (
    <div className="master-data">
      <div className="pengantar">
        <h3>Pengaturan Master Data</h3>
      </div>
      <div className="main-data-setting">
        <div className="nama-produk">
          <p>Daftar Nama Produk <br/>Silahkan klik "tambah produk" untuk nama produk baru.</p>
        </div>
        <div className="ukuran-satuan"></div>
        <div className="jenis-kemasan"></div>
      </div>
    </div>
  );
}

export default MasterData;