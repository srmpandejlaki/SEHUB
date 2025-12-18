import express from "express";
import { upload } from "../middlewares/upload.js";
import ProductController from "../controllers/ProductController.js";

const routerProducts = express.Router();

routerProducts.get("/", ProductController.getProducts);
routerProducts.post("/", upload.single("path_gambar"), ProductController.createProduct);
routerProducts.put("/:kode_produk", upload.single("path_gambar"), ProductController.updateProduct);
routerProducts.delete("/:kode_produk", ProductController.deleteProduct);

export default routerProducts;

