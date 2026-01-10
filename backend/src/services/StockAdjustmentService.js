import StockAdjustmentModel from "../models/StockAdjustmentModel.js";

const StockAdjustmentService = {
  getAll: async () => {
    const result = await StockAdjustmentModel.getAll();
    return result;
  },

  getInventoryForAdjustment: async () => {
    const result = await StockAdjustmentModel.getInventoryForAdjustment();
    return result;
  },

  create: async (catatan_penyesuaian, items) => {
    const result = await StockAdjustmentModel.create(catatan_penyesuaian, items);
    return result;
  },

  delete: async (id_penyesuaian_stok) => {
    const result = await StockAdjustmentModel.delete(id_penyesuaian_stok);
    return result;
  }
};

export default StockAdjustmentService;
