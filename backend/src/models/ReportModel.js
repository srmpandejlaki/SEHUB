import db from "../config/db.js";

const ReportModel = {
  // Get inventory data (barang masuk)
  getInventoryData: async (id_produk = null) => {
    let query = `
      SELECT 
        bm.tanggal_masuk as tanggal,
        dbm.id_produk,
        np.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan,
        k.nama_kemasan,
        dbm.jumlah_barang_masuk as jumlah,
        dbm.tanggal_expired,
        bm.catatan_barang_masuk as catatan
      FROM barang_masuk bm
      JOIN detail_barang_masuk dbm ON bm.id_barang_masuk = dbm.id_barang_masuk
      JOIN produk p ON dbm.id_produk = p.id_produk
      LEFT JOIN nama_produk np ON p.id_nama_produk = np.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kemasan k ON p.id_kemasan = k.id_kemasan
      ${id_produk ? 'WHERE dbm.id_produk = $1' : ''}
      ORDER BY bm.tanggal_masuk DESC
    `;
    const result = await db.query(query, id_produk ? [id_produk] : []);
    return result.rows;
  },

  // Get distribution data
  getDistributionData: async (id_produk = null) => {
    let query = `
      SELECT 
        d.tanggal_distribusi as tanggal,
        dd.id_produk,
        np.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan,
        k.nama_kemasan,
        dd.jumlah_barang_distribusi as jumlah,
        d.nama_pemesan,
        d.catatan_distribusi as catatan
      FROM distribusi d
      JOIN detail_distribusi dd ON d.id_distribusi = dd.id_distribusi
      JOIN produk p ON dd.id_produk = p.id_produk
      LEFT JOIN nama_produk np ON p.id_nama_produk = np.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kemasan k ON p.id_kemasan = k.id_kemasan
      ${id_produk ? 'WHERE dd.id_produk = $1' : ''}
      ORDER BY d.tanggal_distribusi DESC
    `;
    const result = await db.query(query, id_produk ? [id_produk] : []);
    return result.rows;
  },

  // Get return data
  getReturnData: async (id_produk = null) => {
    let query = `
      SELECT 
        r.tanggal_return as tanggal,
        dd.id_produk,
        np.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan,
        k.nama_kemasan,
        rbd.jumlah_barang_return as jumlah,
        r.catatan_return as catatan
      FROM return_barang r
      LEFT JOIN return_barang_detail rbd ON r.id_return = rbd.id_return
      LEFT JOIN detail_distribusi dd ON rbd.id_detail_distribusi = dd.id_detail_distribusi
      LEFT JOIN produk p ON dd.id_produk = p.id_produk
      LEFT JOIN nama_produk np ON p.id_nama_produk = np.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kemasan k ON p.id_kemasan = k.id_kemasan
      ${id_produk ? 'WHERE dd.id_produk = $1' : ''}
      ORDER BY r.tanggal_return DESC
    `;
    const result = await db.query(query, id_produk ? [id_produk] : []);
    return result.rows;
  },

  // Get stock adjustment data
  getStockAdjustmentData: async (id_produk = null) => {
    let query = `
      SELECT 
        ps.tanggal_penyesuaian as tanggal,
        psd.id_produk,
        np.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan,
        k.nama_kemasan,
        psd.stok_gudang,
        psd.stok_sistem,
        (psd.stok_gudang - psd.stok_sistem) as selisih,
        ks.nama_kondisi,
        ps.catatan_penyesuaian as catatan
      FROM penyesuaian_stok ps
      LEFT JOIN penyesuaian_stok_detail psd ON ps.id_penyesuaian_stok = psd.id_penyesuaian_stok
      LEFT JOIN produk p ON psd.id_produk = p.id_produk
      LEFT JOIN nama_produk np ON p.id_nama_produk = np.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kemasan k ON p.id_kemasan = k.id_kemasan
      LEFT JOIN kondisi_stok ks ON psd.id_kondisi_stok = ks.id_kondisi_stok
      ${id_produk ? 'WHERE psd.id_produk = $1' : ''}
      ORDER BY ps.tanggal_penyesuaian DESC
    `;
    const result = await db.query(query, id_produk ? [id_produk] : []);
    return result.rows;
  },

  // Get all report data
  getAllReportData: async (id_produk = null) => {
    // Use Promise.allSettled to handle individual errors
    const results = await Promise.allSettled([
      ReportModel.getInventoryData(id_produk),
      ReportModel.getDistributionData(id_produk),
      ReportModel.getReturnData(id_produk),
      ReportModel.getStockAdjustmentData(id_produk)
    ]);

    return {
      inventory: results[0].status === 'fulfilled' ? results[0].value : [],
      distribution: results[1].status === 'fulfilled' ? results[1].value : [],
      returns: results[2].status === 'fulfilled' ? results[2].value : [],
      adjustments: results[3].status === 'fulfilled' ? results[3].value : []
    };
  },

  // Get list of products for filter dropdown
  getProductList: async () => {
    const result = await db.query(`
      SELECT 
        p.id_produk,
        np.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan
      FROM produk p
      LEFT JOIN nama_produk np ON p.id_nama_produk = np.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      ORDER BY np.nama_produk ASC
    `);
    return result.rows;
  }
};

export default ReportModel;
