import React, { useState, useEffect } from "react";
import UserSetting from "../../components/setting-section/user-setting";
import FormUser from "../../components/setting-section/form-user";
import { fetchAllUser } from "../../utilities/api/user";

function SettingPage() {
  const [showFormUser, setFormUser] = useState(false);
  const [existingData, setExistingData] = useState([]);

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

  const handleOpenFormUser = () => {
    setFormUser(true);
  };

  const handleCloseFormUser = () => {
    setFormUser(false);
  };

  return (
    <div className="content setting">
      <div className="main-user">
        <UserSetting openFormUser={handleOpenFormUser} userData={existingData} />
        {showFormUser && (
          <div className="form-overlay">
            <FormUser closeFormUser={handleCloseFormUser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingPage;