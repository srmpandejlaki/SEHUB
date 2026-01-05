import React from "react";
import logoSehub from "../../assets/public/sehub.png";

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-image"></div>
      <div className="login-section">
        <div className="login-text">
          <img src={logoSehub} alt="" />
          <h3>Aplikasi Pendataan Inventori dan Distribusi Produk L' Arbre Seho</h3>
        </div>
        <div className="login-form">
          <div className="inputan">
            <label htmlFor="">Username</label>
            <input type="text" placeholder="Masukkan username" />
          </div>
          <div className="inputan">
            <label htmlFor="">Password</label>
            <input type="password" placeholder="Masukkan password" />
          </div>
          <div className="button">
            <div className="base-btn black">
              <p>Login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;