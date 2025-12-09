import React, { useState, useEffect } from "react";
import UserSetting from "../../components/setting-section/user-setting";
import FormUser from "../../components/setting-section/form-user";
import { fetchAllUser, deleteUser } from "../../utilities/api/user";

function SettingPage() {
  const [showFormUser, setFormUser] = useState(false);
  const [existingData, setExistingData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

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
        id: item.id_user,
        name: item.name,
        email: item.email,
        jabatan: item.jabatan,
        status: item.status,
        password: item.password,
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

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      console.log("User berhasil dihapus!");
      reloadUsers();
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
          handleDeleteUser={handleDeleteUser} />
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