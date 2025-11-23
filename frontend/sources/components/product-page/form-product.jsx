import React from "react";
import IconEditProduct from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconCancel from "../../assets/icon/material-symbols_cancel.svg?react";

function FormProduct({ closeFormProduct }) {
  return(
    <div className="form-product">
      <div className="form-header">
        <div>
          <IconEditProduct className="icon darkGreenIcon" />
          <p>Tambah Produk</p>
        </div>
        <IconCancel className="icon" onClick={closeFormProduct} />
      </div>
      <form action="" className="main-form">
        <div className="inputan">
          <label htmlFor="">Nama Produk</label>
          <select name="Nama Produk" id="">
            <option value="Seho Sirop">Seho Sirop</option>
            <option value="Seho Granule">Seho Granule</option>
            <option value="Seho Block">Seho Block</option>
            <option value="Seho Block">+ Produk Baru</option>
          </select>
        </div>
        <div className="double-form">
          <div className="inputan">
            <label htmlFor="">Ukuran</label>
            <input type="text" placeholder="0" />
          </div>
          <div className="inputan">
            <label htmlFor="">Ukuran Satuan</label>
            <select name="Ukuran Satuan" id="">
              <option value="mililiter">ml</option>
              <option value="kilogram">kg</option>
              <option value="gram">g</option>
              <option value="">+ ukuran satuan</option>
            </select>
          </div>
        </div>
        <div className="double-form">
          <div className="inputan">
            <label htmlFor="">Kemasan</label>
            <select name="Kemasan" id="">
              <option value="botol">botol</option>
              <option value="pieces">pcs</option>
              <option value="pack">pack</option>
              <option value="">+ kemasan</option>
            </select>
          </div>
          <div className="inputan">
            <label htmlFor="">Gambar</label>
            <input type="image" placeholder="unggah" />
          </div>
        </div>
        <div className="button">
          <button className="base-btn green">Simpan</button>
        </div>
      </form>
    </div>
  );
}

export default FormProduct;