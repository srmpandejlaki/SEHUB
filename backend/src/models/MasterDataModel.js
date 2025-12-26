import db from "../config/db.js";

const MasterDataModel = {
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

  // Metode Pengiriman
  getAllMetodePengiriman: async () => {
    const result = await db.query("SELECT * FROM metode_pengiriman ORDER BY id_metode_pengiriman");
    return result.rows;
  },

  // Status Pengiriman
  getAllStatusPengiriman: async () => {
    const result = await db.query("SELECT * FROM status_pengiriman ORDER BY id_status");
    return result.rows;
  },
};

export default MasterDataModel;
