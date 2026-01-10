import express from "express";
import StockAdjustmentController from "../controllers/StockAdjustmentController.js";

const routerStockAdjustment = express.Router();

// GET all stock adjustments (history)
routerStockAdjustment.get("/", StockAdjustmentController.getAll);

// GET inventory data for adjustment
routerStockAdjustment.get("/inventory", StockAdjustmentController.getInventoryForAdjustment);

// POST create new adjustment
routerStockAdjustment.post("/", StockAdjustmentController.create);

// DELETE adjustment
routerStockAdjustment.delete("/:id", StockAdjustmentController.delete);

export default routerStockAdjustment;
