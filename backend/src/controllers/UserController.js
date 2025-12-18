import UserServices from "../services/UserServices.js";

const UserController = {
  getAllUser: async (req, res) => {
    try {
      const result = await UserServices.getUsers();
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const result = await UserServices.getUserById(req.params.id_pengguna);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  createUser: async (req, res) => {
    try {
      const { nama_pengguna, email, jabatan, peran, kata_sandi } = req.body;
      const newUser = await UserServices.createUser(nama_pengguna, email, jabatan, peran, kata_sandi);
      res.json({ success: true, message: "User created", data: newUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id_pengguna } = req.params;
      const { nama_pengguna, email, jabatan, peran, kata_sandi } = req.body;
      const updatedUser = await UserServices.updateUser(nama_pengguna, email, jabatan, peran, kata_sandi, id_pengguna);
      res.json({ success: true, message: "User updated", data: updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const result = await UserServices.deleteUser(req.params.id_pengguna);

      if (!result) {
        return res.status(404).json({
          message: "Pengguna tidak ditemukan"
        });
      }

      res.status(200).json({
        message: "Pengguna berhasil dihapus",
        data: result
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  deleteAllUser: async (req, res) => {
    try {
      const result = await UserServices.deleteAllUser();
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default UserController;