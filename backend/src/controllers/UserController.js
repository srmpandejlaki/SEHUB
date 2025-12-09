import UserServices from "../services/UserServices.js";

const UserController = {
  getAllUser: async (req, res) => {
    const result = await UserServices.getUsers();
    res.json(result);
  },
  getUserById: async (req, res) => {
    const result = await UserServices.getUserById(req.params.id_user);
    res.json(result);
  },
  createUser: async (req, res) => {
    try {
      const { name, email, jabatan, status, password } = req.body;
      const newUser = await UserServices.createUser(name, email, jabatan, status, password);
      res.json({ success: true, message: "User created", data: newUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id_user } = req.params;
      const { name, email, jabatan, status, password } = req.body;
      const updatedUser = await UserServices.updateUser(name, email, jabatan, status, password, id_user);
      res.json({ success: true, message: "User updated", data: updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  deleteUser: async (req, res) => {
    const result = await UserServices.deleteUser(req.params.id_user);
    res.json(result);
  },
  deleteAllUser: async (req, res) => {
    const result = await UserServices.deleteAllUser();
    res.json(result);
  },
};

export default UserController;