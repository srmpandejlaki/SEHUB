import React, { useState, useEffect } from "react";
import UserSetting from "../../components/setting-section/user-setting";
import FormUser from "../../components/setting-section/form-user";
import { fetchAllUser, deleteUser } from "../../utilities/api/user";

function SettingPage() {
  const [showFormUser, setFormUser] = useState(false);
  const [existingData, setExistingData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showNotifDelete, setNotifDelete] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  useEffect(() => {
    loadDataUsers();
  }, []);

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
        peran: item.peran,
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

  const handleOpenFormUser = () => {
    setFormUser(true);
  };

  const handleCloseFormUser = () => {
    setFormUser(false);
    setEditData(null);
    setIsEdit(false);
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
    </div>
  );
}

export default SettingPage;