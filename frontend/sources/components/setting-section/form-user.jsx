import React, { useState } from "react";
import IconAddUser from "../../assets/icon/material-symbols_person-add-outline.svg?react";
import IconCancel from "../../assets/icon/material-symbols_cancel.svg?react";
import IconUser from "../../assets/icon/material-symbols_person-outline.svg?react";
import IconEmail from "../../assets/icon/ic_outline-email.svg?react";
import IconPassword from "../../assets/icon/mdi_password-outline.svg?react";
import IconPosition from "../../assets/icon/icon-park-outline_user-positioning.svg?react";
import IconStatus from "../../assets/icon/eos-icons_role-binding-outlined.svg?react";
import { createUser, updateUser } from "../../utilities/api/user.js";
import { useTranslation } from "../../contexts/localContext";

function FormUser({ closeFormUser, reloadUsers, editData, isEdit }) {
  const t = useTranslation();
  const [userName, setUserName] = useState(editData?.nama_pengguna || "");
  const [userEmail, setUserEmail] = useState(editData?.email || "");
  const [userJabatan, setUserJabatan] = useState(editData?.jabatan || "");
  const [userStatus, setUserStatus] = useState(
    editData?.is_admin === true ? "admin" : editData?.is_admin === false ? "non-admin" : ""
  );
  const [userPassword, setUserPassword] = useState(editData?.kata_sandi || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !userEmail || !userPassword || !userJabatan || !userStatus) {
      return alert(t('allFieldsRequired'));
    }

    const payload = {
      nama_pengguna : userName,
      email : userEmail,
      jabatan : userJabatan,
      is_admin : userStatus === "admin" ? true : false,
      kata_sandi : userPassword,
    };

    let result;

    if (isEdit) {
      result = await updateUser(editData?.id_pengguna, payload);
      if (!editData?.id_pengguna) {
        alert(t('userIdNotFound'));
        return;
      }
    } else {
      result = await createUser(payload);
      reloadUsers();
    }

    if (result) {
      alert(isEdit ? t('userUpdatedSuccess') : t('userAddedSuccess'));
      reloadUsers();
      closeFormUser();
    } else {
      alert(isEdit ? t('updateUserFailed') : t('addUserFailed'));
    }
  };

  return(
    <div className="form-user">
      <div className="form-header">
        <div>
          <IconAddUser className="icon darkGreenIcon" />
          <p>{t('addUserTitle')}</p>
        </div>
        <IconCancel className="icon blackIcon" onClick={closeFormUser} />
      </div>
      <form className="main-form" onSubmit={handleSubmit}>
        
        <div className="inputan">
          <label><IconUser className="icon darkGreenIcon" />{t('username')}</label>
          <input type="text" placeholder={t('usernamePlaceholder')} 
                 value={userName} 
                 onChange={(e) => setUserName(e.target.value)} />
        </div>

        <div className="inputan">
          <label><IconEmail className="icon darkGreenIcon" />Email</label>
          <input type="text" placeholder={t('emailPlaceholder')} 
                 value={userEmail} 
                 onChange={(e) => setUserEmail(e.target.value)} />
        </div>

        <div className="inputan">
          <label><IconPassword className="icon darkGreenIcon" />{t('password')}</label>
          <input type="password" placeholder={t('passwordPlaceholder')} 
                 value={userPassword} 
                 onChange={(e) => setUserPassword(e.target.value)} />
        </div>

        <div className="inputan">
          <label><IconPosition className="icon darkGreenIcon" />{t('position')}</label>
          <input type="text" placeholder={t('positionPlaceholder')} 
                 value={userJabatan} 
                 onChange={(e) => setUserJabatan(e.target.value)} />
        </div>

        <div className="inputan">
          <label><IconStatus className="icon darkGreenIcon" />{t('statusRole')}</label>
          <select value={userStatus} 
                  onChange={(e) => setUserStatus(e.target.value)} >
            <option value="">{t('selectOption')}</option>
            <option value="admin">{t('admin')}</option>
            <option value="non-admin">{t('nonAdmin')}</option>
          </select>
        </div>

        <div className="button">
          <button className="base-btn green" type="submit">{t('save')}</button>
        </div>

      </form>
    </div>
  );
}

export default FormUser;
