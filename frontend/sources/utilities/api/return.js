import { BASE_URL } from "../index.js";

// GET all returns
export const fetchAllReturns = async () => {
  try {
    const response = await fetch(`${BASE_URL}return/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Gagal fetch return:", response.status);
      return [];
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetchAllReturns:", error);
    return [];
  }
};

// GET returns by distribution ID
export const fetchReturnsByDistribution = async (id_distribusi) => {
  try {
    const response = await fetch(`${BASE_URL}return/by-distribution/${id_distribusi}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Gagal fetch return by distribution:", response.status);
      return [];
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetchReturnsByDistribution:", error);
    return [];
  }
};

// POST create new return
export const createReturn = async (returnData) => {
  try {
    const response = await fetch(`${BASE_URL}return/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(returnData),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Create return gagal:", err || response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error createReturn:", error);
    return null;
  }
};

// DELETE return
export const deleteReturn = async (id_return) => {
  try {
    const response = await fetch(`${BASE_URL}return/${id_return}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Delete return gagal:", response.status);
      return null;
    }

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error deleteReturn:", error);
    return null;
  }
};
