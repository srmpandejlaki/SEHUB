import React, { useState } from "react";
import IconAddUser from "../../assets/icon/material-symbols_person-add-outline.svg?react";
import IconCancel from "../../assets/icon/material-symbols_cancel.svg?react";
import IconUser from "../../assets/icon/material-symbols_person-outline.svg?react";
import IconEmail from "../../assets/icon/ic_outline-email.svg?react";
import IconPassword from "../../assets/icon/mdi_password-outline.svg?react";
import IconPosition from "../../assets/icon/icon-park-outline_user-positioning.svg?react";
import IconStatus from "../../assets/icon/eos-icons_role-binding-outlined.svg?react";
import { createUser } from "../../utilities/api/user.js";

function FormUser({ closeFormUser, reloadUsers }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userJabatan, setUserJabatan] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name : userName,
      email : userEmail,
      jabatan : userJabatan,
      status : userStatus,
      password : userPassword,
    };

    const result = await createUser(newUser);

    if (result) {
      alert("Produk berhasil ditambahkan!");
      closeFormUser();

      if (reloadUsers) {
        closeFormUser();
      }
    } else {
      alert("Gagal menambahkan produk");
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
          <label htmlFor=""><IconUser className="icon darkGreenIcon" />Nama Pengguna</label>
          <input type="text" placeholder="Masukkan nama pengguna" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="inputan">
          <label htmlFor=""><IconEmail className="icon darkGreenIcon" />Email</label>
          <input type="text" placeholder="Masukkan email pengguna" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
        </div>
        <div className="inputan">
          <label htmlFor=""><IconPassword className="icon darkGreenIcon" />Password</label>
          <input type="text" placeholder="Masukkan password pengguna" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
        </div>
        <div className="inputan">
          <label htmlFor=""><IconPosition className="icon darkGreenIcon" />Jabatan</label>
          <input type="text" placeholder="Jabatan pengguna di kantor" value={userJabatan} onChange={(e) => setUserJabatan(e.target.value)} />
        </div>
        <div className="inputan">
          <label htmlFor=""><IconStatus className="icon darkGreenIcon" />Status</label>
          <select name="Ukuran Satuan" value={userStatus} onChange={(e) => setUserStatus(e.target.value)} >
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
          </select>
        </div>
        <div className="button">
          <button className="base-btn green" type="submit" >Simpan</button>
        </div>
      </form>
    </div>
  );
}

export default FormUser;