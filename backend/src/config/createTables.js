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

    // Tabel Pengguna
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pengguna (
        id_pengguna SERIAL PRIMARY KEY,
        nama_pengguna VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        jabatan VARCHAR(50) NOT NULL,
        peran VARCHAR(15) NOT NULL,
        kata_sandi VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabel Produk
    await pool.query(`
      CREATE TABLE IF NOT EXISTS produk (
        kode_produk VARCHAR(30) PRIMARY KEY,
        nama_produk VARCHAR(100) NOT NULL,
        ukuran_produk VARCHAR(20) NOT NULL,
        ukuran_satuan VARCHAR(20) NOT NULL,
        kemasan_produk VARCHAR(20) NOT NULL,
        stok_minimum INT NOT NULL,
        path_gambar VARCHAR(255) NOT NULL
      );
    `);

    // Tabel Barang Masuk
    await pool.query(`
      CREATE TABLE IF NOT EXISTS barang_masuk (
        id_barang_masuk SERIAL PRIMARY KEY,
        id_pengguna INT NOT NULL,
        tanggal_masuk DATE NOT NULL,
        catatan VARCHAR(255),
        FOREIGN KEY (id_pengguna) REFERENCES pengguna(id_pengguna)
      );
    `);

    // Tabel Detail Barang Masuk
    await pool.query(`
      CREATE TABLE IF NOT EXISTS detail_barang_masuk (
        id_detail_barang_masuk SERIAL PRIMARY KEY,
        id_barang_masuk INT NOT NULL,
        kode_produk VARCHAR(30) NOT NULL,
        jumlah INT NOT NULL,
        tanggal_expired DATE NOT NULL,
        FOREIGN KEY (id_barang_masuk) REFERENCES barang_masuk(id_barang_masuk),
        FOREIGN KEY (kode_produk) REFERENCES produk(kode_produk)
      );
    `);

    // Tabel Distribusi
    await pool.query(`
      CREATE TABLE IF NOT EXISTS distribusi (
        id_distribusi SERIAL PRIMARY KEY,
        id_pengguna INT NOT NULL,
        tanggal_distribusi DATE NOT NULL,
        nama_pemesan VARCHAR(100) NOT NULL,
        metode_pengiriman VARCHAR(50) NOT NULL,
        status_pengiriman VARCHAR(50) NOT NULL,
        FOREIGN KEY (id_pengguna) REFERENCES pengguna(id_pengguna)
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
