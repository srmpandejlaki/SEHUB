import pool from "./db.js";

const dropAllTables = async () => {
  try {
    console.log("Dropping all tables...");
    
    // Drop tables in reverse dependency order
    await pool.query("DROP TABLE IF EXISTS return_barang_detail CASCADE");
    await pool.query("DROP TABLE IF EXISTS return_barang CASCADE");
    await pool.query("DROP TABLE IF EXISTS penyesuaian_stok_detail CASCADE");
    await pool.query("DROP TABLE IF EXISTS kondisi_stok CASCADE");
    await pool.query("DROP TABLE IF EXISTS penyesuaian_stok CASCADE");
    await pool.query("DROP TABLE IF EXISTS detail_distribusi CASCADE");
    await pool.query("DROP TABLE IF EXISTS distribusi CASCADE");
    await pool.query("DROP TABLE IF EXISTS status_pengiriman CASCADE");
    await pool.query("DROP TABLE IF EXISTS metode_pengiriman CASCADE");
    await pool.query("DROP TABLE IF EXISTS detail_barang_masuk CASCADE");
    await pool.query("DROP TABLE IF EXISTS barang_masuk CASCADE");
    await pool.query("DROP TABLE IF EXISTS produk CASCADE");
    await pool.query("DROP TABLE IF EXISTS nama_produk CASCADE");
    await pool.query("DROP TABLE IF EXISTS kemasan CASCADE");
    await pool.query("DROP TABLE IF EXISTS ukuran_satuan CASCADE");
    await pool.query("DROP TABLE IF EXISTS pengguna CASCADE");
    
    console.log("✅ All tables dropped successfully!");
    await pool.end();
  } catch (error) {
    console.error("❌ Error dropping tables:", error.message);
    await pool.end();
    process.exit(1);
  }
};

dropAllTables();
