import InventoryService from "../services/InventoryService.js";

const InventoryController = {
  create: async (req, res) => {
    try {
      const { date, products } = req.body;
      const result = await InventoryService.create(date, products);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const result = await InventoryService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { incoming_stock_id } = req.params;
      const { date, products } = req.body;
      const result = await InventoryService.update(incoming_stock_id, date, products);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default InventoryController;