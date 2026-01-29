import React, { useState, useEffect } from "react";
import IconEditProduct from "../../../assets/icon/flowbite_edit-outline.svg?react";
import IconCancel from "../../../assets/icon/material-symbols_cancel.svg?react";
import IconKalender from "../../../assets/icon/mdi_calendar-outline.svg?react";
import IconBotol1 from "../../../assets/icon/icon-park-outline_bottle-two.svg?react";
import IconBotol2 from "../../../assets/icon/Frame 27.svg?react";
import IconExpiredDate from "../../../assets/icon/fluent-mdl2_date-time-mirrored.svg?react";
import IconKeterangan from "../../../assets/icon/fluent_text-description-ltr-20-filled.svg?react";
import { fetchAllProducts } from "../../../utilities/api/products";
import { createInventory, updateInventory } from "../../../utilities/api/inventory";
import { useTranslation } from "../../../contexts/localContext";
import { useToast } from "../../../contexts/toastContext";

function FormDataInventory({ onCloseForm, onSuccess, editData = null, isEdit = false }) {
  const [products, setProducts] = useState([]);
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productItems, setProductItems] = useState([{ id_produk: "", jumlah: "", tanggal_expired: "" }]);

  const t = useTranslation();
  const { showToast } = useToast();

  // Fetch products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Pre-fill form when editing
  useEffect(() => {
    if (isEdit && editData) {
      // Format date for input (YYYY-MM-DD)
      const formatDateForInput = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0];
      };

      setTanggalMasuk(formatDateForInput(editData.tanggal_masuk));
      setCatatan(editData.catatan_barang_masuk || "");
      
      // Pre-fill product items
      if (editData.items && editData.items.length > 0) {
        const mappedItems = editData.items.map(item => ({
          id_produk: item.id_produk || "",
          jumlah: item.jumlah?.toString() || "",
          tanggal_expired: formatDateForInput(item.tanggal_expired)
        }));
        setProductItems(mappedItems);
      }
    }
  }, [isEdit, editData]);

  const loadProducts = async () => {
    const data = await fetchAllProducts();
    setProducts(data);
  };

  // Get list of already selected product IDs (except current row)
  const getSelectedProductIds = (currentIndex) => {
    return productItems
      .filter((_, index) => index !== currentIndex)
      .map(item => item.id_produk)
      .filter(id => id !== "");
  };

  // Get available products for a specific row (exclude already selected)
  const getAvailableProducts = (currentIndex) => {
    const selectedIds = getSelectedProductIds(currentIndex);
    return products.filter(product => !selectedIds.includes(product.id_produk));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi field umum
    if (!tanggalMasuk) {
      showToast("Mohon lengkapi tanggal masuk", 'warning');
      return;
    }

    // Validasi product items
    const validProducts = productItems.filter(item => item.id_produk && item.jumlah && item.tanggal_expired);
    if (validProducts.length === 0) {
      showToast("Mohon tambahkan minimal satu produk dengan jumlah dan tanggal expired", 'warning');
      return;
    }

    setIsSubmitting(true);

    const inventoryData = {
      tanggal_masuk: tanggalMasuk,
      catatan_barang_masuk: catatan || null,
      products: validProducts.map(item => ({
        id_produk: item.id_produk,
        jumlah: parseInt(item.jumlah),
        tanggal_expired: item.tanggal_expired
      }))
    };

    let result;
    if (isEdit && editData?.id_barang_masuk) {
      result = await updateInventory(editData.id_barang_masuk, inventoryData);
    } else {
      result = await createInventory(inventoryData);
    }
    
    setIsSubmitting(false);

    if (result) {
      showToast(isEdit ? "Data inventori berhasil diperbarui!" : "Data inventori berhasil disimpan!", 'success');
      if (onSuccess) onSuccess();
      onCloseForm();
    } else {
      showToast(isEdit ? "Gagal memperbarui data inventori" : "Gagal menyimpan data inventori", 'error');
    }
  };

  const handleAddProduct = () => {
    setProductItems([...productItems, { id_produk: "", jumlah: "", tanggal_expired: "" }]);
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

  return(
    <div className="form-data-inventori">
      <div className="form-header">
        <div>
          <IconEditProduct className="icon darkGreenIcon" />
          <p>{isEdit ? t("formEditInventory") : t("formInventory")}</p>
        </div>
        <IconCancel className="icon" onClick={onCloseForm} />
      </div>
      <form className="main-form" onSubmit={handleSubmit}>
        <div className="inputan">
          <label><IconKalender className="greenIcon" /> {t('date')}</label>
          <input 
            type="date" 
            value={tanggalMasuk}
            onChange={(e) => setTanggalMasuk(e.target.value)}
            required
          />
        </div>
        
        {productItems.map((item, index) => (
        <div className="product-item-row" key={index}>
          <div className="inputan">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label><IconBotol1 className="greenIcon" /> {t('productName')}</label>
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
              <option value="">-- {t('chooseProduct')} --</option>
              {getAvailableProducts(index).map((product) => (
                <option key={product.id_produk} value={product.id_produk}>
                  {product.nama_produk} - {product.ukuran_produk}{product.nama_ukuran_satuan}
                </option>
              ))}
              {/* Jika produk sudah dipilih di row ini, tetap tampilkan */}
              {item.id_produk && !getAvailableProducts(index).find(p => p.id_produk === item.id_produk) && (
                <option value={item.id_produk}>
                  {products.find(p => p.id_produk === item.id_produk)?.nama_produk} - 
                  {products.find(p => p.id_produk === item.id_produk)?.ukuran_produk}
                  {products.find(p => p.id_produk === item.id_produk)?.nama_ukuran_satuan}
                </option>
              )}
            </select>
          </div>
          <div className="double-form">
            <div className="inputan-double">
              <label className="longText"><IconExpiredDate className="greenIcon" /> {t('expiredDate')}</label>
              <input 
                type="date" 
                value={item.tanggal_expired}
                onChange={(e) => updateProductItem(index, "tanggal_expired", e.target.value)}
                required
              />
            </div>
            <div className="inputan">
              <label><IconBotol2 className="greenIcon" /> {t('quantity')}</label>
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
        </div>
        ))}
        
        <p className="add-product-link" onClick={handleAddProduct}>+ {t('addProduct')}</p>
        
        <div className="inputan">
          <label><IconKeterangan className="greenIcon" /> {t('note')}</label>
          <input 
            type="text" 
            placeholder={t('notesDesc')} 
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
            {isSubmitting ? t('saveDesc') : t('saveBtn')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormDataInventory;