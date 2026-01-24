import db from "../config/db-sqlite.js";

const StockAdjustmentModel = {
  // Get all stock adjustments with details
  getAll: async () => {
    const result = await db.query(`
      SELECT 
        ps.id_penyesuaian_stok,
        ps.tanggal_penyesuaian,
        ps.catatan_penyesuaian,
        psd.id_detail_penyesuaian,
        psd.id_produk,
        np.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan,
        psd.stok_gudang,
        psd.stok_sistem,
        ks.nama_kondisi
      FROM penyesuaian_stok ps
      LEFT JOIN penyesuaian_stok_detail psd ON ps.id_penyesuaian_stok = psd.id_penyesuaian_stok
      LEFT JOIN produk p ON psd.id_produk = p.id_produk
      LEFT JOIN nama_produk np ON p.id_nama_produk = np.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kondisi_stok ks ON psd.id_kondisi_stok = ks.id_kondisi_stok
      ORDER BY ps.tanggal_penyesuaian DESC, ps.id_penyesuaian_stok DESC, psd.id_detail_penyesuaian ASC
    `);

    // Group by id_penyesuaian_stok (use Map to preserve SQL order)
    const grouped = new Map();
    result.rows.forEach(row => {
      if (!grouped.has(row.id_penyesuaian_stok)) {
        grouped.set(row.id_penyesuaian_stok, {
          id_penyesuaian_stok: row.id_penyesuaian_stok,
          tanggal_penyesuaian: row.tanggal_penyesuaian,
          catatan_penyesuaian: row.catatan_penyesuaian,
          items: []
        });
      }

      if (row.id_detail_penyesuaian) {
        grouped.get(row.id_penyesuaian_stok).items.push({
          id_detail_penyesuaian: row.id_detail_penyesuaian,
          id_produk: row.id_produk,
          nama_produk: row.nama_produk,
          ukuran_produk: row.ukuran_produk,
          nama_ukuran_satuan: row.nama_ukuran_satuan,
          stok_gudang: row.stok_gudang,
          stok_sistem: row.stok_sistem,
          nama_kondisi: row.nama_kondisi
        });
      }
    });

    return Array.from(grouped.values());
  },

  // Get inventory data grouped by product for adjustment (per item with expiry date)
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
        dbm.stok_sekarang
      FROM produk p
      JOIN nama_produk np ON p.id_nama_produk = np.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kemasan k ON p.id_kemasan = k.id_kemasan
      LEFT JOIN detail_barang_masuk dbm ON p.id_produk = dbm.id_produk
      LEFT JOIN barang_masuk bm ON dbm.id_barang_masuk = bm.id_barang_masuk
      WHERE dbm.id_detail_barang_masuk IS NOT NULL
      ORDER BY p.id_produk, dbm.tanggal_expired ASC
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
        jumlah_barang_masuk: row.jumlah_barang_masuk,
        stok_sekarang: row.stok_sekarang
      });
    });

    return Object.values(grouped);
  },

  // Get or create kondisi_stok
  getOrCreateKondisiStok: async (client, nama_kondisi) => {
    const existing = await client.query(
      `SELECT id_kondisi_stok FROM kondisi_stok WHERE nama_kondisi = $1`,
      [nama_kondisi]
    );
    
    if (existing.rows.length > 0) {
      return existing.rows[0].id_kondisi_stok;
    }
    
    const result = await client.query(
      `INSERT INTO kondisi_stok (nama_kondisi) VALUES ($1) RETURNING id_kondisi_stok`,
      [nama_kondisi]
    );
    return result.rows[0].id_kondisi_stok;
  },

  // Create new stock adjustment (tanggal otomatis dari sistem)
  create: async (catatan_penyesuaian, items) => {
    const client = await db.connect();
    const today = new Date().toISOString().split('T')[0];

    try {
      await client.query("BEGIN");

      // 1. Insert penyesuaian_stok
      const insertPs = await client.query(
        `INSERT INTO penyesuaian_stok (tanggal_penyesuaian, catatan_penyesuaian) 
         VALUES ($1, $2) RETURNING id_penyesuaian_stok`,
        [today, catatan_penyesuaian]
      );

      const id_penyesuaian_stok = insertPs.rows[0].id_penyesuaian_stok;

      // 2. Insert details and create inventory/distribution if needed
      const insertedItems = [];

      for (const item of items) {
        const { id_produk, stok_gudang, stok_sistem, alasan } = item;
        const selisih = stok_gudang - stok_sistem;
        
        // Determine kondisi
        let kondisi = "SESUAI";
        if (selisih > 0) kondisi = "LEBIH";
        else if (selisih < 0) kondisi = "KURANG";
        
        const id_kondisi_stok = await StockAdjustmentModel.getOrCreateKondisiStok(client, kondisi);

        // Insert detail
        const result = await client.query(
          `INSERT INTO penyesuaian_stok_detail 
           (id_penyesuaian_stok, id_produk, id_kondisi_stok, stok_gudang, stok_sistem)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *`,
          [id_penyesuaian_stok, id_produk, id_kondisi_stok, stok_gudang, stok_sistem]
        );

        // Create inventory or distribution adjustment if needed
        if (selisih > 0) {
          // Stock di gudang lebih banyak - buat data barang masuk
          const insertStock = await client.query(
            `INSERT INTO barang_masuk (tanggal_masuk, catatan_barang_masuk) 
             VALUES ($1, $2) RETURNING id_barang_masuk`,
            [today, 'penyesuaian stok gudang']
          );

          // Set default expiry to 1 year from now (for adjustment items)
          const defaultExpiry = new Date();
          defaultExpiry.setFullYear(defaultExpiry.getFullYear() + 1);
          const expiryDate = defaultExpiry.toISOString().split('T')[0];

          await client.query(
            `INSERT INTO detail_barang_masuk 
             (id_barang_masuk, id_produk, jumlah_barang_masuk, stok_sekarang, tanggal_expired)
             VALUES ($1, $2, $3, $3, $4)`,
            [insertStock.rows[0].id_barang_masuk, id_produk, selisih, expiryDate]
          );

        } else if (selisih < 0) {
          // Stock di gudang lebih sedikit - deduct dari inventory menggunakan FEFO
          const amountToDeduct = Math.abs(selisih);
          let remainingToDeduct = amountToDeduct;

          // Get inventory items sorted by expiry date (FEFO - earliest first)
          const inventoryItems = await client.query(
            `SELECT id_detail_barang_masuk, stok_sekarang, tanggal_expired
             FROM detail_barang_masuk
             WHERE id_produk = $1 AND stok_sekarang > 0
             ORDER BY tanggal_expired ASC`,
            [id_produk]
          );

          for (const invItem of inventoryItems.rows) {
            if (remainingToDeduct <= 0) break;

            const currentStock = invItem.stok_sekarang;
            const deductAmount = Math.min(currentStock, remainingToDeduct);

            // Update the inventory item
            await client.query(
              `UPDATE detail_barang_masuk 
               SET stok_sekarang = stok_sekarang - $1
               WHERE id_detail_barang_masuk = $2`,
              [deductAmount, invItem.id_detail_barang_masuk]
            );

            remainingToDeduct -= deductAmount;
            
            console.log(`FEFO Adjustment: Deducted ${deductAmount} from item ${invItem.id_detail_barang_masuk} (expired: ${invItem.tanggal_expired})`);
          }

          // Create distribution record for audit trail
          const metodeRes = await client.query(`SELECT id_metode_pengiriman FROM metode_pengiriman LIMIT 1`);
          const statusRes = await client.query(`SELECT id_status FROM status_pengiriman LIMIT 1`);

          let id_metode = metodeRes.rows[0]?.id_metode_pengiriman;
          let id_status = statusRes.rows[0]?.id_status;

          if (!id_metode) {
            const newMetode = await client.query(
              `INSERT INTO metode_pengiriman (nama_metode) VALUES ('Default') RETURNING id_metode_pengiriman`
            );
            id_metode = newMetode.rows[0].id_metode_pengiriman;
          }

          if (!id_status) {
            const newStatus = await client.query(
              `INSERT INTO status_pengiriman (nama_status) VALUES ('Diterima') RETURNING id_status`
            );
            id_status = newStatus.rows[0].id_status;
          }

          const insertDist = await client.query(
            `INSERT INTO distribusi (tanggal_distribusi, nama_pemesan, id_metode_pengiriman, id_status, catatan_distribusi) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id_distribusi`,
            [today, 'Sistem - Penyesuaian Stok', id_metode, id_status, 'Penyesuaian Stok Gudang']
          );

          await client.query(
            `INSERT INTO detail_distribusi (id_distribusi, id_produk, jumlah_barang_distribusi)
             VALUES ($1, $2, $3)`,
            [insertDist.rows[0].id_distribusi, id_produk, amountToDeduct]
          );
        }

        insertedItems.push(result.rows[0]);
      }

      await client.query("COMMIT");

      return {
        id_penyesuaian_stok,
        tanggal_penyesuaian: today,
        items: insertedItems
      };

    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
};

export default StockAdjustmentModel;
