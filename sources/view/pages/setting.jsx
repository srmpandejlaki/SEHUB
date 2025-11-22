import React, { useState } from "react";
import LanguageSetting from "../../components/setting-section/language";
import ClearDataSetting from "../../components/setting-section/clear-data";
import IconOtherSetting from "../../assets/icon/Vector-8.svg?react";
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
      <div className="other-setting">
        <div className="other-setting-header">
          <IconOtherSetting className="icon greenIcon" />
          <p>Pengaturan Lainnya</p>
        </div>
        <LanguageSetting />
        <ClearDataSetting />
      </div>
    </div>
  );
}

export default SettingPage;