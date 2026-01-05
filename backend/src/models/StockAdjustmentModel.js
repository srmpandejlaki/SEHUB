import db from "../config/db.js";

const StockAdjustmentModel = {
  // Get inventory data grouped by product for stock adjustment
  getInventoryForAdjustment: async () => {
    const result = await db.query(`
      SELECT 
        p.id_produk,
        np.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan,
        k.nama_kemasan,
        dbm.id_detail_barang_masuk,
        dbm.id_barang_masuk,
        bm.tanggal_masuk,
        dbm.tanggal_expired,
        dbm.jumlah_barang_masuk,
        COALESCE(
          (SELECT SUM(dd.jumlah_barang_distribusi) 
           FROM detail_distribusi dd 
           WHERE dd.id_produk = p.id_produk
           AND dd.id_produk = dbm.id_produk),
          0
        ) as total_distribusi,
        COALESCE(
          (SELECT SUM(rbd.jumlah_barang_return) 
           FROM return_barang_detail rbd 
           JOIN detail_distribusi dd ON rbd.id_detail_distribusi = dd.id_detail_distribusi
           WHERE dd.id_produk = p.id_produk),
          0
        ) as total_return
      FROM produk p
      JOIN nama_produk np ON p.id_nama_produk = np.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kemasan k ON p.id_kemasan = k.id_kemasan
      LEFT JOIN detail_barang_masuk dbm ON p.id_produk = dbm.id_produk
      LEFT JOIN barang_masuk bm ON dbm.id_barang_masuk = bm.id_barang_masuk
      WHERE dbm.id_detail_barang_masuk IS NOT NULL
      ORDER BY p.id_produk, bm.tanggal_masuk DESC
    `);

    // Group by product
    const grouped = {};
    result.rows.forEach(row => {
      if (!grouped[row.id_produk]) {
        grouped[row.id_produk] = {
          id_produk: row.id_produk,
          nama_produk: row.nama_produk,
          ukuran_produk: row.ukuran_produk,
          nama_ukuran_satuan: row.nama_ukuran_satuan,
          nama_kemasan: row.nama_kemasan,
          items: []
        };
      }

      grouped[row.id_produk].items.push({
        id_detail_barang_masuk: row.id_detail_barang_masuk,
        id_barang_masuk: row.id_barang_masuk,
        tanggal_masuk: row.tanggal_masuk,
        tanggal_expired: row.tanggal_expired,
        jumlah_barang_masuk: row.jumlah_barang_masuk
      });
    });

    return Object.values(grouped);
  },

  // Adjust stock - creates inventory or distribution entries as needed
  adjustStock: async (adjustments) => {
    const client = await db.connect();
    const today = new Date().toISOString().split('T')[0];
    const catatan = "penyesuaian stok gudang";

    try {
      await client.query("BEGIN");

      const results = [];

      for (const adj of adjustments) {
        const { id_produk, selisih, alasan, tanggal_expired } = adj;

        if (selisih > 0) {
          // Stock di gudang lebih banyak - buat data barang masuk
          const insertStock = await client.query(
            `INSERT INTO barang_masuk (tanggal_masuk, catatan_barang_masuk) 
             VALUES ($1, $2) RETURNING id_barang_masuk`,
            [today, catatan + (alasan ? ` - ${alasan}` : '')]
          );

          const id_barang_masuk = insertStock.rows[0].id_barang_masuk;

          await client.query(
            `INSERT INTO detail_barang_masuk 
             (id_barang_masuk, id_produk, jumlah_barang_masuk, tanggal_expired)
             VALUES ($1, $2, $3, $4)`,
            [id_barang_masuk, id_produk, selisih, tanggal_expired || null]
          );

          results.push({ 
            type: 'inventory', 
            id_produk, 
            jumlah: selisih,
            id_barang_masuk 
          });

        } else if (selisih < 0) {
          // Stock di gudang lebih sedikit - buat data distribusi (pengurangan)
          const insertDist = await client.query(
            `INSERT INTO distribusi (tanggal_distribusi, nama_pemesan, id_metode_pengiriman, id_status, catatan_distribusi) 
             VALUES ($1, $2, 
               (SELECT id_metode_pengiriman FROM metode_pengiriman LIMIT 1),
               (SELECT id_status FROM status_pengiriman LIMIT 1),
               $3) 
             RETURNING id_distribusi`,
            [today, 'Sistem - Penyesuaian Stok', catatan + (alasan ? ` - ${alasan}` : '')]
          );

          const id_distribusi = insertDist.rows[0].id_distribusi;

          await client.query(
            `INSERT INTO detail_distribusi (id_distribusi, id_produk, jumlah_barang_distribusi)
             VALUES ($1, $2, $3)`,
            [id_distribusi, id_produk, Math.abs(selisih)]
          );

          results.push({ 
            type: 'distribution', 
            id_produk, 
            jumlah: Math.abs(selisih),
            id_distribusi 
          });
        }
      }

      await client.query("COMMIT");
      return results;

    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
};

export default StockAdjustmentModel;
