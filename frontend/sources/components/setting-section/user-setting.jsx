import React from "react";
import IconUserSetting from "../../assets/icon/tdesign_user-setting.svg?react";
import IconAddUser from "../../assets/icon/material-symbols_person-add-outline.svg?react";
import TableUser from "./table-user";
import { useTranslation } from "../../contexts/localContext";

function UserSetting({ openFormUser, userData, editData, onAskDelete }) {
  const t = useTranslation();

  return(
    <div className="user-setting">
      <div className="header-user-setting">
        <div className="title">
          <IconUserSetting className="icon greenIcon" />
          <h3>{t('userSettings')}</h3>
        </div>
        <div className="button">
          <div className="base-btn black" onClick={openFormUser} >
            <IconAddUser className="icon" />
            <p>{t('addUser')}</p>
          </div>
        </div>
      </div>
      <div className="user-display">
        <TableUser 
          views={userData} 
          editData={editData} 
          notifDelete={onAskDelete} />
      </div>
    </div>
  );
}

export default UserSetting;