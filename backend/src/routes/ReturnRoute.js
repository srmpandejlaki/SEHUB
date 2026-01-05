import express from "express";
import ReturnModel from "../models/ReturnModel.js";

const routerReturn = express.Router();

// GET all returns
routerReturn.get("/", async (req, res) => {
  try {
    const returns = await ReturnModel.getAll();
    res.json({ success: true, data: returns });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET returns by distribution ID
routerReturn.get("/by-distribution/:id_distribusi", async (req, res) => {
  try {
    const { id_distribusi } = req.params;
    const returns = await ReturnModel.getByDistributionId(id_distribusi);
    res.json({ success: true, data: returns });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create new return
routerReturn.post("/", async (req, res) => {
  try {
    const { tanggal_return, catatan_return, items } = req.body;

    if (!tanggal_return || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Tanggal return dan minimal satu item wajib diisi"
      });
    }

    const result = await ReturnModel.create(tanggal_return, catatan_return, items);
    res.json({ success: true, message: "Return berhasil dibuat", data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE return
routerReturn.delete("/:id_return", async (req, res) => {
  try {
    const { id_return } = req.params;
    const result = await ReturnModel.delete(id_return);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Data return tidak ditemukan"
      });
    }

    res.json({ success: true, message: "Return berhasil dihapus", data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default routerReturn;
