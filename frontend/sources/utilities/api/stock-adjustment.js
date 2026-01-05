import { BASE_URL } from "../index.js";

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

// POST adjust stock
export const adjustStock = async (adjustments) => {
  try {
    const response = await fetch(`${BASE_URL}stock-adjustment/adjust`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adjustments }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Adjust stock gagal:", err || response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adjustStock:", error);
    return null;
  }
};
