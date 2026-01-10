import InventoryService from "../services/InventoryService.js";

const InventoryController = {
  create: async (req, res) => {
    try {
      const { tanggal_masuk, catatan_barang_masuk, products } = req.body;
      const result = await InventoryService.create(tanggal_masuk, catatan_barang_masuk, products);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const result = await InventoryService.getAll();
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id_barang_masuk } = req.params;
      const { tanggal_masuk, catatan_barang_masuk, products } = req.body;
      const result = await InventoryService.update(id_barang_masuk, tanggal_masuk, catatan_barang_masuk, products);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
      return res.status(500).json({ success: false, error: error.message });
    }
  },
  getBatchesByProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await InventoryService.getBatchesByProduct(id);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default InventoryController;