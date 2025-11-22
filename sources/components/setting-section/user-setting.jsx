import React from "react";
import IconUserSetting from "../../assets/icon/tdesign_user-setting.svg?react";
import IconAddUser from "../../assets/icon/material-symbols_person-add-outline.svg?react";
import TableUser from "./table-user";

function UserSetting({ openFormUser }) {
  return(
    <div className="user-setting">
      <div className="header-user-setting">
        <div className="title">
          <IconUserSetting className="icon greenIcon" />
          <p>Pengaturan Pengguna</p>
        </div>
        <div className="button">
          <div className="base-btn black" onClick={openFormUser} >
            <IconAddUser className="icon" />
            <p>tambah pengguna</p>
          </div>
        </div>
      </div>
      <div className="user-display">
        <TableUser />
      </div>
    </div>
  );
}

export default UserSetting;