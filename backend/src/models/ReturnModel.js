import db from "../config/db-sqlite.js";

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
      ORDER BY r.tanggal_return DESC, r.id_return DESC, rd.id_return_barang_detail ASC
    `);

    // Group by id_return (use Map to preserve SQL order)
    const grouped = new Map();
    result.rows.forEach(row => {
      if (!grouped.has(row.id_return)) {
        grouped.set(row.id_return, {
          id_return: row.id_return,
          tanggal_return: row.tanggal_return,
          catatan_return: row.catatan_return,
          items: []
        });
      }

      if (row.id_return_barang_detail) {
        grouped.get(row.id_return).items.push({
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

    return Array.from(grouped.values());
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
    try {
      // Insert return_barang
      const insertReturn = await db.query(
        `INSERT INTO return_barang (tanggal_return, catatan_return) 
         VALUES ($1, $2) RETURNING id_return`,
        [tanggal_return, catatan_return]
      );

      const id_return = insertReturn.rows[0].id_return;

      // Insert return_barang_detail for each item
      const insertedItems = [];

      for (const item of items) {
        const result = await db.query(
          `INSERT INTO return_barang_detail (id_return, id_detail_distribusi, jumlah_barang_return)
           VALUES ($1, $2, $3)
           RETURNING *`,
          [id_return, item.id_detail_distribusi, item.jumlah_barang_return]
        );
        insertedItems.push(result.rows[0]);
      }

      // Check if this is NOT a damaged goods return
      const isDamaged = catatan_return && catatan_return.toLowerCase().trim() === "barang rusak";
      console.log("=== RETURN BARANG DEBUG ===");
      console.log("catatan_return:", catatan_return);
      console.log("isDamaged:", isDamaged);
      console.log("items.length:", items.length);

      if (!isDamaged && items.length > 0) {
        console.log("-> Creating barang_masuk entry for non-damaged return");
        
        // Create barang_masuk entry with "return barang" note
        const insertInventory = await db.query(
          `INSERT INTO barang_masuk (tanggal_masuk, catatan_barang_masuk) 
           VALUES ($1, $2) RETURNING id_barang_masuk`,
          [tanggal_return, "return barang"]
        );

        const id_barang_masuk = insertInventory.rows[0].id_barang_masuk;
        console.log("-> Created barang_masuk with id:", id_barang_masuk);

        // For each returned item, get product details and add to detail_barang_masuk
        for (const item of items) {
          console.log("-> Processing item:", item);
          
          // Get product id from detail_distribusi
          const productInfo = await db.query(
            `SELECT id_produk FROM detail_distribusi WHERE id_detail_distribusi = $1`,
            [item.id_detail_distribusi]
          );
          console.log("-> productInfo rows:", productInfo.rows);

          if (productInfo.rows.length > 0) {
            const { id_produk } = productInfo.rows[0];
            console.log("-> id_produk:", id_produk);
            
            // Get the latest expiry date from existing inventory for this product
            const expiryInfo = await db.query(
              `SELECT tanggal_expired FROM detail_barang_masuk 
               WHERE id_produk = $1 
               ORDER BY tanggal_expired DESC 
               LIMIT 1`,
              [id_produk]
            );
            console.log("-> expiryInfo rows:", expiryInfo.rows);
            
            let tanggal_expired;
            if (expiryInfo.rows.length > 0) {
              tanggal_expired = expiryInfo.rows[0].tanggal_expired;
            } else {
              // Fallback: use current date + 1 year
              const oneYearLater = new Date();
              oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
              tanggal_expired = oneYearLater.toISOString().split('T')[0];
            }
            console.log("-> tanggal_expired:", tanggal_expired);
            
            const insertResult = await db.query(
              `INSERT INTO detail_barang_masuk (id_barang_masuk, id_produk, jumlah_barang_masuk, stok_sekarang, tanggal_expired)
               VALUES ($1, $2, $3, $4, $5) RETURNING *`,
              [id_barang_masuk, id_produk, item.jumlah_barang_return, item.jumlah_barang_return, tanggal_expired]
            );
            console.log("-> Inserted detail_barang_masuk:", insertResult.rows[0]);
          } else {
            console.log("-> WARNING: No productInfo found for id_detail_distribusi:", item.id_detail_distribusi);
          }
        }
      } else {
        console.log("-> Skipping inventory (damaged goods or no items)");
      }
      console.log("=== END RETURN DEBUG ===");

      return {
        id_return,
        tanggal_return,
        catatan_return,
        items: insertedItems,
        added_to_inventory: !isDamaged
      };

    } catch (err) {
      console.error('Error creating return:', err);
      throw err;
    }
  },

  // Delete return
  delete: async (id_return) => {
    try {
      // Delete details first
      await db.query(
        `DELETE FROM return_barang_detail WHERE id_return = $1`,
        [id_return]
      );

      // Delete return
      const result = await db.query(
        `DELETE FROM return_barang WHERE id_return = $1 RETURNING *`,
        [id_return]
      );

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];

    } catch (err) {
      console.error('Error deleting return:', err);
      throw err;
    }
  },
};

export default ReturnModel;
