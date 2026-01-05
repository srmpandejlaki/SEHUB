import DistributionModel from "../models/DistributionModel.js";

const DistributionService = {
  getAll: async () => {
    const result = await DistributionModel.getAll();
    return result;
  },

  create: async (tanggal_distribusi, nama_pemesan, id_metode_pengiriman, id_status, catatan_distribusi, products) => {
    const result = await DistributionModel.create(
      tanggal_distribusi, 
      nama_pemesan, 
      id_metode_pengiriman, 
      id_status, 
      catatan_distribusi, 
      products
    );
    return result;
  },

  update: async (id_distribusi, tanggal_distribusi, nama_pemesan, id_metode_pengiriman, id_status, catatan_distribusi, products) => {
    const result = await DistributionModel.update(
      id_distribusi,
      tanggal_distribusi, 
      nama_pemesan, 
      id_metode_pengiriman, 
      id_status, 
      catatan_distribusi, 
      products
    );
    return result;
  },

  updateStatus: async (id_distribusi, id_status) => {
    const result = await DistributionModel.updateStatus(id_distribusi, id_status);
    return result;
  },

  delete: async (id_distribusi) => {
    const result = await DistributionModel.delete(id_distribusi);
    return result;
  },
};

export default DistributionService;
