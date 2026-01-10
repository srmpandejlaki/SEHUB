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
import { fetchProductsWithStock } from "../../../utilities/api/products";
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
    const data = await fetchProductsWithStock();
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

  // Get stock for a specific product
  const getProductStock = (id_produk) => {
    const product = products.find(p => p.id_produk === id_produk);
    return product?.stok_sekarang || 0;
  };

  // Check if quantity exceeds stock
  const isOverStock = (id_produk, jumlah) => {
    if (!id_produk || !jumlah) return false;
    const stock = getProductStock(id_produk);
    return parseInt(jumlah) > stock;
  };

  // Check if any item exceeds stock
  const hasOverStockItems = () => {
    return productItems.some(item => isOverStock(item.id_produk, item.jumlah));
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

    // Check stock
    if (hasOverStockItems()) {
      alert("Jumlah produk melebihi stok yang tersedia. Silakan periksa kembali.");
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
  
  // Calculate total stock available for selected items (Unique products only)
  const uniqueSelectedProductIds = [...new Set(productItems.map(item => item.id_produk).filter(id => id))];
  const totalStock = uniqueSelectedProductIds.reduce((sum, id) => {
    const stock = getProductStock(id);
    return sum + stock;
  }, 0);

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
            {productItems.map((item, index) => {
              const stock = getProductStock(item.id_produk);
              const overStock = isOverStock(item.id_produk, item.jumlah);
              
              return (
                <div className="double-form" key={index}>
                  <div className="inputan-double">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <label><IconBotol1 className="greenIcon" /> Nama Produk</label>
                      {productItems.length > 1 && (
                        <div className="iconPointer" onClick={() => removeProductItem(index)}>
                          <IconCancel className="redIcon" width="18" />
                        </div>
                      )}
                    </div>
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
                      max={stock}
                      value={item.jumlah}
                      onChange={(e) => updateProductItem(index, "jumlah", e.target.value)}
                      required
                      style={overStock ? { borderColor: '#d32f2f', backgroundColor: '#fff5f5' } : {}}
                    />
                    {overStock && (
                      <p style={{ color: '#d32f2f', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>
                        ⚠️ Melebihi stok! (Tersedia: {stock})
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            <p className="add-product-link" onClick={addProductItem}>+ Tambah Produk</p>
            
            <div className="detail-product">
              <div className="detail-container">
                <div className="head-detail">
                  <p style={{ fontSize: '11px' }}>Jumlah Stok Tersedia di Sistem</p>
                  <IconDropDown className="blackIcon" /> 
                </div>
                <div className="display-detail">
                  <table className="products">
                    <tbody>
                      {productItems.filter(item => item.id_produk).map((item, index) => {
                        const product = products.find(p => p.id_produk === item.id_produk);
                        const overStock = isOverStock(item.id_produk, item.jumlah);
                        return (
                          <tr key={index} style={overStock ? { color: '#d32f2f' } : {}}>
                            <td>
                              {product?.nama_produk || "Produk"} - {product?.ukuran_produk}{product?.nama_ukuran_satuan}
                            </td>
                            <td className="">
                              Stok: {product?.stok_sekarang || 0}
                            </td>
                            <td className="">
                              {item.jumlah ? `Diambil: ${item.jumlah}` : '-'}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="total">
                        <td className="text-end" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Total</td>
                        <td className="counting" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{totalJumlah}</td>
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
              disabled={isSubmitting || hasOverStockItems()}
              style={hasOverStockItems() ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
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