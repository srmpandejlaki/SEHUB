import React, { useState, useEffect } from "react";
import IconEditProduct from "../../assets/icon/flowbite_edit-outline.svg?react";
import IconCancel from "../../assets/icon/material-symbols_cancel.svg?react";
import { createProduct, updateProduct } from "../../utilities/api/products";
import { fetchAllKemasan, fetchAllSize, fetchAllNamaProduk } from "../../utilities/api/master-data";
import { useTranslation } from "../../contexts/localContext";
import { useToast } from "../../contexts/toastContext";

function FormProduct({ closeFormProduct, reloadProducts, editData = null, isEdit = false }) {
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

  const t = useTranslation();
  const { showToast } = useToast();

  useEffect(() => {
    loadDataNamaProduk();
    loadDataSize();
    loadDataKemasan();
  }, []);

  useEffect(() => {
    if (isEdit && editData) {
      setIdNamaProduk(editData.id_nama_produk?.toString() || "");
      setUkuranProduk(editData.ukuranProduk?.toString() || "");
      setIdUkuranSatuan(editData.id_ukuran_satuan?.toString() || "");
      setIdKemasan(editData.id_kemasan?.toString() || "");
      setMinimumStok(editData.minimumStock?.toString() ?? "");
      // Note: imageProduk stays empty unless user uploads new
    }
  }, [isEdit, editData]);

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

    const productData = {
      id_nama_produk: idNamaProduk,
      ukuran_produk: ukuranProduk,
      id_ukuran_satuan: idUkuranSatuan,
      id_kemasan: idKemasan,
      stok_minimum: minimumStock,
      path_gambar: imageProduk,
    };

    let result;
    if (isEdit && editData?.id) {
       result = await updateProduct(editData.id, productData);
    } else {
       result = await createProduct(productData);
    }

    if (result) {
      showToast(isEdit ? "Produk berhasil diperbarui!" : "Produk berhasil ditambahkan!", 'success');
      closeFormProduct();
      if (reloadProducts) reloadProducts();
    } else {
      showToast(isEdit ? "Gagal memperbarui produk" : "Gagal menambahkan produk", 'error');
    }
  };

  return (
    <div className="form-product">
      <div className="form-header">
        <div>
          <IconEditProduct className="icon darkGreenIcon" />
          <p>{isEdit ? t('formEditProduct') : t('addProduct')}</p>
        </div>
        <IconCancel className="icon" onClick={closeFormProduct} />
      </div>

      <form className="main-form" onSubmit={handleSubmit}>
        <div className="inputan">
          <label>{t('productName')}</label>
          <select value={idNamaProduk} onChange={(e) => setIdNamaProduk(e.target.value)} required>
            <option value="">-- {t('chooseProduct')} --</option>
            {namaProdukList.map((item) => (
              <option key={item.id_nama_produk} value={item.id_nama_produk.toString()}>
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
            <label>{t('productSize')}</label>
            <select value={idUkuranSatuan} onChange={(e) => setIdUkuranSatuan(e.target.value)} required>
              <option value="">-- {t('choose')} --</option>
              {ukuranSatuanList.map((item) => (
                <option key={item.id_ukuran_satuan} value={item.id_ukuran_satuan.toString()}>
                  {item.nama_ukuran_satuan}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="double-form">
          <div className="inputan">
            <label>{t('productPackage')}</label>
            <select value={idKemasan} onChange={(e) => setIdKemasan(e.target.value)} required>
              <option value="">-- {t('choose')} --</option>
              {kemasanList.map((item) => (
                <option key={item.id_kemasan} value={item.id_kemasan.toString()}>
                  {item.nama_kemasan}
                </option>
              ))}
            </select>
          </div>

          <div className="inputan">
            <label>{t('minimumStock')}</label>
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
          <label>{t('productImage')}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageProduk(e.target.files[0])}
          />
          {isEdit && editData?.imageProduk && (
            <p style={{fontSize: "12px", color: "gray", marginTop: "5px"}}>
              {t('imageDesc')}
            </p>
          )}
        </div>

        <div className="button">
          <button type="submit" className="base-btn green">
            {isEdit ? "Perbarui" : t('saveBtn')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormProduct;

