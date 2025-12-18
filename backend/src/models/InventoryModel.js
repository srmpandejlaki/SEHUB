import db from "../config/db.js";

const InventoryModel = {
  getAll: async () => {
    const result = await db.query(`
      SELECT 
        bm.id_barang_masuk,
        bm.tanggal_masuk,
        bm.catatan AS catatan_masuk,
        dbm.id_detail_barang_masuk,
        dbm.kode_produk,
        p.nama_produk,
        p.ukuran_produk,
        p.ukuran_satuan,
        p.kemasan_produk,
        dbm.jumlah,
        dbm.tanggal_expired
      FROM barang_masuk bm
      LEFT JOIN detail_barang_masuk dbm 
        ON bm.id_barang_masuk = dbm.id_barang_masuk
      LEFT JOIN produk p
        ON dbm.kode_produk = p.kode_produk
      ORDER BY bm.id_barang_masuk DESC, dbm.id_detail_barang_masuk ASC
    `);

    // Group by id_barang_masuk
    const grouped = {};

    result.rows.forEach(row => {
      if (!grouped[row.id_barang_masuk]) {
        grouped[row.id_barang_masuk] = {
          id_barang_masuk: row.id_barang_masuk,
          tanggal_masuk: row.tanggal_masuk,
          catatan_masuk: row.catatan_masuk,
          items: []
        };
      }

      if (row.id_detail_barang_masuk) {
        grouped[row.id_barang_masuk].items.push({
          id_detail: row.id_detail_barang_masuk,
          kode_produk: row.kode_produk,
          nama_produk: row.nama_produk,
          ukuran_produk: row.ukuran_produk,
          ukuran_satuan: row.ukuran_satuan,
          kemasan_produk: row.kemasan_produk,
          jumlah: row.jumlah,
          tanggal_expired: row.tanggal_expired
        });
      }
    });

    return Object.values(grouped);
  },

  create: async (tanggal_masuk, catatan, id_pengguna, products) => {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // 1. Insert ke barang_masuk
      const insertStock = await client.query(
        `INSERT INTO barang_masuk (id_pengguna, tanggal_masuk, catatan) 
         VALUES ($1, $2, $3) RETURNING id_barang_masuk`,
        [id_pengguna, tanggal_masuk, catatan]
      );

      const id_barang_masuk = insertStock.rows[0].id_barang_masuk;

      // 2. Insert ke detail_barang_masuk
      const insertItemsQuery = `
        INSERT INTO detail_barang_masuk
        (id_barang_masuk, kode_produk, jumlah, tanggal_expired)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      const insertedItems = [];

      for (const item of products) {
        const result = await client.query(insertItemsQuery, [
          id_barang_masuk,
          item.kode_produk,
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

  update: async (id_barang_masuk, tanggal_masuk, catatan, products) => {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // 1. Update barang_masuk
      const updateStock = await client.query(
        `UPDATE barang_masuk 
        SET tanggal_masuk = $1, catatan = $2 
        WHERE id_barang_masuk = $3 
        RETURNING *`,
        [tanggal_masuk, catatan, id_barang_masuk]
      );

      if (updateStock.rows.length === 0) {
        throw new Error("Data barang masuk tidak ditemukan");
      }

      // 2. Hapus detail lama
      await client.query(
        `DELETE FROM detail_barang_masuk 
        WHERE id_barang_masuk = $1`,
        [id_barang_masuk]
      );

      // 3. Insert ulang detail baru
      const insertedItems = [];

      const insertItemQuery = `
        INSERT INTO detail_barang_masuk
        (id_barang_masuk, kode_produk, jumlah, tanggal_expired)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      for (const item of products) {
        const result = await client.query(insertItemQuery, [
          id_barang_masuk,
          item.kode_produk,
          item.jumlah,
          item.tanggal_expired
        ]);
        insertedItems.push(result.rows[0]);
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
};

export default InventoryModel;
