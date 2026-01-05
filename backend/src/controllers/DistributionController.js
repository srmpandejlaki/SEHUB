import DistributionService from "../services/DistributionService.js";

const DistributionController = {
  getAll: async (req, res) => {
    try {
      const result = await DistributionService.getAll();
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { tanggal_distribusi, nama_pemesan, id_metode_pengiriman, id_status, catatan_distribusi, products } = req.body;
      const result = await DistributionService.create(
        tanggal_distribusi, 
        nama_pemesan, 
        id_metode_pengiriman, 
        id_status, 
        catatan_distribusi, 
        products
      );
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id_distribusi } = req.params;
      const { tanggal_distribusi, nama_pemesan, id_metode_pengiriman, id_status, catatan_distribusi, products } = req.body;
      const result = await DistributionService.update(
        id_distribusi, 
        tanggal_distribusi, 
        nama_pemesan, 
        id_metode_pengiriman, 
        id_status, 
        catatan_distribusi, 
        products
      );
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id_distribusi } = req.params;
      const { id_status } = req.body;
      const result = await DistributionService.updateStatus(id_distribusi, id_status);
      
      if (!result) {
        return res.status(404).json({ success: false, error: "Distribusi tidak ditemukan" });
      }
      
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id_distribusi } = req.params;
      const result = await DistributionService.delete(id_distribusi);
      
      if (!result) {
        return res.status(404).json({ success: false, error: "Distribusi tidak ditemukan" });
      }
      
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default DistributionController;
