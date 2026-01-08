import express from "express";
import ReportModel from "../models/ReportModel.js";

const routerReport = express.Router();

// GET all report data (combined)
routerReport.get("/all", async (req, res) => {
  try {
    const id_produk = req.query.id_produk || null;
    const data = await ReportModel.getAllReportData(id_produk);
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching all report data:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET inventory data
routerReport.get("/inventory", async (req, res) => {
  try {
    const id_produk = req.query.id_produk || null;
    const data = await ReportModel.getInventoryData(id_produk);
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET distribution data
routerReport.get("/distribution", async (req, res) => {
  try {
    const id_produk = req.query.id_produk || null;
    const data = await ReportModel.getDistributionData(id_produk);
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching distribution data:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET return data
routerReport.get("/returns", async (req, res) => {
  try {
    const id_produk = req.query.id_produk || null;
    const data = await ReportModel.getReturnData(id_produk);
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching return data:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET stock adjustment data
routerReport.get("/adjustments", async (req, res) => {
  try {
    const id_produk = req.query.id_produk || null;
    const data = await ReportModel.getStockAdjustmentData(id_produk);
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching adjustment data:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET product list for filter
routerReport.get("/products", async (req, res) => {
  try {
    const products = await ReportModel.getProductList();
    res.json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching product list:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default routerReport;
