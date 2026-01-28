import db from "../config/db-sqlite.js";



const MasterDataModel = {
  // Nama Produk
  getAllNamaProduk: async () => {
    const result = await db.query("SELECT * FROM nama_produk ORDER BY id_nama_produk");
    return result.rows;
  },
  createNamaProduk: async (nama_produk) => {
    const result = await db.query(
      "INSERT INTO nama_produk (nama_produk) VALUES ($1) RETURNING *",
      [nama_produk]
    );
    return result.rows[0];
  },
  updateNamaProduk: async (id, nama_produk) => {
    const result = await db.query(
      "UPDATE nama_produk SET nama_produk = $1 WHERE id_nama_produk = $2 RETURNING *",
      [nama_produk, id]
    );
    return result.rows[0];
  },
  deleteNamaProduk: async (id) => {
    const result = await db.query(
      "DELETE FROM nama_produk WHERE id_nama_produk = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },

  // Ukuran Satuan
  getAllUkuranSatuan: async () => {
    const result = await db.query("SELECT * FROM ukuran_satuan ORDER BY id_ukuran_satuan");
    return result.rows;
  },
  createUkuranSatuan: async (nama_ukuran_satuan) => {
    const result = await db.query(
      "INSERT INTO ukuran_satuan (nama_ukuran_satuan) VALUES ($1) RETURNING *",
      [nama_ukuran_satuan]
    );
    return result.rows[0];
  },
  updateUkuranSatuan: async (id, nama_ukuran_satuan) => {
    const result = await db.query(
      "UPDATE ukuran_satuan SET nama_ukuran_satuan = $1 WHERE id_ukuran_satuan = $2 RETURNING *",
      [nama_ukuran_satuan, id]
    );
    return result.rows[0];
  },
  deleteUkuranSatuan: async (id) => {
    const result = await db.query(
      "DELETE FROM ukuran_satuan WHERE id_ukuran_satuan = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },

  // Kemasan
  getAllKemasan: async () => {
    const result = await db.query("SELECT * FROM kemasan ORDER BY id_kemasan");
    return result.rows;
  },
  createKemasan: async (nama_kemasan) => {
    const result = await db.query(
      "INSERT INTO kemasan (nama_kemasan) VALUES ($1) RETURNING *",
      [nama_kemasan]
    );
    return result.rows[0];
  },
  updateKemasan: async (id, nama_kemasan) => {
    const result = await db.query(
      "UPDATE kemasan SET nama_kemasan = $1 WHERE id_kemasan = $2 RETURNING *",
      [nama_kemasan, id]
    );
    return result.rows[0];
  },
  deleteKemasan: async (id) => {
    const result = await db.query(
      "DELETE FROM kemasan WHERE id_kemasan = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },

  // Metode Pengiriman
  getAllMetodePengiriman: async () => {
    const result = await db.query("SELECT * FROM metode_pengiriman ORDER BY id_metode_pengiriman");
    return result.rows;
  },
  createMetodePengiriman: async (nama_metode) => {
    const result = await db.query(
      "INSERT INTO metode_pengiriman (nama_metode) VALUES ($1) RETURNING *",
      [nama_metode]
    );
    return result.rows[0];
  },
  updateMetodePengiriman: async (id, nama_metode) => {
    const result = await db.query(
      "UPDATE metode_pengiriman SET nama_metode = $1 WHERE id_metode_pengiriman = $2 RETURNING *",
      [nama_metode, id]
    );
    return result.rows[0];
  },
  deleteMetodePengiriman: async (id) => {
    const result = await db.query(
      "DELETE FROM metode_pengiriman WHERE id_metode_pengiriman = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },

  // Status Pengiriman
  getAllStatusPengiriman: async () => {
    const result = await db.query("SELECT * FROM status_pengiriman ORDER BY id_status");
    return result.rows;
  },
  createStatusPengiriman: async (nama_status) => {
    const result = await db.query(
      "INSERT INTO status_pengiriman (nama_status) VALUES ($1) RETURNING *",
      [nama_status]
    );
    return result.rows[0];
  },
  updateStatusPengiriman: async (id, nama_status) => {
    const result = await db.query(
      "UPDATE status_pengiriman SET nama_status = $1 WHERE id_status = $2 RETURNING *",
      [nama_status, id]
    );
    return result.rows[0];
  },
  deleteStatusPengiriman: async (id) => {
    const result = await db.query(
      "DELETE FROM status_pengiriman WHERE id_status = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },

  // Delete all data except users (pengguna table)
  deleteAllDataExceptUsers: async () => {
    try {
      // Delete in order to respect foreign key constraints
      // Delete the most dependent tables first, then parent tables
      
      // First, delete return-related data
      await db.query('DELETE FROM return_barang_detail');
      await db.query('DELETE FROM return_barang');
      
      // Delete stock adjustment details
      await db.query('DELETE FROM penyesuaian_stok_detail');
      await db.query('DELETE FROM penyesuaian_stok');
      
      // Then delete distribution details
      await db.query('DELETE FROM detail_distribusi');
      await db.query('DELETE FROM distribusi');
      
      // Delete inventory details
      await db.query('DELETE FROM detail_barang_masuk');
      await db.query('DELETE FROM barang_masuk');
      
      // Note: We keep master data (nama_produk, ukuran_satuan, kemasan, metode_pengiriman, status_pengiriman)
      // and pengguna table and produk table intact
      
      return { success: true, message: 'All data deleted successfully except users' };
    } catch (error) {
      console.error('Error deleting all data:', error);
      throw error;
    }
  },
};

export default MasterDataModel;
