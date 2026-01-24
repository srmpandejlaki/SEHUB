import initSqlJs from 'sql.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine database path
const isElectron = process.env.ELECTRON_RUN === 'true';
const isDev = process.env.NODE_ENV !== 'production';

let dbPath;
if (isElectron && !isDev) {
  // Production Electron: store in app data
  const appDataPath = process.env.APPDATA || path.join(process.env.HOME || '', '.config');
  const appFolder = path.join(appDataPath, 'SEHUB+');
  if (!fs.existsSync(appFolder)) {
    fs.mkdirSync(appFolder, { recursive: true });
  }
  dbPath = path.join(appFolder, 'sehub.db');
} else {
  // Development: store in backend/data folder
  const dataFolder = path.join(__dirname, '../data');
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder, { recursive: true });
  }
  dbPath = path.join(dataFolder, 'sehub.db');
}

console.log('SQLite Database path:', dbPath);

// Initialize SQL.js and database
let db = null;
let SQL = null;

async function initDb() {
  if (db) return db;
  
  SQL = await initSqlJs();
  
  // Try to load existing database
  try {
    if (fs.existsSync(dbPath)) {
      const buffer = fs.readFileSync(dbPath);
      db = new SQL.Database(buffer);
      console.log('Loaded existing database');
    } else {
      db = new SQL.Database();
      console.log('Created new database');
    }
  } catch (error) {
    console.error('Error loading database:', error);
    db = new SQL.Database();
  }
  
  return db;
}

// Save database to file
function saveDb() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }
}

// Auto-save every 30 seconds
setInterval(() => {
  saveDb();
}, 30000);

// Save on process exit
process.on('exit', saveDb);
process.on('SIGINT', () => {
  saveDb();
  process.exit();
});

// Wrapper object to provide PostgreSQL-like interface
const dbWrapper = {
  // Query method compatible with PostgreSQL syntax
  query: async (sql, params = []) => {
    await initDb();
    
    try {
      // Replace PostgreSQL placeholders ($1, $2, ...) with SQLite placeholders (?, ?, ...)
      let sqliteQuery = sql;
      let paramIndex = 1;
      while (sqliteQuery.includes(`$${paramIndex}`)) {
        sqliteQuery = sqliteQuery.replace(`$${paramIndex}`, '?');
        paramIndex++;
      }

      // Determine query type
      const queryType = sql.trim().toUpperCase().split(' ')[0];
      
      if (queryType === 'SELECT') {
        const stmt = db.prepare(sqliteQuery);
        stmt.bind(params);
        
        const rows = [];
        while (stmt.step()) {
          const row = stmt.getAsObject();
          rows.push(row);
        }
        stmt.free();
        
        return { rows };
      } else if (queryType === 'INSERT' || queryType === 'UPDATE' || queryType === 'DELETE') {
        db.run(sqliteQuery, params);
        
        // Handle RETURNING clause (common in PostgreSQL)
        if (sql.toUpperCase().includes('RETURNING')) {
          if (queryType === 'INSERT') {
            // Get the last inserted row
            const lastRowId = db.exec('SELECT last_insert_rowid() as id')[0]?.values[0][0];
            const tableMatch = sql.match(/INSERT INTO\s+(\w+)/i);
            if (tableMatch && lastRowId) {
              const tableName = tableMatch[1];
              const lastRowResult = db.exec(`SELECT * FROM ${tableName} WHERE rowid = ${lastRowId}`);
              if (lastRowResult.length > 0) {
                const columns = lastRowResult[0].columns;
                const values = lastRowResult[0].values[0];
                const row = {};
                columns.forEach((col, i) => {
                  row[col] = values[i];
                });
                return { rows: [row] };
              }
            }
          } else if (queryType === 'UPDATE' || queryType === 'DELETE') {
            // For UPDATE/DELETE with RETURNING, we need to get affected rows before the operation
            // This is a simplified approach - just return empty for now
            return { rows: [], rowCount: db.getRowsModified() };
          }
        }
        
        saveDb(); // Save after modifications
        return { rows: [], rowCount: db.getRowsModified() };
      } else {
        // For other queries (CREATE, DROP, etc.)
        db.run(sqliteQuery);
        saveDb();
        return { rows: [] };
      }
    } catch (error) {
      console.error('Database query error:', error);
      console.error('SQL:', sql);
      console.error('Params:', params);
      throw error;
    }
  },

  // Execute raw SQL (for DDL statements)
  exec: (sql) => {
    if (!db) {
      console.error('Database not initialized');
      return;
    }
    db.run(sql);
    saveDb();
  },

  // Prepare a statement (for compatibility)
  prepare: (sql) => {
    if (!db) {
      throw new Error('Database not initialized');
    }
    return db.prepare(sql);
  },

  // Connect method for transaction support (compatibility with PostgreSQL pool)
  connect: async () => {
    await initDb();
    return {
      query: dbWrapper.query,
      release: () => {} // No-op for SQLite
    };
  },

  // Initialize database (call this before using)
  init: initDb,
  
  // Save database
  save: saveDb
};

// Initialize on import
initDb().catch(console.error);

export default dbWrapper;
