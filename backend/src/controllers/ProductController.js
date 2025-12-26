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
      const { nama_produk, ukuran_produk, id_ukuran_satuan, id_kemasan, stok_minimum } = req.body;

      const fileName = req.file ? req.file.filename : "default.png";
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const path_gambar = `${baseUrl}/uploads/${fileName}`;

      const newProduct = await ProductService.createProduct(
        nama_produk, 
        ukuran_produk, 
        parseInt(id_ukuran_satuan), 
        parseInt(id_kemasan), 
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
      const { id_produk } = req.params;
      const { nama_produk, ukuran_produk, id_ukuran_satuan, id_kemasan, stok_minimum } = req.body;
      
      let path_gambar = undefined;
      if (req.file) {
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        path_gambar = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const updatedProduct = await ProductService.updateProduct(
        id_produk, 
        nama_produk, 
        ukuran_produk, 
        parseInt(id_ukuran_satuan), 
        parseInt(id_kemasan), 
        stok_minimum, 
        path_gambar
      );
      res.json({ success: true, message: "Product updated", data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id_produk } = req.params;
      const result = await ProductService.deleteProduct(id_produk);

      if (!result) {
        return res.status(404).json({ success: false, message: "Produk tidak ditemukan" });
      }

      res.json({ success: true, message: "Produk berhasil dihapus", data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default ProductController;


