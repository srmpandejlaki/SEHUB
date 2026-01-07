import React, { useState, useEffect } from "react";
import IconEditProduct from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconCancel from "../../assets/icon/material-symbols_cancel.svg?react";
import { createProduct } from "../../utilities/api/products";
import { fetchAllKemasan, fetchAllSize, fetchAllNamaProduk } from "../../utilities/api/master-data";

function FormProduct({ closeFormProduct, reloadProducts }) {
  const [idNamaProduk, setIdNamaProduk] = useState("");
  const [ukuranProduk, setUkuranProduk] = useState("");
  const [idUkuranSatuan, setIdUkuranSatuan] = useState("");
  const [idKemasan, setIdKemasan] = useState("");
  const [minimumStock, setMinimumStok] = useState("");
  const [imageProduk, setImageProduk] = useState("");
  
  // Master data lists
  const [namaProdukList, setNamaProdukList] = useState([]);
  const [ukuranSatuanList, setUkuranSatuanList] = useState([]);
  const [kemasanList, setKemasanList] = useState([]);

  useEffect(() => {
    loadDataNamaProduk();
    loadDataSize();
    loadDataKemasan();
  }, []);

  const loadDataNamaProduk = async () => {
    try {
      const response = await fetchAllNamaProduk();
      setNamaProdukList(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Gagal memuat data nama produk:", error);
    }
  };

  const loadDataSize = async () => {
    try {
      const response = await fetchAllSize();
      setUkuranSatuanList(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Gagal memuat data size:", error);
    }
  };

  const loadDataKemasan = async () => {
    try {
      const response = await fetchAllKemasan();
      setKemasanList(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Gagal memuat data kemasan:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      id_nama_produk: idNamaProduk,
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
          <p>Tambah Barang</p>
        </div>
        <IconCancel className="icon" onClick={closeFormProduct} />
      </div>

      <form className="main-form" onSubmit={handleSubmit}>
        <div className="inputan">
          <label>Nama Barang</label>
          <select value={idNamaProduk} onChange={(e) => setIdNamaProduk(e.target.value)} required>
            <option value="">-- Pilih --</option>
            {namaProdukList.map((item) => (
              <option key={item.id_nama_produk} value={item.id_nama_produk}>
                {item.nama_produk}
              </option>
            ))}
          </select>
        </div>

        <div className="double-form">
          <div className="inputan">
            <label>Berat Barang</label>
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
          <label>Gambar Barang</label>
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

