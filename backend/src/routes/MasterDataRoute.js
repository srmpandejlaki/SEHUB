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
    const { nama_metode_pengiriman } = req.body;
    const data = await MasterDataModel.createMetodePengiriman(nama_metode_pengiriman);
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
    const { nama_status_pengiriman } = req.body;
    const data = await MasterDataModel.createStatusPengiriman(nama_status_pengiriman);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default routerMasterData;
