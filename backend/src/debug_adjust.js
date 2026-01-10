import dotenv from 'dotenv';
import db from './config/db.js';
import StockAdjustmentModel from './models/StockAdjustmentModel.js';

dotenv.config();

console.log("=== DIAGNOSTIC START ===");

(async () => {
    try {
        console.log("1. Connecting DB...");
        // Test query (and get product)
        const pRes = await db.query("SELECT id_produk FROM produk LIMIT 1");
        if(pRes.rows.length === 0) throw new Error("No products found");
        const id_produk = pRes.rows[0].id_produk;
        console.log("2. Found Product:", id_produk);

        const payload = [
            { id_produk, stok_gudang: 100, stok_sistem: 0, alasan: "Debug Script" }
        ];

        console.log("3. Calling create...");
        const result = await StockAdjustmentModel.create("Debug Test", payload);
        console.log("4. Result:", result);

    } catch(e) {
        console.error("!!! ERROR !!!");
        console.error(e);
    } finally {
        console.log("=== DIAGNOSTIC END ===");
        process.exit();
    }
})();
