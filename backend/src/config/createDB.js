import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

async function initDatabase() {
  const dbName = "sehub_db";

  // Koneksi ke database default (postgres)
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "postgres",
  });

  try {
    // Cek apakah database sudah ada
    const checkDb = await pool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );

    if (checkDb.rowCount === 0) {
      console.log(`Database "${dbName}" belum ada. Membuat...`);

      // Membuat database baru
      await pool.query(`CREATE DATABASE "${dbName}"`);
      console.log("Database berhasil dibuat!");
    } else {
      console.log(`Database "${dbName}" sudah ada.`);
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await pool.end();
  }
}

initDatabase();
