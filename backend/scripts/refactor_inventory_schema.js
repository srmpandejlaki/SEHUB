import db from "../src/config/db.js";

const migrate = async () => {
  try {
    console.log("Starting Refactor: Drop and Recreate detail_barang_masuk...");

    // 1. Drop Table
    await db.query(`DROP TABLE IF EXISTS detail_barang_masuk CASCADE`);
    console.log("Dropped table detail_barang_masuk.");

    // 2. Create Table
    const createQuery = `
      CREATE TABLE IF NOT EXISTS detail_barang_masuk (
        id_detail_barang_masuk SERIAL PRIMARY KEY,
        id_barang_masuk INTEGER REFERENCES barang_masuk(id_barang_masuk) ON DELETE CASCADE,
        id_produk VARCHAR(20) REFERENCES produk(id_produk) ON DELETE CASCADE,
        jumlah_barang_masuk INTEGER NOT NULL, 
        stok_sekarang INTEGER NOT NULL,
        tanggal_expired DATE NOT NULL
      )
    `;
    await db.query(createQuery);
    console.log("Created table detail_barang_masuk with new schema.");

    console.log("Migration completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
};

migrate();
