import { BASE_URL } from "../index.js";

// ========== NAMA PRODUK ==========
export const fetchAllNamaProduk = async () => {
  try {
    const response = await fetch(`${BASE_URL}master/nama-produk`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Gagal fetch nama produk:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    if (data?.data && Array.isArray(data.data)) return data.data;
    if (Array.isArray(data)) return data;
    return [];
  } catch (error) {
    console.error("Error fetchAllNamaProduk:", error);
    return [];
  }
};

export const createNewNamaProduk = async (nama_produk) => {
  try {
    const response = await fetch(`${BASE_URL}master/nama-produk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_produk }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Create nama produk gagal:", err || response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error createNewNamaProduk:", error);
    return null;
  }
};

export const updateNamaProduk = async (id, nama_produk) => {
  try {
    const response = await fetch(`${BASE_URL}master/nama-produk/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_produk }),
    });
    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error updateNamaProduk:", error);
    return null;
  }
};

export const deleteNamaProduk = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}master/nama-produk/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleteNamaProduk:", error);
    return false;
  }
};

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

export const updateSize = async (id, nama_ukuran_satuan) => {
  try {
    const response = await fetch(`${BASE_URL}master/ukuran-satuan/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_ukuran_satuan }),
    });
    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error updateSize:", error);
    return null;
  }
};

export const deleteSize = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}master/ukuran-satuan/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleteSize:", error);
    return false;
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

export const updateKemasan = async (id, nama_kemasan) => {
  try {
    const response = await fetch(`${BASE_URL}master/kemasan/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_kemasan }),
    });
    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error updateKemasan:", error);
    return null;
  }
};

export const deleteKemasan = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}master/kemasan/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleteKemasan:", error);
    return false;
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

export const createNewMetodePengiriman = async (nama_metode) => {
  try {
    const response = await fetch(`${BASE_URL}master/metode-pengiriman`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_metode }),
    });

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error createNewMetodePengiriman:", error);
    return null;
  }
};

export const updateMetodePengiriman = async (id, nama_metode) => {
  try {
    const response = await fetch(`${BASE_URL}master/metode-pengiriman/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_metode }),
    });
    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error updateMetodePengiriman:", error);
    return null;
  }
};

export const deleteMetodePengiriman = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}master/metode-pengiriman/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleteMetodePengiriman:", error);
    return false;
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

export const createNewStatusPengiriman = async (nama_status) => {
  try {
    const response = await fetch(`${BASE_URL}master/status-pengiriman`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_status }),
    });

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error createNewStatusPengiriman:", error);
    return null;
  }
};

export const updateStatusPengiriman = async (id, nama_status) => {
  try {
    const response = await fetch(`${BASE_URL}master/status-pengiriman/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_status }),
    });
    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error updateStatusPengiriman:", error);
    return null;
  }
};

export const deleteStatusPengiriman = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}master/status-pengiriman/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleteStatusPengiriman:", error);
    return false;
  }
};
