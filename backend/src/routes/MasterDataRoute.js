import express from "express";
import MasterDataModel from "../models/MasterDataModel.js";

const routerMasterData = express.Router();

// Nama Produk
routerMasterData.get("/nama-produk", async (req, res) => {
  try {
    const data = await MasterDataModel.getAllNamaProduk();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

routerMasterData.post("/nama-produk", async (req, res) => {
  try {
    const { nama_produk } = req.body;
    const data = await MasterDataModel.createNamaProduk(nama_produk);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Ukuran Satuan
routerMasterData.get("/ukuran-satuan", async (req, res) => {
  try {
    const data = await MasterDataModel.getAllUkuranSatuan();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

routerMasterData.post("/ukuran-satuan", async (req, res) => {
  try {
    const { nama_ukuran_satuan } = req.body;
    const data = await MasterDataModel.createUkuranSatuan(nama_ukuran_satuan);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Kemasan
routerMasterData.get("/kemasan", async (req, res) => {
  try {
    const data = await MasterDataModel.getAllKemasan();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

routerMasterData.post("/kemasan", async (req, res) => {
  try {
    const { nama_kemasan } = req.body;
    const data = await MasterDataModel.createKemasan(nama_kemasan);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Metode Pengiriman
routerMasterData.get("/metode-pengiriman", async (req, res) => {
  try {
    const data = await MasterDataModel.getAllMetodePengiriman();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

routerMasterData.post("/metode-pengiriman", async (req, res) => {
  try {
    const { nama_metode } = req.body;
    const data = await MasterDataModel.createMetodePengiriman(nama_metode);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Status Pengiriman
routerMasterData.get("/status-pengiriman", async (req, res) => {
  try {
    const data = await MasterDataModel.getAllStatusPengiriman();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

routerMasterData.post("/status-pengiriman", async (req, res) => {
  try {
    const { nama_status } = req.body;
    const data = await MasterDataModel.createStatusPengiriman(nama_status);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

routerMasterData.put("/status-pengiriman/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_status } = req.body;
    const data = await MasterDataModel.updateStatusPengiriman(id, nama_status);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

routerMasterData.delete("/status-pengiriman/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await MasterDataModel.deleteStatusPengiriman(id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update & Delete for other types added similarly:

// Nama Produk
routerMasterData.put("/nama-produk/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_produk } = req.body;
    const data = await MasterDataModel.updateNamaProduk(id, nama_produk);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

routerMasterData.delete("/nama-produk/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await MasterDataModel.deleteNamaProduk(id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Ukuran Satuan
routerMasterData.put("/ukuran-satuan/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_ukuran_satuan } = req.body;
    const data = await MasterDataModel.updateUkuranSatuan(id, nama_ukuran_satuan);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

routerMasterData.delete("/ukuran-satuan/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await MasterDataModel.deleteUkuranSatuan(id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Kemasan
routerMasterData.put("/kemasan/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_kemasan } = req.body;
    const data = await MasterDataModel.updateKemasan(id, nama_kemasan);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

routerMasterData.delete("/kemasan/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await MasterDataModel.deleteKemasan(id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Metode Pengiriman
routerMasterData.put("/metode-pengiriman/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_metode } = req.body;
    const data = await MasterDataModel.updateMetodePengiriman(id, nama_metode);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

routerMasterData.delete("/metode-pengiriman/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await MasterDataModel.deleteMetodePengiriman(id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default routerMasterData;
