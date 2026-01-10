import ReturnModel from "../models/ReturnModel.js";

const ReturnService = {
  getAll: async () => {
    const result = await ReturnModel.getAll();
    return result;
  },

  getByDistributionId: async (id_distribusi) => {
    const result = await ReturnModel.getByDistributionId(id_distribusi);
    return result;
  },

  create: async (tanggal_return, catatan_return, items) => {
    const result = await ReturnModel.create(tanggal_return, catatan_return, items);
    return result;
  },

  delete: async (id_return) => {
    const result = await ReturnModel.delete(id_return);
    return result;
  }
};

export default ReturnService;
