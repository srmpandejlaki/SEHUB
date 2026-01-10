import express from "express";
import InventoryController from "../controllers/InventoryController.js";

const routerInventory = express.Router();

routerInventory.get("/", InventoryController.getAll);
routerInventory.post("/", InventoryController.create);
routerInventory.put("/:id_barang_masuk", InventoryController.update);
routerInventory.get("/product/:id", InventoryController.getBatchesByProduct);

export default routerInventory;