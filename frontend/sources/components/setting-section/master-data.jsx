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
          <div className="list">
            <ul>
              <li>seho sirop</li>
              <li>seho granule</li>
              <li>seho block</li>
            </ul>
          </div>
          <button>tambah produk</button>
        </div>
        <div className="ukuran-satuan">
          <p>Daftar Ukuran Satuan <br/>Silahkan klik "tambah ukuran" untuk membuat ukuran baru.</p>
          <div className="list">
            <ul>
              <li>ml</li>
              <li>kg</li>
              <li>gr</li>
            </ul>
          </div>
          <button>tambah produk</button>
        </div>
        <div className="jenis-kemasan">
          <p>Daftar Jenis Kemasan <br/>Silahkan klik "tambah kemasan" untuk jenis kemasan baru.</p>
          <div className="list">
            <ul>
              <li>botol</li>
              <li>pouch</li>
              <li>toples</li>
            </ul>
          </div>
          <button>tambah produk</button>
        </div>
      </div>
    </div>
  );
}

export default MasterData;