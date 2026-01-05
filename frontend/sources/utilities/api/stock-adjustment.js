import { BASE_URL } from "../index.js";

// GET all stock adjustments (history)
export const fetchAllAdjustments = async () => {
  try {
    const response = await fetch(`${BASE_URL}stock-adjustment/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Gagal fetch adjustments:", response.status);
      return [];
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetchAllAdjustments:", error);
    return [];
  }
};

// GET inventory data for stock adjustment
export const fetchInventoryForAdjustment = async () => {
  try {
    const response = await fetch(`${BASE_URL}stock-adjustment/inventory`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Gagal fetch inventory for adjustment:", response.status);
      return [];
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetchInventoryForAdjustment:", error);
    return [];
  }
};

// POST create new adjustment
export const createAdjustment = async (catatan_penyesuaian, items) => {
  try {
    const response = await fetch(`${BASE_URL}stock-adjustment/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ catatan_penyesuaian, items }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Create adjustment gagal:", err || response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error createAdjustment:", error);
    return null;
  }
};

// DELETE adjustment
export const deleteAdjustment = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}stock-adjustment/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Delete adjustment gagal:", response.status);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleteAdjustment:", error);
    return null;
  }
};
