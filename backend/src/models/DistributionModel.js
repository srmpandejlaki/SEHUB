import db from "../config/db.js";

const DistributionModel = {
  getAll: async () => {
    const result = await db.query(`
      SELECT 
        d.id_distribusi,
        d.tanggal_distribusi,
        d.nama_pemesan,
        d.id_metode_pengiriman,
        mp.nama_metode,
        d.id_status,
        sp.nama_status,
        d.catatan_distribusi,
        dd.id_detail_distribusi,
        dd.id_produk,
        np.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan,
        k.nama_kemasan,
        dd.jumlah_barang_distribusi,
        (
          SELECT dbm.tanggal_expired 
          FROM detail_barang_masuk dbm 
          WHERE dbm.id_produk = dd.id_produk 
          ORDER BY dbm.tanggal_expired ASC 
          LIMIT 1
        ) as tanggal_expired
      FROM distribusi d
      LEFT JOIN metode_pengiriman mp
        ON d.id_metode_pengiriman = mp.id_metode_pengiriman
      LEFT JOIN status_pengiriman sp
        ON d.id_status = sp.id_status
      LEFT JOIN detail_distribusi dd
        ON d.id_distribusi = dd.id_distribusi
      LEFT JOIN produk p
        ON dd.id_produk = p.id_produk
      LEFT JOIN nama_produk np
        ON p.id_nama_produk = np.id_nama_produk
      LEFT JOIN ukuran_satuan us
        ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kemasan k
        ON p.id_kemasan = k.id_kemasan
      ORDER BY d.tanggal_distribusi DESC, d.id_distribusi DESC, dd.id_detail_distribusi ASC
    `);

    // Group by id_distribusi
    const grouped = {};

    result.rows.forEach(row => {
      if (!grouped[row.id_distribusi]) {
        grouped[row.id_distribusi] = {
          id_distribusi: row.id_distribusi,
          tanggal_distribusi: row.tanggal_distribusi,
          nama_pemesan: row.nama_pemesan,
          id_metode_pengiriman: row.id_metode_pengiriman,
          nama_metode: row.nama_metode,
          id_status: row.id_status,
          nama_status: row.nama_status,
          catatan_distribusi: row.catatan_distribusi,
          items: []
        };
      }

      if (row.id_detail_distribusi) {
        grouped[row.id_distribusi].items.push({
          id_detail: row.id_detail_distribusi,
          id_produk: row.id_produk,
          nama_produk: row.nama_produk,
          ukuran_produk: row.ukuran_produk,
          nama_ukuran_satuan: row.nama_ukuran_satuan,
          nama_kemasan: row.nama_kemasan,
          jumlah: row.jumlah_barang_distribusi,
          tanggal_expired: row.tanggal_expired
        });
      }
    });

    return Object.values(grouped);
  },

  create: async (tanggal_distribusi, nama_pemesan, id_metode_pengiriman, id_status, catatan_distribusi, products) => {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // 1. Insert ke distribusi
      const insertDistribusi = await client.query(
        `INSERT INTO distribusi (tanggal_distribusi, nama_pemesan, id_metode_pengiriman, id_status, catatan_distribusi) 
         VALUES ($1, $2, $3, $4, $5) RETURNING id_distribusi`,
        [tanggal_distribusi, nama_pemesan, id_metode_pengiriman, id_status, catatan_distribusi]
      );

      const id_distribusi = insertDistribusi.rows[0].id_distribusi;

      // 2. Insert ke detail_distribusi dan deduct dari inventory menggunakan FEFO
      const insertItemsQuery = `
        INSERT INTO detail_distribusi
        (id_distribusi, id_produk, jumlah_barang_distribusi)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;

      const insertedItems = [];

      for (const item of products) {
        // Insert detail_distribusi
        const result = await client.query(insertItemsQuery, [
          id_distribusi,
          item.id_produk,
          item.jumlah
        ]);
        insertedItems.push(result.rows[0]);

        // FEFO: Deduct from inventory starting with earliest expiry
        let remainingToDeduct = parseInt(item.jumlah);

        // Get inventory items sorted by expiry date (FEFO - earliest first)
        const inventoryItems = await client.query(
          `SELECT id_detail_barang_masuk, jumlah_barang_masuk, tanggal_expired
           FROM detail_barang_masuk
           WHERE id_produk = $1 AND jumlah_barang_masuk > 0
           ORDER BY tanggal_expired ASC`,
          [item.id_produk]
        );

        for (const invItem of inventoryItems.rows) {
          if (remainingToDeduct <= 0) break;

          const currentStock = invItem.jumlah_barang_masuk;
          const deductAmount = Math.min(currentStock, remainingToDeduct);

          // Update the inventory item
          await client.query(
            `UPDATE detail_barang_masuk 
             SET jumlah_barang_masuk = jumlah_barang_masuk - $1
             WHERE id_detail_barang_masuk = $2`,
            [deductAmount, invItem.id_detail_barang_masuk]
          );

          remainingToDeduct -= deductAmount;
          
          console.log(`FEFO: Deducted ${deductAmount} from item ${invItem.id_detail_barang_masuk} (expired: ${invItem.tanggal_expired})`);
        }

        if (remainingToDeduct > 0) {
          console.log(`WARNING: Not enough stock for product ${item.id_produk}. Remaining: ${remainingToDeduct}`);
        }
      }

      await client.query("COMMIT");

      return {
        id_distribusi,
        items: insertedItems
      };

    } catch (err) {
      await client.query("ROLLBACK");
      throw err;

    } finally {
      client.release();
    }
  },

  update: async (id_distribusi, tanggal_distribusi, nama_pemesan, id_metode_pengiriman, id_status, catatan_distribusi, products) => {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // 1. Update distribusi
      const updateDistribusi = await client.query(
        `UPDATE distribusi 
        SET tanggal_distribusi = $1, nama_pemesan = $2, id_metode_pengiriman = $3, id_status = $4, catatan_distribusi = $5 
        WHERE id_distribusi = $6 
        RETURNING *`,
        [tanggal_distribusi, nama_pemesan, id_metode_pengiriman, id_status, catatan_distribusi, id_distribusi]
      );

      if (updateDistribusi.rows.length === 0) {
        throw new Error("Data distribusi tidak ditemukan");
      }

      // 2. Hapus detail lama
      await client.query(
        `DELETE FROM detail_distribusi WHERE id_distribusi = $1`,
        [id_distribusi]
      );

      // 3. Insert ulang detail baru
      const insertedItems = [];

      const insertItemQuery = `
        INSERT INTO detail_distribusi
        (id_distribusi, id_produk, jumlah_barang_distribusi)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;

      for (const item of products) {
        const result = await client.query(insertItemQuery, [
          id_distribusi,
          item.id_produk,
          item.jumlah
        ]);
        insertedItems.push(result.rows[0]);
      }

      await client.query("COMMIT");

      return {
        id_distribusi,
        updated_distribusi: updateDistribusi.rows[0],
        items: insertedItems
      };

    } catch (err) {
      await client.query("ROLLBACK");
      throw err;

    } finally {
      client.release();
    }
  },

  updateStatus: async (id_distribusi, id_status) => {
    const result = await db.query(
      `UPDATE distribusi SET id_status = $1 WHERE id_distribusi = $2 RETURNING *`,
      [id_status, id_distribusi]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  },

  delete: async (id_distribusi) => {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // Hapus detail dulu
      await client.query(
        `DELETE FROM detail_distribusi WHERE id_distribusi = $1`,
        [id_distribusi]
      );

      // Hapus distribusi
      const result = await client.query(
        `DELETE FROM distribusi WHERE id_distribusi = $1 RETURNING *`,
        [id_distribusi]
      );

      await client.query("COMMIT");

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];

    } catch (err) {
      await client.query("ROLLBACK");
      throw err;

    } finally {
      client.release();
    }
  },
};

export default DistributionModel;
