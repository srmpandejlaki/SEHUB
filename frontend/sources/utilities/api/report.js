import { BASE_URL } from "../index.js";

// GET all report data (combined)
export const fetchAllReportData = async (id_produk = null) => {
  try {
    let url = `${BASE_URL}report/all`;
    if (id_produk) {
      url += `?id_produk=${id_produk}`;
    }
    
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Gagal fetch all report data:", response.status);
      return null;
    }

    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error("Error fetchAllReportData:", error);
    return null;
  }
};

// GET product list for filter
export const fetchReportProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}report/products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Gagal fetch report products:", response.status);
      return [];
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetchReportProducts:", error);
    return [];
  }
};
