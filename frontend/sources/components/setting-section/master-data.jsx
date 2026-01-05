import React, { useState  } from "react";

function MasterData({ 
  existingSize, existingKemasan, existingNamaProduk, 
  createSize, createKemasan, createNamaProduk,
  existingMetodePengiriman, existingStatusPengiriman,
  createMetodePengiriman, createStatusPengiriman 
}) {
  const [newSizeName, setNewSizeName] = useState("");
  const [newKemasanName, setNewKemasanName] = useState("");
  const [newNamaProdukName, setNewNamaProdukName] = useState("");
  const [isSubmittingSize, setIsSubmittingSize] = useState(false);
  const [isSubmittingKemasan, setIsSubmittingKemasan] = useState(false);
  const [isSubmittingNamaProduk, setIsSubmittingNamaProduk] = useState(false);

  const [newMetodePengirimanName, setNewMetodePengirimanName] = useState("");
  const [newStatusPengirimanName, setNewStatusPengirimanName] = useState("");
  const [isSubmittingMetodePengiriman, setIsSubmittingMetodePengiriman] = useState(false);
  const [isSubmittingStatusPengiriman, setIsSubmittingStatusPengiriman] = useState(false);

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

  const handleAddMetodePengiriman = async (e) => {
    e.preventDefault();
    if (!newMetodePengirimanName.trim()) {
      alert("Metode pengiriman tidak boleh kosong");
      return;
    }
    
    setIsSubmittingMetodePengiriman(true);
    await createMetodePengiriman(newMetodePengirimanName.trim());
    setNewMetodePengirimanName("");
    setIsSubmittingMetodePengiriman(false);
  };

  const handleAddStatusPengiriman = async (e) => {
    e.preventDefault();
    if (!newStatusPengirimanName.trim()) {
      alert("Status pengiriman tidak boleh kosong");
      return;
    }
    
    setIsSubmittingStatusPengiriman(true);
    await createStatusPengiriman(newStatusPengirimanName.trim());
    setNewStatusPengirimanName("");
    setIsSubmittingStatusPengiriman(false);
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
                placeholder="Misal: ml, kg, g" 
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
                placeholder="Misal: botol, pouch" 
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

        {/* Metode Pengiriman */}
        <div className="metode-pengiriman">
          <p>Daftar Metode Pengiriman <br/>Silahkan klik "tambah metode" untuk metode pengiriman baru.</p>
          <div className="list">
            {existingMetodePengiriman && existingMetodePengiriman.length > 0 ? (
              <ul>
                {existingMetodePengiriman.map((item) => (
                  <li key={item.id_metode_pengiriman}>{item.nama_metode}</li>
                ))}
              </ul>
            ) : (
              <p className="no-data">Belum ada daftar metode pengiriman.</p>
            )}
          </div>
          <div className="inputan">
            <form onSubmit={handleAddMetodePengiriman}>
              <input 
                type="text" 
                placeholder="Misal: ekspres, reguler" 
                value={newMetodePengirimanName}
                onChange={(e) => setNewMetodePengirimanName(e.target.value)}
                disabled={isSubmittingMetodePengiriman}
              />
              <button 
                className="base-btn green" 
                type="submit"
                disabled={isSubmittingMetodePengiriman}
              >
                {isSubmittingMetodePengiriman ? "Menyimpan..." : "Tambah Metode Pengiriman"}
              </button>
            </form>
          </div>
        </div>

        {/* Status Pengiriman */}
        <div className="status-pengiriman">
          <p>Daftar Status Pengiriman <br/>Silahkan klik "tambah status" untuk status pengiriman baru.</p>
          <div className="list">
            {existingStatusPengiriman && existingStatusPengiriman.length > 0 ? (
              <ul>
                {existingStatusPengiriman.map((item) => (
                  <li key={item.id_status}>{item.nama_status}</li>
                ))}
              </ul>
            ) : (
              <p className="no-data">Belum ada daftar status pengiriman.</p>
            )}
          </div>
          <div className="inputan">
            <form onSubmit={handleAddStatusPengiriman}>
              <input 
                type="text" 
                placeholder="Misal: diproses, selesai" 
                value={newStatusPengirimanName}
                onChange={(e) => setNewStatusPengirimanName(e.target.value)}
                disabled={isSubmittingStatusPengiriman}
              />
              <button 
                className="base-btn green" 
                type="submit"
                disabled={isSubmittingStatusPengiriman}
              >
                {isSubmittingStatusPengiriman ? "Menyimpan..." : "Tambah Status Pengiriman"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterData;
