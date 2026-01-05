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

export const loginUser = async (email, kata_sandi) => {
  try {
    const response = await fetch(`${BASE_URL}users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, kata_sandi }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Login gagal" };
    }

    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error loginUser:", error);
    return { success: false, message: "Terjadi kesalahan saat login" };
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

export const updateUser = async (id_pengguna, user) => {
  try {
    const response = await fetch(`${BASE_URL}users/${id_pengguna}`, {
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

export const deleteUser = async (id_pengguna) => {
  try {
    const response = await fetch(`${BASE_URL}users/${id_pengguna}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    console.error("Error deleteUser:", error.message);
    return null;
  }
};

