import { BASE_URL } from "../index.js";

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Jika status bukan 200–299
    if (!response.ok) {
      console.error("Gagal fetch produk:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();

    // Jika backend mengirim: { data: [...] }
    if (data?.data && Array.isArray(data.data)) {
      return data.data;
    }

    // Jika backend mengirim langsung array
    if (Array.isArray(data)) {
      return data;
    }

    // Jika struktur tidak valid
    console.error("Struktur data tidak dikenali:", data);
    return [];
  } catch (error) {
    console.error("Error fetchAllProducts:", error);
    return []; // selalu return array supaya aman
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${BASE_URL}products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      console.error("Gagal menambah produk:", response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data || data;

  } catch (error) {
    console.error("Error createProduct:", error);
    return null;
  }
};
