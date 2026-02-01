import db from './src/config/db.js';
import bcrypt from 'bcrypt';

async function seedData() {
  try {
    console.log("🌱 Seeding initial data...");

    // 1. Seed Pengguna (Admin)
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.query(`
      INSERT INTO pengguna (nama_pengguna, email, jabatan, is_admin, kata_sandi)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (email) DO NOTHING
    `, ['Admin SEHUB', 'admin@sehub.com', 'Administrator', true, hashedPassword]);
    console.log("✅ Default admin created: admin@sehub.com / admin123");

    // 2. Seed Ukuran Satuan
    const satuanValues = ['mg', 'gr', 'kg', 'ml', 'liter', 'pcs', 'box'];
    for (const val of satuanValues) {
      await db.query("INSERT INTO ukuran_satuan (nama_ukuran_satuan) VALUES ($1)", [val]);
    }
    console.log("✅ Seeded ukuran_satuan");

    // 3. Seed Kemasan
    const kemasanValues = ['Botol', 'Sachet', 'Kardus', 'Plastik', 'Kaleng'];
    for (const val of kemasanValues) {
      await db.query("INSERT INTO kemasan (nama_kemasan) VALUES ($1)", [val]);
    }
    console.log("✅ Seeded kemasan");

    // 4. Seed Metode Pengiriman
    const metodeValues = ['Kurir Internal', 'JNE', 'J&T', 'SiCepat', 'Ambil Sendiri'];
    for (const val of metodeValues) {
      await db.query("INSERT INTO metode_pengiriman (nama_metode) VALUES ($1)", [val]);
    }
    console.log("✅ Seeded metode_pengiriman");

    // 5. Seed Status Pengiriman
    const statusValues = ['Diproses', 'Dalam Perjalanan', 'Diterima', 'Dibatalkan'];
    for (const val of statusValues) {
      await db.query("INSERT INTO status_pengiriman (nama_status) VALUES ($1)", [val]);
    }
    console.log("✅ Seeded status_pengiriman");

    // 6. Seed Kondisi Stok
    const kondisiValues = ['SESUAI', 'LEBIH', 'KURANG', 'RUSAK'];
    for (const val of kondisiValues) {
      await db.query("INSERT INTO kondisi_stok (nama_kondisi) VALUES ($1)", [val]);
    }
    console.log("✅ Seeded kondisi_stok");

    console.log("🎉 Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedData();
