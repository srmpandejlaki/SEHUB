import db from "../config/db.js";

async function getOrCreateProductCode(nama_produk) {
  // 1. Cek apakah nama_produk sudah ada di tabel produk
  const existing = await db.query(
    "SELECT kode_produk FROM produk WHERE nama_produk = $1 LIMIT 1",
    [nama_produk]
  );

  if (existing.rows.length > 0) {
    // Ekstrak kode produk (2 karakter setelah "LS") dari kode yang sudah ada
    // Contoh: dari "LS01330" ambil "01"
    const existingCode = existing.rows[0].kode_produk;
    return existingCode.substring(2, 4);
  }

  // 2. Jika belum ada, cari kode tertinggi yang sudah dipakai
  const allProducts = await db.query(
    "SELECT DISTINCT SUBSTRING(kode_produk FROM 3 FOR 2) as code FROM produk WHERE kode_produk LIKE 'LS%'"
  );

  if (allProducts.rows.length === 0) {
    // Belum ada produk sama sekali, mulai dari 01
    return "01";
  }

  // 3. Cari kode tertinggi dan tambah 1
  const codes = allProducts.rows.map(row => parseInt(row.code) || 0);
  const maxCode = Math.max(...codes);
  const newCode = (maxCode + 1).toString().padStart(2, "0");

  return newCode;
}

export default getOrCreateProductCode;


