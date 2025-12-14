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
      const { nama_produk, ukuran_produk, ukuran_satuan, kemasan_produk, stok_minimum } = req.body;

      const fileName = req.file ? req.file.filename : "default.png";
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const path_gambar = `${baseUrl}/uploads/${fileName}`;

      const newProduct = await ProductService.createProduct(
        nama_produk, 
        ukuran_produk, 
        ukuran_satuan, 
        kemasan_produk, 
        stok_minimum, 
        path_gambar
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
      const { kode_produk } = req.params;
      const { nama_produk, ukuran_produk, ukuran_satuan, kemasan_produk, stok_minimum } = req.body;
      const path_gambar = req.file?.filename || "default.png";

      const updatedProduct = await ProductService.updateProduct(kode_produk, nama_produk, ukuran_produk, ukuran_satuan, kemasan_produk, stok_minimum, path_gambar);
      res.json({ success: true, message: "Product updated", data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default ProductController;
