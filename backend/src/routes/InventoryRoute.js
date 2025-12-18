import express from "express";
import InventoryController from "../controllers/InventoryController.js";

const routerInventory = express.Router();

routerInventory.get("/", InventoryController.getAll);
routerInventory.post("/", InventoryController.create);
routerInventory.put("/:id_barang_masuk", InventoryController.update);

export default routerInventory;