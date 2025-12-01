import React, { useState } from "react";
import IconEditProduct from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconCancel from "../../assets/icon/material-symbols_cancel.svg?react";

function FormProduct({ closeFormProduct }) {
  const [namaProduk, setNamaProduk] = useState("");
  const [ukuranProduk, setUkuranProduk] = useState("");
  const [ukuranSatuan, setUkuranSatuan] = useState("");
  const [kemasanProduk, setKemasanProduk] = useState("");
  const [gambarProduk, setGambarProduk] = useState(null);

  // Convert file → base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const tambahProdukBaru = async (e) => {
    e.preventDefault();

    const dataLama = JSON.parse(localStorage.getItem("produk")) || [];

    let gambarBase64 = null;
    if (gambarProduk) {
      gambarBase64 = await convertToBase64(gambarProduk);
    }

    const produkBaru = {
      namaProduk,
      ukuranProduk,
      ukuranSatuan,
      kemasanProduk,
      gambar: gambarBase64,
    };

    const dataBaru = [...dataLama, produkBaru];

    localStorage.setItem("product", JSON.stringify(dataBaru));

    // Reset form
    setNamaProduk("");
    setUkuranProduk("");
    setUkuranSatuan("");
    setKemasanProduk("");
    setGambarProduk(null);

    alert("Produk berhasil disimpan!");
  };

  return (
    <div className="form-product">
      <div className="form-header">
        <div>
          <IconEditProduct className="icon darkGreenIcon" />
          <p>Tambah Produk</p>
        </div>
        <IconCancel className="icon" onClick={closeFormProduct} />
      </div>

      <form className="main-form" onSubmit={tambahProdukBaru}>
        <div className="inputan">
          <label>Nama Produk</label>
          <select value={namaProduk} onChange={(e) => setNamaProduk(e.target.value)}>
            <option value="">-- Pilih --</option>
            <option value="Seho Sirop">Seho Sirop</option>
            <option value="Seho Granule">Seho Granule</option>
            <option value="Seho Block">Seho Block</option>
          </select>
        </div>

        <div className="double-form">
          <div className="inputan">
            <label>Ukuran</label>
            <input
              type="text"
              placeholder="0"
              value={ukuranProduk}
              onChange={(e) => setUkuranProduk(e.target.value)}
            />
          </div>

          <div className="inputan">
            <label>Ukuran Satuan</label>
            <select
              value={ukuranSatuan}
              onChange={(e) => setUkuranSatuan(e.target.value)}
            >
              <option value="">-- Pilih --</option>
              <option value="ml">ml</option>
              <option value="kg">kg</option>
              <option value="g">g</option>
            </select>
          </div>
        </div>

        <div className="inputan">
          <label>Kemasan</label>
          <select
            value={kemasanProduk}
            onChange={(e) => setKemasanProduk(e.target.value)}
          >
            <option value="">-- Pilih --</option>
            <option value="botol">botol</option>
            <option value="pcs">pcs</option>
            <option value="pack">pack</option>
          </select>
        </div>

        <div className="inputan">
          <label>Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setGambarProduk(e.target.files[0])}
          />
        </div>

        <div className="button">
          <button type="submit" className="base-btn green">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormProduct;
