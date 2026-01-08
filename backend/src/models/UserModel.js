import db from "../config/db.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const UserModel = {
  getAll: async () => {
    const result = await db.query("SELECT id_pengguna, nama_pengguna, email, jabatan, is_admin FROM pengguna ORDER BY id_pengguna DESC");
    return result.rows;
  },

  login: async (email, kata_sandi) => {
    const result = await db.query(
      "SELECT * FROM pengguna WHERE email = $1",
      [email]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const user = result.rows[0];
    
    // Compare password with hash
    const isValidPassword = await bcrypt.compare(kata_sandi, user.kata_sandi);
    
    if (!isValidPassword) {
      return null;
    }
    
    // Return user without password
    const { kata_sandi: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  getById: async (id_pengguna) => {
    const result = await db.query(
      "SELECT id_pengguna, nama_pengguna, email, jabatan, is_admin FROM pengguna WHERE id_pengguna = $1", 
      [id_pengguna]
    );
    return result.rows[0];
  },

  create: async (nama_pengguna, email, jabatan, is_admin, kata_sandi) => {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(kata_sandi, SALT_ROUNDS);
    
    const result = await db.query(
      "INSERT INTO pengguna (nama_pengguna, email, jabatan, is_admin, kata_sandi) VALUES ($1, $2, $3, $4, $5) RETURNING id_pengguna, nama_pengguna, email, jabatan, is_admin",
      [nama_pengguna, email, jabatan, is_admin, hashedPassword]
    );
    return result.rows[0];
  },

  update: async(nama_pengguna, email, jabatan, is_admin, kata_sandi, id_pengguna) => {
    let result;
    
    if (kata_sandi && kata_sandi.trim() !== '') {
      // Hash new password if provided
      const hashedPassword = await bcrypt.hash(kata_sandi, SALT_ROUNDS);
      result = await db.query(
        "UPDATE pengguna SET nama_pengguna = $1, email = $2, jabatan = $3, is_admin = $4, kata_sandi = $5 WHERE id_pengguna = $6 RETURNING id_pengguna, nama_pengguna, email, jabatan, is_admin",
        [nama_pengguna, email, jabatan, is_admin, hashedPassword, id_pengguna]
      );
    } else {
      // Update without changing password
      result = await db.query(
        "UPDATE pengguna SET nama_pengguna = $1, email = $2, jabatan = $3, is_admin = $4 WHERE id_pengguna = $5 RETURNING id_pengguna, nama_pengguna, email, jabatan, is_admin",
        [nama_pengguna, email, jabatan, is_admin, id_pengguna]
      );
    }
    return result.rows[0];
  },

  delete: async (id_pengguna) => {
    const result = await db.query("DELETE FROM pengguna WHERE id_pengguna = $1 RETURNING id_pengguna, nama_pengguna, email, jabatan, is_admin", [id_pengguna]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },

  deleteAll: async () => {
    const result = await db.query("DELETE FROM pengguna RETURNING id_pengguna, nama_pengguna, email, jabatan, is_admin");
    return result.rows;
  },
};

export default UserModel;

