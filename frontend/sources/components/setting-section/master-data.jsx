import React, { useState  } from "react";

function MasterData({ existingSize, existingKemasan, createSize, createKemasan, reloadSize, reloadKemasan }) {
  const [newSizeName, setNewSizeName] = useState("");
  const [newKemasanName, setNewKemasanName] = useState("");
  const [isSubmittingSize, setIsSubmittingSize] = useState(false);
  const [isSubmittingKemasan, setIsSubmittingKemasan] = useState(false);

  const handleAddSize = async (e) => {
    e.preventDefault();
    if (!newSizeName.trim()) {
      alert("Nama ukuran satuan tidak boleh kosong");
      return;
    }
    
    setIsSubmittingSize(true);
    await createSize(newSizeName.trim());
    setNewSizeName("");
    setIsSubmittingSize(false);
  };

  const handleAddKemasan = async (e) => {
    e.preventDefault();
    if (!newKemasanName.trim()) {
      alert("Nama kemasan tidak boleh kosong");
      return;
    }
    
    setIsSubmittingKemasan(true);
    await createKemasan(newKemasanName.trim());
    setNewKemasanName("");
    setIsSubmittingKemasan(false);
  };

  return (
    <div className="master-data">
      <div className="pengantar">
        <h3>Pengaturan Master Data</h3>
      </div>
      <div className="main-data-setting">
        {/* Nama Produk - hardcoded untuk saat ini */}
        <div className="nama-produk">
          <p>Daftar Nama Produk <br/>Silahkan klik "tambah produk" untuk nama produk baru.</p>
          <div className="list">
            <ul>
              <li>Seho Sirop</li>
              <li>Seho Granule</li>
              <li>Seho Block</li>
            </ul>
          </div>
          <button className="base-btn green">Tambah Produk</button>
        </div>

        {/* Ukuran Satuan */}
        <div className="ukuran-satuan">
          <p>Daftar Ukuran Satuan <br/>Silahkan klik "tambah ukuran" untuk membuat ukuran baru.</p>
          <div className="list">
            {existingSize && existingSize.length > 0 ? (
              <ul>
                {existingSize.map((item) => (
                  <li key={item.id_ukuran_satuan}>{item.nama_ukuran_satuan}</li>
                ))}
              </ul>
            ) : (
              <p className="no-data">Belum ada daftar ukuran satuan.</p>
            )}
          </div>
          <div className="inputan">
            <form onSubmit={handleAddSize}>
              <input 
                type="text" 
                placeholder="Masukkan ukuran satuan (misal: ml, kg, g)" 
                value={newSizeName}
                onChange={(e) => setNewSizeName(e.target.value)}
                disabled={isSubmittingSize}
              />
              <button 
                className="base-btn green" 
                type="submit"
                disabled={isSubmittingSize}
              >
                {isSubmittingSize ? "Menyimpan..." : "Tambah Ukuran"}
              </button>
            </form>
          </div>
        </div>

        {/* Jenis Kemasan */}
        <div className="jenis-kemasan">
          <p>Daftar Jenis Kemasan <br/>Silahkan klik "tambah kemasan" untuk jenis kemasan baru.</p>
          <div className="list">
            {existingKemasan && existingKemasan.length > 0 ? (
              <ul>
                {existingKemasan.map((item) => (
                  <li key={item.id_kemasan}>{item.nama_kemasan}</li>
                ))}
              </ul>
            ) : (
              <p className="no-data">Belum ada daftar jenis kemasan.</p>
            )}
          </div>
          <div className="inputan">
            <form onSubmit={handleAddKemasan}>
              <input 
                type="text" 
                placeholder="Masukkan jenis kemasan (misal: botol, pcs)" 
                value={newKemasanName}
                onChange={(e) => setNewKemasanName(e.target.value)}
                disabled={isSubmittingKemasan}
              />
              <button 
                className="base-btn green" 
                type="submit"
                disabled={isSubmittingKemasan}
              >
                {isSubmittingKemasan ? "Menyimpan..." : "Tambah Kemasan"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterData;
