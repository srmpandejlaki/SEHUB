import { BASE_URL } from "../index.js";

export const fetchAllUser = async () => {
 try {
  const response = await fetch(`${BASE_URL}users/`, {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  });

  // Jika status bukan 200–299
  if (!response.ok) {
   console.error("Gagal fetch user:", response.status, response.statusText);
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
  console.error("Gagal memuat data user:", error);
  return [];
 } 
};