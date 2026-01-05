import express from "express";
import UserController from "../controllers/UserController.js";
import UserModel from "../models/UserModel.js";

const routerUsers = express.Router();

// Login endpoint
routerUsers.post("/login", async (req, res) => {
  try {
    const { email, kata_sandi } = req.body;
    
    if (!email || !kata_sandi) {
      return res.status(400).json({ 
        success: false, 
        message: "Email dan password wajib diisi" 
      });
    }

    const user = await UserModel.login(email, kata_sandi);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Email atau password salah" 
      });
    }

    res.json({ 
      success: true, 
      message: "Login berhasil",
      data: {
        id_pengguna: user.id_pengguna,
        nama_pengguna: user.nama_pengguna,
        email: user.email,
        jabatan: user.jabatan,
        is_admin: user.is_admin
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

routerUsers.get("/", UserController.getAllUser);
routerUsers.get("/:id_pengguna", UserController.getUserById);
routerUsers.post("/", UserController.createUser);
routerUsers.put("/:id_pengguna", UserController.updateUser);
routerUsers.delete("/:id_pengguna", UserController.deleteUser);
routerUsers.delete("/", UserController.deleteAllUser);

export default routerUsers;