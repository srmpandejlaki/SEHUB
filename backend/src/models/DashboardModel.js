import db from "../config/db.js";

const DashboardModel = {
  // Get dashboard statistics
  getStatistics: async () => {
    // Count total products
    const productCount = await db.query("SELECT COUNT(*) FROM produk");
    
    // Count unique customers (nama_pemesan from distribusi)
    const customerCount = await db.query("SELECT COUNT(DISTINCT nama_pemesan) FROM distribusi");
    
    // Get products with current stock (directly from detail_barang_masuk since FEFO modifies it)
    const productsWithStock = await db.query(`
      SELECT 
        p.id_produk,
        n.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan,
        k.nama_kemasan,
        p.stok_minimum,
        COALESCE(inv.stok_sekarang, 0) as stok_sekarang
      FROM produk p
      LEFT JOIN nama_produk n ON p.id_nama_produk = n.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kemasan k ON p.id_kemasan = k.id_kemasan
      LEFT JOIN (
        SELECT id_produk, SUM(jumlah_barang_masuk) as stok_sekarang
        FROM detail_barang_masuk
        GROUP BY id_produk
      ) inv ON p.id_produk = inv.id_produk
      ORDER BY stok_sekarang ASC
    `);

    return {
      totalProducts: parseInt(productCount.rows[0].count) || 0,
      totalCustomers: parseInt(customerCount.rows[0].count) || 0,
      productsWithStock: productsWithStock.rows
    };
  },

  // Get products expiring soon (within 30 days) or already expired
  getExpiringSoon: async (daysAhead = 30) => {
    const result = await db.query(`
      SELECT 
        dbm.id_detail_barang_masuk,
        dbm.id_produk,
        n.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan,
        k.nama_kemasan,
        dbm.jumlah_barang_masuk,
        dbm.tanggal_expired,
        (dbm.tanggal_expired - CURRENT_DATE) as days_until_expired
      FROM detail_barang_masuk dbm
      JOIN produk p ON dbm.id_produk = p.id_produk
      JOIN nama_produk n ON p.id_nama_produk = n.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kemasan k ON p.id_kemasan = k.id_kemasan
      WHERE dbm.tanggal_expired <= CURRENT_DATE + CAST($1 AS INTEGER)
      ORDER BY dbm.tanggal_expired ASC
    `, [daysAhead]);

    console.log("Expiring soon query returned:", result.rows.length, "items");
    return result.rows;
  },

  // Get recent distributions (last 10)
  getRecentDistributions: async (limit = 10) => {
    const result = await db.query(`
      SELECT 
        d.id_distribusi,
        d.tanggal_distribusi,
        d.nama_pemesan,
        mp.nama_metode,
        sp.nama_status,
        dd.id_produk,
        n.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan,
        dd.jumlah_barang_distribusi
      FROM distribusi d
      LEFT JOIN metode_pengiriman mp ON d.id_metode_pengiriman = mp.id_metode_pengiriman
      LEFT JOIN status_pengiriman sp ON d.id_status = sp.id_status
      LEFT JOIN detail_distribusi dd ON d.id_distribusi = dd.id_distribusi
      LEFT JOIN produk p ON dd.id_produk = p.id_produk
      LEFT JOIN nama_produk n ON p.id_nama_produk = n.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      ORDER BY d.tanggal_distribusi DESC, d.id_distribusi DESC
      LIMIT $1
    `, [limit]);

    // Group by distribusi
    const grouped = {};
    let totalItems = 0;

    result.rows.forEach(row => {
      if (!grouped[row.id_distribusi]) {
        grouped[row.id_distribusi] = {
          id_distribusi: row.id_distribusi,
          tanggal_distribusi: row.tanggal_distribusi,
          nama_pemesan: row.nama_pemesan,
          nama_metode: row.nama_metode,
          nama_status: row.nama_status,
          items: [],
          total_jumlah: 0
        };
      }

      if (row.id_produk) {
        grouped[row.id_distribusi].items.push({
          id_produk: row.id_produk,
          nama_produk: row.nama_produk,
          ukuran_produk: row.ukuran_produk,
          nama_ukuran_satuan: row.nama_ukuran_satuan,
          jumlah: row.jumlah_barang_distribusi
        });
        grouped[row.id_distribusi].total_jumlah += row.jumlah_barang_distribusi || 0;
      }
    });

    return Object.values(grouped);
  },

  // Get all pending distributions (status: Diproses or Dalam Perjalanan)
  getPendingDistributions: async () => {
    const result = await db.query(`
      SELECT 
        d.id_distribusi,
        d.tanggal_distribusi,
        d.nama_pemesan,
        mp.nama_metode,
        sp.nama_status,
        dd.id_produk,
        n.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan,
        dd.jumlah_barang_distribusi
      FROM distribusi d
      LEFT JOIN metode_pengiriman mp ON d.id_metode_pengiriman = mp.id_metode_pengiriman
      LEFT JOIN status_pengiriman sp ON d.id_status = sp.id_status
      LEFT JOIN detail_distribusi dd ON d.id_distribusi = dd.id_distribusi
      LEFT JOIN produk p ON dd.id_produk = p.id_produk
      LEFT JOIN nama_produk n ON p.id_nama_produk = n.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      WHERE sp.nama_status IN ('Diproses', 'Dalam Perjalanan')
      ORDER BY d.tanggal_distribusi DESC, d.id_distribusi DESC
    `);

    // Group by distribusi
    const grouped = {};

    result.rows.forEach(row => {
      if (!grouped[row.id_distribusi]) {
        grouped[row.id_distribusi] = {
          id_distribusi: row.id_distribusi,
          tanggal_distribusi: row.tanggal_distribusi,
          nama_pemesan: row.nama_pemesan,
          nama_metode: row.nama_metode,
          nama_status: row.nama_status,
          items: [],
          total_jumlah: 0
        };
      }

      if (row.id_produk) {
        grouped[row.id_distribusi].items.push({
          id_produk: row.id_produk,
          nama_produk: row.nama_produk,
          ukuran_produk: row.ukuran_produk,
          nama_ukuran_satuan: row.nama_ukuran_satuan,
          jumlah: row.jumlah_barang_distribusi
        });
        grouped[row.id_distribusi].total_jumlah += row.jumlah_barang_distribusi || 0;
      }
    });

    return Object.values(grouped);
  },

  // Get monthly stats for charts (inventory and distribution by day)
  // Optional id_produk parameter to filter by specific product
  getMonthlyStats: async (id_produk = null) => {
    // Get first and last day of current month
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDate = firstDay.toISOString().split('T')[0];
    const endDate = lastDay.toISOString().split('T')[0];

    // Build queries with optional product filter
    let inventoryQuery, distributionQuery;
    let queryParams = [startDate, endDate];

    if (id_produk) {
      queryParams.push(id_produk);
      
      inventoryQuery = `
        SELECT 
          DATE(bm.tanggal_masuk) as tanggal,
          COALESCE(SUM(dbm.jumlah_barang_masuk), 0) as total
        FROM barang_masuk bm
        LEFT JOIN detail_barang_masuk dbm ON bm.id_barang_masuk = dbm.id_barang_masuk
        WHERE DATE(bm.tanggal_masuk) >= $1 AND DATE(bm.tanggal_masuk) <= $2
          AND dbm.id_produk = $3
        GROUP BY DATE(bm.tanggal_masuk)
        ORDER BY DATE(bm.tanggal_masuk) ASC
      `;

      distributionQuery = `
        SELECT 
          DATE(d.tanggal_distribusi) as tanggal,
          COALESCE(SUM(dd.jumlah_barang_distribusi), 0) as total
        FROM distribusi d
        LEFT JOIN detail_distribusi dd ON d.id_distribusi = dd.id_distribusi
        WHERE DATE(d.tanggal_distribusi) >= $1 AND DATE(d.tanggal_distribusi) <= $2
          AND dd.id_produk = $3
        GROUP BY DATE(d.tanggal_distribusi)
        ORDER BY DATE(d.tanggal_distribusi) ASC
      `;
    } else {
      inventoryQuery = `
        SELECT 
          DATE(bm.tanggal_masuk) as tanggal,
          COALESCE(SUM(dbm.jumlah_barang_masuk), 0) as total
        FROM barang_masuk bm
        LEFT JOIN detail_barang_masuk dbm ON bm.id_barang_masuk = dbm.id_barang_masuk
        WHERE DATE(bm.tanggal_masuk) >= $1 AND DATE(bm.tanggal_masuk) <= $2
        GROUP BY DATE(bm.tanggal_masuk)
        ORDER BY DATE(bm.tanggal_masuk) ASC
      `;

      distributionQuery = `
        SELECT 
          DATE(d.tanggal_distribusi) as tanggal,
          COALESCE(SUM(dd.jumlah_barang_distribusi), 0) as total
        FROM distribusi d
        LEFT JOIN detail_distribusi dd ON d.id_distribusi = dd.id_distribusi
        WHERE DATE(d.tanggal_distribusi) >= $1 AND DATE(d.tanggal_distribusi) <= $2
        GROUP BY DATE(d.tanggal_distribusi)
        ORDER BY DATE(d.tanggal_distribusi) ASC
      `;
    }

    const inventoryResult = await db.query(inventoryQuery, queryParams);
    const distributionResult = await db.query(distributionQuery, queryParams);

    // Create array of all days in month with data
    const daysInMonth = lastDay.getDate();
    const chartData = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      
      const invData = inventoryResult.rows.find(r => 
        new Date(r.tanggal).toISOString().split('T')[0] === dateStr
      );
      const distData = distributionResult.rows.find(r => 
        new Date(r.tanggal).toISOString().split('T')[0] === dateStr
      );
      
      chartData.push({
        tanggal: day,
        inventori: parseInt(invData?.total) || 0,
        distribusi: parseInt(distData?.total) || 0
      });
    }

    return {
      bulan: now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
      data: chartData
    };
  },

  // Get monthly summary (total incoming, distribution, return, adjustment for current month)
  getMonthlySummary: async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDate = firstDay.toISOString().split('T')[0];
    const endDate = lastDay.toISOString().split('T')[0];

    // Total incoming this month
    const incomingResult = await db.query(`
      SELECT COALESCE(SUM(dbm.jumlah_barang_masuk), 0) as total
      FROM barang_masuk bm
      LEFT JOIN detail_barang_masuk dbm ON bm.id_barang_masuk = dbm.id_barang_masuk
      WHERE DATE(bm.tanggal_masuk) >= $1 AND DATE(bm.tanggal_masuk) <= $2
    `, [startDate, endDate]);

    // Total distribution this month
    const distributionResult = await db.query(`
      SELECT COALESCE(SUM(dd.jumlah_barang_distribusi), 0) as total
      FROM distribusi d
      LEFT JOIN detail_distribusi dd ON d.id_distribusi = dd.id_distribusi
      WHERE DATE(d.tanggal_distribusi) >= $1 AND DATE(d.tanggal_distribusi) <= $2
    `, [startDate, endDate]);

    // Total return this month
    const returnResult = await db.query(`
      SELECT COALESCE(SUM(rd.jumlah_barang_return), 0) as total
      FROM return_barang r
      LEFT JOIN return_barang_detail rd ON r.id_return = rd.id_return
      WHERE DATE(r.tanggal_return) >= $1 AND DATE(r.tanggal_return) <= $2
    `, [startDate, endDate]);

    // Total adjustment count this month (count of adjustments where stok differs)
    const adjustmentResult = await db.query(`
      SELECT COUNT(DISTINCT ps.id_penyesuaian_stok) as total
      FROM penyesuaian_stok ps
      LEFT JOIN penyesuaian_stok_detail psd ON ps.id_penyesuaian_stok = psd.id_penyesuaian_stok
      WHERE DATE(ps.tanggal_penyesuaian) >= $1 AND DATE(ps.tanggal_penyesuaian) <= $2
        AND psd.stok_gudang != psd.stok_sistem
    `, [startDate, endDate]);

    return {
      bulan: now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
      totalBarangMasuk: parseInt(incomingResult.rows[0]?.total) || 0,
      totalDistribusi: parseInt(distributionResult.rows[0]?.total) || 0,
      totalReturn: parseInt(returnResult.rows[0]?.total) || 0,
      totalPenyesuaian: parseInt(adjustmentResult.rows[0]?.total) || 0
    };
  },
};

export default DashboardModel;
