import UserModel from "../models/UserModel.js";

const UserService = {
  getUsers: async () => {
    const result = await UserModel.getAll();
    return result;
  },

  getUserById: async (id_pengguna) => {
    const result = await UserModel.getById(id_pengguna);
    return result;
  },

  createUser: async (nama_pengguna, email, jabatan, peran, kata_sandi) => {
    const result = await UserModel.create(nama_pengguna, email, jabatan, peran, kata_sandi);
    return result;
  },

  updateUser: async (nama_pengguna, email, jabatan, peran, kata_sandi, id_pengguna ) => {
    const result = await UserModel.update(nama_pengguna, email, jabatan, peran, kata_sandi, id_pengguna);
    return result;
  },

  deleteUser: async (id_pengguna) => {
    const result = await UserModel.delete(id_pengguna);
    return result;
  },

  deleteAllUser: async () => {
    const result = await UserModel.deleteAll();
    return result;
  },
};

export default UserService;