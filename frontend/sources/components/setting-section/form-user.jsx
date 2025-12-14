import React, { useState } from "react";
import IconAddUser from "../../assets/icon/material-symbols_person-add-outline.svg?react";
import IconCancel from "../../assets/icon/material-symbols_cancel.svg?react";
import IconUser from "../../assets/icon/material-symbols_person-outline.svg?react";
import IconEmail from "../../assets/icon/ic_outline-email.svg?react";
import IconPassword from "../../assets/icon/mdi_password-outline.svg?react";
import IconPosition from "../../assets/icon/icon-park-outline_user-positioning.svg?react";
import IconStatus from "../../assets/icon/eos-icons_role-binding-outlined.svg?react";
import { createUser, updateUser } from "../../utilities/api/user.js";

function FormUser({ closeFormUser, reloadUsers, editData, isEdit }) {
  const [userName, setUserName] = useState(editData?.nama_pengguna || "");
  const [userEmail, setUserEmail] = useState(editData?.email || "");
  const [userJabatan, setUserJabatan] = useState(editData?.jabatan || "");
  const [userStatus, setUserStatus] = useState(editData?.peran || "");
  const [userPassword, setUserPassword] = useState(editData?.kata_sandi || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !userEmail || !userPassword || !userJabatan || !userStatus) {
      return alert("Semua field wajib diisi!");
    }

    const payload = {
      nama_pengguna : userName,
      email : userEmail,
      jabatan : userJabatan,
      peran : userStatus,
      kata_sandi : userPassword,
    };

    let result;

    if (isEdit) {
      result = await updateUser(editData?.id_pengguna, payload);
      if (!editData?.id_pengguna) {
        alert("ID user tidak ditemukan!");
        return;
      }
    } else {
      result = await createUser(payload);
      reloadUsers();
    }

    if (result) {
      alert(isEdit ? "User berhasil diperbarui!" : "User berhasil ditambahkan!");
      reloadUsers();
      closeFormUser();
    } else {
      alert(isEdit ? "Gagal memperbarui user" : "Gagal menambahkan user");
    }
  };

  return(
    <div className="form-user">
      <div className="form-header">
        <div>
          <IconAddUser className="icon darkGreenIcon" />
          <p>Tambah Pengguna</p>
        </div>
        <IconCancel className="icon blackIcon" onClick={closeFormUser} />
      </div>
      <form className="main-form" onSubmit={handleSubmit}>
        
        <div className="inputan">
          <label><IconUser className="icon darkGreenIcon" />Nama Pengguna</label>
          <input type="text" placeholder="Masukkan nama pengguna" 
                 value={userName} 
                 onChange={(e) => setUserName(e.target.value)} />
        </div>

        <div className="inputan">
          <label><IconEmail className="icon darkGreenIcon" />Email</label>
          <input type="text" placeholder="Masukkan email pengguna" 
                 value={userEmail} 
                 onChange={(e) => setUserEmail(e.target.value)} />
        </div>

        <div className="inputan">
          <label><IconPassword className="icon darkGreenIcon" />Password</label>
          <input type="password" placeholder="Masukkan password pengguna" 
                 value={userPassword} 
                 onChange={(e) => setUserPassword(e.target.value)} />
        </div>

        <div className="inputan">
          <label><IconPosition className="icon darkGreenIcon" />Jabatan</label>
          <input type="text" placeholder="Jabatan pengguna di kantor" 
                 value={userJabatan} 
                 onChange={(e) => setUserJabatan(e.target.value)} />
        </div>

        <div className="inputan">
          <label><IconStatus className="icon darkGreenIcon" />Status</label>
          <select value={userStatus} 
                  onChange={(e) => setUserStatus(e.target.value)} >
            <option value="">-- Pilih --</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
          </select>
        </div>

        <div className="button">
          <button className="base-btn green" type="submit">Simpan</button>
        </div>

      </form>
    </div>
  );
}

export default FormUser;
