import db from "../config/db.js";

const ProductModel = {
  getAll: async () => {
    const result = await db.query("SELECT * FROM product ORDER BY id_product DESC");
    return result.rows;
  },

  create: async (nama_product, ukuran_product, ukuran_satuan, kemasan_product, img_product) => {
    const result = await db.query(
      "INSERT INTO product (nama_product, ukuran_product, ukuran_satuan, kemasan_product, img_product) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nama_product, ukuran_product, ukuran_satuan, kemasan_product, img_product]
    );
    return result.rows[0];
  },

  update: async(nama_product, ukuran_product, ukuran_satuan, kemasan_product, img_product, id_product) => {
    const result = await db.query(
      "UPDATE product SET nama_product = $1, ukuran_product = $2, ukuran_satuan = $3, kemasan_product = $4, img_product = $5 WHERE id_product = $6 RETURNING *",
      [nama_product, ukuran_product, ukuran_satuan, kemasan_product, img_product, id_product]
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
