import React, { useState  } from "react";

function MasterData({ existingSize, existingKemasan, existingNamaProduk, createSize, createKemasan, createNamaProduk, reloadSize, reloadKemasan, reloadNamaProduk }) {
  const [newSizeName, setNewSizeName] = useState("");
  const [newKemasanName, setNewKemasanName] = useState("");
  const [newNamaProdukName, setNewNamaProdukName] = useState("");
  const [isSubmittingSize, setIsSubmittingSize] = useState(false);
  const [isSubmittingKemasan, setIsSubmittingKemasan] = useState(false);
  const [isSubmittingNamaProduk, setIsSubmittingNamaProduk] = useState(false);

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

  const handleAddNamaProduk = async (e) => {
    e.preventDefault();
    if (!newNamaProdukName.trim()) {
      alert("Nama produk tidak boleh kosong");
      return;
    }
    
    setIsSubmittingNamaProduk(true);
    await createNamaProduk(newNamaProdukName.trim());
    setNewNamaProdukName("");
    setIsSubmittingNamaProduk(false);
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
            {existingNamaProduk && existingNamaProduk.length > 0 ? (
              <ul>
                {existingNamaProduk.map((item) => (
                  <li key={item.id_nama_produk}>{item.nama_produk}</li>
                ))}
              </ul>
            ) : (
              <p className="no-data">Belum ada daftar nama produk.</p>
            )}
          </div>
          <div className="inputan">
            <form onSubmit={handleAddNamaProduk}>
              <input 
                type="text" 
                placeholder="Masukkan nama produk" 
                value={newNamaProdukName}
                onChange={(e) => setNewNamaProdukName(e.target.value)}
                disabled={isSubmittingNamaProduk}
              />
              <button 
                className="base-btn green" 
                type="submit"
                disabled={isSubmittingNamaProduk}
              >
                {isSubmittingNamaProduk ? "Menyimpan..." : "Tambah Produk"}
              </button>
            </form>
          </div>
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
