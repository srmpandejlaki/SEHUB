import { BASE_URL } from "../index.js";

// GET dashboard statistics
export const fetchDashboardStatistics = async () => {
  try {
    const response = await fetch(`${BASE_URL}dashboard/statistics`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Gagal fetch dashboard statistics:", response.status);
      return null;
    }

    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error("Error fetchDashboardStatistics:", error);
    return null;
  }
};

// GET products expiring soon
export const fetchExpiringSoon = async (days = 30) => {
  try {
    const response = await fetch(`${BASE_URL}dashboard/expiring-soon?days=${days}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Gagal fetch expiring products:", response.status);
      return [];
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetchExpiringSoon:", error);
    return [];
  }
};

// GET recent distributions
export const fetchRecentDistributions = async (limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}dashboard/recent-distributions?limit=${limit}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Gagal fetch recent distributions:", response.status);
      return [];
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetchRecentDistributions:", error);
    return [];
  }
};

// GET monthly stats for charts
export const fetchMonthlyStats = async (id_produk = null) => {
  try {
    let url = `${BASE_URL}dashboard/monthly-stats`;
    if (id_produk) {
      url += `?id_produk=${id_produk}`;
    }
    
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Gagal fetch monthly stats:", response.status);
      return null;
    }

    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error("Error fetchMonthlyStats:", error);
    return null;
  }
};

// GET pending distributions (status: Diproses or Dalam Perjalanan)
export const fetchPendingDistributions = async () => {
  try {
    const response = await fetch(`${BASE_URL}dashboard/pending-distributions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Gagal fetch pending distributions:", response.status);
      return [];
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetchPendingDistributions:", error);
    return [];
  }
};
