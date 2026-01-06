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

  // Get appropriate label based on days until expired
  const getStatusLabel = (days) => {
    if (days < 0) return { text: "Sudah Kadaluarsa!", color: "redText" };
    if (days === 0) return { text: "Kadaluarsa Hari Ini!", color: "redText" };
    if (days <= 7) return { text: "Peringatan!", color: "redText" };
    return { text: "Perhatian", color: "orangeText" };
  };

  // Get expiry message
  const getExpiryMessage = (days) => {
    if (days < 0) return `sudah kadaluarsa ${Math.abs(days)} hari yang lalu`;
    if (days === 0) return "kadaluarsa hari ini";
    return `akan kadaluarsa dalam ${days} hari`;
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
        expiringProducts.slice(0, 5).map((product) => {
          const status = getStatusLabel(product.days_until_expired);
          return (
            <div className="notif-content" key={product.id_detail_barang_masuk}>
              <p className={status.color}>{status.text}</p>
              <p>
                {product.jumlah_barang_masuk} {product.nama_kemasan || "unit"} {product.nama_produk}{" "}
                {product.ukuran_produk}{product.nama_ukuran_satuan} {getExpiryMessage(product.days_until_expired)}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default NotificationSide;