import React, { useState } from "react";
import UserSetting from "../../components/setting-section/user-setting";
import FormUser from "../../components/setting-section/form-user";

function SettingPage() {
  const [showFormUser, setFormUser] = useState(false);

  const handleOpenFormUser = () => {
    setFormUser(true);
  };

  const handleCloseFormUser = () => {
    setFormUser(false);
  };

  return (
    <div className="content setting">
      <div className="main-user">
        <UserSetting openFormUser={handleOpenFormUser} />
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