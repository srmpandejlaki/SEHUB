import { BASE_URL } from "../index.js";

// GET all inventory data
export const fetchAllInventoryData = async () => {
  try {
    const response = await fetch(`${BASE_URL}inventory/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Gagal fetch data:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();

    // Jika backend mengirim: { success: true, data: [...] }
    if (data?.data && Array.isArray(data.data)) {
      return data.data;
    }

    // Jika backend mengirim langsung array
    if (Array.isArray(data)) {
      return data;
    }

    console.error("Struktur data tidak dikenali:", data);
    return [];
  } catch (error) {
    console.error("Error fetchAllInventoryData:", error);
    return [];
  }
};

// Check if inventory data exists
export const checkInventoryExists = async () => {
  try {
    const data = await fetchAllInventoryData();
    return data.length > 0;
  } catch (error) {
    console.error("Error checkInventoryExists:", error);
    return false;
  }
};

// POST create inventory data
export const createInventory = async (inventoryData) => {
  try {
    const response = await fetch(`${BASE_URL}inventory/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventoryData),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Create inventory gagal:", err || response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error createInventory:", error);
    return null;
  }
};

