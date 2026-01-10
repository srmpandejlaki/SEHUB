import ReturnService from "../services/ReturnService.js";

const ReturnController = {
  getAll: async (req, res) => {
    try {
      const data = await ReturnService.getAll();
      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  getByDistributionId: async (req, res) => {
    try {
      const { id_distribusi } = req.params;
      const data = await ReturnService.getByDistributionId(id_distribusi);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { tanggal_return, catatan_return, items } = req.body;

      if (!tanggal_return || !items || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Tanggal return dan minimal satu item wajib diisi"
        });
      }

      const result = await ReturnService.create(tanggal_return, catatan_return, items);
      
      return res.status(200).json({ 
        success: true, 
        message: "Return berhasil dibuat", 
        data: result 
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id_return } = req.params;
      const result = await ReturnService.delete(id_return);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Data return tidak ditemukan"
        });
      }

      return res.status(200).json({ success: true, message: "Return berhasil dihapus", data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
};

export default ReturnController;
