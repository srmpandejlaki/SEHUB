import db from "../config/db.js";

const UserModel = {
  getAll: async () => {
    const result = await db.query("SELECT * FROM users ORDER BY id_user DESC");
    return result.rows;
  },

  getById: async (id_user) => {
    const result = await db.query("SELECT * FROM users WHERE id_user = $1", [id_user]);
    return result.rows[0];
  },

  create: async (id_user, name, email, jabatan, status, password) => {
    const result = await db.query(
      "INSERT INTO users (id_user, name, email, jabatan, status, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id_user, name, email, jabatan, status, password]
    );
    return result.rows[0];
  },

  update: async(name, email, jabatan, status, password, id_user) => {
    const result = await db.query(
      "UPDATE users SET name = $1, email = $2, jabatan = $3, status = $4, password = $5 WHERE id_user = $6 RETURNING *",
      [name, email, jabatan, status, password, id_user]
    );
    return result.rows[0];
  },

  delete: async (id_user) => {
    const result = await db.query("DELETE FROM users WHERE id_user = $1 RETURNING *", [id_user]);
    return result.rows[0];
  },

  deleteAll: async () => {
    const result = await db.query("DELETE FROM users RETURNING *");
    return result.rows;
  },
};

export default UserModel;
