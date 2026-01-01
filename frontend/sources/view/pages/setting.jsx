import React, { useState, useEffect } from "react";
import UserSetting from "../../components/setting-section/user-setting";
import FormUser from "../../components/setting-section/form-user";
import MasterData from "../../components/setting-section/master-data";
import { fetchAllUser, deleteUser } from "../../utilities/api/user";
import { fetchAllSize, createNewSize, fetchAllKemasan, createNewKemasan } from "../../utilities/api/master-data";

function SettingPage() {
  const [showFormUser, setFormUser] = useState(false);
  const [existingData, setExistingData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showNotifDelete, setNotifDelete] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const [showFormSize, setFormSize] = useState(false);
  const [existingSize, setExistingSize] = useState([]);
  const [existingKemasan, setExistingKemasan] = useState([]);

  useEffect(() => {
    loadDataUsers();
    loadDataSize();
    loadDataKemasan();
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
        is_karyawan: item.is_karyawan,
        isAdmin: item.isAdmin,
        kata_sandi: item.kata_sandi,
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

  const createSize = async (nama_ukuran_satuan) => {
    try {
      const response = await createNewSize(nama_ukuran_satuan);
      console.log(response);

      if (response) {
        loadDataSize();
        handleCloseFormMasterData();
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
        handleCloseFormMasterData();
      }
    } catch (error) {
      console.error("Gagal membuat kemasan:", error);
    }
  };

  const handleOpenFormMasterData = () => {
    setFormSize(true);
  };

  const handleCloseFormMasterData = () => {
    setFormSize(false);
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
              <p>Anda yakin<br/>ingin menghapus pengguna ini?</p>
              <div className="buttons">
                <button className="base-btn cancel" onClick={closeNotifDelete}>Batal</button>
                <button className="base-btn red" onClick={() => handleDeleteUser(selectedDeleteId)}>Hapus</button>
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
          createSize={createSize} 
          createKemasan={createKemasan}
          reloadSize={loadDataSize}
          reloadKemasan={loadDataKemasan}
        />
      </div>
    </div>
  );
}

export default SettingPage;