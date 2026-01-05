import React from "react";
import IconReminder from "../../assets/icon/carbon_reminder.svg?react";

function NotificationSide({ expiringProducts = [] }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return(
    <div className="notification-side">
      <div className="notif-title">
        <IconReminder className="icon onPanel blackIcon" />
        <p>Pemberitahuan</p>
      </div>
      {expiringProducts.length === 0 ? (
        <div className="notif-content">
          <p>Tidak ada produk yang akan kadaluarsa dalam 30 hari ke depan.</p>
        </div>
      ) : (
        expiringProducts.slice(0, 5).map((product) => (
          <div className="notif-content" key={product.id_detail_barang_masuk}>
            <p className={product.days_until_expired <= 7 ? "redText" : "orangeText"}>
              {product.days_until_expired <= 7 ? "Peringatan!" : "Perhatian"}
            </p>
            <p>
              {product.jumlah_barang_masuk} {product.nama_kemasan || "unit"} {product.nama_produk}{" "}
              {product.ukuran_produk}{product.nama_ukuran_satuan} akan kadaluarsa pada{" "}
              {formatDate(product.tanggal_expired)} ({product.days_until_expired} hari lagi)
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationSide;