import { BASE_URL } from "../index.js";

// GET all distribution data
export const fetchAllDistributions = async () => {
  try {
    const response = await fetch(`${BASE_URL}distribution/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Gagal fetch data distribusi:", response.status, response.statusText);
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
    console.error("Error fetchAllDistributions:", error);
    return [];
  }
};

// POST create distribution
export const createDistribution = async (distributionData) => {
  try {
    const response = await fetch(`${BASE_URL}distribution/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(distributionData),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Create distribution gagal:", err || response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error createDistribution:", error);
    return null;
  }
};

// PUT update distribution
export const updateDistribution = async (id_distribusi, distributionData) => {
  try {
    const response = await fetch(`${BASE_URL}distribution/${id_distribusi}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(distributionData),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Update distribution gagal:", err || response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error updateDistribution:", error);
    return null;
  }
};

// PATCH update status only
export const updateDistributionStatus = async (id_distribusi, id_status) => {
  try {
    const response = await fetch(`${BASE_URL}distribution/${id_distribusi}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_status }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Update status gagal:", err || response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error updateDistributionStatus:", error);
    return null;
  }
};

// DELETE distribution
export const deleteDistribution = async (id_distribusi) => {
  try {
    const response = await fetch(`${BASE_URL}distribution/${id_distribusi}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Delete distribution gagal:", err || response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error deleteDistribution:", error);
    return null;
  }
};
