import express from "express";
import ProductController from "../controllers/ProductController.js";

const router = express.Router();

router.get("/", ProductController.getProducts);
router.post("/", ProductController.createProduct);
router.put("/:id_product", ProductController.updateProduct);
router.delete("/:id_product", ProductController.deleteProduct);
router.delete("/", ProductController.deleteAllProduct);

export default router;
