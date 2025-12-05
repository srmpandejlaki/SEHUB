import db from "../config/db.js";

async function getOrCreateProductCode(nama_product) {
  // cek apakah nama_produk sudah memiliki kode
  const check = await db.query(
    "SELECT kode_produk FROM product_code WHERE nama_product = $1",
    [nama_product]
  );

  if (check.rows.length > 0) {
    return check.rows[0].kode_produk; // sudah ada
  }

  // jika belum ada → generate kode baru
  const last = await db.query(
    "SELECT kode_produk FROM product_code ORDER BY kode_produk DESC LIMIT 1"
  );

  let newCode = "01";

  if (last.rows.length > 0) {
    const lastNumber = parseInt(last.rows[0].kode_produk);
    const nextNumber = lastNumber + 1;
    newCode = nextNumber.toString().padStart(2, "0");
  }

  // simpan kode baru
  await db.query(
    "INSERT INTO product_code (kode_produk, nama_product) VALUES ($1, $2)",
    [newCode, nama_product]
  );

  return newCode;
}

export default getOrCreateProductCode;
