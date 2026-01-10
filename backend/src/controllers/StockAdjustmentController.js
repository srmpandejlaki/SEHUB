import StockAdjustmentService from "../services/StockAdjustmentService.js";

const StockAdjustmentController = {
  getAll: async (req, res) => {
    try {
      const data = await StockAdjustmentService.getAll();
      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  getInventoryForAdjustment: async (req, res) => {
    try {
      const data = await StockAdjustmentService.getInventoryForAdjustment();
      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { catatan_penyesuaian, items } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Data penyesuaian tidak boleh kosong"
        });
      }

      const result = await StockAdjustmentService.create(catatan_penyesuaian, items);
      
      return res.status(200).json({ 
        success: true, 
        message: "Penyesuaian stok berhasil", 
        data: result 
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await StockAdjustmentService.delete(id);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Data penyesuaian tidak ditemukan"
        });
      }

      return res.status(200).json({ success: true, message: "Penyesuaian berhasil dihapus", data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
};

export default StockAdjustmentController;
