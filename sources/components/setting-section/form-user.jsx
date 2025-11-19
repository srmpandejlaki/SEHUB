import React from "react";
import IconAddUser from "../../assets/icon/material-symbols_person-add-outline.svg?react";
import IconCancel from "../../assets/icon/material-symbols_cancel.svg?react";

function FormUser() {
  return(
    <div className="form-user">
      <div className="form-header">
        <div>
          <IconAddUser className="icon darkGreenIcon" />
          <p>Tambah Pengguna</p>
        </div>
        <IconCancel className="icon" />
      </div>
      <form action="" className="main-form">
        <div className="inputan">
          <label htmlFor="">Nama Pengguna</label>
          <input type="text" placeholder="Masukkan nama pengguna" />
        </div>
        <div className="inputan">
          <label htmlFor="">Email</label>
          <input type="text" placeholder="Masukkan email pengguna" />
        </div>
        <div className="inputan">
          <label htmlFor="">Password</label>
          <input type="text" placeholder="Masukkan password pengguna" />
        </div>
        <div className="inputan">
          <label htmlFor="">Jabatan</label>
          <input type="text" placeholder="Jabatan pengguna di kantor" />
        </div>
        <div className="inputan">
          <label htmlFor="">Status</label>
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