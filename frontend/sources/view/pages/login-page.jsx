import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoSehub from "../../assets/public/sehub.png";
import coverLogin from "../../assets/public/cover-login.png";
import { loginUser } from "../../utilities/api/user";

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage("Email dan password wajib diisi");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const result = await loginUser(email, password);

    setIsLoading(false);

    if (result.success) {
      // Simpan user ke localStorage
      localStorage.setItem("user", JSON.stringify(result.data));
      
      // Panggil callback untuk update state di App
      if (onLoginSuccess) {
        onLoginSuccess(result.data);
      }

      // Redirect berdasarkan role
      if (result.data.is_admin) {
        navigate("/dashboard");
      } else {
        navigate("/dashboard-owner");
      }
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-image">
        <img src={coverLogin} alt="Produk L' Arbre Seho" />
      </div>
      <div className="login-section">
        <div className="login-text">
          <img src={logoSehub} alt="Logo SEHUB" />
          <h3>Aplikasi Pengelolaan Inventori dan Distribusi Produk L' Arbre Seho</h3>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="inputan">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="Masukkan email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="inputan">
            <label htmlFor="password">Kata Sandi</label>
            <input 
              type="password" 
              id="password"
              placeholder="Masukkan kata sandi" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="button">
            <button 
              type="submit" 
              className="base-btn black"
              disabled={isLoading}
            >
              <p>{isLoading ? "Memproses..." : "Masuk"}</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;