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
    const formData = new FormData();

    // append text fields
    formData.append("nama_produk", productData.nama_produk);
    formData.append("ukuran_produk", productData.ukuran_produk);
    formData.append("ukuran_satuan", productData.ukuran_satuan);
    formData.append("kemasan_produk", productData.kemasan_produk);
    formData.append("stok_minimum", productData.stok_minimum);

    // append file only if exists
    if (productData.path_gambar instanceof File) {
      formData.append("path_gambar", productData.path_gambar);
    }

    const response = await fetch(`${BASE_URL}products/`, {
      method: "POST",
      body: formData, // jangan pakai headers Content-Type
    });

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error createProduct:", error);
    return null;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const formData = new FormData();

    // append text fields
    formData.append("nama_produk", productData.nama_produk);
    formData.append("ukuran_produk", productData.ukuran_produk);
    formData.append("ukuran_satuan", productData.ukuran_satuan);
    formData.append("kemasan_produk", productData.kemasan_produk);
    formData.append("stok_minimum", productData.stok_minimum);

    // append file only if exists
    if (productData.path_gambar instanceof File) {
      formData.append("path_gambar", productData.path_gambar);
    }

    const response = await fetch(`${BASE_URL}products/${id}`, {
      method: "PUT",
      body: formData, // jangan pakai headers Content-Type
    });

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error updateProduct:", error);
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}products/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error deleteProduct:", error);
    return null;
  }
};

export const deleteAllProduct = async () => {
  return fetch(`${BASE_URL}products/`, {
    method: "DELETE",
  })
};
