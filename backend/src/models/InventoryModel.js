import db from "../config/db.js";

const InventoryModel = {
  getAll: async () => {
    const result = await db.query(`
      SELECT 
        i.incoming_stock_id,
        i.date,
        ip.incoming_product_id,
        ip.id_product,
        p.nama_produk,
        ip.quantity,
        ip.expired_date,
        ip.notes
      FROM incoming_stock i
      LEFT JOIN incoming_product ip 
        ON i.incoming_stock_id = ip.incoming_stock_id
      LEFT JOIN product p
        ON ip.id_product = p.id_product
      ORDER BY i.incoming_stock_id DESC, ip.incoming_product_id ASC
    `);

    // Group by incoming_stock_id
    const grouped = {};

    result.rows.forEach(row => {
      if (!grouped[row.incoming_stock_id]) {
        grouped[row.incoming_stock_id] = {
          incoming_stock_id: row.incoming_stock_id,
          date: row.date,
          items: []
        };
      }

      if (row.incoming_product_id) {
        grouped[row.incoming_stock_id].items.push({
          incoming_product_id: row.incoming_product_id,
          id_product: row.id_product,
          nama_produk: row.nama_produk,
          quantity: row.quantity,
          expired_date: row.expired_date,
          notes: row.notes
        });
      }
    });

    return Object.values(grouped);
  },

  create: async (date, products) => {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // 1. Insert ke incoming_stock
      const insertStock = await client.query(
        `INSERT INTO incoming_stock (date) VALUES ($1) RETURNING incoming_stock_id`,
        [date]
      );

      const incoming_stock_id = insertStock.rows[0].incoming_stock_id;

      // 2. Insert ke incoming_product
      const insertItemsQuery = `
        INSERT INTO incoming_product
        (incoming_stock_id, id_product, quantity, expired_date, notes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;

      const insertedItems = [];

      for (const item of products) {
        const result = await client.query(insertItemsQuery, [
          incoming_stock_id,
          item.id_product,
          item.quantity,
          item.expired_date,
          item.notes || null
        ]);
        insertedItems.push(result.rows[0]);
      }

      await client.query("COMMIT");

      return {
        incoming_stock_id,
        items: insertedItems
      };

    } catch (err) {
      await client.query("ROLLBACK");
      throw err;

    } finally {
      client.release();
    }
  },

  update: async (incoming_stock_id, date, products) => {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // 1. Update incoming_stock
      const updateStock = await client.query(
        `UPDATE incoming_stock 
        SET date = $1 
        WHERE incoming_stock_id = $2 
        RETURNING *`,
        [date, incoming_stock_id]
      );

      if (updateStock.rows.length === 0) {
        throw new Error("Incoming stock not found");
      }

      // 2. Hapus item lama
      await client.query(
        `DELETE FROM incoming_product 
        WHERE incoming_stock_id = $1`,
        [incoming_stock_id]
      );

      // 3. Insert ulang item baru
      const insertedItems = [];

      const insertItemQuery = `
        INSERT INTO incoming_product
        (incoming_stock_id, id_product, quantity, expired_date, notes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;

      for (const item of products) {
        const result = await client.query(insertItemQuery, [
          incoming_stock_id,
          item.id_product,
          item.quantity,
          item.expired_date,
          item.notes || null
        ]);
        insertedItems.push(result.rows[0]);
      }

      await client.query("COMMIT");

      return {
        incoming_stock_id,
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