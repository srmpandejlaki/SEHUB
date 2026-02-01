import db from "../config/db-sqlite.js";
import getOrCreateProductCode from "../utils/generateId.js";

const ProductModel = {
  getAll: async () => {
    const result = await db.query(`
      SELECT p.*, us.nama_ukuran_satuan, k.nama_kemasan, n.nama_produk 
      FROM produk p
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kemasan k ON p.id_kemasan = k.id_kemasan
      LEFT JOIN nama_produk n ON p.id_nama_produk = n.id_nama_produk
      ORDER BY p.id_produk DESC
    `);
    return result.rows;
  },

  create: async (id_nama_produk, ukuran_produk, id_ukuran_satuan, id_kemasan, stok_minimum, path_gambar) => {
    // Generate id_produk dengan format: LS + kode_nama_produk + ukuran_produk
    const productCode = await getOrCreateProductCode(id_nama_produk);
    const id_produk = `LS${productCode}${ukuran_produk}`;

    const result = await db.query(
      `INSERT INTO produk (
        id_produk, id_nama_produk, ukuran_produk, id_ukuran_satuan, id_kemasan, stok_minimum, path_gambar
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [id_produk, id_nama_produk, ukuran_produk, id_ukuran_satuan, id_kemasan, stok_minimum, path_gambar]
    );

    return result.rows[0];
  },

  update: async (id_produk, id_nama_produk, ukuran_produk, id_ukuran_satuan, id_kemasan, stok_minimum, path_gambar) => {
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
       SET id_nama_produk = $1,
           ukuran_produk = $2,
           id_ukuran_satuan = $3,
           id_kemasan = $4,
           stok_minimum = $5,
           path_gambar = $6
       WHERE id_produk = $7
       RETURNING *`,
      [
        id_nama_produk,
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

  // Get all products with calculated stock and distribution
  getAllWithStock: async () => {
    const result = await db.query(`
      SELECT 
        p.id_produk,
        p.id_nama_produk,
        p.id_ukuran_satuan,
        p.id_kemasan,
        p.ukuran_produk,
        p.stok_minimum,
        p.path_gambar,
        n.nama_produk,
        us.nama_ukuran_satuan,
        k.nama_kemasan,
        COALESCE(inv.stok_sekarang, 0) as stok_sekarang,
        COALESCE(dist_today.distribusi_hari_ini, 0) as distribusi_hari_ini
      FROM produk p
      LEFT JOIN nama_produk n ON p.id_nama_produk = n.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kemasan k ON p.id_kemasan = k.id_kemasan
      LEFT JOIN (
        SELECT 
          id_produk, 
          SUM(stok_sekarang) as stok_sekarang
        FROM detail_barang_masuk
        GROUP BY id_produk
      ) inv ON p.id_produk = inv.id_produk
      LEFT JOIN (
        SELECT 
          dd.id_produk, 
          SUM(dd.jumlah_barang_distribusi) as distribusi_hari_ini
        FROM detail_distribusi dd
        JOIN distribusi d ON dd.id_distribusi = d.id_distribusi
        WHERE DATE(d.tanggal_distribusi) = CURRENT_DATE
        GROUP BY dd.id_produk
      ) dist_today ON p.id_produk = dist_today.id_produk
      ORDER BY p.id_produk DESC
    `);
    return result.rows;
  },
};

export default ProductModel;


