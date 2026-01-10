import db from "../src/config/db.js";

const migrate = async () => {
  try {
    console.log("Starting migration: Add jumlah_awal to detail_barang_masuk...");

    // 1. Check if column exists
    const checkColumn = await db.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='detail_barang_masuk' AND column_name='jumlah_awal'
    `);

    if (checkColumn.rows.length > 0) {
      console.log("Column 'jumlah_awal' already exists. Skipping add column.");
    } else {
      // 2. Add column
      await db.query(`ALTER TABLE detail_barang_masuk ADD COLUMN jumlah_awal INTEGER`);
      console.log("Column 'jumlah_awal' added.");
    }

    // 3. Populate existing data (assuming current stock is what we have)
    // ONLY update if null to avoid overwriting if we ran this before
    await db.query(`UPDATE detail_barang_masuk SET jumlah_awal = jumlah_barang_masuk WHERE jumlah_awal IS NULL`);
    console.log("Populated 'jumlah_awal' with existing 'jumlah_barang_masuk'.");

    // 4. Set default constraints if needed (optional)
    // await db.query(`ALTER TABLE detail_barang_masuk ALTER COLUMN jumlah_awal SET DEFAULT 0`);

    console.log("Migration completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
};

migrate();
