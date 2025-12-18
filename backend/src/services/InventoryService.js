import InventoryModel from "../models/InventoryModel.js";

const InventoryService = {
  getAll: async () => {
    const result = await InventoryModel.getAll();
    return result;
  },
  create: async (tanggal_masuk, catatan_barang_masuk, products) => {
    const result = await InventoryModel.create(tanggal_masuk, catatan_barang_masuk, products);
    return result;
  },

  update: async (id_barang_masuk, tanggal_masuk, catatan_barang_masuk, products) => {
    const result = await InventoryModel.update(id_barang_masuk, tanggal_masuk, catatan_barang_masuk, products);
    return result;
  },
};

export default InventoryService;