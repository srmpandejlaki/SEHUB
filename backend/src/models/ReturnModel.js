import db from "../config/db.js";

const ReturnModel = {
  // Get all returns with details
  getAll: async () => {
    const result = await db.query(`
      SELECT 
        r.id_return,
        r.tanggal_return,
        r.catatan_return,
        rd.id_return_barang_detail,
        rd.id_detail_distribusi,
        rd.jumlah_barang_return,
        dd.id_produk,
        dd.jumlah_barang_distribusi,
        n.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan,
        d.id_distribusi,
        d.nama_pemesan,
        d.tanggal_distribusi
      FROM return_barang r
      LEFT JOIN return_barang_detail rd ON r.id_return = rd.id_return
      LEFT JOIN detail_distribusi dd ON rd.id_detail_distribusi = dd.id_detail_distribusi
      LEFT JOIN produk p ON dd.id_produk = p.id_produk
      LEFT JOIN nama_produk n ON p.id_nama_produk = n.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      LEFT JOIN distribusi d ON dd.id_distribusi = d.id_distribusi
      ORDER BY r.id_return DESC, rd.id_return_barang_detail ASC
    `);

    // Group by id_return
    const grouped = {};
    result.rows.forEach(row => {
      if (!grouped[row.id_return]) {
        grouped[row.id_return] = {
          id_return: row.id_return,
          tanggal_return: row.tanggal_return,
          catatan_return: row.catatan_return,
          items: []
        };
      }

      if (row.id_return_barang_detail) {
        grouped[row.id_return].items.push({
          id_return_barang_detail: row.id_return_barang_detail,
          id_detail_distribusi: row.id_detail_distribusi,
          jumlah_barang_return: row.jumlah_barang_return,
          id_produk: row.id_produk,
          nama_produk: row.nama_produk,
          ukuran_produk: row.ukuran_produk,
          nama_ukuran_satuan: row.nama_ukuran_satuan,
          jumlah_distribusi_awal: row.jumlah_barang_distribusi,
          id_distribusi: row.id_distribusi,
          nama_pemesan: row.nama_pemesan,
          tanggal_distribusi: row.tanggal_distribusi
        });
      }
    });

    return Object.values(grouped);
  },

  // Get returns by distribution ID
  getByDistributionId: async (id_distribusi) => {
    const result = await db.query(`
      SELECT 
        r.id_return,
        r.tanggal_return,
        r.catatan_return,
        rd.id_return_barang_detail,
        rd.id_detail_distribusi,
        rd.jumlah_barang_return,
        dd.id_produk,
        dd.jumlah_barang_distribusi,
        n.nama_produk,
        p.ukuran_produk,
        us.nama_ukuran_satuan
      FROM return_barang r
      JOIN return_barang_detail rd ON r.id_return = rd.id_return
      JOIN detail_distribusi dd ON rd.id_detail_distribusi = dd.id_detail_distribusi
      JOIN produk p ON dd.id_produk = p.id_produk
      JOIN nama_produk n ON p.id_nama_produk = n.id_nama_produk
      LEFT JOIN ukuran_satuan us ON p.id_ukuran_satuan = us.id_ukuran_satuan
      WHERE dd.id_distribusi = $1
      ORDER BY r.id_return DESC
    `, [id_distribusi]);

    return result.rows;
  },

  // Create new return
  create: async (tanggal_return, catatan_return, items) => {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // Insert return_barang
      const insertReturn = await client.query(
        `INSERT INTO return_barang (tanggal_return, catatan_return) 
         VALUES ($1, $2) RETURNING id_return`,
        [tanggal_return, catatan_return]
      );

      const id_return = insertReturn.rows[0].id_return;

      // Insert return_barang_detail for each item
      const insertedItems = [];

      for (const item of items) {
        const result = await client.query(
          `INSERT INTO return_barang_detail (id_return, id_detail_distribusi, jumlah_barang_return)
           VALUES ($1, $2, $3)
           RETURNING *`,
          [id_return, item.id_detail_distribusi, item.jumlah_barang_return]
        );
        insertedItems.push(result.rows[0]);
      }

      await client.query("COMMIT");

      return {
        id_return,
        tanggal_return,
        catatan_return,
        items: insertedItems
      };

    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  // Delete return
  delete: async (id_return) => {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // Delete details first
      await client.query(
        `DELETE FROM return_barang_detail WHERE id_return = $1`,
        [id_return]
      );

      // Delete return
      const result = await client.query(
        `DELETE FROM return_barang WHERE id_return = $1 RETURNING *`,
        [id_return]
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

export default ReturnModel;
