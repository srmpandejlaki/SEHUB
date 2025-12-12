import express from "express";
import InventoryController from "../controllers/InventoryController.js";

const routerInventory = express.Router();

routerInventory.get("/", InventoryController.getAll);
routerInventory.post("/", InventoryController.create);
routerInventory.put("/:incoming_stock_id", InventoryController.update);

export default routerInventory;