import express from "express";
import DashboardModel from "../models/DashboardModel.js";

const routerDashboard = express.Router();

// GET dashboard statistics
routerDashboard.get("/statistics", async (req, res) => {
  try {
    const stats = await DashboardModel.getStatistics();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET products expiring soon
routerDashboard.get("/expiring-soon", async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const products = await DashboardModel.getExpiringSoon(days);
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET recent distributions
routerDashboard.get("/recent-distributions", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const distributions = await DashboardModel.getRecentDistributions(limit);
    res.json({ success: true, data: distributions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET monthly stats for charts
routerDashboard.get("/monthly-stats", async (req, res) => {
  try {
    const id_produk = req.query.id_produk || null;
    const stats = await DashboardModel.getMonthlyStats(id_produk);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET monthly summary (total incoming and distribution this month)
routerDashboard.get("/monthly-summary", async (req, res) => {
  try {
    const summary = await DashboardModel.getMonthlySummary();
    res.json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default routerDashboard;
