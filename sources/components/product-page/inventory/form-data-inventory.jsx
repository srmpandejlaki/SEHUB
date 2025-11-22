import React from "react";
import IconEditProduct from "../../../assets/icon/flowbite_edit-outline.svg?react";
import IconCancel from "../../../assets/icon/material-symbols_cancel.svg?react";
import IconKalender from "../../../assets/icon/mdi_calendar-outline.svg?react";
import IconBotol1 from "../../../assets/icon/icon-park-outline_bottle-two.svg?react";
import IconBotol2 from "../../../assets/icon/Frame 27.svg?react";
import IconExpiredDate from "../../../assets/icon/fluent-mdl2_date-time-mirrored.svg?react";
import IconKeterangan from "../../../assets/icon/fluent_text-description-ltr-20-filled.svg?react";

function FormDataInventory({ onCloseForm }) {
  return(
    <div className="form-data-inventori">
      <div className="form-header">
        <div>
          <IconEditProduct className="icon darkGreenIcon" />
          <p>Tambah Produk</p>
        </div>
        <IconCancel className="icon" onClick={onCloseForm} />
      </div>
      <form action="" className="main-form">
        <div className="inputan">
          <label htmlFor=""><IconKalender className="greenIcon" /> Hari/Tanggal</label>
          <input type="date" placeholder="Masukkan tanggal" />
        </div>
        <div className="double-form">
          <div className="inputan-double">
            <label htmlFor=""><IconBotol1 className="greenIcon" /> Nama Produk</label>
            <select name="Nama Produk" id="">
              <option value="Seho Sirop">Seho Sirop</option>
              <option value="Seho Granule">Seho Granule</option>
              <option value="Seho Block">Seho Block</option>
              <option value="Seho Block">+ Produk Baru</option>
            </select>
            <p>+ Tambah Produk</p>
          </div>
          <div className="inputan">
            <label htmlFor=""><IconBotol2 className="greenIcon" /> Ukuran</label>
            <input type="text" placeholder="0" />
        </div>
        </div>
        <div className="inputan">
          <label htmlFor=""><IconExpiredDate className="greenIcon" /> Tanggal Expired</label>
          <input type="date" placeholder="Masukkan tanggal" />
        </div>
        <div className="inputan">
          <label htmlFor=""><IconKeterangan className="greenIcon" /> Keterangan</label>
          <input type="text" placeholder="Ketik sesuatu.." />
        </div>
        <div className="button">
          <button className="base-btn green">Simpan</button>
        </div>
      </form>
    </div>
  );
}

export default FormDataInventory;