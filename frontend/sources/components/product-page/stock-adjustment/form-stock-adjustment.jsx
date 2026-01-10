import React, { useState, useEffect } from "react";
import IconEditProduct from "../../../assets/icon/flowbite_edit-outline.svg?react";
import IconCancel from "../../../assets/icon/material-symbols_cancel.svg?react";
import {
  fetchInventoryForAdjustment,
  createAdjustment
} from "../../../utilities/api/stock-adjustment";

function FormStockAdjustment({ onCloseForm, onSuccess }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [catatan, setCatatan] = useState("");

  // === Adjustment per PRODUK ===
  const [adjustmentData, setAdjustmentData] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchInventoryForAdjustment();
      setProducts(data);

      const initialData = {};

      data.forEach(product => {
        const stokSistem = product.items.reduce(
          (sum, item) => sum + item.stok_sekarang,
          0
        );

        initialData[product.id_produk] = {
          isChecked: false,
          stokSistem,
          stokGudang: "",
          alasan: ""
        };
      });

      setAdjustmentData(initialData);

      console.log("Data adjustment:", adjustmentData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
  };

  const handleProductCheckboxChange = (id_produk) => {
    setAdjustmentData(
      prev => ({
        ...prev,
        [id_produk]: {
          ...prev[id_produk],
          isChecked: !prev[id_produk].isChecked,
          stokGudang: !prev[id_produk].isChecked ? prev[id_produk].stokSistem.toString() : "",
          alasan: ""
        }
      })
    );
  };

  const handleJumlahChange = (id_produk, value) => {
    setAdjustmentData(prev => ({
      ...prev,
      [id_produk]: {
        ...prev[id_produk],
        stokGudang: value,
        isChecked: false
      }
    }));
  };

  const handleAlasanChange = (id_produk, value) => {
    setAdjustmentData(prev => ({
      ...prev,
      [id_produk]: {
        ...prev[id_produk],
        alasan: value
      }
    }));
  };

  const getStokGudangStatus = (id_produk) => {
    const data = adjustmentData[id_produk];
    if (!data || data.stokGudang === "") return "-";

    const selisih =
      parseInt(data.stokGudang) - parseInt(data.stokSistem);

    if (selisih === 0 || data.isChecked) return "SESUAI";
    if (selisih > 0) return `+${selisih}`;
    return selisih.toString();
  };

  const handleSubmit = async () => {
    const items = Object.keys(adjustmentData)
      .map(id_produk => {
        const data = adjustmentData[id_produk];
        if (data.stokGudang === "") return null;

        return {
          id_produk,
          stok_sistem: data.stokSistem,
          stok_gudang: parseInt(data.stokGudang),
          alasan: data.alasan || null
        };
      })
      .filter(Boolean);

    if (items.length === 0) {
      alert("Mohon isi minimal satu data penyesuaian");
      return;
    }

    if (
      !window.confirm(
        `Akan dilakukan penyesuaian untuk ${items.length} produk. Lanjutkan?`
      )
    ) {
      return;
    }

    setIsSubmitting(true);
    const result = await createAdjustment(catatan || null, items);
    setIsSubmitting(false);

    if (result?.success) {
      alert("Penyesuaian stok berhasil!");
      onSuccess?.();
    } else {
      alert("Gagal menyimpan penyesuaian stok");
    }
  };

  return (
    <div className="form-stock-adjustment">
      <div className="form-header">
        <div>
          <IconEditProduct className="icon darkGreenIcon" />
          <p>Penyesuaian Stok Gudang</p>
        </div>
        <IconCancel
          className="icon"
          onClick={onCloseForm}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="form-content">
        {products.map((product) => (
          <div className="product-card">
            <div className="product-info">
              <div className="product-left">
                <span className="product-code">
                  {product.id_produk}
                </span>
                <span className="product-name">
                  {product.nama_produk}{" "}
                  {product.ukuran_produk}
                  {product.nama_ukuran_satuan}
                </span>
              </div>

              <div className="product-right">
                <label className="master-checkbox">
                  <input
                    type="checkbox"
                    checked={adjustmentData[product.id_produk]?.isChecked || false}
                    onChange={() => handleProductCheckboxChange(product.id_produk)}
                  />
                  Sesuai
                </label>
              </div>
            </div>

            {/* TABLE */}
            <table className="adjustment-table">
              <thead>
                <tr>
                  <th className="center">Stok Sistem</th>
                  <th>Jumlah di Gudang</th>
                  <th>Alasan Tidak Sesuai</th>
                  <th className="center">Stok Gudang</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="center">
                    {adjustmentData[product.id_produk]?.stokSistem}{" "}
                    botol
                  </td>
                  <td>
                    <input
                      type="number"
                      value={adjustmentData[product.id_produk]?.stokGudang || ""}
                      onChange={e => handleJumlahChange(product.id_produk,e.target.value)}
                      min="0"
                      disabled={adjustmentData[product.id_produk]?.isChecked}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={adjustmentData[product.id_produk]?.alasan || ""}
                      onChange={e => handleAlasanChange(product.id_produk,e.target.value)}
                    />
                  </td>
                  <td className="center">
                    {getStokGudangStatus(product.id_produk)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}

        {/* CATATAN */}
        <div className="catatan-section">
          <label>Catatan Penyesuaian (opsional)</label>
          <input
            type="text"
            value={catatan}
            onChange={e => setCatatan(e.target.value)}
            placeholder="Masukkan catatan..."
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="form-footer">
        <button
          className="base-btn green"
          onClick={handleSubmit}
          disabled={isSubmitting || loading}
        >
          {isSubmitting ? "Menyimpan..." : "Sesuaikan Sekarang"}
        </button>
      </div>
    </div>
  );
}

export default FormStockAdjustment;
