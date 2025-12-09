import UserModel from "../models/UserModel.js";

const UserService = {
  getUsers: async () => {
    const result = await UserModel.getAll();
    return result;
  },

  getUserById: async (id_user) => {
    const result = await UserModel.getById(id_user);
    return result;
  },

  createUser: async (name, email, jabatan, status, password) => {
    const result = await UserModel.create(name, email, jabatan, status, password);
    return result;
  },

  updateUser: async (name, email, jabatan, status, password, id_user ) => {
    const result = await UserModel.update(name, email, jabatan, status, password, id_user);
    return result;
  },

  deleteUser: async (id_user) => {
    const result = await UserModel.delete(id_user);
    return result;
  },

  deleteAllUser: async () => {
    const result = await UserModel.deleteAll();
    return result;
  },
};

export default UserService;