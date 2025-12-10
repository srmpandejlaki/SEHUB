import ProductService from "../services/ProductService.js";

const ProductController = {
  getProducts: async (req, res) => {
    try {
      const products = await ProductService.getProducts();
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { nama_product, ukuran_product, ukuran_satuan, kemasan_product } = req.body;

      const fileName = req.file ? req.file.filename : "default.png";
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const img_product = `${baseUrl}/uploads/${fileName}`;

      const newProduct = await ProductService.createProduct(
        nama_product,
        ukuran_product,
        ukuran_satuan,
        kemasan_product,
        img_product
      );

      res.json({
        success: true,
        message: "Product created",
        data: newProduct
      });

    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id_product } = req.params;
      const { nama_product, ukuran_product, ukuran_satuan, kemasan_product } = req.body;
      const img_product = req.file?.filename || "default.png";

      const updatedProduct = await ProductService.updateProduct(id_product, nama_product, ukuran_product, ukuran_satuan, kemasan_product, img_product);
      res.json({ success: true, message: "Product updated", data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id_product } = req.params;
      const deletedProduct = await ProductService.deleteProduct(id_product);
      res.json({ success: true, message: "Product deleted", data: deletedProduct });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteAllProduct: async (req, res) => {
    try {
      const deletedProducts = await ProductService.deleteAllProduct();
      res.json({ success: true, message: "All products deleted", data: deletedProducts });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default ProductController;
