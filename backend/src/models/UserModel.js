import db from "../config/db.js";

const UserModel = {
  getAll: async () => {
    const result = await db.query("SELECT * FROM pengguna ORDER BY id_pengguna DESC");
    return result.rows;
  },

  getById: async (id_pengguna) => {
    const result = await db.query("SELECT * FROM pengguna WHERE id_pengguna = $1", [id_pengguna]);
    return result.rows[0];
  },

  create: async (nama_pengguna, email, jabatan, peran, kata_sandi) => {
    const result = await db.query(
      "INSERT INTO pengguna (nama_pengguna, email, jabatan, peran, kata_sandi) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nama_pengguna, email, jabatan, peran, kata_sandi]
    );
    return result.rows[0];
  },

  update: async(nama_pengguna, email, jabatan, peran, kata_sandi, id_pengguna) => {
    const result = await db.query(
      "UPDATE pengguna SET nama_pengguna = $1, email = $2, jabatan = $3, peran = $4, kata_sandi = $5 WHERE id_pengguna = $6 RETURNING *",
      [nama_pengguna, email, jabatan, peran, kata_sandi, id_pengguna]
    );
    return result.rows[0];
  },

  delete: async (id_pengguna) => {
    const result = await db.query("DELETE FROM pengguna WHERE id_pengguna = $1 RETURNING *", [id_pengguna]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },

  deleteAll: async () => {
    const result = await db.query("DELETE FROM pengguna RETURNING *");
    return result.rows;
  },
};

export default UserModel;
