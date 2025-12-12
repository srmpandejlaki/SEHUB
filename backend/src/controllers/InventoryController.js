import InventoryService from "../services/InventoryService.js";

const InventoryController = {
  create: async (req, res) => {
    const { date, products } = req.body;
    const result = await InventoryService.create(date, products);
    return res.status(200).json(result);
  },
  getAll: async (req, res) => {
    const result = await InventoryService.getAll();
    return res.status(200).json(result);
  },
  update: async (req, res) => {
    const { incoming_stock_id } = req.params;
    const { date, products } = req.body;
    const result = await InventoryService.update(incoming_stock_id, date, products);
    return res.status(200).json(result);
  },
};

export default InventoryController;