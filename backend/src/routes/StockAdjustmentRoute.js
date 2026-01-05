import express from "express";
import StockAdjustmentModel from "../models/StockAdjustmentModel.js";

const routerStockAdjustment = express.Router();

// GET inventory data for adjustment
routerStockAdjustment.get("/inventory", async (req, res) => {
  try {
    const data = await StockAdjustmentModel.getInventoryForAdjustment();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST adjust stock
routerStockAdjustment.post("/adjust", async (req, res) => {
  try {
    const { adjustments } = req.body;

    if (!adjustments || adjustments.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Data penyesuaian tidak boleh kosong"
      });
    }

    const results = await StockAdjustmentModel.adjustStock(adjustments);
    
    res.json({ 
      success: true, 
      message: "Penyesuaian stok berhasil", 
      data: results 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default routerStockAdjustment;
