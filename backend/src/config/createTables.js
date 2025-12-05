import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

async function createTables() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log("🔍 Mengecek dan membuat tabel jika belum ada...");

    // Tabel Users
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id_user SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        jabatan VARCHAR(50) NOT NULL,
        status VARCHAR(15) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabel Product
    await pool.query(`
      CREATE TABLE IF NOT EXISTS product (
        id_product VARCHAR(100) PRIMARY KEY,
        nama_product VARCHAR(100) NOT NULL,
        ukuran_product VARCHAR(20) NOT NULL,
        ukuran_satuan VARCHAR(20) NOT NULL,
        kemasan_product VARCHAR(20) NOT NULL,
        img_product VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabel Product Code
    await pool.query(`
      CREATE TABLE IF NOT EXISTS product_code (
        kode_produk VARCHAR(3) PRIMARY KEY,
        nama_product VARCHAR(100) UNIQUE
      );
    `);

    console.log("✅ Semua tabel berhasil dicek/dibuat.");
  } catch (error) {
    console.error("❌ Error membuat tabel:", error);
  } finally {
    await pool.end();
    console.log("🔌 Koneksi closed.");
  }
}

createTables();
