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

    // 1. Tabel Pengguna
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pengguna (
        id_pengguna SERIAL PRIMARY KEY,
        nama_pengguna VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        jabatan VARCHAR(50) NOT NULL,
        is_admin BOOLEAN DEFAULT TRUE,
        kata_sandi VARCHAR(10) NOT NULL
      );
    `);

    // 2. Tabel Ukuran Satuan
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ukuran_satuan (
        id_ukuran_satuan SERIAL PRIMARY KEY,
        nama_ukuran_satuan VARCHAR(20) NOT NULL
      );
    `);

    // 3. Tabel Kemasan
    await pool.query(`
      CREATE TABLE IF NOT EXISTS kemasan (
        id_kemasan SERIAL PRIMARY KEY,
        nama_kemasan VARCHAR(50) NOT NULL
      );
    `);

    // 4. Tabel Nama Produk
    await pool.query(`
      CREATE TABLE IF NOT EXISTS nama_produk (
        id_nama_produk SERIAL PRIMARY KEY,
        nama_produk VARCHAR(100) NOT NULL
      );
    `);

    // 5. Tabel Produk
    await pool.query(`
      CREATE TABLE IF NOT EXISTS produk (
        id_produk VARCHAR(10) PRIMARY KEY,
        id_nama_produk INT REFERENCES nama_produk(id_nama_produk),
        ukuran_produk VARCHAR(20) NOT NULL,
        id_ukuran_satuan INT REFERENCES ukuran_satuan(id_ukuran_satuan),
        id_kemasan INT REFERENCES kemasan(id_kemasan),
        stok_minimum INT NOT NULL DEFAULT 0,
        path_gambar VARCHAR(255)
      );
    `);

    // 6. Tabel Barang Masuk
    await pool.query(`
      CREATE TABLE IF NOT EXISTS barang_masuk (
        id_barang_masuk SERIAL PRIMARY KEY,
        tanggal_masuk DATE NOT NULL,
        catatan_barang_masuk VARCHAR(255)
      );
    `);

    // 7. Tabel Detail Barang Masuk
    await pool.query(`
      CREATE TABLE IF NOT EXISTS detail_barang_masuk (
        id_detail_barang_masuk SERIAL PRIMARY KEY,
        id_barang_masuk INT NOT NULL REFERENCES barang_masuk(id_barang_masuk),
        id_produk VARCHAR(10) NOT NULL REFERENCES produk(id_produk),
        jumlah_barang_masuk INT NOT NULL,
        tanggal_expired DATE NOT NULL
      );
    `);

    // 8. Tabel Metode Pengiriman
    await pool.query(`
      CREATE TABLE IF NOT EXISTS metode_pengiriman (
        id_metode_pengiriman SERIAL PRIMARY KEY,
        nama_metode VARCHAR(50) NOT NULL
      );
    `);

    // 9. Tabel Status Pengiriman
    await pool.query(`
      CREATE TABLE IF NOT EXISTS status_pengiriman (
        id_status SERIAL PRIMARY KEY,
        nama_status VARCHAR(50) NOT NULL
      );
    `);

    // 10. Tabel Distribusi
    await pool.query(`
      CREATE TABLE IF NOT EXISTS distribusi (
        id_distribusi SERIAL PRIMARY KEY,
        tanggal_distribusi DATE NOT NULL,
        nama_pemesan VARCHAR(100) NOT NULL,
        id_metode_pengiriman INT REFERENCES metode_pengiriman(id_metode_pengiriman),
        id_status INT REFERENCES status_pengiriman(id_status),
        catatan_distribusi VARCHAR(255)
      );
    `);

    // 11. Tabel Detail Distribusi
    await pool.query(`
      CREATE TABLE IF NOT EXISTS detail_distribusi (
        id_detail_distribusi SERIAL PRIMARY KEY,
        id_distribusi INT NOT NULL REFERENCES distribusi(id_distribusi),
        id_produk VARCHAR(10) NOT NULL REFERENCES produk(id_produk),
        jumlah_barang_distribusi INT NOT NULL
      );
    `);

    // 12. Tabel Penyesuaian Stok
    await pool.query(`
      CREATE TABLE IF NOT EXISTS penyesuaian_stok (
        id_penyesuaian_stok SERIAL PRIMARY KEY,
        tanggal_penyesuaian DATE NOT NULL,
        catatan_penyesuaian VARCHAR(255)
      );
    `);

    // 13. Tabel Kondisi Stok
    await pool.query(`
      CREATE TABLE IF NOT EXISTS kondisi_stok (
        id_kondisi_stok SERIAL PRIMARY KEY,
        nama_kondisi VARCHAR(50) NOT NULL
      );
    `);

    // 14. Tabel Penyesuaian Stok Detail
    await pool.query(`
      CREATE TABLE IF NOT EXISTS penyesuaian_stok_detail (
        id_detail_penyesuaian SERIAL PRIMARY KEY,
        id_penyesuaian_stok INT NOT NULL REFERENCES penyesuaian_stok(id_penyesuaian_stok),
        id_produk VARCHAR(10) NOT NULL REFERENCES produk(id_produk),
        id_kondisi_stok INT NOT NULL REFERENCES kondisi_stok(id_kondisi_stok),
        stok_gudang INT NOT NULL,
        stok_sistem INT NOT NULL
      );
    `);

    // 15. Tabel Return Barang
    await pool.query(`
      CREATE TABLE IF NOT EXISTS return_barang (
        id_return SERIAL PRIMARY KEY,
        tanggal_return DATE NOT NULL,
        catatan_return VARCHAR(255)
      );
    `);

    // 16. Tabel Return Barang Detail
    await pool.query(`
      CREATE TABLE IF NOT EXISTS return_barang_detail (
        id_return_barang_detail SERIAL PRIMARY KEY,
        id_return INT NOT NULL REFERENCES return_barang(id_return),
        id_detail_distribusi INT NOT NULL REFERENCES detail_distribusi(id_detail_distribusi),
        jumlah_barang_return INT NOT NULL
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

