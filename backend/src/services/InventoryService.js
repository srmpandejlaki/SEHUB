import InventoryModel from "../models/InventoryModel.js";

const InventoryService = {
  getAll: async () => {
    const result = await InventoryModel.getAll();
    return result;
  },
  create: async (date, products) => {
    const result = await InventoryModel.create(date, products);
    return result;
  },
};

export default InventoryService;