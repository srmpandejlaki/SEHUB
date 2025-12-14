import db from "../config/db.js";
import generateId from "../utils/generateId.js";

const ProductModel = {
  getAll: async () => {
    const result = await db.query("SELECT * FROM produk ORDER BY kode_produk DESC");
    return result.rows;
  },

  create: async (kode_produk, nama_produk, ukuran_produk, ukuran_satuan, kemasan_produk, stok_minimum, path_gambar) => {
    const result = await db.query(
      `INSERT INTO produk (
        kode_produk, nama_produk, ukuran_produk, ukuran_satuan, kemasan_produk, stok_minimum, path_gambar
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [kode_produk, nama_produk, ukuran_produk, ukuran_satuan, kemasan_produk, stok_minimum, path_gambar]
    );

    return result.rows[0];
  },

  update: async (kode_produk, nama_produk, ukuran_produk, ukuran_satuan, kemasan_produk, stok_minimum, path_gambar) => {
    // 1. ambil data lama
    const oldData = await db.query(
      "SELECT * FROM produk WHERE id_product = $1",
      [id_product]
    );

    if (oldData.rows.length === 0) return null;

    const old = oldData.rows[0];

    // 2. tentukan gambar yang dipakai
    const finalImage = path_gambar !== undefined ? path_gambar : old.path_gambar;

    // 3. update data
    const result = await db.query(
      `UPDATE produk
       SET nama_produk = $1,
           ukuran_produk = $2,
           ukuran_satuan = $3,
           kemasan_produk = $4,
           stok_minimum = $5,
           path_gambar = $6
       WHERE kode_produk = $7
       RETURNING *`,
      [
        nama_produk,
        ukuran_produk,
        ukuran_satuan,
        kemasan_produk,
        stok_minimum,
        finalImage,
        kode_produk
      ]
    );

    return result.rows[0];
  },
};

export default ProductModel;
