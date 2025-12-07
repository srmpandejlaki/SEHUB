import React, { useState } from "react";
import IconEditProduct from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconCancel from "../../assets/icon/material-symbols_cancel.svg?react";
import { createProduct } from "../../utilities/api/products";

function FormProduct({ closeFormProduct, reloadProducts }) {
  const [namaProduk, setNamaProduk] = useState("");
  const [ukuranProduk, setUkuranProduk] = useState("");
  const [ukuranSatuan, setUkuranSatuan] = useState("");
  const [kemasanProduk, setKemasanProduk] = useState("");
  const [imageProduk, setImageProduk] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // mencegah reload halaman

    const newProduct = {
      nama_product: namaProduk,
      ukuran_product: ukuranProduk,
      ukuran_satuan: ukuranSatuan,
      kemasan_product: kemasanProduk,
      img_product: imageProduk,
    };

    const result = await createProduct(newProduct);

    if (result) {
      alert("Produk berhasil ditambahkan!");
      closeFormProduct();

      if (reloadProducts) {
        reloadProducts(); // dipanggil jika parent mengirimkan
      }
    } else {
      alert("Gagal menambahkan produk");
    }
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

      <form className="main-form" onSubmit={handleSubmit}>
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
            onChange={setImageProduk}
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
