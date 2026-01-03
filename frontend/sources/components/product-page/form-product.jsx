import React, { useState, useEffect } from "react";
import IconEditProduct from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconCancel from "../../assets/icon/material-symbols_cancel.svg?react";
import { createProduct } from "../../utilities/api/products";
import { fetchAllKemasan, fetchAllSize } from "../../utilities/api/master-data";

function FormProduct({ closeFormProduct, reloadProducts }) {
  const [namaProduk, setNamaProduk] = useState("");
  const [ukuranProduk, setUkuranProduk] = useState("");
  const [idUkuranSatuan, setIdUkuranSatuan] = useState("");
  const [idKemasan, setIdKemasan] = useState("");
  const [minimumStock, setMinimumStok] = useState("");
  const [imageProduk, setImageProduk] = useState("");
  // Master data lists
  const [ukuranSatuanList, setUkuranSatuanList] = useState([]);
  const [kemasanList, setKemasanList] = useState([]);

  useEffect(() => {
    loadDataSize();
    loadDataKemasan();
  }, []);

  const loadDataSize = async () => {
    try {
      const response = await fetchAllSize();
      // fetchAllSize returns array directly
      setUkuranSatuanList(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Gagal memuat data size:", error);
    }
  };

  const loadDataKemasan = async () => {
    try {
      const response = await fetchAllKemasan();
      // fetchAllKemasan returns array directly
      setKemasanList(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Gagal memuat data kemasan:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      nama_produk: namaProduk,
      ukuran_produk: ukuranProduk,
      id_ukuran_satuan: idUkuranSatuan,
      id_kemasan: idKemasan,
      stok_minimum: minimumStock,
      path_gambar: imageProduk,
    };

    const result = await createProduct(newProduct);

    if (result) {
      alert("Produk berhasil ditambahkan!");
      closeFormProduct();
      if (reloadProducts) reloadProducts();
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
          <input 
            type="text" 
            placeholder="Masukkan nama produk" 
            value={namaProduk} onChange={(e) => setNamaProduk(e.target.value)} 
            required 
          />
        </div>

        <div className="double-form">
          <div className="inputan">
            <label>Ukuran</label>
            <input
              type="text"
              placeholder="0"
              value={ukuranProduk}
              onChange={(e) => setUkuranProduk(e.target.value)}
              required
            />
          </div>

          <div className="inputan">
            <label>Ukuran Satuan</label>
            <select value={idUkuranSatuan} onChange={(e) => setIdUkuranSatuan(e.target.value)} required>
              <option value="">-- Pilih --</option>
              {ukuranSatuanList.map((item) => (
                <option key={item.id_ukuran_satuan} value={item.id_ukuran_satuan}>
                  {item.nama_ukuran_satuan}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="double-form">
          <div className="inputan">
            <label>Kemasan</label>
            <select value={idKemasan} onChange={(e) => setIdKemasan(e.target.value)} required>
              <option value="">-- Pilih --</option>
              {kemasanList.map((item) => (
                <option key={item.id_kemasan} value={item.id_kemasan}>
                  {item.nama_kemasan}
                </option>
              ))}
            </select>
          </div>

          <div className="inputan">
            <label>Minimum Stok</label>
            <input
              type="number"
              placeholder="0"
              value={minimumStock}
              onChange={(e) => setMinimumStok(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="inputan">
          <label>Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageProduk(e.target.files[0])}
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

