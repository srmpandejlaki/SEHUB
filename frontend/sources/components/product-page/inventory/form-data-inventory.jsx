import React, { useState, useEffect } from "react";
import IconEditProduct from "../../../assets/icon/flowbite_edit-outline.svg?react";
import IconCancel from "../../../assets/icon/material-symbols_cancel.svg?react";
import IconKalender from "../../../assets/icon/mdi_calendar-outline.svg?react";
import IconBotol1 from "../../../assets/icon/icon-park-outline_bottle-two.svg?react";
import IconBotol2 from "../../../assets/icon/Frame 27.svg?react";
import IconExpiredDate from "../../../assets/icon/fluent-mdl2_date-time-mirrored.svg?react";
import IconKeterangan from "../../../assets/icon/fluent_text-description-ltr-20-filled.svg?react";
import { fetchAllProducts } from "../../../utilities/api/products";
import { createInventory } from "../../../utilities/api/inventory";

function FormDataInventory({ onCloseForm, onSuccess }) {
  const [products, setProducts] = useState([]);
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [tanggalExpired, setTanggalExpired] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchAllProducts();
    setProducts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!tanggalMasuk || !selectedProduct || !jumlah || !tanggalExpired) {
      alert("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    setIsSubmitting(true);

    const inventoryData = {
      tanggal_masuk: tanggalMasuk,
      catatan_barang_masuk: catatan || null,
      products: [
        {
          id_produk: selectedProduct,
          jumlah: parseInt(jumlah),
          tanggal_expired: tanggalExpired
        }
      ]
    };

    const result = await createInventory(inventoryData);
    
    setIsSubmitting(false);

    if (result) {
      alert("Data inventori berhasil disimpan!");
      if (onSuccess) onSuccess();
      onCloseForm();
    } else {
      alert("Gagal menyimpan data inventori");
    }
  };

  // Get selected product info for display
  const selectedProductInfo = products.find(p => p.kode_produk === selectedProduct);

  return(
    <div className="form-data-inventori">
      <div className="form-header">
        <div>
          <IconEditProduct className="icon darkGreenIcon" />
          <p>Tambah Data Inventori</p>
        </div>
        <IconCancel className="icon" onClick={onCloseForm} />
      </div>
      <form className="main-form" onSubmit={handleSubmit}>
        <div className="inputan">
          <label><IconKalender className="greenIcon" /> Hari/Tanggal</label>
          <input 
            type="date" 
            value={tanggalMasuk}
            onChange={(e) => setTanggalMasuk(e.target.value)}
            required
          />
        </div>
        <div className="double-form">
          <div className="inputan-double">
            <label><IconBotol1 className="greenIcon" /> Nama Produk</label>
            <select 
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
            >
              <option value="">-- Pilih Produk --</option>
              {products.map((product) => (
                <option key={product.kode_produk} value={product.kode_produk}>
                  {product.nama_produk} - {product.ukuran_produk}{product.ukuran_satuan}
                </option>
              ))}
            </select>
          </div>
          <div className="inputan">
            <label><IconBotol2 className="greenIcon" /> Jumlah</label>
            <input 
              type="number" 
              placeholder="0" 
              min="1"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              required
            />
        </div>
        </div>
        <div className="inputan">
          <label><IconExpiredDate className="greenIcon" /> Tanggal Expired</label>
          <input 
            type="date" 
            value={tanggalExpired}
            onChange={(e) => setTanggalExpired(e.target.value)}
            required
          />
        </div>
        <div className="inputan">
          <label><IconKeterangan className="greenIcon" /> Keterangan</label>
          <input 
            type="text" 
            placeholder="Ketik sesuatu (opsional)" 
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
          />
        </div>
        <div className="button">
          <button 
            type="submit" 
            className="base-btn green"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormDataInventory;