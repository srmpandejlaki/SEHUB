import db from "../config/db.js";

const InventoryModel = {
  getAll: async () => {
    const result = await db.query(`
      SELECT 
        i.incoming_stock_id,
        i.date,
        COUNT(ip.incoming_product_id) AS total_items,
        COALESCE(SUM(ip.quantity), 0) AS total_quantity
      FROM incoming_stock i
      LEFT JOIN incoming_product ip
        ON i.incoming_stock_id = ip.incoming_stock_id
      GROUP BY i.incoming_stock_id
      ORDER BY i.incoming_stock_id DESC
    `);

    return result.rows;
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
};

export default InventoryModel;