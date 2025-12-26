import express from "express";
import { upload } from "../middlewares/upload.js";
import ProductController from "../controllers/ProductController.js";

const routerProducts = express.Router();

routerProducts.get("/", ProductController.getProducts);
routerProducts.post("/", upload.single("path_gambar"), ProductController.createProduct);
routerProducts.put("/:id_produk", upload.single("path_gambar"), ProductController.updateProduct);
routerProducts.delete("/:id_produk", ProductController.deleteProduct);

export default routerProducts;


