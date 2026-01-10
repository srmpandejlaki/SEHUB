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
import { updateDistribution } from "../../../utilities/api/distribution";
import { createReturn, fetchReturnsByDistribution } from "../../../utilities/api/return";

function FormEditDistribution({ 
  onCloseForm, 
  onSuccess, 
  metodePengiriman = [], 
  statusPengiriman = [],
  editData = null 
}) {
  const [products, setProducts] = useState([]);
  const [tanggalDistribusi, setTanggalDistribusi] = useState("");
  const [namaPemesan, setNamaPemesan] = useState("");
  const [selectedMetode, setSelectedMetode] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Product items state
  const [productItems, setProductItems] = useState([]);

  // Return form state
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [returnItems, setReturnItems] = useState([]);
  const [tanggalReturn, setTanggalReturn] = useState("");
  const [catatanReturn, setCatatanReturn] = useState("");
  const [existingReturns, setExistingReturns] = useState([]);
  const [isSubmittingReturn, setIsSubmittingReturn] = useState(false);

  useEffect(() => {
    loadProducts();
    if (editData) {
      loadEditData();
      loadExistingReturns();
    }
  }, [editData]);

  const loadProducts = async () => {
    const data = await fetchAllProducts();
    setProducts(data);
  };

  const loadEditData = () => {
    if (editData) {
      setTanggalDistribusi(editData.tanggal_distribusi?.split("T")[0] || "");
      setNamaPemesan(editData.nama_pemesan || "");
      setSelectedMetode(editData.id_metode_pengiriman?.toString() || "");
      setSelectedStatus(editData.id_status?.toString() || "");
      setCatatan(editData.catatan_distribusi || "");
      
      // Map items from editData
      if (editData.items && editData.items.length > 0) {
        setProductItems(editData.items.map(item => ({
          id_detail_distribusi: item.id_detail,
          id_produk: item.id_produk,
          jumlah: item.jumlah?.toString() || "",
          nama_produk: item.nama_produk,
          ukuran_produk: item.ukuran_produk,
          nama_ukuran_satuan: item.nama_ukuran_satuan
        })));
      }
    }
  };

  const loadExistingReturns = async () => {
    if (editData?.id_distribusi) {
      const returns = await fetchReturnsByDistribution(editData.id_distribusi);
      setExistingReturns(returns);
    }
  };

  const addProductItem = () => {
    setProductItems([...productItems, { id_produk: "", jumlah: "" }]);
  };

  const getSelectedProductIds = (currentIndex) => {
    return productItems
    .filter((_, index) => index !== currentIndex)
    .map(item => item.id_produk)
    .filter(id => id !== "");
  };

  const getAvailableProducts = (currentIndex) => {
    const selectedIds = getSelectedProductIds(currentIndex);
    return products.filter(product => !selectedIds.includes(product.id_produk));
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

    const result = await updateDistribution(editData.id_distribusi, distributionData);

    setIsSubmitting(false);

    if (result) {
      alert("Data distribusi berhasil diperbarui!");
      if (onSuccess) onSuccess();
      onCloseForm();
    } else {
      alert("Gagal memperbarui data distribusi");
    }
  };

  // Return handlers
  const handleOpenReturnForm = () => {
    // Initialize return items from product items
    setReturnItems(productItems.map(item => ({
      id_detail_distribusi: item.id_detail_distribusi,
      id_produk: item.id_produk,
      nama_produk: item.nama_produk,
      ukuran_produk: item.ukuran_produk,
      nama_ukuran_satuan: item.nama_ukuran_satuan,
      jumlah_distribusi: parseInt(item.jumlah) || 0,
      jumlah_return: 0,
      selected: false
    })));
    setTanggalReturn(new Date().toISOString().split("T")[0]);
    setCatatanReturn("");
    setShowReturnForm(true);
  };

  const handleCloseReturnForm = () => {
    setShowReturnForm(false);
  };

  const updateReturnItem = (index, field, value) => {
    const updated = [...returnItems];
    updated[index][field] = value;
    setReturnItems(updated);
  };

  const handleSubmitReturn = async (e) => {
    e.preventDefault();

    if (!tanggalReturn) {
      alert("Tanggal return wajib diisi");
      return;
    }

    const selectedItems = returnItems.filter(item => 
      item.selected && item.jumlah_return > 0 && item.id_detail_distribusi
    );

    if (selectedItems.length === 0) {
      alert("Pilih minimal satu produk dan isi jumlah return");
      return;
    }

    // Validate return quantity
    for (const item of selectedItems) {
      if (item.jumlah_return > item.jumlah_distribusi) {
        alert(`Jumlah return untuk ${item.nama_produk} 
          tidak boleh melebihi jumlah distribusi (${item.jumlah_distribusi})`);
        return;
      }
    }

    setIsSubmittingReturn(true);

    const returnData = {
      tanggal_return: tanggalReturn,
      catatan_return: catatanReturn || null,
      items: selectedItems.map(item => ({
        id_detail_distribusi: item.id_detail_distribusi,
        jumlah_barang_return: parseInt(item.jumlah_return)
      }))
    };

    const result = await createReturn(returnData);

    setIsSubmittingReturn(false);

    if (result) {
      alert("Return barang berhasil dibuat!");
      setShowReturnForm(false);
      loadExistingReturns();
    } else {
      alert("Gagal membuat return barang");
    }
  };

  const totalJumlah = productItems.reduce((sum, item) => sum + (parseInt(item.jumlah) || 0), 0);

  return(
    <div className="form-data-distribution form-edit">
      <div className="form-header">
        <div>
          <IconEditProduct className="icon darkGreenIcon" />
          <p>Edit Data Distribusi</p>
        </div>
        <IconCancel className="icon" onClick={onCloseForm} />
      </div>

      {/* Return Form Modal */}
      {showReturnForm && (
        <div className="return-form-overlay">
          <div className="return-form-container">
            <div className="form-header">
              <p>Form Return Barang</p>
              <IconCancel className="icon" onClick={handleCloseReturnForm} />
            </div>
            <form className="return-form" onSubmit={handleSubmitReturn}>
              <div className="inputan">
                <label><IconKalender className="greenIcon" /> Tanggal Return</label>
                <input 
                  type="date" 
                  value={tanggalReturn}
                  onChange={(e) => setTanggalReturn(e.target.value)}
                  required
                />
              </div>
              
              <div className="return-items-list">
                <p className="label">Pilih Produk yang Direturn:</p>
                {returnItems.map((item, index) => (
                  <div className="return-item" key={index}>
                    <label className="checkbox-container">
                      <input 
                        type="checkbox"
                        checked={item.selected}
                        onChange={(e) => updateReturnItem(index, "selected", e.target.checked)}
                      />
                      <span className="product-name">
                        {item.nama_produk} {item.ukuran_produk}{item.nama_ukuran_satuan}
                      </span>
                      <span className="original-qty">(Distribusi: {item.jumlah_distribusi})</span>
                    </label>
                    {item.selected && (
                      <div className="return-qty">
                        <label>Jumlah Return:</label>
                        <input 
                          type="number"
                          min="1"
                          max={item.jumlah_distribusi}
                          value={item.jumlah_return}
                          onChange={(e) => updateReturnItem(index, "jumlah_return", parseInt(e.target.value) || 0)}
                          required
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="inputan">
                <label><IconKeterangan className="greenIcon" /> Catatan Return</label>
                <input 
                  type="text"
                  placeholder="Alasan return (opsional)"
                  value={catatanReturn}
                  onChange={(e) => setCatatanReturn(e.target.value)}
                />
              </div>

              <div className="button return-buttons">
                <button 
                  type="submit" 
                  className="base-btn green"
                  disabled={isSubmittingReturn}
                >
                  {isSubmittingReturn ? "Menyimpan..." : "Simpan Return"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

          {/* Existing Returns Display */}
          {existingReturns.length > 0 && (
            <div className="existing-returns">
              <p className="label">Riwayat Return:</p>
              <ul>
                {existingReturns.map((ret, idx) => (
                  <li key={idx}>
                    {ret.nama_produk} - {ret.jumlah_barang_return} unit 
                    ({new Date(ret.tanggal_return).toLocaleDateString("id-ID")})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="right-side">
          <div className="the-right-form">
            {productItems.map((item, index) => (
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
                    {getAvailableProducts(index).map((product) => (
                      <option key={product.id_produk} value={product.id_produk}>
                        {product.nama_produk} - {product.ukuran_produk}{product.nama_ukuran_satuan}
                      </option>
                    ))}
                    {item.id_produk && !getAvailableProducts(index).find(product => product.id_produk === item.id_produk) && (
                      <option value={item.id_produk}>
                        {products.find(product => product.id_produk === item.id_produk)?.nama_produk} - 
                        {products.find(product => product.id_produk === item.id_produk)?.ukuran_produk}
                        {products.find(product => product.id_produk === item.id_produk)?.nama_ukuran_satuan}
                      </option>
                    )}
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
                              {product?.nama_produk || item.nama_produk} - {product?.ukuran_produk || item.ukuran_produk}{product?.nama_ukuran_satuan || item.nama_ukuran_satuan}
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
          <div className="button edit-buttons">
            <button 
              type="button" 
              className="base-btn orange"
              onClick={handleOpenReturnForm}
            >
              Return Barang
            </button>
            <button 
              type="submit" 
              className="base-btn green"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormEditDistribution;
