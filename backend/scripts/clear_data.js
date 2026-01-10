import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

async function clearData() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log("⚠️  MEMULAI PEMBERSIHAN DATA (KECUALI PENGGUNA)...");

    // List all tables to clear (excluding 'pengguna')
    const tables = [
      'return_barang_detail',
      'return_barang',
      'penyesuaian_stok_detail',
      'penyesuaian_stok',
      'detail_distribusi',
      'distribusi',
      'detail_barang_masuk',
      'barang_masuk',
      'produk',
      'nama_produk',
      'ukuran_satuan',
      'kemasan',
      'metode_pengiriman',
      'status_pengiriman',
      'kondisi_stok'
    ];

    // Build TRUNCATE command
    const query = `TRUNCATE ${tables.join(', ')} RESTART IDENTITY CASCADE;`;

    console.log("Menjalankan query:", query);
    await pool.query(query);

    console.log("✅ Berhasil membersihkan semua data (kecuali pengguna).");
  } catch (error) {
    console.error("❌ Error saat membersihkan data:", error);
  } finally {
    await pool.end();
    console.log("🔌 Koneksi closed.");
  }
}

clearData();
