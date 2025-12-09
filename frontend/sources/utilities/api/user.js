import { BASE_URL } from "../index.js";

export const fetchAllUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}users/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Gagal fetch user:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();

    if (data?.data && Array.isArray(data.data)) return data.data;
    if (Array.isArray(data)) return data;

    console.error("Struktur data tidak dikenali:", data);
    return [];
  } catch (error) {
    console.error("Gagal memuat data user:", error);
    return [];
  }
};

export const createUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Create user gagal:", err || response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error createUser:", error);
    return null;
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await fetch(`${BASE_URL}users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Update user gagal:", err || response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error updateUser:", error);
    return null;
  }
};
