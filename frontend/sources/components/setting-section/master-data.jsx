import React, { useState  } from "react";
import IconBotol2 from "../../assets/icon/Frame 27.svg?react";
import IconDistribution from "../../assets/icon/lsicon_distribution-filled.svg?react";
import IconStatus from "../../assets/icon/fluent_status-12-regular.svg?react";
import IconEdit from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconDelete from "../../assets/icon/material-symbols_delete.svg?react";

function MasterData({ 
  existingSize, existingKemasan, existingNamaProduk, 
  createSize, createKemasan, createNamaProduk,
  existingMetodePengiriman, existingStatusPengiriman,
  createMetodePengiriman, createStatusPengiriman,
  onEditNamaProduk, onDeleteNamaProduk,
  onEditSize, onDeleteSize,
  onEditKemasan, onDeleteKemasan,
  onEditMetode, onDeleteMetode,
  onEditStatus, onDeleteStatus
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
          <p className="title"><IconBotol2 className="greenIcon" /><span>Daftar Nama Produk</span></p>
          <p>Silahkan klik "tambah produk" untuk nama produk baru.</p>
          <div className="list">
            {existingNamaProduk && existingNamaProduk.length > 0 ? (
              <ul>
                {existingNamaProduk.map((item) => (
                  <li key={item.id_nama_produk} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{item.nama_produk}</span>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <IconEdit className="iconPointer greenIcon" width="16" onClick={() => onEditNamaProduk(item)} />
                      <IconDelete className="iconPointer redIcon" width="16" onClick={() => onDeleteNamaProduk(item)} />
                    </div>
                  </li>
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
          <p className="title"><IconBotol2 className="greenIcon" /><span>Daftar Ukuran Satuan</span></p>
          <p>Silahkan klik "tambah ukuran" untuk membuat ukuran baru.</p>
          <div className="list">
            {existingSize && existingSize.length > 0 ? (
              <ul>
                {existingSize.map((item) => (
                  <li key={item.id_ukuran_satuan} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{item.nama_ukuran_satuan}</span>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <IconEdit className="iconPointer greenIcon" width="16" onClick={() => onEditSize(item)} />
                      <IconDelete className="iconPointer redIcon" width="16" onClick={() => onDeleteSize(item)} />
                    </div>
                  </li>
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
          <p className="title"><IconBotol2 className="greenIcon" /><span>Daftar Jenis Kemasan</span></p>
          <p>Silahkan klik "tambah kemasan" untuk jenis kemasan baru.</p>
          <div className="list">
            {existingKemasan && existingKemasan.length > 0 ? (
              <ul>
                {existingKemasan.map((item) => (
                  <li key={item.id_kemasan} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{item.nama_kemasan}</span>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <IconEdit className="iconPointer greenIcon" width="16" onClick={() => onEditKemasan(item)} />
                      <IconDelete className="iconPointer redIcon" width="16" onClick={() => onDeleteKemasan(item)} />
                    </div>
                  </li>
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
          <p className="title"><IconDistribution className="greenIcon" /><span>Daftar Metode Pengiriman</span></p>
          <p>Silahkan klik "tambah metode" untuk metode pengiriman baru.</p>
          <div className="list">
            {existingMetodePengiriman && existingMetodePengiriman.length > 0 ? (
              <ul>
                {existingMetodePengiriman.map((item) => (
                  <li key={item.id_metode_pengiriman} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{item.nama_metode}</span>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <IconEdit className="iconPointer greenIcon" width="16" onClick={() => onEditMetode(item)} />
                      <IconDelete className="iconPointer redIcon" width="16" onClick={() => onDeleteMetode(item)} />
                    </div>
                  </li>
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
                {isSubmittingMetodePengiriman ? "Menyimpan..." : "Tambah Metode"}
              </button>
            </form>
          </div>
        </div>

        {/* Status Pengiriman */}
        <div className="status-pengiriman">
          <p className="title"><IconStatus className="greenIcon" /><span>Daftar Status Pengiriman</span></p>
          <p>Silahkan klik "tambah status" untuk status pengiriman baru.</p>
          <div className="list">
            {existingStatusPengiriman && existingStatusPengiriman.length > 0 ? (
              <ul>
                {existingStatusPengiriman.map((item) => (
                  <li key={item.id_status} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{item.nama_status}</span>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <IconEdit className="iconPointer greenIcon" width="16" onClick={() => onEditStatus(item)} />
                      <IconDelete className="iconPointer redIcon" width="16" onClick={() => onDeleteStatus(item)} />
                    </div>
                  </li>
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
                {isSubmittingStatusPengiriman ? "Menyimpan..." : "Tambah Status"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterData;
