import React from "react";
import IconAddUser from "../../assets/icon/material-symbols_person-add-outline.svg?react";
import IconCancel from "../../assets/icon/material-symbols_cancel.svg?react";
import IconUser from "../../assets/icon/material-symbols_person-outline.svg?react";
import IconEmail from "../../assets/icon/ic_outline-email.svg?react";
import IconPassword from "../../assets/icon/mdi_password-outline.svg?react";
import IconPosition from "../../assets/icon/icon-park-outline_user-positioning.svg?react";
import IconStatus from "../../assets/icon/eos-icons_role-binding-outlined.svg?react";

function FormUser({ closeFormUser }) {
  return(
    <div className="form-user">
      <div className="form-header">
        <div>
          <IconAddUser className="icon darkGreenIcon" />
          <p>Tambah Pengguna</p>
        </div>
        <IconCancel className="icon blackIcon" onClick={closeFormUser} />
      </div>
      <form action="" className="main-form">
        <div className="inputan">
          <label htmlFor=""><IconUser className="icon darkGreenIcon" />Nama Pengguna</label>
          <input type="text" placeholder="Masukkan nama pengguna" />
        </div>
        <div className="inputan">
          <label htmlFor=""><IconEmail className="icon darkGreenIcon" />Email</label>
          <input type="text" placeholder="Masukkan email pengguna" />
        </div>
        <div className="inputan">
          <label htmlFor=""><IconPassword className="icon darkGreenIcon" />Password</label>
          <input type="text" placeholder="Masukkan password pengguna" />
        </div>
        <div className="inputan">
          <label htmlFor=""><IconPosition className="icon darkGreenIcon" />Jabatan</label>
          <input type="text" placeholder="Jabatan pengguna di kantor" />
        </div>
        <div className="inputan">
          <label htmlFor=""><IconStatus className="icon darkGreenIcon" />Status</label>
          <select name="Ukuran Satuan" id="">
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
            <option value="">+ ukuran satuan</option>
          </select>
        </div>
        <div className="button">
          <button className="base-btn green">Simpan</button>
        </div>
      </form>
    </div>
  );
}

export default FormUser;