import express from "express";
import { upload } from "../middlewares/upload.js";
import ProductController from "../controllers/ProductController.js";

const routerProducts = express.Router();

routerProducts.get("/", ProductController.getProducts);
routerProducts.post("/", upload.single("img_product"), ProductController.createProduct);
routerProducts.put("/:id_product", upload.single("img_product"), ProductController.updateProduct);
routerProducts.delete("/:id_product", ProductController.deleteProduct);
routerProducts.delete("/", ProductController.deleteAllProduct);

export default routerProducts;
