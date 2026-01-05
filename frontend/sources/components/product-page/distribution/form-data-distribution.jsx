import React, { useState, useEffect } from "react";
import IconEditProduct from "../../../assets/icon/flowbite_edit-outline.svg?react";
import IconCancel from "../../../assets/icon/material-symbols_cancel.svg?react";
import IconKalender from "../../../assets/icon/mdi_calendar-outline.svg?react";
import IconPerson from "../../../assets/icon/Vector-9.svg?react";
import IconDistribution from "../../../assets/icon/lsicon_distribution-filled.svg?react";
import IconStatus from "../../../assets/icon/fluent_status-12-regular.svg?react";
import IconBotol1 from "../../../assets/icon/icon-park-outline_bottle-two.svg?react";
import IconBotol2 from "../../../assets/icon/Frame 27.svg?react";
import IconKeterangan from "../../../assets/icon/fluent_text-description-ltr-20-filled.svg?react";
import IconDropDown from "../../../assets/icon/material-symbols_arrow-drop-down-rounded.svg?react";
import { fetchAllProducts } from "../../../utilities/api/products";
import { createDistribution } from "../../../utilities/api/distribution";

function FormDataDistribution({ onCloseForm, onSuccess, metodePengiriman = [], statusPengiriman = [] }) {
  const [products, setProducts] = useState([]);
  const [tanggalDistribusi, setTanggalDistribusi] = useState("");
  const [namaPemesan, setNamaPemesan] = useState("");
  const [selectedMetode, setSelectedMetode] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Product items state
  const [productItems, setProductItems] = useState([{ id_produk: "", jumlah: "" }]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchAllProducts();
    setProducts(data);
  };

  const addProductItem = () => {
    setProductItems([...productItems, { id_produk: "", jumlah: "" }]);
  };

  const removeProductItem = (index) => {
    if (productItems.length > 1) {
      const updated = productItems.filter((_, i) => i !== index);
      setProductItems(updated);
    }
  };

  const updateProductItem = (index, field, value) => {
    const updated = [...productItems];
    updated[index][field] = value;
    setProductItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!tanggalDistribusi || !namaPemesan || !selectedMetode || !selectedStatus) {
      alert("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    const validProducts = productItems.filter(item => item.id_produk && item.jumlah);
    if (validProducts.length === 0) {
      alert("Mohon tambahkan minimal satu produk");
      return;
    }

    setIsSubmitting(true);

    const distributionData = {
      tanggal_distribusi: tanggalDistribusi,
      nama_pemesan: namaPemesan,
      id_metode_pengiriman: parseInt(selectedMetode),
      id_status: parseInt(selectedStatus),
      catatan_distribusi: catatan || null,
      products: validProducts.map(item => ({
        id_produk: item.id_produk,
        jumlah: parseInt(item.jumlah)
      }))
    };

    const result = await createDistribution(distributionData);

    setIsSubmitting(false);

    if (result) {
      alert("Data distribusi berhasil disimpan!");
      if (onSuccess) onSuccess();
      onCloseForm();
    } else {
      alert("Gagal menyimpan data distribusi");
    }
  };

  // Calculate total
  const totalJumlah = productItems.reduce((sum, item) => sum + (parseInt(item.jumlah) || 0), 0);

  return(
    <div className="form-data-distribution">
      <div className="form-header">
        <div>
          <IconEditProduct className="icon darkGreenIcon" />
          <p>Tambah Data Distribusi</p>
        </div>
        <IconCancel className="icon" onClick={onCloseForm} />
      </div>
      <form className="main-form" onSubmit={handleSubmit}>
        <div className="left-side">
          <div className="inputan">
            <label><IconKalender className="greenIcon" /> Hari/Tanggal</label>
            <input 
              type="date" 
              value={tanggalDistribusi}
              onChange={(e) => setTanggalDistribusi(e.target.value)}
              required 
            />
          </div>
          <div className="inputan">
            <label><IconPerson className="greenIcon" /> Nama Pemesan</label>
            <input 
              type="text" 
              placeholder="Masukkan nama pemesan"
              value={namaPemesan}
              onChange={(e) => setNamaPemesan(e.target.value)}
              required
            />
          </div>
          <div className="inputan">
            <label><IconDistribution className="greenIcon" /> Metode Pengiriman</label>
            <select 
              value={selectedMetode}
              onChange={(e) => setSelectedMetode(e.target.value)}
              required
            >
              <option value="">-- Pilih Metode --</option>
              {metodePengiriman.map((metode) => (
                <option key={metode.id_metode_pengiriman} value={metode.id_metode_pengiriman}>
                  {metode.nama_metode}
                </option>
              ))}
            </select>
          </div>
          <div className="inputan">
            <label><IconStatus className="greenIcon" /> Status</label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              required
            >
              <option value="">-- Pilih Status --</option>
              {statusPengiriman.map((status) => (
                <option key={status.id_status} value={status.id_status}>
                  {status.nama_status}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="right-side">
          <div className="the-right-form">
            {productItems.map((item, index) => (
              <div className="double-form" key={index}>
                <div className="inputan-double">
                  <label><IconBotol1 className="greenIcon" /> Nama Produk</label>
                  <select 
                    value={item.id_produk}
                    onChange={(e) => updateProductItem(index, "id_produk", e.target.value)}
                    required
                  >
                    <option value="">-- Pilih Produk --</option>
                    {products.map((product) => (
                      <option key={product.id_produk} value={product.id_produk}>
                        {product.nama_produk} - {product.ukuran_produk}{product.nama_ukuran_satuan}
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
                    value={item.jumlah}
                    onChange={(e) => updateProductItem(index, "jumlah", e.target.value)}
                    required
                  />
                </div>
                {productItems.length > 1 && (
                  <button 
                    type="button" 
                    className="remove-btn"
                    onClick={() => removeProductItem(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <p className="add-product-link" onClick={addProductItem}>+ Tambah Produk</p>
            
            <div className="detail-product">
              <div className="detail-container">
                <div className="head-detail">
                  <p>Detail Produk</p>
                  <IconDropDown className="blackIcon" /> 
                </div>
                <div className="display-detail">
                  <table className="products">
                    <tbody>
                      {productItems.filter(item => item.id_produk && item.jumlah).map((item, index) => {
                        const product = products.find(p => p.id_produk === item.id_produk);
                        return (
                          <tr key={index}>
                            <td>
                              {product?.nama_produk || "Produk"} - {product?.ukuran_produk}{product?.nama_ukuran_satuan}
                            </td>
                            <td className="counting">{item.jumlah}</td>
                          </tr>
                        );
                      })}
                      <tr className="total">
                        <td className="text-end">Total</td>
                        <td className="counting">{totalJumlah}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
        </div>
      </form>
    </div>
  );
}

export default FormDataDistribution;