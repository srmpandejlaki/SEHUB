import React from "react";

function LaporanSehub({ user }) {
  return (
    <div className="content laporan">
      <div className="opening">
        <h3>Selamat Datang, {user?.nama_pengguna || "Pengguna"}!</h3>
        <p>Halaman Laporan SEHUB</p>
      </div>
      <div className="laporan-content">
        <div className="info-card">
          <h4>Akses Terbatas</h4>
          <p>Anda login sebagai <strong>Non-Admin</strong>.</p>
          <p>Halaman ini menampilkan laporan dan informasi terkait produk SEHUB.</p>
        </div>
        {/* Konten laporan bisa ditambahkan di sini */}
      </div>
    </div>
  );
}

export default LaporanSehub;
