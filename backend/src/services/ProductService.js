import ProductModel from "../models/ProductModel.js";

const ProductService = {
  getProducts: async () => {
    return await ProductModel.getAll();
  },

  createProduct: async (
    nama_produk, 
    ukuran_produk, 
    id_ukuran_satuan, 
    id_kemasan, 
    stok_minimum, 
    path_gambar
  ) => {
    return await ProductModel.create(
      nama_produk, 
      ukuran_produk, 
      id_ukuran_satuan, 
      id_kemasan, 
      stok_minimum, 
      path_gambar
    );
  },

  updateProduct: async (
    id_produk,
    nama_produk, 
    ukuran_produk, 
    id_ukuran_satuan, 
    id_kemasan, 
    stok_minimum, 
    path_gambar
  ) => {
    return await ProductModel.update(
      id_produk,
      nama_produk, 
      ukuran_produk, 
      id_ukuran_satuan, 
      id_kemasan, 
      stok_minimum, 
      path_gambar
    );
  },

  deleteProduct: async (id_produk) => {
    return await ProductModel.delete(id_produk);
  },
};

export default ProductService;


