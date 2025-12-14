import ProductModel from "../models/ProductModel.js";

const ProductService = {
  getProducts: async () => {
    return await ProductModel.getAll();
  },

  createProduct: async (
    nama_produk, 
    ukuran_produk, 
    ukuran_satuan, 
    kemasan_produk, 
    stok_minimum, 
    path_gambar
  ) => {
    return await ProductModel.create(
      nama_produk, 
      ukuran_produk, 
      ukuran_satuan, 
      kemasan_produk, 
      stok_minimum, 
      path_gambar
    );
  },

  updateProduct: async (
    kode_produk,
    nama_produk, 
    ukuran_produk, 
    ukuran_satuan, 
    kemasan_produk, 
    stok_minimum, 
    path_gambar
  ) => {
    return await ProductModel.update(
      kode_produk,
      nama_produk, 
      ukuran_produk, 
      ukuran_satuan, 
      kemasan_produk, 
      stok_minimum, 
      path_gambar
    );
  },
};

export default ProductService;
