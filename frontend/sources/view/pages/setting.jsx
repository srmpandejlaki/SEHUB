import React, { useState, useEffect } from "react";
import UserSetting from "../../components/setting-section/user-setting";
import FormUser from "../../components/setting-section/form-user";
import MasterData from "../../components/setting-section/master-data";
import { fetchAllUser, deleteUser } from "../../utilities/api/user";
import { 
  fetchAllSize, createNewSize, updateSize, deleteSize,
  fetchAllKemasan, createNewKemasan, updateKemasan, deleteKemasan,
  fetchAllNamaProduk, createNewNamaProduk, updateNamaProduk, deleteNamaProduk,
  fetchAllMetodePengiriman, createNewMetodePengiriman, updateMetodePengiriman, deleteMetodePengiriman,
  fetchAllStatusPengiriman, createNewStatusPengiriman, updateStatusPengiriman, deleteStatusPengiriman
} from "../../utilities/api/master-data";
import { useTranslation } from "../../contexts/localContext";

function SettingPage() {
  const t = useTranslation();
  const [showFormUser, setFormUser] = useState(false);
  const [existingData, setExistingData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showNotifDelete, setNotifDelete] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const [existingSize, setExistingSize] = useState([]);
  const [existingKemasan, setExistingKemasan] = useState([]);
  const [existingNamaProduk, setExistingNamaProduk] = useState([]);
  const [existingMetodePengiriman, setExistingMetodePengiriman] = useState([]);
  const [existingStatusPengiriman, setExistingStatusPengiriman] = useState([]);

  useEffect(() => {
    loadDataUsers();
    loadDataSize();
    loadDataKemasan();
    loadDataNamaProduk();
    loadDataMetodePengiriman();
    loadDataStatusPengiriman();
  }, []);

  // User
  const loadDataUsers = async () => {
    try {
      const response = await fetchAllUser();
      console.log(response);

      if (!response || !Array.isArray(response)) {
        console.error("Data user tidak valid:", response);
        return;
      }

      const mapped = response.map((item) => ({
        id_pengguna: item.id_pengguna,
        nama_pengguna: item.nama_pengguna,
        email: item.email,
        jabatan: item.jabatan,
        is_admin: item.is_admin,
      }));

      setExistingData(mapped);
    } catch (error) {
      console.error("Gagal memuat data user:", error);
    }
  };

  const reloadUsers = () => {
    loadDataUsers();
  };

  const updateUserData = (user) => {
    setEditData(user);
    setIsEdit(true);
    setFormUser(true);
  };

  // Delete
  const openNotifDelete = (id_pengguna) => {
    setSelectedDeleteId(id_pengguna);
    setNotifDelete(true);
  };

  const closeNotifDelete = () => {
    setNotifDelete(false);
  };

  const handleDeleteUser = async (id_pengguna) => {
    try {
      await deleteUser(id_pengguna);
      console.log("User berhasil dihapus!");
      reloadUsers();
      closeNotifDelete();
    } catch (error) {
      console.error("Gagal menghapus user:", error);
    }
  };

  // Form
  const handleOpenFormUser = () => {
    setFormUser(true);
  };

  const handleCloseFormUser = () => {
    setFormUser(false);
    setEditData(null);
    setIsEdit(false);
  };

  // Master Data
  const loadDataSize = async () => {
    try {
      const response = await fetchAllSize();
      console.log("Size data:", response);

      if (!response || !Array.isArray(response)) {
        console.error("Data size tidak valid:", response);
        return;
      }

      setExistingSize(response);
    } catch (error) {
      console.error("Gagal memuat data size:", error);
    }
  };

  const loadDataKemasan = async () => {
    try {
      const response = await fetchAllKemasan();
      console.log("Kemasan data:", response);

      if (!response || !Array.isArray(response)) {
        console.error("Data kemasan tidak valid:", response);
        return;
      }

      setExistingKemasan(response);
    } catch (error) {
      console.error("Gagal memuat data kemasan:", error);
    }
  };

  const loadDataNamaProduk = async () => {
    try {
      const response = await fetchAllNamaProduk();
      console.log("Nama produk data:", response);

      if (!response || !Array.isArray(response)) {
        console.error("Data nama produk tidak valid:", response);
        return;
      }

      setExistingNamaProduk(response);
    } catch (error) {
      console.error("Gagal memuat data nama produk:", error);
    }
  };

  const loadDataMetodePengiriman = async () => {
    try {
      const response = await fetchAllMetodePengiriman();
      console.log("Nama metode pengiriman:", response);

      if (!response || !Array.isArray(response)) {
        console.error("Data metode pengiriman tidak valid:", response);
        return;
      }

      setExistingMetodePengiriman(response);
    } catch (error) {
      console.error("Gagal memuat data metode pengiriman:", error);
    }
  };

  const loadDataStatusPengiriman = async () => {
    try {
      const response = await fetchAllStatusPengiriman();
      console.log("Nama status pengiriman:", response);

      if (!response || !Array.isArray(response)) {
        console.error("Data status pengiriman tidak valid:", response);
        return;
      }

      setExistingStatusPengiriman(response);
    } catch (error) {
      console.error("Gagal memuat data status pengiriman:", error);
    }
  };

  const createSize = async (nama_ukuran_satuan) => {
    try {
      const response = await createNewSize(nama_ukuran_satuan);
      console.log(response);

      if (response) {
        loadDataSize();
      }
    } catch (error) {
      console.error("Gagal membuat size:", error);
    }
  };

  const createKemasan = async (nama_kemasan) => {
    try {
      const response = await createNewKemasan(nama_kemasan);
      console.log(response);

      if (response) {
        loadDataKemasan();
      }
    } catch (error) {
      console.error("Gagal membuat kemasan:", error);
    }
  };

  const createNamaProduk = async (nama_produk) => {
    try {
      const response = await createNewNamaProduk(nama_produk);
      console.log(response);

      if (response) {
        loadDataNamaProduk();
      }
    } catch (error) {
      console.error("Gagal membuat nama produk:", error);
    }
  };

  const createMetodePengiriman = async (nama_metode) => {
    try {
      const response = await createNewMetodePengiriman(nama_metode);
      console.log(response);

      if (response) {
        loadDataMetodePengiriman();
      }
    } catch (error) {
      console.error("Gagal membuat metode pengiriman:", error);
    }
  };

  const createStatusPengiriman = async (nama_status) => {
    try {
      const response = await createNewStatusPengiriman(nama_status);
      console.log(response);

      if (response) {
        loadDataStatusPengiriman();
      }
    } catch (error) {
      console.error("Gagal membuat status pengiriman:", error);
    }
  };

  // Handlers for Master Data Edit/Delete
  const onEditNamaProduk = async (item) => {
    const newName = prompt("Edit Nama Produk:", item.nama_produk);
    if (newName && newName !== item.nama_produk) {
      await updateNamaProduk(item.id_nama_produk, newName);
      loadDataNamaProduk();
    }
  };
  const onDeleteNamaProduk = async (item) => {
    if (window.confirm(`Hapus produk "${item.nama_produk}"?`)) {
      await deleteNamaProduk(item.id_nama_produk);
      loadDataNamaProduk();
    }
  };

  const onEditSize = async (item) => {
    const newName = prompt("Edit Ukuran:", item.nama_ukuran_satuan);
    if (newName && newName !== item.nama_ukuran_satuan) {
      await updateSize(item.id_ukuran_satuan, newName);
      loadDataSize();
    }
  };
  const onDeleteSize = async (item) => {
    if (window.confirm(`Hapus ukuran "${item.nama_ukuran_satuan}"?`)) {
      await deleteSize(item.id_ukuran_satuan);
      loadDataSize();
    }
  };

  const onEditKemasan = async (item) => {
    const newName = prompt("Edit Kemasan:", item.nama_kemasan);
    if (newName && newName !== item.nama_kemasan) {
      await updateKemasan(item.id_kemasan, newName);
      loadDataKemasan();
    }
  };
  const onDeleteKemasan = async (item) => {
    if (window.confirm(`Hapus kemasan "${item.nama_kemasan}"?`)) {
      await deleteKemasan(item.id_kemasan);
      loadDataKemasan();
    }
  };

  const onEditMetode = async (item) => {
    const newName = prompt("Edit Metode:", item.nama_metode);
    if (newName && newName !== item.nama_metode) {
      await updateMetodePengiriman(item.id_metode_pengiriman, newName);
      loadDataMetodePengiriman();
    }
  };
  const onDeleteMetode = async (item) => {
    if (window.confirm(`Hapus metode "${item.nama_metode}"?`)) {
      await deleteMetodePengiriman(item.id_metode_pengiriman);
      loadDataMetodePengiriman();
    }
  };

  const onEditStatus = async (item) => {
    const newName = prompt("Edit Status:", item.nama_status);
    if (newName && newName !== item.nama_status) {
      await updateStatusPengiriman(item.id_status, newName);
      loadDataStatusPengiriman();
    }
  };
  const onDeleteStatus = async (item) => {
    if (window.confirm(`Hapus status "${item.nama_status}"?`)) {
      await deleteStatusPengiriman(item.id_status);
      loadDataStatusPengiriman();
    }
  };

  return (
    <div className="content setting">
      <div className="main-user">
        <UserSetting
          openFormUser={handleOpenFormUser}
          userData={existingData}
          editData={updateUserData}
          handleDeleteUser={handleDeleteUser} 
          onAskDelete={openNotifDelete} />

        {showNotifDelete && (
          <div className="overlay">
            <div className="notif-base notif-delete">
              <p>{t('deleteUserConfirm')}</p>
              <div className="buttons">
                <button className="base-btn cancel" onClick={closeNotifDelete}>{t('cancel')}</button>
                <button className="base-btn red" onClick={() => handleDeleteUser(selectedDeleteId)}>{t('delete')}</button>
              </div>
            </div>
          </div>
        )}
        {showFormUser && (
          <div className="form-overlay">
            <FormUser 
              closeFormUser={handleCloseFormUser} 
              reloadUsers={reloadUsers} 
              editData={editData}
              isEdit={isEdit} />
          </div>
        )}
      </div>

      <div className="main-master-data">
        <MasterData 
          existingSize={existingSize} 
          existingKemasan={existingKemasan}
          existingNamaProduk={existingNamaProduk} 
          existingMetodePengiriman={existingMetodePengiriman}
          existingStatusPengiriman={existingStatusPengiriman}
          createSize={createSize} 
          createKemasan={createKemasan}
          createNamaProduk={createNamaProduk}
          createMetodePengiriman={createMetodePengiriman}
          createStatusPengiriman={createStatusPengiriman}

          onEditNamaProduk={onEditNamaProduk} onDeleteNamaProduk={onDeleteNamaProduk}
          onEditSize={onEditSize} onDeleteSize={onDeleteSize}
          onEditKemasan={onEditKemasan} onDeleteKemasan={onDeleteKemasan}
          onEditMetode={onEditMetode} onDeleteMetode={onDeleteMetode}
          onEditStatus={onEditStatus} onDeleteStatus={onDeleteStatus}
        />
      </div>
    </div>
  );
}

export default SettingPage;