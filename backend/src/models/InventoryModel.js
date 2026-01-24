import db from "../config/db-sqlite.js";

const InventoryModel = {
  getAll: async () => {
    const result = await db.query(`
      SELECT 
        bm.id_barang_masuk,
        bm.tanggal_masuk,
        bm.catatan_barang_masuk,
        dbm.id_detail_barang_masuk,
        dbm.id_produk,
        np.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan,
        k.nama_kemasan,
        dbm.jumlah_barang_masuk,
        dbm.stok_sekarang,
        dbm.tanggal_expired
      FROM barang_masuk bm
      LEFT JOIN detail_barang_masuk dbm 
        ON bm.id_barang_masuk = dbm.id_barang_masuk
      LEFT JOIN produk p
        ON dbm.id_produk = p.id_produk
      LEFT JOIN nama_produk np
        ON p.id_nama_produk = np.id_nama_produk
      LEFT JOIN ukuran_satuan us
        ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN kemasan k
        ON p.id_kemasan = k.id_kemasan
      ORDER BY bm.tanggal_masuk DESC, bm.id_barang_masuk DESC, dbm.id_detail_barang_masuk ASC
    `);

    // Group by id_barang_masuk
    // Group by id_barang_masuk (use Map to preserve SQL order)
    const grouped = new Map();

    result.rows.forEach(row => {
      if (!grouped.has(row.id_barang_masuk)) {
        grouped.set(row.id_barang_masuk, {
          id_barang_masuk: row.id_barang_masuk,
          tanggal_masuk: row.tanggal_masuk,
          catatan_barang_masuk: row.catatan_barang_masuk,
          items: []
        });
      }

      if (row.id_detail_barang_masuk) {
        grouped.get(row.id_barang_masuk).items.push({
          id_detail: row.id_detail_barang_masuk,
          id_produk: row.id_produk,
          nama_produk: row.nama_produk,
          ukuran_produk: row.ukuran_produk,
          nama_ukuran_satuan: row.nama_ukuran_satuan,
          nama_kemasan: row.nama_kemasan,
          jumlah: row.jumlah_barang_masuk,
          stok_sekarang: row.stok_sekarang,
          tanggal_expired: row.tanggal_expired
        });
      }
    });

    return Array.from(grouped.values());
  },

  create: async (tanggal_masuk, catatan_barang_masuk, products) => {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // 1. Insert ke barang_masuk
      const insertStock = await client.query(
        `INSERT INTO barang_masuk (tanggal_masuk, catatan_barang_masuk) 
         VALUES ($1, $2) RETURNING id_barang_masuk`,
        [tanggal_masuk, catatan_barang_masuk]
      );

      const id_barang_masuk = insertStock.rows[0].id_barang_masuk;

      // 2. Insert ke detail_barang_masuk
      const insertItemsQuery = `
        INSERT INTO detail_barang_masuk
        (id_barang_masuk, id_produk, jumlah_barang_masuk, stok_sekarang, tanggal_expired)
        VALUES ($1, $2, $3, $3, $4)
        RETURNING *;
      `;

      const insertedItems = [];

      for (const item of products) {
        const result = await client.query(insertItemsQuery, [
          id_barang_masuk,
          item.id_produk,
          item.jumlah,
          item.tanggal_expired
        ]);
        insertedItems.push(result.rows[0]);
      }

      await client.query("COMMIT");

      return {
        id_barang_masuk,
        items: insertedItems
      };

    } catch (err) {
      await client.query("ROLLBACK");
      throw err;

    } finally {
      client.release();
    }
  },

  update: async (id_barang_masuk, tanggal_masuk, catatan_barang_masuk, products) => {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // 1. Calculate Usage from Old Details (Prevent Phantom Stock)
      const oldDetails = await client.query(
        `SELECT id_produk, jumlah_barang_masuk, stok_sekarang FROM detail_barang_masuk WHERE id_barang_masuk = $1`,
        [id_barang_masuk]
      );
      
      const usageMap = new Map(); // id_produk -> total_used
      for (const row of oldDetails.rows) {
         const used = row.jumlah_barang_masuk - row.stok_sekarang;
         const current = usageMap.get(row.id_produk) || 0;
         usageMap.set(row.id_produk, current + used);
      }

      // 2. Update barang_masuk Header
      const updateStock = await client.query(
        `UPDATE barang_masuk 
        SET tanggal_masuk = $1, catatan_barang_masuk = $2 
        WHERE id_barang_masuk = $3 
        RETURNING *`,
        [tanggal_masuk, catatan_barang_masuk, id_barang_masuk]
      );

      if (updateStock.rows.length === 0) {
        throw new Error("Data barang masuk tidak ditemukan");
      }

      // 3. Delete Old Details
      await client.query(
        `DELETE FROM detail_barang_masuk WHERE id_barang_masuk = $1`,
        [id_barang_masuk]
      );

      // 4. Insert New Details with Usage Applied
      const insertedItems = [];
      const insertItemQuery = `
        INSERT INTO detail_barang_masuk
        (id_barang_masuk, id_produk, jumlah_barang_masuk, stok_sekarang, tanggal_expired)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;

      // Sort products by expiry to apply usage FEFO style (apply usage to earliest expiry first)
      // Create a copy to sort
      const sortedProducts = [...products].sort((a, b) => new Date(a.tanggal_expired) - new Date(b.tanggal_expired));

      for (const item of sortedProducts) {
         let usedAmount = 0;
         if (usageMap.has(item.id_produk)) {
             const totalUsed = usageMap.get(item.id_produk);
             usedAmount = Math.min(totalUsed, item.jumlah);
             usageMap.set(item.id_produk, totalUsed - usedAmount);
         }
         
         const stokSekarang = item.jumlah - usedAmount;

         const result = await client.query(insertItemQuery, [
             id_barang_masuk, 
             item.id_produk, 
             item.jumlah, 
             stokSekarang, 
             item.tanggal_expired
         ]);
         insertedItems.push(result.rows[0]);
      }

      // 5. Validation: Ensure all existing usage is accounted for
      for (const [id_produk, remainingUsed] of usageMap.entries()) {
          if (remainingUsed > 0) {
             throw new Error(`Gagal update: Produk dengan ID ${id_produk} sudah terdistribusi sebanyak ${remainingUsed} unit. Anda tidak bisa mengurangi jumlah di bawah stok yang sudah terpakai.`);
          }
      }

      await client.query("COMMIT");

      return {
        id_barang_masuk,
        updated_stock: updateStock.rows[0],
        items: insertedItems
      };

    } catch (err) {
      await client.query("ROLLBACK");
      throw err;

    } finally {
      client.release();
    }
  },
  // Get batches by product ID for detail page
  getBatchesByProduct: async (id_produk) => {
    const result = await db.query(`
      SELECT 
        dbm.id_detail_barang_masuk,
        bm.tanggal_masuk,
        dbm.jumlah_barang_masuk,     -- Initial Qty
        dbm.stok_sekarang,           -- Current Stock
        dbm.tanggal_expired
      FROM detail_barang_masuk dbm
      JOIN barang_masuk bm ON dbm.id_barang_masuk = bm.id_barang_masuk
      WHERE dbm.id_produk = $1
      ORDER BY dbm.tanggal_expired ASC
    `, [id_produk]);
    
    return result.rows;
  }
};

export default InventoryModel;

