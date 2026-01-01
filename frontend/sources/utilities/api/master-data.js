import { BASE_URL } from "../index.js";

// ========== UKURAN SATUAN ==========
export const fetchAllSize = async () => {
  try {
    const response = await fetch(`${BASE_URL}master/ukuran-satuan`, {
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

    if (data?.data && Array.isArray(data.data)) {
      return data.data;
    }

    if (Array.isArray(data)) {
      return data;
    }

    console.error("Struktur data tidak dikenali:", data);
    return [];
  } catch (error) {
    console.error("Error fetchAllSize:", error);
    return [];
  }
};

export const createNewSize = async (nama_ukuran_satuan) => {
  try {
    const response = await fetch(`${BASE_URL}master/ukuran-satuan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama_ukuran_satuan }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Create size gagal:", err || response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error createNewSize:", error);
    return null;
  }
};

// ========== KEMASAN ==========
export const fetchAllKemasan = async () => {
  try {
    const response = await fetch(`${BASE_URL}master/kemasan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Gagal fetch kemasan:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();

    if (data?.data && Array.isArray(data.data)) {
      return data.data;
    }

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  } catch (error) {
    console.error("Error fetchAllKemasan:", error);
    return [];
  }
};

export const createNewKemasan = async (nama_kemasan) => {
  try {
    const response = await fetch(`${BASE_URL}master/kemasan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama_kemasan }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Create kemasan gagal:", err || response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error createNewKemasan:", error);
    return null;
  }
};

// ========== METODE PENGIRIMAN ==========
export const fetchAllMetodePengiriman = async () => {
  try {
    const response = await fetch(`${BASE_URL}master/metode-pengiriman`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) return [];

    const data = await response.json();
    return data?.data || data || [];
  } catch (error) {
    console.error("Error fetchAllMetodePengiriman:", error);
    return [];
  }
};

// ========== STATUS PENGIRIMAN ==========
export const fetchAllStatusPengiriman = async () => {
  try {
    const response = await fetch(`${BASE_URL}master/status-pengiriman`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) return [];

    const data = await response.json();
    return data?.data || data || [];
  } catch (error) {
    console.error("Error fetchAllStatusPengiriman:", error);
    return [];
  }
};

