import db from "../config/db.js";
import getOrCreateProductCode from "../utils/generateId.js";

const ProductModel = {
  getAll: async () => {
    const result = await db.query(`
      SELECT p.*, us.nama_ukuran_satuan, k.nama_kemasan 
      FROM produk p
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kemasan k ON p.id_kemasan = k.id_kemasan
      ORDER BY p.id_produk DESC
    `);
    return result.rows;
  },

  create: async (nama_produk, ukuran_produk, id_ukuran_satuan, id_kemasan, stok_minimum, path_gambar) => {
    // Generate id_produk dengan format: LS + kode_nama_produk + ukuran_produk
    const productCode = await getOrCreateProductCode(nama_produk);
    const id_produk = `LS${productCode}${ukuran_produk}`;

    const result = await db.query(
      `INSERT INTO produk (
        id_produk, nama_produk, ukuran_produk, id_ukuran_satuan, id_kemasan, stok_minimum, path_gambar, total_produk
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [id_produk, nama_produk, ukuran_produk, id_ukuran_satuan, id_kemasan, stok_minimum, path_gambar, 0]
    );

    return result.rows[0];
  },

  update: async (id_produk, nama_produk, ukuran_produk, id_ukuran_satuan, id_kemasan, stok_minimum, path_gambar) => {
    // 1. ambil data lama
    const oldData = await db.query(
      "SELECT * FROM produk WHERE id_produk = $1",
      [id_produk]
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
           id_ukuran_satuan = $3,
           id_kemasan = $4,
           stok_minimum = $5,
           path_gambar = $6
       WHERE id_produk = $7
       RETURNING *`,
      [
        nama_produk,
        ukuran_produk,
        id_ukuran_satuan,
        id_kemasan,
        stok_minimum,
        finalImage,
        id_produk
      ]
    );

    return result.rows[0];
  },

  delete: async (id_produk) => {
    const result = await db.query("DELETE FROM produk WHERE id_produk = $1 RETURNING *", [id_produk]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  },
};

export default ProductModel;


