import InventoryModel from "../models/InventoryModel.js";

const InventoryService = {
  getAll: async () => {
    const result = await InventoryModel.getAll();
    return result;
  },
  create: async (tanggal_masuk, catatan, id_pengguna, products) => {
    const result = await InventoryModel.create(tanggal_masuk, catatan, id_pengguna, products);
    return result;
  },

  update: async (id_barang_masuk, tanggal_masuk, catatan, products) => {
    const result = await InventoryModel.update(id_barang_masuk, tanggal_masuk, catatan, products);
    return result;
  },
};

export default InventoryService;