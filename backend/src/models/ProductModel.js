import db from "../config/db.js";
import generateId from "../utils/generateId.js";

const ProductModel = {
  getAll: async () => {
    const result = await db.query("SELECT * FROM product ORDER BY id_product DESC");
    return result.rows;
  },

  create: async (nama_product, ukuran_product, ukuran_satuan, kemasan_product, minimum_stock, img_product) => {
    const kode_produk = await generateId(nama_product);
    const id_product = `LS${kode_produk}${ukuran_product}`;

    const result = await db.query(
      `INSERT INTO product (
        id_product, nama_product, ukuran_product, ukuran_satuan, kemasan_product, minimum_stock, img_product
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [id_product, nama_product, ukuran_product, ukuran_satuan, kemasan_product, minimum_stock, img_product]
    );

    return result.rows[0];
  },

  update: async (id_product, nama_product, ukuran_product, ukuran_satuan, kemasan_product, minimum_stock, img_product) => {
    // 1. ambil data lama
    const oldData = await db.query(
      "SELECT * FROM product WHERE id_product = $1",
      [id_product]
    );

    if (oldData.rows.length === 0) return null;

    const old = oldData.rows[0];

    // 2. tentukan gambar yang dipakai
    const finalImage = img_product !== undefined ? img_product : old.img_product;

    // 3. update data
    const result = await db.query(
      `UPDATE product
       SET nama_product = $1,
           ukuran_product = $2,
           ukuran_satuan = $3,
           kemasan_product = $4,
           minimum_stock = $5,
           img_product = $6
       WHERE id_product = $7
       RETURNING *`,
      [
        nama_product,
        ukuran_product,
        ukuran_satuan,
        kemasan_product,
        minimum_stock,
        finalImage,
        id_product
      ]
    );

    return result.rows[0];
  },

  delete: async (id_product) => {
    const result = await db.query("DELETE FROM product WHERE id_product = $1 RETURNING *", [id_product]);
    return result.rows[0];
  },

  deleteAll: async () => {
    const result = await db.query("DELETE FROM product RETURNING *");
    return result.rows;
  },
};

export default ProductModel;
