
import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';

async function testQuery() {
    const SQL = await initSqlJs();
    const dbPath = './backend/src/data/sehub.db';
    if (!fs.existsSync(dbPath)) {
        console.error('DB not found at', dbPath);
        return;
    }
    const buffer = fs.readFileSync(dbPath);
    const db = new SQL.Database(buffer);

    const query = `
      SELECT 
        p.id_produk,
        p.id_nama_produk,
        p.id_ukuran_satuan,
        p.id_kemasan,
        p.ukuran_produk,
        p.stok_minimum
      FROM produk p
      LIMIT 1
    `;

    const res = db.exec(query);
    console.log(JSON.stringify(res, null, 2));
}

testQuery();
