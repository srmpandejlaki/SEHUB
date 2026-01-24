import db from './db-sqlite.js';

// Initialize SQLite database tables
export async function initializeDatabase() {
  console.log('Initializing SQLite database tables...');

  // Wait for database to be ready
  await db.init();

  // Create tables in correct order (respecting foreign key constraints)
  
  // ========== MASTER DATA TABLES ==========
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS pengguna (
      id_pengguna INTEGER PRIMARY KEY AUTOINCREMENT,
      nama_pengguna TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      kata_sandi TEXT NOT NULL,
      jabatan TEXT,
      is_admin INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS nama_produk (
      id_nama_produk INTEGER PRIMARY KEY AUTOINCREMENT,
      nama_produk TEXT NOT NULL
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS ukuran_satuan (
      id_ukuran_satuan INTEGER PRIMARY KEY AUTOINCREMENT,
      nama_ukuran_satuan TEXT NOT NULL
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS kemasan (
      id_kemasan INTEGER PRIMARY KEY AUTOINCREMENT,
      nama_kemasan TEXT NOT NULL
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS metode_pengiriman (
      id_metode_pengiriman INTEGER PRIMARY KEY AUTOINCREMENT,
      nama_metode TEXT NOT NULL
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS status_pengiriman (
      id_status INTEGER PRIMARY KEY AUTOINCREMENT,
      nama_status TEXT NOT NULL
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS kondisi (
      id_kondisi INTEGER PRIMARY KEY AUTOINCREMENT,
      nama_kondisi TEXT NOT NULL
    )
  `);

  // ========== PRODUCT TABLE ==========
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS produk (
      id_produk TEXT PRIMARY KEY,
      id_nama_produk INTEGER,
      ukuran_produk REAL,
      id_ukuran_satuan INTEGER,
      id_kemasan INTEGER,
      gambar_produk TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_nama_produk) REFERENCES nama_produk(id_nama_produk),
      FOREIGN KEY (id_ukuran_satuan) REFERENCES ukuran_satuan(id_ukuran_satuan),
      FOREIGN KEY (id_kemasan) REFERENCES kemasan(id_kemasan)
    )
  `);

  // ========== INVENTORY TABLES ==========
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS barang_masuk (
      id_barang_masuk INTEGER PRIMARY KEY AUTOINCREMENT,
      tanggal DATE NOT NULL,
      catatan TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS detail_barang_masuk (
      id_detail INTEGER PRIMARY KEY AUTOINCREMENT,
      id_barang_masuk INTEGER,
      id_produk TEXT,
      jumlah INTEGER NOT NULL,
      tanggal_kadaluwarsa DATE,
      catatan TEXT,
      FOREIGN KEY (id_barang_masuk) REFERENCES barang_masuk(id_barang_masuk) ON DELETE CASCADE,
      FOREIGN KEY (id_produk) REFERENCES produk(id_produk)
    )
  `);

  // ========== DISTRIBUTION TABLES ==========
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS distribusi (
      id_distribusi INTEGER PRIMARY KEY AUTOINCREMENT,
      tanggal DATE NOT NULL,
      nama_pemesan TEXT,
      id_metode_pengiriman INTEGER,
      id_status INTEGER,
      catatan_distribusi TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_metode_pengiriman) REFERENCES metode_pengiriman(id_metode_pengiriman),
      FOREIGN KEY (id_status) REFERENCES status_pengiriman(id_status)
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS detail_distribusi (
      id_detail_distribusi INTEGER PRIMARY KEY AUTOINCREMENT,
      id_distribusi INTEGER,
      id_detail_barang_masuk INTEGER,
      jumlah INTEGER NOT NULL,
      FOREIGN KEY (id_distribusi) REFERENCES distribusi(id_distribusi) ON DELETE CASCADE,
      FOREIGN KEY (id_detail_barang_masuk) REFERENCES detail_barang_masuk(id_detail)
    )
  `);

  // ========== RETURN TABLES ==========
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS return_barang (
      id_return INTEGER PRIMARY KEY AUTOINCREMENT,
      tanggal DATE NOT NULL,
      catatan TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS return_barang_detail (
      id_return_detail INTEGER PRIMARY KEY AUTOINCREMENT,
      id_return INTEGER,
      id_detail_distribusi INTEGER,
      jumlah INTEGER NOT NULL,
      catatan TEXT,
      FOREIGN KEY (id_return) REFERENCES return_barang(id_return) ON DELETE CASCADE,
      FOREIGN KEY (id_detail_distribusi) REFERENCES detail_distribusi(id_detail_distribusi)
    )
  `);

  // ========== STOCK ADJUSTMENT TABLES ==========
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS penyesuaian_stok (
      id_penyesuaian INTEGER PRIMARY KEY AUTOINCREMENT,
      tanggal DATE NOT NULL,
      catatan TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS penyesuaian_stok_detail (
      id_penyesuaian_detail INTEGER PRIMARY KEY AUTOINCREMENT,
      id_penyesuaian INTEGER,
      id_detail_barang_masuk INTEGER,
      stok_sistem INTEGER NOT NULL,
      stok_gudang INTEGER NOT NULL,
      id_kondisi INTEGER,
      catatan TEXT,
      FOREIGN KEY (id_penyesuaian) REFERENCES penyesuaian_stok(id_penyesuaian) ON DELETE CASCADE,
      FOREIGN KEY (id_detail_barang_masuk) REFERENCES detail_barang_masuk(id_detail),
      FOREIGN KEY (id_kondisi) REFERENCES kondisi(id_kondisi)
    )
  `);

  // ========== INSERT DEFAULT DATA ==========
  
  // Check and insert default status pengiriman
  const existingStatus = await db.query('SELECT COUNT(*) as count FROM status_pengiriman');
  if (existingStatus.rows[0]?.count === 0) {
    await db.query("INSERT INTO status_pengiriman (nama_status) VALUES (?)", ['Diproses']);
    await db.query("INSERT INTO status_pengiriman (nama_status) VALUES (?)", ['Dikirim']);
    await db.query("INSERT INTO status_pengiriman (nama_status) VALUES (?)", ['Selesai']);
    await db.query("INSERT INTO status_pengiriman (nama_status) VALUES (?)", ['Dibatalkan']);
  }

  // Check and insert default kondisi
  const existingKondisi = await db.query('SELECT COUNT(*) as count FROM kondisi');
  if (existingKondisi.rows[0]?.count === 0) {
    await db.query("INSERT INTO kondisi (nama_kondisi) VALUES (?)", ['Baik']);
    await db.query("INSERT INTO kondisi (nama_kondisi) VALUES (?)", ['Rusak']);
    await db.query("INSERT INTO kondisi (nama_kondisi) VALUES (?)", ['Expired']);
  }

  // Create default admin user if none exists
  const existingUsers = await db.query('SELECT COUNT(*) as count FROM pengguna');
  if (existingUsers.rows[0]?.count === 0) {
    // Import bcryptjs to hash password
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.default.hash('admin123', 10);
    await db.query(
      "INSERT INTO pengguna (nama_pengguna, email, kata_sandi, jabatan, is_admin) VALUES (?, ?, ?, ?, ?)",
      ['Admin', 'admin@sehub.com', hashedPassword, 'Administrator', 1]
    );
    console.log('Created default admin user: admin@sehub.com / admin123');
  }

  db.save();
  console.log('SQLite database initialized successfully!');
}

export default initializeDatabase;
