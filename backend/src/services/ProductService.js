import ProductModel from "../models/ProductModel.js";

const ProductService = {
  getProducts: async () => {
    return await ProductModel.getAll();
  },

  createProduct: async (nama_product, ukuran_product, ukuran_satuan, kemasan_product, img_product) => {
    return await ProductModel.create(nama_product, ukuran_product, ukuran_satuan, kemasan_product, img_product);
  },

  updateProduct: async (id_product, nama_product, ukuran_product, ukuran_satuan, kemasan_product, img_product) => {
    return await ProductModel.update(nama_product, ukuran_product, ukuran_satuan, kemasan_product, img_product, id_product);
  },

  deleteProduct: async (id_product) => {
    return await ProductModel.delete(id_product);
  },

  deleteAllProduct: async () => {
    return await ProductModel.deleteAll();
  },
};

export default ProductService;
