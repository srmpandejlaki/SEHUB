import React from "react";

function DashboardOwner({ user }) {
  // Get current date formatted
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <div className="content">
      <div className="opening">
        <h3>Selamat Datang, {user?.nama_pengguna || "Pengguna"}!</h3>
        <p>{getCurrentDate()}</p>
      </div>
    </div>
  );
}

export default DashboardOwner;