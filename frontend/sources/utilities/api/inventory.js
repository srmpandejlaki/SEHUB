import { BASE_URL } from "../index.js";

// table inventory
export const fetchAllInventoryData = async () => {
  try {
    const response = await fetch(`${BASE_URL}inventory/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Jika status bukan 200–299
    if (!response.ok) {
      console.error("Gagal fetch data:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();

    console.log(data);

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
    console.error("Error fetchAllInventoryData:", error);
    return []; // selalu return array supaya aman
  }
};
