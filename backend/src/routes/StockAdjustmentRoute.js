import express from "express";
import StockAdjustmentModel from "../models/StockAdjustmentModel.js";

const routerStockAdjustment = express.Router();

// GET all stock adjustments (history)
routerStockAdjustment.get("/", async (req, res) => {
  try {
    const data = await StockAdjustmentModel.getAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET inventory data for adjustment
routerStockAdjustment.get("/inventory", async (req, res) => {
  try {
    const data = await StockAdjustmentModel.getInventoryForAdjustment();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create new adjustment
routerStockAdjustment.post("/", async (req, res) => {
  try {
    const { catatan_penyesuaian, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Data penyesuaian tidak boleh kosong"
      });
    }

    const result = await StockAdjustmentModel.create(catatan_penyesuaian, items);
    
    res.json({ 
      success: true, 
      message: "Penyesuaian stok berhasil", 
      data: result 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE adjustment
routerStockAdjustment.delete("/:id", async (req, res) => {
  try {
    const result = await StockAdjustmentModel.delete(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Data penyesuaian tidak ditemukan"
      });
    }

    res.json({ success: true, message: "Penyesuaian berhasil dihapus", data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default routerStockAdjustment;
